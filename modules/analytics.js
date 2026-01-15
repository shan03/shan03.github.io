const counter = new Counter({ workspace: 'shan03' });

const COUNTER_CONFIG = {
  workspace: 'shan03',
  downloads: 'shan03-downloads',
  views: 'shan03-views'
};

const DEFAULT_COUNT = '0';

async function updateCounter(counterKey, elementId) {
  try {
    const result = await counter.get(counterKey);
    const count = result?.data?.up_count ?? DEFAULT_COUNT;
    document.getElementById(elementId).textContent = count;
  } catch (error) {
    console.error(`Error fetching counter for ${counterKey}:`, error);
    document.getElementById(elementId).textContent = DEFAULT_COUNT;
  }
}

async function incrementCounter(counterKey, elementId) {
  try {
    const result = await counter.up(counterKey);
    const count = result?.data?.up_count ?? DEFAULT_COUNT;
    document.getElementById(elementId).textContent = count;
  } catch (error) {
    console.error(`Error incrementing counter for ${counterKey}:`, error);
    document.getElementById(elementId).textContent = DEFAULT_COUNT;
  }
}

export function initializeAnalytics() {
  const downloadBtn = document.getElementById('downloadBtn');

  updateCounter(COUNTER_CONFIG.downloads, 'download-count');
  incrementCounter(COUNTER_CONFIG.views, 'view-count');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      incrementCounter(COUNTER_CONFIG.downloads, 'download-count');
    });
  }
}
