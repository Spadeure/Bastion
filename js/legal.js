// Bastion · legal pages (French is the reference version, English for the other players).
// The editor's details ({name}, {siret}, {email}, {address}, {mediator}, {mediator_url}) come from the server variables
// LEGAL_NAME, LEGAL_SIRET, LEGAL_EMAIL, LEGAL_ADDRESS, LEGAL_MEDIATOR, LEGAL_MEDIATOR_URL (Pelican): nothing to change in the code.
// {ver} = version of the terms of sale (CGV_VER in js/game.js): change it each time the terms of sale change.
const LEGAL_TEXT = {
fr: {
  mentions: `<h3>Éditeur</h3>
<p>Bastion est un jeu édité par <b>{name}</b>, entrepreneur individuel (micro-entreprise).<br>SIRET : {siret}<br>Adresse : {address}<br>Contact : {email}</p>
<p>Directeur de la publication : {name}.</p>
<h3>Hébergement</h3>
<p>Le jeu est hébergé par l'éditeur sur son propre serveur, situé en France. Les échanges passent par le réseau de Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, États-Unis), qui protège le site.</p>
<h3>Paiements</h3>
<p>Les paiements par carte sont traités par Stripe Payments Europe, Ltd. (Dublin, Irlande). Le jeu ne voit et ne garde jamais les numéros de carte.</p>
<h3>Images et crédits</h3>
<p>Les images du jeu ont été créées avec l'aide de Google Gemini, puis retravaillées pour le jeu. Le code, les textes et les règles du jeu appartiennent à l'éditeur.</p>`,
  cgu: `<p>Version du {ver}. En créant un compte, tu acceptes ces règles.</p>
<h3>1. Le jeu</h3>
<p>Bastion est un jeu de stratégie en ligne gratuit. Certains contenus facultatifs sont payants (voir les Conditions de vente). Le jeu évolue : des règles, des objets ou des équilibrages peuvent changer pour garder un jeu juste et intéressant.</p>
<h3>2. Ton compte</h3>
<ul><li>Un compte est personnel. Garde ton mot de passe secret : l'éditeur ne te le demandera jamais.</li>
<li>Les mineurs doivent avoir l'accord d'un parent pour jouer et pour tout achat.</li>
<li>Ton compte et ce qu'il contient (base, troupes, objets, Crédits de guerre) restent la propriété de l'éditeur : c'est un droit d'utilisation dans le jeu, pas un bien qui t'appartient ou qui se revend.</li></ul>
<h3>3. Ce qui est interdit</h3>
<ul><li>Les scripts, robots, programmes automatiques et toute modification du jeu.</li>
<li>Exploiter un bug au lieu de le signaler.</li>
<li>Vendre, acheter ou échanger des comptes ou des objets contre de l'argent réel en dehors du jeu.</li>
<li>Les insultes, le harcèlement, les propos racistes, sexuels ou illégaux, l'usurpation d'identité (notamment de l'administrateur).</li></ul>
<h3>4. Sanctions</h3>
<p>En cas de manquement, l'éditeur peut avertir, rendre muet dans le chat, retirer des objets obtenus de façon irrégulière, bloquer ou supprimer le compte, sans remboursement des achats liés à ce manquement.</p>
<h3>5. Disponibilité</h3>
<p>L'éditeur fait au mieux pour que le jeu soit disponible, sans pouvoir le garantir (maintenances, pannes, mises à jour). Si le jeu devait s'arrêter définitivement, les joueurs seraient prévenus au moins 30 jours avant.</p>
<h3>6. Contact</h3>
<p>{email}</p>`,
  cgv: `<p>Conditions générales de vente · version du {ver}.</p>
<h3>1. Vendeur</h3>
<p>{name}, micro-entreprise, SIRET {siret}, {address}, {email}.</p>
<h3>2. Ce qui est vendu</h3>
<p>Des contenus numériques à utiliser dans le jeu : Crédits de guerre (monnaie du jeu), packs, Pass de commandement. Le contenu de chaque offre est décrit dans la boutique avant l'achat.</p>
<p>Les Crédits de guerre et les objets <b>n'ont aucune valeur en argent réel</b> : ils ne sont ni remboursables, ni échangeables contre de l'argent, ni transférables à un autre compte.</p>
<h3>3. Prix et paiement</h3>
<p>Les prix sont indiqués en euros, toutes taxes comprises (TVA non applicable, article 293 B du CGI, tant que l'éditeur bénéficie de la franchise en base). Le paiement se fait par carte sur la page sécurisée de Stripe. Un reçu est envoyé par email par Stripe.</p>
<h3>4. Livraison</h3>
<p>Le contenu est ajouté au compte dès que Stripe confirme le paiement, en général en quelques secondes.</p>
<h3>5. Droit de rétractation</h3>
<p>Conformément à l'article L221-28 13° du Code de la consommation, le droit de rétractation de 14 jours ne s'applique pas aux contenus numériques fournis immédiatement, <b>lorsque l'acheteur l'a demandé et a renoncé expressément à ce droit</b>. Avant chaque achat, tu coches une case pour demander la livraison immédiate et renoncer à ton droit de rétractation ; l'acceptation est enregistrée avec le paiement.</p>
<h3>6. Problème avec un achat</h3>
<p>Si un achat n'est pas arrivé ou pose problème, écris à {email} avec ton nom de commandant et la date : l'éditeur répond sous 7 jours et livre ou rembourse si le contenu n'a pas été fourni.</p>
<p>Un paiement remboursé ou contesté auprès de la banque entraîne le retrait de ce qu'il a donné. Les Crédits déjà dépensés deviennent un solde négatif, repris sur les prochains Crédits.</p>
<h3>7. Mineurs</h3>
<p>Un mineur doit obtenir l'accord d'un parent avant tout achat.</p>
<h3>8. Médiation et litiges</h3>
<p>En cas de litige non résolu avec l'éditeur, tu peux recourir gratuitement au médiateur de la consommation : <b>{mediator}</b> ({mediator_url}). Ces conditions sont soumises au droit français.</p>`,
  privacy: `<p>Version du {ver}.</p>
<h3>Responsable</h3>
<p>{name}, {email}.</p>
<h3>Données gardées et pourquoi</h3>
<ul><li><b>Nom de commandant et mot de passe</b> (chiffré, jamais lisible) : pour ton compte.</li>
<li><b>Ta partie</b> (base, troupes, objets, achats) : pour faire tourner le jeu.</li>
<li><b>Adresse IP et heures de connexion</b> : sécurité, lutte contre la triche et les attaques, pendant 12 mois au plus.</li>
<li><b>Messages du chat</b> : le chat général et d'alliance garde les 200 derniers messages, les messages privés 30 jours.</li>
<li><b>Achats</b> : produit, prix, date, acceptation des conditions de vente : obligation comptable, 10 ans.</li></ul>
<p>Les données de carte bancaire sont traitées uniquement par Stripe (voir la politique de confidentialité de Stripe). Le jeu ne les voit jamais.</p>
<h3>Ce qui n'est pas fait</h3>
<p>Pas de publicité, pas de revente de données, pas de cookies de suivi. Le navigateur garde seulement ta session et tes réglages (langue, son).</p>
<h3>Tes droits</h3>
<p>Tu peux demander l'accès à tes données, leur correction ou la suppression de ton compte en écrivant à {email}. Tu peux aussi saisir la CNIL (cnil.fr).</p>`
},
en: {
  mentions: `<h3>Publisher</h3>
<p>Bastion is published by <b>{name}</b>, sole trader (micro-entreprise, France).<br>SIRET: {siret}<br>Address: {address}<br>Contact: {email}</p>
<h3>Hosting</h3>
<p>The game is hosted by the publisher on his own server in France. Traffic goes through Cloudflare, Inc. (101 Townsend St, San Francisco, CA 94107, USA), which protects the site.</p>
<h3>Payments</h3>
<p>Card payments are processed by Stripe Payments Europe, Ltd. (Dublin, Ireland). The game never sees nor keeps card numbers.</p>
<h3>Images and credits</h3>
<p>The game's images were created with the help of Google Gemini, then reworked for the game. The code, texts and game rules belong to the publisher.</p>
<p><i>The French version of these pages is the reference version.</i></p>`,
  cgu: `<p>Version of {ver}. By creating an account, you accept these rules. <i>The French version is the reference version.</i></p>
<h3>1. The game</h3>
<p>Bastion is a free online strategy game. Some optional content is paid (see the Terms of sale). The game evolves: rules, items or balance may change to keep it fair and interesting.</p>
<h3>2. Your account</h3>
<ul><li>An account is personal. Keep your password secret: the publisher will never ask for it.</li>
<li>Minors need a parent's permission to play and for any purchase.</li>
<li>Your account and its content (base, troops, items, War Credits) remain the publisher's property: it is a right to use them in the game, not goods you own or can sell.</li></ul>
<h3>3. Forbidden</h3>
<ul><li>Scripts, bots, automated programs and any modification of the game.</li>
<li>Using a bug instead of reporting it.</li>
<li>Selling, buying or trading accounts or items for real money outside the game.</li>
<li>Insults, harassment, racist, sexual or illegal content, impersonation (especially of the administrator).</li></ul>
<h3>4. Sanctions</h3>
<p>If these rules are broken, the publisher may warn, mute in the chat, remove items obtained irregularly, block or delete the account, without refund of the purchases linked to the breach.</p>
<h3>5. Availability</h3>
<p>The publisher does his best to keep the game available, without any guarantee (maintenance, outages, updates). If the game had to close for good, players would be told at least 30 days before.</p>
<h3>6. Contact</h3>
<p>{email}</p>`,
  cgv: `<p>Terms of sale · version of {ver}. <i>The French version is the reference version.</i></p>
<h3>1. Seller</h3>
<p>{name}, micro-entreprise (France), SIRET {siret}, {address}, {email}.</p>
<h3>2. What is sold</h3>
<p>Digital content used in the game: War Credits (the game currency), packs, Command Pass. The content of each offer is described in the shop before the purchase.</p>
<p>War Credits and items <b>have no real-money value</b>: they cannot be refunded, exchanged for money or moved to another account.</p>
<h3>3. Prices and payment</h3>
<p>Prices are in euros, all taxes included (VAT not applicable, article 293 B of the French tax code, while the publisher is under the VAT exemption threshold). Payment is made by card on Stripe's secure page. Stripe sends a receipt by email.</p>
<h3>4. Delivery</h3>
<p>The content is added to the account as soon as Stripe confirms the payment, usually within seconds.</p>
<h3>5. Right of withdrawal</h3>
<p>Under article L221-28 13° of the French consumer code (EU directive 2011/83), the 14-day right of withdrawal does not apply to digital content supplied immediately <b>when the buyer asked for it and expressly waived this right</b>. Before each purchase, you tick a box to ask for immediate delivery and waive your right of withdrawal; this acceptance is recorded with the payment.</p>
<h3>6. A problem with a purchase</h3>
<p>If a purchase did not arrive or has a problem, write to {email} with your commander name and the date: the publisher answers within 7 days and delivers or refunds if the content was not supplied.</p>
<p>A payment refunded or disputed with the bank removes what it gave. Credits already spent become a negative balance, taken from the next Credits.</p>
<h3>7. Minors</h3>
<p>A minor must get a parent's permission before any purchase.</p>
<h3>8. Mediation and disputes</h3>
<p>If a dispute with the publisher is not solved, you can turn to the consumer mediator free of charge: <b>{mediator}</b> ({mediator_url}). These terms are governed by French law.</p>`,
  privacy: `<p>Version of {ver}. <i>The French version is the reference version.</i></p>
<h3>Controller</h3>
<p>{name}, {email}.</p>
<h3>Data kept and why</h3>
<ul><li><b>Commander name and password</b> (hashed, never readable): for your account.</li>
<li><b>Your game</b> (base, troops, items, purchases): to run the game.</li>
<li><b>IP address and login times</b>: security, fight against cheating and attacks, 12 months at most.</li>
<li><b>Chat messages</b>: the general and alliance chats keep the latest 200 messages, private messages 30 days.</li>
<li><b>Purchases</b>: product, price, date, acceptance of the terms of sale: accounting obligation, 10 years.</li></ul>
<p>Card data is processed by Stripe only (see Stripe's privacy policy). The game never sees it.</p>
<h3>What is not done</h3>
<p>No advertising, no sale of data, no tracking cookies. The browser only keeps your session and your settings (language, sound).</p>
<h3>Your rights</h3>
<p>You can ask for access to your data, its correction or the deletion of your account by writing to {email}. You can also contact the French data authority, the CNIL (cnil.fr).</p>`
}};
