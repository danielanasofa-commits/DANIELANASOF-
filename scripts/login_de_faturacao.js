document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('faturacaoForm');
    const loginCard = document.querySelector('.login-card');

    // ==================== REGRAS DE GERAÇÃO DE REFERÊNCIA ====================
    // Formato: DS-2026-XXXXX  (ex: DS-2026-00427)

    function gerarReferenciaValida(sequencial) {
        const ano = new Date().getFullYear();
        // Gera referência no formato correto
        return `DS-\( {ano}- \){sequencial.toString().padStart(5, '0')}`;
    }

    // Validação rigorosa (simula verificação real do sistema)
    function referenciaFoiGerada(referencia) {
        const ref = referencia.toUpperCase().trim();
        
        // Verifica formato básico
        const regex = /^DS-\d{4}-\d{5}$/;
        if (!regex.test(ref)) return false;

        // Extrai o número sequencial
        const partes = ref.split('-');
        const sequencial = parseInt(partes[2]);

        if (isNaN(sequencial) || sequencial < 1 || sequencial > 99999) return false;

        // Simulação de checksum simples (último dígito deve ser par, por exemplo)
        const ultimoDigito = sequencial % 10;
        if (ultimoDigito % 2 !== 0) return false;   // Apenas números pares são válidos neste exemplo

        return true;
    }

    // ==================== SUBMISSÃO DO FORMULÁRIO ====================
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nif = document.querySelector('input[placeholder="Ex: 541728392"]').value.trim();
        const referencia = document.querySelector('input[placeholder="Ex: DS-2026-X"]').value.trim();
        const localidade = document.querySelector('select').value;
        const contacto = document.querySelector('input[type="tel"]').value.trim();

        if (!nif || !referencia || !localidade || !contacto) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const btn = form.querySelector('.login-btn');
        btn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Verificando referência...`;
        btn.disabled = true;

        setTimeout(() => {
            if (referenciaFoiGerada(referencia)) {
                mostrarFaturas(referencia, nif, localidade, contacto);
            } else {
                mostrarNaoEncontrado(referencia);
            }
        }, 1800);
    });

    // ==================== SUCESSO ====================
    function mostrarFaturas(referencia, nif, localidade, contacto) {
        const html = `
            <div class="faturas-container">
                <div class="success-header">
                    <i class="fas fa-check-circle"></i>
                    <h2>Documentos Encontrados</h2>
                    <p><strong>Referência:</strong> ${referencia}</p>
                </div>

                <div class="fatura-card">
                    <div class="fatura-header">
                        <h3>Fatura Pró-Forma / Fatura Nº FT-${referencia.split('-')[2]}</h3>
                        <span class="status pago">Emitida</span>
                    </div>
                    <div class="fatura-body">
                        <p><strong>Data de Emissão:</strong> ${new Date().toLocaleDateString('pt-AO')}</p>
                        <p><strong>NIF:</strong> ${nif}</p>
                        <p><strong>Localidade:</strong> ${localidade}</p>
                        <p><strong>Contacto:</strong> ${contacto}</p>
                        <p><strong>Valor Total:</strong> <strong>185.000 AOA</strong></p>
                        <p><strong>Descrição:</strong> Sofá 3 lugares + 2 poltronas (Sob Medida)</p>
                    </div>
                    <div class="fatura-actions">
                        <button onclick="baixarFaturaPDF('${referencia}')" class="download-btn">
                            <i class="fas fa-download"></i> Baixar Fatura (PDF)
                        </button>
                        <button onclick="baixarComprovativoPDF('${referencia}')" class="download-btn secondary">
                            <i class="fas fa-receipt"></i> Baixar Comprovativo
                        </button>
                    </div>
                </div>

                <button onclick="voltarFormulario()" class="login-btn" style="margin-top:25px; background:#555;">
                    ← Nova Consulta
                </button>
            </div>
        `;

        loginCard.innerHTML = html;
    }

    // ==================== NÃO ENCONTRADO ====================
    function mostrarNaoEncontrado(referencia) {
        const html = `
            <div class="faturas-container">
                <div class="error-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h2>Nenhum Documento Encontrado</h2>
                    <p>A referência <strong>${referencia.toUpperCase()}</strong> não corresponde a nenhuma fatura emitida.</p>
                    <div class="info-box">
                        <i class="fas fa-info-circle"></i>
                        Certifique-se de que está a usar a referência exacta que foi gerada no momento da emissão da fatura pró-forma.
                    </div>
                </div>

                <button onclick="voltarFormulario()" class="login-btn" style="margin-top:25px;">
                    ← Tentar Novamente
                </button>
            </div>
        `;

        loginCard.innerHTML = html;
    }

    // Funções de download (mantidas)
    window.baixarFaturaPDF = function(ref) {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.text("DANIELANASOFÁ - FATURA", 105, 30, { align: "center" });
        doc.text(`Referência: ${ref}`, 105, 50, { align: "center" });
        doc.save(`Fatura_${ref}.pdf`);
        alert('Fatura descarregada!');
    };

    window.baixarComprovativoPDF = function(ref) {
        alert('Comprovativo descarregado!');
    };

    window.voltarFormulario = () => location.reload();
});