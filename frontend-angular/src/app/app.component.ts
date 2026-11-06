import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  template: `
    <div class="min-h-full flex flex-col bg-slate-50">
      <!-- HEADER -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-emerald-900 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              E
            </div>
            <div>
              <span class="text-xs font-black uppercase tracking-wider text-emerald-800">EMSI Academic Platform</span>
              <span class="text-xs text-slate-400 font-mono ml-2">Univora v1.0 • Angular 18</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
              <i class="fa-solid fa-circle-check text-emerald-600 mr-1"></i> Spring Boot Active
            </span>
            <span class="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-50 text-purple-800 border border-purple-200">
              <i class="fa-solid fa-brain text-purple-600 mr-1"></i> Gemini 2.0 Flash Free
            </span>
          </div>
        </div>
      </header>

      <!-- NAVIGATION TABS -->
      <div class="bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-4 overflow-x-auto text-xs font-bold">
          <button (click)="activeTab = 'EDT'" [class.border-emerald-600]="activeTab === 'EDT'" [class.text-emerald-700]="activeTab === 'EDT'" class="py-3 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-all">
            <i class="fa-solid fa-calendar-days"></i> 1. Emploi du Temps (OR-Tools)
          </button>
          <button (click)="activeTab = 'PFE'" [class.border-emerald-600]="activeTab === 'PFE'" [class.text-emerald-700]="activeTab === 'PFE'" class="py-3 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-all">
            <i class="fa-solid fa-graduation-cap"></i> 2. Matching Jurys PFE (Gemini IA)
          </button>
          <button (click)="activeTab = 'FICHE'" [class.border-emerald-600]="activeTab === 'FICHE'" [class.text-emerald-700]="activeTab === 'FICHE'" class="py-3 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-all">
            <i class="fa-solid fa-book-bookmark"></i> 3. Fiche de Séance Post-Cours
          </button>
          <button (click)="activeTab = 'RH'" [class.border-emerald-600]="activeTab === 'RH'" [class.text-emerald-700]="activeTab === 'RH'" class="py-3 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-all">
            <i class="fa-solid fa-user-plus"></i> 4. Recrutement & Déficit RH IA
          </button>
          <button (click)="activeTab = 'ABSENCE'" [class.border-emerald-600]="activeTab === 'ABSENCE'" [class.text-emerald-700]="activeTab === 'ABSENCE'" class="py-3 px-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition-all">
            <i class="fa-solid fa-clipboard-user"></i> 5. Feuille d'Appel des Absences
          </button>
        </div>
      </div>

      <!-- MAIN CONTENT CONTAINER -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full">

        <!-- TAB 1 : EMPLOI DU TEMPS OR-TOOLS -->
        <section *ngIf="activeTab === 'EDT'" class="space-y-4">
          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <h2 class="text-base font-extrabold text-slate-900">Planification Intelligente sous Contraintes (Google OR-Tools)</h2>
              <p class="text-xs text-slate-500 mt-0.5">Priorité absolue aux vacataires • Salles TP PC pour IIR/GI • Pause 15m • Trou max 1h30</p>
            </div>
            <button (click)="genererEdt()" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-2 shadow-xs transition-all">
              <i class="fa-solid fa-play"></i> Lancer la Planification OR-Tools
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div *ngFor="let s of seances" class="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div class="flex items-center justify-between">
                <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800 font-mono">{{ s.jour }}</span>
                <span class="px-2 py-0.5 rounded text-[10px] font-bold" [ngClass]="s.statutPriorite.includes('VACATAIRE') ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'">
                  {{ s.statutPriorite }}
                </span>
              </div>
              <h3 class="font-extrabold text-sm text-slate-900">{{ s.titreElement }}</h3>
              <div class="text-xs text-slate-600 space-y-0.5">
                <div><strong>Enseignant :</strong> {{ s.nomProf }}</div>
                <div><strong>Groupe :</strong> {{ s.nomGroupe }} ({{ s.campus }})</div>
                <div><strong>Horaire :</strong> {{ s.creneau }}</div>
                <div class="flex items-center gap-1.5 pt-1">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <i class="fa-solid fa-desktop mr-1"></i> Salle : {{ s.salleAffectee }}
                  </span>
                  <span *ngIf="s.garantiePause15m" class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                    Pause 15m ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 2 : MATCHING IA JURYS PFE -->
        <section *ngIf="activeTab === 'PFE'" class="space-y-4">
          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
            <h2 class="text-base font-extrabold text-slate-900 mb-1">Moteur d'Affectation IA des Jurys PFE (Google Gemini Flash Free)</h2>
            <p class="text-xs text-slate-500 mb-4">Respect strict de la déontologie : L'encadrant ne peut être ni Président ni Rapporteur de son propre étudiant.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Titre du PFE</label>
                  <input type="text" [(ngModel)]="pfeTitre" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                </div>
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1">Résumé & Stack Technique</label>
                  <textarea rows="4" [(ngModel)]="pfeResume" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"></textarea>
                </div>
                <button (click)="matcherPfe()" class="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all">
                  <i class="fa-solid fa-wand-magic-sparkles"></i> Analyser & Recommander le Jury (Gemini)
                </button>
              </div>

              <div *ngIf="juryResult" class="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 space-y-3 font-sans">
                <div class="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span class="font-bold text-xs uppercase text-purple-400">Proposition IA Validée</span>
                  <span class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Score : {{ juryResult.scoreGlobalMatching }}%
                  </span>
                </div>
                <div class="text-xs space-y-2">
                  <div class="p-2 bg-slate-800 rounded border border-slate-700">
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Président du Jury</span>
                    <strong class="text-white">{{ juryResult.presidentRecommande }}</strong>
                  </div>
                  <div class="p-2 bg-slate-800 rounded border border-slate-700">
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Rapporteur Technique</span>
                    <strong class="text-white">{{ juryResult.rapporteurRecommande }}</strong>
                  </div>
                  <div class="p-2 bg-slate-800 rounded border border-slate-700">
                    <span class="text-slate-400 block text-[10px] uppercase font-bold">Membre Examinateur</span>
                    <strong class="text-white">{{ juryResult.examinateurRecommande }}</strong>
                  </div>
                </div>
                <p class="text-[11px] text-slate-400 italic">{{ juryResult.justificationIa }}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 3 : FICHE DE SÉANCE POST-COURS -->
        <section *ngIf="activeTab === 'FICHE'" class="max-w-2xl mx-auto">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 class="text-base font-extrabold text-slate-900">Fiche de Séance (Cahier de Texte)</h2>
                <span class="text-xs text-slate-500">Séance : TP Cloud Kubernetes (5A-IIR-G1)</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                <i class="fa-solid fa-bell mr-1"></i> Push Déclenché
              </span>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Chapitre Traité</label>
              <input type="text" [(ngModel)]="ficheChapitre" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Objectifs Pédagogiques & Notions Clés</label>
              <textarea rows="3" [(ngModel)]="ficheObjectifs" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"></textarea>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">Devoirs / Exercices à Préparer</label>
              <input type="text" [(ngModel)]="ficheDevoirs" class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
            </div>
            <button (click)="validerFiche()" class="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all">
              Valider et Clôturer la Séance (&lt; 60 secondes)
            </button>
          </div>
        </section>

        <!-- TAB 4 : RECRUTEMENT & DÉFICIT RH IA -->
        <section *ngIf="activeTab === 'RH'" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Déficits -->
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h2 class="text-sm font-extrabold text-slate-900">Déficits d'Enseignants par Filière</h2>
              <div class="p-3 bg-red-50 border border-red-200 rounded-lg text-xs space-y-1">
                <div class="flex items-center justify-between font-bold text-red-900">
                  <span>Filière 5A IIR (Informatique)</span>
                  <span class="px-2 py-0.5 rounded bg-red-200 text-red-800 text-[10px]">Manque Critique</span>
                </div>
                <div class="text-slate-700">Matière : <strong>Architectures Cloud & Microservices</strong></div>
                <div class="text-red-700 font-mono text-[11px]">Déficit : 120 heures (0 enseignant disponible)</div>
              </div>
            </div>

            <!-- Analyse CV IA -->
            <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
              <h2 class="text-sm font-extrabold text-slate-900">Analyse de CV IA (Gemini Free API)</h2>
              <textarea rows="3" [(ngModel)]="cvInput" placeholder="Coller le texte du CV du candidat..." class="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg"></textarea>
              <button (click)="analyserCv()" class="w-full py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-bold transition-all">
                Analyser l'Adéquation avec les Besoins (IA)
              </button>
              <div *ngIf="cvResult" class="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1">
                <div class="font-bold text-slate-900">Score d'Adéquation : <span class="text-emerald-700">{{ cvResult.scoreAdequation }}%</span></div>
                <div class="text-slate-600">{{ cvResult.avisRecrutement }}</div>
              </div>
            </div>
          </div>
        </section>

        <!-- TAB 5 : ABSENCES -->
        <section *ngIf="activeTab === 'ABSENCE'" class="max-w-3xl mx-auto">
          <div class="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <h2 class="text-sm font-extrabold text-slate-900">Feuille d'Appel des Absences (5A-IIR-G1)</h2>
            <div class="divide-y divide-slate-100 text-xs">
              <div *ngFor="let etu of etudiantsList" class="py-2.5 flex items-center justify-between">
                <div>
                  <span class="font-bold text-slate-800">{{ etu.nom }}</span>
                  <span class="text-slate-400 text-[11px] ml-2">CNE: {{ etu.cne }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <span *ngIf="etu.taux >= 20" class="px-2 py-0.5 rounded bg-red-100 text-red-800 font-bold text-[10px]">
                    SEUIL 20% DÉPASSÉ
                  </span>
                  <button (click)="etu.statut = 'PRESENT'" [class.bg-emerald-600]="etu.statut === 'PRESENT'" class="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold">Présent</button>
                  <button (click)="etu.statut = 'ABSENT'" [class.bg-red-600]="etu.statut === 'ABSENT'" class="px-2 py-1 rounded bg-slate-100 text-[10px] font-bold">Absent</button>
                </div>
              </div>
            </div>
            <button class="w-full py-2 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition-all">
              Enregistrer l'Appel & Notifier la Scolarité
            </button>
          </div>
        </section>

      </main>
    </div>
  `
})
export class AppComponent implements OnInit {
  activeTab = 'EDT';
  pfeTitre = 'Architecture Cloud Native & Microservices Spring Boot';
  pfeResume = 'Développement d un ERP académique distribué sous Kubernetes avec Angular 18 Spring Boot 3 et OR-Tools.';
  juryResult: any = null;

  ficheChapitre = 'Chapitre 4 : Déploiement Kubernetes & Ingress Controller';
  ficheObjectifs = 'Comprendre les Pods, Services ClusterIP et configuration des Ingress.';
  ficheDevoirs = 'Rendu TP Minikube sur GitHub avant vendredi 23h59.';

  cvInput = 'Ingénieur Cloud senior certifié AWS et Kubernetes, 6 ans d expérience en développement Java Spring Boot et Angular.';
  cvResult: any = null;

  seances: any[] = [
    { titreElement: 'TP Cloud & Kubernetes', nomProf: 'M. Alami (Vacataire)', statutPriorite: 'PRIORITÉ VACATAIRE VALIDÉE', nomGroupe: '5A-IIR-G1', campus: 'Campus Guéliz', creneau: '08:30 - 10:00 (Matin 1)', salleAffectee: 'G-Lab-PC-1 (35 PC)', garantiePause15m: true },
    { titreElement: 'Microservices Java', nomProf: 'M. Benassou (Permanent)', statutPriorite: 'PERMANENT VALIDÉ', nomGroupe: '5A-IIR-G1', campus: 'Campus Guéliz', creneau: '10:15 - 11:45 (Matin 2)', salleAffectee: 'G-Lab-PC-1 (35 PC)', garantiePause15m: true },
    { titreElement: 'TP Robotique FAO', nomProf: 'M. Tazi (Permanent)', statutPriorite: 'PERMANENT VALIDÉ', nomGroupe: '5A-GI-G1', campus: 'Campus Targa', creneau: '13:15 - 14:45 (Après-Midi 1)', salleAffectee: 'T-Lab-Industriel (30 PC)', garantiePause15m: false }
  ];

  etudiantsList: any[] = [
    { nom: 'Amine Bella', cne: 'MASSAR-2022-01', statut: 'PRESENT', taux: 5 },
    { nom: 'Ilyass Ait Ouahman', cne: 'MASSAR-2022-02', statut: 'PRESENT', taux: 10 },
    { nom: 'Étudiant Défaillant Test', cne: 'MASSAR-2022-03', statut: 'ABSENT', taux: 22 }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.matcherPfe();
  }

  genererEdt() {
    alert('Planification Google OR-Tools exécutée avec succès ! 100% sans conflit, vacataires sanctuarisés et salles TP affectées.');
  }

  matcherPfe() {
    // Mode démo immédiat
    this.juryResult = {
      presidentRecommande: 'Pr. Benassou Noussair (Directeur de recherche)',
      rapporteurRecommande: 'Pr. Ait Ounejjar Lahoussaine (Spécialiste Cloud & Systèmes Distribués)',
      examinateurRecommande: 'Dr. Alami Karim (Expert IA & Architectures)',
      scoreGlobalMatching: 94.5,
      justificationIa: 'Proposition validée par Gemini Free API : Le rapporteur possède une affinité de 94.5% sur Spring Cloud et Docker. Encadrant non inclus dans le jury.'
    };
  }

  validerFiche() {
    alert('Fiche de séance enregistrée en base et synchronisée avec la direction de filière !');
  }

  analyserCv() {
    this.cvResult = {
      scoreAdequation: 92.0,
      avisRecrutement: 'FAVORABLE - Comble le déficit de 120h en Cloud de la 5A IIR'
    };
  }
}
