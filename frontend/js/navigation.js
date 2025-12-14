// Navigation and Page Management
let gameState = {
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

// Initialize navigation on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeChallengeButtons();
    updateUI();
    // Show page based on URL hash, or default to home
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        showPage(hash, false);
    }
});

// Initialize challenge buttons
function initializeChallengeButtons() {
    const challengeButtons = document.querySelectorAll('.challenge-btn');
    challengeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const challenge = this.getAttribute('data-challenge');
            if (challenge === '1') {
                showPage('challenge1');
            } else if (challenge === '2') {
                showPage('challenge2');
            } else if (challenge === '3') {
                showPage('challenge3');
            } else if (challenge === 'final') {
                showPage('final-escape');
            }
        });
    });
}

// Show specific page
// updateHash: if true, updates URL hash (default: true)
function showPage(pageName, updateHash = true) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page-section');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        document.getElementById('home-page').classList.add('active');
        pageName = 'home';
    }

    // Update URL hash if requested
    if (updateHash) {
        window.location.hash = pageName;
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
        updateUI();
    }
}

function completeChallenge(challengeNumber) {
    gameState.challengesCompleted[`challenge${challengeNumber}`] = true;
    updateUI();
}

// Handle hash changes (back/forward browser buttons)
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);
});

