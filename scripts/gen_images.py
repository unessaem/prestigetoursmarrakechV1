#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Génère les illustrations provisoires (SVG) de public/images/.

Ces illustrations s'affichent tant que vous n'avez pas déposé votre
propre photo. Dès que public/images/<slug>.jpg existe, la photo
remplace automatiquement l'illustration (voir src/components/SmartImage.jsx).

Usage :  python3 scripts/gen_images.py
"""

import os
import math
import random

W, H = 1600, 1000
OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")


# ---------------------------------------------------------------- primitives

def grad(gid, stops, x1="0", y1="0", x2="0", y2="1"):
    s = "".join(
        f'<stop offset="{o}" stop-color="{c}"/>' for o, c in stops
    )
    return (
        f'<linearGradient id="{gid}" x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}">{s}</linearGradient>'
    )


def sun(cx, cy, r, color="#ffd9a0", glow="#ffb765"):
    return (
        f'<radialGradient id="g{cx}{cy}" cx="50%" cy="50%" r="50%">'
        f'<stop offset="0" stop-color="{glow}" stop-opacity=".55"/>'
        f'<stop offset="1" stop-color="{glow}" stop-opacity="0"/>'
        f"</radialGradient>"
        f'<circle cx="{cx}" cy="{cy}" r="{r * 4}" fill="url(#g{cx}{cy})"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}"/>'
    )


def stars(n, seed, ymax=460):
    random.seed(seed)
    out = []
    for _ in range(n):
        x = random.randint(20, W - 20)
        y = random.randint(20, ymax)
        r = random.choice([1.2, 1.6, 2.0, 2.6])
        o = random.uniform(0.35, 0.95)
        out.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" opacity="{o:.2f}"/>')
    return "".join(out)


def ridge(base, peaks, color, opacity=1.0, seed=1):
    """Crête de montagne : liste de (x, hauteur au-dessus de base)."""
    pts = [f"0,{base}"]
    for x, h in peaks:
        pts.append(f"{x},{base - h}")
    pts.append(f"{W},{base}")
    pts.append(f"{W},{H}")
    pts.append(f"0,{H}")
    return f'<polygon points="{" ".join(pts)}" fill="{color}" opacity="{opacity}"/>'


def dunes(base, amp, color, phase=0.0, opacity=1.0, step=40):
    pts = []
    x = 0
    while x <= W:
        y = base - amp * math.sin((x / W) * math.pi * 2.2 + phase) - amp * 0.4 * math.sin(
            (x / W) * math.pi * 5 + phase
        )
        pts.append(f"{x},{y:.0f}")
        x += step
    pts.append(f"{W},{H}")
    pts.append(f"0,{H}")
    return f'<polygon points="{" ".join(pts)}" fill="{color}" opacity="{opacity}"/>'


def palm(x, y, scale=1.0, trunk="#5a3b23", leaf="#2f5d3a"):
    s = scale
    o = [f'<path d="M{x} {y} q {6*s} {-60*s} {2*s} {-120*s}" stroke="{trunk}" '
         f'stroke-width="{9*s:.1f}" fill="none" stroke-linecap="round"/>']
    top_x, top_y = x + 2 * s, y - 120 * s
    for a in (-150, -118, -85, -60, -30, -5, 25):
        rad = math.radians(a)
        ex = top_x + math.cos(rad) * 78 * s
        ey = top_y + math.sin(rad) * 52 * s
        cx = top_x + math.cos(rad) * 44 * s
        cy = top_y + math.sin(rad) * 52 * s - 26 * s
        o.append(
            f'<path d="M{top_x:.0f} {top_y:.0f} Q {cx:.0f} {cy:.0f} {ex:.0f} {ey:.0f}" '
            f'stroke="{leaf}" stroke-width="{11*s:.1f}" fill="none" stroke-linecap="round"/>'
        )
    return "".join(o)


def camel(x, y, s=1.0, color="#3a2418"):
    """Dromadaire dessiné à partir de primitives simples."""
    return (
        f'<g transform="translate({x},{y}) scale({s})" fill="{color}">'
        '<ellipse cx="0" cy="0" rx="46" ry="23"/>'
        '<ellipse cx="-14" cy="-20" rx="20" ry="16"/>'
        '<ellipse cx="16" cy="-19" rx="17" ry="14"/>'
        '<path d="M38 -6 Q 56 -14 58 -46 Q 59 -58 52 -60 L46 -58 Q 50 -38 44 -22 Z"/>'
        '<ellipse cx="55" cy="-62" rx="12" ry="7"/>'
        '<rect x="-34" y="18" width="7" height="40" rx="3"/>'
        '<rect x="-18" y="18" width="7" height="40" rx="3"/>'
        '<rect x="14" y="18" width="7" height="40" rx="3"/>'
        '<rect x="28" y="18" width="7" height="40" rx="3"/>'
        '<path d="M-46 -4 q -16 4 -14 26" stroke="'
        f'{color}" stroke-width="5" fill="none" stroke-linecap="round"/>'
        "</g>"
    )


def tower(x, base, w, h, color, top="#e8d6b8"):
    """Minaret / tour carrée style Koutoubia."""
    return (
        f'<rect x="{x}" y="{base - h}" width="{w}" height="{h}" fill="{color}"/>'
        f'<rect x="{x - 6}" y="{base - h - 16}" width="{w + 12}" height="16" fill="{top}"/>'
        f'<rect x="{x + w * 0.3:.0f}" y="{base - h - 52}" width="{w * 0.4:.0f}" height="36" fill="{color}"/>'
        f'<circle cx="{x + w / 2:.0f}" cy="{base - h - 60}" r="7" fill="{top}"/>'
    )


def wall(y, color, holes="#00000022"):
    """Bande de remparts crénelés."""
    out = [f'<rect x="0" y="{y}" width="{W}" height="{H - y}" fill="{color}"/>']
    x = 0
    while x < W:
        out.append(f'<rect x="{x}" y="{y - 22}" width="34" height="22" fill="{color}"/>')
        x += 66
    return "".join(out)


def grain():
    # Volontairement vide : un filtre feTurbulence sur 13 images plein écran
    # coûte très cher à dessiner sur mobile, pour un grain à peine visible.
    return ""


def svg(defs, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" '
        f'height="{H}" preserveAspectRatio="xMidYMid slice">'
        f"<defs>{defs}</defs>{body}{grain()}</svg>"
    )


# ---------------------------------------------------------------- scènes

def sky(gid, stops):
    return grad(gid, stops), f'<rect width="{W}" height="{H}" fill="url(#{gid})"/>'


def scene_hero():
    d, b = sky("s", [("0", "#2a1a3d"), ("0.45", "#8d4a3c"), ("0.75", "#d4794a"), ("1", "#f0b074")])
    b += sun(1180, 560, 62)
    b += ridge(640, [(180, 150), (430, 250), (720, 180), (1050, 265), (1380, 165)], "#4a2b2c", 0.85)
    b += dunes(760, 46, "#b5703f", 0.4)
    b += dunes(860, 36, "#8d5430", 2.1)
    b += camel(740, 880, 1.15)
    b += camel(900, 905, 0.9)
    b += dunes(960, 24, "#6d3f24", 4.0)
    return svg(d, b)


def scene_agafay():
    d, b = sky("s", [("0", "#1b1733"), ("0.4", "#5e3350"), ("0.72", "#c06a4b"), ("1", "#efb878")])
    b += stars(70, 3, 360)
    b += sun(380, 600, 54)
    b += ridge(620, [(240, 210), (560, 130), (900, 230), (1260, 150)], "#3e2733", 0.9)
    b += dunes(730, 52, "#9c6442", 0.0)
    b += dunes(840, 40, "#7b4b2f", 2.4)
    b += camel(1080, 880, 1.2)
    b += camel(1250, 900, 0.95)
    b += dunes(950, 26, "#5e3722", 4.4)
    return svg(d, b)


def scene_ourika():
    d, b = sky("s", [("0", "#8ec5e8"), ("0.55", "#cfe6f2"), ("1", "#f4ead6")])
    b += sun(1260, 200, 52, "#fff3cf", "#ffe29b")
    b += ridge(560, [(200, 230), (520, 320), (860, 250), (1240, 300)], "#7d8f7a", 0.75)
    b += ridge(680, [(140, 160), (470, 210), (900, 150), (1330, 200)], "#55663f", 0.95)
    # rivière
    b += (
        '<path d="M760 700 C 700 790, 880 840, 800 1000 L1000 1000 C 1040 850, 900 790, '
        '960 700 Z" fill="#7fb8cf" opacity="0.9"/>'
    )
    b += f'<rect x="0" y="700" width="{W}" height="{H-700}" fill="#4d5c33" opacity="0.55"/>'
    b += (
        '<path d="M0 700 C 300 660, 520 740, 760 700 L760 1000 L0 1000 Z" fill="#3f5a2c"/>'
        '<path d="M960 700 C 1200 740, 1400 660, 1600 700 L1600 1000 L960 1000 Z" fill="#3f5a2c"/>'
    )
    b += palm(220, 820, 1.3)
    b += palm(1380, 850, 1.1)
    b += palm(1240, 800, 0.85)
    return svg(d, b)


def scene_atlas():
    d, b = sky("s", [("0", "#5e8fc4"), ("0.5", "#a9c9e2"), ("1", "#eadfc9")])
    b += sun(300, 190, 48, "#fffaf0", "#ffe9b8")
    b += ridge(620, [(230, 330), (600, 420), (1000, 350), (1420, 400)], "#8898ad", 0.7)
    # sommets enneigés
    b += (
        '<polygon points="600,200 660,290 540,290" fill="#ffffff" opacity="0.95"/>'
        '<polygon points="1000,270 1052,345 948,345" fill="#ffffff" opacity="0.9"/>'
        '<polygon points="230,290 282,360 178,360" fill="#ffffff" opacity="0.85"/>'
    )
    b += ridge(740, [(160, 210), (520, 270), (940, 200), (1340, 260)], "#5c6b52", 0.95)
    b += f'<rect x="0" y="740" width="{W}" height="{H-740}" fill="#4a5a39"/>'
    # village en terrasses
    for i, (x, y) in enumerate([(360, 790), (430, 806), (500, 782), (1120, 800), (1190, 784)]):
        b += f'<rect x="{x}" y="{y}" width="78" height="56" fill="#b8805a"/>'
        b += f'<rect x="{x}" y="{y-8}" width="78" height="10" fill="#8f5f3f"/>'
    b += palm(760, 940, 1.0)
    return svg(d, b)


def scene_ouzoud():
    d, b = sky("s", [("0", "#86b9dd"), ("0.6", "#c8e2ee"), ("1", "#eef1e0")])
    b += ridge(520, [(300, 170), (780, 120), (1240, 180)], "#8ba17f", 0.55)
    # falaise
    b += '<polygon points="0,420 560,420 620,1000 0,1000" fill="#9c6a45"/>'
    b += '<polygon points="1040,420 1600,420 1600,1000 980,1000" fill="#8a5c3c"/>'
    b += '<polygon points="560,420 1040,420 980,1000 620,1000" fill="#6d4630" opacity="0.25"/>'
    # cascades
    for x, w in ((640, 70), (730, 110), (860, 90), (960, 60)):
        b += (
            f'<rect x="{x}" y="430" width="{w}" height="470" fill="#eaf6fb" opacity="0.92" rx="{w/2:.0f}"/>'
        )
        b += f'<rect x="{x+w*0.25:.0f}" y="430" width="{w*0.3:.0f}" height="470" fill="#ffffff" opacity="0.7"/>'
    # vasque
    b += '<ellipse cx="800" cy="920" rx="330" ry="80" fill="#cfeaf2" opacity="0.95"/>'
    b += '<ellipse cx="800" cy="920" rx="220" ry="48" fill="#ffffff" opacity="0.65"/>'
    b += f'<rect x="0" y="950" width="{W}" height="50" fill="#5b7a4a"/>'
    b += palm(300, 460, 1.1, leaf="#2f6b3c")
    b += palm(1320, 470, 1.0, leaf="#2f6b3c")
    return svg(d, b)


def scene_essaouira():
    d, b = sky("s", [("0", "#2c4a6e"), ("0.42", "#8fa8bf"), ("0.72", "#e3b183"), ("1", "#f6dcb6")])
    b += sun(1120, 520, 58, "#fff0c9", "#ffcf8a")
    # mer
    b += f'<rect x="0" y="600" width="{W}" height="{H-600}" fill="#3f6f8e"/>'
    for i, y in enumerate(range(620, 1000, 46)):
        b += (
            f'<path d="M0 {y} Q 200 {y-12} 400 {y} T 800 {y} T 1200 {y} T 1600 {y}" '
            f'stroke="#ffffff" stroke-width="3" fill="none" opacity="{0.10 + i*0.03:.2f}"/>'
        )
    b += f'<path d="M1120 600 L1160 1000 L1080 1000 Z" fill="#ffd79a" opacity="0.45"/>'
    # remparts + tour
    b += '<rect x="0" y="560" width="520" height="440" fill="#d8c6a4"/>'
    x = 0
    while x < 520:
        b += f'<rect x="{x}" y="538" width="34" height="22" fill="#d8c6a4"/>'
        x += 66
    b += '<rect x="60" y="400" width="130" height="160" fill="#e4d4b4"/>'
    x = 60
    while x < 190:
        b += f'<rect x="{x}" y="380" width="26" height="20" fill="#e4d4b4"/>'
        x += 36
    for cx in (100, 150):
        b += f'<rect x="{cx}" y="455" width="22" height="48" rx="11" fill="#5f7c8c"/>'
    # barques bleues
    for bx, by, bs in ((760, 860, 1.0), (980, 905, 0.8), (620, 930, 1.15)):
        b += (
            f'<g transform="translate({bx},{by}) scale({bs})">'
            '<path d="M-70 0 Q 0 40 70 0 L52 24 Q 0 52 -52 24 Z" fill="#2f6fb3"/>'
            '<rect x="-3" y="-78" width="6" height="78" fill="#e8dcc2"/>'
            '<path d="M3 -74 L52 -16 L3 -16 Z" fill="#f4ecd8"/>'
            "</g>"
        )
    # mouettes
    for gx, gy in ((420, 230), (480, 200), (1320, 300)):
        b += (
            f'<path d="M{gx} {gy} q 16 -12 30 0 q 14 -12 30 0" stroke="#ffffff" '
            'stroke-width="4" fill="none" opacity="0.85"/>'
        )
    return svg(d, b)


def scene_ouarzazate():
    d, b = sky("s", [("0", "#5b86b0"), ("0.45", "#cbae8c"), ("1", "#f0d6ab")])
    b += sun(400, 240, 50, "#fff2d0", "#ffd89a")
    b += ridge(520, [(260, 180), (700, 130), (1180, 190), (1500, 140)], "#9b8a79", 0.6)
    b += f'<rect x="0" y="640" width="{W}" height="{H-640}" fill="#c89a68"/>'
    b += f'<rect x="0" y="880" width="{W}" height="{H-880}" fill="#a97b4e"/>'
    # ksar en terre : tours crénelées étagées
    blocks = [(540, 640, 180, 240), (720, 580, 220, 300), (940, 630, 170, 250), (1110, 690, 140, 190)]
    for bx, by, bw, bh in blocks:
        b += f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" fill="#b5804f"/>'
        b += f'<rect x="{bx}" y="{by}" width="{bw}" height="{bh}" fill="#8d5f36" opacity="0.18"/>'
        x = bx + 6
        while x < bx + bw - 18:
            b += f'<rect x="{x}" y="{by-18}" width="18" height="18" fill="#b5804f"/>'
            x += 34
        for wy in range(by + 50, by + bh - 40, 64):
            b += f'<rect x="{bx+24}" y="{wy}" width="20" height="30" fill="#5d3a22" opacity="0.7"/>'
            b += f'<rect x="{bx+bw-46}" y="{wy}" width="20" height="30" fill="#5d3a22" opacity="0.7"/>'
    b += '<path d="M690 880 L760 640 L800 640 L740 880 Z" fill="#8d5f36" opacity="0.18"/>'
    b += palm(380, 900, 1.2, leaf="#3c6b3a")
    b += palm(1400, 920, 1.05, leaf="#3c6b3a")
    b += palm(1300, 880, 0.8, leaf="#3c6b3a")
    return svg(d, b)


def scene_casablanca():
    d, b = sky("s", [("0", "#1f3c5e"), ("0.45", "#6d8fae"), ("0.78", "#d9ab86"), ("1", "#f4dcbb")])
    b += sun(300, 480, 54, "#fff1cd", "#ffc98a")
    b += f'<rect x="0" y="620" width="{W}" height="{H-620}" fill="#3d6480"/>'
    for i, y in enumerate(range(650, 1000, 50)):
        b += (
            f'<path d="M0 {y} Q 220 {y-14} 440 {y} T 880 {y} T 1320 {y} T 1760 {y}" '
            f'stroke="#ffffff" stroke-width="3" fill="none" opacity="{0.10+i*0.03:.2f}"/>'
        )
    # esplanade
    b += f'<rect x="0" y="860" width="{W}" height="{H-860}" fill="#ddc9a6"/>'
    b += f'<rect x="0" y="860" width="{W}" height="14" fill="#c4ab84"/>'
    # mosquée : grand minaret + corps
    b += '<rect x="760" y="880" width="520" height="-0" fill="none"/>'
    b += '<rect x="640" y="700" width="420" height="160" fill="#e6d6b7"/>'
    b += '<rect x="640" y="690" width="420" height="14" fill="#cdb791"/>'
    for ax in range(664, 1040, 62):
        b += f'<path d="M{ax} 860 L{ax} 768 q 18 -26 36 0 L{ax+36} 860 Z" fill="#8d7352" opacity="0.75"/>'
    b += tower(1090, 860, 112, 520, "#e6d6b7", "#c0a67c")
    b += '<rect x="1090" y="420" width="112" height="12" fill="#2f6f6a"/>'
    for wy in range(470, 820, 70):
        b += f'<path d="M1112 {wy+40} L1112 {wy+6} q 18 -22 36 0 L1148 {wy+40} Z" fill="#8d7352" opacity="0.6"/>'
    b += palm(300, 1000, 1.25)
    b += palm(430, 1010, 1.0)
    b += palm(1480, 1005, 1.15)
    return svg(d, b)


def scene_marrakech():
    d, b = sky("s", [("0", "#2b2143"), ("0.38", "#7e4254"), ("0.68", "#cf7a4d"), ("1", "#f3c184")])
    b += stars(50, 11, 300)
    b += sun(1240, 470, 56)
    b += ridge(520, [(300, 150), (760, 110), (1300, 160)], "#4b3140", 0.6)
    # remparts
    b += wall(700, "#b0603a")
    b += f'<rect x="0" y="700" width="{W}" height="{H-700}" fill="#8c4a2c" opacity="0.25"/>'
    # Koutoubia
    b += tower(360, 700, 150, 470, "#c06c40", "#e8c99a")
    for wy in range(330, 650, 70):
        b += f'<path d="M398 {wy+42} L398 {wy+8} q 18 -22 36 0 L434 {wy+42} Z" fill="#7d3f24" opacity="0.65"/>'
    # souk : toits et coupoles
    for bx, bw, bh in ((700, 160, 110), (880, 120, 80), (1030, 190, 130), (1250, 140, 95)):
        b += f'<rect x="{bx}" y="{700-bh}" width="{bw}" height="{bh}" fill="#b95f38"/>'
        b += f'<path d="M{bx} {700-bh} q {bw/2:.0f} {-bh*0.5:.0f} {bw} 0 Z" fill="#d08350"/>'
    b += f'<rect x="0" y="880" width="{W}" height="{H-880}" fill="#6d3620"/>'
    b += palm(140, 960, 1.3, leaf="#2f5d3a")
    b += palm(1480, 980, 1.15, leaf="#2f5d3a")
    b += palm(1360, 940, 0.85, leaf="#2f5d3a")
    return svg(d, b)


def scene_airport():
    d, b = sky("s", [("0", "#121a30"), ("0.42", "#2b3f60"), ("0.78", "#6d5a72"), ("1", "#c58a68")])
    b += stars(90, 7, 420)
    b += ridge(560, [(240, 120), (700, 90), (1200, 130), (1520, 95)], "#1d2639", 0.95)
    b += ridge(640, [(160, 90), (620, 70), (1100, 100), (1480, 75)], "#161d2d", 1.0)
    # tarmac
    b += f'<rect x="0" y="640" width="{W}" height="{H-640}" fill="#24262e"/>'
    b += f'<rect x="0" y="640" width="{W}" height="8" fill="#3a3d46"/>'
    # ligne centrale discontinue
    x = 40
    while x < W:
        b += f'<rect x="{x}" y="848" width="120" height="12" rx="6" fill="#e8e2d2" opacity="0.8"/>'
        x += 220
    # feux de piste
    for px in range(70, W, 150):
        b += f'<circle cx="{px}" cy="700" r="7" fill="#ffd27d" opacity="0.9"/>'
        b += f'<circle cx="{px}" cy="700" r="18" fill="#ffd27d" opacity="0.18"/>'
    for px in range(120, W, 150):
        b += f'<circle cx="{px}" cy="960" r="6" fill="#8fe0ff" opacity="0.75"/>'
    # avion silhouette
    b += (
        '<g transform="translate(900,420) scale(1.25)" fill="#0e1420">'
        '<path d="M-210 0 q 60 -26 210 -30 l 120 -2 q 40 0 54 14 l 26 18 l -26 18 q -14 14 -54 14 '
        'l -120 -2 q -150 -4 -210 -30 Z"/>'
        '<path d="M-30 -8 L-130 -120 L-80 -120 L30 -8 Z"/>'
        '<path d="M-30 8 L-130 120 L-80 120 L30 8 Z"/>'
        '<path d="M160 -8 L120 -70 L148 -70 L196 -8 Z"/>'
        "</g>"
    )
    b += '<circle cx="1140" cy="432" r="6" fill="#ff6b5e" opacity="0.9"/>'
    return svg(d, b)


SCENES = {
    "hero": scene_hero,
    "transfert-aeroport": scene_airport,
    "vallee-ourika": scene_ourika,
    "atlas-imlil-trois-vallees": scene_atlas,
    "desert-agafay": scene_agafay,
    "cascades-ouzoud": scene_ouzoud,
    "essaouira": scene_essaouira,
    "ouarzazate-ait-ben-haddou": scene_ouarzazate,
    "casablanca": scene_casablanca,
    "visite-privee-marrakech": scene_marrakech,
    # photos de la page « À propos »
    "about-1": scene_atlas,
    "about-2": scene_agafay,
    "about-3": scene_marrakech,
}


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, fn in SCENES.items():
        path = os.path.join(OUT, f"{name}.svg")
        with open(path, "w", encoding="utf-8") as f:
            f.write(fn())
        print(f"  ✓ {name}.svg")
    print(f"\n{len(SCENES)} illustrations générées dans public/images/")


if __name__ == "__main__":
    main()
