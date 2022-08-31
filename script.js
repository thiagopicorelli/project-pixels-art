const palette = document.getElementById('color-palette');

function addColor(color) {
  const newColor = document.createElement('div');
  newColor.className = 'color';
  newColor.style.backgroundColor = color;
  palette.appendChild(newColor);
}

function createPalette() {
  if(localStorage.colors === undefined)
    localStorage.colors = JSON.stringify(['red', 'green', 'blue']);

  let colors = JSON.parse(localStorage.colors);

  addColor('black');
  for(let color of colors)
    addColor(color);
}

createPalette();