const numBoxes = 8;
let colors = [];
let pickedColor;
let playerName;

const colorDisplay = document.querySelector("#colorDisplay");
const messageDisplay = document.querySelector("#message");
const colorBoxes = document.querySelectorAll(".colorBox");
const resetButton = document.querySelector("#resetButton");
const startButton = document.querySelector("#startButton");
const nameInput = document.querySelector("#name");
const welcomeMessage = document.querySelector("#welcomeMessage");
init();

function init() {
    nameInput.focus();
    startButton.addEventListener("click", startGame);
    resetGame();
    setupColorBoxes();
}

function resetGame() {
    colors = generateRandomColors(numBoxes);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
    for (let i = 0; i < colorBoxes.length; i++) {
        if (colors[i]) {
            colorBoxes[i].style.backgroundColor = colors[i];
            colorBoxes[i].style.display = "block";
        } else {
            colorBoxes[i].style.display = "none";
        }
    }
    colorDisplay.style.backgroundColor = "steelblue";
}

function setupColorBoxes() {
    for (let i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].addEventListener("click", function () {
            const clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Bravo!";
                changeColors(clickedColor);
                resetButton.textContent = "Play Again";
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Keep trying";
            }
        });
    }
}

function changeColors(color) {
    for (let i = 0; i < colorBoxes.length; i++) {
        colorBoxes[i].style.backgroundColor = color;
    }
    colorDisplay.style.backgroundColor = color;
}

function startGame() {
    playerName = nameInput.value;
    if (playerName.trim() === "") {
        alert("Please enter your name.");
        return;
    }
    document.querySelector("#name").disabled = true;
    document.querySelector("#startButton").disabled = true;
    welcomeMessage.textContent = `Welcome, ${playerName}!`;
    resetGame();
}

function pickColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function generateRandomColors(num) {
    const arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

resetButton.addEventListener("click", function () {
    resetGame();
});
