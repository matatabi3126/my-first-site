(function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  function closeMenu() {
    var hadFocusInside = links.contains(document.activeElement);
    toggle.setAttribute('aria-expanded', 'false');
    links.classList.remove('is-open');
    if (hadFocusInside) {
      toggle.focus();
    }
  }

  function openMenu() {
    toggle.setAttribute('aria-expanded', 'true');
    links.classList.add('is-open');
    var searchToggle = document.querySelector('.search-toggle');
    var searchPanel = document.getElementById('search-panel');
    if (searchToggle && searchPanel) {
      searchToggle.setAttribute('aria-expanded', 'false');
      searchPanel.hidden = true;
    }
    // The toggle button sits after the links in source order (so desktop
    // tab order stays links-then-icons), which would let forward Tab skip
    // past the now-visible links entirely. Send focus into the menu instead.
    var firstLink = links.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
})();
