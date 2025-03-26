
const cardData = [
  { value: "2015", image: "images/image1.jpg" },
  { value: "2016", image: "images/image2.jpg" },
  { value: "2017", image: "images/image3.jpg" },
  { value: "2018", image: "images/image4.jpg" },
  { value: "2019", image: "images/image5.jpg" },
  { value: "2020", image: "images/image6.jpg" },
  { value: "2021", image: "images/image7.jpg" },
  { value: "2022", image: "images/image8.jpg" },
  { value: "2023", image: "images/image9.jpg" },
  { value: "2024", image: "images/image10.jpg" }
];

let gameCards = [];
let flippedCards = [];
let matchedCards = [];
let attempts = 0;
let startTime;
let timerInterval;

const gameBoard = document.getElementById("gameBoard");
const timerElement = document.getElementById("timer");
const attemptsElement = document.getElementById("attempts");
const restartBtn = document.getElementById("restartBtn");

function shuffleCards(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function updateTimer() {
  const seconds = Math.floor((Date.now() - startTime) / 1000);
  timerElement.textContent = `⏱ Temps : ${seconds}s`;
}

function startTimer() {
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}

function resetBoard() {
  gameBoard.innerHTML = "";
  flippedCards = [];
  matchedCards = [];
  attempts = 0;
  attemptsElement.textContent = "💥 Essais : 0";
  timerElement.textContent = "⏱ Temps : 0s";
}

function createBoard() {
  resetBoard();
  gameCards = [...cardData, ...cardData];
  shuffleCards(gameCards);
  startTimer();

  gameCards.forEach((card, index) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.index = index;

    const cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");

    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.style.backgroundImage = `url(${card.image})`;
    cardBack.innerHTML = `<p>${card.value}</p>`;

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    cardElement.appendChild(cardInner);
    gameBoard.appendChild(cardElement);

    cardElement.addEventListener("click", () => flipCard(index));
  });
}

function flipCard(index) {
  const cardElement = document.querySelector(`[data-index="${index}"]`);
  if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
    cardElement.classList.add("flipped");
    flippedCards.push(index);

    if (flippedCards.length === 2) {
      attempts++;
      attemptsElement.textContent = `💥 Essais : ${attempts}`;
      setTimeout(checkMatch, 1000); // délai plus long
    }
  }
}

function checkMatch() {
  const card1Index = flippedCards[0];
  const card2Index = flippedCards[1];
  const card1 = gameCards[card1Index];
  const card2 = gameCards[card2Index];

  const card1Element = document.querySelector(`[data-index="${card1Index}"]`);
  const card2Element = document.querySelector(`[data-index="${card2Index}"]`);

  if (card1.value === card2.value) {
    matchedCards.push(card1Index, card2Index);
    if (matchedCards.length === gameCards.length) {
      clearInterval(timerInterval);
      setTimeout(() => {
        alert(`🎉 Bravo ! Tu as trouvé toutes les paires en ${attempts} essais et ${Math.floor((Date.now() - startTime) / 1000)} secondes.`);
      }, 300);
    }
  } else {
    card1Element.classList.remove("flipped");
    card2Element.classList.remove("flipped");
  }

  flippedCards = [];
}

restartBtn.addEventListener("click", createBoard);

createBoard();
