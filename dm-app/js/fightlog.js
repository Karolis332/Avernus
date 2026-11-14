// Fight log: what the tracker did and when (clock time), so a recording of the table can be sorted by round.
// Pure functions; the tracker stores the list in localStorage under KEY and the Record page reads it back.
(function () {
  "use strict";

  var KEY = "dmapp:fightlog";
  var CAP = 5000; // ponytail: one flat capped list for every fight; split per session if a night ever outgrows it

  function event(type, data, now) {
    return Object.assign({ at: now, type: type }, data || {});
  }

  // Returns a new list; the stored value may be missing or broken, then the log starts fresh.
  function append(log, ev, cap) {
    var next = (Array.isArray(log) ? log : []).concat([ev]);
    var max = cap || CAP;
    return next.length > max ? next.slice(next.length - max) : next;
  }

  function inWindow(log, from, to) {
    return (Array.isArray(log) ? log : []).filter(function (e) { return e.at >= from && e.at <= to; });
  }

  var DMFightLog = { KEY: KEY, CAP: CAP, event: event, append: append, inWindow: inWindow };

  if (typeof window !== "undefined") window.DMFightLog = DMFightLog;
  if (typeof module !== "undefined" && module.exports) module.exports = DMFightLog;
})();
