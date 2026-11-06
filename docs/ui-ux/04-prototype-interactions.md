# 04. Spécification des Interactions & Prototype (Interaction Mapping) — UNiVora ERP

**Encadrante** : **Pr. ZGANDRI** | **Jury** : **Pr. AIT OUNEJJAR Lahoussaine**  
Ce document détaille l'ensemble des interactions déclenchables sur le prototype interactif unifié, incluant l'authentification et l'inscription.

---

## 1. Matrice des Déclencheurs & Micro-Interactions

| ID Élément | Écran Source | Déclencheur | Action & Traitement Système | Destination / Feedback Visuel |
| :--- | :--- | :--- | :--- | :--- |
| `BTN-TOPBAR-AUTH` | Barre supérieure | Clic sur "Connexion" | Ouvre directement l'écran d'authentification | Écran `SCR-AUTH-01` (`auth-mob-login`) |
| `BTN-MOB-LOGIN` | `SCR-AUTH-01` | Soumission formulaire | Vérification credentials, génération JWT 15 jours | Redirection vers tableau de bord du rôle choisi + Toast vert de succès |
| `BTN-MOB-REGISTER` | `SCR-AUTH-02` | Soumission inscription | Contrôle format CNE, email @emsi-edu.ma, consentement CNDP | Toast "Compte créé avec succès" + Redirection vers Login |
| `BTN-WEB-LOGIN` | `auth-web-login` | Clic "Se connecter" | Authentification fédérée SSO / Keycloak | Redirection vers portail web (Étudiant, Prof, Scolarité, Direction) |
| `BTN-WEB-REGISTER` | `auth-web-register`| Validation formulaire | Enrôlement multi-step (Identité, Campus, Filière, Sécurité) | Modale de confirmation scolarité + Redirection vers Login Web |
| `ROLE-SWITCHER` | En-tête globale | Clic sur onglet rôle | Bascule instantanée du profil actif (Étudiant, Professeur, Admin, PFE, Direction) | Actualisation dynamique de la vue sans rechargement de page |
| `DEVICE-TOGGLE` | Barre de contrôle | Clic sur icône Mobile/Desktop | Bascule entre le châssis smartphone (iPhone 15 Pro) et l'affichage plein écran Web | Adaptation responsive immédiate des composants |
| `BTN-SCAN-QR` | `SCR-STU-01` | Clic sur bouton | Ouvre le viseur caméra de présence avec géolocalisation | Écran `SCR-STU-03` avec animation laser de scanning |
| `QR-TRIGGER-CONFIRM` | `SCR-STU-03` | Clic sur "Simuler Scan Valide" | Enregistre l'émargement de l'étudiant à 09:14 en salle A204 | Notification toast verte "Présence confirmée ✅" + vibration |
| `QR-TIMER-TICK` | `SCR-PRF-02` | Horloge interne (1s) | Décrémente le cercle de progression de 15s à 0s (`RULE-ATT-02`) | Rotation du jeton HMAC et régénération du QR Code |
| `BTN-RUN-DELIB` | `SCR-ADM-03` | Clic sur "Calculer Délibération" | Exécute la formule pondérée $MG$ et vérifie $NM < 7.00$ | Coloration rouge cramoisi des éliminatoires (`RULE-DELIB-04`) + badges mentions |
| `BTN-GEN-PV` | `SCR-ADM-03` | Clic sur "Éditer PV Signé" | Génère le Procès-Verbal officiel scellé numériquement | Modale d'aperçu du PV avec signature de l'encadrante Pr. ZGANDRI |
| `BTN-AI-MATCH` | `SCR-PFE-01` | Clic sur "Exécuter Matching IA"| Lance l'inférence locale Ollama (Llama 3.2 - Cosine > 70%) | Jauge animée avec score 87.4% et suggestion du jury optimal |
| `BTN-DOWNLOAD-ATTEST`| `SCR-STU-06`| Clic sur "Télécharger Attestation"| Vérifie l'état financier (`RULE-FIN-06`) | Si impayé > 10j : Modale d'alerte rouge avec cadenas de blocage |
| `TAB-NAV` | Tous écrans | Clic sur onglet menu | Navigation vers la section applicative ciblée | Mise en surbrillance de l'onglet actif et transition fluide |

---

## 2. Parcours de Démonstration Validés

### Parcours 0 : Authentification & Inscription (Nouveau)
1. L'utilisateur clique sur **"Connexion"** dans la barre supérieure ou la sidebar (`0. Authentification & Accès`).
2. **Sur Mobile (Flutter)** :
   - Sélection du Campus : **Guéliz** ou **Targa**.
   - Sélection du Rôle rapide : **Étudiant** ou **Professeur**.
   - Saisie ou pré-remplissage automatique des identifiants (`yassine.alami@emsi-edu.ma`).
   - Clic sur l'icône de l'œil pour afficher/masquer le mot de passe.
   - Clic sur **"Se Connecter"** : toast vert animé et bascule automatique sur le tableau de bord de l'étudiant.
   - Si nouveau compte : clic sur **"Créer un compte"** -> Formulaire complet d'inscription avec validation CNDP.
3. **Sur Web Desktop (Next.js / Shadcn)** :
   - Présentation en *Split Screen* avec branding officiel EMSI, pilier d'innovations (QR 15s, OR-Tools, Délibérations, IA PFE) et conformité CNDP Loi 09-08.
   - Choix du rôle de destination rapide (Étudiant, Professeur, Scolarité, Direction).
   - Boutons SSO Microsoft 365 EMSI et Google Workspace.
   - Formulaire d'inscription par étapes avec affectation de filière (4IIR, 5IIR D2SI, 3IIR).
