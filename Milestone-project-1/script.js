//2d 2 player chess

//create a 8x8 checkered board
const root = document.querySelector("#root");
const gridContainer = document.createElement("div");
gridContainer.className = "grid-container";

//8x8 board
const rowBoard = [1, 2, 3, 4, 5, 6, 7, 8];

rowBoard.forEach((row) => {
  const rowContainer = document.createElement("div");
  rowContainer.className = `row-container-${row}`;
  rowContainer.style.display = "flex";
  rowContainer.style.flexDirection = "row";
  rowContainer.style.width = "810px";
  rowContainer.style.height = "110px";
  rowContainer.style.border = "1px solid green";
  root.appendChild(rowContainer);
  for (let i = 1; i < 9; i++) {
    const column = document.createElement("div");
    column.id = `${row}-${i}`;
    column.className = "cell";
    column.style.width = "110px";
    column.style.height = "110px";
    if (row % 2 === 0) {
      if (i % 2 === 1) {
        column.style.backgroundColor = "green";
      }
    } else {
      if (i % 2 === 0) {
        column.style.backgroundColor = "green";
      }
    }
    column.addEventListener("click", function () {
      selectCell(this);
    });
    rowContainer.appendChild(column);
  }
});
var player = "white";
var selectedPiece = null;
//append pieces onto board position
function startGame() {
  player = "white";
  setPiece(1, 1, "black", "rook");
  setPiece(1, 8, "black", "rook");
  setPiece(1, 2, "black", "knight");
  setPiece(1, 7, "black", "knight");
  setPiece(1, 3, "black", "bishop");
  setPiece(1, 6, "black", "bishop");
  setPiece(1, 4, "black", "queen");
  setPiece(1, 5, "black", "king");
  setPiece(8, 1, "white", "rook");
  setPiece(8, 8, "white", "rook");
  setPiece(8, 2, "white", "knight");
  setPiece(8, 7, "white", "knight");
  setPiece(8, 3, "white", "bishop");
  setPiece(8, 6, "white", "bishop");
  setPiece(8, 4, "white", "queen");
  setPiece(8, 5, "white", "king");
  for (let i = 1; i <= 8; i++) {
    setPiece(2, i, "black", "pawn");
    setPiece(7, i, "white", "pawn");
  }
}
function setPiece(row, col, color, piece) {
  const img = document.createElement("img");
  img.src = "../images/" + color + piece + ".png";
  const cell = document.getElementById(row + "-" + col);
  cell.appendChild(img);
  cell.setAttribute("color", color);
  cell.setAttribute("piece", piece);
}

function selectCell(cell) {
  const available = cell.getAttribute("available");
  const color = cell.getAttribute("color");
  const piece = cell.getAttribute("piece");
  const id = cell.id;
  const idSplit = id.split("-");
  const row = Number(idSplit[0]);
  const col = Number(idSplit[1]);
  if (available === "true") {
    setPiece(row, col, selectedPiece.color, selectedPiece.piece);
    if (player === "white") {
      player = "black";
    } else player = "white";
    removePiece(selectedPiece.row, selectedPiece.col);
    selectedPiece = null;
    unHighlightCells();
  } else if (color === player) {
    unHighlightCells();
    determineMoves(row, col, color, piece);
    selectedPiece = { row: row, col: col, color: color, piece: piece };
  } else {
    unHighlightCells();
  }
}
function getCell(row, col) {
  return document.getElementById(row + "-" + col);
}
function determineMoves(row, col, color, piece) {
  var moves = [];
  switch (piece) {
    case "pawn":
      if (color === "white") {
        const cellInFront = getCell(row - 1, col);
        const pieceInFront = cellInFront.getAttribute("piece");
        if (pieceInFront === null) {
          moves.push([-1, 0]);
          if (row === 7) {
            moves.push([-2, 0]);
          }
        }
      } else {
        const cellInFront = getCell(row + 1, col);
        const pieceInFront = cellInFront.getAttribute("piece");
        if (pieceInFront === null) {
          moves = [[1, 0]];
          if (row === 2) {
            moves.push([2, 0]);
          }
        }
      }
  }
  for (var move of moves) {
    const moveRow = row + move[0];
    const moveCol = col + move[1];
    const moveCell = getCell(moveRow, moveCol);
    if (moveCell) {
      moveCell.classList.add("available");
      moveCell.setAttribute("available", "true");
    }
  }
}
function removePiece(row, col) {
  const cell = getCell(row, col);
  cell.innerHTML = "";
  cell.removeAttribute("color");
  cell.removeAttribute("piece");
}
function unHighlightCells() {
  rowBoard.forEach((row) => {
    for (let i = 1; i < 9; i++) {
      const cell = getCell(row, i);
      cell.classList.remove("available");
      cell.removeAttribute("available");
    }
  });
}
startGame();

//functionality of pieces
//pawn move forward one space, two spaces from starting position, diagonally one space when capturing a piece
//rook move vertical and horizontal straight line
//knight
//bishop move diagonal all directions
//queen move all directions
//king move all directions but only one space

// const boxes = document.querySelectorAll('.class');
// const currentPiece = undefined;

// for (const box of boxes) {
//   box.addEventListener('click', function handleClick(event) {
//     // get coordinates from event.target.id
//     if (event.target.hasAttribute('hasPiece')) {
//       if (event.target.attributes['color'] === currentColor) {
//         currentPiece = event.target.attributes['color'] + event.target.attributes['piece']
//         // function to highlight to places where the piece can go
//       }
//     } else if (event.target.hasAttribute('highlighted')) {
//       movePiece(currentPiece, coordinates)
//     }
//   });
// }
