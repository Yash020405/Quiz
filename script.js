const questionElement = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice'));
const progressBar = document.getElementById('progressBar');
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Which HTML tag is used to define an inline style?',
        choice1: '&lt;script&gt;',
        choice2: '&lt;css&gt;',
        choice3: '&lt;style&gt;',
        choice4: '&lt;span&gt;',
        answer: 3,
    },
    {
        question: 'Which property is used to change the text color in CSS?',
        choice1: 'text-color',
        choice2: 'font-color',
        choice3: 'text-style',
        choice4: 'color',
        answer: 4,
    },
    {
        question: 'Which of the following is the correct way to comment in HTML?',
        choice1: '// Comment',
        choice2: '&lt;!-- Comment --&gt;',
        choice3: '/* Comment */',
        choice4: '&lt;! Comment&gt;',
        answer: 2,
    },
];

const MAX_QUESTIONS = questions.length;
const SCORE_POINTS = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('end.html');
    }
    
    questionCounter++;
    questionCounterText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBar.value = (questionCounter / MAX_QUESTIONS) * 100;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    questionElement.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerHTML = `<span class="choice-prefix">${String.fromCharCode(64 + Number(number))}</span>${currentQuestion['choice' + number]}`;
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target.closest('.choice');
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.classList.add(classToApply);

        if (classToApply === 'correct') {
            setTimeout(() => {
                incrementScore(SCORE_POINTS);
                selectedChoice.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        } else {
            setTimeout(() => {
                selectedChoice.classList.remove(classToApply);
                getNewQuestion();
            }, 1000);
        }
    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = `Score: ${score}`;
};

startGame();