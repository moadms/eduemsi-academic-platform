# MATRICE DE TRAÇABILITÉ BIDIRECTIONNELLE DES EXIGENCES (PHASE B)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech)  
**Encadrante :** Pr. ZGANDRI | **Jury :** Pr. AIT OUNEJJAR Lahoussaine  
**Statut :** Baseline de Contrôle d'Ingénierie  

---

## 1. Principe de Traçabilité

Cette matrice assure la conformité d'ingénierie selon le standard **ISO/IEC/IEEE 29148:2018** :
- **Traçabilité Amont -> Aval (Forward Traceability) :** Vérifie que chaque exigence fonctionnelle (FR) et non fonctionnelle (NFR) ainsi que chaque règle métier (BR) est concrétisée dans un cas d'utilisation (UC), des entités du domaine, des modules d'architecture et des critères d'acceptation (AC).
- **Traçabilité Aval -> Amont (Backward Traceability) :** Garantit qu'aucun composant, écran d'interface ou table de base de données n'est implémenté sans justification métier directe.

---

## 2. Tableau Général de Traçabilité Croisée

| ID Exigence Métier | Description Synthétique | Règle Métier Associée (BR) | Cas d'Utilisation (UC) | Composant / Service Applicatif Cible | Table(s) Relationnelle(s) | Critère d'Acceptation (AC) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **FR-001** | Authentification Sécurisée & RBAC | `BR-SEC-12` | `UC-AUTH-01` | `AuthService`, `JwtTokenProvider` | `users`, `roles`, `user_roles` | `AC-AUTH-01` |
| **FR-002** | Structure Pédagogique & Maquette | - | `UC-CURR-01` | `CurriculumService` | `programs`, `semesters`, `modules`, `elements` | `AC-CURR-01` |
| **FR-003** | Gestion des Inscriptions & Dossiers | `BR-SCOL-14` | `UC-SCOL-01` | `StudentService`, `EnrollmentService` | `students`, `enrollments`, `groups` | `AC-SCOL-01` |
| **FR-004** | Planification Automatisée sans Conflit | `BR-PLAN-13` | `UC-PLAN-01` | `ScheduleOptimizerService` (OR-Tools) | `schedules`, `seances`, `rooms` | `AC-PLAN-01` |
| **FR-005** | Gestion Transit Inter-Campus (45 min) | `BR-GEO-01` | `UC-PLAN-02` | `TransitConstraintHandler` | `seances`, `campuses`, `campus_distances` | `AC-003` |
| **FR-006** | Projection QR Code Éphémère (15s) | `BR-ATT-02` | `UC-001` | `QrAttendanceGenerator`, `RedisTokenStore` | `seance_tokens` (Redis), `seances` | `AC-001` |
| **FR-007** | Émargement Mobile par Scan | `BR-ATT-02` | `UC-001` | `AttendanceValidationService` | `attendances`, `student_devices` | `AC-001`, `AC-002` |
| **FR-008** | Justification des Absences | `BR-ATT-03` | `UC-ATT-02` | `AbsenceJustificationService` | `absences`, `justifications`, `documents` | `AC-ATT-02` |
| **FR-009** | Cahier de Texte Temps-Réel Post-Cours | `BR-NOT-06` | `UC-002` | `TextbookService`, `PushNotificationService` | `textbooks`, `homeworks`, `seances` | `AC-004` |
| **FR-010** | Saisie & Verrouillage des Notes | `BR-NOT-15` | `UC-EVAL-01` | `GradingService` | `evaluations`, `student_grades` | `AC-EVAL-01` |
| **FR-011** | Calcul Délibération "Zéro Excel" | `BR-DELIB-05` | `UC-003` | `DeliberationEngine` | `deliberations`, `module_results` | `AC-005` |
| **FR-012** | Application Seuil Éliminatoire (< 7.00) | `BR-DELIB-04` | `UC-003` | `DeliberationEngine`, `ExamResultEvaluator` | `student_grades`, `module_results` | `AC-005` |
| **FR-013** | Génération PV Délibération Scellé | `BR-SEC-11` | `UC-003` | `ReportGeneratorService` (PDF/iText) | `deliberation_reports`, `digital_signatures` | `AC-DELIB-03` |
| **FR-014** | Gestion du Cycle de Vie des PFE | `BR-PFE-07` | `UC-PFE-01` | `ThesisManagementService` | `theses`, `thesis_milestones`, `supervisors` | `AC-PFE-01` |
| **FR-015** | Matching IA Mémoires-Jurys (Ollama) | `BR-PFE-08` | `UC-004` | `OllamaEmbeddingClient`, `JuryMatchService` | `thesis_vectors`, `professor_skills` | `AC-009`, `AC-010` |
| **FR-016** | Planification Soutenances PFE | `BR-PFE-07` | `UC-004` | `DefenseSchedulingService` | `thesis_defenses`, `jury_members` | `AC-DEF-01` |
| **FR-017** | Facturation & Règlements Frais | `BR-FIN-10` | `UC-FIN-01` | `BillingService`, `PaymentService` | `invoices`, `payments`, `payment_schedules` | `AC-FIN-01` |
| **FR-018** | Verrou Administratif des Documents | `BR-FIN-09` | `UC-DOC-01` | `DocumentIssuingAspect`, `LockService` | `invoices`, `students`, `document_requests` | `AC-006` |
| **FR-019** | Attestations avec QR 2D-Doc | `BR-SEC-11` | `UC-DOC-02` | `DocumentVerificationService` | `issued_certificates`, `verification_keys` | `AC-DOC-02` |
| **FR-020** | Journalisation Immuable (Loi 09-08) | `BR-SEC-11` | `UC-SEC-01` | `AuditLogAspect`, `AuditEventListener` | `audit_logs` (Append-Only) | `AC-007` |
| **FR-021** | Gestion Multi-Tenant & Multi-Campus | `BR-SEC-12` | `UC-TENANT-01` | `TenantContextHolder`, `TenantFilter` | `tenants`, `campuses` | `AC-TENANT-01` |

---

## 3. Matrice de Couverture des Exigences Non Fonctionnelles (NFR)

| ID NFR | Catégorie ISO 25010 | Mécanisme Architectural de Réalisation | Métrique & Validation Vérifiable |
| :--- | :--- | :--- | :--- |
| **NFR-001** | Performance (Temps de réponse) | Mise en cache Redis des plannings + Indexation B-Tree PostgreSQL | 95% des requêtes HTTP < 200 ms (JMeter) |
| **NFR-002** | Vitesse Calcul Délibération | Traitement in-memory multithreadé Java Stream API + Batch Update JPA | Calcul de 500 étudiants en < 2.0 s |
| **NFR-003** | Disponibilité (99.9%) | Réplication primaire/secondaire PostgreSQL + Conteneurs Docker redondants | RTO < 15 min, RPO = 0 |
| **NFR-004** | Sécurité des Mots de Passe | Algorithme Argon2id ou BCrypt 12 rounds | Hachage cryptographique non réversible |
| **NFR-005** | Conformité CNDP (Loi 09-08) | Table `audit_logs` immuable avec IP, horodatage certifié, chiffrement PII | Registre d'audit légal exportable |
| **NFR-006** | Souveraineté de l'IA | Conteneur Ollama local exécutant Llama 3.2 sur le serveur campus | Zéro fuite vers API externe (contrôle firewall) |
| **NFR-007** | Ergonomie & Accessibilité | Composants Shadcn UI conformes ARIA, palette contrastée | Audit Lighthouse Accessibility $\ge 90$ |
| **NFR-008** | Extensibilité Multi-Site | Architecture multi-tenant logique avec `tenant_id` et clé de partition | Ajout d'un campus sans refactor de base |
| **NFR-009** | Qualité & Maintenabilité | Clean Architecture 3 couches + Tests JUnit 5 / Mockito | Couverture de code $\ge 80\%$, SonarQube A |
| **NFR-010** | Offline-First Mobile | Base de données locale Isar sur Flutter pour les emplois du temps | Consultation 100% fonctionnelle sans réseau |
