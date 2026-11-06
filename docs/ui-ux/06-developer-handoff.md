# 06. Guide de Passation Technique (Developer Handoff) — UNiVora ERP

**Encadrante** : **Pr. ZGANDRI** | **Jury** : **Pr. AIT OUNEJJAR Lahoussaine**  
Ce document sert de référence contractuelle pour l'équipe de développement frontend (Flutter Mobile & Next.js 14 Web).

---

## 1. Tokens de Design & Variables CSS / Dart

### Définition des Couleurs Sémantiques

```css
/* Next.js 14 / Tailwind CSS Tokens (globals.css) */
:root {
  --primary: #00843D;          /* Vert Institutionnel EMSI */
  --primary-hover: #006B32;
  --primary-light: #E8F5E9;
  
  --secondary: #1E3A5F;        /* Bleu Nuit Technique */
  --secondary-hover: #152943;
  --secondary-light: #EEF4FA;

  --accent-gold: #C5A572;      /* Or Académique */
  --accent-blue: #2563EB;      /* Bleu Action UI */

  --bg-page: #F8FAFC;          /* Fond d'application doux */
  --bg-card: #FFFFFF;
  --border-color: #E2E8F0;

  --text-main: #0F172A;        /* Haute lisibilité */
  --text-muted: #64748B;

  --status-success: #059669;   /* Présence validée / Admis */
  --status-warning: #D97706;   /* Rattrapage / Impayé récent */
  --status-danger: #DC2626;    /* Note Éliminatoire < 7.00 / Cadenas */
  --status-info: #0284C7;
}
```

```dart
// Flutter Mobile Tokens (theme/app_colors.dart)
import 'package:flutter/material.dart';

class AppColors {
  static const Color primary = Color(0xFF00843D);
  static const Color secondary = Color(0xFF1E3A5F);
  static const Color accentGold = Color(0xFFC5A572);
  static const Color bgPage = Color(0xFFF8FAFC);
  static const Color bgCard = Colors.white;
  static const Color textMain = Color(0xFF0F172A);
  static const Color textMuted = Color(0xFF64748B);
  static const Color statusDanger = Color(0xFFDC2626); // RULE-DELIB-04
  static const Color statusSuccess = Color(0xFF059669);
}
```

---

## 2. Table de Correspondance des Composants (Figma <-> Code)

| Composant UI / Figma | Composant Web (Next.js / Shadcn) | Widget Mobile (Flutter) | Règle Métier Associée |
| :--- | :--- | :--- | :--- |
| **Bouton Primaire** | `<Button className="bg-primary">` | `ElevatedButton(style: ...)` | Déclenchement actions principales |
| **Bouton Destructif** | `<Button variant="destructive">` | `ElevatedButton(style: red)` | Annulation ou rejet de note |
| **Badge Statut Présence**| `<Badge variant="success">Présent</Badge>`| `Chip(label: Text('Présent'))` | Affichage post-scan `RULE-ATT-02` |
| **Alerte Éliminatoire** | `<Alert variant="destructive">` | `Container(decoration: alertBox)` | Note $< 7.00/20$ `RULE-DELIB-04` |
| **Timer Circulaire QR** | Composant SVG Canvas animé (15s) | `CircularProgressIndicator` personnalisé | Rotation HMAC 15s `RULE-ATT-02` |
| **Jauge Similarité IA** | Barème de progression Shadcn | `LinearProgressIndicator` | Score sémantique $> 70\%$ `RULE-AI-05` |
| **Modale Délibération** | `<Dialog>`, `<DialogContent>` | `showDialog(builder: ...)` | Confirmation clôture semestre |
| **Tiroir Détail Cours**| `<Sheet>`, `<SheetContent>` | `showModalBottomSheet(...)` | Emploi du temps & buffer transit |

---

## 3. Architecture d'État & Recommandations d'Intégration
- **Mobile Flutter** : Adopter l'architecture **BLoC (Business Logic Component)** avec cache local **Isar DB** pour garantir le fonctionnement *Offline-First*. En cas de coupure de réseau dans un sous-sol d'amphithéâtre, l'émargement est stocké localement et synchronisé dès la reconnexion.
- **Web Next.js 14** : Privilégier les **Server Components** pour le rendu initial des grilles de notes et tableaux d'audit, et les **Client Components** (`'use client'`) pour les calculateurs dynamiques de délibération et les timers de projection QR.
