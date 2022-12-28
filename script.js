const gridContainer = document.querySelector('#grid-container');
const setGridSize = document.querySelector('#setGridSize');

const createGridElement = () => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    gridContainer.append(grid);
    return grid;
}

let squares = 1;

const getNumberOfSquaresFromUser = () => {
    const numberOfSquares = prompt('Enter the number of squares per side for the new grid');
    squares = parseInt(numberOfSquares, 10);
    if(squares > 100) alert('The number of squares must be less then 100!');
    if(squares <= 0) alert('The number of squares must be more then 0!');
    clearGrid();
    renderGrid(squares * squares, squares);
}

setGridSize.addEventListener('click', getNumberOfSquaresFromUser);

const changeSquareBackgroundColor = (e) => {
  e.target.style.backgroundColor = 'black';
}
const addOneSquareToGrid = (grid, squareSize) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.addEventListener('mouseover', changeSquareBackgroundColor);
    grid.append(square);
}

const clearGrid = () => {
    const grid = document.querySelector('.grid');
    grid.remove();
}

const renderGrid = (squaresNumber = 256, gridSize = 16) => {
    const squareSize = 500 / gridSize;
    const grid = createGridElement();
    for (let i = 0; i < squaresNumber; i ++) {
        addOneSquareToGrid(grid, squareSize);
    }
}

renderGrid();



