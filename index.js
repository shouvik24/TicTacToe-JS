const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to initialise the game
function initGame() {
  currentPlayer = "X";
  gameGrid = ["", "", "", "", "", "", "", "", ""];
  //UI empty
  boxes.forEach((box, index) => {
    box.innerText = "";
    boxes[index].style.pointerEvents = "all";
    //remove green color from UI - initialise box with CSS properties again
    box.classList = `box box${index + 1}`;
  });
  newGameBtn.classList.remove("active");
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function checkGameOver() {
  let answer = "";

  winningPositions.forEach((position) => {
    //3 boxes should be non-empty and exactly same value
    if (
      (gameGrid[position[0]] !== "" ||
        gameGrid[position[1]] !== "" ||
        gameGrid[position[2]] !== "") &&
      gameGrid[position[0]] === gameGrid[position[1]] &&
      gameGrid[position[1]] === gameGrid[position[2]]
    ) {
      //check if winner is X
      if (gameGrid[position[0]] === "X") answer = "X";
      else answer = "O";

      //disable pointer events - to avoid multiple winners or further play after a winner
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });
      // X or O winner - adding win class that will show green color
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
    // console.log(answer);
  });

  //New Game Button - if we have a winner
  if (answer != "") {
    gameInfo.innerText = `Winner is Player - ${answer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //when there is no winner - game tied
  let fillCount = 0;
  gameGrid.forEach((box) => {
    if (box != "") fillCount++;
  });

  //board is filled -game tied
  if (fillCount === 9) {
    gameInfo.innerText = "The Game is Tied !!";
    newGameBtn.classList.add("active");
  }
}
function swapTurn() {
  if (currentPlayer === "X") {
    currentPlayer = "O";
  } else {
    currentPlayer = "X";
  }
  //UI update
  gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
  if (gameGrid[index] === "") {
    //boxes-UI // gameGrid - inner logic
    boxes[index].innerHTML = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    //swap turn
    swapTurn();
    //check if anyone won
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleClick(index);
  });
});

newGameBtn.addEventListener("click", initGame);
