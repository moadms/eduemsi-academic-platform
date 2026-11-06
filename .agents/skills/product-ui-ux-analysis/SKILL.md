---
name: product-ui-ux-analysis
description: Analyse des besoins produit, cartographie des flux utilisateurs (User Journeys) et inventaire exhaustif des écrans pour concevoir des maquettes UI/UX fidèles et testables.
---

# Product UI/UX Analysis Skill

## 1. Raison d'être & Déclenchement
Cette compétence s'active dès la phase préliminaire de conception d'une interface utilisateur (Web ou Mobile). Elle garantit que toute conception d'écran découle directement des exigences métier réelles, des règles de gestion (`RULE-*`), des profils d'utilisateurs et de la réalité technique du projet.

## 2. Référentiels & Standards
- **Norme ISO 9241-210:2019** : Conception centrée sur l'opérateur humain pour les systèmes interactifs.
- **Jobs To Be Done (JTBD)** : Définition des besoins fonctionnels et émotionnels par rôle.
- **Nielsen Norman Group (NN/g)** : Cartographie des parcours utilisateurs et architecture de l'information.

## 3. Démarche Méthodologique Étape par Étape
1. **Audit du Domaine Métier** : Identifier le périmètre du système (ERP universitaire, multi-tenant, double campus).
2. **Identification des Rôles & Permissions** : Établir les profils d'accès (Étudiant, Professeur, Admin Scolarité, Coordinateur PFE, Direction).
3. **Extraction des Contraintes & Règles** : Relier chaque besoin aux règles métier validées (`RULE-GEO-01`, `RULE-ATT-02`, `RULE-DELIB-04`, `RULE-AI-05`, `RULE-FIN-06`).
4. **Cartographie des Parcours Utilisateurs (User Journeys)** :
   - Définir l'objectif principal du rôle.
   - Point d'entrée, flux nominal, flux alternatifs et gestion des exceptions/erreurs.
   - Critères de succès mesurables.
5. **Inventaire Exhaustif des Écrans (Screen Inventory)** :
   - Assigner un identifiant stable et normalisé (`SCR-001`, `SCR-002`, ...).
   - Documenter le type d'affichage (Mobile First, Desktop Web, Hybride).
   - Déterminer les états requis (nominal, vide, chargement, erreur, validation).
6. **Classification des Données** : Distinguer les fonctionnalités implémentées, planifiées et de simulation.

## 4. Règles d'Or & Erreurs à Éviter
- ❌ **Ne jamais inventer de fonctionnalités marketing hors contexte** si l'application est un outil d'administration interne.
- ❌ **Ne pas concevoir des écrans isolés sans flux amont/aval.**
- ❌ **Ne pas masquer les états d'erreur ou d'échec critique** (ex. note éliminatoire < 7.00/20 ou blocage financier).
- ✅ **Respecter strictement la compatibilité multi-dispositif** : Espace Étudiant & Professeur sur Mobile & Web ; Administration et Direction sur Web Desktop.

## 5. Livrables Requis
- `docs/ui-ux/01-product-analysis.md` : Analyse complète du produit et des contraintes.
- `docs/ui-ux/02-user-journeys.md` : Parcours utilisateurs détaillés par persona.
- `docs/ui-ux/03-screen-inventory.md` : Inventaire exhaustif des écrans avec IDs uniques.

## 6. Critères d'Évaluation & Validation
- Tous les rôles applicatifs ont au moins un parcours nominal et un flux d'erreur modélisés.
- Chaque écran répertorié possède un ID stable, un propriétaire (rôle) et une cible d'affichage (Web/Mobile).
- Les règles critiques (`RULE-*`) sont explicitement associées aux écrans concernés.
