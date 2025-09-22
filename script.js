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
  } else if (!piece && selectedPiece) {
    square.appendChild(selectedPiece);
    selectedPiece.classList.remove("selected");
    selectedPiece = null;
    selectedSquare = null;
    switchTurn();
  }
}

function switchTurn() {
  turn = turn === "red" ? "black" : "red";
  turnText.textContent = "Tour : " + (turn === "red" ? "Rouge" : "Noir");
}

createBoard();

