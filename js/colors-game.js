const colorsData = [
    {
        name: "Red",
        hex: "#ff4d4d",
        objects: ["🍎", "🚗", "🎈"]
    },
    {
        name: "Blue",
        hex: "#4d9fff",
        objects: ["🦋", "🐳", "💧"]
    },
    {
        name: "Yellow",
        hex: "#ffd93d",
        objects: ["🌞", "🍌", "⭐"]
    },
    {
        name: "Green",
        hex: "#4caf50",
        objects: ["🍃", "🐸", "🥒"]
    },
    {
        name: "Orange",
        hex: "#ff922b",
        objects: ["🍊", "🥕", "🦊"]
    },
    {
        name: "Purple",
        hex: "#9b59b6",
        objects: ["🍇", "🦄", "💜"]
    },
    {
        name: "Pink",
        hex: "#ff69b4",
        objects: ["🌷", "🐷", "🎀"]
    },
    {
        name: "Brown",
        hex: "#8b5a2b",
        objects: ["🐻", "🪵", "🍫"]
    },
    {
        name: "Black",
        hex: "#222222",
        objects: ["🐈‍⬛", "🕶️", "🖤"]
    },
    {
        name: "White",
        hex: "#f5f5f5",
        objects: ["☁️", "🐑", "🥛"]
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
        [...colorsData].sort(
            () => Math.random() - 0.5
        );


    return shuffled.map(
        (color, index) => {

            return {
                ...color,

                type:
                    index % 2 === 0
                        ? "identify"
                        : "find"
            };

        }
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
        "feedback"
    ).textContent = "";


    if (question.type === "identify") {

        showIdentifyQuestion(question);

    } else {

        showFindQuestion(question);

    }
}


function showIdentifyQuestion(question) {

    document.getElementById(
        "questionText"
    ).textContent =
        "Which color is this?";


    const visual =
        document.getElementById(
            "questionVisual"
        );


    visual.innerHTML = "";


    const circle =
        document.createElement(
            "div"
        );


    circle.className =
        "color-question-circle";


    circle.style.background =
        question.hex;


    visual.appendChild(circle);


    createNameOptions(
        question.name
    );
}


function showFindQuestion(question) {

    document.getElementById(
        "questionText"
    ).textContent =
        `Find the ${question.name} color!`;


    const visual =
        document.getElementById(
            "questionVisual"
        );


    visual.innerHTML = "";


    question.objects.forEach(
        emoji => {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "object-item";


            item.textContent =
                emoji;


            visual.appendChild(item);

        }
    );


    createColorOptions(
        question
    );
}


function createNameOptions(
    correctName
) {

    const options =
        createRandomOptions(
            correctName
        );


    createOptionButtons(
        options,
        correctName
    );
}


function createColorOptions(
    correctColor
) {

    const options =
        createRandomOptions(
            correctColor.name
        );


    createOptionButtons(
        options,
        correctColor.name
    );
}


function createRandomOptions(
    correctName
) {

    const options = [
        correctName
    ];


    while (options.length < 3) {

        const randomColor =
            colorsData[
                Math.floor(
                    Math.random() *
                    colorsData.length
                )
            ];


        if (
            !options.includes(
                randomColor.name
            )
        ) {

            options.push(
                randomColor.name
            );

        }

    }


    return options.sort(
        () => Math.random() - 0.5
    );
}


function createOptionButtons(
    options,
    correctName
) {

    const container =
        document.getElementById(
            "options"
        );


    container.innerHTML = "";


    options.forEach(
        name => {

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
            "🎉 Correct! Wonderful! ⭐";


    } else {

        clickedButton.classList.add(
            "wrong"
        );


        buttons.forEach(
            button => {

                if (
                    button.textContent ===
                    correct
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


    let text;


    if (
        question.type ===
        "identify"
    ) {

        text =
            "Which color is this?";

    } else {

        text =
            `Find the ${question.name} color.`;

    }


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
            "🏆 Perfect! You are a Color Superstar!";

    } else if (score >= 8) {

        message =
            "🌟 Wonderful! You know your colors very well!";

    } else if (score >= 5) {

        message =
            "👏 Good job! Keep practicing your colors!";

    } else {

        message =
            "💪 Nice try! Let's learn some more colors!";
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
