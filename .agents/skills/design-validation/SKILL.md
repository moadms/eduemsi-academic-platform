---
name: design-validation
description: Validation croisée formelle de la cohérence, complétude, traçabilité bidirectionnelle et robustesse factuelle de l'ensemble des artefacts d'ingénierie logicielle (spécifications, modèles UML, architecture C4, schéma de données, maquettes UI/UX et revues qualité).
---

# Skill: design-validation

## 1. Raison d'être & Conditions d'Activation
Ce skill intervient en phase finale de conception ou lors des jalons de révision majeure. Il a pour mandat d'agir en auditeur indépendant et impitoyable afin de vérifier que la conception logicielle forme un tout cohérent, traçable et sans ambiguïté :
- Aucun besoin fonctionnel (FR) ne doit être orphelin de cas d'utilisation (UC), d'entité de domaine ou de test d'acceptation (AC).
- Aucune règle métier (BR) ne doit contredire le modèle de données relationnel ou la machine à états finis.
- Aucun composant architectural ne doit violer les dépendances autorisées de l'architecture propre (Clean / Hexagonal Architecture).
- La distinction épistémique entre les faits avérés (`VERIFIED`), les déductions (`INFERRED`), les inconnues (`UNKNOWN`) et les propositions (`PROPOSED`) doit être strictement respectée.

## 2. Démarche Méthodologique & Workflow

```
[1. Recensement des Identifiants Stables (FR, NFR, BR, UC, ADR, SCR)]
                              │
                              ▼
[2. Vérification de la Traçabilité Bidirectionnelle (Forward & Backward)]
                              │
                              ▼
[3. Contrôle de Cohérence Croisée (Cross-Artifact Consistency)]
                              │
                              ▼
[4. Détection des Anomalies, Conflits et Orphelins]
                              │
                              ▼
[5. Évaluation de la Faisabilité Technique & Opérationnelle]
                              │
                              ▼
[6. Émission du Rapport de Validation Formelle & Verdict]
```

### Étape 1 : Indexation des Identifiants Référentiels
Vérifier l'unicité et le formatage standardisé des identifiants :
- Exigences Fonctionnelles : `FR-001` à `FR-020+`
- Exigences Non Fonctionnelles : `NFR-001` à `NFR-010+`
- Règles Métier & Invariants : `BR-001` à `BR-015+`
- Cas d'Utilisation : `UC-001` à `UC-010+`
- Critères d'Acceptation : `AC-001` à `AC-020+`
- Décisions d'Architecture : `ADR-001` à `ADR-006+`
- Écrans & Vues IHM : `SCR-001` à `SCR-015+`

### Étape 2 : Matrice de Traçabilité Bidirectionnelle
- **Traçabilité Amont -> Aval (Forward) :**
  Pour chaque exigence fonctionnelle $FR_i$, vérifier qu'il existe :
  - Au moins un cas d'utilisation $UC_j$ correspondant.
  - Au moins une entité ou méthode dans le diagramme de classes.
  - Au moins une table relationnelle dans le schéma de données.
  - Au moins un écran / composant d'interface utilisateur ($SCR_k$).
  - Au moins un test d'acceptation $AC_m$.
- **Traçabilité Aval -> Amont (Backward) :**
  Pour chaque table, écran ou endpoint d'API, vérifier qu'il répond directement à une exigence métier ou technique justifiée (interdiction du code mort ou de l'over-engineering non requis).

### Étape 3 : Contrôles de Cohérence Sémantique Croisée
1. **Règles Métier vs Schéma de Base de Données :**
   - *Exemple :* Si la règle `BR-DELIB-04` impose une note éliminatoire $< 7.00/20.00$, le schéma SQL doit-il comporter une contrainte `CHECK` ou la logique doit-elle être isolée dans le service applicatif ? Les types de colonnes (e.g. `NUMERIC(4,2)`) supportent-ils exactement les notes de $0.00$ à $20.00$ ?
2. **Diagrammes de Séquence vs Diagrammes de Classes :**
   - Chaque message envoyé sur une ligne de vie doit correspondre à une méthode publique existante sur la classe ou l'interface réceptrice.
   - Les signatures et retours doivent être rigoureusement typés.
3. **Diagrammes d'États vs Règles de Transition :**
   - Tout état accessible doit posséder au moins un chemin de sortie valide (absence d'états d'impasse non terminaux).
   - Les transitions interdites (e.g. passage d'un relevé de notes "Validé par le jury" à "Brouillon") doivent être explicitement sécurisées.
4. **Architecture C4 vs Déploiement :**
   - Chaque conteneur documenté au niveau C4 Container (Spring Boot, Next.js, PostgreSQL, Redis, MinIO, Ollama) doit avoir sa contrepartie dans le fichier `docker-compose.yml` et le diagramme de déploiement UML.

### Étape 4 : Détection des Angles Morts et Incohérences
- Classifier chaque incohérence détectée selon 3 niveaux de sévérité :
  - **Bloquant (CRITICAL) :** Contradiction logique majeure rendant l'implémentation impossible ou provoquant une perte de données.
  - **Majeur (MAJOR) :** Absence de spécification sur un flux alternatif ou d'erreur critique (e.g. perte de connexion lors d'un scan QR).
  - **Mineur (MINOR) :** Inconsistance de nommage ou omission de cardinalité UML non ambiguë.

### Étape 5 : Formulation du Verdict
Le rapport final attribue pour chaque axe l'un des statuts suivants :
- `PASS` : Validé, cohérent, sans réserve.
- `FAIL` : Conflit bloquant nécessitant une reprise immédiate de la conception.
- `CONDITIONALLY APPROVED` : Validé sous réserve d'application des actions correctives documentées.
- `NOT APPLICABLE` / `NOT VERIFIED` : Périmètre explicitement exclu ou non implémenté à ce stade.

## 3. Règles et Erreurs Fréquentes à Éviter
- **Erreur de complaisance :** Valider un document sans vérifier ligne par ligne la correspondance exacte des identifiants (`FR` vs `UC` vs `Tables`).
- **Erreur de statuts :** Confondre une fonctionnalité "Prévue dans le PFA" avec une fonctionnalité "Implémentée et testée en base".
- **Omission d'exceptions :** Se focaliser sur le "Happy Path" (chemin nominal) en négligeant les cas d'échec (timeouts réseaux, conflits d'horaires, notes invalides).

## 4. Livrables Requis
- `docs/quality/06-validation-report.md` : Rapport officiel d'audit de conception avec matrice de traçabilité complète, analyse des écarts et verdict d'ingénierie.

## 5. Critères de Validation
1. **Exhaustivité matricielle :** Couverture à 100% des exigences et règles définies dans `docs/requirements/`.
2. **Cohérence omnidirectionnelle :** Absence d'incohérence entre modèles UML, architecture C4 et modèles physiques de données.
3. **Impartialité :** Notation objective basée sur des faits vérifiables dans le dépôt de code.
