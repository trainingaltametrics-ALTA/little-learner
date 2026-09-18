const numbersData = [
    { number: 1, word: "One", object: "🍎", item: "apple" },
    { number: 2, word: "Two", object: "🍎🍎", item: "apples" },
    { number: 3, word: "Three", object: "🍎🍎🍎", item: "apples" },
    { number: 4, word: "Four", object: "⭐️⭐️⭐️⭐️", item: "stars" },
    { number: 5, word: "Five", object: "🍓🍓🍓🍓🍓", item: "strawberries" },
    { number: 6, word: "Six", object: "🐟🐟🐟🐟🐟🐟", item: "fish" },
    { number: 7, word: "Seven", object: "🌸🌸🌸🌸🌸🌸🌸", item: "flowers" },
    { number: 8, word: "Eight", object: "🦋🦋🦋🦋🦋🦋🦋🦋", item: "butterflies" },
    { number: 9, word: "Nine", object: "🍊🍊🍊🍊🍊🍊🍊🍊🍊", item: "oranges" },
    { number: 10, word: "Ten", object: "🎈🎈🎈🎈🎈🎈🎈🎈🎈🎈", item: "balloons" },
    { number: 11, word: "Eleven", object: "🍭".repeat(11), item: "lollipops" },
    { number: 12, word: "Twelve", object: "⭐️".repeat(12), item: "stars" },
    { number: 13, word: "Thirteen", object: "🍎".repeat(13), item: "apples" },
    { number: 14, word: "Fourteen", object: "🌸".repeat(14), item: "flowers" },
    { number: 15, word: "Fifteen", object: "🍓".repeat(15), item: "strawberries" },
    { number: 16, word: "Sixteen", object: "🐟".repeat(16), item: "fish" },
    { number: 17, word: "Seventeen", object: "🦋".repeat(17), item: "butterflies" },
    { number: 18, word: "Eighteen", object: "🍊".repeat(18), item: "oranges" },
    { number: 19, word: "Nineteen", object: "🎈".repeat(19), item: "balloons" },
    { number: 20, word: "Twenty", object: "⭐️".repeat(20), item: "stars" }
];


let currentIndex = 0;

let completedNumbers =
    JSON.parse(
        localStorage.getItem(
            "littleLearnerNumbersCompleted"
        )
    ) || [];

let stars =
    Number(
        localStorage.getItem(
            "littleLearnerStars"
        )
    ) || 0;


document.addEventListener(
    "DOMContentLoaded",
    function () {

        createNumberButtons();

        displayNumber();

        updateStars();

    }
);


function displayNumber() {

    const data =
        numbersData[currentIndex];

    document.getElementById(
        "number"
    ).textContent = data.number;

    document.getElementById(
        "objects"
    ).textContent = data.object;

    document.getElementById(
        "numberWord"
    ).textContent = data.word;

    document.getElementById(
        "numberSentence"
    ).textContent =
        `${data.number} ${data.item}.`;

    updateProgress();

    updateNumberButtons();

    updateNavigation();

    updateCompletedMessage();
}


function updateProgress() {

    const progress =
        ((currentIndex + 1) /
            numbersData.length) *
        100;

    document.getElementById(
        "progressFill"
    ).style.width =
        progress + "%";

    document.getElementById(
        "progressText"
    ).textContent =
        `${currentIndex + 1} / ${numbersData.length}`;
}


function nextNumber() {

    completeCurrentNumber();

    if (
        currentIndex <
        numbersData.length - 1
    ) {

        currentIndex++;

        displayNumber();

        speakCurrentNumber();

    } else {

        celebrateCompletion();

    }
}


function previousNumber() {

    if (currentIndex > 0) {

        currentIndex--;

        displayNumber();
    }
}


function selectNumber(index) {

    if (
        index >= 0 &&
        index < numbersData.length
    ) {

        currentIndex = index;

        displayNumber();
    }
}


function completeCurrentNumber() {

    const number =
        numbersData[currentIndex].number;

    if (
        !completedNumbers.includes(number)
    ) {

        completedNumbers.push(number);

        localStorage.setItem(
            "littleLearnerNumbersCompleted",
            JSON.stringify(completedNumbers)
        );

        stars++;

        localStorage.setItem(
            "littleLearnerStars",
            stars
        );

        updateStars();

    }

    updateCompletedMessage();

    updateNumberButtons();
}


function updateCompletedMessage() {

    const message =
        document.getElementById(
            "completedMessage"
        );

    const number =
        numbersData[currentIndex].number;

    if (
        completedNumbers.includes(number)
    ) {

        message.classList.add("show");

    } else {

        message.classList.remove("show");
    }
}


function createNumberButtons() {

    const container =
        document.getElementById(
            "numberButtons"
        );

    container.innerHTML = "";

    numbersData.forEach(
        (data, index) => {

            const button =
                document.createElement(
                    "button"
                );

            button.textContent =
                data.number;

            button.onclick =
                function () {
                    selectNumber(index);
                };

            container.appendChild(button);
        }
    );
}


function updateNumberButtons() {

    const buttons =
        document.querySelectorAll(
            "#numberButtons button"
        );

    buttons.forEach(
        (button, index) => {

            const number =
                numbersData[index].number;

            button.classList.toggle(
                "active",
                index === currentIndex
            );

            button.classList.toggle(
                "completed",
                completedNumbers.includes(number)
            );

        }
    );
}


function updateNavigation() {

    document.getElementById(
        "previousButton"
    ).disabled =
        currentIndex === 0;

    document.getElementById(
        "nextButton"
    ).textContent =
        currentIndex ===
        numbersData.length - 1
            ? "🏆 Finish"
            : "Next ➡️";
}


function speakCurrentNumber() {

    if (!("speechSynthesis" in window)) {
        return;
    }

    const data =
        numbersData[currentIndex];

    const text =
        `${data.number}. ${data.word}. ${data.number} ${data.item}.`;

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.8;
    speech.pitch = 1.1;

    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );
}


function updateStars() {

    document.getElementById(
        "starCount"
    ).textContent = stars;
}


function celebrateCompletion() {

    alert(
        "🎉 Amazing! You completed all numbers from 1 to 20! ⭐"
    );
}


function goHome() {

    window.location.href =
        "../index.html";
}
