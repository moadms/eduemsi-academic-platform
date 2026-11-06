# SPÉCIFICATION TECHNIQUE DU MODÈLE DE DONNÉES RELATIONNEL (PHASE D)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech)  
**Encadrement :** Pr. ZGANDRI | **Jury :** Pr. AIT OUNEJJAR Lahoussaine  
**SGBD Cible :** PostgreSQL 16 Enterprise (avec extensions `uuid-ossp`, `pgcrypto`, `pgvector`)  
**Normalisation :** 3ème Forme Normale (3NF) stricte avec tables dénormalisées d'historique en append-only  

---

## 1. Vue d'Ensemble & Stratégie de Partitionnement

Le modèle de données d'EMSI Campus ERP comporte **40 tables relationnelles** organisées en 7 domaines fonctionnels cohésifs :
1. `DOM_IAM` : Identités, Authentification, Rôles & Multi-Tenancy (6 tables)
2. `DOM_CURR` : Structure Pédagogique & Maquettes (5 tables)
3. `DOM_SCOL` : Dossiers Étudiants, Inscriptions & Groupes (6 tables)
4. `DOM_PLAN` : Infrastructures, Salles & Planification Dynamique (6 tables)
5. `DOM_ATT` : Assiduité Temps-Réel & Cahier de Texte (5 tables)
6. `DOM_EVAL` : Évaluations, Notes & Délibérations Zéro Excel (5 tables)
7. `DOM_PFE` : Projets de Fin d'Études, Embeddings & Soutenances (4 tables)
8. `DOM_FIN_AUDIT` : Facturation, Verrouillage & Audit Log Légal CNDP (3 tables)

---

## 2. Dictionnaire des Données Détaillé (Tables Clés du Schéma)

### 2.1. Domaine Identités, Campus & Multi-Tenancy

#### Table `tenants` (Multi-Tenancy)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant unique de l'institution |
| `code` | `VARCHAR(30)` | `NOT NULL UNIQUE` | Code court (e.g. `EMSI_MARRAKECH`) |
| `name` | `VARCHAR(150)` | `NOT NULL` | Nom officiel de l'établissement |
| `active` | `BOOLEAN` | `NOT NULL DEFAULT TRUE` | État d'activité du compte |
| `created_at`| `TIMESTAMPTZ`| `NOT NULL DEFAULT NOW()` | Horodatage de création |

#### Table `campuses` (Sites Physiques EMSI)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant du campus |
| `tenant_id` | `UUID` | `NOT NULL REFERENCES tenants(id)` | Rapprochement de l'institution |
| `code` | `VARCHAR(20)` | `NOT NULL` | Code du site (`GUELIZ`, `TARGA`) |
| `name` | `VARCHAR(100)` | `NOT NULL` | Nom du site ("Campus Guéliz", "Campus Targa") |
| `city` | `VARCHAR(50)` | `NOT NULL DEFAULT 'Marrakech'` | Ville d'implantation |
| `transit_buffer_min` | `INTEGER` | `NOT NULL DEFAULT 45` | Battement de déplacement obligatoire |

#### Table `users` (Comptes Applicatifs)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant universel |
| `tenant_id` | `UUID` | `NOT NULL REFERENCES tenants(id)` | Isolation institutionnelle |
| `email` | `VARCHAR(150)` | `NOT NULL UNIQUE` | Courriel institutionnel (@emsi.ma) |
| `password_hash` | `VARCHAR(255)` | `NOT NULL` | Hash chiffré Argon2id ou BCrypt 12 |
| `first_name` | `VARCHAR(60)` | `NOT NULL` | Prénom de l'utilisateur |
| `last_name` | `VARCHAR(60)` | `NOT NULL` | Nom patronymique |
| `phone` | `VARCHAR(25)` | `NULL` | Téléphone mobile pour SMS / MFA |
| `role_name` | `VARCHAR(30)` | `NOT NULL` | Rôle principal (`STUDENT`, `PROF`, etc.) |
| `mfa_secret` | `VARCHAR(100)` | `NULL` | Clé secrète TOTP (RFC 6238) |
| `active` | `BOOLEAN` | `NOT NULL DEFAULT TRUE` | Compte actif / suspendu |

---

### 2.2. Domaine Pédagogie, Salles & Planification

#### Table `rooms` (Salles de Cours & Laboratoires)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant de la salle |
| `campus_id` | `UUID` | `NOT NULL REFERENCES campuses(id)` | Site physique de rattachement |
| `room_number` | `VARCHAR(20)` | `NOT NULL` | Numéro de salle (e.g. `G-102`, `T-Amphi-A`) |
| `capacity` | `INTEGER` | `NOT NULL CHECK (capacity > 0)` | Capacité maximale autorisée |
| `room_type` | `VARCHAR(30)` | `NOT NULL` | `AMPHI`, `SALLE_TD`, `LABO_TP` |
| `has_projector`| `BOOLEAN` | `NOT NULL DEFAULT TRUE` | Présence d'un vidéoprojecteur pour QR |

#### Table `seances` (Séances de Cours Planifiées)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant de la séance |
| `tenant_id` | `UUID` | `NOT NULL REFERENCES tenants(id)` | Isolation multi-tenant |
| `module_element_id` | `UUID` | `NOT NULL REFERENCES module_elements(id)` | Élément pédagogique dispensé |
| `professor_id` | `UUID` | `NOT NULL REFERENCES users(id)` | Enseignant responsable |
| `group_id` | `UUID` | `NOT NULL REFERENCES groups(id)` | Groupe d'étudiants convoqué |
| `room_id` | `UUID` | `NOT NULL REFERENCES rooms(id)` | Salle assignée |
| `start_time` | `TIMESTAMPTZ` | `NOT NULL` | Horodatage de début de cours |
| `end_time` | `TIMESTAMPTZ` | `NOT NULL CHECK (end_time > start_time)` | Horodatage de fin de cours |
| `status` | `VARCHAR(30)` | `NOT NULL DEFAULT 'PLANNED'` | `PLANNED`, `IN_PROGRESS`, `COMPLETED` |

---

### 2.3. Domaine Assiduité & Cahier de Texte

#### Table `attendances` (Émargements Étudiants)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant de l'émargement |
| `seance_id` | `UUID` | `NOT NULL REFERENCES seances(id)` | Séance associée |
| `student_id` | `UUID` | `NOT NULL REFERENCES users(id)` | Étudiant ayant émargé |
| `scan_time` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Heure précise du scan mobile |
| `status` | `VARCHAR(25)` | `NOT NULL DEFAULT 'PRESENT'` | `PRESENT`, `ABSENT_UNJUSTIFIED`, `JUSTIFIED` |
| `device_id` | `VARCHAR(100)` | `NOT NULL` | Empreinte matérielle du smartphone |
| `is_flagged` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Marqueur d'anomalie / suspicion fraude |

#### Table `textbooks` (Cahier de Texte Numérique)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant du cahier de texte |
| `seance_id` | `UUID` | `NOT NULL UNIQUE REFERENCES seances(id)` | Séance rattachée (relation 1-à-1) |
| `summary` | `TEXT` | `NOT NULL` | Contenu pédagogique enseigné |
| `homework` | `TEXT` | `NULL` | Travaux et devoirs à préparer |
| `submitted_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Horodatage certifié de soumission |
| `attachment_urls`| `TEXT[]` | `NULL` | Liens des supports déposés sur MinIO |

---

### 2.4. Domaine Évaluations, Notes & Délibérations "Zéro Excel"

#### Table `student_grades` (Notes Individuelles)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant de la note |
| `evaluation_id` | `UUID` | `NOT NULL REFERENCES evaluations(id)` | Évaluation (CC, TP, Examen) |
| `student_id` | `UUID` | `NOT NULL REFERENCES users(id)` | Étudiant noté |
| `score` | `NUMERIC(4,2)` | `NOT NULL CHECK (score >= 0.00 AND score <= 20.00)` | Note chiffrée sur 20.00 |
| `is_absent` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Absence justifiée ou injustifiée |
| `sealed` | `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Note verrouillée post-délibération |

#### Table `module_results` (Résultats Modulaires de Délibération)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant du résultat |
| `deliberation_id` | `UUID` | `NOT NULL REFERENCES deliberations(id)` | Session de délibération rattachée |
| `student_id` | `UUID` | `NOT NULL REFERENCES users(id)` | Étudiant concerné |
| `module_id` | `UUID` | `NOT NULL REFERENCES modules(id)` | Module délibéré |
| `final_score` | `NUMERIC(4,2)` | `NOT NULL CHECK (final_score >= 0.00 AND final_score <= 20.00)` | Moyenne modulaire officielle |
| `status` | `VARCHAR(30)` | `NOT NULL` | `VALIDE`, `VPC`, `AJOURNE_RATTRAPAGE` |
| `has_eliminatory`| `BOOLEAN` | `NOT NULL DEFAULT FALSE` | Flag de note éliminatoire (< 7.00/20) |

---

### 2.5. Domaine Projets PFE & Moteur IA Local

#### Table `theses` (Mémoires de Fin d'Études 5A)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Identifiant du PFE |
| `student_id` | `UUID` | `NOT NULL UNIQUE REFERENCES users(id)` | Étudiant de 5ème année |
| `supervisor_id` | `UUID` | `NOT NULL REFERENCES users(id)` | Encadrant pédagogique EMSI |
| `title` | `VARCHAR(255)` | `NOT NULL` | Titre du projet de fin d'études |
| `abstract_text` | `TEXT` | `NOT NULL` | Résumé technique du mémoire |
| `pdf_storage_url`| `VARCHAR(255)` | `NULL` | Emplacement du rapport PDF sur MinIO |
| `embedding_vector`| `VECTOR(1024)` | `NULL` | Vecteur sémantique généré par Ollama |
| `status` | `VARCHAR(30)` | `NOT NULL DEFAULT 'PROPOSED'` | `PROPOSED`, `APPROVED`, `DEFENSE_SCHEDULED` |

---

### 2.6. Domaine Sécurité & Audit Légal (CNDP / Loi 09-08)

#### Table `audit_logs` (Journal Immuable Append-Only)
| Colonne | Type SQL | Contraintes | Description & Rôle |
| :--- | :--- | :--- | :--- |
| `id` | `BIGSERIAL` | `PRIMARY KEY` | Identifiant séquentiel monotone |
| `performed_at` | `TIMESTAMPTZ` | `NOT NULL DEFAULT NOW()` | Horodatage NTP certifié |
| `performed_by` | `UUID` | `NOT NULL REFERENCES users(id)` | Utilisateur ayant opéré l'action |
| `ip_address` | `INET` | `NOT NULL` | Adresse IP source du client |
| `action_type` | `VARCHAR(50)` | `NOT NULL` | `GRADE_UPDATE`, `DELIB_SEAL`, `PAYMENT` |
| `entity_name` | `VARCHAR(50)` | `NOT NULL` | Nom de la table modifiée |
| `entity_id` | `UUID` | `NOT NULL` | Clé primaire de la ligne affectée |
| `previous_state`| `JSONB` | `NULL` | Données avant modification (Snapshot) |
| `new_state` | `JSONB` | `NULL` | Données après modification (Snapshot) |
| `hmac_signature`| `VARCHAR(128)` | `NOT NULL` | Signature HMAC-SHA256 d'intégrité |

> **Règle de sécurité critique :** L'utilisateur de base de données de l'application Spring Boot ne possède que les privilèges `SELECT` et `INSERT` sur `audit_logs`. Les privilèges `UPDATE` et `DELETE` sont formellement révoqués via `REVOKE UPDATE, DELETE ON audit_logs FROM emsi_app_role;`.
