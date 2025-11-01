// Portfolio Website Interactive Functionality

// DOM Elements
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('.section[id]');
const scrollTop = document.getElementById('scroll-top');
const header = document.getElementById('header');
const contactForm = document.querySelector('.contact__form');
const heroButtons = document.querySelectorAll('.hero__button');

// Mobile Navigation Toggle
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close mobile menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Smooth Scrolling for All Links (Navigation + Hero buttons)
function setupSmoothScrolling() {
    // Handle navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            scrollToSection(targetId);
        });
    });

    // Handle hero buttons
    heroButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href');
            scrollToSection(targetId);
        });
    });

    // Handle scroll-down button
    const scrollButton = document.querySelector('.hero__scroll-button');
    if (scrollButton) {
        scrollButton.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = scrollButton.getAttribute('href');
            scrollToSection(targetId);
        });
    }
}

function scrollToSection(targetId) {
    if (targetId && targetId.startsWith('#')) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Active Navigation Link Highlighting
function highlightActiveLink() {
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            if (correspondingLink) {
                correspondingLink.classList.add('active-link');
            }
        }
    });
}

// Header Background on Scroll
function updateHeaderBackground() {
    if (window.scrollY >= 50) {
        header.style.backgroundColor = 'rgba(252, 252, 249, 0.98)';
        header.style.boxShadow = 'var(--shadow-sm)';
    } else {
        header.style.backgroundColor = 'rgba(252, 252, 249, 0.95)';
        header.style.boxShadow = 'none';
    }
}

// Show/Hide Scroll Top Button
function toggleScrollTopButton() {
    if (window.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}

// Scroll to Top Functionality
if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Counter Animation for About Info - Fixed to prevent multiple animations
let countersAnimated = false;

function animateCounters() {
    if (countersAnimated) return; // Prevent multiple animations
    
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const aboutSectionTop = aboutSection.getBoundingClientRect().top;
    const aboutSectionVisible = 300;
    
    if (aboutSectionTop < window.innerHeight - aboutSectionVisible) {
        countersAnimated = true;
        
        const counterData = [
            { element: '.about__info-item:nth-child(1) .about__info-title', target: 2, suffix: '+' },
            { element: '.about__info-item:nth-child(2) .about__info-title', target: 50, suffix: '+' },
            { element: '.about__info-item:nth-child(3) .about__info-title', target: 5, suffix: '+' }
        ];
        
        counterData.forEach(({ element, target, suffix }) => {
            const counter = document.querySelector(element);
            if (!counter) return;
            
            let current = 0;
            const increment = target / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + suffix;
            }, 50);
        });
    }
}

// Skills Bar Animation - Fixed to prevent multiple animations
let skillsAnimated = false;

function animateSkillsBars() {
    if (skillsAnimated) return; // Prevent multiple animations
    
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;
    
    const skillsSectionTop = skillsSection.getBoundingClientRect().top;
    const skillsSectionVisible = 300;
    
    if (skillsSectionTop < window.innerHeight - skillsSectionVisible) {
        skillsAnimated = true;
        
        const skillsBars = document.querySelectorAll('.skills__percentage');
        skillsBars.forEach((bar, index) => {
            setTimeout(() => {
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            }, index * 200);
        });
    }
}

// Contact Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--color-surface);
        border: 1px solid var(--color-card-border);
        border-radius: var(--radius-lg);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        min-width: 300px;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    `;
    
    // Add type-specific styling
    if (type === 'success') {
        notification.style.borderColor = 'var(--color-success)';
        notification.querySelector('i').style.color = 'var(--color-success)';
    } else if (type === 'error') {
        notification.style.borderColor = 'var(--color-error)';
        notification.querySelector('i').style.color = 'var(--color-error)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

// Portfolio Animation
let portfolioAnimated = false;

function animatePortfolioItems() {
    if (portfolioAnimated) return;
    
    const portfolioSection = document.getElementById('portfolio');
    if (!portfolioSection) return;
    
    const portfolioSectionTop = portfolioSection.getBoundingClientRect().top;
    const portfolioSectionVisible = 200;
    
    if (portfolioSectionTop < window.innerHeight - portfolioSectionVisible) {
        portfolioAnimated = true;
        
        const portfolioItems = document.querySelectorAll('.portfolio__item');
        portfolioItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Initialize portfolio items for animation
function initializePortfolioItems() {
    const portfolioItems = document.querySelectorAll('.portfolio__item');
    portfolioItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease-out';
    });
}

// Scroll Event Listeners
window.addEventListener('scroll', () => {
    highlightActiveLink();
    updateHeaderBackground();
    toggleScrollTopButton();
    animateCounters();
    animateSkillsBars();
    animatePortfolioItems();
});

// Typing Animation for Hero Title
function typeWriter(element, text, speed = 100) {
    if (!element) return;
    
    element.innerHTML = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Setup smooth scrolling for all links
    setupSmoothScrolling();
    
    // Initialize portfolio items
    initializePortfolioItems();
    
    // Initial call to highlight active link
    highlightActiveLink();
    
    // Typing animation for hero title
    const heroName = document.querySelector('.hero__name');
    if (heroName) {
        const originalText = heroName.textContent;
        setTimeout(() => {
            typeWriter(heroName, originalText, 100);
        }, 500);
    }
});

// Resize event handler
window.addEventListener('resize', () => {
    highlightActiveLink();
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on escape
        navMenu.classList.remove('show-menu');
        
        // Close any open notifications
        const notification = document.querySelector('.notification');
        if (notification) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }
});

// Contact info click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Make contact info clickable
    const phoneInfo = document.querySelector('.contact__info:nth-child(1)');
    const emailInfo = document.querySelector('.contact__info:nth-child(2)');
    const linkedinInfo = document.querySelector('.contact__info:nth-child(3)');
    
    if (phoneInfo) {
        phoneInfo.style.cursor = 'pointer';
        phoneInfo.addEventListener('click', () => {
            window.open('tel:+918899069771');
        });
    }
    
    if (emailInfo) {
        emailInfo.style.cursor = 'pointer';
        emailInfo.addEventListener('click', () => {
            window.open('mailto:Gupta.garvit000@gmail.com');
        });
    }
    
    if (linkedinInfo) {
        linkedinInfo.style.cursor = 'pointer';
        linkedinInfo.addEventListener('click', () => {
            window.open('https://linkedin.com/in/garvit-gupta-326858135', '_blank');
        });
    }
});

// Smooth reveal animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize section animations
document.addEventListener('DOMContentLoaded', () => {
    const animateSections = document.querySelectorAll('.section');
    animateSections.forEach(section => {
        if (section.id !== 'home') { // Don't animate hero section
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease-out';
            sectionObserver.observe(section);
        }
    });
});