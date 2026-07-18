(function () {
  var STORAGE_KEY = 'theme';

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    });
  }

  document.querySelectorAll('.theme-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  });

  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
})();
