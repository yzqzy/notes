const jumpGame = new JumpGame();

const currentScore = document.querySelector('.current-score');
const mask = document.querySelector('.mask');
const score = document.querySelector('.score');
const restartBtn = document.querySelector('.restart-button');

jumpGame.init();

jumpGame._addSuccessCallback((score) => {
  currentScore.innerHTML = score;
});

jumpGame._addFailCallback((score) => {
  mask.style.display = 'flex';
  score.innerHTML = score;
});

restartBtn.addEventListener('click', () => {
  mask.style.display = 'none';
  currentScore.innerHTML = 0;
  jumpGame._restart();
});