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

let pixelBoard = [];

function createBoard() {
  if (localStorage.pixelBoard === undefined) {
    localStorage.pixelBoard = JSON.stringify(Array(25).fill('white'));
  }

  pixelBoard = JSON.parse(localStorage.pixelBoard);

  const board = document.getElementById('pixel-board');
  for (let i = 0; i < 5; i += 1) {
    for (let j = 0; j < 5; j += 1) {
      const newPixel = document.createElement('div');
      newPixel.className = 'pixel';
      newPixel.pos = 5 * i + j;
      newPixel.style.backgroundColor = pixelBoard[newPixel.pos];
      board.appendChild(newPixel);
    }

    board.appendChild(document.createElement('br'));
  }
}

createBoard();
const pixelBoardView = document.getElementsByClassName('pixel');

function updatePixel(pos) {
  pixelBoardView[pos].style.backgroundColor = paletteBlocks[selectedColor].style.backgroundColor;
  pixelBoard[pos] = pixelBoardView[pos].style.backgroundColor;
  localStorage.pixelBoard = JSON.stringify(pixelBoard);
}

for (let i = 0; i < pixelBoardView.length; i += 1) {
  pixelBoardView[i].addEventListener('click', (event) => {
    updatePixel(event.target.pos);
  });
}

function clearBoard() {
  pixelBoard = Array(25).fill('white');
  for (let i = 0; i < 25; i += 1) {
    pixelBoardView[i].style.backgroundColor = 'white';
  }

  localStorage.pixelBoard = JSON.stringify(pixelBoard);
}

const clearButton = document.getElementById('clear-board');
clearButton.addEventListener('click', clearBoard);
