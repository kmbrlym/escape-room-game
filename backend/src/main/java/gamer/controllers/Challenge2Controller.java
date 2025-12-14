package gamer.controllers;

import gamer.models.Challenge2Request;
import gamer.models.ChallengeResponse;
import gamer.models.GameState;
import gamer.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game/challenge2")
public class Challenge2Controller {
    
    @Autowired
    private ValidationService validationService;
    
    @PostMapping("/validate")
    public ResponseEntity<ChallengeResponse> validateChallenge2(@RequestBody Challenge2Request request) {
        if (request == null || request.getMatches() == null || request.getMatches().isEmpty()) {
            ChallengeResponse response = new ChallengeResponse(
                false,
                "Invalid request. Please provide matches."
            );
            return ResponseEntity.badRequest().body(response);
        }
        
        List<List<String>> matches = request.getMatches();
        
        if (matches.size() != 3) {
            ChallengeResponse response = new ChallengeResponse(
                false,
                "Please match all 3 majors to their corresponding careers."
            );
            return ResponseEntity.ok(response);
        }
        
        boolean isValid = validationService.validateChallenge2(matches);
        
        if (isValid) {
            ChallengeResponse response = new ChallengeResponse(
                true,
                "Congratulations! You correctly matched the majors to the careers. Take the second letter for your code component.",
                "T"
            );
            
            GameState gameState = new GameState();
            // Preserve previously collected letters (U from challenge 1)
            gameState.getCollectedLetters().put("U", true);
            gameState.getCollectedLetters().put("T", true);
            gameState.getChallengesCompleted().put("challenge1", true);
            gameState.getChallengesCompleted().put("challenge2", true);
            response.setGameState(gameState);
            
            return ResponseEntity.ok(response);
        } else {
            ChallengeResponse response = new ChallengeResponse(
                false,
                "That's not quite right. Try matching the majors to the careers again!"
            );
            return ResponseEntity.ok(response);
        }
    }
}

