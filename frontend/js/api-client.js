const API_BASE_URL = 'http://localhost:8080/game';

async function validateChallenge1(word) {
    try {
        const requestBody = JSON.stringify({ word: word });
        console.log('Sending request to:', `${API_BASE_URL}/challenge1/validate`);
        console.log('Request body:', requestBody);
        console.log('Request headers:', { 'Content-Type': 'application/json' });
        
        const response = await fetch(`${API_BASE_URL}/challenge1/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: requestBody
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response body:', errorText);
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }
        
        const jsonResponse = await response.json();
        console.log('Success response:', jsonResponse);
        return jsonResponse;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

window.apiClient = {
    validateChallenge1
};

