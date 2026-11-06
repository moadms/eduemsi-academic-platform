---
name: project-context-audit
description: Méthodologie d'audit forensique du contexte, de l'état actuel et de l'architecture d'un projet logiciel avant toute modification.
---

# Skill — Project Context Audit

## 1. Raison d'être et Déclencheurs (Purpose & Activation Conditions)
Ce skill s'active obligatoirement au démarrage de tout projet, phase de cadrage ou avant toute refonte/évolution majeure.
Sa mission est de comprendre l'existant réel du dépôt (code, modèles, configurations, documentation, historique) sans inventer ni supposer, afin d'établir un diagnostic factuel et traçable.

### Conditions d'activation
- Découverte initiale d'un espace de travail ou d'une nouvelle tâche.
- Écarts constatés entre la documentation existante et l'implémentation effective.
- Préparation d'une phase de modélisation UML, d'architecture ou de conception de base de données.

---

## 2. Référentiels et Normes Applicables (Standards & References)
- **ISO/IEC/IEEE 42010:2022** : Description de l'architecture logicielle et des systèmes.
- **IEEE 830 / ISO/IEC/IEEE 29148:2018** : Ingénierie des exigences et analyse du contexte opérationnel.
- **Principes de Traçabilité CMMI** : Gestion de la preuve et vérification des sources.

---

## 3. Workflow Opérationnel Étape par Étape (Step-by-Step Workflow)
1. **Inspection structurelle du dépôt :** Lister les répertoires, fichiers de métadonnées, manifestes de dépendances et configurations racines.
2. **Revue documentaire existante :** Analyser les README, spécifications, cahiers des charges et rapports de session préalables.
3. **Identification de la stack réelle :** Examiner les points d'entrée, runtimes, bibliothèques, dépendances (pom.xml, package.json, pubspec.yaml, etc.) et conteneurs (Dockerfile, docker-compose).
4. **Inventaire du domaine métier :** Identifier les modules, rôles utilisateurs, flux métier, règles de gestion et contraintes opérationnelles documentées ou codées.
5. **Inventaire de persistance :** Examiner les entités, scripts de migration (Flyway, Liquibase, SQL), schémas et relations.
6. **Comparaison Documenté vs Implémenté :** Confronter les promesses fonctionnelles des spécifications avec la réalité du code présent.
7. **Identification des dettes et risques :** Détecter la dette technique, les zones d'ombre, les dépendances critiques et les risques de conformité (ex. RGPD, CNDP).
8. **Classification épistémique des preuves :** Assigner à chaque observation un statut rigoureux :
   - `VERIFIED` : Preuve directe dans le code, la base ou le document validé.
   - `INFERRED` : Déduction logique étayée par un faisceau d'indices concrets.
   - `UNKNOWN` : Information manquante ou inaccessible.
   - `PROPOSED` : Recommandation architecturale pour la cible future.
9. **Production du rapport d'audit forensique :** Rédiger `docs/analysis/01-project-audit.md` avec chemins de fichiers et symboles cités.

---

## 4. Règles et Pièges à Éviter (Rules & Common Mistakes)
- **RÈGLE 1 :** Ne jamais inventer une fonctionnalité, un composant ou une décision métier absente du dépôt.
- **RÈGLE 2 :** Ne jamais exposer de secrets (mots de passe, clés d'API, tokens JWT réels).
- **RÈGLE 3 :** Ne jamais supprimer ni écraser un fichier existant sans validation explicite.
- **RÈGLE 4 :** Ne jamais considérer un nom de fichier comme une preuve d'implémentation opérationnelle.
- **RÈGLE 5 :** Ne jamais confondre l'état actuel (`As-Is`) avec la cible architecturale (`To-Be`).

---

## 5. Gestion des Informations Manquantes et Hypothèses
- Lorsqu'une information technique ou métier est indisponible, consigner explicitement le statut `UNKNOWN`.
- Formuler une hypothèse technique justifiable marquée `HYPOTHÈSE PROPOSÉE`, assortie de son impact et de sa procédure de validation auprès des parties prenantes.

---

## 6. Checklist des Livrables et Critères de Validation
- [ ] Rapport `docs/analysis/01-project-audit.md` généré et complet.
- [ ] Cartographie de la stack réelle et des versions identifiée.
- [ ] Inventaire complet des modules et des rôles utilisateurs.
- [ ] Traçabilité prouvée par des chemins de fichiers et des symboles de code.
- [ ] Statuts de classification épistémique (`VERIFIED`, `INFERRED`, `UNKNOWN`, `PROPOSED`) rigoureusement appliqués.
