const board = document.getElementById("board");
const turnText = document.getElementById("turn");
let turn = "red";
let selectedPiece = null;
let selectedSquare = null;

function createBoard() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const square = document.createElement("div");
      square.classList.add("square");

      if ((row + col) % 2 === 0) {
        square.classList.add("light");
      } else {
        square.classList.add("dark");

        if (row < 3) {
          const piece = createPiece("black");
          square.appendChild(piece);
        }
        if (row > 4) {
          const piece = createPiece("red");
          square.appendChild(piece);
        }
      }

      square.dataset.row = row;
      square.dataset.col = col;

      square.addEventListener("click", () => handleSquareClick(square));
      board.appendChild(square);
    }
  }
}

function createPiece(color) {
  const piece = document.createElement("div");
  piece.classList.add("piece", color);
  piece.dataset.color = color;
  return piece;
}

function handleSquareClick(square) {
  const piece = square.querySelector(".piece");

  if (piece && piece.dataset.color === turn) {

    if (selectedPiece) {
      selectedPiece.classList.remove("selected");
    }
    selectedPiece = piece;
    selectedSquare = square;
    piece.classList.add("selected");
  }
  else if (!piece && selectedPiece) {
    if (isValidMove(selectedSquare, square, selectedPiece)) {
      const fromRow = parseInt(selectedSquare.dataset.row);
      const fromCol = parseInt(selectedSquare.dataset.col);
      const toRow = parseInt(square.dataset.row);
      const toCol = parseInt(square.dataset.col);

      const rowDiff = toRow - fromRow;
      const colDiff = Math.abs(toCol - fromCol);

      if (colDiff === 2 && Math.abs(rowDiff) === 2) {
        const capturedRow = fromRow + (rowDiff / 2);
        const capturedCol = fromCol + ((toCol - fromCol) / 2);
        const capturedSquare = document.querySelector(`.square[data-row="${capturedRow}"][data-col="${capturedCol}"]`);
        const capturedPiece = capturedSquare.querySelector(".piece");

        if (capturedPiece) {
          capturedPiece.remove();
        }
      }

      square.appendChild(selectedPiece);

      checkForKing(selectedPiece, toRow);

      selectedPiece.classList.remove("selected");
      selectedPiece = null;
      selectedSquare = null;

      switchTurn();
    }
  }
}

function isValidMove(fromSquare, toSquare, piece) {
  const fromRow = parseInt(fromSquare.dataset.row);
  const fromCol = parseInt(fromSquare.dataset.col);
  const toRow = parseInt(toSquare.dataset.row);
  const toCol = parseInt(toSquare.dataset.col);

  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);

  if (colDiff === 1) {
    if (piece.dataset.color === "red") {
      return rowDiff === -1;
    } else {
      return rowDiff === 1;
    }
  }
  else if (colDiff === 2 && Math.abs(rowDiff) === 2) {
    const capturedRow = fromRow + (rowDiff / 2);
    const capturedCol = fromCol + ((toCol - fromCol) / 2);

    const capturedSquare = document.querySelector(`.square[data-row="${capturedRow}"][data-col="${capturedCol}"]`);
    const capturedPiece = capturedSquare?.querySelector(".piece");

    if (capturedPiece && capturedPiece.dataset.color !== piece.dataset.color) {
      return true;
    }
  }

  return false;
}

function checkForKing(piece, row) {
  if ((piece.dataset.color === "red" && row === 0) ||
      (piece.dataset.color === "black" && row === 7)) {
    piece.classList.add("king");
  }
}

function switchTurn() {
  turn = turn === "red" ? "black" : "red";
  turnText.textContent = "Tour : " + (turn === "red" ? "Rouge" : "Noir");
}

createBoard();

function checkWin() {
  const blackPieces = document.querySelectorAll('.piece.black');
  if (blackPieces.length === 0) {
    return "red";
  }

  const redPieces = document.querySelectorAll('.piece.red');
  if (redPieces.length === 0) {
    return "black";
  }

  const possibleMovesRed = getAllPossibleMoves("red");
  const possibleMovesBlack = getAllPossibleMoves("black");

  if (possibleMovesRed.length === 0) {
    return "black";
  }

  if (possibleMovesBlack.length === 0) {
    return "red";
  }

  return null;
}

