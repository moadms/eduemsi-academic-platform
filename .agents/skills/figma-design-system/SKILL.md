---
name: figma-design-system
description: Spécification formelle, gouvernance et structuration d'un Design System complet (Design Tokens, variables sémantiques, composants modulaires et variantes interactives).
---

# Figma Design System Skill

## 1. Raison d'être & Déclenchement
Cette compétence s'active lors de la définition ou de l'audit de la charte graphique et des composants d'interface. Elle standardise la palette chromatique, la typographie, l'élévation, les rayons de courbure et la bibliothèque de composants réutilisables pour assurer une cohérence stricte entre la maquette et le code de production.

## 2. Référentiels & Standards
- **W3C Design Tokens Community Group (DTCG)** : Spécification des tokens JSON/CSS.
- **Atomic Design Methodology (Brad Frost)** : Atomes, Molécules, Organismes, Gabarits, Pages.
- **WCAG 2.2 Niveau AA** : Ratios de contraste minimum (4.5:1 texte standard, 3:1 grands textes et composants interactifs).

## 3. Démarche Méthodologique Étape par Étape
1. **Extraction de la Charte de Marque** :
   - Couleurs institutionnelles (Vert EMSI `#00843D`, Bleu Tech `#1E3A5F`, Or `#C5A572`).
   - Couleurs fonctionnelles (Succès `#059669`, Alerte `#D97706`, Erreur/Éliminatoire `#DC2626`, Info `#2563EB`).
2. **Définition de l'Échelle de Tokens Sémantiques** :
   - Couleurs de surface, fond, bordure, texte principal, texte secondaire, états désactivés.
   - Échelle typographique basée sur `rem` ou grille de 4pt/8pt (11px, 12px, 14px, 16px, 18px, 20px, 24px, 32px).
   - Espacements normalisés : 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px.
   - Rayons de courbure : `sm: 4px`, `md: 8px`, `lg: 12px`, `xl: 16px`, `full: 9999px`.
   - Ombres & Élévation : `shadow-xs`, `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`.
3. **Bibliothèque de Composants Recommandée** :
   - **Boutons** : Primaire, Secondaire, Contour, Destructif, Icône, États (Default, Hover, Focus, Active, Disabled, Loading).
   - **Formulaires** : Champs texte, mots de passe avec bascule, selects déroulants, cases à cocher, radios, interrupteurs (toggle).
   - **Navigation** : Barre latérale rétractable, barre supérieure avec sélecteur de rôle/campus, onglets, fil d'Ariane.
   - **Données** : Cartes métriques (KPI), tableaux de données paginés et triables, badges d'état.
   - **Feedback** : Toasts de notification, bannières d'alerte, modales de confirmation, tiroirs latéraux (drawers).
4. **Auto-Layout & Variantes** :
   - Application systématique d'Auto-Layout horizontal/vertical avec règles de redimensionnement (`Hug contents`, `Fill container`).
   - Groupement en composant avec variantes de taille (`sm`, `md`, `lg`) et d'état.

## 4. Règles d'Or & Erreurs à Éviter
- ❌ **Interdiction des valeurs en dur** (pas de couleurs hexadécimales ou d'espacements arbitraires hors tokens).
- ❌ **Ne pas concevoir des boutons ou zones tactiles inférieurs à 44x44px** sur les affichages mobiles.
- ❌ **Ne jamais détacher les composants** : privilégier les variantes ou les propriétés de composant Figma.

## 5. Livrables Requis
- Spécification des Tokens de Design dans `docs/ui-ux/design-system/`.
- Fiche récapitulative des composants et variantes d'interface.
- Mapping des variables CSS/Tailwind prêtes pour l'intégration.

## 6. Critères d'Évaluation & Validation
- Contraste WCAG 2.2 AA validé sur tous les couples fond/texte.
- Tous les composants d'interface de l'application dérivent des tokens formels.
