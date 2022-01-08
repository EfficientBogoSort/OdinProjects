let options = document.getElementById("options");
let sizeSlider = document.getElementById("slider");
let sizeIndicator = document.getElementById("gridSize");
let clearButton = document.getElementById('clear');
let custColCont = document.getElementById("custColCont");
let custCol = document.getElementById("custCol");
let custColButt = document.getElementById("custColButt");
let randColButt = document.getElementById('randColButt');
let blackButt = document.getElementById('blackButt');
let gradButt = document.getElementById('gradButt');



const BOARD_WIDTH = 480;
let currColor = "#000";
let coloring = false;
let defaultSize = 16;

let mode = {
    'cust': false,
    'rand': false,
    'black': true,
    'grad': false
}

custColButt.addEventListener('click', function(){
    swtichMode('cust');
});
randColButt.addEventListener('click', function(){
    swtichMode('rand');
});
blackButt.addEventListener('click', function(){
    swtichMode('black');
});
gradButt.addEventListener('click', function(){
    swtichMode('grad');
});

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

custColCont.style.backgroundColor = custCol.value;
custCol.addEventListener("input",function(){
    custColCont.style.backgroundColor = this.value;
})
clearButton.addEventListener("click", ()=>{
    let squares = document.getElementsByClassName('sq');
    for (let i = 0; i < squares.length; ++i){
        squares[i].style.backgroundColor = '#FFF';
    }
})

function swtichMode(colMode){
    console.log("A");
    mode[colMode] = true;
    for (let key in mode){
        if (key !== colMode){
            mode[key] = false;
        }
    }
}

function resizeSq(){
    let squares = document.getElementsByClassName("sq");
    for (let i = 0; i < squares.length; ++i){
        squares[i].style.width = `${BOARD_WIDTH / sizeSlider.value}px`;
        squares[i].style.height = squares[i].style.width;
    }
}

function adjustGrid(){
    options.insertBefore(createGrid(sizeSlider.value), options.children[1]);
}

function getRandomColor(){
    currColor = '#' + Math.floor(Math.random()*16777215).toString(16);
}


function colorSq(sq){
    sq.style.backgroundColor = currColor;
}

function updateCol(){
    if (mode['cust']){
        currColor = custCol.value
    } else if (mode['rand']){
        getRandomColor();
    } else if (mode['black']){
        currColor = '#000';
    } 
}

function createGrid(n=16){
    if (options.childElementCount > 2){
        options.removeChild(options.children[1]);
    }
    let grid = document.createElement("div");
    grid.id = "grid";
    for (let i = 0; i < n; ++i){
        let row = document.createElement("div");
        row.classList.add("row")
        for (let j = 0; j < n;++j){
            let tmp = document.createElement("div");
            tmp.classList.add("sq");
            tmp.addEventListener("mousedown", function(e){
                coloring = true;
                updateCol();
                colorSq(this);
                e.preventDefault();
                
            });
            tmp.addEventListener("mouseover", function(){
                if (!coloring){
                    return;
                }
                updateCol();
                colorSq(this);
            })
            tmp.addEventListener("mouseup", ()=>{
                coloring = false;
            })
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


