# ADR-003 : Souveraineté des Données et Inférence IA Locale (Ollama / Llama 3.2 on-premise)

## Statut : ACCEPTÉ
**Date :** 28 Octobre 2026  
**Décideurs :** Équipe d'Ingénierie Logicielle PFA, Pr. ZGANDRI  

---

## 1. Contexte & Problématique
Le module PFE de l'ERP intègre un mécanisme d'intelligence artificielle pour l'analyse des résumés de mémoires de stage et l'affectation automatique des jurys experts. Les mémoires d'ingénieurs de l'EMSI contiennent fréquemment des données industrielles sous accords de non-divulgation (NDA) avec des entreprises partenaires marocaines et multinationales.

Deux options s'opposaient :
1. **API Cloud Publique (OpenAI GPT-4o, Google Gemini) :** Haute qualité mais violation potentielle du secret professionnel et risque légal au regard de la loi marocaine 09-08 (transfert de données hors du territoire).
2. **IA Souveraine On-Premise via Ollama :** Déploiement d'un modèle open-source compact (Meta Llama 3.2 3B & Nomic-Embed-Text) sur un serveur équipé de GPU local au campus de Marrakech.

## 2. Décision Prise
Nous choisissons le déploiement **100% On-Premise d'Ollama avec le modèle Llama 3.2 (3B) et Nomic-Embed-Text** :
- L'inférence et la vectorisation s'exécutent entièrement sur le réseau local interne de l'école.
- Les vecteurs générés (1024 dimensions) sont stockés directement dans PostgreSQL grâce à l'extension `pgvector`.
- La comparaison de similarité s'effectue via une requête SQL native de distance cosinus (`<=>`).

## 3. Conséquences
- **Sécurité & Conformité :** Zéro octet de rapport d'étudiant ou de métadonnée personnelle ne quitte les serveurs de l'EMSI. Conformité totale avec la CNDP.
- **Coûts :** Zéro frais de token par requête, coût d'infrastructure maîtrisé.
- **Exigence Matérielle :** Nécessite une machine serveur dédiée dotée d'un GPU (e.g. NVIDIA RTX 3060/4060 ou Apple Silicon M-series) avec au moins 16 Go de VRAM/RAM.
