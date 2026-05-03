// Cursor Engine
const cursor = document.getElementById('cursor');
const aura = document.getElementById('cursor-aura');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        aura.style.left = (e.clientX - 20) + 'px';
        aura.style.top = (e.clientY - 20) + 'px';
    }, 50);
});

// Hover Effect on inputs
const fields = document.querySelectorAll('input, textarea, button');
fields.forEach(f => {
    f.addEventListener('mouseenter', () => {
        aura.style.transform = 'scale(1.5)';
        aura.style.borderColor = 'white';
    });
    f.addEventListener('mouseleave', () => {
        aura.style.transform = 'scale(1)';
        aura.style.borderColor = 'var(--gold)';
    });
});

// Auto-expand textarea
const textarea = document.querySelector('textarea');
textarea.addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});
document.addEventListener('DOMContentLoaded', function () {
    const filters = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-item');

    filters.forEach(button => {
        button.addEventListener('click', () => {
            // 1. Remover classe ativa de todos os botões e adicionar ao clicado
            filters.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. Obter a categoria a filtrar
            const filterValue = button.getAttribute('data-filter');

            // 3. Filtrar itens
            items.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hidden');
                    // Pequeno delay para animação de fade-in
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
});

document.getElementById('whatsappForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o recarregamento da página

    // --- CONFIGURAÇÃO ---
    const meuNumero = "244921484506"; // Digite seu número aqui (DDI + DDD + Número)
    // ---------------------

    // Captura dos dados mantendo a lógica do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const descricao = document.getElementById('descricao').value;

    // Formatação da mensagem (O \n quebra a linha no WhatsApp)
    const mensagemFormatada = `*Novo Orçamento*\n\n` +
        `*Nome:* ${nome}\n` +
        `*E-mail:* ${email}\n` +
        `*Descrição:* ${descricao}`;

    // Codificação para URL
    const url = `https://wa.me/${meuNumero}?text=${encodeURIComponent(mensagemFormatada)}`;

    // Abre o WhatsApp em uma nova aba
    window.open(url, '_blank');
});