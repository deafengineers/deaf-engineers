// Cursor glow effect
const cursorGlow = document.querySelector('.cursor-glow');

if (cursorGlow && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // Enlarge on hover over interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card-3d, .content-card-3d');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.width = '60px';
            cursorGlow.style.height = '60px';
        });
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.width = '30px';
            cursorGlow.style.height = '30px';
        });
    });
}

// 3D Card tilt effect on mouse move
const cards3d = document.querySelectorAll('.card-3d');

cards3d.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(hover: hover)').matches) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `translateZ(40px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    });
    
    // Touch support for mobile
    card.addEventListener('touchstart', () => {
        card.style.transform = 'translateZ(20px) scale(0.98)';
    });
    
    card.addEventListener('touchend', () => {
        card.style.transform = 'translateZ(0) scale(1)';
    });
});

// Content card 3D effect
const contentCards = document.querySelectorAll('.content-card-3d');

contentCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (window.matchMedia('(hover: hover)').matches) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            card.style.transform = `translateZ(30px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
    });
});

// Parallax scroll effect
let ticking = false;

function updateParallax() {
    const scrolled = window.pageYOffset;
    
    // Parallax for sections
    const sections = document.querySelectorAll('.section-3d');
    sections.forEach((section, index) => {
        const speed = (index + 1) * 0.05;
        const yPos = -(scrolled * speed);
        section.style.transform = `translateY(${yPos}px)`;
    });
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) translateZ(0)';
        }
    });
}, observerOptions);

// Observe timeline items
const timelineItems = document.querySelectorAll('.timeline-item-3d');
timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(50px) translateZ(-50px)';
    item.style.transition = 'all 0.8s ease';
    observer.observe(item);
});

// Logo 3D effect on mouse move
const logoContainer = document.querySelector('.logo-3d-container');
const logo = document.querySelector('.logo-3d');

if (logoContainer && window.matchMedia('(hover: hover)').matches) {
    logoContainer.addEventListener('mousemove', (e) => {
        const rect = logoContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * 10;
        const rotateY = ((x - centerX) / centerX) * 10;
        
        logo.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    logoContainer.addEventListener('mouseleave', () => {
        logo.style.transform = 'rotateX(0) rotateY(0) scale(1)';
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#home') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Performance optimization: Reduce effects on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.querySelectorAll('.particle-3d, .code-column-3d').forEach((el, index) => {
        if (index > 3) el.remove();
    });
}

// Protect nav from 3D transformations
const nav = document.querySelector('nav');
if (nav) {
    // Ensure nav stays in 2D space
    nav.style.transformStyle = 'flat';
    nav.style.backfaceVisibility = 'hidden';
    nav.style.perspective = 'none';
}

console.log('%c🎨 3D Interactive Mode Activated', 'color: #00ffff; font-size: 16px; font-weight: bold;');
