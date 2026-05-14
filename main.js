/* ═══════════════════════════════════════════════════════════
   Technologies SubVU inc. — Landing Page JS
   ═══════════════════════════════════════════════════════════ */

'use strict';

/* ─── Nav: scroll-shadow ─── */
(function () {
    const nav = document.getElementById('nav');
    if (!nav) return;

    function onScroll() {
        if (window.scrollY > 30) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load
})();


/* ─── Nav: mobile toggle ─── */
(function () {
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    if (!toggle || !links) return;

    toggle.addEventListener('click', function () {
        const open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
        document.body.style.overflow = open ? 'hidden' : '';
    });

    // Close on link click
    links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
            links.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-label', 'Open navigation');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && links.classList.contains('open')) {
            links.classList.remove('open');
            toggle.classList.remove('open');
            toggle.setAttribute('aria-label', 'Open navigation');
            document.body.style.overflow = '';
        }
    });
})();


/* ─── Scroll-reveal ─── */
(function () {
    // Add reveal class to elements that should animate in
    const selectors = [
        '.section-label',
        '.section-heading',
        '.section-sub',
        '.mission__copy p',
        '.stat-card',
        '.app-card',
        '.contact__copy p',
        '.contact__card',
        '.founder__quote-mark',
        '.founder__quote',
        '.founder__attr',
    ];

    selectors.forEach(function (sel) {
        document.querySelectorAll(sel).forEach(function (el, i) {
            el.classList.add('reveal');
            // stagger cards
            if (el.classList.contains('app-card') || el.classList.contains('stat-card')) {
                el.classList.add('reveal-delay-' + Math.min(i + 1, 4));
            }
        });
    });

    // Observer
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
})();


/* ─── Hero wordmark entrance ─── */
(function () {
    const wordmark = document.querySelector('.hero__wordmark');
    const status   = document.querySelector('.hero__status');
    const tagline  = document.querySelector('.hero__tagline');
    const sub      = document.querySelector('.hero__sub');
    const btn      = document.querySelector('.hero .btn');

    [status, wordmark, tagline, sub, btn].forEach(function (el, i) {
        if (!el) return;
        el.style.opacity  = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1) ' + (i * 120) + 'ms, transform 0.8s cubic-bezier(0.4,0,0.2,1) ' + (i * 120) + 'ms';
    });

    // Slight delay for font load
    window.addEventListener('load', function () {
        [status, wordmark, tagline, sub, btn].forEach(function (el) {
            if (!el) return;
            el.style.opacity   = '1';
            el.style.transform = 'translateY(0)';
        });
    });
})();
