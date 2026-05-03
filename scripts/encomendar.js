function enviarEncomenda(e) {
  e.preventDefault();

  const campos = {
    nome: document.getElementById('nome').value.trim(),
    tel: document.getElementById('telefone').value.trim(),
    email: document.getElementById('email').value.trim(),
    mod: document.getElementById('modelo').value,
    cor: document.getElementById('cor').value.trim(),
    dim: document.getElementById('dimensoes').value.trim(),
    lug: document.getElementById('lugares').value,
    obs: document.getElementById('observacoes').value.trim()
  };

  let msg = `✨ *NOVA ENCOMENDA PERSONALIZADA*\n\n`;
  msg += `👤 *Cliente:* ${campos.nome}\n`;
  msg += `📞 *WhatsApp:* ${campos.tel}\n`;
  msg += `✉️ *Email:* ${campos.email}\n\n`;
  msg += `🛋️ *DETALHES DO PRODUTO*\n`;
  msg += `▫️ *Modelo:* ${campos.mod || 'Personalizado'}\n`;
  msg += `▫️ *Tecido/Cor:* ${campos.cor || 'A definir'}\n`;
  msg += `▫️ *Dimensões:* ${campos.dim || 'A definir'}\n`;
  msg += `▫️ *Lugares:* ${campos.lug}\n\n`;
  if (campos.obs) msg += `📝 *Notas:* ${campos.obs}\n\n`;
  msg += `_Enviado via Portal DANIELANASOFÁ_`;

  const whatsappNumber = "244921484506";
  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;

  window.open(url, '_blank');

  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('encomendaForm').reset();
}