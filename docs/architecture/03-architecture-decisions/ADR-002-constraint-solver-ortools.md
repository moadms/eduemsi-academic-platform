# ADR-002 : Sélection du Moteur d'Optimisation d'Emplois du Temps (Google OR-Tools CP-SAT)

## Statut : ACCEPTÉ
**Date :** 28 Octobre 2026  
**Décideurs :** Équipe d'Ingénierie Logicielle PFA, Pr. ZGANDRI  

---

## 1. Contexte & Problématique
La génération des plannings à l'EMSI Marrakech est un problème NP-complet complexe soumis à des contraintes physiques dures :
- Disponibilité des professeurs et des salles (amphis, labos TP).
- Respect absolu de la règle `BR-GEO-01` : **45 minutes incompressibles de battement de transit** entre deux séances consécutives pour tout enseignant ou groupe se déplaçant entre Guéliz et Targa.
- Minimisation des "trous" dans les journées d'étudiants (contrainte souple).

Les approches classiques évaluées :
1. Algorithmes génétiques ad-hoc (trop lents à converger, sans garantie d'optimalité prouvée).
2. Solveurs linéaires en nombres entiers commerciaux (Gurobi, CPLEX — prohibitifs en coûts de licence).
3. **Google OR-Tools avec solveur CP-SAT** (Constraint Programming / Boolean Satisfiability — open source, hautement performant, éprouvé mondialement).

## 2. Décision Prise
Nous adoptons **Google OR-Tools CP-SAT** encapsulé dans un service dédié Python 3.11 / FastAPI.

## 3. Justification Technique
- **Puissance du solveur CP-SAT :** Il combine la propagation de contraintes (CP) et la résolution SAT/SMT moderne avec parallélisme natif multithreadé.
- **Modélisation formelle du transit :**
  ```python
  # Si l'enseignant P donne le cours A sur Gueliz et le cours B sur Targa le même jour :
  model.Add(start_B >= end_A + 45).OnlyEnforceIf([teaches_A, teaches_B, same_day, gueliz_to_targa])
  ```
- **Détection des infaisabilités :** CP-SAT permet d'extraire rapidement les sous-ensembles de contraintes insolubles si les ressources physiques sont insuffisantes.

## 4. Conséquences
- Découplage du calcul lourd hors du thread web principal de Spring Boot.
- Timeout d'exécution fixé à 180 secondes avec retour de la meilleure solution réalisable (`FEASIBLE`) si l'optimum mathématique n'est pas atteint dans le temps imparti.
