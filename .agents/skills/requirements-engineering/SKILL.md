---
name: requirements-engineering
description: Méthodologie d'ingénierie et de spécification formelle des exigences fonctionnelles, non fonctionnelles et des règles métier.
---

# Skill — Requirements Engineering

## 1. Raison d'être et Déclencheurs (Purpose & Activation Conditions)
Ce skill s'active pour transformer les besoins métier bruts et les constats d'audit en exigences claires, atomiques, traçables et testables.
Il garantit l'alignement entre les attentes des utilisateurs, les contraintes réglementaires et le backlog de développement.

### Conditions d'activation
- Rédaction d'une spécification des exigences logicielles (SRS / CdC).
- Formalisation des règles de gestion (`Business Rules`) et cas d'utilisation (`Use Cases`).
- Établissement de la matrice de traçabilité des exigences (`Traceability Matrix`).

---

## 2. Référentiels et Normes Applicables (Standards & References)
- **ISO/IEC/IEEE 29148:2018** : Systems and software engineering — Life cycle processes — Requirements engineering.
- **IEEE Std 830-1998** : Recommended Practice for Software Requirements Specifications.
- **Méthode MoSCoW** : Priorisation des exigences (Must, Should, Could, Won't).
- **Règles INVEST** : Indépendant, Négociable, Valeur, Estimable, Petit (Small), Testable pour les User Stories.

---

## 3. Workflow Opérationnel Étape par Étape (Step-by-Step Workflow)
1. **Identification des parties prenantes et acteurs :** Définir qui interagit directement avec le système ou qui est impacté par ses résultats.
2. **Définition du périmètre (Scope) :** Lister sans ambiguïté les éléments inclus (`In-Scope`) et expressément exclus (`Out-of-Scope`).
3. **Formalisation des Exigences Fonctionnelles (FR) :**
   - Rédiger des énoncés observables au comportement vérifiable.
   - Assigner l'identifiant stable `FR-XXX` (ex. `FR-001`, `FR-002`).
4. **Formalisation des Exigences Non-Fonctionnelles (NFR) :**
   - Quantifier les critères de performance, sécurité, disponibilité, compatibilité.
   - Assigner l'identifiant stable `NFR-XXX`.
5. **Extraction des Règles Métier (BR) :**
   - Documenter les invariants, formules de calcul, conditions d'éligibilité et contraintes dures.
   - Assigner l'identifiant stable `BR-XXX`.
6. **Spécification des Cas d'Utilisation (UC) :**
   - Rédiger pour chaque cas d'usage : ID `UC-XXX`, acteurs, préconditions, déclencheur, scénario nominal, scénarios alternatifs, cas d'erreur, postconditions.
7. **Définition des Critères d'Acceptation (AC) :**
   - Rédiger les critères `AC-XXX` sous format vérifiable (Given-When-Then / Scénarios de test).
8. **Construction de la Matrice de Traçabilité :** Relier chaque besoin métier à ses `FR`, `NFR`, `BR`, `UC`, `AC` et tests associés.

---

## 4. Règles et Pièges à Éviter (Rules & Common Mistakes)
- **RÈGLE 1 :** Bannir les termes vagues et subjectifs sans critère de mesure ("rapide", "sécurisé", "ergonomique", "performant").
- **RÈGLE 2 :** Ne jamais inventer d'objectifs chiffrés sans consensus des parties prenantes ou justification d'ingénierie.
- **RÈGLE 3 :** Distinguer impérativement une exigence validée d'une proposition en cours d'arbitrage.
- **RÈGLE 4 :** Ne jamais décrire une fonctionnalité future comme étant déjà en production.
- **RÈGLE 5 :** Assurer l'atomicité : une exigence = une seule responsabilité vérifiable.

---

## 5. Gestion des Informations Manquantes et Hypothèses
- Tout point métier non tranché est répertorié dans le registre des `Questions Ouvertes`.
- Une valeur par défaut ou une règle provisoire est formulée avec la mention `[HYPOTHÈSE À VALIDER PAR LE CLIENT]`.

---

## 6. Checklist des Livrables et Critères de Validation
- [ ] Document `docs/requirements/02-requirements-specification.md` complet.
- [ ] Document `docs/requirements/02-business-rules.md` formalisant les invariants métier.
- [ ] Document `docs/requirements/02-traceability-matrix.md` établissant la chaîne de dépendances.
- [ ] Identifiants stables appliqués : `FR-XXX`, `NFR-XXX`, `BR-XXX`, `UC-XXX`, `AC-XXX`.
- [ ] Critères d'acceptation testables pour chaque exigence.
