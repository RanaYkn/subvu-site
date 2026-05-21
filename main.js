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


/* ─── Circuit background ─── */
(function () {
    var canvas = document.getElementById('circuit-bg');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var R = 0, G = 229, B = 160;   // #00e5a0
    var GRID    = 72;
    var DENSITY = 0.09;

    var traces = [], nodes = [], W, H, animId, t0;

    function build() {
        traces = []; nodes = [];
        var cols = Math.ceil(W / GRID) + 1;
        var rows = Math.ceil(H / GRID) + 1;
        var nodeSet = {};

        for (var r = 0; r < rows; r++) {
            for (var c = 0; c < cols; c++) {
                var x = c * GRID, y = r * GRID;

                if (Math.random() < DENSITY) {
                    traces.push({ x1: x, y1: y, x2: x + GRID, y2: y,
                        base: Math.random() * 0.055 + 0.02,
                        phase: Math.random() * Math.PI * 2,
                        spd: 0.5 + Math.random() * 0.6 });
                    nodeSet[c + ',' + r] = 1;
                    nodeSet[(c+1) + ',' + r] = 1;
                }
                if (Math.random() < DENSITY) {
                    traces.push({ x1: x, y1: y, x2: x, y2: y + GRID,
                        base: Math.random() * 0.055 + 0.02,
                        phase: Math.random() * Math.PI * 2,
                        spd: 0.5 + Math.random() * 0.6 });
                    nodeSet[c + ',' + r] = 1;
                    nodeSet[c + ',' + (r+1)] = 1;
                }
            }
        }

        Object.keys(nodeSet).forEach(function (key) {
            var parts = key.split(',');
            nodes.push({
                x: parseInt(parts[0]) * GRID,
                y: parseInt(parts[1]) * GRID,
                base:  Math.random() * 0.08 + 0.03,
                phase: Math.random() * Math.PI * 2,
                spd:   0.6 + Math.random() * 0.7,
                r:     Math.random() < 0.12 ? 2.8 : 1.6
            });
        });
    }

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
        build();
    }

    function draw(t) {
        if (!t0) t0 = t;
        var e = (t - t0) * 0.001;
        ctx.clearRect(0, 0, W, H);

        ctx.lineWidth = 1;
        for (var i = 0; i < traces.length; i++) {
            var tr = traces[i];
            var a = tr.base * (0.35 + 0.65 * Math.sin(e * tr.spd + tr.phase));
            ctx.beginPath();
            ctx.moveTo(tr.x1, tr.y1);
            ctx.lineTo(tr.x2, tr.y2);
            ctx.strokeStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + a + ')';
            ctx.stroke();
        }
        for (var j = 0; j < nodes.length; j++) {
            var nd = nodes[j];
            var na = nd.base * (0.35 + 0.65 * Math.sin(e * nd.spd + nd.phase));
            ctx.beginPath();
            ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(' + R + ',' + G + ',' + B + ',' + na + ')';
            ctx.fill();
        }

        animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener('resize', function () {
        cancelAnimationFrame(animId);
        t0 = null;
        resize();
        animId = requestAnimationFrame(draw);
    }, { passive: true });

    animId = requestAnimationFrame(draw);
})();


/* ─── Language toggle ─── */
(function () {
    var STORAGE_KEY = 'subvu-lang';
    var toggle = document.getElementById('langToggle');
    var optEN  = document.getElementById('langEN');
    var optFR  = document.getElementById('langFR');
    if (!toggle) return;

    function applyLang(lang) {
        // Update button state
        optEN.classList.toggle('active', lang === 'en');
        optFR.classList.toggle('active', lang === 'fr');

        // Swap all translated elements
        document.querySelectorAll('[data-en]').forEach(function (el) {
            var text = el.getAttribute('data-' + lang);
            if (text === null) return;
            // Use innerHTML so we can include <br> and simple inline tags
            el.innerHTML = text;
        });

        // Update <html lang> attribute for accessibility
        document.documentElement.setAttribute('lang', lang);

        localStorage.setItem(STORAGE_KEY, lang);
    }

    toggle.addEventListener('click', function () {
        var current = localStorage.getItem(STORAGE_KEY) || 'en';
        applyLang(current === 'en' ? 'fr' : 'en');
    });

    // Init on load
    var saved = localStorage.getItem(STORAGE_KEY) || 'en';
    applyLang(saved);
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
