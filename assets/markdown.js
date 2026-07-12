/* =====================================================================
   entelechia — markdown.js
   Mikro-parser Markdown + frontmatter. Zero zależności, zero CDN.
   Obsługuje: nagłówki, akapity, cytaty, listy (także zagnieżdżone),
   bloki kodu, linie poziome, obrazy (z podpisem), linki, pogrubienia,
   kursywę, przekreślenia, kod w linii i przypisy dolne [^1].
   ===================================================================== */
(function (root) {
  'use strict';

  const NUL = '\u0000';

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const attr = (s) => esc(s).replace(/"/g, '&quot;');

  const safeUrl = (u) => (/^\s*javascript:/i.test(u) ? '#' : String(u).trim());

  /* ---------- frontmatter ------------------------------------------ */

  function frontmatter(raw) {
    const text = String(raw).replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
    const m = /^---[ \t]*\n([\s\S]*?)\n---[ \t]*\n?/.exec(text);
    if (!m) return { meta: {}, body: text };

    const meta = {};
    for (const line of m[1].split('\n')) {
      const kv = /^([A-Za-z0-9_-]+)[ \t]*:[ \t]*(.*)$/.exec(line.trim());
      if (!kv) continue;
      let v = kv[2].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
        v = v.slice(1, -1);
      }
      if (v === 'true') v = true;
      else if (v === 'false') v = false;
      meta[kv[1].toLowerCase()] = v;
    }
    return { meta, body: text.slice(m[0].length) };
  }

  /* ---------- liczenie słów ----------------------------------------- */

  function countWords(body) {
    const plain = String(body)
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/`[^`]*`/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')      // obrazy nie liczą się jako słowa
      .replace(/\[\^[^\]]+\]:?/g, ' ')            // znaczniki przypisów
      .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');   // z linku zostaje sam tekst
    const found = plain.match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu);
    return found ? found.length : 0;
  }

  /* ---------- markdown ---------------------------------------------- */

  function markdown(src, resolveSrc) {
    const ctx = {
      resolve: typeof resolveSrc === 'function' ? resolveSrc : (s) => s,
      notes: new Map(),
      order: []
    };

    const all = String(src).replace(/\r\n?/g, '\n').split('\n');

    // 1. definicje przypisów: [^1]: treść
    const lines = [];
    for (let i = 0; i < all.length; i++) {
      const def = /^\[\^([^\]]+)\]:[ \t]*(.*)$/.exec(all[i]);
      if (!def) { lines.push(all[i]); continue; }
      const buf = [def[2]];
      while (i + 1 < all.length && all[i + 1].trim() && !/^\[\^[^\]]+\]:/.test(all[i + 1])) {
        buf.push(all[++i].trim());
      }
      ctx.notes.set(def[1], buf.join(' ').trim());
    }

    // 2. treść
    let html = blocks(lines, ctx);

    // 3. przypisy — numerowane w kolejności pierwszego użycia w tekście
    const used = ctx.order.slice();
    if (used.length) {
      const items = used.map((id) =>
        `<li id="fn-${attr(id)}">${inline(ctx.notes.get(id) || '', ctx)}` +
        ` <a class="fn-back" href="#fnref-${attr(id)}" aria-label="Wróć do tekstu">↩</a></li>`
      ).join('');
      html += `\n<section class="footnotes"><ol>${items}</ol></section>`;
    }
    return html;
  }

  const BLANK = (s) => !s.trim();

  const RE_FENCE = /^[ \t]{0,3}(`{3,}|~{3,})[ \t]*([\w-]*)[ \t]*$/;
  const RE_HEAD = /^[ \t]{0,3}(#{1,6})[ \t]+(.*?)[ \t]*#*[ \t]*$/;
  const RE_RULE = /^[ \t]{0,3}(-{3,}|\*{3,}|_{3,})[ \t]*$/;
  const RE_QUOTE = /^[ \t]{0,3}>/;
  const RE_ITEM = /^([ \t]*)([-*+]|\d+[.)])[ \t]+(.*)$/;

  const startsBlock = (s) =>
    RE_FENCE.test(s) || RE_HEAD.test(s) || RE_RULE.test(s) || RE_QUOTE.test(s) || RE_ITEM.test(s);

  function blocks(lines, ctx) {
    const out = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      if (BLANK(line)) { i++; continue; }

      // ``` blok kodu ```
      let m = RE_FENCE.exec(line);
      if (m) {
        const mark = m[1][0] === '`' ? '`' : '~';
        const close = new RegExp('^[ \\t]{0,3}' + mark + '{' + m[1].length + ',}[ \\t]*$');
        const lang = m[2];
        const buf = [];
        i++;
        while (i < lines.length && !close.test(lines[i])) buf.push(lines[i++]);
        i++; // zamykający płotek
        out.push(`<pre><code${lang ? ` class="lang-${attr(lang)}"` : ''}>${esc(buf.join('\n'))}</code></pre>`);
        continue;
      }

      // # nagłówek
      m = RE_HEAD.exec(line);
      if (m) {
        const lvl = m[1].length;
        out.push(`<h${lvl}>${inline(m[2], ctx)}</h${lvl}>`);
        i++;
        continue;
      }

      // --- linia pozioma
      if (RE_RULE.test(line)) { out.push('<hr>'); i++; continue; }

      // > cytat
      if (RE_QUOTE.test(line)) {
        const buf = [];
        while (i < lines.length && !BLANK(lines[i])) {
          buf.push(lines[i].replace(/^[ \t]{0,3}>[ \t]?/, ''));
          i++;
        }
        out.push(`<blockquote>${blocks(buf, ctx)}</blockquote>`);
        continue;
      }

      // - lista  /  1. lista
      if (RE_ITEM.test(line)) {
        const r = list(lines, i, ctx);
        out.push(r.html);
        i = r.next;
        continue;
      }

      // akapit
      const buf = [];
      while (i < lines.length && !BLANK(lines[i]) && !startsBlock(lines[i])) buf.push(lines[i++]);
      out.push(paragraph(buf, ctx));
    }

    return out.join('\n');
  }

  function paragraph(buf, ctx) {
    const html = inline(buf.join('\n'), ctx).replace(/(?:[ \t]{2,}|\\)\n/g, '<br>\n');

    // akapit będący wyłącznie obrazem → <figure>, a tekst alternatywny staje się podpisem
    const solo = html.trim();
    if (/^<img\s[^>]*>$/.test(solo)) {
      const alt = /alt="([^"]*)"/.exec(solo);
      // sam numer w nawiasie kwadratowym to szerokość z Obsidiana, nie podpis
      const text = alt && alt[1].trim();
      const caption = text && !/^\d+$/.test(text) ? `<figcaption>${text}</figcaption>` : '';
      return `<figure>${solo}${caption}</figure>`;
    }
    return `<p>${html}</p>`;
  }

  function list(lines, start, ctx) {
    const first = RE_ITEM.exec(lines[start]);
    const ordered = /\d/.test(first[2]);
    const indent = first[1].length;
    const items = [];
    let i = start;
    let loose = false;

    while (i < lines.length) {
      const m = RE_ITEM.exec(lines[i]);
      if (!m || m[1].length !== indent || /\d/.test(m[2]) !== ordered) break;

      const item = [m[3]];
      i++;

      while (i < lines.length) {
        const line = lines[i];

        if (BLANK(line)) {
          // pusta linia kończy listę, chyba że dalej jest wcięta treść tego samego punktu
          let j = i;
          while (j < lines.length && BLANK(lines[j])) j++;
          const deeper = j < lines.length && /^[ \t]+\S/.test(lines[j]) &&
            /^([ \t]*)/.exec(lines[j])[1].length > indent;
          if (!deeper) break;
          item.push('');
          loose = true;
          i++;
          continue;
        }

        const width = /^([ \t]*)/.exec(line)[1].length;
        const isItem = RE_ITEM.test(line);

        if (isItem && width <= indent) break;                                      // następny punkt
        if (!isItem && width <= indent) { item.push(line.trim()); i++; continue; } // kontynuacja zdania
        item.push(line.slice(Math.min(width, indent + 2)));                        // zagnieżdżenie
        i++;
      }

      items.push(item);
    }

    const tag = ordered ? 'ol' : 'ul';
    const html = items.map((item) => {
      let inner = blocks(item, ctx);
      // lista „zwarta” — pojedynczy akapit bez <p>
      if (!loose && /^<p>[\s\S]*<\/p>$/.test(inner) && inner.indexOf('<p>', 1) === -1) {
        inner = inner.slice(3, -4);
      }
      return `<li>${inner}</li>`;
    }).join('');

    return { html: `<${tag}>${html}</${tag}>`, next: i };
  }

  function inline(src, ctx) {
    // kod w linii chowamy przed resztą parsera
    const code = [];
    let s = String(src).replace(/(`+)([\s\S]*?)\1/g, (_, ticks, body) => {
      code.push(body);
      return NUL + (code.length - 1) + NUL;
    });

    s = esc(s);

    // ![opis](obraz.png "tytuł")
    // adres może zawierać nawiasy — np. .../wiki/Metafizyka_(Arystoteles)
    s = s.replace(
      /!\[([^\]]*)\]\([ \t]*((?:[^\s()]|\([^\s()]*\))+)(?:[ \t]+"([^"]*)")?[ \t]*\)/g,
      (_, alt, url, title) =>
        `<img src="${attr(ctx.resolve(url))}" alt="${attr(alt)}"` +
        `${title ? ` title="${attr(title)}"` : ''} loading="lazy">`
    );

    // przypis [^1]
    s = s.replace(/\[\^([^\]]+)\]/g, (all, id) => {
      if (!ctx.notes.has(id)) return all;
      let n = ctx.order.indexOf(id);
      if (n === -1) { ctx.order.push(id); n = ctx.order.length - 1; }
      return `<sup class="fn"><a id="fnref-${attr(id)}" href="#fn-${attr(id)}">${n + 1}</a></sup>`;
    });

    // [tekst](adres)
    s = s.replace(
      /\[([^\]]+)\]\([ \t]*((?:[^\s()]|\([^\s()]*\))+)(?:[ \t]+"([^"]*)")?[ \t]*\)/g,
      (_, text, href, title) => {
        const external = /^(https?:)?\/\//i.test(href) || /^mailto:/i.test(href);
        return `<a href="${attr(safeUrl(href))}"${title ? ` title="${attr(title)}"` : ''}` +
          `${external ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
      }
    );

    // <https://…>
    s = s.replace(/&lt;((?:https?:\/\/|mailto:)[^\s>]+)&gt;/g,
      (_, u) => `<a href="${attr(u)}" target="_blank" rel="noopener">${u}</a>`);

    s = s
      .replace(/\*\*\*([\s\S]+?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__([\s\S]+?)__/g, '<strong>$1</strong>')
      .replace(/(^|[\s(["'—–])\*(?=\S)([\s\S]*?\S)\*(?![*\w])/g, '$1<em>$2</em>')
      .replace(/(^|[\s(["'—–])_(?=\S)([\s\S]*?\S)_(?![_\w])/g, '$1<em>$2</em>')
      .replace(/~~([\s\S]+?)~~/g, '<del>$1</del>');

    // z powrotem kod w linii
    s = s.replace(new RegExp(NUL + '(\\d+)' + NUL, 'g'), (_, n) => `<code>${esc(code[+n])}</code>`);

    return s;
  }

  root.MD = { frontmatter, markdown, countWords, esc, attr };
})(typeof globalThis !== 'undefined' ? globalThis : this);
