
/* =================================
   LITTLE LEARNER
   Main JavaScript
================================ */


/* ================================
   LOAD SAVED STARS
================================ */

let stars = Number(
    localStorage.getItem("littleLearnerStars")
) || 0;


/* Update stars when page opens */

updateStars();


/* ================================
   UPDATE STAR DISPLAY
================================ */

function updateStars() {

    document.getElementById("starCount").textContent = stars;

    document.getElementById("progressStars").textContent = stars;

}


/* ================================
   ADD STAR
================================ */

function addStar() {

    stars++;

    localStorage.setItem(
        "littleLearnerStars",
        stars
    );

    updateStars();

}


/* ================================
   START LEARNING
================================ */

function startLearning() {

    document.querySelector(".learning-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ================================
   OPEN MODULE
================================ */

function openModule(moduleName) {

    /*
       These pages will be created
       in the next development steps.
    */

    const pages = {

        alphabet: "pages/alphabet.html",

        numbers: "pages/numbers.html",

        colors: "pages/colors.html",

        shapes: "pages/shapes.html",

        animals: "pages/animals.html",

        fruits: "pages/fruits.html"

    };


    if (pages[moduleName]) {

        window.location.href =
            pages[moduleName];

    }

}


/* ================================
   PROGRESS
================================ */

function showProgress() {

    alert(
        "🌟 Your Little Learner Progress 🌟\n\n" +
        "Stars collected: " + stars
    );

}


/* ================================
   WELCOME MESSAGE
================================ */

console.log(
    "🌈 Little Learner is ready!"
);

