function playGame(userChoice) {
    const choices = [0, 1, 2];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    
    const userDict = {'w': 0, 'g': 1, 's': 2};
    const userD = {'w': "Water", 'g': "Gun", 's': "Snake"};
    const compD = {0: "Water", 1: "Gun", 2: "Snake"};

    // Update display choices
    document.getElementById('user-choice').textContent = `Your choice: ${userD[userChoice]}`;
    document.getElementById('computer-choice').textContent = `Computer's choice: ${compD[computerChoice]}`;

    // Determine winner
    let result;
    if(computerChoice === userDict[userChoice]) {
        result = "It's a Draw!";
    } else if(
        (computerChoice === 0 && userDict[userChoice] === 1) ||
        (computerChoice === 1 && userDict[userChoice] === 2) ||
        (computerChoice === 2 && userDict[userChoice] === 0)
    ) {
        result = "You Lost!";
    } else {
        result = "You Win!";
    }

    document.getElementById('result').textContent = result;
}