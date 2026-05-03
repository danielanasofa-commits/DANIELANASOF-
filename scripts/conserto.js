function enviarPedido(e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById('nome').value,
        tel: document.getElementById('telefone').value,
        local: document.getElementById('local').value,
        tipo: document.getElementById('tipo').value,
        problema: document.getElementById('problema').value,
        desc: document.getElementById('descricao').value
    };

    let msg = `🛠️ *SOLICITAÇÃO DE RESTAURO - DANIELANASOFÁ*\n\n`;
    msg += `👤 *Cliente:* ${dados.nome}\n`;
    msg += `📍 *Local:* ${dados.local}\n`;
    msg += `📞 *WhatsApp:* ${dados.tel}\n\n`;
    msg += `🛋️ *ITEM PARA CONSERTO*\n`;
    msg += `▫️ *Tipo:* ${dados.tipo}\n`;
    msg += `▫️ *Serviço:* ${dados.problema}\n\n`;
    if (dados.desc) msg += `📝 *Detalhes:* ${dados.desc}\n\n`;
    msg += `_Vou enviar as fotos em anexo para avaliação._`;

    const url = `https://wa.me/244921484506?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
}