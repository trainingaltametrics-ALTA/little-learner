const colorsData = [
    {
        name: "Red",
        hex: "#ff4d4d",
        objects: "🍎 🚗 🎈",
        sentence: "An apple can be red."
    },
    {
        name: "Blue",
        hex: "#4d9fff",
        objects: "🦋 🐳 💧",
        sentence: "The sky can be blue."
    },
    {
        name: "Yellow",
        hex: "#ffd93d",
        objects: "🌞 🍌 ⭐",
        sentence: "The sun is yellow."
    },
    {
        name: "Green",
        hex: "#4caf50",
        objects: "🍃 🐸 🥒",
        sentence: "Leaves are green."
    },
    {
        name: "Orange",
        hex: "#ff922b",
        objects: "🍊 🥕 🦊",
        sentence: "An orange is orange."
    },
    {
        name: "Purple",
        hex: "#9b59b6",
        objects: "🍇 🦄 💜",
        sentence: "Grapes can be purple."
    },
    {
        name: "Pink",
        hex: "#ff69b4",
        objects: "🌷 🐷 🎀",
        sentence: "A flower can be pink."
    },
    {
        name: "Brown",
        hex: "#8b5a2b",
        objects: "🐻 🪵 🍫",
        sentence: "A bear can be brown."
    },
    {
        name: "Black",
        hex: "#222222",
        objects: "🐈‍⬛ 🕶️ 🖤",
        sentence: "A cat can be black."
    },
    {
        name: "White",
        hex: "#f5f5f5",
        objects: "☁️ 🐑 🥛",
        sentence: "Clouds can be white."
    }
];


let currentIndex = 0;

let completedColors =
    JSON.parse(
        localStorage.getItem(
            "littleLearnerColorsCompleted"
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

        createColorButtons();

        displayColor();

        updateStars();

    }
);


function displayColor() {

    const data =
        colorsData[currentIndex];


    const circle =
        document.getElementById(
            "colorCircle"
        );

    circle.style.background =
        data.hex;


    document.getElementById(
        "colorName"
    ).textContent =
        data.name;


    document.getElementById(
        "colorWord"
    ).textContent =
        data.name.toUpperCase();


    document.getElementById(
        "colorObjects"
    ).textContent =
        data.objects;


    document.getElementById(
        "colorSentence"
    ).textContent =
        data.sentence;


    updateProgress();

    updateColorButtons();

    updateNavigation();

    updateCompletedMessage();

    updateTextColor();
}


function updateProgress() {

    const progress =
        ((currentIndex + 1) /
            colorsData.length) * 100;


    document.getElementById(
        "progressFill"
    ).style.width =
        progress + "%";


    document.getElementById(
        "progressText"
    ).textContent =
        `${currentIndex + 1} / ${colorsData.length}`;
}


function updateTextColor() {

    const data =
        colorsData[currentIndex];

    const name =
        document.getElementById(
            "colorName"
        );

    /*
     * Keep light colors readable.
     */

    if (
        data.name === "Yellow" ||
        data.name === "White"
    ) {

        name.style.color = "#555";

    } else {

        name.style.color =
            data.hex;
    }
}


function nextColor() {

    completeCurrentColor();


    if (
        currentIndex <
        colorsData.length - 1
    ) {

        currentIndex++;

        displayColor();

        speakCurrentColor();

    } else {

        celebrateCompletion();

    }
}


function previousColor() {

    if (currentIndex > 0) {

        currentIndex--;

        displayColor();
    }
}


function selectColor(index) {

    if (
        index >= 0 &&
        index < colorsData.length
    ) {

        currentIndex = index;

        displayColor();
    }
}


function completeCurrentColor() {

    const color =
        colorsData[currentIndex].name;


    if (
        !completedColors.includes(color)
    ) {

        completedColors.push(color);


        localStorage.setItem(
            "littleLearnerColorsCompleted",
            JSON.stringify(
                completedColors
            )
        );


        stars++;


        localStorage.setItem(
            "littleLearnerStars",
            stars
        );


        updateStars();

    }


    updateCompletedMessage();

    updateColorButtons();
}


function updateCompletedMessage() {

    const message =
        document.getElementById(
            "completedMessage"
        );


    const color =
        colorsData[currentIndex].name;


    if (
        completedColors.includes(color)
    ) {

        message.classList.add("show");

    } else {

        message.classList.remove("show");
    }
}


function createColorButtons() {

    const container =
        document.getElementById(
            "colorButtons"
        );


    container.innerHTML = "";


    colorsData.forEach(
        (data, index) => {

            const button =
                document.createElement(
                    "button"
                );


            button.title =
                data.name;


            button.setAttribute(
                "aria-label",
                data.name
            );


            button.style.background =
                data.hex;


            button.onclick =
                function () {

                    selectColor(index);

                };


            container.appendChild(
                button
            );

        }
    );
}


function updateColorButtons() {

    const buttons =
        document.querySelectorAll(
            "#colorButtons button"
        );


    buttons.forEach(
        (button, index) => {

            const color =
                colorsData[index].name;


            button.classList.toggle(
                "active",
                index === currentIndex
            );


            button.classList.toggle(
                "completed",
                completedColors.includes(
                    color
                )
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
        colorsData.length - 1
            ? "🏆 Finish"
            : "Next ➡️";
}


function speakCurrentColor() {

    if (
        !("speechSynthesis" in window)
    ) {
        return;
    }


    const data =
        colorsData[currentIndex];


    const text =
        `${data.name}. ${data.sentence}`;


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


function updateStars() {

    document.getElementById(
        "starCount"
    ).textContent =
        stars;
}


function celebrateCompletion() {

    alert(
        "🎉 Amazing! You completed all 10 colors! 🌈⭐"
    );
}


function goHome() {

    window.location.href =
        "../index.html";
}
