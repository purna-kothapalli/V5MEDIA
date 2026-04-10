// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  // Sticky CTA
  const stickyCta = document.getElementById('sticky-cta');
  if (window.scrollY > 500) stickyCta.classList.add('visible');
  else stickyCta.classList.remove('visible');
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});
// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    // Prevent the menu from closing if clicking the dropdown toggle on mobile
    if (window.innerWidth <= 768 && link.classList.contains('nav-link') && link.parentElement.classList.contains('nav-dropdown')) {
      return;
    }
    
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== EXQUISITE PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  
  // Embers
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = Math.random() > 0.4 ? 'ember' : 'ember dust';
    
    // Spawn mostly from bottom or randomly across screen
    p.style.left = Math.random() * 100 + 'vw';
    p.style.top = (Math.random() * 40 + 60) + 'vh'; // Lower half mostly
    
    const size = Math.random() * 4 + 1;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    
    p.style.animationDuration = (Math.random() * 8 + 6) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    
    // Custom drift directions
    p.style.setProperty('--dir-x', Math.random());
    p.style.setProperty('--dir-y', Math.random() * 0.5 + 0.5); // mostly up
    
    container.appendChild(p);
  }
})();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  }
  requestAnimationFrame(update);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.counter').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.hero-stats, .about-dark-panel').forEach(section => {
  counterObserver.observe(section);
});


// ===== EMAILJS CONFIGURATION (Primary: Internal Notifications) =====
const NOTIF_SERVICE_ID = 'service_g79i3us';
const NOTIF_PUBLIC_KEY = 'au-8-n_TEjnF6NVBa';
const NOTIF_TEMPLATE_ADMISSION = 'template_qotht0m';
const NOTIF_TEMPLATE_ENQUIRY = 'template_q3lonpk';

// ===== EMAILJS CONFIGURATION (Secondary: User Auto-Replies) =====
const AUTO_SERVICE_ID = 'service_vxmsmkd';
const AUTO_PUBLIC_KEY = 'fL75wbOsFvyZAk9Bf';
const AUTO_TEMPLATE_ADMISSION = 'template_prmfxh5';
const AUTO_TEMPLATE_ENQUIRY = 'template_yf72vte';

// ===== ADMISSION FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const success = document.getElementById('form-success');

    // Helper to show error
    const showError = (id, msg) => {
      const field = document.getElementById(id);
      const group = field.closest('.form-group') || field.parentElement;
      group.classList.add('error');
      let errSpan = group.querySelector('.error-message');
      if (!errSpan) {
        errSpan = document.createElement('span');
        errSpan.className = 'error-message';
        group.appendChild(errSpan);
      }
      errSpan.textContent = msg;
    };

    // Helper to clear all errors
    const clearErrors = () => {
      this.querySelectorAll('.form-group, .form-check').forEach(g => g.classList.remove('error'));
    };

    clearErrors();

    // Validation
    const name = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const email = document.getElementById('email-addr').value.trim();
    const course = document.getElementById('course-select').value;
    const terms = document.getElementById('terms-check').checked;

    let isValid = true;
    if (!name) { showError('full-name', 'Name is required'); isValid = false; }
    if (!course) { showError('course-select', 'Please select a course'); isValid = false; }
    if (!terms) { document.getElementById('terms-check').parentElement.classList.add('error'); isValid = false; }
    
    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      showError('email-addr', 'Please enter a valid email address');
      isValid = false;
    }

    // Phone Validation (10 Digits)
    if (!phone) {
      showError('phone-number', 'Phone number is required');
      isValid = false;
    } else if (phone.length !== 10) {
      showError('phone-number', 'Please enter exactly 10 digits');
      isValid = false;
    }

    if (!isValid) return;

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    btn.disabled = true;

    // 1. Send Notification to Admin (Primary Service)
    emailjs.sendForm(NOTIF_SERVICE_ID, NOTIF_TEMPLATE_ADMISSION, this, {
      publicKey: NOTIF_PUBLIC_KEY
    })
      .then(() => {
        // Show success UI early for responsiveness
        btn.style.display = 'none';
        success.style.display = 'flex';
        // 2. Send Auto-Reply to User (Secondary Service)
        // Must be called BEFORE this.reset() so fields aren't empty
        emailjs.sendForm(AUTO_SERVICE_ID, AUTO_TEMPLATE_ADMISSION, this, {
          publicKey: AUTO_PUBLIC_KEY
        }).catch(err => console.error('Auto-Reply Error:', err));

        this.reset();

        // Revert to normal after 8 seconds
        setTimeout(() => {
          success.style.display = 'none';
          btn.style.display = 'inline-block';
          btnText.style.display = 'inline';
          btnLoader.style.display = 'none';
          btn.disabled = false;
        }, 8000);
      }, (error) => {
        console.error('EmailJS Notification Error:', error);
        alert('Oops! Something went wrong. Please try again or contact us via WhatsApp.');
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        btn.disabled = false;
      });
  });
}

// ===== GENERAL ENQUIRY FORM =====
const enquiryForm = document.getElementById('enquiry-form');
if (enquiryForm) {
  enquiryForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('enquiry-submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const success = document.getElementById('enquiry-success');

    // Helper to show error
    const showError = (id, msg) => {
      const field = document.getElementById(id);
      const group = field.closest('.form-group') || field.parentElement;
      group.classList.add('error');
      let errSpan = group.querySelector('.error-message');
      if (!errSpan) {
        errSpan = document.createElement('span');
        errSpan.className = 'error-message';
        group.appendChild(errSpan);
      }
      errSpan.textContent = msg;
    };

    // Helper to clear all errors
    const clearErrors = () => {
      this.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
    };

    clearErrors();

    // Basic Validation
    const name = document.getElementById('enquiry-name').value.trim();
    const email = document.getElementById('enquiry-email').value.trim();
    const phone = document.getElementById('enquiry-phone').value.trim();
    const message = document.getElementById('enquiry-message').value.trim();

    let isValid = true;
    if (!name) { showError('enquiry-name', 'Name is required'); isValid = false; }
    if (!message) { showError('enquiry-message', 'Message is required'); isValid = false; }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      showError('enquiry-email', 'Email is required');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('enquiry-email', 'Valid email is required');
      isValid = false;
    }

    // Phone Validation (10 Digits)
    if (phone && phone.length !== 10) {
      showError('enquiry-phone', 'Please enter exactly 10 digits');
      isValid = false;
    }

    if (!isValid) return;

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    btn.disabled = true;

    // 1. Send Notification to Admin (Primary Service)
    emailjs.sendForm(NOTIF_SERVICE_ID, NOTIF_TEMPLATE_ENQUIRY, this, {
      publicKey: NOTIF_PUBLIC_KEY
    })
      .then(() => {
        // Show success UI early
        btn.style.display = 'none';
        success.style.display = 'flex';
        // 2. Send Auto-Reply to User (Secondary Service)
        // Must be called BEFORE this.reset()
        emailjs.sendForm(AUTO_SERVICE_ID, AUTO_TEMPLATE_ENQUIRY, this, {
          publicKey: AUTO_PUBLIC_KEY
        }).catch(err => console.error('Auto-Reply Error:', err));

        this.reset();

        // Revert to normal after 8 seconds
        setTimeout(() => {
          success.style.display = 'none';
          btn.style.display = 'inline-block';
          btnText.style.display = 'inline';
          btnLoader.style.display = 'none';
          btn.disabled = false;
        }, 8000);
      }, (error) => {
        console.error('EmailJS Notification Error:', error);
        alert('Failed to send details. Please try again or call us.');
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        btn.disabled = false;
      });
  });
}

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => navObserver.observe(s));

// ===== SCROLL ANIMATIONS (REVEAL) =====
const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target); // Only animate once
    }
  });
}, revealOptions);

// Initialize reveal animations
const initReveals = () => {
  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initReveals);
} else {
  initReveals();
}

// Mobile Dropdown Toggle
document.querySelectorAll('.nav-dropdown > .nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      link.parentElement.classList.toggle('active');
    }
  });
});

// ===== FAQ ACCORDION LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Toggle active class on the clicked item
        const isActive = item.classList.contains('active');
        
        // Optional: Close other items (Exclusive Accordion)
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
});

// ===== CAROUSEL DOTS HELPER =====
function initCarousel(gridSelector, dotsSelector, cardSelector) {
  const grid = document.querySelector(gridSelector);
  const dotsContainer = document.querySelector(dotsSelector);
  
  if (grid && dotsContainer) {
    const cards = grid.querySelectorAll(cardSelector);
    if (cards.length === 0) return;

    // Create dots
    cards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        grid.scrollTo({
          left: cards[i].offsetLeft - grid.offsetLeft,
          behavior: 'smooth'
        });
      });
      dotsContainer.appendChild(dot);
    });

    // Update active dot on scroll
    grid.addEventListener('scroll', () => {
      const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(grid).gap || 0);
      const scrollIndex = Math.round(grid.scrollLeft / cardWidth);
      const dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === scrollIndex);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initCarousel('.why-grid', '.why-dots', '.why-card');
  initCarousel('.testimonials-viewport', '.testimonial-dots', '.t-card');

  // Auto-scroll logic for testimonials
  const testGrid = document.querySelector('.testimonials-viewport');
  let testScrollerInterval;
  
  if (testGrid) {
    const startTestScroll = () => {
      testScrollerInterval = setInterval(() => {
        // Only auto-scroll if it's actually scrollable (mobile carousel mode)
        if (testGrid.scrollWidth <= testGrid.clientWidth) return;
        
        const cards = testGrid.querySelectorAll('.t-card');
        if (!cards.length) return;
        const cardWidth = cards[0].offsetWidth + parseInt(window.getComputedStyle(testGrid.querySelector('.testimonials-track')).gap || 16);
        
        // If reached the end, go back to start
        if (testGrid.scrollLeft + testGrid.clientWidth >= testGrid.scrollWidth - 10) {
          testGrid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          testGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }, 2500); // 2.5 seconds
    };

    startTestScroll();

    // Pause on hover or touch
    testGrid.addEventListener('mouseenter', () => clearInterval(testScrollerInterval));
    testGrid.addEventListener('mouseleave', startTestScroll);
    testGrid.addEventListener('touchstart', () => clearInterval(testScrollerInterval));
    testGrid.addEventListener('touchend', startTestScroll);
  }

  // Add arrow event listeners for Why Choose Us carousel
  const whyGrid = document.querySelector('.why-grid');
  const whyPrev = document.getElementById('why-prev');
  const whyNext = document.getElementById('why-next');
  if (whyGrid && whyPrev && whyNext) {
    whyPrev.addEventListener('click', () => {
      const cardWidth = whyGrid.querySelector('.why-card').offsetWidth + parseInt(window.getComputedStyle(whyGrid).gap || 0) || 300;
      whyGrid.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
    whyNext.addEventListener('click', () => {
      const cardWidth = whyGrid.querySelector('.why-card').offsetWidth + parseInt(window.getComputedStyle(whyGrid).gap || 0) || 300;
      whyGrid.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });
  }

  // --- Numeric restrictions for phone fields ---
  const phoneFields = ['phone-number', 'enquiry-phone'];
  phoneFields.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, ''); // Numbers only
        if (this.value.length > 10) this.value = this.value.slice(0, 10); // Cap at 10
      });
    }
  });

  // --- Clear errors on typing ---
  document.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      const group = input.closest('.form-group') || input.closest('.form-check');
      if (group) group.classList.remove('error');
    });
  });
});


