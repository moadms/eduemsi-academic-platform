---
name: interactive-prototyping
description: Conception et raccordement de prototypes interactifs cliquables, transitions, modales, tiroirs, formulaires avec validation en direct, et simulation de parcours utilisateurs réalistes.
---

# Interactive Figma & Web Prototyping Skill

## 1. Raison d'être & Déclenchement
Cette compétence est obligatoire pour donner vie aux maquettes statiques. Une maquette qui ne réagit pas aux clics ou qui se contente de pointer vers un écran générique est insuffisante. Ce skill prescrit la simulation fidèle de vraies transitions, de formulaires interactifs, de compteurs temps-réel, de boîtes de dialogue et de navigation complète.

## 2. Référentiels & Standards
- **Figma Prototyping Standards** : Smart Animate, Overlays, Interactive Components, Component Variables.
- **Micro-interactions (Dan Saffer)** : Déclencheur (Trigger), Règle (Rule), Rétroaction (Feedback), Boucles & Modes (Loops & Modes).
- **Heuristiques de Nielsen** : Visibilité du statut du système, correspondance entre le système et le monde réel, contrôle et liberté de l'utilisateur.

## 3. Démarche Méthodologique Étape par Étape
1. **Cartographie des Liens d'Interaction (Interaction Mapping)** :
   - Pour chaque bouton, lien, onglet ou carte cliquable :
     - Identifiant de l'élément (`BTN-SCAN`, `BTN-CALCULATE-DELIB`, etc.).
     - Écran source.
     - Déclencheur (`On Click`, `On Hover`, `On Input`, `Timer`).
     - Action & Destination (Navigation vers écran cible, Ouverture d'overlay, Bascule d'état).
     - Rétroaction immédiate (Toast vert, alerte rouge, spinner de calcul).
2. **Implémentation des Overlays & Dialogues** :
   - **Modales de confirmation** (ex. validation finale de notes avec confirmation irréversible, attribution de sujet PFE).
   - **Tiroirs latéraux (Drawers)** (ex. détail d'une séance d'emploi du temps, panneau de filtres avancés).
   - **Toasts éphémères** (ex. "Présence enregistrée à 09:14", "Email envoyé aux parents").
3. **Formulaires & Validations Dynamiques** :
   - Contrôle de saisie en temps réel (ex. note comprise strictement entre 0.00 et 20.00).
   - Déclenchement automatique de l'alerte éliminatoire si note < 7.00/20 (`RULE-DELIB-04`).
   - Bascule d'affichage mot de passe (icône œil).
   - Compte à rebours dynamique (compteur 15 secondes du QR code `RULE-ATT-02`).
4. **Parcours Utilisateurs Clé en Main (User Journeys)** :
   - Au moins un parcours complet de bout en bout pour chaque rôle majeur :
     - **Étudiant** : Connexion -> Dashboard -> Planning -> Scan QR -> Consultation Notes -> Choix PFE.
     - **Professeur** : Connexion -> Sélection cours -> Démarrage séance QR (timer 15s) -> Clôture & Saisie des notes.
     - **Admin Scolarité** : Connexion -> Table de Délibération -> Calcul auto moyenne -> Détection note éliminatoire -> Génération PV.
     - **Coordinateur PFE** : Connexion -> Matching sémantique Ollama IA (score > 70%) -> Affectation jurys.
     - **Direction** : Connexion -> Dashboard KPI global multi-campus -> Filtres par campus.

## 4. Règles d'Or & Erreurs à Éviter
- ❌ **Interdiction des impasses (dead ends)** : tout écran doit proposer une action retour, un bouton fermer ou un fil d'ariane.
- ❌ **Ne jamais prétendre qu'un prototype statique accède à une vraie base distante** : expliquer clairement qu'il s'agit d'une simulation dynamique locale haute fidélité.
- ❌ **Ne pas oublier la réactivité tactile mobile** : boutons larges, onglets accessibles au pouce en bas d'écran.

## 5. Livrables Requis
- `docs/ui-ux/04-prototype-interactions.md` : Matrice complète des interactions et déclencheurs.
- Fichier prototype interactif exécutable (HTML/CSS/JS dynamique ou lien Figma connecté).

## 6. Critères d'Évaluation & Validation
- 100% des flux principaux mènent à un état de succès ou d'erreur documenté.
- La navigation par onglets, boutons et sélecteurs de rôles fonctionne sans rechargement de page destructif.
