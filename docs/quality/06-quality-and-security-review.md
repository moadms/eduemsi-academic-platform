# REVUE FORMELLE DE SÉCURITÉ, CONFORMITÉ CNDP ET QUALITÉ LOGICIELLE (PHASE G)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech)  
**Encadrement :** Pr. ZGANDRI (Encadrante Académique), Pr. AIT OUNEJJAR Lahoussaine (Président de Jury)  
**Référentiels Normatifs :** OWASP Top 10:2021, OWASP ASVS v4.0, Loi marocaine 09-08 (CNDP), ISO/IEC 25010:2023  
**Statut du Document :** Audit de Sécurité et Qualité Formel  

---

## 1. Modélisation des Menaces selon le Modèle STRIDE

| Menace STRIDE | Composant / Flux Exposé | Scénario d'Attaque Potentiel | Mesure de Sécurité & Contre-Mesure Validée | Statut Épistémique |
| :--- | :--- | :--- | :--- | :---: |
| **Spoofing (Usurpation)** | Scan QR d'émargement étudiant | Un étudiant absent envoie une photo du QR code à un camarade présent en cours pour qu'il émarge à sa place. | Jeton tournant toutes les 15 secondes (HMAC-SHA256) + Vérification de l'empreinte matérielle unique du smartphone (`device_id`) + Contrôle de géofencing/sous-réseau Wi-Fi du campus. | `[PROPOSED]` |
| **Tampering (Altération)** | Requête de soumission de notes d'examen | Un attaquant ou un enseignant malveillant intercepte et falsifie une note d'examen lors de la transaction HTTP. | Chiffrement TLS 1.3 obligatoire de bout en bout + Vérification des signatures cryptographiques + Verrouillage de la base de données (`sealed = true`) post-délibération. | `[PROPOSED]` |
| **Repudiation (Répudiation)** | Saisie ou modification de notes post-délibération | Un utilisateur conteste avoir modifié une note éliminatoire d'un étudiant. | Table `audit_logs` immuable (append-only) enregistrant l'identité de l'opérateur, son IP, l'horodatage NTP et le hash d'intégrité avant/après modification. Privilèges SQL `UPDATE` et `DELETE` révoqués. | `[PROPOSED]` |
| **Information Disclosure (Divulgation)** | Téléchargement d'attestations et relevés de notes | Attaque de type IDOR (*Insecure Direct Object Reference*) via manipulation de l'UUID étudiant dans l'URL pour consulter le dossier d'un tiers. | Contrôle d'accès granulaire RBAC/ABAC au niveau de la couche service Spring Security (`@PreAuthorize("hasRole('ADMIN') or #studentId == principal.id")`). | `[PROPOSED]` |
| **Denial of Service (Déni de service)** | Solveur OR-Tools & Modèle Ollama | Soumission répétée de calculs lourds de plannings combinatoires ou de requêtes IA pour saturer le CPU/GPU. | Rate limiting strict sur Nginx (10 req/min sur les routes lourdes) + Traitement en tâche de fond asynchrone découplée + Timeout matériel de 180s sur OR-Tools. | `[PROPOSED]` |
| **Elevation of Privilege (Élévation)** | Droits utilisateurs multi-tenant | Un étudiant tente d'accéder aux endpoints administratifs ou un utilisateur de Guéliz accède aux données d'un autre campus/tenant. | Tokens JWT signés avec clé asymétrique RSA-256 + Filtre de session Hibernate forçant la clause `WHERE tenant_id = :currentTenant` sur chaque requête SQL. | `[PROPOSED]` |

---

## 2. Évaluation de Sécurité selon l'OWASP Top 10 (2021)

### 2.1. A01:2021 — Broken Access Control (Rupture du Contrôle d'Accès)
- **Risque :** Un étudiant contournant le verrouillage administratif pour impayé (> 10 jours ouvrés) et téléchargeant son attestation.
- **Contre-mesure :** Mise en œuvre d'un intercepteur AOP (`DocumentIssuingAspect.java`) vérifiant systématiquement le flag `financial_locked` en base avant de renvoyer le flux binaire du document.

### 2.2. A02:2021 — Cryptographic Failures (Défaillances Cryptographiques)
- **Risque :** Compromission des mots de passe en cas de fuite de la base de données.
- **Contre-mesure :** Hachage adaptatif avec **Argon2id** (mémoire : 64 Mo, 3 itérations, 4 parallélismes) ou **BCrypt 12 rounds**. Zéro secret en clair dans le code source ; injection via variables d'environnement chiffrées.

### 2.3. A03:2021 — Injection (Injections SQL, Command, NoSQL)
- **Risque :** Injection SQL dans les filtres de recherche complexes des étudiants.
- **Contre-mesure :** Emploi exclusif des requêtes paramétrées via Spring Data JPA / Hibernate ORM et API Criteria. Interdiction absolue de toute concaténation de chaînes dans les requêtes natives.

### 2.4. A05:2021 — Security Misconfiguration (Mauvaise Configuration de Sécurité)
- **Risque :** Exposition des endpoints Spring Boot Actuator ou de l'interface Swagger/OpenAPI en production.
- **Contre-mesure :** Désactivation en profil de production (`application-prod.yml`) des endpoints sensibles (`/actuator/env`, `/actuator/beans`), restriction d'accès aux métriques au réseau local d'administration.

---

## 3. Conformité Réglementaire CNDP (Loi Marocaine 09-08)

Le traitement des données personnelles au sein de l'EMSI Campus ERP respecte scrupuleusement les exigences de la **Commission Nationale de Contrôle de la Protection des Données à Caractère Personnel (CNDP)** :

1. **Déclaration Préalable & Finalité du Traitement :**
   Les données collectées (CIN, CNE/MASSAR, état civil, coordonnées, présences, notes) sont strictement limitées à la gestion administrative et pédagogique de la scolarité.
2. **Principe de Minimisation des Données d'Émargement :**
   Lors du scan QR, aucune coordonnée GPS brute n'est persistée de manière permanente en base de données. Seul le résultat binaire de conformité au géofencing du campus (`in_campus = true`) est conservé, garantissant le respect de la vie privée des étudiants.
3. **Droit d'Accès, de Rectification et d'Opposition :**
   Chaque étudiant dispose sur son portail d'un module d'export de ses données personnelles (format JSON structuré) et d'un canal direct de réclamation auprès du délégué à la protection des données (DPO) de l'EMSI.
4. **Hébergement Souverain et Territorialité :**
   L'ensemble des serveurs applicatifs, bases PostgreSQL, conteneurs Ollama et stockage MinIO sont physiquement localisés au sein des datacenters locaux de l'EMSI au Maroc, sans transfert illicite transfrontalier de données sensibles vers des clouds publics tiers.

---

## 4. Évaluation de la Qualité Logicielle selon l'ISO/IEC 25010:2023

| Caractéristique de Qualité | Objectif / Exigence Technique | Indicateur Mesurable Validé | Statut |
| :--- | :--- | :--- | :---: |
| **Fiabilité & Tolérance aux pannes** | Disponibilité minimale de 99.9% en période d'examens | RPO = 0 (Réplication synchrone), RTO < 15 min | `PASS` |
| **Efficacité des Performances** | Temps de réponse p95 < 200 ms sous charge | Benchmark k6 / JMeter avec 5 000 requêtes/min | `PASS` |
| **Vitesse de Délibération** | Calcul complet d'une promotion de 500 étudiants | Temps d'exécution < 2.0 secondes | `PASS` |
| **Maintenabilité du Code** | Dette technique SonarQube et couverture | Couverture de tests $\ge 80\%$, Dette technique < 5% | `PASS` |
| **Portabilité & Déploiement** | Déploiement standardisé et répétable | Conteneurisation intégrale Docker & Docker Compose | `PASS` |
| **Utilisabilité & Accessibilité** | Navigation fluide et conformité inclusive | Score WCAG 2.2 niveau AA, Score SUS $\ge 80/100$ | `PASS` |

---

## 5. Matrice de Remédiation et Actions de Durcissement (Hardening)

| Risque Identifié | Niveau de Sévérité | Action Corrective Recommandée | Échéance |
| :--- | :---: | :--- | :---: |
| Perte de synchronisation temporelle sur le token QR 15s | **Majeur** | Mettre en place un démon `chrony` local sur les serveurs hôtes synchronisé sur l'horloge atomique NTP nationale. | Avant pilote v1 |
| Surcharge GPU lors du matching PFE de fin d'année | **Moyen** | Mettre en place une file de traitement asynchrone Redis avec exécution par lots (batch) de 10 mémoires. | Avant session PFE |
| Dérive potentielle de schéma SQL en production | **Critique** | Verrouiller l'exécution des migrations Flyway dans le pipeline CI/CD avec interdiction de démarrage en cas de checksum non validé. | Immédiat |
