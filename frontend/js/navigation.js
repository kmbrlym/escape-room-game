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

document.addEventListener('DOMContentLoaded', function() {
    gameState = loadGameState();
    window.gameState = gameState;
    
    if (document.getElementById('home-page') || !window.location.pathname.includes('challenge')) {
        initializeChallengeButtons();
        updateUI();
    } else {
        updateUI();
    }
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

function showPage(pageName) {
    if (pageName === 'challenge1') {
        window.location.href = 'challenge1.html';
    } else if (pageName === 'challenge2') {
        window.location.href = 'challenge2.html';
    } else if (pageName === 'challenge3') {
        window.location.href = 'challenge3.html';
    } else if (pageName === 'final-escape') {
        window.location.href = 'final-escape.html';
    } else if (pageName === 'home') {
        window.location.href = 'index.html';
    }
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
    const challenge1Btn = document.querySelector('[data-challenge="1"]');
    const challenge2Btn = document.querySelector('[data-challenge="2"]');
    const challenge3Btn = document.querySelector('[data-challenge="3"]');
    const finalBtn = document.querySelector('[data-challenge="final"]');

    if (challenge1Btn) {
        challenge1Btn.disabled = false;
    }

    if (challenge2Btn) {
        challenge2Btn.disabled = !gameState.challengesCompleted.challenge1;
    }

    if (challenge3Btn) {
        challenge3Btn.disabled = !gameState.challengesCompleted.challenge2;
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
    updateUI();
}

window.updateUI = updateUI;
window.saveGameState = saveGameState;

window.addEventListener('hashchange', function() {
    if (document.getElementById('home-page')) {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    }
});
