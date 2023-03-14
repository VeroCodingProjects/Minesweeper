let board = [];

// by clicking on any of the buttons corresponding to the chosen level, 
// the minesweeper board will be displayed, as well as the time left to solve the game
easy.addEventListener("click", () => {
    createTable(10);
    displayMenu();
    startTimer(300, countdown);
});

medium.addEventListener("click", () => {
    createTable(15);
    displayMenu();
    startTimer(900, countdown);
});

extreme.addEventListener("click", () => {
    createTable(20);
    displayMenu();
    startTimer(1200, countdown);
});

// debug button in order to see the the transposed matrix 
debug.onclick = () => {
    console.log(board);
}

// creates a matrix with the size of the table
function createMatrix(size) {
    board = [...Array(size)].map(e => Array(size).fill(0));
}

// by clicking the reset button, the user will be 
// redirected to the main page
reset.onclick = () => {
   window.location.reload();
}

// adds a flag if clicking the left button of the mouse
function completeBoard(event, cell) {
    if (event.button == 0) {
        // TODO:
        // function for mining must be called here
    } else if (event.button == 2) {
        if (cell.innerText == "") {
            cell.innerText = "🚩";
        } else {
            cell.innerText = "";
        }
    }
}

// recieves the number of lines and columns and creates the table
// adds an event listener on each cell, letting the player mine
function createTable(tableSize) {
    level.style.display = "none";
    document.body.style.backgroundColor = "black";
    for (let i = 0; i < tableSize; ++i) {
        let row = document.createElement("tr");
        for (let j = 0; j < tableSize; ++j) {
            let cell = document.createElement("td");
            row.appendChild(cell);
            cell.addEventListener('mousedown', event => completeBoard(event, cell));
        }
        table.appendChild(row);
    }
    createMatrix(tableSize);
    plantBombs(tableSize);
    getDistanceBomb(tableSize);
}

// hiding the buttons and displaying the grid
function displayMenu() {
    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "visible";
}

// calculate the numbers of bombs around each cell
function getDistanceBomb(tableSize) {
    for (let i = 0; i < tableSize; ++i) {
        for (let j = 0; j < tableSize; ++j) {
            if (board[i][j] != "bomb") {
                if (i > 0 && board[i - 1][j] == "bomb") {
                    ++board[i][j];
                }
                if (i < tableSize - 1 && board[i + 1][j] == "bomb") {
                    ++board[i][j];
                }
                if (j > 0 && board[i][j - 1] == "bomb") {
                    ++board[i][j];
                }
                if (j < tableSize - 1 && board[i][j + 1] == "bomb") {
                    ++board[i][j];
                }
                if (i > 0 && j < tableSize - 1 && board[i - 1][j + 1] == "bomb") {
                    ++board[i][j];
                }
                if (j < tableSize - 1 && i < tableSize - 1 && board[i + 1][j + 1] == "bomb") {
                    ++board[i][j];
                }
                if (j > 0 && i < tableSize - 1 && board[i + 1][j - 1] == "bomb") {
                    ++board[i][j];
                }
                if (i > 0 && j < tableSize - 1 && board[i - 1][j - 1] == "bomb") {
                    ++board[i][j];
                }
            } 
        }
    }
}

// plants the bombs in the grid in random positions
function plantBombs(noBombs) {
    for (let i = 0; i < noBombs; ++i) {
        board[randomCell(noBombs - 1)][randomCell(noBombs - 1)] = "bomb";
    }
}

// returns a random value within a range
function randomCell(max) {
    return Math.round(max * Math.random());
}

// creating the countdown timer depending on the duration(number of minutes)
// display the counter in the proper div
function startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds;
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}