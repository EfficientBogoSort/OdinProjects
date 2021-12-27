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
    document.getElementById("score-box").innerHTML = `${playerScore} - ${compScore}`;
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
        changeAnnoncer(`You Win! ${choice} beats ${compChoice}`);
    } else if (winner === 0){
        compScore++;
        changeAnnoncer(`You Lose! ${compChoice} beats ${choice}`);
    } else if (winner === -1){
        document.getElementById("announcer").innerHTML = "It's a Draw";
    } else{
        document.getElementById("announcer").innerHTML = winner;
    }
    setScores();
    if (playerScore > 4 || compScore > 4){
        finished = true;
        if (playerScore > 4){
            changeAnnoncer("You have won the match! Congratulations");
        } else{
            changeAnnoncer("You have lost the match. Better luck next time");
        }
        document.getElementById("restart-button").innerHTML = "Play Again";
        return;
    }
}

function showChoice(player, choice){
    document.getElementById(player).innerHTML = choice;
}

function changeAnnoncer(msg){
    document.getElementById("announcer").innerHTML = msg;
}

function restartGame(){
    playerScore = 0;
    compScore = 0;
    setInitialMsg();
    setScores();
    finished = false;
    document.getElementById("restart-button").innerHTML = "Restart Game";
}

function setInitialMsg(){
    changeAnnoncer("Choose your hand by clicking one of the three buttons at the bottom");
}
window.onload = restartGame(); 