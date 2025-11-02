const square = document.querySelectorAll('.square');
const gamestatus = document.querySelector('.gamestatus');
const reset = document.querySelector('#reset');
const winconditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]
let options = ["", "", "", "", "", "", "", "", ""];
let currentplayer = "x";
let running = false;

startgame();

function startgame() {
    square.forEach(square => {
        square.addEventListener('click', cellclicked); });
    gamestatus.textContent = `${currentplayer}'s turn`;
    reset.addEventListener('click', resetgame);
    running = true;
    
}
function  cellclicked(){
    const index = this.getAttribute("index");
     if (options[index] !== '' || !running){
        return;
     }
    
    updategame(this, index);
    checkwinner();
    
}
   

function changeplayer() {
    currentplayer = currentplayer === "x" ? "o" : "x";
    gamestatus.textContent = `${currentplayer}'s turn`;
}
function updategame(square,index) {
    options[index] = currentplayer;
    square.textContent = currentplayer;
    
}
function checkwinner() {
    let roundwon = false;
    for (let i = 0; i < winconditions.length; i++) {
        const condition = winconditions[i];
        const a = options[condition[0]];
        const b = options[condition[1]];
        const c = options[condition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundwon = true;
            break;
        }
    }
    if (roundwon) {
        gamestatus.textContent = `${currentplayer} wins!`;
        running = false;
    } else if (!options.includes('')) {
        gamestatus.textContent = `Draw!`;
        running = false;
    }
    else{
        changeplayer();    }
}

function resetgame() {
    currentplayer = "x";
    options = ["", "", "", "", "", "", "", "", ""]; 
    gamestatus.textContent = `${currentplayer}'s turn`;
    square.forEach(square => {
        square.textContent = "";
    });
    running = true;
    
}

