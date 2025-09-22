const board = document.getElementById("board");
const turnText = document.getElementById("turn");
let turn = "red"; 

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
      board.appendChild(square);
    }
  }
}

function createPiece(color) {
  const piece = document.createElement("div");
  piece.classList.add("piece", color);
  return piece;
}

createBoard();
