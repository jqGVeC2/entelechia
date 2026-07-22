/* =====================================================================
   entelechia — ticker.js
   Pasek pod ASCII: zdania jadą z prawej do lewej, jedno za drugim,
   w kółko. Taśma jest zapętlona bez szwu — kolejne komplety zdań
   dokładamy tak, żeby nigdy nie było pustego miejsca.
   ===================================================================== */
(() => {
  'use strict';

  /* ======================= TREŚĆ PASKA ===============================
   * Tutaj wpisujesz, co ma jechać. Kolejność jest zachowana, zdania
   * idą jedno po drugim i wracają od początku. Można dopisywać i kasować
   * do woli — reszta sama się przelicza.                                */
  const ZDANIA = [
    'Blogspot Entelechia powstał po to, żeby być - dasein.',
    'Czacie, właśnie zmieniłem twoją wersję na Pro. Czy możesz mi wyjaśnić poprzednie zagadnienie?'
  ];

  /* Znak rozdzielający zdania i tempo przesuwu (piksele na sekundę).
   * 30–45 czyta się spokojnie; powyżej 60 robi się jarmark.            */
  const ZNAK = '✳';
  const PREDKOSC = 60;
  const CO_ILE = 4000;   // przy zredukowanym ruchu: ms na jedno zdanie

  /* =================================================================== */

  const bar = document.getElementById('ticker');
  if (!bar) return;

  const zdania = ZDANIA.map((z) => String(z).trim()).filter(Boolean);
  if (!zdania.length) { bar.hidden = true; return; }

  const spokojnie = window.matchMedia('(prefers-reduced-motion: reduce)');

  let sprzataj = null;   // funkcja gasząca bieżący tryb

  /* ---------- taśma ---------------------------------------------------- */

  // Jeden komplet zdań. Klony są niewidzialne dla czytników ekranu —
  // treść ma zostać przeczytana raz, nie tyle razy, ile jej leży na taśmie.
  function komplet(klon) {
    const run = document.createElement('div');
    run.className = 'ticker-run';
    if (klon) run.setAttribute('aria-hidden', 'true');

    zdania.forEach((z) => {
      const tekst = document.createElement('span');
      tekst.className = 'ticker-item';
      tekst.textContent = z;
      run.appendChild(tekst);

      const znak = document.createElement('span');
      znak.className = 'ticker-mark';
      znak.setAttribute('aria-hidden', 'true');
      znak.textContent = ZNAK;
      run.appendChild(znak);
    });

    return run;
  }

  function przesuw() {
    bar.dataset.mode = 'scroll';

    const track = document.createElement('div');
    track.className = 'ticker-track';
    track.appendChild(komplet(false));
    bar.appendChild(track);

    let szer = 0;      // szerokość jednego kompletu — o tyle się zapętlamy
    let x = 0;
    let ostatnia = 0;
    let raf = 0;

    // Stoimy pod kursorem, przy zaznaczaniu tekstu, na nieaktywnej karcie
    // i wtedy, gdy pasek zjechał z ekranu.
    const wstrzymane = new Set();
    const stop = (co, tak) => { tak ? wstrzymane.add(co) : wstrzymane.delete(co); };

    function ulozTasme() {
      while (track.children.length > 1) track.lastElementChild.remove();

      szer = track.firstElementChild.getBoundingClientRect().width;
      if (!szer) return;

      // tyle kompletów, żeby po zapętleniu taśma wciąż zakrywała cały pasek
      const ile = Math.ceil(bar.clientWidth / szer) + 1;
      for (let i = track.children.length; i < ile; i++) track.appendChild(komplet(true));

      x = 0;
      track.style.transform = 'translate3d(0,0,0)';
    }

    function klatka(t) {
      raf = requestAnimationFrame(klatka);

      if (wstrzymane.size || !szer) { ostatnia = t; return; }
      if (!ostatnia) ostatnia = t;

      const dt = Math.min((t - ostatnia) / 1000, 0.05);  // po powrocie z tła nie skacz
      ostatnia = t;

      x -= PREDKOSC * dt;
      if (x <= -szer) x += szer;
      track.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
    }

    let zwloka;
    const naZmianeRozmiaru = () => {
      clearTimeout(zwloka);
      zwloka = setTimeout(ulozTasme, 120);
    };

    const naWidocznosc = () => stop('karta', document.hidden);
    const wejscie = () => stop('kursor', true);
    const wyjscie = () => stop('kursor', false);

    bar.addEventListener('pointerenter', wejscie);
    bar.addEventListener('pointerleave', wyjscie);
    bar.addEventListener('focusin', wejscie);
    bar.addEventListener('focusout', wyjscie);
    document.addEventListener('visibilitychange', naWidocznosc);
    window.addEventListener('resize', naZmianeRozmiaru);

    let obserwator = null;
    if ('IntersectionObserver' in window) {
      obserwator = new IntersectionObserver(
        ([wpis]) => stop('ekran', !wpis.isIntersecting)
      );
      obserwator.observe(bar);
    }

    ulozTasme();
    // szeryfy dojeżdżają później niż pierwszy pomiar — po nich mierzymy jeszcze raz
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(ulozTasme);
    raf = requestAnimationFrame(klatka);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(zwloka);
      if (obserwator) obserwator.disconnect();
      bar.removeEventListener('pointerenter', wejscie);
      bar.removeEventListener('pointerleave', wyjscie);
      bar.removeEventListener('focusin', wejscie);
      bar.removeEventListener('focusout', wyjscie);
      document.removeEventListener('visibilitychange', naWidocznosc);
      window.removeEventListener('resize', naZmianeRozmiaru);
      track.remove();
    };
  }

  /* ---------- bez ruchu: zdania zmieniają się w miejscu ------------------ */

  function przemiennie() {
    bar.dataset.mode = 'fade';

    const solo = document.createElement('p');
    solo.className = 'ticker-solo';
    solo.textContent = zdania[0];
    bar.appendChild(solo);

    let i = 0;
    let sciemnianie;
    const zegar = setInterval(() => {
      solo.classList.add('is-out');
      sciemnianie = setTimeout(() => {
        i = (i + 1) % zdania.length;
        solo.textContent = zdania[i];
        solo.classList.remove('is-out');
      }, 500);
    }, CO_ILE);

    return () => {
      clearInterval(zegar);
      clearTimeout(sciemnianie);
      solo.remove();
    };
  }

  /* ---------- start ------------------------------------------------------ */

  function uruchom() {
    if (sprzataj) sprzataj();
    sprzataj = spokojnie.matches ? przemiennie() : przesuw();
  }

  uruchom();

  if (spokojnie.addEventListener) spokojnie.addEventListener('change', uruchom);
  else if (spokojnie.addListener) spokojnie.addListener(uruchom);
})();
