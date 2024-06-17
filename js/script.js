document.addEventListener("DOMContentLoaded", () => {
  const puzzleContainer = document.getElementById("puzzle-container");
  const message = document.getElementById("message");
  const rows = 4;
  const cols = 6;
  let pieces = [];
  let selectedPiece = null;

  // Divida a imagem em peças
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const piece = document.createElement("div");
      piece.classList.add("puzzle-piece");
      piece.style.backgroundImage = 'url("images/tabela_periodica.jpg")';
      piece.style.backgroundPosition = `${-col * 100}px ${-row * 100}px`;
      piece.setAttribute("data-row", row);
      piece.setAttribute("data-col", col);
      pieces.push(piece);
    }
  }

  // Embaralhe as peças
  pieces = pieces.sort(() => Math.random() - 0.5);

  // Posicione as peças embaralhadas na grade
  pieces.forEach((piece, index) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    piece.style.gridRowStart = row + 1;
    piece.style.gridColumnStart = col + 1;
    puzzleContainer.appendChild(piece);
  });

  // Adicione o evento de clique para mover as peças
  puzzleContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("puzzle-piece")) {
      if (selectedPiece) {
        // Troque as posições das peças
        const tempRow = selectedPiece.style.gridRowStart;
        const tempCol = selectedPiece.style.gridColumnStart;
        selectedPiece.style.gridRowStart = e.target.style.gridRowStart;
        selectedPiece.style.gridColumnStart = e.target.style.gridColumnStart;
        e.target.style.gridRowStart = tempRow;
        e.target.style.gridColumnStart = tempCol;

        selectedPiece.classList.remove("selected");
        selectedPiece = null;

        // Verifique se o quebra-cabeça foi montado corretamente
        checkPuzzle();
      } else {
        selectedPiece = e.target;
        selectedPiece.classList.add("selected");
      }
    }
  });

  function checkPuzzle() {
    const pieces = Array.from(document.querySelectorAll(".puzzle-piece"));
    const isComplete = pieces.every((piece) => {
      const row = parseInt(piece.style.gridRowStart) - 1;
      const col = parseInt(piece.style.gridColumnStart) - 1;
      return (
        row == piece.getAttribute("data-row") &&
        col == piece.getAttribute("data-col")
      );
    });

    if (isComplete) {
      message.style.display = "block";
    }
  }
});
