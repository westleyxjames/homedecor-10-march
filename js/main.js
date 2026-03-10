// ========================================
// LuxeHome Decor & Styling - Main JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollEffects();
    initBackToTop();
    initContactForm();
    initFAQ();
    highlightActiveNav();
    initSmoothScroll();
    
    console.log('%c🏠 LuxeHome Decor & Styling', 'color: #0d9488; font-size: 24px; font-weight: bold;');
    console.log('%cWelcome to luxury living!', 'color: #737373; font-size: 14px;');
});

// ========== MOBILE MENU ==========
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav a');
    
    if (toggle && nav) {
        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const isActive = nav.classList.contains('active');
            this.textContent = isActive ? '✕' : '☰';
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                toggle.textContent = '☰';
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                toggle.textContent = '☰';
                document.body.style.overflow = '';
            }
        });
    }
}

// ========== SCROLL EFFECTS ==========
function initScrollEffects() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ========== BACK TO TOP BUTTON ==========
function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 400) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Validate email
            if (!validateEmail(data.email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Log form data (in production, this would be sent to a server)
            console.log('Form submitted:', data);
            
            // Show success message
            showFormMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
            
            // Reset form after 2 seconds
            setTimeout(() => {
                form.reset();
            }, 2000);
        });
    }
}

function showFormMessage(message, type) {
    const messageEl = document.getElementById('form-message');
    if (messageEl) {
        messageEl.textContent = message;
        messageEl.className = `form-message ${type}`;
        messageEl.style.display = 'block';
        
        setTimeout(() => {
            messageEl.style.display = 'none';
        }, 5000);
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// ========== FAQ ACCORDION ==========
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.closest('.faq-item');
            const wasActive = item.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!wasActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========== HIGHLIGHT ACTIVE NAV ==========
function highlightActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// ========== SMOOTH SCROLL ==========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
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

// ========== UTILITY FUNCTIONS ==========

// Throttle function for performance
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format phone number
function formatPhone(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
    }
    return phone;
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
