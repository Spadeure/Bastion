# MEKANIK WAR: TITANS — notes de travail pour Claude

Lis ce fichier en entier au début de chaque conversation : il remplace le long prompt de reprise.
**Tiens-le à jour** : à la fin de chaque travail, réécris la section « Où on en est » (remplace l'ancien contenu, ne l'empile pas).

## Qui, et comment parler
- Spadeure, français, ne code pas et ne parle pas anglais. Toujours répondre en français, simplement, étape par étape.
- Le titre s'écrit exactement : **MEKANIK WAR: TITANS**.
- Plusieurs questions à poser → un questionnaire numéroté.
- Ne pas lui proposer d'ouvrir une nouvelle conversation.

## Dépôt et déploiement
- GitHub : https://github.com/Spadeure/Bastion, cloné dans /home/user/Bastion. Commits : Spadeure <spadeuregaming@gmail.com>.
- Pousser UNIQUEMENT sur **test**. **JAMAIS sur main** : l'officiel, c'est lui qui déploie (panel officiel › Maintenance › Déployer).
- Après chaque modification poussée, redonner les liens :
  - Panel test : http://192.168.1.190:55000/admin
  - Panel officiel : http://192.168.1.190:58689/admin
  - Jeu test : https://test.mekanikwar.com
  - Pelican : https://panel.stryxhost.fr (il clique « Redémarrer » sur le serveur de test pour récupérer la branche test)
  - Les panels ne marchent qu'en local (box) ; sur téléphone il utilise Samsung Internet.

## Sécurité (strict)
- Clé Gemini dans la variable GEMINI_API_KEY : ne jamais l'afficher ni la demander.
- Ne jamais demander ni recevoir : mots de passe (SMTP, mail…), clés Stripe, jetons OVH/Cloudflare, fichier .json cloudflared.
- Il ne veut rien payer pour l'instant.

## Règles de travail
- Maquettes (captures) avant le code, sauf s'il dit « go ».
- Icônes peintes uniquement, **jamais d'emoji** (jeu et site).
- Prompts d'images/vidéos (Gemini, Veo) : en anglais.
- Modification visible par les joueurs = une entrée dans `PATCH` (js/game.js, chercher `const PATCH = [`), la plus récente en haut, nouvel id (`2026-11-05b`, ou une nouvelle date `AAAA-MM-JJa`), traduite dans les 9 langues.
- CSP : pas de JavaScript inline (pas de `onclick="…"` dans le HTML généré : `data-act` + écouteur délégué).
- Nouveau Titan, nouvelle pièce, nouvel objet ou nouvelle troupe → l'ajouter AUSSI aux menus de dons admin : menu admin du jeu (js/game.js, `ADM_PARTS` pour les pièces : « se donner » et « donner à un joueur ») ET panel web (js/admin.js, section « Dons »), et vérifier que le serveur sait le donner (server/index.js, fonction `admin`).
- Image remplacée → ajouter/incrémenter `?v=N` dans son chemin (sinon 1 jour de cache).
- Les .js et .css reçoivent automatiquement `?v=<version>` (server/index.js, buildIndex) : rien à faire pour eux.

## Traductions (9 langues : en = les clés, + fr es de it pt pl tr ru)
- Une langue par fichier : `js/i18n/<langue>.js` (gros fichiers : **ne pas les lire**, passer par l'outil).
- `python3 tools/i18n.py check` → textes du code sans traduction, clés manquantes, repères `{x}` différents.
- `python3 tools/i18n.py set fichier.json` → ajoute/remplace : `{"English text": {"fr":"…","es":"…","de":"…","it":"…","pt":"…","pl":"…","tr":"…","ru":"…"}}` (refuse s'il manque une langue).
- `get "clé"`, `find "mot"`, `rename "ancienne" "nouvelle"`, `delete "clé"`.
- Dans le code : `_t('English text', {p: valeur})`. Le serveur charge aussi ces fichiers (server/engine.js).

## Tests avant de pousser
- `bash tests/run.sh` : syntaxe de tous les .js, tests des règles (tests/*.js), traductions, copie du dépôt + serveur local port 8099, navigateur téléphone 390×844 et PC 1366×768 (fr + en), erreurs JS, débordement horizontal, captures.
  - `--all-langs` : les 9 langues ; `--panel` : capture du panel ; `--shot nom="JS à exécuter"` : capture d'un écran précis.
  - Mettre `MW_TEST_DIR=<scratchpad>/mw` devant pour ranger copie et captures dans le scratchpad ; `MW_TEST_PORT=8098` si le port 8099 est pris.
- Compte local de test : Spadeure / motdepasse1 (créé tout seul). Chromium + Playwright sont préinstallés : ne pas réinstaller.
- Regarder les captures (Read) avant de dire que c'est bon.

## Architecture
- Node 22 + node:sqlite, sans dépendance. Pelican lance `server/launcher.js` (redémarrage, déploiement d'un commit précis).
- server/index.js (routes, API, fichiers statiques — dossiers interdits au public : server, data, .git, tools, tests…), engine.js + harness.js (les règles de js/game.js tournent dans une vm côté serveur), panel.js, account.js (comptes, e-mails SMTP), alliance.js, chat.js, event.js, notify.js, pay.js, beta.js, referral.js, site.js + site-text.js (site vitrine rendu côté serveur ; js/site.js).
- Jeu : index.html, js/game.js (gros fichier : chercher avec grep, ne pas le lire en entier), js/loot.js, js/legal.js, css/style.css. Panel : admin.html, js/admin.js, css/admin.css.
- Ordres réservés au serveur (liste dans harness.js + liste de refus dans index.js) : payGrant, payCheck, payRevoke, evGrant, evRank, evFinal, alFinal, missionChat, statSet, betaGrant, refGrant.
- Hébergement : Pelican (stryxhost), tunnel Cloudflare, mail Zimbra OVH contact@mekanikwar.com (SMTP smtp.mail.ovh.net:465), DMARC. Sauvegarde nocturne par e-mail.
- Discord : https://discord.gg/fHpxRftpuS

## Le jeu (repères)
- Bêta fermée prête (server/beta.js, vue « Bêta » du panel) : 50 places, page /beta/ du site, e-mail quand c'est plein, invitations, bugs signalés, remise à zéro (taper « REMISE A ZERO »), récompense 1200 crédits + bonus 500. Boutique cachée pendant la bêta. Bouton « Jouer » du site = « bientôt » jusqu'au lancement.
- Parrainage fait (server/referral.js, mekanikwar.com/r/<pseudo>, paliers QG 5 et 10, 20 filleuls max) : caché pendant la bêta.
- Avant-postes : point de ralliement = +2 % de troupes/niveau et -3 % de trajet vers le terrain de l'avant-poste. Aide d'alliance : 1 % du temps, 30 aides max, aussi pour la recherche.
- Le Titan ne se construit pas et ne se pilote pas : on **trouve les pièces de son armure** dans les camps de pillards.
- Bande-annonce publiée (TikTok + YouTube Shorts).

## Où on en est (à réécrire à chaque fin de travail)
- 2026-11-06 : BÊTA OUVERTE (PATCH 2026-11-06a). Bêta lancée = inscriptions toujours ouvertes jusqu'aux places max ; chaque inscription envoie tout de suite l'e-mail avec le lien du jeu (server/beta.js `signup` → `invite([id])`) ; au lancement (panel › Bêta › Lancer), tous les inscrits non invités reçoivent le lien et le message « date de lancement » est effacé. E-mail d'invitation en 9 langues, avec une version « tu as déjà un compte ». Site : titre « BÊTA OUVERTE », bandeau vert, étape 2 « lien tout de suite », et les boutons JOUER du site mènent à /beta/ (inscription) sauf sur la page bêta (→ jeu). Clés site-text : betaHOn, openNow, bandOn, fOkOn, h2On. Un e-mail raté se renvoie avec « Envoyer les invitations » (panel).
- Idée suivante proposée : compteur de visites du site (provenance TikTok/YouTube/Google…) dans le panel.
- 2026-11-05 : menu admin du jeu : pièces des 3 Titans dans « se donner » et « donner à un joueur » (`ADM_PARTS`) ; bouton « Panel de gestion » réparé (onclick interdit par le CSP → data-act=admweb).
- 2026-11-05 : assemblage de l'armure du Titan (PATCH 2026-11-05b). Quand la 4e pièce est trouvée, le Titan reçoit `asm:0` (« armure à assembler ») : pas de combat tant que le joueur n'a pas appuyé sur « Assembler l'armure » (fiche du Titan) → ordre serveur `titanAssemble(base)` (harness.js) puis animation `titanAssembleFx(b)` (js/game.js, styles `#tasm` dans css/style.css), avec le skin et les pièces de chaque Titan (principal, Rempart, Brasier) et un bruit de métal. Les Titans déjà blindés (sans `asm`) ne changent pas. Le panel (titan_part) met aussi `asm:0` à la 4e pièce, pour tester. Test des règles : tests/titan_assemble.js.
- 2026-11-05 : traductions sorties de game.js vers js/i18n/ + tools/i18n.py ; scripts de test dans tests/ ; ce CLAUDE.md.
- Vidéo promo (TikTok / YouTube Shorts) faite : tournage Playwright au ralenti (screencast CDP + Animation.setPlaybackRate) sur une copie locale avec un compte de démo, montage ffmpeg. Les scripts étaient dans le scratchpad (non gardés).
- Dernière note PATCH : 2026-11-06a.
- À faire plus tard : fin de bêta (événement de lancement, boutique ouverte, annonce du parrainage) ; application Android (Capacitor) au lancement, iOS plus tard ; VPS ; Google Search Console.
