package gamer.models;

import java.util.List;

public class Challenge3Request {
    private List<String> answers;

    public Challenge3Request() {
    }

    public Challenge3Request(List<String> answers) {
        this.answers = answers;
    }

    public List<String> getAnswers() {
        return answers;
    }

    public void setAnswers(List<String> answers) {
        this.answers = answers;
    }
}

