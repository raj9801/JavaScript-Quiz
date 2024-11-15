const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "HyperLoop Machine Language",
            "None of the above"
        ],
        answer: 0
    },
    {
        question: "What is the correct syntax to write JavaScript in an HTML file?",
        options: [
            "<script>",
            "<javascript>",
            "<code>",
            "<js>"
        ],
        answer: 0
    },
    {
        question: "Which of these is a JavaScript framework?",
        options: ["React", "Laravel", "Django", "Flask"],
        answer: 0
    },
    {
        question: "What symbol is used for comments in JavaScript?",
        options: ["//", "/* */", "#", "<!-- -->"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement("div");
        optionButton.textContent = option;
        optionButton.className = "option";
        optionButton.onclick = () => selectOption(optionButton, index);
        optionsElement.appendChild(optionButton);
    });

    updateProgressBar();
}

function selectOption(selectedOption, selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const allOptions = document.querySelectorAll(".option");

    // Remove previous selections
    allOptions.forEach(option => {
        option.classList.remove("selected");
        option.style.pointerEvents = "none"; // Disable further clicks
    });

    // Add feedback for the selected option
    selectedOption.classList.add("selected");

    if (selectedIndex === currentQuestion.answer) {
        selectedOption.style.backgroundColor = "rgba(0, 255, 0, 0.4)";
        score++;
    } else {
        selectedOption.style.backgroundColor = "rgba(255, 0, 0, 0.5)";
        allOptions[currentQuestion.answer].style.backgroundColor = "rgba(0, 255, 0, 0.4)";
    }
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.innerHTML = `<div style="width: ${progress}%;"></div>`;
}

function showScore() {
    questionElement.style.display = "none";
    optionsElement.style.display = "none";
    nextButton.style.display = "none";
    progressBar.style.display = "none";
    scoreElement.style.display = "block";
    scoreElement.textContent = `🎉 Your Score: ${score}/${questions.length}`;
}

nextButton.addEventListener("click", () => {
    const selectedOption = document.querySelector(".option.selected");
    if (!selectedOption) {
        alert("Please select an answer!");
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
});

loadQuestion();
