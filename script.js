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
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
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

    if (statsSection) observer.observe(statsSection);
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
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.classList.add('hide');
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', initializeCourseFiltering);

// ========================================
// EMAIL VALIDATION
// ========================================

const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ========================================
// POPUP FUNCTION
// ========================================

function showPopup(message) {
    const popup = document.createElement("div");
    popup.innerText = message;

    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.background = "#111";
    popup.style.color = "#fff";
    popup.style.padding = "15px 20px";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    popup.style.zIndex = "9999";
    popup.style.fontSize = "14px";

    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 3000);
}

// ========================================
// FORM SUBMISSION HANDLING (UPDATED)
// ========================================

const initializeFormHandling = () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showPopup("Please fill in all fields.");
                return;
            }

            if (!isValidEmail(email)) {
                showPopup("Please enter a valid email address.");
                return;
            }

            try {
                const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {  // change id
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                if (res.ok) {
                    showPopup("✅ Thank you! Message sent successfully.");
                    contactForm.reset();
                } else {
                    showPopup("❌ Something went wrong.");
                }

            } catch (error) {
                console.error(error);
                showPopup("❌ Cannot connect to server.");
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', initializeFormHandling);

// ========================================
// SCROLL ANIMATIONS
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
    if (!navbar) return;

    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }
});

// ========================================
// ACTIVE NAV LINK
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
// LAZY LOADING
// ========================================

const initializeLazyLoading = () => {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
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
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Beacon Tech Hub - Loaded Successfully');
});

// ========================================
// MOBILE PERFORMANCE
// ========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
}

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
        if (dots[i]) dots[i].classList.toggle('active', i === index);
    });
    currentSlide = index;
}

function nextSlide() {
    if (slides.length === 0) return;
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
}

// ========================================
// END OF SCRIPT
// ========================================
