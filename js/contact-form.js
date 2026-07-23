(function () {
  // 1) Reemplaza esta URL por la de tu implementación de Google Apps Script
  //    (Extensiones > Apps Script > Implementar > Aplicación web) una vez la tengas lista.
  var SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxG1DaaDzfCKYDTW3AY74m3UoPn4t7mnD0CTgKEcOAfasgdwn78bFcjU36Y-s7h2mVABA/exec";

  var form = document.getElementById("form-95fdd129-0006-4a25-9c1f-fd606dde2f1f");
  if (!form) return;

  var statusEl = document.getElementById("nclex-contact-status");
  var submitBtn = document.getElementById("nclex-contact-submit");

  function showStatus(message, type) {
    statusEl.textContent = message;
    statusEl.style.opacity = "1";
    statusEl.style.background = type === "error" ? "#fdecea" : "#e6f4ea";
    statusEl.style.color = type === "error" ? "#611a15" : "#1e4620";
    statusEl.style.border = type === "error" ? "1px solid #f5c6cb" : "1px solid #b7dfc0";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    if (!SCRIPT_URL || SCRIPT_URL.indexOf("PEGA_AQUI") !== -1) {
      showStatus(
        "El formulario todavía no está conectado. Escríbenos por WhatsApp mientras tanto: https://api.whatsapp.com/send?phone=13467757123",
        "error"
      );
      return;
    }

    var formData = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.setAttribute("aria-disabled", "true");
    showStatus("Enviando tu solicitud…", "success");

    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData
    })
      .then(function () {
        showStatus("¡Gracias! Tu mensaje fue enviado correctamente. Te contactaremos pronto.", "success");
        form.reset();
      })
      .catch(function () {
        showStatus(
          "Hubo un problema al enviar el formulario. Intenta de nuevo o escríbenos por WhatsApp: https://api.whatsapp.com/send?phone=13467757123",
          "error"
        );
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.setAttribute("aria-disabled", "false");
      });
  });
})();
