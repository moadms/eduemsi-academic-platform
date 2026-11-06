# Dossier de Modélisation Formelle UML 2.5.1 — EMSI Academic Platform

Ce dossier regroupe les diagrammes formels du système d'information académique de l'EMSI, élaborés selon la spécification internationale **OMG UML 2.5.1** et les exigences du cadrage Agile/Scrum.

---

## 📂 Index des Diagrammes

| Dossier | Type de Diagramme | Fichier PlantUML | Question d'Ingénierie Répondue |
| :--- | :--- | :--- | :--- |
| `use-cases/` | Cas d'Utilisation | [`system_use_cases.puml`](use-cases/system_use_cases.puml) | Quels sont les acteurs et les frontières fonctionnelles du système ? |
| `class-diagrams/` | Diagramme de Classes | [`domain_class_diagram.puml`](class-diagrams/domain_class_diagram.puml) | Quelles sont les entités du domaine, leurs multiplicités et règles d'intégrité ? |
| `sequence-diagrams/`| Diagramme de Séquence | [`pfe_matching_ai_sequence.puml`](sequence-diagrams/pfe_matching_ai_sequence.puml) | Comment s'orchestre le matching de jury IA avec Google Gemini et le fallback local ? |
| `activity-diagrams/`| Diagramme d'Activité | [`attendance_and_threshold_activity.puml`](activity-diagrams/attendance_and_threshold_activity.puml) | Quel est le flux de pointage manuel, de notification post-cours et de calcul du seuil 20% ? |

---

## 🛠️ Instructions de Rendu Graphique
Pour compiler les diagrammes `.puml` en images PNG ou SVG :
```bash
plantuml docs/uml/**/*.puml -tsvg
```
Ou visualisez-les directement via l'extension PlantUML de votre éditeur ou sur [PlantText](https://www.planttext.com/).
