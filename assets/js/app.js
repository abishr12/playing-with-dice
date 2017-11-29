/*
  GAME RULES:

  - The game has 2 players, playing in rounds
  - In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
  - BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
  - The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
  - The first player to reach 100 points on GLOBAL score wins the game

  */
var scores,
  roundScore,
  activePlayer,
  gamePlaying,
  rolls,
  firstRoll,
  secondRoll,
  total,
  finalScore;

init();
rolls = [];
finalScore = 0;

document.querySelector("#score-0").style.color = "blue";

document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    //1. Random Number
    var diceOne = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;

    // //First Roll & Second Roll
    rolls.push(diceOne);
    // console.log(rolls);
    firstRoll = rolls[rolls.length - 2];
    secondRoll = rolls[rolls.length - 1];
    var total = firstRoll + secondRoll;
    //console.log(rolls, total);

    //2. Display the result
    var diceDomOne = document.querySelector("#diceOne");
    var diceDomTwo = document.querySelector("#diceTwo");

    diceDomOne.style.display = "block";
    diceDomOne.src = "./assets/images/dice-" + diceOne + ".png";
    diceDomTwo.style.display = "block";
    diceDomTwo.src = "./assets/images/dice-" + diceTwo + ".png";

    //3. Update round score (unless dice === 1) or two rolls of a 6 (total would equal 12 due to 6 + 6)

    if (diceOne === 1 || total === 12) {
      nextPlayer();
    } else {
      roundScore += diceOne + diceTwo;

      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 100) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      //document.getElementsByClassName("dice").style.display = "none";
      document.getElementById("diceOne").style.display = "none";
      document.getElementById("diceTwo").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");

      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");

      gamePlaying = false;
    } else {
      // Next player
      nextPlayer();
    }
  }
});

// Start a New Game
document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  //Next player
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //document.querySelector(".player-0-panel").classList.remove("active");
  //document.querySelector(".player-1-panel").classList.add("active");
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  //document.getElementsByClassName("dice").style.display = "none";
  document.getElementById("diceOne").style.display = "none";
  document.getElementById("diceTwo").style.display = "none";
}

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  //document.getElementsByClassName("dice").style.display = "none";
  document.getElementById("diceOne").style.display = "none";
  document.getElementById("diceTwo").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}
