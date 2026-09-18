const animals = [
  { name: "Dog", emoji: "🐶", sound: "Woof!" },
  { name: "Cat", emoji: "🐱", sound: "Meow!" },
  { name: "Lion", emoji: "🦁", sound: "Roar!" },
  { name: "Elephant", emoji: "🐘", sound: "Trumpet!" },
  { name: "Tiger", emoji: "🐯", sound: "Roar!" },
  { name: "Monkey", emoji: "🐒", sound: "Ooh-ooh!" },
  { name: "Rabbit", emoji: "🐰", sound: "Squeak!" },
  { name: "Panda", emoji: "🐼", sound: "Grunt!" },
  { name: "Bear", emoji: "🐻", sound: "Growl!" },
  { name: "Giraffe", emoji: "🦒", sound: "Hum!" }
];

let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

function startGame() {

  questions = [];

  let shuffled = [...animals];

  for (let i = shuffled.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  questions = shuffled;

  currentQuestion = 0;
  score = 0;
  answered = false;

  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("resultScreen").style.display = "none";

  document.getElementById("score").textContent = "0";

  loadStars();

  showQuestion();
}

function showQuestion() {

  answered = false;

  let animal = questions[currentQuestion];

  document.getElementById("questionNumber").textContent =
    currentQuestion + 1;

  document.getElementById("score").textContent =
    score;

  document.getElementById("animalPicture").textContent =
    animal.emoji;

  document.getElementById("questionText").textContent =
    "Which animal is this?";

  document.getElementById("feedback").textContent = "";

  document.getElementById("feedback").className =
    "feedback";

  let progress =
    ((currentQuestion + 1) / questions.length) * 100;

  document.getElementById("gameProgress").style.width =
    progress + "%";

  createOptions(animal);
}

function createOptions(correctAnimal) {

  let wrongAnimals =
    animals.filter(function(animal) {
      return animal.name !== correctAnimal.name;
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

  let container =
    document.getElementById("options");

  container.innerHTML = "";

  options.forEach(function(animal) {

    let button =
      document.createElement("button");

    button.className = "option-button";

    button.textContent =
      animal.emoji + " " + animal.name;

    button.onclick = function() {
      checkAnswer(
        animal.name,
        correctAnimal.name,
        button
      );
    };

    container.appendChild(button);
  });
}

function checkAnswer(selected, correct, selectedButton) {

  if (answered) {
    return;
  }

  answered = true;

  let buttons =
    document.querySelectorAll(".option-button");

  buttons.forEach(function(button) {
    button.disabled = true;
  });

  let feedback =
    document.getElementById("feedback");

  if (selected === correct) {

    score++;

    selectedButton.classList.add("correct");

    addStar();

    feedback.textContent =
      "🎉 Correct! Great job! ⭐";

    feedback.className =
      "feedback correct";

  } else {

    selectedButton.classList.add("wrong");

    buttons.forEach(function(button) {

      if (button.textContent.includes(correct)) {
        button.classList.add("correct");
      }

    });

    feedback.textContent =
      "😊 Nice try! The answer is " + correct + ".";

    feedback.className =
      "feedback wrong";
  }

  document.getElementById("score").textContent =
    score;

  setTimeout(function() {

    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResult();
    }

  }, 1400);
}

function listenQuestion() {

  if (questions.length === 0) {
    return;
  }

  let animal =
    questions[currentQuestion];

  speak(
    "Which animal is this? " +
    animal.name + ". " +
    animal.sound
  );
}

function speak(text) {

  if (!("speechSynthesis" in window)) {
    return;
  }

  speechSynthesis.cancel();

  let speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 0.75;
  speech.pitch = 1.2;

  speechSynthesis.speak(speech);
}

function addStar() {

  let stars =
    Number(localStorage.getItem("littleLearnerStars")) || 0;

  stars++;

  localStorage.setItem(
    "littleLearnerStars",
    stars
  );

  document.getElementById("starCount").textContent =
    stars;
}

function loadStars() {

  let stars =
    Number(localStorage.getItem("littleLearnerStars")) || 0;

  document.getElementById("starCount").textContent =
    stars;
}

function showResult() {

  document.getElementById("gameScreen").style.display =
    "none";

  document.getElementById("resultScreen").style.display =
    "block";

  document.getElementById("finalScore").textContent =
    score;

  document.getElementById("earnedStars").textContent =
    score;

  let message;

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

  document.getElementById("resultMessage").textContent =
    message;

  loadStars();
}

loadStars();
