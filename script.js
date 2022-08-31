const palette = document.getElementById('color-palette');

function addColor(color) {
  const newColor = document.createElement('div');
  newColor.className = 'color';
  newColor.style.backgroundColor = color;
  palette.appendChild(newColor);
}

addColor('black');
addColor('red');
addColor('green');
addColor('blue');
