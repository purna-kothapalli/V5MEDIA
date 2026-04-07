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
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ===== PARTICLES =====
(function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = p.style.height = (Math.random() * 3 + 1) + 'px';
    p.style.animationDuration = (Math.random() * 12 + 8) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.background = Math.random() > 0.5 ? '#FFD700' : '#e8192c';
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


// ===== CONTACT FORM =====
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const success = document.getElementById('form-success');

    // Validation
    const name = document.getElementById('full-name').value.trim();
    const phone = document.getElementById('phone-number').value.trim();
    const course = document.getElementById('course-select').value;
    const terms = document.getElementById('terms-check').checked;

    if (!name || !phone || !course || !terms) {
      alert('Please fill in all required fields and accept the terms.');
      return;
    }

    btnText.style.display = 'none';
    btnLoader.style.display = 'inline';
    btn.disabled = true;

    setTimeout(() => {
      btn.style.display = 'none';
      success.style.display = 'flex';
      this.reset();
    }, 1500);
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

