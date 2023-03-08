let easyBoard = 10;
let mediumBoard = 15;
let extremeBoard = 20;

// recieves the number of lines and columns and creates the table
// hides the fisrt page and displays the second one
// by clicking on any of the buttons corresponding to the chosen level, 
// the minesweeper board will be displayed, as well as the time left to solve the game
// and the number of bombs placed
easy.addEventListener("click", () => {
    createTable(easyBoard);
    displayMenu();
    startTimer((easyBoard - 5) * 60, countdown);
});
medium.addEventListener("click", () => {
    createTable(mediumBoard);
    displayMenu();
    startTimer((mediumBoard - 5) * 60, countdown);
});
extreme.addEventListener("click", () => {
    createTable(extremeBoard);
    displayMenu();
    startTimer((extremeBoard - 5) * 60, countdown);
});

// by clicking the reset button, the user will be redirected to the main page
reset.onclick = () => {
    window.location.reload();
}

// adds a flag if clicking the left button of the mouse
// console log the indices of the cells if clicking the right button of the mouse
function completeBoard(event, cell, i, j) {
    cell.id = 'uncompleted';
    if (event.button == 0) {
        console.log(i , j);
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
function createTable(n) {
    level.style.display = "none";
    document.body.style.backgroundColor = "black";
    for (let i = 0; i < n; ++i) {
        let row = document.createElement("tr");
        for (let j = 0; j < n; ++j) {
            let cell = document.createElement("td");
            cell.addEventListener('mousedown', event => completeBoard(event, cell, i, j));
            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// hiding the buttons and displaying the grid
function displayMenu() {
    document.getElementById("menu").style.visibility = "visible";
    document.getElementById("timer").style.visibility = "visible";
}

// creating the countdown timer depending on the duration (number of minutes)
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