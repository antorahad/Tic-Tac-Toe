let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

//Winning Combination Array
let WinningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6]
];

//Player 'X' plays first
let xTurn = true;
let count = 0;

//Disable buttons
const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));

    //Show popup
    popupRef.classList.remove("hide");
};

//Enable buttons (new game & restart)
const enableButtons = () => {
    btnRef.forEach(element => {
        element.innerText = "";
        element.disabled = false;
    })

    //Hide popup
    popupRef.classList.add("hide");
};


//The function will execute when a player win the game
const winFunction = (letter) => {
    disableButtons();
    if (letter == "X"){
        msgRef.innerHTML = "&#x1F3C6; <br> 'X' Wins";
    }
    else{
        msgRef.innerHTML = "&#x1F3C6; <br> 'O' Wins";
    }
};


//draw function
const drawFunction = () => {
    disableButtons();
    msgRef.innerHTML = "&#x1F38C; <br> It's a draw";
}


//New game
newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});


//win method
const winChecker = () => {

    //loop through all wining combination
    for (let i of WinningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText
        ];

        //Check if boxes are filled (if 3 elements are same and win as)
        if (element1 != "" && element2 != "" & element3 != "") {
            if (element1 == element2 && element2 == element3) {

                //if 3 buttons are same then pass the value to winFunction 
                winFunction(element1)
            }
        }
    }
};


//Display X/O onclick
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;

            //Display X
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;

            //Dispaly O

            element.innerText = "O";
            element.disabled = true;
        }

        //Increament count on each click 
        count += 1;
        if (count == 9) {
            drawFunction();
        }

        //Check for win on every click
        winChecker();
    });
});

//Enable buttons and disable popup on page load
window.onload = enableButtons;
