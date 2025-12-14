package gamer.services;

import org.springframework.stereotype.Service;

@Service
public class ValidationService {
    
    public boolean validateChallenge1(String word) {
        // IMPLEMENT THIS FUNCTION
        // this function should return true if word is equal to DAVIS MAIN FLOOR
        return word.equals("DAVIS MAIN FLOOR");
    }
    
    public boolean validateChallenge2(String majorA, String majorB, String majorC) {
        return false;
    }
    
    public boolean validateChallenge3(String programI, String programII, String programIII) {
        return false;
    }
    
    public boolean validateFinalEscape(String code) {
        if (code == null) {
            return false;
        }
        return code.trim().toUpperCase().equals("UTM");
    }
}

