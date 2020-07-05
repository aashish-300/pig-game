/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let hold = true;
let roll = true;
var roundScore = 0;
var activePlayer = 0;
var scores = [0, 0];

init();


//roll button configuration
    document.querySelector('.btn-roll').addEventListener('click', () => {
        if (roll === true) {
            let dice = Math.floor(Math.random() * 6) + 1;
            
            if (dice !== 1) {
                var img = document.querySelector('.dice');
                img.style.display = 'block';
                img.src = 'dice-' + dice + '.png';

                let current = document.getElementById('current-' + activePlayer);
                roundScore += dice;
                current.textContent = roundScore;
        
            }
            else {
                nextPlayer();
            }            
        };
    
    });

    //hold button configuration
    document.querySelector('.btn-hold').addEventListener('click', () => {
        if (hold) {
            scores[activePlayer] += roundScore;
            document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
       
            if (scores[activePlayer] >= 10) {
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
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    roundScore = 0;
    activePlayer = 0;
    scores = [0, 0];  
}