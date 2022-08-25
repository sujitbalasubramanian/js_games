let my_scoredisp = document.getElementById('my_score');
let computer_scoredisp = document.getElementById('computer_score');
let resultdisp = document.getElementById('result');
let userchoicedisp = document.getElementById('userchoice');
let computerchoicedisp = document.getElementById('computerchoice');
let choices = document.querySelectorAll('button');

choices.forEach(choice => choice.addEventListener('click', element => {
    document.getElementById('imgbanner').innerHTML = "";
    const userchoice = element.target.id;
    let my_score = Number(my_scoredisp.innerText), comp_score = Number(computer_scoredisp.innerText);
    userchoicedisp.src = "./img/" + userchoice + ".svg";
    const computer_choice = gen_computerchoice();
    computerchoicedisp.src = "./img/" + computer_choice + ".svg";
    userchoicedisp.height = computerchoicedisp.height = 150;
    const result = getresult(userchoice, computer_choice, my_score, comp_score);
    resultdisp.innerHTML = result['message'];
    resultdisp.style.color = result['color'];
    computer_scoredisp.innerHTML = result['comp_score'];
    my_scoredisp.innerHTML = result['my_score'];
}));

function gen_computerchoice() {
    let rnd_num = Math.floor(Math.random() * 3);
    return ['rock', 'paper', 'scissor'][rnd_num];
}

function getresult(userchoice, computer_choice, my_score, comp_score) {

    let decide = {
        'rock': {'scissor': 1, 'rock': 0, 'paper': -1},
        'paper': {'rock': 1, 'paper': 0, 'scissor': -1},
        'scissor': {'paper': 1, 'scissor': 0, 'rock': -1}
    }
    let your_score = decide[userchoice][computer_choice];

    if (your_score === 0)
        return {'message': "Match Draw", 'color': 'yellow', 'my_score': my_score, 'comp_score': comp_score}
    else if (your_score === 1)
        return {'message': "You Won", 'color': 'green', 'my_score': ++my_score, 'comp_score': comp_score}
    else if (your_score === -1)
        return {'message': "You Lose", 'color': 'red', 'my_score': my_score, 'comp_score': ++comp_score}
}
