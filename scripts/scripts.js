const popup = document.getElementById('termsPopup');
const checkbox = document.getElementById('acceptCheckbox');
const acceptBtn = document.getElementById('acceptBtn');

checkbox.addEventListener('change', function () {
    acceptBtn.disabled = !this.checked;
});

function showTermsPopup() {
    // Verifica se o item existe no localStorage
    const hasAccepted = localStorage.getItem('termsAccepted');

    if (!hasAccepted) {
        popup.style.display = 'flex';
    } else {
        popup.style.display = 'none';
    }
}

function acceptTerms() {
    if (checkbox.checked) {
        localStorage.setItem('termsAccepted', 'true');
        popup.style.display = 'none';
        console.log("Termos aceitos e salvos.");
    }
}

// Executa a verificação assim que o script carrega
showTermsPopup();

// --- 1. Configuração do Menu Mobile ---
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = menuToggle.querySelectorAll('span');

    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// --- 2. Base de Dados de Produtos ---
const sofás = [
    {
        nome: "Modelo Greendaily",
        preco: "580.000 (Exclusão de IVA)",
        img: "https://i.ibb.co/N2V0xBks/greendaily-1.jpg",
        material: "Napa (Best Quality)",
        dimensoes: "320 x 90 cm",
        capacidade: "5 Lugares",
        descricao: "Design orgânico e conforto envolvente para salas modernas."
    },
    {
        nome: "Modelo Cheterfield",
        preco: "380.000 (Exclusão de IVA)",
        img: "https://i.ibb.co/qFg5Lv5y/cheterfield-0.jpg",
        material: "Napa (Middle Quality)",
        dimensoes: "320 x 90 cm",
        capacidade: "5 Lugares",
        descricao: "O clássico internacional com acabamento artesanal de alta precisão."
    },
    {
        nome: "Modelo Chrysalis",
        preco: "280.000 (Exclusão de IVA)",
        img: "https://i.ibb.co/VWpFT1nq/chrysalis-1.jpg",
        material: "Napa Sustentável (Low Quality)",
        dimensoes: "320 x 90 cm",
        capacidade: "5 Lugares",
        descricao: "Elegância minimalista com foco em materiais eco-friendly."
    },
    {
        nome: "Modelo Royal Honour",
        preco: "280.000 (Exclusão de IVA)",
        img: "https://i.ibb.co/pry5RHq7/royal-honour-0.jpg",
        material: "Napa (High Quality)",
        dimensoes: "320 x 110 cm",
        capacidade: "5 Lugares",
        descricao: "Sinta-se na realeza com o máximo de espaço e sofisticação."
    },
    {
        nome: "Modelo Obsidiana",
        preco: "480.000 (Exclusão de IVA)",
        img: "https://i.ibb.co/JWtjnR8T/obsidiana-0.png",
        material: "Napa (High Quality)",
        dimensoes: "400 x 100 cm",
        capacidade: "5-6 Lugares",
        descricao: "Compacto por fora, imenso no conforto. Ideal para lofts."
    }
];

// --- 3. Renderização dos Cards ---
const carousel = document.getElementById('sofaCarousel');
const dotsContainer = document.getElementById('dots');

sofás.forEach((sofa, index) => {
    const card = document.createElement('div');
    card.className = 'sofa-card';
    card.innerHTML = `
        <img src="${sofa.img}" alt="${sofa.nome}" loading="lazy">
        <div class="sofa-info">
            <h3>${sofa.nome}</h3>
            <p class="price">AOA ${sofa.preco}</p>
            <p class="installment">Qualidade Garantida</p>
            <div class="card-buttons">
                <a href="#" class="btn btn-details" data-index="${index}">Ver Detalhes</a>
                <a href="comprar.html?produto=${index}" class="btn btn-buy">Comprar Agora</a>
            </div>
        </div>
    `;
    carousel.appendChild(card);

    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.onclick = () => carousel.scrollTo({ left: card.offsetLeft - 50, behavior: 'smooth' });
    dotsContainer.appendChild(dot);
});

// --- 4. Lógica do Modal ---
const modal = document.getElementById('productModal');

document.addEventListener('click', (e) => {
    // Abrir Modal
    if (e.target.classList.contains('btn-details')) {
        e.preventDefault();
        const index = e.target.getAttribute('data-index');
        const sofa = sofás[index];

        document.getElementById('modalTitle').textContent = sofa.nome;
        document.getElementById('modalImage').src = sofa.img;
        document.getElementById('modalName').textContent = sofa.nome;
        document.getElementById('modalPrice').textContent = `AOA ${sofa.preco}`;
        document.getElementById('modalMaterial').textContent = sofa.material;
        document.getElementById('modalDimensions').textContent = sofa.dimensoes;
        document.getElementById('modalCapacity').textContent = sofa.capacity || sofa.capacidade;
        document.getElementById('modalDescription').textContent = sofa.descricao;

        // Atualiza o link do botão de compra dentro do modal
        document.getElementById('buyNowBtn').href = `comprar.html?produto=${index}`;

        modal.style.display = 'flex';
    }

    // Fechar Modal ao clicar fora
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.style.display = 'none';
}

document.getElementById('closeModal').onclick = closeModal;
document.getElementById('closeModalBtn').onclick = closeModal;

// --- 5. Navegação do Carrossel ---
document.getElementById('prevBtn').onclick = () => carousel.scrollBy({ left: -416, behavior: 'smooth' });
document.getElementById('nextBtn').onclick = () => carousel.scrollBy({ left: 416, behavior: 'smooth' });

// Fechar menu ao clicar em links
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.onclick = () => {
        navMenu.classList.remove('active');
        menuToggle.querySelectorAll('span').forEach(s => s.style.transform = 'none');
        menuToggle.querySelectorAll('span')[1].style.opacity = '1';
    };
});

/**
 * DANIELANASOFÁ - Script de Revelação Progressiva
 * Gerencia a entrada elegante dos diferenciais no scroll.
 */

function handleScrollReveal() {
    // Selecionamos tanto os cards quanto o parágrafo enfático
    const elementsToReveal = document.querySelectorAll('.card, .text-emphatic');

    const observerOptions = {
        threshold: 0.15, // Ativa quando 15% do elemento está visível
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes de chegar na borda inferior
    };

    const observer = new IntersectionObserver((entries) => {
        // Criamos uma lista apenas dos elementos que estão entrando na tela agora
        const visibleEntries = entries.filter(entry => entry.isIntersecting);

        visibleEntries.forEach((entry, index) => {
            // Aplicamos um delay progressivo baseado na ordem de aparição (index)
            setTimeout(() => {
                entry.target.classList.add('visible');

                // Uma vez revelado, paramos de observar para economizar memória
                observer.unobserve(entry.target);
            }, index * 120); // 120ms de intervalo entre cada card
        });
    }, observerOptions);

    elementsToReveal.forEach(el => observer.observe(el));
}

// Inicialização segura
document.addEventListener('DOMContentLoaded', () => {
    handleScrollReveal();
});