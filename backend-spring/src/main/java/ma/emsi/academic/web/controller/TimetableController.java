package ma.emsi.academic.web.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import ma.emsi.academic.service.ai.GeminiAiServiceClient;
import ma.emsi.academic.service.solver.OrToolsTimetableSolver;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/v1/planning")
@CrossOrigin(origins = "*")
@Tag(name = "Planification & Emploi du Temps", description = "Endpoints pour la génération d'EDT sans conflits et l'arbitrage IA")
public class TimetableController {

    private final OrToolsTimetableSolver solver;
    private final GeminiAiServiceClient geminiAiClient;

    public TimetableController(OrToolsTimetableSolver solver, GeminiAiServiceClient geminiAiClient) {
        this.solver = solver;
        this.geminiAiClient = geminiAiClient;
    }

    @PostMapping("/generer")
    @Operation(summary = "Générer l'emploi du temps hebdomadaire avec priorité vacataires et contraintes campus/salles PC")
    public ResponseEntity<Map<String, Object>> genererEmploiDuTemps(@RequestBody Map<String, Object> payload) {
        // Mock / Données par défaut si non fournies
        List<Map<String, Object>> cours = List.of(
            Map.of("titreElement", "TP Cloud & Kubernetes", "necessiteSallePc", true, "nomProf", "M. Alami (Vacataire)", "statutEnseignant", "VACATAIRE", "nomGroupe", "5A-IIR-G1", "effectif", 28, "campusDuJour", "Campus Guéliz"),
            Map.of("titreElement", "Microservices Java", "necessiteSallePc", false, "nomProf", "M. Benassou (Permanent)", "statutEnseignant", "PERMANENT", "nomGroupe", "5A-IIR-G1", "effectif", 28, "campusDuJour", "Campus Guéliz"),
            Map.of("titreElement", "TP Robotique FAO", "necessiteSallePc", true, "nomProf", "M. Tazi (Permanent)", "statutEnseignant", "PERMANENT", "nomGroupe", "5A-GI-G1", "effectif", 24, "campusDuJour", "Campus Targa")
        );

        List<Map<String, Object>> salles = List.of(
            Map.of("code", "G-Lab-PC-1", "type", "TP_INFO_PC", "capacite", 35, "nombrePc", 35, "campus", "Campus Guéliz"),
            Map.of("code", "G-Salle-101", "type", "COURS_THEORIQUE", "capacite", 40, "nombrePc", 0, "campus", "Campus Guéliz"),
            Map.of("code", "T-Lab-Industriel", "type", "LABO_INDUSTRIEL", "capacite", 30, "nombrePc", 30, "campus", "Campus Targa")
        );

        List<Map<String, Object>> creneaux = List.of(
            Map.of("id", "C1", "jour", "Lundi", "libelle", "08:30 - 10:00 (Matin 1)"),
            Map.of("id", "C2", "jour", "Lundi", "libelle", "10:15 - 11:45 (Matin 2 - Après 15m pause)"),
            Map.of("id", "C3", "jour", "Lundi", "libelle", "13:15 - 14:45 (Après-Midi 1 - Trou max 1h30)")
        );

        Map<String, Object> resultat = solver.resoudrePlanification(cours, salles, creneaux);
        return ResponseEntity.ok(resultat);
    }

    @PostMapping("/matching-pfe-ia")
    @Operation(summary = "Matching IA sémantique pour la composition du jury de soutenance PFE (Gemini Free API)")
    public ResponseEntity<Map<String, Object>> matcherJuryPfe(@RequestBody Map<String, String> request) {
        String titre = request.getOrDefault("titre", "Plateforme Cloud Native & Microservices Spring Boot");
        String resume = request.getOrDefault("resume", "Développement d'un ERP académique conteneurisé sous Kubernetes avec Angular 18 et Spring Boot 3.");

        List<Map<String, String>> enseignants = List.of(
            Map.of("nom", "Pr. Benassou Noussair", "specialite", "Java / Spring Cloud / Microservices / DevOps", "statut", "PERMANENT"),
            Map.of("nom", "Pr. Ait Ounejjar Lahoussaine", "specialite", "Génie Logiciel / Systèmes Distribués / Architecture", "statut", "PERMANENT"),
            Map.of("nom", "Pr. Zgandri", "specialite", "Data Science / Gouvernance SI / Intelligence Artificielle", "statut", "PERMANENT"),
            Map.of("nom", "Dr. Alami Karim", "specialite", "Deep Learning / Vision par Ordinateur", "statut", "VACATAIRE")
        );

        Map<String, Object> resultat = geminiAiClient.matcherJuryPfe(titre, resume, enseignants);
        return ResponseEntity.ok(resultat);
    }

    @PostMapping("/analyse-cv-ia")
    @Operation(summary = "Analyse IA de CV d'enseignant candidat et détection d'adéquation avec les filières déficitaires")
    public ResponseEntity<Map<String, Object>> analyserCvCandidat(@RequestBody Map<String, String> request) {
        String cvTexte = request.getOrDefault("cvTexte", "Ingénieur Cloud senior certifié AWS et Kubernetes, 6 ans d'expérience en développement Java Spring Boot et Angular.");
        List<String> matieresDeficitaires = List.of("Java / Spring Cloud", "DevOps & Cloud");

        Map<String, Object> resultat = geminiAiClient.analyserCvCandidat(cvTexte, matieresDeficitaires);
        return ResponseEntity.ok(resultat);
    }
}
