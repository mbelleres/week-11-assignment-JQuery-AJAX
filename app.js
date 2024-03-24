$(document).ready(function() {
    let player = 'X';
    let gameActive = true;
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
    let gameState = ["", "", "", "", "", "", "", "", ""];

    // Initialize the game grid
    const initializeGrid = () => {
        for (let i = 0; i < 9; i++) {
            $('#gameGrid').append(`<div class="grid-item" data-cell-index="${i}"></div>`);
        }
    };

    // Check for a win or a tie
    const checkResult = () => {
        let roundWon = false;
        for (let i = 0; i < winningConditions.length; i++) {
            const winCondition = winningConditions[i];
            const a = gameState[winCondition[0]];
            const b = gameState[winCondition[1]];
            const c = gameState[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(`${player} wins!`);
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            announce("Draw!");
            gameActive = false;
            return;
        }

        player = player === 'X' ? 'O' : 'X';
        $('#turn').text(`${player}'s Turn`);
    };

    // Announce the result
    const announce = (message) => {
        $('.container').prepend(`<div class="alert alert-info">${message}</div>`);
        setTimeout(function() {
            $('.alert').alert('close');
        }, 3000);
    };

    // Click event for each cell
    $('#gameGrid').on('click', '.grid-item', function() {
        const cellIndex = $(this).data('cell-index');
        if (gameState[cellIndex] !== "" || !gameActive) {
            return;
        }

        gameState[cellIndex] = player;
        $(this).text(player);
        checkResult();
    });

    // Restart game
    $('#restart').click(function() {
        gameState = ["", "", "", "", "", "", "", "", ""];
        player = 'X';
        gameActive = true;
        $('#turn').text("X's Turn");
        $('.grid-item').text('');
        $('.alert').remove();
    });

    initializeGrid();
});
