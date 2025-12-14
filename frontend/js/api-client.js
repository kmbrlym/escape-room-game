const API_BASE_URL = 'http://localhost:8080/game';

async function validateChallenge1(word) {
    try {
        const requestBody = JSON.stringify({ word: word });
        const response = await fetch(`${API_BASE_URL}/challenge1/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: requestBody
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

async function validateChallenge2(matches) {
    try {
        const requestBody = JSON.stringify({matches: matches});
        const response = await fetch(`${API_BASE_URL}/challenge2/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: requestBody
        });
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }   
}

window.apiClient = {
    validateChallenge1,
    validateChallenge2
};
