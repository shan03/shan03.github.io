 document.getElementById('current-year').textContent = new Date().getFullYear();
  // Mobile Menu Toggle
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// Dark mode toggle
const darkToggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('theme') === 'dark' || 
    (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.body.classList.add('dark-mode');
  darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  if(document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme','dark');
    darkToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    localStorage.setItem('theme','light');
    darkToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
});

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timeline = document.querySelector('.timeline');
let timelineAnimated = false;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      // Animate the center line first when timeline enters viewport
      if(timeline && !timelineAnimated){
        timeline.classList.add('line-animate');
        timelineAnimated = true;
        // Add slight delay before animating items for smoother sequence
        setTimeout(() => {
          entry.target.classList.add('show');
        }, 200);
      } else {
        entry.target.classList.add('show');
      }
    }
  });
}, { 
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

// Observe timeline container first, then individual items
if(timeline) {
  const timelineObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && !timelineAnimated){
        timeline.classList.add('line-animate');
        timelineAnimated = true;
      }
    });
  }, { threshold: 0.1 });
  timelineObserver.observe(timeline);
}

timelineItems.forEach(item => observer.observe(item));

// Mobile tap for hover-info
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    timelineItems.forEach(i => i !== item && i.classList.remove('active'));
    item.classList.toggle('active');
  });
});
  const dwnButton = document.getElementById('downloadBtn');
  const counter = new Counter({ workspace: 'shan03' });

 document.addEventListener('DOMContentLoaded', function() {
    // Get initial count
    counter.get('shan03-downloads')
      .then(result => {
        if (result && result.data !== undefined) {
           document.getElementById('download-count').textContent = result.data.up_count;
        } else {
          document.getElementById('download-count').textContent = '0';
        }
      })
      .catch(err => {
        console.error(err)
        document.getElementById('download-count').textContent = '0';
      });

    // Add click handler
    dwnButton.addEventListener('click', function() {
      counter.up('shan03-downloads')
        .then(result => {
          if (result && result.data !== undefined) {
          document.getElementById('download-count').textContent = result.data.up_count;}
          else {
            document.getElementById('download-count').textContent = '0';
          }
        })
        .catch(err => {
          console.error(err)
            document.getElementById('download-count').textContent = '0';
        });
    });
    // Increment the view count when the page loads
    counter.up('shan03-views')
      .then(result => {
        if (result && result.data !== undefined) {
          document.getElementById('view-count').textContent = result.data.up_count;
        } else {
          document.getElementById('view-count').textContent = '0';
        }
      })
      .catch(error => {
        console.error('Error tracking page view:', error);
        document.getElementById('view-count').textContent = '0';
      });
  });
  // Scroll to top button
   const scrollBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // Menu toggle hide/show on scroll
  let lastScrollTop = 0;
  const menuToggle = document.querySelector('.menu-toggle');
  
  window.addEventListener("scroll", () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply on mobile (when menu-toggle is visible)
    if (window.innerWidth <= 768 && menuToggle) {
      if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
        // Scrolling down - hide menu toggle
        menuToggle.classList.add('menu-toggle-hidden');
      } else if (currentScrollTop < lastScrollTop) {
        // Scrolling up - show menu toggle
        menuToggle.classList.remove('menu-toggle-hidden');
      }
      
      // Always show at the top of the page
      if (currentScrollTop <= 50) {
        menuToggle.classList.remove('menu-toggle-hidden');
      }
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  });