
// ===== LANGUAGES (English is the reference text) =====
const LANGS=[['en','English'],['fr','Français'],['es','Español'],['de','Deutsch'],['it','Italiano'],['pt','Português'],['pl','Polski'],['tr','Türkçe'],['ru','Русский']];
const I18N={"fr": {"COMMANDER": "COMMANDANT", "POWER": "PUISSANCE", "Progress to next level": "Progression vers le niveau suivant", "Menu": "Menu", "Titan": "Titan", "Fields": "Champs", "Map": "Carte", "Base": "Base", "Shop": "Boutique", "Quests": "Quêtes", "Messages": "Messages", "Reports": "Rapports", "Inventory": "Inventaire", "Defense": "Défense", "Troops": "Troupes", "Research": "Recherche", "Settings": "Paramètres", "MAP": "CARTE", "FIELDS": "CHAMPS", "BASE": "BASE", "EMPIRE": "EMPIRE", "ALLIANCE": "ALLIANCE", "TITAN": "TITAN", "Build the Titan Hangar": "Construis le Hangar à Titan", "Hangar level {l} · Ready": "Hangar niveau {l} · Prêt", "Coming in a future update": "Arrive dans une prochaine mise à jour", "Enter base": "Entrer dans la base", "max": "max", "Lv": "Niv.", "metal": "métal", "wood": "bois", "stone": "pierre", "fuel": "carburant", "rations": "rations", "gold": "or", "Command Center": "Centre de commandement", "Heart of your base. Its level sets the maximum level of every other building.": "Cœur de ta base. Son niveau fixe le niveau maximum de tous les autres bâtiments.", "Defense Wall": "Mur de défense", "Protects your base and gives a defense bonus to your troops.": "Protège ta base et donne un bonus de défense à tes troupes.", "Barracks": "Caserne", "Trains infantry units.": "Entraîne l'infanterie.", "Garrison": "Garnison", "Houses and trains defensive troops. You can build several.": "Loge et entraîne des troupes défensives. Tu peux en construire plusieurs.", "Housing Block": "Logements", "Raises population, which supplies workers and recruits. You can build several.": "Augmente la population, qui fournit ouvriers et recrues. Tu peux en construire plusieurs.", "Warehouse": "Entrepôt", "Increases how many resources you can store.": "Augmente la quantité de ressources que tu peux stocker.", "Research Lab": "Laboratoire", "Unlocks technologies that improve your whole base.": "Débloque des technologies qui améliorent toute ta base.", "Vehicle Factory": "Usine de véhicules", "Builds armored vehicles.": "Construit des véhicules blindés.", "Rally Point": "Point de ralliement", "Organizes marches. Sets how many troops can leave the base at once.": "Organise les marches. Fixe combien de troupes peuvent quitter la base en même temps.", "Radar Station": "Station radar", "Detects incoming attacks.": "Détecte les attaques entrantes.", "Titan Hangar": "Hangar à Titan", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Abrite et répare ton Titan, le robot de combat géant qui mène tes attaques et défend la base. Son niveau fixe le niveau maximum du Titan.", "Metal Mine": "Mine de métal", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Extrait du minerai de métal du sol. Chaque niveau produit plus de métal par heure.", "Sawmill": "Scierie", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Coupe le bois de la forêt voisine. Chaque niveau produit plus de bois par heure.", "Stone Quarry": "Carrière", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Extrait et taille des blocs de pierre. Chaque niveau produit plus de pierre par heure.", "Fuel Pump": "Pompe à carburant", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pompe le pétrole brut et le raffine en carburant. Chaque niveau produit plus de carburant par heure.", "Mess Hall": "Cantine", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Prépare et stocke les rations pour nourrir tes troupes. Chaque niveau produit plus de rations par heure.", "Helipad": "Héliport", "Trains and maintains your air units: attack helicopters and gunships.": "Entraîne et entretient tes unités aériennes : hélicoptères d'attaque et appareils de combat.", "Max building level: {l}": "Niveau max des bâtiments : {l}", "Defense bonus +{p}%": "Bonus de défense +{p}%", "Infantry training speed +{p}%": "Vitesse d'entraînement de l'infanterie +{p}%", "Defensive troop capacity +{n}": "Capacité de troupes défensives +{n}", "Population +{n}": "Population +{n}", "Storage +{n} per resource": "Stockage +{n} par ressource", "Research speed +{p}%": "Vitesse de recherche +{p}%", "Vehicle production speed +{p}%": "Vitesse de production des véhicules +{p}%", "Max troops per march: {n}": "Troupes max par marche : {n}", "Titan maximum level: {n}": "Niveau maximum du Titan : {n}", "Air unit training speed +{p}%": "Vitesse d'entraînement aérien +{p}%", "Detects attacks and enemy troop count": "Détecte les attaques et le nombre de troupes ennemies", "Produces {i} {n} {r} per hour": "Produit {i} {n} de {r} par heure", "Recruit": "Recrue", "Cheap basic infantry. Weak alone, useful in large numbers.": "Infanterie de base bon marché. Faible seule, utile en grand nombre.", "Rifleman": "Fusilier", "Solid defensive infantry protected by a heavy riot shield.": "Infanterie défensive solide protégée par un lourd bouclier anti-émeute.", "Sniper": "Tireur d'élite", "Long-range marksman who strikes before the enemy can reach him.": "Tireur longue portée qui frappe avant que l'ennemi ne l'atteigne.", "Assault Trooper": "Commando d'assaut", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldat lourd en exosquelette armé d'une mitrailleuse rotative. Redoutable en attaque.", "Supply Truck": "Camion de ravitaillement", "Carries large amounts of loot back to your base.": "Ramène de grandes quantités de butin à ta base.", "Scout Drone": "Drone éclaireur", "Very fast scout. Spies on enemy bases and camps.": "Éclaireur très rapide. Espionne les bases et camps ennemis.", "Armored Carrier": "Véhicule blindé", "Heavily armored transport with a huge carrying capacity.": "Transport lourdement blindé avec une énorme capacité de charge.", "Battle Tank": "Char lourd", "Massive armored tank. Extremely tough and powerful.": "Char blindé massif. Extrêmement résistant et puissant.", "Rocket Artillery": "Artillerie à roquettes", "Rocket launcher truck that devastates enemies from very long range.": "Camion lance-roquettes qui dévaste l'ennemi à très longue portée.", "Attack Helicopter": "Hélicoptère d'attaque", "Fast air unit that strikes with rockets and a nose cannon.": "Unité aérienne rapide qui frappe avec roquettes et canon de nez.", "Gunship": "Appareil de combat", "Heavy tiltrotor gunship with huge firepower and armor.": "Appareil lourd à rotors basculants, énorme puissance de feu et blindage.", "Build a {b} first": "Construis d'abord : {b}", "Requires {b} level {l}": "Nécessite {b} niveau {l}", "Choose how many to train": "Choisis combien en entraîner", "Training queue full (5 orders max)": "File d'entraînement pleine (5 ordres max)", "Not enough population: build or upgrade Housing Blocks": "Population insuffisante : construis ou améliore des Logements", "Not enough resources": "Ressources insuffisantes", "Training {n} {u}": "Entraînement : {n} {u}", "{n} {u} ready": "{n} {u} prêts", "No rations left: your troops are deserting!": "Plus de rations : tes troupes désertent !", "The construction queue is busy": "La file de construction est occupée", "Maximum level reached": "Niveau maximum atteint", "{b} started": "{b} lancé", "{b} level {l} complete": "{b} niveau {l} terminé", "Construction cancelled (50% refunded)": "Construction annulée (50 % remboursés)", "Power": "Puissance", "power": "puissance", "Train": "Entraîner", "owned {n}": "possédés {n}", "Max": "Max", "each:": "chacun :", "Train troops": "Entraîner des troupes", "Population {a} / {b} · Training speed +{p}%": "Population {a} / {b} · Vitesse d'entraînement +{p}%", "Waiting": "En attente", "Finish (test)": "Terminer (test)", "Your Army": "Ton armée", "{n} troops": "{n} troupes", "Population": "Population", "Upkeep": "Entretien", "Net": "Net", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Tes troupes mangent plus de rations que tu n'en produis. Construis ou améliore des Cantines dans les Champs, sinon tes troupes déserteront quand les rations seront épuisées.", "Infantry · Barracks": "Infanterie · Caserne", "Vehicles · Vehicle Factory": "Véhicules · Usine de véhicules", "Air · Helipad": "Aérien · Héliport", "training": "en entraînement", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Touche la Caserne, l'Usine de véhicules ou l'Héliport dans ta base pour entraîner plus de troupes.", "Upgrading to level {l}": "Amélioration au niveau {l}", "Building to level {l}": "Construction niveau {l}", "Time left: {t}": "Temps restant : {t}", "Finish now (test)": "Terminer maintenant (test)", "Cancel": "Annuler", "Level {l} / {m}": "Niveau {l} / {m}", "Current:": "Actuel :", "Your Titan": "Ton Titan", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Ton Titan est prêt et monte la garde devant le hangar. Ses niveaux, pièces d'armure et attaques arriveront avec la carte du monde.", "Upgrade to level {l}": "Améliorer au niveau {l}", "Next:": "Suivant :", "Upgrade": "Améliorer", "Not built": "Non construit", "Build": "Construire", "Empty field": "Champ libre", "Choose what to produce on this field.": "Choisis quoi produire sur ce champ.", "Empty plot": "Emplacement libre", "Choose a building to construct here.": "Choisis un bâtiment à construire ici.", "Every unique building is already built.": "Tous les bâtiments uniques sont déjà construits.", "Language": "Langue", "Test tools": "Outils de test", "Erase your save and restart from zero. This option will be removed in the final game.": "Efface ta sauvegarde et recommence de zéro. Cette option sera retirée du jeu final.", "Reset save": "Réinitialiser la partie", "Reset your base?": "Réinitialiser ta base ?", "Forest": "Forêt", "Rocky Hills": "Collines rocheuses", "Metal Deposit": "Gisement de métal", "Oil Field": "Champ pétrolifère", "Farmland": "Terres agricoles", "Plains": "Plaine", "Raider Camp": "Camp de pillards", "Your base": "Ta base", "Empty land. Nothing to collect here.": "Terrain vide. Rien à récupérer ici.", "Level {l}": "Niveau {l}", "Distance: {d} tiles": "Distance : {d} cases", "Enemy forces": "Forces ennemies", "Possible loot": "Butin possible", "Attack": "Attaquer", "GO": "ALLER", "Back to my base": "Retour à ma base", "Send troops": "Envoyer des troupes", "Available: {n}": "Disponibles : {n}", "Troops: {a} / {b}": "Troupes : {a} / {b}", "Travel time: {t}": "Trajet : {t}", "Carry capacity: {n}": "Capacité de transport : {n}", "Launch attack": "Lancer l'attaque", "Too many troops for one march (max {n})": "Trop de troupes pour une marche (max {n})", "All marches are busy ({n} max)": "Toutes les marches sont occupées ({n} max)", "Choose your troops": "Choisis tes troupes", "You have no troops. Train some at the Barracks.": "Tu n'as pas de troupes. Entraînes-en à la Caserne.", "Troops sent to {p}": "Troupes envoyées vers {p}", "Victory": "Victoire", "Defeat": "Défaite", "Victory at {p}": "Victoire : {p}", "Defeat at {p}": "Défaite : {p}", "Troops returned with loot": "Troupes revenues avec le butin", "No reports yet.": "Aucun rapport pour l'instant.", "Your troops": "Tes troupes", "Enemy": "Ennemi", "Sent": "Envoyés", "Lost": "Perdus", "Killed": "Tués", "Loot": "Butin", "Marching": "En marche", "Returning": "Retour", "Marches: {a} / {b}": "Marches : {a} / {b}", "{t} ago": "il y a {t}", "Raiders": "Pillards", "All enemy troops were destroyed.": "Toutes les troupes ennemies ont été détruites.", "Your troops had to retreat.": "Tes troupes ont dû battre en retraite.", "Armor Plate": "Plaque de blindage", "Arm Cannon": "Canon de bras", "Jet Reactor": "Réacteur dorsal", "Armored Legs": "Jambes blindées", "Standard": "Standard", "Advanced": "Avancé", "Elite": "Élite", "Prototype": "Prototype", "Titan reached level {l}!": "Le Titan passe au niveau {l} !", "On a mission": "En mission", "Too damaged to fight (30% needed)": "Trop endommagé pour combattre (30 % requis)", "Ready for battle": "Prêt au combat", "Upgrade the Titan Hangar to raise the maximum level.": "Améliore le Hangar à Titan pour augmenter le niveau maximum.", "troop attack": "d'attaque des troupes", "Equipment": "Équipement", "Empty": "Vide", "Remove": "Retirer", "Parts inventory": "Pièces en stock", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Bats des camps de pillards pour gagner des pièces d'équipement. Les camps de haut niveau donnent de meilleures pièces.", "Equip": "Équiper", "Scrap for gold": "Recycler contre de l'or", "Manage Titan": "Gérer le Titan", "Send the Titan": "Envoyer le Titan", "Titan unavailable": "Titan indisponible", "Titan: {a} XP, health {b}%": "Titan : {a} XP, santé {b} %", "New part won: {p}": "Nouvelle pièce gagnée : {p}", "Lv {l} · Health {h}%": "Niv. {l} · Santé {h} %"}, "es": {"COMMANDER": "COMANDANTE", "POWER": "PODER", "Progress to next level": "Progreso al siguiente nivel", "Menu": "Menú", "Titan": "Titán", "Fields": "Campos", "Map": "Mapa", "Base": "Base", "Shop": "Tienda", "Quests": "Misiones", "Messages": "Mensajes", "Reports": "Informes", "Inventory": "Inventario", "Defense": "Defensa", "Troops": "Tropas", "Research": "Investigación", "Settings": "Ajustes", "MAP": "MAPA", "FIELDS": "CAMPOS", "BASE": "BASE", "EMPIRE": "IMPERIO", "ALLIANCE": "ALIANZA", "TITAN": "TITÁN", "Build the Titan Hangar": "Construye el Hangar del Titán", "Hangar level {l} · Ready": "Hangar nivel {l} · Listo", "Coming in a future update": "Llegará en una próxima actualización", "Enter base": "Entrar en la base", "max": "máx.", "Lv": "Nv.", "metal": "metal", "wood": "madera", "stone": "piedra", "fuel": "combustible", "rations": "raciones", "gold": "oro", "Command Center": "Centro de mando", "Heart of your base. Its level sets the maximum level of every other building.": "Corazón de tu base. Su nivel fija el nivel máximo de todos los demás edificios.", "Defense Wall": "Muro defensivo", "Protects your base and gives a defense bonus to your troops.": "Protege tu base y da una bonificación de defensa a tus tropas.", "Barracks": "Cuartel", "Trains infantry units.": "Entrena unidades de infantería.", "Garrison": "Guarnición", "Houses and trains defensive troops. You can build several.": "Aloja y entrena tropas defensivas. Puedes construir varias.", "Housing Block": "Viviendas", "Raises population, which supplies workers and recruits. You can build several.": "Aumenta la población, que aporta trabajadores y reclutas. Puedes construir varias.", "Warehouse": "Almacén", "Increases how many resources you can store.": "Aumenta la cantidad de recursos que puedes almacenar.", "Research Lab": "Laboratorio", "Unlocks technologies that improve your whole base.": "Desbloquea tecnologías que mejoran toda tu base.", "Vehicle Factory": "Fábrica de vehículos", "Builds armored vehicles.": "Construye vehículos blindados.", "Rally Point": "Punto de reunión", "Organizes marches. Sets how many troops can leave the base at once.": "Organiza las marchas. Fija cuántas tropas pueden salir de la base a la vez.", "Radar Station": "Estación de radar", "Detects incoming attacks.": "Detecta los ataques entrantes.", "Titan Hangar": "Hangar del Titán", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Aloja y repara tu Titán, el robot de combate gigante que dirige tus ataques y defiende la base. Su nivel fija el nivel máximo del Titán.", "Metal Mine": "Mina de metal", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Extrae mineral de metal del suelo. Cada nivel produce más metal por hora.", "Sawmill": "Aserradero", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Corta madera del bosque cercano. Cada nivel produce más madera por hora.", "Stone Quarry": "Cantera", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Extrae y corta bloques de piedra. Cada nivel produce más piedra por hora.", "Fuel Pump": "Bomba de combustible", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Bombea crudo y lo refina en combustible. Cada nivel produce más combustible por hora.", "Mess Hall": "Comedor", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Cocina y almacena raciones para alimentar a tus tropas. Cada nivel produce más raciones por hora.", "Helipad": "Helipuerto", "Trains and maintains your air units: attack helicopters and gunships.": "Entrena y mantiene tus unidades aéreas: helicópteros de ataque y cañoneros.", "Max building level: {l}": "Nivel máx. de edificios: {l}", "Defense bonus +{p}%": "Bonificación de defensa +{p}%", "Infantry training speed +{p}%": "Velocidad de entrenamiento de infantería +{p}%", "Defensive troop capacity +{n}": "Capacidad de tropas defensivas +{n}", "Population +{n}": "Población +{n}", "Storage +{n} per resource": "Almacenamiento +{n} por recurso", "Research speed +{p}%": "Velocidad de investigación +{p}%", "Vehicle production speed +{p}%": "Velocidad de producción de vehículos +{p}%", "Max troops per march: {n}": "Tropas máx. por marcha: {n}", "Titan maximum level: {n}": "Nivel máximo del Titán: {n}", "Air unit training speed +{p}%": "Velocidad de entrenamiento aéreo +{p}%", "Detects attacks and enemy troop count": "Detecta ataques y el número de tropas enemigas", "Produces {i} {n} {r} per hour": "Produce {i} {n} de {r} por hora", "Recruit": "Recluta", "Cheap basic infantry. Weak alone, useful in large numbers.": "Infantería básica barata. Débil sola, útil en grandes cantidades.", "Rifleman": "Fusilero", "Solid defensive infantry protected by a heavy riot shield.": "Infantería defensiva sólida protegida por un pesado escudo antidisturbios.", "Sniper": "Francotirador", "Long-range marksman who strikes before the enemy can reach him.": "Tirador de largo alcance que ataca antes de que el enemigo lo alcance.", "Assault Trooper": "Soldado de asalto", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldado pesado con exoesqueleto y ametralladora rotativa. Letal en ataque.", "Supply Truck": "Camión de suministros", "Carries large amounts of loot back to your base.": "Lleva grandes cantidades de botín a tu base.", "Scout Drone": "Dron explorador", "Very fast scout. Spies on enemy bases and camps.": "Explorador muy rápido. Espía bases y campamentos enemigos.", "Armored Carrier": "Transporte blindado", "Heavily armored transport with a huge carrying capacity.": "Transporte muy blindado con enorme capacidad de carga.", "Battle Tank": "Tanque de combate", "Massive armored tank. Extremely tough and powerful.": "Tanque blindado masivo. Extremadamente resistente y poderoso.", "Rocket Artillery": "Artillería de cohetes", "Rocket launcher truck that devastates enemies from very long range.": "Camión lanzacohetes que arrasa enemigos a muy larga distancia.", "Attack Helicopter": "Helicóptero de ataque", "Fast air unit that strikes with rockets and a nose cannon.": "Unidad aérea rápida que ataca con cohetes y un cañón frontal.", "Gunship": "Cañonero", "Heavy tiltrotor gunship with huge firepower and armor.": "Cañonero pesado de rotores basculantes con enorme potencia y blindaje.", "Build a {b} first": "Construye primero: {b}", "Requires {b} level {l}": "Requiere {b} nivel {l}", "Choose how many to train": "Elige cuántas entrenar", "Training queue full (5 orders max)": "Cola de entrenamiento llena (5 órdenes máx.)", "Not enough population: build or upgrade Housing Blocks": "Población insuficiente: construye o mejora Viviendas", "Not enough resources": "Recursos insuficientes", "Training {n} {u}": "Entrenando {n} {u}", "{n} {u} ready": "{n} {u} listos", "No rations left: your troops are deserting!": "¡Sin raciones: tus tropas desertan!", "The construction queue is busy": "La cola de construcción está ocupada", "Maximum level reached": "Nivel máximo alcanzado", "{b} started": "{b} iniciado", "{b} level {l} complete": "{b} nivel {l} completado", "Construction cancelled (50% refunded)": "Construcción cancelada (50 % reembolsado)", "Power": "Poder", "power": "poder", "Train": "Entrenar", "owned {n}": "tienes {n}", "Max": "Máx.", "each:": "cada uno:", "Train troops": "Entrenar tropas", "Population {a} / {b} · Training speed +{p}%": "Población {a} / {b} · Velocidad de entrenamiento +{p}%", "Waiting": "En espera", "Finish (test)": "Terminar (prueba)", "Your Army": "Tu ejército", "{n} troops": "{n} tropas", "Population": "Población", "Upkeep": "Mantenimiento", "Net": "Neto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Tus tropas comen más raciones de las que produces. Construye o mejora Comedores en los Campos, o tus tropas desertarán cuando se acaben las raciones.", "Infantry · Barracks": "Infantería · Cuartel", "Vehicles · Vehicle Factory": "Vehículos · Fábrica de vehículos", "Air · Helipad": "Aéreo · Helipuerto", "training": "entrenando", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Toca el Cuartel, la Fábrica de vehículos o el Helipuerto en tu base para entrenar más tropas.", "Upgrading to level {l}": "Mejorando a nivel {l}", "Building to level {l}": "Construyendo nivel {l}", "Time left: {t}": "Tiempo restante: {t}", "Finish now (test)": "Terminar ahora (prueba)", "Cancel": "Cancelar", "Level {l} / {m}": "Nivel {l} / {m}", "Current:": "Actual:", "Your Titan": "Tu Titán", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Tu Titán está listo y hace guardia frente al hangar. Sus niveles, piezas de blindaje y ataques llegarán con el mapa del mundo.", "Upgrade to level {l}": "Mejorar a nivel {l}", "Next:": "Siguiente:", "Upgrade": "Mejorar", "Not built": "Sin construir", "Build": "Construir", "Empty field": "Campo vacío", "Choose what to produce on this field.": "Elige qué producir en este campo.", "Empty plot": "Parcela vacía", "Choose a building to construct here.": "Elige un edificio para construir aquí.", "Every unique building is already built.": "Todos los edificios únicos ya están construidos.", "Language": "Idioma", "Test tools": "Herramientas de prueba", "Erase your save and restart from zero. This option will be removed in the final game.": "Borra tu partida y empieza de cero. Esta opción se eliminará en el juego final.", "Reset save": "Reiniciar partida", "Reset your base?": "¿Reiniciar tu base?", "Forest": "Bosque", "Rocky Hills": "Colinas rocosas", "Metal Deposit": "Yacimiento de metal", "Oil Field": "Campo petrolífero", "Farmland": "Tierras de cultivo", "Plains": "Llanura", "Raider Camp": "Campamento de saqueadores", "Your base": "Tu base", "Empty land. Nothing to collect here.": "Terreno vacío. Nada que recoger aquí.", "Level {l}": "Nivel {l}", "Distance: {d} tiles": "Distancia: {d} casillas", "Enemy forces": "Fuerzas enemigas", "Possible loot": "Botín posible", "Attack": "Atacar", "GO": "IR", "Back to my base": "Volver a mi base", "Send troops": "Enviar tropas", "Available: {n}": "Disponibles: {n}", "Troops: {a} / {b}": "Tropas: {a} / {b}", "Travel time: {t}": "Tiempo de viaje: {t}", "Carry capacity: {n}": "Capacidad de carga: {n}", "Launch attack": "Lanzar ataque", "Too many troops for one march (max {n})": "Demasiadas tropas para una marcha (máx. {n})", "All marches are busy ({n} max)": "Todas las marchas están ocupadas ({n} máx.)", "Choose your troops": "Elige tus tropas", "You have no troops. Train some at the Barracks.": "No tienes tropas. Entrena algunas en el Cuartel.", "Troops sent to {p}": "Tropas enviadas a {p}", "Victory": "Victoria", "Defeat": "Derrota", "Victory at {p}": "Victoria en {p}", "Defeat at {p}": "Derrota en {p}", "Troops returned with loot": "Las tropas volvieron con el botín", "No reports yet.": "Aún no hay informes.", "Your troops": "Tus tropas", "Enemy": "Enemigo", "Sent": "Enviadas", "Lost": "Perdidas", "Killed": "Eliminados", "Loot": "Botín", "Marching": "En marcha", "Returning": "Regresando", "Marches: {a} / {b}": "Marchas: {a} / {b}", "{t} ago": "hace {t}", "Raiders": "Saqueadores", "All enemy troops were destroyed.": "Todas las tropas enemigas fueron destruidas.", "Your troops had to retreat.": "Tus tropas tuvieron que retirarse.", "Armor Plate": "Placa de blindaje", "Arm Cannon": "Cañón de brazo", "Jet Reactor": "Reactor dorsal", "Armored Legs": "Piernas blindadas", "Standard": "Estándar", "Advanced": "Avanzado", "Elite": "Élite", "Prototype": "Prototipo", "Titan reached level {l}!": "¡El Titán alcanza el nivel {l}!", "On a mission": "En misión", "Too damaged to fight (30% needed)": "Demasiado dañado para luchar (30 % necesario)", "Ready for battle": "Listo para combatir", "Upgrade the Titan Hangar to raise the maximum level.": "Mejora el Hangar del Titán para subir el nivel máximo.", "troop attack": "ataque de tropas", "Equipment": "Equipamiento", "Empty": "Vacío", "Remove": "Quitar", "Parts inventory": "Piezas en inventario", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Derrota campamentos de saqueadores para ganar piezas. Los campamentos de mayor nivel dan mejores piezas.", "Equip": "Equipar", "Scrap for gold": "Reciclar por oro", "Manage Titan": "Gestionar el Titán", "Send the Titan": "Enviar el Titán", "Titan unavailable": "Titán no disponible", "Titan: {a} XP, health {b}%": "Titán: {a} XP, salud {b}%", "New part won: {p}": "Nueva pieza ganada: {p}", "Lv {l} · Health {h}%": "Nv. {l} · Salud {h}%"}, "de": {"COMMANDER": "KOMMANDANT", "POWER": "MACHT", "Progress to next level": "Fortschritt zum nächsten Level", "Menu": "Menü", "Titan": "Titan", "Fields": "Felder", "Map": "Karte", "Base": "Basis", "Shop": "Shop", "Quests": "Aufträge", "Messages": "Nachrichten", "Reports": "Berichte", "Inventory": "Inventar", "Defense": "Verteidigung", "Troops": "Truppen", "Research": "Forschung", "Settings": "Einstellungen", "MAP": "KARTE", "FIELDS": "FELDER", "BASE": "BASIS", "EMPIRE": "IMPERIUM", "ALLIANCE": "ALLIANZ", "TITAN": "TITAN", "Build the Titan Hangar": "Baue den Titan-Hangar", "Hangar level {l} · Ready": "Hangar Stufe {l} · Bereit", "Coming in a future update": "Kommt in einem zukünftigen Update", "Enter base": "Basis betreten", "max": "max.", "Lv": "St.", "metal": "Metall", "wood": "Holz", "stone": "Stein", "fuel": "Treibstoff", "rations": "Rationen", "gold": "Gold", "Command Center": "Kommandozentrale", "Heart of your base. Its level sets the maximum level of every other building.": "Das Herz deiner Basis. Seine Stufe bestimmt die Höchststufe aller anderen Gebäude.", "Defense Wall": "Verteidigungsmauer", "Protects your base and gives a defense bonus to your troops.": "Schützt deine Basis und gibt deinen Truppen einen Verteidigungsbonus.", "Barracks": "Kaserne", "Trains infantry units.": "Bildet Infanterie aus.", "Garrison": "Garnison", "Houses and trains defensive troops. You can build several.": "Beherbergt und bildet Verteidigungstruppen aus. Du kannst mehrere bauen.", "Housing Block": "Wohnblock", "Raises population, which supplies workers and recruits. You can build several.": "Erhöht die Bevölkerung, die Arbeiter und Rekruten liefert. Du kannst mehrere bauen.", "Warehouse": "Lagerhaus", "Increases how many resources you can store.": "Erhöht, wie viele Ressourcen du lagern kannst.", "Research Lab": "Forschungslabor", "Unlocks technologies that improve your whole base.": "Schaltet Technologien frei, die deine ganze Basis verbessern.", "Vehicle Factory": "Fahrzeugfabrik", "Builds armored vehicles.": "Baut gepanzerte Fahrzeuge.", "Rally Point": "Sammelpunkt", "Organizes marches. Sets how many troops can leave the base at once.": "Organisiert Märsche. Bestimmt, wie viele Truppen die Basis gleichzeitig verlassen können.", "Radar Station": "Radarstation", "Detects incoming attacks.": "Erkennt eingehende Angriffe.", "Titan Hangar": "Titan-Hangar", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Beherbergt und repariert deinen Titan, den riesigen Kampfroboter, der deine Angriffe anführt und die Basis verteidigt. Seine Stufe bestimmt die Höchststufe des Titans.", "Metal Mine": "Metallmine", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Fördert Metallerz aus dem Boden. Jede Stufe produziert mehr Metall pro Stunde.", "Sawmill": "Sägewerk", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Schlägt Holz im umliegenden Wald. Jede Stufe produziert mehr Holz pro Stunde.", "Stone Quarry": "Steinbruch", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Bricht und schneidet Steinblöcke. Jede Stufe produziert mehr Stein pro Stunde.", "Fuel Pump": "Treibstoffpumpe", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pumpt Rohöl und raffiniert es zu Treibstoff. Jede Stufe produziert mehr Treibstoff pro Stunde.", "Mess Hall": "Kantine", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Kocht und lagert Rationen für deine Truppen. Jede Stufe produziert mehr Rationen pro Stunde.", "Helipad": "Hubschrauberlandeplatz", "Trains and maintains your air units: attack helicopters and gunships.": "Bildet deine Lufteinheiten aus und wartet sie: Kampfhubschrauber und Gunships.", "Max building level: {l}": "Max. Gebäudestufe: {l}", "Defense bonus +{p}%": "Verteidigungsbonus +{p}%", "Infantry training speed +{p}%": "Infanterie-Ausbildungstempo +{p}%", "Defensive troop capacity +{n}": "Kapazität Verteidigungstruppen +{n}", "Population +{n}": "Bevölkerung +{n}", "Storage +{n} per resource": "Lager +{n} pro Ressource", "Research speed +{p}%": "Forschungstempo +{p}%", "Vehicle production speed +{p}%": "Fahrzeug-Produktionstempo +{p}%", "Max troops per march: {n}": "Max. Truppen pro Marsch: {n}", "Titan maximum level: {n}": "Max. Titan-Stufe: {n}", "Air unit training speed +{p}%": "Ausbildungstempo Luft +{p}%", "Detects attacks and enemy troop count": "Erkennt Angriffe und die Zahl feindlicher Truppen", "Produces {i} {n} {r} per hour": "Produziert {i} {n} {r} pro Stunde", "Recruit": "Rekrut", "Cheap basic infantry. Weak alone, useful in large numbers.": "Billige Grundinfanterie. Allein schwach, in großer Zahl nützlich.", "Rifleman": "Schütze", "Solid defensive infantry protected by a heavy riot shield.": "Robuste Verteidigungsinfanterie mit schwerem Schutzschild.", "Sniper": "Scharfschütze", "Long-range marksman who strikes before the enemy can reach him.": "Fernkampfschütze, der trifft, bevor der Feind ihn erreicht.", "Assault Trooper": "Sturmsoldat", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Schwerer Soldat im Exoskelett mit Gatling. Tödlich im Angriff.", "Supply Truck": "Versorgungs-LKW", "Carries large amounts of loot back to your base.": "Bringt große Mengen Beute zu deiner Basis.", "Scout Drone": "Aufklärungsdrohne", "Very fast scout. Spies on enemy bases and camps.": "Sehr schneller Späher. Spioniert feindliche Basen und Lager aus.", "Armored Carrier": "Schützenpanzer", "Heavily armored transport with a huge carrying capacity.": "Schwer gepanzerter Transporter mit riesiger Ladekapazität.", "Battle Tank": "Kampfpanzer", "Massive armored tank. Extremely tough and powerful.": "Massiver Panzer. Extrem robust und stark.", "Rocket Artillery": "Raketenartillerie", "Rocket launcher truck that devastates enemies from very long range.": "Raketenwerfer-LKW, der Feinde aus großer Entfernung vernichtet.", "Attack Helicopter": "Kampfhubschrauber", "Fast air unit that strikes with rockets and a nose cannon.": "Schnelle Lufteinheit mit Raketen und Bugkanone.", "Gunship": "Gunship", "Heavy tiltrotor gunship with huge firepower and armor.": "Schweres Kipprotor-Gunship mit enormer Feuerkraft und Panzerung.", "Build a {b} first": "Baue zuerst: {b}", "Requires {b} level {l}": "Benötigt {b} Stufe {l}", "Choose how many to train": "Wähle die Anzahl", "Training queue full (5 orders max)": "Ausbildungsschlange voll (max. 5 Aufträge)", "Not enough population: build or upgrade Housing Blocks": "Nicht genug Bevölkerung: baue oder verbessere Wohnblöcke", "Not enough resources": "Nicht genug Ressourcen", "Training {n} {u}": "Ausbildung: {n} {u}", "{n} {u} ready": "{n} {u} bereit", "No rations left: your troops are deserting!": "Keine Rationen mehr: deine Truppen desertieren!", "The construction queue is busy": "Die Bauschlange ist belegt", "Maximum level reached": "Höchststufe erreicht", "{b} started": "{b} begonnen", "{b} level {l} complete": "{b} Stufe {l} fertig", "Construction cancelled (50% refunded)": "Bau abgebrochen (50 % erstattet)", "Power": "Macht", "power": "Macht", "Train": "Ausbilden", "owned {n}": "vorhanden {n}", "Max": "Max", "each:": "je Einheit:", "Train troops": "Truppen ausbilden", "Population {a} / {b} · Training speed +{p}%": "Bevölkerung {a} / {b} · Ausbildungstempo +{p}%", "Waiting": "Wartend", "Finish (test)": "Fertig (Test)", "Your Army": "Deine Armee", "{n} troops": "{n} Truppen", "Population": "Bevölkerung", "Upkeep": "Unterhalt", "Net": "Netto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Deine Truppen essen mehr Rationen, als du produzierst. Baue oder verbessere Kantinen auf den Feldern, sonst desertieren deine Truppen, wenn die Rationen ausgehen.", "Infantry · Barracks": "Infanterie · Kaserne", "Vehicles · Vehicle Factory": "Fahrzeuge · Fahrzeugfabrik", "Air · Helipad": "Luft · Hubschrauberlandeplatz", "training": "in Ausbildung", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Tippe auf Kaserne, Fahrzeugfabrik oder Hubschrauberlandeplatz in deiner Basis, um mehr Truppen auszubilden.", "Upgrading to level {l}": "Ausbau auf Stufe {l}", "Building to level {l}": "Bau Stufe {l}", "Time left: {t}": "Verbleibend: {t}", "Finish now (test)": "Jetzt fertigstellen (Test)", "Cancel": "Abbrechen", "Level {l} / {m}": "Stufe {l} / {m}", "Current:": "Aktuell:", "Your Titan": "Dein Titan", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Dein Titan ist bereit und hält vor dem Hangar Wache. Stufen, Panzerteile und Angriffe kommen mit der Weltkarte.", "Upgrade to level {l}": "Auf Stufe {l} ausbauen", "Next:": "Nächste:", "Upgrade": "Ausbauen", "Not built": "Nicht gebaut", "Build": "Bauen", "Empty field": "Freies Feld", "Choose what to produce on this field.": "Wähle, was auf diesem Feld produziert wird.", "Empty plot": "Freier Bauplatz", "Choose a building to construct here.": "Wähle ein Gebäude, das hier gebaut wird.", "Every unique building is already built.": "Alle einzigartigen Gebäude sind bereits gebaut.", "Language": "Sprache", "Test tools": "Test-Werkzeuge", "Erase your save and restart from zero. This option will be removed in the final game.": "Löscht deinen Spielstand und beginnt von vorn. Diese Option wird im fertigen Spiel entfernt.", "Reset save": "Spielstand zurücksetzen", "Reset your base?": "Basis zurücksetzen?", "Forest": "Wald", "Rocky Hills": "Felshügel", "Metal Deposit": "Metallvorkommen", "Oil Field": "Ölfeld", "Farmland": "Ackerland", "Plains": "Ebene", "Raider Camp": "Plündererlager", "Your base": "Deine Basis", "Empty land. Nothing to collect here.": "Leeres Land. Hier gibt es nichts zu holen.", "Level {l}": "Stufe {l}", "Distance: {d} tiles": "Entfernung: {d} Felder", "Enemy forces": "Feindliche Truppen", "Possible loot": "Mögliche Beute", "Attack": "Angreifen", "GO": "LOS", "Back to my base": "Zurück zur Basis", "Send troops": "Truppen senden", "Available: {n}": "Verfügbar: {n}", "Troops: {a} / {b}": "Truppen: {a} / {b}", "Travel time: {t}": "Reisezeit: {t}", "Carry capacity: {n}": "Tragekapazität: {n}", "Launch attack": "Angriff starten", "Too many troops for one march (max {n})": "Zu viele Truppen für einen Marsch (max. {n})", "All marches are busy ({n} max)": "Alle Märsche sind unterwegs (max. {n})", "Choose your troops": "Wähle deine Truppen", "You have no troops. Train some at the Barracks.": "Du hast keine Truppen. Bilde welche in der Kaserne aus.", "Troops sent to {p}": "Truppen nach {p} geschickt", "Victory": "Sieg", "Defeat": "Niederlage", "Victory at {p}": "Sieg bei {p}", "Defeat at {p}": "Niederlage bei {p}", "Troops returned with loot": "Truppen mit Beute zurück", "No reports yet.": "Noch keine Berichte.", "Your troops": "Deine Truppen", "Enemy": "Feind", "Sent": "Gesendet", "Lost": "Verloren", "Killed": "Getötet", "Loot": "Beute", "Marching": "Unterwegs", "Returning": "Rückkehr", "Marches: {a} / {b}": "Märsche: {a} / {b}", "{t} ago": "vor {t}", "Raiders": "Plünderer", "All enemy troops were destroyed.": "Alle feindlichen Truppen wurden vernichtet.", "Your troops had to retreat.": "Deine Truppen mussten sich zurückziehen.", "Armor Plate": "Panzerplatte", "Arm Cannon": "Armkanone", "Jet Reactor": "Rückenreaktor", "Armored Legs": "Gepanzerte Beine", "Standard": "Standard", "Advanced": "Fortgeschritten", "Elite": "Elite", "Prototype": "Prototyp", "Titan reached level {l}!": "Der Titan erreicht Stufe {l}!", "On a mission": "Im Einsatz", "Too damaged to fight (30% needed)": "Zu beschädigt zum Kämpfen (30 % nötig)", "Ready for battle": "Kampfbereit", "Upgrade the Titan Hangar to raise the maximum level.": "Baue den Titan-Hangar aus, um die Höchststufe zu erhöhen.", "troop attack": "Truppenangriff", "Equipment": "Ausrüstung", "Empty": "Leer", "Remove": "Ablegen", "Parts inventory": "Teile im Inventar", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Besiege Plündererlager, um Ausrüstungsteile zu gewinnen. Höhere Lager geben bessere Teile.", "Equip": "Ausrüsten", "Scrap for gold": "Für Gold verschrotten", "Manage Titan": "Titan verwalten", "Send the Titan": "Titan senden", "Titan unavailable": "Titan nicht verfügbar", "Titan: {a} XP, health {b}%": "Titan: {a} EP, Zustand {b}%", "New part won: {p}": "Neues Teil gewonnen: {p}", "Lv {l} · Health {h}%": "St. {l} · Zustand {h}%"}, "it": {"COMMANDER": "COMANDANTE", "POWER": "POTENZA", "Progress to next level": "Progresso al livello successivo", "Menu": "Menu", "Titan": "Titano", "Fields": "Campi", "Map": "Mappa", "Base": "Base", "Shop": "Negozio", "Quests": "Missioni", "Messages": "Messaggi", "Reports": "Rapporti", "Inventory": "Inventario", "Defense": "Difesa", "Troops": "Truppe", "Research": "Ricerca", "Settings": "Impostazioni", "MAP": "MAPPA", "FIELDS": "CAMPI", "BASE": "BASE", "EMPIRE": "IMPERO", "ALLIANCE": "ALLEANZA", "TITAN": "TITANO", "Build the Titan Hangar": "Costruisci l'Hangar del Titano", "Hangar level {l} · Ready": "Hangar livello {l} · Pronto", "Coming in a future update": "In arrivo in un prossimo aggiornamento", "Enter base": "Entra nella base", "max": "max", "Lv": "Liv.", "metal": "metallo", "wood": "legno", "stone": "pietra", "fuel": "carburante", "rations": "razioni", "gold": "oro", "Command Center": "Centro di comando", "Heart of your base. Its level sets the maximum level of every other building.": "Il cuore della tua base. Il suo livello stabilisce il livello massimo di tutti gli altri edifici.", "Defense Wall": "Muro difensivo", "Protects your base and gives a defense bonus to your troops.": "Protegge la tua base e dà un bonus di difesa alle tue truppe.", "Barracks": "Caserma", "Trains infantry units.": "Addestra la fanteria.", "Garrison": "Guarnigione", "Houses and trains defensive troops. You can build several.": "Ospita e addestra truppe difensive. Puoi costruirne diverse.", "Housing Block": "Alloggi", "Raises population, which supplies workers and recruits. You can build several.": "Aumenta la popolazione, che fornisce lavoratori e reclute. Puoi costruirne diversi.", "Warehouse": "Magazzino", "Increases how many resources you can store.": "Aumenta la quantità di risorse che puoi immagazzinare.", "Research Lab": "Laboratorio", "Unlocks technologies that improve your whole base.": "Sblocca tecnologie che migliorano tutta la tua base.", "Vehicle Factory": "Fabbrica di veicoli", "Builds armored vehicles.": "Costruisce veicoli corazzati.", "Rally Point": "Punto di raduno", "Organizes marches. Sets how many troops can leave the base at once.": "Organizza le marce. Stabilisce quante truppe possono lasciare la base insieme.", "Radar Station": "Stazione radar", "Detects incoming attacks.": "Rileva gli attacchi in arrivo.", "Titan Hangar": "Hangar del Titano", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Ospita e ripara il tuo Titano, il robot da combattimento gigante che guida i tuoi attacchi e difende la base. Il suo livello stabilisce il livello massimo del Titano.", "Metal Mine": "Miniera di metallo", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Estrae minerale di metallo dal terreno. Ogni livello produce più metallo all'ora.", "Sawmill": "Segheria", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Taglia legname dalla foresta vicina. Ogni livello produce più legno all'ora.", "Stone Quarry": "Cava di pietra", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Scava e taglia blocchi di pietra. Ogni livello produce più pietra all'ora.", "Fuel Pump": "Pompa di carburante", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pompa petrolio greggio e lo raffina in carburante. Ogni livello produce più carburante all'ora.", "Mess Hall": "Mensa", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Cucina e conserva razioni per sfamare le tue truppe. Ogni livello produce più razioni all'ora.", "Helipad": "Eliporto", "Trains and maintains your air units: attack helicopters and gunships.": "Addestra e mantiene le tue unità aeree: elicotteri d'attacco e cannoniere.", "Max building level: {l}": "Livello max edifici: {l}", "Defense bonus +{p}%": "Bonus difesa +{p}%", "Infantry training speed +{p}%": "Velocità di addestramento fanteria +{p}%", "Defensive troop capacity +{n}": "Capacità truppe difensive +{n}", "Population +{n}": "Popolazione +{n}", "Storage +{n} per resource": "Magazzino +{n} per risorsa", "Research speed +{p}%": "Velocità di ricerca +{p}%", "Vehicle production speed +{p}%": "Velocità di produzione veicoli +{p}%", "Max troops per march: {n}": "Truppe max per marcia: {n}", "Titan maximum level: {n}": "Livello massimo del Titano: {n}", "Air unit training speed +{p}%": "Velocità di addestramento aereo +{p}%", "Detects attacks and enemy troop count": "Rileva attacchi e numero di truppe nemiche", "Produces {i} {n} {r} per hour": "Produce {i} {n} di {r} all'ora", "Recruit": "Recluta", "Cheap basic infantry. Weak alone, useful in large numbers.": "Fanteria di base economica. Debole da sola, utile in gran numero.", "Rifleman": "Fuciliere", "Solid defensive infantry protected by a heavy riot shield.": "Solida fanteria difensiva protetta da un pesante scudo antisommossa.", "Sniper": "Cecchino", "Long-range marksman who strikes before the enemy can reach him.": "Tiratore a lunga gittata che colpisce prima che il nemico lo raggiunga.", "Assault Trooper": "Assaltatore", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldato pesante in esoscheletro con mitragliatrice rotante. Letale in attacco.", "Supply Truck": "Camion di rifornimento", "Carries large amounts of loot back to your base.": "Riporta grandi quantità di bottino alla tua base.", "Scout Drone": "Drone da ricognizione", "Very fast scout. Spies on enemy bases and camps.": "Esploratore velocissimo. Spia basi e campi nemici.", "Armored Carrier": "Trasporto corazzato", "Heavily armored transport with a huge carrying capacity.": "Trasporto pesantemente corazzato con enorme capacità di carico.", "Battle Tank": "Carro armato", "Massive armored tank. Extremely tough and powerful.": "Carro armato massiccio. Estremamente resistente e potente.", "Rocket Artillery": "Artiglieria a razzi", "Rocket launcher truck that devastates enemies from very long range.": "Camion lanciarazzi che devasta i nemici a lunghissima distanza.", "Attack Helicopter": "Elicottero d'attacco", "Fast air unit that strikes with rockets and a nose cannon.": "Unità aerea veloce che colpisce con razzi e cannone frontale.", "Gunship": "Cannoniera", "Heavy tiltrotor gunship with huge firepower and armor.": "Cannoniera pesante a rotori basculanti con enorme potenza di fuoco e corazza.", "Build a {b} first": "Costruisci prima: {b}", "Requires {b} level {l}": "Richiede {b} livello {l}", "Choose how many to train": "Scegli quante addestrarne", "Training queue full (5 orders max)": "Coda di addestramento piena (max 5 ordini)", "Not enough population: build or upgrade Housing Blocks": "Popolazione insufficiente: costruisci o migliora gli Alloggi", "Not enough resources": "Risorse insufficienti", "Training {n} {u}": "Addestramento: {n} {u}", "{n} {u} ready": "{n} {u} pronti", "No rations left: your troops are deserting!": "Razioni finite: le tue truppe disertano!", "The construction queue is busy": "La coda di costruzione è occupata", "Maximum level reached": "Livello massimo raggiunto", "{b} started": "{b} avviato", "{b} level {l} complete": "{b} livello {l} completato", "Construction cancelled (50% refunded)": "Costruzione annullata (50% rimborsato)", "Power": "Potenza", "power": "potenza", "Train": "Addestra", "owned {n}": "posseduti {n}", "Max": "Max", "each:": "ciascuno:", "Train troops": "Addestra truppe", "Population {a} / {b} · Training speed +{p}%": "Popolazione {a} / {b} · Velocità di addestramento +{p}%", "Waiting": "In attesa", "Finish (test)": "Completa (test)", "Your Army": "Il tuo esercito", "{n} troops": "{n} truppe", "Population": "Popolazione", "Upkeep": "Mantenimento", "Net": "Netto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Le tue truppe mangiano più razioni di quante ne produci. Costruisci o migliora le Mense nei Campi, o le truppe diserteranno quando le razioni finiranno.", "Infantry · Barracks": "Fanteria · Caserma", "Vehicles · Vehicle Factory": "Veicoli · Fabbrica di veicoli", "Air · Helipad": "Aereo · Eliporto", "training": "in addestramento", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Tocca la Caserma, la Fabbrica di veicoli o l'Eliporto nella tua base per addestrare altre truppe.", "Upgrading to level {l}": "Miglioramento al livello {l}", "Building to level {l}": "Costruzione livello {l}", "Time left: {t}": "Tempo rimanente: {t}", "Finish now (test)": "Completa ora (test)", "Cancel": "Annulla", "Level {l} / {m}": "Livello {l} / {m}", "Current:": "Attuale:", "Your Titan": "Il tuo Titano", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Il tuo Titano è pronto e fa la guardia davanti all'hangar. Livelli, pezzi di corazza e attacchi arriveranno con la mappa del mondo.", "Upgrade to level {l}": "Migliora al livello {l}", "Next:": "Successivo:", "Upgrade": "Migliora", "Not built": "Non costruito", "Build": "Costruisci", "Empty field": "Campo libero", "Choose what to produce on this field.": "Scegli cosa produrre su questo campo.", "Empty plot": "Lotto libero", "Choose a building to construct here.": "Scegli un edificio da costruire qui.", "Every unique building is already built.": "Tutti gli edifici unici sono già costruiti.", "Language": "Lingua", "Test tools": "Strumenti di test", "Erase your save and restart from zero. This option will be removed in the final game.": "Cancella il salvataggio e ricomincia da zero. Questa opzione verrà rimossa nel gioco finale.", "Reset save": "Reimposta partita", "Reset your base?": "Reimpostare la base?", "Forest": "Foresta", "Rocky Hills": "Colline rocciose", "Metal Deposit": "Giacimento di metallo", "Oil Field": "Giacimento petrolifero", "Farmland": "Terreni agricoli", "Plains": "Pianura", "Raider Camp": "Accampamento di predoni", "Your base": "La tua base", "Empty land. Nothing to collect here.": "Terreno vuoto. Niente da raccogliere qui.", "Level {l}": "Livello {l}", "Distance: {d} tiles": "Distanza: {d} caselle", "Enemy forces": "Forze nemiche", "Possible loot": "Bottino possibile", "Attack": "Attacca", "GO": "VAI", "Back to my base": "Torna alla mia base", "Send troops": "Invia truppe", "Available: {n}": "Disponibili: {n}", "Troops: {a} / {b}": "Truppe: {a} / {b}", "Travel time: {t}": "Tempo di viaggio: {t}", "Carry capacity: {n}": "Capacità di carico: {n}", "Launch attack": "Lancia l'attacco", "Too many troops for one march (max {n})": "Troppe truppe per una marcia (max {n})", "All marches are busy ({n} max)": "Tutte le marce sono occupate (max {n})", "Choose your troops": "Scegli le tue truppe", "You have no troops. Train some at the Barracks.": "Non hai truppe. Addestrane alcune nella Caserma.", "Troops sent to {p}": "Truppe inviate a {p}", "Victory": "Vittoria", "Defeat": "Sconfitta", "Victory at {p}": "Vittoria a {p}", "Defeat at {p}": "Sconfitta a {p}", "Troops returned with loot": "Truppe rientrate con il bottino", "No reports yet.": "Nessun rapporto per ora.", "Your troops": "Le tue truppe", "Enemy": "Nemico", "Sent": "Inviate", "Lost": "Perse", "Killed": "Uccisi", "Loot": "Bottino", "Marching": "In marcia", "Returning": "Rientro", "Marches: {a} / {b}": "Marce: {a} / {b}", "{t} ago": "{t} fa", "Raiders": "Predoni", "All enemy troops were destroyed.": "Tutte le truppe nemiche sono state distrutte.", "Your troops had to retreat.": "Le tue truppe hanno dovuto ritirarsi.", "Armor Plate": "Piastra corazzata", "Arm Cannon": "Cannone da braccio", "Jet Reactor": "Reattore dorsale", "Armored Legs": "Gambe corazzate", "Standard": "Standard", "Advanced": "Avanzato", "Elite": "Élite", "Prototype": "Prototipo", "Titan reached level {l}!": "Il Titano raggiunge il livello {l}!", "On a mission": "In missione", "Too damaged to fight (30% needed)": "Troppo danneggiato per combattere (30% necessario)", "Ready for battle": "Pronto al combattimento", "Upgrade the Titan Hangar to raise the maximum level.": "Migliora l'Hangar del Titano per alzare il livello massimo.", "troop attack": "attacco truppe", "Equipment": "Equipaggiamento", "Empty": "Vuoto", "Remove": "Rimuovi", "Parts inventory": "Pezzi in inventario", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Sconfiggi gli accampamenti di predoni per ottenere pezzi. Gli accampamenti di livello più alto danno pezzi migliori.", "Equip": "Equipaggia", "Scrap for gold": "Rottama per oro", "Manage Titan": "Gestisci il Titano", "Send the Titan": "Invia il Titano", "Titan unavailable": "Titano non disponibile", "Titan: {a} XP, health {b}%": "Titano: {a} XP, salute {b}%", "New part won: {p}": "Nuovo pezzo ottenuto: {p}", "Lv {l} · Health {h}%": "Liv. {l} · Salute {h}%"}, "pt": {"COMMANDER": "COMANDANTE", "POWER": "PODER", "Progress to next level": "Progresso para o próximo nível", "Menu": "Menu", "Titan": "Titã", "Fields": "Campos", "Map": "Mapa", "Base": "Base", "Shop": "Loja", "Quests": "Missões", "Messages": "Mensagens", "Reports": "Relatórios", "Inventory": "Inventário", "Defense": "Defesa", "Troops": "Tropas", "Research": "Pesquisa", "Settings": "Configurações", "MAP": "MAPA", "FIELDS": "CAMPOS", "BASE": "BASE", "EMPIRE": "IMPÉRIO", "ALLIANCE": "ALIANÇA", "TITAN": "TITÃ", "Build the Titan Hangar": "Constrói o Hangar do Titã", "Hangar level {l} · Ready": "Hangar nível {l} · Pronto", "Coming in a future update": "Chega numa próxima atualização", "Enter base": "Entrar na base", "max": "máx.", "Lv": "Nv.", "metal": "metal", "wood": "madeira", "stone": "pedra", "fuel": "combustível", "rations": "rações", "gold": "ouro", "Command Center": "Centro de Comando", "Heart of your base. Its level sets the maximum level of every other building.": "O coração da tua base. O seu nível define o nível máximo de todos os outros edifícios.", "Defense Wall": "Muralha defensiva", "Protects your base and gives a defense bonus to your troops.": "Protege a tua base e dá um bónus de defesa às tuas tropas.", "Barracks": "Quartel", "Trains infantry units.": "Treina unidades de infantaria.", "Garrison": "Guarnição", "Houses and trains defensive troops. You can build several.": "Aloja e treina tropas defensivas. Podes construir várias.", "Housing Block": "Habitações", "Raises population, which supplies workers and recruits. You can build several.": "Aumenta a população, que fornece trabalhadores e recrutas. Podes construir várias.", "Warehouse": "Armazém", "Increases how many resources you can store.": "Aumenta a quantidade de recursos que podes armazenar.", "Research Lab": "Laboratório", "Unlocks technologies that improve your whole base.": "Desbloqueia tecnologias que melhoram toda a tua base.", "Vehicle Factory": "Fábrica de veículos", "Builds armored vehicles.": "Constrói veículos blindados.", "Rally Point": "Ponto de encontro", "Organizes marches. Sets how many troops can leave the base at once.": "Organiza as marchas. Define quantas tropas podem sair da base de uma vez.", "Radar Station": "Estação de radar", "Detects incoming attacks.": "Deteta ataques a caminho.", "Titan Hangar": "Hangar do Titã", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Abriga e repara o teu Titã, o robô de combate gigante que lidera os teus ataques e defende a base. O seu nível define o nível máximo do Titã.", "Metal Mine": "Mina de metal", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Extrai minério de metal do solo. Cada nível produz mais metal por hora.", "Sawmill": "Serração", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Corta madeira da floresta em redor. Cada nível produz mais madeira por hora.", "Stone Quarry": "Pedreira", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Escava e corta blocos de pedra. Cada nível produz mais pedra por hora.", "Fuel Pump": "Bomba de combustível", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Bombeia petróleo e refina-o em combustível. Cada nível produz mais combustível por hora.", "Mess Hall": "Refeitório", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Cozinha e guarda rações para alimentar as tuas tropas. Cada nível produz mais rações por hora.", "Helipad": "Heliporto", "Trains and maintains your air units: attack helicopters and gunships.": "Treina e mantém as tuas unidades aéreas: helicópteros de ataque e canhoneiras.", "Max building level: {l}": "Nível máx. dos edifícios: {l}", "Defense bonus +{p}%": "Bónus de defesa +{p}%", "Infantry training speed +{p}%": "Velocidade de treino da infantaria +{p}%", "Defensive troop capacity +{n}": "Capacidade de tropas defensivas +{n}", "Population +{n}": "População +{n}", "Storage +{n} per resource": "Armazenamento +{n} por recurso", "Research speed +{p}%": "Velocidade de pesquisa +{p}%", "Vehicle production speed +{p}%": "Velocidade de produção de veículos +{p}%", "Max troops per march: {n}": "Tropas máx. por marcha: {n}", "Titan maximum level: {n}": "Nível máximo do Titã: {n}", "Air unit training speed +{p}%": "Velocidade de treino aéreo +{p}%", "Detects attacks and enemy troop count": "Deteta ataques e o número de tropas inimigas", "Produces {i} {n} {r} per hour": "Produz {i} {n} de {r} por hora", "Recruit": "Recruta", "Cheap basic infantry. Weak alone, useful in large numbers.": "Infantaria básica barata. Fraca sozinha, útil em grande número.", "Rifleman": "Fuzileiro", "Solid defensive infantry protected by a heavy riot shield.": "Infantaria defensiva sólida protegida por um pesado escudo antimotim.", "Sniper": "Atirador furtivo", "Long-range marksman who strikes before the enemy can reach him.": "Atirador de longo alcance que ataca antes que o inimigo o alcance.", "Assault Trooper": "Soldado de assalto", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Soldado pesado com exoesqueleto e metralhadora rotativa. Letal no ataque.", "Supply Truck": "Camião de abastecimento", "Carries large amounts of loot back to your base.": "Leva grandes quantidades de saque para a tua base.", "Scout Drone": "Drone de reconhecimento", "Very fast scout. Spies on enemy bases and camps.": "Batedor muito rápido. Espia bases e acampamentos inimigos.", "Armored Carrier": "Transporte blindado", "Heavily armored transport with a huge carrying capacity.": "Transporte fortemente blindado com enorme capacidade de carga.", "Battle Tank": "Tanque de combate", "Massive armored tank. Extremely tough and powerful.": "Tanque blindado maciço. Extremamente resistente e poderoso.", "Rocket Artillery": "Artilharia de foguetes", "Rocket launcher truck that devastates enemies from very long range.": "Camião lança-foguetes que devasta inimigos a longa distância.", "Attack Helicopter": "Helicóptero de ataque", "Fast air unit that strikes with rockets and a nose cannon.": "Unidade aérea rápida que ataca com foguetes e canhão frontal.", "Gunship": "Canhoneira", "Heavy tiltrotor gunship with huge firepower and armor.": "Canhoneira pesada de rotores basculantes com enorme poder de fogo e blindagem.", "Build a {b} first": "Constrói primeiro: {b}", "Requires {b} level {l}": "Requer {b} nível {l}", "Choose how many to train": "Escolhe quantas treinar", "Training queue full (5 orders max)": "Fila de treino cheia (máx. 5 ordens)", "Not enough population: build or upgrade Housing Blocks": "População insuficiente: constrói ou melhora Habitações", "Not enough resources": "Recursos insuficientes", "Training {n} {u}": "A treinar {n} {u}", "{n} {u} ready": "{n} {u} prontos", "No rations left: your troops are deserting!": "Sem rações: as tuas tropas estão a desertar!", "The construction queue is busy": "A fila de construção está ocupada", "Maximum level reached": "Nível máximo atingido", "{b} started": "{b} iniciado", "{b} level {l} complete": "{b} nível {l} concluído", "Construction cancelled (50% refunded)": "Construção cancelada (50% reembolsado)", "Power": "Poder", "power": "poder", "Train": "Treinar", "owned {n}": "tens {n}", "Max": "Máx.", "each:": "cada:", "Train troops": "Treinar tropas", "Population {a} / {b} · Training speed +{p}%": "População {a} / {b} · Velocidade de treino +{p}%", "Waiting": "Em espera", "Finish (test)": "Concluir (teste)", "Your Army": "O teu exército", "{n} troops": "{n} tropas", "Population": "População", "Upkeep": "Manutenção", "Net": "Líquido", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "As tuas tropas comem mais rações do que produzes. Constrói ou melhora Refeitórios nos Campos, ou as tropas vão desertar quando as rações acabarem.", "Infantry · Barracks": "Infantaria · Quartel", "Vehicles · Vehicle Factory": "Veículos · Fábrica de veículos", "Air · Helipad": "Aéreo · Heliporto", "training": "em treino", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Toca no Quartel, na Fábrica de veículos ou no Heliporto da tua base para treinar mais tropas.", "Upgrading to level {l}": "A melhorar para nível {l}", "Building to level {l}": "A construir nível {l}", "Time left: {t}": "Tempo restante: {t}", "Finish now (test)": "Concluir agora (teste)", "Cancel": "Cancelar", "Level {l} / {m}": "Nível {l} / {m}", "Current:": "Atual:", "Your Titan": "O teu Titã", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "O teu Titã está pronto e de guarda em frente ao hangar. Níveis, peças de blindagem e ataques chegam com o mapa do mundo.", "Upgrade to level {l}": "Melhorar para nível {l}", "Next:": "Seguinte:", "Upgrade": "Melhorar", "Not built": "Não construído", "Build": "Construir", "Empty field": "Campo vazio", "Choose what to produce on this field.": "Escolhe o que produzir neste campo.", "Empty plot": "Lote vazio", "Choose a building to construct here.": "Escolhe um edifício para construir aqui.", "Every unique building is already built.": "Todos os edifícios únicos já estão construídos.", "Language": "Idioma", "Test tools": "Ferramentas de teste", "Erase your save and restart from zero. This option will be removed in the final game.": "Apaga o teu progresso e recomeça do zero. Esta opção será removida no jogo final.", "Reset save": "Reiniciar progresso", "Reset your base?": "Reiniciar a tua base?", "Forest": "Floresta", "Rocky Hills": "Colinas rochosas", "Metal Deposit": "Jazida de metal", "Oil Field": "Campo petrolífero", "Farmland": "Terras agrícolas", "Plains": "Planície", "Raider Camp": "Acampamento de saqueadores", "Your base": "A tua base", "Empty land. Nothing to collect here.": "Terreno vazio. Nada para recolher aqui.", "Level {l}": "Nível {l}", "Distance: {d} tiles": "Distância: {d} casas", "Enemy forces": "Forças inimigas", "Possible loot": "Saque possível", "Attack": "Atacar", "GO": "IR", "Back to my base": "Voltar à minha base", "Send troops": "Enviar tropas", "Available: {n}": "Disponíveis: {n}", "Troops: {a} / {b}": "Tropas: {a} / {b}", "Travel time: {t}": "Tempo de viagem: {t}", "Carry capacity: {n}": "Capacidade de carga: {n}", "Launch attack": "Lançar ataque", "Too many troops for one march (max {n})": "Demasiadas tropas para uma marcha (máx. {n})", "All marches are busy ({n} max)": "Todas as marchas estão ocupadas (máx. {n})", "Choose your troops": "Escolhe as tuas tropas", "You have no troops. Train some at the Barracks.": "Não tens tropas. Treina algumas no Quartel.", "Troops sent to {p}": "Tropas enviadas para {p}", "Victory": "Vitória", "Defeat": "Derrota", "Victory at {p}": "Vitória em {p}", "Defeat at {p}": "Derrota em {p}", "Troops returned with loot": "Tropas regressaram com o saque", "No reports yet.": "Ainda não há relatórios.", "Your troops": "As tuas tropas", "Enemy": "Inimigo", "Sent": "Enviadas", "Lost": "Perdidas", "Killed": "Mortos", "Loot": "Saque", "Marching": "Em marcha", "Returning": "A regressar", "Marches: {a} / {b}": "Marchas: {a} / {b}", "{t} ago": "há {t}", "Raiders": "Saqueadores", "All enemy troops were destroyed.": "Todas as tropas inimigas foram destruídas.", "Your troops had to retreat.": "As tuas tropas tiveram de recuar.", "Armor Plate": "Placa de blindagem", "Arm Cannon": "Canhão de braço", "Jet Reactor": "Reator dorsal", "Armored Legs": "Pernas blindadas", "Standard": "Padrão", "Advanced": "Avançado", "Elite": "Elite", "Prototype": "Protótipo", "Titan reached level {l}!": "O Titã atingiu o nível {l}!", "On a mission": "Em missão", "Too damaged to fight (30% needed)": "Danificado demais para lutar (30% necessário)", "Ready for battle": "Pronto para o combate", "Upgrade the Titan Hangar to raise the maximum level.": "Melhora o Hangar do Titã para subir o nível máximo.", "troop attack": "ataque das tropas", "Equipment": "Equipamento", "Empty": "Vazio", "Remove": "Remover", "Parts inventory": "Peças em inventário", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Derrota acampamentos de saqueadores para ganhar peças. Acampamentos de nível mais alto dão peças melhores.", "Equip": "Equipar", "Scrap for gold": "Reciclar por ouro", "Manage Titan": "Gerir o Titã", "Send the Titan": "Enviar o Titã", "Titan unavailable": "Titã indisponível", "Titan: {a} XP, health {b}%": "Titã: {a} XP, saúde {b}%", "New part won: {p}": "Nova peça ganha: {p}", "Lv {l} · Health {h}%": "Nv. {l} · Saúde {h}%"}, "pl": {"COMMANDER": "DOWÓDCA", "POWER": "SIŁA", "Progress to next level": "Postęp do następnego poziomu", "Menu": "Menu", "Titan": "Tytan", "Fields": "Pola", "Map": "Mapa", "Base": "Baza", "Shop": "Sklep", "Quests": "Zadania", "Messages": "Wiadomości", "Reports": "Raporty", "Inventory": "Ekwipunek", "Defense": "Obrona", "Troops": "Wojsko", "Research": "Badania", "Settings": "Ustawienia", "MAP": "MAPA", "FIELDS": "POLA", "BASE": "BAZA", "EMPIRE": "IMPERIUM", "ALLIANCE": "SOJUSZ", "TITAN": "TYTAN", "Build the Titan Hangar": "Zbuduj Hangar Tytana", "Hangar level {l} · Ready": "Hangar poz. {l} · Gotowy", "Coming in a future update": "Pojawi się w przyszłej aktualizacji", "Enter base": "Wejdź do bazy", "max": "maks.", "Lv": "Poz.", "metal": "metal", "wood": "drewno", "stone": "kamień", "fuel": "paliwo", "rations": "racje", "gold": "złoto", "Command Center": "Centrum dowodzenia", "Heart of your base. Its level sets the maximum level of every other building.": "Serce twojej bazy. Jego poziom określa maksymalny poziom wszystkich innych budynków.", "Defense Wall": "Mur obronny", "Protects your base and gives a defense bonus to your troops.": "Chroni twoją bazę i daje premię do obrony twoim wojskom.", "Barracks": "Koszary", "Trains infantry units.": "Szkoli piechotę.", "Garrison": "Garnizon", "Houses and trains defensive troops. You can build several.": "Mieści i szkoli wojska obronne. Możesz zbudować kilka.", "Housing Block": "Blok mieszkalny", "Raises population, which supplies workers and recruits. You can build several.": "Zwiększa populację, która dostarcza robotników i rekrutów. Możesz zbudować kilka.", "Warehouse": "Magazyn", "Increases how many resources you can store.": "Zwiększa ilość surowców, które możesz przechowywać.", "Research Lab": "Laboratorium", "Unlocks technologies that improve your whole base.": "Odblokowuje technologie ulepszające całą bazę.", "Vehicle Factory": "Fabryka pojazdów", "Builds armored vehicles.": "Buduje pojazdy opancerzone.", "Rally Point": "Punkt zborny", "Organizes marches. Sets how many troops can leave the base at once.": "Organizuje marsze. Określa, ile wojsk może naraz opuścić bazę.", "Radar Station": "Stacja radarowa", "Detects incoming attacks.": "Wykrywa nadchodzące ataki.", "Titan Hangar": "Hangar Tytana", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Mieści i naprawia twojego Tytana, gigantycznego robota bojowego, który prowadzi ataki i broni bazy. Jego poziom określa maksymalny poziom Tytana.", "Metal Mine": "Kopalnia metalu", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Wydobywa rudę metalu z ziemi. Każdy poziom daje więcej metalu na godzinę.", "Sawmill": "Tartak", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Pozyskuje drewno z okolicznego lasu. Każdy poziom daje więcej drewna na godzinę.", "Stone Quarry": "Kamieniołom", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Wydobywa i tnie bloki kamienne. Każdy poziom daje więcej kamienia na godzinę.", "Fuel Pump": "Pompa paliwa", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Pompuje ropę i rafinuje ją na paliwo. Każdy poziom daje więcej paliwa na godzinę.", "Mess Hall": "Stołówka", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Gotuje i przechowuje racje dla wojska. Każdy poziom daje więcej racji na godzinę.", "Helipad": "Lądowisko", "Trains and maintains your air units: attack helicopters and gunships.": "Szkoli i utrzymuje jednostki powietrzne: śmigłowce szturmowe i kanonierki.", "Max building level: {l}": "Maks. poziom budynków: {l}", "Defense bonus +{p}%": "Premia do obrony +{p}%", "Infantry training speed +{p}%": "Szybkość szkolenia piechoty +{p}%", "Defensive troop capacity +{n}": "Pojemność wojsk obronnych +{n}", "Population +{n}": "Populacja +{n}", "Storage +{n} per resource": "Magazyn +{n} na surowiec", "Research speed +{p}%": "Szybkość badań +{p}%", "Vehicle production speed +{p}%": "Szybkość produkcji pojazdów +{p}%", "Max troops per march: {n}": "Maks. wojsk na marsz: {n}", "Titan maximum level: {n}": "Maks. poziom Tytana: {n}", "Air unit training speed +{p}%": "Szybkość szkolenia lotnictwa +{p}%", "Detects attacks and enemy troop count": "Wykrywa ataki i liczebność wroga", "Produces {i} {n} {r} per hour": "Produkuje {i} {n} ({r}) na godzinę", "Recruit": "Rekrut", "Cheap basic infantry. Weak alone, useful in large numbers.": "Tania podstawowa piechota. Słaba w pojedynkę, przydatna w dużej liczbie.", "Rifleman": "Strzelec", "Solid defensive infantry protected by a heavy riot shield.": "Solidna piechota obronna chroniona ciężką tarczą.", "Sniper": "Snajper", "Long-range marksman who strikes before the enemy can reach him.": "Strzelec dalekiego zasięgu, który uderza, zanim wróg go dosięgnie.", "Assault Trooper": "Szturmowiec", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Ciężki żołnierz w egzoszkielecie z karabinem obrotowym. Zabójczy w ataku.", "Supply Truck": "Ciężarówka zaopatrzeniowa", "Carries large amounts of loot back to your base.": "Przewozi duże ilości łupów do twojej bazy.", "Scout Drone": "Dron zwiadowczy", "Very fast scout. Spies on enemy bases and camps.": "Bardzo szybki zwiadowca. Szpieguje wrogie bazy i obozy.", "Armored Carrier": "Transporter opancerzony", "Heavily armored transport with a huge carrying capacity.": "Mocno opancerzony transporter o ogromnej ładowności.", "Battle Tank": "Czołg bojowy", "Massive armored tank. Extremely tough and powerful.": "Potężny opancerzony czołg. Niezwykle wytrzymały i silny.", "Rocket Artillery": "Artyleria rakietowa", "Rocket launcher truck that devastates enemies from very long range.": "Wyrzutnia rakiet na ciężarówce niszcząca wroga z dużej odległości.", "Attack Helicopter": "Śmigłowiec szturmowy", "Fast air unit that strikes with rockets and a nose cannon.": "Szybka jednostka powietrzna atakująca rakietami i działkiem.", "Gunship": "Kanonierka", "Heavy tiltrotor gunship with huge firepower and armor.": "Ciężka kanonierka z wirnikami obrotowymi, ogromna siła ognia i pancerz.", "Build a {b} first": "Najpierw zbuduj: {b}", "Requires {b} level {l}": "Wymaga: {b}, poziom {l}", "Choose how many to train": "Wybierz liczbę do szkolenia", "Training queue full (5 orders max)": "Kolejka szkolenia pełna (maks. 5 rozkazów)", "Not enough population: build or upgrade Housing Blocks": "Za mała populacja: zbuduj lub ulepsz Bloki mieszkalne", "Not enough resources": "Za mało surowców", "Training {n} {u}": "Szkolenie: {n} {u}", "{n} {u} ready": "{n} {u} gotowe", "No rations left: your troops are deserting!": "Brak racji: twoje wojska dezerterują!", "The construction queue is busy": "Kolejka budowy jest zajęta", "Maximum level reached": "Osiągnięto maksymalny poziom", "{b} started": "Rozpoczęto: {b}", "{b} level {l} complete": "{b} poziom {l} ukończony", "Construction cancelled (50% refunded)": "Budowa anulowana (zwrot 50%)", "Power": "Siła", "power": "siły", "Train": "Szkol", "owned {n}": "posiadane {n}", "Max": "Maks.", "each:": "za szt.:", "Train troops": "Szkol wojska", "Population {a} / {b} · Training speed +{p}%": "Populacja {a} / {b} · Szybkość szkolenia +{p}%", "Waiting": "Oczekuje", "Finish (test)": "Zakończ (test)", "Your Army": "Twoja armia", "{n} troops": "{n} żołnierzy", "Population": "Populacja", "Upkeep": "Utrzymanie", "Net": "Netto", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Twoje wojska jedzą więcej racji, niż produkujesz. Zbuduj lub ulepsz Stołówki na Polach, inaczej wojska zdezerterują, gdy racje się skończą.", "Infantry · Barracks": "Piechota · Koszary", "Vehicles · Vehicle Factory": "Pojazdy · Fabryka pojazdów", "Air · Helipad": "Lotnictwo · Lądowisko", "training": "w szkoleniu", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Dotknij Koszar, Fabryki pojazdów lub Lądowiska w bazie, aby szkolić więcej wojsk.", "Upgrading to level {l}": "Ulepszanie do poziomu {l}", "Building to level {l}": "Budowa poziomu {l}", "Time left: {t}": "Pozostało: {t}", "Finish now (test)": "Zakończ teraz (test)", "Cancel": "Anuluj", "Level {l} / {m}": "Poziom {l} / {m}", "Current:": "Obecnie:", "Your Titan": "Twój Tytan", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Twój Tytan jest gotowy i trzyma straż przed hangarem. Poziomy, części pancerza i ataki pojawią się wraz z mapą świata.", "Upgrade to level {l}": "Ulepsz do poziomu {l}", "Next:": "Następnie:", "Upgrade": "Ulepsz", "Not built": "Niezbudowany", "Build": "Buduj", "Empty field": "Puste pole", "Choose what to produce on this field.": "Wybierz, co produkować na tym polu.", "Empty plot": "Pusta działka", "Choose a building to construct here.": "Wybierz budynek do postawienia tutaj.", "Every unique building is already built.": "Wszystkie unikalne budynki są już zbudowane.", "Language": "Język", "Test tools": "Narzędzia testowe", "Erase your save and restart from zero. This option will be removed in the final game.": "Usuwa zapis i zaczyna od zera. Ta opcja zostanie usunięta w finalnej grze.", "Reset save": "Resetuj zapis", "Reset your base?": "Zresetować bazę?", "Forest": "Las", "Rocky Hills": "Skaliste wzgórza", "Metal Deposit": "Złoże metalu", "Oil Field": "Pole naftowe", "Farmland": "Pola uprawne", "Plains": "Równina", "Raider Camp": "Obóz najeźdźców", "Your base": "Twoja baza", "Empty land. Nothing to collect here.": "Puste tereny. Nie ma tu nic do zebrania.", "Level {l}": "Poziom {l}", "Distance: {d} tiles": "Odległość: {d} pól", "Enemy forces": "Siły wroga", "Possible loot": "Możliwy łup", "Attack": "Atakuj", "GO": "IDŹ", "Back to my base": "Wróć do bazy", "Send troops": "Wyślij wojska", "Available: {n}": "Dostępne: {n}", "Troops: {a} / {b}": "Wojska: {a} / {b}", "Travel time: {t}": "Czas marszu: {t}", "Carry capacity: {n}": "Ładowność: {n}", "Launch attack": "Rozpocznij atak", "Too many troops for one march (max {n})": "Za dużo wojsk na jeden marsz (maks. {n})", "All marches are busy ({n} max)": "Wszystkie marsze są zajęte (maks. {n})", "Choose your troops": "Wybierz wojska", "You have no troops. Train some at the Barracks.": "Nie masz wojsk. Wyszkol je w Koszarach.", "Troops sent to {p}": "Wojska wysłane do {p}", "Victory": "Zwycięstwo", "Defeat": "Porażka", "Victory at {p}": "Zwycięstwo: {p}", "Defeat at {p}": "Porażka: {p}", "Troops returned with loot": "Wojska wróciły z łupem", "No reports yet.": "Brak raportów.", "Your troops": "Twoje wojska", "Enemy": "Wróg", "Sent": "Wysłane", "Lost": "Stracone", "Killed": "Zabici", "Loot": "Łup", "Marching": "W marszu", "Returning": "Powrót", "Marches: {a} / {b}": "Marsze: {a} / {b}", "{t} ago": "{t} temu", "Raiders": "Najeźdźcy", "All enemy troops were destroyed.": "Wszystkie wrogie wojska zostały zniszczone.", "Your troops had to retreat.": "Twoje wojska musiały się wycofać.", "Armor Plate": "Płyta pancerna", "Arm Cannon": "Działo ramienne", "Jet Reactor": "Reaktor odrzutowy", "Armored Legs": "Opancerzone nogi", "Standard": "Standard", "Advanced": "Zaawansowany", "Elite": "Elitarny", "Prototype": "Prototyp", "Titan reached level {l}!": "Tytan osiąga poziom {l}!", "On a mission": "Na misji", "Too damaged to fight (30% needed)": "Zbyt uszkodzony do walki (wymagane 30%)", "Ready for battle": "Gotowy do walki", "Upgrade the Titan Hangar to raise the maximum level.": "Ulepsz Hangar Tytana, aby podnieść maksymalny poziom.", "troop attack": "ataku wojsk", "Equipment": "Wyposażenie", "Empty": "Puste", "Remove": "Zdejmij", "Parts inventory": "Części w magazynie", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Pokonuj obozy najeźdźców, by zdobywać części. Wyższe obozy dają lepsze części.", "Equip": "Załóż", "Scrap for gold": "Przetop na złoto", "Manage Titan": "Zarządzaj Tytanem", "Send the Titan": "Wyślij Tytana", "Titan unavailable": "Tytan niedostępny", "Titan: {a} XP, health {b}%": "Tytan: {a} PD, stan {b}%", "New part won: {p}": "Zdobyto nową część: {p}", "Lv {l} · Health {h}%": "Poz. {l} · Stan {h}%"}, "tr": {"COMMANDER": "KOMUTAN", "POWER": "GÜÇ", "Progress to next level": "Sonraki seviyeye ilerleme", "Menu": "Menü", "Titan": "Titan", "Fields": "Tarlalar", "Map": "Harita", "Base": "Üs", "Shop": "Mağaza", "Quests": "Görevler", "Messages": "Mesajlar", "Reports": "Raporlar", "Inventory": "Envanter", "Defense": "Savunma", "Troops": "Birlikler", "Research": "Araştırma", "Settings": "Ayarlar", "MAP": "HARİTA", "FIELDS": "TARLALAR", "BASE": "ÜS", "EMPIRE": "İMPARATORLUK", "ALLIANCE": "İTTİFAK", "TITAN": "TİTAN", "Build the Titan Hangar": "Titan Hangarını inşa et", "Hangar level {l} · Ready": "Hangar seviye {l} · Hazır", "Coming in a future update": "Gelecek bir güncellemede gelecek", "Enter base": "Üsse gir", "max": "maks.", "Lv": "Sv.", "metal": "metal", "wood": "odun", "stone": "taş", "fuel": "yakıt", "rations": "erzak", "gold": "altın", "Command Center": "Komuta Merkezi", "Heart of your base. Its level sets the maximum level of every other building.": "Üssünün kalbi. Seviyesi diğer tüm binaların azami seviyesini belirler.", "Defense Wall": "Savunma Duvarı", "Protects your base and gives a defense bonus to your troops.": "Üssünü korur ve birliklerine savunma bonusu verir.", "Barracks": "Kışla", "Trains infantry units.": "Piyade birlikleri yetiştirir.", "Garrison": "Garnizon", "Houses and trains defensive troops. You can build several.": "Savunma birliklerini barındırır ve eğitir. Birden fazla inşa edebilirsin.", "Housing Block": "Konut Bloğu", "Raises population, which supplies workers and recruits. You can build several.": "İşçi ve acemi sağlayan nüfusu artırır. Birden fazla inşa edebilirsin.", "Warehouse": "Depo", "Increases how many resources you can store.": "Depolayabileceğin kaynak miktarını artırır.", "Research Lab": "Araştırma Laboratuvarı", "Unlocks technologies that improve your whole base.": "Tüm üssünü geliştiren teknolojilerin kilidini açar.", "Vehicle Factory": "Araç Fabrikası", "Builds armored vehicles.": "Zırhlı araçlar üretir.", "Rally Point": "Toplanma Noktası", "Organizes marches. Sets how many troops can leave the base at once.": "Seferleri düzenler. Üssü aynı anda kaç birliğin terk edebileceğini belirler.", "Radar Station": "Radar İstasyonu", "Detects incoming attacks.": "Gelen saldırıları tespit eder.", "Titan Hangar": "Titan Hangarı", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Saldırılarına öncülük eden ve üssü savunan dev savaş robotu Titan'ını barındırır ve onarır. Seviyesi Titan'ın azami seviyesini belirler.", "Metal Mine": "Metal Madeni", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Topraktan metal cevheri çıkarır. Her seviye saatte daha fazla metal üretir.", "Sawmill": "Kereste Fabrikası", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Çevredeki ormandan kereste keser. Her seviye saatte daha fazla odun üretir.", "Stone Quarry": "Taş Ocağı", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Taş blokları kazar ve keser. Her seviye saatte daha fazla taş üretir.", "Fuel Pump": "Yakıt Pompası", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Ham petrol pompalar ve yakıta dönüştürür. Her seviye saatte daha fazla yakıt üretir.", "Mess Hall": "Yemekhane", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Birliklerini beslemek için erzak pişirir ve depolar. Her seviye saatte daha fazla erzak üretir.", "Helipad": "Helikopter Pisti", "Trains and maintains your air units: attack helicopters and gunships.": "Hava birliklerini eğitir ve bakımını yapar: taarruz helikopterleri ve savaş uçakları.", "Max building level: {l}": "Azami bina seviyesi: {l}", "Defense bonus +{p}%": "Savunma bonusu +%{p}", "Infantry training speed +{p}%": "Piyade eğitim hızı +%{p}", "Defensive troop capacity +{n}": "Savunma birliği kapasitesi +{n}", "Population +{n}": "Nüfus +{n}", "Storage +{n} per resource": "Kaynak başına depo +{n}", "Research speed +{p}%": "Araştırma hızı +%{p}", "Vehicle production speed +{p}%": "Araç üretim hızı +%{p}", "Max troops per march: {n}": "Sefer başına azami birlik: {n}", "Titan maximum level: {n}": "Titan azami seviyesi: {n}", "Air unit training speed +{p}%": "Hava birliği eğitim hızı +%{p}", "Detects attacks and enemy troop count": "Saldırıları ve düşman birlik sayısını tespit eder", "Produces {i} {n} {r} per hour": "Saatte {i} {n} {r} üretir", "Recruit": "Acemi", "Cheap basic infantry. Weak alone, useful in large numbers.": "Ucuz temel piyade. Tek başına zayıf, kalabalık hâlde faydalı.", "Rifleman": "Tüfekçi", "Solid defensive infantry protected by a heavy riot shield.": "Ağır bir kalkanla korunan sağlam savunma piyadesi.", "Sniper": "Keskin Nişancı", "Long-range marksman who strikes before the enemy can reach him.": "Düşman ona ulaşmadan vuran uzun menzilli nişancı.", "Assault Trooper": "Saldırı Askeri", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Döner makineli tüfekli ağır dış iskelet askeri. Saldırıda ölümcül.", "Supply Truck": "İkmal Kamyonu", "Carries large amounts of loot back to your base.": "Büyük miktarda ganimeti üssüne taşır.", "Scout Drone": "Keşif Dronu", "Very fast scout. Spies on enemy bases and camps.": "Çok hızlı keşifçi. Düşman üslerini ve kamplarını gözetler.", "Armored Carrier": "Zırhlı Taşıyıcı", "Heavily armored transport with a huge carrying capacity.": "Devasa taşıma kapasiteli ağır zırhlı taşıyıcı.", "Battle Tank": "Muharebe Tankı", "Massive armored tank. Extremely tough and powerful.": "Devasa zırhlı tank. Son derece dayanıklı ve güçlü.", "Rocket Artillery": "Roket Topçusu", "Rocket launcher truck that devastates enemies from very long range.": "Düşmanları çok uzaktan yok eden roketatar kamyonu.", "Attack Helicopter": "Taarruz Helikopteri", "Fast air unit that strikes with rockets and a nose cannon.": "Roket ve burun topuyla saldıran hızlı hava birliği.", "Gunship": "Savaş Uçağı", "Heavy tiltrotor gunship with huge firepower and armor.": "Muazzam ateş gücü ve zırhı olan ağır döner rotorlu savaş uçağı.", "Build a {b} first": "Önce inşa et: {b}", "Requires {b} level {l}": "Gerekli: {b} seviye {l}", "Choose how many to train": "Kaç tane eğitileceğini seç", "Training queue full (5 orders max)": "Eğitim kuyruğu dolu (en fazla 5 emir)", "Not enough population: build or upgrade Housing Blocks": "Yetersiz nüfus: Konut Bloğu inşa et veya geliştir", "Not enough resources": "Yetersiz kaynak", "Training {n} {u}": "Eğitiliyor: {n} {u}", "{n} {u} ready": "{n} {u} hazır", "No rations left: your troops are deserting!": "Erzak bitti: birliklerin firar ediyor!", "The construction queue is busy": "İnşaat kuyruğu dolu", "Maximum level reached": "Azami seviyeye ulaşıldı", "{b} started": "{b} başladı", "{b} level {l} complete": "{b} seviye {l} tamamlandı", "Construction cancelled (50% refunded)": "İnşaat iptal edildi (%50 iade)", "Power": "Güç", "power": "güç", "Train": "Eğit", "owned {n}": "sahip {n}", "Max": "Maks.", "each:": "tanesi:", "Train troops": "Birlik eğit", "Population {a} / {b} · Training speed +{p}%": "Nüfus {a} / {b} · Eğitim hızı +%{p}", "Waiting": "Bekliyor", "Finish (test)": "Bitir (test)", "Your Army": "Ordun", "{n} troops": "{n} birlik", "Population": "Nüfus", "Upkeep": "Bakım", "Net": "Net", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Birliklerin ürettiğinden fazla erzak tüketiyor. Tarlalarda Yemekhane inşa et veya geliştir, yoksa erzak bitince birliklerin firar edecek.", "Infantry · Barracks": "Piyade · Kışla", "Vehicles · Vehicle Factory": "Araçlar · Araç Fabrikası", "Air · Helipad": "Hava · Helikopter Pisti", "training": "eğitimde", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Daha fazla birlik eğitmek için üssündeki Kışla, Araç Fabrikası veya Helikopter Pistine dokun.", "Upgrading to level {l}": "Seviye {l} için geliştiriliyor", "Building to level {l}": "Seviye {l} inşa ediliyor", "Time left: {t}": "Kalan süre: {t}", "Finish now (test)": "Şimdi bitir (test)", "Cancel": "İptal", "Level {l} / {m}": "Seviye {l} / {m}", "Current:": "Mevcut:", "Your Titan": "Titan'ın", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Titan'ın hazır ve hangarın önünde nöbet tutuyor. Seviyeler, zırh parçaları ve saldırılar dünya haritasıyla gelecek.", "Upgrade to level {l}": "Geliştir: seviye {l}", "Next:": "Sonraki:", "Upgrade": "Geliştir", "Not built": "İnşa edilmedi", "Build": "İnşa et", "Empty field": "Boş tarla", "Choose what to produce on this field.": "Bu tarlada ne üretileceğini seç.", "Empty plot": "Boş arsa", "Choose a building to construct here.": "Buraya inşa edilecek binayı seç.", "Every unique building is already built.": "Tüm benzersiz binalar zaten inşa edildi.", "Language": "Dil", "Test tools": "Test araçları", "Erase your save and restart from zero. This option will be removed in the final game.": "Kaydını sil ve sıfırdan başla. Bu seçenek oyunun son sürümünde kaldırılacak.", "Reset save": "Kaydı sıfırla", "Reset your base?": "Üssün sıfırlansın mı?", "Forest": "Orman", "Rocky Hills": "Kayalık Tepeler", "Metal Deposit": "Metal Yatağı", "Oil Field": "Petrol Sahası", "Farmland": "Tarım Arazisi", "Plains": "Ova", "Raider Camp": "Yağmacı Kampı", "Your base": "Senin üssün", "Empty land. Nothing to collect here.": "Boş arazi. Burada toplanacak bir şey yok.", "Level {l}": "Seviye {l}", "Distance: {d} tiles": "Mesafe: {d} kare", "Enemy forces": "Düşman kuvvetleri", "Possible loot": "Olası ganimet", "Attack": "Saldır", "GO": "GİT", "Back to my base": "Üssüme dön", "Send troops": "Birlik gönder", "Available: {n}": "Mevcut: {n}", "Troops: {a} / {b}": "Birlikler: {a} / {b}", "Travel time: {t}": "Yol süresi: {t}", "Carry capacity: {n}": "Taşıma kapasitesi: {n}", "Launch attack": "Saldırıyı başlat", "Too many troops for one march (max {n})": "Bir sefer için çok fazla birlik (en fazla {n})", "All marches are busy ({n} max)": "Tüm seferler meşgul (en fazla {n})", "Choose your troops": "Birliklerini seç", "You have no troops. Train some at the Barracks.": "Hiç birliğin yok. Kışla'da eğit.", "Troops sent to {p}": "Birlikler {p} hedefine gönderildi", "Victory": "Zafer", "Defeat": "Yenilgi", "Victory at {p}": "Zafer: {p}", "Defeat at {p}": "Yenilgi: {p}", "Troops returned with loot": "Birlikler ganimetle döndü", "No reports yet.": "Henüz rapor yok.", "Your troops": "Birliklerin", "Enemy": "Düşman", "Sent": "Gönderilen", "Lost": "Kayıp", "Killed": "Öldürülen", "Loot": "Ganimet", "Marching": "Yolda", "Returning": "Dönüyor", "Marches: {a} / {b}": "Seferler: {a} / {b}", "{t} ago": "{t} önce", "Raiders": "Yağmacılar", "All enemy troops were destroyed.": "Tüm düşman birlikleri yok edildi.", "Your troops had to retreat.": "Birliklerin geri çekilmek zorunda kaldı.", "Armor Plate": "Zırh Plakası", "Arm Cannon": "Kol Topu", "Jet Reactor": "Jet Reaktörü", "Armored Legs": "Zırhlı Bacaklar", "Standard": "Standart", "Advanced": "Gelişmiş", "Elite": "Elit", "Prototype": "Prototip", "Titan reached level {l}!": "Titan seviye {l} oldu!", "On a mission": "Görevde", "Too damaged to fight (30% needed)": "Savaşmak için fazla hasarlı (%30 gerekli)", "Ready for battle": "Savaşa hazır", "Upgrade the Titan Hangar to raise the maximum level.": "Azami seviyeyi artırmak için Titan Hangarını geliştir.", "troop attack": "birlik saldırısı", "Equipment": "Ekipman", "Empty": "Boş", "Remove": "Çıkar", "Parts inventory": "Parça envanteri", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Ekipman parçası kazanmak için Yağmacı Kamplarını yen. Yüksek seviyeli kamplar daha iyi parçalar verir.", "Equip": "Tak", "Scrap for gold": "Altın karşılığı hurdaya çıkar", "Manage Titan": "Titanı yönet", "Send the Titan": "Titanı gönder", "Titan unavailable": "Titan kullanılamıyor", "Titan: {a} XP, health {b}%": "Titan: {a} XP, sağlık %{b}", "New part won: {p}": "Yeni parça kazanıldı: {p}", "Lv {l} · Health {h}%": "Sv. {l} · Sağlık %{h}"}, "ru": {"COMMANDER": "КОМАНДИР", "POWER": "МОЩЬ", "Progress to next level": "Прогресс до следующего уровня", "Menu": "Меню", "Titan": "Титан", "Fields": "Поля", "Map": "Карта", "Base": "База", "Shop": "Магазин", "Quests": "Задания", "Messages": "Сообщения", "Reports": "Отчёты", "Inventory": "Инвентарь", "Defense": "Оборона", "Troops": "Войска", "Research": "Исследования", "Settings": "Настройки", "MAP": "КАРТА", "FIELDS": "ПОЛЯ", "BASE": "БАЗА", "EMPIRE": "ИМПЕРИЯ", "ALLIANCE": "АЛЬЯНС", "TITAN": "ТИТАН", "Build the Titan Hangar": "Постройте ангар Титана", "Hangar level {l} · Ready": "Ангар ур. {l} · Готов", "Coming in a future update": "Появится в будущем обновлении", "Enter base": "Войти на базу", "max": "макс.", "Lv": "Ур.", "metal": "металл", "wood": "дерево", "stone": "камень", "fuel": "топливо", "rations": "пайки", "gold": "золото", "Command Center": "Командный центр", "Heart of your base. Its level sets the maximum level of every other building.": "Сердце вашей базы. Его уровень определяет максимальный уровень всех остальных зданий.", "Defense Wall": "Оборонительная стена", "Protects your base and gives a defense bonus to your troops.": "Защищает вашу базу и даёт войскам бонус к обороне.", "Barracks": "Казарма", "Trains infantry units.": "Обучает пехоту.", "Garrison": "Гарнизон", "Houses and trains defensive troops. You can build several.": "Размещает и обучает оборонительные войска. Можно построить несколько.", "Housing Block": "Жилой блок", "Raises population, which supplies workers and recruits. You can build several.": "Увеличивает население, которое даёт рабочих и новобранцев. Можно построить несколько.", "Warehouse": "Склад", "Increases how many resources you can store.": "Увеличивает объём хранимых ресурсов.", "Research Lab": "Лаборатория", "Unlocks technologies that improve your whole base.": "Открывает технологии, улучшающие всю базу.", "Vehicle Factory": "Завод техники", "Builds armored vehicles.": "Производит бронетехнику.", "Rally Point": "Пункт сбора", "Organizes marches. Sets how many troops can leave the base at once.": "Организует походы. Определяет, сколько войск может одновременно покинуть базу.", "Radar Station": "Радарная станция", "Detects incoming attacks.": "Обнаруживает входящие атаки.", "Titan Hangar": "Ангар Титана", "Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.": "Укрывает и чинит вашего Титана — гигантского боевого робота, который ведёт атаки и защищает базу. Его уровень определяет максимальный уровень Титана.", "Metal Mine": "Металлический рудник", "Extracts metal ore from the ground. Each level produces more metal per hour.": "Добывает металлическую руду. Каждый уровень даёт больше металла в час.", "Sawmill": "Лесопилка", "Cuts timber from the surrounding forest. Each level produces more wood per hour.": "Валит лес вокруг базы. Каждый уровень даёт больше дерева в час.", "Stone Quarry": "Каменоломня", "Digs and cuts stone blocks. Each level produces more stone per hour.": "Добывает и режет каменные блоки. Каждый уровень даёт больше камня в час.", "Fuel Pump": "Топливный насос", "Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.": "Качает нефть и перерабатывает её в топливо. Каждый уровень даёт больше топлива в час.", "Mess Hall": "Столовая", "Cooks and stores rations to feed your troops. Each level produces more rations per hour.": "Готовит и хранит пайки для войск. Каждый уровень даёт больше пайков в час.", "Helipad": "Вертолётная площадка", "Trains and maintains your air units: attack helicopters and gunships.": "Обучает и обслуживает авиацию: ударные вертолёты и ганшипы.", "Max building level: {l}": "Макс. уровень зданий: {l}", "Defense bonus +{p}%": "Бонус обороны +{p}%", "Infantry training speed +{p}%": "Скорость обучения пехоты +{p}%", "Defensive troop capacity +{n}": "Вместимость оборонительных войск +{n}", "Population +{n}": "Население +{n}", "Storage +{n} per resource": "Хранилище +{n} на ресурс", "Research speed +{p}%": "Скорость исследований +{p}%", "Vehicle production speed +{p}%": "Скорость производства техники +{p}%", "Max troops per march: {n}": "Макс. войск в походе: {n}", "Titan maximum level: {n}": "Макс. уровень Титана: {n}", "Air unit training speed +{p}%": "Скорость обучения авиации +{p}%", "Detects attacks and enemy troop count": "Обнаруживает атаки и численность врага", "Produces {i} {n} {r} per hour": "Производит {i} {n} ({r}) в час", "Recruit": "Новобранец", "Cheap basic infantry. Weak alone, useful in large numbers.": "Дешёвая базовая пехота. Слаба в одиночку, полезна в большом количестве.", "Rifleman": "Стрелок", "Solid defensive infantry protected by a heavy riot shield.": "Надёжная оборонительная пехота с тяжёлым щитом.", "Sniper": "Снайпер", "Long-range marksman who strikes before the enemy can reach him.": "Дальнобойный стрелок, бьющий раньше, чем враг до него доберётся.", "Assault Trooper": "Штурмовик", "Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.": "Тяжёлый боец в экзоскелете с роторным пулемётом. Смертоносен в атаке.", "Supply Truck": "Грузовик снабжения", "Carries large amounts of loot back to your base.": "Доставляет на базу много добычи.", "Scout Drone": "Дрон-разведчик", "Very fast scout. Spies on enemy bases and camps.": "Очень быстрый разведчик. Шпионит за вражескими базами и лагерями.", "Armored Carrier": "Бронетранспортёр", "Heavily armored transport with a huge carrying capacity.": "Сильно бронированный транспорт с огромной грузоподъёмностью.", "Battle Tank": "Боевой танк", "Massive armored tank. Extremely tough and powerful.": "Массивный бронированный танк. Крайне прочный и мощный.", "Rocket Artillery": "Реактивная артиллерия", "Rocket launcher truck that devastates enemies from very long range.": "Ракетная установка, уничтожающая врагов с очень большой дистанции.", "Attack Helicopter": "Ударный вертолёт", "Fast air unit that strikes with rockets and a nose cannon.": "Быстрая авиация с ракетами и носовой пушкой.", "Gunship": "Ганшип", "Heavy tiltrotor gunship with huge firepower and armor.": "Тяжёлый конвертоплан с огромной огневой мощью и бронёй.", "Build a {b} first": "Сначала постройте: {b}", "Requires {b} level {l}": "Требуется: {b}, ур. {l}", "Choose how many to train": "Выберите количество", "Training queue full (5 orders max)": "Очередь обучения заполнена (макс. 5 приказов)", "Not enough population: build or upgrade Housing Blocks": "Мало населения: стройте или улучшайте жилые блоки", "Not enough resources": "Недостаточно ресурсов", "Training {n} {u}": "Обучение: {n} {u}", "{n} {u} ready": "{n} {u} готовы", "No rations left: your troops are deserting!": "Пайки закончились: войска дезертируют!", "The construction queue is busy": "Очередь строительства занята", "Maximum level reached": "Достигнут максимальный уровень", "{b} started": "Начато: {b}", "{b} level {l} complete": "{b}, ур. {l} — готово", "Construction cancelled (50% refunded)": "Строительство отменено (возврат 50%)", "Power": "Мощь", "power": "мощи", "Train": "Обучить", "owned {n}": "есть {n}", "Max": "Макс.", "each:": "за ед.:", "Train troops": "Обучить войска", "Population {a} / {b} · Training speed +{p}%": "Население {a} / {b} · Скорость обучения +{p}%", "Waiting": "Ожидание", "Finish (test)": "Завершить (тест)", "Your Army": "Ваша армия", "{n} troops": "{n} войск", "Population": "Население", "Upkeep": "Содержание", "Net": "Итого", "Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.": "Войска съедают больше пайков, чем вы производите. Стройте или улучшайте столовые на полях, иначе войска дезертируют, когда пайки закончатся.", "Infantry · Barracks": "Пехота · Казарма", "Vehicles · Vehicle Factory": "Техника · Завод техники", "Air · Helipad": "Авиация · Вертолётная площадка", "training": "в обучении", "Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.": "Нажмите на казарму, завод техники или вертолётную площадку, чтобы обучить больше войск.", "Upgrading to level {l}": "Улучшение до ур. {l}", "Building to level {l}": "Строительство ур. {l}", "Time left: {t}": "Осталось: {t}", "Finish now (test)": "Завершить сейчас (тест)", "Cancel": "Отмена", "Level {l} / {m}": "Уровень {l} / {m}", "Current:": "Сейчас:", "Your Titan": "Ваш Титан", "Your Titan is ready and standing guard in front of the hangar. Titan levels, armor parts and attacks arrive with the world map step.": "Ваш Титан готов и охраняет ангар. Уровни, части брони и атаки появятся вместе с картой мира.", "Upgrade to level {l}": "Улучшить до ур. {l}", "Next:": "Далее:", "Upgrade": "Улучшить", "Not built": "Не построено", "Build": "Построить", "Empty field": "Пустое поле", "Choose what to produce on this field.": "Выберите, что производить на этом поле.", "Empty plot": "Пустой участок", "Choose a building to construct here.": "Выберите здание для строительства.", "Every unique building is already built.": "Все уникальные здания уже построены.", "Language": "Язык", "Test tools": "Инструменты тестирования", "Erase your save and restart from zero. This option will be removed in the final game.": "Стирает сохранение и начинает игру заново. Эта опция будет удалена в финальной версии.", "Reset save": "Сбросить сохранение", "Reset your base?": "Сбросить базу?", "Forest": "Лес", "Rocky Hills": "Скалистые холмы", "Metal Deposit": "Месторождение металла", "Oil Field": "Нефтяное поле", "Farmland": "Сельхозугодья", "Plains": "Равнина", "Raider Camp": "Лагерь мародёров", "Your base": "Ваша база", "Empty land. Nothing to collect here.": "Пустая земля. Здесь нечего брать.", "Level {l}": "Уровень {l}", "Distance: {d} tiles": "Расстояние: {d} клеток", "Enemy forces": "Силы противника", "Possible loot": "Возможная добыча", "Attack": "Атаковать", "GO": "ВПЕРЁД", "Back to my base": "К моей базе", "Send troops": "Отправить войска", "Available: {n}": "Доступно: {n}", "Troops: {a} / {b}": "Войска: {a} / {b}", "Travel time: {t}": "Время в пути: {t}", "Carry capacity: {n}": "Грузоподъёмность: {n}", "Launch attack": "Начать атаку", "Too many troops for one march (max {n})": "Слишком много войск для одного похода (макс. {n})", "All marches are busy ({n} max)": "Все походы заняты (макс. {n})", "Choose your troops": "Выберите войска", "You have no troops. Train some at the Barracks.": "У вас нет войск. Обучите их в казарме.", "Troops sent to {p}": "Войска отправлены: {p}", "Victory": "Победа", "Defeat": "Поражение", "Victory at {p}": "Победа: {p}", "Defeat at {p}": "Поражение: {p}", "Troops returned with loot": "Войска вернулись с добычей", "No reports yet.": "Отчётов пока нет.", "Your troops": "Ваши войска", "Enemy": "Противник", "Sent": "Отправлено", "Lost": "Потери", "Killed": "Убито", "Loot": "Добыча", "Marching": "В пути", "Returning": "Возвращение", "Marches: {a} / {b}": "Походы: {a} / {b}", "{t} ago": "{t} назад", "Raiders": "Мародёры", "All enemy troops were destroyed.": "Все войска противника уничтожены.", "Your troops had to retreat.": "Вашим войскам пришлось отступить.", "Armor Plate": "Бронеплита", "Arm Cannon": "Ручная пушка", "Jet Reactor": "Реактивный двигатель", "Armored Legs": "Бронированные ноги", "Standard": "Стандарт", "Advanced": "Улучшенный", "Elite": "Элитный", "Prototype": "Прототип", "Titan reached level {l}!": "Титан достиг уровня {l}!", "On a mission": "На задании", "Too damaged to fight (30% needed)": "Слишком повреждён для боя (нужно 30%)", "Ready for battle": "Готов к бою", "Upgrade the Titan Hangar to raise the maximum level.": "Улучшите ангар Титана, чтобы поднять максимальный уровень.", "troop attack": "к атаке войск", "Equipment": "Снаряжение", "Empty": "Пусто", "Remove": "Снять", "Parts inventory": "Запас деталей", "Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.": "Побеждайте лагеря мародёров, чтобы получать детали. Лагеря высокого уровня дают детали получше.", "Equip": "Надеть", "Scrap for gold": "Разобрать на золото", "Manage Titan": "Управлять Титаном", "Send the Titan": "Отправить Титана", "Titan unavailable": "Титан недоступен", "Titan: {a} XP, health {b}%": "Титан: {a} опыта, прочность {b}%", "New part won: {p}": "Получена новая деталь: {p}", "Lv {l} · Health {h}%": "Ур. {l} · Прочность {h}%"}};
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
const RES = ['metal','wood','stone','fuel','rations','gold'];
// Painted icons (Gemini art)
const ICS = {"metal": "assets/img/metal.webp", "wood": "assets/img/wood.webp", "stone": "assets/img/stone.webp", "fuel": "assets/img/fuel.webp", "rations": "assets/img/rations.webp", "gold": "assets/img/gold.webp", "pop": "assets/img/pop.webp", "power": "assets/img/power.webp", "fields": "assets/img/fields.webp", "map": "assets/img/map.webp", "base": "assets/img/base.webp", "shop": "assets/img/shop.webp", "quests": "assets/img/quests.webp", "reports": "assets/img/reports.webp", "defense": "assets/img/defense.webp", "troops": "assets/img/troops.webp", "research": "assets/img/research.webp", "messages": "assets/img/messages.webp", "inventory": "assets/img/inventory.webp", "settings": "assets/img/settings.webp"};
const IC = {}; for(const k in ICS) IC[k]=`<img class="ic" src="${ICS[k]}" alt="">`;
const ICON = {metal:IC.metal,wood:IC.wood,stone:IC.stone,fuel:IC.fuel,rations:IC.rations,gold:IC.gold};
const BASE_RATE = {metal:300,wood:300,stone:300,fuel:150,rations:200,gold:0}; // per hour, produced by the base itself
// Production of one field at level l (per hour)
const PROD_MUL = {fuel:90, rations:220}; // other resources: 150 per level
const prodAt = (t,l) => Math.round((PROD_MUL[B[t].res]||150)*l*Math.pow(1.15,l-1));
// ===== POWER (like Might in Dragons of Atlantis) =====
// Every building level adds power. Troops and research will add power later.
const POWER = {command:120, wall:60, hangar:150, barracks:40, garrison:30, housing:15, warehouse:20, lab:50, factory:60, rally:25, radar:35, mine:12, sawmill:12, quarry:12, pump:12, mess:12, helipad:45};
const bPower = (t,l) => Math.round((POWER[t]||10)*l*(l+1)/2);
function totalPower(){ let p=troopPower()+titanPower(); for(const k in state.slots){ const b=state.slots[k]; p+=bPower(b.type,b.lvl); } return p; }
const levelReq = l => Math.round(150*Math.pow(l-1,2.1)); // power needed to reach commander level l
function playerLevel(p){ let l=1; while(levelReq(l+1)<=p) l++; return l; }
function rates(){ const r={...BASE_RATE}; for(const k in state.slots){ const b=state.slots[k], d=B[b.type]; if(d && d.field) r[d.res]+=prodAt(b.type,b.lvl); }
  r.gold+=goldIncome(); r.rations-=upkeep(); return r; }

// Later, each building gets "img": "images/xxx.png" (AI art) to replace the drawn version.
const B = {
  command:  {name:'Command Center', icon:'🏛️', color:'#5d6d7c', fixed:true, cost:{metal:400,wood:400,stone:400,fuel:100}, time:20,
             desc:'Heart of your base. Its level sets the maximum level of every other building.'},
  wall:     {name:'Defense Wall', icon:'🧱', color:'#555a5f', fixed:true, cost:{metal:300,wood:100,stone:500,fuel:0}, time:15,
             desc:'Protects your base and gives a defense bonus to your troops.'},
  barracks: {name:'Barracks', icon:'🪖', color:'#6b7442', unique:true, cost:{metal:250,wood:250,stone:150,fuel:50}, time:12,
             desc:'Trains infantry units.'},
  garrison: {name:'Garrison', icon:'🛡️', color:'#4f6a5a', cost:{metal:200,wood:200,stone:200,fuel:0}, time:10,
             desc:'Houses and trains defensive troops. You can build several.'},
  housing:  {name:'Housing Block', icon:'🏠', color:'#7d6a52', cost:{metal:100,wood:250,stone:150,fuel:0}, time:8,
             desc:'Raises population, which supplies workers and recruits. You can build several.'},
  warehouse:{name:'Warehouse', icon:'📦', color:'#7a5a3c', unique:true, cost:{metal:150,wood:300,stone:200,fuel:0}, time:10,
             desc:'Increases how many resources you can store.'},
  lab:      {name:'Research Lab', icon:'🔬', color:'#4c6488', unique:true, req:2, cost:{metal:400,wood:200,stone:300,fuel:150}, time:18,
             desc:'Unlocks technologies that improve your whole base.'},
  factory:  {name:'Vehicle Factory', icon:'🛠️', color:'#6c5f72', unique:true, req:3, cost:{metal:600,wood:200,stone:300,fuel:250}, time:25,
             desc:'Builds armored vehicles.'},
  rally:    {name:'Rally Point', icon:'🚩', color:'#8a4b3c', unique:true, cost:{metal:150,wood:150,stone:100,fuel:50}, time:8,
             desc:'Organizes marches. Sets how many troops can leave the base at once.'},
  radar:    {name:'Radar Station', icon:'📡', color:'#4d7a80', unique:true, req:2, cost:{metal:350,wood:100,stone:200,fuel:150}, time:15,
             desc:'Detects incoming attacks.'},
  hangar:   {name:'Titan Hangar', icon:'🤖', color:'#5a6470', fixed:true, req:2, cost:{metal:800,wood:300,stone:600,fuel:300}, time:30,
             desc:'Houses and repairs your Titan, the giant combat mech that leads your attacks and defends the base. Its level sets the Titan maximum level.'},
  // ---- Fields (resource production) ----
  mine:     {name:'Metal Mine', icon:'⛏️', color:'#6d6a66', field:true, res:'metal', cost:{metal:50,wood:150,stone:100,fuel:0}, time:6,
             desc:'Extracts metal ore from the ground. Each level produces more metal per hour.'},
  sawmill:  {name:'Sawmill', icon:'🪚', color:'#7a5a36', field:true, res:'wood', cost:{metal:100,wood:50,stone:120,fuel:0}, time:6,
             desc:'Cuts timber from the surrounding forest. Each level produces more wood per hour.'},
  quarry:   {name:'Stone Quarry', icon:'🪨', color:'#8d8a80', field:true, res:'stone', cost:{metal:120,wood:120,stone:30,fuel:0}, time:6,
             desc:'Digs and cuts stone blocks. Each level produces more stone per hour.'},
  pump:     {name:'Fuel Pump', icon:'🛢️', color:'#5b5f52', field:true, res:'fuel', cost:{metal:200,wood:100,stone:100,fuel:0}, time:8,
             desc:'Pumps crude oil and refines it into fuel. Each level produces more fuel per hour.'},
  mess:     {name:'Mess Hall', icon:'🥫', color:'#7d6a4a', field:true, res:'rations', cost:{metal:80,wood:150,stone:80,fuel:0}, time:6,
             desc:'Cooks and stores rations to feed your troops. Each level produces more rations per hour.'},
  helipad:  {name:'Helipad', icon:'🚁', color:'#55606a', unique:true, req:3, cost:{metal:700,wood:200,stone:500,fuel:400}, time:28,
             desc:'Trains and maintains your air units: attack helicopters and gunships.'}
};
// Building images (Gemini art, background removed)
const IMGS={"barracks": {"img": "assets/img/barracks.webp", "imgR": 0.6534, "imgAY": 0.6028, "imgW": 175}, "command": {"img": "assets/img/command.webp", "imgR": 0.8289, "imgAY": 0.6688, "imgW": 262}, "housing": {"img": "assets/img/housing.webp", "imgR": 0.8006, "imgAY": 0.6542, "imgW": 175}, "warehouse": {"img": "assets/img/warehouse.webp", "imgR": 0.7133, "imgAY": 0.6151, "imgW": 175}, "factory": {"img": "assets/img/factory.webp", "imgR": 0.763, "imgAY": 0.6412, "imgW": 175}, "rally": {"img": "assets/img/rally.webp", "imgR": 0.7061, "imgAY": 0.6109, "imgW": 175}, "radar": {"img": "assets/img/radar.webp", "imgR": 0.9741, "imgAY": 0.717, "imgW": 175}, "garrison": {"img": "assets/img/garrison.webp", "imgR": 0.7484, "imgAY": 0.6332, "imgW": 175}, "lab": {"img": "assets/img/lab.webp", "imgR": 0.701, "imgAY": 0.6079, "imgW": 175}, "mine": {"img": "assets/img/mine.webp", "imgR": 0.9699, "imgAY": 0.6691, "imgW": 175}, "sawmill": {"img": "assets/img/sawmill.webp", "imgR": 0.7142, "imgAY": 0.5483, "imgW": 175}, "quarry": {"img": "assets/img/quarry.webp", "imgR": 0.7238, "imgAY": 0.5516, "imgW": 175}, "pump": {"img": "assets/img/pump.webp", "imgR": 0.6975, "imgAY": 0.5397, "imgW": 175}, "hangar": {"img": "assets/img/hangar.webp", "imgR": 0.784, "imgAY": 0.5862, "imgW": 250}, "titan": {"img": "assets/img/titan.webp", "imgR": 0.9423, "imgAY": 0.5306, "imgW": 210}};
for(const t in IMGS) if(B[t]) Object.assign(B[t],IMGS[t]);
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
  assault:  {name:'Assault Trooper', bld:'barracks', req:4, at:70, df:45, hp:225, sp:275, rg:0, ld:20, up:5, pop:2, pw:3, time:14,
             cost:{metal:160, stone:60, fuel:20, rations:100, gold:20}, desc:'Exoskeleton heavy trooper with a rotary machine gun. Deadly in attack.'},
  truck:    {name:'Supply Truck', bld:'factory', req:1, at:1, df:10, hp:45, sp:100, rg:0, ld:200, up:2, pop:1, pw:1, time:4,
             cost:{metal:40, wood:60, fuel:30, rations:30}, desc:'Carries large amounts of loot back to your base.'},
  drone:    {name:'Scout Drone', bld:'factory', req:1, at:5, df:5, hp:10, sp:3000, rg:0, ld:0, up:1, pop:1, pw:2, time:6,
             cost:{metal:60, fuel:40, rations:10, gold:10}, desc:'Very fast scout. Spies on enemy bases and camps.'},
  apc:      {name:'Armored Carrier', bld:'factory', req:2, at:5, df:200, hp:750, sp:150, rg:0, ld:5000, up:10, pop:4, pw:5, time:40,
             cost:{metal:600, wood:200, stone:100, fuel:300, rations:100, gold:40}, desc:'Heavily armored transport with a huge carrying capacity.'},
  tank:     {name:'Battle Tank', bld:'factory', req:5, at:1000, df:400, hp:4000, sp:120, rg:0, ld:400, up:50, pop:10, pw:20, time:180,
             cost:{metal:3000, stone:1000, fuel:1500, rations:500, gold:300}, desc:'Massive armored tank. Extremely tough and powerful.'},
  artillery:{name:'Rocket Artillery', bld:'factory', req:6, at:1200, df:30, hp:1500, sp:50, rg:1500, ld:75, up:35, pop:8, pw:20, time:150,
             cost:{metal:2500, wood:800, fuel:1500, rations:400, gold:250}, desc:'Rocket launcher truck that devastates enemies from very long range.'},
  heli:     {name:'Attack Helicopter', bld:'helipad', req:1, at:150, df:60, hp:300, sp:1000, rg:0, ld:100, up:8, pop:3, pw:6, time:30,
             cost:{metal:500, fuel:400, rations:150, gold:60}, desc:'Fast air unit that strikes with rockets and a nose cannon.'},
  gunship:  {name:'Gunship', bld:'helipad', req:4, at:300, df:300, hp:1500, sp:750, rg:0, ld:80, up:20, pop:6, pw:12, time:90,
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
function popUsed(){ let p=0; const q=queuedUnits(), mm=marching(); for(const u in UNITS) p+=((state.troops[u]||0)+(q[u]||0)+(mm[u]||0))*UNITS[u].pop; return p; }
const goldIncome = () => Math.round(30 + popMax()*0.2);  // taxes paid by your population
function upkeep(){ let r=0; const mm=marching(); for(const u in UNITS) r+=((state.troops[u]||0)+(mm[u]||0))*UNITS[u].up; return r; }
function troopPower(){ let p=0; const mm=marching(); for(const u in UNITS) p+=((state.troops[u]||0)+(mm[u]||0))*UNITS[u].pw; return p; }
const trainSpeed = bl => 1 + 0.05*bldLevel(bl);
const unitTime = (u,n) => Math.max(1, Math.round(UNITS[u].time*n/trainSpeed(UNITS[u].bld)));
function unitCost(u,n){ const o={}; for(const r of RES) o[r]=(UNITS[u].cost[r]||0)*n; return o; }
function maxTrain(u){ const d=UNITS[u]; let m=Math.floor((popMax()-popUsed())/d.pop);
  for(const r of RES){ const c=d.cost[r]||0; if(c) m=Math.min(m,Math.floor(state.res[r]/c)); } return Math.max(0,Math.min(m,99999)); }
function whyNotTrain(u,n){ const d=UNITS[u], lv=bldLevel(d.bld);
  if(!lv) return _t('Build a {b} first',{b:_t(B[d.bld].name)});
  if(lv<d.req) return _t('Requires {b} level {l}',{b:_t(B[d.bld].name),l:d.req});
  if(!(n>0)) return _t('Choose how many to train');
  if((state.training[d.bld]||[]).length>=5) return _t('Training queue full (5 orders max)');
  if(popUsed()+n*d.pop>popMax()) return _t('Not enough population: build or upgrade Housing Blocks');
  const c=unitCost(u,n); for(const r of RES) if(state.res[r]<c[r]) return _t('Not enough resources');
  return ''; }
function train(u,n){
  if(whyNotTrain(u,n)) return; const d=UNITS[u], c=unitCost(u,n); for(const r of RES) state.res[r]-=c[r];
  const q=state.training[d.bld]=state.training[d.bld]||[], now=Date.now(), st=q.length?Math.max(now,q[q.length-1].e):now;
  q.push({u,n,s:st,e:st+unitTime(u,n)*1000}); trainQty[u]=0; save(); renderAll(); toast('🪖 '+_t('Training {n} {u}',{n:n.toLocaleString('en-US'),u:_t(d.name)})); }
function finishTraining(bl){ // test button: finishes the current order, the next ones move forward
  const q=state.training[bl]; if(!q||!q.length) return; const now=Date.now(); let t=now;
  q.forEach((j,i)=>{ const dur=j.e-j.s; if(i===0) j.e=now; else { j.s=t; j.e=t+dur; } t=j.e; }); checkTraining(); }
function checkTraining(){
  const now=Date.now(); let p0=null; const done=[];
  for(const bl in state.training){ const q=state.training[bl];
    while(q.length && now>=q[0].e){ if(p0===null) p0=totalPower(); const j=q.shift(); state.troops[j.u]=(state.troops[j.u]||0)+j.n; done.push(j); } }
  if(done.length){ save(); renderAll(); const j=done[done.length-1]; toast('✅ '+_t('{n} {u} ready',{n:j.n.toLocaleString('en-US'),u:_t(UNITS[j.u].name)})); powerGain(totalPower()-p0); } }
function desert(dt){ // no rations left: 10% of the troops desert every hour
  const f=0.10*dt/3600; state.desertAcc=state.desertAcc||{}; let lost=0;
  for(const u in state.troops){ const n=state.troops[u]; if(!n) continue;
    state.desertAcc[u]=(state.desertAcc[u]||0)+n*f; const k=Math.floor(state.desertAcc[u]);
    if(k>0){ state.troops[u]=Math.max(0,n-k); state.desertAcc[u]-=k; lost+=k; } }
  if(lost && Date.now()-(state.lastDesert||0)>60000){ state.lastDesert=Date.now(); toast('⚠️ '+_t('No rations left: your troops are deserting!')); } }

// ===== TROOPS UI =====
const pct = (a,b) => Math.max(0,Math.min(100,(Date.now()-a)/(b-a)*100));
function unitStats(d){ return `<div class="ust"><span>⚔️ ${d.at}</span><span>🛡️ ${d.df}</span><span>❤️ ${d.hp}</span><span>💨 ${d.sp}</span>${d.rg?`<span>🎯 ${d.rg}</span>`:''}<span>📦 ${d.ld}</span><span>${IC.rations} ${d.up}/h</span><span>${IC.pop} ${d.pop}</span><span class="pwc">${IC.power} ${d.pw}</span></div>`; }
const bigIcon = d => d.img ? `<img class="bimg" src="${d.img}" alt="">` : d.icon;
function costInline(c){ return RES.filter(r=>c[r]).map(r=>`${ICON[r]}${fmtN(c[r])}`).join(' '); }
function trainCost(u,n){ if(!(n>0)) return ''; const c=unitCost(u,n), d=UNITS[u];
  return `<div class="chips">${RES.filter(r=>c[r]>0).map(r=>`<span class="chip${state.res[r]<c[r]?' no':''}">${ICON[r]} ${fmtN(c[r])}</span>`).join('')}<span class="chip">⏱ ${fmtT(unitTime(u,n))}</span><span class="chip">${IC.pop} ${fmtN(n*d.pop)}</span><span class="chip pw">${IC.power} +${fmtN(n*d.pw)} ${_t('Power')}</span></div>`; }
function trainBtn(u,n){ const why=whyNotTrain(u,n);
  return `<button data-act="train" data-unit="${u}"${why?' disabled':''}>${_t('Train')}${n>0?' '+n.toLocaleString('en-US'):''}</button>${why&&n>0?`<div class="why">${why}</div>`:''}`; }
function updateTrainRow(u){ const n=trainQty[u]||0, c=document.getElementById('tc-'+u), a=document.getElementById('ta-'+u); if(c) c.innerHTML=trainCost(u,n); if(a) a.innerHTML=trainBtn(u,n); }
function unitCard(u){ const d=UNITS[u], lv=bldLevel(d.bld), locked=lv<d.req, n=trainQty[u]||0, own=state.troops[u]||0;
  return `<div class="row ucard${locked?' locked':''}"><div class="top"><img class="uimg" src="${d.img}" alt=""><div style="flex:1;min-width:0"><b>${_t(d.name)}</b> <span class="sub">· ${_t('owned {n}',{n:own.toLocaleString('en-US')})}</span><div class="sub">${_t(d.desc)}</div>${unitStats(d)}</div></div>
  ${locked?`<div class="why">🔒 ${_t('Requires {b} level {l}',{b:_t(B[d.bld].name),l:d.req})}</div>`:
  `<div class="trow2"><input type="number" min="0" inputmode="numeric" data-qty="${u}" value="${n||''}" placeholder="0"><button class="sec sm" data-act="max" data-unit="${u}">${_t('Max')} ${maxTrain(u).toLocaleString('en-US')}</button><span class="sub">${_t('each:')} ${costInline(d.cost)} · ⏱ ${fmtT(unitTime(u,1))}</span></div>
   <div id="tc-${u}">${trainCost(u,n)}</div><div id="ta-${u}">${trainBtn(u,n)}</div>`}</div>`; }
function trainSection(bl){
  const q=state.training[bl]||[];
  let h=`<h3>🪖 ${_t('Train troops')}</h3><div class="sub">${_t('Population {a} / {b} · Training speed +{p}%',{a:fmtN(popUsed()),b:fmtN(popMax()),p:Math.round((trainSpeed(bl)-1)*100)})}</div>`;
  if(q.length){ h+=`<div class="row">`;
    q.forEach((j,i)=>{ const d=UNITS[j.u];
      h+=`<div class="tq"><img src="${d.img}" alt=""><div class="tqi"><b>${j.n.toLocaleString('en-US')} × ${_t(d.name)}</b>${i===0
        ?`<div class="prog"><i class="lv-bar" data-s="${j.s}" data-e="${j.e}" style="width:${pct(j.s,j.e)}%"></i></div><span class="sub">⏱ <span class="lv-time" data-s="${j.s}" data-e="${j.e}">${fmtT((j.e-Date.now())/1000)}</span></span>`
        :`<div class="sub">${_t('Waiting')} · ${fmtT((j.e-j.s)/1000)}</div>`}</div>${i===0?`<button class="sm" data-act="tfinish" data-bld="${bl}">${_t('Finish (test)')}</button>`:''}</div>`; });
    h+=`</div>`; }
  for(const u of UNIT_ORDER.filter(u=>UNITS[u].bld===bl)) h+=unitCard(u);
  return h; }
function troopsPanel(){
  const total=Object.values(state.troops).reduce((a,b)=>a+b,0), q=queuedUnits(), rt=rates();
  let h=`<div class="hd"><div class="big" style="background:#4b5a3a">${IC.troops}</div><div><h2>${_t('Your Army')}</h2><div class="sub">${_t('{n} troops',{n:fmtN(total)})} · ${IC.power} ${fmtN(troopPower())} ${_t('power')}</div></div></div>
  <div class="chips"><span class="chip">${IC.pop} ${_t('Population')} ${fmtN(popUsed())} / ${fmtN(popMax())}</span><span class="chip">${IC.rations} ${_t('Upkeep')} ${fmtN(upkeep())}/h</span><span class="chip${rt.rations<0?' no':''}">${IC.rations} ${_t('Net')} ${rt.rations>=0?'+':''}${fmtN(rt.rations)}/h</span></div>`;
  if(rt.rations<0) h+=`<div class="why">⚠️ ${_t('Your troops eat more rations than you produce. Build or upgrade Mess Halls in the Fields, or your troops will desert when rations run out.')}</div>`;
  for(const [bl,label] of [['barracks','Infantry · Barracks'],['factory','Vehicles · Vehicle Factory'],['helipad','Air · Helipad']]){
    h+=`<h3>${_t(label)}</h3><div class="armyg">`;
    for(const u of UNIT_ORDER.filter(u=>UNITS[u].bld===bl)){ const d=UNITS[u], n=state.troops[u]||0;
      h+=`<div class="acell${n?'':' zero'}"><img src="${d.img}" alt=""><b>${fmtN(n)}</b><span>${_t(d.name)}</span>${q[u]?`<small>+${fmtN(q[u])} ${_t('training')}</small>`:''}</div>`; }
    h+=`</div>`; }
  return h+`<p class="sub" style="margin-top:12px">${_t('Tap the Barracks, Vehicle Factory or Helipad in your base to train more troops.')}</p>`; }
const MENU = [['troops','Troops',()=>openTroops()],['shop','Shop','soon'],['quests','Quests','soon'],
  ['messages','Messages','soon'],['reports','Reports',()=>openReports()],['inventory','Inventory','soon'],
  ['defense','Defense','soon'],['research','Research','soon'],['settings','Settings',()=>openSettings()]];
function settingsPanel(){
  return `<h2>${_t('Settings')}</h2><h3>${_t('Language')}</h3><div class="menug">${LANGS.map(([c,n])=>`<button class="sbtn mitem${c===LANG?' on':''}" data-act="lang" data-l="${c}"><em>${n}</em>${c===LANG?' ✔':''}</button>`).join('')}</div>
  <h3>${_t('Test tools')}</h3><p class="sub" style="margin-bottom:8px">${_t('Erase your save and restart from zero. This option will be removed in the final game.')}</p>
  <button class="sec" data-act="reset">${IC.settings} ${_t('Reset save')}</button>`; }
function openSettings(){ cur='__settings'; openedAt=Date.now(); renderSheet(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function menuPanel(){ return `<h2>${_t('Menu')}</h2><div class="menug">${MENU.map((m,i)=>`<button class="sbtn mitem" data-act="menu" data-i="${i}"><span>${IC[m[0]]}</span><em>${_t(m[1])}</em></button>`).join('')}</div>`; }
function openMenu(){ cur='__menu'; openedAt=Date.now(); renderSheet(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function liveSheet(){ const now=Date.now();
  document.querySelectorAll('#sheet [data-e]').forEach(el=>{ const a=+el.dataset.s, b=+el.dataset.e;
    if(el.classList.contains('lv-bar')) el.style.width=pct(a,b)+'%'; else el.textContent=fmtT((b-now)/1000); }); }
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
function vnoise(x,y){ const xi=Math.floor(x), yi=Math.floor(y), fx=x-xi, fy=y-yi, sm=t=>t*t*(3-2*t);
  const a=hash(xi,yi,7), b=hash(xi+1,yi,7), c=hash(xi,yi+1,7), d=hash(xi+1,yi+1,7), u=sm(fx), v=sm(fy);
  return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
// What is on tile (x, y)? null = empty ground
function tileAt(x,y){
  if(x<1||y<1||x>MAPN||y>MAPN) return null;
  if(x===state.pos.x && y===state.pos.y) return {t:'home', lvl:playerLevel(totalPower())};
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
const sprKey = tl => !tl ? 'plain' : tl.t==='camp' ? campSpr(tl.lvl) : (tl.lvl && MSPR[tl.t+'_'+tl.lvl]) ? tl.t+'_'+tl.lvl : tl.t;
const tileName = tl => tl.t==='home' ? _t('Your base') : _t(TILE[tl.t].name)+(tl.lvl&&tl.t!=='plain' ? ' · '+_t('Lv')+' '+tl.lvl : '');
const place = (x,y) => { const tl=tileAt(x,y)||{t:'plain'}; return `${tileName(tl)} (${x}, ${y})`; };
const dist = (x,y) => Math.hypot(x-state.pos.x, y-state.pos.y);

// enemy forces guarding a tile
function defenders(tl){
  if(!tl || !tl.lvl || tl.t==='home' || tl.t==='plain') return {};
  const L=tl.lvl, budget=25*Math.pow(1.9,L-1)*(tl.t==='camp'?1.6:1);
  const mix = L<=2?{recruit:1}: L<=4?{recruit:.5,rifleman:.5}: L<=6?{rifleman:.4,sniper:.3,assault:.3}: L<=8?{assault:.4,sniper:.3,apc:.3}:{assault:.3,tank:.4,artillery:.3};
  const o={}; for(const u in mix) o[u]=Math.max(1,Math.round(budget*mix[u]/UNITS[u].pw)); return o;
}
// what an attack can bring back
function lootOf(tl){
  const L=tl.lvl, o={};
  if(tl.t==='camp'){ for(const r of ['metal','wood','stone','fuel']) o[r]=Math.round(260*Math.pow(1.8,L-1)); o.gold=Math.round(25*Math.pow(1.7,L-1)); }
  else if(TILE[tl.t].res) o[TILE[tl.t].res]=Math.round(450*Math.pow(1.8,L-1));
  return o;
}

// ---------- camera ----------
const mapc=document.createElement('canvas'); mapc.id='mapc'; document.getElementById('viewport').appendChild(mapc);
const mctx=mapc.getContext('2d');
let mcam=null, mapSel=null, groundPat=null;
const gImg=new Image(); gImg.onload=()=>{ groundPat=null; if(view==='map') drawMap(); }; gImg.src=MSPR.ground.img;
const cellW = (x,y) => [(x-y)*TW/2, (x+y)*TH/2];                    // tile centre in world pixels
function camCenter(x,y){ const [wx,wy]=cellW(x,y); mcam.x=wx; mcam.y=wy; clampCam(); }
function clampCam(){ mcam.z=Math.min(1.4,Math.max(0.3,mcam.z)); mcam.x=Math.max(-MAPN*TW/2,Math.min(MAPN*TW/2,mcam.x)); mcam.y=Math.max(TH,Math.min(MAPN*TH,mcam.y)); }
function screenToCell(sx,sy){ const v=vsize(), wx=(sx-v.w/2)/mcam.z+mcam.x, wy=(sy-v.h/2)/mcam.z+mcam.y;
  const a=wx/(TW/2), b=wy/(TH/2); return [Math.round((a+b)/2), Math.round((b-a)/2)]; }
function resizeMap(){ const v=vsize(), d=window.devicePixelRatio||1; mapc.width=Math.round(v.w*d); mapc.height=Math.round(v.h*d); mapc.style.width=v.w+'px'; mapc.style.height=v.h+'px'; }
function mapZoomAt(f,sx,sy){ const v=vsize(), z0=mcam.z; const wx=(sx-v.w/2)/z0+mcam.x, wy=(sy-v.h/2)/z0+mcam.y;
  mcam.z*=f; clampCam(); mcam.x=wx-(sx-v.w/2)/mcam.z; mcam.y=wy-(sy-v.h/2)/mcam.z; clampCam(); drawMap(); updateCoords(); }
function mapPan(dx,dy){ mcam.x-=dx/mcam.z; mcam.y-=dy/mcam.z; clampCam(); drawMap(); updateCoords(); }
function updateCoords(){ const v=vsize(), [x,y]=screenToCell(v.w/2,v.h/2), ix=document.getElementById('cxi'), iy=document.getElementById('cyi');
  if(document.activeElement!==ix) ix.value=Math.max(1,Math.min(MAPN,x)); if(document.activeElement!==iy) iy.value=Math.max(1,Math.min(MAPN,y)); }

// ---------- drawing ----------
function badge(c,x,y,txt,col){ c.font='700 15px "Black Ops One", Impact, sans-serif'; const w=Math.max(24,c.measureText(txt).width+12);
  c.fillStyle=col; c.strokeStyle='#3a2604'; c.lineWidth=2.5; c.beginPath(); c.roundRect(x-w/2,y-12,w,24,5); c.fill(); c.stroke();
  c.fillStyle='#241803'; c.textAlign='center'; c.textBaseline='middle'; c.fillText(txt,x,y+1); }
function drawMap(){
  if(view!=='map' || !mcam) return;
  const v=vsize(), d=window.devicePixelRatio||1, c=mctx, z=mcam.z;
  c.setTransform(1,0,0,1,0,0); c.fillStyle='#22281c'; c.fillRect(0,0,mapc.width,mapc.height);
  c.setTransform(z*d,0,0,z*d,(v.w/2-mcam.x*z)*d,(v.h/2-mcam.y*z)*d);
  const x0=mcam.x-v.w/2/z, y0=mcam.y-v.h/2/z, x1=mcam.x+v.w/2/z, y1=mcam.y+v.h/2/z;
  // ground inside the map diamond, dark outside
  const [ax,ay]=cellW(0.5,0.5), [bx,by]=cellW(MAPN+.5,0.5), [cx,cy]=cellW(MAPN+.5,MAPN+.5), [dx,dy]=cellW(0.5,MAPN+.5);
  c.save(); c.beginPath(); c.moveTo(ax,ay); c.lineTo(bx,by); c.lineTo(cx,cy); c.lineTo(dx,dy); c.closePath(); c.clip();
  if(gImg.complete && gImg.naturalWidth){ if(!groundPat) groundPat=c.createPattern(gImg,'repeat'); c.fillStyle=groundPat; } else c.fillStyle='#5b6a35';
  c.fillRect(x0,y0,x1-x0,y1-y0); c.restore();
  c.strokeStyle='#e0b63e88'; c.lineWidth=4/z; c.beginPath(); c.moveTo(ax,ay); c.lineTo(bx,by); c.lineTo(cx,cy); c.lineTo(dx,dy); c.closePath(); c.stroke();
  // visible tiles, back to front
  const corners=[[0,0],[v.w,0],[0,v.h],[v.w,v.h]].map(([sx,sy])=>screenToCell(sx,sy));
  const gx0=Math.max(1,Math.min(...corners.map(p=>p[0]))-1), gx1=Math.min(MAPN,Math.max(...corners.map(p=>p[0]))+1);
  const gy0=Math.max(1,Math.min(...corners.map(p=>p[1]))-1), gy1=Math.min(MAPN,Math.max(...corners.map(p=>p[1]))+2);
  if(mapSel){ const [sx,sy]=cellW(mapSel.x,mapSel.y); c.fillStyle='#ffd54a33'; c.strokeStyle='#ffd54a'; c.lineWidth=3/z;
    c.beginPath(); c.moveTo(sx-TW/2,sy); c.lineTo(sx,sy-TH/2); c.lineTo(sx+TW/2,sy); c.lineTo(sx,sy+TH/2); c.closePath(); c.fill(); c.stroke(); }
  const badges=[];
  for(let s=gx0+gy0; s<=gx1+gy1; s++){
    for(let x=Math.max(gx0,s-gy1); x<=Math.min(gx1,s-gy0); x++){
      const y=s-x, tl=tileAt(x,y); if(!tl) continue;
      const [wx,wy]=cellW(x,y); if(wx<x0-TW||wx>x1+TW||wy<y0-TH||wy>y1+TH*2.5) continue;
      const key = sprKey(tl), sp=MSPR[key], im=MIMG[key];
      const w = TW*(tl.t==='home'?1.3: tl.t==='camp'?1.2:1.12), h=w*sp.r;
      if(im.complete && im.naturalWidth) c.drawImage(im, wx-w/2, wy-sp.cy*h, w, h);
      if(tl.t==='home') badges.push([wx, wy+TH*0.42, '★ '+tl.lvl, '#7fd06a']);
      else if(tl.lvl && tl.t!=='plain' && z>0.42) badges.push([wx+w*0.3, wy+TH*0.2, String(tl.lvl), tl.t==='camp'?'#e0574a':'#f3c534']);
    }
  }
  // marches: dashed line base -> target with a moving dot
  const [hx,hy]=cellW(state.pos.x,state.pos.y), now=Date.now();
  for(const m of state.marches){ const [tx2,ty2]=cellW(m.x,m.y);
    const p = m.st==='out' ? pct(m.s,m.a)/100 : 1-pct(m.a,m.b)/100;
    c.setLineDash([14/z,10/z]); c.strokeStyle=m.st==='out'?'#ff6a3d':'#7fd06a'; c.lineWidth=4/z; c.beginPath(); c.moveTo(hx,hy); c.lineTo(tx2,ty2); c.stroke(); c.setLineDash([]);
    c.fillStyle=c.strokeStyle; c.beginPath(); c.arc(hx+(tx2-hx)*p, hy+(ty2-hy)*p, 9/z, 0, 7); c.fill(); }
  const bs=Math.min(1.25,Math.max(0.8,1/z));
  for(const [bx2,by2,t,col] of badges){ c.save(); c.translate(bx2,by2); c.scale(bs,bs); badge(c,0,0,t,col); c.restore(); }
}

// ---------- tile panel ----------
function tilePanel(){
  const {x,y}=mapSel, tl=tileAt(x,y), key = sprKey(tl);
  let h=`<div class="hd"><div class="big"><img class="bimg" src="${MSPR[key].img}" alt=""></div><div><h2>${tl?tileName(tl):_t('Plains')}</h2>
    <div class="sub">X ${x} · Y ${y} · ${_t('Distance: {d} tiles',{d:dist(x,y).toFixed(1)})}</div></div></div>`;
  if(!tl || tl.t==='plain') return h+`<p>${_t('Empty land. Nothing to collect here.')}</p>`;
  if(tl.t==='home') return h+`<button data-act="gocity">🏰 ${_t('Enter base')}</button>`;
  const df=defenders(tl), lo=lootOf(tl);
  h+=`<h3>${_t('Enemy forces')}</h3><div class="armyg">${Object.keys(df).map(u=>`<div class="acell"><img src="${UNITS[u].img}" alt=""><b>${fmtN(df[u])}</b><span>${_t(UNITS[u].name)}</span></div>`).join('')}</div>
    <h3>${_t('Possible loot')}</h3><div class="chips">${Object.keys(lo).map(r=>`<span class="chip">${ICON[r]} ${fmtN(lo[r])}</span>`).join('')}</div>
    <button data-act="attack">⚔️ ${_t('Attack')}</button>`;
  return h;
}

// ---------- attack: choose troops ----------
const atkQty={}; let atkTitan=false;
const marchMax = () => Math.max(1, Math.min(5, bldLevel('rally')));
const marchTroopMax = () => Math.max(1, bldLevel('rally'))*1000;
function marchStats(q, ti){ let n=0, load=0, slow=Infinity; for(const u in q){ const k=q[u]||0; if(!k) continue; n+=k; load+=k*UNITS[u].ld; slow=Math.min(slow,UNITS[u].sp); }
  if(ti){ const st=titanStats(); load+=st.ld; slow=Math.min(slow,st.sp); }
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
  return `<div class="chips"><span class="chip">${IC.troops} ${_t('Troops: {a} / {b}',{a:fmtN(st.n),b:fmtN(marchTroopMax())})}</span><span class="chip">⏱ ${_t('Travel time: {t}',{t:fmtT(st.secs)})}</span><span class="chip">📦 ${_t('Carry capacity: {n}',{n:fmtN(st.load)})}</span><span class="chip">${_t('Marches: {a} / {b}',{a:state.marches.length,b:marchMax()})}</span></div>
    <button data-act="launch"${why?' disabled':''}>⚔️ ${_t('Launch attack')}</button>${why&&(st.n||atkTitan)?`<div class="why">${why}</div>`:''}`; }
function attackPanel(){
  const own=UNIT_ORDER.filter(u=>(state.troops[u]||0)>0);
  let h=`<h2>${_t('Send troops')}</h2><div class="sub">→ ${place(mapSel.x,mapSel.y)}</div>`;
  if(bldLevel('hangar')){ const T=titanState(), ok=titanReady();
    h+=`<div class="row trow-t${atkTitan?' on':''}"><div class="top"><img class="uimg" src="${titanImg()}" alt=""><div style="flex:1;min-width:0"><b>${_t('Titan')}</b>
      <div class="sub">${_t('Lv {l} · Health {h}%',{l:T.lvl,h:Math.floor(T.hp)})} · ${IC.troops} +${Math.round(titanTroopBonus()*100)}% ${_t('troop attack')}</div>
      <button class="${atkTitan?'':'sec '}sm" data-act="ttoggle"${ok?'':' disabled'}>${atkTitan?'✔ ':''}${_t(ok?'Send the Titan':'Titan unavailable')}</button></div></div></div>`; }
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
  save(); toast('⚔️ '+_t('Troops sent to {p}',{p:`(${mapSel.x}, ${mapSel.y})`})); closeSheet(); renderAll(); drawMap(); }

// ---------- battle ----------
function battle(att, def, titan){
  const A={...att}, D={...def}, TS=titan?titanStats():null, bonus=titan?1+titanTroopBonus():1;
  if(titan) A.titan=1;
  const U=u=>u==='titan'?TS:UNITS[u], sum=o=>Object.keys(o).reduce((a,u)=>a+(u==='titan'?(o[u]>0.05?1:0):o[u]),0);
  const hit=(from,to,round,mine)=>{ // damage spread over the enemy units according to their total health
    let dmg=0; for(const u in from){ const d=U(u); if(round===0 && !d.rg) continue; dmg+=from[u]*d.at*(round===0?1.5:1)*(mine&&u!=='titan'?bonus:1); }
    const hpTot=Object.keys(to).reduce((s,u)=>s+to[u]*U(u).hp,0); if(!hpTot) return {};
    const k={}; for(const u in to){ const d=U(u), share=to[u]*d.hp/hpTot; k[u]=Math.min(to[u], dmg*share*(100/(100+d.df))/d.hp); } return k; };
  for(let r=0;r<10 && sum(A)>0.5 && sum(D)>0.5;r++){
    const kd=hit(A,D,r,true), ka=hit(D,A,r,false);
    for(const u in kd) D[u]=Math.max(0,D[u]-kd[u]); for(const u in ka) A[u]=Math.max(0,A[u]-ka[u]); }
  const tLeft = titan ? Math.max(0,A.titan) : 1; delete A.titan;
  const ri=o=>{ const x={}; for(const u in o) x[u]=Math.round(o[u]); return x; };
  const left=ri(A), dleft=ri(D), tAlive=titan && tLeft>0.05, win=sum(dleft)===0 && (sum(left)>0 || tAlive);
  return {win, left, dleft, tLeft}; }
function arrive(m){
  const tl=tileAt(m.x,m.y), df=defenders(tl), res=battle(m.troops,df,m.titan), loot={};
  let tinfo=null;
  if(m.titan){ const T=titanState(), h0=T.hp, killed=Object.keys(df).reduce((s,u)=>s+(df[u]-(res.dleft[u]||0))*UNITS[u].pw,0);
    T.hp=Math.max(5, T.hp*(0.35+0.65*res.tLeft)); const xp=Math.round(killed*(res.win?6:2)+(res.win?20*tl.lvl:0)), up=gainXp(xp);
    const drop=res.win?rollDrop(tl):null; if(drop){ T.inv.push(drop); toast('🎁 '+_t('New part won: {p}',{p:_t(EQ_NAME[drop.s])+' · '+_t(EQ_TIER[drop.t])})); }
    tinfo={xp, hp0:Math.floor(h0), hp:Math.floor(T.hp), up, drop}; }
  if(res.win){ let cap=Object.keys(res.left).reduce((s,u)=>s+res.left[u]*UNITS[u].ld,0)+(m.titan?titanStats().ld:0); const lo=lootOf(tl), tot=Object.values(lo).reduce((a,b)=>a+b,0);
    for(const r in lo){ loot[r]=Math.floor(Math.min(lo[r], cap*lo[r]/Math.max(1,tot))); } }
  const rep={id:m.id, t:Date.now(), x:m.x, y:m.y, tt:tl.t, lvl:tl.lvl, win:res.win, sent:m.troops, left:res.left, def:df, dleft:res.dleft, loot, titan:tinfo, read:false};
  state.reports.unshift(rep); state.reports=state.reports.slice(0,40);
  toast((res.win?'🏆 ':'💀 ')+_t(res.win?'Victory at {p}':'Defeat at {p}',{p:place(m.x,m.y)}));
  const alive=Object.values(res.left).reduce((a,b)=>a+b,0);
  if(!alive && !m.titan){ state.marches=state.marches.filter(x=>x!==m); return; }
  m.st='back'; m.troops=res.left; m.loot=loot; }
function returnHome(m){
  for(const u in m.troops) state.troops[u]=(state.troops[u]||0)+m.troops[u];
  const c=cap(); for(const r in (m.loot||{})) state.res[r]= r==='gold' ? state.res[r]+m.loot[r] : Math.max(state.res[r], Math.min(c, state.res[r]+m.loot[r]));
  if(m.titan) titanState().away=false;
  state.marches=state.marches.filter(x=>x!==m); toast('✅ '+_t('Troops returned with loot')); }
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
    h+=`<div class="row rep${r.read?'':' unread'}" data-act="rep" data-id="${r.id}"><div class="top"><div class="big" style="width:46px;height:46px;font-size:24px">${r.win?'🏆':'💀'}</div>
      <div style="flex:1"><b style="color:${r.win?'var(--ok)':'var(--red)'}">${_t(r.win?'Victory':'Defeat')}</b> — ${nm}<div class="sub">${ago(r.t)}</div></div></div>`;
    if(open) h+=`<p style="margin-top:8px">${_t(r.win?'All enemy troops were destroyed.':'Your troops had to retreat.')}</p>
      <h3>${_t('Your troops')}</h3>${unitList(r.sent,r.left,_t('Sent'),_t('Lost'))}
      ${r.titan?`<div class="row"><div class="top"><img class="uimg" src="${titanImg()}" alt=""><div><b>${_t('Titan')}</b><div class="sub">${_t('Titan: {a} XP, health {b}%',{a:'+'+fmtN(r.titan.xp),b:r.titan.hp0+' → '+r.titan.hp})}</div>
        ${r.titan.drop?`<div style="display:flex;align-items:center;gap:8px;margin-top:4px">${eqIcon(r.titan.drop,36)}<span style="color:${EQ_COL[r.titan.drop.t]}">${_t(EQ_NAME[r.titan.drop.s])} · ${_t(EQ_TIER[r.titan.drop.t])}</span></div>`:''}</div></div></div>`:''}
      <h3>${_t('Enemy')} · ${_t('Raiders')}</h3>${unitList(r.def,r.dleft,'',_t('Killed'))}
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
const EQ_EMOJI = {armor:'🛡️', weapon:'💥', reactor:'🚀', legs:'🦿'};
const EQIMG = {};   // filled with painted icons when available: EQIMG['armor_2'] = 'assets/img/eq_armor_2.webp'
function titanState(){ if(!state.titan) state.titan={lvl:1, xp:0, hp:100, away:false, eq:{}, inv:[]}; return state.titan; }
const titanMax = () => Math.max(1, bldLevel('hangar'))*5;
const xpNeed = L => Math.round(220*Math.pow(L,1.8));
const eqB = slot => { const it=titanState().eq[slot]; return it ? EQ_BONUS[it.t] : 0; };
function titanStats(){ const T=titanState(), L=T.lvl;
  return { at: Math.round(450*L*(1+eqB('weapon'))), df: Math.round(150*L*(1+eqB('armor'))), hp: Math.round(2500*L*(1+eqB('armor')+eqB('legs')/2)),
           sp: Math.round(380*(1+eqB('reactor'))), ld: Math.round(300*L*(1+eqB('legs'))), rg:0, pw: Math.round(40*L*(L+1)/2) }; }
const titanTroopBonus = () => 0.02*titanState().lvl;      // +2% attack for the troops marching with the Titan, per level
const titanReady = () => { const T=titanState(); return bldLevel('hangar')>0 && !T.away && T.hp>=30; };
const repairRate = () => 5 + 2*bldLevel('hangar');         // health % repaired per hour at the hangar
function titanPower(){ if(!bldLevel('hangar')) return 0; const T=titanState(); let p=titanStats().pw; for(const s of EQ_SLOTS) if(T.eq[s]) p+=150*T.eq[s].t; return p; }
function eqIcon(it, size=46){ const src=EQIMG[it.s+'_'+it.t];
  return `<span class="eqi" style="width:${size}px;height:${size}px;border-color:${EQ_COL[it.t]}">${src?`<img src="${src}" alt="">`:`<b style="font-size:${size*0.5}px">${EQ_EMOJI[it.s]}</b>`}</span>`; }
function gainXp(n){ const T=titanState(); if(T.lvl>=titanMax()){ T.xp=Math.min(T.xp+n, xpNeed(T.lvl)); return 0; }
  T.xp+=n; let up=0; while(T.lvl<titanMax() && T.xp>=xpNeed(T.lvl)){ T.xp-=xpNeed(T.lvl); T.lvl++; up++; }
  if(up) toast('🤖 '+_t('Titan reached level {l}!',{l:T.lvl})); return up; }
function rollDrop(tl){
  if(tl.t!=='camp') return null; const L=tl.lvl, r=Math.random();
  if(r > 0.15+0.035*L) return null;
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
      <div class="sub">${T.away?'⚔️ '+_t('On a mission'):T.hp<30?'🔧 '+_t('Too damaged to fight (30% needed)'):'✅ '+_t('Ready for battle')}</div></div></div>
    <div class="tbar"><span>XP</span><div class="prog"><i style="width:${Math.min(100,T.xp/need*100)}%"></i></div><small>${fmtN(T.xp)} / ${fmtN(need)}</small></div>
    <div class="tbar"><span>❤️</span><div class="prog hpb"><i style="width:${T.hp}%"></i></div><small>${Math.floor(T.hp)}% · +${repairRate()}%/h</small></div>
    ${T.lvl>=titanMax()?`<div class="why">${_t('Upgrade the Titan Hangar to raise the maximum level.')}</div>`:''}
    <div class="ust" style="margin:8px 0"><span>⚔️ ${fmtN(st.at)}</span><span>🛡️ ${fmtN(st.df)}</span><span>❤️ ${fmtN(st.hp)}</span><span>💨 ${st.sp}</span><span>📦 ${fmtN(st.ld)}</span><span>${IC.troops} +${Math.round(titanTroopBonus()*100)}% ${_t('troop attack')}</span></div>
    <h3>${_t('Equipment')}</h3><div class="eqgrid">${EQ_SLOTS.map(s=>{ const it=T.eq[s];
      return `<div class="eqslot">${it?eqIcon(it,58):`<span class="eqi empty" style="width:58px;height:58px">${EQ_EMOJI[s]}</span>`}<b>${_t(EQ_NAME[s])}</b>
        <small>${it?`<span style="color:${EQ_COL[it.t]}">${_t(EQ_TIER[it.t])}</span> · +${Math.round(EQ_BONUS[it.t]*100)}%`:_t('Empty')}</small>
        ${it?`<button class="sec sm" data-act="uneq" data-s="${s}">${_t('Remove')}</button>`:''}</div>`; }).join('')}</div>
    <h3>${_t('Parts inventory')} (${T.inv.length})</h3>`;
  if(!T.inv.length) h+=`<p class="sub">${_t('Defeat Raider Camps to win equipment parts. Higher level camps drop better parts.')}</p>`;
  else h+=`<div class="eqgrid">${[...T.inv].sort((a,b)=>b.t-a.t).map(it=>`<div class="eqslot">${eqIcon(it,52)}<b>${_t(EQ_NAME[it.s])}</b><small style="color:${EQ_COL[it.t]}">${_t(EQ_TIER[it.t])} · +${Math.round(EQ_BONUS[it.t]*100)}%</small>
      <div style="display:flex;gap:4px"><button class="sm" data-act="equip" data-id="${it.id}">${_t('Equip')}</button><button class="sec sm" data-act="scrap" data-id="${it.id}" title="${_t('Scrap for gold')}">${IC.gold}</button></div></div>`).join('')}</div>`;
  return h; }
const titanStage = () => { const L=titanState().lvl; return L<=10?0: L<=30?1:2; };
const TITAN_STAGES = {};   // filled when the evolution pictures arrive: TITAN_STAGES[0] = 'assets/img/titan_0.webp'
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
    case 'garrison': return _t('Defensive troop capacity +{n}',{n:l*200});
    case 'housing':  return _t('Population +{n}',{n:l*100});
    case 'warehouse':return _t('Storage +{n} per resource',{n:fmtN(l*10000)});
    case 'lab':      return _t('Research speed +{p}%',{p:l*5});
    case 'factory':  return _t('Vehicle production speed +{p}%',{p:l*5});
    case 'rally':    return _t('Max troops per march: {n}',{n:l*1000});
    case 'hangar':   return _t('Titan maximum level: {n}',{n:l*5});
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
function fresh(){ return {res:{metal:5000,wood:5000,stone:5000,fuel:2500,rations:3000,gold:500}, slots:{cc:{type:'command',lvl:1},wall:{type:'wall',lvl:1}}, queue:null, troops:{}, training:{}, marches:[], reports:[], last:Date.now()}; }
let state;
try { state = JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch(e){ state = fresh(); }
// older saves: add the new resources and the army
state.res = Object.assign({metal:0,wood:0,stone:0,fuel:0,rations:3000,gold:500}, state.res);
state.troops = state.troops || {}; state.training = state.training || {};
state.marches = state.marches || []; state.reports = state.reports || [];
titanState();
if(!state.pos) state.pos = {x:300+Math.floor(Math.random()*150), y:300+Math.floor(Math.random()*150)}; // your base on the world map
state.pos.x-=state.pos.x%2; state.pos.y-=state.pos.y%2; // bases sit on the tile grid
function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }

const ccLvl = () => state.slots.cc.lvl;
function cap(){ let c = 20000; for(const k in state.slots){ const b=state.slots[k]; if(b.type==='warehouse') c += b.lvl*10000; } return c; }
const costOf = (t,l) => { const o={}; for(const r of RES) o[r]=Math.round((B[t].cost[r]||0)*Math.pow(2,l-1)); return o; };
const timeOf = (t,l) => Math.round(B[t].time*Math.pow(1.7,l-1));
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
  save(); renderAll(); toast('🔨 '+_t('{b} started',{b:_t(B[t].name)}));
}
function complete(){
  const q=state.queue, p0=totalPower(); state.slots[q.slot]={type:q.type,lvl:q.lvl}; state.queue=null;
  save(); renderAll(); toast('✅ '+_t('{b} level {l} complete',{b:_t(B[q.type].name),l:q.lvl})); powerGain(totalPower()-p0);
}
function cancel(){
  const q=state.queue; if(!q) return; const c=costOf(q.type,q.lvl);
  for(const r of RES) state.res[r]=Math.min(cap(),state.res[r]+Math.floor(c[r]/2));
  state.queue=null; save(); renderAll(); toast(_t('Construction cancelled (50% refunded)'));
}

// ===== FORMAT =====
function fmtN(n){ n=Math.floor(n); const neg=n<0; n=Math.abs(n); let t; // short numbers: 9,999 · 88.9k · 999k · 1.25M
  if(n<1e4) t=n.toLocaleString('en-US'); else if(n<1e5) t=Math.floor(n/100)/10+'k'; else if(n<1e6) t=Math.floor(n/1e3)+'k';
  else if(n<1e7) t=Math.floor(n/1e4)/100+'M'; else if(n<1e9) t=Math.floor(n/1e5)/10+'M'; else t=Math.floor(n/1e8)/10+'B';
  return (neg?'-':'')+t; }
function fmtT(s){ s=Math.max(0,Math.ceil(s)); const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60; return h?`${h}h ${m}m`:m?`${m}m ${String(x).padStart(2,'0')}s`:`${x}s`; }
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
  const T=SLOTS.find(x=>x.id==='titan'), w=150+Math.min(hb.lvl,10)*5, ih=w*TITAN.imgR, ay=0.95;
  const vis=ANIM.titan.visor, vx=-w/2+vis[0]*w, vy=-ih*ay+vis[1]*ih;
  return {y:T.y, svg:`<g class="titan" data-titan="1" transform="translate(${T.x},${T.y})">
    <ellipse cx="6" cy="2" rx="${w*0.36}" ry="${w*0.11}" fill="#000" opacity=".28"/>
    <g class="anim" style="animation:bob 3.4s ease-in-out infinite;${ph(3.4)}">
      <image href="${titanImg()}" x="${-w/2}" y="${-ih*ay}" width="${w}" height="${ih}"/>
      <ellipse cx="${vx}" cy="${vy}" rx="${w*0.05}" ry="${w*0.025}" fill="#ff7a2f" style="animation:glow 2s ease-in-out infinite;${ph(2)};filter:blur(2px)"/>
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
    if(b && d.img){ const w=d.imgW, ih=w*d.imgR;
      g+=`<image href="${d.img}" x="${-w/2}" y="${-ih*d.imgAY}" width="${w}" height="${ih}"/>`;
      g+=animOverlay(t, -w/2, -ih*d.imgAY, w, ih, s.id);
      ar.by=ih*(1-d.imgAY)*0.35; }
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
    const p=Math.min(1,(Date.now()-q.start)/(q.end-q.start)), y=top-10;
    g+=`<rect x="-62" y="${y}" width="124" height="14" rx="7" fill="#111" stroke="#000"/><rect x="-60" y="${y+2}" width="${120*p}" height="10" rx="5" fill="#d4a72c"/><text class="ptime" y="${y-6}">${fmtT((q.end-Date.now())/1000)}</text>`;
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
      <rect x="1205" y="196" width="194" height="42" rx="10" fill="#d4a72c" stroke="#5a3d05" stroke-width="3"/><text class="gotxt" x="1302" y="225">🏰 ${_t('Enter base')}</text></g>`;
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
    <rect x="${FOX-95}" y="${by+bh-30}" width="190" height="40" rx="10" fill="#d4a72c" stroke="#5a3d05" stroke-width="3"/><text class="gotxt" x="${FOX}" y="${by+bh-2}">🏰 ${_t('Enter base')}</text></g>`:''}
  ${items.sort((a,b)=>a.y-b.y).map(o=>o.s).join('')}
  <rect width="${FW}" height="${FH}" fill="url(#vig)" pointer-events="none"/>`;
  return fieldCache;
}
function buildWorld(){
  let inner;
  if(view==='city'){
    W=2576; H=1438;
    if(!cityCache){ const sc0=BG ? {sceneBack:`<image href="${BG}" x="0" y="0" width="${W}" height="${H}"/>`, sceneFront:'', sceneFore:''} : buildScene(); cityCache=sc0; }
    inner=`${cityCache.sceneBack}<g id="slots"></g>${cityCache.sceneFront}<g id="gate"></g>${cityCache.sceneFore}`;
  } else { W=FW; H=FH; inner=`${fieldScene()}<g id="slots"></g><g id="gate"></g>`; }
  world.innerHTML=`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`;
  slotsLayer=document.getElementById('slots'); gateLayer=document.getElementById('gate');
}
let cur=null;
function renderSlots(){
  const vs=SLOTS.filter(s=>(s.view||'city')===view);
  const list=vs.filter(s=>s.id!=='wall' && !s.deco).map(s=>({y:s.y, svg:slotSVG(s)}));
  if(view==='city'){ const t=titanSVG(); if(t) list.push(t); }
  slotsLayer.innerHTML=list.sort((a,b)=>a.y-b.y).map(o=>o.svg).join('');
  gateLayer.innerHTML= view==='city' ? slotSVG(SLOTS.find(s=>s.id==='wall')) : '';
}
function setView(v){
  if(v===view) return;
  closeSheet(); view=v; document.getElementById('app').classList.toggle('v-map', v==='map');
  if(v==='map'){ resizeMap(); if(!mcam){ mcam={x:0,y:0,z:vsize().w<600?0.55:0.75}; camCenter(state.pos.x,state.pos.y); } drawMap(); updateCoords(); }
  else { buildWorld(); if(v==='city') centerOn(1300,640); else centerOn(1290,600); renderSlots(); }
  document.querySelectorAll('#hud [data-view]').forEach(a=>a.classList.toggle('on',a.dataset.view===v));
}
function renderPower(){
  const p=totalPower(), l=playerLevel(p), a=levelReq(l), b=levelReq(l+1);
  document.getElementById('pPow').textContent=p.toLocaleString('en-US');
  document.getElementById('pLvl').textContent=l;
  document.getElementById('pXp').style.width=Math.min(100,(p-a)/(b-a)*100)+'%';
  const hb=state.slots.hangar, tp=document.getElementById('tPortrait');
  const nt=document.getElementById('nTitan');
  if(hb && TITAN){ if(!nt.querySelector('.tport')) nt.innerHTML=`<img class="tport" src="${TITAN.img}" alt="">`; } else if(nt.textContent!=='🔒') nt.textContent='🔒';
  if(hb && TITAN){ tp.style.backgroundImage=`url(${titanImg()})`; tp.textContent=''; const T=titanState(); document.getElementById('tSub').textContent = T.away ? '⚔️ '+_t('On a mission') : _t('Lv {l} · Health {h}%',{l:T.lvl,h:Math.floor(T.hp)}); }
  else { tp.style.backgroundImage=''; tp.textContent='🔒'; document.getElementById('tSub').textContent=_t('Build the Titan Hangar'); }
}
function powerGain(n){ if(n<=0) return; const el=document.getElementById('powpop'); el.innerHTML=`+${n.toLocaleString('en-US')} ${IC.power}`; el.classList.remove('go'); void el.offsetWidth; el.classList.add('go'); }
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
  const busy = q || TRAINERS.some(bl=>(state.training[bl]||[]).length) || state.marches.length;
  el.style.display = busy ? '' : 'none';
  if(!q) h='';
  else { const p=Math.min(1,(Date.now()-q.start)/(q.end-q.start))*100;
    h=`<div class="qrow"><span>🔨 ${B[q.type].icon} ${_t('Lv')} ${q.lvl}</span><div class="bar"><i style="width:${p}%"></i></div><span>${fmtT((q.end-Date.now())/1000)}</span><button class="sm" data-act="finish">${_t('Finish (test)')}</button></div>`; }
  for(const bl of TRAINERS){ const tq=state.training[bl]; if(!tq||!tq.length) continue; const j=tq[0];
    h+=`<div class="qrow"><span>🪖 ${fmtN(j.n)} ${_t(UNITS[j.u].name)}${tq.length>1?` (+${tq.length-1})`:''}</span><div class="bar"><i style="width:${pct(j.s,j.e)}%"></i></div><span>${fmtT((j.e-Date.now())/1000)}</span><button class="sm" data-act="tfinish" data-bld="${bl}">${_t('Finish (test)')}</button></div>`; }
  for(const m of state.marches){ const out=m.st==='out', a=out?m.s:m.a, b=out?m.a:m.b;
    h+=`<div class="qrow"><span>${out?'⚔️':'↩️'} ${_t(out?'Marching':'Returning')} (${m.x}, ${m.y})</span><div class="bar"><i style="width:${pct(a,b)}%"></i></div><span>${fmtT((b-Date.now())/1000)}</span><button class="sm" data-act="mfinish" data-id="${m.id}">${_t('Finish (test)')}</button></div>`; }
  el.innerHTML=h;
}
function costChips(t,l){
  const c=costOf(t,l);
  return `<div class="chips">${RES.filter(r=>c[r]>0).map(r=>`<span class="chip${state.res[r]<c[r]?' no':''}">${ICON[r]} ${fmtN(c[r])}</span>`).join('')}<span class="chip">⏱ ${fmtT(timeOf(t,l))}</span><span class="chip pw">${IC.power} +${(bPower(t,l)-bPower(t,l-1)).toLocaleString('en-US')} ${_t('Power')}</span></div>`;
}
function actionBtn(t,l,label){
  const why=whyNot(t,l);
  return `<button data-act="build" data-type="${t}" data-lvl="${l}"${why?' disabled':''}>${label}</button>${why?`<div class="why">${why}</div>`:''}`;
}
function renderSheet(){
  if(!cur) return;
  if(cur==='__troops'){ document.getElementById('sheetBody').innerHTML=troopsPanel(); return; }
  if(cur==='__menu'){ document.getElementById('sheetBody').innerHTML=menuPanel(); return; }
  if(cur==='__settings'){ document.getElementById('sheetBody').innerHTML=settingsPanel(); return; }
  if(cur==='__titan'){ document.getElementById('sheetBody').innerHTML=titanPanel(); return; }
  if(cur==='__tile'){ document.getElementById('sheetBody').innerHTML=tilePanel(); return; }
  if(cur==='__attack'){ document.getElementById('sheetBody').innerHTML=attackPanel(); return; }
  if(cur==='__reports'){ document.getElementById('sheetBody').innerHTML=reportsPanel(); updateRepBadge(); return; }
  const s=SLOTS.find(x=>x.id===cur), b=state.slots[cur], q=state.queue&&state.queue.slot===cur?state.queue:null;
  let h='';
  if(q){
    const d=B[q.type], p=Math.min(1,(Date.now()-q.start)/(q.end-q.start))*100;
    h+=`<div class="hd"><div class="big" style="background:${d.color}">${bigIcon(d)}</div><div><h2>${_t(d.name)}</h2><div class="sub">${_t(b?'Upgrading to level {l}':'Building to level {l}',{l:q.lvl})}</div></div></div>
        <div class="prog"><i style="width:${p}%"></i></div><div class="sub">${_t('Time left: {t}',{t:fmtT((q.end-Date.now())/1000)})}</div>
        <div style="display:flex;gap:8px;margin-top:10px"><button data-act="finish">${_t('Finish now (test)')}</button><button class="sec" data-act="cancel">${_t('Cancel')}</button></div>`;
  } else if(b){
    const d=B[b.type];
    h+=`<div class="hd"><div class="big" style="background:${d.color}">${bigIcon(d)}</div><div><h2>${_t(d.name)}</h2><div class="sub">${_t('Level {l} / {m}',{l:b.lvl,m:MAX})} · ${IC.power} ${bPower(b.type,b.lvl).toLocaleString('en-US')} ${_t('power')}</div></div></div>
        <p>${_t(d.desc)}</p><div class="eff">${_t('Current:')} ${effect(b.type,b.lvl)}</div>`;
    if(TRAINERS.includes(b.type)) h+=trainSection(b.type);
    if(b.type==='hangar'){ const T=titanState(); h+=`<h3>🤖 ${_t('Your Titan')}</h3><div class="sub">${_t('Lv {l} · Health {h}%',{l:T.lvl,h:Math.floor(T.hp)})}</div><button data-act="titan" style="margin-top:6px">🤖 ${_t('Manage Titan')}</button>`; }
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
  document.getElementById('sheetBody').innerHTML=h;
}
function renderAll(){ renderRes(); renderQueue(); renderSlots(); renderSheet(); }
let openedAt=0; // ignore the "ghost" click that phones send right after the tap that opened the panel
function openSlot(id){ cur=id; openedAt=Date.now(); renderSheet(); renderSlots(); document.getElementById('sheet').classList.add('open'); document.getElementById('back').classList.add('open'); }
function closeSheet(){ cur=null; document.getElementById('sheet').classList.remove('open'); document.getElementById('back').classList.remove('open'); renderSlots(); }
let tt; function toast(m){ const el=document.getElementById('toast'); el.textContent=m; el.classList.add('on'); clearTimeout(tt); tt=setTimeout(()=>el.classList.remove('on'),2200); }

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
  if(a==='equip') equip(btn.dataset.id);
  if(a==='uneq') unequip(btn.dataset.s);
  if(a==='scrap') scrap(btn.dataset.id);
  if(a==='mfinish') finishMarch(btn.dataset.id);
  if(a==='rep'){ const id=+btn.dataset.id, r=state.reports.find(x=>x.id===id); if(r) r.read=true; openRep = openRep===id?null:id; save(); renderSheet(); }
  if(a==='reset' && confirm(_t('Reset your base?'))){ state=fresh(); state.pos={x:300+Math.floor(Math.random()*150), y:300+Math.floor(Math.random()*150)}; state.pos.x-=state.pos.x%2; state.pos.y-=state.pos.y%2; mcam=null; save(); closeSheet(); setView('city'); renderAll(); }
}
document.getElementById('sheet').addEventListener('input',e=>{ const el=e.target; if(!el.dataset || !el.dataset.qty) return;
  const u=el.dataset.qty; trainQty[u]=Math.max(0,Math.floor(+el.value||0)); updateTrainRow(u); });
document.getElementById('troopsBtn').addEventListener('click',openTroops);
document.getElementById('reportsBtn').addEventListener('click',openReports);
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
const minS=()=>{ const v=vsize(); return Math.min(v.w/W,v.h/H)*0.92; }; // can zoom out until the whole map fits
function apply(){ const v=vsize(); sc=Math.min(1.6,Math.max(minS(),sc));
  tx = W*sc<=v.w ? (v.w-W*sc)/2 : Math.min(0,Math.max(v.w-W*sc,tx)); /* smaller than the screen: keep it centred */
  ty = H*sc<=v.h ? (v.h-H*sc)/2 : Math.min(90,Math.max(v.h-H*sc-60,ty)); /* small margin so nothing hides under the HUD */
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
  const now=Date.now(), dt=Math.max(0,(now-state.last)/1000); state.last=now; const c=cap(), rt=rates();
  for(const r of RES){
    if(r==='gold'){ state.res.gold+=rt.gold*dt/3600; continue; }            // gold has no storage limit
    if(rt[r]>=0){ if(state.res[r]<c) state.res[r]=Math.min(c,state.res[r]+rt[r]*dt/3600); }
    else state.res[r]=Math.max(0,state.res[r]+rt[r]*dt/3600);             // rations can go down (troop upkeep)
  }
  if(state.res.rations<=0 && rt.rations<0) desert(dt);
  if(state.queue && now>=state.queue.end) complete();
  checkTraining(); processMarches();
  { const T=titanState(); if(!T.away && T.hp<100 && bldLevel('hangar')) T.hp=Math.min(100, T.hp+repairRate()*dt/3600); }
  updateRepBadge(); if(view==='map') drawMap();
  renderRes(); renderQueue(); if(state.queue) renderSlots();
  if(cur){ const ae=document.activeElement; // don't rebuild the panel while the player is typing a number
    if(ae && ae.tagName==='INPUT' && document.getElementById('sheet').contains(ae)) liveSheet(); else renderSheet(); }
  save();
}
function centerOn(x,y){ const v=vsize(); sc=Math.max(minS(), v.w<600?0.5:0.7); tx=v.w/2-x*sc; ty=v.h/2-y*sc; apply(); }
(function(){ const av=document.getElementById('avatar'); av.style.backgroundImage=`url(${PORTRAIT}), radial-gradient(circle at 50% 35%,#55663f,#1c2318)`; av.style.backgroundSize='135%, cover'; av.style.backgroundPosition='45% 8%, center'; })();
document.querySelectorAll('img[data-ic]').forEach(i=>{ i.src=ICS[i.dataset.ic]; });
(function(){ const F={"fr_btn": "assets/img/fr_btn.webp", "fr_bar": "assets/img/fr_bar.webp", "fr_win": "assets/img/fr_win.webp", "fr_slot": "assets/img/fr_slot.webp"};
  for(const k in F) document.documentElement.style.setProperty('--'+k.replace('_','-'), `url(${new URL(F[k], location.href).href})`); })();
(function init(){ applyStatic(); buildWorld(); centerOn(1300,640); tick(); renderAll(); setInterval(tick,1000); })();
