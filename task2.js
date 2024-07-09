// JavaScript variables
let board = ['', '', '', '', '', '', '', '', '']; // Represents the tic-tac-toe board
let currentPlayer = 'X'; // 'X' starts the game
const cells = Array.from(document.querySelectorAll('.cell'));
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

// Function to handle a player's move
function handleMove(cellClicked, cellIndex) {
    // Check if the cell is already clicked or if the game is over
    if (board[cellIndex] !== '' || checkWin() !== null) {
        return;
    }
    
    // Update board array and UI
    board[cellIndex] = currentPlayer;
    cellClicked.textContent = currentPlayer;
    cellClicked.classList.add('occupied');
    
    // Check for a winner
    const winner = checkWin();
    if (winner !== null) {
        message.textContent = `Player ${winner} wins!`;
        highlightWinningCells();
        disableBoard();
        return;
    }
    
    // Check for a draw
    if (!board.includes('')) {
        message.textContent = 'It\'s a draw!';
        disableBoard();
        return;
    }
    
    // Switch players
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to check for a winner
function checkWin() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    return null; // No winner
}

// Function to highlight winning cells
function highlightWinningCells() {
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
            // Highlight winning cells
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
            break;
        }
    }
}

// Function to disable the board after game over
function disableBoard() {
    cells.forEach(cell => {
        cell.classList.add('disabled');
    });
}

// Function to reset the game
function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('occupied', 'win', 'disabled');
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        handleMove(cell, index);
    });
});

resetButton.addEventListener('click', resetGame);
