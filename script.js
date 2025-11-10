// Simple navigation and form functionality for Muuttopalvelu Lehto
document.addEventListener('DOMContentLoaded', function() {
    // Lisätään pieni väli hero-osiolle kiinteän valikon takia
    const headerHeight = document.querySelector('header').offsetHeight;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.marginTop = headerHeight + 'px';
    }

    // Sivutuslinkkien sileä scrollaus
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Älä estä default-toimintoa jos kyseessä on anchor-linkki samalle sivulle
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - 100; // 100px offset valikon takia
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            // Reset previous error styles
            requiredFields.forEach(field => {
                field.style.borderColor = '';
                const errorMessage = field.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            });
            
            // Validate each required field
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = 'red';
                    
                    // Add error message
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.style.color = 'red';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.style.marginTop = '0.25rem';
                    errorMessage.textContent = 'Tämä kenttä on pakollinen';
                    field.parentNode.appendChild(errorMessage);
                }
            });
            
            // Validate email format
            const emailField = document.getElementById('email');
            if (emailField && emailField.value.trim()) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailField.value)) {
                    valid = false;
                    emailField.style.borderColor = 'red';
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.style.color = 'red';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.style.marginTop = '0.25rem';
                    errorMessage.textContent = 'Syötä kelvollinen sähköpostiosoite';
                    emailField.parentNode.appendChild(errorMessage);
                }
            }
            
            // Validate phone number (basic validation)
            const phoneField = document.getElementById('phone');
            if (phoneField && phoneField.value.trim()) {
                const phoneRegex = /^[\+]?[0-9\s\-\(\)]+$/;
                if (!phoneRegex.test(phoneField.value)) {
                    valid = false;
                    phoneField.style.borderColor = 'red';
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.style.color = 'red';
                    errorMessage.style.fontSize = '0.875rem';
                    errorMessage.style.marginTop = '0.25rem';
                    errorMessage.textContent = 'Syötä kelvollinen puhelinnumero';
                    phoneField.parentNode.appendChild(errorMessage);
                }
            }
            
            if (!valid) {
                e.preventDefault();
                
                // Scroll to first error
                const firstError = this.querySelector('[style*="border-color: red"]');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                    firstError.focus();
                }
            }
        });
    }

    // Date validation - prevent past dates
    const moveDateField = document.getElementById('move-date');
    if (moveDateField) {
        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        moveDateField.setAttribute('min', today);
        
        moveDateField.addEventListener('change', function() {
            const selectedDate = new Date(this.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                this.style.borderColor = 'red';
                alert('Valitse tulevaisuuden päivämäärä');
                this.value = '';
            } else {
                this.style.borderColor = '';
            }
        });
    }

    // Real-time input validation
    const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            // Remove error styling when user starts typing
            if (this.style.borderColor === 'red') {
                this.style.borderColor = '';
                const errorMessage = this.parentNode.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.remove();
                }
            }
        });
        
        input.addEventListener('blur', function() {
            // Validate on blur
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'red';
            }
        });
    });

    // Add loading state to form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.innerHTML = '<i class="fas fa-spinner loading"></i> Lähetetään...';
                submitButton.disabled = true;
            }
        });
    }

    // Dynamic current year for copyright
    const currentYearElement = document.querySelector('.footer-bottom p');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.innerHTML = currentYearElement.innerHTML.replace('2025', currentYear);
    }

    // Smooth scrolling for breadcrumb links (prevent sudden jumps)
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    breadcrumbLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow default behavior for breadcrumb links
            // They should navigate normally
        });
    });

    // Enhance social media links
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Add intersection observer for animations (optional)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for subtle animations
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    console.log('Muuttopalvelu Lehto - Sivusto ladattu onnistuneesti');
});

// Handle page resizing
window.addEventListener('resize', function() {
    const headerHeight = document.querySelector('header').offsetHeight;
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.marginTop = headerHeight + 'px';
    }
});

// Handle page load and ready state
window.addEventListener('load', function() {
    // Page is fully loaded
    document.body.classList.add('loaded');
});

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Kuvaa ei voitu ladata:', e.target.src);
        // Voit lisätä placeholder-kuvan tähän tarvittaessa
        // e.target.src = '/images/placeholder.jpg';
    }
}, true);
