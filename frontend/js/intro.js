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
            isTyping = false;
            clearInterval(typewriterInterval);
            setTimeout(() => {
                hideIntroScreen();
            }, 2000);
            return;
        }
        
        const currentLine = introText[currentLineIndex];
        
        let currentLi = olElement.children[currentLineIndex];
        if (!currentLi) {
            currentLi = document.createElement('li');
            olElement.appendChild(currentLi);
        }
        
        if (currentCharIndex < currentLine.length) {
            const char = currentLine[currentCharIndex];
            if (char === 'U' || char === 'T' || char === 'M') {
                currentLi.innerHTML += `<strong>${char}</strong>`;
            } else {
                currentLi.textContent += char;
            }
            currentCharIndex++;
        } else {
            currentLineIndex++;
            currentCharIndex = 0;
        }
    }
    
    setTimeout(() => {
        typewriterInterval = setInterval(typeNextChar, 50);
    }, 1000);
}

function hideIntroScreen() {
    const introScreen = document.getElementById('intro-screen');
    if (introScreen) {
        introScreen.classList.add('hidden');
        const gameContainer = document.querySelector('.game-container');
        if (gameContainer) {
            gameContainer.style.display = 'flex';
        }
        localStorage.setItem('introShown', 'true');
    }
}

function skipIntro() {
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }
    hideIntroScreen();
}

document.addEventListener('DOMContentLoaded', function() {
    const introShown = localStorage.getItem('introShown');
    
    if (introShown === 'true') {
        hideIntroScreen();
        return;
    }
    
    const gameContainer = document.querySelector('.game-container');
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }
    
    startTypewriter();
    
    const skipBtn = document.getElementById('skip-intro-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', skipIntro);
    }
    
    window.skipIntro = skipIntro;
});
