
// ===== LANGUAGES (English is the reference text) =====
const LANGS=[['en','English'],['fr','Français'],['es','Español'],['de','Deutsch'],['it','Italiano'],['pt','Português'],['pl','Polski'],['tr','Türkçe'],['ru','Русский']];
const I18N={"fr": {"You": "Toi", "No alliance": "Aucune alliance", "Alliance": "Alliance", "Commander level": "Niveau du commandant", "Commander": "Commandant", "{h} h {m}": "{h} h {m}", "{h} h": "{h} h", "{n} min": "{n} min", "{s}s": "{s}s", "{m}m {s}s": "{m}min {s}s", "{h}h {m}m": "{h}h {m}min", "server processing": "traitement serveur", "Too many tries. Wait a few minutes.": "Trop d'essais. Attends quelques minutes.", "COMMANDER": "COMMANDANT", "POWER": "PUISSANCE", "Progress to next level": "Progression vers le niveau suivant", "Menu": "Menu", "Titan": "Titan", "Fields": "Champs", "Map": "Carte", "Base": "Base", "Shop": "Boutique", "Quests": "Quêtes", "Messages": "Messages", "Reports": "Rapports", "Inventory": "Inventaire", "Defense": "Défense", "Troops": "Troupes", "Research": "Recherche", "Settings": "Paramètres", "MAP": "CARTE", "FIELDS": "CHAMPS", "BASE": "BASE", "EMPIRE": "EMPIRE", "ALLIANCE": "ALLIANCE", "TITAN": "TITAN", "Build the Titan Hangar": "Construis le Hangar à Titan", "Hangar level {l} · Ready": "Hangar niveau {l} · Prêt", "Coming in a future update": "Arrive dans une prochaine mise à jour", "Enter base": "Entrer dans la base", "max": "max", "Lv": "Niv.", "metal": "métal", "wood": "bois", "stone": "pierre", "fuel": "carburant", "rations": "rations", "gold": "or", "Command Center": "Centre de commandement", "Heart of your base. Its level sets the maximum level of every other building.": "Cœur de ta base. Son niveau fixe le niveau maximum de tous les autres bâtiments.", "Defense Wall": "Mur de défense", "Protects your base and gives a defense bonus to your troops.": "Protège ta base et donne un bonus de défense à tes troupes.", "Barracks": "Caserne", "Trains infantry units.": "Entraîne l'infanterie.", "Garrison": "Garnison", "Houses and trains defensive troops. You can build several.": "Loge et entraîne des troupes défensives. Tu peux en construire plusieurs.", "Housing Block": "Logements", "Raises population, which supplies workers and recruits. You can build several.": "Augmente la population, qui fournit ouvriers et recrues. Tu peux en construire plusieurs.", "Warehouse": "Entrepôt", "Increases how many resources you can store.": "Augmente la quantité de ressources que tu peux stocker.", "Research Lab": "Laboratoire", "Unlocks technologies that improve your whole base.": "Débloque des technologies qui améliorent toute ta base.", "Vehicle Factory": "Usine de véhicules", "Builds armored vehicles.": "Construit des véhicules blindés.", "Rally Point": "Point de ralliement", "Organizes marches. Sets how many troops can leave the base at once.": "Organise les marches. Fixe combien de troupes peuvent quitter la base en même temps.", "Radar Station": "Station radar", "Detects incoming attacks.": "Détecte les attaques entrantes.", "Titan Hangar": "Hangar à Titan", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Abrite et répare ton Titan, le robot de combat géant qui mène tes attaques et défend la base. Son niveau fixe le niveau maximum du Titan.", "Metal Mine": "Mine de métal", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Extrait du minerai de métal du sol. Chaque niveau produit plus de métal par heure.", "Sawmill": "Scierie", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Coupe le bois de la forêt voisine. Chaque niveau produit plus de bois par heure.", "Stone Quarry": "Carrière", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Extrait et taille des blocs de pierre. Chaque niveau produit plus de pierre par heure.", "Fuel Pump": "Pompe à carburant", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pompe le pétrole brut et le raffine en carburant. Chaque niveau produit plus de carburant par heure.", "Mess Hall": "Cantine", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Prépare et stocke les rations pour nourrir tes troupes. Chaque niveau produit plus de rations par heure.", "Helipad": "Héliport", "Trains and maintains your air units: attack helicopters and gunships.": "Entraîne et entretient tes unités aériennes : hélicoptères d'attaque et appareils de combat.", "Max building level: {l}": "Niveau max des bâtiments : {l}", "Defense bonus +{p}%": "Bonus de défense +{p}%", "Infantry training speed +{p}%": "Vitesse d'entraînement de l'infanterie +{p}%", "Defensive troop capacity +{n}": "Capacité de troupes défensives +{n}", "Population +{n}": "Population +{n}", "Storage +{n} per resource": "Stockage +{n} par ressource", "Research speed +{p}%": "Vitesse de recherche +{p}%", "Vehicle production speed +{p}%": "Vitesse de production des véhicules +{p}%", "Max troops per march: {n}": "Troupes max par marche : {n}", "Titan maximum level: {n}": "Niveau maximum du Titan : {n}", "Air unit training speed +{p}%": "Vitesse d'entraînement aérien +{p}%", "Detects attacks and enemy troop count": "Détecte les attaques et le nombre de troupes ennemies", "Produces {i} {n} {r} per hour": "Produit {i} {n} de {r} par heure", "Recruit": "Recrue", "Cheap basic infantry. Weak alone, useful in large numbers.": "Infanterie de base bon marché. Faible seule, utile en grand nombre.", "Rifleman": "Fusilier", "Solid defensive infantry protected by a heavy riot shield.": "Infanterie défensive solide protégée par un lourd bouclier anti-émeute.", "Sniper": "Tireur d'élite", "Long-range marksman who strikes before the enemy can reach him.": "Tireur longue portée qui frappe avant que l'ennemi ne l'atteigne.", "Assault Trooper": "Commando d'assaut", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldat lourd en exosquelette armé d'une mitrailleuse rotative. Redoutable en attaque.", "Supply Truck": "Camion de ravitaillement", "Carries large amounts of loot back to your base.": "Ramène de grandes quantités de butin à ta base.", "Scout Drone": "Drone éclaireur", "Very fast scout. Spies on enemy bases and camps.": "Éclaireur très rapide. Espionne les bases et camps ennemis.", "Armored Carrier": "Véhicule blindé", "Heavily armored transport with a huge carrying capacity.": "Transport lourdement blindé avec une énorme capacité de charge.", "Battle Tank": "Char lourd", "Massive armored tank. Extremely tough and powerful.": "Char blindé massif. Extrêmement résistant et puissant.", "Rocket Artillery": "Artillerie à roquettes", "Rocket launcher truck that devastates enemies from very long range.": "Camion lance-roquettes qui dévaste l'ennemi à très longue portée.", "Attack Helicopter": "Hélicoptère d'attaque", "Fast air unit that strikes with rockets and a nose cannon.": "Unité aérienne rapide qui frappe avec roquettes et canon de nez.", "Gunship": "Appareil de combat", "Heavy tiltrotor gunship with huge firepower and armor.": "Appareil lourd à rotors basculants, énorme puissance de feu et blindage.", "Build a {b} first": "Construis d'abord : {b}", "Requires {b} level {l}": "Nécessite {b} niveau {l}", "Choose how many to train": "Choisis combien en entraîner", "Training queue full (5 orders max)": "File d'entraînement pleine (5 ordres max)", "Not enough population: build or upgrade Housing Blocks": "Population insuffisante : construis ou améliore des Logements", "Not enough resources": "Ressources insuffisantes", "Training {n} {u}": "Entraînement : {n} {u}", "{n} {u} ready": "{n} {u} prêts", "No rations left: your troops are deserting!": "Plus de rations : tes troupes désertent !", "The construction queue is busy": "La file de construction est occupée", "Maximum level reached": "Niveau maximum atteint", "{b} started": "{b} lancé", "{b} level {l} complete": "{b} niveau {l} terminé", "Construction cancelled (50% refunded)": "Construction annulée (50 % remboursés)", "Power": "Puissance", "power": "puissance", "Train": "Entraîner", "owned {n}": "possédés {n}", "Max": "Max", "each:": "chacun :", "Train troops": "Entraîner des troupes", "Population {a} / {b} · Training speed +{p}%": "Population {a} / {b} · Vitesse d'entraînement +{p}%", "Waiting": "En attente", "Finish (test)": "Terminer (test)", "Your Army": "Ton armée", "{n} troops": "{n} troupes", "Population": "Population", "Upkeep": "Entretien", "Net": "Net", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Tes troupes mangent plus de rations que tu n'en produis. Construis ou améliore des Cantines dans les Champs, sinon tes troupes déserteront quand les rations seront épuisées.", "Infantry · Barracks": "Infanterie · Caserne", "Vehicles · Vehicle Factory": "Véhicules · Usine de véhicules", "Air · Helipad": "Aérien · Héliport", "training": "en entraînement", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Touche la Caserne, l'Usine de véhicules ou l'Héliport dans ta base pour entraîner plus de troupes.", "Upgrading to level {l}": "Amélioration au niveau {l}", "Building to level {l}": "Construction niveau {l}", "Time left: {t}": "Temps restant : {t}", "Finish now (test)": "Terminer maintenant (test)", "Cancel": "Annuler", "Level {l} / {m}": "Niveau {l} / {m}", "Current:": "Actuel :", "Your Titan": "Ton Titan", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Ton Titan est prêt et monte la garde devant le hangar. Ses niveaux, pièces d'armure et attaques arriveront avec la carte du monde.", "Upgrade to level {l}": "Améliorer au niveau {l}", "Next:": "Suivant :", "Upgrade": "Améliorer", "Not built": "Non construit", "Build": "Construire", "Empty field": "Champ libre", "Choose what to produce on this field.": "Choisis quoi produire sur ce champ.", "Empty plot": "Emplacement libre", "Choose a building to construct here.": "Choisis un bâtiment à construire ici.", "Every unique building is already built.": "Tous les bâtiments uniques sont déjà construits.", "Language": "Langue", "Test tools": "Outils de test", "Erase your save and restart from zero. This option will be removed in the final game.": "Efface ta sauvegarde et recommence de zéro. Cette option sera retirée du jeu final.", "Reset save": "Réinitialiser la partie", "Reset your base?": "Réinitialiser ta base ?", "Forest": "Forêt", "Rocky Hills": "Collines rocheuses", "Metal Deposit": "Gisement de métal", "Oil Field": "Champ pétrolifère", "Farmland": "Terres agricoles", "Plains": "Plaine", "Raider Camp": "Camp de pillards", "Your base": "Ta base", "Empty land. Nothing to collect here.": "Terrain vide. Rien à récupérer ici.", "Level {l}": "Niveau {l}", "Distance: {d} tiles": "Distance : {d} cases", "Enemy forces": "Forces ennemies", "Possible loot": "Butin possible", "Attack": "Attaquer", "GO": "ALLER", "Back to my base": "Retour à ma base", "Send troops": "Envoyer des troupes", "Available: {n}": "Disponibles : {n}", "Troops: {a} / {b}": "Troupes : {a} / {b}", "Travel time: {t}": "Trajet : {t}", "Carry capacity: {n}": "Capacité de transport : {n}", "Launch attack": "Lancer l'attaque", "Too many troops for one march (max {n})": "Trop de troupes pour une marche (max {n})", "All marches are busy ({n} max)": "Toutes les marches sont occupées ({n} max)", "Choose your troops": "Choisis tes troupes", "You have no troops. Train some at the Barracks.": "Tu n'as pas de troupes. Entraînes-en à la Caserne.", "Troops sent to {p}": "Troupes envoyées vers {p}", "Victory": "Victoire", "Defeat": "Défaite", "Victory at {p}": "Victoire : {p}", "Defeat at {p}": "Défaite : {p}", "Troops returned with loot": "Troupes revenues avec le butin", "No reports yet.": "Aucun rapport pour l'instant.", "Your troops": "Tes troupes", "Enemy": "Ennemi", "Sent": "Envoyés", "Lost": "Perdus", "Killed": "Tués", "Loot": "Butin", "Marching": "En marche", "Returning": "Retour", "Marches: {a} / {b}": "Marches : {a} / {b}", "{t} ago": "il y a {t}", "Raiders": "Pillards", "All enemy troops were destroyed.": "Toutes les troupes ennemies ont été détruites.", "Your troops had to retreat.": "Tes troupes ont dû battre en retraite.", "Armor Plate": "Plaque de blindage", "Arm Cannon": "Canon de bras", "Jet Reactor": "Réacteur dorsal", "Armored Legs": "Jambes blindées", "Standard": "Standard", "Advanced": "Avancé", "Elite": "Élite", "Prototype": "Prototype", "Titan reached level {l}!": "Le Titan passe au niveau {l} !", "On a mission": "En mission", "Too damaged to fight (30% needed)": "Trop endommagé pour combattre (30 % requis)", "Ready for battle": "Prêt au combat", "Upgrade the Titan Hangar to raise the maximum level.": "Améliore le Hangar à Titan pour augmenter le niveau maximum.", "troop attack": "d'attaque des troupes", "Equipment": "Équipement", "Empty": "Vide", "Remove": "Retirer", "Parts inventory": "Pièces en stock", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Bats des camps de pillards pour gagner des pièces d'équipement. Les camps de haut niveau donnent de meilleures pièces.", "Equip": "Équiper", "Scrap for gold": "Recycler contre de l'or", "Manage Titan": "Gérer le Titan", "Send the Titan": "Envoyer le Titan", "Titan unavailable": "Titan indisponible", "Titan: {a} XP, health {b}%": "Titan : {a} XP, santé {b} %", "New part won: {p}": "Nouvelle pièce gagnée : {p}", "Lv {l} · Health {h}%": "Niv. {l} · Santé {h} %", "Extraction": "Extraction", "Forestry": "Exploitation forestière", "Refining": "Raffinage", "Military Rations": "Rations militaires", "Engineering": "Ingénierie", "Intensive Training": "Entraînement intensif", "Ballistics": "Balistique", "Armor Plating": "Blindage", "Field Medicine": "Médecine de terrain", "Engines": "Moteurs", "Logistics": "Logistique", "Robotics": "Robotique", "Metal and stone production +{p}%": "Production de métal et de pierre +{p} %", "Wood production +{p}%": "Production de bois +{p} %", "Fuel production +{p}%": "Production de carburant +{p} %", "Rations production +{p}% · troop upkeep -{q}%": "Production de rations +{p} % · consommation des troupes -{q} %", "Construction speed +{p}%": "Vitesse de construction +{p} %", "Troop training speed +{p}%": "Vitesse d'entraînement des troupes +{p} %", "Troop attack +{p}%": "Attaque des troupes +{p} %", "Troop defense +{p}%": "Défense des troupes +{p} %", "Troop health +{p}%": "Vie des troupes +{p} %", "March speed +{p}%": "Vitesse de marche +{p} %", "Carry capacity +{p}%": "Capacité de transport +{p} %", "Titan attack, defense and health +{p}%": "Attaque, défense et santé du Titan +{p} %", "Economy": "Économie", "Military": "Militaire", "Logistics & Titan": "Logistique & Titan", "Requires research: {r}": "Recherche nécessaire : {r}", "{t} level {l}": "{t} niveau {l}", "{b} level {l}": "{b} niveau {l}", "A research is already in progress": "Une recherche est déjà en cours", "Research started: {t}": "Recherche lancée : {t}", "{t} level {l} researched": "{t} niveau {l} terminée", "Research cancelled (50% refunded)": "Recherche annulée (50 % remboursés)", "Unlocks:": "Débloque :", "A technology cannot go above the level of the Research Lab.": "Une technologie ne peut pas dépasser le niveau du Laboratoire.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Construis un Laboratoire sur un emplacement libre de ta base pour débloquer les technologies.", "In progress:": "En cours :", "Not researched yet": "Pas encore recherchée", "Research in progress": "Recherche en cours", "No research in progress": "Aucune recherche en cours", "Open research": "Ouvrir les recherches", "Not enough room in your Garrisons": "Pas assez de place dans tes Garnisons", "{n} {u} placed in defense": "{n} {u} placés en défense", "{n} {u} withdrawn from defense": "{n} {u} retirés de la défense", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Les troupes en défense restent dans ta base et combattent quand un autre joueur t'attaque. Elles ne peuvent pas partir en marche.", "Garrison places: {a} / {b}": "Places en Garnison : {a} / {b}", "Wall: defense bonus +{p}%": "Mur : bonus de défense +{p} %", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Construis une Garnison pour placer des troupes en défense. Chaque niveau de Garnison donne 200 places.", "In defense: {n}": "En défense : {n}", "in defense": "en défense", "Defend": "Défendre", "Withdraw": "Retirer", "All in defense": "Tout en défense", "Withdraw all": "Tout retirer", "Manage defense": "Gérer la défense", "Small gold pouch": "Petite bourse d'or", "Medium gold pouch": "Bourse d'or moyenne", "Large gold pouch": "Grande bourse d'or", "Small crate of {r}": "Petite caisse de {r}", "Medium crate of {r}": "Caisse moyenne de {r}", "Large crate of {r}": "Grande caisse de {r}", "Speed-up {t}": "Accélérateur {t}", "Titan repair kit (+{p}%)": "Kit de réparation du Titan (+{p} %)", "Supply drop": "Largage de ravitaillement", "Gives {n} {r}.": "Donne {n} {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Réduit de {t} le temps d'une construction, d'une recherche ou d'un entraînement. À utiliser depuis la barre de progression.", "Repairs your Titan by {p}%.": "Répare ton Titan de {p} %.", "Opens to give 3 random items.": "Contient 3 objets au hasard.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Utilise les accélérateurs depuis la barre de progression d'une construction, d'une recherche ou d'un entraînement.", "Your Titan is already fully repaired": "Ton Titan est déjà entièrement réparé", "Titan repaired: {h}%": "Titan réparé : {h} %", "Resources": "Ressources", "Speed-ups": "Accélérateurs", "Other": "Autres", "Win items by defeating Raider Camps and taking resource fields on the map.": "Gagne des objets en battant les camps de pillards et en prenant des terrains de ressources sur la carte.", "Your inventory is empty.": "Ton inventaire est vide.", "Open": "Ouvrir", "Use": "Utiliser", "Use all": "Tout utiliser", "Speed up": "Accélérer", "Nothing to speed up": "Rien à accélérer", "You have no speed-ups. Defeat Raider Camps to win some.": "Tu n'as aucun accélérateur. Bats des camps de pillards pour en gagner.", "Items won: {i}": "Objets gagnés : {i}", "Items won": "Objets gagnés", "Bonus rewards (chance)": "Récompenses bonus (chance)", "Bonus item": "Objet bonus", "Second item": "2e objet", "Titan part (with the Titan)": "Pièce de Titan (avec le Titan)", "Use it from the progress bar at the bottom of the screen.": "À utiliser depuis la barre de progression en bas de l'écran.", "{n} d": "{n} j", "{r} production boost": "Bonus de production : {r}", "Combat stimulant": "Stimulant de combat", "Shield generator": "Générateur de bouclier", "Forced march": "Marche forcée", "Lightning march": "Marche éclair", "Drill manual": "Manuel d'instruction", "{r} production +{p}% for 24 hours.": "Production de {r} +{p} % pendant 24 heures.", "Troop attack +{p}% for 24 hours.": "Attaque des troupes +{p} % pendant 24 heures.", "Troop defense +{p}% for 24 hours.": "Défense des troupes +{p} % pendant 24 heures.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Réduit de {p} % le temps restant d'une marche. À utiliser depuis la barre de progression.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Réduit de {p} % le temps restant d'un entraînement. À utiliser depuis la barre de progression.", "{i} active: {t}": "{i} actif : {t}", "Common": "Commun", "Uncommon": "Peu commun", "Rare": "Rare", "Very rare": "Très rare", "Boosts": "Bonus", "Marches": "Marches", "Training": "Entraînement", "Active boosts": "Bonus actifs", "Storage: {n} per resource": "Stockage : {n} par ressource", "{d}d {h}h": "{d}j {h}h", "Training speed of all troops +{p}%": "Vitesse d'entraînement de toutes les troupes +{p} %", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Chaque niveau de Garnison accélère tous les entraînements de 3 %. La recherche Entraînement intensif en ajoute encore.", "Your session has expired, please log in again.": "Ta session a expiré, reconnecte-toi.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "Le nom doit avoir de 3 à 16 lettres, chiffres, espaces, - ou _.", "The password must have at least 6 characters.": "Le mot de passe doit avoir au moins 6 caractères.", "This name is already taken.": "Ce nom est déjà pris.", "Wrong name or password.": "Nom ou mot de passe incorrect.", "Too many tries. Wait one minute.": "Trop d'essais. Attends une minute.", "Server error. Try again later.": "Erreur du serveur. Réessaie plus tard.", "Military strategy · near future": "Stratégie militaire · futur proche", "Log in": "Se connecter", "Create an account": "Créer un compte", "Commander name": "Nom du commandant", "Password": "Mot de passe", "Repeat the password": "Répète le mot de passe", "The two passwords are different.": "Les deux mots de passe sont différents.", "Cannot reach the server.": "Impossible de joindre le serveur.", "Bring the game saved on this device into your new account?": "Reprendre la partie enregistrée sur cet appareil dans ton nouveau compte ?", "Welcome, commander {n}!": "Bienvenue, commandant {n} !", "Base of {n}": "Base de {n}", "Commander level {l}": "Commandant niveau {l}", "Attacks between players arrive in the next update.": "Les attaques entre joueurs arrivent dans la prochaine mise à jour.", "Account": "Compte", "Logged in as {n}": "Connecté en tant que {n}", "Log out": "Se déconnecter", "General": "Général", "Production": "Production", "Combat": "Combat", "No item in this category.": "Aucun objet dans cette catégorie.", "Done": "Fait", "Action refused by the server.": "Action refusée par le serveur.", "Administration": "Administration", "Reserved for administrators.": "Réservé aux administrateurs.", "Administrator account": "Compte administrateur", "Test account": "Compte test", "Normal player": "Joueur normal", "all": "tout", "Give": "Donner", "Items": "Objets", "10 of every item": "10 de chaque objet", "Time": "Temps", "Finish everything now": "Tout terminer maintenant", "Base and research": "Base et recherches", "All buildings to this level": "Tous les bâtiments à ce niveau", "All research to this level": "Toutes les recherches à ce niveau", "Set level and repair": "Mettre ce niveau et réparer", "Test accounts": "Comptes test", "Create": "Créer", "Show all accounts": "Voir tous les comptes", "Account created: {n}": "Compte créé : {n}", "Supply chest": "Caisse de ravitaillement", "Military cache": "Cache militaire", "Elite arsenal": "Arsenal d'élite", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Ouvre-le pour gagner une récompense au hasard : troupes, accélérateurs, ressources, bonus ou pièces de Titan.", "Chests": "Coffres", "See the chances": "Voir les chances", "Titan part": "Pièce de Titan", "Small crate of a random resource": "Petite caisse d'une ressource au hasard", "Medium crate of a random resource": "Caisse moyenne d'une ressource au hasard", "Large crate of a random resource": "Grande caisse d'une ressource au hasard", "Production boost (random resource)": "Bonus de production (ressource au hasard)", "Epic": "Épique", "Legendary": "Légendaire", "Collect": "Récupérer", "Open another": "Ouvrir encore", "Open all": "Ouvrir tout", "Order refused by the server.": "Ordre refusé par le serveur.", "Local time (offline demo)": "Heure locale (démo hors ligne)", "offline": "hors ligne", "Server time": "Heure du serveur", "latency": "latence", "Build a {b}": "Construis : {b}", "Build the {b}": "Construis : {b}", "Upgrade the {b} to level {l}": "Monte {b} au niveau {l}", "Have {n} {u}": "Avoir {n} {u}", "Win a battle against a Raider Camp": "Gagne une bataille contre un camp de pillards", "Research any technology": "Recherche n'importe quelle technologie", "Have {n} fields": "Avoir {n} champs", "Have an army of {n} troops": "Avoir une armée de {n} troupes", "Win {n} battles": "Gagne {n} batailles", "Reach {n} research levels in total": "Atteins {n} niveaux de recherche au total", "Titan level {l}": "Titan niveau {l}", "Equip a part on your Titan": "Équipe une pièce sur ton Titan", "Reach {n} power": "Atteins {n} de puissance", "Tutorial": "Tutoriel", "Construction": "Construction", "Quest complete: {q}": "Quête terminée : {q}", "Complete quests to win resources, speed-ups and chests.": "Termine des quêtes pour gagner des ressources, des accélérateurs et des coffres.", "All quests of this category are complete!": "Toutes les quêtes de cette catégorie sont terminées !", "Reward:": "Récompense :", "Go": "Aller", "Free ticket of the day collected!": "Ticket gratuit du jour récupéré !", "Fortune ticket": "Ticket de la roue", "Fortune medal": "Médaillon de la roue", "One spin of the ticket wheel.": "Un tour de la roue des tickets.", "One spin of the medal wheel, with the best prizes.": "Un tour de la roue des médaillons, avec les meilleurs lots.", "Wheel of fortune": "Roue de la fortune", "Spin the wheel to win troops, speed-ups, resources and chests.": "Fais tourner la roue pour gagner des troupes, des accélérateurs, des ressources et des coffres.", "Ticket wheel": "Roue des tickets", "Medal wheel": "Roue des médaillons", "Spin": "Tourner", "Collect the free ticket of the day": "Récupérer le ticket gratuit du jour", "Next free ticket in {t}": "Prochain ticket gratuit dans {t}", "Medals are won in the hardest camps, in big quests and in chests.": "Les médaillons se gagnent dans les camps les plus durs, les grosses quêtes et les coffres.", "already_claimed": "Déjà récupéré aujourd'hui.", "Wheel": "Roue"}, "es": {"You": "Tú", "No alliance": "Sin alianza", "Alliance": "Alianza", "Commander level": "Nivel del comandante", "Commander": "Comandante", "{h} h {m}": "{h} h {m}", "{h} h": "{h} h", "{n} min": "{n} min", "{s}s": "{s}s", "{m}m {s}s": "{m}min {s}s", "{h}h {m}m": "{h}h {m}min", "server processing": "procesamiento del servidor", "Too many tries. Wait a few minutes.": "Demasiados intentos. Espera unos minutos.", "COMMANDER": "COMANDANTE", "POWER": "PODER", "Progress to next level": "Progreso al siguiente nivel", "Menu": "Menú", "Titan": "Titán", "Fields": "Campos", "Map": "Mapa", "Base": "Base", "Shop": "Tienda", "Quests": "Misiones", "Messages": "Mensajes", "Reports": "Informes", "Inventory": "Inventario", "Defense": "Defensa", "Troops": "Tropas", "Research": "Investigación", "Settings": "Ajustes", "MAP": "MAPA", "FIELDS": "CAMPOS", "BASE": "BASE", "EMPIRE": "IMPERIO", "ALLIANCE": "ALIANZA", "TITAN": "TITÁN", "Build the Titan Hangar": "Construye el Hangar del Titán", "Hangar level {l} · Ready": "Hangar nivel {l} · Listo", "Coming in a future update": "Llegará en una próxima actualización", "Enter base": "Entrar en la base", "max": "máx.", "Lv": "Nv.", "metal": "metal", "wood": "madera", "stone": "piedra", "fuel": "combustible", "rations": "raciones", "gold": "oro", "Command Center": "Centro de mando", "Heart of your base. Its level sets the maximum level of every other building.": "Corazón de tu base. Su nivel fija el nivel máximo de todos los demás edificios.", "Defense Wall": "Muro defensivo", "Protects your base and gives a defense bonus to your troops.": "Protege tu base y da una bonificación de defensa a tus tropas.", "Barracks": "Cuartel", "Trains infantry units.": "Entrena unidades de infantería.", "Garrison": "Guarnición", "Houses and trains defensive troops. You can build several.": "Aloja y entrena tropas defensivas. Puedes construir varias.", "Housing Block": "Viviendas", "Raises population, which supplies workers and recruits. You can build several.": "Aumenta la población, que aporta trabajadores y reclutas. Puedes construir varias.", "Warehouse": "Almacén", "Increases how many resources you can store.": "Aumenta la cantidad de recursos que puedes almacenar.", "Research Lab": "Laboratorio", "Unlocks technologies that improve your whole base.": "Desbloquea tecnologías que mejoran toda tu base.", "Vehicle Factory": "Fábrica de vehículos", "Builds armored vehicles.": "Construye vehículos blindados.", "Rally Point": "Punto de reunión", "Organizes marches. Sets how many troops can leave the base at once.": "Organiza las marchas. Fija cuántas tropas pueden salir de la base a la vez.", "Radar Station": "Estación de radar", "Detects incoming attacks.": "Detecta los ataques entrantes.", "Titan Hangar": "Hangar del Titán", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Aloja y repara tu Titán, el robot de combate gigante que dirige tus ataques y defiende la base. Su nivel fija el nivel máximo del Titán.", "Metal Mine": "Mina de metal", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Extrae mineral de metal del suelo. Cada nivel produce más metal por hora.", "Sawmill": "Aserradero", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Corta madera del bosque cercano. Cada nivel produce más madera por hora.", "Stone Quarry": "Cantera", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Extrae y corta bloques de piedra. Cada nivel produce más piedra por hora.", "Fuel Pump": "Bomba de combustible", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Bombea crudo y lo refina en combustible. Cada nivel produce más combustible por hora.", "Mess Hall": "Comedor", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Cocina y almacena raciones para alimentar a tus tropas. Cada nivel produce más raciones por hora.", "Helipad": "Helipuerto", "Trains and maintains your air units: attack helicopters and gunships.": "Entrena y mantiene tus unidades aéreas: helicópteros de ataque y cañoneros.", "Max building level: {l}": "Nivel máx. de edificios: {l}", "Defense bonus +{p}%": "Bonificación de defensa +{p}%", "Infantry training speed +{p}%": "Velocidad de entrenamiento de infantería +{p}%", "Defensive troop capacity +{n}": "Capacidad de tropas defensivas +{n}", "Population +{n}": "Población +{n}", "Storage +{n} per resource": "Almacenamiento +{n} por recurso", "Research speed +{p}%": "Velocidad de investigación +{p}%", "Vehicle production speed +{p}%": "Velocidad de producción de vehículos +{p}%", "Max troops per march: {n}": "Tropas máx. por marcha: {n}", "Titan maximum level: {n}": "Nivel máximo del Titán: {n}", "Air unit training speed +{p}%": "Velocidad de entrenamiento aéreo +{p}%", "Detects attacks and enemy troop count": "Detecta ataques y el número de tropas enemigas", "Produces {i} {n} {r} per hour": "Produce {i} {n} de {r} por hora", "Recruit": "Recluta", "Cheap basic infantry. Weak alone, useful in large numbers.": "Infantería básica barata. Débil sola, útil en grandes cantidades.", "Rifleman": "Fusilero", "Solid defensive infantry protected by a heavy riot shield.": "Infantería defensiva sólida protegida por un pesado escudo antidisturbios.", "Sniper": "Francotirador", "Long-range marksman who strikes before the enemy can reach him.": "Tirador de largo alcance que ataca antes de que el enemigo lo alcance.", "Assault Trooper": "Soldado de asalto", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldado pesado con exoesqueleto y ametralladora rotativa. Letal en ataque.", "Supply Truck": "Camión de suministros", "Carries large amounts of loot back to your base.": "Lleva grandes cantidades de botín a tu base.", "Scout Drone": "Dron explorador", "Very fast scout. Spies on enemy bases and camps.": "Explorador muy rápido. Espía bases y campamentos enemigos.", "Armored Carrier": "Transporte blindado", "Heavily armored transport with a huge carrying capacity.": "Transporte muy blindado con enorme capacidad de carga.", "Battle Tank": "Tanque de combate", "Massive armored tank. Extremely tough and powerful.": "Tanque blindado masivo. Extremadamente resistente y poderoso.", "Rocket Artillery": "Artillería de cohetes", "Rocket launcher truck that devastates enemies from very long range.": "Camión lanzacohetes que arrasa enemigos a muy larga distancia.", "Attack Helicopter": "Helicóptero de ataque", "Fast air unit that strikes with rockets and a nose cannon.": "Unidad aérea rápida que ataca con cohetes y un cañón frontal.", "Gunship": "Cañonero", "Heavy tiltrotor gunship with huge firepower and armor.": "Cañonero pesado de rotores basculantes con enorme potencia y blindaje.", "Build a {b} first": "Construye primero: {b}", "Requires {b} level {l}": "Requiere {b} nivel {l}", "Choose how many to train": "Elige cuántas entrenar", "Training queue full (5 orders max)": "Cola de entrenamiento llena (5 órdenes máx.)", "Not enough population: build or upgrade Housing Blocks": "Población insuficiente: construye o mejora Viviendas", "Not enough resources": "Recursos insuficientes", "Training {n} {u}": "Entrenando {n} {u}", "{n} {u} ready": "{n} {u} listos", "No rations left: your troops are deserting!": "¡Sin raciones: tus tropas desertan!", "The construction queue is busy": "La cola de construcción está ocupada", "Maximum level reached": "Nivel máximo alcanzado", "{b} started": "{b} iniciado", "{b} level {l} complete": "{b} nivel {l} completado", "Construction cancelled (50% refunded)": "Construcción cancelada (50 % reembolsado)", "Power": "Poder", "power": "poder", "Train": "Entrenar", "owned {n}": "tienes {n}", "Max": "Máx.", "each:": "cada uno:", "Train troops": "Entrenar tropas", "Population {a} / {b} · Training speed +{p}%": "Población {a} / {b} · Velocidad de entrenamiento +{p}%", "Waiting": "En espera", "Finish (test)": "Terminar (prueba)", "Your Army": "Tu ejército", "{n} troops": "{n} tropas", "Population": "Población", "Upkeep": "Mantenimiento", "Net": "Neto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Tus tropas comen más raciones de las que produces. Construye o mejora Comedores en los Campos, o tus tropas desertarán cuando se acaben las raciones.", "Infantry · Barracks": "Infantería · Cuartel", "Vehicles · Vehicle Factory": "Vehículos · Fábrica de vehículos", "Air · Helipad": "Aéreo · Helipuerto", "training": "entrenando", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Toca el Cuartel, la Fábrica de vehículos o el Helipuerto en tu base para entrenar más tropas.", "Upgrading to level {l}": "Mejorando a nivel {l}", "Building to level {l}": "Construyendo nivel {l}", "Time left: {t}": "Tiempo restante: {t}", "Finish now (test)": "Terminar ahora (prueba)", "Cancel": "Cancelar", "Level {l} / {m}": "Nivel {l} / {m}", "Current:": "Actual:", "Your Titan": "Tu Titán", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Tu Titán está listo y hace guardia frente al hangar. Sus niveles, piezas de blindaje y ataques llegarán con el mapa del mundo.", "Upgrade to level {l}": "Mejorar a nivel {l}", "Next:": "Siguiente:", "Upgrade": "Mejorar", "Not built": "Sin construir", "Build": "Construir", "Empty field": "Campo vacío", "Choose what to produce on this field.": "Elige qué producir en este campo.", "Empty plot": "Parcela vacía", "Choose a building to construct here.": "Elige un edificio para construir aquí.", "Every unique building is already built.": "Todos los edificios únicos ya están construidos.", "Language": "Idioma", "Test tools": "Herramientas de prueba", "Erase your save and restart from zero. This option will be removed in the final game.": "Borra tu partida y empieza de cero. Esta opción se eliminará en el juego final.", "Reset save": "Reiniciar partida", "Reset your base?": "¿Reiniciar tu base?", "Forest": "Bosque", "Rocky Hills": "Colinas rocosas", "Metal Deposit": "Yacimiento de metal", "Oil Field": "Campo petrolífero", "Farmland": "Tierras de cultivo", "Plains": "Llanura", "Raider Camp": "Campamento de saqueadores", "Your base": "Tu base", "Empty land. Nothing to collect here.": "Terreno vacío. Nada que recoger aquí.", "Level {l}": "Nivel {l}", "Distance: {d} tiles": "Distancia: {d} casillas", "Enemy forces": "Fuerzas enemigas", "Possible loot": "Botín posible", "Attack": "Atacar", "GO": "IR", "Back to my base": "Volver a mi base", "Send troops": "Enviar tropas", "Available: {n}": "Disponibles: {n}", "Troops: {a} / {b}": "Tropas: {a} / {b}", "Travel time: {t}": "Tiempo de viaje: {t}", "Carry capacity: {n}": "Capacidad de carga: {n}", "Launch attack": "Lanzar ataque", "Too many troops for one march (max {n})": "Demasiadas tropas para una marcha (máx. {n})", "All marches are busy ({n} max)": "Todas las marchas están ocupadas ({n} máx.)", "Choose your troops": "Elige tus tropas", "You have no troops. Train some at the Barracks.": "No tienes tropas. Entrena algunas en el Cuartel.", "Troops sent to {p}": "Tropas enviadas a {p}", "Victory": "Victoria", "Defeat": "Derrota", "Victory at {p}": "Victoria en {p}", "Defeat at {p}": "Derrota en {p}", "Troops returned with loot": "Las tropas volvieron con el botín", "No reports yet.": "Aún no hay informes.", "Your troops": "Tus tropas", "Enemy": "Enemigo", "Sent": "Enviadas", "Lost": "Perdidas", "Killed": "Eliminados", "Loot": "Botín", "Marching": "En marcha", "Returning": "Regresando", "Marches: {a} / {b}": "Marchas: {a} / {b}", "{t} ago": "hace {t}", "Raiders": "Saqueadores", "All enemy troops were destroyed.": "Todas las tropas enemigas fueron destruidas.", "Your troops had to retreat.": "Tus tropas tuvieron que retirarse.", "Armor Plate": "Placa de blindaje", "Arm Cannon": "Cañón de brazo", "Jet Reactor": "Reactor dorsal", "Armored Legs": "Piernas blindadas", "Standard": "Estándar", "Advanced": "Avanzado", "Elite": "Élite", "Prototype": "Prototipo", "Titan reached level {l}!": "¡El Titán alcanza el nivel {l}!", "On a mission": "En misión", "Too damaged to fight (30% needed)": "Demasiado dañado para luchar (30 % necesario)", "Ready for battle": "Listo para combatir", "Upgrade the Titan Hangar to raise the maximum level.": "Mejora el Hangar del Titán para subir el nivel máximo.", "troop attack": "ataque de tropas", "Equipment": "Equipamiento", "Empty": "Vacío", "Remove": "Quitar", "Parts inventory": "Piezas en inventario", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Derrota campamentos de saqueadores para ganar piezas. Los campamentos de mayor nivel dan mejores piezas.", "Equip": "Equipar", "Scrap for gold": "Reciclar por oro", "Manage Titan": "Gestionar el Titán", "Send the Titan": "Enviar el Titán", "Titan unavailable": "Titán no disponible", "Titan: {a} XP, health {b}%": "Titán: {a} XP, salud {b}%", "New part won: {p}": "Nueva pieza ganada: {p}", "Lv {l} · Health {h}%": "Nv. {l} · Salud {h}%", "Extraction": "Extracción", "Forestry": "Silvicultura", "Refining": "Refinado", "Military Rations": "Raciones militares", "Engineering": "Ingeniería", "Intensive Training": "Entrenamiento intensivo", "Ballistics": "Balística", "Armor Plating": "Blindaje", "Field Medicine": "Medicina de campaña", "Engines": "Motores", "Logistics": "Logística", "Robotics": "Robótica", "Metal and stone production +{p}%": "Producción de metal y piedra +{p}%", "Wood production +{p}%": "Producción de madera +{p}%", "Fuel production +{p}%": "Producción de combustible +{p}%", "Rations production +{p}% · troop upkeep -{q}%": "Producción de raciones +{p}% · consumo de tropas -{q}%", "Construction speed +{p}%": "Velocidad de construcción +{p}%", "Troop training speed +{p}%": "Velocidad de entrenamiento +{p}%", "Troop attack +{p}%": "Ataque de las tropas +{p}%", "Troop defense +{p}%": "Defensa de las tropas +{p}%", "Troop health +{p}%": "Salud de las tropas +{p}%", "March speed +{p}%": "Velocidad de marcha +{p}%", "Carry capacity +{p}%": "Capacidad de carga +{p}%", "Titan attack, defense and health +{p}%": "Ataque, defensa y salud del Titán +{p}%", "Economy": "Economía", "Military": "Militar", "Logistics & Titan": "Logística y Titán", "Requires research: {r}": "Requiere investigación: {r}", "{t} level {l}": "{t} nivel {l}", "{b} level {l}": "{b} nivel {l}", "A research is already in progress": "Ya hay una investigación en curso", "Research started: {t}": "Investigación iniciada: {t}", "{t} level {l} researched": "{t} nivel {l} investigada", "Research cancelled (50% refunded)": "Investigación cancelada (50% reembolsado)", "Unlocks:": "Desbloquea:", "A technology cannot go above the level of the Research Lab.": "Una tecnología no puede superar el nivel del Laboratorio.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Construye un Laboratorio en una parcela libre de tu base para desbloquear tecnologías.", "In progress:": "En curso:", "Not researched yet": "Aún no investigada", "Research in progress": "Investigación en curso", "No research in progress": "Ninguna investigación en curso", "Open research": "Abrir investigaciones", "Not enough room in your Garrisons": "No hay espacio suficiente en tus Guarniciones", "{n} {u} placed in defense": "{n} {u} en defensa", "{n} {u} withdrawn from defense": "{n} {u} retirados de la defensa", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Las tropas en defensa se quedan en tu base y luchan cuando otro jugador te ataca. No pueden salir de marcha.", "Garrison places: {a} / {b}": "Plazas de Guarnición: {a} / {b}", "Wall: defense bonus +{p}%": "Muro: bono de defensa +{p}%", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Construye una Guarnición para poner tropas en defensa. Cada nivel de Guarnición da 200 plazas.", "In defense: {n}": "En defensa: {n}", "in defense": "en defensa", "Defend": "Defender", "Withdraw": "Retirar", "All in defense": "Todo en defensa", "Withdraw all": "Retirar todo", "Manage defense": "Gestionar la defensa", "Small gold pouch": "Bolsa de oro pequeña", "Medium gold pouch": "Bolsa de oro mediana", "Large gold pouch": "Bolsa de oro grande", "Small crate of {r}": "Caja pequeña de {r}", "Medium crate of {r}": "Caja mediana de {r}", "Large crate of {r}": "Caja grande de {r}", "Speed-up {t}": "Acelerador {t}", "Titan repair kit (+{p}%)": "Kit de reparación del Titán (+{p}%)", "Supply drop": "Suministro aéreo", "Gives {n} {r}.": "Da {n} {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Reduce en {t} el tiempo de una construcción, investigación o entrenamiento. Úsalo desde la barra de progreso.", "Repairs your Titan by {p}%.": "Repara tu Titán un {p}%.", "Opens to give 3 random items.": "Contiene 3 objetos al azar.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Usa los aceleradores desde la barra de progreso de una construcción, investigación o entrenamiento.", "Your Titan is already fully repaired": "Tu Titán ya está totalmente reparado", "Titan repaired: {h}%": "Titán reparado: {h}%", "Resources": "Recursos", "Speed-ups": "Aceleradores", "Other": "Otros", "Win items by defeating Raider Camps and taking resource fields on the map.": "Gana objetos derrotando campamentos de saqueadores y tomando terrenos de recursos en el mapa.", "Your inventory is empty.": "Tu inventario está vacío.", "Open": "Abrir", "Use": "Usar", "Use all": "Usar todo", "Speed up": "Acelerar", "Nothing to speed up": "Nada que acelerar", "You have no speed-ups. Defeat Raider Camps to win some.": "No tienes aceleradores. Derrota campamentos de saqueadores para ganar algunos.", "Items won: {i}": "Objetos ganados: {i}", "Items won": "Objetos ganados", "Bonus rewards (chance)": "Recompensas extra (probabilidad)", "Bonus item": "Objeto extra", "Second item": "2.º objeto", "Titan part (with the Titan)": "Pieza de Titán (con el Titán)", "Use it from the progress bar at the bottom of the screen.": "Úsalo desde la barra de progreso en la parte inferior de la pantalla.", "{n} d": "{n} d", "{r} production boost": "Bono de producción: {r}", "Combat stimulant": "Estimulante de combate", "Shield generator": "Generador de escudo", "Forced march": "Marcha forzada", "Lightning march": "Marcha relámpago", "Drill manual": "Manual de instrucción", "{r} production +{p}% for 24 hours.": "Producción de {r} +{p}% durante 24 horas.", "Troop attack +{p}% for 24 hours.": "Ataque de las tropas +{p}% durante 24 horas.", "Troop defense +{p}% for 24 hours.": "Defensa de las tropas +{p}% durante 24 horas.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Reduce un {p}% el tiempo restante de una marcha. Úsalo desde la barra de progreso.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Reduce un {p}% el tiempo restante de un entrenamiento. Úsalo desde la barra de progreso.", "{i} active: {t}": "{i} activo: {t}", "Common": "Común", "Uncommon": "Poco común", "Rare": "Raro", "Very rare": "Muy raro", "Boosts": "Bonificaciones", "Marches": "Marchas", "Training": "Entrenamiento", "Active boosts": "Bonificaciones activas", "Storage: {n} per resource": "Almacén: {n} por recurso", "{d}d {h}h": "{d}d {h}h", "Training speed of all troops +{p}%": "Velocidad de entrenamiento de todas las tropas +{p}%", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Cada nivel de Guarnición acelera todo el entrenamiento un 3%. La investigación Entrenamiento intensivo añade más.", "Your session has expired, please log in again.": "Tu sesión ha caducado, vuelve a iniciar sesión.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "El nombre debe tener de 3 a 16 letras, números, espacios, - o _.", "The password must have at least 6 characters.": "La contraseña debe tener al menos 6 caracteres.", "This name is already taken.": "Este nombre ya está en uso.", "Wrong name or password.": "Nombre o contraseña incorrectos.", "Too many tries. Wait one minute.": "Demasiados intentos. Espera un minuto.", "Server error. Try again later.": "Error del servidor. Inténtalo más tarde.", "Military strategy · near future": "Estrategia militar · futuro cercano", "Log in": "Iniciar sesión", "Create an account": "Crear una cuenta", "Commander name": "Nombre del comandante", "Password": "Contraseña", "Repeat the password": "Repite la contraseña", "The two passwords are different.": "Las dos contraseñas son diferentes.", "Cannot reach the server.": "No se puede conectar con el servidor.", "Bring the game saved on this device into your new account?": "¿Traer la partida guardada en este dispositivo a tu nueva cuenta?", "Welcome, commander {n}!": "¡Bienvenido, comandante {n}!", "Base of {n}": "Base de {n}", "Commander level {l}": "Comandante nivel {l}", "Attacks between players arrive in the next update.": "Los ataques entre jugadores llegan en la próxima actualización.", "Account": "Cuenta", "Logged in as {n}": "Conectado como {n}", "Log out": "Cerrar sesión", "General": "General", "Production": "Producción", "Combat": "Combate", "No item in this category.": "Ningún objeto en esta categoría.", "Done": "Hecho", "Action refused by the server.": "Acción rechazada por el servidor.", "Administration": "Administración", "Reserved for administrators.": "Reservado a los administradores.", "Administrator account": "Cuenta de administrador", "Test account": "Cuenta de prueba", "Normal player": "Jugador normal", "all": "todo", "Give": "Dar", "Items": "Objetos", "10 of every item": "10 de cada objeto", "Time": "Tiempo", "Finish everything now": "Terminar todo ahora", "Base and research": "Base e investigaciones", "All buildings to this level": "Todos los edificios a este nivel", "All research to this level": "Todas las investigaciones a este nivel", "Set level and repair": "Poner este nivel y reparar", "Test accounts": "Cuentas de prueba", "Create": "Crear", "Show all accounts": "Ver todas las cuentas", "Account created: {n}": "Cuenta creada: {n}", "Supply chest": "Caja de suministros", "Military cache": "Alijo militar", "Elite arsenal": "Arsenal de élite", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Ábrelo para ganar una recompensa al azar: tropas, aceleradores, recursos, bonificaciones o piezas de Titán.", "Chests": "Cofres", "See the chances": "Ver las probabilidades", "Titan part": "Pieza de Titán", "Small crate of a random resource": "Caja pequeña de un recurso al azar", "Medium crate of a random resource": "Caja mediana de un recurso al azar", "Large crate of a random resource": "Caja grande de un recurso al azar", "Production boost (random resource)": "Bono de producción (recurso al azar)", "Epic": "Épico", "Legendary": "Legendario", "Collect": "Recoger", "Open another": "Abrir otro", "Open all": "Abrir todos", "Order refused by the server.": "Orden rechazada por el servidor.", "Local time (offline demo)": "Hora local (demo sin conexión)", "offline": "sin conexión", "Server time": "Hora del servidor", "latency": "latencia", "Build a {b}": "Construye: {b}", "Build the {b}": "Construye: {b}", "Upgrade the {b} to level {l}": "Sube {b} al nivel {l}", "Have {n} {u}": "Tener {n} {u}", "Win a battle against a Raider Camp": "Gana una batalla contra un campamento de saqueadores", "Research any technology": "Investiga cualquier tecnología", "Have {n} fields": "Tener {n} campos", "Have an army of {n} troops": "Tener un ejército de {n} tropas", "Win {n} battles": "Gana {n} batallas", "Reach {n} research levels in total": "Alcanza {n} niveles de investigación en total", "Titan level {l}": "Titán nivel {l}", "Equip a part on your Titan": "Equipa una pieza en tu Titán", "Reach {n} power": "Alcanza {n} de poder", "Tutorial": "Tutorial", "Construction": "Construcción", "Quest complete: {q}": "Misión completada: {q}", "Complete quests to win resources, speed-ups and chests.": "Completa misiones para ganar recursos, aceleradores y cofres.", "All quests of this category are complete!": "¡Todas las misiones de esta categoría están completadas!", "Reward:": "Recompensa:", "Go": "Ir", "Free ticket of the day collected!": "¡Ticket gratis del día recogido!", "Fortune ticket": "Ticket de la rueda", "Fortune medal": "Medallón de la rueda", "One spin of the ticket wheel.": "Un giro de la rueda de tickets.", "One spin of the medal wheel, with the best prizes.": "Un giro de la rueda de medallones, con los mejores premios.", "Wheel of fortune": "Rueda de la fortuna", "Spin the wheel to win troops, speed-ups, resources and chests.": "Gira la rueda para ganar tropas, aceleradores, recursos y cofres.", "Ticket wheel": "Rueda de tickets", "Medal wheel": "Rueda de medallones", "Spin": "Girar", "Collect the free ticket of the day": "Recoger el ticket gratis del día", "Next free ticket in {t}": "Próximo ticket gratis en {t}", "Medals are won in the hardest camps, in big quests and in chests.": "Los medallones se ganan en los campamentos más duros, las grandes misiones y los cofres.", "already_claimed": "Ya recogido hoy.", "Wheel": "Rueda"}, "de": {"You": "Du", "No alliance": "Keine Allianz", "Alliance": "Allianz", "Commander level": "Kommandantenstufe", "Commander": "Kommandant", "{h} h {m}": "{h} Std {m}", "{h} h": "{h} Std", "{n} min": "{n} Min", "{s}s": "{s}s", "{m}m {s}s": "{m}Min {s}s", "{h}h {m}m": "{h}Std {m}Min", "server processing": "Serververarbeitung", "Too many tries. Wait a few minutes.": "Zu viele Versuche. Warte ein paar Minuten.", "COMMANDER": "KOMMANDANT", "POWER": "MACHT", "Progress to next level": "Fortschritt zum nächsten Level", "Menu": "Menü", "Titan": "Titan", "Fields": "Felder", "Map": "Karte", "Base": "Basis", "Shop": "Shop", "Quests": "Aufträge", "Messages": "Nachrichten", "Reports": "Berichte", "Inventory": "Inventar", "Defense": "Verteidigung", "Troops": "Truppen", "Research": "Forschung", "Settings": "Einstellungen", "MAP": "KARTE", "FIELDS": "FELDER", "BASE": "BASIS", "EMPIRE": "IMPERIUM", "ALLIANCE": "ALLIANZ", "TITAN": "TITAN", "Build the Titan Hangar": "Baue den Titan-Hangar", "Hangar level {l} · Ready": "Hangar Stufe {l} · Bereit", "Coming in a future update": "Kommt in einem zukünftigen Update", "Enter base": "Basis betreten", "max": "max.", "Lv": "St.", "metal": "Metall", "wood": "Holz", "stone": "Stein", "fuel": "Treibstoff", "rations": "Rationen", "gold": "Gold", "Command Center": "Kommandozentrale", "Heart of your base. Its level sets the maximum level of every other building.": "Das Herz deiner Basis. Seine Stufe bestimmt die Höchststufe aller anderen Gebäude.", "Defense Wall": "Verteidigungsmauer", "Protects your base and gives a defense bonus to your troops.": "Schützt deine Basis und gibt deinen Truppen einen Verteidigungsbonus.", "Barracks": "Kaserne", "Trains infantry units.": "Bildet Infanterie aus.", "Garrison": "Garnison", "Houses and trains defensive troops. You can build several.": "Beherbergt und bildet Verteidigungstruppen aus. Du kannst mehrere bauen.", "Housing Block": "Wohnblock", "Raises population, which supplies workers and recruits. You can build several.": "Erhöht die Bevölkerung, die Arbeiter und Rekruten liefert. Du kannst mehrere bauen.", "Warehouse": "Lagerhaus", "Increases how many resources you can store.": "Erhöht, wie viele Ressourcen du lagern kannst.", "Research Lab": "Forschungslabor", "Unlocks technologies that improve your whole base.": "Schaltet Technologien frei, die deine ganze Basis verbessern.", "Vehicle Factory": "Fahrzeugfabrik", "Builds armored vehicles.": "Baut gepanzerte Fahrzeuge.", "Rally Point": "Sammelpunkt", "Organizes marches. Sets how many troops can leave the base at once.": "Organisiert Märsche. Bestimmt, wie viele Truppen die Basis gleichzeitig verlassen können.", "Radar Station": "Radarstation", "Detects incoming attacks.": "Erkennt eingehende Angriffe.", "Titan Hangar": "Titan-Hangar", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Beherbergt und repariert deinen Titan, den riesigen Kampfroboter, der deine Angriffe anführt und die Basis verteidigt. Seine Stufe bestimmt die Höchststufe des Titans.", "Metal Mine": "Metallmine", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Fördert Metallerz aus dem Boden. Jede Stufe produziert mehr Metall pro Stunde.", "Sawmill": "Sägewerk", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Schlägt Holz im umliegenden Wald. Jede Stufe produziert mehr Holz pro Stunde.", "Stone Quarry": "Steinbruch", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Bricht und schneidet Steinblöcke. Jede Stufe produziert mehr Stein pro Stunde.", "Fuel Pump": "Treibstoffpumpe", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pumpt Rohöl und raffiniert es zu Treibstoff. Jede Stufe produziert mehr Treibstoff pro Stunde.", "Mess Hall": "Kantine", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Kocht und lagert Rationen für deine Truppen. Jede Stufe produziert mehr Rationen pro Stunde.", "Helipad": "Hubschrauberlandeplatz", "Trains and maintains your air units: attack helicopters and gunships.": "Bildet deine Lufteinheiten aus und wartet sie: Kampfhubschrauber und Gunships.", "Max building level: {l}": "Max. Gebäudestufe: {l}", "Defense bonus +{p}%": "Verteidigungsbonus +{p}%", "Infantry training speed +{p}%": "Infanterie-Ausbildungstempo +{p}%", "Defensive troop capacity +{n}": "Kapazität Verteidigungstruppen +{n}", "Population +{n}": "Bevölkerung +{n}", "Storage +{n} per resource": "Lager +{n} pro Ressource", "Research speed +{p}%": "Forschungstempo +{p}%", "Vehicle production speed +{p}%": "Fahrzeug-Produktionstempo +{p}%", "Max troops per march: {n}": "Max. Truppen pro Marsch: {n}", "Titan maximum level: {n}": "Max. Titan-Stufe: {n}", "Air unit training speed +{p}%": "Ausbildungstempo Luft +{p}%", "Detects attacks and enemy troop count": "Erkennt Angriffe und die Zahl feindlicher Truppen", "Produces {i} {n} {r} per hour": "Produziert {i} {n} {r} pro Stunde", "Recruit": "Rekrut", "Cheap basic infantry. Weak alone, useful in large numbers.": "Billige Grundinfanterie. Allein schwach, in großer Zahl nützlich.", "Rifleman": "Schütze", "Solid defensive infantry protected by a heavy riot shield.": "Robuste Verteidigungsinfanterie mit schwerem Schutzschild.", "Sniper": "Scharfschütze", "Long-range marksman who strikes before the enemy can reach him.": "Fernkampfschütze, der trifft, bevor der Feind ihn erreicht.", "Assault Trooper": "Sturmsoldat", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Schwerer Soldat im Exoskelett mit Gatling. Tödlich im Angriff.", "Supply Truck": "Versorgungs-LKW", "Carries large amounts of loot back to your base.": "Bringt große Mengen Beute zu deiner Basis.", "Scout Drone": "Aufklärungsdrohne", "Very fast scout. Spies on enemy bases and camps.": "Sehr schneller Späher. Spioniert feindliche Basen und Lager aus.", "Armored Carrier": "Schützenpanzer", "Heavily armored transport with a huge carrying capacity.": "Schwer gepanzerter Transporter mit riesiger Ladekapazität.", "Battle Tank": "Kampfpanzer", "Massive armored tank. Extremely tough and powerful.": "Massiver Panzer. Extrem robust und stark.", "Rocket Artillery": "Raketenartillerie", "Rocket launcher truck that devastates enemies from very long range.": "Raketenwerfer-LKW, der Feinde aus großer Entfernung vernichtet.", "Attack Helicopter": "Kampfhubschrauber", "Fast air unit that strikes with rockets and a nose cannon.": "Schnelle Lufteinheit mit Raketen und Bugkanone.", "Gunship": "Gunship", "Heavy tiltrotor gunship with huge firepower and armor.": "Schweres Kipprotor-Gunship mit enormer Feuerkraft und Panzerung.", "Build a {b} first": "Baue zuerst: {b}", "Requires {b} level {l}": "Benötigt {b} Stufe {l}", "Choose how many to train": "Wähle die Anzahl", "Training queue full (5 orders max)": "Ausbildungsschlange voll (max. 5 Aufträge)", "Not enough population: build or upgrade Housing Blocks": "Nicht genug Bevölkerung: baue oder verbessere Wohnblöcke", "Not enough resources": "Nicht genug Ressourcen", "Training {n} {u}": "Ausbildung: {n} {u}", "{n} {u} ready": "{n} {u} bereit", "No rations left: your troops are deserting!": "Keine Rationen mehr: deine Truppen desertieren!", "The construction queue is busy": "Die Bauschlange ist belegt", "Maximum level reached": "Höchststufe erreicht", "{b} started": "{b} begonnen", "{b} level {l} complete": "{b} Stufe {l} fertig", "Construction cancelled (50% refunded)": "Bau abgebrochen (50 % erstattet)", "Power": "Macht", "power": "Macht", "Train": "Ausbilden", "owned {n}": "vorhanden {n}", "Max": "Max", "each:": "je Einheit:", "Train troops": "Truppen ausbilden", "Population {a} / {b} · Training speed +{p}%": "Bevölkerung {a} / {b} · Ausbildungstempo +{p}%", "Waiting": "Wartend", "Finish (test)": "Fertig (Test)", "Your Army": "Deine Armee", "{n} troops": "{n} Truppen", "Population": "Bevölkerung", "Upkeep": "Unterhalt", "Net": "Netto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Deine Truppen essen mehr Rationen, als du produzierst. Baue oder verbessere Kantinen auf den Feldern, sonst desertieren deine Truppen, wenn die Rationen ausgehen.", "Infantry · Barracks": "Infanterie · Kaserne", "Vehicles · Vehicle Factory": "Fahrzeuge · Fahrzeugfabrik", "Air · Helipad": "Luft · Hubschrauberlandeplatz", "training": "in Ausbildung", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Tippe auf Kaserne, Fahrzeugfabrik oder Hubschrauberlandeplatz in deiner Basis, um mehr Truppen auszubilden.", "Upgrading to level {l}": "Ausbau auf Stufe {l}", "Building to level {l}": "Bau Stufe {l}", "Time left: {t}": "Verbleibend: {t}", "Finish now (test)": "Jetzt fertigstellen (Test)", "Cancel": "Abbrechen", "Level {l} / {m}": "Stufe {l} / {m}", "Current:": "Aktuell:", "Your Titan": "Dein Titan", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Dein Titan ist bereit und hält vor dem Hangar Wache. Stufen, Panzerteile und Angriffe kommen mit der Weltkarte.", "Upgrade to level {l}": "Auf Stufe {l} ausbauen", "Next:": "Nächste:", "Upgrade": "Ausbauen", "Not built": "Nicht gebaut", "Build": "Bauen", "Empty field": "Freies Feld", "Choose what to produce on this field.": "Wähle, was auf diesem Feld produziert wird.", "Empty plot": "Freier Bauplatz", "Choose a building to construct here.": "Wähle ein Gebäude, das hier gebaut wird.", "Every unique building is already built.": "Alle einzigartigen Gebäude sind bereits gebaut.", "Language": "Sprache", "Test tools": "Test-Werkzeuge", "Erase your save and restart from zero. This option will be removed in the final game.": "Löscht deinen Spielstand und beginnt von vorn. Diese Option wird im fertigen Spiel entfernt.", "Reset save": "Spielstand zurücksetzen", "Reset your base?": "Basis zurücksetzen?", "Forest": "Wald", "Rocky Hills": "Felshügel", "Metal Deposit": "Metallvorkommen", "Oil Field": "Ölfeld", "Farmland": "Ackerland", "Plains": "Ebene", "Raider Camp": "Plündererlager", "Your base": "Deine Basis", "Empty land. Nothing to collect here.": "Leeres Land. Hier gibt es nichts zu holen.", "Level {l}": "Stufe {l}", "Distance: {d} tiles": "Entfernung: {d} Felder", "Enemy forces": "Feindliche Truppen", "Possible loot": "Mögliche Beute", "Attack": "Angreifen", "GO": "LOS", "Back to my base": "Zurück zur Basis", "Send troops": "Truppen senden", "Available: {n}": "Verfügbar: {n}", "Troops: {a} / {b}": "Truppen: {a} / {b}", "Travel time: {t}": "Reisezeit: {t}", "Carry capacity: {n}": "Tragekapazität: {n}", "Launch attack": "Angriff starten", "Too many troops for one march (max {n})": "Zu viele Truppen für einen Marsch (max. {n})", "All marches are busy ({n} max)": "Alle Märsche sind unterwegs (max. {n})", "Choose your troops": "Wähle deine Truppen", "You have no troops. Train some at the Barracks.": "Du hast keine Truppen. Bilde welche in der Kaserne aus.", "Troops sent to {p}": "Truppen nach {p} geschickt", "Victory": "Sieg", "Defeat": "Niederlage", "Victory at {p}": "Sieg bei {p}", "Defeat at {p}": "Niederlage bei {p}", "Troops returned with loot": "Truppen mit Beute zurück", "No reports yet.": "Noch keine Berichte.", "Your troops": "Deine Truppen", "Enemy": "Feind", "Sent": "Gesendet", "Lost": "Verloren", "Killed": "Getötet", "Loot": "Beute", "Marching": "Unterwegs", "Returning": "Rückkehr", "Marches: {a} / {b}": "Märsche: {a} / {b}", "{t} ago": "vor {t}", "Raiders": "Plünderer", "All enemy troops were destroyed.": "Alle feindlichen Truppen wurden vernichtet.", "Your troops had to retreat.": "Deine Truppen mussten sich zurückziehen.", "Armor Plate": "Panzerplatte", "Arm Cannon": "Armkanone", "Jet Reactor": "Rückenreaktor", "Armored Legs": "Gepanzerte Beine", "Standard": "Standard", "Advanced": "Fortgeschritten", "Elite": "Elite", "Prototype": "Prototyp", "Titan reached level {l}!": "Der Titan erreicht Stufe {l}!", "On a mission": "Im Einsatz", "Too damaged to fight (30% needed)": "Zu beschädigt zum Kämpfen (30 % nötig)", "Ready for battle": "Kampfbereit", "Upgrade the Titan Hangar to raise the maximum level.": "Baue den Titan-Hangar aus, um die Höchststufe zu erhöhen.", "troop attack": "Truppenangriff", "Equipment": "Ausrüstung", "Empty": "Leer", "Remove": "Ablegen", "Parts inventory": "Teile im Inventar", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Besiege Plündererlager, um Ausrüstungsteile zu gewinnen. Höhere Lager geben bessere Teile.", "Equip": "Ausrüsten", "Scrap for gold": "Für Gold verschrotten", "Manage Titan": "Titan verwalten", "Send the Titan": "Titan senden", "Titan unavailable": "Titan nicht verfügbar", "Titan: {a} XP, health {b}%": "Titan: {a} EP, Zustand {b}%", "New part won: {p}": "Neues Teil gewonnen: {p}", "Lv {l} · Health {h}%": "St. {l} · Zustand {h}%", "Extraction": "Abbau", "Forestry": "Forstwirtschaft", "Refining": "Raffinerie", "Military Rations": "Militärrationen", "Engineering": "Ingenieurwesen", "Intensive Training": "Intensivtraining", "Ballistics": "Ballistik", "Armor Plating": "Panzerung", "Field Medicine": "Feldmedizin", "Engines": "Motoren", "Logistics": "Logistik", "Robotics": "Robotik", "Metal and stone production +{p}%": "Metall- und Steinproduktion +{p}%", "Wood production +{p}%": "Holzproduktion +{p}%", "Fuel production +{p}%": "Treibstoffproduktion +{p}%", "Rations production +{p}% · troop upkeep -{q}%": "Rationenproduktion +{p}% · Truppenverbrauch -{q}%", "Construction speed +{p}%": "Baugeschwindigkeit +{p}%", "Troop training speed +{p}%": "Ausbildungsgeschwindigkeit +{p}%", "Troop attack +{p}%": "Truppenangriff +{p}%", "Troop defense +{p}%": "Truppenverteidigung +{p}%", "Troop health +{p}%": "Truppenleben +{p}%", "March speed +{p}%": "Marschgeschwindigkeit +{p}%", "Carry capacity +{p}%": "Tragkraft +{p}%", "Titan attack, defense and health +{p}%": "Angriff, Verteidigung und Zustand des Titanen +{p}%", "Economy": "Wirtschaft", "Military": "Militär", "Logistics & Titan": "Logistik & Titan", "Requires research: {r}": "Forschung nötig: {r}", "{t} level {l}": "{t} Stufe {l}", "{b} level {l}": "{b} Stufe {l}", "A research is already in progress": "Es läuft bereits eine Forschung", "Research started: {t}": "Forschung gestartet: {t}", "{t} level {l} researched": "{t} Stufe {l} erforscht", "Research cancelled (50% refunded)": "Forschung abgebrochen (50% erstattet)", "Unlocks:": "Schaltet frei:", "A technology cannot go above the level of the Research Lab.": "Eine Technologie kann die Stufe des Labors nicht überschreiten.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Baue ein Labor auf einem freien Platz deiner Basis, um Technologien freizuschalten.", "In progress:": "Läuft:", "Not researched yet": "Noch nicht erforscht", "Research in progress": "Forschung läuft", "No research in progress": "Keine laufende Forschung", "Open research": "Forschung öffnen", "Not enough room in your Garrisons": "Nicht genug Platz in deinen Garnisonen", "{n} {u} placed in defense": "{n} {u} in Verteidigung", "{n} {u} withdrawn from defense": "{n} {u} aus der Verteidigung abgezogen", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Truppen in Verteidigung bleiben in deiner Basis und kämpfen, wenn dich ein anderer Spieler angreift. Sie können nicht ausrücken.", "Garrison places: {a} / {b}": "Garnisonsplätze: {a} / {b}", "Wall: defense bonus +{p}%": "Mauer: Verteidigungsbonus +{p}%", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Baue eine Garnison, um Truppen in Verteidigung zu stellen. Jede Garnisonsstufe gibt 200 Plätze.", "In defense: {n}": "In Verteidigung: {n}", "in defense": "in Verteidigung", "Defend": "Verteidigen", "Withdraw": "Abziehen", "All in defense": "Alle verteidigen", "Withdraw all": "Alle abziehen", "Manage defense": "Verteidigung verwalten", "Small gold pouch": "Kleiner Goldbeutel", "Medium gold pouch": "Mittlerer Goldbeutel", "Large gold pouch": "Großer Goldbeutel", "Small crate of {r}": "Kleine Kiste {r}", "Medium crate of {r}": "Mittlere Kiste {r}", "Large crate of {r}": "Große Kiste {r}", "Speed-up {t}": "Beschleuniger {t}", "Titan repair kit (+{p}%)": "Titan-Reparaturset (+{p}%)", "Supply drop": "Versorgungsabwurf", "Gives {n} {r}.": "Gibt {n} {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Verkürzt einen Bau, eine Forschung oder eine Ausbildung um {t}. Über die Fortschrittsleiste verwenden.", "Repairs your Titan by {p}%.": "Repariert deinen Titanen um {p}%.", "Opens to give 3 random items.": "Enthält 3 zufällige Gegenstände.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Beschleuniger über die Fortschrittsleiste eines Baus, einer Forschung oder Ausbildung verwenden.", "Your Titan is already fully repaired": "Dein Titan ist bereits vollständig repariert", "Titan repaired: {h}%": "Titan repariert: {h}%", "Resources": "Ressourcen", "Speed-ups": "Beschleuniger", "Other": "Sonstiges", "Win items by defeating Raider Camps and taking resource fields on the map.": "Gewinne Gegenstände, indem du Plündererlager besiegst und Ressourcenfelder auf der Karte einnimmst.", "Your inventory is empty.": "Dein Inventar ist leer.", "Open": "Öffnen", "Use": "Benutzen", "Use all": "Alle benutzen", "Speed up": "Beschleunigen", "Nothing to speed up": "Nichts zu beschleunigen", "You have no speed-ups. Defeat Raider Camps to win some.": "Du hast keine Beschleuniger. Besiege Plündererlager, um welche zu gewinnen.", "Items won: {i}": "Gewonnene Gegenstände: {i}", "Items won": "Gewonnene Gegenstände", "Bonus rewards (chance)": "Bonusbelohnungen (Chance)", "Bonus item": "Bonusgegenstand", "Second item": "2. Gegenstand", "Titan part (with the Titan)": "Titanteil (mit dem Titanen)", "Use it from the progress bar at the bottom of the screen.": "Über die Fortschrittsleiste unten am Bildschirm verwenden.", "{n} d": "{n} T", "{r} production boost": "Produktionsbonus: {r}", "Combat stimulant": "Kampfstimulans", "Shield generator": "Schildgenerator", "Forced march": "Gewaltmarsch", "Lightning march": "Blitzmarsch", "Drill manual": "Ausbildungshandbuch", "{r} production +{p}% for 24 hours.": "{r}-Produktion +{p}% für 24 Stunden.", "Troop attack +{p}% for 24 hours.": "Truppenangriff +{p}% für 24 Stunden.", "Troop defense +{p}% for 24 hours.": "Truppenverteidigung +{p}% für 24 Stunden.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Verkürzt die Restzeit eines Marsches um {p}%. Über die Fortschrittsleiste verwenden.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Verkürzt die Restzeit einer Ausbildung um {p}%. Über die Fortschrittsleiste verwenden.", "{i} active: {t}": "{i} aktiv: {t}", "Common": "Gewöhnlich", "Uncommon": "Ungewöhnlich", "Rare": "Selten", "Very rare": "Sehr selten", "Boosts": "Boni", "Marches": "Märsche", "Training": "Ausbildung", "Active boosts": "Aktive Boni", "Storage: {n} per resource": "Lager: {n} pro Ressource", "{d}d {h}h": "{d}T {h}Std", "Training speed of all troops +{p}%": "Ausbildungsgeschwindigkeit aller Truppen +{p}%", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Jede Garnisonsstufe beschleunigt jede Ausbildung um 3%. Die Forschung Intensivtraining gibt noch mehr.", "Your session has expired, please log in again.": "Deine Sitzung ist abgelaufen, bitte melde dich erneut an.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "Der Name muss 3 bis 16 Buchstaben, Zahlen, Leerzeichen, - oder _ haben.", "The password must have at least 6 characters.": "Das Passwort muss mindestens 6 Zeichen haben.", "This name is already taken.": "Dieser Name ist bereits vergeben.", "Wrong name or password.": "Falscher Name oder falsches Passwort.", "Too many tries. Wait one minute.": "Zu viele Versuche. Warte eine Minute.", "Server error. Try again later.": "Serverfehler. Versuche es später erneut.", "Military strategy · near future": "Militärstrategie · nahe Zukunft", "Log in": "Anmelden", "Create an account": "Konto erstellen", "Commander name": "Name des Kommandanten", "Password": "Passwort", "Repeat the password": "Passwort wiederholen", "The two passwords are different.": "Die beiden Passwörter sind verschieden.", "Cannot reach the server.": "Server nicht erreichbar.", "Bring the game saved on this device into your new account?": "Das auf diesem Gerät gespeicherte Spiel in dein neues Konto übernehmen?", "Welcome, commander {n}!": "Willkommen, Kommandant {n}!", "Base of {n}": "Basis von {n}", "Commander level {l}": "Kommandant Stufe {l}", "Attacks between players arrive in the next update.": "Angriffe zwischen Spielern kommen im nächsten Update.", "Account": "Konto", "Logged in as {n}": "Angemeldet als {n}", "Log out": "Abmelden", "General": "Allgemein", "Production": "Produktion", "Combat": "Kampf", "No item in this category.": "Kein Gegenstand in dieser Kategorie.", "Done": "Erledigt", "Action refused by the server.": "Aktion vom Server abgelehnt.", "Administration": "Verwaltung", "Reserved for administrators.": "Nur für Administratoren.", "Administrator account": "Administratorkonto", "Test account": "Testkonto", "Normal player": "Normaler Spieler", "all": "alle", "Give": "Geben", "Items": "Gegenstände", "10 of every item": "10 von jedem Gegenstand", "Time": "Zeit", "Finish everything now": "Alles sofort fertigstellen", "Base and research": "Basis und Forschung", "All buildings to this level": "Alle Gebäude auf diese Stufe", "All research to this level": "Alle Forschungen auf diese Stufe", "Set level and repair": "Stufe setzen und reparieren", "Test accounts": "Testkonten", "Create": "Erstellen", "Show all accounts": "Alle Konten anzeigen", "Account created: {n}": "Konto erstellt: {n}", "Supply chest": "Versorgungskiste", "Military cache": "Militärversteck", "Elite arsenal": "Elite-Arsenal", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Öffne sie für eine zufällige Belohnung: Truppen, Beschleuniger, Ressourcen, Boni oder Titanteile.", "Chests": "Truhen", "See the chances": "Chancen anzeigen", "Titan part": "Titanteil", "Small crate of a random resource": "Kleine Kiste einer zufälligen Ressource", "Medium crate of a random resource": "Mittlere Kiste einer zufälligen Ressource", "Large crate of a random resource": "Große Kiste einer zufälligen Ressource", "Production boost (random resource)": "Produktionsbonus (zufällige Ressource)", "Epic": "Episch", "Legendary": "Legendär", "Collect": "Einsammeln", "Open another": "Noch eine öffnen", "Open all": "Alle öffnen", "Order refused by the server.": "Befehl vom Server abgelehnt.", "Local time (offline demo)": "Ortszeit (Offline-Demo)", "offline": "offline", "Server time": "Serverzeit", "latency": "Latenz", "Build a {b}": "Baue: {b}", "Build the {b}": "Baue: {b}", "Upgrade the {b} to level {l}": "Verbessere {b} auf Stufe {l}", "Have {n} {u}": "Habe {n} {u}", "Win a battle against a Raider Camp": "Gewinne einen Kampf gegen ein Plündererlager", "Research any technology": "Erforsche eine beliebige Technologie", "Have {n} fields": "Habe {n} Felder", "Have an army of {n} troops": "Habe eine Armee von {n} Truppen", "Win {n} battles": "Gewinne {n} Kämpfe", "Reach {n} research levels in total": "Erreiche insgesamt {n} Forschungsstufen", "Titan level {l}": "Titan Stufe {l}", "Equip a part on your Titan": "Rüste deinen Titanen mit einem Teil aus", "Reach {n} power": "Erreiche {n} Macht", "Tutorial": "Tutorial", "Construction": "Bau", "Quest complete: {q}": "Quest abgeschlossen: {q}", "Complete quests to win resources, speed-ups and chests.": "Schließe Quests ab, um Ressourcen, Beschleuniger und Truhen zu gewinnen.", "All quests of this category are complete!": "Alle Quests dieser Kategorie sind abgeschlossen!", "Reward:": "Belohnung:", "Go": "Los", "Free ticket of the day collected!": "Gratis-Ticket des Tages eingesammelt!", "Fortune ticket": "Glücksrad-Ticket", "Fortune medal": "Glücksrad-Medaille", "One spin of the ticket wheel.": "Eine Drehung am Ticket-Rad.", "One spin of the medal wheel, with the best prizes.": "Eine Drehung am Medaillen-Rad, mit den besten Preisen.", "Wheel of fortune": "Glücksrad", "Spin the wheel to win troops, speed-ups, resources and chests.": "Dreh am Rad und gewinne Truppen, Beschleuniger, Ressourcen und Truhen.", "Ticket wheel": "Ticket-Rad", "Medal wheel": "Medaillen-Rad", "Spin": "Drehen", "Collect the free ticket of the day": "Gratis-Ticket des Tages einsammeln", "Next free ticket in {t}": "Nächstes Gratis-Ticket in {t}", "Medals are won in the hardest camps, in big quests and in chests.": "Medaillen gibt es in den härtesten Lagern, großen Quests und Truhen.", "already_claimed": "Heute schon eingesammelt.", "Wheel": "Glücksrad"}, "it": {"You": "Tu", "No alliance": "Nessuna alleanza", "Alliance": "Alleanza", "Commander level": "Livello del comandante", "Commander": "Comandante", "{h} h {m}": "{h} h {m}", "{h} h": "{h} h", "{n} min": "{n} min", "{s}s": "{s}s", "{m}m {s}s": "{m}min {s}s", "{h}h {m}m": "{h}h {m}min", "server processing": "elaborazione del server", "Too many tries. Wait a few minutes.": "Troppi tentativi. Aspetta qualche minuto.", "COMMANDER": "COMANDANTE", "POWER": "POTENZA", "Progress to next level": "Progresso al livello successivo", "Menu": "Menu", "Titan": "Titano", "Fields": "Campi", "Map": "Mappa", "Base": "Base", "Shop": "Negozio", "Quests": "Missioni", "Messages": "Messaggi", "Reports": "Rapporti", "Inventory": "Inventario", "Defense": "Difesa", "Troops": "Truppe", "Research": "Ricerca", "Settings": "Impostazioni", "MAP": "MAPPA", "FIELDS": "CAMPI", "BASE": "BASE", "EMPIRE": "IMPERO", "ALLIANCE": "ALLEANZA", "TITAN": "TITANO", "Build the Titan Hangar": "Costruisci l'Hangar del Titano", "Hangar level {l} · Ready": "Hangar livello {l} · Pronto", "Coming in a future update": "In arrivo in un prossimo aggiornamento", "Enter base": "Entra nella base", "max": "max", "Lv": "Liv.", "metal": "metallo", "wood": "legno", "stone": "pietra", "fuel": "carburante", "rations": "razioni", "gold": "oro", "Command Center": "Centro di comando", "Heart of your base. Its level sets the maximum level of every other building.": "Il cuore della tua base. Il suo livello stabilisce il livello massimo di tutti gli altri edifici.", "Defense Wall": "Muro difensivo", "Protects your base and gives a defense bonus to your troops.": "Protegge la tua base e dà un bonus di difesa alle tue truppe.", "Barracks": "Caserma", "Trains infantry units.": "Addestra la fanteria.", "Garrison": "Guarnigione", "Houses and trains defensive troops. You can build several.": "Ospita e addestra truppe difensive. Puoi costruirne diverse.", "Housing Block": "Alloggi", "Raises population, which supplies workers and recruits. You can build several.": "Aumenta la popolazione, che fornisce lavoratori e reclute. Puoi costruirne diversi.", "Warehouse": "Magazzino", "Increases how many resources you can store.": "Aumenta la quantità di risorse che puoi immagazzinare.", "Research Lab": "Laboratorio", "Unlocks technologies that improve your whole base.": "Sblocca tecnologie che migliorano tutta la tua base.", "Vehicle Factory": "Fabbrica di veicoli", "Builds armored vehicles.": "Costruisce veicoli corazzati.", "Rally Point": "Punto di raduno", "Organizes marches. Sets how many troops can leave the base at once.": "Organizza le marce. Stabilisce quante truppe possono lasciare la base insieme.", "Radar Station": "Stazione radar", "Detects incoming attacks.": "Rileva gli attacchi in arrivo.", "Titan Hangar": "Hangar del Titano", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Ospita e ripara il tuo Titano, il robot da combattimento gigante che guida i tuoi attacchi e difende la base. Il suo livello stabilisce il livello massimo del Titano.", "Metal Mine": "Miniera di metallo", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Estrae minerale di metallo dal terreno. Ogni livello produce più metallo all'ora.", "Sawmill": "Segheria", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Taglia legname dalla foresta vicina. Ogni livello produce più legno all'ora.", "Stone Quarry": "Cava di pietra", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Scava e taglia blocchi di pietra. Ogni livello produce più pietra all'ora.", "Fuel Pump": "Pompa di carburante", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pompa petrolio greggio e lo raffina in carburante. Ogni livello produce più carburante all'ora.", "Mess Hall": "Mensa", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Cucina e conserva razioni per sfamare le tue truppe. Ogni livello produce più razioni all'ora.", "Helipad": "Eliporto", "Trains and maintains your air units: attack helicopters and gunships.": "Addestra e mantiene le tue unità aeree: elicotteri d'attacco e cannoniere.", "Max building level: {l}": "Livello max edifici: {l}", "Defense bonus +{p}%": "Bonus difesa +{p}%", "Infantry training speed +{p}%": "Velocità di addestramento fanteria +{p}%", "Defensive troop capacity +{n}": "Capacità truppe difensive +{n}", "Population +{n}": "Popolazione +{n}", "Storage +{n} per resource": "Magazzino +{n} per risorsa", "Research speed +{p}%": "Velocità di ricerca +{p}%", "Vehicle production speed +{p}%": "Velocità di produzione veicoli +{p}%", "Max troops per march: {n}": "Truppe max per marcia: {n}", "Titan maximum level: {n}": "Livello massimo del Titano: {n}", "Air unit training speed +{p}%": "Velocità di addestramento aereo +{p}%", "Detects attacks and enemy troop count": "Rileva attacchi e numero di truppe nemiche", "Produces {i} {n} {r} per hour": "Produce {i} {n} di {r} all'ora", "Recruit": "Recluta", "Cheap basic infantry. Weak alone, useful in large numbers.": "Fanteria di base economica. Debole da sola, utile in gran numero.", "Rifleman": "Fuciliere", "Solid defensive infantry protected by a heavy riot shield.": "Solida fanteria difensiva protetta da un pesante scudo antisommossa.", "Sniper": "Cecchino", "Long-range marksman who strikes before the enemy can reach him.": "Tiratore a lunga gittata che colpisce prima che il nemico lo raggiunga.", "Assault Trooper": "Assaltatore", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldato pesante in esoscheletro con mitragliatrice rotante. Letale in attacco.", "Supply Truck": "Camion di rifornimento", "Carries large amounts of loot back to your base.": "Riporta grandi quantità di bottino alla tua base.", "Scout Drone": "Drone da ricognizione", "Very fast scout. Spies on enemy bases and camps.": "Esploratore velocissimo. Spia basi e campi nemici.", "Armored Carrier": "Trasporto corazzato", "Heavily armored transport with a huge carrying capacity.": "Trasporto pesantemente corazzato con enorme capacità di carico.", "Battle Tank": "Carro armato", "Massive armored tank. Extremely tough and powerful.": "Carro armato massiccio. Estremamente resistente e potente.", "Rocket Artillery": "Artiglieria a razzi", "Rocket launcher truck that devastates enemies from very long range.": "Camion lanciarazzi che devasta i nemici a lunghissima distanza.", "Attack Helicopter": "Elicottero d'attacco", "Fast air unit that strikes with rockets and a nose cannon.": "Unità aerea veloce che colpisce con razzi e cannone frontale.", "Gunship": "Cannoniera", "Heavy tiltrotor gunship with huge firepower and armor.": "Cannoniera pesante a rotori basculanti con enorme potenza di fuoco e corazza.", "Build a {b} first": "Costruisci prima: {b}", "Requires {b} level {l}": "Richiede {b} livello {l}", "Choose how many to train": "Scegli quante addestrarne", "Training queue full (5 orders max)": "Coda di addestramento piena (max 5 ordini)", "Not enough population: build or upgrade Housing Blocks": "Popolazione insufficiente: costruisci o migliora gli Alloggi", "Not enough resources": "Risorse insufficienti", "Training {n} {u}": "Addestramento: {n} {u}", "{n} {u} ready": "{n} {u} pronti", "No rations left: your troops are deserting!": "Razioni finite: le tue truppe disertano!", "The construction queue is busy": "La coda di costruzione è occupata", "Maximum level reached": "Livello massimo raggiunto", "{b} started": "{b} avviato", "{b} level {l} complete": "{b} livello {l} completato", "Construction cancelled (50% refunded)": "Costruzione annullata (50% rimborsato)", "Power": "Potenza", "power": "potenza", "Train": "Addestra", "owned {n}": "posseduti {n}", "Max": "Max", "each:": "ciascuno:", "Train troops": "Addestra truppe", "Population {a} / {b} · Training speed +{p}%": "Popolazione {a} / {b} · Velocità di addestramento +{p}%", "Waiting": "In attesa", "Finish (test)": "Completa (test)", "Your Army": "Il tuo esercito", "{n} troops": "{n} truppe", "Population": "Popolazione", "Upkeep": "Mantenimento", "Net": "Netto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Le tue truppe mangiano più razioni di quante ne produci. Costruisci o migliora le Mense nei Campi, o le truppe diserteranno quando le razioni finiranno.", "Infantry · Barracks": "Fanteria · Caserma", "Vehicles · Vehicle Factory": "Veicoli · Fabbrica di veicoli", "Air · Helipad": "Aereo · Eliporto", "training": "in addestramento", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Tocca la Caserma, la Fabbrica di veicoli o l'Eliporto nella tua base per addestrare altre truppe.", "Upgrading to level {l}": "Miglioramento al livello {l}", "Building to level {l}": "Costruzione livello {l}", "Time left: {t}": "Tempo rimanente: {t}", "Finish now (test)": "Completa ora (test)", "Cancel": "Annulla", "Level {l} / {m}": "Livello {l} / {m}", "Current:": "Attuale:", "Your Titan": "Il tuo Titano", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Il tuo Titano è pronto e fa la guardia davanti all'hangar. Livelli, pezzi di corazza e attacchi arriveranno con la mappa del mondo.", "Upgrade to level {l}": "Migliora al livello {l}", "Next:": "Successivo:", "Upgrade": "Migliora", "Not built": "Non costruito", "Build": "Costruisci", "Empty field": "Campo libero", "Choose what to produce on this field.": "Scegli cosa produrre su questo campo.", "Empty plot": "Lotto libero", "Choose a building to construct here.": "Scegli un edificio da costruire qui.", "Every unique building is already built.": "Tutti gli edifici unici sono già costruiti.", "Language": "Lingua", "Test tools": "Strumenti di test", "Erase your save and restart from zero. This option will be removed in the final game.": "Cancella il salvataggio e ricomincia da zero. Questa opzione verrà rimossa nel gioco finale.", "Reset save": "Reimposta partita", "Reset your base?": "Reimpostare la base?", "Forest": "Foresta", "Rocky Hills": "Colline rocciose", "Metal Deposit": "Giacimento di metallo", "Oil Field": "Giacimento petrolifero", "Farmland": "Terreni agricoli", "Plains": "Pianura", "Raider Camp": "Accampamento di predoni", "Your base": "La tua base", "Empty land. Nothing to collect here.": "Terreno vuoto. Niente da raccogliere qui.", "Level {l}": "Livello {l}", "Distance: {d} tiles": "Distanza: {d} caselle", "Enemy forces": "Forze nemiche", "Possible loot": "Bottino possibile", "Attack": "Attacca", "GO": "VAI", "Back to my base": "Torna alla mia base", "Send troops": "Invia truppe", "Available: {n}": "Disponibili: {n}", "Troops: {a} / {b}": "Truppe: {a} / {b}", "Travel time: {t}": "Tempo di viaggio: {t}", "Carry capacity: {n}": "Capacità di carico: {n}", "Launch attack": "Lancia l'attacco", "Too many troops for one march (max {n})": "Troppe truppe per una marcia (max {n})", "All marches are busy ({n} max)": "Tutte le marce sono occupate (max {n})", "Choose your troops": "Scegli le tue truppe", "You have no troops. Train some at the Barracks.": "Non hai truppe. Addestrane alcune nella Caserma.", "Troops sent to {p}": "Truppe inviate a {p}", "Victory": "Vittoria", "Defeat": "Sconfitta", "Victory at {p}": "Vittoria a {p}", "Defeat at {p}": "Sconfitta a {p}", "Troops returned with loot": "Truppe rientrate con il bottino", "No reports yet.": "Nessun rapporto per ora.", "Your troops": "Le tue truppe", "Enemy": "Nemico", "Sent": "Inviate", "Lost": "Perse", "Killed": "Uccisi", "Loot": "Bottino", "Marching": "In marcia", "Returning": "Rientro", "Marches: {a} / {b}": "Marce: {a} / {b}", "{t} ago": "{t} fa", "Raiders": "Predoni", "All enemy troops were destroyed.": "Tutte le truppe nemiche sono state distrutte.", "Your troops had to retreat.": "Le tue truppe hanno dovuto ritirarsi.", "Armor Plate": "Piastra corazzata", "Arm Cannon": "Cannone da braccio", "Jet Reactor": "Reattore dorsale", "Armored Legs": "Gambe corazzate", "Standard": "Standard", "Advanced": "Avanzato", "Elite": "Élite", "Prototype": "Prototipo", "Titan reached level {l}!": "Il Titano raggiunge il livello {l}!", "On a mission": "In missione", "Too damaged to fight (30% needed)": "Troppo danneggiato per combattere (30% necessario)", "Ready for battle": "Pronto al combattimento", "Upgrade the Titan Hangar to raise the maximum level.": "Migliora l'Hangar del Titano per alzare il livello massimo.", "troop attack": "attacco truppe", "Equipment": "Equipaggiamento", "Empty": "Vuoto", "Remove": "Rimuovi", "Parts inventory": "Pezzi in inventario", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Sconfiggi gli accampamenti di predoni per ottenere pezzi. Gli accampamenti di livello più alto danno pezzi migliori.", "Equip": "Equipaggia", "Scrap for gold": "Rottama per oro", "Manage Titan": "Gestisci il Titano", "Send the Titan": "Invia il Titano", "Titan unavailable": "Titano non disponibile", "Titan: {a} XP, health {b}%": "Titano: {a} XP, salute {b}%", "New part won: {p}": "Nuovo pezzo ottenuto: {p}", "Lv {l} · Health {h}%": "Liv. {l} · Salute {h}%", "Extraction": "Estrazione", "Forestry": "Silvicoltura", "Refining": "Raffinazione", "Military Rations": "Razioni militari", "Engineering": "Ingegneria", "Intensive Training": "Addestramento intensivo", "Ballistics": "Balistica", "Armor Plating": "Corazzatura", "Field Medicine": "Medicina da campo", "Engines": "Motori", "Logistics": "Logistica", "Robotics": "Robotica", "Metal and stone production +{p}%": "Produzione di metallo e pietra +{p}%", "Wood production +{p}%": "Produzione di legno +{p}%", "Fuel production +{p}%": "Produzione di carburante +{p}%", "Rations production +{p}% · troop upkeep -{q}%": "Produzione di razioni +{p}% · consumo truppe -{q}%", "Construction speed +{p}%": "Velocità di costruzione +{p}%", "Troop training speed +{p}%": "Velocità di addestramento +{p}%", "Troop attack +{p}%": "Attacco delle truppe +{p}%", "Troop defense +{p}%": "Difesa delle truppe +{p}%", "Troop health +{p}%": "Salute delle truppe +{p}%", "March speed +{p}%": "Velocità di marcia +{p}%", "Carry capacity +{p}%": "Capacità di carico +{p}%", "Titan attack, defense and health +{p}%": "Attacco, difesa e salute del Titano +{p}%", "Economy": "Economia", "Military": "Militare", "Logistics & Titan": "Logistica e Titano", "Requires research: {r}": "Ricerca necessaria: {r}", "{t} level {l}": "{t} livello {l}", "{b} level {l}": "{b} livello {l}", "A research is already in progress": "Una ricerca è già in corso", "Research started: {t}": "Ricerca avviata: {t}", "{t} level {l} researched": "{t} livello {l} completata", "Research cancelled (50% refunded)": "Ricerca annullata (50% rimborsato)", "Unlocks:": "Sblocca:", "A technology cannot go above the level of the Research Lab.": "Una tecnologia non può superare il livello del Laboratorio.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Costruisci un Laboratorio su uno spazio libero della base per sbloccare le tecnologie.", "In progress:": "In corso:", "Not researched yet": "Non ancora ricercata", "Research in progress": "Ricerca in corso", "No research in progress": "Nessuna ricerca in corso", "Open research": "Apri ricerche", "Not enough room in your Garrisons": "Spazio insufficiente nelle tue Guarnigioni", "{n} {u} placed in defense": "{n} {u} in difesa", "{n} {u} withdrawn from defense": "{n} {u} ritirati dalla difesa", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Le truppe in difesa restano nella base e combattono quando un altro giocatore ti attacca. Non possono partire in marcia.", "Garrison places: {a} / {b}": "Posti in Guarnigione: {a} / {b}", "Wall: defense bonus +{p}%": "Mura: bonus difesa +{p}%", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Costruisci una Guarnigione per mettere truppe in difesa. Ogni livello di Guarnigione dà 200 posti.", "In defense: {n}": "In difesa: {n}", "in defense": "in difesa", "Defend": "Difendi", "Withdraw": "Ritira", "All in defense": "Tutti in difesa", "Withdraw all": "Ritira tutti", "Manage defense": "Gestisci la difesa", "Small gold pouch": "Piccola borsa d'oro", "Medium gold pouch": "Borsa d'oro media", "Large gold pouch": "Grande borsa d'oro", "Small crate of {r}": "Cassa piccola di {r}", "Medium crate of {r}": "Cassa media di {r}", "Large crate of {r}": "Cassa grande di {r}", "Speed-up {t}": "Acceleratore {t}", "Titan repair kit (+{p}%)": "Kit di riparazione del Titano (+{p}%)", "Supply drop": "Rifornimento aereo", "Gives {n} {r}.": "Dà {n} {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Riduce di {t} il tempo di una costruzione, ricerca o addestramento. Usalo dalla barra di avanzamento.", "Repairs your Titan by {p}%.": "Ripara il tuo Titano del {p}%.", "Opens to give 3 random items.": "Contiene 3 oggetti casuali.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Usa gli acceleratori dalla barra di avanzamento di una costruzione, ricerca o addestramento.", "Your Titan is already fully repaired": "Il tuo Titano è già completamente riparato", "Titan repaired: {h}%": "Titano riparato: {h}%", "Resources": "Risorse", "Speed-ups": "Acceleratori", "Other": "Altro", "Win items by defeating Raider Camps and taking resource fields on the map.": "Vinci oggetti sconfiggendo i campi dei predoni e conquistando i terreni di risorse sulla mappa.", "Your inventory is empty.": "Il tuo inventario è vuoto.", "Open": "Apri", "Use": "Usa", "Use all": "Usa tutto", "Speed up": "Accelera", "Nothing to speed up": "Niente da accelerare", "You have no speed-ups. Defeat Raider Camps to win some.": "Non hai acceleratori. Sconfiggi i campi dei predoni per vincerne.", "Items won: {i}": "Oggetti vinti: {i}", "Items won": "Oggetti vinti", "Bonus rewards (chance)": "Ricompense bonus (probabilità)", "Bonus item": "Oggetto bonus", "Second item": "2° oggetto", "Titan part (with the Titan)": "Pezzo del Titano (con il Titano)", "Use it from the progress bar at the bottom of the screen.": "Usalo dalla barra di avanzamento in basso nello schermo.", "{n} d": "{n} g", "{r} production boost": "Bonus produzione: {r}", "Combat stimulant": "Stimolante da combattimento", "Shield generator": "Generatore di scudo", "Forced march": "Marcia forzata", "Lightning march": "Marcia lampo", "Drill manual": "Manuale di addestramento", "{r} production +{p}% for 24 hours.": "Produzione di {r} +{p}% per 24 ore.", "Troop attack +{p}% for 24 hours.": "Attacco delle truppe +{p}% per 24 ore.", "Troop defense +{p}% for 24 hours.": "Difesa delle truppe +{p}% per 24 ore.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Riduce del {p}% il tempo rimanente di una marcia. Usalo dalla barra di avanzamento.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Riduce del {p}% il tempo rimanente di un addestramento. Usalo dalla barra di avanzamento.", "{i} active: {t}": "{i} attivo: {t}", "Common": "Comune", "Uncommon": "Non comune", "Rare": "Raro", "Very rare": "Molto raro", "Boosts": "Bonus", "Marches": "Marce", "Training": "Addestramento", "Active boosts": "Bonus attivi", "Storage: {n} per resource": "Magazzino: {n} per risorsa", "{d}d {h}h": "{d}g {h}h", "Training speed of all troops +{p}%": "Velocità di addestramento di tutte le truppe +{p}%", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Ogni livello di Guarnigione accelera tutti gli addestramenti del 3%. La ricerca Addestramento intensivo aggiunge altro.", "Your session has expired, please log in again.": "La tua sessione è scaduta, accedi di nuovo.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "Il nome deve avere da 3 a 16 lettere, numeri, spazi, - o _.", "The password must have at least 6 characters.": "La password deve avere almeno 6 caratteri.", "This name is already taken.": "Questo nome è già in uso.", "Wrong name or password.": "Nome o password errati.", "Too many tries. Wait one minute.": "Troppi tentativi. Aspetta un minuto.", "Server error. Try again later.": "Errore del server. Riprova più tardi.", "Military strategy · near future": "Strategia militare · futuro prossimo", "Log in": "Accedi", "Create an account": "Crea un account", "Commander name": "Nome del comandante", "Password": "Password", "Repeat the password": "Ripeti la password", "The two passwords are different.": "Le due password sono diverse.", "Cannot reach the server.": "Impossibile raggiungere il server.", "Bring the game saved on this device into your new account?": "Portare la partita salvata su questo dispositivo nel nuovo account?", "Welcome, commander {n}!": "Benvenuto, comandante {n}!", "Base of {n}": "Base di {n}", "Commander level {l}": "Comandante livello {l}", "Attacks between players arrive in the next update.": "Gli attacchi tra giocatori arrivano nel prossimo aggiornamento.", "Account": "Account", "Logged in as {n}": "Connesso come {n}", "Log out": "Esci", "General": "Generale", "Production": "Produzione", "Combat": "Combattimento", "No item in this category.": "Nessun oggetto in questa categoria.", "Done": "Fatto", "Action refused by the server.": "Azione rifiutata dal server.", "Administration": "Amministrazione", "Reserved for administrators.": "Riservato agli amministratori.", "Administrator account": "Account amministratore", "Test account": "Account di prova", "Normal player": "Giocatore normale", "all": "tutto", "Give": "Dai", "Items": "Oggetti", "10 of every item": "10 di ogni oggetto", "Time": "Tempo", "Finish everything now": "Termina tutto ora", "Base and research": "Base e ricerche", "All buildings to this level": "Tutti gli edifici a questo livello", "All research to this level": "Tutte le ricerche a questo livello", "Set level and repair": "Imposta livello e ripara", "Test accounts": "Account di prova", "Create": "Crea", "Show all accounts": "Mostra tutti gli account", "Account created: {n}": "Account creato: {n}", "Supply chest": "Cassa di rifornimenti", "Military cache": "Deposito militare", "Elite arsenal": "Arsenale d'élite", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Aprilo per vincere una ricompensa casuale: truppe, acceleratori, risorse, bonus o pezzi del Titano.", "Chests": "Forzieri", "See the chances": "Vedi le probabilità", "Titan part": "Pezzo del Titano", "Small crate of a random resource": "Cassa piccola di una risorsa casuale", "Medium crate of a random resource": "Cassa media di una risorsa casuale", "Large crate of a random resource": "Cassa grande di una risorsa casuale", "Production boost (random resource)": "Bonus produzione (risorsa casuale)", "Epic": "Epico", "Legendary": "Leggendario", "Collect": "Raccogli", "Open another": "Aprine un altro", "Open all": "Apri tutti", "Order refused by the server.": "Ordine rifiutato dal server.", "Local time (offline demo)": "Ora locale (demo offline)", "offline": "offline", "Server time": "Ora del server", "latency": "latenza", "Build a {b}": "Costruisci: {b}", "Build the {b}": "Costruisci: {b}", "Upgrade the {b} to level {l}": "Porta {b} al livello {l}", "Have {n} {u}": "Avere {n} {u}", "Win a battle against a Raider Camp": "Vinci una battaglia contro un campo di predoni", "Research any technology": "Ricerca una tecnologia qualsiasi", "Have {n} fields": "Avere {n} campi", "Have an army of {n} troops": "Avere un esercito di {n} truppe", "Win {n} battles": "Vinci {n} battaglie", "Reach {n} research levels in total": "Raggiungi {n} livelli di ricerca in totale", "Titan level {l}": "Titano livello {l}", "Equip a part on your Titan": "Equipaggia un pezzo sul tuo Titano", "Reach {n} power": "Raggiungi {n} di potenza", "Tutorial": "Tutorial", "Construction": "Costruzione", "Quest complete: {q}": "Missione completata: {q}", "Complete quests to win resources, speed-ups and chests.": "Completa missioni per vincere risorse, acceleratori e forzieri.", "All quests of this category are complete!": "Tutte le missioni di questa categoria sono completate!", "Reward:": "Ricompensa:", "Go": "Vai", "Free ticket of the day collected!": "Biglietto gratuito del giorno raccolto!", "Fortune ticket": "Biglietto della ruota", "Fortune medal": "Medaglione della ruota", "One spin of the ticket wheel.": "Un giro della ruota dei biglietti.", "One spin of the medal wheel, with the best prizes.": "Un giro della ruota dei medaglioni, con i premi migliori.", "Wheel of fortune": "Ruota della fortuna", "Spin the wheel to win troops, speed-ups, resources and chests.": "Gira la ruota per vincere truppe, acceleratori, risorse e forzieri.", "Ticket wheel": "Ruota dei biglietti", "Medal wheel": "Ruota dei medaglioni", "Spin": "Gira", "Collect the free ticket of the day": "Raccogli il biglietto gratuito del giorno", "Next free ticket in {t}": "Prossimo biglietto gratuito tra {t}", "Medals are won in the hardest camps, in big quests and in chests.": "I medaglioni si vincono nei campi più duri, nelle grandi missioni e nei forzieri.", "already_claimed": "Già raccolto oggi.", "Wheel": "Ruota"}, "pt": {"You": "Você", "No alliance": "Sem aliança", "Alliance": "Aliança", "Commander level": "Nível do comandante", "Commander": "Comandante", "{h} h {m}": "{h} h {m}", "{h} h": "{h} h", "{n} min": "{n} min", "{s}s": "{s}s", "{m}m {s}s": "{m}min {s}s", "{h}h {m}m": "{h}h {m}min", "server processing": "processamento do servidor", "Too many tries. Wait a few minutes.": "Demasiadas tentativas. Aguarde alguns minutos.", "COMMANDER": "COMANDANTE", "POWER": "PODER", "Progress to next level": "Progresso para o próximo nível", "Menu": "Menu", "Titan": "Titã", "Fields": "Campos", "Map": "Mapa", "Base": "Base", "Shop": "Loja", "Quests": "Missões", "Messages": "Mensagens", "Reports": "Relatórios", "Inventory": "Inventário", "Defense": "Defesa", "Troops": "Tropas", "Research": "Pesquisa", "Settings": "Configurações", "MAP": "MAPA", "FIELDS": "CAMPOS", "BASE": "BASE", "EMPIRE": "IMPÉRIO", "ALLIANCE": "ALIANÇA", "TITAN": "TITÃ", "Build the Titan Hangar": "Constrói o Hangar do Titã", "Hangar level {l} · Ready": "Hangar nível {l} · Pronto", "Coming in a future update": "Chega numa próxima atualização", "Enter base": "Entrar na base", "max": "máx.", "Lv": "Nv.", "metal": "metal", "wood": "madeira", "stone": "pedra", "fuel": "combustível", "rations": "rações", "gold": "ouro", "Command Center": "Centro de Comando", "Heart of your base. Its level sets the maximum level of every other building.": "O coração da tua base. O seu nível define o nível máximo de todos os outros edifícios.", "Defense Wall": "Muralha defensiva", "Protects your base and gives a defense bonus to your troops.": "Protege a tua base e dá um bónus de defesa às tuas tropas.", "Barracks": "Quartel", "Trains infantry units.": "Treina unidades de infantaria.", "Garrison": "Guarnição", "Houses and trains defensive troops. You can build several.": "Aloja e treina tropas defensivas. Podes construir várias.", "Housing Block": "Habitações", "Raises population, which supplies workers and recruits. You can build several.": "Aumenta a população, que fornece trabalhadores e recrutas. Podes construir várias.", "Warehouse": "Armazém", "Increases how many resources you can store.": "Aumenta a quantidade de recursos que podes armazenar.", "Research Lab": "Laboratório", "Unlocks technologies that improve your whole base.": "Desbloqueia tecnologias que melhoram toda a tua base.", "Vehicle Factory": "Fábrica de veículos", "Builds armored vehicles.": "Constrói veículos blindados.", "Rally Point": "Ponto de encontro", "Organizes marches. Sets how many troops can leave the base at once.": "Organiza as marchas. Define quantas tropas podem sair da base de uma vez.", "Radar Station": "Estação de radar", "Detects incoming attacks.": "Deteta ataques a caminho.", "Titan Hangar": "Hangar do Titã", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Abriga e repara o teu Titã, o robô de combate gigante que lidera os teus ataques e defende a base. O seu nível define o nível máximo do Titã.", "Metal Mine": "Mina de metal", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Extrai minério de metal do solo. Cada nível produz mais metal por hora.", "Sawmill": "Serração", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Corta madeira da floresta em redor. Cada nível produz mais madeira por hora.", "Stone Quarry": "Pedreira", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Escava e corta blocos de pedra. Cada nível produz mais pedra por hora.", "Fuel Pump": "Bomba de combustível", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Bombeia petróleo e refina-o em combustível. Cada nível produz mais combustível por hora.", "Mess Hall": "Refeitório", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Cozinha e guarda rações para alimentar as tuas tropas. Cada nível produz mais rações por hora.", "Helipad": "Heliporto", "Trains and maintains your air units: attack helicopters and gunships.": "Treina e mantém as tuas unidades aéreas: helicópteros de ataque e canhoneiras.", "Max building level: {l}": "Nível máx. dos edifícios: {l}", "Defense bonus +{p}%": "Bónus de defesa +{p}%", "Infantry training speed +{p}%": "Velocidade de treino da infantaria +{p}%", "Defensive troop capacity +{n}": "Capacidade de tropas defensivas +{n}", "Population +{n}": "População +{n}", "Storage +{n} per resource": "Armazenamento +{n} por recurso", "Research speed +{p}%": "Velocidade de pesquisa +{p}%", "Vehicle production speed +{p}%": "Velocidade de produção de veículos +{p}%", "Max troops per march: {n}": "Tropas máx. por marcha: {n}", "Titan maximum level: {n}": "Nível máximo do Titã: {n}", "Air unit training speed +{p}%": "Velocidade de treino aéreo +{p}%", "Detects attacks and enemy troop count": "Deteta ataques e o número de tropas inimigas", "Produces {i} {n} {r} per hour": "Produz {i} {n} de {r} por hora", "Recruit": "Recruta", "Cheap basic infantry. Weak alone, useful in large numbers.": "Infantaria básica barata. Fraca sozinha, útil em grande número.", "Rifleman": "Fuzileiro", "Solid defensive infantry protected by a heavy riot shield.": "Infantaria defensiva sólida protegida por um pesado escudo antimotim.", "Sniper": "Atirador furtivo", "Long-range marksman who strikes before the enemy can reach him.": "Atirador de longo alcance que ataca antes que o inimigo o alcance.", "Assault Trooper": "Soldado de assalto", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldado pesado com exoesqueleto e metralhadora rotativa. Letal no ataque.", "Supply Truck": "Camião de abastecimento", "Carries large amounts of loot back to your base.": "Leva grandes quantidades de saque para a tua base.", "Scout Drone": "Drone de reconhecimento", "Very fast scout. Spies on enemy bases and camps.": "Batedor muito rápido. Espia bases e acampamentos inimigos.", "Armored Carrier": "Transporte blindado", "Heavily armored transport with a huge carrying capacity.": "Transporte fortemente blindado com enorme capacidade de carga.", "Battle Tank": "Tanque de combate", "Massive armored tank. Extremely tough and powerful.": "Tanque blindado maciço. Extremamente resistente e poderoso.", "Rocket Artillery": "Artilharia de foguetes", "Rocket launcher truck that devastates enemies from very long range.": "Camião lança-foguetes que devasta inimigos a longa distância.", "Attack Helicopter": "Helicóptero de ataque", "Fast air unit that strikes with rockets and a nose cannon.": "Unidade aérea rápida que ataca com foguetes e canhão frontal.", "Gunship": "Canhoneira", "Heavy tiltrotor gunship with huge firepower and armor.": "Canhoneira pesada de rotores basculantes com enorme poder de fogo e blindagem.", "Build a {b} first": "Constrói primeiro: {b}", "Requires {b} level {l}": "Requer {b} nível {l}", "Choose how many to train": "Escolhe quantas treinar", "Training queue full (5 orders max)": "Fila de treino cheia (máx. 5 ordens)", "Not enough population: build or upgrade Housing Blocks": "População insuficiente: constrói ou melhora Habitações", "Not enough resources": "Recursos insuficientes", "Training {n} {u}": "A treinar {n} {u}", "{n} {u} ready": "{n} {u} prontos", "No rations left: your troops are deserting!": "Sem rações: as tuas tropas estão a desertar!", "The construction queue is busy": "A fila de construção está ocupada", "Maximum level reached": "Nível máximo atingido", "{b} started": "{b} iniciado", "{b} level {l} complete": "{b} nível {l} concluído", "Construction cancelled (50% refunded)": "Construção cancelada (50% reembolsado)", "Power": "Poder", "power": "poder", "Train": "Treinar", "owned {n}": "tens {n}", "Max": "Máx.", "each:": "cada:", "Train troops": "Treinar tropas", "Population {a} / {b} · Training speed +{p}%": "População {a} / {b} · Velocidade de treino +{p}%", "Waiting": "Em espera", "Finish (test)": "Concluir (teste)", "Your Army": "O teu exército", "{n} troops": "{n} tropas", "Population": "População", "Upkeep": "Manutenção", "Net": "Líquido", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "As tuas tropas comem mais rações do que produzes. Constrói ou melhora Refeitórios nos Campos, ou as tropas vão desertar quando as rações acabarem.", "Infantry · Barracks": "Infantaria · Quartel", "Vehicles · Vehicle Factory": "Veículos · Fábrica de veículos", "Air · Helipad": "Aéreo · Heliporto", "training": "em treino", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Toca no Quartel, na Fábrica de veículos ou no Heliporto da tua base para treinar mais tropas.", "Upgrading to level {l}": "A melhorar para nível {l}", "Building to level {l}": "A construir nível {l}", "Time left: {t}": "Tempo restante: {t}", "Finish now (test)": "Concluir agora (teste)", "Cancel": "Cancelar", "Level {l} / {m}": "Nível {l} / {m}", "Current:": "Atual:", "Your Titan": "O teu Titã", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "O teu Titã está pronto e de guarda em frente ao hangar. Níveis, peças de blindagem e ataques chegam com o mapa do mundo.", "Upgrade to level {l}": "Melhorar para nível {l}", "Next:": "Seguinte:", "Upgrade": "Melhorar", "Not built": "Não construído", "Build": "Construir", "Empty field": "Campo vazio", "Choose what to produce on this field.": "Escolhe o que produzir neste campo.", "Empty plot": "Lote vazio", "Choose a building to construct here.": "Escolhe um edifício para construir aqui.", "Every unique building is already built.": "Todos os edifícios únicos já estão construídos.", "Language": "Idioma", "Test tools": "Ferramentas de teste", "Erase your save and restart from zero. This option will be removed in the final game.": "Apaga o teu progresso e recomeça do zero. Esta opção será removida no jogo final.", "Reset save": "Reiniciar progresso", "Reset your base?": "Reiniciar a tua base?", "Forest": "Floresta", "Rocky Hills": "Colinas rochosas", "Metal Deposit": "Jazida de metal", "Oil Field": "Campo petrolífero", "Farmland": "Terras agrícolas", "Plains": "Planície", "Raider Camp": "Acampamento de saqueadores", "Your base": "A tua base", "Empty land. Nothing to collect here.": "Terreno vazio. Nada para recolher aqui.", "Level {l}": "Nível {l}", "Distance: {d} tiles": "Distância: {d} casas", "Enemy forces": "Forças inimigas", "Possible loot": "Saque possível", "Attack": "Atacar", "GO": "IR", "Back to my base": "Voltar à minha base", "Send troops": "Enviar tropas", "Available: {n}": "Disponíveis: {n}", "Troops: {a} / {b}": "Tropas: {a} / {b}", "Travel time: {t}": "Tempo de viagem: {t}", "Carry capacity: {n}": "Capacidade de carga: {n}", "Launch attack": "Lançar ataque", "Too many troops for one march (max {n})": "Demasiadas tropas para uma marcha (máx. {n})", "All marches are busy ({n} max)": "Todas as marchas estão ocupadas (máx. {n})", "Choose your troops": "Escolhe as tuas tropas", "You have no troops. Train some at the Barracks.": "Não tens tropas. Treina algumas no Quartel.", "Troops sent to {p}": "Tropas enviadas para {p}", "Victory": "Vitória", "Defeat": "Derrota", "Victory at {p}": "Vitória em {p}", "Defeat at {p}": "Derrota em {p}", "Troops returned with loot": "Tropas regressaram com o saque", "No reports yet.": "Ainda não há relatórios.", "Your troops": "As tuas tropas", "Enemy": "Inimigo", "Sent": "Enviadas", "Lost": "Perdidas", "Killed": "Mortos", "Loot": "Saque", "Marching": "Em marcha", "Returning": "A regressar", "Marches: {a} / {b}": "Marchas: {a} / {b}", "{t} ago": "há {t}", "Raiders": "Saqueadores", "All enemy troops were destroyed.": "Todas as tropas inimigas foram destruídas.", "Your troops had to retreat.": "As tuas tropas tiveram de recuar.", "Armor Plate": "Placa de blindagem", "Arm Cannon": "Canhão de braço", "Jet Reactor": "Reator dorsal", "Armored Legs": "Pernas blindadas", "Standard": "Padrão", "Advanced": "Avançado", "Elite": "Elite", "Prototype": "Protótipo", "Titan reached level {l}!": "O Titã atingiu o nível {l}!", "On a mission": "Em missão", "Too damaged to fight (30% needed)": "Danificado demais para lutar (30% necessário)", "Ready for battle": "Pronto para o combate", "Upgrade the Titan Hangar to raise the maximum level.": "Melhora o Hangar do Titã para subir o nível máximo.", "troop attack": "ataque das tropas", "Equipment": "Equipamento", "Empty": "Vazio", "Remove": "Remover", "Parts inventory": "Peças em inventário", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Derrota acampamentos de saqueadores para ganhar peças. Acampamentos de nível mais alto dão peças melhores.", "Equip": "Equipar", "Scrap for gold": "Reciclar por ouro", "Manage Titan": "Gerir o Titã", "Send the Titan": "Enviar o Titã", "Titan unavailable": "Titã indisponível", "Titan: {a} XP, health {b}%": "Titã: {a} XP, saúde {b}%", "New part won: {p}": "Nova peça ganha: {p}", "Lv {l} · Health {h}%": "Nv. {l} · Saúde {h}%", "Extraction": "Extração", "Forestry": "Silvicultura", "Refining": "Refino", "Military Rations": "Rações militares", "Engineering": "Engenharia", "Intensive Training": "Treino intensivo", "Ballistics": "Balística", "Armor Plating": "Blindagem", "Field Medicine": "Medicina de campanha", "Engines": "Motores", "Logistics": "Logística", "Robotics": "Robótica", "Metal and stone production +{p}%": "Produção de metal e pedra +{p}%", "Wood production +{p}%": "Produção de madeira +{p}%", "Fuel production +{p}%": "Produção de combustível +{p}%", "Rations production +{p}% · troop upkeep -{q}%": "Produção de rações +{p}% · consumo das tropas -{q}%", "Construction speed +{p}%": "Velocidade de construção +{p}%", "Troop training speed +{p}%": "Velocidade de treino +{p}%", "Troop attack +{p}%": "Ataque das tropas +{p}%", "Troop defense +{p}%": "Defesa das tropas +{p}%", "Troop health +{p}%": "Vida das tropas +{p}%", "March speed +{p}%": "Velocidade de marcha +{p}%", "Carry capacity +{p}%": "Capacidade de carga +{p}%", "Titan attack, defense and health +{p}%": "Ataque, defesa e saúde do Titã +{p}%", "Economy": "Economia", "Military": "Militar", "Logistics & Titan": "Logística e Titã", "Requires research: {r}": "Requer pesquisa: {r}", "{t} level {l}": "{t} nível {l}", "{b} level {l}": "{b} nível {l}", "A research is already in progress": "Já há uma pesquisa em andamento", "Research started: {t}": "Pesquisa iniciada: {t}", "{t} level {l} researched": "{t} nível {l} pesquisada", "Research cancelled (50% refunded)": "Pesquisa cancelada (50% reembolsado)", "Unlocks:": "Desbloqueia:", "A technology cannot go above the level of the Research Lab.": "Uma tecnologia não pode passar do nível do Laboratório.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Construa um Laboratório num lote livre da sua base para desbloquear tecnologias.", "In progress:": "Em andamento:", "Not researched yet": "Ainda não pesquisada", "Research in progress": "Pesquisa em andamento", "No research in progress": "Nenhuma pesquisa em andamento", "Open research": "Abrir pesquisas", "Not enough room in your Garrisons": "Não há espaço suficiente nas suas Guarnições", "{n} {u} placed in defense": "{n} {u} em defesa", "{n} {u} withdrawn from defense": "{n} {u} retirados da defesa", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "As tropas em defesa ficam na sua base e lutam quando outro jogador o ataca. Não podem sair em marcha.", "Garrison places: {a} / {b}": "Lugares na Guarnição: {a} / {b}", "Wall: defense bonus +{p}%": "Muro: bónus de defesa +{p}%", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Construa uma Guarnição para colocar tropas em defesa. Cada nível de Guarnição dá 200 lugares.", "In defense: {n}": "Em defesa: {n}", "in defense": "em defesa", "Defend": "Defender", "Withdraw": "Retirar", "All in defense": "Tudo em defesa", "Withdraw all": "Retirar tudo", "Manage defense": "Gerir a defesa", "Small gold pouch": "Bolsa de ouro pequena", "Medium gold pouch": "Bolsa de ouro média", "Large gold pouch": "Bolsa de ouro grande", "Small crate of {r}": "Caixa pequena de {r}", "Medium crate of {r}": "Caixa média de {r}", "Large crate of {r}": "Caixa grande de {r}", "Speed-up {t}": "Acelerador {t}", "Titan repair kit (+{p}%)": "Kit de reparação do Titã (+{p}%)", "Supply drop": "Lançamento de suprimentos", "Gives {n} {r}.": "Dá {n} {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Reduz em {t} o tempo de uma construção, pesquisa ou treino. Use-o a partir da barra de progresso.", "Repairs your Titan by {p}%.": "Repara o seu Titã em {p}%.", "Opens to give 3 random items.": "Contém 3 itens aleatórios.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Use os aceleradores a partir da barra de progresso de uma construção, pesquisa ou treino.", "Your Titan is already fully repaired": "O seu Titã já está totalmente reparado", "Titan repaired: {h}%": "Titã reparado: {h}%", "Resources": "Recursos", "Speed-ups": "Aceleradores", "Other": "Outros", "Win items by defeating Raider Camps and taking resource fields on the map.": "Ganhe itens derrotando acampamentos de saqueadores e tomando terrenos de recursos no mapa.", "Your inventory is empty.": "O seu inventário está vazio.", "Open": "Abrir", "Use": "Usar", "Use all": "Usar tudo", "Speed up": "Acelerar", "Nothing to speed up": "Nada para acelerar", "You have no speed-ups. Defeat Raider Camps to win some.": "Não tem aceleradores. Derrote acampamentos de saqueadores para ganhar alguns.", "Items won: {i}": "Itens ganhos: {i}", "Items won": "Itens ganhos", "Bonus rewards (chance)": "Recompensas bónus (chance)", "Bonus item": "Item bónus", "Second item": "2.º item", "Titan part (with the Titan)": "Peça do Titã (com o Titã)", "Use it from the progress bar at the bottom of the screen.": "Use-o a partir da barra de progresso no fundo do ecrã.", "{n} d": "{n} d", "{r} production boost": "Bónus de produção: {r}", "Combat stimulant": "Estimulante de combate", "Shield generator": "Gerador de escudo", "Forced march": "Marcha forçada", "Lightning march": "Marcha relâmpago", "Drill manual": "Manual de instrução", "{r} production +{p}% for 24 hours.": "Produção de {r} +{p}% durante 24 horas.", "Troop attack +{p}% for 24 hours.": "Ataque das tropas +{p}% durante 24 horas.", "Troop defense +{p}% for 24 hours.": "Defesa das tropas +{p}% durante 24 horas.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Reduz em {p}% o tempo restante de uma marcha. Use-o a partir da barra de progresso.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Reduz em {p}% o tempo restante de um treino. Use-o a partir da barra de progresso.", "{i} active: {t}": "{i} ativo: {t}", "Common": "Comum", "Uncommon": "Incomum", "Rare": "Raro", "Very rare": "Muito raro", "Boosts": "Bónus", "Marches": "Marchas", "Training": "Treino", "Active boosts": "Bónus ativos", "Storage: {n} per resource": "Armazenamento: {n} por recurso", "{d}d {h}h": "{d}d {h}h", "Training speed of all troops +{p}%": "Velocidade de treino de todas as tropas +{p}%", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Cada nível de Guarnição acelera todo o treino em 3%. A pesquisa Treino intensivo acrescenta mais.", "Your session has expired, please log in again.": "A sua sessão expirou, entre novamente.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "O nome deve ter de 3 a 16 letras, números, espaços, - ou _.", "The password must have at least 6 characters.": "A palavra-passe deve ter pelo menos 6 caracteres.", "This name is already taken.": "Este nome já está em uso.", "Wrong name or password.": "Nome ou palavra-passe incorretos.", "Too many tries. Wait one minute.": "Demasiadas tentativas. Aguarde um minuto.", "Server error. Try again later.": "Erro do servidor. Tente mais tarde.", "Military strategy · near future": "Estratégia militar · futuro próximo", "Log in": "Entrar", "Create an account": "Criar uma conta", "Commander name": "Nome do comandante", "Password": "Palavra-passe", "Repeat the password": "Repita a palavra-passe", "The two passwords are different.": "As duas palavras-passe são diferentes.", "Cannot reach the server.": "Não é possível contactar o servidor.", "Bring the game saved on this device into your new account?": "Trazer o jogo guardado neste dispositivo para a nova conta?", "Welcome, commander {n}!": "Bem-vindo, comandante {n}!", "Base of {n}": "Base de {n}", "Commander level {l}": "Comandante nível {l}", "Attacks between players arrive in the next update.": "Os ataques entre jogadores chegam na próxima atualização.", "Account": "Conta", "Logged in as {n}": "Ligado como {n}", "Log out": "Sair", "General": "Geral", "Production": "Produção", "Combat": "Combate", "No item in this category.": "Nenhum item nesta categoria.", "Done": "Feito", "Action refused by the server.": "Ação recusada pelo servidor.", "Administration": "Administração", "Reserved for administrators.": "Reservado aos administradores.", "Administrator account": "Conta de administrador", "Test account": "Conta de teste", "Normal player": "Jogador normal", "all": "tudo", "Give": "Dar", "Items": "Itens", "10 of every item": "10 de cada item", "Time": "Tempo", "Finish everything now": "Terminar tudo agora", "Base and research": "Base e pesquisas", "All buildings to this level": "Todos os edifícios neste nível", "All research to this level": "Todas as pesquisas neste nível", "Set level and repair": "Definir nível e reparar", "Test accounts": "Contas de teste", "Create": "Criar", "Show all accounts": "Ver todas as contas", "Account created: {n}": "Conta criada: {n}", "Supply chest": "Caixa de suprimentos", "Military cache": "Esconderijo militar", "Elite arsenal": "Arsenal de elite", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Abra para ganhar uma recompensa aleatória: tropas, aceleradores, recursos, bónus ou peças do Titã.", "Chests": "Baús", "See the chances": "Ver as probabilidades", "Titan part": "Peça do Titã", "Small crate of a random resource": "Caixa pequena de um recurso aleatório", "Medium crate of a random resource": "Caixa média de um recurso aleatório", "Large crate of a random resource": "Caixa grande de um recurso aleatório", "Production boost (random resource)": "Bónus de produção (recurso aleatório)", "Epic": "Épico", "Legendary": "Lendário", "Collect": "Recolher", "Open another": "Abrir outro", "Open all": "Abrir todos", "Order refused by the server.": "Ordem recusada pelo servidor.", "Local time (offline demo)": "Hora local (demo offline)", "offline": "offline", "Server time": "Hora do servidor", "latency": "latência", "Build a {b}": "Construa: {b}", "Build the {b}": "Construa: {b}", "Upgrade the {b} to level {l}": "Melhore {b} até ao nível {l}", "Have {n} {u}": "Ter {n} {u}", "Win a battle against a Raider Camp": "Vença uma batalha contra um acampamento de saqueadores", "Research any technology": "Pesquise qualquer tecnologia", "Have {n} fields": "Ter {n} campos", "Have an army of {n} troops": "Ter um exército de {n} tropas", "Win {n} battles": "Vença {n} batalhas", "Reach {n} research levels in total": "Alcance {n} níveis de pesquisa no total", "Titan level {l}": "Titã nível {l}", "Equip a part on your Titan": "Equipe uma peça no seu Titã", "Reach {n} power": "Alcance {n} de poder", "Tutorial": "Tutorial", "Construction": "Construção", "Quest complete: {q}": "Missão concluída: {q}", "Complete quests to win resources, speed-ups and chests.": "Conclua missões para ganhar recursos, aceleradores e baús.", "All quests of this category are complete!": "Todas as missões desta categoria estão concluídas!", "Reward:": "Recompensa:", "Go": "Ir", "Free ticket of the day collected!": "Bilhete grátis do dia recolhido!", "Fortune ticket": "Bilhete da roda", "Fortune medal": "Medalhão da roda", "One spin of the ticket wheel.": "Um giro da roda dos bilhetes.", "One spin of the medal wheel, with the best prizes.": "Um giro da roda dos medalhões, com os melhores prémios.", "Wheel of fortune": "Roda da fortuna", "Spin the wheel to win troops, speed-ups, resources and chests.": "Gire a roda para ganhar tropas, aceleradores, recursos e baús.", "Ticket wheel": "Roda dos bilhetes", "Medal wheel": "Roda dos medalhões", "Spin": "Girar", "Collect the free ticket of the day": "Recolher o bilhete grátis do dia", "Next free ticket in {t}": "Próximo bilhete grátis em {t}", "Medals are won in the hardest camps, in big quests and in chests.": "Os medalhões ganham-se nos acampamentos mais difíceis, nas grandes missões e nos baús.", "already_claimed": "Já recolhido hoje.", "Wheel": "Roda"}, "pl": {"You": "Ty", "No alliance": "Brak sojuszu", "Alliance": "Sojusz", "Commander level": "Poziom dowódcy", "Commander": "Dowódca", "{h} h {m}": "{h} godz {m}", "{h} h": "{h} godz", "{n} min": "{n} min", "{s}s": "{s}s", "{m}m {s}s": "{m}min {s}s", "{h}h {m}m": "{h}godz {m}min", "server processing": "przetwarzanie na serwerze", "Too many tries. Wait a few minutes.": "Zbyt wiele prób. Odczekaj kilka minut.", "COMMANDER": "DOWÓDCA", "POWER": "SIŁA", "Progress to next level": "Postęp do następnego poziomu", "Menu": "Menu", "Titan": "Tytan", "Fields": "Pola", "Map": "Mapa", "Base": "Baza", "Shop": "Sklep", "Quests": "Zadania", "Messages": "Wiadomości", "Reports": "Raporty", "Inventory": "Ekwipunek", "Defense": "Obrona", "Troops": "Wojsko", "Research": "Badania", "Settings": "Ustawienia", "MAP": "MAPA", "FIELDS": "POLA", "BASE": "BAZA", "EMPIRE": "IMPERIUM", "ALLIANCE": "SOJUSZ", "TITAN": "TYTAN", "Build the Titan Hangar": "Zbuduj Hangar Tytana", "Hangar level {l} · Ready": "Hangar poz. {l} · Gotowy", "Coming in a future update": "Pojawi się w przyszłej aktualizacji", "Enter base": "Wejdź do bazy", "max": "maks.", "Lv": "Poz.", "metal": "metal", "wood": "drewno", "stone": "kamień", "fuel": "paliwo", "rations": "racje", "gold": "złoto", "Command Center": "Centrum dowodzenia", "Heart of your base. Its level sets the maximum level of every other building.": "Serce twojej bazy. Jego poziom określa maksymalny poziom wszystkich innych budynków.", "Defense Wall": "Mur obronny", "Protects your base and gives a defense bonus to your troops.": "Chroni twoją bazę i daje premię do obrony twoim wojskom.", "Barracks": "Koszary", "Trains infantry units.": "Szkoli piechotę.", "Garrison": "Garnizon", "Houses and trains defensive troops. You can build several.": "Mieści i szkoli wojska obronne. Możesz zbudować kilka.", "Housing Block": "Blok mieszkalny", "Raises population, which supplies workers and recruits. You can build several.": "Zwiększa populację, która dostarcza robotników i rekrutów. Możesz zbudować kilka.", "Warehouse": "Magazyn", "Increases how many resources you can store.": "Zwiększa ilość surowców, które możesz przechowywać.", "Research Lab": "Laboratorium", "Unlocks technologies that improve your whole base.": "Odblokowuje technologie ulepszające całą bazę.", "Vehicle Factory": "Fabryka pojazdów", "Builds armored vehicles.": "Buduje pojazdy opancerzone.", "Rally Point": "Punkt zborny", "Organizes marches. Sets how many troops can leave the base at once.": "Organizuje marsze. Określa, ile wojsk może naraz opuścić bazę.", "Radar Station": "Stacja radarowa", "Detects incoming attacks.": "Wykrywa nadchodzące ataki.", "Titan Hangar": "Hangar Tytana", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Mieści i naprawia twojego Tytana, gigantycznego robota bojowego, który prowadzi ataki i broni bazy. Jego poziom określa maksymalny poziom Tytana.", "Metal Mine": "Kopalnia metalu", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Wydobywa rudę metalu z ziemi. Każdy poziom daje więcej metalu na godzinę.", "Sawmill": "Tartak", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Pozyskuje drewno z okolicznego lasu. Każdy poziom daje więcej drewna na godzinę.", "Stone Quarry": "Kamieniołom", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Wydobywa i tnie bloki kamienne. Każdy poziom daje więcej kamienia na godzinę.", "Fuel Pump": "Pompa paliwa", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pompuje ropę i rafinuje ją na paliwo. Każdy poziom daje więcej paliwa na godzinę.", "Mess Hall": "Stołówka", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Gotuje i przechowuje racje dla wojska. Każdy poziom daje więcej racji na godzinę.", "Helipad": "Lądowisko", "Trains and maintains your air units: attack helicopters and gunships.": "Szkoli i utrzymuje jednostki powietrzne: śmigłowce szturmowe i kanonierki.", "Max building level: {l}": "Maks. poziom budynków: {l}", "Defense bonus +{p}%": "Premia do obrony +{p}%", "Infantry training speed +{p}%": "Szybkość szkolenia piechoty +{p}%", "Defensive troop capacity +{n}": "Pojemność wojsk obronnych +{n}", "Population +{n}": "Populacja +{n}", "Storage +{n} per resource": "Magazyn +{n} na surowiec", "Research speed +{p}%": "Szybkość badań +{p}%", "Vehicle production speed +{p}%": "Szybkość produkcji pojazdów +{p}%", "Max troops per march: {n}": "Maks. wojsk na marsz: {n}", "Titan maximum level: {n}": "Maks. poziom Tytana: {n}", "Air unit training speed +{p}%": "Szybkość szkolenia lotnictwa +{p}%", "Detects attacks and enemy troop count": "Wykrywa ataki i liczebność wroga", "Produces {i} {n} {r} per hour": "Produkuje {i} {n} ({r}) na godzinę", "Recruit": "Rekrut", "Cheap basic infantry. Weak alone, useful in large numbers.": "Tania podstawowa piechota. Słaba w pojedynkę, przydatna w dużej liczbie.", "Rifleman": "Strzelec", "Solid defensive infantry protected by a heavy riot shield.": "Solidna piechota obronna chroniona ciężką tarczą.", "Sniper": "Snajper", "Long-range marksman who strikes before the enemy can reach him.": "Strzelec dalekiego zasięgu, który uderza, zanim wróg go dosięgnie.", "Assault Trooper": "Szturmowiec", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Ciężki żołnierz w egzoszkielecie z karabinem obrotowym. Zabójczy w ataku.", "Supply Truck": "Ciężarówka zaopatrzeniowa", "Carries large amounts of loot back to your base.": "Przewozi duże ilości łupów do twojej bazy.", "Scout Drone": "Dron zwiadowczy", "Very fast scout. Spies on enemy bases and camps.": "Bardzo szybki zwiadowca. Szpieguje wrogie bazy i obozy.", "Armored Carrier": "Transporter opancerzony", "Heavily armored transport with a huge carrying capacity.": "Mocno opancerzony transporter o ogromnej ładowności.", "Battle Tank": "Czołg bojowy", "Massive armored tank. Extremely tough and powerful.": "Potężny opancerzony czołg. Niezwykle wytrzymały i silny.", "Rocket Artillery": "Artyleria rakietowa", "Rocket launcher truck that devastates enemies from very long range.": "Wyrzutnia rakiet na ciężarówce niszcząca wroga z dużej odległości.", "Attack Helicopter": "Śmigłowiec szturmowy", "Fast air unit that strikes with rockets and a nose cannon.": "Szybka jednostka powietrzna atakująca rakietami i działkiem.", "Gunship": "Kanonierka", "Heavy tiltrotor gunship with huge firepower and armor.": "Ciężka kanonierka z wirnikami obrotowymi, ogromna siła ognia i pancerz.", "Build a {b} first": "Najpierw zbuduj: {b}", "Requires {b} level {l}": "Wymaga: {b}, poziom {l}", "Choose how many to train": "Wybierz liczbę do szkolenia", "Training queue full (5 orders max)": "Kolejka szkolenia pełna (maks. 5 rozkazów)", "Not enough population: build or upgrade Housing Blocks": "Za mała populacja: zbuduj lub ulepsz Bloki mieszkalne", "Not enough resources": "Za mało surowców", "Training {n} {u}": "Szkolenie: {n} {u}", "{n} {u} ready": "{n} {u} gotowe", "No rations left: your troops are deserting!": "Brak racji: twoje wojska dezerterują!", "The construction queue is busy": "Kolejka budowy jest zajęta", "Maximum level reached": "Osiągnięto maksymalny poziom", "{b} started": "Rozpoczęto: {b}", "{b} level {l} complete": "{b} poziom {l} ukończony", "Construction cancelled (50% refunded)": "Budowa anulowana (zwrot 50%)", "Power": "Siła", "power": "siły", "Train": "Szkol", "owned {n}": "posiadane {n}", "Max": "Maks.", "each:": "za szt.:", "Train troops": "Szkol wojska", "Population {a} / {b} · Training speed +{p}%": "Populacja {a} / {b} · Szybkość szkolenia +{p}%", "Waiting": "Oczekuje", "Finish (test)": "Zakończ (test)", "Your Army": "Twoja armia", "{n} troops": "{n} żołnierzy", "Population": "Populacja", "Upkeep": "Utrzymanie", "Net": "Netto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Twoje wojska jedzą więcej racji, niż produkujesz. Zbuduj lub ulepsz Stołówki na Polach, inaczej wojska zdezerterują, gdy racje się skończą.", "Infantry · Barracks": "Piechota · Koszary", "Vehicles · Vehicle Factory": "Pojazdy · Fabryka pojazdów", "Air · Helipad": "Lotnictwo · Lądowisko", "training": "w szkoleniu", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Dotknij Koszar, Fabryki pojazdów lub Lądowiska w bazie, aby szkolić więcej wojsk.", "Upgrading to level {l}": "Ulepszanie do poziomu {l}", "Building to level {l}": "Budowa poziomu {l}", "Time left: {t}": "Pozostało: {t}", "Finish now (test)": "Zakończ teraz (test)", "Cancel": "Anuluj", "Level {l} / {m}": "Poziom {l} / {m}", "Current:": "Obecnie:", "Your Titan": "Twój Tytan", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Twój Tytan jest gotowy i trzyma straż przed hangarem. Poziomy, części pancerza i ataki pojawią się wraz z mapą świata.", "Upgrade to level {l}": "Ulepsz do poziomu {l}", "Next:": "Następnie:", "Upgrade": "Ulepsz", "Not built": "Niezbudowany", "Build": "Buduj", "Empty field": "Puste pole", "Choose what to produce on this field.": "Wybierz, co produkować na tym polu.", "Empty plot": "Pusta działka", "Choose a building to construct here.": "Wybierz budynek do postawienia tutaj.", "Every unique building is already built.": "Wszystkie unikalne budynki są już zbudowane.", "Language": "Język", "Test tools": "Narzędzia testowe", "Erase your save and restart from zero. This option will be removed in the final game.": "Usuwa zapis i zaczyna od zera. Ta opcja zostanie usunięta w finalnej grze.", "Reset save": "Resetuj zapis", "Reset your base?": "Zresetować bazę?", "Forest": "Las", "Rocky Hills": "Skaliste wzgórza", "Metal Deposit": "Złoże metalu", "Oil Field": "Pole naftowe", "Farmland": "Pola uprawne", "Plains": "Równina", "Raider Camp": "Obóz najeźdźców", "Your base": "Twoja baza", "Empty land. Nothing to collect here.": "Puste tereny. Nie ma tu nic do zebrania.", "Level {l}": "Poziom {l}", "Distance: {d} tiles": "Odległość: {d} pól", "Enemy forces": "Siły wroga", "Possible loot": "Możliwy łup", "Attack": "Atakuj", "GO": "IDŹ", "Back to my base": "Wróć do bazy", "Send troops": "Wyślij wojska", "Available: {n}": "Dostępne: {n}", "Troops: {a} / {b}": "Wojska: {a} / {b}", "Travel time: {t}": "Czas marszu: {t}", "Carry capacity: {n}": "Ładowność: {n}", "Launch attack": "Rozpocznij atak", "Too many troops for one march (max {n})": "Za dużo wojsk na jeden marsz (maks. {n})", "All marches are busy ({n} max)": "Wszystkie marsze są zajęte (maks. {n})", "Choose your troops": "Wybierz wojska", "You have no troops. Train some at the Barracks.": "Nie masz wojsk. Wyszkol je w Koszarach.", "Troops sent to {p}": "Wojska wysłane do {p}", "Victory": "Zwycięstwo", "Defeat": "Porażka", "Victory at {p}": "Zwycięstwo: {p}", "Defeat at {p}": "Porażka: {p}", "Troops returned with loot": "Wojska wróciły z łupem", "No reports yet.": "Brak raportów.", "Your troops": "Twoje wojska", "Enemy": "Wróg", "Sent": "Wysłane", "Lost": "Stracone", "Killed": "Zabici", "Loot": "Łup", "Marching": "W marszu", "Returning": "Powrót", "Marches: {a} / {b}": "Marsze: {a} / {b}", "{t} ago": "{t} temu", "Raiders": "Najeźdźcy", "All enemy troops were destroyed.": "Wszystkie wrogie wojska zostały zniszczone.", "Your troops had to retreat.": "Twoje wojska musiały się wycofać.", "Armor Plate": "Płyta pancerna", "Arm Cannon": "Działo ramienne", "Jet Reactor": "Reaktor odrzutowy", "Armored Legs": "Opancerzone nogi", "Standard": "Standard", "Advanced": "Zaawansowany", "Elite": "Elitarny", "Prototype": "Prototyp", "Titan reached level {l}!": "Tytan osiąga poziom {l}!", "On a mission": "Na misji", "Too damaged to fight (30% needed)": "Zbyt uszkodzony do walki (wymagane 30%)", "Ready for battle": "Gotowy do walki", "Upgrade the Titan Hangar to raise the maximum level.": "Ulepsz Hangar Tytana, aby podnieść maksymalny poziom.", "troop attack": "ataku wojsk", "Equipment": "Wyposażenie", "Empty": "Puste", "Remove": "Zdejmij", "Parts inventory": "Części w magazynie", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Pokonuj obozy najeźdźców, by zdobywać części. Wyższe obozy dają lepsze części.", "Equip": "Załóż", "Scrap for gold": "Przetop na złoto", "Manage Titan": "Zarządzaj Tytanem", "Send the Titan": "Wyślij Tytana", "Titan unavailable": "Tytan niedostępny", "Titan: {a} XP, health {b}%": "Tytan: {a} PD, stan {b}%", "New part won: {p}": "Zdobyto nową część: {p}", "Lv {l} · Health {h}%": "Poz. {l} · Stan {h}%", "Extraction": "Wydobycie", "Forestry": "Leśnictwo", "Refining": "Rafinacja", "Military Rations": "Racje wojskowe", "Engineering": "Inżynieria", "Intensive Training": "Intensywne szkolenie", "Ballistics": "Balistyka", "Armor Plating": "Opancerzenie", "Field Medicine": "Medycyna polowa", "Engines": "Silniki", "Logistics": "Logistyka", "Robotics": "Robotyka", "Metal and stone production +{p}%": "Produkcja metalu i kamienia +{p}%", "Wood production +{p}%": "Produkcja drewna +{p}%", "Fuel production +{p}%": "Produkcja paliwa +{p}%", "Rations production +{p}% · troop upkeep -{q}%": "Produkcja racji +{p}% · zużycie wojsk -{q}%", "Construction speed +{p}%": "Szybkość budowy +{p}%", "Troop training speed +{p}%": "Szybkość szkolenia wojsk +{p}%", "Troop attack +{p}%": "Atak wojsk +{p}%", "Troop defense +{p}%": "Obrona wojsk +{p}%", "Troop health +{p}%": "Zdrowie wojsk +{p}%", "March speed +{p}%": "Szybkość marszu +{p}%", "Carry capacity +{p}%": "Udźwig +{p}%", "Titan attack, defense and health +{p}%": "Atak, obrona i stan Tytana +{p}%", "Economy": "Gospodarka", "Military": "Wojsko", "Logistics & Titan": "Logistyka i Tytan", "Requires research: {r}": "Wymaga badań: {r}", "{t} level {l}": "{t} poziom {l}", "{b} level {l}": "{b} poziom {l}", "A research is already in progress": "Badanie jest już w toku", "Research started: {t}": "Rozpoczęto badanie: {t}", "{t} level {l} researched": "{t} poziom {l} zbadano", "Research cancelled (50% refunded)": "Badanie anulowane (zwrot 50%)", "Unlocks:": "Odblokowuje:", "A technology cannot go above the level of the Research Lab.": "Technologia nie może przekroczyć poziomu Laboratorium.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Zbuduj Laboratorium na wolnym miejscu w bazie, aby odblokować technologie.", "In progress:": "W toku:", "Not researched yet": "Jeszcze nie zbadano", "Research in progress": "Badanie w toku", "No research in progress": "Brak trwających badań", "Open research": "Otwórz badania", "Not enough room in your Garrisons": "Za mało miejsca w garnizonach", "{n} {u} placed in defense": "{n} {u} w obronie", "{n} {u} withdrawn from defense": "{n} {u} wycofano z obrony", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Wojska w obronie zostają w bazie i walczą, gdy zaatakuje cię inny gracz. Nie mogą wyruszać w marsz.", "Garrison places: {a} / {b}": "Miejsca w garnizonie: {a} / {b}", "Wall: defense bonus +{p}%": "Mur: premia obrony +{p}%", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Zbuduj Garnizon, aby postawić wojska w obronie. Każdy poziom Garnizonu daje 200 miejsc.", "In defense: {n}": "W obronie: {n}", "in defense": "w obronie", "Defend": "Broń", "Withdraw": "Wycofaj", "All in defense": "Wszystkie do obrony", "Withdraw all": "Wycofaj wszystkie", "Manage defense": "Zarządzaj obroną", "Small gold pouch": "Mała sakiewka złota", "Medium gold pouch": "Średnia sakiewka złota", "Large gold pouch": "Duża sakiewka złota", "Small crate of {r}": "Mała skrzynia: {r}", "Medium crate of {r}": "Średnia skrzynia: {r}", "Large crate of {r}": "Duża skrzynia: {r}", "Speed-up {t}": "Przyspieszenie {t}", "Titan repair kit (+{p}%)": "Zestaw naprawczy Tytana (+{p}%)", "Supply drop": "Zrzut zaopatrzenia", "Gives {n} {r}.": "Daje {n}: {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Skraca budowę, badanie lub szkolenie o {t}. Użyj z paska postępu.", "Repairs your Titan by {p}%.": "Naprawia Tytana o {p}%.", "Opens to give 3 random items.": "Zawiera 3 losowe przedmioty.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Używaj przyspieszeń z paska postępu budowy, badania lub szkolenia.", "Your Titan is already fully repaired": "Twój Tytan jest już w pełni naprawiony", "Titan repaired: {h}%": "Tytan naprawiony: {h}%", "Resources": "Surowce", "Speed-ups": "Przyspieszenia", "Other": "Inne", "Win items by defeating Raider Camps and taking resource fields on the map.": "Zdobywaj przedmioty, pokonując obozy grabieżców i zajmując pola surowców na mapie.", "Your inventory is empty.": "Twój ekwipunek jest pusty.", "Open": "Otwórz", "Use": "Użyj", "Use all": "Użyj wszystkich", "Speed up": "Przyspiesz", "Nothing to speed up": "Nic do przyspieszenia", "You have no speed-ups. Defeat Raider Camps to win some.": "Nie masz przyspieszeń. Pokonuj obozy grabieżców, aby je zdobyć.", "Items won: {i}": "Zdobyte przedmioty: {i}", "Items won": "Zdobyte przedmioty", "Bonus rewards (chance)": "Nagrody dodatkowe (szansa)", "Bonus item": "Przedmiot dodatkowy", "Second item": "2. przedmiot", "Titan part (with the Titan)": "Część Tytana (z Tytanem)", "Use it from the progress bar at the bottom of the screen.": "Użyj z paska postępu na dole ekranu.", "{n} d": "{n} d", "{r} production boost": "Premia produkcji: {r}", "Combat stimulant": "Stymulant bojowy", "Shield generator": "Generator osłon", "Forced march": "Marsz forsowny", "Lightning march": "Marsz błyskawiczny", "Drill manual": "Podręcznik musztry", "{r} production +{p}% for 24 hours.": "Produkcja ({r}) +{p}% przez 24 godziny.", "Troop attack +{p}% for 24 hours.": "Atak wojsk +{p}% przez 24 godziny.", "Troop defense +{p}% for 24 hours.": "Obrona wojsk +{p}% przez 24 godziny.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Skraca pozostały czas marszu o {p}%. Użyj z paska postępu.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Skraca pozostały czas szkolenia o {p}%. Użyj z paska postępu.", "{i} active: {t}": "{i} aktywny: {t}", "Common": "Pospolity", "Uncommon": "Niepospolity", "Rare": "Rzadki", "Very rare": "Bardzo rzadki", "Boosts": "Premie", "Marches": "Marsze", "Training": "Szkolenie", "Active boosts": "Aktywne premie", "Storage: {n} per resource": "Magazyn: {n} na surowiec", "{d}d {h}h": "{d}d {h}godz", "Training speed of all troops +{p}%": "Szybkość szkolenia wszystkich wojsk +{p}%", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Każdy poziom Garnizonu przyspiesza każde szkolenie o 3%. Badanie Intensywne szkolenie daje więcej.", "Your session has expired, please log in again.": "Sesja wygasła, zaloguj się ponownie.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "Nazwa musi mieć od 3 do 16 liter, cyfr, spacji, - lub _.", "The password must have at least 6 characters.": "Hasło musi mieć co najmniej 6 znaków.", "This name is already taken.": "Ta nazwa jest już zajęta.", "Wrong name or password.": "Błędna nazwa lub hasło.", "Too many tries. Wait one minute.": "Zbyt wiele prób. Odczekaj minutę.", "Server error. Try again later.": "Błąd serwera. Spróbuj później.", "Military strategy · near future": "Strategia wojskowa · bliska przyszłość", "Log in": "Zaloguj", "Create an account": "Utwórz konto", "Commander name": "Nazwa dowódcy", "Password": "Hasło", "Repeat the password": "Powtórz hasło", "The two passwords are different.": "Hasła się różnią.", "Cannot reach the server.": "Nie można połączyć się z serwerem.", "Bring the game saved on this device into your new account?": "Przenieść grę zapisaną na tym urządzeniu do nowego konta?", "Welcome, commander {n}!": "Witaj, dowódco {n}!", "Base of {n}": "Baza: {n}", "Commander level {l}": "Dowódca poziom {l}", "Attacks between players arrive in the next update.": "Ataki między graczami pojawią się w następnej aktualizacji.", "Account": "Konto", "Logged in as {n}": "Zalogowano jako {n}", "Log out": "Wyloguj", "General": "Ogólne", "Production": "Produkcja", "Combat": "Walka", "No item in this category.": "Brak przedmiotów w tej kategorii.", "Done": "Gotowe", "Action refused by the server.": "Serwer odrzucił akcję.", "Administration": "Administracja", "Reserved for administrators.": "Tylko dla administratorów.", "Administrator account": "Konto administratora", "Test account": "Konto testowe", "Normal player": "Zwykły gracz", "all": "wszystko", "Give": "Daj", "Items": "Przedmioty", "10 of every item": "10 każdego przedmiotu", "Time": "Czas", "Finish everything now": "Zakończ wszystko teraz", "Base and research": "Baza i badania", "All buildings to this level": "Wszystkie budynki na ten poziom", "All research to this level": "Wszystkie badania na ten poziom", "Set level and repair": "Ustaw poziom i napraw", "Test accounts": "Konta testowe", "Create": "Utwórz", "Show all accounts": "Pokaż wszystkie konta", "Account created: {n}": "Utworzono konto: {n}", "Supply chest": "Skrzynia zaopatrzenia", "Military cache": "Skrytka wojskowa", "Elite arsenal": "Arsenał elitarny", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Otwórz, aby zdobyć losową nagrodę: wojska, przyspieszenia, surowce, premie lub części Tytana.", "Chests": "Skrzynie", "See the chances": "Zobacz szanse", "Titan part": "Część Tytana", "Small crate of a random resource": "Mała skrzynia losowego surowca", "Medium crate of a random resource": "Średnia skrzynia losowego surowca", "Large crate of a random resource": "Duża skrzynia losowego surowca", "Production boost (random resource)": "Premia produkcji (losowy surowiec)", "Epic": "Epicki", "Legendary": "Legendarny", "Collect": "Odbierz", "Open another": "Otwórz kolejną", "Open all": "Otwórz wszystkie", "Order refused by the server.": "Serwer odrzucił rozkaz.", "Local time (offline demo)": "Czas lokalny (demo offline)", "offline": "offline", "Server time": "Czas serwera", "latency": "opóźnienie", "Build a {b}": "Zbuduj: {b}", "Build the {b}": "Zbuduj: {b}", "Upgrade the {b} to level {l}": "Ulepsz {b} do poziomu {l}", "Have {n} {u}": "Miej {n}: {u}", "Win a battle against a Raider Camp": "Wygraj bitwę z obozem grabieżców", "Research any technology": "Zbadaj dowolną technologię", "Have {n} fields": "Miej {n} pól", "Have an army of {n} troops": "Miej armię {n} żołnierzy", "Win {n} battles": "Wygraj {n} bitew", "Reach {n} research levels in total": "Osiągnij łącznie {n} poziomów badań", "Titan level {l}": "Tytan poziom {l}", "Equip a part on your Titan": "Załóż część na Tytana", "Reach {n} power": "Osiągnij {n} potęgi", "Tutorial": "Samouczek", "Construction": "Budowa", "Quest complete: {q}": "Zadanie ukończone: {q}", "Complete quests to win resources, speed-ups and chests.": "Wykonuj zadania, aby zdobywać surowce, przyspieszenia i skrzynie.", "All quests of this category are complete!": "Wszystkie zadania tej kategorii są ukończone!", "Reward:": "Nagroda:", "Go": "Idź", "Free ticket of the day collected!": "Odebrano darmowy bilet dnia!", "Fortune ticket": "Bilet koła fortuny", "Fortune medal": "Medalion koła fortuny", "One spin of the ticket wheel.": "Jeden obrót kołem biletów.", "One spin of the medal wheel, with the best prizes.": "Jeden obrót kołem medalionów, z najlepszymi nagrodami.", "Wheel of fortune": "Koło fortuny", "Spin the wheel to win troops, speed-ups, resources and chests.": "Zakręć kołem i wygraj wojska, przyspieszenia, surowce i skrzynie.", "Ticket wheel": "Koło biletów", "Medal wheel": "Koło medalionów", "Spin": "Zakręć", "Collect the free ticket of the day": "Odbierz darmowy bilet dnia", "Next free ticket in {t}": "Następny darmowy bilet za {t}", "Medals are won in the hardest camps, in big quests and in chests.": "Medaliony zdobywa się w najtrudniejszych obozach, dużych zadaniach i skrzyniach.", "already_claimed": "Już odebrano dzisiaj.", "Wheel": "Koło"}, "tr": {"You": "Sen", "No alliance": "İttifak yok", "Alliance": "İttifak", "Commander level": "Komutan seviyesi", "Commander": "Komutan", "{h} h {m}": "{h} s {m}", "{h} h": "{h} s", "{n} min": "{n} dk", "{s}s": "{s}sn", "{m}m {s}s": "{m}dk {s}sn", "{h}h {m}m": "{h}s {m}dk", "server processing": "sunucu işlemi", "Too many tries. Wait a few minutes.": "Çok fazla deneme. Birkaç dakika bekle.", "COMMANDER": "KOMUTAN", "POWER": "GÜÇ", "Progress to next level": "Sonraki seviyeye ilerleme", "Menu": "Menü", "Titan": "Titan", "Fields": "Tarlalar", "Map": "Harita", "Base": "Üs", "Shop": "Mağaza", "Quests": "Görevler", "Messages": "Mesajlar", "Reports": "Raporlar", "Inventory": "Envanter", "Defense": "Savunma", "Troops": "Birlikler", "Research": "Araştırma", "Settings": "Ayarlar", "MAP": "HARİTA", "FIELDS": "TARLALAR", "BASE": "ÜS", "EMPIRE": "İMPARATORLUK", "ALLIANCE": "İTTİFAK", "TITAN": "TİTAN", "Build the Titan Hangar": "Titan Hangarını inşa et", "Hangar level {l} · Ready": "Hangar seviye {l} · Hazır", "Coming in a future update": "Gelecek bir güncellemede gelecek", "Enter base": "Üsse gir", "max": "maks.", "Lv": "Sv.", "metal": "metal", "wood": "odun", "stone": "taş", "fuel": "yakıt", "rations": "erzak", "gold": "altın", "Command Center": "Komuta Merkezi", "Heart of your base. Its level sets the maximum level of every other building.": "Üssünün kalbi. Seviyesi diğer tüm binaların azami seviyesini belirler.", "Defense Wall": "Savunma Duvarı", "Protects your base and gives a defense bonus to your troops.": "Üssünü korur ve birliklerine savunma bonusu verir.", "Barracks": "Kışla", "Trains infantry units.": "Piyade birlikleri yetiştirir.", "Garrison": "Garnizon", "Houses and trains defensive troops. You can build several.": "Savunma birliklerini barındırır ve eğitir. Birden fazla inşa edebilirsin.", "Housing Block": "Konut Bloğu", "Raises population, which supplies workers and recruits. You can build several.": "İşçi ve acemi sağlayan nüfusu artırır. Birden fazla inşa edebilirsin.", "Warehouse": "Depo", "Increases how many resources you can store.": "Depolayabileceğin kaynak miktarını artırır.", "Research Lab": "Araştırma Laboratuvarı", "Unlocks technologies that improve your whole base.": "Tüm üssünü geliştiren teknolojilerin kilidini açar.", "Vehicle Factory": "Araç Fabrikası", "Builds armored vehicles.": "Zırhlı araçlar üretir.", "Rally Point": "Toplanma Noktası", "Organizes marches. Sets how many troops can leave the base at once.": "Seferleri düzenler. Üssü aynı anda kaç birliğin terk edebileceğini belirler.", "Radar Station": "Radar İstasyonu", "Detects incoming attacks.": "Gelen saldırıları tespit eder.", "Titan Hangar": "Titan Hangarı", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Saldırılarına öncülük eden ve üssü savunan dev savaş robotu Titan'ını barındırır ve onarır. Seviyesi Titan'ın azami seviyesini belirler.", "Metal Mine": "Metal Madeni", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Topraktan metal cevheri çıkarır. Her seviye saatte daha fazla metal üretir.", "Sawmill": "Kereste Fabrikası", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Çevredeki ormandan kereste keser. Her seviye saatte daha fazla odun üretir.", "Stone Quarry": "Taş Ocağı", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Taş blokları kazar ve keser. Her seviye saatte daha fazla taş üretir.", "Fuel Pump": "Yakıt Pompası", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Ham petrol pompalar ve yakıta dönüştürür. Her seviye saatte daha fazla yakıt üretir.", "Mess Hall": "Yemekhane", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Birliklerini beslemek için erzak pişirir ve depolar. Her seviye saatte daha fazla erzak üretir.", "Helipad": "Helikopter Pisti", "Trains and maintains your air units: attack helicopters and gunships.": "Hava birliklerini eğitir ve bakımını yapar: taarruz helikopterleri ve savaş uçakları.", "Max building level: {l}": "Azami bina seviyesi: {l}", "Defense bonus +{p}%": "Savunma bonusu +%{p}", "Infantry training speed +{p}%": "Piyade eğitim hızı +%{p}", "Defensive troop capacity +{n}": "Savunma birliği kapasitesi +{n}", "Population +{n}": "Nüfus +{n}", "Storage +{n} per resource": "Kaynak başına depo +{n}", "Research speed +{p}%": "Araştırma hızı +%{p}", "Vehicle production speed +{p}%": "Araç üretim hızı +%{p}", "Max troops per march: {n}": "Sefer başına azami birlik: {n}", "Titan maximum level: {n}": "Titan azami seviyesi: {n}", "Air unit training speed +{p}%": "Hava birliği eğitim hızı +%{p}", "Detects attacks and enemy troop count": "Saldırıları ve düşman birlik sayısını tespit eder", "Produces {i} {n} {r} per hour": "Saatte {i} {n} {r} üretir", "Recruit": "Acemi", "Cheap basic infantry. Weak alone, useful in large numbers.": "Ucuz temel piyade. Tek başına zayıf, kalabalık hâlde faydalı.", "Rifleman": "Tüfekçi", "Solid defensive infantry protected by a heavy riot shield.": "Ağır bir kalkanla korunan sağlam savunma piyadesi.", "Sniper": "Keskin Nişancı", "Long-range marksman who strikes before the enemy can reach him.": "Düşman ona ulaşmadan vuran uzun menzilli nişancı.", "Assault Trooper": "Saldırı Askeri", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Döner makineli tüfekli ağır dış iskelet askeri. Saldırıda ölümcül.", "Supply Truck": "İkmal Kamyonu", "Carries large amounts of loot back to your base.": "Büyük miktarda ganimeti üssüne taşır.", "Scout Drone": "Keşif Dronu", "Very fast scout. Spies on enemy bases and camps.": "Çok hızlı keşifçi. Düşman üslerini ve kamplarını gözetler.", "Armored Carrier": "Zırhlı Taşıyıcı", "Heavily armored transport with a huge carrying capacity.": "Devasa taşıma kapasiteli ağır zırhlı taşıyıcı.", "Battle Tank": "Muharebe Tankı", "Massive armored tank. Extremely tough and powerful.": "Devasa zırhlı tank. Son derece dayanıklı ve güçlü.", "Rocket Artillery": "Roket Topçusu", "Rocket launcher truck that devastates enemies from very long range.": "Düşmanları çok uzaktan yok eden roketatar kamyonu.", "Attack Helicopter": "Taarruz Helikopteri", "Fast air unit that strikes with rockets and a nose cannon.": "Roket ve burun topuyla saldıran hızlı hava birliği.", "Gunship": "Savaş Uçağı", "Heavy tiltrotor gunship with huge firepower and armor.": "Muazzam ateş gücü ve zırhı olan ağır döner rotorlu savaş uçağı.", "Build a {b} first": "Önce inşa et: {b}", "Requires {b} level {l}": "Gerekli: {b} seviye {l}", "Choose how many to train": "Kaç tane eğitileceğini seç", "Training queue full (5 orders max)": "Eğitim kuyruğu dolu (en fazla 5 emir)", "Not enough population: build or upgrade Housing Blocks": "Yetersiz nüfus: Konut Bloğu inşa et veya geliştir", "Not enough resources": "Yetersiz kaynak", "Training {n} {u}": "Eğitiliyor: {n} {u}", "{n} {u} ready": "{n} {u} hazır", "No rations left: your troops are deserting!": "Erzak bitti: birliklerin firar ediyor!", "The construction queue is busy": "İnşaat kuyruğu dolu", "Maximum level reached": "Azami seviyeye ulaşıldı", "{b} started": "{b} başladı", "{b} level {l} complete": "{b} seviye {l} tamamlandı", "Construction cancelled (50% refunded)": "İnşaat iptal edildi (%50 iade)", "Power": "Güç", "power": "güç", "Train": "Eğit", "owned {n}": "sahip {n}", "Max": "Maks.", "each:": "tanesi:", "Train troops": "Birlik eğit", "Population {a} / {b} · Training speed +{p}%": "Nüfus {a} / {b} · Eğitim hızı +%{p}", "Waiting": "Bekliyor", "Finish (test)": "Bitir (test)", "Your Army": "Ordun", "{n} troops": "{n} birlik", "Population": "Nüfus", "Upkeep": "Bakım", "Net": "Net", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Birliklerin ürettiğinden fazla erzak tüketiyor. Tarlalarda Yemekhane inşa et veya geliştir, yoksa erzak bitince birliklerin firar edecek.", "Infantry · Barracks": "Piyade · Kışla", "Vehicles · Vehicle Factory": "Araçlar · Araç Fabrikası", "Air · Helipad": "Hava · Helikopter Pisti", "training": "eğitimde", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Daha fazla birlik eğitmek için üssündeki Kışla, Araç Fabrikası veya Helikopter Pistine dokun.", "Upgrading to level {l}": "Seviye {l} için geliştiriliyor", "Building to level {l}": "Seviye {l} inşa ediliyor", "Time left: {t}": "Kalan süre: {t}", "Finish now (test)": "Şimdi bitir (test)", "Cancel": "İptal", "Level {l} / {m}": "Seviye {l} / {m}", "Current:": "Mevcut:", "Your Titan": "Titan'ın", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Titan'ın hazır ve hangarın önünde nöbet tutuyor. Seviyeler, zırh parçaları ve saldırılar dünya haritasıyla gelecek.", "Upgrade to level {l}": "Geliştir: seviye {l}", "Next:": "Sonraki:", "Upgrade": "Geliştir", "Not built": "İnşa edilmedi", "Build": "İnşa et", "Empty field": "Boş tarla", "Choose what to produce on this field.": "Bu tarlada ne üretileceğini seç.", "Empty plot": "Boş arsa", "Choose a building to construct here.": "Buraya inşa edilecek binayı seç.", "Every unique building is already built.": "Tüm benzersiz binalar zaten inşa edildi.", "Language": "Dil", "Test tools": "Test araçları", "Erase your save and restart from zero. This option will be removed in the final game.": "Kaydını sil ve sıfırdan başla. Bu seçenek oyunun son sürümünde kaldırılacak.", "Reset save": "Kaydı sıfırla", "Reset your base?": "Üssün sıfırlansın mı?", "Forest": "Orman", "Rocky Hills": "Kayalık Tepeler", "Metal Deposit": "Metal Yatağı", "Oil Field": "Petrol Sahası", "Farmland": "Tarım Arazisi", "Plains": "Ova", "Raider Camp": "Yağmacı Kampı", "Your base": "Senin üssün", "Empty land. Nothing to collect here.": "Boş arazi. Burada toplanacak bir şey yok.", "Level {l}": "Seviye {l}", "Distance: {d} tiles": "Mesafe: {d} kare", "Enemy forces": "Düşman kuvvetleri", "Possible loot": "Olası ganimet", "Attack": "Saldır", "GO": "GİT", "Back to my base": "Üssüme dön", "Send troops": "Birlik gönder", "Available: {n}": "Mevcut: {n}", "Troops: {a} / {b}": "Birlikler: {a} / {b}", "Travel time: {t}": "Yol süresi: {t}", "Carry capacity: {n}": "Taşıma kapasitesi: {n}", "Launch attack": "Saldırıyı başlat", "Too many troops for one march (max {n})": "Bir sefer için çok fazla birlik (en fazla {n})", "All marches are busy ({n} max)": "Tüm seferler meşgul (en fazla {n})", "Choose your troops": "Birliklerini seç", "You have no troops. Train some at the Barracks.": "Hiç birliğin yok. Kışla'da eğit.", "Troops sent to {p}": "Birlikler {p} hedefine gönderildi", "Victory": "Zafer", "Defeat": "Yenilgi", "Victory at {p}": "Zafer: {p}", "Defeat at {p}": "Yenilgi: {p}", "Troops returned with loot": "Birlikler ganimetle döndü", "No reports yet.": "Henüz rapor yok.", "Your troops": "Birliklerin", "Enemy": "Düşman", "Sent": "Gönderilen", "Lost": "Kayıp", "Killed": "Öldürülen", "Loot": "Ganimet", "Marching": "Yolda", "Returning": "Dönüyor", "Marches: {a} / {b}": "Seferler: {a} / {b}", "{t} ago": "{t} önce", "Raiders": "Yağmacılar", "All enemy troops were destroyed.": "Tüm düşman birlikleri yok edildi.", "Your troops had to retreat.": "Birliklerin geri çekilmek zorunda kaldı.", "Armor Plate": "Zırh Plakası", "Arm Cannon": "Kol Topu", "Jet Reactor": "Jet Reaktörü", "Armored Legs": "Zırhlı Bacaklar", "Standard": "Standart", "Advanced": "Gelişmiş", "Elite": "Elit", "Prototype": "Prototip", "Titan reached level {l}!": "Titan seviye {l} oldu!", "On a mission": "Görevde", "Too damaged to fight (30% needed)": "Savaşmak için fazla hasarlı (%30 gerekli)", "Ready for battle": "Savaşa hazır", "Upgrade the Titan Hangar to raise the maximum level.": "Azami seviyeyi artırmak için Titan Hangarını geliştir.", "troop attack": "birlik saldırısı", "Equipment": "Ekipman", "Empty": "Boş", "Remove": "Çıkar", "Parts inventory": "Parça envanteri", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Ekipman parçası kazanmak için Yağmacı Kamplarını yen. Yüksek seviyeli kamplar daha iyi parçalar verir.", "Equip": "Tak", "Scrap for gold": "Altın karşılığı hurdaya çıkar", "Manage Titan": "Titanı yönet", "Send the Titan": "Titanı gönder", "Titan unavailable": "Titan kullanılamıyor", "Titan: {a} XP, health {b}%": "Titan: {a} XP, sağlık %{b}", "New part won: {p}": "Yeni parça kazanıldı: {p}", "Lv {l} · Health {h}%": "Sv. {l} · Sağlık %{h}", "Extraction": "Madencilik", "Forestry": "Ormancılık", "Refining": "Rafineri", "Military Rations": "Askeri Tayın", "Engineering": "Mühendislik", "Intensive Training": "Yoğun Eğitim", "Ballistics": "Balistik", "Armor Plating": "Zırh Kaplama", "Field Medicine": "Saha Tıbbı", "Engines": "Motorlar", "Logistics": "Lojistik", "Robotics": "Robotik", "Metal and stone production +{p}%": "Metal ve taş üretimi +%{p}", "Wood production +{p}%": "Odun üretimi +%{p}", "Fuel production +{p}%": "Yakıt üretimi +%{p}", "Rations production +{p}% · troop upkeep -{q}%": "Tayın üretimi +%{p} · birlik tüketimi -%{q}", "Construction speed +{p}%": "İnşaat hızı +%{p}", "Troop training speed +{p}%": "Birlik eğitim hızı +%{p}", "Troop attack +{p}%": "Birlik saldırısı +%{p}", "Troop defense +{p}%": "Birlik savunması +%{p}", "Troop health +{p}%": "Birlik canı +%{p}", "March speed +{p}%": "Yürüyüş hızı +%{p}", "Carry capacity +{p}%": "Taşıma kapasitesi +%{p}", "Titan attack, defense and health +{p}%": "Titan saldırı, savunma ve sağlığı +%{p}", "Economy": "Ekonomi", "Military": "Askeri", "Logistics & Titan": "Lojistik ve Titan", "Requires research: {r}": "Gereken araştırma: {r}", "{t} level {l}": "{t} seviye {l}", "{b} level {l}": "{b} seviye {l}", "A research is already in progress": "Zaten bir araştırma sürüyor", "Research started: {t}": "Araştırma başladı: {t}", "{t} level {l} researched": "{t} seviye {l} araştırıldı", "Research cancelled (50% refunded)": "Araştırma iptal edildi (%50 iade)", "Unlocks:": "Açar:", "A technology cannot go above the level of the Research Lab.": "Bir teknoloji Laboratuvar seviyesini geçemez.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Teknolojileri açmak için üssünde boş bir alana Laboratuvar inşa et.", "In progress:": "Devam ediyor:", "Not researched yet": "Henüz araştırılmadı", "Research in progress": "Araştırma sürüyor", "No research in progress": "Devam eden araştırma yok", "Open research": "Araştırmaları aç", "Not enough room in your Garrisons": "Garnizonlarında yeterli yer yok", "{n} {u} placed in defense": "{n} {u} savunmaya alındı", "{n} {u} withdrawn from defense": "{n} {u} savunmadan çekildi", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Savunmadaki birlikler üssünde kalır ve başka bir oyuncu saldırdığında savaşır. Yürüyüşe gönderilemezler.", "Garrison places: {a} / {b}": "Garnizon yeri: {a} / {b}", "Wall: defense bonus +{p}%": "Sur: savunma bonusu +%{p}", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Birlikleri savunmaya almak için bir Garnizon inşa et. Her Garnizon seviyesi 200 yer verir.", "In defense: {n}": "Savunmada: {n}", "in defense": "savunmada", "Defend": "Savun", "Withdraw": "Geri çek", "All in defense": "Hepsi savunmaya", "Withdraw all": "Hepsini geri çek", "Manage defense": "Savunmayı yönet", "Small gold pouch": "Küçük altın kesesi", "Medium gold pouch": "Orta altın kesesi", "Large gold pouch": "Büyük altın kesesi", "Small crate of {r}": "Küçük {r} sandığı", "Medium crate of {r}": "Orta {r} sandığı", "Large crate of {r}": "Büyük {r} sandığı", "Speed-up {t}": "Hızlandırıcı {t}", "Titan repair kit (+{p}%)": "Titan tamir kiti (+%{p})", "Supply drop": "İkmal paketi", "Gives {n} {r}.": "{n} {r} verir.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Bir inşaat, araştırma veya eğitimin süresini {t} kısaltır. İlerleme çubuğundan kullan.", "Repairs your Titan by {p}%.": "Titanını %{p} onarır.", "Opens to give 3 random items.": "3 rastgele eşya içerir.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Hızlandırıcıları bir inşaat, araştırma veya eğitimin ilerleme çubuğundan kullan.", "Your Titan is already fully repaired": "Titanın zaten tamamen onarıldı", "Titan repaired: {h}%": "Titan onarıldı: %{h}", "Resources": "Kaynaklar", "Speed-ups": "Hızlandırıcılar", "Other": "Diğer", "Win items by defeating Raider Camps and taking resource fields on the map.": "Haritada yağmacı kamplarını yenerek ve kaynak alanlarını alarak eşya kazan.", "Your inventory is empty.": "Envanterin boş.", "Open": "Aç", "Use": "Kullan", "Use all": "Hepsini kullan", "Speed up": "Hızlandır", "Nothing to speed up": "Hızlandırılacak bir şey yok", "You have no speed-ups. Defeat Raider Camps to win some.": "Hızlandırıcın yok. Kazanmak için yağmacı kamplarını yen.", "Items won: {i}": "Kazanılan eşyalar: {i}", "Items won": "Kazanılan eşyalar", "Bonus rewards (chance)": "Bonus ödüller (şans)", "Bonus item": "Bonus eşya", "Second item": "2. eşya", "Titan part (with the Titan)": "Titan parçası (Titan ile)", "Use it from the progress bar at the bottom of the screen.": "Ekranın altındaki ilerleme çubuğundan kullan.", "{n} d": "{n} g", "{r} production boost": "Üretim bonusu: {r}", "Combat stimulant": "Savaş uyarıcısı", "Shield generator": "Kalkan jeneratörü", "Forced march": "Zorunlu yürüyüş", "Lightning march": "Yıldırım yürüyüşü", "Drill manual": "Talim kılavuzu", "{r} production +{p}% for 24 hours.": "{r} üretimi 24 saat boyunca +%{p}.", "Troop attack +{p}% for 24 hours.": "Birlik saldırısı 24 saat boyunca +%{p}.", "Troop defense +{p}% for 24 hours.": "Birlik savunması 24 saat boyunca +%{p}.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Bir yürüyüşün kalan süresini %{p} kısaltır. İlerleme çubuğundan kullan.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Bir eğitimin kalan süresini %{p} kısaltır. İlerleme çubuğundan kullan.", "{i} active: {t}": "{i} etkin: {t}", "Common": "Yaygın", "Uncommon": "Nadir olmayan", "Rare": "Nadir", "Very rare": "Çok nadir", "Boosts": "Bonuslar", "Marches": "Yürüyüşler", "Training": "Eğitim", "Active boosts": "Etkin bonuslar", "Storage: {n} per resource": "Depo: kaynak başına {n}", "{d}d {h}h": "{d}g {h}s", "Training speed of all troops +{p}%": "Tüm birliklerin eğitim hızı +%{p}", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Her Garnizon seviyesi tüm eğitimleri %3 hızlandırır. Yoğun Eğitim araştırması daha fazlasını ekler.", "Your session has expired, please log in again.": "Oturumun sona erdi, lütfen tekrar giriş yap.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "İsim 3 ile 16 arasında harf, rakam, boşluk, - veya _ içermelidir.", "The password must have at least 6 characters.": "Şifre en az 6 karakter olmalıdır.", "This name is already taken.": "Bu isim zaten alınmış.", "Wrong name or password.": "Yanlış isim veya şifre.", "Too many tries. Wait one minute.": "Çok fazla deneme. Bir dakika bekle.", "Server error. Try again later.": "Sunucu hatası. Daha sonra tekrar dene.", "Military strategy · near future": "Askeri strateji · yakın gelecek", "Log in": "Giriş yap", "Create an account": "Hesap oluştur", "Commander name": "Komutan adı", "Password": "Şifre", "Repeat the password": "Şifreyi tekrarla", "The two passwords are different.": "İki şifre farklı.", "Cannot reach the server.": "Sunucuya ulaşılamıyor.", "Bring the game saved on this device into your new account?": "Bu cihazda kayıtlı oyunu yeni hesabına aktar?", "Welcome, commander {n}!": "Hoş geldin, komutan {n}!", "Base of {n}": "{n} üssü", "Commander level {l}": "Komutan seviye {l}", "Attacks between players arrive in the next update.": "Oyuncular arası saldırılar bir sonraki güncellemede geliyor.", "Account": "Hesap", "Logged in as {n}": "{n} olarak giriş yapıldı", "Log out": "Çıkış yap", "General": "Genel", "Production": "Üretim", "Combat": "Savaş", "No item in this category.": "Bu kategoride eşya yok.", "Done": "Tamam", "Action refused by the server.": "İşlem sunucu tarafından reddedildi.", "Administration": "Yönetim", "Reserved for administrators.": "Yöneticilere özel.", "Administrator account": "Yönetici hesabı", "Test account": "Test hesabı", "Normal player": "Normal oyuncu", "all": "hepsi", "Give": "Ver", "Items": "Eşyalar", "10 of every item": "Her eşyadan 10", "Time": "Zaman", "Finish everything now": "Her şeyi şimdi bitir", "Base and research": "Üs ve araştırmalar", "All buildings to this level": "Tüm binalar bu seviyeye", "All research to this level": "Tüm araştırmalar bu seviyeye", "Set level and repair": "Seviyeyi ayarla ve onar", "Test accounts": "Test hesapları", "Create": "Oluştur", "Show all accounts": "Tüm hesapları göster", "Account created: {n}": "Hesap oluşturuldu: {n}", "Supply chest": "İkmal sandığı", "Military cache": "Askeri zula", "Elite arsenal": "Elit cephanelik", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Rastgele bir ödül kazanmak için aç: birlikler, hızlandırıcılar, kaynaklar, bonuslar veya Titan parçaları.", "Chests": "Sandıklar", "See the chances": "Şansları gör", "Titan part": "Titan parçası", "Small crate of a random resource": "Rastgele kaynaklı küçük sandık", "Medium crate of a random resource": "Rastgele kaynaklı orta sandık", "Large crate of a random resource": "Rastgele kaynaklı büyük sandık", "Production boost (random resource)": "Üretim bonusu (rastgele kaynak)", "Epic": "Destansı", "Legendary": "Efsanevi", "Collect": "Topla", "Open another": "Bir tane daha aç", "Open all": "Hepsini aç", "Order refused by the server.": "Emir sunucu tarafından reddedildi.", "Local time (offline demo)": "Yerel saat (çevrimdışı demo)", "offline": "çevrimdışı", "Server time": "Sunucu saati", "latency": "gecikme", "Build a {b}": "İnşa et: {b}", "Build the {b}": "İnşa et: {b}", "Upgrade the {b} to level {l}": "{b} binasını {l}. seviyeye yükselt", "Have {n} {u}": "{n} {u} sahibi ol", "Win a battle against a Raider Camp": "Bir yağmacı kampına karşı savaş kazan", "Research any technology": "Herhangi bir teknolojiyi araştır", "Have {n} fields": "{n} tarlaya sahip ol", "Have an army of {n} troops": "{n} askerlik bir ordu kur", "Win {n} battles": "{n} savaş kazan", "Reach {n} research levels in total": "Toplam {n} araştırma seviyesine ulaş", "Titan level {l}": "Titan seviye {l}", "Equip a part on your Titan": "Titanına bir parça tak", "Reach {n} power": "{n} güce ulaş", "Tutorial": "Eğitim", "Construction": "İnşaat", "Quest complete: {q}": "Görev tamamlandı: {q}", "Complete quests to win resources, speed-ups and chests.": "Kaynak, hızlandırıcı ve sandık kazanmak için görevleri tamamla.", "All quests of this category are complete!": "Bu kategorideki tüm görevler tamamlandı!", "Reward:": "Ödül:", "Go": "Git", "Free ticket of the day collected!": "Günün ücretsiz bileti alındı!", "Fortune ticket": "Çark bileti", "Fortune medal": "Çark madalyonu", "One spin of the ticket wheel.": "Bilet çarkında bir çevirme.", "One spin of the medal wheel, with the best prizes.": "En iyi ödüllerle madalyon çarkında bir çevirme.", "Wheel of fortune": "Şans çarkı", "Spin the wheel to win troops, speed-ups, resources and chests.": "Asker, hızlandırıcı, kaynak ve sandık kazanmak için çarkı çevir.", "Ticket wheel": "Bilet çarkı", "Medal wheel": "Madalyon çarkı", "Spin": "Çevir", "Collect the free ticket of the day": "Günün ücretsiz biletini al", "Next free ticket in {t}": "Sonraki ücretsiz bilet {t} sonra", "Medals are won in the hardest camps, in big quests and in chests.": "Madalyonlar en zor kamplarda, büyük görevlerde ve sandıklarda kazanılır.", "already_claimed": "Bugün zaten alındı.", "Wheel": "Çark"}, "ru": {"You": "Вы", "No alliance": "Нет альянса", "Alliance": "Альянс", "Commander level": "Уровень командира", "Commander": "Командир", "{h} h {m}": "{h} ч {m}", "{h} h": "{h} ч", "{n} min": "{n} мин", "{s}s": "{s}с", "{m}m {s}s": "{m}м {s}с", "{h}h {m}m": "{h}ч {m}м", "server processing": "обработка на сервере", "Too many tries. Wait a few minutes.": "Слишком много попыток. Подождите несколько минут.", "COMMANDER": "КОМАНДИР", "POWER": "МОЩЬ", "Progress to next level": "Прогресс до следующего уровня", "Menu": "Меню", "Titan": "Титан", "Fields": "Поля", "Map": "Карта", "Base": "База", "Shop": "Магазин", "Quests": "Задания", "Messages": "Сообщения", "Reports": "Отчёты", "Inventory": "Инвентарь", "Defense": "Оборона", "Troops": "Войска", "Research": "Исследования", "Settings": "Настройки", "MAP": "КАРТА", "FIELDS": "ПОЛЯ", "BASE": "БАЗА", "EMPIRE": "ИМПЕРИЯ", "ALLIANCE": "АЛЬЯНС", "TITAN": "ТИТАН", "Build the Titan Hangar": "Постройте ангар Титана", "Hangar level {l} · Ready": "Ангар ур. {l} · Готов", "Coming in a future update": "Появится в будущем обновлении", "Enter base": "Войти на базу", "max": "макс.", "Lv": "Ур.", "metal": "металл", "wood": "дерево", "stone": "камень", "fuel": "топливо", "rations": "пайки", "gold": "золото", "Command Center": "Командный центр", "Heart of your base. Its level sets the maximum level of every other building.": "Сердце вашей базы. Его уровень определяет максимальный уровень всех остальных зданий.", "Defense Wall": "Оборонительная стена", "Protects your base and gives a defense bonus to your troops.": "Защищает вашу базу и даёт войскам бонус к обороне.", "Barracks": "Казарма", "Trains infantry units.": "Обучает пехоту.", "Garrison": "Гарнизон", "Houses and trains defensive troops. You can build several.": "Размещает и обучает оборонительные войска. Можно построить несколько.", "Housing Block": "Жилой блок", "Raises population, which supplies workers and recruits. You can build several.": "Увеличивает население, которое даёт рабочих и новобранцев. Можно построить несколько.", "Warehouse": "Склад", "Increases how many resources you can store.": "Увеличивает объём хранимых ресурсов.", "Research Lab": "Лаборатория", "Unlocks technologies that improve your whole base.": "Открывает технологии, улучшающие всю базу.", "Vehicle Factory": "Завод техники", "Builds armored vehicles.": "Производит бронетехнику.", "Rally Point": "Пункт сбора", "Organizes marches. Sets how many troops can leave the base at once.": "Организует походы. Определяет, сколько войск может одновременно покинуть базу.", "Radar Station": "Радарная станция", "Detects incoming attacks.": "Обнаруживает входящие атаки.", "Titan Hangar": "Ангар Титана", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Укрывает и чинит вашего Титана — гигантского боевого робота, который ведёт атаки и защищает базу. Его уровень определяет максимальный уровень Титана.", "Metal Mine": "Металлический рудник", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Добывает металлическую руду. Каждый уровень даёт больше металла в час.", "Sawmill": "Лесопилка", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Валит лес вокруг базы. Каждый уровень даёт больше дерева в час.", "Stone Quarry": "Каменоломня", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Добывает и режет каменные блоки. Каждый уровень даёт больше камня в час.", "Fuel Pump": "Топливный насос", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Качает нефть и перерабатывает её в топливо. Каждый уровень даёт больше топлива в час.", "Mess Hall": "Столовая", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Готовит и хранит пайки для войск. Каждый уровень даёт больше пайков в час.", "Helipad": "Вертолётная площадка", "Trains and maintains your air units: attack helicopters and gunships.": "Обучает и обслуживает авиацию: ударные вертолёты и ганшипы.", "Max building level: {l}": "Макс. уровень зданий: {l}", "Defense bonus +{p}%": "Бонус обороны +{p}%", "Infantry training speed +{p}%": "Скорость обучения пехоты +{p}%", "Defensive troop capacity +{n}": "Вместимость оборонительных войск +{n}", "Population +{n}": "Население +{n}", "Storage +{n} per resource": "Хранилище +{n} на ресурс", "Research speed +{p}%": "Скорость исследований +{p}%", "Vehicle production speed +{p}%": "Скорость производства техники +{p}%", "Max troops per march: {n}": "Макс. войск в походе: {n}", "Titan maximum level: {n}": "Макс. уровень Титана: {n}", "Air unit training speed +{p}%": "Скорость обучения авиации +{p}%", "Detects attacks and enemy troop count": "Обнаруживает атаки и численность врага", "Produces {i} {n} {r} per hour": "Производит {i} {n} ({r}) в час", "Recruit": "Новобранец", "Cheap basic infantry. Weak alone, useful in large numbers.": "Дешёвая базовая пехота. Слаба в одиночку, полезна в большом количестве.", "Rifleman": "Стрелок", "Solid defensive infantry protected by a heavy riot shield.": "Надёжная оборонительная пехота с тяжёлым щитом.", "Sniper": "Снайпер", "Long-range marksman who strikes before the enemy can reach him.": "Дальнобойный стрелок, бьющий раньше, чем враг до него доберётся.", "Assault Trooper": "Штурмовик", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Тяжёлый боец в экзоскелете с роторным пулемётом. Смертоносен в атаке.", "Supply Truck": "Грузовик снабжения", "Carries large amounts of loot back to your base.": "Доставляет на базу много добычи.", "Scout Drone": "Дрон-разведчик", "Very fast scout. Spies on enemy bases and camps.": "Очень быстрый разведчик. Шпионит за вражескими базами и лагерями.", "Armored Carrier": "Бронетранспортёр", "Heavily armored transport with a huge carrying capacity.": "Сильно бронированный транспорт с огромной грузоподъёмностью.", "Battle Tank": "Боевой танк", "Massive armored tank. Extremely tough and powerful.": "Массивный бронированный танк. Крайне прочный и мощный.", "Rocket Artillery": "Реактивная артиллерия", "Rocket launcher truck that devastates enemies from very long range.": "Ракетная установка, уничтожающая врагов с очень большой дистанции.", "Attack Helicopter": "Ударный вертолёт", "Fast air unit that strikes with rockets and a nose cannon.": "Быстрая авиация с ракетами и носовой пушкой.", "Gunship": "Ганшип", "Heavy tiltrotor gunship with huge firepower and armor.": "Тяжёлый конвертоплан с огромной огневой мощью и бронёй.", "Build a {b} first": "Сначала постройте: {b}", "Requires {b} level {l}": "Требуется: {b}, ур. {l}", "Choose how many to train": "Выберите количество", "Training queue full (5 orders max)": "Очередь обучения заполнена (макс. 5 приказов)", "Not enough population: build or upgrade Housing Blocks": "Мало населения: стройте или улучшайте жилые блоки", "Not enough resources": "Недостаточно ресурсов", "Training {n} {u}": "Обучение: {n} {u}", "{n} {u} ready": "{n} {u} готовы", "No rations left: your troops are deserting!": "Пайки закончились: войска дезертируют!", "The construction queue is busy": "Очередь строительства занята", "Maximum level reached": "Достигнут максимальный уровень", "{b} started": "Начато: {b}", "{b} level {l} complete": "{b}, ур. {l} — готово", "Construction cancelled (50% refunded)": "Строительство отменено (возврат 50%)", "Power": "Мощь", "power": "мощи", "Train": "Обучить", "owned {n}": "есть {n}", "Max": "Макс.", "each:": "за ед.:", "Train troops": "Обучить войска", "Population {a} / {b} · Training speed +{p}%": "Население {a} / {b} · Скорость обучения +{p}%", "Waiting": "Ожидание", "Finish (test)": "Завершить (тест)", "Your Army": "Ваша армия", "{n} troops": "{n} войск", "Population": "Население", "Upkeep": "Содержание", "Net": "Итого", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Войска съедают больше пайков, чем вы производите. Стройте или улучшайте столовые на полях, иначе войска дезертируют, когда пайки закончатся.", "Infantry · Barracks": "Пехота · Казарма", "Vehicles · Vehicle Factory": "Техника · Завод техники", "Air · Helipad": "Авиация · Вертолётная площадка", "training": "в обучении", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Нажмите на казарму, завод техники или вертолётную площадку, чтобы обучить больше войск.", "Upgrading to level {l}": "Улучшение до ур. {l}", "Building to level {l}": "Строительство ур. {l}", "Time left: {t}": "Осталось: {t}", "Finish now (test)": "Завершить сейчас (тест)", "Cancel": "Отмена", "Level {l} / {m}": "Уровень {l} / {m}", "Current:": "Сейчас:", "Your Titan": "Ваш Титан", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Ваш Титан готов и охраняет ангар. Уровни, части брони и атаки появятся вместе с картой мира.", "Upgrade to level {l}": "Улучшить до ур. {l}", "Next:": "Далее:", "Upgrade": "Улучшить", "Not built": "Не построено", "Build": "Построить", "Empty field": "Пустое поле", "Choose what to produce on this field.": "Выберите, что производить на этом поле.", "Empty plot": "Пустой участок", "Choose a building to construct here.": "Выберите здание для строительства.", "Every unique building is already built.": "Все уникальные здания уже построены.", "Language": "Язык", "Test tools": "Инструменты тестирования", "Erase your save and restart from zero. This option will be removed in the final game.": "Стирает сохранение и начинает игру заново. Эта опция будет удалена в финальной версии.", "Reset save": "Сбросить сохранение", "Reset your base?": "Сбросить базу?", "Forest": "Лес", "Rocky Hills": "Скалистые холмы", "Metal Deposit": "Месторождение металла", "Oil Field": "Нефтяное поле", "Farmland": "Сельхозугодья", "Plains": "Равнина", "Raider Camp": "Лагерь мародёров", "Your base": "Ваша база", "Empty land. Nothing to collect here.": "Пустая земля. Здесь нечего брать.", "Level {l}": "Уровень {l}", "Distance: {d} tiles": "Расстояние: {d} клеток", "Enemy forces": "Силы противника", "Possible loot": "Возможная добыча", "Attack": "Атаковать", "GO": "ВПЕРЁД", "Back to my base": "К моей базе", "Send troops": "Отправить войска", "Available: {n}": "Доступно: {n}", "Troops: {a} / {b}": "Войска: {a} / {b}", "Travel time: {t}": "Время в пути: {t}", "Carry capacity: {n}": "Грузоподъёмность: {n}", "Launch attack": "Начать атаку", "Too many troops for one march (max {n})": "Слишком много войск для одного похода (макс. {n})", "All marches are busy ({n} max)": "Все походы заняты (макс. {n})", "Choose your troops": "Выберите войска", "You have no troops. Train some at the Barracks.": "У вас нет войск. Обучите их в казарме.", "Troops sent to {p}": "Войска отправлены: {p}", "Victory": "Победа", "Defeat": "Поражение", "Victory at {p}": "Победа: {p}", "Defeat at {p}": "Поражение: {p}", "Troops returned with loot": "Войска вернулись с добычей", "No reports yet.": "Отчётов пока нет.", "Your troops": "Ваши войска", "Enemy": "Противник", "Sent": "Отправлено", "Lost": "Потери", "Killed": "Убито", "Loot": "Добыча", "Marching": "В пути", "Returning": "Возвращение", "Marches: {a} / {b}": "Походы: {a} / {b}", "{t} ago": "{t} назад", "Raiders": "Мародёры", "All enemy troops were destroyed.": "Все войска противника уничтожены.", "Your troops had to retreat.": "Вашим войскам пришлось отступить.", "Armor Plate": "Бронеплита", "Arm Cannon": "Ручная пушка", "Jet Reactor": "Реактивный двигатель", "Armored Legs": "Бронированные ноги", "Standard": "Стандарт", "Advanced": "Улучшенный", "Elite": "Элитный", "Prototype": "Прототип", "Titan reached level {l}!": "Титан достиг уровня {l}!", "On a mission": "На задании", "Too damaged to fight (30% needed)": "Слишком повреждён для боя (нужно 30%)", "Ready for battle": "Готов к бою", "Upgrade the Titan Hangar to raise the maximum level.": "Улучшите ангар Титана, чтобы поднять максимальный уровень.", "troop attack": "к атаке войск", "Equipment": "Снаряжение", "Empty": "Пусто", "Remove": "Снять", "Parts inventory": "Запас деталей", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Побеждайте лагеря мародёров, чтобы получать детали. Лагеря высокого уровня дают детали получше.", "Equip": "Надеть", "Scrap for gold": "Разобрать на золото", "Manage Titan": "Управлять Титаном", "Send the Titan": "Отправить Титана", "Titan unavailable": "Титан недоступен", "Titan: {a} XP, health {b}%": "Титан: {a} опыта, прочность {b}%", "New part won: {p}": "Получена новая деталь: {p}", "Lv {l} · Health {h}%": "Ур. {l} · Прочность {h}%", "Extraction": "Добыча", "Forestry": "Лесозаготовка", "Refining": "Переработка нефти", "Military Rations": "Армейский паёк", "Engineering": "Инженерия", "Intensive Training": "Интенсивная подготовка", "Ballistics": "Баллистика", "Armor Plating": "Бронирование", "Field Medicine": "Полевая медицина", "Engines": "Двигатели", "Logistics": "Логистика", "Robotics": "Робототехника", "Metal and stone production +{p}%": "Добыча металла и камня +{p}%", "Wood production +{p}%": "Добыча древесины +{p}%", "Fuel production +{p}%": "Производство топлива +{p}%", "Rations production +{p}% · troop upkeep -{q}%": "Производство пайков +{p}% · расход войск -{q}%", "Construction speed +{p}%": "Скорость строительства +{p}%", "Troop training speed +{p}%": "Скорость обучения войск +{p}%", "Troop attack +{p}%": "Атака войск +{p}%", "Troop defense +{p}%": "Защита войск +{p}%", "Troop health +{p}%": "Здоровье войск +{p}%", "March speed +{p}%": "Скорость марша +{p}%", "Carry capacity +{p}%": "Грузоподъёмность +{p}%", "Titan attack, defense and health +{p}%": "Атака, защита и прочность Титана +{p}%", "Economy": "Экономика", "Military": "Военное дело", "Logistics & Titan": "Логистика и Титан", "Requires research: {r}": "Нужно исследование: {r}", "{t} level {l}": "{t} уровень {l}", "{b} level {l}": "{b} уровень {l}", "A research is already in progress": "Исследование уже идёт", "Research started: {t}": "Исследование начато: {t}", "{t} level {l} researched": "{t}: уровень {l} изучен", "Research cancelled (50% refunded)": "Исследование отменено (возврат 50%)", "Unlocks:": "Открывает:", "A technology cannot go above the level of the Research Lab.": "Технология не может быть выше уровня Лаборатории.", "Build a Research Lab on an empty plot of your base to unlock technologies.": "Постройте Лабораторию на свободном месте базы, чтобы открыть технологии.", "In progress:": "В процессе:", "Not researched yet": "Ещё не изучено", "Research in progress": "Идёт исследование", "No research in progress": "Нет активных исследований", "Open research": "Открыть исследования", "Not enough room in your Garrisons": "Недостаточно места в гарнизонах", "{n} {u} placed in defense": "{n} {u} в обороне", "{n} {u} withdrawn from defense": "{n} {u} выведены из обороны", "Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.": "Войска в обороне остаются на базе и сражаются, когда вас атакует другой игрок. Их нельзя отправить в поход.", "Garrison places: {a} / {b}": "Места в гарнизоне: {a} / {b}", "Wall: defense bonus +{p}%": "Стена: бонус защиты +{p}%", "Build a Garrison to place troops in defense. Each Garrison level gives 200 places.": "Постройте Гарнизон, чтобы ставить войска в оборону. Каждый уровень Гарнизона даёт 200 мест.", "In defense: {n}": "В обороне: {n}", "in defense": "в обороне", "Defend": "Оборонять", "Withdraw": "Вывести", "All in defense": "Все в оборону", "Withdraw all": "Вывести всех", "Manage defense": "Управлять обороной", "Small gold pouch": "Малый мешочек золота", "Medium gold pouch": "Средний мешочек золота", "Large gold pouch": "Большой мешочек золота", "Small crate of {r}": "Малый ящик: {r}", "Medium crate of {r}": "Средний ящик: {r}", "Large crate of {r}": "Большой ящик: {r}", "Speed-up {t}": "Ускорение {t}", "Titan repair kit (+{p}%)": "Ремкомплект Титана (+{p}%)", "Supply drop": "Сброс припасов", "Gives {n} {r}.": "Даёт {n}: {r}.", "Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.": "Сокращает время строительства, исследования или обучения на {t}. Используйте из полосы прогресса.", "Repairs your Titan by {p}%.": "Чинит Титана на {p}%.", "Opens to give 3 random items.": "Содержит 3 случайных предмета.", "Use speed-ups from the progress bar of a construction, a research or a training.": "Используйте ускорения из полосы прогресса строительства, исследования или обучения.", "Your Titan is already fully repaired": "Ваш Титан уже полностью отремонтирован", "Titan repaired: {h}%": "Титан отремонтирован: {h}%", "Resources": "Ресурсы", "Speed-ups": "Ускорения", "Other": "Прочее", "Win items by defeating Raider Camps and taking resource fields on the map.": "Получайте предметы, побеждая лагеря мародёров и захватывая ресурсные поля на карте.", "Your inventory is empty.": "Ваш инвентарь пуст.", "Open": "Открыть", "Use": "Использовать", "Use all": "Использовать все", "Speed up": "Ускорить", "Nothing to speed up": "Нечего ускорять", "You have no speed-ups. Defeat Raider Camps to win some.": "У вас нет ускорений. Побеждайте лагеря мародёров, чтобы их получить.", "Items won: {i}": "Получены предметы: {i}", "Items won": "Полученные предметы", "Bonus rewards (chance)": "Бонусные награды (шанс)", "Bonus item": "Бонусный предмет", "Second item": "2-й предмет", "Titan part (with the Titan)": "Деталь Титана (с Титаном)", "Use it from the progress bar at the bottom of the screen.": "Используйте из полосы прогресса внизу экрана.", "{n} d": "{n} д", "{r} production boost": "Бонус добычи: {r}", "Combat stimulant": "Боевой стимулятор", "Shield generator": "Генератор щита", "Forced march": "Форсированный марш", "Lightning march": "Молниеносный марш", "Drill manual": "Строевой устав", "{r} production +{p}% for 24 hours.": "Добыча ({r}) +{p}% на 24 часа.", "Troop attack +{p}% for 24 hours.": "Атака войск +{p}% на 24 часа.", "Troop defense +{p}% for 24 hours.": "Защита войск +{p}% на 24 часа.", "Shortens the remaining time of one march by {p}%. Use it from the progress bar.": "Сокращает оставшееся время марша на {p}%. Используйте из полосы прогресса.", "Shortens the remaining time of one training order by {p}%. Use it from the progress bar.": "Сокращает оставшееся время обучения на {p}%. Используйте из полосы прогресса.", "{i} active: {t}": "{i} активен: {t}", "Common": "Обычный", "Uncommon": "Необычный", "Rare": "Редкий", "Very rare": "Очень редкий", "Boosts": "Бонусы", "Marches": "Марши", "Training": "Обучение", "Active boosts": "Активные бонусы", "Storage: {n} per resource": "Склад: {n} на ресурс", "{d}d {h}h": "{d}д {h}ч", "Training speed of all troops +{p}%": "Скорость обучения всех войск +{p}%", "Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.": "Каждый уровень Гарнизона ускоряет всё обучение на 3%. Исследование «Интенсивная подготовка» добавляет ещё.", "Your session has expired, please log in again.": "Сессия истекла, войдите снова.", "The name must have 3 to 16 letters, numbers, spaces, - or _.": "Имя должно содержать от 3 до 16 букв, цифр, пробелов, - или _.", "The password must have at least 6 characters.": "Пароль должен содержать не менее 6 символов.", "This name is already taken.": "Это имя уже занято.", "Wrong name or password.": "Неверное имя или пароль.", "Too many tries. Wait one minute.": "Слишком много попыток. Подождите минуту.", "Server error. Try again later.": "Ошибка сервера. Попробуйте позже.", "Military strategy · near future": "Военная стратегия · ближайшее будущее", "Log in": "Войти", "Create an account": "Создать аккаунт", "Commander name": "Имя командира", "Password": "Пароль", "Repeat the password": "Повторите пароль", "The two passwords are different.": "Пароли не совпадают.", "Cannot reach the server.": "Сервер недоступен.", "Bring the game saved on this device into your new account?": "Перенести игру с этого устройства в новый аккаунт?", "Welcome, commander {n}!": "Добро пожаловать, командир {n}!", "Base of {n}": "База {n}", "Commander level {l}": "Командир уровня {l}", "Attacks between players arrive in the next update.": "Атаки между игроками появятся в следующем обновлении.", "Account": "Аккаунт", "Logged in as {n}": "Вы вошли как {n}", "Log out": "Выйти", "General": "Общее", "Production": "Производство", "Combat": "Бой", "No item in this category.": "В этой категории нет предметов.", "Done": "Готово", "Action refused by the server.": "Сервер отклонил действие.", "Administration": "Администрирование", "Reserved for administrators.": "Только для администраторов.", "Administrator account": "Аккаунт администратора", "Test account": "Тестовый аккаунт", "Normal player": "Обычный игрок", "all": "всё", "Give": "Выдать", "Items": "Предметы", "10 of every item": "По 10 каждого предмета", "Time": "Время", "Finish everything now": "Завершить всё сейчас", "Base and research": "База и исследования", "All buildings to this level": "Все здания на этот уровень", "All research to this level": "Все исследования на этот уровень", "Set level and repair": "Установить уровень и починить", "Test accounts": "Тестовые аккаунты", "Create": "Создать", "Show all accounts": "Показать все аккаунты", "Account created: {n}": "Аккаунт создан: {n}", "Supply chest": "Ящик снабжения", "Military cache": "Военный тайник", "Elite arsenal": "Элитный арсенал", "Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.": "Откройте и получите случайную награду: войска, ускорения, ресурсы, бонусы или детали Титана.", "Chests": "Сундуки", "See the chances": "Посмотреть шансы", "Titan part": "Деталь Титана", "Small crate of a random resource": "Малый ящик случайного ресурса", "Medium crate of a random resource": "Средний ящик случайного ресурса", "Large crate of a random resource": "Большой ящик случайного ресурса", "Production boost (random resource)": "Бонус добычи (случайный ресурс)", "Epic": "Эпический", "Legendary": "Легендарный", "Collect": "Забрать", "Open another": "Открыть ещё", "Open all": "Открыть все", "Order refused by the server.": "Сервер отклонил приказ.", "Local time (offline demo)": "Местное время (офлайн-демо)", "offline": "офлайн", "Server time": "Время сервера", "latency": "задержка", "Build a {b}": "Постройте: {b}", "Build the {b}": "Постройте: {b}", "Upgrade the {b} to level {l}": "Улучшите {b} до уровня {l}", "Have {n} {u}": "Имейте {n}: {u}", "Win a battle against a Raider Camp": "Победите лагерь мародёров", "Research any technology": "Изучите любую технологию", "Have {n} fields": "Имейте {n} полей", "Have an army of {n} troops": "Имейте армию из {n} войск", "Win {n} battles": "Выиграйте {n} сражений", "Reach {n} research levels in total": "Достигните {n} уровней исследований в сумме", "Titan level {l}": "Титан уровня {l}", "Equip a part on your Titan": "Установите деталь на Титана", "Reach {n} power": "Достигните мощи {n}", "Tutorial": "Обучение", "Construction": "Строительство", "Quest complete: {q}": "Задание выполнено: {q}", "Complete quests to win resources, speed-ups and chests.": "Выполняйте задания, чтобы получать ресурсы, ускорения и сундуки.", "All quests of this category are complete!": "Все задания этой категории выполнены!", "Reward:": "Награда:", "Go": "Перейти", "Free ticket of the day collected!": "Бесплатный билет дня получен!", "Fortune ticket": "Билет колеса", "Fortune medal": "Медальон колеса", "One spin of the ticket wheel.": "Одно вращение колеса билетов.", "One spin of the medal wheel, with the best prizes.": "Одно вращение колеса медальонов с лучшими призами.", "Wheel of fortune": "Колесо фортуны", "Spin the wheel to win troops, speed-ups, resources and chests.": "Крутите колесо и выигрывайте войска, ускорения, ресурсы и сундуки.", "Ticket wheel": "Колесо билетов", "Medal wheel": "Колесо медальонов", "Spin": "Крутить", "Collect the free ticket of the day": "Забрать бесплатный билет дня", "Next free ticket in {t}": "Следующий бесплатный билет через {t}", "Medals are won in the hardest camps, in big quests and in chests.": "Медальоны выпадают в самых сложных лагерях, больших заданиях и сундуках.", "already_claimed": "Уже получено сегодня.", "Wheel": "Колесо"}};
let LANG=(()=>{ let l=null; try{ l=localStorage.getItem('bastion_lang'); }catch(e){}
  if(!l){ const n=(navigator.language||'en').slice(0,2).toLowerCase(); l=LANGS.some(x=>x[0]===n)?n:'en'; } return l; })();
// translate a text, then fill {placeholders}
function _t(k,v){ let s=(LANG!=='en' && I18N[LANG] && I18N[LANG][k]) || k; if(v) for(const x in v) s=s.split('{'+x+'}').join(v[x]); return s; }
function applyStatic(){
  document.documentElement.lang=LANG;
  document.querySelectorAll('[data-i18n]').forEach(e=>{ e.textContent=_t(e.dataset.i18n); });
  document.querySelectorAll('[data-i18n-title]').forEach(e=>{ e.title=_t(e.dataset.i18nTitle); });
}
function setLang(l){ LANG=l; try{ localStorage.setItem('bastion_lang',l); }catch(e){}
  fieldCache=null; if(view==='fields') buildWorld(); applyStatic(); renderAll(); }
// ===== DATA =====
let W = 2576, H = 1438; const MAX = 10;
// Background painted image (Gemini). Set to '' to go back to the code-drawn scene.
const BG = 'assets/img/bg.jpg';
// The wall is painted into the base background: one version per wall stage (levels 1-3, 4-6, 7-9, 10).
// A stage without its own picture uses the closest lower one, then the current background.
const BG_WALL = {1:'assets/img/bg_wall1.jpg', 2:'assets/img/bg.jpg', 3:'assets/img/bg_wall3.jpg', 4:'assets/img/bg_wall4.jpg'};   // bg_wall0.jpg = the base without any wall
const wallStage = () => { const L=(state.slots.wall||{}).lvl||1; return L<=3?1: L<=6?2: L<=9?3:4; };
function bgNow(){ for(let k=wallStage();k>=1;k--) if(BG_WALL[k]) return BG_WALL[k]; return BG; }
const RES = ['metal','wood','stone','fuel','rations','gold'];
// Painted icons (Gemini art)
const ICS = {"metal": "assets/img/metal.webp", "wood": "assets/img/wood.webp", "stone": "assets/img/stone.webp", "fuel": "assets/img/fuel.webp", "rations": "assets/img/rations.webp", "gold": "assets/img/gold.webp", "pop": "assets/img/pop.webp", "power": "assets/img/power.webp", "fields": "assets/img/fields.webp", "map": "assets/img/map.webp", "base": "assets/img/base.webp", "shop": "assets/img/shop.webp", "quests": "assets/img/quests.webp", "reports": "assets/img/reports.webp", "defense": "assets/img/defense.webp", "troops": "assets/img/troops.webp", "research": "assets/img/research.webp", "messages": "assets/img/messages.webp", "inventory": "assets/img/inventory.webp", "settings": "assets/img/settings.webp"};
for(const k of ['atk','def','hp','spd','rng','load','time','lock','build','win','lose','drop','repair','back','warn','ok','star','crown','close','menu']) ICS[k]=`assets/img/ui_${k}.webp`;
ICS.titan_ic='assets/img/titan_1.webp'; ICS.wheel='assets/img/item_wheel.webp';
const IC = {}; for(const k in ICS) IC[k]=`<img class="ic" src="${ICS[k]}" alt="">`;
const ICON = {metal:IC.metal,wood:IC.wood,stone:IC.stone,fuel:IC.fuel,rations:IC.rations,gold:IC.gold};
const BASE_RATE = {metal:300,wood:300,stone:300,fuel:150,rations:200,gold:0}; // per hour, produced by the base itself
// Production of one field at level l (per hour)
const PROD_MUL = {fuel:90, rations:220}; // other resources: 150 per level
// accelerating growth: each level multiplies by a bigger factor than the previous one (r0, r0+step, r0+2·step...)
const growth = (l, r0, step) => { let m=1; for(let i=2;i<=l;i++) m*=r0+step*(i-2); return m; };
const prodAt = (t,l) => Math.round((PROD_MUL[B[t].res]||150)*l*Math.pow(1.3,l-1));
// ===== POWER (like Might in Dragons of Atlantis) =====
// Every building level adds power. Troops and research will add power later.
const POWER = {command:120, wall:60, hangar:150, barracks:40, garrison:30, housing:15, warehouse:20, lab:50, factory:60, rally:25, radar:35, mine:12, sawmill:12, quarry:12, pump:12, mess:12, helipad:45};
const bPower = (t,l) => Math.round((POWER[t]||10)*l*(l+1)/2);
function totalPower(){ let p=troopPower()+titanPower()+techPower(); for(const k in state.slots){ const b=state.slots[k]; p+=bPower(b.type,b.lvl); } return p; }
const levelReq = l => Math.round(400*Math.pow(l-1,2.1)); // power needed to reach commander level l (a new base starts at level 1)
function playerLevel(p){ let l=1; while(levelReq(l+1)<=p) l++; return l; }
function rates(){ const r={...BASE_RATE}; for(const k in state.slots){ const b=state.slots[k], d=B[b.type]; if(d && d.field) r[d.res]+=prodAt(b.type,b.lvl); }
  const tb={metal:techB('extraction'), stone:techB('extraction'), wood:techB('forestry'), fuel:techB('refining'), rations:techB('rationing')};
  for(const k in tb) r[k]=Math.round(r[k]*(1+tb[k]+(boostOn('prod_'+k)?0.25:0)));
  r.gold+=goldIncome(); r.rations-=upkeep(); return r; }

// Later, each building gets "img": "images/xxx.png" (AI art) to replace the drawn version.
const B = {
  command:  {name:'Command Center', icon:IC.build, color:'#5d6d7c', fixed:true, cost:{metal:400,wood:400,stone:400,fuel:100}, time:20,
             desc:'Heart of your base. Its level sets the maximum level of every other building.'},
  wall:     {name:'Defense Wall', icon:IC.def, color:'#555a5f', fixed:true, cost:{metal:300,wood:100,stone:500,fuel:0}, time:15,
             desc:'Protects your base and gives a defense bonus to your troops.'},
  barracks: {name:'Barracks', icon:IC.troops, color:'#6b7442', unique:true, cost:{metal:250,wood:250,stone:150,fuel:50}, time:12,
             desc:'Trains infantry units.'},
  garrison: {name:'Garrison', icon:IC.def, color:'#4f6a5a', cost:{metal:200,wood:200,stone:200,fuel:0}, time:10,
             desc:'Houses and trains defensive troops. You can build several.'},
  housing:  {name:'Housing Block', icon:IC.base, color:'#7d6a52', cost:{metal:100,wood:250,stone:150,fuel:0}, time:8,
             desc:'Raises population, which supplies workers and recruits. You can build several.'},
  warehouse:{name:'Warehouse', icon:IC.load, color:'#7a5a3c', unique:true, cost:{metal:150,wood:300,stone:200,fuel:0}, time:10,
             desc:'Increases how many resources you can store.'},
  lab:      {name:'Research Lab', icon:IC.research, color:'#4c6488', unique:true, req:2, cost:{metal:400,wood:200,stone:300,fuel:150}, time:18,
             desc:'Unlocks technologies that improve your whole base.'},
  factory:  {name:'Vehicle Factory', icon:IC.build, color:'#6c5f72', unique:true, req:3, cost:{metal:600,wood:200,stone:300,fuel:250}, time:25,
             desc:'Builds armored vehicles.'},
  rally:    {name:'Rally Point', icon:IC.troops, color:'#8a4b3c', unique:true, cost:{metal:150,wood:150,stone:100,fuel:50}, time:8,
             desc:'Organizes marches. Sets how many troops can leave the base at once.'},
  radar:    {name:'Radar Station', icon:IC.def, color:'#4d7a80', unique:true, req:2, cost:{metal:350,wood:100,stone:200,fuel:150}, time:15,
             desc:'Detects incoming attacks.'},
  hangar:   {name:'Titan Hangar', icon:IC.titan_ic, color:'#5a6470', fixed:true, req:2, cost:{metal:800,wood:300,stone:600,fuel:300}, time:30,
             desc:'Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.'},
  // ---- Fields (resource production) ----
  mine:     {name:'Metal Mine', icon:IC.metal, color:'#6d6a66', field:true, res:'metal', cost:{metal:50,wood:150,stone:100,fuel:0}, time:6,
             desc:'Extracts metal ore from the ground. Each level produces more metal per hour.'},
  sawmill:  {name:'Sawmill', icon:IC.wood, color:'#7a5a36', field:true, res:'wood', cost:{metal:100,wood:50,stone:120,fuel:0}, time:6,
             desc:'Cuts timber from the surrounding forest. Each level produces more wood per hour.'},
  quarry:   {name:'Stone Quarry', icon:IC.stone, color:'#8d8a80', field:true, res:'stone', cost:{metal:120,wood:120,stone:30,fuel:0}, time:6,
             desc:'Digs and cuts stone blocks. Each level produces more stone per hour.'},
  pump:     {name:'Fuel Pump', icon:IC.fuel, color:'#5b5f52', field:true, res:'fuel', cost:{metal:200,wood:100,stone:100,fuel:0}, time:8,
             desc:'Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.'},
  mess:     {name:'Mess Hall', icon:IC.rations, color:'#7d6a4a', field:true, res:'rations', cost:{metal:80,wood:150,stone:80,fuel:0}, time:6,
             desc:'Cooks and stores rations to feed your troops. Each level produces more rations per hour.'},
  helipad:  {name:'Helipad', icon:IC.troops, color:'#55606a', unique:true, req:3, cost:{metal:700,wood:200,stone:500,fuel:400}, time:28,
             desc:'Trains and maintains your air units: attack helicopters and gunships.'}
};
// Building images (Gemini art, background removed)
const IMGS={"barracks": {"img": "assets/img/barracks.webp", "imgR": 0.6534, "imgAY": 0.6028, "imgW": 175}, "command": {"img": "assets/img/command.webp", "imgR": 0.8289, "imgAY": 0.6688, "imgW": 262}, "housing": {"img": "assets/img/housing.webp", "imgR": 0.8006, "imgAY": 0.6542, "imgW": 175}, "warehouse": {"img": "assets/img/warehouse.webp", "imgR": 0.7133, "imgAY": 0.6151, "imgW": 175}, "factory": {"img": "assets/img/factory.webp", "imgR": 0.763, "imgAY": 0.6412, "imgW": 175}, "rally": {"img": "assets/img/rally.webp", "imgR": 0.7061, "imgAY": 0.6109, "imgW": 175}, "radar": {"img": "assets/img/radar.webp", "imgR": 0.9741, "imgAY": 0.717, "imgW": 175}, "garrison": {"img": "assets/img/garrison.webp", "imgR": 0.7484, "imgAY": 0.6332, "imgW": 175}, "lab": {"img": "assets/img/lab.webp", "imgR": 0.701, "imgAY": 0.6079, "imgW": 175}, "mine": {"img": "assets/img/mine.webp", "imgR": 0.9699, "imgAY": 0.6691, "imgW": 175}, "sawmill": {"img": "assets/img/sawmill.webp", "imgR": 0.7142, "imgAY": 0.5483, "imgW": 175}, "quarry": {"img": "assets/img/quarry.webp", "imgR": 0.7238, "imgAY": 0.5516, "imgW": 175}, "pump": {"img": "assets/img/pump.webp", "imgR": 0.6975, "imgAY": 0.5397, "imgW": 175}, "hangar": {"img": "assets/img/hangar.webp", "imgR": 0.784, "imgAY": 0.5862, "imgW": 250}, "titan": {"img": "assets/img/titan.webp", "imgR": 0.9423, "imgAY": 0.5306, "imgW": 210}};
for(const t in IMGS) if(B[t]) Object.assign(B[t],IMGS[t]);
// pictures that change with the building level: [from level, picture]
const LVL_IMGS = {command:[[4,{img:'assets/img/command_2.webp', imgW:262, imgR:0.8686, imgAY:0.6834}],[8,{img:'assets/img/command_3.webp', imgW:262, imgR:0.91, imgAY:0.697}]], "barracks": [[4, {"img": "assets/img/barracks_2.webp", "imgW": 175, "imgR": 0.7797, "imgAY": 0.6618}], [8, {"img": "assets/img/barracks_3.webp", "imgW": 175, "imgR": 0.8609, "imgAY": 0.6978}]], "housing": [[4, {"img": "assets/img/housing_2.webp", "imgW": 175, "imgR": 0.8969, "imgAY": 0.689}], [8, {"img": "assets/img/housing_3.webp", "imgW": 175, "imgR": 0.8734, "imgAY": 0.6849}]], "warehouse": [[4, {"img": "assets/img/warehouse_2.webp", "imgW": 175, "imgR": 0.7969, "imgAY": 0.6544}], [8, {"img": "assets/img/warehouse_3.webp", "imgW": 175, "imgR": 0.8906, "imgAY": 0.6912}]], "factory": [[4, {"img": "assets/img/factory_2.webp", "imgW": 175, "imgR": 0.9344, "imgAY": 0.7069}], [8, {"img": "assets/img/factory_3.webp", "imgW": 181, "imgR": 0.8781, "imgAY": 0.6629}]], "rally": [[4, {"img": "assets/img/rally_2.webp", "imgW": 175, "imgR": 0.7516, "imgAY": 0.566}], [8, {"img": "assets/img/rally_3.webp", "imgW": 175, "imgR": 0.8641, "imgAY": 0.6609}]], "radar": [[4, {"img": "assets/img/radar_2.webp", "imgW": 175, "imgR": 1.0509, "imgAY": 0.7363}], [8, {"img": "assets/img/radar_3.webp", "imgW": 175, "imgR": 1.0544, "imgAY": 0.7369}]], "garrison": [[4, {"img": "assets/img/garrison_2.webp", "imgW": 175, "imgR": 0.8, "imgAY": 0.6543}], [8, {"img": "assets/img/garrison_3.webp", "imgW": 175, "imgR": 0.8203, "imgAY": 0.6357}]], "lab": [[4, {"img": "assets/img/lab_2.webp", "imgW": 175, "imgR": 0.8266, "imgAY": 0.6649}], [8, {"img": "assets/img/lab_3.webp", "imgW": 175, "imgR": 0.8594, "imgAY": 0.6877}]], "hangar": [[4, {"img": "assets/img/hangar_2.webp", "imgW": 250, "imgR": 0.8531, "imgAY": 0.6227}], [8, {"img": "assets/img/hangar_3.webp", "imgW": 250, "imgR": 0.9203, "imgAY": 0.6515}]], "helipad": [[4, {"img": "assets/img/helipad_2.webp", "imgW": 175, "imgR": 0.8016, "imgAY": 0.5156}], [8, {"img": "assets/img/helipad_3.webp", "imgW": 175, "imgR": 0.8891, "imgAY": 0.6213}]], "mine": [[4, {"img": "assets/img/mine_2.webp", "imgW": 175, "imgR": 0.9953, "imgAY": 0.6672}], [8, {"img": "assets/img/mine_3.webp", "imgW": 175, "imgR": 1.0407, "imgAY": 0.6788}]], "sawmill": [[4, {"img": "assets/img/sawmill_2.webp", "imgW": 175, "imgR": 0.7984, "imgAY": 0.5946}], [8, {"img": "assets/img/sawmill_3.webp", "imgW": 175, "imgR": 0.8703, "imgAY": 0.6351}]], "quarry": [[4, {"img": "assets/img/quarry_2.webp", "imgW": 175, "imgR": 0.8734, "imgAY": 0.5904}], [8, {"img": "assets/img/quarry_3.webp", "imgW": 175, "imgR": 0.8078, "imgAY": 0.6083}]], "pump": [[4, {"img": "assets/img/pump_2.webp", "imgW": 175, "imgR": 0.7906, "imgAY": 0.6606}], [8, {"img": "assets/img/pump_3.webp", "imgW": 175, "imgR": 0.8609, "imgAY": 0.6279}]], "mess": [[4, {"img": "assets/img/mess_2.webp", "imgW": 175, "imgR": 0.8344, "imgAY": 0.5983}], [8, {"img": "assets/img/mess_3.webp", "imgW": 175, "imgR": 0.8266, "imgAY": 0.5799}]]};
function bImgAt(t,l){ let v=B[t]; for(const [from,o] of (LVL_IMGS[t]||[])) if(l>=from) v=o; return v; }
// ===== Images for troops, Helipad, Mess Hall and the Commander portrait (Gemini art) =====
const UIMG = {"recruit": {"img": "assets/img/recruit.webp", "imgR": 2.247}, "rifleman": {"img": "assets/img/rifleman.webp", "imgR": 1.7725}, "drone": {"img": "assets/img/drone.webp", "imgR": 0.6181}, "sniper": {"img": "assets/img/sniper.webp", "imgR": 0.7602}, "truck": {"img": "assets/img/truck.webp", "imgR": 0.8066}, "apc": {"img": "assets/img/apc.webp", "imgR": 0.8057}, "tank": {"img": "assets/img/tank.webp", "imgR": 0.7266}, "heli": {"img": "assets/img/heli.webp", "imgR": 0.7251}, "assault": {"img": "assets/img/assault.webp", "imgR": 1.0909}, "artillery": {"img": "assets/img/artillery.webp", "imgR": 0.7594}, "gunship": {"img": "assets/img/gunship.webp", "imgR": 0.7042}, "helipad": {"img": "assets/img/helipad.webp", "imgR": 0.7444, "imgAY": 0.5459, "imgW": 175}, "mess": {"img": "assets/img/mess.webp", "imgR": 0.6661, "imgAY": 0.4939, "imgW": 175}, "portrait": {"img": "assets/img/portrait.webp", "imgR": 1.022}};
Object.assign(B.helipad, UIMG.helipad); Object.assign(B.mess, UIMG.mess);
const PORTRAIT = UIMG.portrait.img;

// ===== TROOPS (equivalents of the Dragons of Atlantis troops) =====
// at attack · df defense · hp health · sp speed · rg range · ld load carried · up rations eaten per hour · pop population used · pw power
const UNITS = {
  recruit:  {name:'Recruit', bld:'barracks', req:1, at:10, df:10, hp:75, sp:200, rg:0, ld:40, up:3, pop:1, pw:1, time:3,
             cost:{metal:30, wood:20, rations:40}, desc:'Cheap basic infantry. Weak alone, useful in large numbers.'},
  rifleman: {name:'Rifleman', bld:'barracks', req:2, at:40, df:40, hp:150, sp:300, rg:0, ld:80, up:3, pop:1, pw:2, time:8,
             cost:{metal:80, wood:40, stone:20, rations:60, gold:5}, desc:'Solid defensive infantry protected by a heavy riot shield.'},
  sniper:   {name:'Sniper', bld:'barracks', req:3, at:80, df:30, hp:75, sp:250, rg:1200, ld:40, up:4, pop:1, pw:4, time:10,
             cost:{metal:100, wood:80, rations:60, gold:10}, desc:'Long-range marksman who strikes before the enemy can reach him.'},
  assault:  {name:'Assault Trooper', bld:'barracks', req:5, at:70, df:45, hp:225, sp:275, rg:0, ld:20, up:5, pop:2, pw:3, time:14,
             cost:{metal:160, stone:60, fuel:20, rations:100, gold:20}, desc:'Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.'},
  truck:    {name:'Supply Truck', bld:'factory', req:1, at:1, df:10, hp:45, sp:100, rg:0, ld:200, up:2, pop:1, pw:1, time:4,
             cost:{metal:40, wood:60, fuel:30, rations:30}, desc:'Carries large amounts of loot back to your base.'},
  drone:    {name:'Scout Drone', bld:'factory', req:2, at:5, df:5, hp:10, sp:3000, rg:0, ld:0, up:1, pop:1, pw:2, time:6,
             cost:{metal:60, fuel:40, rations:10, gold:10}, desc:'Very fast scout. Spies on enemy bases and camps.'},
  apc:      {name:'Armored Carrier', bld:'factory', req:4, at:5, df:200, hp:750, sp:150, rg:0, ld:5000, up:10, pop:4, pw:5, time:40,
             cost:{metal:600, wood:200, stone:100, fuel:300, rations:100, gold:40}, desc:'Heavily armored transport with a huge carrying capacity.'},
  tank:     {name:'Battle Tank', bld:'factory', req:7, at:1000, df:400, hp:4000, sp:120, rg:0, ld:400, up:50, pop:10, pw:20, time:180,
             cost:{metal:3000, stone:1000, fuel:1500, rations:500, gold:300}, desc:'Massive armored tank. Extremely tough and powerful.'},
  artillery:{name:'Rocket Artillery', bld:'factory', req:8, at:1200, df:30, hp:1500, sp:50, rg:1500, ld:75, up:35, pop:8, pw:20, time:150,
             cost:{metal:2500, wood:800, fuel:1500, rations:400, gold:250}, desc:'Rocket launcher truck that devastates enemies from very long range.'},
  heli:     {name:'Attack Helicopter', bld:'helipad', req:2, at:150, df:60, hp:300, sp:1000, rg:0, ld:100, up:8, pop:3, pw:6, time:30,
             cost:{metal:500, fuel:400, rations:150, gold:60}, desc:'Fast air unit that strikes with rockets and a nose cannon.'},
  gunship:  {name:'Gunship', bld:'helipad', req:6, at:300, df:300, hp:1500, sp:750, rg:0, ld:80, up:20, pop:6, pw:12, time:90,
             cost:{metal:1500, stone:200, fuel:1000, rations:300, gold:150}, desc:'Heavy tiltrotor gunship with huge firepower and armor.'}
};
const UNIT_ORDER = Object.keys(UNITS);
for(const u in UNITS) UNITS[u].img = UIMG[u].img;
const TRAINERS = ['barracks','factory','helipad'];
const trainQty = {};

// ===== ECONOMY =====
const bldLevel = t => { let m=0; for(const k in state.slots){ const b=state.slots[k]; if(b.type===t) m=Math.max(m,b.lvl); } return m; };
function popMax(){ let p=100+ccLvl()*50; for(const k in state.slots){ const b=state.slots[k]; if(b.type==='housing') p+=b.lvl*100; } return p; }
function queuedUnits(){ const q={}; for(const bl in state.training) for(const j of state.training[bl]) q[j.u]=(q[j.u]||0)+j.n; return q; }
function marching(){ const o={}; for(const m of (state.marches||[])) for(const u in m.troops) o[u]=(o[u]||0)+m.troops[u]; return o; }
// like Dragons of Atlantis: population is the workforce used while troops are being trained; it comes back when training is over
function popUsed(){ let p=0; const q=queuedUnits(); for(const u in q) p+=q[u]*UNITS[u].pop; return p; }
const goldIncome = () => Math.round(30 + popMax()*0.2);  // taxes paid by your population
function upkeep(){ let r=0; const mm=marching(), D=defenseState(); for(const u in UNITS) r+=((state.troops[u]||0)+(D[u]||0)+(mm[u]||0))*UNITS[u].up; return Math.round(r*(1-TECH.rationing.q*techLv('rationing'))); }
function troopPower(){ let p=0; const mm=marching(), D=defenseState(); for(const u in UNITS) p+=((state.troops[u]||0)+(D[u]||0)+(mm[u]||0))*UNITS[u].pw; return p; }
// every Garrison LEVEL speeds up all training (+3% each): upgrading counts as much as building more Garrisons
const garrisonLevels = () => { let n=0; for(const k in state.slots){ const b=state.slots[k]; if(b.type==='garrison') n+=b.lvl; } return n; };
const trainSpeed = bl => 1 + 0.05*bldLevel(bl) + 0.03*garrisonLevels() + techB('drill');
const TRAIN_SCALE = 4;   // Dragons of Atlantis pace: big orders take hours
const unitTime = (u,n) => Math.max(1, Math.round(UNITS[u].time*TRAIN_SCALE*n/trainSpeed(UNITS[u].bld)));
function unitCost(u,n){ const o={}; for(const r of RES) o[r]=(UNITS[u].cost[r]||0)*n; return o; }
function maxTrain(u){ const d=UNITS[u]; let m=Math.floor((popMax()-popUsed())/d.pop);
  for(const r of RES){ const c=d.cost[r]||0; if(c) m=Math.min(m,Math.floor(state.res[r]/c)); } return Math.max(0,Math.min(m,99999)); }
function whyNotTrain(u,n){ const d=UNITS[u], lv=bldLevel(d.bld);
  if(!lv) return _t('Build a {b} first',{b:_t(B[d.bld].name)});
  if(lv<d.req) return _t('Requires {b} level {l}',{b:_t(B[d.bld].name),l:d.req});
  { const mt=missingTech(UNIT_TECH[u]); if(Object.keys(mt).length) return _t('Requires research: {r}',{r:techReqText(mt)}); }
  if(!(n>0)) return _t('Choose how many to train');
  if((state.training[d.bld]||[]).length>=5) return _t('Training queue full (5 orders max)');
  if(popUsed()+n*d.pop>popMax()) return _t('Not enough population: build or upgrade Housing Blocks');
  const c=unitCost(u,n); for(const r of RES) if(state.res[r]<c[r]) return _t('Not enough resources');
  return ''; }
function train(u,n){
  if(whyNotTrain(u,n)) return; const d=UNITS[u], c=unitCost(u,n); for(const r of RES) state.res[r]-=c[r];
  const q=state.training[d.bld]=state.training[d.bld]||[], now=Date.now(), st=q.length?Math.max(now,q[q.length-1].e):now;
  q.push({u,n,s:st,e:st+unitTime(u,n)*1000}); trainQty[u]=0; save(); renderAll(); toast(IC.troops+' '+_t('Training {n} {u}',{n:fmtI(n),u:_t(d.name)})); }
function finishTraining(bl){ // test button: finishes the current order, the next ones move forward
  const q=state.training[bl]; if(!q||!q.length) return; const now=Date.now(); let t=now;
  q.forEach((j,i)=>{ const dur=j.e-j.s; if(i===0) j.e=now; else { j.s=t; j.e=t+dur; } t=j.e; }); checkTraining(); }
function checkTraining(){
  const now=Date.now(); let p0=null; const done=[];
  for(const bl in state.training){ const q=state.training[bl];
    while(q.length && now>=q[0].e){ if(p0===null) p0=totalPower(); const j=q.shift(); state.troops[j.u]=(state.troops[j.u]||0)+j.n; done.push(j); } }
  if(done.length){ save(); renderAll(); const j=done[done.length-1]; toast(IC.ok+' '+_t('{n} {u} ready',{n:fmtI(j.n),u:_t(UNITS[j.u].name)})); powerGain(totalPower()-p0); } }
function desert(dt){ // no rations left: 10% of the troops desert every hour
  const f=0.10*dt/3600; state.desertAcc=state.desertAcc||{}; let lost=0;
  for(const [o,pre] of [[state.troops,''],[defenseState(),'d_']]) for(const u in o){ const n=o[u]; if(!n) continue;
    state.desertAcc[pre+u]=(state.desertAcc[pre+u]||0)+n*f; const k=Math.floor(state.desertAcc[pre+u]);
    if(k>0){ o[u]=Math.max(0,n-k); state.desertAcc[pre+u]-=k; lost+=k; } }
  if(lost && Date.now()-(state.lastDesert||0)>60000){ state.lastDesert=Date.now(); toast(IC.warn+' '+_t('No rations left: your troops are deserting!')); } }

// =====================================================================
// ===== RESEARCH (Research Lab technologies, like Dragons of Atlantis) =====
// =====================================================================
// br branch · ic icon used until the painted icon exists · p bonus per level · lab Research Lab level needed for level 1
// req other technologies needed first · cost/time: level 1 (cost x1.9 and time x1.75 per level)
const TECH = {
  // m = cost multiplier (how valuable the technology is) · g = cost growth per level · tm = time multiplier
  // basic economy: cheap
  extraction: {name:'Extraction', br:'eco', ic:'metal', p:0.05, eff:'Metal and stone production +{p}%', lab:1, req:{}, m:1, g:1.8, tm:1, cost:{metal:200,wood:300,stone:200,fuel:50}, time:40},
  forestry:   {name:'Forestry', br:'eco', ic:'wood', p:0.05, eff:'Wood production +{p}%', lab:1, req:{}, m:1, g:1.8, tm:1, cost:{metal:300,wood:150,stone:250,fuel:50}, time:40},
  rationing:  {name:'Military Rations', br:'eco', ic:'rations', p:0.05, q:0.02, eff:'Rations production +{p}% · troop upkeep -{q}%', lab:1, req:{}, m:1.3, g:1.85, tm:1.2, cost:{metal:200,wood:300,stone:150,fuel:50}, time:45},
  refining:   {name:'Refining', br:'eco', ic:'fuel', p:0.05, eff:'Fuel production +{p}%', lab:2, req:{extraction:1}, m:1.6, g:1.85, tm:1.3, cost:{metal:400,wood:200,stone:300,fuel:100}, time:60},
  // construction speed speeds up the whole game: expensive
  engineering:{name:'Engineering', br:'eco', ic:'build', p:0.05, eff:'Construction speed +{p}%', lab:3, req:{forestry:2,extraction:2}, m:3, g:1.95, tm:2, cost:{metal:400,wood:400,stone:400,fuel:100}, time:70},
  drill:      {name:'Intensive Training', br:'mil', ic:'troops', p:0.05, eff:'Troop training speed +{p}%', lab:1, req:{}, m:1.5, g:1.9, tm:1.3, cost:{metal:250,wood:250,stone:150,fuel:50}, time:45},
  // combat technologies are the most powerful: very expensive, slow and with prerequisites that grow
  ballistics: {name:'Ballistics', br:'mil', ic:'atk', p:0.03, eff:'Troop attack +{p}%', lab:2, req:{drill:2}, m:4, g:2, tm:2.5, cost:{metal:400,wood:200,stone:100,fuel:150}, time:60},
  armor:      {name:'Armor Plating', br:'mil', ic:'def', p:0.03, eff:'Troop defense +{p}%', lab:2, req:{drill:2}, m:4, g:2, tm:2.5, cost:{metal:450,wood:100,stone:300,fuel:100}, time:60},
  medicine:   {name:'Field Medicine', br:'mil', ic:'hp', p:0.03, eff:'Troop health +{p}%', lab:4, req:{armor:3,rationing:2}, m:4.5, g:2, tm:2.8, cost:{metal:300,wood:300,stone:200,fuel:150}, time:80},
  logistics:  {name:'Logistics', br:'log', ic:'load', p:0.05, eff:'Carry capacity +{p}%', lab:1, req:{}, m:1, g:1.8, tm:1, cost:{metal:250,wood:350,stone:150,fuel:100}, time:45},
  engines:    {name:'Engines', br:'log', ic:'spd', p:0.05, eff:'March speed +{p}%', lab:2, req:{refining:1,logistics:1}, m:2, g:1.9, tm:1.6, cost:{metal:500,wood:100,stone:200,fuel:300}, time:70},
  robotics:   {name:'Robotics', br:'log', ic:'titan_ic', p:0.05, eff:'Titan attack, defense and health +{p}%', lab:5, req:{engines:3,armor:2}, m:6, g:2, tm:3, cost:{metal:900,wood:200,stone:500,fuel:500,gold:50}, time:120}
};
const TECH_BR = [['eco','Economy'],['mil','Military'],['log','Logistics & Titan']];
// research needed before a unit can be trained (on top of its building level)
const UNIT_TECH = {rifleman:{drill:1}, sniper:{ballistics:2}, assault:{ballistics:3,armor:3}, truck:{logistics:1}, drone:{engines:1},
  apc:{armor:3,logistics:3}, tank:{armor:6,ballistics:5}, artillery:{ballistics:7,engines:4}, heli:{engines:3,ballistics:2}, gunship:{engines:6,armor:5}};
// painted technology icons (Gemini): filled in when the icon sheet arrives, e.g. TECH_ART.extraction='assets/img/tech_extraction.webp'
const TECH_ART = {}; for(const t of Object.keys(TECH)) TECH_ART[t]=`assets/img/tech_${t}.webp`;
const techIcon = t => `<img class="ic" src="${TECH_ART[t]||ICS[TECH[t].ic]}" alt="">`;
function researchState(){ if(!state.research) state.research={lv:{}, cur:null}; return state.research; }
const techLv = t => researchState().lv[t]||0;
const techB = t => techLv(t)*TECH[t].p;
const labSpeed = () => 1 + 0.05*bldLevel('lab');
const techCost = (t,l) => { const d=TECH[t], o={}; for(const r of RES) o[r]=Math.round((d.cost[r]||0)*d.m*3*growth(l,1.9,0.2)); return o; };   // x1.9 ... x3.5 per level
const techTime = (t,l) => { const d=TECH[t]; return Math.max(5, Math.round(d.time*d.tm*4*Math.pow(2.1,l-1)/labSpeed())); };   // last levels take days, like Dragons of Atlantis
// prerequisites grow with the level: +1 level of each required technology every 2 levels
function techReqAt(t,l){ const o={}, r=TECH[t].req; for(const k in r) o[k]=Math.min(MAX, r[k]+Math.floor((l-1)/2)); return o; }
const techPw = l => Math.round(25*l*(l+1)/2);
function techPower(){ let p=0; for(const t in TECH) p+=Math.round(techPw(techLv(t))*(1+TECH[t].m)/2); return p; }
function techEff(t,l){ const d=TECH[t]; return _t(d.eff,{p:Math.round(d.p*l*100), q:Math.round((d.q||0)*l*100)}); }
function missingTech(req){ const o={}; for(const k in (req||{})) if(techLv(k)<req[k]) o[k]=req[k]; return o; }
const techReqText = req => Object.keys(req).map(k=>_t('{t} level {l}',{t:_t(TECH[k].name),l:req[k]})).join(', ');
function whyNotResearch(t,l){
  const R=researchState(), d=TECH[t], lab=bldLevel('lab');
  if(!lab) return _t('Build a {b} first',{b:_t('Research Lab')});
  if(l>MAX) return _t('Maximum level reached');
  const need=Math.max(d.lab,l); if(lab<need) return _t('Requires {b} level {l}',{b:_t('Research Lab'),l:need});
  const m=missingTech(techReqAt(t,l)); if(Object.keys(m).length) return _t('Requires research: {r}',{r:techReqText(m)});
  if(R.cur) return _t('A research is already in progress');
  const c=techCost(t,l); for(const r of RES) if(state.res[r]<c[r]) return _t('Not enough resources');
  return ''; }
function startResearch(t){ const l=techLv(t)+1; if(whyNotResearch(t,l)) return; const c=techCost(t,l); for(const r of RES) state.res[r]-=c[r];
  const now=Date.now(); researchState().cur={t, l, s:now, e:now+techTime(t,l)*1000};
  save(); renderAll(); toast(techIcon(t)+' '+_t('Research started: {t}',{t:_t(TECH[t].name)})); }
function checkResearch(force){ const R=researchState(), c=R.cur; if(!c || (!force && Date.now()<c.e)) return;
  const p0=totalPower(); R.lv[c.t]=c.l; R.cur=null; save(); renderAll();
  toast(IC.ok+' '+_t('{t} level {l} researched',{t:_t(TECH[c.t].name),l:c.l})); powerGain(totalPower()-p0); }
function cancelResearch(){ const R=researchState(), c=R.cur; if(!c) return; const k=techCost(c.t,c.l);
  refund(k);
  R.cur=null; save(); renderAll(); toast(_t('Research cancelled (50% refunded)')); }
function techChips(t,l){ const c=techCost(t,l);
  return `<div class="chips">${RES.filter(r=>c[r]>0).map(r=>`<span class="chip${state.res[r]<c[r]?' no':''}">${ICON[r]} ${fmtN(c[r])}</span>`).join('')}<span class="chip">${IC.time} ${fmtT(techTime(t,l))}</span><span class="chip pw">${IC.power} +${fmtN(Math.round((techPw(l)-techPw(l-1))*(1+TECH[t].m)/2))} ${_t('Power')}</span></div>`; }
function techUnlocks(t){ const us=UNIT_ORDER.filter(u=>UNIT_TECH[u] && UNIT_TECH[u][t]);
  return us.length ? `<div class="unl">${_t('Unlocks:')} ${us.map(u=>`<span class="${techLv(t)>=UNIT_TECH[u][t]?'ok':''}"><img src="${UNITS[u].img}" alt="">${_t(UNITS[u].name)} (${_t('Lv')} ${UNIT_TECH[u][t]})</span>`).join('')}</div>` : ''; }
function researchPanel(){
  const R=researchState(), lab=bldLevel('lab');
  let h=`<div class="hd"><div class="big">${bigIcon(B.lab)}</div><div style="flex:1;min-width:0"><h2>${_t('Research')}</h2>
    <div class="sub">${lab ? _t('{b} level {l}',{b:_t('Research Lab'),l:lab})+' · '+_t('Research speed +{p}%',{p:lab*5}) : _t('Build a {b} first',{b:_t('Research Lab')})}</div>
    <div class="sub">${IC.power} ${fmtN(techPower())} ${_t('power')} · ${_t('A technology cannot go above the level of the Research Lab.')}</div></div></div>`;
  if(!lab) h+=`<div class="why">${IC.lock} ${_t('Build a Research Lab on an empty plot of your base to unlock technologies.')}</div>`;
  if(R.cur){ const c=R.cur;
    h+=`<div class="row rcur"><div class="top"><div class="big tech">${techIcon(c.t)}</div><div style="flex:1;min-width:0"><b>${_t('In progress:')} ${_t(TECH[c.t].name)} · ${_t('Lv')} ${c.l}</b>
      <div class="prog"><i class="lv-bar" data-s="${c.s}" data-e="${c.e}" style="width:${pct(c.s,c.e)}%"></i></div><span class="sub">${IC.time} <span class="lv-time" data-s="${c.s}" data-e="${c.e}">${fmtT((c.e-Date.now())/1000)}</span></span></div></div>
      <div style="display:flex;gap:8px;margin-top:8px"><button class="sm" data-act="speed" data-tg="research">${IC.time} ${_t('Speed up')}</button><button class="sm" data-act="rfinish">${_t('Finish now (test)')}</button><button class="sec sm" data-act="rcancel">${_t('Cancel')}</button></div></div>`; }
  for(const [br,label] of TECH_BR){ h+=`<h3>${_t(label)}</h3>`;
    for(const t in TECH){ const d=TECH[t]; if(d.br!==br) continue;
      const l=techLv(t), n=l+1, maxed=l>=MAX, miss=missingTech(techReqAt(t,n)), hasMiss=Object.keys(miss).length>0, busy=R.cur&&R.cur.t===t;
      h+=`<div class="row tech-row${hasMiss||!lab?' locked':''}"><div class="top"><div class="big tech">${techIcon(t)}</div><div style="flex:1;min-width:0">
        <b>${_t(d.name)}</b> <span class="sub">· ${_t('Lv')} ${l} / ${MAX}</span>
        <div class="sub">${l ? _t('Current:')+' '+techEff(t,l) : _t('Not researched yet')}</div>${maxed?'':`<div class="eff">${_t('Next:')} ${techEff(t,n)}</div>`}${techUnlocks(t)}</div></div>`;
      if(maxed) h+=`<div class="sub">${_t('Maximum level reached')}</div>`;
      else if(busy) h+=`<div class="sub">${IC.time} ${_t('Research in progress')}</div>`;
      else if(hasMiss) h+=`<div class="why">${IC.lock} ${_t('Requires research: {r}',{r:techReqText(miss)})}</div>`;
      else { const why=whyNotResearch(t,n); h+=`${techChips(t,n)}<button data-act="research" data-t="${t}"${why?' disabled':''}>${_t('Research')}</button>${why?`<div class="why">${why}</div>`:''}`; }
      h+=`</div>`; } }
  return h; }
function openResearch(){ openPanel('__research'); }

// =====================================================================
// ===== DEFENSE: troops placed in defense stay home to protect the base (attacked only by other players) =====
// =====================================================================
const defQty = {};
function defenseState(){ if(!state.defense) state.defense={}; return state.defense; }
const defCap = () => { let c=0; for(const k in state.slots){ const b=state.slots[k]; if(b.type==='garrison') c+=b.lvl*200; } return c; };   // in population places
const defUsed = () => { const D=defenseState(); let p=0; for(const u in D) p+=(D[u]||0)*UNITS[u].pop; return p; };
const wallBonus = () => 0.05*((state.slots.wall||{}).lvl||0);
function moveDefense(u, n){   // n>0: put in defense · n<0: withdraw
  const D=defenseState(); n=Math.floor(n); if(!n) return;
  if(n>0){ n=Math.min(n, state.troops[u]||0, Math.floor((defCap()-defUsed())/UNITS[u].pop)); if(n<=0){ toast(IC.warn+' '+_t('Not enough room in your Garrisons')); return; }
    state.troops[u]-=n; D[u]=(D[u]||0)+n; toast(IC.def+' '+_t('{n} {u} placed in defense',{n:fmtN(n),u:_t(UNITS[u].name)})); }
  else { n=Math.min(-n, D[u]||0); if(n<=0) return; D[u]-=n; if(!D[u]) delete D[u]; state.troops[u]=(state.troops[u]||0)+n; toast(IC.back+' '+_t('{n} {u} withdrawn from defense',{n:fmtN(n),u:_t(UNITS[u].name)})); }
  defQty[u]=0; save(); renderAll(); }
function defensePanel(){
  const D=defenseState(), cap=defCap(), used=defUsed(), gar=bldLevel('garrison');
  let h=`<div class="hd"><div class="big">${IC.defense}</div><div style="flex:1;min-width:0"><h2>${_t('Defense')}</h2>
    <div class="sub">${_t('Troops in defense stay in your base and fight when another player attacks you. They cannot be sent on marches.')}</div></div></div>
    <div class="chips"><span class="chip${used>=cap&&cap?' no':''}">${IC.def} ${_t('Garrison places: {a} / {b}',{a:fmtN(used),b:fmtN(cap)})}</span><span class="chip">${IC.def} ${_t('Wall: defense bonus +{p}%',{p:Math.round(wallBonus()*100)})}</span></div>`;
  if(!gar) h+=`<div class="why">${IC.lock} ${_t('Build a Garrison to place troops in defense. Each Garrison level gives 200 places.')}</div>`;
  const list=UNIT_ORDER.filter(u=>(state.troops[u]||0)+(D[u]||0)>0);
  if(!list.length) return h+`<p style="margin-top:10px">${_t('You have no troops. Train some at the Barracks.')}</p>`;
  for(const u of list){ const d=UNITS[u], a=state.troops[u]||0, df=D[u]||0, room=Math.max(0,Math.floor((cap-used)/d.pop));
    h+=`<div class="row"><div class="top"><img class="uimg" src="${d.img}" alt=""><div style="flex:1;min-width:0"><b>${_t(d.name)}</b>
      <div class="sub">${_t('Available: {n}',{n:fmtN(a)})} · ${IC.def} ${_t('In defense: {n}',{n:fmtN(df)})}</div>
      <div class="trow2"><input type="number" min="0" inputmode="numeric" data-dq="${u}" value="${defQty[u]||''}" placeholder="0">
        <button class="sm" data-act="defin" data-unit="${u}"${a&&room?'':' disabled'}>${IC.def} ${_t('Defend')}</button>
        <button class="sec sm" data-act="defout" data-unit="${u}"${df?'':' disabled'}>${IC.back} ${_t('Withdraw')}</button></div>
      <div class="trow2"><button class="sec sm" data-act="defall" data-unit="${u}"${a&&room?'':' disabled'}>${_t('All in defense')} (${fmtN(Math.min(a,room))})</button>
        <button class="sec sm" data-act="defnone" data-unit="${u}"${df?'':' disabled'}>${_t('Withdraw all')}</button></div></div></div></div>`; }
  return h; }
function openDefense(){ openPanel('__defense'); }

// =====================================================================
// ===== ITEMS: resource crates, speed-ups, boosts, Titan repair kits, supply drops (modelled on Dragons of Atlantis) =====
// =====================================================================
const CRATE_AMT = {s:1000, m:10000, l:50000}, GOLD_AMT = {s:100, m:1000, l:5000};
// speed-up ladder of Dragons of Atlantis: 1 min, 5 min, 15 min, 1 h, 2 h 30, 8 h, 15 h, 24 h, 2.5 days, 4 days
const SPEEDS = [['1m',60],['5m',300],['15m',900],['1h',3600],['150m',9000],['8h',28800],['15h',54000],['24h',86400],['60h',216000],['96h',345600]];
const PROD_RES = ['metal','wood','stone','fuel','rations'];
const ITEMS = {};
for(const r of RES) for(const z of ['s','m','l']) ITEMS[`crate_${r}_${z}`] = {kind:'crate', res:r, size:z, amt:(r==='gold'?GOLD_AMT:CRATE_AMT)[z]};
SPEEDS.forEach(([k,s],i) => ITEMS['speed_'+k] = {kind:'speed', secs:s, tier: i<3?1: i<6?2:3});
for(const r of PROD_RES) ITEMS['boost_prod_'+r] = {kind:'boost', b:'prod_'+r, res:r, pct:25, hours:24};
ITEMS.boost_atk = {kind:'boost', b:'atk', pct:20, hours:24};
ITEMS.boost_def = {kind:'boost', b:'def', pct:20, hours:24};
ITEMS.march_25 = {kind:'march', pct:25}; ITEMS.march_50 = {kind:'march', pct:50};
ITEMS.train_30 = {kind:'train', pct:30};
ITEMS.repair_s = {kind:'repair', pct:25, size:'s'}; ITEMS.repair_l = {kind:'repair', pct:100, size:'l'};
ITEMS.supply = {kind:'box'};
for(const t of ['bronze','silver','gold']) ITEMS['chest_'+t] = {kind:'chest', tier:t};
ITEMS.wheel_ticket = {kind:'wheel'}; ITEMS.wheel_medal = {kind:'wheel'};   // spins of the wheel of fortune   // mystery chests (loot tables in js/loot.js)
const ITEM_ORDER = Object.keys(ITEMS);
// painted item pictures (Gemini)
const ITEM_ART = {}; for(const k of ['crate_s','crate_m','crate_l','gold_s','gold_m','gold_l','speed_1','speed_2','speed_3','repair_s','repair_l','supply','boost_prod','boost_atk','boost_def','march_25','march_50','train_30']) ITEM_ART[k]=`assets/img/item_${k}.webp`;   // item_medal / item_ticket / item_wheel / item_truce_* are ready for the wheel and the truces
function itemArt(id){ const it=ITEMS[id];
  if(it.kind==='crate') return ITEM_ART[(it.res==='gold'?'gold_':'crate_')+it.size];
  if(it.kind==='speed') return ITEM_ART['speed_'+it.tier];
  if(it.kind==='repair') return ITEM_ART['repair_'+it.size];
  if(it.kind==='box') return ITEM_ART.supply;
  if(it.kind==='chest') return `assets/img/chest_${it.tier}_closed.webp`;
  if(it.kind==='wheel') return id==='wheel_ticket' ? 'assets/img/item_ticket.webp' : 'assets/img/item_medal.webp';
  return ITEM_ART[id.startsWith('boost_prod_')?'boost_prod':id]; }
// short duration label: 1 min · 2 h 30 · 2.5 d
function durLab(s){ if(s<3600) return _t('{n} min',{n:Math.round(s/60)}); if(s<172800){ const h=Math.floor(s/3600), m=Math.round(s%3600/60); return m?_t('{h} h {m}',{h,m}):_t('{h} h',{h}); } return _t('{n} d',{n:s/86400}); }
function itemIcon(id, size=46){ const it=ITEMS[id], art=itemArt(id);
  const fb = {crate:ICS[it.res], speed:ICS.time, repair:ICS.repair, box:ICS.drop, march:ICS.spd, train:ICS.troops}[it.kind] || (it.b==='atk'?ICS.atk: it.b==='def'?ICS.def: ICS[it.res]);
  let tag='';
  if(it.kind==='crate') tag = art ? `<img class="itres" src="${ICS[it.res]}" alt="">` : `<b class="ittag">${fmtN(it.amt)}</b>`;
  if(it.kind==='speed') tag = `<b class="ittag">${durLab(it.secs)}</b>`;
  if(it.kind==='repair' || it.kind==='boost') tag = `<b class="ittag">+${it.pct}%</b>`;
  if(it.kind==='boost' && it.res && art) tag += `<img class="itres" src="${ICS[it.res]}" alt="">`;
  if(it.kind==='march' || it.kind==='train') tag = `<b class="ittag">-${it.pct}%</b>`;
  return `<span class="iti${art?'':' fb'}" style="width:${size}px;height:${size}px"><img src="${art||fb}" alt="">${tag}</span>`; }
function itemName(id){ const it=ITEMS[id];
  if(it.kind==='crate') return it.res==='gold' ? _t({s:'Small gold pouch',m:'Medium gold pouch',l:'Large gold pouch'}[it.size]) : _t({s:'Small crate of {r}',m:'Medium crate of {r}',l:'Large crate of {r}'}[it.size],{r:_t(it.res)});
  if(it.kind==='speed') return _t('Speed-up {t}',{t:durLab(it.secs)});
  if(it.kind==='boost') return it.res ? _t('{r} production boost',{r:_t(it.res)}) : _t(it.b==='atk'?'Combat stimulant':'Shield generator');
  if(it.kind==='march') return _t(it.pct===25?'Forced march':'Lightning march');
  if(it.kind==='train') return _t('Drill manual');
  if(it.kind==='repair') return _t('Titan repair kit (+{p}%)',{p:it.pct});
  if(it.kind==='chest') return _t({bronze:'Supply chest',silver:'Military cache',gold:'Elite arsenal'}[it.tier]);
  if(it.kind==='wheel') return _t(id==='wheel_ticket'?'Fortune ticket':'Fortune medal');
  return _t('Supply drop'); }
function itemDesc(id){ const it=ITEMS[id];
  if(it.kind==='crate') return _t('Gives {n} {r}.',{n:fmtN(it.amt),r:_t(it.res)});
  if(it.kind==='speed') return _t('Reduces the time of a construction, a research or a training by {t}. Use it from the progress bar.',{t:durLab(it.secs)});
  if(it.kind==='boost') return it.res ? _t('{r} production +{p}% for 24 hours.',{r:_t(it.res),p:it.pct}) : _t(it.b==='atk'?'Troop attack +{p}% for 24 hours.':'Troop defense +{p}% for 24 hours.',{p:it.pct});
  if(it.kind==='march') return _t('Shortens the remaining time of one march by {p}%. Use it from the progress bar.',{p:it.pct});
  if(it.kind==='train') return _t('Shortens the remaining time of one training order by {p}%. Use it from the progress bar.',{p:it.pct});
  if(it.kind==='repair') return _t('Repairs your Titan by {p}%.',{p:it.pct});
  if(it.kind==='wheel') return _t(id==='wheel_ticket'?'One spin of the ticket wheel.':'One spin of the medal wheel, with the best prizes.');
  if(it.kind==='chest') return _t('Open it to win a random reward: troops, speed-ups, resources, boosts or Titan parts.')+chestChances(id);
  return _t('Opens to give 3 random items.'); }
function invState(){ if(!state.inv) state.inv={};
  if(state.inv.speed_3h){ state.inv.speed_150m=(state.inv.speed_150m||0)+state.inv.speed_3h; delete state.inv.speed_3h; }   // old 3 h speed-ups become 2 h 30
  for(const k in state.inv) if(!ITEMS[k]) delete state.inv[k];
  return state.inv; }
const invN = id => invState()[id]||0;
function addItem(id, n=1){ const I=invState(); I[id]=(I[id]||0)+n; }
function takeItem(id){ const I=invState(); if(!I[id]) return false; I[id]--; if(!I[id]) delete I[id]; return true; }
// ---- boosts (active for 24 h; using another one adds 24 h) ----
function boostsState(){ if(!state.boosts) state.boosts={}; const now=Date.now(); for(const k in state.boosts) if(state.boosts[k]<=now) delete state.boosts[k]; return state.boosts; }
const boostOn = b => (boostsState()[b]||0) > Date.now();
function boostChips(){ const B2=boostsState(), now=Date.now(); const ks=Object.keys(B2); if(!ks.length) return '';
  return `<div class="chips">${ks.map(k=>{ const id=k.startsWith('prod_')?'boost_prod_'+k.slice(5):'boost_'+k; return `<span class="chip pw">${itemIcon(id,22)} ${itemName(id)} · <span class="lv-time" data-s="0" data-e="${B2[k]}">${fmtT((B2[k]-now)/1000)}</span></span>`; }).join('')}</div>`; }
// ---- rewards, by rarity (Dragons of Atlantis style: rare items are really rare) ----
const pick = a => a[Math.floor(Math.random()*a.length)];
const crateOf = z => `crate_${Math.random()<0.12?'gold':pick(PROD_RES)}_${z}`;
const RARITY = [
  {name:'Common',    min:1, p:L=>0.10+0.01*L,  roll:()=>Math.random()<0.6 ? crateOf('s') : pick(['speed_1m','speed_5m','speed_15m','wheel_ticket'])},
  {name:'Uncommon',  min:1, p:L=>0.03+0.005*L, roll:()=>{ const r=Math.random(); return r<0.4?crateOf('m'): r<0.7?pick(['speed_1h','speed_150m']): r<0.85?'boost_prod_'+pick(PROD_RES): pick(['repair_s','train_30']); }},
  {name:'Rare',      min:5, p:L=>0.01+0.003*L, roll:()=>{ const r=Math.random(); return r<0.3?crateOf('l'): r<0.6?pick(['speed_8h','speed_15h','speed_24h']): pick(['boost_atk','boost_def','march_25','march_50','repair_l','chest_bronze','wheel_medal']); }},
  {name:'Very rare', min:7, p:L=>0.005+0.005*(L-7)/3, roll:()=>pick(['speed_60h','speed_96h','supply','chest_silver'])}
];
function dropTable(tl){ const L=tl.lvl;
  if(tl.t!=='camp') return [{r:RARITY[0], p:0.04+0.004*L}];   // resource fields: small common finds only
  return RARITY.filter(x=>L>=x.min).map(x=>({r:x, p:x.p(L)})); }
const partChance = tl => tl.t==='camp' ? 0.15+0.035*tl.lvl : 0;
function rollItems(tl){ const out=[]; for(const {r,p} of dropTable(tl)) if(Math.random()<p) out.push(r.roll()); return out.filter(id=>ITEMS[id]); }
function supplyItem(){ const r=Math.random(); return (r<0.7?RARITY[0]: r<0.95?RARITY[1]: RARITY[2]).roll(); }
// ---- using items ----
function useItem(id, all){
  const it=ITEMS[id]; if(!it || !invN(id)) return;
  if(it.kind==='speed' || it.kind==='march' || it.kind==='train'){ toast(_t('Use it from the progress bar at the bottom of the screen.')); return; }
  if(it.kind==='repair'){ const T=titanState(); if(!bldLevel('hangar')) return toast(_t('Build the Titan Hangar'));
    if(T.hp>=100) return toast(_t('Your Titan is already fully repaired'));
    takeItem(id); T.hp=Math.min(100,T.hp+it.pct); toast(IC.repair+' '+_t('Titan repaired: {h}%',{h:Math.floor(T.hp)})); save(); renderAll(); return; }
  if(it.kind==='chest'){ openChest(id, all?50:1); return; }
  if(it.kind==='wheel'){ wheelTab=id; closeSheet(); openWheel(); return; }
  if(it.kind==='boost'){ takeItem(id); const B2=boostsState(), now=Date.now(); B2[it.b]=Math.max(now,B2[it.b]||0)+it.hours*3600e3;
    toast(itemIcon(id,20)+' '+_t('{i} active: {t}',{i:itemName(id),t:fmtT((B2[it.b]-now)/1000)})); save(); renderAll(); return; }
  let n = all ? invN(id) : 1; const got={}, gotItems=[];
  for(let i=0;i<n;i++){ if(!takeItem(id)) break;
    if(it.kind==='crate'){ state.res[it.res]+=it.amt; got[it.res]=(got[it.res]||0)+it.amt; }
    else if(it.kind==='box'){ for(let k=0;k<3;k++){ const x=supplyItem(); addItem(x); gotItems.push(x); } } }
  if(Object.keys(got).length) toast(Object.keys(got).map(r=>`${ICON[r]} +${fmtN(got[r])}`).join(' '));
  if(gotItems.length) toast(IC.drop+' '+gotItems.map(itemName).join(', '));
  save(); renderAll(); }
// inventory tabs, like Dragons of Atlantis: General, Resources, Speed-ups, Production, Combat
const INV_TABS=[['general','General',it=>['repair','box','wheel'].includes(it.kind)],['chest','Chests',it=>it.kind==='chest'],['res','Resources',it=>it.kind==='crate'],['speed','Speed-ups',it=>['speed','march','train'].includes(it.kind)],
  ['prod','Production',it=>it.kind==='boost'&&!!it.res],['combat','Combat',it=>it.kind==='boost'&&!it.res]];
let invTab=null;
function inventoryPanel(){
  const I=invState();
  let h=`<div class="hd"><div class="big">${IC.inventory}</div><div style="flex:1;min-width:0"><h2>${_t('Inventory')}</h2><div class="sub">${_t('Win items by defeating Raider Camps and taking resource fields on the map.')}</div></div></div>`;
  const bc=boostChips(); if(bc) h+=`<h3>${_t('Active boosts')}</h3>${bc}`;
  const cnt=t=>ITEM_ORDER.filter(id=>I[id] && t[2](ITEMS[id])).reduce((n,id)=>n+I[id],0);
  if(!invTab || !INV_TABS.some(t=>t[0]===invTab)) invTab=(INV_TABS.find(t=>cnt(t))||INV_TABS[0])[0];
  h+=`<div class="itabs">${INV_TABS.map(t=>{ const n=cnt(t); return `<button class="tab2${t[0]===invTab?' on':''}" data-act="invtab" data-t="${t[0]}">${_t(t[1])}${n?` <small>${fmtN(n)}</small>`:''}</button>`; }).join('')}</div>`;
  const tab=INV_TABS.find(t=>t[0]===invTab), ids=ITEM_ORDER.filter(id=>I[id] && tab[2](ITEMS[id]));
  if(!ids.length) return h+`<p class="sub" style="margin-top:10px">${_t('No item in this category.')}</p>`;
  for(const id of ids){ const it=ITEMS[id], fromBar=['speed','march','train'].includes(it.kind);
    h+=`<div class="row"><div class="top">${itemIcon(id,52)}<div style="flex:1;min-width:0"><b>${itemName(id)}</b> <span class="sub">× ${fmtN(I[id])}</span><div class="sub">${itemDesc(id)}</div>
      ${fromBar?'':`<div class="trow2"><button class="sm" data-act="iuse" data-id="${id}">${_t(['box','chest'].includes(it.kind)?'Open':it.kind==='wheel'?'Spin':'Use')}</button>${I[id]>1&&['crate','box','chest'].includes(it.kind)?`<button class="sec sm" data-act="iuseall" data-id="${id}">${_t(it.kind==='chest'?'Open all':'Use all')} (${fmtN(it.kind==='chest'?Math.min(50,I[id]):I[id])})</button>`:''}</div>`}</div></div></div>`; }
  return h; }
function openInventory(){ openPanel('__inv'); }
// ---- speed-ups on the queues ----
let speedTarget=null;   // 'build' · 'research' · 'train:<building>' · 'march:<id>'
function speedJob(tg){ const now=Date.now();
  if(tg==='build') return state.queue ? {name:_t(B[state.queue.type].name)+' · '+_t('Lv')+' '+state.queue.lvl, left:(state.queue.end-now)/1000, end:state.queue.end, kinds:['speed']} : null;
  if(tg==='research'){ const c=researchState().cur; return c ? {name:_t(TECH[c.t].name)+' · '+_t('Lv')+' '+c.l, left:(c.e-now)/1000, end:c.e, kinds:['speed']} : null; }
  if(tg && tg.startsWith('train:')){ const q=state.training[tg.slice(6)]; return q&&q.length ? {name:fmtN(q[0].n)+' × '+_t(UNITS[q[0].u].name), left:(q[0].e-now)/1000, end:q[0].e, kinds:['speed','train']} : null; }
  if(tg && tg.startsWith('march:')){ const m=state.marches.find(x=>x.id==tg.slice(6)); if(!m) return null; const end=m.st==='out'?m.a:m.b;
    return {name:_t(m.st==='out'?'Marching':'Returning')+` (${m.x}, ${m.y})`, left:(end-now)/1000, end, kinds:['march']}; }
  return null; }
function openSpeed(tg){ speedTarget=tg; openPanel('__speed'); }
function speedPanel(){ const j=speedJob(speedTarget);
  let h=`<div class="hd"><div class="big">${IC.time}</div><div style="flex:1;min-width:0"><h2>${_t('Speed up')}</h2><div class="sub">${j?j.name+' · '+_t('Time left: {t}',{t:`<span class="lv-time" data-s="0" data-e="${j.end}">${fmtT(j.left)}</span>`}):_t('Nothing to speed up')}</div></div></div>`;
  if(!j) return h;
  const ids=ITEM_ORDER.filter(id=>j.kinds.includes(ITEMS[id].kind) && invN(id));
  if(!ids.length) return h+`<p style="margin-top:10px">${_t('You have no speed-ups. Defeat Raider Camps to win some.')}</p>`;
  for(const id of ids) h+=`<div class="row"><div class="top">${itemIcon(id,46)}<div style="flex:1;min-width:0"><b>${itemName(id)}</b> <span class="sub">× ${fmtN(invN(id))}</span></div><button class="sm" data-act="suse" data-id="${id}">${_t('Use')}</button></div></div>`;
  return h; }
function useSpeed(id){ const it=ITEMS[id], tg=speedTarget, j=speedJob(tg); if(!it || !j || !j.kinds.includes(it.kind) || !takeItem(id)) return;
  const now=Date.now(), cutOf=left=> it.kind==='speed' ? it.secs*1000 : Math.max(0,left)*it.pct/100;
  if(tg==='build'){ state.queue.end-=cutOf(); if(state.queue.end<=now) complete(); }
  else if(tg==='research'){ researchState().cur.e-=cutOf(); checkResearch(); }
  else if(tg.startsWith('train:')){ const q=state.training[tg.slice(6)], jb=q[0], cut=Math.min(cutOf(jb.e-now), Math.max(0,jb.e-now)); jb.e-=cut; for(let i=1;i<q.length;i++){ q[i].s-=cut; q[i].e-=cut; } checkTraining(); }
  else { const m=state.marches.find(x=>x.id==tg.slice(6)), cut=cutOf(((m.st==='out'?m.a:m.b)-now));
    if(m.st==='out'){ m.a-=cut; m.b-=cut; } else m.b-=cut; processMarches(); }
  toast(itemIcon(id,20)+' '+itemName(id)); save(); if(!speedJob(tg)) closeSheet(); renderAll(); }
const speedBtn = tg => `<button class="sec sm" data-act="speed" data-tg="${tg}" title="${_t('Speed up')}">${IC.time}</button>`;

// ===== TROOPS UI =====
const pct = (a,b) => Math.max(0,Math.min(100,(Date.now()-a)/(b-a)*100));
function unitStats(d){ return `<div class="ust"><span>${IC.atk} ${d.at}</span><span>${IC.def} ${d.df}</span><span>${IC.hp} ${d.hp}</span><span>${IC.spd} ${d.sp}</span>${d.rg?`<span>${IC.rng} ${d.rg}</span>`:''}<span>${IC.load} ${d.ld}</span><span>${IC.rations} ${d.up}/h</span><span>${IC.pop} ${d.pop}</span><span class="pwc">${IC.power} ${d.pw}</span></div>`; }
const bigIcon = (d,l) => d===B.wall ? `<img class="bimg" src="assets/img/wall_${wallStage()}.webp" alt="" style="object-fit:cover;width:100%;height:100%;border-radius:8px">` : d.img ? `<img class="bimg" src="${(l&&LVL_IMGS[Object.keys(B).find(k=>B[k]===d)])?bImgAt(Object.keys(B).find(k=>B[k]===d),l).img:d.img}" alt="">` : d.icon;
function costInline(c){ return RES.filter(r=>c[r]).map(r=>`${ICON[r]}${fmtN(c[r])}`).join(' '); }
function trainCost(u,n){ if(!(n>0)) return ''; const c=unitCost(u,n), d=UNITS[u];
  return `<div class="chips">${RES.filter(r=>c[r]>0).map(r=>`<span class="chip${state.res[r]<c[r]?' no':''}">${ICON[r]} ${fmtN(c[r])}</span>`).join('')}<span class="chip">${IC.time} ${fmtT(unitTime(u,n))}</span><span class="chip">${IC.pop} ${fmtN(n*d.pop)}</span><span class="chip pw">${IC.power} +${fmtN(n*d.pw)} ${_t('Power')}</span></div>`; }
function trainBtn(u,n){ const why=whyNotTrain(u,n);
  return `<button data-act="train" data-unit="${u}"${why?' disabled':''}>${_t('Train')}${n>0?' '+fmtI(n):''}</button>${why&&n>0?`<div class="why">${why}</div>`:''}`; }
function updateTrainRow(u){ const n=trainQty[u]||0, c=document.getElementById('tc-'+u), a=document.getElementById('ta-'+u); if(c) c.innerHTML=trainCost(u,n); if(a) a.innerHTML=trainBtn(u,n); }
function unitCard(u){ const d=UNITS[u], lv=bldLevel(d.bld), mt=missingTech(UNIT_TECH[u]), noTech=Object.keys(mt).length>0, locked=lv<d.req||noTech, n=trainQty[u]||0, own=state.troops[u]||0;
  return `<div class="row ucard${locked?' locked':''}"><div class="top"><img class="uimg" src="${d.img}" alt=""><div style="flex:1;min-width:0"><b>${_t(d.name)}</b> <span class="sub">· ${_t('owned {n}',{n:fmtI(own)})}</span><div class="sub">${_t(d.desc)}</div>${unitStats(d)}</div></div>
  ${locked?(lv<d.req?`<div class="why">${IC.lock} ${_t('Requires {b} level {l}',{b:_t(B[d.bld].name),l:d.req})}</div>`:'')+(noTech?`<div class="why">${IC.lock} ${_t('Requires research: {r}',{r:techReqText(mt)})} <button class="sec sm" data-act="openres">${_t('Research')}</button></div>`:''):
  `<div class="trow2"><input type="number" min="0" inputmode="numeric" data-qty="${u}" value="${n||''}" placeholder="0"><button class="sec sm" data-act="max" data-unit="${u}">${_t('Max')} ${fmtI(maxTrain(u))}</button><span class="sub">${_t('each:')} ${costInline(d.cost)} · ${IC.time} ${fmtT(unitTime(u,1))}</span></div>
   <div id="tc-${u}">${trainCost(u,n)}</div><div id="ta-${u}">${trainBtn(u,n)}</div>`}</div>`; }
function trainSection(bl){
  const q=state.training[bl]||[];
  let h=`<h3>${IC.troops} ${_t('Train troops')}</h3><div class="sub">${_t('Population {a} / {b} · Training speed +{p}%',{a:fmtN(popUsed()),b:fmtN(popMax()),p:Math.round((trainSpeed(bl)-1)*100)})}</div><div class="sub">${_t('Each Garrison level speeds up all training by 3%. The Intensive Training research adds more.')}</div>`;
  if(q.length){ h+=`<div class="row">`;
    q.forEach((j,i)=>{ const d=UNITS[j.u];
      h+=`<div class="tq"><img src="${d.img}" alt=""><div class="tqi"><b>${fmtI(j.n)} × ${_t(d.name)}</b>${i===0
        ?`<div class="prog"><i class="lv-bar" data-s="${j.s}" data-e="${j.e}" style="width:${pct(j.s,j.e)}%"></i></div><span class="sub">${IC.time} <span class="lv-time" data-s="${j.s}" data-e="${j.e}">${fmtT((j.e-Date.now())/1000)}</span></span>`
        :`<div class="sub">${_t('Waiting')} · ${fmtT((j.e-j.s)/1000)}</div>`}</div>${i===0?`<div style="display:flex;gap:4px">${speedBtn('train:'+bl)}<button class="sm" data-act="tfinish" data-bld="${bl}">${_t('Finish (test)')}</button></div>`:''}</div>`; });
    h+=`</div>`; }
  for(const u of UNIT_ORDER.filter(u=>UNITS[u].bld===bl)) h+=unitCard(u);
  return h; }
function troopsPanel(){
  const total=Object.values(state.troops).reduce((a,b)=>a+b,0), q=queuedUnits(), rt=rates();
  let h=`<div class="hd"><div class="big" style="background:#4b5a3a">${IC.troops}</div><div><h2>${_t('Your Army')}</h2><div class="sub">${_t('{n} troops',{n:fmtN(total)})} · ${IC.power} ${fmtN(troopPower())} ${_t('power')}</div></div></div>
  <div class="chips"><span class="chip">${IC.pop} ${_t('Population')} ${fmtN(popUsed())} / ${fmtN(popMax())}</span><span class="chip">${IC.rations} ${_t('Upkeep')} ${fmtN(upkeep())}/h</span><span class="chip${rt.rations<0?' no':''}">${IC.rations} ${_t('Net')} ${rt.rations>=0?'+':''}${fmtN(rt.rations)}/h</span></div>`;
  if(rt.rations<0) h+=`<div class="why">${IC.warn} ${_t('Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.')}</div>`;
  for(const [bl,label] of [['barracks','Infantry · Barracks'],['factory','Vehicles · Vehicle Factory'],['helipad','Air · Helipad']]){
    h+=`<h3>${_t(label)}</h3><div class="armyg">`;
    for(const u of UNIT_ORDER.filter(u=>UNITS[u].bld===bl)){ const d=UNITS[u], n=state.troops[u]||0;
      const dn=defenseState()[u]||0;
      h+=`<div class="acell${n||dn?'':' zero'}"><img src="${d.img}" alt=""><b>${fmtN(n)}</b><span>${_t(d.name)}</span>${dn?`<small>${IC.def} ${fmtN(dn)} ${_t('in defense')}</small>`:''}${q[u]?`<small>+${fmtN(q[u])} ${_t('training')}</small>`:''}</div>`; }
    h+=`</div>`; }
  return h+`<p class="sub" style="margin-top:12px">${_t('Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.')}</p>`; }
const MENU = [['troops','Troops',()=>openTroops()],['shop','Shop','soon'],['quests','Quests',()=>openQuests()],['wheel','Wheel of fortune',()=>openWheel()],
  ['messages','Messages','soon'],['reports','Reports',()=>openReports()],['inventory','Inventory',()=>openInventory()],
  ['defense','Defense',()=>openDefense()],['research','Research',()=>openResearch()],['settings','Settings',()=>openSettings()]];
function settingsPanel(){
  return `<h2>${_t('Settings')}</h2><h3>${_t('Language')}</h3><div class="menug">${LANGS.map(([c,n])=>`<button class="sbtn mitem${c===LANG?' on':''}" data-act="lang" data-l="${c}"><em>${n}</em>${c===LANG?' '+IC.ok:''}</button>`).join('')}</div>
  <h3>${_t('Test tools')}</h3><p class="sub" style="margin-bottom:8px">${_t('Erase your save and restart from zero. This option will be removed in the final game.')}</p>
  <button class="sec" data-act="reset">${IC.settings} ${_t('Reset save')}</button>${ONLINE?`<h3>${_t('Account')}</h3><p class="sub">${_t('Logged in as {n}',{n:NET.name})}</p><button class="sec" data-act="logout">${IC.back} ${_t('Log out')}</button>`:''}`; }
function openSettings(){ cur='__settings'; openedAt=Date.now(); renderSheet(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function menuPanel(){ return `<h2>${_t('Menu')}</h2><div class="menug">${MENU.map((m,i)=>`<button class="sbtn mitem" data-act="menu" data-i="${i}"><span>${IC[m[0]]}</span><em>${_t(m[1])}</em></button>`).join('')}${isStaff()?`<button class="sbtn mitem" data-act="openadmin"><span>${IC.crown}</span><em>${_t('Administration')}</em></button>`:''}</div>`; }
function openMenu(){ cur='__menu'; openedAt=Date.now(); renderSheet(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function liveSheet(){ liveIn(document.getElementById('sheet')); }
function openTroops(){ cur='__troops'; openedAt=Date.now(); renderSheet(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }


// =====================================================================
// ===== WORLD MAP (750 x 750 tiles, generated from a fixed seed) =====
// =====================================================================
const MAPN = 750, TW = 180, TH = 90;           // map size, tile size on screen (2:1 isometric)
const MSPR = {"forest": {"img": "assets/img/forest.webp", "r": 0.9195, "cy": 0.5212}, "hills": {"img": "assets/img/hills.webp", "r": 0.8312, "cy": 0.4727}, "ore": {"img": "assets/img/ore.webp", "r": 0.8453, "cy": 0.4821}, "oil": {"img": "assets/img/oil.webp", "r": 0.8367, "cy": 0.458}, "farm": {"img": "assets/img/farm.webp", "r": 0.8604, "cy": 0.4722}, "plain": {"img": "assets/img/plain.webp", "r": 0.809, "cy": 0.441}, "camp1": {"img": "assets/img/camp1.webp", "r": 0.7448, "cy": 0.4115}, "camp2": {"img": "assets/img/camp2.webp", "r": 0.7728, "cy": 0.4322}, "camp3": {"img": "assets/img/camp3.webp", "r": 0.903, "cy": 0.5166}, "camp4": {"img": "assets/img/camp4.webp", "r": 0.8847, "cy": 0.5099}, "home": {"img": "assets/img/home.webp", "r": 0.7579, "cy": 0.461}, "ground": {"img": "assets/img/ground.jpg"}, "forest_1": {"img": "assets/img/forest_1.webp", "r": 0.7791, "cy": 0.433}, "forest_2": {"img": "assets/img/forest_2.webp", "r": 0.8484, "cy": 0.4734}, "forest_3": {"img": "assets/img/forest_3.webp", "r": 0.9087, "cy": 0.5023}, "forest_4": {"img": "assets/img/forest_4.webp", "r": 0.9187, "cy": 0.4646}, "forest_5": {"img": "assets/img/forest_5.webp", "r": 0.9636, "cy": 0.5378}, "forest_6": {"img": "assets/img/forest_6.webp", "r": 0.9923, "cy": 0.4672}, "forest_7": {"img": "assets/img/forest_7.webp", "r": 1.1942, "cy": 0.6298}, "forest_8": {"img": "assets/img/forest_8.webp", "r": 1.3417, "cy": 0.6615}, "forest_9": {"img": "assets/img/forest_9.webp", "r": 1.2805, "cy": 0.6476}, "forest_10": {"img": "assets/img/forest_10.webp", "r": 1.3268, "cy": 0.6647}, "hills_1": {"img": "assets/img/hills_1.webp", "r": 0.7695, "cy": 0.4112}, "hills_2": {"img": "assets/img/hills_2.webp", "r": 0.8395, "cy": 0.4559}, "hills_3": {"img": "assets/img/hills_3.webp", "r": 0.9253, "cy": 0.5112}, "hills_4": {"img": "assets/img/hills_4.webp", "r": 0.9756, "cy": 0.5333}, "hills_5": {"img": "assets/img/hills_5.webp", "r": 1.0442, "cy": 0.5615}, "hills_6": {"img": "assets/img/hills_6.webp", "r": 0.7373, "cy": 0.4655}, "hills_7": {"img": "assets/img/hills_7.webp", "r": 0.7585, "cy": 0.4804}, "hills_8": {"img": "assets/img/hills_8.webp", "r": 0.7521, "cy": 0.4804}, "hills_9": {"img": "assets/img/hills_9.webp", "r": 0.7521, "cy": 0.4804}, "hills_10": {"img": "assets/img/hills_10.webp", "r": 0.8017, "cy": 0.5158}, "ore_1": {"img": "assets/img/ore_1.webp", "r": 0.6776, "cy": 0.4096}, "ore_2": {"img": "assets/img/ore_2.webp", "r": 0.6875, "cy": 0.4242}, "ore_3": {"img": "assets/img/ore_3.webp", "r": 0.6888, "cy": 0.4277}, "ore_4": {"img": "assets/img/ore_4.webp", "r": 0.7727, "cy": 0.492}, "ore_5": {"img": "assets/img/ore_5.webp", "r": 0.8008, "cy": 0.5026}, "ore_6": {"img": "assets/img/ore_6.webp", "r": 0.755, "cy": 0.4521}, "ore_7": {"img": "assets/img/ore_7.webp", "r": 0.8683, "cy": 0.5261}, "ore_8": {"img": "assets/img/ore_8.webp", "r": 0.8618, "cy": 0.5236}, "ore_9": {"img": "assets/img/ore_9.webp", "r": 0.8072, "cy": 0.4975}, "ore_10": {"img": "assets/img/ore_10.webp", "r": 0.9053, "cy": 0.5409}, "oil_1": {"img": "assets/img/oil_1.webp", "r": 0.702, "cy": 0.4186}, "oil_2": {"img": "assets/img/oil_2.webp", "r": 0.7029, "cy": 0.4167}, "oil_3": {"img": "assets/img/oil_3.webp", "r": 0.7042, "cy": 0.4201}, "oil_4": {"img": "assets/img/oil_4.webp", "r": 0.7458, "cy": 0.4525}, "oil_5": {"img": "assets/img/oil_5.webp", "r": 0.7427, "cy": 0.4581}, "oil_6": {"img": "assets/img/oil_6.webp", "r": 0.7033, "cy": 0.4162}, "oil_7": {"img": "assets/img/oil_7.webp", "r": 0.7025, "cy": 0.4235}, "oil_8": {"img": "assets/img/oil_8.webp", "r": 0.7066, "cy": 0.4211}, "oil_9": {"img": "assets/img/oil_9.webp", "r": 0.7025, "cy": 0.4235}, "oil_10": {"img": "assets/img/oil_10.webp", "r": 0.8559, "cy": 0.5347}, "farm_1": {"img": "assets/img/farm_1.webp", "r": 0.7735, "cy": 0.3978}, "farm_2": {"img": "assets/img/farm_2.webp", "r": 0.794, "cy": 0.4108}, "farm_3": {"img": "assets/img/farm_3.webp", "r": 0.8186, "cy": 0.433}, "farm_4": {"img": "assets/img/farm_4.webp", "r": 0.8205, "cy": 0.4323}, "farm_5": {"img": "assets/img/farm_5.webp", "r": 0.8255, "cy": 0.4381}, "farm_6": {"img": "assets/img/farm_6.webp", "r": 0.7114, "cy": 0.44}, "farm_7": {"img": "assets/img/farm_7.webp", "r": 0.7107, "cy": 0.4302}, "farm_8": {"img": "assets/img/farm_8.webp", "r": 0.7107, "cy": 0.4244}, "farm_9": {"img": "assets/img/farm_9.webp", "r": 0.8182, "cy": 0.4545}, "farm_10": {"img": "assets/img/farm_10.webp", "r": 0.8745, "cy": 0.5297}};                           // tile pictures (Gemini art)
const MIMG = {}; for(const k in MSPR){ const im=new Image(); im.onload=()=>{ if(view==='map') drawMap(); }; im.src=MSPR[k].img; MIMG[k]=im; }
const TILE = {
  forest:{name:'Forest', res:'wood'}, hills:{name:'Rocky Hills', res:'stone'}, ore:{name:'Metal Deposit', res:'metal'},
  oil:{name:'Oil Field', res:'fuel'}, farm:{name:'Farmland', res:'rations'}, plain:{name:'Plains'}, camp:{name:'Raider Camp'}, home:{name:'Your base'}
};
function hash(x,y,s){ let h=(Math.imul(x,374761393)+Math.imul(y,668265263)+Math.imul(s,982451653))|0; h=Math.imul(h^(h>>>13),1274126177); h^=h>>>16; return (h>>>0)/4294967296; }
// What is on tile (x, y)? null = empty ground
const tileCache=new Map();
function tileAt(x,y){
  if(x<1||y<1||x>MAPN||y>MAPN) return null;
  if(x===state.pos.x && y===state.pos.y) return {t:'home', lvl:playerLevel(totalPower())};
  const ck=x*1024+y, op=ONLINE && NET.others.get(ck); if(op) return {t:'player', lvl:op.lvl, name:op.name, power:op.power, alliance:op.alliance||null}; if(tileCache.has(ck)) return tileCache.get(ck);
  if(tileCache.size>60000) tileCache.clear();
  const res=tileGen(x,y); tileCache.set(ck,res); return res;
}
function tileGen(x,y){
  if(x%2 || y%2) return null;                       // tiles sit on every other square: always grass around them
  if(hash(x,y,1)<0.08) return null;                 // a few empty spots
  const t=mixType(x,y);
  return t==='plain' ? {t} : {t, lvl:1+Math.min(9,Math.floor(10*Math.pow(hash(x,y,2),1.9)))};
}
// Types are spread evenly: a tile never copies the type of the tiles just before it
const TYPES=['forest','hills','ore','oil','farm','camp','plain'], TW8=[16,16,15,14,16,14,9];
function rawType(x,y){ let r=hash(x,y,3)*100; for(let i=0;i<TYPES.length;i++){ r-=TW8[i]; if(r<0) return i; } return 0; }
function mixType(x,y){ let i=rawType(x,y); const avoid=new Set([rawType(x-2,y),rawType(x,y-2),rawType(x-2,y-2),rawType(x+2,y-2)]);
  for(let k=0;k<TYPES.length && avoid.has(i);k++) i=(i+1+Math.floor(hash(x,y,4+k)*3))%TYPES.length;
  return TYPES[i]; }
const campSpr = l => l<=2?'camp1': l<=5?'camp2': l<=8?'camp3':'camp4';
// picture for a tile: its own level picture when it exists (forest_7...), otherwise the generic one
const sprKey = tl => !tl ? 'plain' : tl.t==='player' ? 'home' : tl.t==='camp' ? campSpr(tl.lvl) : (tl.lvl && MSPR[tl.t+'_'+tl.lvl]) ? tl.t+'_'+tl.lvl : tl.t;
const tileName = tl => tl.t==='home' ? _t('Your base') : tl.t==='player' ? _t('Base of {n}',{n:tl.name}) : _t(TILE[tl.t].name)+(tl.lvl&&tl.t!=='plain' ? ' · '+_t('Lv')+' '+tl.lvl : '');
const place = (x,y) => { const tl=tileAt(x,y)||{t:'plain'}; return `${tileName(tl)} (${x}, ${y})`; };
const dist = (x,y) => Math.hypot(x-state.pos.x, y-state.pos.y);

// enemy forces guarding a tile
function defenders(tl){
  if(!tl || !tl.lvl || tl.t==='home' || tl.t==='player' || tl.t==='plain') return {};
  const L=tl.lvl, camp=tl.t==='camp', budget=40*Math.pow(2.05,L-1)*(camp?3:1);
  // raider camps field a real mixed army: infantry, snipers, vehicles and air units at higher levels
  const CAMP_MIX=[null,
    {recruit:.55,rifleman:.45}, {recruit:.35,rifleman:.40,sniper:.25}, {recruit:.25,rifleman:.30,sniper:.25,assault:.20},
    {rifleman:.30,sniper:.25,assault:.25,apc:.20}, {rifleman:.20,sniper:.20,assault:.25,apc:.15,heli:.20},
    {sniper:.20,assault:.25,apc:.10,heli:.25,tank:.20}, {sniper:.15,assault:.20,heli:.20,tank:.25,artillery:.20},
    {assault:.20,heli:.15,tank:.30,artillery:.20,gunship:.15}, {assault:.15,tank:.35,artillery:.25,gunship:.25},
    {assault:.10,tank:.35,artillery:.25,gunship:.30}];
  const TILE_MIX=[null, {recruit:1}, {recruit:.6,rifleman:.4}, {recruit:.4,rifleman:.4,sniper:.2}, {rifleman:.5,sniper:.3,assault:.2},
    {rifleman:.35,sniper:.3,assault:.35}, {sniper:.3,assault:.4,apc:.3}, {sniper:.25,assault:.35,apc:.2,heli:.2},
    {assault:.35,apc:.2,heli:.25,tank:.2}, {assault:.3,heli:.25,tank:.3,artillery:.15}, {assault:.25,tank:.35,artillery:.2,gunship:.2}];
  const mix=(camp?CAMP_MIX:TILE_MIX)[L];
  const o={}; for(const u in mix) o[u]=Math.max(1,Math.round(budget*mix[u]/UNITS[u].pw)); return o;
}
// what an attack can bring back
function lootOf(tl){
  const L=tl.lvl, o={};
  // farming pays: a level 10 camp carries about 1 million of each resource
  if(tl.t==='camp'){ for(const r of ['metal','wood','stone','fuel']) o[r]=Math.round(600*Math.pow(2.3,L-1)); o.gold=Math.round(60*Math.pow(2.1,L-1)); }
  else if(TILE[tl.t].res) o[TILE[tl.t].res]=Math.round(600*Math.pow(2.2,L-1));
  return o;
}

// ---------- camera ----------
const mapc=document.createElement('canvas'); mapc.id='mapc'; document.getElementById('viewport').appendChild(mapc);
const mctx=mapc.getContext('2d');
let mcam=null, mapSel=null, groundPat=null;
const gImg=new Image(); gImg.onload=()=>{ groundPat=null; if(view==='map') drawMap(); }; gImg.src=MSPR.ground.img;
const cellW = (x,y) => [(x-y)*TW/2, (x+y)*TH/2];                    // tile centre in world pixels
function camCenter(x,y){ const [wx,wy]=cellW(x,y); mcam.x=wx; mcam.y=wy; clampCam(); }
function clampCam(){ mcam.z=Math.min(1.4,Math.max(0.4,mcam.z)); mcam.x=Math.max(-MAPN*TW/2,Math.min(MAPN*TW/2,mcam.x)); mcam.y=Math.max(TH,Math.min(MAPN*TH,mcam.y)); }
function screenToCell(sx,sy){ const v=vsize(), wx=(sx-v.w/2)/mcam.z+mcam.x, wy=(sy-v.h/2)/mcam.z+mcam.y;
  const a=wx/(TW/2), b=wy/(TH/2); return [Math.round((a+b)/2), Math.round((b-a)/2)]; }
const mapDpr = () => Math.min(1.5, window.devicePixelRatio||1);
function resizeMap(){ const v=vsize(), d=mapDpr(); mapc.width=Math.round(v.w*d); mapc.height=Math.round(v.h*d); mapc.style.width=v.w+'px'; mapc.style.height=v.h+'px'; }
let mapRaf=0; function requestDraw(){ if(mapRaf) return; mapRaf=requestAnimationFrame(()=>{ mapRaf=0; drawMap(); }); }
function mapZoomAt(f,sx,sy){ const v=vsize(), z0=mcam.z; const wx=(sx-v.w/2)/z0+mcam.x, wy=(sy-v.h/2)/z0+mcam.y;
  mcam.z*=f; clampCam(); mcam.x=wx-(sx-v.w/2)/mcam.z; mcam.y=wy-(sy-v.h/2)/mcam.z; clampCam(); requestDraw(); updateCoords(); }
function mapPan(dx,dy){ mcam.x-=dx/mcam.z; mcam.y-=dy/mcam.z; clampCam(); requestDraw(); updateCoords(); }
function updateCoords(){ const v=vsize(), [x,y]=screenToCell(v.w/2,v.h/2), ix=document.getElementById('cxi'), iy=document.getElementById('cyi');
  if(document.activeElement!==ix) ix.value=Math.max(1,Math.min(MAPN,x)); if(document.activeElement!==iy) iy.value=Math.max(1,Math.min(MAPN,y)); }

// ---------- drawing ----------
const sprCache=new Map();
function sprite(key, im, w, h, z, d){ const pw=Math.max(8,Math.round(w*z*d)), ck=key+'|'+pw; let cv=sprCache.get(ck);
  if(!cv){ if(sprCache.size>400) sprCache.clear(); cv=document.createElement('canvas'); cv.width=pw; cv.height=Math.max(8,Math.round(h*z*d));
    const g=cv.getContext('2d'); g.imageSmoothingQuality='high'; g.drawImage(im,0,0,cv.width,cv.height); sprCache.set(ck,cv); }
  return cv; }
const badgeCache=new Map();
function badgeSprite(txt,col){ const k=txt+col; let cv=badgeCache.get(k); if(cv) return cv;
  cv=document.createElement('canvas'); const g=cv.getContext('2d'); g.font='700 15px "Black Ops One", Impact, sans-serif';
  const star=txt.startsWith('* '); if(star) txt=txt.slice(2);
  const w=Math.max(24,g.measureText(txt).width+12)+(star?18:0); cv.width=Math.ceil(w+6)*2; cv.height=56; g.scale(2,2);
  if(star){ badge(g,cv.width/4,14,'    '+txt,col); if(starImg.complete) g.drawImage(starImg,cv.width/4-w/2+3,3,22,22); else starImg.onload=()=>{ badgeCache.clear(); chunkCache.clear(); requestDraw(); }; }
  else badge(g,cv.width/4,14,txt,col);
  badgeCache.set(k,cv); return cv; }
const starImg=new Image(); starImg.src='assets/img/ui_star.webp';
document.fonts && document.fonts.ready.then(()=>{ badgeCache.clear(); chunkCache.clear(); if(view==='map') requestDraw(); });
function badge(c,x,y,txt,col){ c.font='700 15px "Black Ops One", Impact, sans-serif'; const w=Math.max(24,c.measureText(txt).width+12);
  c.fillStyle=col; c.strokeStyle='#3a2604'; c.lineWidth=2.5; c.beginPath(); c.roundRect(x-w/2,y-12,w,24,5); c.fill(); c.stroke();
  c.fillStyle='#241803'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,x,y+1); }
// ---------- map chunks: squares of 512 world pixels drawn once per zoom step, then reused ----------
const CHUNK=512, chunkCache=new Map(); let lastHomeLvl=-1;
const chunkW = zb => CHUNK/Math.min(zb,1);   // zoomed out: bigger squares, so there are always few of them on screen (about 512 pixels each)
const zBucket = z => Math.pow(2, Math.round(Math.log2(z)*3)/3);     // zoom steps of about 26%
function resetTiles(){ tileCache.clear(); chunkCache.clear(); }
function renderChunk(cx,cy,zb,d){
  const CW=chunkW(zb), zr=Math.min(zb,1)*d, size=Math.ceil(CW*zr), cv=document.createElement('canvas'); cv.width=cv.height=size;
  const g=cv.getContext('2d'), X0=cx*CW, Y0=cy*CW; g.setTransform(zr,0,0,zr,-X0*zr,-Y0*zr);
  // cells whose picture can reach this square (pictures stand up to 3 tiles high)
  const toCell=(wx,wy)=>{ const a=wx/(TW/2), b=wy/(TH/2); return [(a+b)/2,(b-a)/2]; };
  const cs=[toCell(X0-TW,Y0-TH),toCell(X0+CW+TW,Y0-TH),toCell(X0-TW,Y0+CW+TH*3.5),toCell(X0+CW+TW,Y0+CW+TH*3.5)];
  const gx0=Math.max(1,Math.floor(Math.min(...cs.map(p=>p[0])))), gx1=Math.min(MAPN,Math.ceil(Math.max(...cs.map(p=>p[0]))));
  const gy0=Math.max(1,Math.floor(Math.min(...cs.map(p=>p[1])))), gy1=Math.min(MAPN,Math.ceil(Math.max(...cs.map(p=>p[1]))));
  let ok=true; const badges=[];
  for(let s=gx0+gy0; s<=gx1+gy1; s++){
    for(let x=Math.max(gx0,s-gy1); x<=Math.min(gx1,s-gy0); x++){
      const y=s-x, tl=tileAt(x,y); if(!tl) continue;
      const [wx,wy]=cellW(x,y); if(wx<X0-TW||wx>X0+CW+TW||wy<Y0-TH||wy>Y0+CW+TH*3.5) continue;
      const key=sprKey(tl), sp=MSPR[key], im=MIMG[key];
      const w=TW*(tl.t==='home'||tl.t==='player'?1.3: tl.t==='camp'?1.2:1.12), h=w*sp.r;
      if(im.complete && im.naturalWidth) g.drawImage(sprite(key,im,w,h,zr,1), wx-w/2, wy-sp.cy*h, w, h); else ok=false;
      if(tl.t==='home') badges.push([wx, wy+TH*0.42, '* '+tl.lvl, '#7fd06a']);
      else if(tl.t==='player') badges.push([wx, wy+TH*0.42, tl.name+' · '+tl.lvl, '#e0574a']);
      else if(tl.lvl && tl.t!=='plain' && zb>0.42) badges.push([wx+w*0.3, wy+TH*0.2, String(tl.lvl), tl.t==='camp'?'#e0574a':'#f3c534']);
    }
  }
  const bs=Math.min(1.25,Math.max(0.8,1/zb));
  for(const [bx2,by2,t,col] of badges){ const b=badgeSprite(t,col), bw=b.width/2*bs, bh=b.height/2*bs; g.drawImage(b, bx2-bw/2, by2-bh/4-6*bs, bw, bh); }
  return {cv, ok}; }
function drawMap(){
  if(view!=='map' || !mcam) return;
  const v=vsize(), d=mapDpr(), c=mctx, z=mcam.z;
  c.setTransform(1,0,0,1,0,0); c.fillStyle='#22281c'; c.fillRect(0,0,mapc.width,mapc.height);
  c.setTransform(z*d,0,0,z*d,(v.w/2-mcam.x*z)*d,(v.h/2-mcam.y*z)*d);
  const x0=mcam.x-v.w/2/z, y0=mcam.y-v.h/2/z, x1=mcam.x+v.w/2/z, y1=mcam.y+v.h/2/z;
  // ground inside the map diamond, dark outside
  const [ax,ay]=cellW(0.5,0.5), [bx,by]=cellW(MAPN+.5,0.5), [cx,cy]=cellW(MAPN+.5,MAPN+.5), [dx,dy]=cellW(0.5,MAPN+.5);
  c.save(); c.beginPath(); c.moveTo(ax,ay); c.lineTo(bx,by); c.lineTo(cx,cy); c.lineTo(dx,dy); c.closePath(); c.clip();
  if(gImg.complete && gImg.naturalWidth){ if(!groundPat) groundPat=c.createPattern(gImg,'repeat'); c.fillStyle=groundPat; } else c.fillStyle='#5b6a35';
  c.fillRect(x0,y0,x1-x0,y1-y0); c.restore();
  c.strokeStyle='#e0b63e88'; c.lineWidth=4/z; c.beginPath(); c.moveTo(ax,ay); c.lineTo(bx,by); c.lineTo(cx,cy); c.lineTo(dx,dy); c.closePath(); c.stroke();
  // tiles come from pre-drawn pieces of the map (chunks): moving the map only copies a few pictures
  const hl=playerLevel(totalPower()); if(hl!==lastHomeLvl){ lastHomeLvl=hl; chunkCache.clear(); }
  const zb=zBucket(z), CW=chunkW(zb), cx0=Math.floor(x0/CW), cx1=Math.floor(x1/CW), cy0=Math.floor(y0/CW), cy1=Math.floor(y1/CW);
  let budget=6, missing=false;
  for(let cy=cy0; cy<=cy1; cy++) for(let cx=cx0; cx<=cx1; cx++){
    const k=cx+','+cy+','+zb+','+d; let ch=chunkCache.get(k);
    if(ch){ chunkCache.delete(k); chunkCache.set(k,ch); }                 // most recently used goes last
    else if(budget>0){ budget--; ch=renderChunk(cx,cy,zb,d); if(ch.ok){ chunkCache.set(k,ch); if(chunkCache.size>160) chunkCache.delete(chunkCache.keys().next().value); } else missing=true; }
    else { missing=true; continue; }
    c.drawImage(ch.cv, cx*CW, cy*CW, CW, CW);
  }
  if(missing) requestDraw();
  if(mapSel){ const [sx,sy]=cellW(mapSel.x,mapSel.y); c.fillStyle='#ffd54a22'; c.strokeStyle='#ffd54a'; c.lineWidth=3/z;
    c.beginPath(); c.moveTo(sx-TW/2,sy); c.lineTo(sx,sy-TH/2); c.lineTo(sx+TW/2,sy); c.lineTo(sx,sy+TH/2); c.closePath(); c.fill(); c.stroke(); }
  // marches: dashed line base -> target with a moving dot
  const [hx,hy]=cellW(state.pos.x,state.pos.y);
  for(const m of state.marches){ const [tx2,ty2]=cellW(m.x,m.y);
    const p = m.st==='out' ? pct(m.s,m.a)/100 : 1-pct(m.a,m.b)/100;
    c.setLineDash([14/z,10/z]); c.strokeStyle=m.st==='out'?'#ff6a3d':'#7fd06a'; c.lineWidth=4/z; c.beginPath(); c.moveTo(hx,hy); c.lineTo(tx2,ty2); c.stroke(); c.setLineDash([]);
    c.fillStyle=c.strokeStyle; c.beginPath(); c.arc(hx+(tx2-hx)*p, hy+(ty2-hy)*p, 9/z, 0, 7); c.fill(); }
}

// ---------- tile panel ----------
function tilePanel(){
  const {x,y}=mapSel, tl=tileAt(x,y), key = sprKey(tl);
  let h=`<div class="hd"><div class="big"><img class="bimg" src="${MSPR[key].img}" alt=""></div><div><h2>${tl?tileName(tl):_t('Plains')}</h2>
    <div class="sub">X ${x} · Y ${y} · ${_t('Distance: {d} tiles',{d:dist(x,y).toFixed(1)})}</div></div></div>`;
  if(!tl || tl.t==='plain') return h+`<p>${_t('Empty land. Nothing to collect here.')}</p>`;
  if(tl.t==='home') return h+playerCard(ONLINE&&NET.name ? NET.name : _t('You'), tl.lvl, totalPower(), null)+`<button data-act="gocity">${IC.base} ${_t('Enter base')}</button>`;
  if(tl.t==='player') return h+playerCard(tl.name, tl.lvl, tl.power, tl.alliance)
    +`<button disabled>${IC.atk} ${_t('Attack')}</button><div class="why">${_t('Attacks between players arrive in the next update.')}</div>`;
  const df=defenders(tl), lo=lootOf(tl);
  h+=`<h3>${_t('Enemy forces')}</h3><div class="armyg">${Object.keys(df).map(u=>`<div class="acell"><img src="${UNITS[u].img}" alt=""><b>${fmtN(df[u])}</b><span>${_t(UNITS[u].name)}</span></div>`).join('')}</div>
    <h3>${_t('Possible loot')}</h3><div class="chips">${Object.keys(lo).map(r=>`<span class="chip">${ICON[r]} ${fmtN(lo[r])}</span>`).join('')}</div>
    <h3>${_t('Bonus rewards (chance)')}</h3><div class="chips">${dropTable(tl).map(({r,p})=>`<span class="chip">${IC.drop} ${_t(r.name)} : ${(Math.round(p*1000)/10).toLocaleString(LANG)} %</span>`).join('')}${partChance(tl)?`<span class="chip">${IC.titan_ic} ${_t('Titan part (with the Titan)')} : ${Math.round(partChance(tl)*100)} %</span>`:''}</div>
    <button data-act="attack">${IC.atk} ${_t('Attack')}</button>`;
  return h;
}

// commander card of a base on the map: name, level, power and alliance
function playerCard(name, lvl, power, alliance){
  const row=(ic,label,val,cls)=>`<div class="pcrow"><span>${ic} ${label}</span><b${cls?` class="${cls}"`:''}>${val}</b></div>`;
  return `<div class="pcard">${row(IC.crown,_t('Commander'),esc(name))}${row(IC.star,_t('Commander level'),fmtI(lvl))}${row(IC.power,_t('Power'),fmtI(power||0),'pw')}
    ${row(IC.defense,_t('Alliance'),alliance?esc(alliance):_t('No alliance'),alliance?'':'none')}</div>`; }
const esc = t => String(t).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// ---------- attack: choose troops ----------
const atkQty={}; let atkTitan=false;
const marchMax = () => Math.max(1, Math.min(5, bldLevel('rally')));
const marchTroopMax = () => Math.max(1, bldLevel('rally'))*1000;
function marchStats(q, ti){ let n=0, load=0, slow=Infinity; for(const u in q){ const k=q[u]||0; if(!k) continue; n+=k; load+=k*UNITS[u].ld; slow=Math.min(slow,UNITS[u].sp); }
  if(ti){ const st=titanStats(); load+=st.ld; slow=Math.min(slow,st.sp); }
  load=Math.round(load*(1+techB('logistics'))); slow*=1+techB('engines');
  return {n, load, secs: (n||ti) ? Math.max(10, Math.round(dist(mapSel.x,mapSel.y)*6000/slow)) : 0}; }
function whyNotMarch(q){
  if(!bldLevel('rally')) return _t('Build a {b} first',{b:_t('Rally Point')});
  const st=marchStats(q, atkTitan); if(!st.n && !atkTitan) return _t('Choose your troops');
  if(atkTitan && !titanReady()) return _t('Titan unavailable');
  if(state.marches.length>=marchMax()) return _t('All marches are busy ({n} max)',{n:marchMax()});
  if(st.n>marchTroopMax()) return _t('Too many troops for one march (max {n})',{n:fmtN(marchTroopMax())});
  for(const u in q) if((q[u]||0)>(state.troops[u]||0)) return _t('Choose your troops');
  return ''; }
function atkSummary(){ const st=marchStats(atkQty, atkTitan), why=whyNotMarch(atkQty);
  return `<div class="chips"><span class="chip">${IC.troops} ${_t('Troops: {a} / {b}',{a:fmtN(st.n),b:fmtN(marchTroopMax())})}</span><span class="chip">${IC.time} ${_t('Travel time: {t}',{t:fmtT(st.secs)})}</span><span class="chip">${IC.load} ${_t('Carry capacity: {n}',{n:fmtN(st.load)})}</span><span class="chip">${_t('Marches: {a} / {b}',{a:state.marches.length,b:marchMax()})}</span></div>
    <button data-act="launch"${why?' disabled':''}>${IC.atk} ${_t('Launch attack')}</button>${why&&(st.n||atkTitan)?`<div class="why">${why}</div>`:''}`; }
function attackPanel(){
  const own=UNIT_ORDER.filter(u=>(state.troops[u]||0)>0);
  let h=`<h2>${_t('Send troops')}</h2><div class="sub">→ ${place(mapSel.x,mapSel.y)}</div>`;
  if(bldLevel('hangar')){ const T=titanState(), ok=titanReady();
    h+=`<div class="row trow-t${atkTitan?' on':''}"><div class="top"><img class="uimg" src="${titanImg()}" alt=""><div style="flex:1;min-width:0"><b>${_t('Titan')}</b>
      <div class="sub">${_t('Lv {l} · Health {h}%',{l:T.lvl,h:Math.floor(T.hp)})} · ${IC.troops} +${Math.round(titanTroopBonus()*100)}% ${_t('troop attack')}</div>
      <button class="${atkTitan?'':'sec '}sm" data-act="ttoggle"${ok?'':' disabled'}>${atkTitan?IC.ok+' ':''}${_t(ok?'Send the Titan':'Titan unavailable')}</button></div></div></div>`; }
  if(!own.length && !titanReady()) return h+`<p style="margin-top:10px">${_t('You have no troops. Train some at the Barracks.')}</p>`;
  for(const u of own){ const d=UNITS[u];
    h+=`<div class="row"><div class="top"><img class="uimg" src="${d.img}" alt=""><div style="flex:1;min-width:0"><b>${_t(d.name)}</b><div class="sub">${_t('Available: {n}',{n:fmtN(state.troops[u])})}</div>
      <div class="trow2"><input type="number" min="0" inputmode="numeric" data-mq="${u}" value="${atkQty[u]||''}" placeholder="0"><button class="sec sm" data-act="mmax" data-unit="${u}">${_t('Max')} ${fmtN(state.troops[u])}</button></div></div></div></div>`; }
  return h+`<div id="atk-sum">${atkSummary()}</div>`; }
function launch(){
  if(whyNotMarch(atkQty)) return;
  const q={}; for(const u in atkQty) if(atkQty[u]>0){ q[u]=atkQty[u]; state.troops[u]-=atkQty[u]; }
  const ti=atkTitan && titanReady(), st=marchStats(q, ti), now=Date.now();
  state.marches.push({id:now, x:mapSel.x, y:mapSel.y, troops:q, titan:ti, s:now, a:now+st.secs*1000, b:now+st.secs*2000, st:'out'});
  if(ti) titanState().away=true;
  for(const u in atkQty) delete atkQty[u]; atkTitan=false;
  save(); toast(IC.atk+' '+_t('Troops sent to {p}',{p:`(${mapSel.x}, ${mapSel.y})`})); closeSheet(); renderAll(); drawMap(); }

// ---------- battle ----------
function battle(att, def, titan){
  const A={...att}, D={...def}, TS=titan?titanStats():null, bonus=titan?1+titanTroopBonus():1;
  if(titan) A.titan=1;
  const tA=(1+techB('ballistics'))*(boostOn('atk')?1.2:1), tD=(1+techB('armor'))*(boostOn('def')?1.2:1), tH=1+techB('medicine'), MY={};
  for(const u in UNITS){ const d=UNITS[u]; MY[u]={...d, at:d.at*tA, df:d.df*tD, hp:d.hp*tH}; }
  const U=u=>u==='titan'?TS:UNITS[u], UM=u=>u==='titan'?TS:MY[u], sum=o=>Object.keys(o).reduce((a,u)=>a+(u==='titan'?(o[u]>0.05?1:0):o[u]),0);
  const hit=(from,to,round,mine)=>{ // damage spread over the enemy units according to their total health
    const Uf=mine?UM:U, Ut=mine?U:UM;
    let dmg=0; for(const u in from){ const d=Uf(u); if(round===0 && !d.rg) continue; dmg+=from[u]*d.at*(round===0?1.5:1)*(mine&&u!=='titan'?bonus:1); }
    const hpTot=Object.keys(to).reduce((s,u)=>s+to[u]*Ut(u).hp,0); if(!hpTot) return {};
    const k={}; for(const u in to){ const d=Ut(u), share=to[u]*d.hp/hpTot; k[u]=Math.min(to[u], dmg*share*(100/(100+d.df))/d.hp); } return k; };
  for(let r=0;r<200 && sum(A)>0.5 && sum(D)>0.5;r++){
    const kd=hit(A,D,r,true), ka=hit(D,A,r,false);
    for(const u in kd) D[u]=Math.max(0,D[u]-kd[u]); for(const u in ka) A[u]=Math.max(0,A[u]-ka[u]); }
  const tLeft = titan ? Math.max(0,A.titan) : 1; delete A.titan;
  const ri=o=>{ const x={}; for(const u in o) x[u]=o[u]<0.5?0:Math.round(o[u]); return x; };
  const left=ri(A), dleft=ri(D), tAlive=titan && tLeft>0.05;
  const win=sum(dleft)===0 && (sum(left)>0 || tAlive);
  return {win, left, dleft, tLeft}; }
function arrive(m){
  const tl=tileAt(m.x,m.y), df=defenders(tl), res=battle(m.troops,df,m.titan), loot={};
  let tinfo=null;
  if(m.titan){ const T=titanState(), h0=T.hp, killed=Object.keys(df).reduce((s,u)=>s+(df[u]-(res.dleft[u]||0))*UNITS[u].pw,0);
    T.hp=Math.max(5, T.hp*(0.35+0.65*res.tLeft)); const xp=Math.round(killed*(res.win?6:2)+(res.win?20*tl.lvl:0)), up=gainXp(xp);
    const drop=res.win?rollDrop(tl):null; if(drop){ T.inv.push(drop); toast(IC.drop+' '+_t('New part won: {p}',{p:_t(EQ_NAME[drop.s])+' · '+_t(EQ_TIER[drop.t])})); }
    tinfo={xp, hp0:Math.floor(h0), hp:Math.floor(T.hp), up, drop}; }
  if(res.win){ let cap=(Object.keys(res.left).reduce((s,u)=>s+res.left[u]*UNITS[u].ld,0)+(m.titan?titanStats().ld:0))*(1+techB('logistics')); const lo=lootOf(tl), tot=Object.values(lo).reduce((a,b)=>a+b,0);
    for(const r in lo){ loot[r]=Math.floor(Math.min(lo[r], cap*lo[r]/Math.max(1,tot))); } }
  const items = res.win ? rollItems(tl) : [];
  for(const id of items) addItem(id);
  if(items.length) setTimeout(()=>toast(IC.drop+' '+_t('Items won: {i}',{i:items.map(itemName).join(', ')})), 2300);
  if(res.win){ const ss=statsState(); ss.wins=(ss.wins||0)+1; if(tl.t==='camp') ss.campWins=(ss.campWins||0)+1; }
  const rep={id:m.id, t:Date.now(), x:m.x, y:m.y, tt:tl.t, lvl:tl.lvl, win:res.win, sent:m.troops, left:res.left, def:df, dleft:res.dleft, loot, items, titan:tinfo, read:false};
  state.reports.unshift(rep); state.reports=state.reports.slice(0,40);
  toast((res.win?IC.win+' ':IC.lose+' ')+_t(res.win?'Victory at {p}':'Defeat at {p}',{p:place(m.x,m.y)}));
  const alive=Object.values(res.left).reduce((a,b)=>a+b,0);
  if(!alive && !m.titan){ state.marches=state.marches.filter(x=>x!==m); return; }
  m.st='back'; m.troops=res.left; m.loot=loot; }
function returnHome(m){
  for(const u in m.troops) state.troops[u]=(state.troops[u]||0)+m.troops[u];
  const c=cap(); for(const r in (m.loot||{})) state.res[r]= r==='gold' ? state.res[r]+m.loot[r] : Math.max(state.res[r], Math.min(c, state.res[r]+m.loot[r]));
  if(m.titan) titanState().away=false;
  state.marches=state.marches.filter(x=>x!==m); toast(IC.ok+' '+_t('Troops returned with loot')); }
function processMarches(){ const now=Date.now(); let ch=false;
  for(const m of [...state.marches]){ if(m.st==='out' && now>=m.a){ arrive(m); ch=true; } else if(m.st==='back' && now>=m.b){ returnHome(m); ch=true; } }
  if(ch){ save(); renderAll(); } }
function finishMarch(id){ const m=state.marches.find(x=>x.id==id); if(!m) return; const now=Date.now();
  if(m.st==='out'){ const tr=m.a-m.s; m.a=now; m.b=now+tr; } else m.b=now; processMarches(); }

// ---------- reports ----------
const ago = t => { const s=(Date.now()-t)/1000; return _t('{t} ago',{t:fmtT(s<60?s:Math.floor(s/60)*60)}); };
function unitList(o, o2, lab1, lab2){ return `<div class="armyg">${Object.keys(o).map(u=>`<div class="acell"><img src="${UNITS[u].img}" alt=""><b>${fmtN(o[u])}</b><span>${_t(UNITS[u].name)}</span><small style="color:var(--red)">${lab2} ${fmtN(o[u]-(o2[u]||0))}</small></div>`).join('')}</div>`; }
function reportsPanel(){
  let h=`<h2>${_t('Reports')}</h2>`;
  if(!state.reports.length) return h+`<p style="margin-top:10px">${_t('No reports yet.')}</p>`;
  for(const r of state.reports){ const open=r.id===openRep, nm=`${_t(TILE[r.tt].name)} · ${_t('Lv')} ${r.lvl} (${r.x}, ${r.y})`;
    h+=`<div class="row rep${r.read?'':' unread'}" data-act="rep" data-id="${r.id}"><div class="top"><div class="big" style="width:46px;height:46px;font-size:24px">${r.win?IC.win:IC.lose}</div>
      <div style="flex:1"><b style="color:${r.win?'var(--ok)':'var(--red)'}">${_t(r.win?'Victory':'Defeat')}</b> — ${nm}<div class="sub">${ago(r.t)}</div></div></div>`;
    if(open) h+=`<p style="margin-top:8px">${_t(r.win?'All enemy troops were destroyed.':'Your troops had to retreat.')}</p>
      <h3>${_t('Your troops')}</h3>${unitList(r.sent,r.left,_t('Sent'),_t('Lost'))}
      ${r.titan?`<div class="row"><div class="top"><img class="uimg" src="${titanImg()}" alt=""><div><b>${_t('Titan')}</b><div class="sub">${_t('Titan: {a} XP, health {b}%',{a:'+'+fmtN(r.titan.xp),b:r.titan.hp0+' → '+r.titan.hp})}</div>
        ${r.titan.drop?`<div style="display:flex;align-items:center;gap:8px;margin-top:4px">${eqIcon(r.titan.drop,36)}<span style="color:${EQ_COL[r.titan.drop.t]}">${_t(EQ_NAME[r.titan.drop.s])} · ${_t(EQ_TIER[r.titan.drop.t])}</span></div>`:''}</div></div></div>`:''}
      <h3>${_t('Enemy')} · ${_t('Raiders')}</h3>${unitList(r.def,r.dleft,'',_t('Killed'))}
      ${(r.items||[]).length?`<h3>${_t('Items won')}</h3><div class="itrow">${r.items.filter(id=>ITEMS[id]).map(id=>`<div class="itc">${itemIcon(id,48)}<span>${itemName(id)}</span></div>`).join('')}</div>`:''}
      ${Object.keys(r.loot).length?`<h3>${_t('Loot')}</h3><div class="chips">${Object.keys(r.loot).map(k=>`<span class="chip">${ICON[k]} ${fmtN(r.loot[k])}</span>`).join('')}</div>`:''}`;
    h+=`</div>`; }
  return h; }
let openRep=null;
function openPanel(id){ cur=id; openedAt=Date.now(); renderSheet(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function openReports(){ openPanel('__reports'); }
function updateRepBadge(){ const n=state.reports.filter(r=>!r.read).length, el=document.getElementById('repBadge'); if(el){ el.textContent=n; el.style.display=n?'':'none'; } }

// =====================================================================
// ===== TITAN (our Great Dragon): levels, health, equipment, battles =====
// =====================================================================
const EQ_SLOTS = ['armor','weapon','reactor','legs'];
const EQ_NAME = {armor:'Armor Plate', weapon:'Arm Cannon', reactor:'Jet Reactor', legs:'Armored Legs'};
const EQ_TIER = ['', 'Standard', 'Advanced', 'Elite'];
const EQ_BONUS = [0, 0.10, 0.22, 0.40];
const EQ_COL = ['', '#9aa39c', '#f3c534', '#ff8a3d'];
const EQ_EMOJI = {armor:IC.def, weapon:IC.atk, reactor:IC.spd, legs:IC.load};   // used only if a part picture is missing
const EQIMG = {}; for(const sl of ['armor','weapon','reactor','legs']) for(const t of [1,2,3]) EQIMG[sl+'_'+t]=`assets/img/eq_${sl}_${t}.webp`;   // painted icons (Gemini)
function titanState(){ if(!state.titan) state.titan={lvl:1, xp:0, hp:100, away:false, eq:{}, inv:[]}; if(state.titan.lvl>10) state.titan.lvl=10; return state.titan; }
const titanMax = () => Math.min(10, Math.max(1, bldLevel('hangar')));   // like the Great Dragon: level capped by its hangar, 10 max
const xpNeed = L => Math.round(600*Math.pow(L,2.4));
const tScale = L => L*(1+0.25*(L-1));   // stats grow faster at high level (level 10 = x32.5)
const eqB = slot => { const it=titanState().eq[slot]; return it ? EQ_BONUS[it.t] : 0; };
function titanStats(){ const T=titanState(), L=tScale(T.lvl)*(1+techB('robotics'));
  return { at: Math.round(450*L*(1+eqB('weapon'))), df: Math.round(150*L*(1+eqB('armor'))), hp: Math.round(2500*L*(1+eqB('armor')+eqB('legs')/2)),
           sp: Math.round(380*(1+eqB('reactor'))), ld: Math.round(300*L*(1+eqB('legs'))), rg:0, pw: Math.round(120*tScale(T.lvl)) }; }
const titanTroopBonus = () => 0.05*titanState().lvl;      // +5% attack for the troops marching with the Titan, per level (+50% at level 10)
const titanReady = () => { const T=titanState(); return bldLevel('hangar')>0 && !T.away && T.hp>=30; };
const repairRate = () => 5 + 2*bldLevel('hangar');         // health % repaired per hour at the hangar
function titanPower(){ if(!bldLevel('hangar')) return 0; const T=titanState(); let p=titanStats().pw; for(const s of EQ_SLOTS) if(T.eq[s]) p+=150*T.eq[s].t; return p; }
function eqIcon(it, size=46){ const src=EQIMG[it.s+'_'+it.t];
  return `<span class="eqi" style="width:${size}px;height:${size}px;border-color:${EQ_COL[it.t]}">${src?`<img src="${src}" alt="">`:EQ_EMOJI[it.s]}</span>`; }
function gainXp(n){ const T=titanState(); if(T.lvl>=titanMax()){ T.xp=Math.min(T.xp+n, xpNeed(T.lvl)); return 0; }
  T.xp+=n; let up=0; while(T.lvl<titanMax() && T.xp>=xpNeed(T.lvl)){ T.xp-=xpNeed(T.lvl); T.lvl++; up++; }
  if(up) toast(IC.titan_ic+' '+_t('Titan reached level {l}!',{l:T.lvl})); return up; }
function rollDrop(tl){
  if(tl.t!=='camp') return null; const L=tl.lvl, r=Math.random();
  if(r > partChance(tl)) return null;
  const q=Math.random(), t = L<=3 ? 1 : L<=6 ? (q<0.7?1:2) : L<=8 ? (q<0.55?2:3) : (q<0.4?2:3);
  return {id:Date.now()+Math.floor(Math.random()*1000), s:EQ_SLOTS[Math.floor(Math.random()*4)], t}; }
function equip(id){ const T=titanState(), i=T.inv.findIndex(x=>x.id==id); if(i<0) return; const it=T.inv[i];
  T.inv.splice(i,1); if(T.eq[it.s]) T.inv.push(T.eq[it.s]); T.eq[it.s]=it; save(); renderAll(); }
function unequip(slot){ const T=titanState(); if(!T.eq[slot]) return; T.inv.push(T.eq[slot]); delete T.eq[slot]; save(); renderAll(); }
function scrap(id){ const T=titanState(), i=T.inv.findIndex(x=>x.id==id); if(i<0) return; const it=T.inv[i]; T.inv.splice(i,1);
  const g=[0,150,600,2000][it.t]; state.res.gold+=g; toast(`${IC.gold} +${fmtN(g)}`); save(); renderAll(); }
function titanPanel(){
  const T=titanState(), st=titanStats(), need=xpNeed(T.lvl), stage=titanStage();
  let h=`<div class="hd"><div class="big tbig"><img class="bimg" src="${titanImg()}" alt=""></div><div style="flex:1">
      <h2>${_t('Titan')} · ${_t('Lv')} ${T.lvl} / ${titanMax()}</h2><div class="sub">${_t(['Prototype','Standard','Elite'][stage])} · ${IC.power} ${fmtN(titanPower())} ${_t('power')}</div>
      <div class="sub">${T.away?IC.atk+' '+_t('On a mission'):T.hp<30?IC.repair+' '+_t('Too damaged to fight (30% needed)'):IC.ok+' '+_t('Ready for battle')}</div></div></div>
    <div class="tbar"><span>XP</span><div class="prog"><i style="width:${Math.min(100,T.xp/need*100)}%"></i></div><small>${fmtN(T.xp)} / ${fmtN(need)}</small></div>
    <div class="tbar"><span>${IC.hp}</span><div class="prog hpb"><i style="width:${Math.floor(T.hp)}%"></i></div><small>${Math.floor(T.hp)}% · +${repairRate()}%/h</small></div>
    ${T.lvl>=titanMax()?`<div class="why">${_t('Upgrade the Titan Hangar to raise the maximum level.')}</div>`:''}
    <div class="ust" style="margin:8px 0"><span>${IC.atk} ${fmtN(st.at)}</span><span>${IC.def} ${fmtN(st.df)}</span><span>${IC.hp} ${fmtN(st.hp)}</span><span>${IC.spd} ${st.sp}</span><span>${IC.load} ${fmtN(st.ld)}</span><span>${IC.troops} +${Math.round(titanTroopBonus()*100)}% ${_t('troop attack')}</span></div>
    <h3>${_t('Equipment')}</h3><div class="eqgrid">${EQ_SLOTS.map(s=>{ const it=T.eq[s];
      return `<div class="eqslot">${it?eqIcon(it,58):`<span class="eqi empty" style="width:58px;height:58px"><img src="${EQIMG[s+'_1']}" alt="" style="filter:grayscale(1)"></span>`}<b>${_t(EQ_NAME[s])}</b>
        <small>${it?`<span style="color:${EQ_COL[it.t]}">${_t(EQ_TIER[it.t])}</span> · +${Math.round(EQ_BONUS[it.t]*100)}%`:_t('Empty')}</small>
        ${it?`<button class="sec sm" data-act="uneq" data-s="${s}">${_t('Remove')}</button>`:''}</div>`; }).join('')}</div>
    <h3>${_t('Parts inventory')} (${T.inv.length})</h3>`;
  if(!T.inv.length) h+=`<p class="sub">${_t('Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.')}</p>`;
  else h+=`<div class="eqgrid">${[...T.inv].sort((a,b)=>b.t-a.t).map(it=>`<div class="eqslot">${eqIcon(it,52)}<b>${_t(EQ_NAME[it.s])}</b><small style="color:${EQ_COL[it.t]}">${_t(EQ_TIER[it.t])} · +${Math.round(EQ_BONUS[it.t]*100)}%</small>
      <div style="display:flex;gap:4px"><button class="sm" data-act="equip" data-id="${it.id}">${_t('Equip')}</button><button class="sec sm" data-act="scrap" data-id="${it.id}" title="${_t('Scrap for gold')}">${IC.gold}</button></div></div>`).join('')}</div>`;
  return h; }
const titanStage = () => { const L=titanState().lvl; return L<=3?0: L<=7?1:2; };   // prototype 1-3, standard 4-7, elite 8-10
const TITAN_STAGES = {0:'assets/img/titan_0.webp', 1:'assets/img/titan_1.webp', 2:'assets/img/titan_2.webp'};   // prototype, standard, elite
const TITAN_R = {"0": 1.4231, "1": 1.586, "2": 1.4379};
const titanImg = () => TITAN_STAGES[titanStage()] || TITAN.img;
function openTitan(){ if(!bldLevel('hangar')){ setView('city'); openSlot('hangar'); return; } openPanel('__titan'); }

const TITAN = IMGS.titan; // the giant combat mech that lives in the Titan Hangar
// Animation anchor points, as fractions of each image (x, y)
const ANIM = {
  factory:{smoke:[0.845,0.09]},
  radar:{ping:[0.50,0.11], light:[0.62,0.13]},
  titan:{visor:[0.53,0.235]}
};
// Keeps an animation running smoothly even when the map is redrawn every second
const ph = (period, off=0) => `animation-delay:-${(((Date.now()/1000)+off)%period).toFixed(2)}s`;
function effect(t,l){
  if(B[t].field) return _t('Produces {i} {n} {r} per hour',{i:ICON[B[t].res],n:fmtN(prodAt(t,l)),r:_t(B[t].res)});
  switch(t){
    case 'command':  return _t('Max building level: {l}',{l});
    case 'wall':     return _t('Defense bonus +{p}%',{p:l*5});
    case 'barracks': return _t('Infantry training speed +{p}%',{p:l*5});
    case 'garrison': return _t('Defensive troop capacity +{n}',{n:l*200})+' · '+_t('Training speed of all troops +{p}%',{p:l*3});
    case 'housing':  return _t('Population +{n}',{n:l*100});
    case 'warehouse':return _t('Storage: {n} per resource',{n:fmtN(capAt(l))});
    case 'lab':      return _t('Research speed +{p}%',{p:l*5});
    case 'factory':  return _t('Vehicle production speed +{p}%',{p:l*5});
    case 'rally':    return _t('Max troops per march: {n}',{n:l*1000});
    case 'hangar':   return _t('Titan maximum level: {n}',{n:Math.min(10,l)});
    case 'helipad':  return _t('Air unit training speed +{p}%',{p:l*5});
    case 'radar':    return l<3 ? _t('Detects incoming attacks.') : _t('Detects attacks and enemy troop count');
  }
}

// Base layout (screen coordinates of the 3/4 view)
const CX=1300, CY=820, RX=800, RY=400;          // walled area (ellipse on the ground)
const PX=1330, PY=560, PRX=250, PRY=125, PH=95; // raised plateau for the Command Center
// Slot positions on the painted background
const SLOTS = [
  {id:'cc',  x:1768, y:282, fixed:'command'},
  {id:'hangar', x:1418, y:296, fixed:'hangar'},
  {id:'titan', x:1580, y:356, deco:true}, // where the Titan stands, in front of its hangar
  {id:'wall',x:1303, y:1150, fixed:'wall'},
  {id:'p1',x:799,y:525},{id:'p2',x:1003,y:525},{id:'p3',x:1206,y:525},{id:'p4',x:1613,y:602},{id:'p5',x:1798,y:602},{id:'p6',x:1976,y:602},
  {id:'p7',x:723,y:640},{id:'p8',x:914,y:640},{id:'p9',x:1104,y:640},{id:'p10',x:1295,y:640},{id:'p11',x:1537,y:716},{id:'p12',x:1715,y:716},
  {id:'p13',x:1893,y:716},{id:'p14',x:799,y:754},{id:'p15',x:1003,y:754},{id:'p16',x:1206,y:754},{id:'p17',x:1626,y:831},{id:'p18',x:1817,y:831},
  {id:'p19',x:914,y:869},{id:'p20',x:1117,y:869},{id:'p21',x:1524,y:945},{id:'p22',x:1715,y:945}
];
const FW = 2576, FH = 1438, FOX = 1215, FOY = 470, FDX = 150, FDY = 75; // fields map + grid
const FBG = 'assets/img/fbg.jpg'; // painted fields background (Gemini)
// Field plots, spread naturally over the meadow
const FIELD_POS=[[1122,519],[1319,530],[1563,553],[786,560],[978,566],[1846,602],[1171,605],[1413,611],[1638,627],[658,642],[880,643],[1042,656],[1248,684],[1847,689],[780,709],[1593,712],[957,724],[1118,732],[1736,753],[1435,775],[660,776],[848,799],[1195,812],[1027,818],[1568,830],[1384,853],[725,854],[1792,872],[862,899],[1026,908],[1587,916],[1187,917],[1402,966],[1603,1002],[1163,1040],[1486,1060],[1316,1069]];
FIELD_POS.forEach(([x,y],n)=>SLOTS.push({id:'f'+(n+1), view:'fields', x, y}));
const FIELD_SCALE = 0.72;
const PLOT_SCALE = 0.8; // size of ordinary buildings on the map (Command Center stays full size)

// ===== STATE =====
const KEY = 'bastion_step1d';
function fresh(){ return {res:{metal:10000,wood:10000,stone:10000,fuel:5000,rations:5000,gold:1000}, slots:{cc:{type:'command',lvl:1},wall:{type:'wall',lvl:1}}, queue:null, troops:{}, training:{}, marches:[], reports:[], last:Date.now()}; }
let state;
try { state = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch(e){ state = fresh(); }
// older saves: add the new resources and the army
function normalizeState(){
  state.res = Object.assign({metal:0,wood:0,stone:0,fuel:0,rations:3000,gold:500}, state.res);
  state.slots = state.slots || {cc:{type:'command',lvl:1},wall:{type:'wall',lvl:1}};
  state.troops = state.troops || {}; state.training = state.training || {};
  state.marches = state.marches || []; state.reports = state.reports || []; state.last = state.last || Date.now();
  titanState(); researchState(); defenseState(); invState(); boostsState(); questState(); statsState(); wheelState();
  if(!state.pos) state.pos = {x:300+Math.floor(Math.random()*150), y:300+Math.floor(Math.random()*150)}; // your base on the world map
  state.pos.x-=state.pos.x%2; state.pos.y-=state.pos.y%2; } // bases sit on the tile grid
normalizeState();
function save(){ try{ localStorage.setItem(ONLINE ? KEY+'_online_'+NET.name : KEY, JSON.stringify(state)); }catch(e){} if(ONLINE) NET.dirty=true; }

const ccLvl = () => state.slots.cc.lvl;
// storage grows as fast as the costs, so everything stays affordable
const capAt = l => Math.round(50000*growth(l+1,1.9,0.25)/1000)*1000;
function cap(){ return capAt(bldLevel('warehouse')); }
// Dragons of Atlantis scale: cost doubles every level (millions at the top), time x2.03 per level (Command Center: 30 min at level 2, about 6 days at level 10)
const costOf = (t,l) => { const o={}; for(const r of RES) o[r]=Math.round((B[t].cost[r]||0)*6*growth(l,2,0.25)); return o; };   // x2, x2.25, x2.5 ... x4: the Titan Hangar level 10 asks about 76 million metal
const timeOf = (t,l) => Math.max(1, Math.round(B[t].time*45*Math.pow(2.03,l-1)/(1+techB('engineering'))));
function exists(t){ for(const k in state.slots) if(state.slots[k].type===t) return true; return state.queue && state.queue.type===t; }

function whyNot(t,l){
  if(state.queue) return _t('The construction queue is busy');
  if(l>MAX) return _t('Maximum level reached');
  if(B[t].req && ccLvl()<B[t].req) return _t('Requires {b} level {l}',{b:_t('Command Center'),l:B[t].req});
  if(t!=='command' && l>ccLvl()) return _t('Requires {b} level {l}',{b:_t('Command Center'),l});
  const c = costOf(t,l); for(const r of RES) if(state.res[r]<c[r]) return _t('Not enough resources');
  return '';
}
function startBuild(slot,t,l){
  if(whyNot(t,l)) return;
  const c=costOf(t,l); for(const r of RES) state.res[r]-=c[r];
  const now=Date.now(); state.queue={slot,type:t,lvl:l,start:now,end:now+timeOf(t,l)*1000};
  save(); renderAll(); toast(IC.build+' '+_t('{b} started',{b:_t(B[t].name)}));
}
function complete(){
  const q=state.queue, p0=totalPower(), st0=q.type==='wall'?wallStage():0; state.slots[q.slot]={type:q.type,lvl:q.lvl}; state.queue=null;
  if(q.type==='wall' && wallStage()!==st0){ cityCache=null; if(view==='city'){ buildWorld(); } }
  save(); renderAll(); toast(IC.ok+' '+_t('{b} level {l} complete',{b:_t(B[q.type].name),l:q.lvl})); powerGain(totalPower()-p0);
}
// half of the cost comes back, up to the storage limit (never below what the player already has; gold has no limit)
function refund(c){ const k=cap(); for(const r of RES){ const v=state.res[r]+Math.floor((c[r]||0)/2); state.res[r] = r==='gold' ? v : Math.max(state.res[r], Math.min(k, v)); } }
function cancel(){
  const q=state.queue; if(!q) return; const c=costOf(q.type,q.lvl);
  refund(c);
  state.queue=null; save(); renderAll(); toast(_t('Construction cancelled (50% refunded)'));
}

// ===== FORMAT =====
// whole number written the way the player's language does it: 9,999 · 9 999 · 9.999
let fmtILang=null, fmtIObj=null;
function fmtI(n){ if(fmtILang!==LANG){ try{ fmtIObj=new Intl.NumberFormat(LANG); }catch(e){ fmtIObj=new Intl.NumberFormat('en-US'); } fmtILang=LANG; } return fmtIObj.format(Math.floor(n)); }
function fmtN(n){ n=Math.floor(n); const neg=n<0; n=Math.abs(n); let t; // short numbers, 5 characters at most: 9,999 · 88.9k · 999k · 1.25M · 12.5M · 999M · 1.2B
  if(n<1e4) t=fmtI(n); else if(n<1e5) t=Math.floor(n/100)/10+'k'; else if(n<1e6) t=Math.floor(n/1e3)+'k';
  else if(n<1e7) t=Math.floor(n/1e4)/100+'M'; else if(n<1e8) t=Math.floor(n/1e5)/10+'M'; else if(n<1e9) t=Math.floor(n/1e6)+'M';
  else if(n<1e11) t=Math.floor(n/1e8)/10+'B'; else t=Math.floor(n/1e9)+'B';
  return (neg?'-':'')+t; }
function fmtT(s){ s=Math.max(0,Math.ceil(s)); if(s>=86400) return _t('{d}d {h}h',{d:Math.floor(s/86400),h:Math.floor(s%86400/3600)}); const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60; return h?_t('{h}h {m}m',{h,m}):m?_t('{m}m {s}s',{m,s:String(x).padStart(2,'0')}):_t('{s}s',{s:x}); }
function shade(hex,f){ const n=parseInt(hex.slice(1),16); const c=[n>>16,n>>8&255,n&255].map(v=>Math.max(0,Math.min(255,Math.round(v*f)))); return '#'+c.map(v=>v.toString(16).padStart(2,'0')).join(''); }
const P = a => a.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
function rnd(seed){ return ()=>{ seed=(seed*16807)%2147483647; return seed/2147483647; }; }

// ===== 3/4 VIEW DRAWING HELPERS =====
function box(a,h,c,top=true){ const b=a/2;
  return `<polygon points="${-a},0 0,${b} 0,${b-h} ${-a},${-h}" fill="${shade(c,.92)}"/>
  <polygon points="0,${b} ${a},0 ${a},${-h} 0,${b-h}" fill="${shade(c,.66)}"/>
  ${top?`<polygon points="${-a},${-h} 0,${b-h} ${a},${-h} 0,${-b-h}" fill="${shade(c,1.15)}"/>`:''}
  <path d="M${-a},${-h} L0,${b-h} L${a},${-h} M0,${b-h} L0,${b}" stroke="${shade(c,1.35)}" stroke-width="1.5" fill="none" opacity=".55"/>`;
}
function wins(a,h,n,v0,dv,seed=1){ const b=a/2; let s='';
  const L=(u,v)=>[-a+u*a, u*b-v], R=(u,v)=>[u*a, b-u*b-v];
  for(let i=0;i<n;i++){ const u=(i+.25)/n, du=.5/n;
    s+=`<polygon points="${P([L(u,v0),L(u+du,v0),L(u+du,v0+dv),L(u,v0+dv)])}" fill="${(i*7+seed)%3===0?'#f0cf74':'#26323a'}"/>`;
    s+=`<polygon points="${P([R(u,v0),R(u+du,v0),R(u+du,v0+dv),R(u,v0+dv)])}" fill="${(i*5+seed)%3===0?'#c4a458':'#1b252b'}"/>`;
  } return s;
}
function gable(a,h,r,roof,wall){ const b=a/2;
  const L=[-a,-h],F=[0,b-h],R=[a,-h],Bk=[0,-b-h],M1=[-a/2,-h-b/2-r],M2=[a/2,b/2-h-r];
  return `<polygon points="${P([Bk,R,M2,M1])}" fill="${shade(roof,1.08)}"/>
  <polygon points="${P([F,R,M2])}" fill="${shade(wall,.62)}"/>
  <polygon points="${P([L,F,M2,M1])}" fill="${shade(roof,.9)}" stroke="${shade(roof,.65)}" stroke-width="1.5"/>`;
}
function parapet(a,h,c){ const k=.78, b=a/2;
  return `<polygon points="${-a*k},${-h} 0,${b*k-h} ${a*k},${-h} 0,${-b*k-h}" fill="${shade(c,.85)}"/>`;
}
function dome(a,h,c){ const rx=a*.55, ry=rx*.5;
  return `<ellipse cx="0" cy="${-h}" rx="${rx}" ry="${ry}" fill="${shade(c,.75)}"/>
  <path d="M${-rx},${-h} A${rx},${rx*.9} 0 0 1 ${rx},${-h} A${rx},${ry} 0 0 1 ${-rx},${-h} Z" fill="url(#domeG)"/>`;
}
function flag(x,y,len,c='#d4a72c'){ return `<line x1="${x}" y1="${y}" x2="${x}" y2="${y-len}" stroke="#2b2b2b" stroke-width="3"/><polygon points="${x},${y-len} ${x+30},${y-len+8} ${x},${y-len+18}" fill="${c}"/>`; }
function smoke(x,y){ return `<g opacity=".55"><circle cx="${x}" cy="${y-8}" r="9" fill="#cfcfc8"/><circle cx="${x+10}" cy="${y-24}" r="12" fill="#d8d8d2"/><circle cx="${x+24}" cy="${y-44}" r="15" fill="#e2e2dc"/></g>`; }
function cyl(x,y,r,h,top='#a3a092'){ const ry=r/2;
  return `<path d="M${x-r},${y-h} L${x-r},${y} A${r},${ry} 0 0 0 ${x+r},${y} L${x+r},${y-h} Z" fill="url(#cyl)"/><ellipse cx="${x}" cy="${y-h}" rx="${r}" ry="${ry}" fill="${top}"/>`;
}

// Building art for each type. Returns svg, height and level-badge position.
function art(t,lvl){
  const L=Math.min(lvl,MAX); let s='', h=0, a=70, by;
  switch(t){
    case 'command': { a=96; const h1=52+L*2, h2=38+L*2, c='#6e7880', c2='#808b93';
      s=box(a,h1,c)+wins(a,h1,4,h1*.45,h1*.25,2)+parapet(a,h1,c)
        +`<g transform="translate(0,${-h1})">${box(56,h2,c2)}${wins(56,h2,3,h2*.4,h2*.3,1)}${parapet(56,h2,c2)}</g>`
        +flag(28,-h1-h2-6,60)+`<line x1="-20" y1="${-h1-h2}" x2="-20" y2="${-h1-h2-70}" stroke="#333" stroke-width="3"/><circle cx="-20" cy="${-h1-h2-72}" r="4" fill="#e05040"/>`;
      h=h1+h2; by=-h1*.45; break; }
    case 'barracks': { a=74; h=34+L*2;
      s=box(a,h,'#8b8a6a',false)+wins(a,h,3,h*.35,h*.35,1)+gable(a,h,26,'#5d6b3a','#8b8a6a')+flag(-a*.6,-h-12,44); break; }
    case 'housing': { a=60; h=40+L*2;
      s=box(a,h,'#b5a585',false)+wins(a,h,2,h*.4,h*.32,2)+gable(a,h,24,'#8a4a35','#b5a585'); break; }
    case 'garrison': { a=70; h=32+L*2; const c='#59705a', b=a/2;
      s=box(a,h,c)+wins(a,h,3,h*.4,h*.25,0)+parapet(a,h,c);
      for(const [x,y] of [[-a+14,-h],[0,b-h-7],[a-14,-h],[0,-b-h+7]]) s+=`<g transform="translate(${x},${y})">${box(13,14,shade(c,1.1))}</g>`;
      break; }
    case 'warehouse': { a=82; h=34+L*2; const c='#8a7a5e', b=a/2;
      s=box(a,h,c,false)+gable(a,h,16,'#7b7f84',c)
        +`<polygon points="${P([[a*.25,b-b*.25],[a*.65,b-b*.65],[a*.65,b-b*.65-h*.7],[a*.25,b-b*.25-h*.7]])}" fill="#3a3530"/>`; break; }
    case 'lab': { a=66; h=38+L*2; const c='#c9ccc8';
      s=box(a,h,c)+wins(a,h,3,h*.4,h*.3,1)+dome(a,h,'#9fb8cc')+`<line x1="0" y1="${-h-a*.5}" x2="0" y2="${-h-a*.5-26}" stroke="#555" stroke-width="3"/>`; h+=a*.5; break; }
    case 'factory': { a=80; h=40+L*2; const c='#7a6c62';
      s=box(a,h,c)+wins(a,h,4,h*.45,h*.25,0)+parapet(a,h,c)
        +`<rect x="${a*.3}" y="${-h-50}" width="16" height="52" fill="#5a4e47"/><rect x="${a*.3-2}" y="${-h-54}" width="20" height="6" fill="#3c3430"/>`+smoke(a*.3+8,-h-56); h+=50; break; }
    case 'rally': { a=64; h=10; const c='#8d8a7d';
      s=box(a,h,c)+flag(-24,-h,62,'#c0452f')+flag(0,-h-14,74)+flag(24,-h,62,'#c0452f'); h=80; break; }
    case 'radar': { a=50; h=50+L*3; const c='#6f8c90';
      s=box(a,h,c)+wins(a,h,2,h*.5,h*.2,2)+`<line x1="0" y1="${-h}" x2="0" y2="${-h-26}" stroke="#444" stroke-width="5"/>
        <g transform="translate(0,${-h-34}) rotate(-25)"><ellipse rx="34" ry="15" fill="#dcdfdb" stroke="#8a908c" stroke-width="2"/><ellipse rx="22" ry="9" fill="#c4c8c4"/><line x1="0" y1="0" x2="0" y2="-20" stroke="#666" stroke-width="2"/></g>`; h+=50; break; }
    case 'hangar': { a=92; h=50+L*2; const c='#5a6470', b=a/2;
      s=box(a,h,c,false)+gable(a,h,18,'#3f474f',c)
        +`<polygon points="${P([[a*.15,b-b*.15],[a*.85,b-b*.85],[a*.85,b-b*.85-h*.8],[a*.15,b-b*.15-h*.8]])}" fill="#1f2326"/>`
        +`<polygon points="${P([[a*.15,b-b*.15-h*.8],[a*.85,b-b*.85-h*.8],[a*.85,b-b*.85-h*.8-8],[a*.15,b-b*.15-h*.8-8]])}" fill="#d4a72c"/>`
        +wins(a,h,3,h*.5,h*.2,1); h+=18; break; }
    case 'mine': { a=66; h=46+L*2;
      const pts=[[-a,0],[-a*.75,-h*.55],[-a*.35,-h*.95],[a*.15,-h],[a*.6,-h*.7],[a,0],[0,a/2]];
      s=`<polygon points="${P(pts)}" fill="#7d766a"/><polygon points="${P([[a*.15,-h],[a*.6,-h*.7],[a,0],[0,a/2],[a*.05,-h*.3]])}" fill="#5f594f"/>
        <path d="M${-a*.55},${a*.08} L${-a*.55},${-h*.3} Q${-a*.35},${-h*.62} ${-a*.15},${-h*.3} L${-a*.15},${a*.28} Z" fill="#1c1916" stroke="#7a5a36" stroke-width="5"/>
        <g stroke="#55504a" stroke-width="3"><line x1="${-a*.5}" y1="${a*.2}" x2="${-a*.2}" y2="${a*.5}"/><line x1="${-a*.3}" y1="${a*.3}" x2="${-a*.02}" y2="${a*.58}"/></g>
        <g stroke="#4a3a28" stroke-width="5"><line x1="${a*.3}" y1="${-h*.6}" x2="${a*.45}" y2="${-h-46}"/><line x1="${a*.62}" y1="${-h*.45}" x2="${a*.45}" y2="${-h-46}"/></g>
        <circle cx="${a*.45}" cy="${-h-46}" r="11" fill="none" stroke="#333" stroke-width="4"/>
        <circle cx="${a*.35}" cy="${a*.25}" r="7" fill="#7f95a8"/><circle cx="${a*.5}" cy="${a*.18}" r="6" fill="#93a8b8"/><circle cx="${a*.42}" cy="${a*.12}" r="5" fill="#6e8496"/>`;
      h+=46; break; }
    case 'sawmill': { a=62; h=32+L*2; const c='#8a6a44';
      s=box(a,h,c,false)+wins(a,h,2,h*.4,h*.3,1)+gable(a,h,22,'#5e4128',c);
      for(let row=0;row<3;row++) for(let i=0;i<3-row;i++){ const x=-a*.95+i*18+row*9, y=a*.5-row*15;
        s+=`<circle cx="${x}" cy="${y}" r="9" fill="#b08a58" stroke="#5a3e22" stroke-width="2"/><circle cx="${x}" cy="${y}" r="4" fill="none" stroke="#7a5a36" stroke-width="1.5"/>`; }
      s+=`<circle cx="${a*.5}" cy="${-h*.4}" r="13" fill="#cfcfcf" stroke="#666" stroke-width="3" stroke-dasharray="4 3"/>`;
      h+=22; break; }
    case 'quarry': { a=72;
      s=`<polygon points="${-a},0 0,${a/2} ${a},0 0,${-a/2}" fill="#aaa598"/>
        <polygon points="${-a*.75},7 0,${a*.375+7} ${a*.75},7 0,${-a*.375+7}" fill="#8b867a"/>
        <polygon points="${-a*.5},14 0,${a*.25+14} ${a*.5},14 0,${-a*.25+14}" fill="#6a655a"/>
        <g transform="translate(${-a*.7},-2)">${box(12,12,'#c2bdaf')}</g><g transform="translate(${-a*.48},10)">${box(10,10,'#b5b0a2')}</g><g transform="translate(${a*.62},0)">${box(12,14,'#c2bdaf')}</g>
        <g stroke="#c9a227" stroke-width="5"><line x1="${a*.35}" y1="-4" x2="${a*.35}" y2="-78"/><line x1="${a*.35}" y1="-74" x2="${-a*.1}" y2="-64"/></g>
        <line x1="${-a*.08}" y1="-64" x2="${-a*.08}" y2="-14" stroke="#333" stroke-width="2"/><g transform="translate(${-a*.08},-6)">${box(9,9,'#c2bdaf')}</g>`;
      h=78; by=a*.3; break; }
    case 'pump': { a=64; h=56+L*2;
      s=`<g transform="translate(${a*.45},${-a*.12})">${cyl(0,0,26,h,'#d2ccb6')}<rect x="-26" y="${-h*.55}" width="52" height="8" fill="#c9a227"/></g>
        <g transform="translate(${-a*.3},${a*.12})">${box(22,8,'#46484a')}
          <g stroke="#2f3133" stroke-width="5"><line x1="-16" y1="-6" x2="0" y2="-48"/><line x1="14" y1="-6" x2="0" y2="-48"/></g>
          <line x1="-44" y1="-56" x2="36" y2="-42" stroke="#c9a227" stroke-width="8"/>
          <path d="M-44,-62 Q-58,-50 -48,-32 L-40,-48 Z" fill="#3a3c3e"/>
          <rect x="26" y="-44" width="16" height="22" fill="#55585a"/></g>
        ${cyl(a*.55,a*.38,9,18,'#a33c2a')}${cyl(a*.32,a*.5,9,18,'#4a5a3a')}`;
      by=a*.25; break; }
    case 'wall': { const gh=58+L*3, w=74;
      s=`<rect x="${-w}" y="${-gh}" width="${2*w}" height="${gh}" fill="#8c897d"/>
        <rect x="${-w-6}" y="${-gh-10}" width="${2*w+12}" height="12" fill="#aaa799"/>
        <rect x="-36" y="${-gh+18}" width="72" height="${gh-18}" fill="#2a2e2c"/>
        <rect x="-46" y="${-gh+34}" width="92" height="9" fill="url(#haz)"/>`
        +cyl(-w-20,0,28,gh+34)+cyl(w+20,0,28,gh+34)
        +`<g transform="translate(${-w-20},${-gh-34})">${box(20,18,'#5b6248')}</g><g transform="translate(${w+20},${-gh-34})">${box(20,18,'#5b6248')}</g>`;
      return {s, h:gh+52, bx:0, by:-gh-26, a:w}; }
  }
  return {s, h, bx:0, by: by!==undefined?by:(a/2*.9-h*.5), a};
}

// ===== BACKGROUND (mountains, river, forest, walls) =====
const E=(t,k=0,z=0)=>[CX+(RX-k)*Math.cos(t), CY+(RY-k/2)*Math.sin(t)-z];
function tree(x,y,s,k){
  const c=['#2f5a2a','#3a6a2e','#2b4f27','#456f33'][k%4];
  if(k%5===4) return `<ellipse cx="${x+s*.5}" cy="${y+2}" rx="${s*.9}" ry="${s*.35}" fill="#000" opacity=".22"/><rect x="${x-3}" y="${y-s*.6}" width="6" height="${s*.6}" fill="#4a3624"/><circle cx="${x}" cy="${y-s*1.1}" r="${s*.75}" fill="${shade(c,1.15)}"/><circle cx="${x-s*.25}" cy="${y-s*1.3}" r="${s*.4}" fill="${shade(c,1.35)}" opacity=".7"/>`;
  return `<ellipse cx="${x+s*.5}" cy="${y+2}" rx="${s*.8}" ry="${s*.3}" fill="#000" opacity=".22"/><rect x="${x-s*.1}" y="${y-s*.5}" width="${s*.2}" height="${s*.5}" fill="#4a3624"/><polygon points="${x-s*.7},${y-s*.4} ${x},${y-s*1.6} ${x+s*.7},${y-s*.4}" fill="${c}"/><polygon points="${x-s*.55},${y-s*1.0} ${x},${y-s*2.1} ${x+s*.55},${y-s*1.0}" fill="${shade(c,1.12)}"/><polygon points="${x-s*.38},${y-s*1.6} ${x},${y-s*2.6} ${x+s*.38},${y-s*1.6}" fill="${shade(c,1.25)}"/>`;
}
function tower(x,y){
  return `<ellipse cx="${x+12}" cy="${y+6}" rx="40" ry="18" fill="#000" opacity=".25"/>${cyl(x,y,30,118)}
  <g transform="translate(${x},${y-118})">${box(24,22,'#5b6248')}<polygon points="-30,-22 0,-37 30,-22 0,-7" fill="#3d4234"/></g>
  <rect x="${x-4}" y="${y-80}" width="8" height="16" fill="#2a2e2c"/>`;
}
const RIVER=[[420,540],[470,700],[400,830],[340,960],[360,1100],[440,1250],[470,1380],[420,1530]];
function smoothPath(pts){ let d=`M${pts[0][0]},${pts[0][1]}`; for(let i=1;i<pts.length-1;i++){ const m=[(pts[i][0]+pts[i+1][0])/2,(pts[i][1]+pts[i+1][1])/2]; d+=` Q${pts[i][0]},${pts[i][1]} ${m[0]},${m[1]}`; } const l=pts[pts.length-1]; return d+` L${l[0]},${l[1]}`; }
function nearRiver(x,y){ for(let i=0;i<RIVER.length-1;i++){ const [x1,y1]=RIVER[i],[x2,y2]=RIVER[i+1]; for(let k=0;k<=10;k++){ const px=x1+(x2-x1)*k/10, py=y1+(y2-y1)*k/10; if(Math.hypot(px-x,py-y)<60) return true; } } return false; }

function buildScene(){
  const r=rnd(11);
  // mountain ranges
  let far='', mid='', facets='';
  const fT=[], mT=[], mB=[];
  for(let x=-60;x<=W+60;x+=60){ fT.push([x, 60+r()*110]); mT.push([x, 170+r()*120]); mB.push([x, 440+r()*40]); }
  far=`<path d="M-60,430 ${fT.map(p=>'L'+p[0]+','+p[1].toFixed(0)).join(' ')} L${W+60},430 Z" fill="url(#farG)"/>`;
  mid=`<path d="M${mT[0][0]},${mT[0][1]} ${mT.map(p=>'L'+p[0]+','+p[1].toFixed(0)).join(' ')} ${mB.slice().reverse().map(p=>'L'+p[0]+','+p[1].toFixed(0)).join(' ')} Z" fill="url(#midG)"/>`;
  mT.forEach(([x,y],i)=>{ if(i%2) return; facets+=`<polygon points="${x},${y} ${x+45},${y+130} ${x+8},${y+170}" fill="#000" opacity=".13"/><polygon points="${x},${y} ${x-35},${y+110} ${x-8},${y+150}" fill="#fff" opacity=".06"/>`; });
  const cliffL='M0,0 L540,0 L480,170 L560,300 L440,520 L330,760 L160,980 L0,1100 Z';
  const cliffR=cliffL.replace(/(-?\d+),(-?\d+)/g,(m,x,y)=>`${W-x},${y}`);
  const cliffFacets=[[60,80,260,60,180,300],[300,160,470,180,380,420],[120,420,330,520,200,760],[2340,90,2540,60,2440,320],[2120,190,2290,170,2200,420],[2280,440,2470,520,2380,780]]
    .map(f=>`<polygon points="${f[0]},${f[1]} ${f[2]},${f[3]} ${f[4]},${f[5]}" fill="#000" opacity=".14"/>`).join('');

  // walls
  function wallHalf(front){
    let s=''; const N=90;
    for(let i=0;i<N;i++){ const t1=i/N*2*Math.PI, t2=(i+1)/N*2*Math.PI, tm=(t1+t2)/2;
      if((Math.sin(tm)>0)!==front) continue;
      if(Math.abs(tm-Math.PI/2)<0.105) continue; // gate opening
      const k=front?0:16, f=shade('#8d8b7f', front?(0.86-0.16*Math.cos(tm)):0.74);
      s+=`<polygon points="${P([E(t1,k),E(t2,k),E(t2,k,56),E(t1,k,56)])}" fill="${f}" stroke="${shade(f,.86)}" stroke-width="1.2"/>`;
      s+=`<polygon points="${P([E(t1,0,56),E(t2,0,56),E(t2,16,56),E(t1,16,56)])}" fill="#aba899"/>`;
      s+=`<line x1="${E(t1,0,64)[0]}" y1="${E(t1,0,64)[1]}" x2="${E(t2,0,64)[0]}" y2="${E(t2,0,64)[1]}" stroke="#34352f" stroke-width="2" stroke-dasharray="3 4"/>`;
    } return s;
  }
  // plateau
  const pt=PY-PH;
  let streaks=''; for(let i=0;i<=16;i++){ const x=PX-PRX+i*(2*PRX/16), yb=PY+PRY*Math.sqrt(Math.max(0,1-((x-PX)/PRX)**2)); streaks+=`<line x1="${x}" y1="${yb-PH+4}" x2="${x+(i%3-1)*6}" y2="${yb}" stroke="#2c271f" stroke-width="2" opacity=".25"/>`; }
  let steps=''; for(let y=pt+PRY+6;y<PY+PRY+38;y+=9) steps+=`<line x1="${PX-34}" y1="${y}" x2="${PX+34}" y2="${y}" stroke="#7b7563" stroke-width="2"/>`;
  const plateau=`<path d="M${PX-PRX},${pt} A${PRX},${PRY} 0 0 0 ${PX+PRX},${pt} L${PX+PRX},${PY} A${PRX},${PRY} 0 0 1 ${PX-PRX},${PY} Z" fill="url(#cliffG)"/>${streaks}
    <ellipse cx="${PX}" cy="${pt}" rx="${PRX}" ry="${PRY}" fill="#6f8f45" stroke="#5a5a4c" stroke-width="4"/>
    <ellipse cx="${PX}" cy="${pt}" rx="${PRX-18}" ry="${PRY-9}" fill="none" stroke="#9c9886" stroke-width="6"/>
    <polygon points="${PX-28},${pt+PRY} ${PX+28},${pt+PRY} ${PX+40},${PY+PRY+40} ${PX-40},${PY+PRY+40}" fill="#a39d8a"/>${steps}`;

  // trees & rocks
  const back=[], front=[];
  for(let i=0;i<420;i++){
    const x=r()*W, y=300+r()*(H-300), s=13+r()*13, k=Math.floor(r()*20);
    if(((x-CX)/(RX+70))**2+((y-CY)/(RY+40))**2<1) continue;
    if(((x-2350)/340)**2+((y-1420)/160)**2<1) continue;
    if(y>1200 && Math.abs(x-(1300-(y-1225)*0.95))<80) continue;
    if(nearRiver(x,y)) continue;
    const item={y, s: r()<0.88 ? tree(x,y,s,k) : `<ellipse cx="${x}" cy="${y}" rx="${s*1.1}" ry="${s*.7}" fill="#76736a"/><ellipse cx="${x-4}" cy="${y-5}" rx="${s*.7}" ry="${s*.4}" fill="#9a978c"/>`};
    (y<CY?back:front).push(item);
  }
  const sortJoin=a=>a.sort((p,q)=>p.y-q.y).map(o=>o.s).join('');

  const backTowers=[Math.PI+0.45, Math.PI+1.0, 2*Math.PI-1.0, 2*Math.PI-0.45].map(t=>tower(...E(t))).join('');
  const frontTowers=[Math.PI, 0, 0.6, Math.PI-0.6].map(t=>tower(...E(t))).join('');

  const defs=`<defs>
    <pattern id="grass" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#5d7d34"/><path d="M10 20l2-6 2 6M40 46l2-6 2 6M28 8l1-4 1 4" stroke="#6f9140" stroke-width="1.5" fill="none"/><circle cx="48" cy="18" r="2" fill="#53702e"/></pattern>
    <pattern id="haz" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="16" height="16" fill="#1d1d1d"/><rect width="8" height="16" fill="#e2b52b"/></pattern>
    <linearGradient id="farG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a9d93"/><stop offset="1" stop-color="#5f7856"/></linearGradient>
    <linearGradient id="midG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#85826e"/><stop offset=".45" stop-color="#6b7a4c"/><stop offset="1" stop-color="#5d7d34"/></linearGradient>
    <linearGradient id="sideG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8b8775"/><stop offset=".7" stop-color="#6c7553"/><stop offset="1" stop-color="#5d7d34"/></linearGradient>
    <linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b3b0a2"/><stop offset=".55" stop-color="#8f8c80"/><stop offset="1" stop-color="#65635a"/></linearGradient>
    <linearGradient id="cliffG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a0947a"/><stop offset=".5" stop-color="#7f735e"/><stop offset="1" stop-color="#564d3f"/></linearGradient>
    <radialGradient id="domeG" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#e8f2fa"/><stop offset="1" stop-color="#6f8aa3"/></radialGradient>
    <radialGradient id="vig" cx="50%" cy="55%" r="75%"><stop offset="65%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".4"/></radialGradient>
  </defs>`;

  const sceneBack = `${defs}
    <rect width="${W}" height="${H}" fill="url(#grass)"/>
    <rect width="${W}" height="440" fill="#93a79c"/>
    ${far}${mid}${facets}
    <path d="${smoothPath(RIVER)}" stroke="#2f6f74" stroke-width="58" fill="none" stroke-linecap="round"/>
    <path d="${smoothPath(RIVER)}" stroke="#4fa3a3" stroke-width="40" fill="none" stroke-linecap="round"/>
    <path d="${smoothPath(RIVER)}" stroke="#bfe6e0" stroke-width="3" fill="none" stroke-dasharray="14 26" opacity=".5"/>
    <path d="${cliffL}" fill="url(#sideG)"/><path d="${cliffR}" fill="url(#sideG)"/>${cliffFacets}
    <ellipse cx="2350" cy="1420" rx="340" ry="160" fill="#2f6f74"/><ellipse cx="2350" cy="1426" rx="318" ry="146" fill="#4fa3a3"/>
    <path d="M1300,1225 C1290,1330 1240,1420 1190,1520" stroke="#8a774f" stroke-width="54" fill="none"/>
    <path d="M1300,1225 C1290,1330 1240,1420 1190,1520" stroke="#a8936a" stroke-width="44" fill="none"/>
    ${sortJoin(back)}
    <ellipse cx="${CX}" cy="${CY}" rx="${RX}" ry="${RY}" fill="#678640"/>
    <ellipse cx="${CX}" cy="${CY}" rx="${RX}" ry="${RY}" fill="url(#grass)" opacity=".5"/>
    <ellipse cx="1310" cy="880" rx="560" ry="250" fill="none" stroke="#8a774f" stroke-width="30"/>
    <ellipse cx="1310" cy="880" rx="560" ry="250" fill="none" stroke="#a8936a" stroke-width="22"/>
    <path d="M1300,1215 C1300,1000 1330,900 ${PX},${PY+PRY+38}" stroke="#8a774f" stroke-width="48" fill="none"/>
    <path d="M1300,1215 C1300,1000 1330,900 ${PX},${PY+PRY+38}" stroke="#a8936a" stroke-width="40" fill="none"/>
    <ellipse cx="850" cy="1025" rx="60" ry="30" fill="#57564f" stroke="#e1d9a8" stroke-width="5"/><text x="850" y="1045" font-size="52" font-weight="900" fill="#e1d9a8" text-anchor="middle" font-family="sans-serif" transform="translate(850,1025) scale(1,.5) translate(-850,-1025)">H</text>
    ${wallHalf(false)}${backTowers}
    ${plateau}`;
  const sceneFront = `${wallHalf(true)}${frontTowers}`;
  const sceneFore = `${sortJoin(front)}<rect width="${W}" height="${H}" fill="url(#vig)" pointer-events="none"/>`;
  return {sceneBack, sceneFront, sceneFore};
}

function animOverlay(t, x0, y0, w, h, id){
  const a=ANIM[t]; if(!a) return '';
  const pt=([fx,fy])=>[x0+fx*w, y0+fy*h], off=id.length*0.37+id.charCodeAt(id.length-1)*0.11;
  let o='';
  if(a.smoke){ const [x,y]=pt(a.smoke);
    for(let i=0;i<4;i++) o+=`<circle class="anim" cx="${x}" cy="${y}" r="9" fill="#cfcfc8" style="animation:smoke 3.6s linear infinite;${ph(3.6,off+i*0.9)}"/>`; }
  if(a.ping){ const [x,y]=pt(a.ping);
    o+=`<ellipse class="anim" cx="${x}" cy="${y}" rx="26" ry="13" fill="none" stroke="#7ff3ff" stroke-width="3" style="animation:ping 2.4s ease-out infinite;${ph(2.4,off)}"/>`; }
  if(a.light){ const [x,y]=pt(a.light);
    o+=`<circle cx="${x}" cy="${y}" r="3.5" fill="#ff3b2f" style="animation:blink 1.4s steps(1) infinite;${ph(1.4,off)}"/>`; }
  return o;
}
function constructionFX(){
  let o='';
  for(let i=0;i<5;i++){ const dx=(i-2)*16;
    o+=`<circle class="anim" cx="${dx}" cy="${6+(i%2)*6}" r="10" fill="#c8b48a" style="--dx:${dx*0.6}px;animation:dust 1.8s ease-out infinite;${ph(1.8,i*0.36)}"/>`; }
  for(let i=0;i<4;i++) o+=`<circle class="anim" cx="${-24+i*16}" cy="${-30-(i%2)*14}" r="3.5" fill="#ffd54a" style="animation:spark .7s linear infinite;${ph(0.7,i*0.17)}"/>`;
  return o;
}
function titanSVG(){
  const hb=state.slots.hangar; if(!hb || !TITAN || titanState().away) return null;
  const stg=titanStage(), T=SLOTS.find(x=>x.id==='titan'), w=(130+Math.min(hb.lvl,10)*5)*(stg===2?1.12:1), ih=w*(TITAN_R[stg]||TITAN.imgR), ay=0.97;
  const vis=ANIM.titan.visor, vx=-w/2+vis[0]*w, vy=-ih*ay+vis[1]*ih;
  return {y:T.y, svg:`<g class="titan" data-titan="1" transform="translate(${T.x},${T.y})">
    <ellipse cx="6" cy="2" rx="${w*0.36}" ry="${w*0.11}" fill="#000" opacity=".28"/>
    <g class="anim" style="animation:bob 3.4s ease-in-out infinite;${ph(3.4)}">
      <image href="${titanImg()}" x="${-w/2}" y="${-ih*ay}" width="${w}" height="${ih}"/>
    </g></g>`};
}
function slotSVG(s){
  const b=state.slots[s.id], q=state.queue&&state.queue.slot===s.id?state.queue:null;
  const isWall=s.fixed==='wall', A=s.fixed==='command'?112:74, Bh=A/2;
  const isField=s.view==='fields', k=s.fixed?1:(isField?FIELD_SCALE:PLOT_SCALE);
  let g=`<g class="slot${cur===s.id?' sel':''}" data-slot="${s.id}" transform="translate(${s.x},${s.y})"><g transform="scale(${k})">`;
  if(isWall) g+=`<rect x="-130" y="-130" width="260" height="150" fill="#000" fill-opacity="0"/>`;
  else g+=`<polygon class="pad${b||q?(isField?' fbuilt':''):(isField?' fempty':' empty')}" points="${-A},0 0,${Bh} ${A},0 0,${-Bh}"/>`;
  let top=-20, badge='';
  const t=b?b.type:(q?q.type:null);
  if(t){
    const ar=art(t,b?b.lvl:1); top=-ar.h-20;
    const d=B[t];
    if(!isWall && !(b && d.img)) g+=`<ellipse cx="14" cy="8" rx="${ar.a*1.1}" ry="${ar.a*.5}" fill="#000" opacity=".25"/>`;
    if(b && d.img){ const v=bImgAt(t,b.lvl), w=v.imgW, ih=w*v.imgR;
      g+=`<image href="${v.img}" x="${-w/2}" y="${-ih*v.imgAY}" width="${w}" height="${ih}"/>`;
      if(v===d) g+=animOverlay(t, -w/2, -ih*d.imgAY, w, ih, s.id);
      ar.by=ih*(1-v.imgAY)*0.35; }
    else if(b && isWall && BG){ ar.by=-60; top=-100; } // the gate is part of the painted background
    else if(b) g+=ar.s;
    else g+=`<g opacity=".45">${ar.s}</g><g stroke="#e0b830" stroke-width="3"><line x1="${-ar.a*.8}" y1="0" x2="${-ar.a*.8}" y2="${-ar.h}"/><line x1="${ar.a*.8}" y1="0" x2="${ar.a*.8}" y2="${-ar.h}"/><line x1="0" y1="${ar.a*.4}" x2="0" y2="${-ar.h*.6}"/><line x1="${-ar.a*.8}" y1="${-ar.h*.5}" x2="${ar.a*.8}" y2="${-ar.h*.5}"/></g>`;
    if(b) badge=`<g transform="translate(${ar.bx*k},${ar.by*k})"><rect x="-14" y="-14" width="28" height="28" rx="5" fill="#f3c534" stroke="#5a3d05" stroke-width="2.5"/><text class="bt" y="7">${b.lvl}</text></g>`;
  } else g+=`<text class="plus" y="14">+</text>`;
  if(q) g+=constructionFX();
  g+='</g>'+badge; top*=k;
  if(b && B[b.type] && B[b.type].field){ const off=(parseInt(s.id.slice(1))||1)*1.7;
    g+=`<image class="anim" href="${ICS[B[b.type].res]}" x="-17" y="${-70*k-30}" width="34" height="34" style="animation:rise 5s ease-out infinite;${ph(5,off)}"/>`; }
  if(q){
    const y=top-10;
    g+=`<rect x="-62" y="${y}" width="124" height="14" rx="7" fill="#111" stroke="#000"/><rect class="lv-sbar" data-s="${q.start}" data-e="${q.end}" x="-60" y="${y+2}" width="${1.2*pct(q.start,q.end)}" height="10" rx="5" fill="#d4a72c"/><text class="ptime lv-time" data-s="${q.start}" data-e="${q.end}" y="${y-6}">${fmtT((q.end-Date.now())/1000)}</text>`;
  }
  return g+'</g>';
}

// ===== RENDER =====
const world=document.getElementById('world');
let view='city', slotsLayer, gateLayer, cityCache=null, fieldCache=null;
function fieldScene(){
  if(fieldCache) return fieldCache;
  if(FBG){
    fieldCache=`<image href="${FBG}" x="0" y="0" width="${FW}" height="${FH}"/>
    <g class="goto" data-goto="city" style="cursor:pointer"><rect x="1030" y="50" width="560" height="330" fill="#000" fill-opacity="0"/>
      <rect x="1176" y="196" width="252" height="42" rx="10" fill="#d4a72c" stroke="#5a3d05" stroke-width="3"/><image href="${ICS.base}" x="1184" y="199" width="36" height="36"/><text class="gotxt" x="1320" y="225">${_t('Enter base')}</text></g>`;
    return fieldCache;
  }
  const r=rnd(23);
  const inGrid=(x,y)=>{ const u=(x-FOX)/FDX, v=(y-FOY)/FDY, i=(u+v)/2, j=(v-u)/2; return i>-1.1&&i<6.1&&j>-1.1&&j<5.1; };
  const RIV=[[2420,780],[2230,860],[2080,1000],[2020,1200],[2090,1420]];
  const nearR=(x,y)=>{ for(let k=0;k<RIV.length-1;k++){ const [a,b]=RIV[k],[c,d]=RIV[k+1]; for(let t=0;t<=10;t++) if(Math.hypot(a+(c-a)*t/10-x,b+(d-b)*t/10-y)<70) return true; } return false; };
  const road='M1205,400 C1100,520 760,560 640,700 S 380,1100 330,1420';
  let items=[];
  for(let n=0;n<520;n++){
    const x=r()*FW, y=r()*FH, sz=13+r()*13, k=Math.floor(r()*20);
    if(inGrid(x,y) || nearR(x,y)) continue;
    if(((x-1200)/470)**2+((y-250)/260)**2<1) continue;
    if(y>380 && Math.abs(x-(1205-(y-400)*0.9))<70 && y<720) continue;
    if(y>=700 && Math.abs(x-(640-(y-700)*0.43))<70) continue;
    items.push({y, s: r()<0.85 ? tree(x,y,sz,k) : `<ellipse cx="${x}" cy="${y}" rx="${sz*1.1}" ry="${sz*.7}" fill="#76736a"/><ellipse cx="${x-4}" cy="${y-5}" rx="${sz*.7}" ry="${sz*.4}" fill="#9a978c"/>`});
  }
  const bw=820, bh=bw*1438/2576, bx=FOX-bw/2, by=20;
  fieldCache=`<defs>
    <pattern id="grass" width="60" height="60" patternUnits="userSpaceOnUse"><rect width="60" height="60" fill="#5f7f34"/><path d="M10 20l2-6 2 6M40 46l2-6 2 6M28 8l1-4 1 4" stroke="#6f9140" stroke-width="1.5" fill="none"/><circle cx="48" cy="18" r="2" fill="#53702e"/></pattern>
    <linearGradient id="cyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b3b0a2"/><stop offset=".55" stop-color="#8f8c80"/><stop offset="1" stop-color="#65635a"/></linearGradient>
    <radialGradient id="fadeG"><stop offset=".62" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="baseMask" maskUnits="userSpaceOnUse" x="0" y="0" width="${FW}" height="${FH}"><ellipse cx="${FOX}" cy="${by+bh/2}" rx="${bw/2}" ry="${bh/2}" fill="url(#fadeG)"/></mask>
    <radialGradient id="vig" cx="50%" cy="55%" r="75%"><stop offset="65%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".4"/></radialGradient>
  </defs>
  <rect width="${FW}" height="${FH}" fill="url(#grass)"/>
  <path d="${road}" stroke="#8a774f" stroke-width="54" fill="none"/><path d="${road}" stroke="#a8936a" stroke-width="44" fill="none"/>
  <path d="${smoothPath(RIV)}" stroke="#2f6f74" stroke-width="66" fill="none" stroke-linecap="round"/>
  <path d="${smoothPath(RIV)}" stroke="#4fa3a3" stroke-width="48" fill="none" stroke-linecap="round"/>
  <path d="${smoothPath(RIV)}" stroke="#bfe6e0" stroke-width="3" fill="none" stroke-dasharray="14 26" opacity=".5"/>
  ${BG?`<g class="goto" data-goto="city" style="cursor:pointer"><image href="${BG}" x="${bx}" y="${by}" width="${bw}" height="${bh}" mask="url(#baseMask)"/>
    <rect x="${FOX-95}" y="${by+bh-30}" width="190" height="40" rx="10" fill="#d4a72c" stroke="#5a3d05" stroke-width="3"/><image href="${ICS.base}" x="${FOX-90}" y="${by+bh-28}" width="34" height="34"/><text class="gotxt" x="${FOX+14}" y="${by+bh-2}">${_t('Enter base')}</text></g>`:''}
  ${items.sort((a,b)=>a.y-b.y).map(o=>o.s).join('')}
  <rect width="${FW}" height="${FH}" fill="url(#vig)" pointer-events="none"/>`;
  return fieldCache;
}
// Ultra-wide screens (21:9): wider versions of the backgrounds, with more scenery on the left and right.
// The base keeps its coordinates: everything is shifted by OX inside the wider picture.
const WIDE = {city:{w:3616, img:{1:'assets/img/bg_wall1_w.jpg', 2:'assets/img/bg_wall2_w.jpg', 3:'assets/img/bg_wall3_w.jpg', 4:'assets/img/bg_wall4_w.jpg'}}, fields:{w:3448, img:'assets/img/fbg_w.jpg'}};
let OX = 0;
function buildWorld(){
  let inner;
  if(view==='city'){
    const wd=WIDE.city; W=wd?wd.w:2576; H=1438; OX=(W-2576)/2;
    if(!cityCache){ const sc0=BG ? {sceneBack:`<image href="${bgNow()}" x="0" y="0" width="2576" height="1438"/>`, sceneFront:'', sceneFore:''} : buildScene(); cityCache=sc0; }
    const back = wd ? `<image href="${wd.img[wallStage()]||wd.img[2]}" x="0" y="0" width="${W}" height="${H}"/>` : cityCache.sceneBack;
    inner=`${back}<g transform="translate(${OX},0)"><g id="slots"></g>${cityCache.sceneFront}<g id="gate"></g>${cityCache.sceneFore}</g>`;
  } else { const wd=WIDE.fields; W=wd?wd.w:FW; H=FH; OX=(W-FW)/2;
    inner=`${wd?`<image href="${wd.img}" x="0" y="0" width="${W}" height="${H}"/>`:''}<g transform="translate(${OX},0)">${fieldScene()}<g id="slots"></g><g id="gate"></g></g>`; }
  world.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  slotsLayer=document.getElementById('slots'); gateLayer=document.getElementById('gate');
  vp.style.setProperty('--vbg', `url(${new URL(view==='city'?(WIDE.city?WIDE.city.img[wallStage()]:bgNow()):(WIDE.fields?WIDE.fields.img:FBG), location.href).href})`);   // absolute: CSS would read it relative to the css folder
}
let cur=null;
function renderSlots(){
  const vs=SLOTS.filter(s=>(s.view||'city')===view);
  const list=vs.filter(s=>s.id!=='wall' && !s.deco).map(s=>({y:s.y, svg:slotSVG(s)}));
  if(view==='city'){ const t=titanSVG(); if(t) list.push(t); }
  const hs=hintSlot && vs.find(s=>s.id===hintSlot && !state.slots[s.id]);   // tutorial arrow over the empty plot to build on
  if(hs) list.push({y:99999, svg:`<g transform="translate(${hs.x},${hs.y-20})" pointer-events="none"><g class="qarrow"><path d="M0,0 L-34,-46 L-14,-46 L-14,-110 L14,-110 L14,-46 L34,-46 Z" fill="#f3c534" stroke="#5a3d05" stroke-width="5" stroke-linejoin="round"/></g></g>`});
  // redrawn only when something changed (a building, a level, the selection): animations keep running, clicks are never lost
  const html=list.sort((a,b)=>a.y-b.y).map(o=>o.svg).join(''), gate= view==='city' ? slotSVG(SLOTS.find(s=>s.id==='wall')) : '';
  const k=slotKey(html+'|'+gate);
  if(k!==slotsLayer.dataset.k){ slotsLayer.dataset.k=k; slotsLayer.innerHTML=html; gateLayer.innerHTML=gate; } else { liveIn(slotsLayer); liveIn(gateLayer); }
}
const slotKey = h => h.replace(/animation-delay:-[\d.]+s/g,'').replace(/(<rect class="lv-sbar"[^>]*?) width="[^"]*"/g,'$1').replace(/(<text class="ptime lv-time"[^>]*>)[^<]*/g,'$1');
function setView(v){
  if(v===view) return;
  closeSheet(); view=v; document.getElementById('app').classList.toggle('v-map', v==='map');
  if(v==='map'){ resizeMap(); if(!mcam){ mcam={x:0,y:0,z:vsize().w<600?0.55:0.75}; camCenter(state.pos.x,state.pos.y); } drawMap(); updateCoords(); }
  else { buildWorld(); if(v==='city') centerOn(1300,640); else centerOn(1290,600); renderSlots(); }
  document.querySelectorAll('#hud [data-view]').forEach(a=>a.classList.toggle('on',a.dataset.view===v));
}
function renderPower(){
  const p=totalPower(), l=playerLevel(p), a=levelReq(l), b=levelReq(l+1);
  { const pp=document.getElementById('pPow'); pp.textContent=fmtI(p);   // full number; shortened (120M) only if the screen is too narrow for it
    if(pp.parentElement && pp.parentElement.scrollWidth>pp.parentElement.clientWidth+1) pp.textContent=fmtN(p); pp.title=fmtI(p); }
  { const nm=document.getElementById('pName'), v=ONLINE&&NET.name ? NET.name : _t('COMMANDER'); if(nm.textContent!==v){ nm.textContent=v; nm.title=v; } }   // the player's own name
  document.getElementById('pLvl').textContent=l;
  document.getElementById('pXp').style.width=Math.min(100,(p-a)/(b-a)*100)+'%';
  const hb=state.slots.hangar, tp=document.getElementById('tPortrait');
  const nt=document.getElementById('nTitan');
  if(hb && TITAN){ const src=titanImg(); if(!nt.querySelector('.tport') || nt.querySelector('.tport').getAttribute('src')!==src) nt.innerHTML=`<img class="tport" src="${src}" alt="">`; } else if(!nt.querySelector('[data-lk]')) nt.innerHTML=`<img class="ic" data-lk="1" src="${ICS.lock}" alt="">`;
  if(hb && TITAN){ tp.style.backgroundImage=`url(${titanImg()})`; tp.innerHTML=''; const T=titanState(); document.getElementById('tSub').innerHTML = T.away ? IC.atk+' '+_t('On a mission') : _t('Lv {l} · Health {h}%',{l:T.lvl,h:Math.floor(T.hp)}); }
  else { tp.style.backgroundImage=''; if(!tp.querySelector('img')) tp.innerHTML=IC.lock; document.getElementById('tSub').textContent=_t('Build the Titan Hangar'); }
}
function powerGain(n){ if(n<=0) return; const el=document.getElementById('powpop'); el.innerHTML=`+${fmtI(n)} ${IC.power}`; el.classList.remove('go'); void el.offsetWidth; el.classList.add('go'); }
function renderRes(){
  renderPower();
  const c=cap(), rt=rates();
  for(const r of RES){ const el=document.getElementById('r-'+r), rr=document.getElementById('rr-'+r);
    el.textContent=fmtN(state.res[r]); el.classList.toggle('full',r!=='gold' && state.res[r]>=c);
    rr.textContent=(rt[r]>=0?'+':'')+fmtN(rt[r])+'/h'; rr.classList.toggle('neg',rt[r]<0); }
  const pk=n=>n>=1000?(Math.floor(n/100)/10)+'k':String(Math.floor(n)); // short form so it fits the same pill size
  document.getElementById('r-pop').textContent=pk(popUsed()); document.getElementById('rr-pop').textContent=`/ ${pk(popMax())} ${_t('max')}`;
}
function renderQueue(){
  const q=state.queue, el=document.getElementById('queue');
  let h='';
  const rc=researchState().cur, busy = q || rc || TRAINERS.some(bl=>(state.training[bl]||[]).length) || state.marches.length;
  el.style.display = busy ? '' : 'none';
  if(!q) h='';
  else {
    h=`<div class="qrow"><span>${IC.build} <img class="ic" src="${q.type==='wall'?`assets/img/wall_${wallStage()}.webp`:bImgAt(q.type,q.lvl).img||ICS.build}" alt=""> ${_t(B[q.type].name)} · ${_t('Lv')} ${q.lvl}</span>${qBar(q.start,q.end)}${speedBtn('build')}<button class="sm" data-act="finish">${_t('Finish (test)')}</button></div>`; }
  if(rc) h+=`<div class="qrow" data-act="openres"><span>${techIcon(rc.t)} ${_t(TECH[rc.t].name)} · ${_t('Lv')} ${rc.l}</span>${qBar(rc.s,rc.e)}${speedBtn('research')}<button class="sm" data-act="rfinish">${_t('Finish (test)')}</button></div>`;
  for(const bl of TRAINERS){ const tq=state.training[bl]; if(!tq||!tq.length) continue; const j=tq[0];
    h+=`<div class="qrow"><span>${IC.troops} ${fmtN(j.n)} ${_t(UNITS[j.u].name)}${tq.length>1?` (+${tq.length-1})`:''}</span>${qBar(j.s,j.e)}${speedBtn('train:'+bl)}<button class="sm" data-act="tfinish" data-bld="${bl}">${_t('Finish (test)')}</button></div>`; }
  for(const m of state.marches){ const out=m.st==='out', a=out?m.s:m.a, b=out?m.a:m.b;
    h+=`<div class="qrow"><span>${out?IC.atk:IC.back} ${_t(out?'Marching':'Returning')} (${m.x}, ${m.y})</span>${qBar(a,b)}${speedBtn('march:'+m.id)}<button class="sm" data-act="mfinish" data-id="${m.id}">${_t('Finish (test)')}</button></div>`; }
  const k=liveKey(h); if(k!==el.dataset.k){ el.dataset.k=k; el.innerHTML=h; } else liveIn(el);   // rebuilt only when a line appears or goes
}
const qBar = (a,b) => `<div class="bar"><i class="lv-bar" data-s="${a}" data-e="${b}" style="width:${pct(a,b)}%"></i></div><span class="lv-time" data-s="${a}" data-e="${b}">${fmtT((b-Date.now())/1000)}</span>`;
function costChips(t,l){
  const c=costOf(t,l);
  return `<div class="chips">${RES.filter(r=>c[r]>0).map(r=>`<span class="chip${state.res[r]<c[r]?' no':''}">${ICON[r]} ${fmtN(c[r])}</span>`).join('')}<span class="chip">${IC.time} ${fmtT(timeOf(t,l))}</span><span class="chip pw">${IC.power} +${fmtI(bPower(t,l)-bPower(t,l-1))} ${_t('Power')}</span></div>`;
}
function actionBtn(t,l,label){
  const why=whyNot(t,l);
  return `<button data-act="build" data-type="${t}" data-lvl="${l}"${why?' disabled':''}>${label}</button>${why?`<div class="why">${why}</div>`:''}`;
}
function renderSheet(){
  if(!cur) return;
  if(cur==='__troops'){ setBody(troopsPanel()); return; }
  if(cur==='__menu'){ setBody(menuPanel()); return; }
  if(cur==='__settings'){ setBody(settingsPanel()); return; }
  if(cur==='__wheel'){ if(!wheelSpinning) setBody(wheelPanel()); return; }
  if(cur==='__quests'){ setBody(questsPanel()); return; }
  if(cur==='__admin'){ setBody(adminPanel()); return; }
  if(cur==='__defense'){ setBody(defensePanel()); return; }
  if(cur==='__inv'){ setBody(inventoryPanel()); return; }
  if(cur==='__speed'){ setBody(speedPanel()); return; }
  if(cur==='__research'){ setBody(researchPanel()); return; }
  if(cur==='__titan'){ setBody(titanPanel()); return; }
  if(cur==='__tile'){ setBody(tilePanel()); return; }
  if(cur==='__attack'){ setBody(attackPanel()); return; }
  if(cur==='__reports'){ setBody(reportsPanel()); updateRepBadge(); return; }
  const s=SLOTS.find(x=>x.id===cur), b=state.slots[cur], q=state.queue&&state.queue.slot===cur?state.queue:null;
  let h='';
  if(q){
    const d=B[q.type];
    h+=`<div class="hd"><div class="big" style="background:${d.color}">${bigIcon(d)}</div><div><h2>${_t(d.name)}</h2><div class="sub">${_t(b?'Upgrading to level {l}':'Building to level {l}',{l:q.lvl})}</div></div></div>
        <div class="prog"><i class="lv-bar" data-s="${q.start}" data-e="${q.end}" style="width:${pct(q.start,q.end)}%"></i></div><div class="sub">${_t('Time left: {t}',{t:`<span class="lv-time" data-s="${q.start}" data-e="${q.end}">${fmtT((q.end-Date.now())/1000)}</span>`})}</div>
        <div style="display:flex;gap:8px;margin-top:10px"><button data-act="speed" data-tg="build">${IC.time} ${_t('Speed up')}</button><button data-act="finish">${_t('Finish now (test)')}</button><button class="sec" data-act="cancel">${_t('Cancel')}</button></div>`;
  } else if(b){
    const d=B[b.type];
    h+=`<div class="hd"><div class="big" style="background:${d.color}">${bigIcon(d,b.lvl)}</div><div><h2>${_t(d.name)}</h2><div class="sub">${_t('Level {l} / {m}',{l:b.lvl,m:MAX})} · ${IC.power} ${fmtI(bPower(b.type,b.lvl))} ${_t('power')}</div></div></div>
        <p>${_t(d.desc)}</p><div class="eff">${_t('Current:')} ${effect(b.type,b.lvl)}</div>`;
    if(TRAINERS.includes(b.type)) h+=trainSection(b.type);
    if(b.type==='garrison') h+=`<h3>${IC.def} ${_t('Defense')}</h3><div class="sub">${_t('Garrison places: {a} / {b}',{a:fmtN(defUsed()),b:fmtN(defCap())})}</div><button data-act="opendef" style="margin-top:6px">${IC.def} ${_t('Manage defense')}</button>`;
    if(b.type==='lab'){ const rc=researchState().cur; h+=`<h3>${IC.research} ${_t('Research')}</h3><div class="sub">${rc?_t('In progress:')+' '+_t(TECH[rc.t].name)+' · '+_t('Lv')+' '+rc.l:_t('No research in progress')}</div><button data-act="openres" style="margin-top:6px">${IC.research} ${_t('Open research')}</button>`; }
    if(b.type==='hangar'){ const T=titanState(); h+=`<h3>${IC.titan_ic} ${_t('Your Titan')}</h3><div class="sub">${_t('Lv {l} · Health {h}%',{l:T.lvl,h:Math.floor(T.hp)})}</div><button data-act="titan" style="margin-top:6px">${IC.titan_ic} ${_t('Manage Titan')}</button>`; }
    if(b.lvl<MAX){ const n=b.lvl+1; h+=`<h3>${_t('Upgrade to level {l}',{l:n})}</h3><div class="eff">${_t('Next:')} ${effect(b.type,n)}</div>${costChips(b.type,n)}${actionBtn(b.type,n,_t('Upgrade'))}`; }
    else h+=`<h3>${_t('Maximum level reached')}</h3>`;
  } else if(s.fixed){
    const t=s.fixed, d=B[t];
    h+=`<div class="hd"><div class="big" style="background:${d.color}">${bigIcon(d)}</div><div><h2>${_t(d.name)}</h2><div class="sub">${_t('Not built')}</div></div></div><p>${_t(d.desc)}</p>${costChips(t,1)}${actionBtn(t,1,_t('Build'))}`;
  } else {
    const fld=s.view==='fields';
    h+= fld ? `<h2>${_t('Empty field')}</h2><div class="sub">${_t('Choose what to produce on this field.')}</div>` : `<h2>${_t('Empty plot')}</h2><div class="sub">${_t('Choose a building to construct here.')}</div>`;
    const list=Object.keys(B).filter(t=>!B[t].fixed && !!B[t].field===fld && !(B[t].unique && exists(t)));
    if(!list.length) h+=`<p style="margin-top:10px">${_t('Every unique building is already built.')}</p>`;
    for(const t of list){ const d=B[t];
      h+=`<div class="row"><div class="top"><div class="big" style="background:${d.color}">${bigIcon(d)}</div><div><b>${_t(d.name)}</b><div class="sub">${_t(d.desc)}</div></div></div>${costChips(t,1)}${actionBtn(t,1,_t('Build'))}</div>`; }
  }
  setBody(h);
}
// A panel is rebuilt only when its content really changed. Timers and progress bars (lv-time, lv-bar) move on their own:
// no flicker, buttons stay under the finger, and a click is never lost because the button was replaced mid-click.
const liveKey = html => html.replace(/(<i class="lv-bar"[^>]*?) style="width:[^"]*"/g,'$1').replace(/(<span class="lv-time"[^>]*>)[^<]*/g,'$1');
let lastBodyKey=null;
function setBody(html){ const body=document.getElementById('sheetBody'), k=liveKey(html);
  if(k===lastBodyKey && body.firstChild){ liveSheet(); return; }
  lastBodyKey=k; body.innerHTML=html; }
function liveIn(root){ const now=Date.now();
  root.querySelectorAll('[data-e]').forEach(el=>{ const a=+el.dataset.s, b=+el.dataset.e;
    if(el.classList.contains('lv-bar')) el.style.width=pct(a,b)+'%'; else if(el.classList.contains('lv-sbar')) el.setAttribute('width', 1.2*pct(a,b)); else if(el.classList.contains('lv-time')) el.textContent=fmtT((b-now)/1000); }); }
function renderAll(){ renderRes(); renderQueue(); renderSlots(); renderSheet(); renderTuto(); }
let openedAt=0; // ignore the "ghost" click that phones send right after the tap that opened the panel
function openSlot(id){ cur=id; openedAt=Date.now(); renderSheet(); renderSlots(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function closeSheet(){ cur=null; document.getElementById('sheet').classList.remove('open'); document.getElementById('back').classList.remove('open'); renderSlots(); }
let tt; function toast(m){ const el=document.getElementById('toast'); el.innerHTML=m; el.classList.add('on'); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove('on'),2200); }

// ===== EVENTS =====
function onAct(e){
  const btn=e.target.closest('[data-act]'); if(!btn) return;
  if(Date.now()-openedAt<450) return;
  const a=btn.dataset.act;
  if(a==='close') closeSheet();
  if(a==='build') startBuild(cur,btn.dataset.type,+btn.dataset.lvl);
  if(a==='finish' && state.queue) complete();
  if(a==='cancel') cancel();
  if(a==='train'){ const u=btn.dataset.unit; train(u, trainQty[u]||0); }
  if(a==='max'){ const u=btn.dataset.unit; trainQty[u]=maxTrain(u); const inp=document.querySelector(`#sheet input[data-qty="${u}"]`); if(inp) inp.value=trainQty[u]||''; updateTrainRow(u); }
  if(a==='tfinish') finishTraining(btn.dataset.bld);
  if(a==='menu'){ const m=MENU[+btn.dataset.i];
    if(typeof m[2]==='function') m[2]();
    else { closeSheet(); toast(_t('Coming in a future update')); } }
  if(a==='lang') setLang(btn.dataset.l);
  if(a==='gocity') setView('city');
  if(a==='attack'){ openPanel('__attack'); }
  if(a==='mmax'){ const u=btn.dataset.unit; atkQty[u]=state.troops[u]||0; const inp=document.querySelector(`#sheet input[data-mq="${u}"]`); if(inp) inp.value=atkQty[u]||''; document.getElementById('atk-sum').innerHTML=atkSummary(); }
  if(a==='launch') launch();
  if(a==='ttoggle'){ atkTitan=!atkTitan; renderSheet(); }
  if(a==='titan') openTitan();
  if(a==='openres') openResearch();
  if(a==='research') startResearch(btn.dataset.t);
  if(a==='openadmin') openAdmin();
  if(a==='wtab'){ wheelTab=btn.dataset.t; renderSheet(); }
  if(a==='wspin' && !wheelSpinning) doSpin(btn.dataset.w);
  if(a==='wdaily') claimDailyTicket();
  if(a==='openwheel') openWheel();
  if(a==='qtab'){ questTab=btn.dataset.t; renderSheet(); }
  if(a==='qclaim') claimQuest(btn.dataset.id);
  if(a==='qgo'){ const q=questById(btn.dataset.id); if(q){ closeSheet(); q.go(); renderTuto(); } }
  if(a.startsWith('adm')) adminAct(a, btn);
  if(a==='logout'){ pushSave(true); setTimeout(()=>logout(false), 300); }
  if(a==='opendef') openDefense();
  if(a==='defin') moveDefense(btn.dataset.unit, defQty[btn.dataset.unit]||0);
  if(a==='defout') moveDefense(btn.dataset.unit, -(defQty[btn.dataset.unit]||0));
  if(a==='defall') moveDefense(btn.dataset.unit, state.troops[btn.dataset.unit]||0);
  if(a==='defnone') moveDefense(btn.dataset.unit, -(defenseState()[btn.dataset.unit]||0));
  if(a==='invtab'){ invTab=btn.dataset.t; renderSheet(); }
  if(a==='iuse') useItem(btn.dataset.id, false);
  if(a==='iuseall') useItem(btn.dataset.id, true);
  if(a==='speed') openSpeed(btn.dataset.tg);
  if(a==='suse') useSpeed(btn.dataset.id);
  if(a==='rfinish') checkResearch(true);
  if(a==='rcancel') cancelResearch();
  if(a==='equip') equip(btn.dataset.id);
  if(a==='uneq') unequip(btn.dataset.s);
  if(a==='scrap') scrap(btn.dataset.id);
  if(a==='mfinish') finishMarch(btn.dataset.id);
  if(a==='rep'){ const id=+btn.dataset.id, r=state.reports.find(x=>x.id===id); openRep = openRep===id?null:id; if(r && !r.read){ r.read=true; if(ONLINE) act('readReport',[id]); else save(); } renderSheet(); updateRepBadge(); }
  if(a==='reset' && ONLINE){ if(confirm(_t('Reset your base?'))) act('reset').then(()=>{ closeSheet(); setView('city'); }); return; }
  if(a==='reset' && confirm(_t('Reset your base?'))){ const op=state.pos; state=fresh(); state.pos= ONLINE ? op : {x:300+Math.floor(Math.random()*150), y:300+Math.floor(Math.random()*150)}; normalizeState(); mcam=null; save(); closeSheet(); setView('city'); renderAll(); }
}
document.getElementById('sheet').addEventListener('input',e=>{ const el=e.target; if(!el.dataset || !el.dataset.qty) return;
  const u=el.dataset.qty; trainQty[u]=Math.max(0,Math.floor(+el.value||0)); updateTrainRow(u); });
document.getElementById('troopsBtn').addEventListener('click',openTroops);
document.getElementById('reportsBtn').addEventListener('click',openReports);
document.getElementById('researchBtn').addEventListener('click',openResearch);
document.getElementById('questsBtn').addEventListener('click',openQuests);
document.getElementById('wheelBtn').addEventListener('click',openWheel);
document.getElementById('defenseBtn').addEventListener('click',openDefense);
document.getElementById('invBtn').addEventListener('click',openInventory);
document.getElementById('sheet').addEventListener('input',e=>{ const el=e.target; if(!el.dataset || !el.dataset.dq) return; defQty[el.dataset.dq]=Math.max(0,Math.floor(+el.value||0)); });
document.getElementById('sheet').addEventListener('input',e=>{ const el=e.target; if(!el.dataset || !el.dataset.mq) return;
  const u=el.dataset.mq; atkQty[u]=Math.max(0,Math.min(state.troops[u]||0,Math.floor(+el.value||0))); document.getElementById('atk-sum').innerHTML=atkSummary(); });
const goCoords=()=>{ const x=Math.max(1,Math.min(MAPN,Math.round(+document.getElementById('cxi').value||1))), y=Math.max(1,Math.min(MAPN,Math.round(+document.getElementById('cyi').value||1)));
  document.activeElement.blur(); camCenter(x,y); mapSel={x,y}; drawMap(); updateCoords(); };
document.getElementById('cgo').addEventListener('click',goCoords);
['cxi','cyi'].forEach(id=>document.getElementById(id).addEventListener('keydown',e=>{ if(e.key==='Enter') goCoords(); }));
document.getElementById('chome').addEventListener('click',()=>{ camCenter(state.pos.x,state.pos.y); mapSel=null; drawMap(); updateCoords(); });
document.getElementById('menuBtn').addEventListener('click',openMenu);
document.getElementById('nTitan').addEventListener('click',openTitan);
document.querySelector('.resbar').addEventListener('click',e=>e.currentTarget.classList.toggle('rates')); // tap: show production per hour
document.getElementById('sheet').addEventListener('click',onAct);
document.getElementById('queue').addEventListener('click',onAct);
document.getElementById('back').addEventListener('click',()=>{ if(Date.now()-openedAt>450) closeSheet(); });
document.querySelectorAll('#hud [data-soon]').forEach(a=>a.addEventListener('click',()=>toast(_t('Coming in a future update'))));
document.getElementById('titanCard').addEventListener('click',openTitan);
document.querySelectorAll('#hud [data-view]').forEach(a=>a.addEventListener('click',()=>setView(a.dataset.view)));

// ===== PAN & ZOOM (mouse, touch, pinch) =====
const vp=document.getElementById('viewport');
let sc=1, tx=0, ty=0, downT=null, moved=0, pinch=null; const ptrs=new Map();
const vsize=()=>({w:vp.clientWidth,h:vp.clientHeight});
// responsive zoom limit: the picture fills the screen; only a screen much wider than the picture (21:9 without wide art)
// or a phone held upright may zoom out further, the empty sides then show a blurred copy of the picture
const minS=()=>{ const v=vsize(), contain=Math.min(v.w/W,v.h/H), cover=Math.max(v.w/W,v.h/H);
  if(v.h>v.w) return cover;   // phone held upright: the picture fills the screen, slide to see the rest
  return v.w/v.h > (W/H)*1.15 ? contain : cover; };
function apply(){ const v=vsize(); sc=Math.min(1.6,Math.max(minS(),sc));
  tx = W*sc<=v.w ? (v.w-W*sc)/2 : Math.min(0,Math.max(v.w-W*sc,tx));   /* smaller than the screen: centred over the blurred backdrop */
  ty = H*sc<=v.h ? (v.h-H*sc)/2 : Math.min(0,Math.max(v.h-H*sc,ty));
  world.style.transform=`translate(${tx}px,${ty}px) scale(${sc})`; }
function zoomAt(f,cx,cy){ const ns=Math.min(1.6,Math.max(minS(),sc*f)), k=ns/sc; tx=cx-(cx-tx)*k; ty=cy-(cy-ty)*k; sc=ns; apply(); }
vp.addEventListener('pointerdown',e=>{
  if(e.target.closest('#zoom,#reset,.coordbox')) return;
  vp.setPointerCapture(e.pointerId); ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY});
  if(ptrs.size===1){ downT=e.target; moved=0; } else { downT=null; pinch=null; }
});
vp.addEventListener('pointermove',e=>{
  const p=ptrs.get(e.pointerId); if(!p) return;
  if(ptrs.size===1){ const dx=e.clientX-p.x, dy=e.clientY-p.y; moved+=Math.abs(dx)+Math.abs(dy); if(view==='map') mapPan(dx,dy); else { tx+=dx; ty+=dy; apply(); } if(moved>8) vp.classList.add('drag'); }
  p.x=e.clientX; p.y=e.clientY;
  if(ptrs.size===2){ const [a,b]=[...ptrs.values()], r=vp.getBoundingClientRect(), d=Math.hypot(a.x-b.x,a.y-b.y), mx=(a.x+b.x)/2-r.left, my=(a.y+b.y)/2-r.top;
    if(pinch){ if(view==='map'){ mapZoomAt(d/pinch.d,mx,my); mapPan(mx-pinch.mx,my-pinch.my); } else { zoomAt(d/pinch.d,mx,my); tx+=mx-pinch.mx; ty+=my-pinch.my; apply(); } } pinch={d,mx,my}; }
});
function up(e){
  if(!ptrs.has(e.pointerId)) return; ptrs.delete(e.pointerId); if(ptrs.size<2) pinch=null;
  if(ptrs.size===0){ vp.classList.remove('drag'); if(view==='map'){ if(downT && moved<8){ const r=vp.getBoundingClientRect(), [x,y]=screenToCell(e.clientX-r.left,e.clientY-r.top); if(x>=1&&y>=1&&x<=MAPN&&y<=MAPN){ mapSel={x,y}; drawMap(); openPanel('__tile'); } } downT=null; return; } if(downT && moved<8 && downT.closest){ const g=downT.closest('[data-slot]'); if(downT.closest('[data-titan]')) openTitan(); else if(g) openSlot(g.dataset.slot); else { const go=downT.closest('[data-goto]'); if(go) setView(go.dataset.goto); } } downT=null; }
}
vp.addEventListener('pointerup',up); vp.addEventListener('pointercancel',up);
const zoomAny=(f,x,y)=>view==='map'?mapZoomAt(f,x,y):zoomAt(f,x,y);
vp.addEventListener('wheel',e=>{ e.preventDefault(); const r=vp.getBoundingClientRect(); zoomAny(e.deltaY<0?1.12:1/1.12,e.clientX-r.left,e.clientY-r.top); },{passive:false});
document.getElementById('zin').onclick=()=>{ const v=vsize(); zoomAny(1.2,v.w/2,v.h/2); };
document.getElementById('zout').onclick=()=>{ const v=vsize(); zoomAny(1/1.2,v.w/2,v.h/2); };
window.addEventListener('resize',()=>{ apply(); if(view==='map'){ resizeMap(); drawMap(); } });

// ===== GAME LOOP =====
function tick(){
  const now=Date.now(), dt=Math.max(0,(now-state.last)/1000); state.last=now; const c=cap(), rt=rates(), ra0=state.res.rations;
  for(const r of RES){
    if(r==='gold'){ state.res.gold+=rt.gold*dt/3600; continue; }            // gold has no storage limit
    if(rt[r]>=0){ if(state.res[r]<c) state.res[r]=Math.min(c,state.res[r]+rt[r]*dt/3600); }
    else state.res[r]=Math.max(0,state.res[r]+rt[r]*dt/3600);             // rations can go down (troop upkeep)
  }
  if(state.res.rations<=0 && rt.rations<0) desert(Math.max(0, dt - (ra0>0 ? ra0/(-rt.rations)*3600 : 0)));   // only the time spent without rations
  if(ONLINE){ if(dueOnServer()) syncState(); }   // the server decides what is finished
  else { if(state.queue && now>=state.queue.end) complete(); checkTraining(); checkResearch(); processMarches(); }
  { const T=titanState(); if(!T.away && T.hp<100 && bldLevel('hangar')) T.hp=Math.min(100, T.hp+repairRate()*dt/3600); }
  updateRepBadge(); drawClock(); renderTuto(); if(view==='map' && state.marches.length) requestDraw();
  renderRes(); renderQueue(); if(state.queue) renderSlots();
  if(cur==='__wheel' && !wheelSpinning){ const e=document.getElementById('wcd'); if(e){ if(dailyReady()) renderSheet(); else e.textContent=fmtT(secsToMidnight(Date.now())); } }
  if(cur && cur!=='__admin' && cur!=='__menu' && cur!=='__wheel'){ const ae=document.activeElement; // don't rebuild the panel while the player is typing a number
    if(ae && ae.tagName==='INPUT' && document.getElementById('sheet').contains(ae)) liveSheet(); else renderSheet(); }
  save();
}
function centerOn(x,y){ const v=vsize(); sc=Math.max(minS(), v.w<600?0.5:0.7); tx=v.w/2-(x+OX)*sc; ty=v.h/2-y*sc; apply(); }
(function(){ const av=document.getElementById('avatar'); av.style.backgroundImage=`url(${PORTRAIT}), radial-gradient(circle at 50% 35%,#55663f,#1c2318)`; av.style.backgroundSize='135%, cover'; av.style.backgroundPosition='45% 8%, center'; })();
document.querySelectorAll('img[data-ic]').forEach(i=>{ i.src=ICS[i.dataset.ic]; });
(function(){ const F={"fr_btn": "assets/img/fr_btn.webp", "fr_bar": "assets/img/fr_bar.webp", "fr_win": "assets/img/fr_win.webp", "fr_slot": "assets/img/fr_slot.webp"};
  for(const k in F) document.documentElement.style.setProperty('--'+k.replace('_','-'), `url(${new URL(F[k], location.href).href})`); })();

// =====================================================================
// ===== ONLINE: player accounts and saves on the Bastion server =====
// When the game is opened from the Bastion server, the player logs in and the game is saved there.
// Opened from anywhere else (GitHub Pages, a file), it stays an offline demo saved in the browser.
// =====================================================================
var ONLINE=false, NET={token:null, name:null, dirty:false, pushing:false, others:new Map()};
const TOKEN_KEY='bastion_token';
async function apiCall(method, url, body){
  const r = await fetch(url, {method, headers:Object.assign({'Content-Type':'application/json'}, NET.token?{Authorization:'Bearer '+NET.token}:{}), body: body?JSON.stringify(body):undefined, cache:'no-store', keepalive: method==='PUT'});
  let j={}; try{ j=await r.json(); }catch(e){}
  noteServerTime(r);
  if(!r.ok){ const e=new Error(j.error||('http_'+r.status)); e.status=r.status; throw e; }
  return j; }
function pushSave(force){
  if(!ONLINE || !NET.token || NET.pushing || (!NET.dirty && !force)) return;
  NET.pushing=true; NET.dirty=false;
  apiCall('PUT','api/state',{state, lvl:playerLevel(totalPower()), power:totalPower()})
    .catch(e=>{ NET.dirty=true; if(e.status===401) logout(true); })
    .finally(()=>{ NET.pushing=false; }); }
async function loadPlayers(){
  if(!ONLINE || !NET.token) return;
  try{ const j=await apiCall('GET','api/players'); const m=new Map(); for(const p of j.players) m.set(p.x*1024+p.y, p); NET.others=m; resetTiles(); if(view==='map') requestDraw(); }catch(e){} }
function logout(expired){
  if(NET.token) apiCall('POST','api/logout').catch(()=>{});
  try{ localStorage.removeItem(TOKEN_KEY); }catch(e){}
  NET.token=null; if(expired) alertLogin(_t('Your session has expired, please log in again.')); else location.reload(); }
let alertLogin=()=>location.reload();
const LOGIN_ERR = {bad_name:'The name must have 3 to 16 letters, numbers, spaces, - or _.', bad_password:'The password must have at least 6 characters.', name_taken:'This name is already taken.',
  bad_login:'Wrong name or password.', too_many:'Too many tries. Wait a few minutes.', bad_request:'Server error. Try again later.', server_error:'Server error. Try again later.'};
function showLogin(msg){
  let ov=document.getElementById('login'); if(ov) ov.remove();
  ov=document.createElement('div'); ov.id='login';
  ov.innerHTML=`<div class="lbox"><div class="ltitle">BASTION</div><div class="lsub">${_t('Military strategy · near future')}</div>
    <div class="ltabs"><button class="on" data-lt="login">${_t('Log in')}</button><button data-lt="register">${_t('Create an account')}</button></div>
    <input id="lname" maxlength="16" autocomplete="username" placeholder="${_t('Commander name')}">
    <input id="lpass" type="password" maxlength="100" autocomplete="current-password" placeholder="${_t('Password')}">
    <input id="lpass2" type="password" maxlength="100" autocomplete="new-password" placeholder="${_t('Repeat the password')}" style="display:none">
    <div class="lerr" id="lerr">${msg||''}</div>
    <button class="lgo" id="lgo">${_t('Log in')}</button>
    <select id="llang">${LANGS.map(([c,n])=>`<option value="${c}"${c===LANG?' selected':''}>${n}</option>`).join('')}</select></div>`;
  document.body.appendChild(ov);
  let mode='login';
  const q=id=>ov.querySelector('#'+id), err=t=>{ q('lerr').textContent=t; };
  ov.querySelectorAll('[data-lt]').forEach(b=>b.onclick=()=>{ mode=b.dataset.lt; ov.querySelectorAll('[data-lt]').forEach(x=>x.classList.toggle('on',x===b));
    q('lpass2').style.display=mode==='register'?'':'none'; q('lpass').autocomplete=mode==='register'?'new-password':'current-password'; q('lgo').textContent=_t(mode==='register'?'Create an account':'Log in'); err(''); });
  q('llang').onchange=e=>{ LANG=e.target.value; try{ localStorage.setItem('bastion_lang',LANG); }catch(x){} applyStatic(); showLogin(); };
  const go=async()=>{ const name=q('lname').value.trim(), password=q('lpass').value;
    if(mode==='register' && password!==q('lpass2').value) return err(_t('The two passwords are different.'));
    q('lgo').disabled=true;
    try{ const j=await apiCall('POST', mode==='register'?'api/register':'api/login', {name,password});
      NET.token=j.token; try{ localStorage.setItem(TOKEN_KEY,j.token); }catch(x){} ov.remove(); await enterOnline(); }
    catch(e){ err(_t(LOGIN_ERR[e.message]||'Cannot reach the server.')); q('lgo').disabled=false; } };
  q('lgo').onclick=go; ov.addEventListener('keydown',e=>{ if(e.key==='Enter') go(); });
  setTimeout(()=>q('lname').focus(),50); }
async function enterOnline(){
  let j; try{ j=await apiCall('GET','api/state'); }catch(e){ if(e.status===401){ try{ localStorage.removeItem(TOKEN_KEY); }catch(x){} NET.token=null; return showLogin(); } return showLogin(_t('Cannot reach the server.')); }
  NET.name=j.name; NET.role=j.role||'player'; document.body.classList.toggle('notest', !isStaff());
  const st=j.state; st.pos=j.pos; state=st; normalizeState(); resetTiles(); mcam=null;
  goOnlineOrders(); await pingBurst(); startGame(); loadPlayers(); lastSync=Date.now();
  setInterval(()=>syncState(true), 30000); setInterval(ping, 10000); setInterval(loadPlayers, 60000);
  document.addEventListener('visibilitychange',()=>{ if(document.visibilityState==='visible') syncState(true); });
  toast(IC.ok+' '+_t('Welcome, commander {n}!',{n:NET.name})); }
async function boot(){
  let h=null; if(location.protocol.startsWith('http') && !/github\.io$/.test(location.hostname)){ try{ const r=await fetch('api/health',{cache:'no-store'}); if(r.ok) h=await r.json(); }catch(e){} }
  if(!h || h.game!=='Bastion'){ startGame(); return; }       // offline demo
  ONLINE=true; alertLogin=m=>showLogin(m);
  try{ NET.token=localStorage.getItem(TOKEN_KEY); }catch(e){}
  if(NET.token) enterOnline(); else showLogin(); }

// =====================================================================
// ===== QUESTS AND TUTORIAL (the server checks them and gives the rewards) =====
// =====================================================================
function questState(){ if(!state.quests) state.quests={done:{}}; return state.quests; }
function statsState(){ if(!state.stats) state.stats={wins:(state.reports||[]).filter(r=>r.win).length, campWins:(state.reports||[]).filter(r=>r.win&&r.tt==='camp').length}; return state.stats; }
const countType = t => Object.values(state.slots).filter(b=>b.type===t).length;
const armySize = () => { const D=defenseState(), mm=marching(); let n=0; for(const u in UNITS) n+=(state.troops[u]||0)+(D[u]||0)+(mm[u]||0); return n; };
const techTotal = () => { let n=0; for(const t in TECH) n+=techLv(t); return n; };
const firstSlot = (t) => { for(const k in state.slots) if(state.slots[k].type===t) return k; return null; };
const emptySlot = (field) => { const s=SLOTS.find(s=>!s.fixed && !s.deco && !!s.view===!!field && !state.slots[s.id] && !(state.queue&&state.queue.slot===s.id)); return s&&s.id; };
const bImg = t => t==='wall' ? `assets/img/wall_${wallStage()}.webp` : B[t].img || ICS.build;
// where "Go" takes the player
function goBuild(t){ const k=firstSlot(t) || (SLOTS.find(s=>s.fixed===t)||{}).id || emptySlot(!!B[t].field); if(!k) return; const s=SLOTS.find(x=>x.id===k);
  setView(s.view==='fields'?'fields':'city'); hintSlot=k; centerOn(s.x, s.y); openSlot(k); }
function goAttack(){ setView('map'); for(let r=2;r<40;r+=2) for(let dx=-r;dx<=r;dx+=2){ const x=state.pos.x+dx,y=state.pos.y+r, t=tileAt(x,y); if(t&&t.t==='camp'&&t.lvl===1){ camCenter(x,y); mapSel={x,y}; drawMap(); openPanel('__tile'); return; } } }
// q(id, category, title, progress, reward, go, icon)
const QUESTS=[];
const Q_=(id,cat,title,prog,reward,go,icon)=>QUESTS.push({id,cat,title,prog,reward,go,icon});
const R=(res,items)=>({res:res||{}, items:items||{}});
const all5 = n => ({metal:n,wood:n,stone:n,fuel:Math.round(n/2)});
// ---- tutorial: the first steps, in order ----
[['mine',R({wood:2000,stone:2000},{speed_5m:2})],['sawmill',R({metal:2000,stone:2000},{speed_5m:2})],['quarry',R({metal:2000,wood:2000},{speed_5m:2})],['mess',R({metal:1500,wood:1500,stone:1500},{speed_15m:1})]]
  .forEach(([t,rw])=>Q_('t_'+t,'tuto',()=>_t('Build a {b}',{b:_t(B[t].name)}),()=>[Math.min(1,countType(t)),1],rw,()=>goBuild(t),()=>bImg(t)));
Q_('t_cc2','tuto',()=>_t('Upgrade the {b} to level {l}',{b:_t('Command Center'),l:2}),()=>[Math.min(2,ccLvl()),2],R(all5(5000),{speed_15m:2}),()=>goBuild('command'),()=>bImg('command'));
Q_('t_housing','tuto',()=>_t('Build a {b}',{b:_t('Housing Block')}),()=>[Math.min(1,countType('housing')),1],R(all5(3000),{speed_15m:1}),()=>goBuild('housing'),()=>bImg('housing'));
Q_('t_barracks','tuto',()=>_t('Build a {b}',{b:_t('Barracks')}),()=>[Math.min(1,countType('barracks')),1],R(all5(4000),{speed_15m:2}),()=>goBuild('barracks'),()=>bImg('barracks'));
Q_('t_recruits','tuto',()=>_t('Have {n} {u}',{n:50,u:_t('Recruit')}),()=>{ const D=defenseState(),mm=marching(); return [Math.min(50,(state.troops.recruit||0)+(D.recruit||0)+(mm.recruit||0)),50]; },R({rations:5000},{train_30:1}),()=>goBuild('barracks'),()=>UNITS.recruit.img);
Q_('t_rally','tuto',()=>_t('Build a {b}',{b:_t('Rally Point')}),()=>[Math.min(1,countType('rally')),1],R(all5(4000),{speed_15m:2}),()=>goBuild('rally'),()=>bImg('rally'));
Q_('t_attack','tuto',()=>_t('Win a battle against a Raider Camp'),()=>[Math.min(1,statsState().campWins||0),1],R(all5(6000),{chest_bronze:1, wheel_ticket:1}),goAttack,()=>MSPR.camp1.img);
Q_('t_lab','tuto',()=>_t('Build a {b}',{b:_t('Research Lab')}),()=>[Math.min(1,countType('lab')),1],R(all5(6000),{speed_1h:1}),()=>goBuild('lab'),()=>bImg('lab'));
Q_('t_research','tuto',()=>_t('Research any technology'),()=>[Math.min(1,techTotal()),1],R(all5(8000),{chest_bronze:1, speed_1h:1, wheel_ticket:2}),()=>openResearch(),()=>ICS.research);
// ---- long goals, in chains ----
for(let l=3;l<=10;l++) Q_('cc_'+l,'build',()=>_t('Upgrade the {b} to level {l}',{b:_t('Command Center'),l}),()=>[Math.min(l,ccLvl()),l],R(all5(Math.round(4000*Math.pow(2.6,l-2))),{['speed_'+(l<5?'1h':l<8?'8h':'24h')]:1, ...(l%3===0?{chest_bronze:1}:{}), ...(l>=6?{wheel_medal:1}:{wheel_ticket:2}), ...(l===10?{chest_gold:1}:{})}),()=>goBuild('command'),()=>bImg('command'));
for(const l of [3,5,8,10]) Q_('wall_'+l,'build',()=>_t('Upgrade the {b} to level {l}',{b:_t('Defense Wall'),l}),()=>[Math.min(l,bldLevel('wall')),l],R(all5(Math.round(5000*Math.pow(2.6,l-2))),{['speed_'+(l<5?'1h':'8h')]:1}),()=>goBuild('wall'),()=>`assets/img/wall_${l<=3?1:l<=6?2:l<=9?3:4}.webp`);
for(const [i,n] of [5,10,20,30].entries()) Q_('fields_'+n,'build',()=>_t('Have {n} fields',{n}),()=>{ const c=Object.values(state.slots).filter(b=>B[b.type]&&B[b.type].field).length; return [Math.min(n,c),n]; },R(all5(n*1500),{['boost_prod_'+['metal','wood','stone','fuel'][i]]:1, speed_15m:2}),()=>{ setView('fields'); },()=>bImg('mine'));
for(const n of [100,1000,5000,20000,100000]) Q_('army_'+n,'mil',()=>_t('Have an army of {n} troops',{n:fmtN(n)}),()=>[Math.min(n,armySize()),n],R({rations:n*20, gold:Math.round(n/2)},{train_30:n>=5000?2:1, ...(n>=20000?{chest_silver:1}:{})}),()=>goBuild('barracks'),()=>UNITS.rifleman.img);
for(const n of [5,25,100,500]) Q_('wins_'+n,'mil',()=>_t('Win {n} battles',{n}),()=>[Math.min(n,statsState().wins||0),n],R(all5(n*2000),{chest_bronze:n>=100?3:1, ...(n>=500?{chest_silver:2}:{})}),goAttack,()=>ICS.win);
for(const n of [5,20,50,100]) Q_('tech_'+n,'res',()=>_t('Reach {n} research levels in total',{n}),()=>[Math.min(n,techTotal()),n],R(all5(n*3000),{['speed_'+(n<20?'1h':n<100?'8h':'24h')]:2}),()=>openResearch(),()=>ICS.research);
Q_('titan_build','titan',()=>_t('Build the {b}',{b:_t('Titan Hangar')}),()=>[Math.min(1,bldLevel('hangar')),1],R(all5(10000),{repair_s:2}),()=>goBuild('hangar'),()=>bImg('hangar'));
for(const l of [3,5,8,10]) Q_('titan_'+l,'titan',()=>_t('Titan level {l}',{l}),()=>[Math.min(l,titanState().lvl),l],R(all5(l*8000),{repair_l:1, ...(l>=8?{chest_silver:1}:{})}),()=>openTitan(),()=>titanImg());
Q_('titan_part','titan',()=>_t('Equip a part on your Titan'),()=>[Math.min(1,Object.keys(titanState().eq).length),1],R(all5(15000),{repair_l:1}),()=>openTitan(),()=>EQIMG.armor_1);
for(const n of [10000,100000,1000000,10000000]) Q_('power_'+n,'power',()=>_t('Reach {n} power',{n:fmtN(n)}),()=>[Math.min(n,totalPower()),n],R(all5(Math.round(n/2)),{chest_bronze:1, ...(n>=1000000?{chest_silver:1}:{}), ...(n>=10000000?{chest_gold:1}:{})}),()=>setView('city'),()=>ICS.power);
QUESTS.forEach(q=>{ for(const k in q.reward.items) if(!q.reward.items[k]) delete q.reward.items[k]; });
const QUEST_CATS=[['tuto','Tutorial'],['build','Construction'],['mil','Military'],['res','Research'],['titan','Titan'],['power','Power']];
const questById = id => QUESTS.find(q=>q.id===id);
const questDone = q => { const [a,b]=q.prog(); return a>=b; };
// the next quests of each chain: a quest shows once the previous one of its category is claimed
function visibleQuests(cat){ const D=questState().done, out=[]; for(const q of QUESTS){ if(q.cat!==cat || D[q.id]) continue; out.push(q); if(cat==='tuto' || out.length>=3) break; } return out; }
const tutoQuest = () => visibleQuests('tuto')[0] || null;
const claimable = () => QUEST_CATS.reduce((n,[c])=>n+visibleQuests(c).filter(questDone).length,0);
function claimQuest(id){
  const q=questById(id), D=questState().done; if(!q || D[id] || !visibleQuests(q.cat).includes(q) || !questDone(q)) return 'bad_order';
  D[id]=Date.now();
  for(const r in q.reward.res) state.res[r]=(state.res[r]||0)+q.reward.res[r];
  for(const i in q.reward.items) if(ITEMS[i]) addItem(i, q.reward.items[i]);
  toast(IC.ok+' '+_t('Quest complete: {q}',{q:q.title()})); save(); renderAll(); }
function rewardChips(rw){ return `<div class="chips">${Object.keys(rw.res).map(r=>`<span class="chip">${ICON[r]} ${fmtN(rw.res[r])}</span>`).join('')}${Object.keys(rw.items).map(i=>`<span class="chip">${itemIcon(i,22)} ${rw.items[i]>1?rw.items[i]+' × ':''}${itemName(i)}</span>`).join('')}</div>`; }
let questTab='tuto';
function questsPanel(){
  if(!tutoQuest() && questTab==='tuto') questTab='build';
  let h=`<div class="hd"><div class="big">${IC.quests}</div><div style="flex:1;min-width:0"><h2>${_t('Quests')}</h2><div class="sub">${_t('Complete quests to win resources, speed-ups and chests.')}</div></div></div>`;
  h+=`<div class="itabs">${QUEST_CATS.filter(([c])=>c!=='tuto'||tutoQuest()).map(([c,l])=>{ const n=visibleQuests(c).filter(questDone).length; return `<button class="tab2${c===questTab?' on':''}" data-act="qtab" data-t="${c}">${_t(l)}${n?` <small class="qdot">${n}</small>`:''}</button>`; }).join('')}</div>`;
  const list=visibleQuests(questTab);
  if(!list.length) return h+`<p class="sub" style="margin-top:10px">${_t('All quests of this category are complete!')}</p>`;
  for(const q of list){ const [a,b]=q.prog(), done=a>=b;
    h+=`<div class="row quest${done?' done':''}"><div class="top"><span class="iti" style="width:52px;height:52px"><img src="${q.icon()}" alt=""></span><div style="flex:1;min-width:0">
      <b>${q.title()}</b><div class="prog qprog"><i style="width:${Math.min(100,a/b*100)}%"></i></div><div class="sub">${fmtN(a)} / ${fmtN(b)}</div>
      <div class="sub" style="margin-top:4px">${_t('Reward:')}</div>${rewardChips(q.reward)}
      <div class="trow2">${done?`<button class="sm" data-act="qclaim" data-id="${q.id}">${IC.drop} ${_t('Collect')}</button>`:`<button class="sec sm" data-act="qgo" data-id="${q.id}">${_t('Go')}</button>`}</div></div></div></div>`; }
  return h; }
function openQuests(){ openPanel('__quests'); }
// tutorial bar: the current step, always visible until the tutorial is over
let hintSlot=null;
function renderTuto(){
  let el=document.getElementById('tuto'); const q=tutoQuest();
  if(!q){ if(el) el.remove(); hintSlot=null; return; }
  if(!el){ el=document.createElement('div'); el.id='tuto'; document.body.appendChild(el); el.addEventListener('click',onAct); }
  const [a,b]=q.prog(), done=a>=b, step=QUESTS.filter(x=>x.cat==='tuto').indexOf(q)+1, total=QUESTS.filter(x=>x.cat==='tuto').length;
  const html=`<img src="${q.icon()}" alt=""><div class="tt"><small>${_t('Tutorial')} ${step}/${total}</small><b>${q.title()}</b></div>${done?`<button class="sm glow" data-act="qclaim" data-id="${q.id}">${_t('Collect')}</button>`:`<button class="sm" data-act="qgo" data-id="${q.id}">${_t('Go')}</button>`}`;
  if(el.dataset.h!==html){ el.innerHTML=html; el.dataset.h=html; }
  { const bt=document.querySelector('#hud .bottom'), r=bt&&bt.getBoundingClientRect();   // always just above the activity bar, whatever its height
    if(r && r.height){ const v=Math.round(window.innerHeight-r.top+8)+'px'; if(el.style.bottom!==v) el.style.bottom=v; } }
  if(done) hintSlot=null;
  const qb=document.getElementById('questBadge'), n=claimable(); if(qb){ qb.textContent=n; qb.style.display=n?'':'none'; } }

// =====================================================================
// ===== WHEEL OF FORTUNE: ticket wheel and medal wheel (the server spins) =====
// =====================================================================
const wheelTZ = () => (typeof CLOCK!=='undefined' && CLOCK.tz) || 'Europe/Paris';
const wheelRnd = n => (typeof __rnd==='function' ? __rnd(n) : Math.floor(Math.random()*n));
function dayKey(ts){ return new Intl.DateTimeFormat('en-CA',{timeZone:wheelTZ(),year:'numeric',month:'2-digit',day:'2-digit'}).format(ts); }
function secsToMidnight(ts){ const p=new Intl.DateTimeFormat('en-GB',{timeZone:wheelTZ(),hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).formatToParts(ts), g=k=>+(p.find(x=>x.type===k)||{value:0}).value;
  return 86400-((g('hour')%24)*3600+g('minute')*60+g('second')); }
function wheelState(){ if(!state.wheel) state.wheel={day:''}; return state.wheel; }
const dailyReady = () => wheelState().day !== dayKey(Date.now());
function giveReward(r){
  if(r.k==='item') addItem(r.id, r.n); else if(r.k==='troops') state.troops[r.u]=(state.troops[r.u]||0)+r.n;
  else titanState().inv.push({id:Date.now()*10+Math.floor(Math.random()*9), s:r.s, t:r.t}); }
function claimDailyTicket(){
  if(!dailyReady()) return 'already_claimed';
  wheelState().day=dayKey(Date.now()); addItem('wheel_ticket',1);
  toast(IC.ok+' '+_t('Free ticket of the day collected!')); save(); renderAll(); }
function doSpin(wheel){
  if(!WHEELS[wheel] || !invN(wheel)) return 'bad_order';
  takeItem(wheel); const res=spinWheel(wheel, wheelRnd); giveReward(res.reward); save();
  wheelResult(wheel, res.idx, res.reward); }
// ---------- display ----------
let wheelTab='wheel_ticket', wheelSpinning=false; const wheelAngle={wheel_ticket:0, wheel_medal:0}, wheelLast={};
function wheelResult(wheel, idx, reward){ wheelAnimate(wheel, idx, reward); }
function segLabel(rw){ if(rw.k==='troops') return `${fmtN(rw.n[0])}–${fmtN(rw.n[1])}`; if(rw.k==='part') return _t(EQ_TIER[rw.t]); return rw.n[0]>1?'×'+rw.n[0]:''; }
function segIcon(rw){
  if(rw.k==='troops') return UNITS[rw.u].img;
  if(rw.k==='part') return EQIMG['armor_'+rw.t];
  const id=rw.id.split('|')[0].replace('*','metal'); return itemArt(id) || ICS.drop; }
function wheelHTML(wheel){
  const pool=WHEELS[wheel], n=pool.length, step=360/n;
  const grad=pool.map((l,i)=>`${l[1]==='legendary'?'#6b4a12':l[1]==='epic'?'#3c2756':i%2?'#1c2418':'#2a3424'} ${i*step}deg ${(i+1)*step}deg`).join(',');   // jackpots stand out
  return `<div class="wheel"><div class="wpointer"></div><div class="wspin" id="wspin" style="transform:rotate(${wheelAngle[wheel]}deg)">
    <div class="wface" style="background:conic-gradient(${grad})"></div>
    ${pool.map((l,i)=>`<div class="wseg" style="transform:rotate(${i*step+step/2}deg)"><i style="background:${RARITY_COL[l[1]]}"></i><img src="${segIcon(l[2])}" alt=""><small>${segLabel(l[2])}</small></div>`).join('')}
    <div class="whub"><img src="${ICS.wheel}" alt=""></div></div></div>`; }
function wheelChances(wheel){
  const pool=WHEELS[wheel], tot=pool.reduce((s,l)=>s+l[0],0);
  const name=rw=> rw.k==='troops' ? `${fmtN(rw.n[0])}–${fmtN(rw.n[1])} ${_t(UNITS[rw.u].name)}` : rw.k==='part' ? `${_t('Titan part')} · ${_t(EQ_TIER[rw.t])}` :
    (()=>{ const m=/^crate_\*_(s|m|l)$/.exec(rw.id), q=rw.n[0]>1?rw.n[0]+' × ':'';
      if(m) return q+_t({s:'Small crate of a random resource',m:'Medium crate of a random resource',l:'Large crate of a random resource'}[m[1]]);
      if(rw.id==='boost_prod_*') return q+_t('Production boost (random resource)'); return q+rw.id.split('|').map(itemName).join(' / '); })();
  return `<details class="chances" data-ch="${wheel}"${openChances.has(wheel)?' open':''}><summary>${_t('See the chances')}</summary>
    ${pool.map(l=>`<div class="chr"><div><span style="color:${RARITY_COL[l[1]]}">●</span> ${name(l[2])} <span>${(l[0]/tot*100).toFixed(1).replace('.0','')} %</span></div></div>`).join('')}</details>`; }
function wheelPanel(){
  const w=wheelTab, own=invN(w), isT=w==='wheel_ticket';
  let h=`<div class="hd"><div class="big"><img class="bimg" src="${ICS.wheel}" alt=""></div><div style="flex:1;min-width:0"><h2>${_t('Wheel of fortune')}</h2>
    <div class="sub">${_t('Spin the wheel to win troops, speed-ups, resources and chests.')}</div></div></div>
    <div class="itabs"><button class="tab2${isT?' on':''}" data-act="wtab" data-t="wheel_ticket">${_t('Ticket wheel')} <small>${fmtN(invN('wheel_ticket'))}</small></button>
      <button class="tab2${!isT?' on':''}" data-act="wtab" data-t="wheel_medal">${_t('Medal wheel')} <small>${fmtN(invN('wheel_medal'))}</small></button></div>
    ${wheelHTML(w)}
    <div class="wctl"><span class="wown">${itemIcon(w,34)} ${itemName(w)} × ${fmtN(own)}</span>
      <button data-act="wspin" data-w="${w}"${own&&!wheelSpinning?'':' disabled'}>${_t('Spin')} (1)</button></div>`;
  if(isT) h+= dailyReady() ? `<button class="sec wdaily glow" data-act="wdaily">${IC.drop} ${_t('Collect the free ticket of the day')}</button>`
    : `<div class="sub wdaily">${IC.time} ${_t('Next free ticket in {t}',{t:`<b id="wcd">${fmtT(secsToMidnight(Date.now()))}</b>`})}</div>`;
  else h+=`<div class="sub wdaily">${_t('Medals are won in the hardest camps, in big quests and in chests.')}</div>`;
  h+=`<div id="wres">${wheelLast[w]||''}</div>`+wheelChances(w);
  return h; }
function openWheel(){ openPanel('__wheel'); }
function wheelAnimate(wheel, idx, reward){
  if(cur!=='__wheel' || wheelTab!==wheel){ wheelTab=wheel; openPanel('__wheel'); }
  const n=WHEELS[wheel].length, step=360/n, a=idx*step+step/2, curA=wheelAngle[wheel];
  const target=curA + 360*5 + (((360-a) - (curA%360)) % 360 + 360) % 360;
  renderSheetNow(); wheelSpinning=true; wheelAngle[wheel]=target;
  const el=document.getElementById('wspin'); if(el){ el.style.transition='none'; void el.offsetWidth; el.style.transition='transform 4.6s cubic-bezier(.15,.7,.2,1)'; el.style.transform=`rotate(${target}deg)`; }
  setTimeout(()=>{ wheelSpinning=false;
    wheelLast[wheel]=`<div class="cfx-card" style="--rc:${RARITY_COL[reward.rarity]}">${rewardIcon(reward,72)}<b>${reward.n&&reward.k!=='part'?'× '+fmtN(reward.n)+' ':''}${rewardName(reward)}</b><small style="color:${RARITY_COL[reward.rarity]}">${_t(RARITY_NAME[reward.rarity])}</small></div>`;
    toast(IC.drop+' '+rewardName(reward)); renderSheetNow(); }, 4700); }
function renderSheetNow(){ const sp=wheelSpinning; wheelSpinning=false; if(cur==='__wheel') setBody(wheelPanel()); wheelSpinning=sp;
  const b=document.querySelector('#sheet [data-act=wspin]'); if(b && sp) b.disabled=true; }

// =====================================================================
// ===== ONLINE ORDERS: the server runs every action, the browser only shows the result =====
// =====================================================================
Object.assign(LOGIN_ERR, {bad_order:'Order refused by the server.', forbidden:'Reserved for administrators.'});
// answers can arrive out of order (a slow sync after a fast order): an older game state never replaces a newer one
let netSeq=0, netApplied=0;
function applyServer(j, seq){
  if(seq!==undefined){ if(seq<netApplied) j={...j, state:null}; else netApplied=seq; }
  if(j.state){ const st0=wallStage(); state=j.state; normalizeState(); if(wallStage()!==st0){ cityCache=null; if(view!=='map') buildWorld(); } }
  const ev=j.events||[]; let delay=0;
  for(const e of ev){
    if(e.t==='chest'){ chestShow(e.id, e.rewards); continue; }
    if(e.t==='wheel'){ wheelAnimate(e.wheel, e.idx, e.reward); continue; }
    if(e.t==='power'){ powerGain(e.n); continue; }
    if(e.t==='toast'){ setTimeout(()=>toast(e.m), delay); delay+=1100; }
  }
  renderAll(); if(view==='map') requestDraw(); }
async function act(a, args){
  const seq=++netSeq;
  try{ const j=await apiCall('POST','api/act',{a, args:args||[], lang:LANG}); applyServer(j, seq);
    if(j.error){ toast(IC.warn+' '+_t(LOGIN_ERR[j.error]||j.error)); return false; } return true; }
  catch(e){ if(e.status===401) logout(true); else toast(IC.warn+' '+_t(LOGIN_ERR[e.message]||'Cannot reach the server.')); return false; } }
let syncing=false, lastSync=0;
async function syncState(force){
  if(!ONLINE || !NET.token || syncing || (!force && Date.now()-lastSync<2500)) return;
  syncing=true; lastSync=Date.now();
  const seq=++netSeq;
  try{ const j=await apiCall('GET','api/state?lang='+LANG); applyServer(j, seq); }catch(e){ if(e.status===401) logout(true); }
  syncing=false; }
// a timer ended in the browser: ask the server for the result (it decides, the browser never does)
function dueOnServer(){ const now=Date.now();
  if(state.queue && now>=state.queue.end) return true;
  for(const bl in state.training){ const q=state.training[bl]; if(q.length && now>=q[0].e) return true; }
  const rc=researchState().cur; if(rc && now>=rc.e) return true;
  return state.marches.some(m=>(m.st==='out'&&now>=m.a)||(m.st==='back'&&now>=m.b)); }
// in online mode every game action becomes an order for the server
function goOnlineOrders(){
  startBuild=(slot,t,l)=>act('build',[slot,t,l]);
  cancel=()=>act('cancel');
  complete=()=>act('finish');
  train=(u,n)=>act('train',[u,n]).then(ok=>{ if(ok){ trainQty[u]=0; renderSheet(); } });
  finishTraining=bl=>act('finishTraining',[bl]);
  startResearch=t=>act('research',[t]);
  cancelResearch=()=>act('cancelResearch');
  checkResearch=force=>{ if(force) act('finishResearch'); };
  launch=()=>{ if(whyNotMarch(atkQty)) return; const o={x:mapSel.x, y:mapSel.y, q:{...atkQty}, titan:atkTitan};
    act('launch',[o]).then(ok=>{ if(ok){ for(const u in atkQty) delete atkQty[u]; atkTitan=false; closeSheet(); drawMap(); } }); };
  finishMarch=id=>act('finishMarch',[+id]);
  useItem=(id,all)=>act('useItem',[id,!!all]);
  openChest=(id,count)=>act('useItem',[id,(count||1)>1]);
  useSpeed=id=>{ const tg=speedTarget; act('speed',[id,tg]).then(()=>{ if(!speedJob(tg)) closeSheet(); }); };
  moveDefense=(u,n)=>act('defend',[u,n]).then(ok=>{ if(ok){ defQty[u]=0; renderSheet(); } });
  equip=id=>act('equip',[id]); unequip=s=>act('unequip',[s]); scrap=id=>act('scrap',[id]);
  claimQuest=id=>act('claimQuest',[id]);
  doSpin=w=>act('spin',[w]); claimDailyTicket=()=>act('daily');
  pushSave=()=>{};
}
// ---------- server clock and latency ----------
// The latency shown is smoothed: the median of the last measures, so one slow packet does not show a false spike.
// The clock offset comes from the fastest recent measure (the most precise one).
const CLOCK={offset:0, rtt:null, tz:null, srv:null, samples:[]};
const realNow=Date.now.bind(Date);
function noteServerTime(r){   // time the server spent on the last request (Server-Timing header)
  try{ const m=/dur=([\d.]+)/.exec(r.headers.get('Server-Timing')||''); if(m){ const v=+m[1]; CLOCK.srv = CLOCK.srv===null ? v : CLOCK.srv*0.7+v*0.3; } }catch(e){} }
async function ping(){
  const t0=performance.now();
  try{ const r=await fetch('api/ping',{cache:'no-store'}); const j=await r.json(); const rtt=performance.now()-t0;
    CLOCK.tz=j.tz; CLOCK.samples.push({rtt, off:j.t+rtt/2-realNow()}); if(CLOCK.samples.length>6) CLOCK.samples.shift();
    const sorted=CLOCK.samples.map(x=>x.rtt).sort((a,b)=>a-b);
    CLOCK.rtt=Math.round(sorted[Math.floor((sorted.length-1)/2)]);
    CLOCK.offset=CLOCK.samples.reduce((a,b)=>b.rtt<a.rtt?b:a).off;
    if(ONLINE) Date.now=()=>realNow()+CLOCK.offset; }   // timers follow the server clock, even if this device's clock is wrong
  catch(e){ CLOCK.rtt=-1; CLOCK.samples.length=0; }
  drawClock(); }
// at start: three quick measures, so the first value shown is already reliable
async function pingBurst(){ for(let i=0;i<3;i++){ await ping(); if(CLOCK.rtt<0) break; } }
function drawClock(){
  let el=document.getElementById('srvclock');
  if(!el){ el=document.createElement('div'); el.id='srvclock'; el.innerHTML='<i></i><b></b><span></span>'; document.body.appendChild(el); }
  const now=new Date(Date.now()), opt={hour:'2-digit',minute:'2-digit',second:'2-digit'}; if(CLOCK.tz) opt.timeZone=CLOCK.tz;
  let t; try{ t=new Intl.DateTimeFormat(LANG,opt).format(now); }catch(e){ t=now.toLocaleTimeString(); }
  el.querySelector('b').textContent=t;
  const ms=el.querySelector('span'), dot=el.querySelector('i');
  if(!ONLINE){ ms.textContent=''; dot.className='off'; el.title=_t('Local time (offline demo)'); return; }
  if(CLOCK.rtt===null){ ms.textContent='…'; dot.className=''; }
  else if(CLOCK.rtt<0){ ms.textContent=_t('offline'); dot.className='bad'; }
  else { ms.textContent=CLOCK.rtt+' ms'; dot.className=CLOCK.rtt<120?'good':CLOCK.rtt<300?'mid':'bad'; }
  el.title=_t('Server time')+(CLOCK.tz?' ('+CLOCK.tz+')':'')+' · '+_t('latency')+(CLOCK.rtt>0?' '+CLOCK.rtt+' ms':'')
    +(CLOCK.srv!==null?' · '+_t('server processing')+' '+CLOCK.srv.toFixed(1)+' ms':''); }

// =====================================================================
// ===== MYSTERY CHESTS: opening animation (the server draws the rewards) =====
// =====================================================================
const openChances = new Set();   // chance lists the player opened stay open when the window refreshes
document.getElementById('sheet').addEventListener('toggle', e=>{ const d=e.target; if(d.dataset && d.dataset.ch){ if(d.open) openChances.add(d.dataset.ch); else openChances.delete(d.dataset.ch); } }, true);
const RARITY_COL = {common:'#a9b0a6', uncommon:'#5fd16a', rare:'#4aa8ff', epic:'#b46cff', legendary:'#ff9a2e'};
const RARITY_NAME = {common:'Common', uncommon:'Uncommon', rare:'Rare', epic:'Epic', legendary:'Legendary'};
const RARITY_ORDER = ['legendary','epic','rare','uncommon','common'];
const chestTier = id => id.replace('chest_','');
function rewardIcon(r, size=64){
  if(r.k==='item') return itemIcon(r.id, size);
  if(r.k==='troops') return `<span class="iti" style="width:${size}px;height:${size}px"><img src="${UNITS[r.u].img}" alt=""></span>`;
  return eqIcon({s:r.s, t:r.t}, size); }
function rewardName(r){
  if(r.k==='item') return itemName(r.id);
  if(r.k==='troops') return _t(UNITS[r.u].name);
  return _t(EQ_NAME[r.s])+' · '+_t(EQ_TIER[r.t]); }
// chances shown to the player, read from the same table as the server
function chestChances(id){
  const pool=LOOT[id], tot=pool.reduce((s,l)=>s+l[0],0);
  const label=rw=>{ if(rw.k==='troops') return `${fmtN(rw.n[0])}–${fmtN(rw.n[1])} ${_t(UNITS[rw.u].name)}`;
    if(rw.k==='part') return `${_t('Titan part')} · ${_t(EQ_TIER[rw.t])}`;
    const q=rw.n[0]===rw.n[1] ? (rw.n[0]>1?rw.n[0]+' × ':'') : `${rw.n[0]}–${rw.n[1]} × `, m=/^crate_\*_(s|m|l)$/.exec(rw.id);
    if(m) return q+_t({s:'Small crate of a random resource',m:'Medium crate of a random resource',l:'Large crate of a random resource'}[m[1]]);
    if(rw.id==='boost_prod_*') return q+_t('Production boost (random resource)');
    return q+rw.id.split('|').map(itemName).join(' / '); };
  return `<details class="chances" data-ch="${id}"${openChances.has(id)?' open':''}><summary>${_t('See the chances')}</summary>${RARITY_ORDER.map(rar=>{ const ls=pool.filter(l=>l[1]===rar); if(!ls.length) return '';
    return `<div class="chr"><b style="color:${RARITY_COL[rar]}">${_t(RARITY_NAME[rar])} · ${(ls.reduce((s,l)=>s+l[0],0)/tot*100).toFixed(1).replace('.0','')} %</b>${ls.map(l=>`<div>${label(l[2])} <span>${(l[0]/tot*100).toFixed(1).replace('.0','')} %</span></div>`).join('')}</div>`; }).join('')}</details>`; }
async function openChest(id, count){
  if(!invN(id)) return;
  count=Math.max(1,Math.min(count||1, invN(id), 50));
  let rewards;
  if(ONLINE){
    try{ const j=await apiCall('POST','api/chest',{id, count, state}); state=j.state; normalizeState(); rewards=j.rewards; }
    catch(e){ toast(IC.warn+' '+_t('Cannot reach the server.')); return; }
  } else { // offline demo: same table, drawn in the browser
    rewards=[]; for(let i=0;i<count;i++){ takeItem(id); const r=rollLoot(id, n=>Math.floor(Math.random()*n)); rewards.push(r);
      if(r.k==='item') addItem(r.id, r.n); else if(r.k==='troops') state.troops[r.u]=(state.troops[r.u]||0)+r.n; else titanState().inv.push({id:Date.now()+i, s:r.s, t:r.t}); }
    save(); }
  closeSheet(); renderAll(); chestShow(id, rewards); }
function chestShow(id, rewards){
  let fx=document.getElementById('chestfx'); if(fx) fx.remove();
  const best=rewards.slice().sort((a,b)=>RARITY_ORDER.indexOf(a.rarity)-RARITY_ORDER.indexOf(b.rarity))[0], col=RARITY_COL[best.rarity], t=chestTier(id);
  fx=document.createElement('div'); fx.id='chestfx'; fx.style.setProperty('--rc', col);
  fx.innerHTML=`<div class="cfx-rays"></div><div class="cfx-flash"></div>
    <img class="cfx-chest shake" src="assets/img/chest_${t}_closed.webp" alt="">
    <div class="cfx-result"></div><div class="cfx-btns"></div>`;
  document.body.appendChild(fx);
  const chest=fx.querySelector('.cfx-chest');
  setTimeout(()=>{ chest.src=`assets/img/chest_${t}_open.webp`; chest.classList.remove('shake'); chest.classList.add('opened'); fx.classList.add('open'); }, 1300);
  setTimeout(()=>{
    const res=fx.querySelector('.cfx-result');
    if(rewards.length===1){ const r=rewards[0];
      res.innerHTML=`<div class="cfx-card" style="--rc:${RARITY_COL[r.rarity]}">${rewardIcon(r,84)}<b>${r.n&&r.k!=='part'?'× '+fmtN(r.n)+' ':''}${rewardName(r)}</b><small style="color:${RARITY_COL[r.rarity]}">${_t(RARITY_NAME[r.rarity])}</small></div>`; }
    else { // same rewards are added up in the summary
      const m=new Map(); for(const r of rewards){ const k=r.k+'|'+(r.id||r.u||r.s)+'|'+(r.t||''); if(m.has(k)) m.get(k).n+=r.n||1; else m.set(k,{...r, n:r.n||1}); }
      rewards=[...m.values()]; }
    if(res.innerHTML==='') res.innerHTML=`<div class="cfx-grid">${rewards.slice().sort((a,b)=>RARITY_ORDER.indexOf(a.rarity)-RARITY_ORDER.indexOf(b.rarity)).map((r,i)=>`<div class="cfx-mini" style="--rc:${RARITY_COL[r.rarity]};animation-delay:${Math.min(i,30)*40}ms">${rewardIcon(r,46)}<span>${r.n&&r.k!=='part'?'×'+fmtN(r.n)+' ':''}${rewardName(r)}</span></div>`).join('')}</div>`;
    const left=invN(id);
    fx.querySelector('.cfx-btns').innerHTML=`<button data-cfx="ok">${_t('Collect')}</button>${left?`<button class="sec" data-cfx="again">${_t('Open another')} (${fmtN(left)})</button>`:''}${left>1?`<button class="sec" data-cfx="all">${_t('Open all')} (${fmtN(Math.min(left,50))})</button>`:''}`;
    fx.querySelectorAll('[data-cfx]').forEach(b=>b.onclick=()=>{ const a=b.dataset.cfx; fx.remove(); if(a==='again') openChest(id,1); if(a==='all') openChest(id,50); });
  }, 1750); }

// =====================================================================
// ===== ADMINISTRATION (admin and test accounts): every action is done by the server =====
// =====================================================================
const isStaff = () => ONLINE && ['admin','tester'].includes(NET.role);
async function adminDo(action, p){
  const seq=++netSeq;
  try{ const j=await apiCall('POST','api/admin',{action, p:Object.assign({lang:LANG},p)});
    if(j.state){ applyServer(j, seq); resetTiles(); cityCache=null; if(view!=='map') buildWorld(); renderAll(); }
    toast(IC.ok+' '+_t('Done')); return j; }
  catch(e){ toast(IC.warn+' '+_t(LOGIN_ERR[e.message]||'Action refused by the server.')); return null; } }
let adminAccounts=null;
function adminPanel(){
  if(!isStaff()) return `<h2>${_t('Administration')}</h2><p>${_t('Reserved for administrators.')}</p>`;
  const sel=(id,opts)=>`<select id="${id}" class="asel">${opts.map(([v,t])=>`<option value="${v}">${t}</option>`).join('')}</select>`;
  const num=(id,v,max)=>`<input id="${id}" type="number" class="anum" min="1" max="${max}" value="${v}">`;
  let h=`<div class="hd"><div class="big">${IC.crown}</div><div style="flex:1;min-width:0"><h2>${_t('Administration')}</h2><div class="sub">${_t(NET.role==='admin'?'Administrator account':'Test account')} · ${NET.name}</div></div></div>
  <h3>${_t('Resources')}</h3><div class="arow">${[1e5,1e6,1e7,1e8].map(n=>`<button class="sm" data-act="adm" data-a="give_res" data-p='{"res":"all","amount":${n}}'>+${fmtN(n)} ${_t('all')}</button>`).join('')}</div>
  <div class="arow">${sel('a_res',RES.map(r=>[r,_t(r)]))}${num('a_resn',1000000,1e10)}<button class="sm" data-act="admres">${_t('Give')}</button></div>
  <h3>${_t('Items')}</h3><div class="arow">${sel('a_item',ITEM_ORDER.map(id=>[id,itemName(id)]))}${num('a_itemn',10,100000)}<button class="sm" data-act="admitem">${_t('Give')}</button></div>
  <div class="arow"><button class="sec sm" data-act="admallitems">${_t('10 of every item')}</button></div>
  <h3>${_t('Troops')}</h3><div class="arow">${sel('a_unit',UNIT_ORDER.map(u=>[u,_t(UNITS[u].name)]))}${num('a_unitn',1000,1e7)}<button class="sm" data-act="admunit">${_t('Give')}</button></div>
  <h3>${_t('Time')}</h3><div class="arow"><button class="sm" data-act="adm" data-a="finish_all" data-p='{}'>${IC.time} ${_t('Finish everything now')}</button></div>
  <h3>${_t('Base and research')}</h3><div class="arow">${sel('a_blvl',[1,2,3,4,5,6,7,8,9,10].map(l=>[l,_t('Lv')+' '+l]))}<button class="sm" data-act="admblvl">${_t('All buildings to this level')}</button></div>
  <div class="arow">${sel('a_rlvl',[0,1,2,3,4,5,6,7,8,9,10].map(l=>[l,_t('Lv')+' '+l]))}<button class="sm" data-act="admrlvl">${_t('All research to this level')}</button></div>
  <h3>${_t('Titan')}</h3><div class="arow">${sel('a_tlvl',[1,2,3,4,5,6,7,8,9,10].map(l=>[l,_t('Lv')+' '+l]))}<button class="sm" data-act="admtitan">${_t('Set level and repair')}</button></div>
  <div class="arow">${sel('a_part',EQ_SLOTS.map(s=>[s,_t(EQ_NAME[s])]))}${sel('a_tier',[1,2,3].map(t=>[t,_t(EQ_TIER[t])]))}<button class="sm" data-act="admpart">${_t('Give')}</button></div>`;
  if(NET.role==='admin'){
    h+=`<h3>${_t('Test accounts')}</h3><div class="arow"><input id="a_nname" class="atxt" maxlength="16" placeholder="${_t('Commander name')}"><input id="a_npass" class="atxt" maxlength="100" placeholder="${_t('Password')}">
      ${sel('a_nrole',[['tester',_t('Test account')],['admin',_t('Administrator account')],['player',_t('Normal player')]])}<button class="sm" data-act="admcreate">${_t('Create')}</button></div>
      <div class="arow"><button class="sec sm" data-act="admlist">${_t('Show all accounts')}</button></div>`;
    if(adminAccounts) h+=`<div class="alist">${adminAccounts.map(a=>`<div><b>${a.name}</b> · ${_t({admin:'Administrator account',tester:'Test account',player:'Normal player'}[a.role]||a.role)} · ${_t('Lv')} ${a.lvl||1} · ${IC.power} ${fmtN(a.power||0)}</div>`).join('')}</div>`;
  }
  return h; }
function openAdmin(){ openPanel('__admin'); }
function adminAct(a, btn){
  const v=id=>(document.getElementById(id)||{}).value;
  if(a==='adm') adminDo(btn.dataset.a, JSON.parse(btn.dataset.p||'{}'));
  if(a==='admres') adminDo('give_res',{res:v('a_res'), amount:+v('a_resn')});
  if(a==='admitem') adminDo('give_item',{id:v('a_item'), n:+v('a_itemn')});
  if(a==='admallitems') adminDo('give_all_items',{ids:ITEM_ORDER, n:10});
  if(a==='admunit') adminDo('give_troops',{u:v('a_unit'), n:+v('a_unitn')});
  if(a==='admblvl') adminDo('set_buildings',{lvl:+v('a_blvl')});
  if(a==='admrlvl') adminDo('set_research',{lvl:+v('a_rlvl')});
  if(a==='admtitan') adminDo('titan',{lvl:+v('a_tlvl')});
  if(a==='admpart') adminDo('titan_part',{s:v('a_part'), t:+v('a_tier')});
  if(a==='admcreate') adminDo('create_account',{name:v('a_nname'), password:v('a_npass'), role:v('a_nrole')}).then(j=>{ if(j&&j.name) toast(IC.ok+' '+_t('Account created: {n}',{n:j.name})); });
  if(a==='admlist') adminDo('accounts',{}).then(j=>{ if(j&&j.accounts){ adminAccounts=j.accounts; renderSheet(); } });
}

let tickTimer=0;
function startGame(){ applyStatic(); buildWorld(); centerOn(1300,640); tick(); renderAll(); if(!tickTimer) tickTimer=setInterval(tick,1000); }
if(typeof __SERVER==='undefined') boot();   // the server runs these rules without any screen: no start-up there
