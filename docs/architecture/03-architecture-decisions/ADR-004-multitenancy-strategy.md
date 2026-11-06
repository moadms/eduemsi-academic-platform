# ADR-004 : Stratégie Multi-Tenant et Modèle d'Isolation des Données

## Statut : ACCEPTÉ
**Date :** 28 Octobre 2026  
**Décideurs :** Équipe d'Ingénierie Logicielle PFA, Pr. ZGANDRI  

---

## 1. Contexte & Problématique
L'application doit dans un premier temps gérer les campus de l'EMSI Marrakech (Guéliz et Targa), puis s'étendre aux campus de Casablanca, Rabat, Fès, Tanger, tout en prévoyant une trajectoire vers un SaaS commercialisable pour d'autres écoles d'ingénieurs privées.

Trois modèles d'architecture multi-tenant étaient envisageables :
1. **Base de données par tenant (Database-per-tenant) :** Isolation physique totale, mais coût d'infrastructure et complexité de migration démesurés pour des dizaines d'écoles.
2. **Schéma par tenant (Schema-per-tenant) :** Isolation intermédiaire, complexité accrue de gestion des migrations Flyway multi-schémas.
3. **Schéma partagé avec colonne discriminateur (`tenant_id`) et intercepteurs de filtrage automatique (Shared-database with tenant discriminator) :** Coût minimal, mutualisation des ressources, simplicité de reporting global réseau.

## 2. Décision Prise
Nous retenons le modèle **Schéma partagé avec discriminateur `tenant_id` et clé hiérarchique de campus (`campus_id`)** :
- Chaque table transactionnelle contient une clé étrangère indexée `tenant_id` (UUID).
- Pour les campus physiques d'une même institution (e.g. EMSI), la table `campuses` permet un sous-cloisonnement fin.
- L'isolation est garantie au niveau applicatif via un filtre Hibernate dynamique (`@Filter(name = "tenantFilter")`) injecté automatiquement à chaque requête depuis le token JWT de l'utilisateur.

## 3. Conséquences
- **Sécurité :** L'oubli d'un filtre dans une requête native SQL représenterait un risque. Mesure de mitigation : audit automatisé des requêtes par un test unitaire scannant tous les repositories JPA.
- **Performance :** L'indexation composite `(tenant_id, id)` sur toutes les tables garantit que le moteur de recherche PostgreSQL partitionne logiquement les lectures de manière ultra-rapide.
