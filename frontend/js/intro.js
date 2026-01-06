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

// Video Overlay Functions
function initVideoOverlay() {
    const videoOverlay = document.getElementById('video-overlay');
    const video = document.getElementById('intro-video');
    const closeBtn = document.getElementById('close-video-btn');
    
    if (!videoOverlay || !video || !closeBtn) {
        console.error('Video overlay elements not found');
        return;
    }
    
    // Always show video overlay on page load (removed localStorage check)
    // Ensure overlay is visible (remove hidden class if present)
    videoOverlay.classList.remove('hidden');
    
    // Hide intro screen and game container initially
    const introScreen = document.getElementById('intro-screen');
    const gameContainer = document.querySelector('.game-container');
    if (introScreen) {
        introScreen.style.display = 'none';
    }
    if (gameContainer) {
        gameContainer.style.display = 'none';
    }
    
    // Reset video to beginning and try to play
    video.currentTime = 0;
    video.muted = true; // Start muted for autoplay compatibility
    const playPromise = video.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => {
            console.log('Video autoplay was prevented:', error);
            // Video will still be visible, user can click to play
        });
    }
    
    // Watch for overlay being hidden and pause video
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                if (videoOverlay.classList.contains('hidden')) {
                    if (video && !video.paused) {
                        video.pause();
                        video.currentTime = 0;
                    }
                }
            }
        });
    });
    observer.observe(videoOverlay, { attributes: true, attributeFilter: ['class'] });
    
    // Close button handler - use stopPropagation to prevent event bubbling
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        e.preventDefault();
        console.log('Close button clicked');
        closeVideoOverlay();
    }, true); // Use capture phase to ensure it fires
    
    // Also allow closing with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !videoOverlay.classList.contains('hidden')) {
            closeVideoOverlay();
        }
    });
}

function closeVideoOverlay() {
    console.log('closeVideoOverlay called');
    const videoOverlay = document.getElementById('video-overlay');
    const video = document.getElementById('intro-video');
    const introScreen = document.getElementById('intro-screen');
    const gameContainer = document.querySelector('.game-container');
    
    if (!videoOverlay) {
        console.error('Video overlay not found');
        return;
    }
    
    // Pause and reset video BEFORE hiding overlay
    if (video) {
        try {
            // Force pause - multiple methods to ensure it stops
            video.pause();
            // Reset to beginning
            video.currentTime = 0;
            // Reset muted state
            video.muted = true;
            // Remove autoplay attribute
            video.removeAttribute('autoplay');
            
            // Additional: Set playback rate to 0 to ensure it stops
            if (video.playbackRate !== undefined) {
                video.playbackRate = 0;
            }
            
            console.log('Video paused and reset. Paused state:', video.paused);
        } catch (error) {
            console.error('Error pausing video:', error);
        }
    } else {
        console.error('Video element not found');
    }
    
    // Hide video overlay
    videoOverlay.classList.add('hidden');
    // Note: Not storing in localStorage so video always shows on page load
    
    // Show intro screen or game container
    const introShown = localStorage.getItem('introShown');
    if (introShown === 'true') {
        if (gameContainer) {
            gameContainer.style.display = 'flex';
        }
    } else {
        if (introScreen) {
            introScreen.style.display = 'flex';
        }
        // Start the intro typewriter after video closes
        startTypewriter();
    }
}

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
    // Initialize video overlay first - it will always show
    initVideoOverlay();
    
    // Set up intro screen skip button
    const skipBtn = document.getElementById('skip-intro-btn');
    if (skipBtn) {
        skipBtn.addEventListener('click', skipIntro);
    }
    
    window.skipIntro = skipIntro;
});
