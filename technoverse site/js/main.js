// ============================================
// TECHNOVERSE - Interactive JavaScript
// ============================================

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (window.innerWidth <= 968) {
                document.querySelector('.nav-links').classList.remove('active');
                document.getElementById('menuToggle').classList.remove('active');
            }
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    updateActiveNavLink();
});

// ===== MOBILE MENU TOGGLE =====
const menuToggle = document.getElementById('menuToggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ===== UPDATE ACTIVE NAV LINK =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== ANIMATED COUNTER =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            
            // Trigger counter animation for stats
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(el => {
    observer.observe(el);
});

// ===== PARTICLE ANIMATION =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        // Style the particle
        particle.style.position = 'absolute';
        particle.style.background = 'rgba(0, 240, 255, 0.6)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = '0 0 10px rgba(0, 240, 255, 0.8)';
        
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation styles
const style = document.createElement('style');
style.textContent = `
    .particle {
        animation: particleFloat linear infinite;
    }
    
    @keyframes particleFloat {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// ===== CONTACT FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        
        // Show success message (you can customize this)
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.position = 'fixed';
    notification.style.top = '100px';
    notification.style.right = '20px';
    notification.style.padding = '20px 30px';
    notification.style.background = type === 'success' 
        ? 'linear-gradient(135deg, #00f0ff 0%, #a855f7 100%)' 
        : 'linear-gradient(135deg, #ff006e 0%, #ff4d4d 100%)';
    notification.style.color = 'white';
    notification.style.borderRadius = '15px';
    notification.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    notification.style.zIndex = '10000';
    notification.style.fontWeight = '600';
    notification.style.fontSize = '0.95rem';
    notification.style.maxWidth = '400px';
    notification.style.animation = 'slideInRight 0.5s ease, slideOutRight 0.5s ease 3s';
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3.5 seconds
    setTimeout(() => {
        notification.remove();
    }, 3500);
}

// Add notification animation styles
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax for hero background
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallax for grid overlay
    const gridOverlay = document.querySelector('.grid-overlay');
    if (gridOverlay) {
        gridOverlay.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ===== CURSOR GLOW EFFECT =====
let cursorGlow = null;

function createCursorGlow() {
    if (window.innerWidth > 968) {
        cursorGlow = document.createElement('div');
        cursorGlow.className = 'cursor-glow';
        cursorGlow.style.position = 'fixed';
        cursorGlow.style.width = '300px';
        cursorGlow.style.height = '300px';
        cursorGlow.style.borderRadius = '50%';
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 240, 255, 0.15), transparent)';
        cursorGlow.style.pointerEvents = 'none';
        cursorGlow.style.zIndex = '9999';
        cursorGlow.style.transform = 'translate(-50%, -50%)';
        cursorGlow.style.transition = 'opacity 0.3s ease';
        cursorGlow.style.opacity = '0';
        document.body.appendChild(cursorGlow);
    }
}

// Initialize cursor glow
createCursorGlow();

// Update cursor glow position
document.addEventListener('mousemove', (e) => {
    if (cursorGlow && window.innerWidth > 968) {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
        cursorGlow.style.opacity = '1';
    }
});

// Hide cursor glow when mouse leaves window
document.addEventListener('mouseleave', () => {
    if (cursorGlow) {
        cursorGlow.style.opacity = '0';
    }
});

// ===== SERVICE CARD TILT EFFECT =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== PORTFOLIO ITEM HOVER EFFECT =====
const portfolioItems = document.querySelectorAll('.portfolio-item');

portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        overlay.style.clipPath = 'circle(150% at 50% 50%)';
    });
    
    item.addEventListener('mouseleave', () => {
        const overlay = item.querySelector('.portfolio-overlay');
        overlay.style.clipPath = 'circle(0% at 50% 50%)';
    });
});

// Initialize clip path
portfolioItems.forEach(item => {
    const overlay = item.querySelector('.portfolio-overlay');
    overlay.style.clipPath = 'circle(0% at 50% 50%)';
    overlay.style.transition = 'clip-path 0.6s ease';
});

// ===== TECH ICON ROTATION =====
const techIcons = document.querySelectorAll('.tech-icon');

techIcons.forEach((icon, index) => {
    // Add random rotation on load
    icon.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Smooth rotation on hover
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = `rotate(${Math.random() * 360}deg) scale(1.1)`;
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        if (email) {
            showNotification('Successfully subscribed to our newsletter!', 'success');
            newsletterForm.reset();
        }
    });
}

// ===== SCROLL TO TOP BUTTON =====
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.style.position = 'fixed';
    button.style.bottom = '30px';
    button.style.right = '30px';
    button.style.width = '50px';
    button.style.height = '50px';
    button.style.borderRadius = '50%';
    button.style.background = 'linear-gradient(135deg, #00f0ff 0%, #a855f7 100%)';
    button.style.border = 'none';
    button.style.color = 'white';
    button.style.fontSize = '1.2rem';
    button.style.cursor = 'pointer';
    button.style.zIndex = '9999';
    button.style.opacity = '0';
    button.style.transition = 'all 0.3s ease';
    button.style.boxShadow = '0 5px 20px rgba(0, 240, 255, 0.4)';
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.transform = 'scale(1)';
        } else {
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        if (window.pageYOffset > 500) {
            button.style.transform = 'scale(1)';
        }
    });
    
    document.body.appendChild(button);
}

// Initialize scroll to top button
createScrollToTopButton();

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
    // Fade in hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
    }
    
    // Start stat counter animation when in view
    const statNumbers = document.querySelectorAll('.stat-number');
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => heroObserver.observe(stat));
});

// ===== DYNAMIC YEAR IN FOOTER =====
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText && footerText.textContent.includes('2024')) {
    footerText.textContent = footerText.textContent.replace('2024', currentYear);
}

// ===== CONSOLE MESSAGE =====
console.log('%c⚡ TECHNOVERSE', 'font-size: 40px; font-weight: bold; background: linear-gradient(135deg, #00f0ff 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;');
console.log('%cBuilt with cutting-edge technology and innovation', 'font-size: 14px; color: #00f0ff;');
console.log('%cWebsite by Technoverse © ' + currentYear, 'font-size: 12px; color: #6b6b8f;');

// ===== PERFORMANCE OPTIMIZATION =====
// Lazy load images when implemented
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PREVENT SCROLL DURING ANIMATIONS =====
let isAnimating = false;

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', () => {
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, 1000);
    });
});

// ===== INITIALIZATION MESSAGE =====
console.log('%c✓ Technoverse Website Initialized Successfully', 'color: #00ff88; font-weight: bold; font-size: 14px;');
console.log('%cAll systems operational', 'color: #00f0ff; font-size: 12px;');