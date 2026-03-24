const restartBtn = document.querySelector('#restart');
const board = document.querySelector('#board');
const cells = document.querySelectorAll('.cell');
const statusEl = document.querySelector('#status');

const SIZE = cells.length;
const TARGETS = 3;
const MAX_MISSES = 4;

let hidden = [];
let misses = 0;
let found = 0;
let active = false;

const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function updateStatus(text) {
  if (text) {
    statusEl.textContent = text;
    return;
  }
  statusEl.textContent = `Найдено: ${found}/${TARGETS} • Ошибок: ${misses}/${MAX_MISSES}`;
}

function startGame() {
  misses = 0;
  found = 0;
  active = true;
  hidden = [];

  cells.forEach(cell => {
    cell.style.backgroundColor = '#f0f0f0';
    cell.textContent = '';
    cell.style.cursor = 'pointer';
  });

  while (hidden.length < TARGETS) {
    const n = getRandomNumber(0, SIZE - 1);
    if (!hidden.includes(n)) hidden.push(n);
  }

  updateStatus();
}

restartBtn.addEventListener('click', startGame);

board.addEventListener('click', (event) => {
  const cell = event.target;
  if (!cell.classList.contains('cell')) return;
  if (!active) return;

  const index = Number(cell.dataset.index);

  if (cell.textContent !== '') return;

  if (hidden.includes(index)) {
    cell.style.backgroundColor = 'lightgreen';
    cell.textContent = '✓';
    found++;

    if (found === TARGETS) {
      active = false;
      updateStatus('Победа!');
      return;
    }
  } else {
    cell.style.backgroundColor = 'lightcoral';
    cell.textContent = '✗';
    misses++;

    if (misses === MAX_MISSES) {
      active = false;
      updateStatus('Попытки закончились');
      return;
    }
  }

  updateStatus();
});

updateStatus('Нажми «Начать игру»');
