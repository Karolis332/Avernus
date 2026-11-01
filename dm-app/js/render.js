// Turns SESSION-FORMAT inline tags + blocks into DOM. No app state here —
// clicks are read via data-* attributes by app.js's single delegated listener.
(function () {
  "use strict";

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function spellUrl(name, src) {
    return "https://5e.tools/spells.html#" + encodeURIComponent(name.toLowerCase()) + "_" + encodeURIComponent(src || "phb");
  }
  function itemUrl(name, src) {
    return "https://5e.tools/items.html#" + encodeURIComponent(name.toLowerCase()) + "_" + encodeURIComponent(src || "dmg");
  }
  function bestiaryUrl(name, src) {
    return "https://5e.tools/bestiary.html#" + encodeURIComponent(name.toLowerCase()) + "_" + encodeURIComponent((src || "mm").toLowerCase());
  }

  // Renders inline text (with {@tags}) into a DocumentFragment.
  function renderInline(text) {
    var frag = document.createDocumentFragment();
    var tokens = window.DMCore.parseTags(text);
    tokens.forEach(function (t) {
      if (t.type === "text") {
        frag.appendChild(document.createTextNode(t.text));
      } else if (t.type === "b") {
        var b = el("strong", null, null);
        b.appendChild(renderInline(t.text));
        frag.appendChild(b);
      } else if (t.type === "i") {
        var i = el("em", null, null);
        i.appendChild(renderInline(t.text));
        frag.appendChild(i);
      } else if (t.type === "c") {
        var a = el("a", "tag tag-creature", t.label || t.id);
        a.href = "#";
        a.dataset.cid = t.id;
        frag.appendChild(a);
      } else if (t.type === "side") {
        var s = el("a", "tag tag-side", t.label || t.id);
        s.href = "#";
        s.dataset.sid = t.id;
        frag.appendChild(s);
      } else if (t.type === "scene") {
        var sc = el("a", "tag tag-scene", t.label || t.id);
        sc.href = "#";
        sc.dataset.sceneGoto = t.id;
        frag.appendChild(sc);
      } else if (t.type === "spell") {
        var sp = el("a", "tag tag-spell", t.name);
        sp.href = spellUrl(t.name, t.src);
        sp.target = "_blank";
        sp.rel = "noopener";
        frag.appendChild(sp);
      } else if (t.type === "item") {
        var it = el("a", "tag tag-item", t.name);
        it.href = itemUrl(t.name, t.src);
        it.target = "_blank";
        it.rel = "noopener";
        frag.appendChild(it);
      } else if (t.type === "url") {
        var ua = el("a", "tag tag-url", t.label);
        ua.href = t.href;
        ua.target = "_blank";
        ua.rel = "noopener noreferrer";
        frag.appendChild(ua);
      } else if (t.type === "dice") {
        var d = el("span", "tag tag-dice", t.expr);
        d.dataset.dice = t.expr;
        frag.appendChild(d);
      }
    });
    return frag;
  }

  function renderParagraphs(container, text, cls) {
    (text || "").split(/\n\s*\n/).forEach(function (para) {
      var p = el("p", cls || null, null);
      p.appendChild(renderInline(para));
      container.appendChild(p);
    });
  }

  function renderBlock(block, ctx) {
    switch (block.t) {
      case "read": {
        var wrap = el("div", "block block-read-wrap");
        wrap.appendChild(el("div", "read-lead-in", "Read or paraphrase the following:"));
        var box = el("div", "block-read");
        renderParagraphs(box, block.text);
        wrap.appendChild(box);
        return wrap;
      }
      case "p": {
        var p = el("div", "block block-p");
        renderParagraphs(p, block.text);
        return p;
      }
      case "h": {
        var isEvent = /^(Event:|Area\b)/i.test((block.text || "").trim());
        var h = el("h3", "block block-h" + (isEvent ? " block-h-event" : ""));
        h.appendChild(renderInline(block.text));
        return h;
      }
      case "map": {
        var mapWrap = el("div", "block block-map");
        // src = inline generated art (own image, no library lookup); id = library map.
        var map = block.src ? { src: block.src, title: block.title || "Map" } :
          ((window.LIBRARY || {}).maps || []).filter(function (m) { return m.id === block.id; })[0];
        if (!map) {
          mapWrap.appendChild(el("div", "map-missing", "Map not available on this device"));
          return mapWrap;
        }
        var card = el("div", "map-card");
        if (block.src) { card.dataset.mapSrc = block.src; card.dataset.mapTitle = block.title || map.title; }
        else card.dataset.mapId = map.id;
        var thumb = document.createElement("img");
        thumb.className = "map-thumb";
        thumb.src = block.src || ("library/" + map.thumb);
        thumb.alt = block.title || map.title;
        card.appendChild(thumb);
        card.appendChild(el("div", "map-caption", block.title || map.title));
        if (block.note) card.appendChild(el("div", "map-note", block.note));
        mapWrap.appendChild(card);
        return mapWrap;
      }
      case "steps": {
        var ol = el("ol", "block block-steps");
        (block.items || []).forEach(function (item) {
          var li = el("li");
          li.appendChild(renderInline(item));
          ol.appendChild(li);
        });
        return ol;
      }
      case "list": {
        var ul = el("ul", "block block-list");
        (block.items || []).forEach(function (item) {
          var li = el("li");
          li.appendChild(renderInline(item));
          ul.appendChild(li);
        });
        return ul;
      }
      case "note": {
        var note = el("div", "block block-note");
        if (block.title) note.appendChild(el("div", "note-title", block.title));
        var body = el("div", "note-body");
        renderParagraphs(body, block.text);
        note.appendChild(body);
        return note;
      }
      case "table": {
        var wrap = el("div", "block block-table");
        if (block.caption) wrap.appendChild(el("div", "table-caption", block.caption));
        var table = el("table");
        if (block.head && block.head.length) {
          var thead = el("thead");
          var htr = el("tr");
          block.head.forEach(function (h2) { htr.appendChild(el("th", null, h2)); });
          thead.appendChild(htr);
          table.appendChild(thead);
        }
        var tbody = el("tbody");
        (block.rows || []).forEach(function (row) {
          var tr = el("tr");
          row.forEach(function (cell) {
            var td = el("td");
            td.appendChild(renderInline(String(cell)));
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        wrap.appendChild(table);
        return wrap;
      }
      case "choices": {
        var cBlock = el("div", "block block-choices");
        if (block.prompt) cBlock.appendChild(el("div", "choices-prompt", block.prompt));
        var row = el("div", "choices-row");
        (block.items || []).forEach(function (item) {
          var btn = el("button", "choice-btn", item.label);
          if (item.goto) btn.dataset.sceneGoto = item.goto;
          if (item.side) btn.dataset.sid = item.side;
          row.appendChild(btn);
        });
        cBlock.appendChild(row);
        return cBlock;
      }
      case "encounter": {
        return window.DMTracker.renderEncounter(block, ctx);
      }
      case "img": {
        var imgWrap = el("div", "block block-img");
        var figure = el("figure", "img-plate");
        var frame = el("div", "img-plate-frame");
        var image = document.createElement("img");
        image.className = "img-plate-art zoomable";
        image.src = block.src;
        image.title = "Click to open full size";
        image.addEventListener("click", function () { window.open(image.currentSrc || image.src, "_blank"); });
        image.alt = block.caption || "";
        image.loading = "lazy";
        image.onerror = function () { figure.style.display = "none"; };
        frame.appendChild(image);
        figure.appendChild(frame);
        if (block.caption) figure.appendChild(el("figcaption", "img-plate-caption", block.caption));
        if (block.credit) figure.appendChild(el("div", "img-plate-credit", block.credit));
        imgWrap.appendChild(figure);
        return imgWrap;
      }
      case "more": {
        var det = el("details", "block block-more");
        var sum = el("summary", "more-summary");
        sum.appendChild(el("span", "more-title", block.title || "More"));
        (block.src || []).forEach(function (tag) {
          sum.appendChild(el("span", "src-chip " + window.DMCore.sourceKind(tag), tag));
        });
        det.appendChild(sum);
        var inner = el("div", "more-body");
        (block.blocks || []).forEach(function (b) { inner.appendChild(renderBlock(b, ctx)); });
        det.appendChild(inner);
        return det;
      }
      case "checks": {
        var ladder = el("div", "block block-checks");
        window.DMCore.sortChecks(block.items).forEach(function (c) {
          var r = el("div", "check-row");
          r.appendChild(el("span", "check-dc", "DC " + c.dc));
          r.appendChild(el("span", "check-skill", c.skill));
          if (c.who) r.appendChild(el("span", "check-who", "(" + c.who + ")"));
          var t = el("span", "check-text");
          t.appendChild(renderInline(c.text || ""));
          r.appendChild(t);
          ladder.appendChild(r);
        });
        return ladder;
      }
      case "env": {
        var envBox = el("div", "block block-env");
        [["sight", "Sight"], ["sound", "Sound"], ["smell", "Smell"], ["feel", "Feel"]].forEach(function (f) {
          if (!block[f[0]]) return;
          var line = el("p", "env-line");
          line.appendChild(el("strong", "env-label", f[1] + " "));
          line.appendChild(renderInline(block[f[0]]));
          envBox.appendChild(line);
        });
        return envBox;
      }
      default: {
        var unk = el("div", "block block-unknown", "[unknown block: " + block.t + "]");
        return unk;
      }
    }
  }

  function renderScene(scene, ctx) {
    var out = document.createDocumentFragment();
    var dropcapApplied = false;
    (scene.blocks || []).forEach(function (block) {
      var node = renderBlock(block, ctx);
      node.dataset.blockRoot = "1";
      if (!dropcapApplied && block.t === "p") {
        var firstP = node.querySelector("p");
        if (firstP) { firstP.classList.add("dropcap"); dropcapApplied = true; }
      }
      out.appendChild(node);
    });
    return out;
  }

  window.DMRender = {
    renderInline: renderInline,
    renderBlock: renderBlock,
    renderScene: renderScene,
    spellUrl: spellUrl,
    itemUrl: itemUrl,
    bestiaryUrl: bestiaryUrl,
    el: el
  };
})();
