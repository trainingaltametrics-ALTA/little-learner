// ========================================
// LITTLE LEARNER - SHAPES
// ========================================

const shapesData = [
    {
        name: "Circle",
        word: "CIRCLE",
        className: "shape-circle",
        objects: ["⚽", "🍊", "🪙"],
        sentence: "A ball is round like a circle."
    },
    {
        name: "Square",
        word: "SQUARE",
        className: "shape-square",
        objects: ["🪟", "🎁", "🧇"],
        sentence: "A window can be a square."
    },
    {
        name: "Triangle",
        word: "TRIANGLE",
        className: "shape-triangle",
        objects: ["🍕", "⛺", "🔺"],
        sentence: "A triangle has three sides."
    },
    {
        name: "Rectangle",
        word: "RECTANGLE",
        className: "shape-rectangle",
        objects: ["🚪", "📺", "📱"],
        sentence: "A door can be a rectangle."
    },
    {
        name: "Star",
        word: "STAR",
        className: "shape-star",
        emoji: "⭐",
        objects: ["🌟", "✨", "🌌"],
        sentence: "A star shines in the sky."
    },
    {
        name: "Diamond",
        word: "DIAMOND",
        className: "shape-diamond",
        objects: ["💎", "♦️", "🔷"],
        sentence: "A diamond has four sides."
    },
    {
        name: "Heart",
        word: "HEART",
        className: "shape-heart",
        emoji: "❤️",
        objects: ["💕", "💖", "💗"],
        sentence: "A heart shows love."
    },
    {
        name: "Oval",
        word: "OVAL",
        className: "shape-oval",
        objects: ["🥚", "🏉", "🪞"],
        sentence: "An egg is oval-shaped."
    }
];

let currentShape = 0;

const TOTAL_SHAPES = shapesData.length;

const COMPLETION_KEY = "littleLearnerShapesCompleted";
const STAR_KEY = "littleLearnerStars";


// ========================================
// START
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    createShapeSelector();

    loadShape();

    updateStars();

});


// ========================================
// LOAD SHAPE
// ========================================

function loadShape() {

    const shape = shapesData[currentShape];

    const visual = document.getElementById("shapeVisual");

    // Reset visual
    visual.className = "shape-visual";
    visual.textContent = "";

    // Show emoji shapes
    if (shape.emoji) {

        visual.textContent = shape.emoji;

    }

    visual.classList.add(shape.className);


    // Shape name
    document.getElementById("shapeName").textContent =
        shape.name;


    // Shape word
    document.getElementById("shapeWord").textContent =
        shape.word;


    // Objects
    document.getElementById("shapeObjects").textContent =
        shape.objects.join(" ");


    // Sentence
    document.getElementById("shapeSentence").textContent =
        shape.sentence;


    updateProgress();

    updateNavigation();

    updateSelector();

}


// ========================================
// PROGRESS
// ========================================

function updateProgress() {

    const current = currentShape + 1;

    const percentage =
        Math.round((current / TOTAL_SHAPES) * 100);


    document.getElementById("currentNumber").textContent =
        current;


    document.getElementById("totalNumber").textContent =
        TOTAL_SHAPES;


    document.getElementById("progressPercent").textContent =
        percentage + "%";


    document.getElementById("progressFill").style.width =
        percentage + "%";

}


// ========================================
// PREVIOUS
// ========================================

function previousShape() {

    if (currentShape > 0) {

        currentShape--;

        loadShape();

    }

}


// ========================================
// NEXT
// ========================================

function nextShape() {

    if (currentShape < TOTAL_SHAPES - 1) {

        currentShape++;

        loadShape();

        // Completing the last shape
        if (currentShape === TOTAL_SHAPES - 1) {

            checkCompletion();

        }

    }

}


// ========================================
// SHAPE SELECTOR
// ========================================

function createShapeSelector() {

    const selector =
        document.getElementById("shapeSelector");

    selector.innerHTML = "";


    const symbols = {
        Circle: "⭕",
        Square: "⬜",
        Triangle: "🔺",
        Rectangle: "▭",
        Star: "⭐",
        Diamond: "💎",
        Heart: "❤️",
        Oval: "🥚"
    };


    shapesData.forEach(function (shape, index) {

        const button =
            document.createElement("button");


        button.textContent =
            symbols[shape.name] || "🔷";


        button.title =
            shape.name;


        button.addEventListener("click", function () {

            currentShape = index;

            loadShape();

            if (currentShape === TOTAL_SHAPES - 1) {
                checkCompletion();
            }

        });


        selector.appendChild(button);

    });

}


// ========================================
// UPDATE SELECTOR
// ========================================

function updateSelector() {

    const buttons =
        document.querySelectorAll(
            "#shapeSelector button"
        );


    buttons.forEach(function (button, index) {

        button.classList.toggle(
            "active",
            index === currentShape
        );

    });

}


// ========================================
// LISTEN
// ========================================

function speakCurrentShape() {

    if (!("speechSynthesis" in window)) {

        alert(
            "Sorry! Your browser does not support speech."
        );

        return;

    }


    const shape =
        shapesData[currentShape];


    speechSynthesis.cancel();


    const text =
        "This is a " +
        shape.name +
        ". " +
        shape.sentence;


    const speech =
        new SpeechSynthesisUtterance(text);


    speech.lang = "en-US";

    speech.rate = 0.75;

    speech.pitch = 1.15;


    speechSynthesis.speak(speech);

}


// ========================================
// STARS
// ========================================

function updateStars() {

    const stars =
        Number(
            localStorage.getItem(STAR_KEY) || 0
        );


    document.getElementById("starCount").textContent =
        stars;

}


// ========================================
// COMPLETION
// ========================================

function checkCompletion() {

    const alreadyCompleted =
        localStorage.getItem(COMPLETION_KEY);


    if (alreadyCompleted === "true") {

        return;

    }


    localStorage.setItem(
        COMPLETION_KEY,
        "true"
    );


    let stars =
        Number(
            localStorage.getItem(STAR_KEY) || 0
        );


    stars += 5;


    localStorage.setItem(
        STAR_KEY,
        stars
    );


    updateStars();


    setTimeout(function () {

        alert(
            "🎉 Amazing! You learned all the shapes!\n\n⭐ +5 Stars!"
        );

    }, 300);

}
