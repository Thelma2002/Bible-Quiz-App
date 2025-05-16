//initializing array with objects (questions, options and answers)
const quizData = [
    {
        question: "What was the name of the high priest who questioned Jesus before His crucifixion?",
        options: ["Caiphus", "Annas", "Nicodemus", "Gamaliel"],
        answer: "Caiphus"
    },
    {
        question: "In the book of Revelation, how many churches were addressed in John's vision?",
        options: [10, 3, 7, 12],
        answer: 7
    },
    {
        question: "Who interpreted Pharaoh’s dream about the seven fat and seven thin cows?",
        options: ["Moses", "Joseph", "Daniel", "Aaron"],
        answer: "Joseph"
    },
    {
        question: "What language was most of the Old Testament originally written in?",
        options: ["Latin", "Greek", "Hebrew", "Aramaic"],
        answer: "Hebrew"
    },
    {
        question: "Which prophet saw a vision of a valley full of dry bones?",
        options: ["Isaiah", "Jeremiah", "Ezekiel", "Elijah"],
        answer: "Ezekiel"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
const totalQuestions = 5;
const timerEl = document.getElementById("time");
const questionEl = document.querySelector(".question")
const optionsEl = document.querySelector(".options");
const resultEl = document.querySelector(".result");
const scoreEl = document.getElementById("score");
const restartBtn = document.querySelector(".restart-btn");
const previousBtn = document.querySelector(".btn");

//function to update progress bar based on the current question
function updateProgressBar() {
	//calculate percentage complete
	 let percentComplete = Math.round(((currentQuestion + 1) / totalQuestions) * 100); 
	//update width of progress bar
	const progress = document.querySelector('.progress');
    progress.style.width = percentComplete + "%"; //This accesses the CSS width property of that element.
	//updaate text for question number and percentage
	document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of ${totalQuestions}`;
    document.getElementById("percent").textContent = `${percentComplete}% Complete`;
}

//call function whener user goes to next question
function goToNextQuestion() {
    if (currentQuestion < totalQuestions) {
        currentQuestion++;
        updateProgressBar();
    }
}

//start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

//function to load the question
function loadQuestion() {
    if (currentQuestion >= quizData.length) {
        endQuiz();
        return;
    }

    const currentQuiz = quizData[currentQuestion];
    questionEl.textContent = currentQuiz.question;
    optionsEl.innerHTML = "";

    currentQuiz.options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("option");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsEl.appendChild(button);
    });

}

//Check the answer
function checkAnswer(selectedOption) {
    if (selectedOption === quizData[currentQuestion].answer) {
        score++;
    }
	updateProgressBar();
    // Check if there are more questions left; otherwise, end the quiz
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++; // Move to the next question
      
        loadQuestion(); // Load the new question
    } else {
		updateProgressBar();
        endQuiz(); // If no more questions, end the quiz
    }
}

//Go to previous question 
function goToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--; // Move to previous question
        loadQuestion(); // Reload question
        updateProgressBar(); // Update progress
    }
}
previousBtn.addEventListener("click", goToPreviousQuestion);

//End the quiz and show results
function endQuiz() {
    clearInterval(timerInterval);
    questionEl.style.display = "none";
    optionsEl.style.display = "none";
    resultEl.style.display = "block";
    scoreEl.textContent = score;
    restartBtn.style.display = "block";
	restartBtn.style.visibility = "visible"; // Ensure it's visible on end
}


//Restart the quiz
restartBtn.addEventListener("click", () => {
	//reset variables
	currentQuestion = 0;
    score = 0;
    timeLeft = 30;
    timerEl.textContent = timeLeft;
	
	//reset the display
	timerEl.textContent = timeLeft;
    questionEl.style.display = "block";
    optionsEl.style.display = "block"; //ensures questions display correctly
    resultEl.style.display = "none";
    restartBtn.style.display = "none";
	
	//Load the first question-number
	loadQuestion();
	
});
//initialize the quiz with the first question
loadQuestion();
startTimer();
