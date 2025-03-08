let userScore = 0;
let computerScore = 0;

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

// Add this variable at the top of your script
let activeAnimation = null;

function celebrate(type, x, y) {
    // Clear any existing celebration
    if (activeAnimation) {
        activeAnimation.remove();
    }

    const celebration = document.createElement('div');
    celebration.className = 'celebration';
    document.body.appendChild(celebration);
    activeAnimation = celebration;

    if (type === 'win') {
        // Create stars and bubbles
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
        celebration.appendChild(drawText);
    }

    setTimeout(() => {
        if (celebration === activeAnimation) {
            celebration.remove();
            activeAnimation = null;
        }
    }, 3000);
}

// Add sound effects function
function playSound(type) {
    const sounds = {
        win: '🎵',
        lose: '🔔',
        draw: '🎶'
    };
    // Create and play sound (you can replace emoji with actual sound files)
    const audio = new Audio();
    audio.play().catch(e => console.log('Sound blocked by browser policy'));
}
// Add this at the beginning of your script.js file
function handleUserInput() {
    const userChoice = prompt("Enter your choice:\n's' for Snake\n'w' for Water\n'g' for Gun").toLowerCase();
    
    if (userChoice === 's' || userChoice === 'w' || userChoice === 'g') {
        playGame(userChoice);
    } else {
        alert("Invalid input! Please enter 's', 'w', or 'g'");
    }
}

// Add click event listeners to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.choice-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const choice = this.textContent.includes('Snake') ? 's' : 
                          this.textContent.includes('Water') ? 'w' : 'g';
            playGame(choice);
        });
    });
});

// Update keyboard controls to include prompt when no button is clicked
document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 's' || key === 'w' || key === 'g') {
        playGame(key);
    }
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

    if(computerChoice === userDict[userChoice]) {
        result = "It's a Draw!";
        celebrate('draw', centerX, centerY);
    } else if(
        (computerChoice === 0 && userDict[userChoice] === 1) ||
        (computerChoice === 1 && userDict[userChoice] === 2) ||
        (computerChoice === 2 && userDict[userChoice] === 0)
    ) {
        result = "You Lost!";
        computerScore++;
        celebrate('lose', centerX, centerY);
    } else {
        result = "You Win!";
        userScore++;
        celebrate('win', centerX, centerY);
    }

    document.getElementById('result').textContent = result;
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('computer-score').textContent = computerScore;
}

// Update the button click handlers
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
});
