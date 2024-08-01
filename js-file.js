const choices = document.querySelectorAll(".obj");
const result = document.querySelector(".result");
const aiPlayer = document.querySelector(".ai.player");
const aiChoices = aiPlayer.querySelector(".choice");
const userPlayer = document.querySelector(".user.player");

const restartDIV = document.querySelector(".restart.hide")
const endText = document.querySelector(".end-text")
const restartButton = document.querySelector(".restart-button");
let aiChoice;
let objName;
let computerPick;
let outcome; 
let outcomeString;
let userWins;
let aiWins;
let aiDecisions= [];
let recentClick = false;

const aiPaper = aiChoices.querySelector(".paper");
const aiRock = aiChoices.querySelector(".rock");
const aiScissor = aiChoices.querySelector(".paper");

const userPaper = userPlayer.querySelector(".paper");
const userRock = userPlayer.querySelector(".rock");
const userScissor = userPlayer.querySelector(".paper");

function getComputerChoice(){
    // randomly generate rock, paper or scissors

    let randomNum = Math.random();
    if (randomNum < .33333333333333){
        return "scissor";
    }
    if (randomNum < .6666666666666){
        return "rock";
    }
    return "paper";
}
function decideWinner(person, computer){
    // TIE
    if(person == computer){ 
        return 0;
    }

    // USER LOSES
    if( ((person == "scissor") && (computer == "rock")) || ((person == "rock")&& (computer == "paper")) || ((person == "paper")&&(computer == "scissor"))){
        return -1
        
    }

    // OTHERWISE WIN
    return 1
}
function updateCount (playerName){
    let playerTag = "."+ playerName
    node = document.querySelector(playerTag + ".score-count");
    let winCount = Number(node.innerHTML);
    // increment (player OR COMPUTER) Wins by 1
    winCount+=1;
    node.innerHTML = winCount;



    return winCount;
}

restartButton.addEventListener("click", () =>{ 
    //Restart Button click

    restartButton.setAttribute("style","background-color: hsl(0, 0%, 39%);" );
    // Change Color to Gray when clicked
    setTimeout(function(){
        restartButton.setAttribute("style","background-color: hsl(0, 0%, 100%)" );
        // Change Color back to white

        result.textContent = "";
        document.querySelector(".ai" + ".score-count").innerHTML = 0;
        document.querySelector(".user" + ".score-count").innerHTML = 0;
        //clear score board

        aiPaper.setAttribute("style", "background-color:black");
        aiRock.setAttribute("style", "background-color:black");
        aiScissor.setAttribute("style", "background-color:black");
        //clear ai red borders

        userPaper.setAttribute("style", "background-color:black");
        userRock.setAttribute("style", "background-color:black");
        userScissor.setAttribute("style", "background-color:black");
        //clear user red borders


        userWins = 0;
        aiWins =0;
        //reset Wins


        restartDIV.classList.toggle("hide");
        //Remove restart Screen
        recentClick = false;


    }, 100);
    // wait 100ms before switching button back to white



});
for (const choice of choices){

    choice.addEventListener("click", () => {
        if (recentClick == false){
            //checks if user has clicked before
            recentClick = true;
            // user 
            choice.setAttribute("style", "border: solid red;");
            // highlight border of decision

            const element = choice.getAttribute("class")
            objName = ""
            for (const letter of element){
                if (letter == " "){
                    break;
                }
                objName+=letter
            }
            // figure out which object the user picked

            computerPick = getComputerChoice();
            let computerTag = "." + computerPick;
            aiChoice = aiChoices.querySelector("."+computerPick);
            aiChoice.setAttribute("style", "border:solid red;");
            aiDecisions.push(computerTag);
            // generate computer rock/paper/scissor, highlight red
            // save the choice to later highlight black

            outcome = decideWinner(objName, computerPick);
            if (outcome == 0){
                outcomeString = "DRAW";
            }
            else if(outcome == 1){
                outcomeString ="WIN";
                userWins = updateCount('user');

                // increment userWins
            }
            else{
                outcomeString = "LOSE";
                aiWins = updateCount('ai');
                // increment aiWins
            }
            // figure out who wins and update counters


            result.textContent = outcomeString;
            // string to display outcome


            setTimeout(function(){

                setTimeout(function(){
                    recentClick = false;
                },50);
                // delays time for user to click again until everything is FULLY executed
                result.textContent = "";
                choice.setAttribute("style", "border-color:black;");
                // reset user border to black
                let item;
                if (aiDecisions.length!=0){
                    item = aiDecisions.pop();
                    aiChoices.querySelector(item).setAttribute("style", "border-color:black;");

        
                }
                // reset the computers border

                
            }, 250);

            if (userWins >= 5){
                setTimeout(function(){
                    result.textContent =  "";
                    restartDIV.classList.toggle("hide");
                    endText.textContent = "YOU HAVE WON";

                },100);

            }
            // display win, emerge endScreen
            else if (aiWins >= 5){
                setTimeout(function(){
                result.textContent = "";
                restartDIV.classList.toggle("hide");
                endText.textContent = "YOU HAVE LOST";
                },100);
            }
            //display loss, emerge endscreen
        }
    });    

}

