let userScore = 0;
let computerScore = 0;
let activeAnimation = null;

function createStar(x, y) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    const hue = Math.random() * 360;
    star.style.background = `radial-gradient(circle at center, 
        hsla(${hue}, 100%, 70%, 0.2) 0%,
        hsla(${hue}, 100%, 60%, 0.5) 25%,
        hsla(${hue}, 100%, 50%, 0.8) 50%,
        hsla(${hue}, 100%, 40%, 1) 100%)`;
    star.style.width = '30px';
    star.style.height = '30px';
    star.style.borderRadius = '50%';
    return star;
}

function createBubble(x, y) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    const hue = Math.random() * 360;
    bubble.style.background = `radial-gradient(circle at center, 
        hsla(${hue}, 100%, 70%, 0.1) 0%,
        hsla(${hue}, 100%, 60%, 0.3) 40%,
        hsla(${hue}, 100%, 50%, 0.6) 80%,
        hsla(${hue}, 100%, 40%, 0.8) 100%)`;
    bubble.style.width = '40px';
    bubble.style.height = '40px';
    return bubble;
}

function celebrate(type, x, y) {
    if (activeAnimation) {
        activeAnimation.remove();
    }

    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    document.body.appendChild(celebration);
    activeAnimation = celebration;

    if (type === 'win') {
        for (let i = 0; i < 100; i++) {
            const star = createStar(
                x + (Math.random() - 0.5) * 600,
                y + (Math.random() - 0.5) * 600
            );
            celebration.appendChild(star);

            const bubble = createBubble(
                x + (Math.random() - 0.5) * 600,
                y + (Math.random() - 0.5) * 600
            );
            celebration.appendChild(bubble);
        }
    } else if (type === 'lose') {
        const cryingEmoji = document.createElement('div');
        cryingEmoji.className = 'crying-emoji';
        cryingEmoji.innerHTML = '😭';
        cryingEmoji.style.left = `${x - 50}px`;
        cryingEmoji.style.top = `${y - 50}px`;
        celebration.appendChild(cryingEmoji);
        
        const message = document.createElement('div');
        message.className = 'encourage-message';
        message.innerHTML = "Don't give up! Try again! 💪";
        message.style.left = `${x - 100}px`;
        message.style.top = `${y + 100}px`;
        celebration.appendChild(message);
    } else if (type === 'draw') {
        const drawText = document.createElement('div');
        drawText.className = 'draw-message';
        drawText.innerHTML = 'Match Draw!<br>Try again';
        drawText.style.left = `${x - 100}px`;
        drawText.style.top = `${y - 50}px`;
        drawText.style.color = '#ff0000'; // Changed to red color
        celebration.appendChild(drawText);
    }

    setTimeout(() => {
        if (celebration === activeAnimation) {
            celebration.remove();
            activeAnimation = null;
        }
    }, 3000);
}

// Add click event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            let choice;
            if (this.textContent.includes('Snake')) {
                choice = 's';
            } else if (this.textContent.includes('Water')) {
                choice = 'w';
            } else if (this.textContent.includes('Gun')) {
                choice = 'g';
            }
            if (choice) {
                playGame(choice);
            }
        });
    });
    
    // Add reset button
    addResetButton();
});

function playGame(userChoice) {
    const choices = [0, 1, 2];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const userDict = {'w': 0, 'g': 1, 's': 2};
    const userD = {'w': "Water", 'g': "Gun", 's': "Snake"};
    const compD = {0: "Water", 1: "Gun", 2: "Snake"};

    document.getElementById('user-choice').textContent = `Your choice: ${userD[userChoice]}`;
    document.getElementById('computer-choice').textContent = `Computer's choice: ${compD[computerChoice]}`;

    let result;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    if (computerChoice === userDict[userChoice]) {
        result = "It's a Draw!";
        celebrate('draw', centerX, centerY);
    } else if (
        (computerChoice === 2 && userDict[userChoice] === 0) || // Water beats Snake
        (computerChoice === 0 && userDict[userChoice] === 1) || // Gun beats Water
        (computerChoice === 1 && userDict[userChoice] === 2)    // Snake beats Gun
    ) {
        result = "You Lost!";  // Changed from "You Win!"
        computerScore++;       // Changed to increment computer's score
        celebrate('lose', centerX, centerY);  // Changed celebration to lose
    } else {
        result = "You Win!";   // Changed from "You Lost!"
        userScore++;          // Changed to increment user's score
        celebrate('win', centerX, centerY);   // Changed celebration to win
    }

    document.getElementById('result').textContent = result;
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('computer-score').textContent = computerScore;
}

function addResetButton() {
    const container = document.querySelector('.container');
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Game';
    resetBtn.className = 'choice-btn';
    resetBtn.style.marginTop = '20px';
    resetBtn.addEventListener('click', resetGame);
    container.appendChild(resetBtn);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('computer-score').textContent = computerScore;
    document.getElementById('user-choice').textContent = 'Your choice: ';
    document.getElementById('computer-choice').textContent = "Computer's choice: ";
    document.getElementById('result').textContent = 'Choose your move!';
}
