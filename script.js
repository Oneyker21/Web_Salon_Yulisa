const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');
const overlay = document.getElementById('popup2');
const popup = document.getElementById('popup');
const citasLink = document.getElementById('NewCita');
const closeButton = document.getElementById('closeButton');
const submitButton = document.getElementById('enviarButton');


let isDragging = false;
let offsetX, offsetY;

enviarButton.addEventListener('click', function (e) {
    e.preventDefault();
    popup2.style.display = 'none';
});

citasLink.addEventListener('click', function (e) {
    e.preventDefault();
    popup2.style.display = 'flex';
});
closeButton.addEventListener('click', function (e) {
    e.preventDefault();
    popup2.style.display = 'none';
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

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Evitar que el navegador siga el enlace
        const targetSectionId = link.getAttribute('href').substring(1);

        sections.forEach(section => {
            if (section.id === targetSectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
});
