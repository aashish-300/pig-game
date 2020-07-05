/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
(Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
(Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/


let hold = true;
let roll = true;
var roundScore = 0;
var activePlayer = 0;
var scores = [0, 0];
var lastscore;
init();

var winingscore = prompt('set your winnning score');

//roll button configuration
    document.querySelector('.btn-roll').addEventListener('click', () => {
        if (roll === true) {
            let dice = Math.floor(Math.random() * 6) + 1;
            let dices = Math.floor(Math.random() * 6) + 1;
            console.log(dice);
            console.log(dices);
            if (dice === 6 && lastscore === 6) {
                lastscore = 0;
                console.log(dice);                
                console.log(lastscore);
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]; 
                nextPlayer();
            }
            else if (dice !== 1 || dices !== 1) {
                var img = document.querySelector('.dice');
                img.style.display = 'block';
                img.src = 'dice-' + dice + '.png';
                 
                var imgs = document.querySelector('.dices');
                imgs.style.display = 'block';
                imgs.src = 'dice-' + dices + '.png';

                let current = document.getElementById('current-' + activePlayer);
                roundScore += dice + dices;
                current.textContent = roundScore;
        
            }
            else {
                nextPlayer();
            }            
            lastscore = dice;
        };
    
    });

    //hold button configuration
    document.querySelector('.btn-hold').addEventListener('click', () => {
        if (hold === true) {
            scores[activePlayer] += roundScore;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
       
            if (scores[activePlayer] >= `${winingscore}`) {
                document.getElementById('name-' + activePlayer).textContent = 'YOU WON!';                
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
                document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
                roll = false;
                hold = false;
                // console.log(activePlayer);
            } else {
                nextPlayer();
            }
        };
    })

function nextPlayer() {
     roundScore = 0;
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dices').style.display = 'none';
        document.querySelector('#current-0').textContent = 0;
        document.querySelector('#current-1').textContent = 0;

        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

};

//New game button configuration

document.querySelector('.btn-new').addEventListener('click', () => {
    roll = true;
    hold = true;
    newgame();
});

function newgame() {
player = activePlayer + 1;
document.querySelector('#name-'+activePlayer).innerHTML = 'Player' + ' ' + player;
    init();
}

function init() {
  
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dices').style.display = 'none';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    roundScore = 0;
    activePlayer = 0;
    scores = [0, 0];  
}