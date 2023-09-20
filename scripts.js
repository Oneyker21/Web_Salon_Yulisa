const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');
const citasLink = document.querySelector('nav ul li:nth-child(1) a');
const closeButton = document.getElementById('closeButton');

let isDragging = false;
let offsetX, offsetY;

citasLink.addEventListener('click', function (e) {
    e.preventDefault();
    overlay.style.display = 'flex';
});

closeButton.addEventListener('click', function () {
    overlay.style.display = 'none';
});

popup.addEventListener('mousedown', function (e) {
    isDragging = true;
    offsetX = e.clientX - popup.getBoundingClientRect().left;
    offsetY = e.clientY - popup.getBoundingClientRect().top;
});

document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;

    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;

    popup.style.left = newX + 'px';
    popup.style.top = newY + 'px';
});

document.addEventListener('mouseup', function () {
    isDragging = false;
});
