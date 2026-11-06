---
name: design-quality-accessibility
description: Audit de conformité WCAG 2.2 AA, revue de la qualité d'interaction, détection des régressions visuelles et ergonomiques, et validation de l'adaptabilité responsive.
---

# Design Quality and Accessibility Skill

## 1. Raison d'être & Déclenchement
Cette compétence s'active après la création ou la modification des écrans et du prototype. Elle réalise un audit méthodique pour certifier que l'interface est accessible, sans friction, inclusive pour tous les utilisateurs (étudiants, enseignants, personnels administratifs) et conforme aux standards ergonomiques internationaux.

## 2. Référentiels & Standards
- **Web Content Accessibility Guidelines (WCAG) 2.2 Niveau AA**.
- **Norme Européenne EN 301 549** relative aux exigences d'accessibilité pour les TIC.
- **Loi marocaine n° 09-08** (respect des droits des personnes et lisibilité des données privées).

## 3. Grille d'Audit Méthodique
1. **Audit d'Accessibilité Visuelle** :
   - Ratio de contraste du texte ordinaire : $\ge 4.5:1$.
   - Ratio de contraste du texte gras / grand (> 18pt) : $\ge 3:1$.
   - Ratio de contraste des composants d'interface et bordures d'entrée : $\ge 3:1$.
   - Ne jamais utiliser la couleur comme unique vecteur d'information (ex. accompagner un badge rouge d'un texte clair "Note éliminatoire" et d'une icône explicite ⚠️).
2. **Audit d'Ergonomie & Zones Tactiles** :
   - Zone tactile minimale : $44 \times 44\text{ px}$ pour le mobile (recommandation Apple / Android).
   - Espacement suffisant entre deux éléments cliquables consécutifs ($\ge 8\text{ px}$).
3. **Audit de Navigation & Clavier** :
   - Ordre de tabulation logique et continu dans les formulaires.
   - Présence d'un indicateur de focus bien visible (`outline: 2px solid var(--accent)`).
   - Fermeture possible de toute modale via la touche `Échap` ou le bouton de fermeture explicite.
4. **Audit de Cohérence & Anti-Régression** :
   - Typographie harmonisée (même police, hiérarchie de graisses respectée).
   - Absence d'éléments superposés, de textes tronqués involontairement ou d'icônes cassées.
   - Comportement adaptatif (responsive) préservé : absence de scroll horizontal parasite.

## 4. Règles d'Or & Erreurs à Éviter
- ❌ **Pas de texte gris clair sur fond blanc** (échec contraste direct).
- ❌ **Pas de messages d'erreurs vagues** comme "Erreur survenue" : privilégier des messages actionnables (ex. "La note doit être comprise entre 0.00 et 20.00").
- ❌ **Ne pas oublier les états vides (empty states)** lorsque des listes ne contiennent pas encore de données.

## 5. Livrables Requis
- `docs/ui-ux/05-design-review.md` : Rapport d'audit qualité et accessibilité avec niveau de sévérité (Bloquant, Majeur, Mineur), preuves et recommandations correctives.

## 6. Critères d'Évaluation & Validation
- Rapport d'audit complet statuant sur la conformité WCAG 2.2 AA.
- Zéro anomalie bloquante sur les parcours nominaux.
