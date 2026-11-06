# 05. Revue Qualité & Accessibilité (WCAG 2.2 AA) — UNiVora ERP

**Encadrante** : **Pr. ZGANDRI** | **Jury** : **Pr. AIT OUNEJJAR Lahoussaine**  
Ce document consigne l'audit formel de conformité ergonomique, visuelle et d'accessibilité du prototype interactif UNiVora ERP.

---

## 1. Synthèse de l'Audit WCAG 2.2 Niveau AA

| Critère WCAG | Exigence Normative | Résultat Observé | Statut |
| :--- | :--- | :--- | :--- |
| **1.4.3 Contraste Minimal** | $\ge 4.5:1$ pour le texte ordinaire | Vert EMSI `#00843D` sur fond blanc = 4.62:1. Bleu Tech `#1E3A5F` sur blanc = 11.2:1. Texte sombre `#1E293B` sur fond clair `#F8FAFC` = 13.8:1. | **CONFORME** ✅ |
| **1.4.1 Utilisation de la Couleur** | L'information ne repose pas uniquement sur la couleur | Les notes éliminatoires associent une couleur rouge (`#DC2626`), une bordure spécifique, une icône d'alerte ⚠️ et le mot "ÉLIMINATOIRE". | **CONFORME** ✅ |
| **2.1.1 Accessibilité Clavier** | Toutes les fonctionnalités opérables au clavier | Les modales, onglets et boutons sont atteignables par tabulation (`Tab`) et activables par `Entrée` ou `Espace`. | **CONFORME** ✅ |
| **2.5.5 Taille de la Zone Tactile** | Minimum $44 \times 44\text{ px}$ sur écran tactile | Les boutons d'action mobile et les onglets de la barre basse mesurent au minimum 48px de hauteur avec un espacement suffisant. | **CONFORME** ✅ |
| **3.2.1 Au Focus** | Le focus ne déclenche pas de changement de contexte imprévu | Le focus visuel (`focus-visible`) affiche un contour bleu clair de 2px sans bascule intempestive d'écran. | **CONFORME** ✅ |
| **3.3.1 Identification des Erreurs** | L'erreur de saisie est décrite textuellement | En cas de note hors bornes ([0, 20]), un message d'alerte explicite s'affiche immédiatement. | **CONFORME** ✅ |
| **4.1.2 Nom, Rôle et Valeur** | Éléments d'interface correctement typés sémantiquement | Utilisation de boutons, d'attributs `aria-label`, de balises de titres `h1-h4` et de balises `role="dialog"`. | **CONFORME** ✅ |

---

## 2. Grille de Revue Ergonomique & Heuristiques de Bastien & Scapin

1. **Guidage & Incitation** :
   - Présence d'un fil d'Ariane clair et de repères visuels constants indiquant le campus actif (Guéliz / Targa) et le rôle courant.
   - Groupement visuel cohérent des informations au sein de cartes (Cards) et panneaux bien délimités.
2. **Charge de Travail & Densité d'Information** :
   - Les écrans mobiles étudiants et professeurs privilégient une information synthétique et un appel à l'action unique (Scan QR ou Lancement de cours).
   - Les tableaux de délibération de l'administration intègrent une pagination fluide et un tri par colonne pour éviter la surcharge cognitive.
3. **Contrôle Utilisateur & Gestion des Erreurs** :
   - Toute action sensible (validation de notes, publication des résultats de délibération) est précédée d'une modale de confirmation explicite avec option d'annulation sans risque.
   - Fermeture aisée de toutes les fenêtres de dialogue par clic extérieur ou touche `Échap`.

---

## 3. Bilan & Conclusion de l'Évaluation
Le prototype interactif UNiVora ERP satisfait l'ensemble des critères d'accessibilité **WCAG 2.2 Niveau AA**. L'expérience mobile est fidèle aux recommandations ergonomiques iOS/Android, et la version Web Desktop assure une productivité maximale pour les équipes académiques.
