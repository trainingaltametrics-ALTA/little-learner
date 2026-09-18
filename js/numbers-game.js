const numbersData = [
    {
        number: 1,
        word: "One",
        object: "🍎",
        item: "apple"
    },
    {
        number: 2,
        word: "Two",
        object: "🍎🍎",
        item: "apples"
    },
    {
        number: 3,
        word: "Three",
        object: "🍎🍎🍎",
        item: "apples"
    },
    {
        number: 4,
        word: "Four",
        object: "⭐️⭐️⭐️⭐️",
        item: "stars"
    },
    {
        number: 5,
        word: "Five",
        object: "🍓🍓🍓🍓🍓",
        item: "strawberries"
    },
    {
        number: 6,
        word: "Six",
        object: "🐟🐟🐟🐟🐟🐟",
        item: "fish"
    },
    {
        number: 7,
        word: "Seven",
        object: "🌸🌸🌸🌸🌸🌸🌸",
        item: "flowers"
    },
    {
        number: 8,
        word: "Eight",
        object: "🦋🦋🦋🦋🦋🦋🦋🦋",
        item: "butterflies"
    },
    {
        number: 9,
        word: "Nine",
        object: "🍊🍊🍊🍊🍊🍊🍊🍊🍊",
        item: "oranges"
    },
    {
        number: 10,
        word: "Ten",
        object: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈",
        item: "balloons"
    }
];


const TOTAL_QUESTIONS = 10;

let questions = [];

let currentQuestion = 0;

let score = 0;

let answered = false;


let stars =
    Number(
        localStorage.getItem(
            "littleLearnerStars"
        )
    ) || 0;


document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateStars();

    }
);


function startGame() {

    questions =
        createQuestions();

    currentQuestion = 0;

    score = 0;

    answered = false;


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

    updateStars();
}


function createQuestions() {

    const shuffled =
        [...numbersData].sort(
            () => Math.random() - 0.5
        );

    return shuffled.slice(
        0,
        TOTAL_QUESTIONS
    );
}


function showQuestion() {

    answered = false;

    const question =
        questions[currentQuestion];


    document.getElementById(
        "questionNumber"
    ).textContent =
        `Question ${currentQuestion + 1} of ${TOTAL_QUESTIONS}`;


    document.getElementById(
        "scoreText"
    ).textContent =
        `Score: ${score}`;


    const progress =
        ((currentQuestion + 1) /
            TOTAL_QUESTIONS) * 100;


    document.getElementById(
        "questionFill"
    ).style.width =
        progress + "%";


    document.getElementById(
        "questionText"
    ).textContent =
        `How many ${question.item}?`;


    document.getElementById(
        "questionObjects"
    ).textContent =
        question.object;


    document.getElementById(
        "feedback"
    ).textContent = "";


    createOptions(
        question.number
    );
}


function createOptions(correctNumber) {

    const container =
        document.getElementById(
            "options"
        );

    container.innerHTML = "";


    let options = [
        correctNumber
    ];


    while (options.length < 3) {

        const randomNumber =
            Math.floor(
                Math.random() * 10
            ) + 1;


        if (
            !options.includes(
                randomNumber
            )
        ) {

            options.push(
                randomNumber
            );
        }
    }


    options.sort(
        () => Math.random() - 0.5
    );


    options.forEach(
        number => {

            const button =
                document.createElement(
                    "button"
                );

            button.className =
                "option-button";

            button.textContent =
                number;


            button.onclick =
                function () {

                    checkAnswer(
                        number,
                        correctNumber,
                        button
                    );

                };


            container.appendChild(
                button
            );

        }
    );
}


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
        button => {

            button.disabled = true;

        }
    );


    if (selected === correct) {

        clickedButton.classList.add(
            "correct"
        );

        score++;

        addStar();

        document.getElementById(
            "feedback"
        ).textContent =
            "🎉 Correct! Great counting! ⭐";

    } else {

        clickedButton.classList.add(
            "wrong"
        );


        buttons.forEach(
            button => {

                if (
                    Number(
                        button.textContent
                    ) === correct
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
            `😊 Nice try! The answer is ${correct}.`;
    }


    document.getElementById(
        "scoreText"
    ).textContent =
        `Score: ${score}`;


    setTimeout(
        nextQuestion,
        1400
    );
}


function nextQuestion() {

    currentQuestion++;


    if (
        currentQuestion <
        TOTAL_QUESTIONS
    ) {

        showQuestion();

    } else {

        finishGame();

    }
}


function addStar() {

    stars++;

    localStorage.setItem(
        "littleLearnerStars",
        stars
    );

    updateStars();
}


function updateStars() {

    document.getElementById(
        "starCount"
    ).textContent =
        stars;
}


function listenQuestion() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    const question =
        questions[currentQuestion];


    const text =
        `How many ${question.item}? ${question.number}.`;


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.lang = "en-US";

    speech.rate = 0.8;

    speech.pitch = 1.1;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );
}


function finishGame() {

    document
        .getElementById("gameScreen")
        .classList.add("hidden");


    document
        .getElementById("resultScreen")
        .classList.remove("hidden");


    document.getElementById(
        "finalScore"
    ).textContent =
        `${score} / ${TOTAL_QUESTIONS}`;


    let message;


    if (score === 10) {

        message =
            "🏆 Perfect! You are a Number Superstar!";

    } else if (score >= 8) {

        message =
            "🌟 Wonderful! You can count very well!";

    } else if (score >= 5) {

        message =
            "👏 Good job! Keep practicing your numbers!";

    } else {

        message =
            "💪 Nice try! Let's practice counting some more!";
    }


    document.getElementById(
        "resultMessage"
    ).textContent =
        message;
}


function goHome() {

    window.location.href =
        "../index.html";
}
