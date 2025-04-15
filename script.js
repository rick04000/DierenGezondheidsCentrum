// Main JavaScript file for DierenGezondheidscentrum
document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Initialize all components
    initHeader();
    initHeroSlider();
    initCounters();
    initTabs();
    initMobileMenu();
    initScrollReveal();
    initBackToTop();
    initDropdowns();
  });
  
  // Header behavior on scroll
  function initHeader() {
    const header = document.querySelector('.site-header');
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // Hero slider functionality
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    if (slides.length <= 1) return;
    
    function showSlide(index) {
      slides.forEach(slide => slide.classList.remove('active'));
      slides[index].classList.add('active');
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }
    
    // Auto-advance slides every 7 seconds
    setInterval(nextSlide, 7000);
  }
  
  // Animated counters
  function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    if (!counters.length) return;
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseFloat(counter.getAttribute('data-count'));
          const duration = 2000;
          const step = target / duration * 10;
          let current = 0;
          
          const updateCounter = () => {
            current += step;
            if (current < target) {
              if (Number.isInteger(target)) {
                counter.textContent = Math.floor(current);
              } else {
                counter.textContent = current.toFixed(1);
              }
              setTimeout(updateCounter, 10);
            } else {
              counter.textContent = target;
            }
          };
          
          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.2 });
    
    counters.forEach(counter => {
      counterObserver.observe(counter);
    });
  }
  
  // Tabs functionality
  function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (!tabButtons.length) return;
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-tab');
        
        // Update active tab button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding tab panel
        tabPanels.forEach(panel => panel.classList.remove('active'));
        document.getElementById(`${targetId}-tab`).classList.add('active');
      });
    });
  }
  
  // Mobile navigation menu
  function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdownLinks = document.querySelectorAll('.has-dropdown > a');
    
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(event.target) && 
          !menuToggle.contains(event.target)) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
    
    // Mobile dropdown menus
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          this.parentNode.classList.toggle('active');
        }
      });
    });
  }
  
  // Scroll animations
  function initScrollReveal() {
    const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const elementInView = (el, offset = 150) => {
      const elementTop = el.getBoundingClientRect().top;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
      );
    };
    
    const displayScrollElement = (element) => {
      element.classList.add('active');
    };
    
    const hideScrollElement = (element) => {
      element.classList.remove('active');
    };
    
    const handleScrollAnimation = () => {
      elements.forEach((el) => {
        if (elementInView(el, 100)) {
          displayScrollElement(el);
        } else {
          hideScrollElement(el);
        }
      });
    };
    
    window.addEventListener('scroll', () => {
      handleScrollAnimation();
    });
    
    // Initialize
    handleScrollAnimation();
  }
  
  // Back to top button
  function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
      if (window.scrollY > 500) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
      } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
      }
    });
    
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  // Dropdown menu functionality
  function initDropdowns() {
    const dropdowns = document.querySelectorAll('.has-dropdown');
    
    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.dropdown');
      
      if (window.innerWidth > 991) {
        // Apply hover delay for desktop
        let timeout;
        
        dropdown.addEventListener('mouseenter', () => {
          clearTimeout(timeout);
          dropdowns.forEach(d => {
            if (d !== dropdown) {
              d.classList.remove('active');
            }
          });
          dropdown.classList.add('active');
        });
        
        dropdown.addEventListener('mouseleave', () => {
          timeout = setTimeout(() => {
            dropdown.classList.remove('active');
          }, 200);
        });
      }
    });
  }
  
  // Form validation
  document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        let isValid = true;
        const requiredFields = contactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
          } else {
            field.classList.remove('error');
          }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('input[type="email"]');
        if (emailField && emailField.value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
          }
        }
        
        if (isValid) {
          // Here you would typically send the form data to your server
          // For demo purposes, we'll just show a success message
          contactForm.innerHTML = `
            <div class="form-success">
              <div class="success-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Bericht succesvol verzonden!</h3>
              <p>Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.</p>
            </div>
          `;
        }
      });
      
      // Remove error class on input
      contactForm.querySelectorAll('input, textarea, select').forEach(field => {
        field.addEventListener('input', function() {
          this.classList.remove('error');
        });
      });
    }
  });
  
  // Additional CSS for form validation
  document.head.insertAdjacentHTML('beforeend', `
    <style>
      .error {
        border-color: var(--error) !important;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1) !important;
      }
      
      .form-success {
        text-align: center;
        padding: 2rem;
      }
      
      .success-icon {
        color: var(--success);
        font-size: 4rem;
        margin-bottom: 1.5rem;
      }
      
      .form-success h3 {
        color: var(--success);
        margin-bottom: 1rem;
      }
    </style>
  `);
  
  // Testimonial carousel
  document.addEventListener('DOMContentLoaded', function() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dotsContainer = document.querySelector('.testimonial-dots');
    
    if (testimonialItems.length <= 1 || !dotsContainer) return;
    
    // Create dots
    testimonialItems.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    let currentSlide = 0;
    const dots = document.querySelectorAll('.dot');
    
    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }
    
    function updateSlider() {
      testimonialItems.forEach((item, index) => {
        if (index === currentSlide) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
          item.style.opacity = '0';
        }
      });
      
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
    
    function nextSlide() {
      currentSlide = (currentSlide + 1) % testimonialItems.length;
      updateSlider();
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize
    updateSlider();
  });