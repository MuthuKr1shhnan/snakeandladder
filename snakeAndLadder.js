import readline from "readline";
let playerOption = [
  "noPlay",
  //SNAKE
  [
    { head: 97, tail: 78 },
    { head: 86, tail: 64 },
    { head: 92, tail: 71 },
    { head: 67, tail: 54 },
    { head: 46, tail: 25 },
    { head: 38, tail: 19 },
  ],
  //LADDER
  [
    { start: 62, end: 80 },
    { start: 44, end: 77 },
    { start: 63, end: 84 },
    { start: 54, end: 75 },
    { start: 26, end: 47 },
    { start: 16, end: 38 },
  ],
];
let totalPlayers = 0;
let players = [];
const winningPoint = 100;
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

function getOptionFornoPlay() {
  return Math.floor(Math.random() * 3);
}

//==============================================

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
      return startGame(); // here we call startGame function
    } else {
      askName(n + 1);
    }
  });
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

      players.map((p) => {
        console.log(`${p.name} rolled the dice ${p.diceCount} times`);
      });
      input.close();
      return;
    }

    if (!extraTurn) {
      if (index < players.length - 1) {
        index++;
      } else {
        index = 0;
      }
    }

    nextTurn();
  }

  nextTurn();
}

// ======== The main game logic for giving turns to players
function playerTurn(player) {
  console.log(`\n--- ${player.name}'s turn ---`);
  console.log(`Previous position: ${player.position}`);

  let dice = rollDice();
  let option = playerOption[getOptionFornoPlay()];

  console.log(`Dice rolled: ${dice}`);

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
  player.position += dice;
  // logic for options
  if (option === "noPlay") {
    console.log("No movement this turn.");
  }
  //LADDER
  for (let ladder of playerOption[2]) {
    if (Number(ladder.start) === player.position) {
      player.position = ladder.end;
      player.diceCount++;

      console.log("Ladder!");
      console.log("Player gets extra turn");
      console.log(`Current position: ${player.position}`);
      return true;
    }
  }
  //SNAKE
  for (let snake of playerOption[1]) {
    if (Number(snake.head) === player.position) {
      player.position = snake.tail;
      player.diceCount++;
      console.log("Snake");
      console.log("Player Position goes back!!!");
      console.log(`Current position: ${player.position}`);
      return false;
    }
  }

  console.log(`Current position: ${player.position}`);
  return false;
}
