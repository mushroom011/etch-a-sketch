const gridContainer = document.querySelector('#grid-container');
const setGridSizeButton = document.querySelector('#setGridSize');
const setRandomColorButton = document.querySelector('#setRandomColor');
const enableOpacityButton = document.querySelector('#enableOpacity');
const clearGridButton = document.querySelector('#clearGrid');
const initialSquaresNumber = 256;
const initialGridSize = 16;
const gridWidth = 500;
let squareBackgroundColorRandom = false;
let enableOpacity = false;
let squares = 1;

const clearGrid = () => {
    if(squares === 1){
        removeGrid();
        renderGrid();
    } else {
        removeGrid();
        renderGrid(squares * squares, squares);
    }
}

clearGridButton.addEventListener('click', clearGrid);

const createGridElement = () => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    gridContainer.append(grid);
    return grid;
}

const setOpacity = (el) => {
    if(el.dataset.opacity === '1.0') return;
    if (!el.dataset.opacity) el.dataset.opacity = '0.1';

    const opacityValue = (parseFloat(el.dataset.opacity) + 0.1).toFixed(1);
    el.style.opacity = opacityValue;
    el.dataset.opacity = opacityValue;
}

const toggleEnableOpacity = () => {
    enableOpacity = !enableOpacity;
}

enableOpacityButton.addEventListener('click', toggleEnableOpacity)

const toggleRandomColor = () => {
    squareBackgroundColorRandom = !squareBackgroundColorRandom;
}

setRandomColorButton.addEventListener('click', toggleRandomColor);

const getNumberOfSquaresFromUser = () => {
    const numberOfSquares = prompt('Enter the number of squares per side for the new grid');
    if(numberOfSquares === null) return;

    squares = parseInt(numberOfSquares, 10);
    if(squares > 100 || squares <= 0) alert('The number of squares must be more then 0 or less then 100!');
    removeGrid();
    renderGrid(squares * squares, squares);
}

setGridSizeButton.addEventListener('click', getNumberOfSquaresFromUser);

const getRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
}

const changeSquareBackgroundColor = (e) => {
  e.target.style.backgroundColor = squareBackgroundColorRandom ? getRandomColor() : 'black';
  if(enableOpacity) setOpacity(e.target);
}

const addOneSquareToGrid = (grid, squareSize) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.addEventListener('mouseover', changeSquareBackgroundColor);
    grid.append(square);
}

const removeGrid = () => {
    const grid = document.querySelector('.grid');
    grid.remove();
}

const renderGrid = (squaresNumber = initialSquaresNumber, gridSize = initialGridSize) => {
    const squareSize = gridWidth / gridSize;
    const grid = createGridElement();
    for (let i = 0; i < squaresNumber; i ++) {
        addOneSquareToGrid(grid, squareSize);
    }
}

renderGrid();
