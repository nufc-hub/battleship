class BoardRenderer {
  constructor(gameController) {
    this.gameController = gameController;
  }

  // Render gameBoard
  renderBoard(gameBoard, boardDivId) {
    const boardDiv = document.getElementById(boardDivId);

    boardDiv.replaceChildren(); // Clear the board first

    // Handle any errors
    this.renderErrorHandling(gameBoard, boardDiv, boardDivId);

    // Loop through gameBoard rendering it to webpage
    gameBoard.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        const cell = document.createElement('div');
        cell.classList = 'board-cell';
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;

        boardDiv.appendChild(cell); // Append each cell to the board
      });
    });
  }

  // Renders player ships onto game board
  renderPlayerShips(boardDivId, gameBoard) {
    const boardDiv = document.getElementById(boardDivId);
    console.log(boardDiv); // This is keeping old css classes
    console.log(gameBoard); // Gameboard is not being reset

    gameBoard.forEach((row, rowIndex) => {
      row.forEach((_, colIndex) => {
        const flatIndex = rowIndex * gameBoard[0].length + colIndex; // Get html element position
        const cellElement = boardDiv.children[flatIndex];
        // Update cell colour based on game state

        this.setCellColor(gameBoard, cellElement, rowIndex, colIndex);
        console.log(cellElement.className);
      });
    });
  }

  // Displays win message on game over screen
  renderWinMessage(gameOverMessageId) {
    const messageDiv = document.getElementById(gameOverMessageId);
    console.log(messageDiv);
    messageDiv.textContent = 'You Win!';
  }

  // Displays lose message on game over screen
  renderLoseMessage(gameOverMessageId) {
    const messageDiv = document.getElementById(gameOverMessageId);
    messageDiv.textContent = 'You Lose! ';
  }

  // Handle render errors
  renderErrorHandling(gameBoard, boardDiv, boardDivId) {
    if (!Array.isArray(gameBoard)) {
      // Check gameBoard is an array
      throw new Error('Invalid game board: must be a 2D array.');
    }
    if (!boardDiv) {
      // Check boardDiv exists
      console.error(`Board container with ID "${boardDivId}" not found.`);
    }
    return;
  }

  // References the board state to set the cell color
  setCellColor(gameBoard, cell, row, col) {
    // Validate the row and col indices
    if (!this.isIndexWithinBounds(gameBoard, row, col)) {
      return;
    }

    // Clear all previous classes except the default 'board-cell'
    cell.className = 'board-cell';

    // Get the value at the gameBoard array index
    const value = gameBoard[row][col];

    // Add new class depending on board state
    if (value === -2) {
      cell.classList.add('board-cell-miss'); // Attack misses
    } else if (value === 1) {
      cell.classList.add('board-cell-player-ship');
    } else if (value === -1) {
      cell.classList.add('board-cell-hit'); // Attack hits
    }
  }

  // Check coords are within the gameBoard
  isIndexWithinBounds(gameBoard, row, col) {
    if (
      row < 0 ||
      row >= gameBoard.length ||
      col < 0 ||
      col >= gameBoard[row].length
    ) {
      console.error(`Invalid cell position: row=${row}, col=${col}`);

      return false;
    }

    return true;
  }

  // Used for displaying/ hiding an html element
  toggleElementDisplay(element) {
    const div = document.getElementById(element);

    // Make sure element exists
    if (!div) {
      console.error(`Element with ID "${element}" not found.`);
      return;
    }

    // Get the computed style to account for stylesheet values
    const computedStyle = window.getComputedStyle(div);

    // Toggle display based on the computed value
    if (computedStyle.display === 'none') {
      div.style.display = 'flex'; // Set inline style to flex
    } else {
      div.style.display = 'none'; // Set inline style to none
    }
  }
}

export default BoardRenderer;
