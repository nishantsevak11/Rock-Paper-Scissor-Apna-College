let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const User = document.querySelector("#User");
const Comp = document.querySelector("#Comp");
const msg = document.querySelector("#msg");

const drawGame = () => {
    console.log("Game was draw");
    msg.innerText = "Game was Draw, Play Again!";
    msg.style.backgroundColor = "#081B31";
}

const genCompChoice = () => {
    // rock, paper, scissors
    const options = ["rock", "paper", "scissors"];
    const randidx = Math.floor(Math.random() * 3);
    return options[randidx];
}

const showWinnner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        User.innerText = userScore;
        console.log("You Win");
        msg.innerText = `You Win! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        Comp.innerText = compScore;
        console.log("Comp Win");
        msg.innerText = `You lose! ${compChoice} beats Your ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
}

const playGame = (userChoice) => {
    console.log("Choice was clicked ", userChoice);
    const compChoice = genCompChoice();
    console.log("Computer choice ", compChoice);

    // Apply 'selected' class to the user's choice
    const userSelectedElement = document.querySelector(`#${userChoice}`);
    userSelectedElement.classList.add('selected');

    // Apply 'selected' class to the computer's choice
    const compSelectedElement = document.querySelector(`#${compChoice}`);
    compSelectedElement.classList.add('selected');

    // Determine the result
    if (userChoice === compChoice) {
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            userWin = compChoice === "scissors" ? false : true;
        } else {
            userWin = compChoice === "rock" ? false : true;
        }
        showWinnner(userWin, userChoice, compChoice);
    }

    // Remove 'selected' class after animation ends
    setTimeout(() => {
        userSelectedElement.classList.remove('selected');
        userSelectedElement.classList.add('reset');
        compSelectedElement.classList.remove('selected');
        compSelectedElement.classList.add('reset');
        
        // Remove the reset class after the animation so it can be reused
        setTimeout(() => {
            userSelectedElement.classList.remove('reset');
            compSelectedElement.classList.remove('reset');
        }, 400);
    }, 1000); // Delay to let the transition complete
}

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});
