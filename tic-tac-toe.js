// /**
//  * Tic Tac Toe
//  *
//  * @author: Sarthak Gupta 
//  */
// const N_SIZE = 3;
// const EMPTY = '';
// let boxes = [];
// let turn = 'X';
// let score;
// let moves;
// let gameOver = false;

// function init() {
//     const board = document.createElement('table');
//     board.setAttribute('border', 1);
//     board.setAttribute('cellspacing', 0);

//     let identifier = 1;
//     for (let i = 0; i < N_SIZE; i++) {
//         const row = document.createElement('tr');
//         board.appendChild(row);
//         for (let j = 0; j < N_SIZE; j++) {
//             const cell = document.createElement('td');
//             cell.setAttribute('height', 120);
//             cell.setAttribute('width', 120);
//             cell.setAttribute('align', 'center');
//             cell.setAttribute('valign', 'center');
//             cell.classList.add('col' + j, 'row' + i);
//             if (i === j) {
//                 cell.classList.add('diagonal0');
//             }
//             if (j === N_SIZE - i - 1) {
//                 cell.classList.add('diagonal1');
//             }
//             cell.identifier = identifier;
//             cell.addEventListener('click', set);
//             row.appendChild(cell);
//             boxes.push(cell);
//             identifier +=1;
//         }
//     }

//     document.getElementById('tictactoe').appendChild(board);
//     startNewGame();
// }

// function startNewGame() {
//     score = { 'X': 0, 'O': 0 };
//     moves = 0;
//     gameOver = false;
//     turn = 'X';
//     boxes.forEach(square => {
//         square.innerHTML = EMPTY;
//         square.classList.remove('x', 'o', 'win');
//     });
//     document.getElementById('turn').textContent = 'Player ' + turn;
// }


// function win(clicked) {
//     const memberOf = clicked.className.split(/\s+/);
//     for (const className of memberOf) {
//         const testClass = '.' + className;
//         const items = contains('#tictactoe ' + testClass, turn);
//         if (items.length === N_SIZE) {
//             items.forEach(item => item.classList.add('win'));
//             return true;
//         }
//     }
//     return false;
// }

// function contains(selector, text) {
//     const elements = document.querySelectorAll(selector);
//     return Array.from(elements).filter(element => RegExp(text).test(element.textContent));
// }

// function set() {
//     if (gameOver || this.innerHTML !== EMPTY) {
//         return;
//     }
//     this.innerHTML = turn;
//     this.classList.add(turn.toLowerCase());
//     moves += 1;
//     score[turn] += this.identifier;
//     if (win(this)) {
//         alert('Winner: Player ' + turn);
//         gameOver = true;
//         setTimeout(startNewGame, 500); // allows animation or UI to update
//     } else if (moves === N_SIZE * N_SIZE) {
//         alert('Draw');
//         gameOver = true;
//         setTimeout(startNewGame, 500);
//     } else {
//         turn = turn === 'X' ? 'O' : 'X';
//         document.getElementById('turn').textContent = 'Player ' + turn;
//     }
// }

// init();

// document.getElementById('theme-switch').addEventListener('change', function() {
//     document.body.classList.toggle('dark', this.checked);
// });


/**
 * Tic Tac Toe
 * Author: Sarthak Gupta
 */

const N_SIZE = 3;
const EMPTY  = '';
let boxes    = [];
let turn     = 'X';
let moves;
let gameOver = false;

function init () {
    const board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    let id = 1;
    for (let i = 0; i < N_SIZE; i++) {
        const row = document.createElement('tr');
        board.appendChild(row);

        for (let j = 0; j < N_SIZE; j++) {
            const cell = document.createElement('td');
            cell.setAttribute('height', 120);
            cell.setAttribute('width', 120);
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');

            // structural classes
            cell.classList.add(`col${j}`, `row${i}`);
            if (i === j)                cell.classList.add('diagonal0');
            if (j === N_SIZE - i - 1)   cell.classList.add('diagonal1');

            cell.identifier = id++;
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
        }
    }

    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

function startNewGame () {
    moves    = 0;
    gameOver = false;
    turn     = 'X';

    boxes.forEach(square => {
        square.innerHTML = EMPTY;
        square.classList.remove('x', 'o', 'win');
    });

    document.getElementById('turn').textContent = `Player ${turn}`;
}

function win (clicked) {
    // Only evaluate structural classes
    const lines = clicked.className.split(/\s+/)
                     .filter(c => c.startsWith('row') ||
                                   c.startsWith('col') ||
                                   c.startsWith('diagonal'));

    for (const line of lines) {
        const cells = contains(`#tictactoe .${line}`, turn);
        if (cells.length === N_SIZE) {
            cells.forEach(c => c.classList.add('win'));
            return true;
        }
    }
    return false;
}

function contains (selector, mark) {
    return Array.from(document.querySelectorAll(selector))
           .filter(el => el.textContent.trim() === mark);
}

function set () {
    if (gameOver || this.innerHTML !== EMPTY) return;

    this.innerHTML = turn;
    this.classList.add(turn.toLowerCase());
    moves++;

    if (win(this)) {
        alert(`Winner: Player ${turn}`);
        gameOver = true;
        setTimeout(startNewGame, 500);
    } else if (moves === N_SIZE * N_SIZE) {
        alert('Draw');
        gameOver = true;
        setTimeout(startNewGame, 500);
    } else {
        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById('turn').textContent = `Player ${turn}`;
    }
}

// Initialise after DOM is ready
document.addEventListener('DOMContentLoaded', init);

// Dark / light theme toggle
document.getElementById('theme-switch')
        .addEventListener('change', e =>
            document.body.classList.toggle('dark', e.target.checked)
        );
