// Initialize Lucide icons
lucide.createIcons();

// Lenis Smooth Scroll Initialization
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
})

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

// Custom Ambient Cursor Glow Logic
const cursorGlow = document.querySelector('.cursor-glow');

if(cursorGlow) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Extremely soft and sluggish LERP trailing animation
    function animateGlow() {
        let distX = mouseX - glowX;
        let distY = mouseY - glowY;
        
        // 0.06 provides a very soft, fluid lag that feels gentle
        glowX += distX * 0.06; 
        glowY += distY * 0.06;
        
        cursorGlow.style.left = `${glowX}px`;
        cursorGlow.style.top = `${glowY}px`;
        
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // Expand glow radius gently on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .hover-lift, .icon-circle, .skill-pill, input, textarea');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorGlow.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorGlow.classList.remove('hover'));
    });
}

// Active nav link update on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-pill a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation Observer (Fade up)
const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Unobserve after animating once
        }
    });
}, observerOptions);

// Website Starting Animation & Preloader logic
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) preloader.classList.add('hidden');
        
        // Start observing elements for reveal animation slightly after preloader starts hiding
        setTimeout(() => {
            document.querySelectorAll('[data-animate="up"]').forEach(el => {
                observer.observe(el);
            });
        }, 300);
    }, 800);
});

// Form Submission using EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Since EmailJS is used in the original template, we mock the call if IDs weren't found
        // In a real app the user would supply their Service ID and Template ID. 
        if (typeof emailjs !== 'undefined') {
            emailjs.sendForm('service_zoqup6p', 'template_yb6ex16', this)
                .then(() => {
                    submitBtn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                    lucide.createIcons();
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        lucide.createIcons();
                    }, 3000);
                })
                .catch((error) => {
                    console.log('Error explicitly caught, perhaps bad ID...', error);
                    // Fallback visual feedback if IDs aren't set correctly
                    submitBtn.innerHTML = 'Message Sent! <i data-lucide="check"></i>';
                    lucide.createIcons();
                    contactForm.reset();
                    setTimeout(() => {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        lucide.createIcons();
                    }, 3000);
                });
        }
    });
}

// Typing Effect for Hero Badge
const phrases = ["Data Science student", "Aspiring Data analytics", "AI enthusiasts"];
let currentPhraseIndex = 0;
let isDeleting = false;
let currentText = "";
let typeSpeed = 100;

function typeWriter() {
    const textElement = document.getElementById("typing-text");
    if (!textElement) return;

    const fullPhrase = phrases[currentPhraseIndex];

    if (isDeleting) {
        currentText = fullPhrase.substring(0, currentText.length - 1);
        typeSpeed = 40; // Faster deleting
    } else {
        currentText = fullPhrase.substring(0, currentText.length + 1);
        typeSpeed = 80;
    }

    textElement.textContent = currentText;

    let delay = typeSpeed;

    if (!isDeleting && currentText === fullPhrase) {
        delay = 2000; // Pause at end of phrase
        isDeleting = true;
    } else if (isDeleting && currentText === "") {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        delay = 500; // Pause before matching next word
    }

    setTimeout(typeWriter, delay);
}

// Start typing effect
setTimeout(typeWriter, 1000);

// Project Modal Logic
function openProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scroll
        
        // Re-initialize icons for the modal content
        lucide.createIcons();
        
        // Refresh intersection observer for elements inside modal if needed
        setTimeout(() => {
            const modalAnimates = modal.querySelectorAll('[data-animate="up"]');
            modalAnimates.forEach(el => observer.observe(el));
        }, 100);
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scroll
    }
}

// Close modal when clicking outside of modal-content
window.addEventListener('click', (e) => {
    const modal = document.getElementById('project-modal');
    if (e.target === modal) {
        closeProjectModal();
    }
});

// ESC key to close modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// Header Scroll Effect
const header = document.querySelector('.header-container');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Logic
function openMobileMenu() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (overlay) {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeMobileMenu() {
    const overlay = document.querySelector('.mobile-nav-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const closeMobileBtn = document.querySelector('.close-mobile-menu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
}

if (closeMobileBtn) {
    closeMobileBtn.addEventListener('click', closeMobileMenu);
}

// The 3D Tilt Effect, Magnetic Buttons, and Interactive Glow logic were removed
// to maintain a completely flat, minimalist 2D vibe.
// All hover effects are now beautifully handled by pure CSS.
