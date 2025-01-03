let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector('#reset-button');
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        console.log("box was clicked");
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#b0413e";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "green";
            turnO = true;
        }
        box.disabled = true;
        checkWinner();
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns) {
        // console.log(pattern[0], pattern[1], pattern[2]);
        // console.log(boxes[pattern[0]].innerText,boxes[pattern[1]].innerText,boxes[pattern[2]].innerText);
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // console.log("winner",pos1Val);
                boxes[pattern[0]].classList.add("winner");
                boxes[pattern[1]].classList.add("winner");
                boxes[pattern[2]].classList.add("winner");

                // Add specific classes for horizontal, vertical, or diagonal lines
                if ((pattern[0] === 0 && pattern[1] === 1 && pattern[2] === 2) ||
                    (pattern[0] === 3 && pattern[1] === 4 && pattern[2] === 5) ||
                    (pattern[0] === 6 && pattern[1] === 7 && pattern[2] === 8)) {
                    boxes[pattern[0]].classList.add("horizontal");
                    boxes[pattern[1]].classList.add("horizontal");
                    boxes[pattern[2]].classList.add("horizontal");
                } else if (pattern[0] + 3 === pattern[1] && pattern[1] + 3 === pattern[2]) {
                    boxes[pattern[0]].classList.add("vertical");
                    boxes[pattern[1]].classList.add("vertical");
                    boxes[pattern[2]].classList.add("vertical");
                } else if (pattern[0] === 0 && pattern[1] === 4 && pattern[2] === 8) {
                    boxes[pattern[0]].classList.add("diagonal-right");
                    boxes[pattern[1]].classList.add("diagonal-right");
                    boxes[pattern[2]].classList.add("diagonal-right");
                } else if (pattern[0] === 2 && pattern[1] === 4 && pattern[2] === 6) {
                    boxes[pattern[0]].classList.add("diagonal-left");
                    boxes[pattern[1]].classList.add("diagonal-left");
                    boxes[pattern[2]].classList.add("diagonal-left");
                }
                showWinner(pos1Val);
            }

        }
    }
}

const showWinner = (winner) => {
    setTimeout(() => {
        msg.innerText = `Congratulation, winner is ${winner}`;
        msgContainer.classList.remove("hide");
    }, 500);
    disableBoxes();
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");

    // Remove the winner and line classes
    boxes.forEach((box) => {
        box.classList.remove("winner", "horizontal", "vertical", "diagonal-right", "diagonal-left");
    });
}

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);