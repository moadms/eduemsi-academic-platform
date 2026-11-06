# RÉFÉRENTIEL DES RÈGLES MÉTIER ET INVARIANTS (PHASE B)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech)  
**Encadrement :** Pr. ZGANDRI | **Jury :** Pr. AIT OUNEJJAR Lahoussaine  
**Statut :** Normatif — Spécification Formelle des Invariants  

---

## 1. Typologie et Structure des Règles Métier

Chaque règle métier est formalisée selon la structure rigoureuse suivante :
- **Identifiant Stable :** `BR-DOM-NN` (e.g. `BR-GEO-01`, `BR-DELIB-04`)
- **Énoncé Formel :** Description déclarative sans ambiguïté.
- **Formulation Mathématique / Logique :** Invariant formel.
- **Point d'Exécution & Mécanisme :** (Entité JPA, Service applicatif, Trigger DB, Contrainte OR-Tools).
- **Conséquence & Gestion des Exceptions :** Action déclenchée en cas de violation.

---

## 2. Catalogue Exhaustif des Règles Métier (BR)

### BR-GEO-01 : Battement Incompressible de Transit Inter-Campus
- **Domaine :** Planification & Logistique
- **Énoncé :** Tout enseignant ou groupe d'étudiants ayant deux séances successives sur des campus physiques distincts (Guéliz et Targa) doit obligatoirement bénéficier d'un intervalle de temps libre supérieur ou égal à 45 minutes.
- **Invariant Logique :**
  $$\forall s_1, s_2 \in \text{Séances}, (\text{enseignant}(s_1) = \text{enseignant}(s_2) \land \text{campus}(s_1) \ne \text{campus}(s_2) \land s_1.\text{fin} \le s_2.\text{début}) \implies (s_2.\text{début} - s_1.\text{fin} \ge 45\text{ minutes})$$
- **Point d'Exécution :** Modèle de contraintes linéaires du solveur Google OR-Tools (CP-SAT) + Validation pré-enregistrement dans `ScheduleService.java`.
- **Exception :** Levée d'une `TransitViolationException` ; le créneau en conflit est rejeté avec proposition de créneaux alternatifs.

---

### BR-ATT-02 : Éphémérité et Révocation des Jetons d'Émargement QR
- **Domaine :** Assiduité & Sécurité
- **Énoncé :** Un jeton d'émargement projeté n'est valide que pendant une fenêtre maximale de 15 secondes à compter de sa génération. Il ne peut être consommé qu'une seule fois par un étudiant et par un terminal mobile donné.
- **Invariant Logique :**
  $$t_{\text{scan}} \in [t_{\text{génération}}, t_{\text{génération}} + 15\text{s}] \quad \land \quad \text{HMAC}_{SHA256}(\text{payload}, K_{\text{session}}) = \text{signature}$$
- **Point d'Exécution :** `AttendanceService.java` adossé à un cache Redis avec expiration TTL de 18 secondes (incluant 3 secondes de dérive réseau autorisée) et verrou distribué `Redisson`.
- **Exception :** Rejet immédiat avec message d'erreur `EXPIRED_QR_TOKEN` ou `DUPLICATE_DEVICE_SUBMISSION`.

---

### BR-ATT-03 : Quota d'Absences et Sanction de Non-Admissibilité
- **Domaine :** Scolarité & Contrôle Continu
- **Énoncé :** Si le taux d'absences non justifiées d'un étudiant dans un élément constitutif dépasse 20% du volume horaire total semestriel, l'étudiant est automatiquement déclaré non admissible (NA) à l'examen final de la session ordinaire pour cet élément.
- **Invariant Logique :**
  $$\left(\frac{\text{Heures Absence Non Justifiée}}{\text{Volume Total Heures Element}}\right) > 0.20 \implies \text{StatutAdmissibilité} = \text{NON\_ADMISSIBLE}$$
- **Point d'Exécution :** Événement asynchrone Spring Boot déclenché après chaque clôture de séance ; mise à jour du statut d'admissibilité dans l'inscription de l'étudiant.
- **Exception :** Dépôt d'un justificatif validé par le service de scolarité dans un délai maximal de 48 heures ouvrées post-absence, ramenant les heures en absence justifiée.

---

### BR-DELIB-04 : Seuil Éliminatoire à l'Examen Final
- **Domaine :** Examens & Délibérations
- **Énoncé :** Toute note strictement inférieure à 7.00 sur 20.00 obtenue à l'examen final d'un élément constitutif constitue une note éliminatoire entraînant l'ajournement immédiat de l'élément et du module concerné en session de rattrapage, nonobstant une moyenne arithmétique globale qui serait supérieure ou égale à 10.00/20.00.
- **Invariant Logique :**
  $$\exists e \in \text{Éléments}(M) \mid \text{NoteExamFinal}(e) < 7.00 \implies \text{Statut}(M) = \text{AJOURNE\_RATTRAPAGE} \land \text{Validation}(M) = \text{FALSE}$$
- **Point d'Exécution :** Moteur de calcul de délibération `DeliberationEngine.java` et contrainte déclarative de cohérence.
- **Exception :** Aucune dérogation logicielle autorisée. Seule une décision souveraine du jury d'appel consignée dans le PV signé avec mention explicite peut accorder une dispense exceptionnelle.

---

### BR-DELIB-05 : Barème de Validation des Modules et Compensation
- **Domaine :** Examens & Délibérations
- **Énoncé :** Un module est validé avec mention "V" si sa moyenne pondérée est $\ge 12.00/20$ sans note éliminatoire. Il est validé par compensation "VPC" si sa moyenne est comprise entre $10.00$ et $11.99/20$ sans note éliminatoire, sous réserve que la moyenne semestrielle globale soit $\ge 10.00/20$. En-dessous de $10.00/20$, le module est ajourné ("NV").
- **Point d'Exécution :** `DeliberationEngine.java`.
- **Exception :** Les modules dits "fondamentaux majeurs" (PFE, Projet Majeur de 5A) sont exclus du mécanisme de compensation et requièrent obligatoirement une moyenne $\ge 12.00/20$.

---

### BR-NOT-06 : Clôture et Notification du Cahier de Texte
- **Domaine :** Pédagogie & Assiduité
- **Énoncé :** L'enseignant est dans l'obligation de renseigner le cahier de texte d'une séance dans un délai maximal de 24 heures suivant la fin du cours. Au-delà de 24 heures, la séance est marquée en anomalie pédagogique et une alerte est transmise au Chef de Département.
- **Point d'Exécution :** Tâche planifiée (`@Scheduled`) Spring Boot s'exécutant toutes les heures.
- **Exception :** En cas d'annulation formelle préalable de la séance validée par l'administration.

---

### BR-PFE-07 : Neutralité et Indépendance des Membres du Jury
- **Domaine :** Projets de Fin d'Études (PFE)
- **Énoncé :** L'enseignant-chercheur ayant assuré le rôle d'encadrant académique ou de tuteur pédagogique d'un étudiant pour son PFE ne peut en aucun cas occuper la fonction de Président du jury ni de Rapporteur officiel pour la soutenance dudit étudiant.
- **Invariant Logique :**
  $$\text{Jury}.\text{Président} \ne \text{EncadrantPédagogique} \quad \land \quad \text{Jury}.\text{Rapporteur} \ne \text{EncadrantPédagogique}$$
- **Point d'Exécution :** Algorithme de composition automatique des jurys et contrôle de cohérence à la création du jury (`ThesisDefenseService.java`).
- **Exception :** Rejet bloquant lors de l'enregistrement de la commission de soutenance.

---

### BR-PFE-08 : Seuil de Similarité IA et Confidentialité Locale
- **Domaine :** Projets de Fin d'Études & Intelligence Artificielle
- **Énoncé :** La recommandation automatique d'un rapporteur de PFE par intelligence artificielle s'appuie sur une similarité cosinus minimale de 0.70 entre les vecteurs de compétences du professeur et le résumé du mémoire. Tout traitement d'embedding et d'analyse textuelle doit s'effectuer exclusivement sur l'infrastructure souveraine locale (Ollama sur serveur du campus) sans transmission vers un fournisseur cloud tiers.
- **Invariant Logique :**
  $$\text{CosineSimilarity}(\vec{V}_{\text{PFE}}, \vec{V}_{\text{Enseignant}}) \ge 0.70 \quad \land \quad \text{Endpoint}_{\text{AI}} \in \text{Localhost} \cup \text{IntranetEMSI}$$
- **Point d'Exécution :** Service d'intégration `LocalOllamaClient.java`.

---

### BR-FIN-09 : Blocage Administratif pour Créance Échue
- **Domaine :** Administration & Recouvrement
- **Énoncé :** Si le compte d'un étudiant présente une dette échue non réglée dont l'ancienneté dépasse 10 jours ouvrés par rapport à l'échéancier contractuel, le système suspend automatiquement la délivrance des documents officiels (attestations de scolarité, relevés de notes officiels, conventions de stage).
- **Point d'Exécution :** `DocumentIssuingAspect.java` (AOP Spring interceptant les téléchargements de documents).
- **Exception :** Accord explicite d'un moratoire ou d'un échéancier exceptionnel validé en console par la Direction Financière (`ROLE_FINANCE`).

---

### BR-FIN-10 : Immuabilité des Écritures de Paiement
- **Domaine :** Comptabilité & Finance
- **Énoncé :** Tout enregistrement de paiement validé (reçu émis) est strictement immuable. En cas d'erreur de saisie ou de chèque impayé, l'écriture ne peut pas être supprimée : elle fait l'objet d'une contre-passation (écriture d'annulation / avoir) avec traçabilité intégrale.
- **Point d'Exécution :** Contrainte SQL (absence de privilège `DELETE` sur la table `payments`), validation dans `PaymentService.java`.

---

### BR-SEC-11 : Journalisation Immuable des Données Sensibles (Loi 09-08)
- **Domaine :** Sécurité, Audit & Conformité CNDP
- **Énoncé :** Toute opération de création, mise à jour ou suppression portant sur des notes d'examen, des statuts financiers ou des droits utilisateurs doit donner lieu à une écriture append-only dans la table `audit_logs` contenant l'ID de l'opérateur, son adresse IP, l'horodatage synchronisé NTP, l'état avant modification, l'état après modification et un hash cryptographique garantissant l'intégrité de la chaîne de logs.
- **Point d'Exécution :** Listener d'audit Hibernate `PostUpdateEventListener` & `PostInsertEventListener`.

---

### BR-SEC-12 : Cloisonnement Multi-Tenant Étanche
- **Domaine :** Architecture Logicielle
- **Énoncé :** Aucune transaction, lecture ou écriture ne peut accéder à des données appartenant à un autre établissement ou filiale sans autorisation inter-tenant explicite. Chaque entité persistée en base doit être rattachée à un `tenant_id` validé lors de la session.
- **Point d'Exécution :** Filtre de session Hibernate `@FilterDef(name = "tenantFilter")` activé automatiquement sur la connexion JDBC à partir du contexte de sécurité Spring Security.

---

### BR-PLAN-13 : Respect des Capacités Physiques des Salles
- **Domaine :** Logistique & Hygiène/Sécurité
- **Énoncé :** Le nombre d'étudiants inscrits dans un groupe assigné à une séance ne doit jamais excéder la capacité maximale autorisée de la salle de cours ou du laboratoire assigné.
- **Invariant Logique :**
  $$\text{Effectif}(\text{Groupe}) \le \text{CapacitéMax}(\text{Salle})$$
- **Point d'Exécution :** Contrainte stricte intégrée dans le modèle OR-Tools CP-SAT.

---

### BR-SCOL-14 : Unicité du Numéro National Étudiant (CNE / MASSAR)
- **Domaine :** Scolarité & Admissions
- **Énoncé :** Un numéro CNE/MASSAR ou un numéro CIN ne peut être associé qu'à un seul et unique dossier étudiant au sein de l'ensemble des campus du réseau EMSI.
- **Point d'Exécution :** Index unique d'intégrité relationnelle en base de données PostgreSQL (`CREATE UNIQUE INDEX idx_students_massar ON students(cne_massar)`).

---

### BR-NOT-15 : Délai Légal de Recours et Publication des Notes
- **Domaine :** Examens & Pédagogie
- **Énoncé :** À compter de la publication officielle des notes sur le portail étudiant, une période de recours de 72 heures ouvrées est ouverte pour toute demande de vérification matérielle de copie. Passé ce délai, les notes sont scellées définitivement et ne peuvent être modifiées que sur ordonnance de la Direction des Études.
- **Point d'Exécution :** `GradeAppealService.java`.
