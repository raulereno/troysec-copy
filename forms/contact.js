(function () {
  "use strict";

  const APPS_SCRIPT_ID = "https://script.google.com/macros/s/AKfycbzRn1Ruk6mT_I90J-1sL3N4FFTwKlSq1DHAwpPC3rTlCWNiIhfXbjRIH1c9KUhT1tNYJg/exec";
  const lang = getCookie('language');
  
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      let recaptcha = thisForm.querySelector('.g-recaptcha');
      let recaptchaResponse = thisForm.querySelector('.g-recaptcha-response');

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      let formData = {
        name: thisForm.querySelector('#name').value,
        email: thisForm.querySelector('#email').value,
        subject: thisForm.querySelector('#subject').value,
        message: thisForm.querySelector('#contact-message').value,
        token: recaptchaResponse ? recaptchaResponse.value : ''
      };

      // Verifica si reCAPTCHA ha sido resuelto
      if (recaptcha && (!recaptchaResponse || recaptchaResponse.value === "")) {
        displayError(thisForm, lang === 'es' ? 'Por favor, completa el reCAPTCHA.' : 'Please complete the reCAPTCHA.');
        thisForm.querySelector('.loading').classList.remove('d-block');
        return;
      }

      submitForm(thisForm, APPS_SCRIPT_ID, formData);
    });
  });

  function submitForm(thisForm, action, formData) {
    fetch(action, {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': "text/plain;charse=utf=8"
      },
      mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      if (data.result === "success") {
        thisForm.querySelector('.sent-message').innerHTML = lang === 'es' ? '¡Mensaje enviado con éxito!' : 'Message sent successfully!';
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset();
      } else {
        throw new Error(data.message || (lang === 'es' ? 'Error al enviar el formulario.' : 'Form submission failed.'));
      }
    })
    .catch((error) => {
      if (error instanceof TypeError && error.message === "Failed to fetch") {
        displayError(thisForm, lang === 'es' ? 'Error de red: no se pudo conectar al servidor.' : 'Network error: failed to connect to the server.');
      } else {
        displayError(thisForm, error);
      }
    });
  }

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = lang === 'es' ? `Error: ${error}` : `Error: ${error}`;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
