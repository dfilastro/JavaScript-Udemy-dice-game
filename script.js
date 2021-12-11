'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const active0 = document.querySelector('.player--0');
const active1 = document.querySelector('.player--1');

let scores, playing, maxScore, currentScore, activePlayer;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  maxScore = 100;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  active1.classList.remove('player--active');
  active0.classList.add('player--active');
  active0.classList.remove('player--winner');
  active1.classList.remove('player--winner');
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore = 0;
  activePlayer = activePlayer === 1 ? 0 : 1;
  active0.classList.toggle('player--active');
  active1.classList.toggle('player--active');
};

// Rolling dice funcionality
btnRoll.addEventListener('click', function () {
  console.log('Welcome!');
  // 1.Generate a random number
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to the next player
    if (dice !== 1) {
      // Add the dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to the next player
      switchPlayer();

      //   if (activePlayer === 1) {
      //     active0.classList.remove('player--active');
      //     active1.classList.add('player--active');
      //   } else {
      //     active1.classList.remove('player--active');
      //     active0.classList.add('player--active');
      //   }
    }
  }
});

// Hold button funcionality
btnHold.addEventListener('click', function () {
  // 1 Add current score to the active player
  if (playing) {
    scores[activePlayer] += currentScore; // scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceEl.classList.add('hidden');
    } else {
      switchPlayer();
    }
  }
});

// New Game button funcionality
btnNew.addEventListener('click', init);
