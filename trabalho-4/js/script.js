let sequence = "";
let userScore = 0;
let timer;
let gameTimer;
let loadingTimer;
let loadingTime = 0;
let timerDuration = 15; // Tempo inicial
let consecutiveCorrectAnswers = 0;
let currentRound = 1; // Contador de rodadas

document.getElementById("user-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkSequence();
    }
});

function startGame() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("user-input").value = "";
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-container").classList.remove("hidden");
    document.getElementById("loading-screen").style.display = "block";

    sequence = "";
    userScore = 0;
    consecutiveCorrectAnswers = 0;
    currentRound = 1;

    generateSequence();
    displayAndAllowInput();
    startGameTimer();

    simulateLoading(() => {
        document.getElementById("loading-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
        displayRandomSequence();
    });
}

function generateSequence() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    sequence = "";
    for (let i = 0; i < currentRound * 2; i++) {
        sequence += letters.charAt(Math.floor(Math.random() * letters.length));
    }
}

function displayRandomSequence() {
    document.getElementById("sequence-display").innerText = sequence;
    setTimeout(() => {
        document.getElementById("sequence-display").innerText = "";
        document.getElementById("user-input").focus();
    }, 3000);
}

function simulateLoading(callback) {
    let loadingBar = document.getElementById("loading-bar");
    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            callback();
        } else {
            width++;
            loadingBar.style.width = width + "%";
            updateLoadingTimer();
        }
    }, 50);
}

function updateLoadingTimer() {
    loadingTime += 0.05;
    document.getElementById("loading-timer").innerText = loadingTime.toFixed(2) + "s";
}

function displayAndAllowInput() {
    document.getElementById("user-input").disabled = false;
    document.getElementById("check-button").disabled = false;
}

function startGameTimer() {
    let seconds = timerDuration;
    updateGameTimer(seconds);
    gameTimer = setInterval(() => {
        seconds--;

        if (seconds >= 0) {
            updateGameTimer(seconds);
        } else {
            endGame(false);
        }
    }, 1000);
}

function updateGameTimer(seconds) {
    const gameTimerDisplay = document.getElementById("game-timer");
    gameTimerDisplay.innerText = seconds + "s";
}

function checkSequence() {
    clearInterval(gameTimer);
    document.getElementById("user-input").disabled = true;
    document.getElementById("check-button").disabled = true;

    const userInput = document.getElementById("user-input").value.toUpperCase();

    if (userInput === sequence) {
        userScore += 5;
        consecutiveCorrectAnswers++;

        if (consecutiveCorrectAnswers >= 3) {
            increaseDifficulty();
            consecutiveCorrectAnswers = 0;
        }

        sequence = "";
        generateSequence();
        displayAndAllowInput();
        startGameTimer();
        displayRandomSequence();
        updateScore();
    } else {
        endGame(false);
    }

    document.getElementById("user-input").value = "";
}

function increaseDifficulty() {
    timerDuration = Math.max(timerDuration - 1, 5);
    generateSequence();
    currentRound++;
}

function updateScore() {
    document.getElementById("score").innerText = "Score: " + userScore;
}

function endGame(win) {
    document.getElementById("user-input").disabled = true;
    document.getElementById("check-button").disabled = true;

    setTimeout(() => {
        if (!win) {
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("result-screen").style.display = "block";

            const resultMessage = document.getElementById("result-message");
            resultMessage.innerText = "Você perdeu, tente novamente! (:";
        } else {
            document.getElementById("game-screen").style.display = "none";
            document.getElementById("result-screen").style.display = "block";

            const resultMessage = document.getElementById("result-message");
            resultMessage.innerText = `Parabéns, você ganhou! Pontuação: ${userScore}`;
        }
    }, 1000);
}

function exitGame() {
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("game-container").classList.add("hidden");
    document.getElementById("start-screen").classList.remove("hidden");
    resetLoadingTimer();
    clearInterval(gameTimer);
}

function resetLoadingTimer() {
    clearInterval(loadingTimer);
    loadingTime = 0;
}

// Chamada inicial para iniciar o jogo
startGame();
