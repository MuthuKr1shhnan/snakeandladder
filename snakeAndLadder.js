let player1Position = 0;
let player2Position = 0;
let diceCount1 = 0;
let diceCount2 = 0;
let playerOption = ["noPlay", "laddar", "snack"];
const winningPoint = 100;

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function getOption() {
  return Math.floor(Math.random() * 3);
}

while (player1Position < winningPoint && player2Position < winningPoint) {
  let diceValue;
  let option;
  //playerOne
  function playerOne() {
    option = playerOption[getOption()];
    switch (option) {
      case "noPlay":
        console.log("\n---PlayerOne previousPosition=", player1Position);
        console.log("playerOption =", option);
        console.log("player1CurrentPosition =", player1Position);
        diceCount1++;

        break;
      case "laddar":
        diceValue = rollDice();
        console.log("\n---PlayerOne previousPosition=", player1Position);
        if (
          player1Position + diceValue < 100 ||
          player1Position + diceValue === 100
        ) {
          player1Position += diceValue;
        }

        diceCount1++;
        console.log("playerOption =", option);
        console.log("player1DiceValue =", diceValue);
        console.log("player1CurrentPosition =", player1Position);
        playerOne();
        break;
      case "snack":
        diceValue = rollDice();
        console.log("\n--PlayerOne previousPosition=", player1Position);
        if (
          player1Position - diceValue > 0 ||
          player1Position - diceValue === 0
        ) {
          player1Position -= diceValue;
        }
        diceCount1++;
        console.log("playerOption =", option);
        console.log("player1DiceValue =", diceValue);
        console.log("player1CurrentPosition =", player1Position);

        break;
    }
  }

  //playerTwo
  function playerTwo() {
    option = playerOption[getOption()];
    switch (option) {
      case "noPlay":
        console.log("\n---PlayerTwo previousPosition=", player2Position);
        console.log("playerOption =", option);
        console.log("player2CurrentPosition =", player2Position);
        diceCount2++;

        break;
      case "laddar":
        diceValue = rollDice();
        console.log("\n---PlayerTwo previousPosition=", player2Position);
        if (
          player2Position + diceValue < 100 ||
          player2Position + diceValue === 100
        ) {
          player2Position += diceValue;
        }

        diceCount2++;
        console.log("playerOption =", option);
        console.log("player2DiceValue =", diceValue);
        console.log("player2CurrentPosition =", player2Position);
        playerTwo();
        break;
      case "snack":
        diceValue = rollDice();
        console.log("\n---PlayerTwo previousPosition=", player2Position);
        if (
          player2Position - diceValue > 0 ||
          player2Position - diceValue === 0
        ) {
          player2Position -= diceValue;
        }
        diceCount2++;
        console.log("playerOption =", option);
        console.log("player2DiceValue =", diceValue);
        console.log("player2CurrentPosition =", player2Position);

        break;
    }
  }

  playerOne();

  playerTwo();
  if (player1Position === winningPoint) {
    console.log("\n----- PLAYER ONE WON THE GAME -----");
  }
  if (player2Position === winningPoint) {
    console.log("\n----- PLAYER TWO WON THE GAME -----");
  }
}

console.log("\n---Final Report----");
console.log("Player 1 total dice rolls:", diceCount1);
console.log("Player 2 total dice rolls:", diceCount2);
 