# ADR-001 : Choix d'un Monolithe Modulaire (Modular Monolith) vs Microservices

## Statut : ACCEPTÉ
**Date :** 28 Octobre 2026  
**Décideurs :** Équipe d'Ingénierie Logicielle PFA, Pr. ZGANDRI  
**Référentiel :** Skill `software-architecture`  

---

## 1. Contexte & Problématique
Le projet EMSI Campus ERP requiert une forte cohésion fonctionnelle entre la planification, l'assiduité, les notes, les délibérations et la facturation. L'équipe a évalué deux approches majeures :
1. Une architecture en **Microservices distribués** (services autonomes avec bases séparées, bus d'événements Kafka).
2. Une architecture en **Monolithe Modulaire (Modular Monolith)** reposant sur Java 21 / Spring Boot 3.3 avec des modules strictement cloisonnés par packages et transactions locales ACID.

## 2. Facteurs de Décision & Contraintes
- **Complexité opérationnelle :** Déploiement on-premise sur les infrastructures physiques des campus de l'EMSI (Guéliz et Targa). Les équipes d'exploitation locales ne disposent pas d'un cluster Kubernetes managé lourd.
- **Cohérence transactionnelle forte :** Le calcul de délibération et le verrouillage des notes exigent des transactions ACID strictes. Les sagas distribuées et la cohérence éventuelle (Eventual Consistency) introduiraient un risque majeur d'incohérence des moyennes de diplôme.
- **Latence inter-composants :** L'émargement de 300 étudiants en simultané à la sonnerie du cours exige des temps de traitement inférieurs à 50 ms sans latence réseau RPC entre services.

## 3. Décision Prise
Nous adoptons l'architecture **Monolithe Modulaire** :
- Le backend est packagé sous la forme d'un livrable unique Spring Boot, structuré en modules métier indépendants (`auth`, `curriculum`, `schedule`, `attendance`, `grading`, `thesis`, `finance`).
- Les modules communiquent via des interfaces Java déclaratives (Inversion de contrôle Spring) et des événements applicatifs in-process (`ApplicationEventPublisher`).
- Les composants très spécialisés et asynchrones (Solveur OR-Tools et Moteur Ollama) sont les deux seuls micro-workers externalisés via HTTP/gRPC.

## 4. Conséquences
- **Positives :**
  - Transactions de délibération 100% ACID avec rollback immédiat en cas d'erreur.
  - Déploiement ultra-simple via un fichier `docker-compose.yml` unique.
  - Performance maximale en mémoire sans surcharge réseau de sérialisation JSON/RPC.
- **Négatives :**
  - Nécessite une discipline stricte d'ingénierie (contrôlée par des tests ArchUnit) pour interdire tout couplage illicite entre modules.
