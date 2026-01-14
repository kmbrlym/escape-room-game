package gamer.controllers;

import gamer.models.Challenge3Request;
import gamer.models.ChallengeResponse;
import gamer.models.GameState;
import gamer.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game/challenge3")
public class Challenge3Controller {

    @Autowired
    private ValidationService validationService;

    @PostMapping("/validate")
    public ResponseEntity<ChallengeResponse> validateChallenge3(@RequestBody Challenge3Request request) {
        if (request == null || request.getAnswers() == null) {
            ChallengeResponse response = new ChallengeResponse(
                    false,
                    "Invalid request. Please provide your selected answers."
            );
            return ResponseEntity.badRequest().body(response);
        }

        List<String> answers = request.getAnswers();
        if (answers.size() != 5) {
            ChallengeResponse response = new ChallengeResponse(
                    false,
                    "Please answer all 5 questions before submitting."
            );
            return ResponseEntity.ok(response);
        }

        boolean isValid = validationService.validateChallenge3(answers);

        if (isValid) {
            ChallengeResponse response = new ChallengeResponse(
                    true,
                    "Excellent choices! Those are strong interview responses. Take the third letter for your code component.",
                    "M"
            );

            GameState gameState = new GameState();
            // Preserve previously collected letters (U/T) for the full code
            gameState.getCollectedLetters().put("U", true);
            gameState.getCollectedLetters().put("T", true);
            gameState.getCollectedLetters().put("M", true);
            gameState.getChallengesCompleted().put("challenge1", true);
            gameState.getChallengesCompleted().put("challenge2", true);
            gameState.getChallengesCompleted().put("challenge3", true);
            response.setGameState(gameState);

            return ResponseEntity.ok(response);
        } else {
            ChallengeResponse response = new ChallengeResponse(
                    false,
                    "Not quite—some choices could be improved. Re-read each question and pick the most professional response."
            );
            return ResponseEntity.ok(response);
        }
    }
}

