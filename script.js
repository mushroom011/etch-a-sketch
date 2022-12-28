const grid = document.querySelector('#grid');
const QUANTITY_OF_SQUARES = 256;

const changeSquareBackgroundColor = (e) => {
  e.target.style.backgroundColor = 'black';
}
const addOneSquareToGrid = (grid) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', changeSquareBackgroundColor);
    grid.append(square);
}

for (let i = 0; i < QUANTITY_OF_SQUARES; i ++) {
    addOneSquareToGrid(grid);
}



