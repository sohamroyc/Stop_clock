let timer = null;
let elapsedTime = 0;
let splits = [];
let clockMode = false;

const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const startButton = document.getElementById("start");
const splitButton = document.getElementById("split");
const resetButton = document.getElementById("reset");
const splitList = document.getElementById("split-list");
const themeToggle = document.getElementById("theme-toggle");
const stopwatchMode = document.getElementById("stopwatch-mode");
const clockModeBtn = document.getElementById("clock-mode");

// Theme Toggle
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});

// Start Timer
startButton.addEventListener("click", () => {
    if (clockMode) return; // Disable Start in Clock Mode
    if (!timer) {
        startTimer();
    } else {
        stopTimer();
    }
});

// Reset Timer
resetButton.addEventListener("click", resetTimer);

// Split Time
splitButton.addEventListener("click", recordSplit);

// Mode Toggle
stopwatchMode.addEventListener("click", () => switchMode(false));
clockModeBtn.addEventListener("click", () => switchMode(true));

// Update Time
function startTimer() {
    startButton.textContent = "Stop";
    splitButton.disabled = false;
    resetButton.disabled = false;
    timer = setInterval(updateTime, 10);
}

function stopTimer() {
    clearInterval(timer);
    timer = null;
    startButton.textContent = "Start";
}

function updateTime() {
    elapsedTime += 10;
    const date = new Date(elapsedTime);
    hoursEl.textContent = String(date.getUTCHours()).padStart(2, "0");
    minutesEl.textContent = String(date.getUTCMinutes()).padStart(2, "0");
    secondsEl.textContent = String(date.getUTCSeconds()).padStart(2, "0");
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    elapsedTime = 0;
    updateTime();
    splitButton.disabled = true;
    resetButton.disabled = true;
    startButton.textContent = "Start";
    splitList.innerHTML = "";
}

function recordSplit() {
    const time = `${hoursEl.textContent}:${minutesEl.textContent}:${secondsEl.textContent}`;
    const li = document.createElement("li");
    li.textContent = `Lap ${splits.length + 1}: ${time}`;
    splitList.appendChild(li);
    splits.push(time);
}

function switchMode(isClock) {
    clockMode = isClock;
    stopwatchMode.classList.toggle("active", !isClock);
    clockModeBtn.classList.toggle("active", isClock);
    resetTimer();
    if (isClock) startClock();
}

// Clock Mode
function startClock() {
    setInterval(() => {
        const now = new Date();
        hoursEl.textContent = String(now.getHours()).padStart(2, "0");
        minutesEl.textContent = String(now.getMinutes()).padStart(2, "0");
        secondsEl.textContent = String(now.getSeconds()).padStart(2, "0");
    }, 1000);
}
