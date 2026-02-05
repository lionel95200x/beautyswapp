# MVP BeautySwapp

📱 BeautySwapp — Cahier des charges MVP/V1

Version : V1 – conciergerie humaine / annonce administrée

⸻

🎯 Objectif du MVP V1

Tester rapidement si des utilisateurs sont prêts à :
	•	vendre un produit de beauté
	•	l’acheter
	•	payer
	•	recevoir le produit

👉 Le MVP V1 privilégie la simplicité, le contrôle et l’apprentissage terrain.
👉 De nombreuses tâches sont volontairement manuelles (conciergerie admin).

⸻

👤 Types d’utilisateurs
	•	Utilisateur
	•	peut être vendeur et/ou acheteur
	•	Admin (BeautySwapp)

⸻

🔐 Authentification
	•	Inscription par email + mot de passe
	•	Connexion / déconnexion

⸻

🛍️ Mise en vente — NOUVELLE LOGIQUE V1 (MAJEURE)

⚠️ Changement clé par rapport au CDC initial
👉 En V1, le vendeur ne crée pas lui-même l’annonce.
👉 Il envoie un produit via des photos.
👉 L’admin crée l’annonce, puis la vendeuse valide.

⸻

📸 Dépôt produit par la vendeuse (FRONT)

Point d’entrée

Bouton principal :

➕ Vendre un produit

Texte d’aide :

Prends quelques photos, BeautySwapp s’occupe de créer ton annonce ✨

⸻

Photos obligatoires (upload guidé)

Minimum 3 photos, jusqu’à 5 selon le produit.
Chaque photo correspond à un slot précis (pas d’upload libre).

Slots obligatoires (tous produits)
	1.	Face du produit
Marque et nom visibles
	2.	Dos / étiquette
Informations produit lisibles
	3.	Batch code / numéro de lot
Souvent sous le flacon ou sur la boîte
Bouton alternatif : “Je ne le trouve pas”

Slots conditionnels
	4.	Ingrédients (INCI)
Si la liste est uniquement sur la boîte
	5.	PAO ou date d’expiration
Si visible sur le produit ou l’emballage

Cas particuliers
	•	Produit déclaré “neuf scellé”
→ photo preuve du scellé obligatoire (film, opercule, bague intacte)
	•	Produit ouvert / utilisé
→ photo du bouchon / pompe (propreté visible, niveau si possible)

⸻

Confirmation dépôt

Message affiché :

✨ Produit bien reçu
On vérifie les infos et on prépare ton annonce.

Statut visible côté vendeuse :

Annonce en cours de préparation

📌 Statut système : submitted

⸻

✨ Message vendeur — engagement envoi soigné (CONSERVÉ)

Emplacement : lors du dépôt produit
Blocage : sans validation, dépôt impossible

Titre

Un envoi soigné, ça change tout

Texte

Chez BeautySwapp, la confiance repose aussi sur la qualité de l’envoi.
Avant de déposer ton produit, assure-toi qu’il est :
	•	propre et présentable
	•	en bon état, sans casse ni défaut
	•	correctement fermé
	•	protégé avec un emballage adapté pour éviter toute fuite ou casse

Un colis bien préparé, c’est :
	•	un acheteur satisfait
	•	moins de litiges
	•	plus de ventes sur la durée

Checkbox obligatoire

☐ Je m’engage à envoyer un produit conforme et soigneusement emballé

Stockage :
	•	boolean par produit
	•	timestamp (optionnel)

⸻

🧑‍💻 Back-office Admin (cœur du MVP)

Liste produits

Produits classés par statut :
	•	submitted
	•	need_info
	•	draft_prepared
	•	awaiting_seller_approval
	•	published
	•	blocked

⸻

Fiche produit (admin)

Affichage :
	•	photos envoyées (par slot)
	•	ID produit
	•	ID utilisateur
	•	date de dépôt

Champs éditables par l’admin :
	•	Marque
	•	Catégorie
	•	État du produit
	•	Scellé – Neuf
	•	Non scellé – Neuf / jamais utilisé
	•	Swatché
	•	Utilisé – très peu
	•	Batch code (texte)
	•	PAO / date d’expiration
	•	Prix
	•	Titre de l’annonce
	•	Description de l’annonce
	•	Note interne (non visible vendeuse)

⚠️ La rédaction de l’annonce est faite manuellement par l’admin, via ChatGPT ou autre outil externe, puis copiée-collée dans le back-office.
➡️ Aucune IA n’est intégrée dans l’app en V1.

⸻

Actions admin
	•	Envoyer l’annonce à la vendeuse
	•	Demander une info complémentaire
	•	Bloquer le produit

⸻

👀 Validation vendeuse

Vue vendeuse
	•	aperçu exact de l’annonce :
	•	photos
	•	titre
	•	description
	•	prix
	•	état

Actions possibles
	•	✅ Valider et publier
	•	✏️ Demander une correction (champ texte libre)

📌 Après validation → statut published

⸻

🛒 Parcours acheteur
	•	Liste des produits publiés
	•	Fiche produit :
	•	photos
	•	état
	•	description
	•	prix
	•	Bouton Acheter

⸻

💳 Paiement
	•	Stripe
	•	Carte bancaire
	•	Paiement séquestré jusqu’à confirmation de réception

⸻

📦 Livraison — conciergerie admin uniquement (V1)

Aucune automatisation logistique dans l’app.

Flux
	1.	Paiement validé
	2.	Admin génère l’étiquette (Sendcloud / Shippo hors app)
	3.	Admin envoie l’étiquette au vendeur (email)
	4.	Vendeur expédie
	5.	Acheteur confirme réception
	6.	Paiement libéré au vendeur

Dans l’app
	•	statuts de commande
	•	champ tracking (optionnel, saisi par admin)

⸻

🔁 Litiges
	•	Bouton “Signaler un problème”
	•	Message libre
	•	Traitement manuel par l’admin

⸻

🧑‍💻 Admin — minimum requis
	•	Voir / bloquer / supprimer annonces
	•	Voir commandes
	•	Modifier statuts commande
	•	Suspendre utilisateur

⸻

❌ Hors périmètre V1
	•	Batch code automatisé / kill switch
	•	IA intégrée
	•	Notation / avis
	•	Messagerie interne
	•	Automatisation logistique
	•	Filtres avancés

La V1 est une conciergerie humaine outillée.
L’application facilite le travail humain, elle ne l’automatise pa