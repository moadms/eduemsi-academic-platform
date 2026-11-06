---
name: design-to-code
description: Préparation du passage maquette-code (Developer Handoff), cartographie des composants Figma vers Flutter / Next.js / Shadcn, spécification des tokens CSS/Dart et directives d'intégration.
---

# Design-to-Code and Handoff Skill

## 1. Raison d'être & Déclenchement
Cette compétence s'active pour faire la jonction rigoureuse entre la phase de conception UI/UX et la phase d'implémentation logicielle. Elle fournit aux ingénieurs frontend (Flutter mobile et Next.js/React web) l'ensemble des spécifications dimensionnelles, des variables thématiques, des contrats de props et de l'arborescence des composants.

## 2. Référentiels & Standards
- **Component-Driven Development (CDD)** : Développement piloté par les composants d'interface.
- **Tailwind CSS v3/v4 & Shadcn/UI Architecture**.
- **Flutter Widget Conventions** (Stateless/Stateful, BLoC Pattern, Material 3).

## 3. Démarche Méthodologique Étape par Étape
1. **Inspection de la Stack Technique Détectée** :
   - Application Mobile : **Flutter** (Dart), state management BLoC, base locale Isar DB.
   - Application Web : **Next.js 14** (App Router), React, Tailwind CSS, Lucide Icons, Shadcn/UI primitives.
2. **Table de Correspondance Composants Design <-> Code** :
   - Définir pour chaque composant Figma son équivalent direct dans la bibliothèque de composants :
     - Boutons Figma -> `Button` (Shadcn) / `ElevatedButton` (Flutter).
     - Cartes de statistiques -> `Card`, `CardHeader`, `CardContent` / `StatCardWidget`.
     - Tableau de délibération -> `DataTable` (TanStack React Table) / `PaginatedDataTable` (Flutter).
     - Modales -> `Dialog`, `AlertDialog` / `showDialog` (Flutter).
     - Tiroirs -> `Sheet` / `showModalBottomSheet` (Flutter).
3. **Exportation des Tokens en Formats Consommables** :
   - Variables CSS (`:root { --primary: #00843D; ... }`) pour Next.js / Tailwind.
   - Classe Dart `AppColors` et `AppTextStyles` pour Flutter.
4. **Documentation des États et Micro-Interactions** :
   - Règles de déclenchement d'animations (durée 200ms `ease-in-out`).
   - Règles d'affichage conditionnel (ex. visibilité du bouton "Calculer Délibération" uniquement pour le rôle `ADMIN_SCOLARITE`).
   - Prise en compte du mode déconnecté (Offline-first) sur Flutter : mise en cache Isar DB et bannière visuelle de mode hors-ligne.

## 4. Règles d'Or & Erreurs à Éviter
- ❌ **Ne pas réécrire le code frontend existant de manière intrusive** : fournir un guide clair et non-destructif.
- ❌ **Éviter les divergences d'appellation** entre Figma et le code (utiliser les mêmes noms de tokens et de props).
- ❌ **Ne pas omettre les spécifications de breakpoints** responsive (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`).

## 5. Livrables Requis
- `docs/ui-ux/06-developer-handoff.md` : Guide technique complet de handoff pour les développeurs Flutter et Next.js.

## 6. Critères d'Évaluation & Validation
- Présence du mapping complet des composants pour les deux technologies cibles (Flutter + Next.js).
- Présence des extraits de code tokens prêts à l'emploi.
