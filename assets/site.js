/* =====================================================================
   entelechia — site.js
   Wszystko dzieje się w przeglądarce: wczytuje posts/posts.json,
   pobiera pliki .md, czyta frontmatter, liczy słowa, składa strony.
   ===================================================================== */
(() => {
  'use strict';

  /* ======================= KONFIGURACJA ============================== *
   * Jedyne miejsce, które trzeba tu zmienić.                            */
  const SITE = {
    x: 'https://x.com/entelechia___',
    manifest: 'posts/posts.json'
  };
  /* =================================================================== */

  const { frontmatter, markdown, countWords } = window.MD;

  const $ = (sel, root = document) => root.querySelector(sel);

  /* ---------- daty i liczby (po polsku) ------------------------------ */

  const MIESIACE = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
    'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];

  function parseDate(value) {
    if (!value) return null;
    const m = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(String(value).trim());
    if (!m) return null;
    const d = new Date(+m[1], +m[2] - 1, +m[3]);
    return isNaN(d.getTime()) ? null : d;
  }

  const pad = (n) => String(n).padStart(2, '0');

  const dateShort = (d) =>
    d ? `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}` : '—';

  const dateLong = (d) =>
    d ? `${d.getDate()} ${MIESIACE[d.getMonth()]} ${d.getFullYear()}` : '—';

  // słowo / słowa / słów
  function odmiana(n, one, few, many) {
    if (n === 1) return one;
    const d10 = n % 10;
    const d100 = n % 100;
    return (d10 >= 2 && d10 <= 4 && !(d100 >= 12 && d100 <= 14)) ? few : many;
  }

  const slowa = (n) =>
    `${n.toLocaleString('pl-PL')} ${odmiana(n, 'słowo', 'słowa', 'słów')}`;

  /* ---------- wczytywanie tekstów ------------------------------------ */

  // "1/2026-07-11-example.md"  →  id: "1",  plik: posts/1/2026-07-11-example.md
  // "example.md"               →  id: "example", plik: posts/example.md
  // { "id": "1", "file": "…" } →  to samo, tylko jawnie
  function normalize(entry, order) {
    let id, file, path;

    if (typeof entry === 'string') {
      const rel = entry.trim().replace(/^\/+/, '').replace(/^posts\//, '');
      if (!rel) return null;
      const slash = rel.indexOf('/');
      if (slash === -1) { id = rel.replace(/\.md$/i, ''); file = rel; }
      else { id = rel.slice(0, slash); file = rel.slice(slash + 1); }
      path = `posts/${rel}`;
    } else if (entry && typeof entry === 'object' && entry.file) {
      id = String(entry.id || '').trim();
      file = String(entry.file).trim();
      if (!id) return null;
      path = `posts/${id}/${file}`;
    } else {
      return null;
    }

    return { id, file, path, order };
  }

  // Obrazy. W markdownie wystarczy sama nazwa pliku — folder dokładamy tutaj.
  // Działa też pełna ścieżka, również ta z windowsowymi ukośnikami wstecznymi,
  // którą wkleja Obsidian: "posts\media\1\1.png".
  const mediaResolver = (id) => (src) => {
    const s = String(src).trim().replace(/\\/g, '/');
    if (!s) return s;
    if (/^(https?:)?\/\//i.test(s) || /^data:/i.test(s) || s.startsWith('/') || s.startsWith('#')) return s;
    if (s.startsWith('posts/')) return s;                        // pełna ścieżka od korzenia repo
    const clean = s.replace(/^\.\//, '').replace(/^media\//, ''); // "media/foo.png" też zadziała
    return `posts/media/${encodeURIComponent(id)}/${clean}`;
  };

  async function fetchPost(entry) {
    try {
      const res = await fetch(entry.path, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      const { meta, body } = frontmatter(await res.text());
      const date = parseDate(meta.date);

      return {
        ...entry,
        meta,
        body,
        date,
        time: date ? date.getTime() : 0,
        words: countWords(body),
        title: (meta.title || entry.id).toString(),
        author: (meta.author || '').toString(),
        url: `post.html?p=${encodeURIComponent(entry.id)}`
      };
    } catch (err) {
      console.warn(`[entelechia] pomijam ${entry.path}:`, err.message);
      return null;
    }
  }

  // Zwraca teksty w porządku chronologicznym (od najstarszego),
  // z numerem porządkowym `no` przypisanym na stałe do tekstu.
  async function loadPosts() {
    let manifest;
    try {
      const res = await fetch(SITE.manifest, { cache: 'no-store' });
      if (!res.ok) throw new Error(String(res.status));
      manifest = await res.json();
    } catch (err) {
      throw new Error('Nie udało się wczytać posts/posts.json');
    }

    const list = Array.isArray(manifest) ? manifest : (manifest.posts || []);
    const entries = list.map(normalize).filter(Boolean);

    const posts = (await Promise.all(entries.map(fetchPost)))
      .filter((p) => p && p.meta.published !== false);

    posts.sort((a, b) => (a.time - b.time) || (a.order - b.order));
    posts.forEach((p, i) => { p.no = i + 1; });
    return posts;
  }

  /* ---------- kawałki widoku ------------------------------------------ */

  const esc = (s) => String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const byline = (post) => post.author
    ? `<span class="sep">—</span> <span class="author">${esc(post.author)}</span>`
    : '';

  const fail = (el, msg) => { el.className = 'status'; el.textContent = msg; };

  /* ---------- strona główna -------------------------------------------- */

  function renderHome(posts, el) {
    if (!posts.length) return fail(el, 'Nie ma jeszcze żadnych tekstów.');

    const newest = posts.slice().reverse();
    el.className = '';
    el.innerHTML = `<ul class="index">${newest.map((p) => `
      <li><a href="${p.url}">${esc(p.title)}</a> ${byline(p)}</li>
    `).join('')}</ul>`;
  }

  /* ---------- wszystkie artykuły ---------------------------------------- */

  function renderArchive(posts, el, button) {
    if (!posts.length) {
      button.hidden = true;
      return fail(el, 'Nie ma jeszcze żadnych tekstów.');
    }

    let newestFirst = localStorage.getItem('entelechia:sort') !== 'asc';

    const draw = () => {
      const rows = newestFirst ? posts.slice().reverse() : posts.slice();

      el.className = '';
      el.innerHTML = `<ol class="archive">${rows.map((p) => `
        <li>
          <span class="no">${p.no}.</span>
          <div class="meta">
            <span>${dateShort(p.date)}</span>
            <span>${slowa(p.words)}</span>
          </div>
          <div><a class="title" href="${p.url}">${esc(p.title)}</a> ${byline(p)}</div>
        </li>
      `).join('')}</ol>`;

      // etykieta mówi, co się stanie po kliknięciu
      button.innerHTML = `<span class="arrow" aria-hidden="true">⇅</span>` +
        (newestFirst ? 'od najstarszych do najnowszych' : 'od najnowszych do najstarszych');
    };

    button.hidden = false;
    button.addEventListener('click', () => {
      newestFirst = !newestFirst;
      localStorage.setItem('entelechia:sort', newestFirst ? 'desc' : 'asc');
      draw();
    });

    draw();
  }

  /* ---------- pojedynczy tekst ------------------------------------------- */

  function renderPost(posts, el) {
    const id = new URLSearchParams(location.search).get('p');
    if (!id) return fail(el, 'Nie podano tekstu.');

    const i = posts.findIndex((p) => p.id === id);
    if (i === -1) {
      el.className = 'status';
      el.innerHTML = 'Nie ma takiego tekstu. <a href="artykuly.html">Wszystkie artykuły</a>';
      return;
    }

    const post = posts[i];
    const prev = posts[i - 1];   // starszy
    const next = posts[i + 1];   // nowszy

    document.title = `${post.title} — Entelechia`;

    const meta = [
      post.author && esc(post.author),
      dateLong(post.date),
      slowa(post.words)
    ].filter(Boolean).join('<span class="sep">·</span>');

    const link = (p, cls, label) => p
      ? `<a class="${cls}" href="${p.url}"><span class="label">${label}</span><span class="t">${esc(p.title)}</span></a>`
      : '';

    el.className = 'post';
    el.innerHTML = `
      <article>
        <h1 class="post-title">${esc(post.title)}</h1>
        <p class="post-meta">${meta}</p>
        <div class="prose">${markdown(post.body, mediaResolver(post.id))}</div>
      </article>
      <nav class="pager">
        ${link(prev, 'prev', '← poprzedni')}
        ${link(next, 'next', 'następny →')}
      </nav>`;

    renderMath(el);
  }

  // Wzory LaTeX w tekście: $...$ (w linii) i $$...$$ (blokowe).
  function renderMath(root) {
    if (!window.renderMathInElement) return;
    const prose = root.querySelector('.prose');
    if (!prose) return;
    window.renderMathInElement(prose, {
      delimiters: [
        { left: '$$', right: '$$', display: true },
        { left: '$', right: '$', display: false }
      ],
      throwOnError: false
    });
  }

  /* ---------- tryb jasny / ciemny ---------------------------------------- */

  const root = document.documentElement;
  const THEME_KEY = 'entelechia:theme';

  // bez wyboru użytkownika idziemy za ustawieniem systemu
  const theme = () => root.dataset.theme ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  function setTheme(next) {
    root.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* tryb prywatny */ }
    drawAscii();
  }

  /* ---------- obraz w znakach --------------------------------------------- */
  /* Który obraz i z jakimi ustawieniami — assets/obrazy/obrazy.json.
     Grafikę generuje tools/ascii.py paczką asciiart. */

  const LABEL = ' [ENTELECHIA] ';

  function drawAscii() {
    const pre = $('#ascii');
    if (!pre || !window.ASCII) return;

    const wrap = pre.parentElement;
    const width = wrap.clientWidth;
    if (!width) return;

    // Opis dla czytników ekranu bierzemy z generatora, żeby po zmianie obrazu
    // w obrazy.json nie zostawał w HTML-u opis poprzedniego.
    const meta = window.ASCII.meta;
    if (meta && meta.opis) pre.setAttribute('aria-label', meta.opis);

    // Osobne warianty na jasno i ciemno — nie jedna grafika odwracana w locie.
    // Tryby nie są swoim lustrem (patrz tools/ascii.py), a każdy wariant ma
    // własną krzywą tonalną, żeby w obu obraz był pozytywem.
    const set = window.ASCII[theme() === 'dark' ? 'dark' : 'light'];
    const lines = (width < 480 ? set.narrow : set.wide).split('\n');

    // podpis w prawym dolnym rogu
    const row = lines.length - 2;
    if (row >= 0) {
      const line = lines[row];
      const at = Math.max(0, line.length - LABEL.length - 2);
      lines[row] = line.slice(0, at) + LABEL + line.slice(at + LABEL.length);
    }

    pre.textContent = lines.join('\n');

    // Stopień pisma dobrany tak, żeby rysunek wypełnił kolumnę — ale zaokrąglony
    // do pełnych pikseli. Przy ułamkowym stopniu znaki blokowe nie stykają się
    // subpikselowo i przez czerń przebijają jasne pionowe szczeliny.
    pre.style.fontSize = '20px';
    const perPx = pre.scrollWidth / 20;          // szerokość rysunku na 1px stopnia
    pre.style.fontSize = Math.max(3, Math.floor(width / perPx)) + 'px';
  }

  /* ---------- start ------------------------------------------------------- */

  document.querySelectorAll('[data-x]').forEach((a) => { a.href = SITE.x; });

  const themeBtn = $('#theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => setTheme(theme() === 'dark' ? 'light' : 'dark'));
  }

  drawAscii();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawAscii, 120);
  });

  const page = document.body.dataset.page;
  const el = $('#content');
  if (!el) return;

  loadPosts()
    .then((posts) => {
      if (page === 'home') renderHome(posts, el);
      else if (page === 'archive') renderArchive(posts, el, $('#sort'));
      else if (page === 'post') renderPost(posts, el);
    })
    .catch((err) => {
      console.error('[entelechia]', err);
      fail(el, err.message || 'Coś poszło nie tak.');
    });
})();
