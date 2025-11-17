import readline from "readline";
let playerOption = ["noPlay", "laddar", "snack"];
let totalPlayers = 0;
let players = [];
const winningPoint = 100;

//============= Logic for getting input from terminal
let input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
//============= logic for asking question about number of player
function askQuestion() {
  input.question("Enter the total number of Players: ", (num) => {
    totalPlayers = Number(num);
    if (!isNaN(totalPlayers) && totalPlayers > 0) {
      console.log(totalPlayers);
      askName(1);
    } else {
      askQuestion();
    }
  });
}

askQuestion();
//============== asking question from ask name of player
function askName(n) {
  input.question("Enter the name of the Player: ", (name) => {
    players.push({
      name,
      diceCount: 0,
      started: false,
      position: 0,
    });

    if (n === totalPlayers) {
      console.log(players);
      return startGame();
      input.close();
    } else {
      askName(n + 1);
    }
  });
}

function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function getOption() {
  return Math.floor(Math.random() * 3);
}

// ======== The main game logic for giving turns to players
function playerTurn(player) {
  console.log(`\n--- ${player.name}'s turn ---`);
  console.log(`Previous position: ${player.position}`);

  let dice = rollDice();
  let option = playerOption[getOption()];

  console.log(`Dice rolled: ${dice}`);
  console.log(`Option: ${option}`);

  player.diceCount++;

  // starting logic
  if (!player.started) {
    if (dice === 1) {
      player.started = true;
      player.position = 1;
      console.log("Player started!");
    } else {
      console.log("Player has not started yet. Need 1 to start.");
    }
    return false;
  }

  // logic for options
  if (option === "noPlay") {
    console.log("No movement this turn.");
  }

  if (option === "laddar") {
    if (player.position + dice <= winningPoint) {
      player.position += dice;
    }
    console.log("Player gets extra turn");
    console.log(`Current position: ${player.position}`);
    return true;
  }

  if (option === "snack") {
    if (player.position - dice >= 0) {
      player.position -= dice;
    }
    console.log("Snake bite!");
  }

  console.log(`Current position: ${player.position}`);
  return false;
}

// ======== logic for starting the game
function startGame() {
  console.log("\n--- Game Started ---");

  let index = 0;

  function nextTurn() {
    let player = players[index];
    let extraTurn = playerTurn(player);

   
    if (player.position === winningPoint) {
      console.log(`\n${player.name} WINS THE GAME!`);
      console.log("\n--- Final Report ---");

      players.forEach((p) => {
        console.log(`${p.name} rolled the dice ${p.diceCount} times`);
      });
      input.close()
      
      return;
    }

 
    if (!extraTurn) {
      if (index < players.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }

    nextTurn()
  }

  nextTurn();
}
