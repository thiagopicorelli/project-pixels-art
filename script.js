let palette = document.getElementById('color-palette');
addColor('black');
addColor('red');
addColor('green');
addColor('blue');

function addColor(color) {
    let newColor = document.createElement('div');
    newColor.className = 'color';
    newColor.style.backgroundColor = color;
    palette.appendChild(newColor);
}