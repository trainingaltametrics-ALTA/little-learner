// ========================================
// LITTLE LEARNER - SHAPES GAME
// ========================================

const shapes = [
    {
        name: "Circle",
        type: "circle",
        color: "#ff6b6b"
    },
    {
        name: "Square",
        type: "square",
        color: "#4d9fff"
    },
    {
        name: "Triangle",
        type: "triangle",
        color: "#ffd93d"
    },
    {
        name: "Rectangle",
        type: "rectangle",
        color: "#4caf50"
    },
    {
        name: "Star",
        type: "star",
        emoji: "⭐"
    },
    {
        name: "Diamond",
        type: "diamond",
        color: "#9b59b6"
    },
    {
        name: "Heart",
        type: "heart",
        emoji: "❤️"
    },
    {
        name: "Oval",
        type: "oval",
        color: "#ff922b"
    }
];

const TOTAL_QUESTIONS = 10;

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;
let earnedStars = 0;

const STAR_KEY = "littleLearnerStars";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener("DOMContentLoaded", function () {
    updateStars();
});


// ========================================
// START GAME
// ========================================

function startGame() {

    currentQuestion = 0;
    score = 0;
    earnedStars = 0;
    answered = false;

    questions = [];

    // Create 10 questions
    for (let i = 0; i < TOTAL_QUESTIONS; i++) {

        const randomIndex =
            Math.floor(Math.random() * shapes.length);

        questions.push(shapes[randomIndex]);
    }

    document
        .getElementById("startScreen")
        .classList.add("hidden");

    document
        .getElementById("resultScreen")
        .classList.add("hidden");

    document
        .getElementById("gameScreen")
        .classList.remove("hidden");

    showQuestion();
}


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    answered = false;

    const shape = questions[currentQuestion];

    document.getElementById("questionNumber").textContent =
        currentQuestion + 1;

    document.getElementById("score").textContent =
        score;

    const percentage =
        ((currentQuestion + 1) / TOTAL_QUESTIONS) * 100;

    document.getElementById("progressFill").style.width =
        percentage + "%";

    document.getElementById("questionText").textContent =
        "Which shape is this?";

    drawShape(shape);

    createOptions(shape.name);

    document.getElementById("feedback").textContent = "";

    document.getElementById("feedback").className =
        "feedback";
}


// ========================================
// DRAW SHAPE
// ========================================

function drawShape(shape) {

    const visual =
        document.getElementById("questionVisual");

    visual.innerHTML = "";

    visual.className = "question-visual";


    // Emoji shapes
    if (shape.type === "star") {

        visual.textContent = "⭐";

        visual.style.fontSize = "150px";

        return;
    }


    if (shape.type === "heart") {

        visual.textContent = "❤️";

        visual.style.fontSize = "150px";

        return;
    }


    // Circle
    if (shape.type === "circle") {

        const element =
            document.createElement("div");

        element.style.width = "160px";
        element.style.height = "160px";
        element.style.background = shape.color;
        element.style.borderRadius = "50%";

        visual.appendChild(element);

        return;
    }


    // Square
    if (shape.type === "square") {

        const element =
            document.createElement("div");

        element.style.width = "155px";
        element.style.height = "155px";
        element.style.background = shape.color;
        element.style.borderRadius = "15px";

        visual.appendChild(element);

        return;
    }


    // Triangle
    if (shape.type === "triangle") {

        const element =
            document.createElement("div");

        element.style.width = "0";
        element.style.height = "0";

        element.style.borderLeft =
            "85px solid transparent";

        element.style.borderRight =
            "85px solid transparent";

        element.style.borderBottom =
            "150px solid " + shape.color;

        visual.appendChild(element);

        return;
    }


    // Rectangle
    if (shape.type === "rectangle") {

        const element =
            document.createElement("div");

        element.style.width = "190px";
        element.style.height = "115px";
        element.style.background = shape.color;
        element.style.borderRadius = "15px";

        visual.appendChild(element);

        return;
    }


    // Diamond
    if (shape.type === "diamond") {

        const element =
            document.createElement("div");

        element.style.width = "120px";
        element.style.height = "120px";
        element.style.background = shape.color;
        element.style.transform = "rotate(45deg)";
        element.style.borderRadius = "15px";

        visual.appendChild(element);

        return;
    }


    // Oval
    if (shape.type === "oval") {

        const element =
            document.createElement("div");

        element.style.width = "190px";
        element.style.height = "120px";
        element.style.background = shape.color;
        element.style.borderRadius = "50%";

        visual.appendChild(element);

    }
}


// ========================================
// CREATE OPTIONS
// ========================================

function createOptions(correctAnswer) {

    const container =
        document.getElementById("optionsContainer");

    container.innerHTML = "";


    let options = [correctAnswer];

    let available =
        shapes
            .map(shape => shape.name)
            .filter(name => name !== correctAnswer);


    // Shuffle wrong answers
    available.sort(() => Math.random() - 0.5);

    options.push(available[0]);
    options.push(available[1]);


    // Shuffle all 3
    options.sort(() => Math.random() - 0.5);


    options.forEach(function (option) {

        const button =
            document.createElement("button");

        button.className = "option-button";

        button.textContent = option;

        button.onclick = function () {

            checkAnswer(
                option,
                correctAnswer,
                button
            );

        };

        container.appendChild(button);

    });
}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(
    selectedAnswer,
    correctAnswer,
    clickedButton
) {

    if (answered) {
        return;
    }

    answered = true;


    const buttons =
        document.querySelectorAll(
            ".option-button"
        );


    buttons.forEach(function (button) {

        button.disabled = true;

        if (
            button.textContent === correctAnswer
        ) {

            button.classList.add("correct");

        }

    });


    const feedback =
        document.getElementById("feedback");


    if (selectedAnswer === correctAnswer) {

        score++;

        earnedStars++;

        clickedButton.classList.add("correct");

        feedback.textContent =
            "🎉 Correct! Great job! ⭐";

        feedback.className =
            "feedback correct";

        addStar();

    } else {

        clickedButton.classList.add("wrong");

        feedback.textContent =
            "💪 Nice try! The answer is " +
            correctAnswer + ".";

        feedback.className =
            "feedback wrong";

    }


    document.getElementById("score").textContent =
        score;


    setTimeout(function () {

        currentQuestion++;

        if (
            currentQuestion >= TOTAL_QUESTIONS
        ) {

            showResult();

        } else {

            showQuestion();

        }

    }, 1200);
}


// ========================================
// ADD STAR
// ========================================

function addStar() {

    let stars =
        Number(
            localStorage.getItem(STAR_KEY) || 0
        );

    stars++;

    localStorage.setItem(
        STAR_KEY,
        stars
    );

    updateStars();
}


// ========================================
// UPDATE STARS
// ========================================

function updateStars() {

    const stars =
        Number(
            localStorage.getItem(STAR_KEY) || 0
        );

    const starElement =
        document.getElementById("starCount");

    if (starElement) {

        starElement.textContent = stars;

    }
}


// ========================================
// LISTEN
// ========================================

function listenQuestion() {

    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Sorry! Your browser does not support speech."
        );

        return;
    }


    if (!questions.length) {
        return;
    }


    const shape =
        questions[currentQuestion];


    speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            "Which shape is this? " +
            shape.name
        );


    speech.lang = "en-US";

    speech.rate = 0.75;

    speech.pitch = 1.1;


    speechSynthesis.speak(speech);
}


// ========================================
// RESULT
// ========================================

function showResult() {

    document
        .getElementById("gameScreen")
        .classList.add("hidden");


    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    document.getElementById("finalScore").textContent =
        score;


    document.getElementById("earnedStars").textContent =
        earnedStars;


    let message;


    if (score === 10) {

        message =
            "🏆 Perfect! You are a Shapes Superstar!";

    } else if (score >= 8) {

        message =
            "🌟 Wonderful! You know your shapes very well!";

    } else if (score >= 5) {

        message =
            "👏 Good job! Keep practicing your shapes!";

    } else {

        message =
            "💪 Nice try! Let's practice some more shapes!";

    }


    document.getElementById("resultMessage").textContent =
        message;


    updateStars();
}
