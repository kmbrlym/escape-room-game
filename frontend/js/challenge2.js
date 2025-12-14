let all_matches = [];
let current_matchings = [];
let listenersSetup = false;

const cardHandlers = {
    CSmajor: null,
    CScareer: null,
    FSmajor: null,
    BioMajor: null,
    FScareer: null,
    Biocareer: null
};

function handleCardClick(cardId) {
    if (current_matchings.length > 0 && current_matchings[current_matchings.length - 1] === cardId) {
        return;
    }
    
    current_matchings.push(cardId);
    
    if (current_matchings.length === 2) {
        all_matches.push([...current_matchings]);
        current_matchings = [];
    }
    
    const cardBody = document.getElementById(cardId);
    const cardElement = cardBody ? cardBody.closest('.example-card') : null;
    
    if (cardElement) {
        cardElement.classList.add('disabled');
        cardElement.style.opacity = '0.5';
        cardElement.style.cursor = 'not-allowed';
        cardElement.style.pointerEvents = 'none';
        cardElement.style.filter = 'grayscale(100%)';
    }
}

function setupEventListeners() {
    if (listenersSetup) return;
    
    const CSmajor = document.getElementById('CSmajor');
    const CScareer = document.getElementById('CScareer');
    const FSmajor = document.getElementById('FSmajor');
    const BioMajor = document.getElementById('BioMajor');
    const FScareer = document.getElementById('FScareer');
    const Biocareer = document.getElementById('Biocareer');
    
    if (!CSmajor || !CScareer || !FSmajor || !BioMajor || !FScareer || !Biocareer) {
        return;
    }
    
    cardHandlers.CSmajor = () => handleCardClick('CSmajor');
    cardHandlers.CScareer = () => handleCardClick('CScareer');
    cardHandlers.FSmajor = () => handleCardClick('FSmajor');
    cardHandlers.BioMajor = () => handleCardClick('BioMajor');
    cardHandlers.FScareer = () => handleCardClick('FScareer');
    cardHandlers.Biocareer = () => handleCardClick('Biocareer');
    
    CSmajor.addEventListener('click', cardHandlers.CSmajor);
    CScareer.addEventListener('click', cardHandlers.CScareer);
    FSmajor.addEventListener('click', cardHandlers.FSmajor);
    BioMajor.addEventListener('click', cardHandlers.BioMajor);
    FScareer.addEventListener('click', cardHandlers.FScareer);
    Biocareer.addEventListener('click', cardHandlers.Biocareer);
    
    const clearBtn = document.getElementById('clear-assembly-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearChallenge2);
    }
    
    listenersSetup = true;
}

function clearChallenge2() {
    location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    window.clearChallenge2 = clearChallenge2;
});

window.checkAnswerChallenge2 = async function checkAnswerChallenge2() {
    const checkBtn = document.getElementById('check-answer-btn');
    if (!checkBtn) return;
    
    checkBtn.disabled = true;
    checkBtn.textContent = 'Checking...';
    
    try {
        if (!window.apiClient || !window.apiClient.validateChallenge2) {
            showError('API client not loaded. Please refresh the page.');
            checkBtn.disabled = false;
            checkBtn.textContent = 'Check Answer';
            return;
        }
        
        const response = await window.apiClient.validateChallenge2(all_matches);
        
        if (response.success) {
            showSuccess(response);
            
            if (response.gameState && window.gameState) {
                if (response.gameState.collectedLetters) {
                    Object.keys(response.gameState.collectedLetters).forEach(letter => {
                        if (response.gameState.collectedLetters[letter] === true) {
                            window.gameState.collectedLetters[letter] = true;
                        }
                    });
                }
                if (response.gameState.challengesCompleted) {
                    Object.keys(response.gameState.challengesCompleted).forEach(challenge => {
                        if (response.gameState.challengesCompleted[challenge] === true) {
                            window.gameState.challengesCompleted[challenge] = true;
                        }
                    });
                }
            }
            
            if (typeof collectLetter === 'function') {
                collectLetter('T');
            }
            
            if (typeof completeChallenge === 'function') {
                completeChallenge(2);
            }
            
            if (window.saveGameState && typeof window.saveGameState === 'function') {
                window.saveGameState();
            } else {
                try {
                    localStorage.setItem('gameState', JSON.stringify(window.gameState));
                } catch (e) {
                    console.error('Error saving game state:', e);
                }
            }
            
            if (typeof updateUI === 'function') {
                updateUI();
            }
        } else {
            showError(response.message || 'That\'s not quite right. Try again!');
        }
    } catch (error) {
        const errorMessage = error.message || 'Unknown error';
        if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError') || errorMessage.includes('CORS')) {
            showError('Error connecting to server. Make sure: 1) Backend is running on http://localhost:8080, 2) Frontend is served on http://localhost:8000 (not file://). Run: cd frontend && python3 -m http.server 8000');
        } else {
            showError(`Error: ${errorMessage}`);
        }
    } finally {
        checkBtn.disabled = false;
        checkBtn.textContent = 'Check Answer';
    }
}

function showSuccess(response) {
    const message = response.message || 'Congratulations! You correctly matched the majors to the careers!';
    const codeComponent = response.codeComponent || 'T';
    alert(`🎉 ${message}\n\nCode Component: ${codeComponent}`);
}

function showError(message) {
    alert(`❌ ${message}`);
}
