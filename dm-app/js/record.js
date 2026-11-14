// Session recorder (record.html): records the room from one microphone and saves the sound in small
// pieces as it goes, so a crashed tab or a reload loses a few seconds at most. Marks (fight, round, note)
// and the tracker's fight log (js/fightlog.js) are saved beside the sound, timed from the start.
(function () {
  "use strict";
  var inNode = typeof module !== "undefined" && module.exports;
  var FL = inNode ? require("./fightlog.js") : window.DMFightLog;

  var SLICE_MS = 5000;           // one piece of sound is written every five seconds
  var BITS_PER_SECOND = 48000;   // mono speech; about 21 MB an hour
  var RECS_KEY = "dmapp:recorder:recs";
  var MIMES = ["audio/webm;codecs=opus", "audio/ogg;codecs=opus", "audio/webm", "audio/mp4"];

  // ---- pure helpers (tested in tests/record.test.js) ----
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function clock(sec) {
    var s = Math.max(0, Math.floor(sec));
    return Math.floor(s / 3600) + ":" + pad(Math.floor((s % 3600) / 60)) + ":" + pad(s % 60);
  }
  function stem(startedAt) {
    var d = new Date(startedAt);
    return "session-" + d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + "-" + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
  }
  function ext(mime) { return /ogg/.test(mime) ? "ogg" : /mp4/.test(mime) ? "m4a" : "webm"; }
  function pickMime(isSupported) {
    for (var i = 0; i < MIMES.length; i++) if (isSupported(MIMES[i])) return MIMES[i];
    return "";
  }
  // Everything the transcriber needs besides the sound. Times (t) are seconds from the start of the recording.
  function marksFile(meta, trackerLog, chunkAts) {
    var ats = chunkAts || [];
    var end = meta.stoppedAt || (ats.length ? ats[ats.length - 1] : meta.startedAt);
    var rel = function (at) { return Math.round((at - meta.startedAt) / 100) / 10; };
    return {
      version: 1,
      audioFile: stem(meta.startedAt) + "." + ext(meta.mime || ""),
      startedAt: meta.startedAt,
      startedIso: new Date(meta.startedAt).toISOString(),
      stoppedAt: end,
      durationSec: rel(end),
      mime: meta.mime || "",
      marks: meta.marks || [],
      tracker: FL.inWindow(trackerLog, meta.startedAt, end).map(function (e) { return Object.assign({ t: rel(e.at) }, e); }),
      chunkT: ats.map(rel)
    };
  }

  var DMRecord = { clock: clock, stem: stem, ext: ext, pickMime: pickMime, marksFile: marksFile };
  if (inNode) { module.exports = DMRecord; return; }
  window.DMRecord = DMRecord;

  // ---- storage: metadata in localStorage, sound in IndexedDB ----
  function loadRecs() {
    try { var v = JSON.parse(localStorage.getItem(RECS_KEY) || "[]"); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function saveRec(meta) {
    var next = loadRecs().filter(function (r) { return r.id !== meta.id; }).concat([meta]);
    localStorage.setItem(RECS_KEY, JSON.stringify(next));
  }
  function dropRecMeta(id) {
    localStorage.setItem(RECS_KEY, JSON.stringify(loadRecs().filter(function (r) { return r.id !== id; })));
  }
  function openDb() {
    return new Promise(function (resolve, reject) {
      var rq = indexedDB.open("dmapp-recorder", 1);
      rq.onupgradeneeded = function () { rq.result.createObjectStore("chunks", { keyPath: ["rec", "seq"] }); };
      rq.onsuccess = function () { resolve(rq.result); };
      rq.onerror = function () { reject(rq.error); };
    });
  }
  function tx(db, mode, work) {
    return new Promise(function (resolve, reject) {
      var t = db.transaction("chunks", mode);
      var out = work(t.objectStore("chunks"));
      t.oncomplete = function () { resolve(out && out.result); };
      t.onerror = t.onabort = function () { reject(t.error); };
    });
  }
  function rangeOf(rec) { return IDBKeyRange.bound([rec, 0], [rec, Infinity]); }
  function putChunk(db, chunk) { return tx(db, "readwrite", function (s) { return s.put(chunk); }); }
  function chunksOf(db, rec) { return tx(db, "readonly", function (s) { return s.getAll(rangeOf(rec)); }); }
  function dropChunks(db, rec) { return tx(db, "readwrite", function (s) { return s.delete(rangeOf(rec)); }); }

  // ---- the page ----
  function $(id) { return document.getElementById(id); }
  function download(blob, name) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 60000);
  }

  function start() {
    var db = null;
    var live = null;      // { id, startedAt, recorder, stream, stopMeter }: the recording in progress; its metadata lives in localStorage
    var preview = null;   // { stream, stopMeter }: the microphone check
    var wake = null;
    var seq = 0, round = 0, fight = 0;

    function say(text, bad) { $("rec-status").textContent = text; $("rec-status").className = bad ? "status bad" : "status"; }
    function fail(what, err) { say(what + (err && err.message ? " (" + err.message + ")" : ""), true); }
    function recMeta(id) { return loadRecs().filter(function (r) { return r.id === id; })[0] || null; }
    // The stored metadata is the single source of truth: read it, make a changed copy, save it.
    function patchRec(id, change) {
      var cur = recMeta(id);
      if (!cur) return;
      saveRec(Object.assign({}, cur, change(cur)));
    }

    function micConstraints() {
      var id = $("rec-mic").value;
      // A room microphone: no echo canceller or noise gate (they eat quiet voices), automatic gain stays on.
      return { audio: { deviceId: id ? { exact: id } : undefined, channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: true } };
    }
    function option(value, label) {
      var o = document.createElement("option");
      o.value = value; o.textContent = label;
      return o;
    }
    function listMics() {
      return navigator.mediaDevices.enumerateDevices().then(function (all) {
        var sel = $("rec-mic"), keep = sel.value;
        var mics = all.filter(function (d) { return d.kind === "audioinput" && d.deviceId && d.deviceId !== "default"; });
        sel.replaceChildren.apply(sel, [option("", "Default microphone")].concat(mics.map(function (d, i) { return option(d.deviceId, d.label || "Microphone " + (i + 1)); })));
        sel.value = keep;
        if (sel.selectedIndex < 0) sel.value = "";
      });
    }
    function meter(stream) {
      var Ctx = window.AudioContext || window.webkitAudioContext;
      var ctx = new Ctx(), an = ctx.createAnalyser(), buf = new Uint8Array(1024), raf = 0;
      an.fftSize = 1024;
      ctx.createMediaStreamSource(stream).connect(an);
      (function draw() {
        an.getByteTimeDomainData(buf);
        var peak = 0;
        for (var i = 0; i < buf.length; i++) peak = Math.max(peak, Math.abs(buf[i] - 128));
        $("rec-level").style.width = Math.min(100, Math.round(peak / 1.28)) + "%";
        raf = requestAnimationFrame(draw);
      })();
      return function stopMeter() { cancelAnimationFrame(raf); ctx.close(); $("rec-level").style.width = "0%"; };
    }
    function stopPreview() {
      if (!preview) return;
      preview.stopMeter();
      preview.stream.getTracks().forEach(function (t) { t.stop(); });
      preview = null;
      $("rec-check").textContent = "Check microphone";
    }
    function keepAwake() {
      if (!navigator.wakeLock || !live || document.visibilityState !== "visible") return;
      navigator.wakeLock.request("screen").then(function (w) { wake = w; }, function () { $("rec-awake").hidden = false; });
    }

    function onChunk(id, e) {
      if (!e.data || !e.data.size) return;
      var at = Date.now(), n = seq++;
      putChunk(db, { rec: id, seq: n, at: at, blob: e.data }).then(function () {
        patchRec(id, function (cur) { return { lastChunkAt: at, chunks: n + 1, bytes: (cur.bytes || 0) + e.data.size }; });
        if (!live) paint(); // the last piece of a stopped recording
      }, function (err) { fail("Saving failed: stop and download what there is", err); });
    }
    function begin() {
      stopPreview();
      navigator.mediaDevices.getUserMedia(micConstraints()).then(function (stream) {
        var mime = pickMime(function (m) { return MediaRecorder.isTypeSupported(m); });
        var recorder = new MediaRecorder(stream, mime ? { mimeType: mime, audioBitsPerSecond: BITS_PER_SECOND } : {});
        var now = Date.now();
        seq = 0; round = 0; fight = 0;
        saveRec({ id: now, startedAt: now, mime: recorder.mimeType || mime, marks: [], chunks: 0, bytes: 0 });
        live = { id: now, startedAt: now, recorder: recorder, stream: stream, stopMeter: meter(stream) };
        recorder.ondataavailable = function (e) { onChunk(now, e); };
        recorder.onerror = function (e) { fail("The recorder stopped with an error", e.error); };
        recorder.onstop = finish;
        stream.getAudioTracks()[0].onended = function () { stop(); fail("The microphone was lost. Recording stopped; what was recorded is saved."); };
        recorder.start(SLICE_MS);
        keepAwake();
        listMics();
        paint();
      }, function (err) { fail("The browser did not give access to the microphone. Allow it in the address bar and press Start again", err); });
    }
    function stop() {
      if (live && live.recorder.state !== "inactive") live.recorder.stop(); // the last piece arrives first, then finish() runs
    }
    function finish() {
      if (!live) return;
      var done = live;
      live = null;
      done.stopMeter();
      done.stream.getTracks().forEach(function (t) { t.stop(); });
      if (wake) { wake.release(); wake = null; }
      patchRec(done.id, function () { return { stoppedAt: Date.now() }; });
      say("Stopped. Download the two files below, then move them to the big PC.");
      paint();
    }

    function mark(type, note) {
      if (!live) return;
      var m = { t: Math.round((Date.now() - live.startedAt) / 100) / 10, type: type, note: note || "" };
      patchRec(live.id, function (cur) { return { marks: (cur.marks || []).concat([m]) }; });
      paint();
    }

    function saveFiles(meta, what) {
      chunksOf(db, meta.id).then(function (chunks) {
        if (what === "audio") {
          download(new Blob(chunks.map(function (c) { return c.blob; }), { type: meta.mime || "audio/webm" }), stem(meta.startedAt) + "." + ext(meta.mime || ""));
          return;
        }
        var log = [];
        try { log = JSON.parse(localStorage.getItem(FL.KEY) || "[]"); } catch (e) { log = []; }
        var body = marksFile(meta, log, chunks.map(function (c) { return c.at; }));
        download(new Blob([JSON.stringify(body, null, 1)], { type: "application/json" }), stem(meta.startedAt) + ".marks.json");
      }, function (err) { fail("Could not read the saved recording", err); });
    }
    function button(label, onClick) {
      var b = document.createElement("button");
      b.className = "btn small"; b.textContent = label; b.addEventListener("click", onClick);
      return b;
    }
    function savedRow(meta) {
      var end = meta.stoppedAt || meta.lastChunkAt || meta.startedAt;
      var li = document.createElement("li");
      var name = document.createElement("b");
      name.textContent = stem(meta.startedAt);
      li.appendChild(name);
      li.appendChild(document.createTextNode("  " + clock((end - meta.startedAt) / 1000) + ", " + Math.round((meta.bytes || 0) / 104857.6) / 10 + " MB" + (meta.stoppedAt ? "" : "  (interrupted: saved up to here)") + "  "));
      li.appendChild(button("Download audio", function () { saveFiles(recMeta(meta.id) || meta, "audio"); }));
      li.appendChild(button("Download marks", function () { saveFiles(recMeta(meta.id) || meta, "marks"); }));
      li.appendChild(button("Delete from this laptop", function () {
        if (!confirm("Delete this recording from the browser? Do this only after both files are safe on the big PC.")) return;
        dropChunks(db, meta.id).then(function () { dropRecMeta(meta.id); paint(); }, function (err) { fail("Could not delete", err); });
      }));
      return li;
    }

    function paint() {
      var on = !!live;
      $("rec-start").disabled = on; $("rec-stop").disabled = !on; $("rec-check").disabled = on; $("rec-mic").disabled = on;
      document.body.classList.toggle("recording", on);
      ["rec-fight", "rec-round", "rec-fight-end", "rec-mark"].forEach(function (id) { $(id).disabled = !on; });
      $("rec-round").textContent = "New round" + (on && round ? " (now " + round + ")" : "");
      var marks = on ? ((recMeta(live.id) || {}).marks || []) : [];
      $("rec-marks").replaceChildren.apply($("rec-marks"), marks.slice(-8).reverse().map(function (m) {
        var li = document.createElement("li");
        li.textContent = clock(m.t) + "  " + m.type + (m.note ? ": " + m.note : "");
        return li;
      }));
      var rows = loadRecs().slice().reverse().filter(function (meta) { return !(on && meta.id === live.id); }).map(savedRow);
      $("rec-saved").replaceChildren.apply($("rec-saved"), rows);
      $("rec-saved-none").hidden = rows.length > 0;
    }
    function tick() {
      if (!live) return;
      var now = Date.now(), last = (recMeta(live.id) || {}).lastChunkAt || live.startedAt;
      if (now - last > 4 * SLICE_MS) { fail("Nothing has been saved for " + Math.round((now - last) / 1000) + " s. Stop and start again."); return; }
      say("● RECORDING  " + clock((now - live.startedAt) / 1000) + "   ·   saved up to " + clock((last - live.startedAt) / 1000));
    }

    $("rec-start").addEventListener("click", begin);
    $("rec-stop").addEventListener("click", stop);
    $("rec-check").addEventListener("click", function () {
      if (preview) { stopPreview(); return; }
      navigator.mediaDevices.getUserMedia(micConstraints()).then(function (stream) {
        preview = { stream: stream, stopMeter: meter(stream) };
        $("rec-check").textContent = "Stop the check";
        listMics();
      }, function (err) { fail("The browser did not give access to the microphone", err); });
    });
    $("rec-fight").addEventListener("click", function () { fight++; round = 1; mark("fight", "Fight " + fight); });
    $("rec-round").addEventListener("click", function () { round++; mark("round", "Round " + round); });
    $("rec-fight-end").addEventListener("click", function () { round = 0; mark("fight-end", ""); });
    $("rec-mark").addEventListener("click", function () { mark("mark", $("rec-note").value.trim()); $("rec-note").value = ""; });
    $("rec-note").addEventListener("keydown", function (e) { if (e.key === "Enter") $("rec-mark").click(); });
    document.addEventListener("visibilitychange", keepAwake);
    window.addEventListener("beforeunload", function (e) { if (live) { e.preventDefault(); e.returnValue = ""; } });

    if (!navigator.mediaDevices || !window.MediaRecorder || !window.indexedDB) {
      say("This browser cannot record from this address. Open the app as a file, through http://localhost or through https.", true);
      $("rec-start").disabled = true; $("rec-check").disabled = true;
      return;
    }
    openDb().then(function (d) {
      db = d;
      say("Not recording.");
      paint();
      setInterval(tick, 500);
      return listMics();
    }, function (err) { fail("The browser's storage could not be opened, so recording is off", err); $("rec-start").disabled = true; });
  }

  if (document.getElementById("rec-start")) start();
})();
