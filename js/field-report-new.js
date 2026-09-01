// js/field-report-new.js — Create Field Report (Mobile-first)
(function() {
    'use strict';
  
    const state = {
      formData: {
        type: '',
        latitude: null,
        longitude: null,
        accuracy: null,
        severity: '',
        observation: '',
        aiPredictionMatch: '',
        photos: []
      },
      officer: { name: 'Rahul Singh', district: 'Tawang', role: 'Field Officer' },
      isOffline: false,
      notifications: []
    };
  
    function init() {
      renderSidebar();
      setupForm();
      setupPhotoUpload();
      setupEventListeners();
      loadNotifications();
      updateTimestamp();
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
      // Report type
      document.querySelectorAll('input[name="reportType"]').forEach(r => {
        r.addEventListener('change', (e) => { state.formData.type = e.target.value; });
      });
  
      // Severity
      document.querySelectorAll('input[name="severity"]').forEach(r => {
        r.addEventListener('change', (e) => { state.formData.severity = e.target.value; });
      });
  
      // AI match
      document.querySelectorAll('input[name="aiMatch"]').forEach(r => {
        r.addEventListener('change', (e) => { state.formData.aiPredictionMatch = e.target.value; });
      });
  
      // Observation
      const obs = document.getElementById('observation');
      if (obs) obs.addEventListener('input', (e) => { state.formData.observation = e.target.value; });
    }
  
    function captureGPS() {
      const coordsEl = document.getElementById('gpsCoords');
      const accuracyEl = document.getElementById('gpsAccuracy');
      const captureBtn = document.getElementById('captureGpsBtn');
  
      if (!navigator.geolocation) {
        useDemoGPS();
        return;
      }
  
      captureBtn.textContent = 'Capturing...';
      captureBtn.disabled = true;
  
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          state.formData.latitude = pos.coords.latitude;
          state.formData.longitude = pos.coords.longitude;
          state.formData.accuracy = Math.round(pos.coords.accuracy);
          coordsEl.textContent = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`;
          accuracyEl.textContent = `Accuracy: ±${state.formData.accuracy}m`;
          captureBtn.textContent = '✓ Location Captured';
          captureBtn.style.background = 'var(--safe-bg)';
          captureBtn.style.color = 'var(--safe)';
          captureBtn.style.borderColor = 'var(--safe)';
        },
        () => {
          useDemoGPS();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    }
  
    function useDemoGPS() {
      state.formData.latitude = 27.586;
      state.formData.longitude = 91.859;
      state.formData.accuracy = 15;
      const coordsEl = document.getElementById('gpsCoords');
      const accuracyEl = document.getElementById('gpsAccuracy');
      const captureBtn = document.getElementById('captureGpsBtn');
      coordsEl.textContent = '27.5860° N, 91.8590° E (Demo)';
      accuracyEl.textContent = 'Accuracy: ±15m (Demo)';
      captureBtn.textContent = '✓ Demo Location';
      captureBtn.disabled = false;
    }
  
    function setupPhotoUpload() {
      const uploadArea = document.getElementById('photoUploadArea');
      const fileInput = document.getElementById('photoFileInput');
  
      if (!uploadArea || !fileInput) return;
  
      uploadArea.addEventListener('click', () => fileInput.click());
  
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
      });
      uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
      });
  
      fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    }
  
    function handleFiles(files) {
      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          state.formData.photos.push({
            id: 'photo-' + Date.now() + '-' + Math.random(),
            dataUrl: e.target.result,
            name: file.name
          });
          renderPhotoPreviews();
        };
        reader.readAsDataURL(file);
      });
    }
  
    function renderPhotoPreviews() {
      const grid = document.getElementById('photoPreviewGrid');
      if (!grid) return;
      grid.innerHTML = state.formData.photos.map(p => `
        <div class="photo-preview-item">
          <img src="${p.dataUrl}" alt="${p.name}">
          <button class="photo-preview-remove" onclick="window.SahayakFieldReportNew.removePhoto('${p.id}')" aria-label="Remove">×</button>
          <div class="photo-preview-demo-badge">DEMO UPLOAD</div>
        </div>
      `).join('');
    }
  
    function removePhoto(id) {
      state.formData.photos = state.formData.photos.filter(p => p.id !== id);
      renderPhotoPreviews();
    }
  
    function updateTimestamp() {
      const el = document.getElementById('reportTimestamp');
      if (el) el.textContent = new Date().toLocaleString('en-IN', {
        dateStyle: 'medium', timeStyle: 'short'
      });
    }
  
    async function saveOffline() {
      const report = buildReport();
      report.id = 'FR-OFF-' + Date.now();
      await Services.addToOfflineQueue(report);
      showSuccess(true);
    }
  
    async function submitReport() {
      if (!state.formData.type) { alert('Please select a report type'); return; }
      if (!state.formData.severity) { alert('Please select severity'); return; }
      if (!state.formData.observation) { alert('Please describe your observation'); return; }
  
      const report = buildReport();
  
      if (state.isOffline) {
        await Services.addToOfflineQueue(report);
      } else {
        await Services.createFieldReport(report);
      }
      showSuccess(false);
    }
  
    function buildReport() {
      return {
        type: state.formData.type,
        location: state.officer.district,
        state: 'Arunachal Pradesh',
        severity: state.formData.severity,
        officer: state.officer.name,
        officerRole: state.officer.role,
        latitude: state.formData.latitude || 27.586,
        longitude: state.formData.longitude || 91.859,
        observation: state.formData.observation,
        aiPredictionMatch: state.formData.aiPredictionMatch || 'unable',
        aiRisk: 82,
        fieldAssessment: state.formData.severity,
        photos: state.formData.photos.map(p => p.id)
      };
    }
  
    function showSuccess(isOffline) {
      const main = document.querySelector('.main-content');
      const reportId = isOffline ? 'FR-OFF-' + Date.now().toString().slice(-4) : 'FR-' + (1000 + SahayakState.getReports().length + 1);
  
      main.innerHTML = `
        <div class="success-state" style="max-width: 640px; margin: var(--space-8) auto;">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div class="success-title">REPORT RECEIVED</div>
          <div class="success-subtitle">Your field report has been recorded successfully.</div>
          <div class="success-details">
            <div class="success-details-row">
              <span class="success-details-label">Report ID</span>
              <span class="success-details-value">${reportId}</span>
            </div>
            <div class="success-details-row">
              <span class="success-details-label">Type</span>
              <span class="success-details-value">${state.formData.type}</span>
            </div>
            <div class="success-details-row">
              <span class="success-details-label">Severity</span>
              <span class="success-details-value">${state.formData.severity}</span>
            </div>
            <div class="success-details-row">
              <span class="success-details-label">Location</span>
              <span class="success-details-value">${state.formData.latitude?.toFixed(3)}°, ${state.formData.longitude?.toFixed(3)}°</span>
            </div>
            <div class="success-details-row">
              <span class="success-details-label">Status</span>
              <span class="success-details-value">${isOffline ? 'Saved Offline' : 'Pending Verification'}</span>
            </div>
          </div>
          <div style="display: flex; gap: var(--space-3); justify-content: center; flex-wrap: wrap;">
            <a href="field-reports.html" class="btn btn-primary">View Report →</a>
            <a href="field-report-new.html" class="btn btn-outline">Submit Another</a>
            <a href="dashboard.html" class="btn btn-outline">Back to Dashboard</a>
          </div>
          ${isOffline ? `
            <div style="margin-top: var(--space-4); padding: var(--space-3); background: var(--alert-bg); border: 1px solid rgba(249, 115, 22, 0.2); border-radius: var(--radius-md); font-size: var(--fs-xs); color: var(--alert);">
              <strong>Offline mode:</strong> Report saved locally. Will sync automatically when connection is restored.
            </div>
          ` : ''}
        </div>
      `;
    }
  
    function toggleOffline() {
      state.isOffline = !state.isOffline;
      const status = document.getElementById('offlineStatus');
      if (state.isOffline) {
        status.classList.add('offline');
        status.innerHTML = '<span class="offline-status-dot"></span><span>OFFLINE — Reports will sync automatically</span>';
      } else {
        status.classList.remove('offline');
        status.innerHTML = '<span class="offline-status-dot"></span><span>ONLINE</span>';
      }
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
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
  
    function renderNotificationPanel() {
      const list = document.getElementById('notificationList');
      if (!list) return;
      list.innerHTML = state.notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}">
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
  
    window.SahayakFieldReportNew = {
      captureGPS, removePhoto,
      saveOffline, submitReport,
      toggleOffline
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();