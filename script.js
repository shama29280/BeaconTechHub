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
    
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                statNumbers.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 50; // Divide into 50 steps
                    
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

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', animateCounters);

// ========================================
// COURSE FILTERING
// ========================================

const initializeCourseFiltering = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.classList.remove('hide');
                    card.style.display = 'block';
                    // Trigger animation
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.classList.remove('hide');
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 10);
                    } else {
                        card.classList.add('hide');
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
};

document.addEventListener('DOMContentLoaded', initializeCourseFiltering);

// ========================================
// FORM SUBMISSION HANDLING
// ========================================

const initializeFormHandling = () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // validation
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            try {
                const res = await fetch("http://localhost:5000/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, message })
                });

                const data = await res.json();

                alert(data.message);   // message from backend
                contactForm.reset();

            } catch (error) {
                console.error(error);
                alert("Cannot connect to server ❌");
            }
        });
    }
};


// Email validation function
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

document.addEventListener('DOMContentLoaded', initializeFormHandling);

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

    // Observe all course cards, team cards, and project cards
    const elementsToObserve = document.querySelectorAll(
        '.course-card, .team-card, .project-card, .stat-card, .mission-card'
    );

    elementsToObserve.forEach(el => {
        observer.observe(el);
    });
};

document.addEventListener('DOMContentLoaded', initializeScrollAnimations);

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================

let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    }

    lastScrollPosition = currentScroll;
});

// ========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ========================================

const highlightActiveNavLink = () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        threshold: 0.4
    };

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

    sections.forEach(section => {
        observer.observe(section);
    });
};

document.addEventListener('DOMContentLoaded', highlightActiveNavLink);

// ========================================
// UTILITY: SEND FORM DATA (Optional Backend)
// ========================================

/*
const sendFormData = async (name, email, message) => {
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toISOString()
            })
        });

        if (response.ok) {
            console.log('Message sent successfully');
        } else {
            console.error('Failed to send message');
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
*/

// ========================================
// PERFORMANCE OPTIMIZATIONS
// ========================================

// Lazy load images (if you add images)
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
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // All initialization functions are called
    console.log('Beacon Tech Hub - Loaded Successfully');
});

// ========================================
// MOBILE PERFORMANCE
// ========================================

// Disable animations on low-power devices
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';
}



// ========================================
// header SLIDER FUNCTIONALITY
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
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

setInterval(nextSlide, slideInterval);




// ========================================
// END OF SCRIPT
// ========================================
