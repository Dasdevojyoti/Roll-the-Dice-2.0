"use strict";

/*******************************************Selecting Elements***********************************************/
//Selecting Players
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

//Selecting Scores
const score0 = document.getElementById("score--0");
const score1 = document.getElementById("score--1");

//Selecting Current Scores
const currentScore0 = document.getElementById("current--0");
const currentScore1 = document.getElementById("current--1");

//Selecting buttons
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");

//Selecting dice
const diceEl = document.querySelector(".dice");

//Declaring Variables
let scores, currentScore, activePlayer, playing, name0, name1;

/************************************Setting the Initial Conditions******************************************/
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add("hidden");
  score0.textContent = 0;
  score1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;

  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
}

init();

/****************************************Switching the Player*********************************************/
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
}

/*****************************************Rules and Regulations********************************************/
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

document.querySelector(".open-modal").addEventListener("click", function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
});
function closeModal() {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
}
document.querySelector(".close-modal").addEventListener("click", closeModal);

overlay.addEventListener("click", closeModal);

/*****************************************Taking Names from User********************************************/
document.querySelector(".naming").addEventListener("click", function () {
  name0 = prompt("Enter First Player Name: ");
  name1 = prompt("Enter Second Player Name: ");
  document.getElementById("name--0").textContent = name0;
  document.getElementById("name--1").textContent = name1;
});

/*******************************************Rolling the Dice**********************************************/
rollBtn.addEventListener("click", function () {
  if (playing) {
    //1.Generating a random Number for rolling the dice
    const dice = Math.floor(Math.random() * 6) + 1;
    const diceRoll = `./dice-${dice}.png`;

    //2.Displaying the Dice
    diceEl.classList.remove("hidden");
    // diceEl.src = `./dice-${dice}.png`;
    document.querySelector("img").setAttribute("src", diceRoll);

    //3. Checking for rolled 1
    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

/********************************************Holding the Score**********************************************/
holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});

/********************************************Resetting the Game**********************************************/
newBtn.addEventListener("click", init);
