'use strict';
const model = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');
const closeModal = function () {
  model.classList.add('hidden');
  overlay.classList.add('hidden');
};
const openModal = function () {
  model.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
for (let i = 0; i < btnOpenModal.length; i++) {
  // press buttons to open modal window
  btnOpenModal[i].addEventListener('click', openModal);
  // press overlay or buttion to close modal window
  btnCloseModal.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  // press esc to close modal window
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !model.classList.contains('hidden')) {
      closeModal();
    }
  });
}