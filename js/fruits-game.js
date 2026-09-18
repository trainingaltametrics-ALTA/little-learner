
const fruits = [
  {
    name: "Apple",
    emoji: "🍎",
    color: "Red"
  },
  {
    name: "Banana",
    emoji: "🍌",
    color: "Yellow"
  },
  {
    name: "Orange",
    emoji: "🍊",
    color: "Orange"
  },
  {
    name: "Strawberry",
    emoji: "🍓",
    color: "Red"
  },
  {
    name: "Grapes",
    emoji: "🍇",
    color: "Purple"
  },
  {
    name: "Watermelon",
    emoji: "🍉",
    color: "Green and Red"
  },
  {
    name: "Mango",
    emoji: "🥭",
    color: "Yellow and Orange"
  },
  {
    name: "Pineapple",
    emoji: "🍍",
    color: "Yellow"
  },
  {
    name: "Peach",
    emoji: "🍑",
    color: "Peach"
  },
  {
    name: "Cherry",
    emoji: "🍒",
    color: "Red"
  }
];

const TOTAL_QUESTIONS = 10;

let questions = [];
let currentQuestion = 0;
let score = 0;
let gameStars = 0;
let answered = false;


/* -----------------------------
   GET ELEMENTS
----------------------------- */

const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");

const startButton = document.getElementById("startButton");
const playAgainButton = document.getElementById("playAgainButton");
const listenButton = document.getElementById("listenButton");

const fruitVisual = document.getElementById("fruitVisual");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const feedback = document.getElementById("feedback");

const questionNumber = document.getElementById("questionNumber");
const progressFill = document.getElementById("progressFill");
const starCount = document.getElementById("starCount");

const finalScore = document.getElementById("finalScore");
const earnedStars = document.getElementById("earnedStars");
const resultMessage = document.getElementById("resultMessage");


/* -----------------------------
   START GAME
----------------------------- */

startButton.addEventListener("click", startGame);
playAgainButton.addEventListener("click", startGame);

function startGame() {

  currentQuestion = 0;
  score = 0;
  gameStars = 0;
  answered = false;

  questions = shuffle([...fruits]).slice(0, TOTAL_QUESTIONS);

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");

  updateStars();

  showQuestion();
}


/* -----------------------------
   SHOW QUESTION
----------------------------- */

function showQuestion() {

  answered = false;

  const fruit = questions[currentQuestion];

  fruitVisual.textContent = fruit.emoji;

  questionText.textContent = "Which fruit is this?";

  questionNumber.textContent = currentQuestion + 1;

  progressFill.style.width =
    ((currentQuestion + 1) / TOTAL_QUESTIONS * 100) + "%";

  feedback.textContent = "";
  feedback.className = "feedback";

  optionsContainer.innerHTML = "";

  const options = createOptions(fruit);

  options.forEach(option => {

    const button = document.createElement("button");

    button.className = "option-button";
    button.textContent = option.name;

    button.addEventListener("click", () => {
      checkAnswer(button, option);
    });

    optionsContainer.appendChild(button);

  });
}


/* -----------------------------
   CREATE OPTIONS
----------------------------- */

function createOptions(correctFruit) {

  const otherFruits = fruits
    .filter(fruit => fruit.name !== correctFruit.name);

  const shuffledOthers = shuffle(otherFruits);

  const options = [
    correctFruit,
    shuffledOthers[0],
    shuffledOthers[1]
  ];

  return shuffle(options);
}


/* -----------------------------
   CHECK ANSWER
----------------------------- */

function checkAnswer(button, selectedFruit) {

  if (answered) return;

  answered = true;

  const correctFruit = questions[currentQuestion];

  const allButtons =
    optionsContainer.querySelectorAll(".option-button");

  allButtons.forEach(btn => {
    btn.disabled = true;
  });

  if (selectedFruit.name === correctFruit.name) {

    button.classList.add("correct");

    feedback.textContent = "🎉 Correct! Great job!";
    feedback.classList.add("correct");

    score++;
    gameStars++;

    updateStars();

  } else {

    button.classList.add("wrong");

    feedback.textContent =
      "😊 Nice try! The answer is " + correctFruit.name + ".";

    feedback.classList.add("wrong");

    allButtons.forEach(btn => {

      if (btn.textContent === correctFruit.name) {
        btn.classList.add("correct");
      }

    });

  }

  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion < TOTAL_QUESTIONS) {
      showQuestion();
    } else {
      showResult();
    }

  }, 1400);
}


/* -----------------------------
   LISTEN
----------------------------- */

listenButton.addEventListener("click", listenQuestion);

function listenQuestion() {

  if (!("speechSynthesis" in window)) {
    return;
  }

  const fruit = questions[currentQuestion];

  const text =
    "Which fruit is this? " +
    fruit.name;

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 0.8;
  speech.pitch = 1.1;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}


/* -----------------------------
   RESULT
----------------------------- */

function showResult() {

  gameScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  finalScore.textContent = score;
  earnedStars.textContent = gameStars;

  if (score === 10) {

    resultMessage.textContent =
      "🏆 Perfect! You are a Fruit Superstar!";

  } else if (score >= 8) {

    resultMessage.textContent =
      "🌟 Wonderful! You know your fruits very well!";

  } else if (score >= 5) {

    resultMessage.textContent =
      "👏 Good job! Keep practicing your fruits!";

  } else {

    resultMessage.textContent =
      "💪 Nice try! Let's practice some more fruits!";

  }

  addGlobalStars(gameStars);
}


/* -----------------------------
   GLOBAL STARS
----------------------------- */

function updateStars() {

  starCount.textContent = gameStars;
}

function addGlobalStars(amount) {

  const currentStars =
    Number(localStorage.getItem("littleLearnerStars")) || 0;

  localStorage.setItem(
    "littleLearnerStars",
    currentStars + amount
  );
}


/* -----------------------------
   SHUFFLE
----------------------------- */

function shuffle(array) {

  for (let i = array.length - 1; i > 0; i--) {

    const j =
      Math.floor(Math.random() * (i + 1));

    [array[i], array[j]] =
      [array[j], array[i]];
  }

  return array;
}


