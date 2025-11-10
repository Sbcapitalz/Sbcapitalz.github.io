// Simple navigation toggle for mobile
document.querySelector('.nav-toggle').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// Form validation
document.getElementById('contact-form').addEventListener('submit', function(e) {
    let valid = true;
    const requiredFields = this.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            valid = false;
            field.style.borderColor = 'red';
        } else {
            field.style.borderColor = '';
        }
    });
    
    if (!valid) {
        e.preventDefault();
        alert('Täytä kaikki pakolliset kentät');
    }
});

// Lisätään pieni väli hero-osiolle kiinteän valikon takia
document.addEventListener('DOMContentLoaded', function() {
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelector('.hero').style.marginTop = headerHeight + 'px';
    
    // Sivutuslinkkien sileä scrollaus
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Muistilistan checkbox-toiminnallisuus
    document.querySelectorAll('.checklist-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const checkmark = this.nextElementSibling;
            if (this.checked) {
                checkmark.style.backgroundColor = 'var(--success)';
                checkmark.style.borderColor = 'var(--success)';
                checkmark.innerHTML = '✓';
                checkmark.style.color = 'white';
            } else {
                checkmark.style.backgroundColor = '';
                checkmark.style.borderColor = 'var(--gray)';
                checkmark.innerHTML = '';
            }
        });
    });
});