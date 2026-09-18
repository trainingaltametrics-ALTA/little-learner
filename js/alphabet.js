
/* =====================================
   LITTLE LEARNER
   ABC LEARNING ENGINE
===================================== */


/* =====================================
   ABC DATA
===================================== */

const alphabetData = [

    {
        letter: "A",
        word: "Apple",
        picture: "🍎",
        sentence: "A is for Apple"
    },

    {
        letter: "B",
        word: "Ball",
        picture: "⚽",
        sentence: "B is for Ball"
    },

    {
        letter: "C",
        word: "Cat",
        picture: "🐱",
        sentence: "C is for Cat"
    },

    {
        letter: "D",
        word: "Dog",
        picture: "🐶",
        sentence: "D is for Dog"
    },

    {
        letter: "E",
        word: "Elephant",
        picture: "🐘",
        sentence: "E is for Elephant"
    },

    {
        letter: "F",
        word: "Fish",
        picture: "🐟",
        sentence: "F is for Fish"
    },

    {
        letter: "G",
        word: "Grapes",
        picture: "🍇",
        sentence: "G is for Grapes"
    },

    {
        letter: "H",
        word: "Horse",
        picture: "🐴",
        sentence: "H is for Horse"
    },

    {
        letter: "I",
        word: "Ice Cream",
        picture: "🍦",
        sentence: "I is for Ice Cream"
    },

    {
        letter: "J",
        word: "Juice",
        picture: "🧃",
        sentence: "J is for Juice"
    },

    {
        letter: "K",
        word: "Kite",
        picture: "🪁",
        sentence: "K is for Kite"
    },

    {
        letter: "L",
        word: "Lion",
        picture: "🦁",
        sentence: "L is for Lion"
    },

    {
        letter: "M",
        word: "Monkey",
        picture: "🐒",
        sentence: "M is for Monkey"
    },

    {
        letter: "N",
        word: "Nest",
        picture: "🪺",
        sentence: "N is for Nest"
    },

    {
        letter: "O",
        word: "Orange",
        picture: "🍊",
        sentence: "O is for Orange"
    },

    {
        letter: "P",
        word: "Panda",
        picture: "🐼",
        sentence: "P is for Panda"
    },

    {
        letter: "Q",
        word: "Queen",
        picture: "👑",
        sentence: "Q is for Queen"
    },

    {
        letter: "R",
        word: "Rabbit",
        picture: "🐰",
        sentence: "R is for Rabbit"
    },

    {
        letter: "S",
        word: "Sun",
        picture: "☀️",
        sentence: "S is for Sun"
    },

    {
        letter: "T",
        word: "Tiger",
        picture: "🐯",
        sentence: "T is for Tiger"
    },

    {
        letter: "U",
        word: "Umbrella",
        picture: "☂️",
        sentence: "U is for Umbrella"
    },

    {
        letter: "V",
        word: "Van",
        picture: "🚐",
        sentence: "V is for Van"
    },

    {
        letter: "W",
        word: "Whale",
        picture: "🐳",
        sentence: "W is for Whale"
    },

    {
        letter: "X",
        word: "Xylophone",
        picture: "🎵",
        sentence: "X is for Xylophone"
    },

    {
        letter: "Y",
        word: "Yo-Yo",
        picture: "🪀",
        sentence: "Y is for Yo-Yo"
    },

    {
        letter: "Z",
        word: "Zebra",
        picture: "🦓",
        sentence: "Z is for Zebra"
    }

];


/* =====================================
   CURRENT LETTER
===================================== */

let currentIndex = 0;


/* =====================================
   COMPLETED LETTERS
===================================== */

let completedLetters =
    JSON.parse(
        localStorage.getItem(
            "littleLearnerABCCompleted"
        )
    ) || [];


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

        createAlphabetButtons();

        displayLetter();

        updateStars();

    }
);


/* =====================================
   DISPLAY LETTER
===================================== */

function displayLetter() {

    const item =
        alphabetData[currentIndex];


    document.getElementById(
        "letter"
    ).textContent =
        item.letter;


    document.getElementById(
        "picture"
    ).textContent =
        item.picture;


    document.getElementById(
        "word"
    ).textContent =
        item.word;


    document.getElementById(
        "sentence"
    ).textContent =
        item.sentence;


    document.getElementById(
        "letterNumber"
    ).textContent =
        currentIndex + 1;


    document.getElementById(
        "progressText"
    ).textContent =
        `${currentIndex + 1} / 26`;


    updateProgress();


    updateNavigation();


    updateAlphabetButtons();


    updateCompletedMessage();

}


/* =====================================
   PROGRESS BAR
===================================== */

function updateProgress() {

    const percentage =
        ((currentIndex + 1) / 26) * 100;


    document.getElementById(
        "progressFill"
    ).style.width =
        percentage + "%";

}


/* =====================================
   NEXT LETTER
===================================== */

function nextLetter() {

    completeCurrentLetter();


    if (
        currentIndex <
        alphabetData.length - 1
    ) {

        currentIndex++;

        displayLetter();

        speakCurrentLetter();

    }

    else {

        celebrateCompletion();

    }

}


/* =====================================
   PREVIOUS LETTER
===================================== */

function previousLetter() {

    if (currentIndex > 0) {

        currentIndex--;

        displayLetter();

    }

}


/* =====================================
   SELECT LETTER
===================================== */

function selectLetter(index) {

    currentIndex = index;

    displayLetter();

}


/* =====================================
   ALPHABET BUTTONS
===================================== */

function createAlphabetButtons() {

    const container =
        document.getElementById(
            "alphabetButtons"
        );


    alphabetData.forEach(
        function (item, index) {

            const button =
                document.createElement(
                    "button"
                );


            button.className =
                "letter-button";


            button.textContent =
                item.letter;


            button.addEventListener(
                "click",
                function () {

                    selectLetter(index);

                }
            );


            container.appendChild(
                button
            );

        }
    );

}


/* =====================================
   UPDATE ALPHABET BUTTONS
===================================== */

function updateAlphabetButtons() {

    const buttons =
        document.querySelectorAll(
            ".letter-button"
        );


    buttons.forEach(
        function (button, index) {

            button.classList.toggle(
                "active",
                index === currentIndex
            );

        }
    );

}


/* =====================================
   NAVIGATION BUTTONS
===================================== */

function updateNavigation() {

    document.getElementById(
        "previousButton"
    ).disabled =
        currentIndex === 0;


    document.getElementById(
        "nextButton"
    ).textContent =
        currentIndex ===
        alphabetData.length - 1
            ? "Finish 🎉"
            : "Next →";

}


/* =====================================
   SPEAK LETTER
===================================== */

function speakCurrentLetter() {

    const item =
        alphabetData[currentIndex];


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Sorry! Your browser does not support voice."
        );

        return;

    }


    speechSynthesis.cancel();


    const text =
        `${item.letter}. ${item.word}. ${item.sentence}.`;


    const speech =
        new SpeechSynthesisUtterance(
            text
        );


    speech.lang = "en-US";

    speech.rate = 0.8;

    speech.pitch = 1.1;

    speech.volume = 1;


    speechSynthesis.speak(
        speech
    );

}


/* =====================================
   COMPLETE LETTER
===================================== */

function completeCurrentLetter() {

    const letter =
        alphabetData[
            currentIndex
        ].letter;


    if (
        !completedLetters.includes(letter)
    ) {

        completedLetters.push(letter);


        stars++;


        localStorage.setItem(
            "littleLearnerABCCompleted",
            JSON.stringify(
                completedLetters
            )
        );


        localStorage.setItem(
            "littleLearnerStars",
            stars
        );


        updateStars();

    }


    updateCompletedMessage();

}


/* =====================================
   COMPLETED MESSAGE
===================================== */

function updateCompletedMessage() {

    const letter =
        alphabetData[
            currentIndex
        ].letter;


    const message =
        document.getElementById(
            "completedMessage"
        );


    if (
        completedLetters.includes(letter)
    ) {

        message.classList.add(
            "show"
        );

        message.textContent =
            "⭐ Great Job!";

    }

    else {

        message.classList.remove(
            "show"
        );

    }

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
   FINISH ABC
===================================== */

function celebrateCompletion() {

    completeCurrentLetter();


    alert(
        "🎉 Amazing!\n\n" +
        "You finished the ABC!\n" +
        "⭐ You are a Super Learner!"
    );

}


/* =====================================
   GO HOME
===================================== */

function goHome() {

    window.location.href =
        "../index.html";

}

