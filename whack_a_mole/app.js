const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const timeleft = document.querySelector('.timeleft');
const score = document.querySelector('.score');
const godiv = document.querySelector('.game-over');

let currentTime = prompt("Enter Time : ");
let speed = prompt("Enter speed : ");
speed *= 100;
let result = 0;
let hitPosition = null;
let timerID = null;
let countDownTimerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    })

    let randomPosition = squares[Math.floor(Math.random() * 9)];
    randomPosition.classList.add('mole');
    hitPosition = randomPosition.id;
}

function moveMole() {
    timerID = setInterval(randomSquare, speed);
}

squares.forEach(square =>
    square.addEventListener('mousedown', () => {
        console.log(hitPosition)
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
)

function countDown() {
    currentTime--;
    timeleft.textContent = currentTime + 's';

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerID);
        const go_para = document.createElement('p');
        go_para.textContent = "Time Over! Your Score is " + result;
        godiv.appendChild(go_para);
        const restartBtn = document.createElement('button');
        restartBtn.innerText = "Restart Game";
        restartBtn.addEventListener('click', () => window.location.reload());
        godiv.appendChild(restartBtn);
    }
}

function Start() {
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
}

if (speed != null && currentTime > 0) {
    Start();
}
else {
    const go_para = document.createElement('p');
    go_para.textContent = "Please Give Valid Input";
    godiv.appendChild(go_para);
    const restartBtn = document.createElement('button');
    restartBtn.innerText = "Restart Game";
    restartBtn.addEventListener('click', () => window.location.reload());
    godiv.appendChild(restartBtn);

}
