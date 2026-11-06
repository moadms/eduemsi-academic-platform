# SPÉCIFICATIONS DES MAQUETTES HAUTE FIDÉLITÉ (MOCKUPS)

**Projet :** EMSI Campus ERP (Univora)  
**Établissement :** EMSI Marrakech  
**Référentiel :** Skill `ui-ux-design`  

---

## 1. Mockup MK-01 : Portail Professeur — Saisie du Cahier de Texte Post-Séance

### 1.1. Spécifications Visuelles & Structurelles
- **En-tête de Carte :**
  - Fond dégradé subtil : `linear-gradient(135deg, #00843D 0%, #005A2B 100%)`.
  - Typographie titre : `Inter SemiBold`, 20px, Couleur blanche `#FFFFFF`.
  - Badge d'état : Vert pastel `#E8F5E9` avec texte vert `#005A2B` "Séance Terminée à 10:15 - En attente de documentation".
- **Corps du Formulaire :**
  - **Zone 1 (Syllabus & Notions Enseignées) :** Éditeur Markdown / WYSIWYG épuré avec comptage dynamique de caractères (exigence minimale de 50 caractères). Placeholder : *"Précisez les concepts clés abordés (ex: Clean Architecture, patron Ports et Adaptateurs)..."*.
  - **Zone 2 (Devoirs & Travaux Pratiques) :** Sélecteur de date d'échéance par calendrier interactif + zone texte multiligne.
  - **Zone 3 (Supports Pédagogiques) :** Zone de glisser-déposer de fichiers drag-and-drop supportant PDF, PPTX, ZIP (limite 25 Mo par fichier, téléversement direct vers bucket MinIO `course-materials`).
- **Pied de Carte & Actions :**
  - Bouton secondaire : "Sauvegarder en Brouillon" (Bordure grise `#E2E8F0`, texte `#475569`).
  - Bouton primaire d'action : "Valider & Clôturer la Séance" (Fond vert `#00843D`, survol `#005A2B`, texte blanc, icône `CheckCircle` Lucide).

---

## 2. Mockup MK-02 : Console Chef de Département — Matching IA des Mémoires PFE

### 2.1. Spécifications de la Grille d'Appariement
- **En-tête de Sélection :**
  - Barre de recherche sémantique avec filtrage par filière (e.g. *IIR 5A*), technologies clés (e.g. *Spring Boot, Kubernetes, Computer Vision*).
- **Carte Mémoire Étudiant (Colonne Gauche) :**
  - Nom & Photo de l'étudiant, entreprise d'accueil (e.g. *Capgemini, Thales, OCP*), titre du sujet de fin d'études.
  - Résumé textuel avec mots-clés surlignés en vert clair.
  - Indicateur d'encadrant interne : "Encadrant : Pr. Mansouri (Non éligible comme jury BR-PFE-07)".
- **Cartes de Recommandation IA des Jurys (Colonne Droite) :**
  - **Candidat 1 (Recommandation Forte) :**
    - Nom : "Pr. ZGANDRI" — Jauge de similarité cosinus : `94%` (Jauge circulaire verte).
    - Rôle proposé : **Présidente du Jury**.
    - Compétences concordantes : *Software Architecture, Distributed Systems, Microservices*.
    - Disponibilité : *Créneau Vendredi 14h30 - Salle Guéliz Amphi B (Libre)*.
  - **Candidat 2 (Rapporteur Optimal) :**
    - Nom : "Pr. AIT OUNEJJAR" — Jauge de similarité : `88%` (Jauge circulaire verte).
    - Rôle proposé : **Rapporteur Officiel**.
    - Disponibilité : *Créneau Vendredi 14h30 (Libre)*.
- **Bouton d'Action Globale :**
  - "Valider et Générer les Convocations Officielles" (Déclenche l'envoi des fichiers iCalendar et notifications).
