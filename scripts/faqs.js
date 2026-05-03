// Script simples para abrir/fechar o FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;

        // Fecha outros itens (opcional)
        /*
        document.querySelectorAll('.faq-item').forEach(otherItem => {
          if (otherItem !== item) otherItem.classList.remove('active');
        });
        */

        item.classList.toggle('active');
    });
});