'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

// function for updating content in class message
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// function for quessing
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  // if no input
  if (!guess) {
    displayMessage('No number ⛔️');

    // when the player wins
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    displayMessage('Correct number 🎉');

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = score;
    }

    // if players guesses wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      score--;
      document.querySelector('.score').textContent = score;
      displayMessage(
        guess > secretNumber ? 'number too high' : 'number too low'
      );
    } else {
      displayMessage('you lost the game');
    }
  }
});

// coding challenge - again button for restoring default values of game
document.querySelector('.again').addEventListener('click', function () {
  displayMessage('start guessing...');
  document.querySelector('.guess').value = '';
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
  secretNumber = Math.trunc(Math.random() * 20) + 1;
});
