//Pig Game

var scores,
    roundScore,
    activePlayer,
    finalScore,
    lastRolledDice1,
    lastRolledDice2,
    dice1,
    dice2,
    msgInfo,
    gamePlay;

init();

/*
//the event listener will call the function therefore no use of parenthesis after the function name
//this is called 'callback function'
//a function called by another function
//eventListener function will call btn function
document.querySelector(".btn-roll").addEventListener("click", btn);
*/

//this is an example of an anonymous function
//a function that doesn't have a name and can only be used once.
//can only be called at the moment that function has been declared and defined 
//cannot be used outside
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlay) {
    //dice random number
    //this variable is only available within this anymous function 'scope'
    dice1 = Math.floor(Math.random()*6) + 1;
    dice2 = Math.floor(Math.random()*6) + 1;
    /*
    //display the result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    */
    
    //display the dice
    resetDice("block");
    //rolling of the dice
    var dice1DOM = document.getElementById("dice-1");
    var dice2DOM = document.getElementById("dice-2");
    dice1DOM.src = "dice-" + dice1 + ".png";
    dice2DOM.src = "dice-" + dice2 + ".png";
    
    /*YOUR 3 CHALLENGES: 1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)*/
    if ((dice1 === 6 && lastRolledDice1 === 6) || (dice2 === 6 && lastRolledDice2 === 6) || (dice1 === 6 && lastRolledDice2 === 6) || (dice2 === 6 && lastRolledDice1 === 6)) {
      scores[activePlayer] = 0;
      msgInfo = "You have rolled a two 6 in a row";
      showMsg(msgInfo);
      resetLastRoll();
      document.querySelector("#score-" + activePlayer).textContent = 0;
      
      nextPlayer();
    } else {
      snakeEyes();
      lastRolledDice1 = dice1;
      lastRolledDice2 = dice2;
    } 
  }
});

//add button hold functionality
document.querySelector(".btn-hold").addEventListener("click", function() {
  if (gamePlay) {
    //set finalscore for the game
    var fscore = document.querySelector(".final-score").value;
    if (!fscore) {
      fscore = finalScore;
    } 
    //add current score to global score
    scores[activePlayer] += roundScore;
    //then update UI
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];
    //console.log(typeof(scores[activePlayer]));
    //check if player won the game
    if (scores[activePlayer] >= fscore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      resetDice("none");
      gamePlay = false;
    } else {
      nextPlayer(); 
    }
    resetLastRoll();
  }
});

document.querySelector(".btn-new").addEventListener("click", init);

function nextPlayer() {
  //turn toggle player operation
    activePlayer = activePlayer === 0 ? 1 : 0;
    roundScore = 0;
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
    //reset players current scores in the DOM
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;
    //make visible who is the active player
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    document.querySelector("#msg-" + activePlayer).textContent = "";
    // document.querySelector(".dice").style.display = "none";
    //setTimeout(resetDice("none"), 2000);
}

function init() {
  scores =[0,0];
  roundScore = 0;
  activePlayer = 0;
  resetLastRoll();
  finalScore = 100;
  gamePlay = true;
  resetDice("none");
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.getElementById("msg-0").textContent = "";
  document.getElementById("msg-1").textContent = "";
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

function resetDice(p) {
  //reset dice on the DOM
  var diceList = document.querySelectorAll(".dice");
  var diceArray = [...diceList]; 
  diceArray.forEach(dice => {
    dice.style.display = p;
  });
}

function snakeEyes() {
  // update the round score if the dice rolled is not 1
  // strict type 
  // != is non strict type, type coersions
  if (dice1 !== 1 && dice2 !== 1) {
      roundScore += dice1 + dice2;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
      msgInfo = "You have rolled a One!";
      showMsg(msgInfo);
      nextPlayer();
      resetLastRoll();
  }
}

function resetLastRoll() {
  lastRolledDice1 = 0;
  lastRolledDice2 = 0;
}

function showMsg(msg) {
  document.getElementById("msg-" + activePlayer).innerHTML = msg;
}

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
