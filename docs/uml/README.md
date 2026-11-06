# MODÉLISATION LOGICIELLE FORMELLE UML 2.5.1 (PHASES C & E)

**Projet :** EMSI Campus ERP (Univora) — Système Intégré de Gestion Universitaire & Campus Intelligent  
**Établissement :** École Marocaine des Sciences de l'Ingénieur (EMSI Marrakech)  
**Encadrement Académique :** Pr. ZGANDRI | **Président du Jury :** Pr. AIT OUNEJJAR Lahoussaine  
**Référentiel Normatif :** OMG Unified Modeling Language (UML) Specification Version 2.5.1  
**Moteur de Rendu :** PlantUML Standard (fichiers sources `.puml` éditables et versionnables)  

---

## 1. Organisation et Typologie des Diagrammes

L'ensemble des modèles UML est découpé par perspectives structurelles et comportementales, conformément aux meilleures pratiques de l'ingénierie logicielle :

```
docs/uml/
├── README.md                      # Guide général et cartographie des modèles
├── use-cases/                     # Diagrammes de Cas d'Utilisation (Vues Fonctionnelles)
│   ├── uc01_global_system.puml    # Vue globale du système avec frontières et acteurs
│   ├── uc02_student_professor.puml# Cycle pédagogique, cours et assiduité mobile
│   └── uc03_deliberation_admin.puml# Délibérations "Zéro Excel", examens et PFE
├── class-diagrams/                # Diagrammes de Classes (Vues Structurelles Domaine & Services)
│   ├── cd01_domain_model.puml     # Modèle de domaine complet (Entités, Attributs, Invariants)
│   └── cd02_services_architecture.puml # Architecture technique (Controllers, Services, Repositories, DTOs)
├── sequence-diagrams/             # Diagrammes de Séquence (Vues Dynamiques & Protocoles Temporels)
│   ├── seq01_qr_attendance_15s.puml # Protocole d'émargement QR dynamique 15s avec Redis
│   ├── seq02_zero_excel_deliberation.puml # Algorithme de délibération et scellement du PV
│   └── seq03_pfe_matching_ollama.puml # Matching sémantique PFE-Jurys via Ollama local
├── activity-diagrams/             # Diagrammes d'Activités (Processus Métier & Algorithmes)
│   ├── act01_deliberation_flow.puml # Logique de délibération avec couloirs (Swimlanes)
│   └── act02_schedule_generation_transit.puml # Résolution des contraintes de transit 45 min
├── state-diagrams/                # Diagrammes d'États-Transitions (Cycles de Vie)
│   ├── state01_seance_lifecycle.puml # Cycle de vie d'une séance de cours et cahier de texte
│   └── state02_student_thesis_lifecycle.puml # Cycle de vie d'un projet PFE et soutenance
├── component-diagrams/            # Diagrammes de Composants (Architecture Modulaire)
│   └── comp01_backend_subsystems.puml # Sous-systèmes Spring Boot, OR-Tools, Ollama, Redis
├── deployment-diagrams/           # Diagrammes de Déploiement (Topologie d'Exécution)
│   └── dep01_physical_deployment.puml # Nœuds physiques, conteneurs Docker, DMZ et réseaux
└── package-diagrams/              # Diagrammes de Paquetages (Modularité & Clean Architecture)
    └── pkg01_clean_architecture.puml # Découpage hexagonal et sens des dépendances
```

---

## 2. Principes Directeurs et Respect de la Norme OMG UML 2.5.1

1. **Cas d'Utilisation :**
   - Frontière explicite du système (`rectangle "EMSI Campus ERP"`).
   - Acteurs humains et systèmes placés strictement à l'extérieur de la frontière.
   - Emploi rigoureux de `<<include>>` pour les étapes obligatoires (e.g. vérification du jeton QR) et `<<extend>>` pour les flux optionnels/conditionnels (e.g. déclaration d'incident).
2. **Modèle de Classes :**
   - Distinction claire entre entités du Domaine (Clean Core), Services applicatifs, Repositories et Objets de Transfert de Données (DTO).
   - Multiplicités complètes (`1`, `0..1`, `1..*`, `*`).
   - Sémantique stricte : Composition (`*--`) réservée aux relations d'appartenance vitale (e.g. `Module` contient des `Elements`), Agrégation (`o--`) pour les collections indépendantes, Association simple (`-->`) pour les références faibles.
3. **Diagrammes de Séquence :**
   - Respect strict de la chronologie descendante.
   - Utilisation des fragments combinés normatifs : `alt` / `else` pour les alternatives, `opt` pour les étapes conditionnelles, `loop` pour les itérations, `critical` pour les transactions atomiques.
4. **Distinction Épistémique :**
   - Les comportements existants ou formellement validés sont modélisés en trait continu.
   - Les propositions d'extensions futures (e.g. multi-tenant SaaS inter-écoles) sont explicitement annotées `[PROPOSED]`.
