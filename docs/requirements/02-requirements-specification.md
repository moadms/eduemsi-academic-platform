# SPÉCIFICATION FORMELLE DES EXIGENCES LOGICIELLES (PHASE B)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech — Campus Guéliz & Targa)  
**Encadrante :** Pr. ZGANDRI | **Président du Jury :** Pr. AIT OUNEJJAR Lahoussaine  
**Référentiel Méthodologique :** IEEE 830 / ISO/IEC/IEEE 29148:2018 & Skill `requirements-engineering`  
**Statut du Document :** Validé — Baseline Officielle  

---

## 1. Périmètre & Limites du Système

### 1.1. Périmètre Inclus (In-Scope)
- **Gestion Pédagogique & Maquette :** Définition des filières (IIR, GC, GI, GE, IFA), années (1A à 5A), modules, éléments de module, coefficients, semestres et crédits ECTS.
- **Planification & Transit Inter-Campus :** Génération des plannings hebdomadaires avec solveur sous contraintes respectant 45 min de transit entre Guéliz et Targa.
- **Assiduité & Émargement Numérique :** Détection d'émargement étudiant via QR code dynamique (15s) et saisie immédiate du cahier de texte enseignant.
- **Évaluation & Délibérations "Zéro Excel" :** Saisie des notes, calcul des moyennes modulaires pondérées, application automatique de la note éliminatoire (< 7.00/20) et génération des PV de délibération signés.
- **Gestion des Projets de Fin d'Études (PFE) :** Soumission des sujets, validation entreprise/école, matching IA local (Ollama) mémoires-jurys, gestion des soutenances.
- **Portails Utilisateurs :** Portail web administratif et pédagogique (Next.js) + Application mobile étudiants/enseignants (Flutter).
- **Gestion Administrative & Financière :** Inscriptions, facturation de la scolarité, gestion des impayés avec verrouillage automatique des attestations.
- **Sécurité & Traçabilité :** Audit log immuable (Loi marocaine 09-08 / CNDP) et gestion multi-tenant.

### 1.2. Périmètre Exclu (Out-of-Scope)
- Comptabilité générale analytique et paie des salariés (déléguées à un progiciel tiers type Sage/SAP via API d'export).
- Gestion de flotte de transport physique de bus d'étudiants (seuls les temps de battement inter-campus des enseignants sont modélisés).
- Plateforme d'apprentissage complet (LMS type Moodle avec forum et devoir en ligne lourd) ; l'ERP intègre le partage de supports mais ne remplace pas un LMS externe.

---

## 2. Catalogue des Exigences Fonctionnelles (FR)

| Identifiant | Intitulé & Description Fonctionnelle | Rôle Déclencheur | Priorité MoSCoW |
| :--- | :--- | :--- | :---: |
| **FR-001** | **Authentification Sécurisée & Gestion des Profils :** Connexion multi-rôles par identifiant institutionnel et mot de passe chiffré (Argon2id), support de double facteur (TOTP) pour les administrateurs et membres de jury. | Tous utilisateurs | **Must** |
| **FR-002** | **Structure Pédagogique & Maquette :** Modélisation hiérarchique des filières, niveaux, semestres, modules, éléments constitutifs (EC) et coefficients académiques. | Chef de Département | **Must** |
| **FR-003** | **Gestion des Inscriptions & Dossiers Étudiants :** Immatriculation (CIN, CNE/MASSAR), affectation aux groupes de TD/TP, rattachement au campus (Guéliz/Targa). | Service Scolarité | **Must** |
| **FR-004** | **Planification Automatisée sans Conflit :** Calcul des créneaux par solveur CP-SAT (OR-Tools) intégrant enseignants, salles, équipements et contraintes d'indisponibilité. | Responsable Planning | **Must** |
| **FR-005** | **Gestion du Transit Inter-Campus (45 min) :** Blocage automatique d'au moins 45 minutes entre deux cours consécutifs d'un professeur changeant de site entre Guéliz et Targa. | Système / OR-Tools | **Must** |
| **FR-006** | **Projection de QR Code Éphémère (15s) :** Génération temps-réel d'un QR code éphémère projeté par l'enseignant, renouvelé toutes les 15 secondes via token chiffré HMAC. | Enseignant | **Must** |
| **FR-007** | **Émargement Mobile par Scan :** Scan du QR code depuis l'application mobile étudiante, validation de l'unicité du terminal (device ID) et de la fenêtre temporelle. | Étudiant | **Must** |
| **FR-008** | **Déclaration des Absences Justifiées :** Dépôt numérique de certificat médical ou justificatif officiel avec workflow de validation administrative. | Étudiant / Scolarité | **Should** |
| **FR-009** | **Cahier de Texte Temps-Réel :** Envoi d'une notification push à la fin de la séance ($T_{fin}$) pour saisie du programme traité, devoirs et ressources pédagogiques. | Enseignant | **Must** |
| **FR-010** | **Saisie & Verrouillage des Notes :** Saisie des notes de contrôle continu (CC), travaux pratiques (TP) et examens finaux avec borne stricte $[0.00 ; 20.00]$. | Enseignant | **Must** |
| **FR-011** | **Calcul Automatique de Délibération :** Calcul instantané des moyennes de module, semestrielles et annuelles selon les formules officielles EMSI sans recours à Excel. | Système | **Must** |
| **FR-012** | **Application de la Note Éliminatoire :** Invalidation automatique de l'élément et du module si la note d'examen final est $< 7.00/20.00$, avec orientation en session de rattrapage. | Système | **Must** |
| **FR-013** | **Génération Sécurisée du PV de Délibération :** Production du procès-verbal officiel en PDF scellé avec signatures électroniques et hachage cryptographique SHA-256. | Direction des Études | **Must** |
| **FR-014** | **Gestion du Cycle de Vie des PFE :** Dépôt de fiche de sujet PFE, affectation de l'encadrant pédagogique, dépôt des livrables (rapport intermédiaire, rapport final). | Étudiant / Encadrant | **Must** |
| **FR-015** | **Matching IA Mémoires-Jurys (Ollama) :** Analyse sémantique vectorielle du résumé et mots-clés du rapport de PFE et recommandation de membres de jury experts (score $> 0.70$). | Chef de Département | **Should** |
| **FR-016** | **Planification des Soutenances PFE :** Allocation automatique de salles de soutenance, créneaux et jurys avec vérification de disponibilité. | Coordinateur PFE | **Must** |
| **FR-017** | **Facturation & Suivi des Règlements :** Émission des échéanciers de frais de scolarité, enregistrement des paiements (virements, chèques, paiements en ligne). | Service Financier | **Must** |
| **FR-018** | **Verrouillage Administratif des Documents :** Blocage automatique du téléchargement des attestations et relevés pour les étudiants ayant plus de 10 jours ouvrés d'impayé. | Système | **Must** |
| **FR-019** | **Génération d'Attestations Vérifiables :** Édition d'attestations de scolarité et relevés officiels munis d'un QR code 2D-Doc permettant la vérification d'authenticité par un tiers. | Scolarité / Étudiant | **Should** |
| **FR-020** | **Journalisation Immuable d'Audit (CNDP) :** Enregistrement inaltérable de chaque action d'altération de note, d'octroi de droits ou d'accès aux données personnelles. | Système / DPO | **Must** |
| **FR-021** | **Gestion Multi-Campus & Multi-Tenant :** Cloisonnement étanche des données par tenant universitaire et gestion des contextes de campus régionaux. | Super Administrateur | **Must** |

---

## 3. Catalogue des Exigences Non Fonctionnelles (NFR)

| Identifiant | Catégorie ISO 25010 | Exigence & Critère Mesurable d'Acceptation |
| :--- | :--- | :--- |
| **NFR-001** | **Performance (Temps de réponse) :** 95% des requêtes web/mobile doivent répondre en moins de 200 ms sous une charge nominale de 5 000 utilisateurs concurrents. |
| **NFR-002** | **Performance (Calcul Délibération) :** Le calcul complet de la délibération semestrielle pour une promotion de 500 étudiants ne doit pas dépasser 2,0 secondes. |
| **NFR-003** | **Disponibilité & Résilience :** Taux de disponibilité garanti de 99,9% pendant les semaines d'examens et d'émargement, avec reprise après incident (RTO < 15 min, RPO = 0). |
| **NFR-004** | **Sécurité (Protection des Secrets) :** Aucun mot de passe en clair. Hachage avec Argon2id (m=65536, t=3, p=4) ou BCrypt facteur 12. Chiffrement TLS 1.3 de bout en bout. |
| **NFR-005** | **Sécurité (Conformité CNDP) :** Respect strict de la loi marocaine 09-08 relative à la protection des données personnelles. Droit d'accès, de rectification et purge programmée. |
| **NFR-006** | **Souveraineté des Données (IA Locale) :** Le modèle de langage utilisé pour le matching PFE (Llama 3.2 via Ollama) doit s'exécuter localement, sans transmission hors du campus. |
| **NFR-007** | **Ergonomie & Accessibilité :** Respect des critères WCAG 2.2 niveau AA pour tous les écrans du portail web. Score d'utilisabilité SUS $\ge 80/100$. |
| **NFR-008** | **Extensibilité & Scalabilité :** Architecture microservices/monolithe modulaire supportant le passage de 2 campus (Marrakech) à 10+ campus (Casablanca, Rabat, etc.). |
| **NFR-009** | **Maintenabilité du Code :** Couverture de tests unitaires et d'intégration $\ge 80\%$. Dette technique SonarQube classée "A" avec 0 vulnérabilité bloquante. |
| **NFR-010** | **Mobilité & Mode Déconnecté :** L'application mobile doit permettre la consultation de l'emploi du temps hors-ligne grâce à une base locale chiffrée (Isar/Hive). |

---

## 4. Cas d'Utilisation Détaillés (Use Cases)

### UC-001 : Émargement Numérique d'une Séance par QR Code Dynamique
- **Acteur Principal :** Étudiant (`ROLE_STUDENT`)
- **Acteurs Secondaires :** Enseignant (`ROLE_PROFESSOR`), Serveur d'Horloge NTP, Gestionnaire de Sessions Redis
- **Préconditions :**
  1. L'enseignant a lancé la séance sur le terminal de la salle de cours et projeté le flux du QR code.
  2. L'étudiant est physiquement dans la salle, muni de son smartphone connecté avec l'application mobile EMSI installée et authentifiée.
- **Déclencheur :** L'étudiant appuie sur "Scanner ma Présence" sur son application mobile.
- **Scénario Nominal (Main Flow) :**
  1. L'application mobile active la caméra et scanne le QR code affiché sur le vidéoprojecteur.
  2. L'application extrait le payload chiffré contenant : `seance_id`, `epoch_timestamp`, `nonce`, et la signature HMAC.
  3. L'application transmet la requête de validation à l'API `/api/v1/attendance/scan` accompagnée du JWT étudiant et de l'empreinte matérielle (`device_id`).
  4. Le serveur vérifie que la séance est active et que l'horodatage du jeton appartient à la fenêtre de validité courante ($t \le 15\text{ secondes}$).
  5. Le serveur vérifie via Redis que le `nonce` n'a pas déjà été consommé pour cet étudiant (protection anti-rejeu).
  6. Le serveur vérifie que l'étudiant est bien inscrit dans le groupe assigné à cette séance.
  7. Le serveur enregistre la présence en base de données avec le statut `PRESENT` et horodatage certifié.
  8. L'application mobile de l'étudiant affiche une coche verte animée avec confirmation sonore et vibreur : "Présence Enregistrée avec Succès".
  9. Le tableau de bord projeté de l'enseignant incrémente instantanément le compteur d'étudiants présents en temps réel via WebSocket.
- **Scénarios Alternatifs & Exceptions :**
  - *4a. Jeton expiré (> 15s) :* Le serveur rejette la requête avec le code `HTTP 400 - QR_CODE_EXPIRED`. L'application invite l'étudiant à rescanner le nouveau QR affiché.
  - *5a. Tentative de double scan ou émargement pour un tiers :* Le `device_id` a déjà émargé pour un autre étudiant. Le serveur bloque l'opération, notifie une alerte de tentative de fraude dans `audit_logs` et renvoie l'erreur `HTTP 403 - DEVICE_COLLISION_DETECTED`.
  - *6a. Étudiant non affecté à ce groupe :* Le serveur renvoie `HTTP 422 - STUDENT_NOT_IN_ROSTER`.
- **Postconditions :** L'étudiant est marqué présent pour la séance ; le total d'assiduité du module est recalculé.
- **Critères d'Acceptation :** `AC-001`, `AC-002`, `AC-003`.

---

### UC-002 : Saisie Immédiate du Cahier de Texte Post-Séance
- **Acteur Principal :** Enseignant (`ROLE_PROFESSOR`)
- **Acteurs Secondaires :** Chef de Département, Étudiants de la classe
- **Préconditions :** L'horaire de fin de cours de la séance planifiée ($T_{fin}$) est atteint.
- **Déclencheur :** Le serveur émet une notification push Firebase Cloud Messaging (FCM) sur le smartphone de l'enseignant.
- **Scénario Nominal :**
  1. L'enseignant clique sur la notification "Votre séance de [Module] est terminée. Renseignez votre cahier de texte".
  2. L'application ouvre directement l'écran du formulaire pré-rempli avec l'intitulé du cours, la date, l'horaire et la liste des présents.
  3. L'enseignant saisit le résumé des notions pédagogiques dispensées, le chapitre du syllabus couvert et les exercices traités.
  4. L'enseignant peut ajouter des devoirs à faire pour la séance suivante avec date limite.
  5. L'enseignant peut attacher un document PDF ou des diapositives (téléversées vers MinIO).
  6. L'enseignant clique sur "Valider et Clôturer la Séance".
  7. Le système enregistre le cahier de texte, horodate la saisie et passe l'état de la séance à `COMPLETED_DOCUMENTED`.
  8. Une notification récapitulative est envoyée aux étudiants du groupe avec le lien vers les supports.
- **Scénarios Alternatifs & Exceptions :**
  - *3a. Séance non dispensée (Enseignant absent ou problème technique) :* L'enseignant sélectionne "Séance non dispensée", motive le motif (panne, rattrapage planifié) ; le système alerte le Chef de Département et planifie une session de rattrapage.
  - *7a. Absence de saisie après 24 heures :* Un rappel automatique est envoyé à l'enseignant et une mention d'alerte apparaît sur le tableau de bord du Chef de Département.
- **Postconditions :** Le cahier de texte est officiel, visible par la direction pédagogique et les étudiants ; le volume horaire effectué par l'enseignant est incrémenté.
- **Critères d'Acceptation :** `AC-004`, `AC-005`.

---

### UC-003 : Délibération Semestrielle Automatisée avec Note Éliminatoire
- **Acteur Principal :** Chef de Département (`ROLE_DEPT_HEAD`)
- **Acteurs Secondaires :** Membres du Jury, Direction des Études
- **Préconditions :** Toutes les notes de CC, TP et Examens Finaux ont été saisies et scellées par les professeurs pour le semestre concerné.
- **Déclencheur :** Le Chef de Département clique sur "Lancer la Délibération Automatique" pour la filière et la promotion ciblée.
- **Scénario Nominal :**
  1. Le système acquiert un verrou exclusif sur les notes du semestre pour empêcher toute altération concurrente.
  2. Pour chaque étudiant et pour chaque élément constitutif (EC), le système calcule la moyenne pondérée :
     $$\text{Moyenne}_{EC} = (\text{CC} \times \alpha) + (\text{TP} \times \beta) + (\text{Examen} \times \gamma)$$
  3. Pour chaque module, le système calcule la moyenne générale :
     $$\text{Moyenne}_{Module} = \sum (\text{Moyenne}_{EC_i} \times \text{Coeff}_i) / \sum \text{Coeff}_i$$
  4. Pour chaque élément d'évaluation, le système applique la règle `RULE-DELIB-04` : si $\text{Note}_{\text{Examen Final}} < 7.00/20.00$, l'élément et le module sont marqués `NON VALIDE (NOTE ELIMINATOIRE)`, indépendamment de la moyenne obtenue.
  5. Le système attribue le verdict du module :
     - $\ge 12.00$ sans note éliminatoire : `VALIDE (V)`.
     - $\ge 10.00$ et $< 12.00$ sans note éliminatoire : `VALIDE PAR COMPENSATION (VPC)` (selon règles de compensation de l'EMSI).
     - $< 10.00$ ou note éliminatoire présente : `NON VALIDE - RATTRAPAGE (NV)`.
  6. Le système calcule la moyenne générale semestrielle et classe la promotion.
  7. Le système génère le projet de Procès-Verbal (PV) avec statistiques (taux de réussite, moyennes min/max/médiane).
  8. Les membres du jury examinent les cas particuliers en commission et valident le PV par signature électronique conjointe.
  9. Le système génère le document PDF scellé avec empreinte SHA-256 et publie les notes sur les comptes étudiants.
- **Postconditions :** Les relevés de notes officiels sont disponibles ; les listes de rattrapage sont automatiquement générées.
- **Critères d'Acceptation :** `AC-006`, `AC-007`, `AC-008`.

---

### UC-004 : Affectation Intelligente des Jurys de PFE via IA Locale
- **Acteur Principal :** Chef de Département / Coordinateur des PFE
- **Acteurs Secondaires :** Moteur d'Inférence IA Ollama (Llama 3.2), Membres du Jury
- **Préconditions :** Les étudiants de 5ème année ont déposé leurs mémoires de fin d'études au format PDF sur MinIO ; l'extraction du texte (résumé, mots-clés) a été réalisée.
- **Déclencheur :** Le coordinateur sélectionne "Optimiser la Répartition des Jurys de PFE".
- **Scénario Nominal :**
  1. Le système transmet les résumés et domaines techniques des mémoires à l'API locale Ollama (`embeddings` nomic-embed-text / llama3.2).
  2. Le service génère les vecteurs sémantiques de chaque mémoire et les compare aux fiches de compétences et spécialités des enseignants-chercheurs de l'EMSI.
  3. Le système calcule la matrice de similarité cosinus.
  4. Pour chaque PFE, le système propose un binôme de jury (Président et Rapporteur) ayant un score de pertinence sémantique $> 0.70$, tout en respectant les contraintes :
     - L'encadrant du PFE ne peut pas être président ni rapporteur de son propre étudiant.
     - Équilibrage de la charge : pas plus de 4 soutenances par enseignant par jour.
     - Disponibilité des créneaux et des salles de réunion de Guéliz et Targa.
  5. Le coordinateur visualise la grille de proposition avec les scores de matching et indicateurs d'adéquation.
  6. Le coordinateur ajuste manuellement deux affectations si nécessaire ; le système recalcule instantanément la cohérence globale.
  7. Le coordinateur clique sur "Publier le Planning Officiel des Soutenances".
  8. Des invitations synchronisées (fichiers iCalendar `.ics` et notifications in-app) sont envoyées aux étudiants et aux membres du jury.
- **Critères d'Acceptation :** `AC-009`, `AC-010`.

---

## 5. Critères d'Acceptation Formels (Acceptance Criteria)

- **AC-001 (QR Code Anti-Rejeu) :** Étant donné un QR code généré à $T_0$, lorsqu'un étudiant tente de soumettre le scan à $T_0 + 16\text{ secondes}$, le système doit impérativement rejeter l'émargement avec l'erreur "Jeton expiré".
- **AC-002 (Terminal Unique) :** Étant donné un terminal mobile $X$ ayant validé la présence de l'étudiant $A$, si une seconde requête d'émargement pour la même séance provient du terminal $X$ avec le compte de l'étudiant $B$, la requête doit être bloquée et enregistrée dans le log d'audit.
- **AC-003 (Transit Inter-Campus) :** Étant donné un enseignant dispensant un cours à Guéliz jusqu'à $11\text{h}45$, le système de planification doit refuser toute planification de cours à Targa pour cet enseignant avant $12\text{h}30$ minimum ($45\text{ min}$ de battement).
- **AC-004 (Cahier de Texte Clôturé) :** Un cours dont le cahier de texte n'a pas été renseigné par le professeur dans les 72h doit apparaître avec un badge rouge "Non Documenté" dans les rapports d'audit pédagogique du directeur.
- **AC-005 (Seuil Éliminatoire Examen) :** Étant donné une note de CC de $16.00/20$ et une note d'examen final de $6.75/20$ sur un élément à fort coefficient, la moyenne modulaire calculée peut être mathématiquement supérieure à $10.00$, mais le statut du module doit afficher `NON VALIDE (RATTRAPAGE REQUIS)` en raison de la note $< 7.00/20$.
- **AC-006 (Blocage Financier Automatisé) :** Étant donné un étudiant ayant un solde débiteur échu de plus de 10 jours ouvrés, lorsqu'il clique sur "Télécharger mon attestation de scolarité", le système doit bloquer le téléchargement et afficher le message "Accès administratif restreint — Veuillez contacter le service comptabilité".
- **AC-007 (Audit Log Inaltérable) :** Toute mise à jour directe sur une note via l'interface administrative doit générer une ligne dans la table `audit_logs` contenant `old_value`, `new_value`, `modified_by`, `justification_text` et la signature HMAC vérifiable.
