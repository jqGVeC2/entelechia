# -*- coding: utf-8 -*-
"""Zamienia obraz z assets/obrazy/ na grafikę znakową i zapisuje assets/ascii.js

    conda activate entelechia-memetyka
    python tools/ascii.py

Cała robota siedzi w paczce ``asciiart`` (repozytorium entelechia-memetyka) —
tu jest tylko spięcie jej z katalogiem assets i formatem, którego oczekuje
assets/site.js. Nie dopisuj tutaj logiki konwersji; jeśli czegoś brakuje,
miejscem na to jest paczka.

Co skąd:
    assets/obrazy/obrazy.json   katalog obrazów + ustawienia
    assets/obrazy/*.jpg         pliki źródłowe
    assets/ascii.js             wynik dla obrazu oznaczonego jako "aktywny"
    assets/obrazy_ascii/*.png   podglądy, żeby ocenić efekt bez odpalania strony

DLACZEGO ZNAKI BLOKOWE
Znaki blokowe z U+2580–259F są definicją geometryczną, nie krojem: ``▘`` to
w każdym foncie dokładnie lewa górna ćwiartka komórki. Strona nie wie, jaki
monospace dostanie użytkownik (``ui-monospace`` to co innego na Macu, co
innego na Windowsie), więc każdy inny zestaw znaczyłby, że gęstości mierzymy
na jednym foncie, a przeglądarka renderuje innym — i tony się rozjeżdżają.
Przy okazji ćwiartki dają komórce cztery podpola, czyli czterokrotnie większą
rozdzielczość niż samo ``░▒▓█``, a zostają pełne przy 3 px, w odróżnieniu od
interpunkcji, która zlewa się w szarość.

DLACZEGO NISKA OSTROŚĆ (0.06)
Człon kształtu ma tylko rozstrzygać remisy między znakami o zbliżonej
gęstości. Podbity wyżej sprawia, że ``▌``/``▐`` wygrywają wszędzie, bo prawie
każdy fragment obrazu ma jakiś gradient lewo-prawo, i obraz pokrywa się
plecionką pionowych belek.

DLACZEGO DWA WARIANTY TONALNE
Jasny znak na ciemnym tle rozlewa się optycznie mocniej niż ciemny na białym
(irradiacja), więc dosłownie odwrócona grafika wychodzi w nocy mleczna.
Wariant nocny ma własną gammę.
"""

from __future__ import annotations

import argparse
import io
import json
import os
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OBRAZY = os.path.join(REPO, "assets", "obrazy")
KATALOG = os.path.join(OBRAZY, "obrazy.json")
WYNIK = os.path.join(REPO, "assets", "ascii.js")
PODGLADY = os.path.join(REPO, "assets", "obrazy_ascii")

# Proporcja komórki znaku w przeglądarce: przy line-height:1 wysokość to
# stopień pisma, a szerokość monospace ok. 0.6 em. Pomyłka tutaj spłaszcza
# albo rozciąga obraz.
PROPORCJA = 0.6
KOMORKA = (12, 20)          # raster glifu; 12/20 = 0.6, zgadza się z powyższym
POOL = (4, 4)               # rozdzielczość sygnatury kształtu


def _wczytaj_paczke() -> None:
    """Importuje asciiart; podpowiada co zrobić, jeśli go nie ma."""
    try:
        import asciiart                                    # noqa: F401
        return
    except ImportError:
        pass
    # tryb deweloperski: repozytorium obok tego
    obok = os.path.join(os.path.dirname(REPO), "entelechia-memetyka")
    if os.path.isdir(os.path.join(obok, "asciiart")):
        sys.path.insert(0, obok)
        try:
            import asciiart                                # noqa: F401
            return
        except ImportError:
            pass
    sys.exit(
        "Nie znaleziono paczki 'asciiart'.\n"
        "  conda activate entelechia-memetyka\n"
        "  pip install -e ../entelechia-memetyka\n"
        "albo trzymaj repozytorium entelechia-memetyka obok tego."
    )


_wczytaj_paczke()

from asciiart import Options, convert                       # noqa: E402
from asciiart.export import to_image                        # noqa: E402


def katalog() -> dict:
    with io.open(KATALOG, encoding="utf-8") as f:
        return json.load(f)


def znajdz(dane: dict, slug: str) -> dict:
    for o in dane["obrazy"]:
        if o["slug"] == slug:
            return o
    dostepne = ", ".join(o["slug"] for o in dane["obrazy"])
    sys.exit("Brak obrazu '%s' w obrazy.json. Dostępne: %s" % (slug, dostepne))


def opcje(obraz: dict, ust: dict, kolumny: int, ciemny: bool) -> Options:
    klucz_gamma = "gamma_ciemny" if ciemny else "gamma_jasny"
    return Options(
        cols=kolumny,
        cell_aspect=PROPORCJA,
        charset=obraz.get("zestaw", ust["zestaw"]),
        font="bloki",
        cell=KOMORKA,
        pool=POOL,
        sharpness=obraz.get("ostrosc", ust["ostrosc"]),
        autolevels=obraz.get("poziomy", ust["poziomy"]),
        gamma=obraz.get(klucz_gamma, ust[klucz_gamma]),
        on_dark=ciemny,
        # Strona rysuje jednym kolorem (var(--ink)), więc kolor wyłączamy.
        # 'value' ustawiamy pod podgląd PNG, żeby odpowiadał temu, co widać
        # na stronie: prawie czarny tusz na bieli, prawie biały na czerni.
        saturation=0.0,
        value=0.92 if ciemny else 0.10,
        color_merge=0.0,
    )


def zbuduj(obraz: dict, ust: dict) -> dict:
    zrodlo = os.path.join(OBRAZY, obraz["plik"])
    if not os.path.exists(zrodlo):
        sys.exit("Brak pliku źródłowego: %s" % zrodlo)

    warianty: dict[str, dict[str, str]] = {}
    podglad = {}
    for ciemny in (False, True):
        klucz = "dark" if ciemny else "light"
        warianty[klucz] = {}
        for nazwa, kolumny in (("wide", ust["kolumny_szerokie"]),
                               ("narrow", ust["kolumny_waskie"])):
            wynik = convert(zrodlo, opcje(obraz, ust, kolumny, ciemny))
            warianty[klucz][nazwa] = wynik.text
            if nazwa == "wide":
                podglad[klucz] = wynik

    os.makedirs(PODGLADY, exist_ok=True)
    for klucz, wynik in podglad.items():
        sciezka = os.path.join(PODGLADY, "%s-%s.png" % (obraz["slug"], klucz))
        to_image(wynik, padding=8).save(sciezka)

    siatka = podglad["light"]
    print("  %-14s %d x %d znaków (szeroki)" % (obraz["slug"], siatka.cols, siatka.rows))
    return warianty


def zapisz(obraz: dict, warianty: dict) -> None:
    opis = "%s, „%s”" % (obraz["autor"], obraz["tytul"])
    if obraz.get("rok"):
        opis += ", %s" % obraz["rok"]

    meta = {
        "slug": obraz["slug"],
        "autor": obraz["autor"],
        "tytul": obraz["tytul"],
        "rok": obraz.get("rok"),
        "zbiory": obraz.get("zbiory"),
        "opis": opis + ", w znakach",
    }

    js = (
        "/* WYGENEROWANE — NIE EDYTUJ RĘCZNIE.\n"
        "   Źródło: assets/obrazy/%s\n"
        "   Odtworzenie: conda activate entelechia-memetyka && python tools/ascii.py\n"
        "   Katalog obrazów i ustawienia: assets/obrazy/obrazy.json\n"
        "\n"
        "   Dwa warianty tonalne, bo tryby nie są swoim lustrem: jasny znak na\n"
        "   ciemnym tle rozlewa się optycznie mocniej niż ciemny na białym.\n"
        "   Podpis [ENTELECHIA] wstawia site.js przy rysowaniu. */\n"
        "window.ASCII = {\n"
        "  meta:  %s,\n"
        "  light: { wide: %s,\n"
        "           narrow: %s },\n"
        "  dark:  { wide: %s,\n"
        "           narrow: %s }\n"
        "};\n"
    ) % (
        obraz["plik"],
        json.dumps(meta, ensure_ascii=False),
        json.dumps(warianty["light"]["wide"], ensure_ascii=False),
        json.dumps(warianty["light"]["narrow"], ensure_ascii=False),
        json.dumps(warianty["dark"]["wide"], ensure_ascii=False),
        json.dumps(warianty["dark"]["narrow"], ensure_ascii=False),
    )

    with io.open(WYNIK, "w", encoding="utf-8", newline="\n") as f:
        f.write(js)
    print("zapisano assets/ascii.js  (%s)" % opis)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    ap.add_argument("slug", nargs="?",
                    help="który obraz (domyślnie 'aktywny' z obrazy.json)")
    ap.add_argument("--wszystkie", action="store_true",
                    help="wygeneruj podglądy dla wszystkich obrazów z katalogu")
    ap.add_argument("--lista", action="store_true", help="wypisz katalog i wyjdź")
    args = ap.parse_args(argv)

    dane = katalog()
    ust = dane["domyslne"]

    if args.lista:
        for o in dane["obrazy"]:
            gwiazdka = "*" if o["slug"] == dane["aktywny"] else " "
            print("%s %-14s %s — %s (%s)"
                  % (gwiazdka, o["slug"], o["autor"], o["tytul"], o.get("rok", "?")))
        return 0

    if args.wszystkie:
        for o in dane["obrazy"]:
            zbuduj(o, ust)

    obraz = znajdz(dane, args.slug or dane["aktywny"])
    zapisz(obraz, zbuduj(obraz, ust))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
