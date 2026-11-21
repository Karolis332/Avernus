// The Talk and Games tabs of the Emporium DM page (emporium.html). Talk: how to play the keeper, lines in their
// voice, riddles whose prize can reveal a hidden row on the monitor, and the Avernus secrets with a Show button that
// puts the read-aloud line on the monitor as a card. Games: the spot's mini-games and Gristle's Ladder, with the
// opponents' stat blocks. Data: sessions/campaign-emporium-talk.js, -minigames.js, -gauntlets.js.
(function () {
  "use strict";
  var R = window.DMRender, el = R.el;
  var CTX = { session: { id: "emporium-market", creatures: {}, side: {} } };

  function data() { return window.EMPORIUM_TALK || { guide: [], spots: {} }; }
  function side() { return (window.CAMPAIGN || {}).side || {}; }
  function talkOf(spotId) { return data().spots[spotId] || null; }
  function gamesOf(spotId) {
    var t = talkOf(spotId);
    return ((t && t.games) || []).filter(function (id) { return side()[id]; });
  }
  function inline(parent, text) { parent.appendChild(R.renderInline(String(text == null ? "" : text))); return parent; }
  function para(cls, text) { return inline(el("p", cls), text); }
  function block(b) { return R.renderBlock(b, CTX); }
  function button(label, cls, onClick) {
    var b = el("button", cls, label);
    b.type = "button";
    b.addEventListener("click", onClick);
    return b;
  }
  function rowsTable(cls, rows) {
    var t = el("table", "mk " + cls);
    rows.forEach(function (r) {
      var tr = el("tr");
      tr.appendChild(el("th", "", r[0]));
      tr.appendChild(inline(el("td"), r[1]));
      t.appendChild(tr);
    });
    return t;
  }
  function secretTitle(t, id) {
    var s = (t.secrets || []).filter(function (x) { return x.id === id; })[0];
    return s ? s.title : id;
  }

  function riddleBox(spot, t, r, i, cast, redraw) {
    var box = el("div", "talk-box");
    box.appendChild(el("h4", "", r.title));
    box.appendChild(block({ t: "read", text: r.ask }));
    box.appendChild(para("", "{@b Answer:} " + r.answer));
    if (r.hints && r.hints.length) box.appendChild(para("hint", "{@b Hints, in order:} " + r.hints.join("  ·  ")));
    if (r.win) box.appendChild(para("", "{@b Won:} " + r.win));
    if (r.lose) box.appendChild(para("", "{@b Missed:} " + r.lose));
    var act = el("p", "talk-act"), shown = cast.riddleShown(spot.id, i);
    act.appendChild(button(shown ? "Take the riddle down" : "Show riddle on the monitor", "btn small",
      function () { cast.riddle(spot.id, i, !shown); redraw(); }));
    if (r.reveal) {
      var on = cast.isRevealed(spot.id, r.reveal);
      act.appendChild(button(on ? "On the monitor: " + r.reveal + "  ·  hide it again" : "Won: reveal " + r.reveal + " on the monitor",
        "btn small" + (on ? "" : " go"), function () { cast.reveal(spot.id, r.reveal); redraw(); }));
    }
    if (r.secret) act.appendChild(el("span", "qty", "Pays the secret: " + secretTitle(t, r.secret)));
    if (act.childNodes.length) box.appendChild(act);
    return box;
  }

  function secretBox(spot, s, cast, redraw) {
    var st = cast.secretState(spot.id, s.id), box = el("div", "talk-box secret" + (st.uncovered ? " uncovered" : ""));
    var h = el("h4", "", s.title);
    if (s.thread) h.appendChild(el("span", "chip", s.thread));
    box.appendChild(h);
    box.appendChild(para("", "{@b How they earn it:} " + s.earn));
    box.appendChild(block({ t: "read", text: s.say }));
    var det = el("details", "full");
    det.appendChild(el("summary", "", "The truth under it (DM only)"));
    det.appendChild(para("", s.truth));
    box.appendChild(det);
    var act = el("p", "talk-act");
    act.appendChild(button(st.shown ? "Put it away" : "Show on the monitor", "btn small" + (st.shown ? "" : " go"),
      function () { cast.secret(spot.id, s.id, !st.shown); redraw(); }));
    if (st.uncovered) act.appendChild(el("span", "qty", "Uncovered tonight"));
    box.appendChild(act);
    return box;
  }

  function talkTab(spot, cast, redraw) {
    var t = talkOf(spot.id), wrap = el("div", "book talk");
    var guide = el("details", "full"), ul = el("ul");
    guide.appendChild(el("summary", "", "How to make it feel authentic"));
    data().guide.forEach(function (g) { ul.appendChild(inline(el("li"), g)); });
    guide.appendChild(ul);
    wrap.appendChild(guide);
    wrap.appendChild(el("h3", "", "How to play them"));
    wrap.appendChild(rowsTable("talk-how", [["Voice", t.voice], ["Look", t.look], ["Senses", t.senses], ["Wants tonight", t.wants], ["Tell", t.tell]]
      .filter(function (r) { return r[1]; })));
    if ((t.phrases || []).length) {
      wrap.appendChild(el("h3", "", "Say it in their voice"));
      wrap.appendChild(rowsTable("talk-lines", t.phrases.map(function (x) { return [x[0], "“" + x[1] + "”"]; })));
    }
    if ((t.riddles || []).length) {
      wrap.appendChild(el("h3", "", "Riddles and openers"));
      t.riddles.forEach(function (r, i) { wrap.appendChild(riddleBox(spot, t, r, i, cast, redraw)); });
    }
    if ((t.secrets || []).length) {
      wrap.appendChild(el("h3", "", "Secrets about Avernus"));
      wrap.appendChild(para("hint", "Hints, never the whole truth. Show puts the read-aloud line on the monitor as a card, and it stays on the night's list in the haul."));
      t.secrets.forEach(function (s) { wrap.appendChild(secretBox(spot, s, cast, redraw)); });
    }
    return wrap;
  }

  // {@c id} links in a panel: the creatures whose stat blocks go under it.
  function creatureIds(blocks) {
    var ids = [], re = /\{@c ([a-z0-9-]+)/g, text = JSON.stringify(blocks), m;
    while ((m = re.exec(text))) if (ids.indexOf(m[1]) === -1) ids.push(m[1]);
    return ids;
  }
  function gamesTab(spot) {
    var wrap = el("div", "book"), cs = (window.CAMPAIGN || {}).creatures || {};
    gamesOf(spot.id).forEach(function (id) {
      var panel = side()[id];
      wrap.appendChild(el("h3", "", panel.title));
      panel.blocks.forEach(function (b) { wrap.appendChild(block(b)); });
      var ids = creatureIds(panel.blocks).filter(function (c) { return cs[c]; });
      if (!ids.length || !window.DMStatblock) return;
      wrap.appendChild(el("h4", "", "Stat blocks"));
      ids.forEach(function (c) {
        var d = el("details", "full talk-sb");
        d.appendChild(el("summary", "", cs[c].name + "  ·  CR " + cs[c].cr));
        d.appendChild(window.DMStatblock.renderStatblock(Object.assign({ _cid: c, _sessionId: "emporium-market" }, cs[c])));
        wrap.appendChild(d);
      });
    });
    return wrap;
  }

  window.DMEmporiumTalk = { talkOf: talkOf, gamesOf: gamesOf, talkTab: talkTab, gamesTab: gamesTab };
})();
