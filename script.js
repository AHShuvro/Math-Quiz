let score = 0;
let currentQuestion = '';
let correctAnswer = 0;
let timer;
let timeLeft = 10;

const questionElement = document.getElementById('question');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const messageElement = document.getElementById('message');
const errorElement = document.getElementById('error');
const answerInput = document.getElementById('answer');

window.onload = startGame;

answerInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

function startGame() {
    score = 0;
    timeLeft = 10;
    scoreElement.textContent = `Score: ${score}`;
    messageElement.textContent = '';
    errorElement.textContent = '';
    answerInput.value = '';
    nextQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function nextQuestion() {
    const operation = Math.floor(Math.random() * 4);
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;

    switch (operation) {
        case 0: 
            currentQuestion = `${num1} + ${num2}`;
            correctAnswer = num1 + num2;
            break;
        case 1: 
            currentQuestion = `${num1} - ${num2}`;
            correctAnswer = num1 - num2;
            break;
        case 2: 
            currentQuestion = `${num1} * ${num2}`;
            correctAnswer = num1 * num2;
            break;
        case 3: 
            currentQuestion = `${num1 * num2} / ${num2}`;
            correctAnswer = num1;
            break;
    }

    questionElement.textContent = `What is: ${currentQuestion}`;
    timeLeft = 10; 
    clearInterval(timer); 
    startTimer();
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);

    if (isNaN(userAnswer)) {
        errorElement.textContent = 'Please enter a valid number!';
        return;
    }

    if (userAnswer === correctAnswer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        messageElement.textContent = 'Correct! Well done!';
        errorElement.textContent = '';
    } else {
        score--;
        scoreElement.textContent = `Score: ${score}`;
        errorElement.textContent = 'Oops! Wrong answer!';
        messageElement.textContent = 'Try again!';
    }

    setTimeout(nextQuestion, 1000);
    answerInput.value = ''; 
}

function handleTimeout() {
    score--;
    scoreElement.textContent = `Score: ${score}`;
    errorElement.textContent = 'Time is up!';
    messageElement.textContent = 'Better luck next time!';
    setTimeout(nextQuestion, 1000);
}