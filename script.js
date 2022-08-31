const palette = document.getElementById('color-palette');

function addColor(color) {
  const newColor = document.createElement('div');
  newColor.className = 'color';
  newColor.style.backgroundColor = color;
  palette.appendChild(newColor);
}

function createPalette() {
  if (localStorage.colors === undefined) {
    localStorage.colors = JSON.stringify(['red', 'green', 'blue']);
  }

  const colors = JSON.parse(localStorage.colors);

  addColor('black');
  for (let i = 0; i < colors.length; i += 1) {
    addColor(colors[i]);
  }
}

createPalette();
