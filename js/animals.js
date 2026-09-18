const animals = [
  {
    name: "Dog",
    emoji: "🐶",
    sound: "Woof!",
    sentence: "A dog is a friendly animal."
  },
  {
    name: "Cat",
    emoji: "🐱",
    sound: "Meow!",
    sentence: "A cat likes to play."
  },
  {
    name: "Lion",
    emoji: "🦁",
    sound: "Roar!",
    sentence: "A lion is a wild animal."
  },
  {
    name: "Elephant",
    emoji: "🐘",
    sound: "Trumpet!",
    sentence: "An elephant is very big."
  },
  {
    name: "Tiger",
    emoji: "🐯",
    sound: "Roar!",
    sentence: "A tiger has stripes."
  },
  {
    name: "Monkey",
    emoji: "🐒",
    sound: "Ooh-ooh!",
    sentence: "A monkey can climb trees."
  },
  {
    name: "Rabbit",
    emoji: "🐰",
    sound: "Squeak!",
    sentence: "A rabbit has long ears."
  },
  {
    name: "Panda",
    emoji: "🐼",
    sound: "Grunt!",
    sentence: "A panda likes bamboo."
  },
  {
    name: "Bear",
    emoji: "🐻",
    sound: "Growl!",
    sentence: "A bear lives in the wild."
  },
  {
    name: "Giraffe",
    emoji: "🦒",
    sound: "Hum!",
    sentence: "A giraffe has a long neck."
  }
];

let currentAnimal = 0;

function loadAnimal() {

  const animal = animals[currentAnimal];

  document.getElementById("animalPicture").textContent = animal.emoji;
  document.getElementById("animalName").textContent = animal.name.toUpperCase();

  document.getElementById("animalSound").textContent =
    animal.sound + " " + animal.emoji;

  document.getElementById("animalSentence").textContent =
    animal.sentence;

  document.getElementById("currentNumber").textContent =
    currentAnimal + 1;

  const progress =
    ((currentAnimal + 1) / animals.length) * 100;

  document.getElementById("progressFill").style.width =
    progress + "%";

  document.getElementById("previousButton").disabled =
    currentAnimal === 0;

  document.getElementById("nextButton").disabled =
    currentAnimal === animals.length - 1;

  updateSelector();

  if (currentAnimal === animals.length - 1) {
    checkCompletion();
  }
}

function updateSelector() {

  const selector =
    document.getElementById("animalSelector");

  selector.innerHTML = "";

  animals.forEach((animal, index) => {

    const button = document.createElement("button");

    button.textContent = animal.emoji;

    if (index === currentAnimal) {
      button.classList.add("active");
    }

    button.onclick = function () {
      currentAnimal = index;
      loadAnimal();
    };

    selector.appendChild(button);
  });
}

function nextAnimal() {

  if (currentAnimal < animals.length - 1) {
    currentAnimal++;
    loadAnimal();
  }
}

function previousAnimal() {

  if (currentAnimal > 0) {
    currentAnimal--;
    loadAnimal();
  }
}

function listenAnimal() {

  const animal = animals[currentAnimal];

  const text =
    animal.name + ". " +
    animal.sound + ". " +
    animal.sentence;

  speak(text);
}

function playAnimalSound() {

  const animal = animals[currentAnimal];

  speak(animal.sound);
}

function speak(text) {

  if (!("speechSynthesis" in window)) {
    alert("Sorry! Your browser does not support voice.");
    return;
  }

  speechSynthesis.cancel();

  const speech =
    new SpeechSynthesisUtterance(text);

  speech.lang = "en-US";
  speech.rate = 0.75;
  speech.pitch = 1.2;

  speechSynthesis.speak(speech);
}

function checkCompletion() {

  const key = "littleLearnerAnimalsCompleted";

  if (localStorage.getItem(key) === "true") {
    document.getElementById("completionMessage").style.display =
      "block";
    return;
  }

  localStorage.setItem(key, "true");

  let stars =
    Number(localStorage.getItem("littleLearnerStars")) || 0;

  stars += 5;

  localStorage.setItem(
    "littleLearnerStars",
    stars
  );

  document.getElementById("starCount").textContent =
    stars;

  document.getElementById("completionMessage").style.display =
    "block";
}

function loadStars() {

  const stars =
    Number(localStorage.getItem("littleLearnerStars")) || 0;

  document.getElementById("starCount").textContent =
    stars;
}

loadStars();
loadAnimal();
