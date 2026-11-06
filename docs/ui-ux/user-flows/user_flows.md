# PARCOURS UTILISATEURS DÉTAILLÉS (USER FLOWS)

**Projet :** EMSI Campus ERP (Univora)  
**Établissement :** EMSI Marrakech  
**Référentiel :** Skill `ui-ux-design`  

---

## 1. Flux UF-01 : Émargement Étudiant par Scan de QR Code Éphémère (Mobile)

```
[Écran d'Accueil Étudiant]
         │
         ▼ (Clic sur bouton central "Pointer ma Présence")
[Viseur Caméra Plein Écran (Overlay centré 250x250px)]
         │
         ├──► [Détection QR Code dans le champ vidéo]
         │          │
         │          ▼
         │    [Vérification locale du format du payload]
         │          │
         │          ▼
         │    [Envoi asynchrone POST /api/v1/attendance/scan]
         │          │
         │          ├── (Jeton valide t <= 15s & Device OK)
         │          │          │
         │          │          ▼
         │          │    [Écran de Succès Vert Fluo avec Vibration Haptique]
         │          │    "Présence confirmée à 10:14:02 - Pr. Benali"
         │          │          │
         │          │          ▼ (Redirection auto 3s)
         │          │    [Retour Tableau de Bord avec Badge "Présent"]
         │          │
         │          └── (Jeton expiré t > 15s)
         │                     │
         │                     ▼
         │               [Bannière Rouge d'Avertissement]
         │               "Code expiré. Veuillez rescanner le nouveau code affiché."
         │                     │
         │                     ▼ (Caméra reste active)
         │               [Nouvelle tentative immédiate]
```

---

## 2. Flux UF-02 : Projection Enseignant & Saisie du Cahier de Texte

```
[Tableau de Bord Professeur Desktop / Vidéoprojecteur]
         │
         ▼ (Clic sur "Démarrer la Séance : Génie Logiciel 5A")
[Fenêtre de Projection Plein Écran : QR Code Dynamique]
         │
         ├── [Génération automatique d'un nouveau QR toutes les 15s (Chrono circulaire)]
         ├── [Compteur de présence WebSocket incrémenté en direct (e.g. "34 / 38 Présents")]
         │
         ▼ (Arrivée à l'heure de fin du cours T_fin ou Clic "Clôturer la Séance")
[Fermeture de la projection & Déclenchement Notification Push Mobile Professeur]
         │
         ▼ (Professeur ouvre l'application mobile)
[Écran Modal Pré-Rempli : "Cahier de Texte - Séance du 28/10"]
         │
         ├── [Champ Texte Obligatoire : Résumé du cours (Min. 50 caractères)]
         ├── [Champ Optionnel : Devoirs et exercices à rendre pour la prochaine séance]
         ├── [Zone Téléversement : Ajout des slides / supports PDF]
         │
         ▼ (Clic sur "Valider et Clôturer Définitivement")
[Séance archivée en statut 'COMPLETED_DOCUMENTED' - Notification envoyée aux étudiants]
```

---

## 3. Flux UF-03 : Délibération Zéro Excel & Signature du PV (Chef de Département)

```
[Console Chef de Département / Direction des Études]
         │
         ▼ (Sélection Filière : IIR 5A Semestre 9 & Année Universitaire)
[Bouton Action : "Lancer le Calcul Automatique de Délibération"]
         │
         ▼
[Grille Matricielle Interactive des Notes et Résultats]
         │
         ├── [Calcul instantané des moyennes pondérées selon coefficients]
         ├── [Mise en évidence automatique en ROUGE des notes d'examen < 7.00/20]
         ├── [Affichage du statut modulaire : Vert (V), Orange (VPC), Rouge (Ajourné)]
         │
         ▼ (Examen des cas particuliers en commission de délibération)
[Bouton : "Sceller et Signer Électroniquement le PV"]
         │
         ▼ (Saisie du code OTP / Signature électronique conjointe des membres du jury)
[Génération du Document PDF Officiel avec Filigrane EMSI et Empreinte SHA-256]
         │
         ├── [Téléchargement immédiat du PV pour archivage papier]
         └── [Publication instantanée des résultats sur les comptes étudiants]
```
