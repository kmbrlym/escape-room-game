package gamer.models;

public class ChallengeResponse {
    private boolean success;
    private String message;
    private String codeComponent;
    private GameState gameState;
    
    public ChallengeResponse() {
    }
    
    public ChallengeResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
    
    public ChallengeResponse(boolean success, String message, String codeComponent) {
        this.success = success;
        this.message = message;
        this.codeComponent = codeComponent;
    }
    
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getCodeComponent() {
        return codeComponent;
    }
    
    public void setCodeComponent(String codeComponent) {
        this.codeComponent = codeComponent;
    }
    
    public GameState getGameState() {
        return gameState;
    }
    
    public void setGameState(GameState gameState) {
        this.gameState = gameState;
    }
}

