package gamer.controllers;

import gamer.models.Challenge1Request;
import gamer.models.ChallengeResponse;
import gamer.models.GameState;
import gamer.services.ValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game/challenge1")
public class Challenge1Controller {
    
    @Autowired
    private ValidationService validationService;
    
    @PostMapping("/validate")
    public ResponseEntity<ChallengeResponse> validateChallenge1(@RequestBody Challenge1Request request) {
        if (request == null || request.getWord() == null) {
            ChallengeResponse response = new ChallengeResponse(
                false,
                "Invalid request. Please provide a word."
            );
            return ResponseEntity.badRequest().body(response);
        }
        
        boolean isValid = validationService.validateChallenge1(request.getWord());
        
        if (isValid) {
            ChallengeResponse response = new ChallengeResponse(
                true,
                "Congratulations! You correctly assembled the location. Take the first letter for your code component.",
                "U"
            );
            
            GameState gameState = new GameState();
            gameState.getCollectedLetters().put("U", true);
            gameState.getChallengesCompleted().put("challenge1", true);
            response.setGameState(gameState);
            
            return ResponseEntity.ok(response);
        } else {
            ChallengeResponse response = new ChallengeResponse(
                false,
                "That's not quite right. Try rearranging the letters again!"
            );
            return ResponseEntity.ok(response);
        }
    }
}

