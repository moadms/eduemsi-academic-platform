---
name: software-architecture
description: Conception et documentation rigoureuse de l'architecture logicielle selon ISO/IEC/IEEE 42010 et le modèle C4.
---

# Skill — Software Architecture

## 1. Raison d'être et Déclencheurs (Purpose & Activation Conditions)
Ce skill définit les principes, styles et patrons d'architecture logicielle applicables au système.
Il garantit la cohérence, la scalabilité, la sécurité et la maintenabilité à long terme à travers des décisions d'architecture motivées (ADR - Architecture Decision Records).

### Conditions d'activation
- Définition ou révision de l'architecture globale (système, conteneurs, composants).
- Arbitrage technologique (frameworks, protocoles, stockage, cache, moteurs de calcul).
- Rédaction du dossier d'architecture système (`docs/architecture/03-system-architecture.md`).

---

## 2. Référentiels et Normes Applicables (Standards & References)
- **ISO/IEC/IEEE 42010:2022** : Systems and software engineering — Architecture description.
- **Le modèle C4 (Context, Containers, Components, Code)** : https://c4model.com/
- **The Twelve-Factor App** : Méthodologie d'ingénierie d'applications modernes résilientes.
- **Patrons d'Architecture** : Clean Architecture, Hexagonal / Ports & Adapters, Modular Monolith, Multi-Tenancy.

---

## 3. Workflow Opérationnel Étape par Étape (Step-by-Step Workflow)
1. **Identification des préoccupations architecturales (Concerns) :** Sécurité, latence, passage à l'échelle, disponibilité, multi-campus, isolation des données.
2. **Évaluation des styles architecturaux :**
   - Comparer objectivement Monolithe Modulaire, Microservices, Hexagonal et Clean Architecture.
   - Ne jamais choisir les microservices par simple réflexe sans justification volumétrique ou organisationnelle.
3. **Cartographie C4 Niveau 1 (System Context) :** Positionner le système au centre, ses utilisateurs humains et les systèmes tiers intégrés.
4. **Cartographie C4 Niveau 2 (Container View) :** Schématiser les conteneurs exécutables (Web SPA, Mobile App, API Gateway, Backend API, Solveur OR-Tools, Serveur IA Ollama, SGBD PostgreSQL, Cache Redis).
5. **Cartographie C4 Niveau 3 (Component View) :** Détailler l'organisation interne du backend (contrôleurs, services métier, ports, adaptateurs, repositories).
6. **Stratégie d'isolation Multi-Tenancy :** Spécifier le mode de cloisonnement des données (discriminant `tenant_id` avec Row-Level Security vs schéma par tenant) pour garantir l'étanchéité inter-campus/établissements.
7. **Politique de résilience et d'observabilité :** Définir gestion des erreurs, transactions ACID, journalisation d'audit et supervision métrique (Prometheus/Grafana).
8. **Rédaction des Architecture Decision Records (ADR) :** Consigner chaque choix structurant dans `docs/architecture/03-architecture-decisions/`.

---

## 4. Format Obligatoire d'un ADR (Architecture Decision Record)
Chaque ADR doit comporter impérativement les sections suivantes :
- **Titre & ID :** `ADR-00X: Titre du choix technologique`
- **Statut :** `PROPOSÉ` | `ACCEPTÉ` | `DÉPRÉCIÉ`
- **Contexte & Problématique :** La situation technique et le besoin métier à résoudre.
- **Options évaluées :** Avantages et inconvénients de chaque alternative étudiée.
- **Décision retenue :** Le choix arrêté avec justification rationnelle.
- **Conséquences & Compromis (Trade-offs) :** Impacts positifs, contraintes induites et mesures compensatoires.

---

## 5. Règles et Pièges à Éviter (Rules & Common Mistakes)
- **RÈGLE 1 :** Ne jamais introduire de microservices distribués prématurés pour une équipe de taille modeste lorsque le monolithe modulaire offre une cohésion optimale.
- **RÈGLE 2 :** Justifier chaque choix par des données contextuelles mesurables (ex. contraintes de transit, souveraineté CNDP, latence réseau).
- **RÈGLE 3 :** Préserver l'indépendance du domaine métier vis-à-vis des frameworks et des détails d'infrastructure.
- **RÈGLE 4 :** Documenter systématiquement les flux de communication réseau et les protocoles sécurisés (TLS 1.3, HTTPS, WebSocket).

---

## 6. Checklist des Livrables et Critères de Validation
- [ ] Document `docs/architecture/03-system-architecture.md` rédigé selon le standard ISO 42010.
- [ ] Registre `docs/architecture/03-architecture-decisions/` contenant les ADRs majeurs.
- [ ] Vues C4 (Contexte, Conteneurs, Composants, Déploiement) fournies.
- [ ] Stratégie de multi-tenancy et d'audit log explicitée.
