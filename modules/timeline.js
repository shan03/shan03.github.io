export function initializeTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  const timeline = document.querySelector('.timeline');

  if (!timeline || timelineItems.length === 0) return;

  let timelineAnimated = false;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (timeline && !timelineAnimated) {
            timeline.classList.add('line-animate');
            timelineAnimated = true;
            setTimeout(() => {
              entry.target.classList.add('show');
            }, 200);
          } else {
            entry.target.classList.add('show');
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  const timelineObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !timelineAnimated) {
          timeline.classList.add('line-animate');
          timelineAnimated = true;
        }
      });
    },
    { threshold: 0.1 }
  );

  timelineObserver.observe(timeline);
  timelineItems.forEach(item => observer.observe(item));

  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      timelineItems.forEach(i => {
        if (i !== item) i.classList.remove('active');
      });
      item.classList.toggle('active');
    });
  });
}
