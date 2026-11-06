# 03. Inventaire Exhaustif des Écrans (Screen Inventory) — UNiVora ERP

**Encadrante** : **Pr. ZGANDRI** | **Jury** : **Pr. AIT OUNEJJAR Lahoussaine**  
Cet inventaire recense tous les écrans conçus et intégrés au prototype interactif, avec leurs identifiants stables, les rôles associés, les dispositifs cibles et leurs règles métier d'interface.

---

## Tableau Synoptique des Écrans du Prototype

| ID Écran | Nom de l'Écran | Rôle Associé | Cible IHM | Données & Règles Clés |
| :--- | :--- | :--- | :--- | :--- |
| **`SCR-AUTH-01`** | **Portail de Connexion (Login)** | Tous Rôles | Mobile & Desktop | Sélecteur de campus (Guéliz/Targa), email/CNE, mot de passe sécurisé, SSO Microsoft 365 / Google, mémorisation JWT 15j, redirection dynamique selon le rôle |
| **`SCR-AUTH-02`** | **Portail d'Inscription (Register)** | Étudiant & Enseignant | Mobile & Desktop | Nom, Prénom, CNE/Matricule, Campus (Guéliz/Targa), Filière (4IIR, 5IIR...), email @emsi-edu.ma, consentement Loi 09-08 CNDP, création de compte |
| **`SCR-STU-01`** | **Tableau de Bord Étudiant** | Étudiant | Mobile (Nat.) & Web | Badge campus, carte du cours imminent, taux de présence global (94%), alertes |
| **`SCR-STU-02`** | **Emploi du Temps Étudiant** | Étudiant | Mobile & Web | Grille horaire jour/semaine, salles, filière 4IIR, filtres |
| **`SCR-STU-03`** | **Émargement QR Code** | Étudiant | Mobile Exclusif | Viseur caméra animé, GPS 50m, validation temps réel `RULE-ATT-02` |
| **`SCR-STU-04`** | **Relevé de Notes & Délibération** | Étudiant | Mobile & Web | Notes CC/TP/Exam, surbrillance éliminatoire < 7.00 (`RULE-DELIB-04`), export PDF |
| **`SCR-STU-05`** | **Catalogue & Suivi PFE** | Étudiant | Mobile & Web | Sujets validés, tags technologiques, statut d'acceptation, upload rapport |
| **`SCR-STU-06`** | **Finances & Scolarité** | Étudiant | Mobile & Web | Solde comptable, échéancier, alerte blocage attestations si impayé (`RULE-FIN-06`) |
| **`SCR-PRF-01`** | **Tableau de Bord Enseignant** | Professeur | Mobile (Nat.) & Web | Planning de la journée, raccourci "Lancer Séance", alertes cahier de texte |
| **`SCR-PRF-02`** | **Session de Cours & QR Projection** | Professeur | Mobile & Web | QR Code dynamique régénéré toutes les 15s (`RULE-ATT-02`), jauge émargement |
| **`SCR-PRF-03`** | **Cahier de Texte Numérique** | Professeur | Mobile & Web | Saisie objectifs pédagogiques, validation fin de cours (`RULE-NOT-03`) |
| **`SCR-PRF-04`** | **Carnet de Saisie des Notes** | Professeur | Mobile & Web | Tableau d'évaluation CC, TP, Examen, alertes immédiates éliminatoires |
| **`SCR-PRF-05`** | **Suivi des Thèses PFE** | Professeur | Mobile & Web | Validation des jalons M1/M2/M3, notation d'encadrement sur 20 |
| **`SCR-ADM-01`** | **Cockpit Scolarité & Plannings** | Admin Scolarité | Web Desktop | KPIs étudiants (2 730), alertes conflits transit Guéliz/Targa (`RULE-GEO-01`) |
| **`SCR-ADM-02`** | **Générateur Planning OR-Tools** | Admin Scolarité | Web Desktop | Paramètres solveur CP-SAT, contraintes dures/souples, bouton d'optimisation |
| **`SCR-ADM-03`** | **Moteur de Délibération "Zéro Excel"** | Admin Scolarité | Web Desktop | Calcul automatique moyennes, détection éliminatoire < 7.00 (`RULE-DELIB-04`), PV signé |
| **`SCR-ADM-04`** | **Gestion Recouvrement & Cadenas** | Admin Scolarité | Web Desktop | Déblocage manuel des attestations financières (`RULE-FIN-06`), traçabilité CNDP |
| **`SCR-PFE-01`** | **Coordination PFE & IA Matching** | Coordinateur PFE| Web Desktop | Matrice de similarité cosinus Ollama Llama 3.2 (`RULE-AI-05`), affectation jurys |
| **`SCR-DIR-01`** | **Direction Générale & KPI Campus** | Direction | Web Desktop | Taux de réussite global par filière, absentéisme moyen, benchmarks inter-campus |
| **`SCR-DIR-02`** | **Journal d'Audit & Sécurité CNDP** | Direction / RSSI | Web Desktop | Journal d'audit immuable (`audit_logs`), conformité Loi marocaine 09-08 |

---

## États Requis par Écran
Chaque écran du prototype supporte les états suivants :
1. **Nominal (Default State)** : Affichage des données complètes et interactives.
2. **Action / En cours (Interactive State)** : Calcul en direct, compteur dynamique, bascule d'onglets.
3. **Succès (Success State)** : Modal ou toast de confirmation vert avec détails enregistrés.
4. **Erreur / Alerte (Alert State)** : Note éliminatoire $< 7.00$, QR code expiré, ou blocage d'attestation.
