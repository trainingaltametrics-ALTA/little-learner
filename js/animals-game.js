const animals = [
  {
    name: "Dog",
    emoji: "🐶",
    sound: "Woof!"
  },
  {
    name: "Cat",
    emoji: "🐱",
    sound: "Meow!"
  },
  {
    name: "Lion",
    emoji: "🦁",
    sound: "Roar!"
  },
  {
    name: "Elephant",
    emoji: "🐘",
    sound: "Trumpet!"
  },
  {
    name: "Tiger",
    emoji: "🐯",
    sound: "Roar!"
  },
  {
    name: "Monkey",
    emoji: "🐒",
    sound: "Ooh-ooh!"
  },
  {
    name: "Rabbit",
    emoji: "🐰",
    sound: "Squeak!"
  },
  {
    name: "Panda",
    emoji: "🐼",
    sound: "Grunt!"
  },
  {
    name: "Bear",
    emoji: "🐻",
    sound: "Growl!"
  },
  {
    name: "Giraffe",
    emoji: "🦒",
    sound: "Hum!"
  }
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;


/* START GAME */

function startGame() {

  questions = [...animals];

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

  const animal =
    questions[currentQuestion];

  document.getElementById("questionNumber")
    .textContent = currentQuestion + 1;

  document.getElementById("animalPicture")
    .textContent = animal.emoji;

  document.getElementById("questionText")
    .textContent = "Which animal is this?";

  document.getElementById("feedback")
    .textContent = "";

  document.getElementById("feedback")
    .className = "feedback";

  document.getElementById("score")
    .textContent = score;

  document.getElementById("gameProgress")
    .style.width =
    ((currentQuestion + 1) / 10 * 100) + "%";

  createOptions(animal);
}


/* CREATE OPTIONS */

function createOptions(correctAnimal) {

  let wrongAnimals =
    animals.filter(function(animal) {

      return animal.name !==
        correctAnimal.name;

    });

  wrongAnimals.sort(function() {
    return Math.random() - 0.5;
  });

  let options = [
    correctAnimal,
    wrongAnimals[0],
    wrongAnimals[1]
  ];

  options.sort(function() {
    return Math.random() - 0.5;
  });

  const container =
    document.getElementById("options");

  container.innerHTML = "";

  options.forEach(function(animal) {

    const button =
      document.createElement("button");

    button.className =
      "option-button";

    button.textContent =
      animal.emoji + " " + animal.name;

    button.addEventListener(
      "click",
      function() {

        checkAnswer(
          animal.name,
          correctAnimal.name,
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

  const animal =
    questions[currentQuestion];

  const speech =
    new SpeechSynthesisUtterance(
      "Which animal is this? " +
      animal.name + ". " +
      animal.sound
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
      "🏆 Perfect! You are an Animal Superstar!";

  } else if (score >= 8) {

    message =
      "🌟 Wonderful! You know your animals very well!";

  } else if (score >= 5) {

    message =
      "👏 Good job! Keep practicing your animals!";

  } else {

    message =
      "💪 Nice try! Let's learn some more animals!";

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
