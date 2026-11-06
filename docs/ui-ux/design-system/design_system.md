# DESIGN SYSTEM & TOKENS VISUELS "EMSI EMERALD PULSE"

**Projet :** EMSI Campus ERP (Univora)  
**Établissement :** EMSI Marrakech  
**Référentiel :** Skill `ui-ux-design`  

---

## 1. Tokens CSS & Variables Globales

```css
:root {
  /* Couleurs Primaires Institutionnelles EMSI */
  --color-emsi-green-50: #f0fdf4;
  --color-emsi-green-100: #dcfce7;
  --color-emsi-green-200: #bbf7d0;
  --color-emsi-green-500: #22c55e;
  --color-emsi-green-600: #00843d; /* Vert Officiel EMSI */
  --color-emsi-green-700: #005a2b; /* Vert Foncé Contraste Élevé */
  --color-emsi-green-900: #052e16;

  /* Couleurs Neutres d'Interface (Slate) */
  --color-slate-50: #f8fafc;
  --color-slate-100: #f1f5f9;
  --color-slate-200: #e2e8f0;
  --color-slate-500: #64748b;
  --color-slate-700: #334155;
  --color-slate-900: #0f172a;

  /* Couleurs Sémantiques Métier */
  --color-feedback-danger: #dc2626;   /* Note éliminatoire < 7.00, Impayé > 10j */
  --color-feedback-warning: #f59e0b;  /* Absence imminente, délai cahier de texte */
  --color-feedback-success: #16a34a;  /* Émargement QR validé, module validé */
  --color-accent-gold: #d4af37;       /* Mentions d'excellence de diplôme */

  /* Espacements (Grille de 4px / 8px) */
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem;  /* 8px */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1.0rem;  /* 16px */
  --spacing-6: 1.5rem;  /* 24px */
  --spacing-8: 2.0rem;  /* 32px */
  --spacing-12: 3.0rem; /* 48px */

  /* Rayons de Bordure (Border Radius) */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Ombres Portées Douces (Elevation) */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}
```

---

## 2. Composants Primitifs d'Interface

### 2.1. Bouton d'Action Primaire (`.btn-primary`)
- Fond : `var(--color-emsi-green-600)`
- Texte : `#FFFFFF` (Gras, 14px)
- Hauteur minimale tactile : 48px
- Rayon : 8px
- Survol : transition fluide 150ms vers `var(--color-emsi-green-700)`
- Focus : anneau de contour `3px solid var(--color-emsi-green-200)` pour l'accessibilité au clavier.

### 2.2. Badge de Statut Académique (`.badge-status`)
- **Validé (V) :** Fond `#DCFCE7`, Texte `#166534`, Icône `Check`
- **Validé par Compensation (VPC) :** Fond `#FEF3C7`, Texte `#92400E`, Icône `AlertCircle`
- **Ajourné / Rattrapage (NV) :** Fond `#FEE2E2`, Texte `#991B1B`, Icône `XCircle`
- **Note Éliminatoire :** Fond `#991B1B`, Texte `#FFFFFF`, Poids très gras, pulsation visuelle d'alerte.

### 2.3. Carte de Séance & Emploi du Temps (`.card-seance`)
- Fond blanc avec bordure fine `#E2E8F0` et survol avec ombre portée `var(--shadow-md)`.
- En-tête avec indicateur visuel de campus :
  - **Campus Guéliz :** Bande latérale gauche Bleue `#2563EB`
  - **Campus Targa :** Bande latérale gauche Verte `#00843D`
- Bandeau de transit inter-campus intercalaire affichant une icône de transport et le compte à rebours : `Transit 45 min requis`.
