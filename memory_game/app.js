var starterdiv = document.querySelector('div#starter button');
var result = document.getElementById('result');
var resultdiv = document.getElementById('resultdiv');
var grid = document.getElementById('grid');

grid.style.display = "none";
starterdiv.addEventListener('click', start);

function start() {
    starterdiv.remove();
    grid.style.display = "";
}

const cardArray = [
    {name: 'fries', img: 'img/fries.png'},
    {name: 'cheeseburger', img: 'img/cheeseburger.png'},
    {name: 'ice-cream', img: 'img/ice-cream.png'},
    {name: 'pizza', img: 'img/pizza.png'},
    {name: 'milkshake', img: 'img/milkshake.png'},
    {name: 'hotdog', img: 'img/hotdog.png'},
    {name: 'fries', img: 'img/fries.png'},
    {name: 'cheeseburger', img: 'img/cheeseburger.png'},
    {name: 'ice-cream', img: 'img/ice-cream.png'},
    {name: 'pizza', img: 'img/pizza.png'},
    {name: 'milkshake', img: 'img/milkshake.png'},
    {name: 'hotdog', img: 'img/hotdog.png'}
]

cardArray.sort(() => 0.5 - Math.random());
cardsChosen = []
cardsChosenId = []
cardsWon = []

function createGrid() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img');
        card.setAttribute('src', 'img/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipcard);
        grid.appendChild(card);
    }
}

function ReloadGame() {
    cardsWon = []
    result.innerText = "";
    this.remove();
    createGrid();
}

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');
    let Choice1 = cardsChosenId[0];
    let Choice2 = cardsChosenId[1];

    if (cardsChosen.length > 2) {
        for (let i = 0; i < cardsChosen.length; i++)
            cards[cardsChosenId[i]].setAttribute('src', 'img/blank.png')
    }
    else {
        if (Choice1 == Choice2) {
            cards[Choice1].setAttribute('src', 'img/blank.png')
            cards[Choice2].setAttribute('src', 'img/blank.png')
            result.innerHTML = "You have clicked the same image!";
            result.style.color = "yellow";
        }
        else if (cardsChosen[0] === cardsChosen[1]) {
            result.innerHTML = "Match Found";
            result.style.color = "green";
            cards[Choice1].setAttribute('src', 'img/white.png');
            cards[Choice2].setAttribute('src', 'img/white.png');
            cards[Choice1].removeEventListener('click', flipcard);
            cards[Choice2].removeEventListener('click', flipcard);
            cardsWon.push(cardsChosen);
        }
        else {
            cards[Choice1].setAttribute('src', 'img/blank.png');
            cards[Choice2].setAttribute('src', 'img/blank.png');
            result.innerHTML = "Try Again";
            result.style.color = "red";
        }

        if (cardsWon.length === cardArray.length / 2) {
            grid.innerHTML = "";
            result.innerHTML = "Congrats! You Won the Match";
            const restartBtn = document.createElement('button');
            restartBtn.innerText = "Restart Game";
            restartBtn.classList = "btn btn-info";
            restartBtn.addEventListener('click', ReloadGame);
            resultdiv.appendChild(restartBtn);
        }
    }
    cardsChosen = []
    cardsChosenId = []
}

function flipcard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2)
        setTimeout(checkMatch, 500);
}

createGrid();
