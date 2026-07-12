# -*- coding: utf-8 -*-
"""
Zamienia obraz na grafikę znakową i zapisuje assets/ascii.js

    pip install Pillow
    python tools/ascii.py

DLACZEGO BLOKI, A NIE ".:-=+*#"
Znaki interpunkcyjne to cienkie kreski — przy małym stopniu pisma rozmywają
się w szarość i rysunek staje się miękki. Znaki blokowe wypełniają całą
komórkę, więc działają jak piksele: zostają ostre nawet przy 5 px.
Skala " ░▒▓█" ma przy tym idealnie równe stopnie pokrycia (0/25/50/75/100%),
czego zestaw znaków ASCII nigdy nie ma.

DLACZEGO DITHERING
Pięć poziomów to mało. Dithering Floyda–Steinberga rozprasza błąd
zaokrąglenia na sąsiednie komórki, więc oko widzi płynne półtony —
tak samo, jak druk gazetowy robi szarość z samych czarnych punktów.

DLACZEGO NIE WYRÓWNUJEMY OŚWIETLENIA
„Rejtan” trzyma się światłocieniem: jasne postacie na ciemnym tle. Lokalne
wyrównanie kontrastu (clarity, CLAHE) spłaszcza to i zamienia obraz w szum.
"""
import io
import json
from PIL import Image, ImageOps, ImageEnhance, ImageFilter

SRC = 'assets/Reytan.jpg'
OUT = 'assets/ascii.js'

# od najjaśniejszego do najciemniejszego, równe stopnie pokrycia
RAMP = ' ░▒▓█'      # ' ', ░, ▒, ▓, █

# Proporcja komórki: wysokość / szerokość.
# Przy line-height:1 wysokość = stopień pisma, a szerokość znaku monospace
# to ok. 0.6 em — czyli 1 / 0.6. Pomyłka tutaj spłaszcza albo rozciąga obraz.
CHAR_ASPECT = 1.67

COLS_WIDE = 220        # ekran
COLS_NARROW = 110      # telefon

DETAIL = 120           # wyostrzenie przed zmniejszeniem

# Dwie krzywe tonalne, bo tryby nie są swoim lustrem.
# Jasny znak na ciemnym tle rozlewa się optycznie mocniej niż ciemny na białym
# (irradiacja), więc dosłownie odwrócona grafika wychodzi w nocy mleczna.
# Wersja nocna dostaje własną gammę i mocniejszy kontrast — dzięki temu
# półtony siadają, a świecą tylko realne światła obrazu.
# Uwaga na kierunek: tusz jest proporcjonalny do CIEMNOŚCI obrazu podanego do
# render(). W wariancie nocnym obraz jest już odwrócony, więc rozjaśnienie go
# (gamma < 1) UJMUJE tuszu — a o to chodzi: mniej świecących znaków na czerni.
GAMMA_LIGHT = 0.85     # mniej tuszu → jaśniejsza plansza na bieli
CONTRAST_LIGHT = 1.35

GAMMA_DARK = 0.60      # mniej tuszu → ciemniejsza plansza na czerni
CONTRAST_DARK = 1.60


def prepare(img):
    g = img.convert('L')
    g = ImageOps.autocontrast(g, cutoff=1)
    return g.filter(ImageFilter.UnsharpMask(radius=3, percent=DETAIL, threshold=1))


def render(base, cols, gamma, contrast, invert):
    w, h = base.size
    rows = max(1, int(round(cols * (h / w) / CHAR_ASPECT)))

    g = base.resize((cols, rows), Image.LANCZOS)

    # Dla trybu ciemnego odwracamy ŹRÓDŁO, a nie gotowe znaki: wtedy gęstość
    # znaku znaczy „dużo światła”, więc jasny tusz na ciemnym tle daje pozytyw.
    if invert:
        g = ImageOps.invert(g)

    g = ImageOps.autocontrast(g, cutoff=2)
    g = ImageEnhance.Contrast(g).enhance(contrast)
    g = g.point(lambda v: int(255.0 * ((v / 255.0) ** gamma)))

    # jasność 0..1 w siatce znaków
    px = g.load()
    grid = [[px[x, y] / 255.0 for x in range(cols)] for y in range(rows)]

    steps = len(RAMP) - 1
    out = []

    for y in range(rows):
        line = [' '] * cols

        # Wężykiem: co drugi wiersz idziemy od prawej. Dithering zawsze
        # w jedną stronę zostawia pionowe „robaki” w gładkich partiach.
        rtl = (y % 2 == 1)
        xs = range(cols - 1, -1, -1) if rtl else range(cols)
        ahead = -1 if rtl else 1

        for x in xs:
            value = min(1.0, max(0.0, grid[y][x]))
            level = int(round(value * steps))       # 0 = czarny .. steps = biały
            line[x] = RAMP[steps - level]           # RAMP idzie od jasnych
            err = value - (level / steps)

            nx = x + ahead
            if 0 <= nx < cols:
                grid[y][nx] += err * 7 / 16
            if y + 1 < rows:
                if 0 <= x - ahead < cols:
                    grid[y + 1][x - ahead] += err * 3 / 16
                grid[y + 1][x] += err * 5 / 16
                if 0 <= nx < cols:
                    grid[y + 1][nx] += err * 1 / 16

        out.append(''.join(line).rstrip().ljust(cols))

    return '\n'.join(out)


def main():
    base = prepare(Image.open(SRC))

    def art(cols, dark):
        return json.dumps(render(
            base, cols,
            GAMMA_DARK if dark else GAMMA_LIGHT,
            CONTRAST_DARK if dark else CONTRAST_LIGHT,
            invert=dark,
        ))

    js = (
        '/* Wygenerowane przez tools/ascii.py z %s (Jan Matejko, "Rejtan").\n'
        '   NIE EDYTUJ RECZNIE - uruchom: python tools/ascii.py\n'
        '\n'
        '   Dwa warianty, bo tryby nie sa swoim lustrem: jasny znak na ciemnym\n'
        '   tle rozlewa sie optycznie mocniej niz ciemny na bialym. Wariant\n'
        '   nocny powstaje z ODWROCONEGO obrazu i ma wlasna krzywa tonalna,\n'
        '   dzieki czemu w obu trybach obraz jest pozytywem.\n'
        '   Podpis [ENTELECHIA] wstawia site.js przy rysowaniu. */\n'
        'window.ASCII = {\n'
        '  light: { wide: %s,\n'
        '           narrow: %s },\n'
        '  dark:  { wide: %s,\n'
        '           narrow: %s }\n'
        '};\n'
    ) % (
        SRC,
        art(COLS_WIDE, False),
        art(COLS_NARROW, False),
        art(COLS_WIDE, True),
        art(COLS_NARROW, True),
    )

    with io.open(OUT, 'w', encoding='utf-8', newline='\n') as f:
        f.write(js)

    print('zapisano %s  (%d / %d kolumn, wariant jasny i ciemny)'
          % (OUT, COLS_WIDE, COLS_NARROW))


if __name__ == '__main__':
    main()
