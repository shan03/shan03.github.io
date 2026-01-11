 document.getElementById('current-year').textContent = new Date().getFullYear();
  // Mobile Menu Toggle
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => navLinks.classList.toggle('active'));

// Close nav-links dropdown when a nav-link is clicked
const navLinkItems = document.querySelectorAll('.nav-links a');
navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

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
  let ticking = false;
  const menuToggle = document.querySelector('.menu-toggle');
  
  function isMenuToggleVisible() {
    if (!menuToggle) return false;
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
      // Scrolling down - hide menu toggle
      menuToggle.classList.add('menu-toggle-hidden');
    } else if (currentScrollTop < lastScrollTop || currentScrollTop <= 50) {
      // Scrolling up or at top - show menu toggle
      menuToggle.classList.remove('menu-toggle-hidden');
    }
    
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    ticking = false;
  }
  
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(handleMenuToggleScroll);
      ticking = true;
    }
  }, { passive: true });
  
  // Reset menu toggle visibility on window resize
  window.addEventListener("resize", () => {
    if (menuToggle && !isMenuToggleVisible()) {
      menuToggle.classList.remove('menu-toggle-hidden');
    }
  });

  // Navbar hide/show on scroll
  let navbarLastScrollTop = 0;
  let navbarTicking = false;
  const navbar = document.querySelector('.navbar');
  const SCROLL_THRESHOLD = 100;
  
  function handleNavbarScroll() {
    if (!navbar) {
      navbarTicking = false;
      return;
    }
    
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScrollTop > navbarLastScrollTop && currentScrollTop > SCROLL_THRESHOLD) {
      // Scrolling down - hide navbar
      navbar.classList.add('navbar-hidden');
    } else if (currentScrollTop < navbarLastScrollTop || currentScrollTop <= SCROLL_THRESHOLD) {
      // Scrolling up or at top - show navbar
      navbar.classList.remove('navbar-hidden');
    }
    
    navbarLastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    navbarTicking = false;
  }
  
  window.addEventListener("scroll", () => {
    if (!navbarTicking) {
      window.requestAnimationFrame(handleNavbarScroll);
      navbarTicking = true;
    }
  }, { passive: true });