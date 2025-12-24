/* ================================================
   SFDP - Society for Disease Prevention
   Main JavaScript File
   ================================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components (merged)
  initHeader();
  initMobileMenu();
  initScrollAnimations();
  initCounters();
  initFAQ();
  initBackToTop();
  initSmoothScroll();
  initFormValidation();
  initYouTubeVideos();
  initLazyLoading();
  initTabs();
  initModals();
  initVideoPlayer();
  initNewsletterForm();
});

/* -------------------- YouTube Videos Feed -------------------- */
function initYouTubeVideos() {
  // Enabled: fetch and display latest YouTube videos
  
  const container = document.getElementById('youtubeVideos');
  if (!container) return;
  
  const channelHandle = 'societyfordiseasepreventioninc';
  const channelId = 'UCQpcdv3QCSSZmMLqPaVpkkA';
  const apiKey = 'qcywveqfwjgxiusevrxem7i1vffbczndp9aux9q5';
  // Using RSS2JSON service to fetch YouTube RSS feed with API key
  const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok' && data.items && data.items.length > 0) {
        displayVideos(data.items.slice(0, 3), container);
      } else {
        displayFallbackVideos(container, channelHandle);
      }
    })
    .catch(error => {
      console.log('Loading YouTube feed fallback...');
      displayFallbackVideos(container, channelHandle);
    });
}

function displayVideos(videos, container) {
  container.innerHTML = '';
  
  videos.forEach((video, index) => {
    // Extract video ID from link
    const videoId = video.link ? video.link.split('v=')[1] : '';
    const thumbnail = video.thumbnail || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    const pubDate = new Date(video.pubDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    const videoCard = document.createElement('div');
    videoCard.className = `video-card scroll-animate delay-${index}`;
    videoCard.innerHTML = `
      <a href="${video.link}" target="_blank" rel="noopener" class="video-thumbnail">
        <img src="${thumbnail}" alt="${video.title}">
        <div class="play-button"><i class="fas fa-play"></i></div>
      </a>
      <div class="video-info">
        <h4 class="video-title">${video.title}</h4>
        <p class="video-meta">${pubDate}</p>
      </div>
    `;
    
    container.appendChild(videoCard);
  });
}

function displayFallbackVideos(container, channelHandle) {
  // Display channel embed as fallback
  container.innerHTML = `
    <div class="youtube-embed-wrapper">
      <p class="text-center text-gray mb-lg">Watch our latest health education content</p>
      <div class="youtube-channel-embed">
        <iframe 
          src="https://www.youtube.com/embed?listType=user_uploads&list=${channelHandle}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      </div>
    </div>
  `;
}

/* -------------------- Header Scroll Effect -------------------- */
function initHeader() {
  const header = document.querySelector('.header');
  if (!header) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class when scrolling down
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

/* -------------------- Mobile Menu Toggle -------------------- */
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!menuToggle || !navMenu) return;
  
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close menu when clicking on a link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

/* -------------------- Scroll Animations -------------------- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.scroll-animate');
  
  if (!animatedElements.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  animatedElements.forEach(el => observer.observe(el));
}

/* -------------------- Animated Counters -------------------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number, .hero-stat-number');
  
  if (!counters.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        animateCounter(entry.target);
        entry.target.classList.add('counted');
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes('+');
  const hasPercent = text.includes('%');
  const hasK = text.includes('K');
  const hasM = text.includes('M');
  
  let cleanNumber = text.replace(/[^0-9.]/g, '');
  const target = parseFloat(cleanNumber);
  
  if (isNaN(target)) return;
  
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    
    let display = Math.floor(current);
    
    // Format number with commas
    if (display >= 1000 && !hasK && !hasM) {
      display = display.toLocaleString();
    }
    
    // Add suffix back
    let suffix = '';
    if (hasPlus) suffix += '+';
    if (hasPercent) suffix += '%';
    if (hasK) suffix = 'K' + suffix;
    if (hasM) suffix = 'M' + suffix;
    
    element.textContent = display + suffix;
  }, duration / steps);
}

/* -------------------- FAQ Accordion -------------------- */
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  if (!faqQuestions.length) return;
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const isActive = question.classList.contains('active');
      const answer = question.nextElementSibling;
      
      // Close all other FAQs
      faqQuestions.forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.classList.remove('active');
      });
      
      // Toggle current FAQ
      if (!isActive) {
        question.classList.add('active');
        answer.classList.add('active');
      }
    });
  });
}

/* -------------------- Back to Top Button -------------------- */
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top');
  
  if (!backToTop) return;
  
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* -------------------- Smooth Scroll for Anchor Links -------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (href === '#' || href === '') return;
      
      e.preventDefault();
      
      const target = document.querySelector(href);
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* -------------------- Form Validation -------------------- */
function initFormValidation() {
  const forms = document.querySelectorAll('form[data-validate]');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      let isValid = true;
      
      // Clear previous errors
      form.querySelectorAll('.form-error').forEach(error => error.remove());
      form.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
      
      // Validate required fields
      const requiredFields = form.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        if (!field.value.trim()) {
          isValid = false;
          showError(field, 'This field is required');
        }
      });
      
      // Validate email fields
      const emailFields = form.querySelectorAll('[type="email"]');
      emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
          isValid = false;
          showError(field, 'Please enter a valid email address');
        }
      });
      
      if (!isValid) {
        e.preventDefault();
      }
    });
  });
}

function showError(field, message) {
  field.classList.add('error');
  const errorDiv = document.createElement('div');
  errorDiv.className = 'form-error';
  errorDiv.textContent = message;
  errorDiv.style.color = '#ef4444';
  errorDiv.style.fontSize = '0.875rem';
  errorDiv.style.marginTop = '0.25rem';
  field.parentNode.appendChild(errorDiv);
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/* -------------------- Utility Functions -------------------- */

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/* -------------------- Image Lazy Loading -------------------- */
function initLazyLoading() {
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if (!lazyImages.length) return;
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
}

/* -------------------- Tabs Component -------------------- */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tabs');
  
  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanels = container.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.dataset.tab;
        
        // Remove active from all
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));
        
        // Add active to current
        button.classList.add('active');
        document.getElementById(target)?.classList.add('active');
      });
    });
  });
}

/* -------------------- Modal Component -------------------- */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modalCloseButtons = document.querySelectorAll('.modal-close');
  const modals = document.querySelectorAll('.modal');
  
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.dataset.modal;
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });
  
  modalCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
  });
}

/* -------------------- Typewriter Effect -------------------- */
function initTypewriter() {
  const typewriters = document.querySelectorAll('.typewriter');
  
  typewriters.forEach(element => {
    const text = element.dataset.text || element.textContent;
    const speed = parseInt(element.dataset.speed) || 100;
    element.textContent = '';
    
    let i = 0;
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    // Start typing when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          type();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(element);
  });
}

/* -------------------- Parallax Effect -------------------- */
function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  
  if (!parallaxElements.length) return;
  
  window.addEventListener('scroll', throttle(() => {
    parallaxElements.forEach(element => {
      const speed = parseFloat(element.dataset.speed) || 0.5;
      const yPos = -(window.pageYOffset * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 10));
}

/* -------------------- Video Player -------------------- */
function initVideoPlayer() {
  const videoTriggers = document.querySelectorAll('.video-trigger');
  
  videoTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const videoId = trigger.dataset.video;
      const videoType = trigger.dataset.type || 'youtube';
      
      let embedUrl = '';
      if (videoType === 'youtube') {
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      } else if (videoType === 'vimeo') {
        embedUrl = `https://player.vimeo.com/video/${videoId}?autoplay=1`;
      }
      
      // Create modal with video
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-content">
          <button class="video-modal-close">&times;</button>
          <iframe src="${embedUrl}" frameborder="0" allowfullscreen allow="autoplay"></iframe>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden';
      
      // Add styles
      modal.style.cssText = `
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        padding: 2rem;
      `;
      
      const content = modal.querySelector('.video-modal-content');
      content.style.cssText = `
        position: relative;
        width: 100%;
        max-width: 900px;
        aspect-ratio: 16/9;
      `;
      
      const iframe = modal.querySelector('iframe');
      iframe.style.cssText = `
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
      `;
      
      const closeBtn = modal.querySelector('.video-modal-close');
      closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
      `;
      
      closeBtn.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
          document.body.style.overflow = '';
        }
      });
    });
  });
}

/* -------------------- Newsletter Form -------------------- */
function initNewsletterForm() {
  const newsletterForms = document.querySelectorAll('.newsletter-form');
  
  newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const emailInput = form.querySelector('input[type="email"]');
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      
      if (!emailInput.value || !isValidEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address');
        return;
      }
      
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Subscribing...';
      
      // Simulate API call (replace with actual endpoint)
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Success
        emailInput.value = '';
        submitBtn.textContent = 'Subscribed!';
        submitBtn.style.background = '#10b981';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);
        
      } catch (error) {
        submitBtn.textContent = 'Error. Try again.';
        submitBtn.style.background = '#ef4444';
        
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
          submitBtn.style.background = '';
        }, 3000);
      }
    });
  });
}

