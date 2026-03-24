import { quizzes } from './Questions.js';

// Initialize Lucide Icons
lucide.createIcons();

// Global Variables
let currentTopic = 'gates';
let currentQuestion = 0;
let currentAnswer = null;
let quizScore = 0;
let answered = false;

// Functions
function renderQuestion() {
    const quiz = quizzes[currentTopic];
    const question = quiz.questions[currentQuestion];

    document.getElementById('question-num').textContent = `Question ${currentQuestion + 1}`;
    document.getElementById('question-text').textContent = question.question;

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, idx) => {
        const label = document.createElement('label');
        label.className = `flex items-center p-4 rounded-xl cursor-${answered ? 'default' : 'pointer'} border-[1.5px] transition-all duration-200`;
        label.style.borderColor = '#e8eef6';
        label.style.background = '#ffffff';

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'answer';
        input.value = idx;
        input.disabled = answered;
        input.className = `mr-3 cursor-${answered ? 'default' : 'pointer'}`;

        input.addEventListener('change', () => {
            if (answered) return;
            currentAnswer = idx;
            optionsContainer.querySelectorAll('label').forEach(l => {
                l.style.borderColor = '#e8eef6';
                l.style.background = '#ffffff';
            });
            label.style.borderColor = '#3b82f6';
            label.style.background = '#eff6ff';
        });

        if (answered) {
            if (idx === question.correct) {
                label.style.borderColor = '#86efac';
                label.style.background = '#f0fdf4';
            } else if (idx === currentAnswer) {
                label.style.borderColor = '#fca5a5';
                label.style.background = '#fef2f2';
            }
            input.disabled = true;
        }

        const span = document.createElement('span');
        span.textContent = option;
        span.className = 'text-[#1e293b] font-medium';

        label.appendChild(input);
        label.appendChild(span);
        optionsContainer.appendChild(label);
    });

    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
    document.getElementById('topic-progress-text').textContent = `${currentQuestion + 1}/${quiz.questions.length}`;
    document.getElementById('topic-progress-bar').style.width = progress + '%';
    document.getElementById('quiz-score').textContent = `${quizScore}/${quiz.questions.length}`;

    updateQuestionButtons();
}

function updateQuestionButtons() {
    const submitBtn = document.getElementById('submit-btn');
    const nextBtn = document.getElementById('next-question-btn');

    if (!answered) {
        submitBtn.style.display = 'block';
        nextBtn.style.display = 'none';
    } else {
        submitBtn.style.display = 'none';
        nextBtn.style.display = 'flex';
        nextBtn.style.justifyContent = 'center';
        nextBtn.style.alignItems = 'center';
        if (currentQuestion === quizzes[currentTopic].questions.length - 1) {
            nextBtn.innerHTML = 'Finish Quiz <i data-lucide="check" class="w-3.5 h-3.5 ml-1"></i>';
        } else {
            nextBtn.innerHTML = 'Next Question <i data-lucide="chevron-right" class="w-3.5 h-3.5 ml-1"></i>';
        }
        lucide.createIcons();
    }
}

function switchTopic(topicKey) {
    currentTopic = topicKey;
    currentQuestion = 0;
    currentAnswer = null;
    answered = false;
    quizScore = 0;

    document.getElementById('feedback-container').style.display = 'none';

    document.querySelectorAll('.topic-item').forEach(btn => {
        if (btn.dataset.topic === topicKey) {
            btn.className = 'topic-item w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all text-[#3b82f6] bg-[#eff6ff]';
        } else {
            btn.className = 'topic-item w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all text-[#64748b] bg-transparent hover:bg-gray-50';
        }
    });

    renderQuestion();
}

// Event Listeners
document.querySelectorAll('.topic-item').forEach(btn => {
    btn.addEventListener('click', () => switchTopic(btn.dataset.topic));
});

document.getElementById('submit-btn').addEventListener('click', () => {
    if (currentAnswer === null) return;

    const quiz = quizzes[currentTopic];
    const question = quiz.questions[currentQuestion];

    if (currentAnswer === question.correct) {
        quizScore++;
    }

    answered = true;
    const feedbackContainer = document.getElementById('feedback-container');
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackIcon = document.getElementById('feedback-icon');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackText = document.getElementById('feedback-text');

    if (currentAnswer === question.correct) {
        feedbackTitle.textContent = 'Correct!';
        feedbackBox.style.background = '#f0fdf4';
        feedbackBox.style.borderColor = '#86efac';
        feedbackTitle.style.color = '#16a34a';
        feedbackText.style.color = '#15803d';
        feedbackIcon.style.color = '#22c55e';
        feedbackIcon.setAttribute('data-lucide', 'check-circle');
    } else {
        feedbackTitle.textContent = 'Incorrect';
        feedbackBox.style.background = '#fef2f2';
        feedbackBox.style.borderColor = '#fca5a5';
        feedbackTitle.style.color = '#b91c1c';
        feedbackText.style.color = '#991b1b';
        feedbackIcon.style.color = '#ef4444';
        feedbackIcon.setAttribute('data-lucide', 'x-circle');
    }

    lucide.createIcons();
    feedbackText.textContent = question.explanation;
    feedbackContainer.style.display = 'block';
    renderQuestion();
});

document.getElementById('next-question-btn').addEventListener('click', () => {
    const quiz = quizzes[currentTopic];
    if (currentQuestion < quiz.questions.length - 1) {
        currentQuestion++;
        currentAnswer = null;
        answered = false;
        document.getElementById('feedback-container').style.display = 'none';
        renderQuestion();
    } else {
        alert(`Quiz completed! You scored ${quizScore} out of ${quiz.questions.length}.`);
        switchTopic(currentTopic); // Reset on finish
    }
});

document.getElementById('reset-quiz-btn').addEventListener('click', () => {
    switchTopic(currentTopic);
});

// Initial Render on Page Load
document.addEventListener('DOMContentLoaded', () => {
    switchTopic('gates');
});