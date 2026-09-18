
/* =====================================
   LITTLE LEARNER
   ABC GAME ENGINE
===================================== */


/* =====================================
   ABC DATA
===================================== */

const alphabetData = [

    { letter: "A", word: "Apple", picture: "🍎" },
    { letter: "B", word: "Ball", picture: "⚽" },
    { letter: "C", word: "Cat", picture: "🐱" },
    { letter: "D", word: "Dog", picture: "🐶" },
    { letter: "E", word: "Elephant", picture: "🐘" },
    { letter: "F", word: "Fish", picture: "🐟" },
    { letter: "G", word: "Grapes", picture: "🍇" },
    { letter: "H", word: "Horse", picture: "🐴" },
    { letter: "I", word: "Ice Cream", picture: "🍦" },
    { letter: "J", word: "Juice", picture: "🧃" },
    { letter: "K", word: "Kite", picture: "🪁" },
    { letter: "L", word: "Lion", picture: "🦁" },
    { letter: "M", word: "Monkey", picture: "🐒" },
    { letter: "N", word: "Nest", picture: "🪺" },
    { letter: "O", word: "Orange", picture: "🍊" },
    { letter: "P", word: "Panda", picture: "🐼" },
    { letter: "Q", word: "Queen", picture: "👑" },
    { letter: "R", word: "Rabbit", picture: "🐰" },
    { letter: "S", word: "Sun", picture: "☀️" },
    { letter: "T", word: "Tiger", picture: "🐯" },
    { letter: "U", word: "Umbrella", picture: "☂️" },
    { letter: "V", word: "Van", picture: "🚐" },
    { letter: "W", word: "Whale", picture: "🐳" },
    { letter: "X", word: "Xylophone", picture: "🎵" },
    { letter: "Y", word: "Yo-Yo", picture: "🪀" },
    { letter: "Z", word: "Zebra", picture: "🦓" }

];


/* =====================================
   GAME VARIABLES
===================================== */

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;

const TOTAL_QUESTIONS = 10;


/* =====================================
   STARS
===================================== */

let stars =
    Number(
        localStorage.getItem(
            "littleLearnerStars"
        )
    ) || 0;


/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateStars();

    }
);


/* =====================================
   START GAME
===================================== */

function startGame() {

    questions =
        createQuestions();

    currentQuestion = 0;

    score = 0;

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


    showQuestion();

}


/* =====================================
   CREATE QUESTIONS
===================================== */

function createQuestions() {

    const shuffled =
        [...alphabetData]
            .sort(
                () => Math.random() - 0.5
            );


    return shuffled.slice(
        0,
        TOTAL_QUESTIONS
    );

}


/* =====================================
   SHOW QUESTION
===================================== */

function showQuestion() {

    answered = false;


    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `${currentQuestion + 1} / ${TOTAL_QUESTIONS}`;


    document.getElementById(
        "questionFill"
    ).style.width =
        `${((currentQuestion + 1) / TOTAL_QUESTIONS) * 100}%`;


    document.getElementById(
        "questionPicture"
    ).textContent =
        question.picture;


    document.getElementById(
        "questionWord"
    ).textContent =
        question.word;


    document.getElementById(
        "feedback"
    ).textContent = "";


    document.getElementById(
        "feedback"
    ).className =
        "feedback";


    createOptions(
        question.letter
    );

}


/* =====================================
   CREATE ANSWER OPTIONS
===================================== */

function createOptions(correctLetter) {

    const optionsContainer =
        document.getElementById(
            "options"
        );


    optionsContainer.innerHTML = "";


    let options =
        [correctLetter];


    const otherLetters =
        alphabetData
            .filter(
                item =>
                    item.letter !== correctLetter
            )
            .map(
                item =>
                    item.letter
            );


    otherLetters.sort(
        () => Math.random() - 0.5
    );


    options.push(
        otherLetters[0],
        otherLetters[1]
    );


    options.sort(
        () => Math.random() - 0.5
    );


    options.forEach(
        function (letter) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "option-button";


            button.textContent =
                letter;


            button.onclick =
                function () {

                    checkAnswer(
                        letter,
                        correctLetter,
                        button
                    );

                };


            optionsContainer.appendChild(
                button
            );

        }
    );

}


/* =====================================
   CHECK ANSWER
===================================== */

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


    if (
        selected === correct
    ) {

        score++;


        clickedButton.classList.add(
            "correct"
        );


        document.getElementById(
            "feedback"
        ).textContent =
            `🎉 Fantastic! ${correct} is correct! ⭐`;


        document.getElementById(
            "feedback"
        ).className =
            "feedback correct-feedback";


        addStar();


    }

    else {

        clickedButton.classList.add(
            "wrong"
        );


        buttons.forEach(
            function (button) {

                if (
                    button.textContent === correct
                ) {

                    button.classList.add(
                        "correct"
                    );

                }

            }
        );


        document.getElementById(
            "feedback"
        ).textContent =
            `💡 Almost! The correct answer is ${correct}.`;


        document.getElementById(
            "feedback"
        ).className =
            "feedback wrong-feedback";

    }


    buttons.forEach(
        function (button) {

            button.disabled = true;

        }
    );


    setTimeout(
        nextQuestion,
        1400
    );

}


/* =====================================
   NEXT QUESTION
===================================== */

function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        TOTAL_QUESTIONS
    ) {

        showQuestion();

    }

    else {

        finishGame();

    }

}


/* =====================================
   ADD STAR
===================================== */

function addStar() {

    stars++;


    localStorage.setItem(
        "littleLearnerStars",
        stars
    );


    updateStars();

}


/* =====================================
   UPDATE STARS
===================================== */

function updateStars() {

    document.getElementById(
        "starCount"
    ).textContent =
        stars;

}


/* =====================================
   LISTEN
===================================== */

function listenQuestion() {

    const question =
        questions[currentQuestion];


    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    speechSynthesis.cancel();


    const speech =
        new SpeechSynthesisUtterance(
            `${question.word}. Which letter starts ${question.word}?`
        );


    speech.lang = "en-US";

    speech.rate = 0.8;

    speech.pitch = 1.1;


    speechSynthesis.speak(
        speech
    );

}


/* =====================================
   FINISH GAME
===================================== */

function finishGame() {

    document.getElementById(
        "gameScreen"
    ).classList.add("hidden");


    document.getElementById(
        "resultScreen"
    ).classList.remove("hidden");


    document.getElementById(
        "finalScore"
    ).textContent =
        `${score} / ${TOTAL_QUESTIONS}`;


    let message;


    if (score === 10) {

        message =
            "🏆 Perfect! You are an ABC Superstar!";

    }

    else if (score >= 8) {

        message =
            "🌟 Wonderful! You know your ABCs very well!";

    }

    else if (score >= 5) {

        message =
            "👏 Good job! Keep practicing!";

    }

    else {

        message =
            "💪 Nice try! Let's practice some more!";

    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;


    updateStars();

}


/* =====================================
   HOME
===================================== */

function goHome() {

    window.location.href =
        "../index.html";

}

