const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    board.forEach((tic, index) => {
      boardHTML += `<div class="tic" id="${index}">${tic}</div>`;
    });
    document.querySelector(".gameDiv").innerHTML = boardHTML;
    const tics = document.querySelectorAll(".tic");
    tics.forEach((tic) => {
      tic.addEventListener("click", Game.handleClick);
    });
  };

  const update = (index, value) => {
    board[index] = value;
    render();
    console.log(value);
  };

  const getGameBoard = () => board;

  return {
    render,
    update,
    getGameBoard,
  };
})();

const createPlayer = (name, mark) => {
  return {
    name,
    mark,
  };
};

const Game = (() => {
  let players = [];
  let currentPlayerIndex;
  let gameOver = false;

  const start = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "X"),
      createPlayer(document.querySelector("#player2").value, "O"),
    ];
    currentPlayerIndex = 0;
    gameOver = false;
    gameBoard.render();
  };

  const handleClick = (event) => {
    let index = parseInt(event.target.id);
    console.log(index);

    if (gameBoard.getGameBoard()[index] !== "") return;
    gameBoard.update(index, players[currentPlayerIndex].mark);

    if (
      checkForWin(gameBoard.getGameBoard(), players[currentPlayerIndex].mark)
    ) {
      gameOver = true;
      alert(`${players[currentPlayerIndex].name} won!`);
    }

    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const restart = () => {
    for (let i = 0; i < 9; i++) {
      gameBoard.update(i, "");
    }
    gameBoard.render();
  };
  return {
    start,
    handleClick,
    restart,
  };
})();

function checkForWin(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

const restartButton = document.querySelector("#restartBtn");
restartButton.addEventListener("click", () => {
  Game.restart();
});

const startButton = document.querySelector("#startBtn");
startButton.addEventListener("click", () => {
  Game.start();
});
