document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    const playerXScoreElement = document.getElementById('playerXScore');
    const playerOScoreElement = document.getElementById('playerOScore');
    const turnIndicator = document.getElementById('turnIndicator');
    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = Array(9).fill(null);
    let playerXScore = 0;
    let playerOScore = 0;

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

    function handleCellClick(event) {
        const cell = event.target;
        const cellIndex = parseInt(cell.getAttribute('data-index'));

        if (boardState[cellIndex] !== null || !gameActive) {
            return;
        }

        boardState[cellIndex] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        anime({
            targets: cell,
            scale: [0, 1],
            duration: 800,
            easing: 'easeInOutElastic(1, .8)'
        });

        if (checkWinner()) {
            alert(`Player ${currentPlayer} wins!`);
            updateScore(currentPlayer);
            gameActive = false;
            turnIndicator.textContent = `Player ${currentPlayer} wins!`;

            anime({
                targets: '#turnIndicator',
                scale: [0, 1],
                duration: 1000,
                easing: 'easeInOutExpo'
            });
        } else if (!boardState.includes(null)) {
            alert('Game is a draw!');
            gameActive = false;
            turnIndicator.textContent = 'Game is a draw!';

            anime({
                targets: '#turnIndicator',
                scale: [0, 1],
                duration: 1000,
                easing: 'easeInOutExpo'
            });
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnIndicator.textContent = `Player ${currentPlayer}'s turn`;

            anime({
                targets: '#turnIndicator',
                scale: [0, 1],
                duration: 1000,
                easing: 'easeInOutExpo'
            });
        }
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return boardState[index] === currentPlayer;
            });
        });
    }

    function updateScore(player) {
        if (player === 'X') {
            playerXScore++;
            playerXScoreElement.textContent = playerXScore;
        } else {
            playerOScore++;
            playerOScoreElement.textContent = playerOScore;
        }

        anime({
            targets: player === 'X' ? '#playerXScore' : '#playerOScore',
            scale: [0, 1],
            duration: 1000,
            easing: 'easeInOutExpo'
        });
    }

    function resetGame() {
        boardState = Array(9).fill(null);
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('X', 'O');
        });
        currentPlayer = 'X';
        gameActive = true;
        turnIndicator.textContent = `Player ${currentPlayer}'s turn`;

        anime({
            targets: '#turnIndicator',
            scale: [0, 1],
            duration: 1000,
            easing: 'easeInOutExpo'
        });
    }

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
