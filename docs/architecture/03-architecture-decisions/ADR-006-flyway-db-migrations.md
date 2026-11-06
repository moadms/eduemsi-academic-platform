# ADR-006 : Gestion et Versionnement des Évolutions du Schéma de Base de Données (Flyway)

## Statut : ACCEPTÉ
**Date :** 28 Octobre 2026  
**Décideurs :** Équipe d'Ingénierie Logicielle PFA, Pr. ZGANDRI  

---

## 1. Contexte & Problématique
Dans un environnement de gestion académique critique traitant des notes d'examen et des états financiers d'étudiants, le schéma de base de données relationnel ne peut en aucun cas être modifié de manière improvisée ou généré dynamiquement en production via des outils de type `hibernate.ddl-auto=update`.

Deux stratégies industrielles de migration ont été comparées :
1. **Liquibase :** Puissant, basé sur XML/YAML/JSON, mais verbeux et abstrait par rapport aux spécificités de PostgreSQL (triggers, fonctions PL/pgSQL, extensions comme pgvector).
2. **Flyway :** Scripts de migration en pur SQL versionné (`V1__init.sql`, `V2__add_indexes.sql`), simple, direct, transparent et parfaitement intégré au cycle de démarrage de Spring Boot.

## 2. Décision Prise
Nous adoptons **Flyway Community** :
- Toutes les évolutions du schéma PostgreSQL sont écrites sous forme de fichiers SQL bruts stockés dans `src/main/resources/db/migration/`.
- Les scripts sont exécutés séquentiellement et contrôlés par une somme de contrôle (checksum SHA-256) enregistrée dans la table système `flyway_schema_history`.
- Toute modification d'un script déjà exécuté bloque immédiatement le démarrage du serveur pour prévenir toute dérive de schéma (Schema Drift).

## 3. Conséquences
- Déterminisme absolu des déploiements entre environnements de développement, test et production.
- Exploitation native des fonctionnalités avancées de PostgreSQL : contraintes `CHECK`, index partiels, partitionnement et tables d'audit `audit_logs` immuables.
