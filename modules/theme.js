const THEME_KEY = 'theme';
const DARK_MODE_CLASS = 'dark-mode';
const SUN_ICON = '<i class="fa-solid fa-sun"></i>';
const MOON_ICON = '<i class="fa-solid fa-moon"></i>';

function isDarkModePreferred() {
  return localStorage.getItem(THEME_KEY) === 'dark' ||
    (!localStorage.getItem(THEME_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches);
}

function applyTheme(isDark) {
  const body = document.body;
  const darkToggle = document.getElementById('darkModeToggle');

  if (isDark) {
    body.classList.add(DARK_MODE_CLASS);
    if (darkToggle) darkToggle.innerHTML = SUN_ICON;
  } else {
    body.classList.remove(DARK_MODE_CLASS);
    if (darkToggle) darkToggle.innerHTML = MOON_ICON;
  }
}

export function initializeTheme() {
  const isDark = isDarkModePreferred();
  applyTheme(isDark);

  const darkToggle = document.getElementById('darkModeToggle');
  if (!darkToggle) return;

  darkToggle.addEventListener('click', () => {
    const isDarkNow = document.body.classList.toggle(DARK_MODE_CLASS);
    localStorage.setItem(THEME_KEY, isDarkNow ? 'dark' : 'light');
    applyTheme(isDarkNow);
  });
}
