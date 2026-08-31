// js/main.js — Shared Utilities & Routes

// Centralized route configuration
const ROUTES = {
    home: 'index.html',
    login: 'login.html',
    dashboard: 'dashboard.html',
    riskMap: 'risk-map.html',
    riskAnalysis: 'risk-analysis.html',
    alerts: 'alerts.html',
    fieldReports: 'field-reports.html',
    verification: 'verification.html',
    infrastructure: 'infrastructure.html',
    routeRisk: 'route-risk.html',
    simulator: 'simulator.html',
    satellite: 'satellite.html',
    rainfall: 'rainfall.html',
    terrain: 'terrain.html',
    historical: 'historical.html',
    analytics: 'analytics.html',
    modelPerformance: 'model-performance.html',
    users: 'users.html',
    settings: 'settings.html',
    citizen: 'citizen.html',
    fieldOfficer: 'field-officer.html'
};

// Shared utilities
const Utils = {
    /**
     * Format a number with commas
     */
    formatNumber(num) {
        return new Intl.NumberFormat('en-IN').format(num);
    },

    /**
     * Get risk level from score
     */
    getRiskLevel(score) {
        if (score <= 30) return { level: 'safe', label: 'SAFE', color: '#16A34A' };
        if (score <= 60) return { level: 'watch', label: 'WATCH', color: '#EAB308' };
        if (score <= 80) return { level: 'alert', label: 'ALERT', color: '#F97316' };
        return { level: 'warning', label: 'WARNING', color: '#DC2626' };
    },

    /**
     * Format current time
     */
    formatTime(date = new Date()) {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    },

    /**
     * Debounce function
     */
    debounce(fn, delay = 200) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn.apply(this, args), delay);
        };
    },

    /**
     * Check if reduced motion is preferred
     */
    prefersReducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    },

    /**
     * Navigate to route
     */
    navigate(routeKey) {
        const url = ROUTES[routeKey];
        if (url) {
            window.location.href = url;
        }
    }
};

// Global intersection observer for animations
const ScrollReveal = {
    observer: null,

    init() {
        if (Utils.prefersReducedMotion()) return;

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible', 'revealed');
                    // Don't unobserve to allow re-triggering if needed
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements
        document.querySelectorAll('.fade-in, .timeline-step, .flow-step, .xai-bar').forEach(el => {
            this.observer.observe(el);
        });
    }
};

// Expose globally
if (typeof window !== 'undefined') {
    window.ROUTES = ROUTES;
    window.Utils = Utils;
    window.ScrollReveal = ScrollReveal;
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ScrollReveal.init();
});