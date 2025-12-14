package gamer.services;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ValidationService {
    
    public boolean validateChallenge1(String word) {
        // IMPLEMENT THIS FUNCTION
        // this function should return true if word is equal to DAVIS MAIN FLOOR
        return word.equals("DAVIS MAIN FLOOR");
    }
    
    public boolean validateChallenge2(List<List<String>> matches) {
        // Expected correct matches:
        // CSmajor -> CScareer (Computer Science -> Cloud Engineer)
        // FSmajor -> FScareer (Forensic Science -> Crime Scene Investigator)
        // BioMajor -> Biocareer (Biology -> Food Safety Inspector)
        
        boolean hasCorrectCS = false;
        boolean hasCorrectFS = false;
        boolean hasCorrectBio = false;
        
        for (List<String> match : matches) {
            if (match.size() >= 2) {
                String first = match.get(0);
                String second = match.get(1);
                
                // Check for correct CS match
                if ((first.equals("CSmajor") && second.equals("CScareer")) ||
                    (first.equals("CScareer") && second.equals("CSmajor"))) {
                    hasCorrectCS = true;
                }
                
                // Check for correct FS match
                if ((first.equals("FSmajor") && second.equals("FScareer")) ||
                    (first.equals("FScareer") && second.equals("FSmajor"))) {
                    hasCorrectFS = true;
                }
                
                // Check for correct Bio match
                if ((first.equals("BioMajor") && second.equals("Biocareer")) ||
                    (first.equals("Biocareer") && second.equals("BioMajor"))) {
                    hasCorrectBio = true;
                }
            }
        }
        
        return hasCorrectCS && hasCorrectFS && hasCorrectBio;
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

