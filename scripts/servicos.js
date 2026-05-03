// Cursor Logic
const cursor = document.getElementById('cursor');
const aura = document.getElementById('cursor-aura');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    aura.style.left = (e.clientX - 20) + 'px';
    aura.style.top = (e.clientY - 20) + 'px';
});

// Reveal Logic
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        const windowHeight = window.innerHeight;
        const elementTop = r.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            r.classList.add("active");
        }
    });
}

window.addEventListener("scroll", reveal);
window.onload = reveal;

// Efeito de escala no cursor ao passar nos cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        aura.style.transform = 'scale(2)';
        aura.style.background = 'rgba(201, 169, 110, 0.05)';
    });
    card.addEventListener('mouseleave', () => {
        aura.style.transform = 'scale(1)';
        aura.style.background = 'transparent';
    });
});