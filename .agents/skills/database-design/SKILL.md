---
name: database-design
description: Méthodologie formelle de conception, normalisation et modélisation de base de données relationnelle et multi-tenant.
---

# Skill — Database Design

## 1. Raison d'être et Déclencheurs (Purpose & Activation Conditions)
Ce skill régit la conception du modèle conceptuel, logique et physique de données garantissant l'intégrité référentielle, la cohérence transactionnelle ACID et les performances sous forte charge.

### Conditions d'activation
- Conception initiale ou refonte du schéma de données.
- Modélisation Entité-Association (MCD / MLD / MPD).
- Écriture ou revue des scripts de migration (Flyway / Liquibase / SQL).

---

## 2. Référentiels et Normes Applicables (Standards & References)
- **Formes Normales de Codd (1NF, 2NF, 3NF, BCNF)** : Élimination des anomalies de redondance et de mise à jour.
- **Norme SQL ANSI / PostgreSQL 16 standard** : Typage, contraintes d'intégrité, indexation, partitionnement.
- **Principe d'isolation Multi-Tenant** : Cloisonnement strict des données via colonne discriminante `tenant_id` ou schémas dédiés.

---

## 3. Workflow Opérationnel Étape par Étape (Step-by-Step Workflow)
1. **Recensement des entités et attributs :** Déduire les entités à partir des règles métier (`BR-XXX`) et des exigences fonctionnelles (`FR-XXX`).
2. **Modèle Conceptuel de Données (MCD) :**
   - Identifier les entités, identifiants naturels ou techniques, associations et cardinalités (`0..1`, `1..1`, `0..*`, `1..*`).
3. **Modèle Logique de Données (MLD) :**
   - Appliquer les règles de dérivation relationnelle (traduction des relations N:M en tables d'association).
   - Vérifier la conformité en 3e Forme Normale (3NF).
4. **Modèle Physique de Données (MPD) :**
   - Choisir les types de données précis adaptés au SGBD cible (ex. `BIGSERIAL`, `VARCHAR(n)`, `TIMESTAMPTZ`, `DECIMAL(5,2)`, `JSONB`).
   - Définir clés primaires (`PRIMARY KEY`), clés étrangères (`FOREIGN KEY`), contraintes d'unicité (`UNIQUE`), non-nullité (`NOT NULL`) et contraintes de contrôle (`CHECK`).
5. **Stratégie d'indexation ciblée :**
   - Indexer systématiquement les clés étrangères et la colonne `tenant_id`.
   - Indexer les champs fréquemment filtrés ou triés (ex. `(tenant_id, session_date)`, `(student_id, module_id)`).
6. **Journalisation et Piste d'Audit :**
   - Intégrer les colonnes d'audit système (`created_at`, `updated_at`, `created_by`, `updated_by`).
   - Concevoir une table d'audit immuable (`audit_logs`) pour tracer les modifications sensibles (notes, présences, délibérations).
7. **Production de la documentation :**
   - Rédiger `docs/database/04-data-model.md` incluant le dictionnaire de données complet.
   - Fournir les diagrammes PlantUML ERD dans `docs/database/erd/`.

---

## 4. Règles et Pièges à Éviter (Rules & Common Mistakes)
- **RÈGLE 1 :** Ne jamais confondre un diagramme de classes UML (qui modélise le comportement logiciel) avec un diagramme ERD (qui modélise les données persistées).
- **RÈGLE 2 :** Ne jamais exécuter d'ordre SQL destructif (`DROP TABLE`, `TRUNCATE`) sans sauvegarde préalable et validation formelle.
- **RÈGLE 3 :** Bannir les identifiants métier volatils comme clés primaires : privilégier les clés de substitution synthétiques (`BIGSERIAL` ou `UUID`).
- **RÈGLE 4 :** Toute note doit être stockée avec une précision décimale exacte (`DECIMAL(4,2)` ou `NUMERIC(4,2)`), jamais en `FLOAT` imprécis.
- **RÈGLE 5 :** Vérifier que toute requête applicative filtre impérativement par `tenant_id` pour empêcher toute fuite de données inter-campus.

---

## 5. Checklist des Livrables et Critères de Validation
- [ ] Document `docs/database/04-data-model.md` rédigé avec dictionnaire de données.
- [ ] Diagramme PlantUML ERD complet dans `docs/database/erd/`.
- [ ] 3e Forme Normale (3NF) respectée sur l'ensemble des tables transactionnelles.
- [ ] Contraintes `NOT NULL`, `CHECK`, `FOREIGN KEY` et `UNIQUE` rigoureusement définies.
- [ ] Stratégie d'indexation justifiée par les profils de requêtes.
