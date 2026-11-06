---
name: uml-modeling
description: Méthodologie formelle de modélisation UML 2.5.1 avec génération de diagrammes PlantUML exploitables et conformes.
---

# Skill — UML Modeling

## 1. Raison d'être et Déclencheurs (Purpose & Activation Conditions)
Ce skill régit la modélisation conceptuelle, structurelle et comportementale du système logiciel en utilisant la norme internationale OMG UML 2.5.1.
Il produit des diagrammes PlantUML (`.puml`) précis, lisibles, sans redondance inutile, répondant à une question d'ingénierie ciblée.

### Conditions d'activation
- Conception formelle suite à la spécification des exigences (`UC-XXX`, `FR-XXX`).
- Documentation des scénarios d'interaction, flux d'activité, cycle de vie des entités et architecture des composants.
- Préparation de l'implémentation frontend, backend et bases de données.

---

## 2. Référentiels et Normes Applicables (Standards & References)
- **OMG Unified Modeling Language (OMG UML) Specification v2.5.1** : https://www.omg.org/spec/UML/2.5.1
- **PlantUML Language Reference Guide** : https://plantuml.com/
- **Clean Architecture & Domain-Driven Design (DDD)** : Séparation claire entre modèle de domaine et persistance.

---

## 3. Workflow Opérationnel Étape par Étape (Step-by-Step Workflow)
1. **Définition de la question d'analyse :** Identifier le besoin de modélisation avant de sélectionner le type de diagramme.
2. **Choix du sous-ensemble minimal complet :** Sélectionner uniquement les diagrammes apportant une valeur probante (pas de diagramme "gadget").
3. **Rédaction du code source PlantUML (`.puml`) :**
   - Appliquer une convention de nommage claire et des stéréotypes appropriés (`<<entity>>`, `<<service>>`, `<<boundary>>`, etc.).
   - Utiliser des thèmes lisibles et des styles épurés.
4. **Validation syntaxique et sémantique :**
   - Vérifier la validité des relations (héritage, réalisation, association, dépendance, agrégation, composition).
   - Bannir les compositions abusives servant de simples pointeurs de référence.
5. **Génération / Rendu des artefacts :** Exporter ou référencer le rendu graphique (SVG/PNG) lorsque les outils sont présents.
6. **Documentation du modèle :** Expliquer pour chaque diagramme son périmètre, ses hypothèses et sa correspondance avec les exigences.

---

## 4. Règles Spécifiques par Type de Diagramme (OMG UML 2.5.1)

### A. Diagrammes de Cas d'Utilisation (Use Case)
- Placer une frontière de système explicite (`rectangle System { ... }`).
- Placer tous les acteurs en dehors de la frontière.
- Nommer les use cases avec des verbes à l'infinitif précis (ex. `Consigner séance`, `Saisir notes d'examen`).
- Utiliser `<<include>>` pour une étape obligatoire indispensable à l'exécution.
- Utiliser `<<extend>>` uniquement pour une extension conditionnelle/optionnelle assortie d'un point d'extension documenté.
- Ne jamais modéliser de simples boutons d'interface utilisateur en tant que Use Cases.

### B. Diagrammes de Classes (Class Diagram)
- Distinguer clairement les classes de domaine, services, contrôleurs, référentiels (`Repositories`) et DTOs.
- Indiquer systématiquement la visibilité (`+`, `-`, `#`), les attributs typés et les méthodes signatures.
- Définir les multiplicités explicites (`1`, `0..1`, `1..*`, `*`).
- Respecter la sémantique de composition : la partie disparaît avec le tout (ex. Éléments de module et Module, Lignes de PV et PV).
- Garder le modèle objet de domaine indépendant du schéma physique de la base de données.

### C. Diagrammes de Séquence (Sequence Diagram)
- Représenter fidèlement la chronologie de haut en bas avec des lignes de vie (`Lifelines`) typées.
- Utiliser des fragments combinés conformes : `alt` (alternative), `opt` (optionnel), `loop` (boucle), `par` (parallèle).
- Modéliser les flux nominaux, les validations d'accès et les cas d'erreur explicites.
- Ne pas inventer d'endpoints ou de méthodes fantômes.

### D. Diagrammes d'Activité (Activity Diagram)
- Utiliser un nœud initial unique et des nœuds terminaux explicites.
- Étiqueter impérativement toutes les branches décisionnelles (`[valide]`, `[invalide]`).
- Utiliser des couloirs de responsabilités (`Swimlanes`) lorsque plusieurs acteurs ou services coopèrent.

### E. Diagrammes d'États-Transitions (State Machine)
- Modéliser le cycle de vie complet des entités à états sensibles (ex. `Séance`, `Attestation`, `Projet PFE`, `Délibération`).
- Spécifier événement déclencheur, garde `[condition]` et action `/ effet`.
- Documenter formellement les transitions interdites.

### F. Diagrammes de Composants & Déploiement
- Représenter les dépendances d'assemblage et les interfaces fournies/requises.
- Schématiser les nœuds d'exécution réels (conteneurs Docker, passerelles, bases de données, runtimes).

---

## 5. Structure Arborescente Obligatoire
```text
docs/uml/
├── README.md
├── use-cases/
├── class-diagrams/
├── sequence-diagrams/
├── activity-diagrams/
├── state-diagrams/
├── component-diagrams/
├── deployment-diagrams/
└── package-diagrams/
```

---

## 6. Checklist de Validation
- [ ] Chaque fichier `.puml` débute par `@startuml` et se termine par `@enduml`.
- [ ] Aucun Use Case ne représente un simple bouton d'écran.
- [ ] Toutes les relations de classes respectent la sémantique UML (multiplicités, types de flèches).
- [ ] Les diagrammes de séquence illustrent les scénarios alternatifs et d'erreur (`alt`).
- [ ] Les états-transitions identifient les états terminaux et les transitions illégales.
