---
name: ui-ux-design
description: Conception formelle d'interfaces utilisateur, parcours interactifs, wireframes et conformité WCAG 2.2 AA.
---

# Skill — UI/UX Design

## 1. Raison d'être et Déclencheurs (Purpose & Activation Conditions)
Ce skill régit la conception de l'expérience utilisateur (UX) et des interfaces graphiques (UI) pour les applications Web (Next.js/React) et Mobiles (Flutter).
Il garantit des parcours fluides, accessibles, adaptés aux contraintes du terrain et alignés avec les permissions des utilisateurs.

### Conditions d'activation
- Conception des écrans et des parcours utilisateurs dérivés des cas d'utilisation (`UC-XXX`).
- Définition du Design System (tokens, typographie, palette, composants réutilisables).
- Spécification des états d'interaction (chargement, vide, erreur, succès) et validation WCAG 2.2.

---

## 2. Référentiels et Normes Applicables (Standards & References)
- **W3C Web Content Accessibility Guidelines (WCAG) 2.2 niveau AA** : https://www.w3.org/TR/WCAG22/
- **Google Material Design 3 & Apple Human Interface Guidelines (HIG)** pour le mobile Flutter.
- **Design System Tokens Architecture** (W3C Design Tokens Community Group).

---

## 3. Workflow Opérationnel Étape par Étape (Step-by-Step Workflow)
1. **Cartographie des personas et rôles :** Identifier les besoins spécifiques de chaque profil (ex. Enseignant pressé en fin de cours, Responsable analysant une grille complexe, Étudiant scannant un QR code).
2. **Architecture de l'information & Arborescence :** Définir la structure hiérarchique de navigation pour le Web et le Mobile.
3. **Inventaire exhaustif des écrans :** Lister chaque écran, son identifiant unique `SCR-XXX` et son cas d'usage associé (`UC-XXX`).
4. **Modélisation des User Flows :** Produire les flux d'écrans pour les scénarios clés (ex. Émargement QR en 15s, Saisie des notes Zéro Excel, Clôture push mobile).
5. **Spécification du Design System :**
   - Palette de couleurs accessible (Ratios de contraste texte/fond >= 4.5:1).
   - Échelle typographique harmonieuse.
   - Composants réutilisables (Boutons, Cartes, Grilles, Modales, Badges de statut).
6. **Production des Wireframes & Mockups détaillés :** Schématiser la disposition des éléments, les actions principales et secondaires.
7. **Spécification des 5 États d'Interface (States) :**
   - État normal (Ideal state).
   - État de chargement (Loading / Skeletons).
   - État vide (Empty state avec call-to-action).
   - État d'erreur (Error state avec message clair et action de récupération).
   - État de succès / feedback immédiat (Success toast / confirmation).
8. **Contrôle d'accessibilité et d'ergonomie :**
   - Navigation au clavier complète.
   - Zones de contact tactile minimales de 48x48 px sur mobile.
   - Labels explicites sur tous les formulaires.

---

## 4. Spécification Obligatoire d'un Écran (`SCR-XXX`)
Pour chaque écran documenté, consigner :
- **ID & Nom :** ex. `SCR-003 : Grille de Notation & Délibération`
- **Rôle autorisé :** ex. `ENSEIGNANT`, `RESPONSABLE_FILIERE`
- **Objectif :** Permettre la saisie directe des notes avec calcul instantané des moyennes.
- **Données affichées :** Liste des étudiants, champs CC (/20), Examen (/20), Moyenne calculée, Statut éliminatoire.
- **Contrôles & Validations :** Bornes 0-20, alerte visuelle rouge si Examen < 7.00/20, bouton de verrouillage définitif.
- **Comportement Responsive :** Adaptation tablette/desktop avec défilement horizontal fixé sur les colonnes clés.

---

## 5. Règles et Pièges à Éviter (Rules & Common Mistakes)
- **RÈGLE 1 :** Ne jamais prétendre avoir créé un fichier Figma externe sans que l'action ait été réellement exécutée.
- **RÈGLE 2 :** Ne jamais masquer les erreurs système derrière des messages cryptiques (ex. "Erreur 500").
- **RÈGLE 3 :** Respecter strictement les rôles : un étudiant ne doit jamais voir un écran ou un bouton d'administration.
- **RÈGLE 4 :** Sur mobile, privilégier l'ergonomie à une seule main pour le scan QR et la validation du cahier de texte.

---

## 6. Checklist des Livrables et Critères de Validation
- [ ] Document `docs/ui-ux/05-ui-ux-specification.md` complet.
- [ ] Diagrammes de flux dans `docs/ui-ux/user-flows/`.
- [ ] Wireframes et spécifications dans `docs/ui-ux/wireframes/` et `docs/ui-ux/mockups/`.
- [ ] Spécification du Design System dans `docs/ui-ux/design-system/`.
- [ ] Conformité WCAG 2.2 AA validée sur les contrastes et formulaires.
