// Palette

const palette = document.getElementById('color-palette');
const paletteBlocks = palette.children;
let selectedColor = 0;

function selectColor(element) {
  paletteBlocks[selectedColor].className = 'color';
  paletteBlocks[element.pos].className = 'color selected';
  selectedColor = element.pos;
}

function getRandomColor() {
  const color = [];

  for (let i = 0; i < 3; i += 1) {
    color.push(Math.floor(Math.random() * 256));
  }

  return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

function getRandomColors() {
  const colors = [];

  for (let i = 0; i < 3; i += 1) {
    colors.push(getRandomColor());
  }

  return colors;
}

function setPalette(colors) {
  for (let i = 1; i < paletteBlocks.length; i += 1) {
    paletteBlocks[i].style.backgroundColor = colors[i - 1];
  }
}

function createPalette() {
  for (let i = 0; i < 4; i += 1) {
    const newColor = document.createElement('div');
    newColor.className = 'color';
    newColor.pos = i;
    palette.appendChild(newColor);
  }
  palette.firstElementChild.style.backgroundColor = 'black';
  selectColor(palette.firstElementChild);

  if (localStorage.colorPalette === undefined) {
    localStorage.colorPalette = JSON.stringify(getRandomColors());
  }
  const colors = JSON.parse(localStorage.colorPalette);
  setPalette(colors);
}

function randomizePalette() {
  const colors = getRandomColors();
  localStorage.colorPalette = JSON.stringify(colors);
  setPalette(colors);
}

createPalette();

const randomButton = document.getElementById('button-random-color');
randomButton.addEventListener('click', randomizePalette);

for (let i = 0; i < paletteBlocks.length; i += 1) {
  paletteBlocks[i].addEventListener('click', (event) => {
    selectColor(event.target);
  });
}

// Pixel Board

function loadBoardSize() {
  if (localStorage.boardSize === undefined) {
    localStorage.boardSize = 5;
  }

  return localStorage.boardSize;
}

function loadPixelBoard(boardSize) {
  if (localStorage.pixelBoard === undefined || localStorage.pixelBoard.length === 0) {
    localStorage.pixelBoard = JSON.stringify(Array(boardSize ** 2).fill('white'));
  }
  return JSON.parse(localStorage.pixelBoard);
}

let boardSize = loadBoardSize();
let pixelBoard = loadPixelBoard(boardSize);
const board = document.getElementById('pixel-board');

function updatePixel(event) {
  const newPixel = event.target;
  newPixel.style.backgroundColor = paletteBlocks[selectedColor].style.backgroundColor;
  pixelBoard[newPixel.pos] = newPixel.style.backgroundColor;
  localStorage.pixelBoard = JSON.stringify(pixelBoard);
}

function createBoard() {
  for (let i = 0; i < boardSize; i += 1) {
    for (let j = 0; j < boardSize; j += 1) {
      const newPixel = document.createElement('div');
      newPixel.className = 'pixel';
      newPixel.pos = boardSize * i + j;
      newPixel.style.backgroundColor = pixelBoard[newPixel.pos];
      board.appendChild(newPixel);
      newPixel.addEventListener('click', updatePixel);
    }
    board.appendChild(document.createElement('br'));
  }
}

createBoard();

function clearBoard() {
  const pixelBoardView = document.getElementsByClassName('pixel');
  const area = boardSize ** 2;

  pixelBoard = Array(area).fill('white');
  for (let i = 0; i < area; i += 1) {
    pixelBoardView[i].style.backgroundColor = 'white';
  }

  localStorage.pixelBoard = JSON.stringify(pixelBoard);
}

const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', clearBoard);

function getBoardSize() {
  let N = document.getElementById('board-size').value;
  if (N.length === 0) {
    alert('Board inválido!');
  }
  if (Number.isNaN(N)) {
    return undefined;
  }
  if (N < 5) {
    N = 5;
  } else if (N > 50) {
    N = 50;
  }
  return N;
}

function changeBoardSize() {
  const N = getBoardSize();
  if (N === undefined) {
    return;
  }
  localStorage.boardSize = N;
  boardSize = N;
  localStorage.pixelBoard = [];
  pixelBoard = loadPixelBoard(boardSize);
  board.innerHTML = '';
  createBoard();
}

const changeButton = document.getElementById('generate-board');
changeButton.addEventListener('click', changeBoardSize);
