/* ========================================
   BEACON TECH HUB - JAVASCRIPT
   Interactive features and functionality
   ======================================== */

// ========================================
// HAMBURGER MENU TOGGLE
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ========================================
// SMOOTH SCROLLING FOR NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
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

// ========================================
// ANIMATED COUNTERS
// ========================================

const animateCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    const observerOptions = { threshold: 0.5 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                statNumbers.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.floor(current) + '+';
                            setTimeout(updateCounter, 30);
                        } else {
                            counter.textContent = target + '+';
                        }
                    };
                    
                    updateCounter();
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (statsSection) {
        observer.observe(statsSection);
    }
};

document.addEventListener('DOMContentLoaded', animateCounters);

// ========================================
// COURSE FILTERING
// ========================================

const initializeCourseFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hide');
                    card.style.display = 'block';
                    setTimeout(() => { card.style.opacity = '1'; }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        card.style.display = 'block';
                        setTimeout(() => { card.style.opacity = '1'; }, 10);
                    } else {
                        card.classList.add('hide');
                        card.style.opacity = '0';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                }
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', initializeCourseFiltering);

// ========================================
// FORMSPREE CONTACT FORM (NO LOCAL SERVER)
// ========================================

const initializeFormspreeForm = () => {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return;

    // helper to show inline messages inside .contact-form
    const showFormMessage = (formContainer, message, type = 'success') => {
        let msg = formContainer.querySelector('.form-message');
        if (!msg) {
            msg = document.createElement('div');
            msg.className = 'form-message';
            formContainer.prepend(msg);
        }
        msg.textContent = message;
        msg.classList.remove('success', 'error');
        msg.classList.add(type, 'is-visible');
    };

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formContainer = contactForm.closest('.contact-form') || contactForm.parentElement;

        const submitBtn = contactForm.querySelector('[type="submit"]');
        if (submitBtn) submitBtn.classList.add('loading');

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                showFormMessage(formContainer, 'Thanks! Your message was sent successfully. We will contact you soon.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json().catch(() => ({}));
                const errMsg = (data && data.error) ? data.error : 'Unable to send message right now. Please try again later.';
                showFormMessage(formContainer, errMsg, 'error');
            }
        } catch (err) {
            showFormMessage(formContainer, 'Network error — please check your connection and try again.', 'error');
        } finally {
            if (submitBtn) submitBtn.classList.remove('loading');
        }
    });
};

document.addEventListener('DOMContentLoaded', initializeFormspreeForm);

// ========================================
// SCROLL ANIMATIONS FOR ELEMENTS
// ========================================

const initializeScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToObserve = document.querySelectorAll(
        '.course-card, .team-card, .project-card, .stat-card, .mission-card'
    );

    elementsToObserve.forEach(el => observer.observe(el));
};

document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

const highlightActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = { threshold: 0.4 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
};

document.addEventListener('DOMContentLoaded', highlightActiveNavLink);

// ========================================
// LAZY LOAD IMAGES
// ========================================

const initializeLazyLoading = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img.lazy').forEach(img => {
            imageObserver.observe(img);
        });
    }
};

document.addEventListener('DOMContentLoaded', initializeLazyLoading);

// ========================================
// HEADER SLIDER
// ========================================

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const slideInterval = 5000;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

setInterval(nextSlide, slideInterval);

// ========================================
// Apply per-card background images when `data-bg` or `--bg-image` is used
// Usage:
// 1) Add `has-bg` and an inline CSS variable: `<div class="course-card has-bg" style="--bg-image: url('path')">`
// 2) Or add `data-bg="path"` and the helper will set `--bg-image` and `has-bg` automatically.
const applyCourseCardBackgrounds = () => {
    document.querySelectorAll('.course-card[data-bg]').forEach(card => {
        const url = card.getAttribute('data-bg');
        if (url) {
            card.style.setProperty('--bg-image', `url('${url}')`);
            card.classList.add('has-bg');
        }
    });
};

document.addEventListener('DOMContentLoaded', applyCourseCardBackgrounds);

// ========================================
// INITIALIZATION LOG
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Beacon Tech Hub - Loaded Successfully');
});

// ========================================
// IMAGE PROTECTION (client-side)
// Lightweight handlers to discourage right-click and drag
// These are friendly, non-destructive measures — do not
// rely on them for true DRM; users can still screenshot.
// Compatible with GitHub Pages (static JS) and any domain.
// ========================================

function initializeImageProtection() {
    const imgs = document.querySelectorAll('.image-protect img, img.protected-image');
    if (!imgs.length) return;

    imgs.forEach(img => {
        img.addEventListener('contextmenu', (e) => { e.preventDefault(); });
        img.addEventListener('dragstart', (e) => { e.preventDefault(); });
    });

    // capture at document level as a fallback for clicks that land on child elements
    document.addEventListener('contextmenu', (e) => {
        if (e.target && e.target.closest && e.target.closest('.image-protect')) {
            e.preventDefault();
        }
    }, true);
}

document.addEventListener('DOMContentLoaded', initializeImageProtection);

// ========================================
// END OF SCRIPT
// ========================================
