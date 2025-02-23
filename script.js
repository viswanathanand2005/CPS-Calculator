function getQueryParam(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

var count = 0;
var clickBox = document.getElementById('click-box');
var timerDisplay = document.getElementById('time-left');
var finalScore = document.getElementById('final-score');

// Get timeLimit from URL, default to 15 if not provided
var timeLimit = parseInt(getQueryParam('time')) || 15;
var timeLeft = timeLimit;
var timerRunning = false;
var timer;

// Update the timer display with the selected time
timerDisplay.innerText = timeLeft;

clickBox.addEventListener('click', function (e) {
    if (!timerRunning) {
        startTimer();
        timerRunning = true;
    }

    if (timerRunning) {
        count += 1;

        // Create ripple effect
        let ripple = document.createElement('span');
        ripple.classList.add('ripple');

        // Get click position relative to box
        let rect = clickBox.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        // Set position of ripple
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Append ripple and remove it after animation
        clickBox.appendChild(ripple);
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft -= 1;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            clickBox.style.pointerEvents = "none"; // Disable clicking
            finalScore.style.display = "block"; // Show final score
            finalScore.innerText = `Final Score: ${(count / timeLimit).toFixed(2)}`;

        }
    }, 1000);
}
