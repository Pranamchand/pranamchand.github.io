// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Add a slight delay for smooth visual transition
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Remove from DOM after fade out transition (0.5s)
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {


    // Refined Typing Badge Text Switcher
    const badge = document.getElementById('animated-badge');
    const badgeTexts = ["Data science student", "AI Enthusiast", "Aspiring Data Analyst"];
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;

    const typeEffect = () => {
        if (!badge) return;

        const currentFullText = badgeTexts[currentTextIndex];

        if (isDeleting) {
            badge.textContent = currentFullText.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50;
        } else {
            badge.textContent = currentFullText.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 120;
        }

        if (!isDeleting && currentCharIndex === currentFullText.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentTextIndex = (currentTextIndex + 1) % badgeTexts.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 1000);

    // Reveal on scroll
    const revealElements = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        // Theme Toggle (Delayed to surprise the user around Skills section)
        if (window.scrollY > 1200) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });





    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        window.addEventListener('mousemove', (e) => {
            cursorGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        });
    }

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // EmailJS Form Submission
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm && submitBtn) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Loading state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            const serviceID = 'service_93ir2tr';
            const templateID = 'template_yb6ex16';

            emailjs.sendForm(serviceID, templateID, contactForm)
                .then(() => {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#4CAF50';
                    contactForm.reset();

                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.style.background = 'var(--accent-color)';
                        submitBtn.disabled = false;
                    }, 3000);
                }, (err) => {
                    submitBtn.textContent = 'Error! Try again';
                    submitBtn.style.background = '#f44336';
                    console.error('EmailJS Error:', err);

                    setTimeout(() => {
                        submitBtn.textContent = originalBtnText;
                        submitBtn.style.background = 'var(--accent-color)';
                        submitBtn.disabled = false;
                    }, 3000);
                });
        });
    }
});
