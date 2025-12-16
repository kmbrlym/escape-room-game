package gamer.services;

import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ValidationService {
    
    public boolean validateChallenge1(String word) {
        // IMPLEMENT THIS FUNCTION
        // this function should return true if word is equal to DAVIS MAIN FLOOR
        // how can you check equality in java?
        // from the java documentation: https://docs.oracle.com/javase/8/docs/api/java/lang/String.html
        // hint: it is the equals(Object anObject) method
        result = false;
        if (word=="DAVIS MAIN FLOOR"){result=true}
        return result;
    
    }
    
    public boolean validateChallenge2(List<List<String>> matches) {
        // This function checks whether the student matched
        // each major with its correct career.

        // The correct matches are:
        // CSmajor  ↔  CScareer
        // FSmajor  ↔  FScareer
        // BioMajor ↔  Biocareer

        // 'matches' is a list of pairs.
        // Each inner list contains two strings.
        // Example:
        // [
        //   ["CSmajor", "CScareer"],
        //   ["FSmajor", "FScareer"]
        // ]

        // Create boolean variables to track whether each correct match is found
        // (start them as false)

        // Loop through each match in the matches list

            // For each match:
            // 1. Make sure it has two items
            // 2. Get the first and second strings
            // 3. Use .equals() to compare strings (NOT ==)
            // 4. Check if the pair matches one of the correct major–career combinations
            // 5. If a correct pair is found, update the corresponding boolean

        // After checking all matches:
        // If ALL three correct pairs were found, return true
        // Otherwise, return false
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

