function loadGameState() {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
        try {
            return JSON.parse(savedState);
        } catch (e) {
            console.error('Error parsing saved game state:', e);
        }
    }
    return {
        collectedLetters: {
            U: false,
            T: false,
            M: false
        },
        challengesCompleted: {
            challenge1: false,
            challenge2: false,
            challenge3: false
        }
    };
}

function saveGameState() {
    try {
        localStorage.setItem('gameState', JSON.stringify(gameState));
    } catch (e) {
        console.error('Error saving game state:', e);
    }
}

let gameState = loadGameState();
window.gameState = gameState;

function initializeGame() {
    // Always reload game state from localStorage to get latest state
    gameState = loadGameState();
    window.gameState = gameState;
    
    if (document.getElementById('home-page') || !window.location.pathname.includes('challenge')) {
        initializeChallengeButtons();
        updateUI();
    } else {
        updateUI();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
});

// Also call on page show (when user navigates back)
window.addEventListener('pageshow', function(event) {
    initializeGame();
});

function initializeChallengeButtons() {
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    challengeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const challenge = this.getAttribute('data-challenge');
            if (challenge === '1') {
                window.location.href = 'challenge1.html';
            } else if (challenge === '2') {
                window.location.href = 'challenge2.html';
            } else if (challenge === '3') {
                window.location.href = 'challenge3.html';
            } else if (challenge === 'final') {
                window.location.href = 'final-escape.html';
            }
        });
    });
}


function updateUI() {
    updateProgressIndicator();
    updateChallengeButtons();
}

function updateProgressIndicator() {
    const letters = ['U', 'T', 'M'];
    letters.forEach(letter => {
        const letterElement = document.getElementById(`letter-${letter.toLowerCase()}`);
        if (letterElement) {
            if (gameState.collectedLetters[letter]) {
                letterElement.classList.add('collected');
            } else {
                letterElement.classList.remove('collected');
            }
        }
    });
}

function updateChallengeButtons() {
    const challenge1Btn = document.querySelector('button[data-challenge="1"]');
    const challenge2Btn = document.querySelector('button[data-challenge="2"]');
    const challenge3Btn = document.querySelector('button[data-challenge="3"]');
    const finalBtn = document.querySelector('button[data-challenge="final"]');

    if (challenge1Btn) {
        challenge1Btn.disabled = false;
    }

    if (challenge2Btn) {
        const shouldEnable = gameState.challengesCompleted.challenge1;
        challenge2Btn.disabled = !shouldEnable;
        if (shouldEnable) {
            challenge2Btn.classList.remove('disabled');
        } else {
            challenge2Btn.classList.add('disabled');
        }
    }

    if (challenge3Btn) {
        challenge3Btn.disabled = !gameState.challengesCompleted.challenge2;
        if (gameState.challengesCompleted.challenge2) {
            challenge3Btn.classList.remove('disabled');
        } else {
            challenge3Btn.classList.add('disabled');
        }
    }

    if (finalBtn) {
        const allLettersCollected = gameState.collectedLetters.U && 
                                   gameState.collectedLetters.T && 
                                   gameState.collectedLetters.M;
        finalBtn.disabled = !allLettersCollected;
    }
}

function collectLetter(letter) {
    if (['U', 'T', 'M'].includes(letter)) {
        gameState.collectedLetters[letter] = true;
        if (window.gameState) {
            window.gameState.collectedLetters[letter] = true;
        }
        saveGameState();
        updateUI();
    }
}

function completeChallenge(challengeNumber) {
    gameState.challengesCompleted[`challenge${challengeNumber}`] = true;
    if (window.gameState) {
        window.gameState.challengesCompleted[`challenge${challengeNumber}`] = true;
    }
    saveGameState();
    // Reload game state to ensure consistency
    gameState = loadGameState();
    window.gameState = gameState;
    updateUI();
}

window.completeChallenge = completeChallenge;
window.updateUI = updateUI;
window.saveGameState = saveGameState;
