// js/alert-create.js — Generate Warning Page Logic
(function() {
    'use strict';
  
    const state = {
      formData: {
        location: '',
        severity: 'warning',
        riskScore: 84,
        radius: 5,
        reason: '',
        action: '',
        audience: ['authority', 'district'],
        language: 'en',
        channels: ['dashboard']
      },
      notifications: []
    };
  
    function init() {
      renderSidebar();
      setupForm();
      setupPreview();
      setupEventListeners();
      loadNotifications();
  
      // Pre-fill from URL param
      const params = new URLSearchParams(window.location.search);
      const alertId = params.get('alert');
      if (alertId) {
        const alert = SahayakState.getAlerts().find(a => a.id === alertId);
        if (alert) {
          state.formData.location = alert.location;
          state.formData.severity = alert.severity;
          state.formData.riskScore = alert.risk;
          state.formData.reason = alert.message;
          document.getElementById('locationSelect').value = alert.location;
          updatePreview();
        }
      }
    }
  
    function renderSidebar() {
      const nav = document.getElementById('sidebarNav');
      if (!nav) return;
      nav.innerHTML = DEMO_DATA.sidebarSections.map(section => `
        <div class="sidebar-section">
          <div class="sidebar-section-label">${section.label}</div>
          ${section.items.map(item => `
            <a href="${ROUTES[item.key] || '#'}" class="sidebar-item ${item.active ? 'active' : ''}">
              <span class="sidebar-icon">${getSidebarIcon(item.icon)}</span>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </div>
      `).join('');
    }
  
    function getSidebarIcon(name) {
      const icons = {
        'grid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
        'map': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
        'chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
        'bell': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
        'clipboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
        'check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        'cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
        'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l4-8 4 4 4-10 6 14"/></svg>',
        'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>',
        'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>',
        'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
        'sliders': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>',
        'bar-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
        'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
        'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/></svg>'
      };
      return icons[name] || '';
    }
  
    function setupForm() {
      // Location select
      const locationSelect = document.getElementById('locationSelect');
      if (locationSelect) {
        locationSelect.innerHTML = '<option value="">Select location...</option>' +
          DEMO_DATA.riskZones.map(z => `<option value="${z.location}" data-risk="${z.risk}" data-state="${z.state}">${z.location}, ${z.state}</option>`).join('');
      }
  
      // Severity radios
      document.querySelectorAll('input[name="severity"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          state.formData.severity = e.target.value;
          updatePreview();
        });
      });
  
      // Range slider
      const radiusSlider = document.getElementById('radiusSlider');
      if (radiusSlider) {
        radiusSlider.addEventListener('input', (e) => {
          state.formData.radius = e.target.value;
          document.getElementById('radiusValue').textContent = e.target.value + ' km';
          updatePreview();
        });
      }
    }
  
    function setupPreview() {
      const locationSelect = document.getElementById('locationSelect');
      const reason = document.getElementById('reason');
      const action = document.getElementById('action');
  
      if (locationSelect) {
        locationSelect.addEventListener('change', (e) => {
          const opt = e.target.options[e.target.selectedIndex];
          state.formData.location = e.target.value;
          state.formData.riskScore = parseInt(opt.dataset.risk) || 0;
          document.getElementById('riskScoreDisplay').textContent = state.formData.riskScore + ' / 100';
          updatePreview();
        });
      }
  
      if (reason) {
        reason.addEventListener('input', (e) => {
          state.formData.reason = e.target.value;
          updatePreview();
        });
      }
  
      if (action) {
        action.addEventListener('input', (e) => {
          state.formData.action = e.target.value;
          updatePreview();
        });
      }
  
      // Audience checkboxes
      document.querySelectorAll('input[name="audience"]').forEach(cb => {
        cb.addEventListener('change', () => {
          state.formData.audience = Array.from(document.querySelectorAll('input[name="audience"]:checked')).map(c => c.value);
          updatePreview();
        });
      });
  
      // Language
      const lang = document.getElementById('language');
      if (lang) {
        lang.addEventListener('change', (e) => {
          state.formData.language = e.target.value;
          updatePreview();
        });
      }
  
      // Channels
      document.querySelectorAll('input[name="channel"]').forEach(cb => {
        cb.addEventListener('change', () => {
          state.formData.channels = Array.from(document.querySelectorAll('input[name="channel"]:checked')).map(c => c.value);
          updatePreview();
        });
      });
    }
  
    function updatePreview() {
      const d = state.formData;
      const zone = DEMO_DATA.riskZones.find(z => z.location === d.location);
  
      document.getElementById('previewLocation').textContent = d.location || '[Location]';
      document.getElementById('previewSeverity').textContent = d.severity.toUpperCase();
      document.getElementById('previewSeverity').className = 'detail-risk-level ' + d.severity;
      document.getElementById('previewRisk').textContent = d.riskScore + ' / 100';
      document.getElementById('previewReason').textContent = d.reason || '[Reason will appear here]';
      document.getElementById('previewAction').textContent = d.action || '[Recommended action will appear here]';
      document.getElementById('previewRadius').textContent = d.radius + ' km';
      document.getElementById('previewAudience').textContent = d.audience.length + ' group(s)';
      document.getElementById('previewChannels').textContent = d.channels.length + ' channel(s)';
  
      // Update icon color based on severity
      const icon = document.getElementById('previewIcon');
      const colors = {
        watch: { bg: 'rgba(22, 163, 74, 0.15)', color: '#86EFAC' },
        alert: { bg: 'rgba(234, 179, 8, 0.15)', color: '#FDE047' },
        warning: { bg: 'rgba(249, 115, 22, 0.15)', color: '#FDBA74' },
        critical: { bg: 'rgba(220, 38, 38, 0.15)', color: '#FCA5A5' }
      };
      const c = colors[d.severity] || colors.warning;
      icon.style.background = c.bg;
      icon.style.color = c.color;
    }
  
    async function saveDraft() {
      alert('Draft saved (demo)');
    }
  
    async function generateWarning() {
      if (!state.formData.location) {
        alert('Please select a location');
        return;
      }
      if (!state.formData.reason) {
        alert('Please provide a reason');
        return;
      }
  
      const zone = DEMO_DATA.riskZones.find(z => z.location === state.formData.location);
      await Services.createAlert({
        severity: state.formData.severity,
        type: 'Landslide Risk Warning',
        location: state.formData.location,
        state: zone?.state || '',
        lat: zone?.lat || 0,
        lng: zone?.lng || 0,
        risk: state.formData.riskScore,
        message: state.formData.reason,
        population: zone?.population || 0,
        roads: zone?.roads || 0,
        schools: zone?.schools || 0,
        hospitals: zone?.hospitals || 0,
        bridges: zone?.bridges || 0,
        villages: 0,
        expires: '2 hours',
        factors: zone?.factors || []
      });
  
      showSuccess();
    }
  
    async function sendAlert() {
      await generateWarning();
    }
  
    function showSuccess() {
      const main = document.querySelector('.main-content');
      main.innerHTML = `
        <div class="success-state" style="max-width: 640px; margin: var(--space-8) auto;">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="success-title">Warning generated successfully</div>
          <div class="success-subtitle">The warning has been added to the Active Alerts and notification center.</div>
          <div class="success-details">
            <div class="success-details-row">
              <span class="success-details-label">Location</span>
              <span class="success-details-value">${state.formData.location}</span>
            </div>
            <div class="success-details-row">
              <span class="success-details-label">Severity</span>
              <span class="success-details-value">${state.formData.severity.toUpperCase()}</span>
            </div>
            <div class="success-details-row">
              <span class="success-details-label">Risk Score</span>
              <span class="success-details-value">${state.formData.riskScore} / 100</span>
            </div>
          </div>
          <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
            <a href="alerts.html" class="btn btn-primary">View in Alert Center →</a>
            <a href="alert-create.html" class="btn btn-outline">Generate Another</a>
            <a href="dashboard.html" class="btn btn-outline">Back to Dashboard</a>
          </div>
          <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--watch-bg); border: 1px solid rgba(234, 179, 8, 0.25); border-radius: var(--radius-md); font-size: var(--fs-xs); color: var(--watch);">
            <strong>DEMO:</strong> No actual SMS, mobile notification or public notice was sent. This is a prototype demonstration.
          </div>
        </div>
      `;
    }
  
    async function loadNotifications() {
      state.notifications = SahayakState.getNotifications();
      renderNotificationBadge();
      renderNotificationPanel();
    }
  
    function renderNotificationBadge() {
      const badge = document.getElementById('notificationBadge');
      if (!badge) return;
      const unread = state.notifications.filter(n => !n.read).length;
      if (unread > 0) {
        badge.textContent = unread;
        badge.style.display = 'flex';
      } else {
        badge.style.display = 'none';
      }
    }
  
    function renderNotificationPanel() {
      const list = document.getElementById('notificationList');
      if (!list) return;
      list.innerHTML = state.notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}">
          <div class="notification-icon">${n.icon}</div>
          <div class="notification-content">
            <div class="notification-title">${n.title}</div>
            <div class="notification-message">${n.message}</div>
            <div class="notification-time">${n.timestamp}</div>
          </div>
        </div>
      `).join('');
    }
  
    function setupEventListeners() {
      const notifBtn = document.getElementById('notificationBtn');
      const notifPanel = document.getElementById('notificationPanel');
      if (notifBtn && notifPanel) {
        notifBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          notifPanel.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
          if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
            notifPanel.classList.remove('active');
          }
        });
      }
  
      const sidebarToggle = document.getElementById('sidebarToggle');
      const sidebar = document.getElementById('sidebar');
      const sidebarOverlay = document.getElementById('sidebarOverlay');
      if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
          sidebar.classList.toggle('active');
          if (sidebarOverlay) sidebarOverlay.classList.toggle('active');
        });
      }
      if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
          sidebar.classList.remove('active');
          sidebarOverlay.classList.remove('active');
        });
      }
    }
  
    window.SahayakAlertCreate = {
      saveDraft, generateWarning, sendAlert
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();