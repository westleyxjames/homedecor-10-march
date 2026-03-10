// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    
    // Initialize navigation
    initNavigation();
    
    // Initialize header scroll effect
    initHeaderScroll();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form handling
    initForms();
    
    // Load services on services page
    loadServices();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Navigation System
function initNavigation() {
    const navLinks = document.querySelectorAll('[data-nav]');
    const pages = document.querySelectorAll('.page');
    
    // Handle navigation clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-nav');
            
            // If clicking contact from any page, scroll to contact section
            if (target === 'contact') {
                navigateToPage('home');
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                navigateToPage(target);
            }
            
            // Update active state
            updateActiveNav(target);
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Handle hash navigation on page load
    const hash = window.location.hash.substring(1);
    if (hash && hash !== 'home') {
        navigateToPage(hash);
        updateActiveNav(hash);
    }
}

function navigateToPage(pageId) {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL hash
        window.history.pushState(null, '', `#${pageId}`);
        
        // Reinitialize icons for the new page
        setTimeout(() => {
            lucide.createIcons();
        }, 100);
    }
}

function updateActiveNav(target) {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-nav') === target) {
            link.classList.add('active');
        }
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Mobile Menu
function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    
    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            
            // Update icon
            const icon = toggle.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });
    }
}

function closeMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const toggle = document.getElementById('mobile-menu-toggle');
    
    if (menu && menu.classList.contains('active')) {
        menu.classList.remove('active');
        
        // Reset icon
        const icon = toggle.querySelector('i');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
    }
}

// Form Handling
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactSubmit(contactForm);
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleNewsletterSubmit(newsletterForm);
        });
    }
}

function handleContactSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Contact form submitted:', data);
    
    // Hide form and show success message
    form.style.display = 'none';
    const successMessage = document.getElementById('form-success');
    if (successMessage) {
        successMessage.classList.add('show');
        successMessage.style.display = 'flex';
    }
    
    // Reset form after 5 seconds
    setTimeout(() => {
        form.reset();
        form.style.display = 'flex';
        if (successMessage) {
            successMessage.classList.remove('show');
            successMessage.style.display = 'none';
        }
    }, 5000);
}

function handleNewsletterSubmit(form) {
    const formData = new FormData(form);
    const email = formData.get('email') || form.querySelector('input[type="email"]').value;
    
    console.log('Newsletter subscription:', email);
    
    // Show success feedback
    const button = form.querySelector('button');
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i data-lucide="check"></i> Subscribed!';
    lucide.createIcons();
    button.disabled = true;
    
    // Reset after 3 seconds
    setTimeout(() => {
        form.reset();
        button.innerHTML = originalText;
        button.disabled = false;
        lucide.createIcons();
    }, 3000);
}

// Load Services Data
function loadServices() {
    const servicesContainer = document.getElementById('services-container');
    
    if (!servicesContainer) return;
    
    const services = [
        {
            icon: 'home',
            title: 'Complete Home Styling',
            description: 'End-to-end interior design solutions for your entire home. We handle everything from concept development to final installation, ensuring a cohesive and stunning result throughout every room.',
            features: ['Space Planning', 'Color Scheme Design', 'Furniture Selection', 'Complete Installation'],
            gradient: 'gradient-bg-blue'
        },
        {
            icon: 'palette',
            title: 'Modern & Luxury Decor',
            description: 'Contemporary design meets timeless elegance. We curate modern luxury pieces that create sophisticated spaces with clean lines, premium materials, and artistic flair.',
            features: ['Designer Pieces', 'Premium Materials', 'Custom Accents', 'Statement Furniture'],
            gradient: 'gradient-bg-purple'
        },
        {
            icon: 'paintbrush',
            title: 'Space Planning & Color Consultation',
            description: 'Expert guidance on optimizing your space and selecting the perfect color palette. Our designers analyze flow, functionality, and aesthetics to maximize your home\'s potential.',
            features: ['Layout Optimization', 'Color Psychology', 'Lighting Analysis', 'Flow Planning'],
            gradient: 'gradient-bg-amber'
        },
        {
            icon: 'sofa',
            title: 'Furniture Selection & Placement',
            description: 'Carefully curated furniture that balances style, comfort, and functionality. We source premium pieces and arrange them to create perfect harmony in your space.',
            features: ['Custom Sourcing', 'Scale Assessment', 'Ergonomic Design', 'Style Matching'],
            gradient: 'gradient-bg-green'
        },
        {
            icon: 'lightbulb',
            title: 'Lighting Design',
            description: 'Transform spaces with strategic lighting solutions. From ambient to task lighting, we create layered illumination that enhances mood and functionality.',
            features: ['Ambient Lighting', 'Task Lighting', 'Accent Fixtures', 'Smart Controls'],
            gradient: 'gradient-bg-yellow'
        },
        {
            icon: 'paintbrush',
            title: 'Wall Texture & Artwork',
            description: 'Elevate your walls with stunning textures and carefully selected artwork. We create focal points that reflect your personality and complete your design vision.',
            features: ['Texture Application', 'Art Curation', 'Gallery Walls', 'Accent Walls'],
            gradient: 'gradient-bg-rose'
        },
        {
            icon: 'bed',
            title: 'Bedroom Styling',
            description: 'Create your perfect sanctuary with our bedroom design expertise. We blend comfort with style to design restful retreats that reflect your personal taste.',
            features: ['Bed Selection', 'Bedding Coordination', 'Storage Solutions', 'Ambiance Creation'],
            gradient: 'gradient-bg-blue'
        },
        {
            icon: 'utensils-crossed',
            title: 'Kitchen & Dining Decor',
            description: 'Make your kitchen and dining areas the heart of your home. We combine functionality with beautiful design for spaces that are both practical and inviting.',
            features: ['Cabinet Styling', 'Dining Setup', 'Backsplash Design', 'Accessory Selection'],
            gradient: 'gradient-bg-green'
        },
        {
            icon: 'package',
            title: 'Custom Furniture & Accessories',
            description: 'Bespoke furniture and unique accessories crafted to your specifications. Our custom pieces ensure your space is truly one-of-a-kind and perfectly suited to your needs.',
            features: ['Custom Design', 'Artisan Craftsmanship', 'Unique Accessories', 'Made-to-Measure'],
            gradient: 'gradient-bg-purple'
        }
    ];
    
    servicesContainer.innerHTML = services.map(service => `
        <div class="service-card loading">
            <div class="service-icon ${service.gradient}">
                <i data-lucide="${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
            <ul class="service-features">
                ${service.features.map(feature => `
                    <li>
                        <i data-lucide="check-circle"></i>
                        <span>${feature}</span>
                    </li>
                `).join('')}
            </ul>
            <div class="service-link">
                Learn More
                <i data-lucide="arrow-right"></i>
            </div>
        </div>
    `).join('');
    
    // Reinitialize icons
    lucide.createIcons();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .process-step');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Don't prevent default for navigation links (handled by initNavigation)
        if (this.hasAttribute('data-nav')) {
            return;
        }
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const target = document.getElementById(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects to service cards
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.service-card')) {
        const card = e.target.closest('.service-card');
        card.style.transform = 'translateY(-8px)';
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('.service-card')) {
        const card = e.target.closest('.service-card');
        if (!card.matches(':hover')) {
            card.style.transform = 'translateY(0)';
        }
    }
});

// Handle browser back/forward buttons
window.addEventListener('popstate', () => {
    const hash = window.location.hash.substring(1);
    const pageId = hash || 'home';
    navigateToPage(pageId);
    updateActiveNav(pageId);
});

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call preload on load
window.addEventListener('load', preloadImages);

// Add parallax effect to hero sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-blob, .floating-shape');
    
    parallaxElements.forEach((el, index) => {
        const speed = 0.5 + (index * 0.1);
        el.style.transform = `translate(${scrolled * speed * 0.05}px, ${scrolled * speed * 0.1}px)`;
    });
});

// Console welcome message
console.log('%c🏠 Welcome to LuxeHome Decor & Styling!', 'color: #0d9488; font-size: 20px; font-weight: bold;');
console.log('%cTransform your space into a luxurious haven.', 'color: #737373; font-size: 14px;');
