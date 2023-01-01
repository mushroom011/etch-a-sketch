const gridContainer = document.querySelector('#grid-container');
const colorPicker = document.querySelector('#colorPicker');
const gridSizeRange = document.querySelector('#gridSizeRange');
const randomColorSwitch = document.querySelector('#randomColorSwitch');
const enableOpacitySwitch = document.querySelector('#enableOpacitySwitch');
const enableEraserSwitch = document.querySelector('#enableEraserSwitch');
const clearGridButton = document.querySelector('#clearGrid');
const gridSizeLabel = document.querySelector('#gridSizeLabel');
const gridWidth = 500;

let gridSize = parseInt(gridSizeRange.value, 10);
let squares = gridSize * gridSize;
let squareBackgroundColorRandom = false;
let enableOpacity = false;
let enableEraser = false;
let color = 'black';

const removeGrid = () => {
    const grid = document.querySelector('.grid');
    grid.remove();
}

const reRenderGrid = () => {
    removeGrid();
    renderGrid(squares, gridSize);
}

const handleColorChange = (e) => {
    color = e.target.value;
}

colorPicker.addEventListener('input', handleColorChange);
clearGridButton.addEventListener('click', reRenderGrid);

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
enableOpacitySwitch.addEventListener('click', toggleEnableOpacity)

const toggleRandomColor = () => {
    squareBackgroundColorRandom = !squareBackgroundColorRandom;
}
randomColorSwitch.addEventListener('click', toggleRandomColor);

const toggleEnableEraser = () => {
    enableEraser = !enableEraser;
}
enableEraserSwitch.addEventListener('click', toggleEnableEraser);

const updateRangeBackground = (range) => {
    const value = (range.value - range.min) / (range.max - range.min) * 100;
    range.style.background = 'linear-gradient(to right, #386A20 0%, #386A20 ' + value + '%, #DFE4D6 ' + value + '%, #DFE4D6 100%)';
}

const updateRangeLabel = (numberOfSquares) => {
    gridSizeLabel.textContent = `${numberOfSquares} x ${numberOfSquares}`;
}

const handleRangeInput = (e) => {
    const target = e.target;
    const numberOfSquares = target.value;

    updateRangeBackground(target);
    updateRangeLabel(numberOfSquares);

    gridSize = parseInt(numberOfSquares, 10);
    squares = gridSize * gridSize;
    reRenderGrid();
}

gridSizeRange.addEventListener('input', handleRangeInput);

const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

const changeSquareBackgroundColor = (e) => {
    if(enableEraser) {
        e.target.style.backgroundColor = '#ffffff';
    } else {
        e.target.style.backgroundColor = squareBackgroundColorRandom ? getRandomColor() : color;
        if(enableOpacity) setOpacity(e.target);
    }
}

const addOneSquareToGrid = (grid, squareSize) => {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = squareSize + 'px';
    square.style.height = squareSize + 'px';
    square.addEventListener('mouseover', changeSquareBackgroundColor);
    grid.append(square);
}

const createGridElement = () => {
    const grid = document.createElement('div');
    grid.classList.add('grid');
    gridContainer.append(grid);
    return grid;
}

const renderGrid = (squaresNumber, gridSize) => {
    const squareSize = gridWidth / gridSize;
    const grid = createGridElement();
    for (let i = 0; i < squaresNumber; i ++) {
        addOneSquareToGrid(grid, squareSize);
    }
}

renderGrid(squares, gridSize);
