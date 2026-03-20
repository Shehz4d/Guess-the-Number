'use strict';

// Game state
let secretNumber = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

// Helper
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

// Messages
const highMessages = ['Too high 📈', 'Way too high 😅', 'Lower! 🚀'];
const lowMessages = ['Too low 📉', 'Go higher 😎', 'Not enough 🎯'];

// CHECK
document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    displayMessage('Enter a number!');
    return;
  }

  if (guess === secretNumber) {
    displayMessage('🎉 Correct!');

    document.body.classList.add('win');

    const numberEl = document.querySelector('.number');
    numberEl.textContent = secretNumber;
    numberEl.style.width = '30rem';

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }

    document.querySelector('.check').disabled = true;
  } else {
    if (score > 1) {
      const message =
        guess > secretNumber
          ? highMessages[Math.floor(Math.random() * highMessages.length)]
          : lowMessages[Math.floor(Math.random() * lowMessages.length)];

      displayMessage(message);
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('💀 You lost!');
      document.body.classList.add('lose');
      document.querySelector('.score').textContent = 0;
      document.querySelector('.number').textContent = secretNumber;
    }
  }
});

// AGAIN
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  displayMessage('Start guessing...');
  document.querySelector('.score').textContent = score;

  const numberEl = document.querySelector('.number');
  numberEl.textContent = '?';
  numberEl.style.width = '15rem';

  document.querySelector('.guess').value = '';

  document.body.classList.remove('win', 'lose');
  document.querySelector('.check').disabled = false;
});

// FULL RESET
document.querySelector('.reset').addEventListener('click', function () {
  score = 20;
  highscore = 0;
  secretNumber = Math.trunc(Math.random() * 20 + 1);

  displayMessage('Game restarted!');
  document.querySelector('.score').textContent = score;
  document.querySelector('.highscore').textContent = 0;

  const numberEl = document.querySelector('.number');
  numberEl.textContent = '?';
  numberEl.style.width = '15rem';

  document.querySelector('.guess').value = '';

  document.body.classList.remove('win', 'lose');
  document.querySelector('.check').disabled = false;
});
