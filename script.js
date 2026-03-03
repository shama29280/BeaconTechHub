/* ========================================
   BEACON TECH HUB - JAVASCRIPT
   Interactive features and functionality
   ======================================== */

// ========================================
// HAMBURGER MENU TOGGLE / RESPONSIVE NAV
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function toggleMobileMenu() {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

if (hamburger && navMenu) {
    hamburger.addEventListener('click', toggleMobileMenu);

    // close when a nav item is clicked (desktop or mobile)
    document.querySelectorAll('.nav-menu .nav-link, .nav-cta-mobile a').forEach(el => {
        el.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });
}

// Close menu when clicking outside
// use toggleMobileMenu so aria-expanded and body class update
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && !e.target.closest('.nav-container')) {
        toggleMobileMenu();
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
    // guard against multiple initializations (e.g. script loaded twice)
    if (window.__formspreeInitDone) return;
    window.__formspreeInitDone = true;

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

    // prevent duplicate submission via dataset flag
    contactForm.addEventListener('submit', async function handleSubmit(e) {
        e.preventDefault();
        console.log('contact form submit handler triggered');

        if (contactForm.dataset.submitting === 'true') {
            console.log('submission blocked: already submitting');
            return;
        }
        contactForm.dataset.submitting = 'true';

        const submitBtn = contactForm.querySelector('[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true; // disable to prevent double-clicks
        }

        const formContainer = contactForm.closest('.contact-form') || contactForm.parentElement;
        const formData = new FormData(contactForm);

        // use hard-coded URL or data attribute so action attr isn't required
        const endpoint = 'https://formspree.io/f/meelkeyz';

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });
            console.log('fetch completed, status:', response.status);

            if (response.ok) {
                showFormMessage(formContainer, 'Thanks! Your message was sent successfully. We will contact you soon.', 'success');
                contactForm.reset();
            } else {
                const data = await response.json().catch(() => ({}));
                const errMsg = (data && data.error) ? data.error : 'Unable to send message right now. Please try again later.';
                showFormMessage(formContainer, errMsg, 'error');
            }
        } catch (err) {
            console.log('fetch error', err);
            showFormMessage(formContainer, 'Network error — please check your connection and try again.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            contactForm.dataset.submitting = 'false';
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
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
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
// IMAGE & MEDIA PROTECTION (client-side)
// Lightweight handlers to discourage right-click, drag, and
// basic download attempts. Users can still screenshot.
// ========================================

function initializeImageProtection() {
    const imgs = document.querySelectorAll('.image-protect img, img.protected-image');
    imgs.forEach(img => {
        img.addEventListener('contextmenu', (e) => e.preventDefault());
        img.addEventListener('dragstart', (e) => e.preventDefault());
    });

    document.addEventListener('contextmenu', (e) => {
        if (e.target.closest && e.target.closest('.image-protect')) {
            e.preventDefault();
        }
    }, true);
}

function initializeVideoProtection() {
    const vids = document.querySelectorAll('video.protected-video');
    vids.forEach(video => {
        video.addEventListener('contextmenu', e => e.preventDefault());
        video.setAttribute('controlsList', 'nodownload');
        video.setAttribute('disablepictureinpicture', '');
        video.setAttribute('playsinline', '');
        // note: blocking direct URL access requires server support
    });
}

// disable text selection on .no-select sections
function initializeNoSelect() {
    document.querySelectorAll('.no-select').forEach(el => {
        el.style.userSelect = 'none';
        el.style.webkitUserSelect = 'none';
        el.style.msUserSelect = 'none';
    });
}

// block common developer hotkeys
function blockShortcuts(e) {
    if (e.ctrlKey) {
        const key = e.key.toLowerCase();
        if (['u','s'].includes(key) || (e.shiftKey && ['i','c','j'].includes(key))) {
            e.preventDefault();
        }
    }
    if (e.key === 'F12') e.preventDefault();
}

// simple email cloaking
function cloakEmails() {
    document.querySelectorAll('.cloak-email').forEach(el => {
        const user = el.dataset.user;
        const domain = el.dataset.domain;
        if (user && domain) {
            el.textContent = `${user}@${domain}`;
            el.href = `mailto:${user}@${domain}`;
        }
    });
}

// very basic devtools detection
(function() {
    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function() {
            console.warn('DevTools opened');
        }
    });
    console.log(element);
})();

// prevent basic right-click everywhere except inputs, links, selects
// map iframe should be interactable so users can copy address or use map features
document.addEventListener('contextmenu', function(e) {
    const tag = e.target.tagName.toLowerCase();

    // if right-click occurs inside the map wrapper or on an iframe, allow it
    if (e.target.closest && (e.target.closest('.map-wrapper') || tag === 'iframe')) {
        return; // do not block context menu here
    }

    if (!['input','textarea','select','a'].includes(tag)) {
        e.preventDefault();
    }
});

// initialization on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializeImageProtection();
    initializeVideoProtection();
    initializeNoSelect();
    document.addEventListener('keydown', blockShortcuts);
    cloakEmails();
});

// ========================================
// END OF SCRIPT
// ========================================
