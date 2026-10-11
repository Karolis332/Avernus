// 5e-book-style stat block + the full creature panel body (portrait, tactics,
// sounds, videos). Pure DOM building; no app state.
(function () {
  "use strict";
  var el = window.DMRender.el;
  var renderInline = window.DMRender.renderInline;

  function abilityScoreRow(abilities) {
    var row = el("div", "sb-abilities");
    ["str", "dex", "con", "int", "wis", "cha"].forEach(function (k) {
      var score = abilities ? abilities[k] : null;
      if (score == null) return;
      var mod = window.DMCore.abilityMod(score);
      var cell = el("div", "sb-ability");
      cell.appendChild(el("div", "sb-ability-label", k.toUpperCase()));
      cell.appendChild(el("div", "sb-ability-score", String(score) + " (" + (mod >= 0 ? "+" : "") + mod + ")"));
      row.appendChild(cell);
    });
    return row;
  }

  function statLine(label, value) {
    if (!value) return null;
    var p = el("p", "sb-line");
    var strong = el("strong", null, label + " ");
    p.appendChild(strong);
    p.appendChild(document.createTextNode(String(value)));
    return p;
  }

  function entryList(title, entries) {
    if (!entries || !entries.length) return null;
    var wrap = el("div", "sb-entries");
    wrap.appendChild(el("h4", "sb-entries-title", title));
    entries.forEach(function (entry) {
      var p = el("p", "sb-entry");
      var name = el("strong", "sb-entry-name", entry.name + (entry.cost ? " (Costs " + entry.cost + " Actions)" : "") + ". ");
      p.appendChild(name);
      p.appendChild(renderInline(entry.text));
      wrap.appendChild(p);
    });
    return wrap;
  }

  function renderStatblock(creature) {
    var sb = el("div", "statblock");
    if (creature.homebrew) {
      sb.appendChild(el("div", "sb-homebrew", "Homebrew: " + creature.homebrew));
    }
    sb.appendChild(el("div", "sb-bar sb-bar-top"));
    var head = el("div", "sb-head");
    head.appendChild(el("h2", "sb-name", creature.name));
    if (creature.sizeType) head.appendChild(el("div", "sb-type", creature.sizeType));
    sb.appendChild(head);
    sb.appendChild(el("div", "sb-rule"));

    [
      statLine("Armor Class", creature.ac != null ? creature.ac + (creature.acNote ? " (" + creature.acNote + ")" : "") : null),
      statLine("Hit Points", creature.hp != null ? creature.hp + (creature.hpFormula ? " (" + creature.hpFormula + ")" : "") : null),
      statLine("Speed", creature.speed)
    ].forEach(function (n) { if (n) sb.appendChild(n); });

    sb.appendChild(el("div", "sb-rule"));
    if (creature.abilities) sb.appendChild(abilityScoreRow(creature.abilities));
    sb.appendChild(el("div", "sb-rule"));

    [
      statLine("Saving Throws", creature.saves),
      statLine("Skills", creature.skills),
      statLine("Vulnerabilities", creature.vulnerable),
      statLine("Resistances", creature.resist),
      statLine("Damage Immunities", creature.immune),
      statLine("Condition Immunities", creature.condImmune),
      statLine("Senses", creature.senses),
      statLine("Languages", creature.languages),
      statLine("Challenge", creature.cr != null ? creature.cr + (creature.xp ? " (" + creature.xp + " XP)" : "") : null),
      statLine("Proficiency Bonus", creature.pb != null ? "+" + creature.pb : null)
    ].forEach(function (n) { if (n) sb.appendChild(n); });

    sb.appendChild(el("div", "sb-rule"));
    [
      entryList("Traits", creature.traits),
      entryList("Actions", creature.actions),
      entryList("Bonus Actions", creature.bonus),
      entryList("Reactions", creature.reactions)
    ].forEach(function (n) { if (n) sb.appendChild(n); });

    if (creature.legendary) {
      var leg = el("div", "sb-entries");
      leg.appendChild(el("h4", "sb-entries-title", "Legendary Actions"));
      if (creature.legendary.intro) {
        var introP = el("p", "sb-entry");
        introP.appendChild(renderInline(creature.legendary.intro));
        leg.appendChild(introP);
      }
      (creature.legendary.actions || []).forEach(function (a) {
        var p = el("p", "sb-entry");
        p.appendChild(el("strong", "sb-entry-name", a.name + (a.cost && a.cost > 1 ? " (Costs " + a.cost + " Actions)" : "") + ". "));
        p.appendChild(renderInline(a.text));
        leg.appendChild(p);
      });
      sb.appendChild(leg);
    }

    sb.appendChild(el("div", "sb-bar sb-bar-bottom"));

    var src = creature.source || {};
    var link = el("a", "sb-5etools-link", "View on 5e.tools");
    link.href = window.DMRender.bestiaryUrl(src.name || creature.name, src.src);
    link.target = "_blank";
    link.rel = "noopener";
    sb.appendChild(link);
    return sb;
  }

  function portraitChain(kind, source) {
    var chain = [
      "art/official/" + kind + ".webp",
      "art/generated/" + kind + ".webp",
      "art/generated/" + kind + ".png"
    ];
    if (source && source.name && source.src) {
      chain.push("https://5e.tools/img/bestiary/" + encodeURIComponent(source.src) + "/" + encodeURIComponent(source.name) + ".webp");
      chain.push("https://5e.tools/img/bestiary/tokens/" + encodeURIComponent(source.src) + "/" + encodeURIComponent(source.name) + ".webp");
    }
    return chain;
  }

  function renderPortrait(creature) {
    var wrap = el("div", "portrait-wrap");
    if (creature.portrait === false) {
      // No art exists for this one (e.g. a ship, a mount) — skip the whole
      // load chain instead of generating three guaranteed 404s.
      wrap.classList.add("portrait-placeholder");
      wrap.appendChild(el("div", "portrait-placeholder-glyph", "?"));
      return wrap;
    }
    var img = el("img", "portrait");
    img.alt = creature.name;
    var chain = portraitChain(creature.kind, creature.source);
    var i = 0;
    img.src = chain[0];
    img.onerror = function () {
      i++;
      if (i < chain.length) {
        img.src = chain[i];
      } else {
        img.onerror = null;
        wrap.classList.add("portrait-placeholder");
        img.remove();
        wrap.appendChild(el("div", "portrait-placeholder-glyph", "?"));
      }
    };
    wrap.appendChild(img);
    return wrap;
  }

  function renderSounds(kind) {
    var entry = window.MEDIA && window.MEDIA[kind];
    if (!entry || !entry.sounds || !entry.sounds.length) return null;
    var wrap = el("div", "media-sounds");
    wrap.appendChild(el("h4", "panel-subhead", "Sounds"));
    entry.sounds.forEach(function (s) {
      var row = el("div", "sound-row");
      var audio = el("audio");
      audio.preload = "none";
      audio.src = s.src;
      var playBtn = el("button", "sound-btn", "Play");
      playBtn.addEventListener("click", function () { audio.play(); });
      var stopBtn = el("button", "sound-btn", "Stop");
      stopBtn.addEventListener("click", function () { audio.pause(); audio.currentTime = 0; });
      row.appendChild(el("span", "sound-label", s.label));
      row.appendChild(playBtn);
      row.appendChild(stopBtn);
      row.appendChild(el("span", "media-credit", (s.credit || "") + (s.license ? " — " + s.license : "")));
      row.appendChild(audio);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function ytId(url) {
    var m = /(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/.exec(url || "");
    return m ? m[1] : null;
  }

  function renderVideos(kind) {
    var entry = window.MEDIA && window.MEDIA[kind];
    if (!entry || !entry.videos || !entry.videos.length) return null;
    var wrap = el("div", "media-videos");
    wrap.appendChild(el("h4", "panel-subhead", "Videos"));
    entry.videos.forEach(function (v) {
      var id = ytId(v.url);
      var row = el("div", "video-row");
      row.appendChild(el("div", "video-label", v.label));
      var frameWrap = el("div", "video-frame-wrap");
      if (id) {
        var thumb = el("img", "video-thumb");
        thumb.src = "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg";
        thumb.alt = "Play: " + v.label;
        thumb.addEventListener("click", function () {
          var iframe = el("iframe", "video-iframe");
          iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
          iframe.setAttribute("allow", "autoplay; encrypted-media");
          iframe.setAttribute("allowfullscreen", "");
          frameWrap.innerHTML = "";
          frameWrap.appendChild(iframe);
        });
        frameWrap.appendChild(thumb);
        frameWrap.appendChild(el("div", "video-play-glyph", "▶"));
      }
      row.appendChild(frameWrap);
      var linkRow = el("div");
      var openLink = el("a", "media-credit", "Open on YouTube");
      openLink.href = v.url;
      openLink.target = "_blank";
      openLink.rel = "noopener";
      linkRow.appendChild(openLink);
      linkRow.appendChild(document.createTextNode(" — " + (v.credit || "")));
      row.appendChild(linkRow);
      wrap.appendChild(row);
    });
    return wrap;
  }

  function renderTactics(tactics, title, listTag) {
    if (!tactics || !tactics.length) return null;
    var wrap = el("div", "panel-tactics");
    wrap.appendChild(el("h4", "panel-subhead", title || "Tactics"));
    var ol = el(listTag || "ol");
    tactics.forEach(function (t) {
      var li = el("li");
      li.appendChild(renderInline(t));
      ol.appendChild(li);
    });
    wrap.appendChild(ol);
    return wrap;
  }

  // Full panel body for a creature (used by panel.js)
  function renderCreaturePanelBody(creature) {
    var body = el("div", "creature-panel");
    body.appendChild(renderPortrait(creature));
    var head = el("div", "creature-panel-head");
    head.appendChild(el("h2", null, creature.name));
    if (creature.role) head.appendChild(el("div", "creature-role", creature.role));
    var src = creature.source || {};
    var link = el("a", "sb-5etools-link", "View on 5e.tools");
    link.href = window.DMRender.bestiaryUrl(src.name || creature.name, src.src);
    link.target = "_blank";
    link.rel = "noopener";
    head.appendChild(link);
    body.appendChild(head);

    if (creature.description) {
      var desc = el("div", "block-read");
      desc.appendChild(renderInline(creature.description));
      body.appendChild(desc);
    }
    var roleplay = renderTactics(creature.roleplay, "Roleplaying", "ul");

    if (!creature.npc) {
      body.appendChild(renderStatblock(creature));
    } else if (creature.homebrew) {
      body.appendChild(el("div", "sb-homebrew", "Homebrew: " + creature.homebrew));
    }

    // NPCs are talked to more than fought: put roleplaying before tactics for them
    var tactics = renderTactics(creature.tactics);
    (creature.npc ? [roleplay, tactics] : [tactics, roleplay]).concat([renderSounds(creature.kind), renderVideos(creature.kind)]).forEach(function (n) {
      if (n) body.appendChild(n);
    });
    return body;
  }

  window.DMStatblock = {
    renderStatblock: renderStatblock,
    renderCreaturePanelBody: renderCreaturePanelBody,
    renderPortrait: renderPortrait
  };
})();
