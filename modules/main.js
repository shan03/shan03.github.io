import { initializeTheme } from './theme.js';
import { initializeNavigation } from './navigation.js';
import { initializeTimeline } from './timeline.js';
import { initializeScroll } from './scroll.js';
import { initializeAnalytics } from './analytics.js';

function initializeYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function initializeApp() {
  initializeYear();
  initializeTheme();
  initializeNavigation();
  initializeTimeline();
  initializeScroll();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalytics);
  } else {
    initializeAnalytics();
  }
}

initializeApp();
