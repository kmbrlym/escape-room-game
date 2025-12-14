package gamer.models;

import java.util.List;

public class Challenge2Request {
    private List<List<String>> matches;
    
    public Challenge2Request() {
    }
    
    public Challenge2Request(List<List<String>> matches) {
        this.matches = matches;
    }
    
    public List<List<String>> getMatches() {
        return matches;
    }
    
    public void setMatches(List<List<String>> matches) {
        this.matches = matches;
    }
}
