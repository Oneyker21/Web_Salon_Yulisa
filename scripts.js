const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const close = document.getElementById('close');
const closeButton = document.getElementById('closeButton');
const citasLink = document.querySelector('nav ul li:nth-child(1) a');
const submitBtn = document.getElementById('submitBtn');

citasLink.addEventListener('click', function (e) {
  e.preventDefault();
  overlay.style.display = 'flex';
});

close.addEventListener('click', function () {
  overlay.style.display = 'none';
});

closeButton.addEventListener('click', function () {
  overlay.style.display = 'none';
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  // código para enviar el formulario
  // o acción adicional antes de enviarlo
});