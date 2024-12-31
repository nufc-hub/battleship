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
        cell.classList = 'board-cell-empty';
        cell.dataset.value = col; // Placeholder.Change this later to represent the ship there.
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;

        boardDiv.appendChild(cell); // Append each cell to the board
      });
    });
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
      return;
    }
    return;
  }

  // References the board state to set the cell color
  setCellColor(gameBoard, cell, row, col) {
    // Validate the row and col indices
    if (!this.isIndexWithinBounds(gameBoard, row, col)) {
      return;
    }

    // Get the value at the gameBoard array index
    const value = gameBoard[row][col];

    // Remove cell class
    cell.classList.remove(
      'board-cell-hit',
      'board-cell-miss',
      'board-cell-empty'
    );

    // Add new class depending on board state
    if (value === -2) {
      cell.classList.add('board-cell-miss'); // Attack misses
    } else if (value === -1) {
      cell.classList.add('board-cell-hit'); // Attack hits
    }
  }

  // Check coords are within the gameBoard
  isIndexWithinBounds(gameBoard, row, col) {
    if (
      row < 0 &&
      row >= gameBoard.length &&
      col < 0 &&
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
    div.style.display = div.style.display === 'flex' ? 'none' : 'flex'; // Toggle display
    console.log(div.style.display);
  }
}

export default BoardRenderer;
