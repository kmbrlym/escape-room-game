package gamer.models;

public class Challenge1Request {
    private String word;
    private String sessionId;
    
    public Challenge1Request() {
    }
    
    public Challenge1Request(String word) {
        this.word = word;
    }
    
    public String getWord() {
        return word;
    }
    
    public void setWord(String word) {
        this.word = word;
    }
    
    public String getSessionId() {
        return sessionId;
    }
    
    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}

