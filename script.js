// Get all the tiles where the player will click
const gameTiles = document.querySelectorAll('.game-tile');

// Get the p element where the game status will be placed
const gameStatus = document.getElementById('status');

const restartBtn = document.getElementById('restart-btn');

let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

gameStatus.innerHTML = currentPlayerTurn();

const handleTileClick = (e) => {
  const tile = e.target;
  const tileIndex = parseInt(tile.dataset.tileIndex);

  if (gameBoard[tileIndex] !== '' || !gameActive) {
    return;
  }

  gameBoard[tileIndex] = currentPlayer;
  tile.innerHTML = currentPlayer;
  tile.style.color = currentPlayer === 'X' ? '#f44336' : '#2196f3';
  
  handleResultValidation();
};

const handleResultValidation = () => {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  let roundWon = false;

  for (let i = 0; i < winningConditions.length; i++) {
    // Get the winning condition's array index
    const [a, b, c] = winningConditions[i];

    // Reference the game boards tile based on the winning condition index
    const firstTile = gameBoard[a];
    const secondTile = gameBoard[b];
    const thirdTile = gameBoard[c];
    
    if (firstTile === '' || secondTile === '' || thirdTile === '') {
      continue;
    }
    
    if (firstTile === secondTile && secondTile === thirdTile) {
      roundWon = true;
      break;
    }
}

if (roundWon) {
    gameStatus.innerHTML = winningMessage();
    gameActive = false;
    return;
}

let roundDraw = !gameBoard.includes('');
if (roundDraw) {
    gameStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
}

currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
gameStatus.innerHTML = currentPlayerTurn();
};

const handleRestartGame = () => {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    gameStatus.innerHTML = currentPlayerTurn();
    gameTiles.forEach(tile => {
    tile.innerHTML = '';
    tile.style.removeProperty('color');
    });
};

gameTiles.forEach(tile => {
tile.addEventListener('click', handleTileClick);
});

restartBtn.addEventListener('click', handleRestartGame);