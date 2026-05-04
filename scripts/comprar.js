/* MANTIDOS OS SEUS SCRIPTS ORIGINAIS SEM ALTERAÇÃO NA LÓGICA DE REMOÇÃO OU ESCOLHA */
    const produtos = [
      { nome: "Modelo Greendaily", preco: "580000", img: "https://i.ibb.co/N2V0xBks/greendaily-1.jpg" },
      { nome: "Modelo Chesterfield", preco: "380000", img: "https://i.ibb.co/qFg5Lv5y/cheterfield-0.jpg" },
      { nome: "Modelo Chrysalis", preco: "280000", img: "https://i.ibb.co/VWpFT1nq/chrysalis-1.jpg" },
      { nome: "Modelo Royal Honour", preco: "280000", img: "https://i.ibb.co/pry5RHq7/royal-honour-0.jpg" },
      { nome: "Modelo Obsidiana", preco: "480000", img: "https://i.ibb.co/JWtjnR8T/obsidiana-0.png" }
    ];

    let currentProduct = null;
    let selectedMethod = null;
    let selectedPaymentMethod = null;

    function loadProduct() {
      const params = new URLSearchParams(window.location.search);
      const index = parseInt(params.get('produto'));
      if (isNaN(index) || index < 0 || index >= produtos.length) return;

      currentProduct = produtos[index];
      document.getElementById('summaryBox').className = "summary";
      document.getElementById('summaryBox').innerHTML = `
        <img src="${currentProduct.img}" alt="${currentProduct.nome}">
        <div class="summary-info">
          <h3>${currentProduct.nome}</h3>
          <div class="price-total">Kz ${Number(currentProduct.preco).toLocaleString('pt-AO')}</div>
        </div>
        <button class="remove-btn" onclick="removeProduct()">✕</button>
      `;
      document.getElementById('methodStep').style.display = 'block';
      document.getElementById('formStep').style.display = 'block';
    }

    function removeProduct() {
      if (confirm("Deseja remover este sofá das suas opções de compra?")) window.location.href = "index.html";
    }

    function selectMethod(method) {
      selectedMethod = method;
      document.querySelectorAll('.method-btn').forEach(btn => btn.classList.remove('active'));
      document.getElementById(method + 'Btn').classList.add('active');
      document.getElementById('paymentMethods').style.display = 'grid';
      document.getElementById('addressFields').style.display = (method === 'remote') ? 'block' : 'none';
    }

    function selectPayment(el, method) {
      selectedPaymentMethod = method;
      document.querySelectorAll('.payment-card').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
      document.getElementById('paymentDetails').style.display = 'block';
      const info = { transfer: "IBAN BAI: AO06 0055 0000 4954 0471 1018 5", multicaixa: "Pagamento Express", unitel: "+244 921 484 506", paypay: "+244 958 987 366" };
      document.getElementById('paymentDetails').innerHTML = `<strong>${info[method]}</strong>`;
    }

    function submitToWhatsApp(e) {
      e.preventDefault();
      if (!selectedMethod || !selectedPaymentMethod) return alert("Selecione os métodos.");
      const msg = `Olá! Quero o ${currentProduct.nome} (${Number(currentProduct.preco).toLocaleString('pt-AO')} Kz). Pagamento: ${selectedPaymentMethod.toUpperCase()}. Nome: ${document.getElementById('nome').value}`;
      window.open(`https://wa.me/244921484506?text=${encodeURIComponent(msg)}`, '_blank');
    }

    window.onload = loadProduct;
