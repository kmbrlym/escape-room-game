const CHALLENGE1_LETTERS = ['D', 'A', 'V', 'I', 'S', 'M', 'A', 'I', 'N', 'F', 'L', 'O', 'O', 'R'];

let selectedLetters = [];
let availableLetters = [...CHALLENGE1_LETTERS];
let listenersSetup = false;

function initChallenge1() {
    selectedLetters = new Array(16).fill(null);
    selectedLetters[5] = ' ';
    selectedLetters[10] = ' ';
    availableLetters = [...CHALLENGE1_LETTERS];
    listenersSetup = false;
    
    const letterBin = document.getElementById('letter-bin');
    const assemblyArea = document.getElementById('assembly-area');
    
    if (!letterBin || !assemblyArea) return;
    
    letterBin.innerHTML = '';
    assemblyArea.querySelectorAll('.assembly-slot').forEach(slot => {
        const isSpaceSlot = slot.dataset.space === 'true';
        if (!isSpaceSlot) {
            slot.innerHTML = '';
            slot.classList.remove('filled');
        } else {
            slot.innerHTML = '<span class="space-indicator">_</span>';
        }
    });
    
    shuffleArray(availableLetters);
    availableLetters.forEach((letter, index) => {
        const letterElement = createLetterElement(letter, index, 'bin');
        letterBin.appendChild(letterElement);
    });
    
    setupEventListeners();
}

function createLetterElement(letter, index, source) {
    const letterDiv = document.createElement('div');
    letterDiv.className = 'letter-tile';
    letterDiv.textContent = letter;
    letterDiv.dataset.letter = letter;
    letterDiv.dataset.index = index;
    letterDiv.dataset.source = source;
    
    letterDiv.draggable = true;
    letterDiv.addEventListener('dragstart', handleDragStart);
    letterDiv.addEventListener('click', handleLetterClick);
    
    return letterDiv;
}

function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', JSON.stringify({
        letter: e.target.dataset.letter,
        source: e.target.dataset.source,
        index: e.target.dataset.index
    }));
    e.target.classList.add('dragging');
}

function handleLetterClick(e) {
    const letter = e.target.dataset.letter;
    const source = e.target.dataset.source;
    
    if (source === 'bin') {
        const firstEmptySlot = document.querySelector('.assembly-slot:not(.filled):not(.space-slot)');
        if (firstEmptySlot) {
            placeLetterInSlot(letter, firstEmptySlot);
            e.target.remove();
        }
    } else if (source === 'assembly') {
        const slotIndex = parseInt(e.target.dataset.index);
        selectedLetters[slotIndex] = null;
        e.target.remove();
        
        const letterElement = createLetterElement(letter, availableLetters.length, 'bin');
        document.getElementById('letter-bin').appendChild(letterElement);
        
        const slot = document.querySelector(`.assembly-slot[data-index="${slotIndex}"]`);
        if (slot && slot.dataset.space !== 'true') {
            slot.classList.remove('filled');
            slot.innerHTML = '';
        }
    }
}

function setupEventListeners() {
    if (listenersSetup) return;
    
    const assemblyArea = document.getElementById('assembly-area');
    const slots = assemblyArea ? assemblyArea.querySelectorAll('.assembly-slot') : [];
    const checkBtn = document.getElementById('check-answer-btn');
    const clearBtn = document.getElementById('clear-assembly-btn');
    
    if (!assemblyArea || !checkBtn || !clearBtn) return;
    
    slots.forEach(slot => {
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragleave', handleDragLeave);
    });
    
    checkBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        checkAnswer();
    });
    
    clearBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        clearAssembly();
    });
    
    listenersSetup = true;
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    
    if (e.currentTarget.dataset.space === 'true') return;
    
    const data = JSON.parse(e.dataTransfer.getData('text/plain'));
    const letter = data.letter;
    const source = data.source;
    
    document.querySelectorAll('.letter-tile').forEach(tile => {
        tile.classList.remove('dragging');
    });
    
    if (source === 'bin') {
        const sourceElement = document.querySelector(`[data-source="bin"][data-letter="${letter}"][data-index="${data.index}"]`);
        if (sourceElement) {
            sourceElement.remove();
        }
    } else if (source === 'assembly') {
        const slotIndex = parseInt(data.index);
        selectedLetters[slotIndex] = null;
        const previousSlot = document.querySelector(`.assembly-slot[data-index="${slotIndex}"]`);
        if (previousSlot && previousSlot.dataset.space !== 'true') {
            previousSlot.classList.remove('filled');
            previousSlot.innerHTML = '';
        }
    }
    
    placeLetterInSlot(letter, e.currentTarget);
}

function placeLetterInSlot(letter, slot) {
    if (slot.dataset.space === 'true') return;
    
    const slotIndex = parseInt(slot.dataset.index);
    
    if (selectedLetters[slotIndex] && selectedLetters[slotIndex] !== ' ') {
        const existingLetter = selectedLetters[slotIndex];
        const letterElement = createLetterElement(existingLetter, availableLetters.length, 'bin');
        document.getElementById('letter-bin').appendChild(letterElement);
    }
    
    selectedLetters[slotIndex] = letter;
    slot.classList.add('filled');
    
    const letterElement = createLetterElement(letter, slotIndex, 'assembly');
    slot.appendChild(letterElement);
}

function clearAssembly() {
    selectedLetters = new Array(16).fill(null);
    selectedLetters[5] = ' ';
    selectedLetters[10] = ' ';
    
    const assemblyArea = document.getElementById('assembly-area');
    const letterBin = document.getElementById('letter-bin');
    
    assemblyArea.querySelectorAll('.assembly-slot').forEach(slot => {
        const isSpaceSlot = slot.dataset.space === 'true';
        if (isSpaceSlot) {
            slot.innerHTML = '<span class="space-indicator">_</span>';
        } else {
            const letterTile = slot.querySelector('.letter-tile');
            if (letterTile) {
                const letter = letterTile.dataset.letter;
                const letterElement = createLetterElement(letter, availableLetters.length, 'bin');
                letterBin.appendChild(letterElement);
                slot.innerHTML = '';
                slot.classList.remove('filled');
            }
        }
    });
}

window.checkAnswer = async function checkAnswer() {
    const word = selectedLetters
        .filter(letter => letter !== null)
        .join('')
        .trim();
    
    if (word.length === 0) {
        showError('Please arrange some letters first!');
        return;
    }
    
    const checkBtn = document.getElementById('check-answer-btn');
    if (!checkBtn) return;
    
    checkBtn.disabled = true;
    checkBtn.textContent = 'Checking...';
    
    try {
        if (!window.apiClient || !window.apiClient.validateChallenge1) {
            showError('API client not loaded. Please refresh the page.');
            checkBtn.disabled = false;
            checkBtn.textContent = 'Check Answer';
            return;
        }
        
        const response = await window.apiClient.validateChallenge1(word);
        
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
                collectLetter('U');
            }
            
            if (typeof completeChallenge === 'function') {
                completeChallenge(1);
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
    const message = response.message || 'Congratulations! You correctly assembled the location!';
    const codeComponent = response.codeComponent || 'U';
    alert(`🎉 ${message}\n\nCode Component: ${codeComponent}`);
}

function showError(message) {
    alert(`❌ ${message}`);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initChallenge1();
});
