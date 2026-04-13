// ADAPDA 2026 Website — Interactivity & Theme Toggle

document.addEventListener('DOMContentLoaded', () => {

    // ─── 0. Dark / Light Theme Toggle ────────────────────────────────────────
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon   = document.getElementById('themeIcon');
    const htmlEl      = document.documentElement;

    // Restore saved preference, default to dark
    const savedTheme = localStorage.getItem('adapda-theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    setThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = htmlEl.getAttribute('data-theme');
            const next    = current === 'dark' ? 'light' : 'dark';
            htmlEl.setAttribute('data-theme', next);
            localStorage.setItem('adapda-theme', next);
            setThemeIcon(next);
        });
    }

    function setThemeIcon(theme) {
        if (!themeIcon) return;
        // In dark mode show sun (switch to light); in light mode show moon (switch to dark)
        themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }

    // ─── 1. Mobile Menu Toggle ───────────────────────────────────────────────
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav     = document.querySelector('.mobile-nav');

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
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            const icon = mobileMenuBtn && mobileMenuBtn.querySelector('i');
            if (icon) icon.classList.replace('ph-x', 'ph-list');
        });
    });

    // ─── 2. Sticky Navbar & Active Nav Link ──────────────────────────────────
    const navbar   = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Scrolled state
        navbar.classList.toggle('scrolled', window.scrollY > 50);

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-primary');
            }
        });
    });

    // ─── 3. Scroll-triggered Animations (IntersectionObserver) ───────────────
    const animated = document.querySelectorAll(
        '.fade-in, .fade-in-up, .slide-up, .slide-in-left, .slide-in-right'
    );

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        animated.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all immediately
        animated.forEach(el => el.classList.add('visible'));
    }
});
