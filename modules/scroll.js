const SCROLL_THRESHOLD = 100;
const SCROLL_TOP_THRESHOLD = 200;

function initializeScrollTopButton() {
  const scrollBtn = document.getElementById('scrollTopBtn');

  if (!scrollBtn) return;

  window.addEventListener('scroll', () => {
    const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    scrollBtn.style.display = scrollTop > SCROLL_TOP_THRESHOLD ? 'block' : 'none';
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

function initializeNavbarScroll() {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return;

  let lastScrollTop = 0;
  let ticking = false;

  function handleNavbarScroll() {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop && currentScrollTop > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar-hidden');
    } else if (currentScrollTop < lastScrollTop || currentScrollTop <= SCROLL_THRESHOLD) {
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(handleNavbarScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
}

function initializeMenuToggleScroll() {
  const menuToggle = document.querySelector('.menu-toggle');

  if (!menuToggle) return;

  let lastScrollTop = 0;
  let ticking = false;

  function isMenuToggleVisible() {
    const style = window.getComputedStyle(menuToggle);
    return style.display !== 'none' && window.innerWidth <= 768;
  }

  function handleMenuToggleScroll() {
    if (!isMenuToggleVisible()) {
      ticking = false;
      return;
    }

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
      menuToggle.classList.add('menu-toggle-hidden');
    } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 50) {
      menuToggle.classList.remove('menu-toggle-hidden');
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    ticking = false;
  }

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(handleMenuToggleScroll);
        ticking = true;
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', () => {
    if (!isMenuToggleVisible()) {
      menuToggle.classList.remove('menu-toggle-hidden');
    }
  });
}

export function initializeScroll() {
  initializeScrollTopButton();
  initializeNavbarScroll();
  initializeMenuToggleScroll();
}
