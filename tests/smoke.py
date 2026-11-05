#!/usr/bin/env python3
"""Test du jeu dans un vrai navigateur (Chromium + Playwright), lancé par tests/run.sh.

- crée (ou connecte) le compte local Spadeure / motdepasse1 ;
- ouvre l'écran de connexion puis le jeu, en téléphone 390×844 et en PC 1366×768 ;
- relève les erreurs JavaScript et les requêtes qui échouent ;
- prend des captures d'écran (et des captures en plus avec --shot).

  python3 tests/smoke.py --url http://127.0.0.1:8099 --out /tmp/mw-test/shots
  options : --all-langs           les 9 langues au lieu de fr + en
            --shot nom=JS         après l'ouverture du jeu, exécute ce JavaScript puis prend la capture « nom »
                                  (ex. --shot carte="document.querySelector('[data-tab=map]').click()")
            --panel               capture aussi le panel admin
"""
import argparse, json, os, sys, urllib.request
from playwright.sync_api import sync_playwright

NAME, PASS = 'Spadeure', 'motdepasse1'
VIEWS = {'tel': dict(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True, has_touch=True),
         'pc': dict(viewport={'width': 1366, 'height': 768})}
ALL = ['en', 'fr', 'es', 'de', 'it', 'pt', 'pl', 'tr', 'ru']


def api(url, path, body):
    req = urllib.request.Request(url + path, data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=15) as r: return json.loads(r.read())
    except urllib.error.HTTPError as e: return {'error': e.code, 'body': e.read().decode()[:200]}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--url', default='http://127.0.0.1:8099')
    ap.add_argument('--out', default='/tmp/mw-test/shots')
    ap.add_argument('--all-langs', action='store_true')
    ap.add_argument('--shot', action='append', default=[])
    ap.add_argument('--panel', action='store_true')
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    tok = api(a.url, '/api/login', {'name': NAME, 'password': PASS}).get('token')
    if not tok: tok = api(a.url, '/api/register', {'name': NAME, 'password': PASS, 'lang': 'fr'}).get('token')
    if not tok: print('ÉCHEC : impossible de créer ou connecter le compte de test'); return 1
    langs = ALL if a.all_langs else ['fr', 'en']
    problems = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        for vname, vopt in VIEWS.items():
            for lang in langs:
                ctx = b.new_context(**vopt)
                page = ctx.new_page()
                errs = []
                page.on('pageerror', lambda e: errs.append('JS : ' + str(e)))
                page.on('console', lambda m: m.type == 'error' and errs.append('console : ' + m.text))
                page.on('requestfailed', lambda r: errs.append('requête : ' + r.url))
                page.on('response', lambda r: r.status >= 400 and '/api/' not in r.url and errs.append(f'{r.status} : {r.url}'))
                # 1. écran de connexion (sans compte)
                page.add_init_script(f"try{{localStorage.setItem('bastion_lang','{lang}');localStorage.setItem('bastion_noinstall','1')}}catch(e){{}}")
                page.goto(a.url + '/', wait_until='networkidle')
                page.wait_for_timeout(800)
                page.screenshot(path=f'{a.out}/{vname}-{lang}-1-connexion.png')
                # 2. le jeu, connecté (la connexion d'un autre écran remplace la session : on se reconnecte à chaque fois)
                t = api(a.url, '/api/login', {'name': NAME, 'password': PASS}).get('token')
                page.evaluate(f"localStorage.setItem('bastion_token','{t}')")
                page.goto(a.url + '/', wait_until='load')   # not « networkidle »: the live stream (/api/stream) stays open on purpose
                page.wait_for_timeout(3500)
                ok = page.evaluate("typeof NET!=='undefined' && !!NET.token && !document.getElementById('lgo')")
                if not ok: errs.append("le jeu ne s'est pas ouvert (toujours sur l'écran de connexion)")
                page.screenshot(path=f'{a.out}/{vname}-{lang}-2-jeu.png')
                over = page.evaluate("document.documentElement.scrollWidth > innerWidth + 2")
                if over: errs.append('la page déborde sur le côté (défilement horizontal)')
                for s in a.shot:
                    n, js = s.split('=', 1)
                    try: page.evaluate(js); page.wait_for_timeout(1200)
                    except Exception as e: errs.append(f'--shot {n} : {e}')
                    page.screenshot(path=f'{a.out}/{vname}-{lang}-{n}.png')
                for e in errs: problems.append(f'[{vname} {lang}] {e}')
                ctx.close()
        if a.panel:
            ctx = b.new_context(**VIEWS['pc']); page = ctx.new_page()
            page.goto(a.url + '/admin', wait_until='networkidle'); page.wait_for_timeout(1000)
            page.screenshot(path=f'{a.out}/panel.png'); ctx.close()
        b.close()
    for x in problems: print(x)
    print('Navigateur : OK' if not problems else f'Navigateur : {len(problems)} problème(s)')
    return 1 if problems else 0


if __name__ == '__main__':
    sys.exit(main())
