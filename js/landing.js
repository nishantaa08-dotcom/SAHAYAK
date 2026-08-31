// js/landing.js — Landing Page Interactions

(function() {
    'use strict';

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Scroll effect
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', Utils.debounce(handleScroll, 10), { passive: true });
    handleScroll();

    // Mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isActive);
        });

        // Close menu when clicking nav links
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });
    }

    // ============ GIS TIME ============
    const gisTime = document.getElementById('gisTime');
    if (gisTime) {
        const updateTime = () => {
            gisTime.textContent = Utils.formatTime();
        };
        updateTime();
        setInterval(updateTime, 1000);
    }

    // ============ RISK SCORE COUNT-UP ============
    const riskScoreEl = document.getElementById('riskScore');
    if (riskScoreEl) {
        const target = parseInt(riskScoreEl.dataset.target, 10);
        let current = 0;
        const duration = 1500;
        const startTime = performance.now();

        const animate = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(eased * target);
            riskScoreEl.textContent = current;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        // Start animation when hero is visible
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!Utils.prefersReducedMotion()) {
                        requestAnimationFrame(animate);
                    } else {
                        riskScoreEl.textContent = target;
                    }
                    heroObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        heroObserver.observe(riskScoreEl);
    }

    // ============ SOLUTION FLOW REVEAL ============
    const flowSteps = document.querySelectorAll('.flow-step');
    if (flowSteps.length && !Utils.prefersReducedMotion()) {
        const flowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const steps = entry.target.querySelectorAll('.flow-step');
                    steps.forEach((step, i) => {
                        setTimeout(() => step.classList.add('revealed'), i * 120);
                    });
                    flowObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });

        const solutionFlow = document.querySelector('.solution-flow');
        if (solutionFlow) flowObserver.observe(solutionFlow);
    } else {
        flowSteps.forEach(step => step.classList.add('revealed'));
    }

    // ============ XAI BARS ANIMATION ============
    const xaiBars = document.querySelectorAll('.xai-bar');
    if (xaiBars.length) {
        const xaiObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bars = entry.target.querySelectorAll('.xai-bar');
                    bars.forEach((bar, i) => {
                        setTimeout(() => bar.classList.add('revealed'), i * 150);
                    });
                    xaiObserver.disconnect();
                }
            });
        }, { threshold: 0.3 });

        const xaiWrap = document.getElementById('xaiBars');
        if (xaiWrap) xaiObserver.observe(xaiWrap);
    }

    // ============ PIPELINE PARTICLES ============
    const pipelineTrack = document.getElementById('pipelineTrack');
    if (pipelineTrack && !Utils.prefersReducedMotion()) {
        const particlesContainer = pipelineTrack.querySelector('.pipeline-particles');
        if (particlesContainer) {
            // Create particles
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.animationDelay = (i * 0.8) + 's';
                particle.style.top = (40 + Math.random() * 20) + '%';
                particlesContainer.appendChild(particle);
            }
        }
    }

    // ============ TIMELINE STAGGER ============
    const timelineSteps = document.querySelectorAll('.timeline-step');
    if (timelineSteps.length) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const step = entry.target;
                    const index = Array.from(timelineSteps).indexOf(step);
                    setTimeout(() => step.classList.add('revealed'), index * 100);
                }
            });
        }, { threshold: 0.2 });

        timelineSteps.forEach(step => timelineObserver.observe(step));
    }

    // ============ SMOOTH SCROLL FOR ANCHOR LINKS ============
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // navbar height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ============ FADE-IN ELEMENTS ============
    document.querySelectorAll('.fade-in').forEach(el => {
        // Already handled by ScrollReveal
    });

    // ============ DEMO NOTICE INTERACTION ============
    // Add subtle hover effect on demo badges
    document.querySelectorAll('.gis-demo-badge, .ner-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.borderColor = 'rgba(234, 179, 8, 0.4)';
        });
        badge.addEventListener('mouseleave', () => {
            badge.style.borderColor = '';
        });
    });

    // ============ KEYBOARD NAVIGATION ENHANCEMENTS ============
    // Make capability cards focusable
    document.querySelectorAll('.capability-card').forEach(card => {
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.add('focused');
            }
        });
    });

    // ============ PERFORMANCE: LAZY LOAD HEAVY SECTIONS ============
    const lazySections = document.querySelectorAll('.command-preview, .explainable-ai');
    if ('IntersectionObserver' in window) {
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('loaded');
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        lazySections.forEach(section => lazyObserver.observe(section));
    }

    // ============ CONSOLE BRANDING ============
    console.log(
        '%c SAHAYAK %c NER Landslide Intelligence ',
        'background: linear-gradient(135deg, #19B8C7, #0F9D8A); color: white; padding: 6px 12px; font-weight: bold; border-radius: 4px 0 0 4px;',
        'background: #0B1728; color: #19B8C7; padding: 6px 12px; border-radius: 0 4px 4px 0;'
    );
    console.log('SIH 2026 Prototype — Demo Environment');

})();