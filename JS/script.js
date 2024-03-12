document.addEventListener('DOMContentLoaded', function () {
    const startBtn = document.getElementById('startBtn');
    const gameBoard = document.getElementById('gameBoard');
    const currentScoreElement = document.getElementById('currentScore');
    const timeLeftElement = document.getElementById('timeLeft');
    const gameStatusElement = document.getElementById('gameStatus');
    const highScoreElement = document.getElementById('highScoreValue');

    let cards = [];
    let currentScore = 0;
    let timeLeft = 60;
    let isGameStarted = false;
    let highScore = 0;

    startBtn.addEventListener('click', startGame);

    function startGame() {
        if (!isGameStarted) {
            isGameStarted = true;
            currentScore = 0;
            timeLeft = 60;
            currentScoreElement.textContent = currentScore;
            timeLeftElement.textContent = timeLeft;
            gameStatusElement.textContent = '';

       
            generateGameBoard();

          
            cards = document.querySelectorAll('.card');
            cards.forEach(card => card.addEventListener('click', handleCardClick));

        
            startBtn.style.display = 'none';

           
            startTimer();

            setTimeout(() => {
                flipAllCardsDown();
            }, 1000);
        }
    }

    function generateGameBoard() {
        gameBoard.innerHTML = '';

        const symbols = ['🌟', '🍎', '🚀', '🎈', '🌈', '🍕', '🚲', '🎉'];
        const shuffledSymbols = shuffle(symbols.concat(symbols));

        shuffledSymbols.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.innerHTML = `<span>${symbol}</span>`;
            gameBoard.appendChild(card);
        });
    }

    function flipAllCardsDown() {
        cards.forEach(card => {
            card.classList.remove('flipped', 'matched');
            setTimeout(() => {
                card.innerHTML = '';
            }, 250);
        });
    }

    function handleCardClick() {
        if (isGameStarted && !this.classList.contains('flipped')) {
            this.classList.add('flipped');

            this.innerHTML = `<span>${this.dataset.symbol}</span>`;

            const flippedCards = document.querySelectorAll('.card.flipped');
            if (flippedCards.length === 2) {
                const symbol1 = flippedCards[0].dataset.symbol;
                const symbol2 = flippedCards[1].dataset.symbol;

                if (symbol1 === symbol2) {
                    currentScore++;
                    currentScoreElement.textContent = currentScore;

                    if (currentScore === 8) {
                        endGame(true); 
                    }

                    flippedCards.forEach(card => {
                        card.classList.remove('flipped');
                        card.classList.add('matched');
                    });
                } else {
                    setTimeout(() => {
                        flippedCards.forEach(card => {
                            card.classList.remove('flipped');
                            card.innerHTML = ''; 
                        });
                    }, 1000);
                }
            }
        }
    }

    function endGame(playerWon) {
       
        gameStatusElement.textContent = playerWon ? 'Congratulations! You won!' : 'Game over. You lost.';

   
        if (currentScore > highScore) {
            highScore = currentScore;
            highScoreElement.textContent = highScore;
        }

   
        isGameStarted = false;

 
        startBtn.style.display = 'block';
    }

    function startTimer() {
        const timerInterval = setInterval(() => {
            timeLeft--;

            if (timeLeft === 0) {
                clearInterval(timerInterval);
                endGame(false); 
            }

            timeLeftElement.textContent = timeLeft;
        }, 1000);
    }


    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});
