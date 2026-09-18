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

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


/* START GAME */

function startGame() {

  questions = [...fruits];

  questions.sort(function() {
    return Math.random() - 0.5;
  });

  currentQuestion = 0;
  score = 0;
  answered = false;

  document.getElementById("startScreen")
    .classList.add("hidden");

  document.getElementById("resultScreen")
    .classList.add("hidden");

  document.getElementById("gameScreen")
    .classList.remove("hidden");

  document.getElementById("score")
    .textContent = "0";

  showQuestion();
}


/* SHOW QUESTION */

function showQuestion() {

  answered = false;

  const fruit =
    questions[currentQuestion];

  document.getElementById("questionNumber")
    .textContent = currentQuestion + 1;

  document.getElementById("fruitPicture")
    .textContent = fruit.emoji;

  document.getElementById("questionText")
    .textContent = "Which fruit is this?";

  document.getElementById("feedback")
    .textContent = "";

  document.getElementById("feedback")
    .className = "feedback";

  document.getElementById("score")
    .textContent = score;

  document.getElementById("gameProgress")
    .style.width =
    ((currentQuestion + 1) / 10 * 100) + "%";

  createOptions(fruit);
}


/* CREATE OPTIONS */

function createOptions(correctFruit) {

  let wrongFruits =
    fruits.filter(function(fruit) {

      return fruit.name !==
        correctFruit.name;

    });

  wrongFruits.sort(function() {
    return Math.random() - 0.5;
  });

  let options = [
    correctFruit,
    wrongFruits[0],
    wrongFruits[1]
  ];

  options.sort(function() {
    return Math.random() - 0.5;
  });

  const container =
    document.getElementById("options");

  container.innerHTML = "";

  options.forEach(function(fruit) {

    const button =
      document.createElement("button");

    button.className =
      "option-button";

    button.textContent =
      fruit.emoji + " " + fruit.name;

    button.addEventListener(
      "click",
      function() {

        checkAnswer(
          fruit.name,
          correctFruit.name,
          button
        );

      }
    );

    container.appendChild(button);
  });
}


/* CHECK ANSWER */

function checkAnswer(
  selected,
  correct,
  selectedButton
) {

  if (answered) {
    return;
  }

  answered = true;

  const buttons =
    document.querySelectorAll(
      ".option-button"
    );

  buttons.forEach(function(button) {
    button.disabled = true;
  });


  const feedback =
    document.getElementById("feedback");


  if (selected === correct) {

    score++;

    selectedButton.classList.add(
      "correct"
    );

    addStar();

    feedback.textContent =
      "🎉 Correct! Great job! ⭐";

    feedback.className =
      "feedback correct";

  } else {

    selectedButton.classList.add(
      "wrong"
    );

    buttons.forEach(function(button) {

      if (
        button.textContent.includes(correct)
      ) {

        button.classList.add("correct");

      }

    });

    feedback.textContent =
      "😊 Nice try! The answer is " +
      correct + ".";

    feedback.className =
      "feedback wrong";
  }


  document.getElementById("score")
    .textContent = score;


  setTimeout(function() {

    currentQuestion++;

    if (
      currentQuestion <
      questions.length
    ) {

      showQuestion();

    } else {

      showResult();

    }

  }, 1200);
}


/* LISTEN */

function listenQuestion() {

  if (
    !questions.length ||
    !window.speechSynthesis
  ) {
    return;
  }

  const fruit =
    questions[currentQuestion];

  const speech =
    new SpeechSynthesisUtterance(
      "Which fruit is this? " +
      fruit.name + ". " +
      "This is a " + fruit.color + " fruit."
    );

  speech.lang = "en-US";
  speech.rate = 0.75;
  speech.pitch = 1.2;

  speechSynthesis.cancel();

  speechSynthesis.speak(speech);
}


/* STARS */

function addStar() {

  let stars =
    Number(
      localStorage.getItem(
        "littleLearnerStars"
      )
    ) || 0;

  stars++;

  localStorage.setItem(
    "littleLearnerStars",
    stars
  );

  document.getElementById("starCount")
    .textContent = stars;
}


function loadStars() {

  let stars =
    Number(
      localStorage.getItem(
        "littleLearnerStars"
      )
    ) || 0;

  document.getElementById("starCount")
    .textContent = stars;
}


/* RESULT */

function showResult() {

  document.getElementById("gameScreen")
    .classList.add("hidden");

  document.getElementById("resultScreen")
    .classList.remove("hidden");

  document.getElementById("finalScore")
    .textContent = score;

  document.getElementById("earnedStars")
    .textContent = score;


  let message = "";

  if (score === 10) {

    message =
      "🏆 Perfect! You are a Fruit Superstar!";

  } else if (score >= 8) {

    message =
      "🌟 Wonderful! You know your fruits very well!";

  } else if (score >= 5) {

    message =
      "👏 Good job! Keep practicing your fruits!";

  } else {

    message =
      "💪 Nice try! Let's learn some more fruits!";

  }

  document.getElementById("resultMessage")
    .textContent = message;

  loadStars();
}


/* BUTTON EVENTS */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadStars();

    document.getElementById(
      "startButton"
    ).addEventListener(
      "click",
      startGame
    );


    document.getElementById(
      "listenButton"
    ).addEventListener(
      "click",
      listenQuestion
    );


    document.getElementById(
      "playAgainButton"
    ).addEventListener(
      "click",
      startGame
    );

  }
);
