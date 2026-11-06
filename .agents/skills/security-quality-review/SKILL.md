---
name: security-quality-review
description: Évaluation approfondie de la sécurité, de la conformité réglementaire (Loi marocaine 09-08 / CNDP, RGPD), de la maintenabilité logicielle et de la robustesse opérationnelle selon les référentiels OWASP ASVS et ISO 25010.
---

# Skill: security-quality-review

## 1. Raison d'être & Conditions d'Activation
Ce skill est activé lors des phases de conception architecturale, de modélisation de données, de revue de code et d'audit préalable à la mise en production. Il vise à garantir qu'aucune faille structurelle (architecturale ou applicative) ne subsiste, en confrontant les spécifications et implémentations aux standards stricts de l'industrie :
- **OWASP Top 10 (2021)** & **OWASP ASVS v4.0** (Application Security Verification Standard)
- **Loi marocaine 09-08** relative à la protection des données à caractère personnel (CNDP) et directives de la **DGSSI / DNSSI** (Directive Nationale de la Sécurité des Systèmes d'Information)
- **ISO/IEC 25010:2023** (Modèle de qualité logicielle : sécurité, fiabilité, maintenabilité, performance)

## 2. Démarche Méthodologique & Workflow

```
[1. Cartographie des Risques & Actifs Critiques]
                  │
                  ▼
[2. Modélisation des Menaces (STRIDE)]
                  │
                  ▼
[3. Revue Sécurité Applicative (OWASP Top 10)]
                  │
                  ▼
[4. Audit Conformité Légale (CNDP / Loi 09-08)]
                  │
                  ▼
[5. Évaluation Qualité Logicielle (ISO 25010)]
                  │
                  ▼
[6. Rapport d'Assurance Qualité & Matrice de Remédiation]
```

### Étape 1 : Cartographie des Actifs et Frontières de Confiance
- Identifier les données sensibles : identités étudiantes (CIN, CNE/MASSAR), bulletins de notes, données financières (paiements scolarité, bourses), clés d'API et secrets JWT.
- Établir les périmètres de confiance (Trust Boundaries) : Réseau public internet vs DMZ (Reverse Proxy Nginx) vs Réseau applicatif interne (Spring Boot) vs Zone de persistance isolée (PostgreSQL, Redis, MinIO).

### Étape 2 : Modélisation des Menaces selon le Modèle STRIDE
Pour chaque composant système et flux réseau :
- **Spoofing (Usurpation d'identité) :** Attaques par rejeu de QR code de présence, vol de jetons JWT.
- **Tampering (Altération) :** Falsification des notes d'examen dans les requêtes de délibération, altération des logs d'audit.
- **Repudiation (Répudiation) :** Contestation par un enseignant de la validation d'un cahier de texte ou d'une note.
- **Information Disclosure (Divulgation d'information) :** Fuite de dossiers académiques par IDOR (Insecure Direct Object Reference) ou métadonnées non filtrées.
- **Denial of Service (Déni de service) :** Épuisement des ressources par génération concurrente d'emplois du temps OR-Tools ou inférences IA Ollama non régulées.
- **Elevation of Privilege (Élévation de privilèges) :** Franchissement horizontal/vertical entre rôles (Étudiant -> Délégué -> Enseignant -> Chef de Département -> Directeur).

### Étape 3 : Contrôles Clés OWASP ASVS v4.0
1. **Authentification & Gestion de Session (V2, V3) :**
   - Hachage de mot de passe par Argon2id ou BCrypt avec facteur de coût $\ge 12$.
   - Authentification Multi-Facteurs (MFA via TOTP RFC 6238) obligatoire pour les administrateurs et membres du jury.
   - Rotation et expiration stricte des tokens JWT (Access Token : 15 min, Refresh Token : 7 jours stocké en cookie `HttpOnly`, `Secure`, `SameSite=Strict`).
   - Révocation immédiate des jetons via liste noire Redis lors de la déconnexion ou du changement de privilèges.
2. **Contrôle d'Accès & Multi-Tenancy (V4) :**
   - Application rigoureuse du principe du moindre privilège (RBAC + ABAC contextuel).
   - Filtrage systématique par `tenant_id` et `campus_id` sur toutes les requêtes SQL (prévention des fuites multi-sites).
   - Protection contre les attaques IDOR sur les relevés de notes et attestations : vérification cryptographique des droits de propriété des ressources.
3. **Validation des Entrées & Assainissement (V5) :**
   - Requêtes SQL paramétrées via Spring Data JPA / Hibernate (zéro concaténation de requêtes brutes).
   - Assainissement strict des entrées HTML/Rich-Text pour le cahier de texte (protection contre les failles XSS stockées).
   - Validation stricte des types de fichiers déposés (PFE, conventions) : vérification des Magic Bytes (MIME type réel) et stockage hors racine web sur MinIO privé.
4. **Cryptographie au Repos et en Transit (V6, V9) :**
   - Chiffrement TLS 1.3 obligatoire sur tous les canaux externes et internes.
   - Chiffrement au repos (AES-256-GCM) des données financières et pièces d'identité.

### Étape 4 : Conformité Réglementaire CNDP (Loi Marocaine 09-08)
- **Principe de finalité :** Les données collectées (géolocalisation lors du scan QR, données biométriques éventuelles) doivent être strictement limitées aux besoins de gestion de scolarité.
- **Durée de conservation :** Archivage des notes d'examen et délibérations (obligation légale académique), purge planifiée des jetons éphémères et logs d'accès réseau au-delà de 1 an.
- **Journalisation légale & Immuabilité :** Table `audit_logs` immuable (append-only) traçant chaque modification de note, consultation de dossier ou action administrative avec horodatage certifié NTP et signature d'intégrité (HMAC SHA-256).

### Étape 5 : Métriques de Qualité Logicielle (ISO 25010)
- **Maintenabilité :** Dette technique SonarQube < 5%, complexité cyclomatique < 10 par méthode, couverture de tests unitaires $\ge 80\%$.
- **Fiabilité & Résilience :** Circuit Breaker (Resilience4j) sur le moteur d'optimisation OR-Tools et le service LLM local Ollama.
- **Performance :** Temps de réponse au 95e centile (p95) < 200 ms sur les API de consultation, < 2.0 s sur le calcul d'un PV de délibération.

## 3. Règles et Erreurs Fréquentes à Éviter
- **Erreur critique :** Stocker des secrets, mots de passe de base de données ou clés JWT en clair dans le code source ou le dépôt Git. *Règle : Injection exclusive via variables d'environnement chiffrées (Docker Secrets / HashiCorp Vault).*
- **Erreur courante :** Confondre l'authentification (qui est l'utilisateur ?) et l'autorisation (qu'a-t-il le droit de faire ?).
- **Erreur de QR Code :** Générer des QR codes statiques pour l'émargement. *Règle : Token TOTP dynamique régénéré toutes les 15 secondes avec validation cryptographique à usage unique.*
- **Erreur multi-tenant :** Oublier la clause WHERE `tenant_id = :currentTenant` dans une requête analytique ou un script batch.

## 4. Livrables Requis
- `docs/quality/06-quality-and-security-review.md` : Audit complet de sécurité (STRIDE, OWASP, CNDP) et matrice de conformité ISO 25010.

## 5. Critères de Validation
1. **Épistémique :** Chaque vulnérabilité signalée est catégorisée : `VERIFIED` (faille prouvée dans le code), `PROPOSED` (mesure de durcissement préconisée).
2. **Exhaustivité :** Couverture des 10 catégories OWASP et des 7 règles métier fondamentales du projet EMSI.
3. **Actionnabilité :** Chaque risque identifié est assorti d'une recommandation technique concrète (code snippet ou règle d'architecture).
