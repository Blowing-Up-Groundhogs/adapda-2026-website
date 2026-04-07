// ADAPDA 2026 Website Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.replace('ph-list', 'ph-x');
            } else {
                icon.classList.replace('ph-x', 'ph-list');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) icon.classList.replace('ph-x', 'ph-list');
        });
    });

    // 2. Sticky Navbar & Active States
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        // Update scroll progress bar
        const scrollProgressBar = document.getElementById('scroll-progress');
        if (scrollProgressBar) {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            scrollProgressBar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
        }

        // Sticky Navbar Effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active State Update
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary'); // Custom active class if desired
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    });

    // 3. Scroll Animations using Intersection Observer
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-up, .slide-in-left, .slide-in-right');
    
    // Check if IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15 // Trigger when 15% of the element is visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => el.classList.add('visible'));
    }

    // Countdown to paper submission deadline (May 29, 2026 AoE)
    function updateCountdown() {
        const deadline = new Date('2026-05-30T11:59:59Z'); // May 29 AoE = May 30 UTC
        const now = new Date();
        const diff = deadline - now;
        const countdownEl = document.getElementById('countdown-days');
        if (countdownEl) {
            if (diff > 0) {
                const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
                countdownEl.textContent = days;
            } else {
                const banner = countdownEl.closest('.countdown-banner');
                if (banner) banner.style.display = 'none';
            }
        }
    }
    updateCountdown();
    setInterval(updateCountdown, 60000);
});
