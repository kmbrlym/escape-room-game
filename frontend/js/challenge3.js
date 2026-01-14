const CHALLENGE3_QUESTIONS = [
    {
        id: 'q1',
        question: 'Interviewer: “Tell me about yourself.”',
        choices: [
            { id: 'A', text: 'I don’t really know what to say. My resume is there.' },
            { id: 'B', text: 'I’m a UTM student focused on developing skills through classes and projects, and I’m excited to apply them in this role.' },
            { id: 'C', text: 'I’m just looking for any job, honestly—whatever pays the most.' }
        ]
    },
    {
        id: 'q2',
        question: 'Interviewer: “Describe a time you handled a conflict in a team.”',
        choices: [
            { id: 'A', text: 'I listened to each person’s perspective, clarified goals, and helped the team agree on next steps to move forward.' },
            { id: 'B', text: 'I told them they were wrong and we did it my way.' },
            { id: 'C', text: 'I ignored it and hoped it would go away.' }
        ]
    },
    {
        id: 'q3',
        question: 'Interviewer: “You made a mistake on a project. What do you do?”',
        choices: [
            { id: 'A', text: 'Hide it so nobody notices.' },
            { id: 'B', text: 'Blame someone else so it doesn’t affect me.' },
            { id: 'C', text: 'Own it, communicate early, fix it, and explain what I learned to prevent it next time.' }
        ]
    },
    {
        id: 'q4',
        question: 'Interviewer: “What are your weaknesses?”',
        choices: [
            { id: 'A', text: 'I don’t have any weaknesses.' },
            { id: 'B', text: 'Sometimes I take on too much, so I now prioritize and set clearer timelines to manage workload.' },
            { id: 'C', text: 'I’m bad at everything, but I try.' }
        ]
    },
    {
        id: 'q5',
        question: 'Interviewer: “Do you have any questions for us?”',
        choices: [
            { id: 'A', text: 'Yes—what does success look like in the first 60–90 days, and how will performance be supported and evaluated?' },
            { id: 'B', text: 'No, I’m good.' },
            { id: 'C', text: 'How soon can I get promoted?' }
        ]
    }
];

let currentIndex = 0;
let selectedAnswers = new Array(CHALLENGE3_QUESTIONS.length).fill(null);

function el(id) {
    return document.getElementById(id);
}

function renderQuestion() {
    const q = CHALLENGE3_QUESTIONS[currentIndex];
    const progress = el('quiz-progress');
    const question = el('quiz-question');
    const choicesWrap = el('quiz-choices');
    const prevBtn = el('quiz-prev-btn');
    const nextBtn = el('quiz-next-btn');

    if (!q || !progress || !question || !choicesWrap || !prevBtn || !nextBtn) return;

    progress.textContent = `Question ${currentIndex + 1} of ${CHALLENGE3_QUESTIONS.length}`;
    question.textContent = q.question;

    choicesWrap.innerHTML = '';
    const selected = selectedAnswers[currentIndex];

    q.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-choice';
        btn.setAttribute('role', 'radio');
        btn.setAttribute('aria-checked', selected === choice.id ? 'true' : 'false');
        btn.dataset.choiceId = choice.id;
        btn.innerHTML = `<div class="quiz-choice-label">${choice.id}</div><div class="quiz-choice-text">${choice.text}</div>`;

        if (selected === choice.id) {
            btn.classList.add('selected');
        }

        btn.addEventListener('click', function() {
            selectedAnswers[currentIndex] = choice.id;
            renderQuestion();
        });

        choicesWrap.appendChild(btn);
    });

    prevBtn.disabled = currentIndex === 0;

    const isLast = currentIndex === CHALLENGE3_QUESTIONS.length - 1;
    nextBtn.textContent = isLast ? 'Submit Answers' : 'Next';
    nextBtn.disabled = selectedAnswers[currentIndex] == null;
}

async function submitAnswers() {
    const nextBtn = el('quiz-next-btn');
    const prevBtn = el('quiz-prev-btn');

    if (!nextBtn || !prevBtn) return;

    // Basic completeness check
    if (selectedAnswers.some(a => a == null)) {
        alert('❌ Please answer all questions before submitting.');
        return;
    }

    nextBtn.disabled = true;
    prevBtn.disabled = true;
    nextBtn.textContent = 'Checking...';

    try {
        if (!window.apiClient || !window.apiClient.validateChallenge3) {
            throw new Error('API client not loaded. Please refresh the page.');
        }

        const response = await window.apiClient.validateChallenge3(selectedAnswers);

        if (response && response.success) {
            // Update local game state
            if (typeof collectLetter === 'function') collectLetter('M');
            if (typeof completeChallenge === 'function') completeChallenge(3);
            if (typeof updateUI === 'function') updateUI();

            // Match other challenges: simple popup on success
            const message = response.message || 'Congratulations! You completed Challenge 3!';
            const codeComponent = response.codeComponent || 'M';
            alert(`🎉 ${message}\n\nCode Component: ${codeComponent}`);
        } else {
            alert(`❌ ${response?.message || 'That\'s not quite right. Try again!'}`);
        }
    } catch (error) {
        const msg = error?.message || 'Unknown error';
        alert(`❌ Error: ${msg}`);
    } finally {
        nextBtn.disabled = false;
        prevBtn.disabled = false;
        nextBtn.textContent = 'Submit Answers';
    }
}

function setupChallenge3() {
    const nextBtn = el('quiz-next-btn');
    const prevBtn = el('quiz-prev-btn');
    if (!nextBtn || !prevBtn) return;

    prevBtn.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex -= 1;
            renderQuestion();
        }
    });

    nextBtn.addEventListener('click', async function() {
        const isLast = currentIndex === CHALLENGE3_QUESTIONS.length - 1;
        if (!isLast) {
            currentIndex += 1;
            renderQuestion();
            return;
        }
        await submitAnswers();
    });

    renderQuestion();
}

document.addEventListener('DOMContentLoaded', setupChallenge3);

