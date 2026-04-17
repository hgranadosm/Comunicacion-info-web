(function () {
  emailjs.init('l_I6FFQCf9gyONQxk');

  var subForm = document.querySelector('form[aria-label="Formulario de suscripción"]');
  if (subForm) {
    var subFeedback = document.createElement('div');
    subFeedback.className = 'col-12 text-center';
    subFeedback.style.display = 'none';
    subFeedback.innerHTML = '<div class="alert alert-success mt-3"><i class="fa-solid fa-circle-check me-2"></i>¡Gracias! Te has suscrito correctamente.</div>';

    subForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailInput = document.getElementById('correoSuscripcion');

      if (!emailInput.checkValidity()) {
        emailInput.classList.add('is-invalid');
        return;
      }
      emailInput.classList.remove('is-invalid');

      var subBtn = subForm.querySelector('[type="submit"]');
      subBtn.disabled = true;
      subBtn.textContent = 'Enviando...';

      emailjs.send('service_fk94zzd', 'template_joz8ymb', {
        subscriber_email: emailInput.value
      })
      .then(function () {
        subForm.parentElement.appendChild(subFeedback);
        subFeedback.style.display = 'block';
        subForm.style.display = 'none';
      })
      .catch(function (error) {
        console.error('Error EmailJS:', error);
        subBtn.disabled = false;
        subBtn.textContent = 'Suscribirme';
        alert('Ocurrió un error. Por favor intenta de nuevo.');
      });
    });
  }

  var counters = document.querySelectorAll('.js-counter');
  if (!counters.length) return;

  function animateCounter(el) {
    var target = Number(el.getAttribute('data-target')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var current = Math.floor(progress * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
})();
