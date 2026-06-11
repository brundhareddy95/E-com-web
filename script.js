// ============================================
//  BK Fashion Trades — script.js
// ============================================

// ── Navbar: sticky scroll effect ──
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu  = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
    updateActiveNavLink();
});

// ── Mobile Menu Toggle ──
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when link clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ── Smooth Scrolling ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = navbar.offsetHeight + 12;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
        }
    });
});

// ── Active Nav Link on Scroll ──
function updateActiveNavLink() {
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    let currentId   = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 100) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
}

// ── Product Filter Tabs ──
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // In a real app you'd filter products here
    });
});

// ── Category Pills ──
const catPills = document.querySelectorAll('.cat-pill');
catPills.forEach(pill => {
    pill.addEventListener('click', () => {
        catPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
    });
});

// ── Wishlist Toggle ──
document.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        const isActive = icon.classList.contains('fas');
        icon.className = isActive ? 'far fa-heart' : 'fas fa-heart';
        btn.style.color = isActive ? '' : '#c9567b';

        // Little bounce animation
        btn.style.transform = 'scale(1.3)';
        setTimeout(() => { btn.style.transform = ''; }, 200);
    });
});

// ── Contact Form Submit ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs  = contactForm.querySelectorAll('input, textarea');
        let allFilled = true;
        inputs.forEach(input => {
            if (!input.value.trim()) { allFilled = false; }
        });

        if (!allFilled) {
            showToast('Please fill in all fields.', 'error');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2500);
            showToast('Thank you! We will get back to you soon. 🌸', 'success');
        }, 1200);
    });
}

// ── Newsletter Form ──
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    const input = form.querySelector('input[type="email"]');
    const btn   = form.querySelector('.btn');

    btn.addEventListener('click', () => {
        if (input.value && input.value.includes('@')) {
            showToast('Subscribed! Welcome to the BK Fashion family 🌸', 'success');
            input.value = '';
        } else {
            showToast('Please enter a valid email address.', 'error');
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); btn.click(); }
    });
});

// ── Toast Notification ──
function showToast(message, type = 'success') {
    const existing = document.querySelector('.bk-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'bk-toast';
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;

    Object.assign(toast.style, {
        position:       'fixed',
        bottom:         '28px',
        right:          '28px',
        background:     type === 'success' ? 'linear-gradient(135deg,#c9567b,#e07ea0)' : '#e07070',
        color:          '#fff',
        padding:        '14px 22px',
        borderRadius:   '999px',
        fontSize:       '0.9rem',
        fontWeight:     '600',
        fontFamily:     "'Poppins', sans-serif",
        boxShadow:      '0 8px 30px rgba(0,0,0,0.15)',
        zIndex:         '9999',
        display:        'flex',
        alignItems:     'center',
        gap:            '10px',
        transform:      'translateY(80px)',
        opacity:        '0',
        transition:     'all 0.4s cubic-bezier(0.25,0.8,0.25,1)'
    });

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.transform = 'translateY(0)';
        toast.style.opacity   = '1';
    });

    setTimeout(() => {
        toast.style.transform = 'translateY(80px)';
        toast.style.opacity   = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// ── Scroll-reveal Animation ──
const revealOptions = {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity   = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, revealOptions);

document.querySelectorAll(
    '.service-card, .product-card, .testimonial-card, .feature, .trust-item, .contact-item'
).forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    revealObserver.observe(el);
});

// Stagger delay for grids
['services-grid', 'products-grid', 'testimonials-grid'].forEach(gridClass => {
    const grid = document.querySelector(`.${gridClass}`);
    if (!grid) return;
    Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
    });
});

// ── Add to Cart feedback ──
document.querySelectorAll('.product-overlay .btn-primary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const card = btn.closest('.product-card');
        const name = card.querySelector('h3')?.textContent || 'Item';
        showToast(`${name} added to cart! 🛍️`, 'success');

        // Update cart count
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = count + 1;
            cartCount.style.transform = 'scale(1.4)';
            setTimeout(() => { cartCount.style.transform = ''; }, 250);
        }
    });
});