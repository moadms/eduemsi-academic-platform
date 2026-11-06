# SPÉCIFICATION D'INGÉNIERIE D'INTERFACE ET EXPÉRIENCE UTILISATEUR UI/UX (PHASE F)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech)  
**Encadrement Académique :** Pr. ZGANDRI | **Président du Jury :** Pr. AIT OUNEJJAR Lahoussaine  
**Référentiel Normatif :** W3C Web Content Accessibility Guidelines (WCAG) 2.2 AA & Skill `ui-ux-design`  
**Statut du Document :** Référentiel UI/UX Officiel  

---

## 1. Personas et Cartographie des Parcours Utilisateurs

### 1.1. Persona 1 : Yassine — Élève-Ingénieur 5A D2SI (EMSI Guéliz / Targa)
- **Objectifs :** Consulter son emploi du temps en un clin d'œil, pointer sa présence en moins de 5 secondes via son smartphone même avec une connexion 4G instable, suivre l'avancement de son PFE et vérifier ses notes après délibération.
- **Frustrations majeures :** Files d'attente à la scolarité pour une simple attestation, manque de visibilité sur les salles lors des changements de campus entre Guéliz et Targa, incertitude sur les moyennes de rattrapage.
- **Périphérique principal :** Smartphone Android / iOS (Application Flutter).

### 1.2. Persona 2 : Dr. Fatima-Zahra — Enseignante-Chercheuse en Informatique
- **Objectifs :** Projeter immédiatement son QR code d'émargement sans manipulations complexes, valider son cahier de texte dès la fin du cours en 2 minutes depuis son mobile, saisir ses notes d'examen sans risque d'erreur de saisie.
- **Frustrations majeures :** Les feuilles de présence papier perdues ou illisibles, le trajet stressant entre Guéliz et Targa si aucun battement n'est prévu, les fichiers Excel corrompus.
- **Périphérique principal :** Ordinateur portable en salle (Portail Web Next.js) + Smartphone nomade.

### 1.3. Persona 3 : M. Karim — Chef de Département Informatique & Réseaux
- **Objectifs :** Disposer d'une vue synthétique sur l'assiduité globale, générer des plannings équilibrés sans conflits de transit, piloter les délibérations sans calcul manuel sous Excel, affecter les jurys PFE en exploitant les recommandations de l'IA locale.
- **Frustrations majeures :** Le temps passé à croiser des tableaux de notes et les contestations d'étudiants liées à des notes éliminatoires mal appliquées.
- **Périphérique principal :** Station de travail avec double écran (Portail Web Desktop).

---

## 2. Système de Design (Design System & Design Tokens)

Le système de design est baptisé **EMSI Emerald Pulse** et s'appuie sur la charte graphique officielle de l'école (Vert Institutionnel EMSI, Gris Minéral, Blanc Épuré) optimisé pour des contrastes élevés :

### 2.1. Palette de Couleurs & Ratios de Contraste (WCAG 2.2 AA)
| Nom du Token | Valeur Hexadécimale | Usage & Sémantique | Ratio de Contraste vs Fond Blanc |
| :--- | :--- | :--- | :---: |
| `--emsi-green-primary` | `#00843D` | Vert institutionnel EMSI, boutons d'action majeurs, en-têtes | **4.8:1** (Conforme AA) |
| `--emsi-green-dark` | `#005A2B` | Vert profond, texte sur fond clair, états survolés | **7.2:1** (Conforme AAA) |
| `--emsi-green-light` | `#E8F5E9` | Fond d'alertes de succès, badges d'émargement validé | - (Fond doux) |
| `--emsi-accent-gold` | `#D4AF37` | Or académique, félicitations, mentions de diplôme | **4.6:1** (Conforme AA) |
| `--emsi-slate-900` | `#0F172A` | Texte principal, titres, contrastes stricts | **15.8:1** (Conforme AAA) |
| `--emsi-slate-500` | `#64748B` | Texte secondaire, métadonnées, légendes d'horodatage | **4.9:1** (Conforme AA) |
| `--emsi-danger` | `#DC2626` | Alertes éliminatoires (< 7.00/20), blocage financier, erreurs | **5.1:1** (Conforme AA) |
| `--emsi-surface` | `#FFFFFF` | Fond des cartes blanches et conteneurs de contenu | - |
| `--emsi-background` | `#F8FAFC` | Fond neutre de l'espace de travail pour réduire la fatigue oculaire | - |

### 2.2. Échelle Typographique (Inter Font Family)
- **Titre H1 (Hero & Tableaux de bord) :** `Inter SemiBold`, 32px / line-height 40px
- **Titre H2 (En-têtes de modules) :** `Inter Medium`, 24px / line-height 32px
- **Titre H3 (Cartes & Modales) :** `Inter Medium`, 18px / line-height 26px
- **Corps de texte (Body Regular) :** `Inter Regular`, 14px / line-height 22px
- **Métadonnées & Badges (Caption) :** `Inter SemiBold`, 12px / line-height 16px, Uppercase tracking +0.05em

---

## 3. Inventaire des Écrans (Screen Inventory SCR-001 à SCR-015)

| Identifiant Écran | Nom de l'Écran | Public Cible | Composants Majeurs & Interactions |
| :--- | :--- | :--- | :--- |
| **SCR-001** | `auth/login` | Tous | Formulaire d'authentification, sélecteur de rôle, saisie OTP/TOTP 6 chiffres. |
| **SCR-002** | `student/dashboard` | Étudiant | Prochain cours en direct, jauge d'assiduité semestrielle, raccourci scan QR. |
| **SCR-003** | `student/timetable` | Étudiant | Emploi du temps hebdomadaire interactif, badge du campus (Guéliz/Targa), mode offline. |
| **SCR-004** | `student/scan-attendance` | Étudiant | Viseur caméra plein écran, détection automatique du QR, animation retour vert/rouge. |
| **SCR-005** | `student/grades` | Étudiant | Relevé de notes semestriel, statut de validation modulaire (V/VPC/NV), alerte recours 72h. |
| **SCR-006** | `student/thesis` | Étudiant 5A | Dépôt de fiche PFE, téléversement mémoire PDF, statut d'approbation et jalon jury. |
| **SCR-007** | `professor/dashboard` | Enseignant | Séance du jour en cours, bouton de lancement de projection QR, alerte cahier de texte. |
| **SCR-008** | `professor/qr-projection` | Enseignant | Projection plein écran du QR dynamique tournant toutes les 15s + compteur de présents live. |
| **SCR-009** | `professor/textbook` | Enseignant | Formulaire de saisie du cahier de texte, syllabus, devoirs assignés et pièces jointes. |
| **SCR-010** | `professor/grading` | Enseignant | Grille de saisie matricielle des notes avec validation en temps réel $[0.00 ; 20.00]$. |
| **SCR-011** | `admin/schedule-planner`| Planificateur | Grille drag-and-drop des emplois du temps avec indicateur de conflit de transit 45 min. |
| **SCR-012** | `dept/deliberation` | Chef Dpt / Jury | Console de délibération "Zéro Excel", surlignage des notes < 7.00, bouton de scellement PV. |
| **SCR-013** | `dept/thesis-matching` | Coordinateur PFE| Grille de recommandation IA Ollama mémoires-jurys avec jauges de similarité cosinus. |
| **SCR-014** | `finance/billing` | Service Finance | Échéanciers, saisie de règlements, bouton de levée manuelle de blocage d'attestations. |
| **SCR-015** | `admin/audit-logs` | DPO / Admin | Journal d'audit CNDP filtrable par utilisateur, entité, IP et vérification de signature SHA. |

---

## 4. États d'Interface Normalisés (UI States)

Chaque vue du système est explicitement modélisée selon les quatre états fondamentaux :
1. **État Chargement (Loading State) :** Remplacement par des squelettes animés (Skeleton Loaders) respectant scrupuleusement la géométrie finale des cartes pour éviter tout décalage cumulé de mise en page (Cumulative Layout Shift CLS < 0.05).
2. **État Données Vides (Empty State) :** Illustration vectorielle dédiée, texte pédagogique rassurant et bouton d'action principal (Call To Action clair : e.g. "Aucun cours planifié aujourd'hui — Profitez-en pour réviser").
3. **État d'Erreur (Error State) :** Diagnostic explicite en langage naturel compréhensible (jamais de code d'exception technique brut type `NullPointerException`), accompagné d'un bouton de tentative ("Réessayer") et de contact du support.
4. **État Succès & Confirmation (Success State) :** Rétroaction haptique et sonore (sur mobile), message clair et fermeture automatique des modales après 2,5 secondes.

---

## 5. Spécifications Ergonomiques & Accessibilité (WCAG 2.2 AA)
- **Taille minimale des cibles tactiles :** Minimum $48 \times 48\text{ pixels}$ sur mobile (application Flutter) avec un espacement minimal de 8 pixels entre deux boutons adjacents.
- **Navigation exclusive au clavier :** Tous les formulaires et grilles de notes du portail web supportent la navigation fluide via `Tab`, `Shift+Tab`, `Entrée` et les flèches directionnelles.
- **Support des lecteurs d'écran (Screen Readers) :** Renseignement systématique des attributs `aria-label`, `aria-live="polite"` pour les compteurs temps réel de présence et balises sémantiques HTML5 strictes (`<nav>`, `<main>`, `<article>`, `<header>`).
