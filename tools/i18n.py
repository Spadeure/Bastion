#!/usr/bin/env python3
"""Outil des traductions de MEKANIK WAR: TITANS.

Les traductions sont dans js/i18n/<langue>.js (une langue par fichier, la clé = le texte anglais).
Cet outil évite d'ouvrir ces gros fichiers : il lit, ajoute et vérifie les traductions.

  python3 tools/i18n.py check                 -> textes du code sans traduction + clés manquantes dans une langue
  python3 tools/i18n.py get "English text"    -> affiche les 8 traductions d'une clé
  python3 tools/i18n.py find "mot"            -> cherche un mot dans les clés anglaises (et le français)
  python3 tools/i18n.py set fichier.json      -> ajoute/remplace des traductions
        fichier.json = {"English text": {"fr": "...", "es": "...", "de": "...", "it": "...",
                                           "pt": "...", "pl": "...", "tr": "...", "ru": "..."}, ...}
  python3 tools/i18n.py rename "ancienne clé" "nouvelle clé"   -> renomme une clé dans les 8 langues
  python3 tools/i18n.py delete "English text" -> supprime une clé dans les 8 langues
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIR = os.path.join(ROOT, 'js', 'i18n')
LANGS = ['fr', 'es', 'de', 'it', 'pt', 'pl', 'tr', 'ru']   # 'en' = les clés elles-mêmes
HEAD = '// Traductions « {l} » du jeu (clé = texte anglais). Ne pas modifier à la main : utiliser tools/i18n.py\n'
PRE = '(globalThis.I18N_DATA=globalThis.I18N_DATA||{{}}).{l}=\n'


def load(l):
    s = open(os.path.join(DIR, l + '.js'), encoding='utf-8').read()
    start = s.index('=\n') + 2
    return json.loads(s[start:].rstrip().rstrip(';'))


def save(l, d):
    with open(os.path.join(DIR, l + '.js'), 'w', encoding='utf-8') as f:
        f.write(HEAD.format(l=l) + PRE.format(l=l) + json.dumps(d, ensure_ascii=False, separators=(',', ':')) + ';\n')


def code_keys():
    """Textes écrits en dur dans le code : _t('...') et data-i18n="..." (les textes calculés ne sont pas vus)."""
    keys = set()
    for f in ['js/game.js', 'server/harness.js', 'js/loot.js', 'js/legal.js']:
        p = os.path.join(ROOT, f)
        if not os.path.exists(p): continue
        s = open(p, encoding='utf-8').read()
        for q in ("'", '"'):
            for m in re.finditer(r'\b_t\(' + q + r'((?:\\.|[^' + q + r'\\])*)' + q, s):
                keys.add(re.sub(r"\\(['\"\\])", r'\1', m.group(1)))
    s = open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    keys |= set(re.findall(r'data-i18n(?:-[a-z]+)?="([^"]+)"', s))
    return keys


def main(a):
    if not a or a[0] in ('-h', '--help', 'help'):
        print(__doc__); return 0
    cmd = a[0]
    D = {l: load(l) for l in LANGS}
    if cmd == 'check':
        bad = 0
        allk = set().union(*[set(d) for d in D.values()])
        for l in LANGS:
            miss = sorted(allk - set(D[l]))
            empty = sorted(k for k, v in D[l].items() if not str(v).strip())
            if miss: bad += 1; print(f'[{l}] {len(miss)} clé(s) absente(s) :', *('  - ' + k for k in miss[:30]), sep='\n')
            if empty: bad += 1; print(f'[{l}] {len(empty)} traduction(s) vide(s) :', *('  - ' + k for k in empty[:30]), sep='\n')
            for k, v in D[l].items():   # les {repères} doivent être les mêmes que dans l'anglais
                if set(re.findall(r'\{\w+\}', k)) != set(re.findall(r'\{\w+\}', str(v))):
                    bad += 1; print(f'[{l}] repères {{...}} différents : {k!r} -> {v!r}')
        nt = sorted(k for k in code_keys() if k not in D['fr'])
        if nt: bad += 1; print(f'{len(nt)} texte(s) du code sans traduction :', *('  - ' + k for k in nt), sep='\n')
        print('Traductions OK' if not bad else 'À corriger ci-dessus', f'({len(D["fr"])} clés, {len(LANGS) + 1} langues)')
        return 1 if bad else 0
    if cmd == 'get':
        k = a[1]
        if k not in D['fr']: print('Clé absente :', k); return 1
        for l in LANGS: print(f'{l}: {D[l].get(k, "(absente)")}')
        return 0
    if cmd == 'find':
        w = a[1].lower()
        for k in D['fr']:
            if w in k.lower() or w in D['fr'][k].lower(): print(f'{k!r} -> fr: {D["fr"][k]!r}')
        return 0
    if cmd == 'set':
        src = json.load(open(a[1], encoding='utf-8'))
        for k, tr in src.items():
            missing = [l for l in LANGS if not str(tr.get(l, '')).strip()]
            if missing: print(f'REFUSÉ, langue(s) manquante(s) {missing} pour : {k!r}'); return 1
        for k, tr in src.items():
            for l in LANGS: D[l][k] = tr[l]
        for l in LANGS: save(l, D[l])
        print(f'{len(src)} clé(s) enregistrée(s) dans les {len(LANGS)} langues'); return 0
    if cmd == 'rename':
        old, new = a[1], a[2]
        for l in LANGS:
            if old in D[l]: D[l][new] = D[l].pop(old)
        for l in LANGS: save(l, D[l])
        print('Renommée'); return 0
    if cmd == 'delete':
        for l in LANGS: D[l].pop(a[1], None)
        for l in LANGS: save(l, D[l])
        print('Supprimée'); return 0
    print('Commande inconnue. python3 tools/i18n.py help'); return 1


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
