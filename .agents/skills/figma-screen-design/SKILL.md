---
name: figma-screen-design
description: Conception formelle d'écrans complets et de gabarits fidèles, structuration des pages Figma, ergonomie mobile et desktop, et hiérarchie visuelle.
---

# Professional Figma Screen Design Skill

## 1. Raison d'être & Déclenchement
Cette compétence s'active lors de la réalisation concrète des écrans d'interface utilisateur pour un rôle donné. Elle transforme les wireframes conceptuels en écrans haute fidélité prêts à être testés, démontrés et développés.

## 2. Référentiels & Standards
- **Apple Human Interface Guidelines (HIG)** pour les déclinaisons mobiles iOS/Flutter.
- **Material Design 3 (M3)** pour l'ergonomie mobile universelle.
- **Figma Frame Conventions** : Grilles 8pt, Auto-Layout, contraintes fluides.

## 3. Démarche Méthodologique Étape par Étape
1. **Fiche Pré-Design de l'Écran** :
   - Écran ID (ex. `SCR-STU-01`, `SCR-ADM-03`).
   - Rôle utilisateur et objectif principal.
   - Action principale (Call-to-Action prioritaire) et actions secondaires.
   - Données métiers affichées et contrôles disponibles.
   - États obligatoires : Nominal, Vide (Empty State), Chargement (Skeleton), Erreur (Error State).
2. **Dimensionnement des Gabarits (Frames)** :
   - **Mobile** : iPhone 15 Pro (`393 x 852 px`) ou standard Android (`360 x 800 px`).
   - **Desktop** : Largeur standard `1440 x 900 px` ou `1280 x 800 px`.
3. **Structuration de la Page Figma** :
   - `00 — Cover and Overview` : Titre du projet, version, encadrante, jury, date.
   - `01 — Design System & Tokens` : Typographie, couleurs, boutons, inputs, badges.
   - `02 — Student & Professor Mobile Experience` : Écrans étudiants et profs au format smartphone.
   - `03 — Web Desktop Dashboards` : Espace Admin Scolarité, Coordination PFE et Direction.
   - `04 — Interactive Prototypes & Overlays` : Modales, tiroirs, alertes.
4. **Hiérarchie Visuelle & Traitement des Données Réelles** :
   - Utiliser des données crédibles (vrais noms de cours EMSI comme "Génie Logiciel", "Systèmes Distribués", notes réelles, adresses de campus Guéliz/Targa).
   - Signaler visuellement les règles strictes : badge rouge pour note éliminatoire < 7.00/20 (`RULE-DELIB-04`), compte à rebours 15s pour le QR code (`RULE-ATT-02`).

## 4. Règles d'Or & Erreurs à Éviter
- ❌ **Pas de "Lorem Ipsum"** ou de faux contenus génériques.
- ❌ **Ne jamais surcharger d'effets cosmétiques inutiles** (ombres excessives, dégradés criards) qui nuisent à la lisibilité d'un outil de travail académique.
- ❌ **Ne pas oublier les contraintes de densité d'information** sur les tableaux de délibération ou plannings.

## 5. Livrables Requis
- Spécifications des écrans avec captures et arborescence.
- Fichier de maquette dynamique interactif consultable dans le navigateur.

## 6. Critères d'Évaluation & Validation
- Présence des 4 états requis sur les écrans critiques.
- Respect strict des dimensions et contraintes de chaque cible (mobile vs desktop).
