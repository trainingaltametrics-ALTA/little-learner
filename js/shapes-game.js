// ========================================
// LITTLE LEARNER - SHAPES GAME
// ========================================

const shapesData = [
    {
        name: "Circle",
        className: "shape-circle",
        emoji: null,
        sentence: "A ball is round like a circle."
    },
    {
        name: "Square",
        className: "shape-square",
        emoji: null,
        sentence: "A window can be a square."
    },
    {
        name: "Triangle",
        className: "shape-triangle",
        emoji: null,
        sentence: "A triangle has three sides."
    },
    {
        name: "Rectangle",
        className: "shape-rectangle",
        emoji: null,
        sentence: "A door can be a rectangle."
    },
    {
        name: "Star",
        className: "shape-star",
        emoji: "⭐",
        sentence: "A star shines in the sky."
    },
    {
        name: "Diamond",
        className: "shape-diamond",
        emoji: null,
        sentence: "A diamond has four sides."
    },
    {
        name: "Heart",
        className: "shape-heart",
        emoji: "❤️",
        sentence: "A heart shows love."
    },
    {
        name: "Oval",
        className: "shape-oval",
        emoji: null,
        sentence: "An egg is oval-shaped."
    }
];


const TOTAL_QUESTIONS = 10;

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

let earnedStarsThisGame = 0;

const STAR_KEY = "littleLearnerStars";


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateStars();

    }
);


// ========================================
// START GAME
// ========================================

function startGame() {

    questions = createQuestions();

    currentQuestion = 0;

    score = 0;

    earnedStarsThisGame = 0;

    answered = false;


    document.getElementById(
        "startScreen"
    ).classList.add("hidden");


    document.getElementById(
        "resultScreen"
    ).classList.add("hidden");


    document.getElementById(
        "gameScreen"
    ).classList.remove("hidden");


    document.getElementById(
        "score"
    ).textContent = "0";


    showQuestion();

}


// ========================================
// CREATE QUESTIONS
// ========================================

function createQuestions() {

    const shuffled =
        [...shapesData].sort(
            () => Math.random() - 0.5
        );


    const result = [];


    for (
        let i = 0;
        i < TOTAL_QUESTIONS;
        i++
    ) {

        const shape =
            shuffled[i % shuffled.length];


        const type =
            i % 2 === 0
                ? "identify"
                : "find";


        result.push({
            shape: shape,
            type: type
        });

    }


    return result;

}


// ========================================
// SHOW QUESTION
// ========================================

function showQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    const shape =
        question.shape;


    document.getElementById(
        "questionNumber"
    ).textContent =
        currentQuestion + 1;


    document.getElementById(
        "score"
    ).textContent =
        score;


    const progress =
        ((currentQuestion + 1) /
            TOTAL_QUESTIONS) * 100;


    document.getElementById(
        "progressFill"
    ).style.width =
        progress + "%";


    const questionText =
        document.getElementById(
            "questionText"
        );


    if (question.type === "identify") {

        questionText.textContent =
            "Which shape is this?";

    } else {

        questionText.textContent =
            "Find the " +
            shape.name +
            " shape!";

    }


    showShape(shape);


    createOptions(shape.name);

}


// ========================================
// SHOW SHAPE
// ========================================

function showShape(shape) {

    const visual =
        document.getElementById(
            "questionVisual"
        );


    visual.className =
        "question-visual";


    visual.textContent =
        "";


    if (shape.emoji) {

        visual.textContent =
            shape.emoji;

    }


    visual.classList.add(
        shape.className
    );

}


// ========================================
// CREATE OPTIONS
// ========================================

function createOptions(correctName) {

    const container =
        document.getElementById(
            "optionsContainer"
        );


    container.innerHTML = "";


    const optionNames =
        createRandomOptions(
            correctName
        );


    optionNames.forEach(
        function (name) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option-button";


            button.textContent =
                name;


            button.onclick =
                function () {

                    checkAnswer(
                        name,
                        correctName,
                        button
                    );

                };


            container.appendChild(
                button
            );

        }
    );


    document.getElementById(
        "feedback"
    ).textContent = "";


    document.getElementById(
        "feedback"
    ).className =
        "feedback";

}


// ========================================
// RANDOM OPTIONS
// ========================================

function createRandomOptions(correctName) {

    const names =
        shapesData.map(
            shape => shape.name
        );


    const wrongAnswers =
        names.filter(
            name => name !== correctName
        );


    wrongAnswers.sort(
        () => Math.random() - 0.5
    );


    const options = [
        correctName,
        wrongAnswers[0],
        wrongAnswers[1]
    ];


    options.sort(
        () => Math.random() - 0.5
    );


    return options;

}


// ========================================
// CHECK ANSWER
// ========================================

function checkAnswer(
    selected,
    correct,
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


    buttons.forEach(
        function (button) {

            button.disabled = true;

            if (
                button.textContent === correct
            ) {

                button.classList.add(
                    "correct"
                );

            }

        }
    );


    const feedback =
        document.getElementById(
            "feedback"
        );


    if (selected === correct) {

        score++;

        earnedStarsThisGame++;

        clickedButton.classList.add(
            "correct"
        );


        feedback.textContent =
            "🎉 Correct! Great job! ⭐";


        feedback.classList.add(
            "correct"
        );


        addStar();


    } else {

        clickedButton.classList.add(
            "wrong"
        );


        feedback.textContent =
            "💪 Nice try! The answer is " +
            correct + ".";


        feedback.classList.add(
            "wrong"
        );

    }


    document.getElementById(
        "score"
    ).textContent =
        score;


    setTimeout(
        function () {

            currentQuestion++;


            if (
                currentQuestion >=
                TOTAL_QUESTIONS
            ) {

                showResult();

            } else {

                showQuestion();

            }

        },
        1300
    );

}


// ========================================
// ADD STAR
// ========================================

function addStar() {

    let stars =
        Number(
            localStorage.getItem(
                STAR_KEY
            ) || 0
        );


    stars++;


    localStorage.setItem(
        STAR_KEY,
        stars
    );


    updateStars();

}


// ========================================
// UPDATE STAR DISPLAY
// ========================================

function updateStars() {

    const stars =
        Number(
            localStorage.getItem(
                STAR_KEY
            ) || 0
        );


    document.getElementById(
        "starCount"
    ).textContent =
        stars;

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


    const question =
        questions[currentQuestion];


    const shape =
        question.shape;


    speechSynthesis.cancel();


    let text;


    if (question.type === "identify") {

        text =
            "Which shape is this? " +
            shape.name;

    } else {

        text =
            "Find the " +
            shape.name +
            " shape.";

    }


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.lang = "en-US";

    speech.rate = 0.75;

    speech.pitch = 1.15;


    speechSynthesis.speak(
        speech
    );

}


// ========================================
// RESULT
// ========================================

function showResult() {

    document.getElementById(
        "gameScreen"
    ).classList.add("hidden");


    document.getElementById(
        "resultScreen"
    ).classList.remove("hidden");


    document.getElementById(
        "finalScore"
    ).textContent =
        score;


    document.getElementById(
        "earnedStars"
    ).textContent =
        earnedStarsThisGame;


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


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;


    updateStars();

}
