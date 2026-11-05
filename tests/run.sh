#!/usr/bin/env bash
# Lance tous les contrôles avant d'envoyer une modification sur la branche test.
#   bash tests/run.sh            -> contrôles + test du jeu (téléphone 390×844 et PC 1366×768, fr + en)
#   bash tests/run.sh --all-langs -> idem dans les 9 langues
#   MW_TEST_PORT=8098 bash tests/run.sh -> si le port 8099 est déjà pris
# Le serveur tourne dans une COPIE du dépôt (port 8099), avec sa propre base : rien n'est touché ici.
# Captures d'écran : dans le dossier affiché à la fin.
set -u
REPO="$(cd "$(dirname "$0")/.." && pwd)"
WORK="${MW_TEST_DIR:-/tmp/mw-test}"
OUT="$WORK/shots"
PORT="${MW_TEST_PORT:-8099}"   # another port: MW_TEST_PORT=8098 bash tests/run.sh
fail=0

echo "== 1. Syntaxe des fichiers JavaScript"
for f in "$REPO"/server/*.js "$REPO"/js/*.js "$REPO"/js/i18n/*.js "$REPO"/sw.js; do
  node --check "$f" || { echo "ERREUR de syntaxe : $f"; fail=1; }
done

echo "== 1b. Règles du jeu (moteur du serveur)"
for t in "$REPO"/tests/*.js; do ( set -o pipefail; node "$t" | grep -v "moteur" ) || { echo "ÉCHEC : $t"; fail=1; }; done

echo "== 2. Traductions"
python3 "$REPO/tools/i18n.py" check || fail=1

echo "== 3. Copie du dépôt et serveur local (port $PORT)"
if curl -s -o /dev/null "http://127.0.0.1:$PORT/"; then echo "ERREUR : le port $PORT est déjà pris (un autre serveur tourne). Relance avec MW_TEST_PORT=8098"; exit 1; fi
rm -rf "$WORK/app"; mkdir -p "$WORK/app" "$OUT"
(cd "$REPO" && tar --exclude=./data --exclude=./node_modules -cf - .) | (cd "$WORK/app" && tar -xf -)
(cd "$WORK/app" && PORT=$PORT node server/launcher.js > "$WORK/server.log" 2>&1) &
SRV=$!
for i in $(seq 1 60); do curl -s -o /dev/null "http://127.0.0.1:$PORT/" && break; sleep 0.5; done

echo "== 4. Test du jeu dans le navigateur"
python3 "$REPO/tests/smoke.py" --url "http://127.0.0.1:$PORT" --out "$OUT" "$@" || fail=1

kill $SRV 2>/dev/null; pkill -f "$WORK/app/server" 2>/dev/null; wait 2>/dev/null
if grep -q "ERREUR" "$WORK/server.log"; then echo "Erreurs dans le journal du serveur :"; grep "ERREUR" "$WORK/server.log" | tail -20; fail=1; fi
echo "Captures : $OUT    Journal serveur : $WORK/server.log"
[ $fail = 0 ] && echo "TOUT EST OK" || echo "IL Y A DES PROBLÈMES (voir ci-dessus)"
exit $fail
