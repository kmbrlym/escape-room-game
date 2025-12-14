package gamer.models;

import java.util.HashMap;
import java.util.Map;

public class GameState {
    private Map<String, Boolean> collectedLetters;
    private Map<String, Boolean> challengesCompleted;
    
    public GameState() {
        this.collectedLetters = new HashMap<>();
        this.collectedLetters.put("U", false);
        this.collectedLetters.put("T", false);
        this.collectedLetters.put("M", false);
        
        this.challengesCompleted = new HashMap<>();
        this.challengesCompleted.put("challenge1", false);
        this.challengesCompleted.put("challenge2", false);
        this.challengesCompleted.put("challenge3", false);
    }
    
    public Map<String, Boolean> getCollectedLetters() {
        return collectedLetters;
    }
    
    public void setCollectedLetters(Map<String, Boolean> collectedLetters) {
        this.collectedLetters = collectedLetters;
    }
    
    public Map<String, Boolean> getChallengesCompleted() {
        return challengesCompleted;
    }
    
    public void setChallengesCompleted(Map<String, Boolean> challengesCompleted) {
        this.challengesCompleted = challengesCompleted;
    }
}

