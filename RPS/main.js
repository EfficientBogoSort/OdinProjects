const announcer = document.getElementById("announcer");
const restart_button = document.getElementById("restart-button");
const options = document.getElementById("options");



function computerPlay(){
    let max = 2, min = 0;
    let possiblePlays = ["Rock", "Paper", "Scissors"];
    return possiblePlays[Math.floor(Math.random() * (max - min + 1) + min)];
}
function decideWinner(playerSelection, computerSelection){
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection === computerSelection){
        return -1;
    }
    let outcomes = {
        "scissors,paper": 1,
        "scissors,rock": 0,
        "paper,rock": 1,
        "paper,scissors": 0,
        "rock,paper": 0,
        "rock,scissors": 1
    };
    let play = `${playerSelection},${computerSelection}`;
    if (play in outcomes){
        return outcomes[play];
    }
    return "Invalid game";
}

let finished = false;
function capitaliseFirst(word){
    return word.charAt(0).toUpperCase()+word.slice(1);
}

let playerScore = 0, compScore = 0;

function setScores(){
    document.getElementById("score-box").textContent = `${playerScore} - ${compScore}`;
}

for (let i = 0; i < options.children.length; ++i){
    const child = options.children[i];
    child.addEventListener('click', function(){
        makePlay(this.textContent);
    });
}
function makePlay(choice){
    if (finished){
        return;
    }

    showChoice('player-choice', choice);
    let compChoice = computerPlay();
    showChoice('computer-choice', compChoice);
    let winner = decideWinner(choice, compChoice);
    if (winner === 1){
        playerScore++;
        announcer.textContent = `You Win! ${choice} beats ${compChoice}`;
    } else if (winner === 0){
        compScore++;
        announcer.textContent = `You Lose! ${compChoice} beats ${choice}`;
    } else if (winner === -1){
        announcer.textContent = "It's a Draw";
    } else{
        announcer.textContent = winner;
    }
    setScores();
    if (playerScore > 4 || compScore > 4){
        finished = true;
        if (playerScore > 4){
            announcer.textContent = "You have won the match! Congratulations";
        } else{
            announcer.textContent = "You have lost the match. Better luck next time";
        }
        restart_button.textContent = "Play Again";
        return;
    }
}

function showChoice(player, choice){
    document.getElementById(player).textContent = choice;
}

function restartGame(){
    playerScore = 0;
    compScore = 0;
    announcer.textContent = "Choose your hand by clicking one of the three buttons at the bottom";
    setScores();
    finished = false;
    restart_button.textContent = "Restart Game";
}

window.onload = restartGame(); 