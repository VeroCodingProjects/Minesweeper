let board = [];
let directionLine = [-1, 0, 1, 0];
let directionColumn = [0, 1, 0, -1];
let directionPrincipal = [1, 1, -1, -1];
let directionSecundary = [1 , -1, -1, 1];
let endGameStatus = false;
let timeExpired = false;
let minedCell = 0;

// by clicking on any of the buttons corresponding to the chosen level, 
// the minesweeper board will be displayed, as well as the time left to solve the game
easy.addEventListener("click", () => {
    createTable(10);
    displayMenu();
    startTimer(300, countdown);
    bombs.innerText = 20;
});

medium.addEventListener("click", () => {
    createTable(15);
    displayMenu();
    startTimer(900, countdown);
    bombs.innerText = 30;
});

extreme.addEventListener("click", () => {
    createTable(20);
    displayMenu();
    startTimer(1200, countdown);
    bombs.innerText = 40;
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

// if clicking on a bomb, all bombs in the field will be explosed
function bombExplosion(tableSize) {
    for (let i = 0; i < tableSize; ++i) {
        for (let j = 0; j < tableSize; ++j) {
            if (board[i][j] == 'bomb') {
                document.getElementById(i + " " + j).innerText = "💣";
            }
        }
    }
}

// for each click, the board will be verified 
// in order to determine if it was correct completed
// after that, it is determined the status of the game
function checkBoard(tableSize) {
    if (bombs.innerText == 0) {
        statusGame(tableSize);
    }
}

// adds a flag if clicking the left button of the mouse
// if a bomb is mined, the field will explode
// updated the status of the game
function completeBoard(event, cell, line, column, tableSize) {
    if (event.button == 0 && endGameStatus == false) {
        if (board[line][column] == 'bomb' && cell.innerText != "🚩") {
            bombExplosion(tableSize);
            endGameStatus = true;
            statusGame(tableSize);
        } else {
            mineField(line, column, tableSize);
        }
    } else if (event.button == 2 && board[line][column] != 'mined' && endGameStatus == false) {
        if (cell.innerText == "") {
            cell.innerText = "🚩";
            --bombs.innerText;
        } else {
            cell.innerText = "";
            ++bombs.innerText;
        }
    }
    if (minedCell == tableSize * tableSize - tableSize * 2) {
        checkBoard(tableSize);
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
            cell.id = i + " " + j;
            row.appendChild(cell);
            cell.addEventListener('mousedown', event => completeBoard(event, cell, i, j, tableSize));
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

// marks each cell that is mined
function markMinedCell(cell, line, column) {
    cell.style.backgroundColor = 'white';
    board[line][column] = 'mined';
}

// by clicking on a cell, the mine will open according to the rules
// of the game
function mineField(line, column, tableSize) {
    let currentCell = document.getElementById(line + " " + column);
    if (line > tableSize - 1 || column > tableSize - 1 || line < 0 || column < 0 || currentCell.innerText == "🚩") {
        return;
    }
    if (board[line][column] >= 1) {
        currentCell.innerText = board[line][column];
        markMinedCell(currentCell, line, column);
        ++minedCell;
        return;
    }
    if (board[line][column] == 0) {
        ++minedCell;
        for (let i = 0; i < 4; ++i) {
            markMinedCell(currentCell, line, column);
            mineField(line + directionLine[i], column + directionColumn[i], tableSize);
            mineField(line + directionPrincipal[i], column + directionSecundary[i], tableSize);
        }
    }
}

// plants the bombs in the grid in random positions
function plantBombs(noBombs) {
    for (let i = 0; i < noBombs * 2; ++i) {
        let randomLine = randomCell(noBombs - 1);
        let randomColumn = randomCell(noBombs - 1);
        while (board[randomLine][randomColumn] == "bomb") {
            randomLine = randomCell(noBombs - 1);
            randomColumn = randomCell(noBombs - 1);
        }
        board[randomLine][randomColumn] = "bomb";
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
            timeExpired = true;
            statusGame();
        }
    }, 1000);
}

// determine if the game is won or lost
function statusGame(tableSize) {
    if (endGameStatus == true || timeExpired == true) {
        timer.innerText = 'You lost ☹';
        bomb.style.display = 'none';
        endGameStatus = true;
    }
    if (minedCell == tableSize * tableSize - tableSize * 2 && bombs.innerText == 0) {
        timer.innerText = 'You won 😊';
        bomb.style.display = 'none';
        endGameStatus = true;
    }
}