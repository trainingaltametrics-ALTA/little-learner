const fruits = [
  {
    name: "Apple",
    emoji: "🍎",
    color: "Red ❤️",
    sentence: "An apple can be red and crunchy."
  },

  {
    name: "Banana",
    emoji: "🍌",
    color: "Yellow 💛",
    sentence: "A banana is yellow and soft."
  },

  {
    name: "Orange",
    emoji: "🍊",
    color: "Orange 🧡",
    sentence: "An orange is juicy and orange."
  },

  {
    name: "Strawberry",
    emoji: "🍓",
    color: "Red ❤️",
    sentence: "A strawberry is a small red fruit."
  },

  {
    name: "Grapes",
    emoji: "🍇",
    color: "Purple 💜",
    sentence: "Grapes can be purple or green."
  },

  {
    name: "Watermelon",
    emoji: "🍉",
    color: "Green and Red 💚❤️",
    sentence: "A watermelon is big and juicy."
  },

  {
    name: "Mango",
    emoji: "🥭",
    color: "Yellow and Orange 💛🧡",
    sentence: "A mango is a sweet summer fruit."
  },

  {
    name: "Pineapple",
    emoji: "🍍",
    color: "Yellow 💛",
    sentence: "A pineapple has a rough skin."
  },

  {
    name: "Peach",
    emoji: "🍑",
    color: "Peach 🧡",
    sentence: "A peach is soft and juicy."
  },

  {
    name: "Cherry",
    emoji: "🍒",
    color: "Red ❤️",
    sentence: "Cherries are small red fruits."
  }
];


let currentFruit = 0;


function loadFruit() {

  const fruit =
    fruits[currentFruit];


  document.getElementById(
    "fruitPicture"
  ).textContent =
    fruit.emoji;


  document.getElementById(
    "fruitName"
  ).textContent =
    fruit.name.toUpperCase();


  document.getElementById(
    "fruitColor"
  ).textContent =
    fruit.color;


  document.getElementById(
    "fruitSentence"
  ).textContent =
    fruit.sentence;


  document.getElementById(
    "currentNumber"
  ).textContent =
    currentFruit + 1;


  const progress =
    ((currentFruit + 1) /
      fruits.length) * 100;


  document.getElementById(
    "progressFill"
  ).style.width =
    progress + "%";


  document.getElementById(
    "previousButton"
  ).disabled =
    currentFruit === 0;


  document.getElementById(
    "nextButton"
  ).disabled =
    currentFruit ===
    fruits.length - 1;


  updateSelector();


  if (
    currentFruit ===
    fruits.length - 1
  ) {

    checkCompletion();

  }
}


function updateSelector() {

  const selector =
    document.getElementById(
      "fruitSelector"
    );

  selector.innerHTML = "";


  fruits.forEach(
    function(fruit, index) {

      const button =
        document.createElement(
          "button"
        );

      button.textContent =
        fruit.emoji;


      if (
        index === currentFruit
      ) {

        button.classList.add(
          "active"
        );

      }


      button.addEventListener(
        "click",
        function() {

          currentFruit =
            index;

          loadFruit();

        }
      );


      selector.appendChild(button);

    }
  );
}


function nextFruit() {

  if (
    currentFruit <
    fruits.length - 1
  ) {

    currentFruit++;

    loadFruit();

  }
}


function previousFruit() {

  if (
    currentFruit > 0
  ) {

    currentFruit--;

    loadFruit();

  }
}


function listenFruit() {

  const fruit =
    fruits[currentFruit];


  speak(
    fruit.name +
    ". " +
    fruit.color +
    ". " +
    fruit.sentence
  );
}


function speak(text) {

  if (
    !("speechSynthesis" in window)
  ) {

    return;

  }


  speechSynthesis.cancel();


  const speech =
    new SpeechSynthesisUtterance(
      text
    );


  speech.lang = "en-US";

  speech.rate = 0.75;

  speech.pitch = 1.15;


  speechSynthesis.speak(
    speech
  );
}


function checkCompletion() {

  const key =
    "littleLearnerFruitsCompleted";


  if (
    localStorage.getItem(key) ===
    "true"
  ) {

    document.getElementById(
      "completionMessage"
    ).style.display =
      "block";

    return;

  }


  localStorage.setItem(
    key,
    "true"
  );


  let stars =
    Number(
      localStorage.getItem(
        "littleLearnerStars"
      )
    ) || 0;


  stars += 5;


  localStorage.setItem(
    "littleLearnerStars",
    stars
  );


  document.getElementById(
    "starCount"
  ).textContent =
    stars;


  document.getElementById(
    "completionMessage"
  ).style.display =
    "block";
}


function loadStars() {

  const stars =
    Number(
      localStorage.getItem(
        "littleLearnerStars"
      )
    ) || 0;


  document.getElementById(
    "starCount"
  ).textContent =
    stars;
}


document.addEventListener(
  "DOMContentLoaded",
  function() {

    loadStars();

    loadFruit();


    document.getElementById(
      "previousButton"
    ).addEventListener(
      "click",
      previousFruit
    );


    document.getElementById(
      "nextButton"
    ).addEventListener(
      "click",
      nextFruit
    );


    document.getElementById(
      "listenButton"
    ).addEventListener(
      "click",
      listenFruit
    );

  }
);
