let board = document.getElementById("board");
let sizeSlider = document.getElementById("slider");
let sizeIndicator = document.getElementById("gridSize");
const BOARD_WIDTH = 480;

// only readjust the grid once the user has decided on a value
// this is to avoid creating and deleting grids while the user
// is deciding on the size
sizeSlider.oninput = function(){
    sizeIndicator.value = this.value;
}
sizeSlider.onmouseup = function(){
    adjustGrid();
    resizeSq();
}
sizeIndicator.oninput = function(){
    sizeSlider.value = this.value;
    adjustGrid();
    resizeSq();
}


function resizeSq(){
    let squares = document.getElementsByClassName("sq");
    for (let i = 0; i < squares.length; ++i){
        squares[i].style.width = `${BOARD_WIDTH / sizeSlider.value}px`;
        squares[i].style.height = squares[i].style.width;
    }
}

function adjustGrid(){
    board.appendChild(createGrid(sizeSlider.value));

}


let defaultSize = 16;




function createGrid(n=16){
    if (board.childElementCount > 1){
        board.removeChild(board.lastChild);
    }
    let grid = document.createElement("div");
    grid.id = "grid";
    for (let i = 0; i < n; ++i){
        let row = document.createElement("div");
        row.classList.add("row")
        for (let j = 0; j < n;++j){
            let tmp = document.createElement("div");
            // random color. Temporary, used to allow me to visualize the grid while debugging
            tmp.style.backgroundColor = '#'+ Math.random().toString(16).slice(-3);
            tmp.classList.add("sq");
            row.appendChild(tmp);
        }
        grid.appendChild(row);
    }
    return grid;
}

window.onload = function(){
    sizeIndicator.value = defaultSize;
    sizeSlider.value = defaultSize;
    adjustGrid();
    let rows = document.getElementsByClassName("row");
    for (let i = 0; i < rows.length; ++i){
        rows[i].style.width = `${BOARD_WIDTH}px`;
    }
    resizeSq();
}