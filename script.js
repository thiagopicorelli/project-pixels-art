const palette = document.getElementById('color-palette');

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
  const paletteBlocks = palette.children;
  for (let i = 1; i < paletteBlocks.length; i += 1) {
    paletteBlocks[i].style.backgroundColor = colors[i - 1];
  }
}

function createPalette() {
  for (let i = 0; i < 4; i += 1) {
    const newColor = document.createElement('div');
    newColor.className = 'color';
    palette.appendChild(newColor);
  }
  palette.firstElementChild.style.backgroundColor = 'black';

  if (localStorage.colors === undefined) {
    localStorage.colors = JSON.stringify(getRandomColors());
  }
  const colors = JSON.parse(localStorage.colors);
  setPalette(colors);
}

function randomizePalette() {
  const colors = getRandomColors();
  localStorage.colors = JSON.stringify(colors);
  setPalette(colors);
}

createPalette();

const randomButton = document.getElementById('button-random-color');
randomButton.addEventListener('click', randomizePalette);
