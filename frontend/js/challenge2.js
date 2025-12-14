let all_matches = [];
let current_matchings = [];
let listenersSetup = false; // Flag to prevent duplicate setup

// Store handler functions so we can remove them
const cardHandlers = {
    CSmajor: null,
    CScareer: null,
    FSmajor: null,
    BioMajor: null,
    FScareer: null,
    Biocareer: null
};

function handleCardClick(cardId) {
    // Prevent clicking the same card twice in a row
    if (current_matchings.length > 0 && current_matchings[current_matchings.length - 1] === cardId) {
        console.log('Same card clicked, ignoring');
        return;
    }
    
    current_matchings.push(cardId);
    console.log('Selected:', cardId, 'Current matchings:', current_matchings);
    
    if (current_matchings.length === 2) {
        all_matches.push([...current_matchings]);
        console.log('Match completed:', current_matchings);
        console.log('All matches:', all_matches);
        current_matchings = [];
    }
    
    // Disable the card - get the card element (parent of card-body)
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
    // Prevent duplicate setup
    if (listenersSetup) {
        console.log('Listeners already setup, skipping');
        return;
    }
    
    const CSmajor = document.getElementById('CSmajor');
    const CScareer = document.getElementById('CScareer');
    const FSmajor = document.getElementById('FSmajor');
    const BioMajor = document.getElementById('BioMajor');
    const FScareer = document.getElementById('FScareer');
    const Biocareer = document.getElementById('Biocareer');
    
    if (!CSmajor || !CScareer || !FSmajor || !BioMajor || !FScareer || !Biocareer) {
        console.log('Challenge 2 elements not found yet');
        return;
    }
    
    // Create handler functions
    cardHandlers.CSmajor = () => handleCardClick('CSmajor');
    cardHandlers.CScareer = () => handleCardClick('CScareer');
    cardHandlers.FSmajor = () => handleCardClick('FSmajor');
    cardHandlers.BioMajor = () => handleCardClick('BioMajor');
    cardHandlers.FScareer = () => handleCardClick('FScareer');
    cardHandlers.Biocareer = () => handleCardClick('Biocareer');
    
    // Add event listeners
    CSmajor.addEventListener('click', cardHandlers.CSmajor);
    CScareer.addEventListener('click', cardHandlers.CScareer);
    FSmajor.addEventListener('click', cardHandlers.FSmajor);
    BioMajor.addEventListener('click', cardHandlers.BioMajor);
    FScareer.addEventListener('click', cardHandlers.FScareer);
    Biocareer.addEventListener('click', cardHandlers.Biocareer);
    
    // Setup clear button listener
    const clearBtn = document.getElementById('clear-assembly-btn');
    if (clearBtn) {
        clearBtn.addEventListener('click', clearChallenge2);
        console.log('Clear button listener added');
    }
    
    listenersSetup = true;
    console.log('Challenge 2 event listeners set up');
}

function removeEventListeners() {
    const CSmajor = document.getElementById('CSmajor');
    const CScareer = document.getElementById('CScareer');
    const FSmajor = document.getElementById('FSmajor');
    const BioMajor = document.getElementById('BioMajor');
    const FScareer = document.getElementById('FScareer');
    const Biocareer = document.getElementById('Biocareer');
    
    if (CSmajor && cardHandlers.CSmajor) CSmajor.removeEventListener('click', cardHandlers.CSmajor);
    if (CScareer && cardHandlers.CScareer) CScareer.removeEventListener('click', cardHandlers.CScareer);
    if (FSmajor && cardHandlers.FSmajor) FSmajor.removeEventListener('click', cardHandlers.FSmajor);
    if (BioMajor && cardHandlers.BioMajor) BioMajor.removeEventListener('click', cardHandlers.BioMajor);
    if (FScareer && cardHandlers.FScareer) FScareer.removeEventListener('click', cardHandlers.FScareer);
    if (Biocareer && cardHandlers.Biocareer) Biocareer.removeEventListener('click', cardHandlers.Biocareer);
    
    listenersSetup = false;
}

function clearChallenge2() {
    console.log('Clearing Challenge 2 - refreshing page');
    // Simply reload the page to reset everything
    location.reload();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Wait for challenge2 page to be available
    const observer = new MutationObserver(function(mutations) {
        const challenge2Page = document.getElementById('challenge2-page');
        if (challenge2Page && challenge2Page.classList.contains('active')) {
            setupEventListeners();
        } else {
            // Remove listeners when page is not active to prevent duplicates
            removeEventListeners();
        }
    });

    const targetNode = document.getElementById('challenge2-page');
    if (targetNode) {
        observer.observe(targetNode, {
            attributes: true,
            attributeFilter: ['class']
        });
        
        // Also setup if already active
        if (targetNode.classList.contains('active')) {
            setupEventListeners();
        }
    }
    
    // Make clearChallenge2 globally accessible
    window.clearChallenge2 = clearChallenge2;
});