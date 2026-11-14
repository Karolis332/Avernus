// node dm-app/tests/record.test.js
var assert = require("assert");
var R = require("../js/record.js");

// clock: seconds as h:mm:ss
(function () {
  assert.strictEqual(R.clock(0), "0:00:00");
  assert.strictEqual(R.clock(5.9), "0:00:05");
  assert.strictEqual(R.clock(3723), "1:02:03");
  assert.strictEqual(R.clock(-4), "0:00:00");
})();

// stem: the file name comes from the local start time
(function () {
  var t = new Date(2026, 10, 16, 18, 5, 9).getTime(); // 16 November 2026, 18:05:09 local; seconds keep two recordings of one minute apart
  assert.strictEqual(R.stem(t), "session-2026-11-16-180509");
})();

// ext: the file ending follows what the browser recorded
(function () {
  assert.strictEqual(R.ext("audio/webm;codecs=opus"), "webm");
  assert.strictEqual(R.ext("audio/ogg;codecs=opus"), "ogg");
  assert.strictEqual(R.ext("audio/mp4"), "m4a");
  assert.strictEqual(R.ext(""), "webm");
})();

// pickMime: first format the browser supports, in order of preference
(function () {
  var only = function (ok) { return function (m) { return ok.indexOf(m) !== -1; }; };
  assert.strictEqual(R.pickMime(only(["audio/ogg;codecs=opus", "audio/webm;codecs=opus"])), "audio/webm;codecs=opus");
  assert.strictEqual(R.pickMime(only(["audio/ogg;codecs=opus"])), "audio/ogg;codecs=opus");
  assert.strictEqual(R.pickMime(only([])), "");
})();

// marksFile: marks, tracker events inside the recording, and where each saved chunk sits in time
(function () {
  var start = 1000000;
  var meta = {
    id: start, startedAt: start, stoppedAt: start + 60000, mime: "audio/webm;codecs=opus", sessionId: "14-x",
    marks: [{ t: 12.5, type: "round", note: "" }, { t: 30, type: "mark", note: "Aurora crits" }]
  };
  var tracker = [
    { at: start - 5000, type: "turn", who: "before the recording" },
    { at: start + 20000, type: "turn", round: 2, who: "Flash" },
    { at: start + 61000, type: "turn", who: "after the recording" }
  ];
  var out = R.marksFile(meta, tracker, [start + 5000, start + 10000]);
  assert.strictEqual(out.version, 1);
  assert.strictEqual(out.audioFile, R.stem(start) + ".webm");
  assert.strictEqual(out.startedAt, start);
  assert.strictEqual(out.durationSec, 60);
  assert.deepStrictEqual(out.marks, meta.marks);
  assert.strictEqual(out.tracker.length, 1);
  assert.strictEqual(out.tracker[0].who, "Flash");
  assert.strictEqual(out.tracker[0].t, 20);
  assert.deepStrictEqual(out.chunkT, [5, 10]);
  assert.strictEqual(tracker[1].t, undefined, "the stored tracker event is not changed");
})();

// marksFile: a recording that was never stopped (crash, reload) ends at its last saved chunk
(function () {
  var start = 2000000;
  var out = R.marksFile({ id: start, startedAt: start, mime: "", marks: [] }, null, [start + 5000, start + 10000, start + 15000]);
  assert.strictEqual(out.durationSec, 15);
  assert.deepStrictEqual(out.tracker, []);
})();

console.log("record.test.js: all assertions passed");
