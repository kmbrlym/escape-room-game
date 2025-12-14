// Intro Screen with Typewriter Effect
const introText = [
    "Complete challenges in order to collect code letters",
    "Each challenge unlocks the next one",
    "Collect all three letters: U, T, M",
    "Use the complete code to unlock the Final Escape",
    "Good luck and have fun!"
];

let currentLineIndex = 0;
let currentCharIndex = 0;
let isTyping = false;
let typewriterInterval = null;

function startTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    isTyping = true;
    typewriterElement.innerHTML = '<ol></ol>';
    const olElement = typewriterElement.querySelector('ol');
    
    function typeNextChar() {
        if (currentLineIndex >= introText.length) {
            // Finished typing
            isTyping = false;
            clearInterval(typewriterInterval);
            // Wait a bit then transition to main game
            setTimeout(() => {
                hideIntroScreen();
            }, 2000);
            return;
        }
        
        const currentLine = introText[currentLineIndex];
        
        // Get or create the current list item
        let currentLi = olElement.children[currentLineIndex];
        if (!currentLi) {
            currentLi = document.createElement('li');
            olElement.appendChild(currentLi);
        }
        
        // Add next character
        if (currentCharIndex < currentLine.length) {
            const char = currentLine[currentCharIndex];
            // Handle special formatting for U, T, M
            if (char === 'U' || char === 'T' || char === 'M') {
                currentLi.innerHTML += `<strong>${char}</strong>`;
            } else {
                currentLi.textContent += char;
            }
            currentCharIndex++;
        } else {
            // Move to next line
            currentLineIndex++;
            currentCharIndex = 0;
        }
    }
    
    // Start typing with a delay
    setTimeout(() => {
        typewriterInterval = setInterval(typeNextChar, 50); // 50ms per character
    }, 1000);
}

function hideIntroScreen() {
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        introScreen.classList.add('hidden');
        // Show the main game container
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.style.display = 'flex';
        }
    }
}

function skipIntro() {
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    hideIntroScreen();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Hide main game container initially
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }
    
    // Start typewriter effect
    startTypewriter();
    
    // Setup skip button
    const skipBtn = document.getElementById('skip-intro-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', skipIntro);
    }
    
    // Make skipIntro globally accessible
    window.skipIntro = skipIntro;
});

