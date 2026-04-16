(function () {
  emailjs.init('l_I6FFQCf9gyONQxk'); // Reemplaza con tu Public Key de EmailJS

  var form = document.getElementById('contactoForm');
  var successMsg = document.getElementById('conSuccessMsg');
  var submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enviando... <i class="fa-solid fa-spinner fa-spin ms-2"></i>';

    emailjs.send('service_fk94zzd', 'template_kkt3d9e', {
      from_name: form.nombre.value,
      from_email: form.email.value,
      phone: form.telefono.value,
      subject: form.asunto.value,
      message: form.mensaje.value
    })
    .then(function () {
      form.classList.remove('was-validated');
      form.reset();
      form.style.display = 'none';
      successMsg.classList.remove('d-none');
    })
    .catch(function (error) {
      console.error('Error EmailJS:', error);
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar mensaje <i class="fa-solid fa-paper-plane ms-2"></i>';
      alert('Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.');
    });
  });
})();
