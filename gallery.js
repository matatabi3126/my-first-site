(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var art = lightbox.querySelector('.lightbox-art');
  var caption = lightbox.querySelector('.lightbox-caption');
  var closeButton = lightbox.querySelector('.lightbox-close');
  var lastFocused = null;

  function open(button) {
    var svg = button.querySelector('svg');
    if (!svg) return;
    art.innerHTML = '';
    art.appendChild(svg.cloneNode(true));
    var label = button.querySelector('.gallery-item-label');
    caption.textContent = label ? label.textContent : '';
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function close() {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    art.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.gallery-item').forEach(function (btn) {
    btn.addEventListener('click', function () {
      open(btn);
    });
  });

  lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
    el.addEventListener('click', close);
  });

  document.addEventListener('keydown', function (e) {
    if (lightbox.hidden) return;
    if (e.key === 'Escape') {
      close();
    } else if (e.key === 'Tab') {
      // The close button is the only focusable element in the dialog.
      e.preventDefault();
      closeButton.focus();
    }
  });
})();
