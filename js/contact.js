/**
 * contact.js
 * -----------------------------------------------------------------------
 * Envio do formulário de contato via WhatsApp. O número vem sempre de
 * CapelaConfig.contato.whatsapp — antes estava fixo como "5500000000000"
 * (número inválido) direto no HTML; agora é um bug que não pode mais
 * acontecer, porque só existe um lugar para configurar o número.
 * -----------------------------------------------------------------------
 */
window.CapelaContact = (function () {
  const cfg = window.CapelaConfig;

  function getWhatsAppLink(mensagem) {
    return "https://api.whatsapp.com/send?phone=" + cfg.contato.whatsapp + "&text=" + encodeURIComponent(mensagem);
  }

  function enviarWhatsApp(event) {
    event.preventDefault();

    const nome = document.getElementById("whatsapp-nome").value.trim();
    const celular = document.getElementById("whatsapp-celular").value.trim();
    const assunto = document.getElementById("whatsapp-assunto").value;
    const mensagem = document.getElementById("whatsapp-mensagem").value.trim();

    if (!nome || !celular || !mensagem) {
      alert("Por favor, preencha nome, celular e mensagem antes de enviar.");
      return;
    }

    const texto =
      "Olá! Nova mensagem do site:\n\n" +
      "*Nome:* " + nome + "\n" +
      "*Celular:* " + celular + "\n" +
      "*Assunto:* " + assunto + "\n" +
      "*Mensagem:* " + mensagem;

    window.open(getWhatsAppLink(texto), "_blank");
  }

  function init() {
    const form = document.getElementById("contato-form");
    if (form) form.addEventListener("submit", enviarWhatsApp);

    const faleConoscoBtns = document.querySelectorAll("[data-config='whatsapp-direto']");
    faleConoscoBtns.forEach(function (el) {
      el.setAttribute("href", getWhatsAppLink("Olá! Vim pelo site da Capela São João Batista e gostaria de mais informações."));
    });
  }

  return { init: init, getWhatsAppLink: getWhatsAppLink };
})();
