#!/usr/bin/env python3
"""Détourage des images du jeu (MEKANIK WAR: TITANS).

Gemini ne sait pas faire de vrai fond transparent : on lui demande un fond UNI (de préférence gris anthracite foncé),
puis cet outil retire le fond, nettoie les bords (pas de liseré clair) et met l'image à la taille du jeu.

  python3 tools/detour.py cut image.jpg assets/img/tech_x.webp [--size 128] [--tol 16]
        -> retire le fond uni (couleur lue sur les bords de l'image), recadre, met au carré, enregistre en .webp
  python3 tools/detour.py scan [dossier]          -> liste les images avec un liseré clair ou des taches blanches
  python3 tools/detour.py fix image.webp sortie.webp
        -> enlève le liseré clair d'une image déjà détourée (sans toucher au reste)

Rappel : une image remplacée garde 1 jour l'ancienne version dans les navigateurs : ajouter ?v=N à son chemin.
"""
import os, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage


def _rgba(path):
    im = Image.open(path)
    return im.convert('RGBA')


def cut(src, dst, size=128, tol=16, margin=2):
    """Retire un fond uni relié aux bords de l'image, adoucit le contour, retire la couleur du fond sur les bords."""
    im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(float)
    border = np.concatenate([a[:10].reshape(-1, 3), a[-10:].reshape(-1, 3), a[:, :10].reshape(-1, 3), a[:, -10:].reshape(-1, 3)])
    bg = np.median(border, axis=0)
    d = np.sqrt(((a - bg) ** 2).sum(-1))
    lab, _ = ndimage.label(d < tol)
    edge = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    bgm = ndimage.binary_opening(np.isin(lab, list(edge)), iterations=1)
    alpha = np.asarray(Image.fromarray(np.where(bgm, 0, 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))).astype(float) / 255
    # the edge pixels still hold some of the background colour: take it out (colour decontamination)
    k = np.clip(alpha, 0.05, 1)[..., None]
    rgb = np.where(alpha[..., None] < 0.999, np.clip((a - (1 - k) * bg) / k, 0, 255), a)
    out = Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), 'RGBA')
    bb = Image.fromarray((alpha > 0.1).astype(np.uint8) * 255).getbbox() or (0, 0, out.width, out.height)
    out = out.crop(bb)
    S = max(out.size); sq = Image.new('RGBA', (S, S), (0, 0, 0, 0)); sq.alpha_composite(out, ((S - out.width) // 2, (S - out.height) // 2))
    if size:
        inner = size - 2 * margin; sq = sq.resize((inner, inner), Image.LANCZOS)
        fin = Image.new('RGBA', (size, size), (0, 0, 0, 0)); fin.alpha_composite(sq, (margin, margin)); sq = fin
    sq.save(dst, 'WEBP', quality=92, method=6)
    print(f'{dst} : fond {bg.astype(int).tolist()} retiré, {sq.size[0]}×{sq.size[1]}')


def measures(path):
    """Liseré clair (contour) et taches blanches (dans l'image) d'une image avec transparence."""
    im = _rgba(path); a = np.asarray(im).astype(int); A = a[..., 3]; rgb = a[..., :3]
    if A.min() > 250: return None   # no transparency: a background picture
    mn, mx = rgb.min(-1), rgb.max(-1)
    whitish = (mn > 175) & (mx - mn < 45)
    near = ndimage.binary_dilation(A < 20, iterations=2)
    band = near & (A > 20)
    fringe = (band & whitish).sum() / max(1, band.sum())
    # big pure white patches: left-over background
    pure = (A > 200) & (mn > 232) & (mx - mn < 25)
    lab, n = ndimage.label(pure)
    big = 0
    if n:
        sizes = ndimage.sum(pure, lab, range(1, n + 1)); big = int(sizes[sizes >= max(12, A.size * 0.0004)].sum())
    return {'fringe': round(float(fringe), 3), 'patch': round(big / A.size, 4), 'size': im.size}


def fix(src, dst, band=2):
    """Enlève le liseré clair sans abîmer le contour : sur une bande de « band » pixels autour du bord, seuls les pixels
    nettement PLUS CLAIRS que le dessin juste à l'intérieur reprennent sa couleur (et s'effacent un peu s'ils étaient
    presque blancs) ; le contour sombre et tout le reste de l'image ne changent pas."""
    im = _rgba(src); a = np.asarray(im).astype(float); A = a[..., 3].copy(); rgb = a[..., :3]
    # 0. pockets of the old white background left between branches, fence rails, beams: they become transparent.
    #    The old background was a warm white (a bit more red than blue): a bluish white (a shine on ore) is kept.
    mn0, mx0 = rgb.min(-1), rgb.max(-1)
    wh = (A > 150) & (mn0 > 200) & (mx0 - mn0 < 35)
    lab, n = ndimage.label(wh)
    for i in range(1, n + 1):
        m = lab == i
        if m.sum() >= 6 and (rgb[m][:, 2] - rgb[m][:, 0]).mean() <= 0:
            A[ndimage.binary_dilation(m, iterations=1) & (A > 0) & (rgb.min(-1) > 170)] = 0
    solid = A > 245
    inner = solid & ~ndimage.binary_dilation(~solid, iterations=band + 1)     # the drawing, away from the edge
    if inner.sum() < 50: inner = solid
    _, (iy, ix) = ndimage.distance_transform_edt(~inner, return_indices=True)
    ring = (A > 0) & ~inner & ndimage.binary_dilation(A < 20, iterations=band)
    lum = rgb @ np.array([0.299, 0.587, 0.114]); src_lum = lum[iy, ix]
    light = ring & (lum > src_lum + 28)                                       # lighter than the drawing: the fringe
    rgb2 = rgb.copy(); rgb2[light] = rgb[iy[light], ix[light]]
    mn, mx = rgb.min(-1), rgb.max(-1)
    white = light & (mn > 150) & (mx - mn < 50)                              # almost white: also fades out
    A2 = A.copy(); A2[white] *= 0.35
    Image.fromarray(np.dstack([np.clip(rgb2, 0, 255), np.clip(A2, 0, 255)]).astype(np.uint8), 'RGBA').save(dst, 'WEBP', quality=95, alpha_quality=100, method=6, exact=True)


def scan(folder):
    rows = []
    for f in sorted(os.listdir(folder)):
        if not f.lower().endswith(('.webp', '.png')): continue
        try: m = measures(os.path.join(folder, f))
        except Exception as e: print('illisible', f, e); continue
        if m: rows.append((f, m))
    rows.sort(key=lambda r: -(r[1]['fringe'] + r[1]['patch'] * 20))
    for f, m in rows:
        if m['fringe'] > 0.12 or m['patch'] > 0.002: print(f'{f:40s} liseré {m["fringe"]*100:5.1f} %   taches {m["patch"]*100:5.2f} %   {m["size"][0]}×{m["size"][1]}')
    return rows


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a or a[0] in ('-h', '--help', 'help'): print(__doc__); sys.exit(0)
    if a[0] == 'cut':
        opt = {k[2:]: int(v) for k, v in zip(a[3::2], a[4::2])}
        cut(a[1], a[2], **opt)
    elif a[0] == 'scan': scan(a[1] if len(a) > 1 else os.path.join(os.path.dirname(__file__), '..', 'assets', 'img'))
    elif a[0] == 'fix': fix(a[1], a[2])
    else: print(__doc__)
