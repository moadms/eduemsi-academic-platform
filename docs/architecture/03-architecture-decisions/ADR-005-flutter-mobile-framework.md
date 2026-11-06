# ADR-005 : Choix du Framework Mobile pour les Portails Étudiants et Enseignants (Flutter vs React Native)

## Statut : ACCEPTÉ
**Date :** 28 Octobre 2026  
**Décideurs :** Équipe d'Ingénierie Logicielle PFA, Pr. ZGANDRI  

---

## 1. Contexte & Problématique
Les fonctionnalités mobiles du projet EMSI Campus ERP comportent des exigences d'interaction matérielle très strictes :
- Scan vidéo haute performance de QR codes dynamiques tournant toutes les 15 secondes.
- Gestion du mode déconnecté (Offline-first) pour la consultation d'emplois du temps dans les sous-sols ou amphis à faible couverture 4G/Wi-Fi.
- Fluidité d'affichage 60/120 fps sur iOS et Android sans latence de pont (bridge).

Options évaluées :
1. **React Native :** Bon écosystème JavaScript, mais complexité historique du pont asynchrone (bridge) et variabilité des plugins caméra selon les versions d'OS.
2. **Flutter (Google / Dart) :** Rendu direct via moteur graphique natif (Impeller / Skia), compilation binaire native AOT, contrôle total des pixels et des caméras.

## 2. Décision Prise
Nous adoptons **Flutter 3.24+ (Dart 3)** pour le développement de l'application mobile unifiée :
- Gestion d'état réactive via **Riverpod 2.5**.
- Base de données locale intégrée **Isar DB** (base NoSQL locale ultra-rapide et chiffrée) pour la synchronisation bidirectionnelle des plannings et données d'assiduité.
- Accès direct aux API natives de caméra (`camera` et `mobile_scanner`) garantissant un décodage instantané du flux QR sans gel d'interface.

## 3. Conséquences
- Base de code unique pour Android et iOS avec fidélité graphique absolue à 100%.
- Démarrage instantané de l'application et affichage immédiat de l'emploi du temps même en mode avion.
- Temps de montée en compétences minime pour les ingénieurs maîtrisant la POO typée (Java/C++).
