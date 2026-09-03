// js/settings.js — Settings & System Configuration Logic
(function() {
    'use strict';
  
    const STORAGE_KEY = 'sahayak_settings';
  
    const DEFAULTS = {
      theme: 'dark',
      density: 'comfortable',
      mapTheme: 'dark',
      language: 'en',
      notifications: {
        criticalAlerts: true,
        rainfallAlerts: true,
        fieldReports: true,
        verificationUpdates: true,
        satelliteAnomalies: true,
        dataSourceDelays: true,
        systemNotifications: true
      },
      notificationFrequency: 'immediate',
      mapSettings: {
        defaultRegion: 'Northeast India',
        layers: { risk: true, historical: false, rainfall: false, soil: false, infrastructure: false, fieldReports: false },
        autoCenter: true,
        showRiskLabels: true,
        clusterMarkers: true
      },
      thresholds: { safe: [0, 39], watch: [40, 59], alert: [60, 79], warning: [80, 100] },
      offlineMode: false,
      accessibility: {
        highContrast: false,
        largerText: false,
        reduceMotion: false,
        showTextLabels: true,
        keyboardNav: true
      }
    };
  
    const state = {
      settings: {},
      currentSection: 'profile'
    };
  
    // ============ INITIALIZATION ============
    function init() {
      renderSidebar();
      loadSettings();
      setupNavigation();
      renderAllSections();
      setupEventListeners();
      applySettings();
    }
  
    // ============ SIDEBAR ============
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
      nav.querySelectorAll('.sidebar-item').forEach(el => {
        if (el.dataset.route === 'settings' || el.getAttribute('href')?.includes('settings.html')) {
          el.classList.add('active');
        }
      });
    }
  
    function getSidebarIcon(name) {
      const icons = {
        'grid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
        'map': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
        'chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
        'bell': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
        'clipboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
        'check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="20 6 9 17 4 12"/></svg>',
        'cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
        'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 20l4-8 4 4 4-10 6 14"/></svg>',
        'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>',
        'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>',
        'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
        'sliders': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>',
        'bar-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
        'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
        'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/></svg>'
      };
      return icons[name] || '';
    }
  
    // ============ SETTINGS PERSISTENCE ============
    function loadSettings() {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
        state.settings = saved ? deepMerge(DEFAULTS, saved) : JSON.parse(JSON.stringify(DEFAULTS));
      } catch {
        state.settings = JSON.parse(JSON.stringify(DEFAULTS));
      }
    }
  
    function saveSettings() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.settings));
      applySettings();
      showToast('Settings saved successfully');
    }
  
    function resetSettings() {
      state.settings = JSON.parse(JSON.stringify(DEFAULTS));
      localStorage.removeItem(STORAGE_KEY);
      renderAllSections();
      applySettings();
      showToast('Settings reset to defaults');
    }
  
    function deepMerge(target, source) {
      const result = { ...target };
      for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = deepMerge(target[key] || {}, source[key]);
        } else {
          result[key] = source[key];
        }
      }
      return result;
    }
  
    function applySettings() {
      // Apply theme
      document.body.setAttribute('data-theme', state.settings.theme);
      // Apply reduce motion
      if (state.settings.accessibility.reduceMotion) {
        document.documentElement.style.setProperty('--transition-fast', '0s');
        document.documentElement.style.setProperty('--transition-base', '0s');
      }
      // Apply larger text
      if (state.settings.accessibility.largerText) {
        document.documentElement.style.fontSize = '18px';
      } else {
        document.documentElement.style.fontSize = '';
      }
      // Sync offline state
      if (typeof SahayakState !== 'undefined') {
        // Settings can influence other pages
      }
    }
  
    // ============ NAVIGATION ============
    function setupNavigation() {
      document.querySelectorAll('.settings-nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.section;
          state.currentSection = target;
          document.querySelectorAll('.settings-nav-item').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
          const section = document.querySelector(`.settings-section[data-section="${target}"]`);
          if (section) section.classList.add('active');
        });
      });
    }
  
    // ============ RENDER ALL SECTIONS ============
    function renderAllSections() {
      renderProfile();
      renderAppearance();
      renderLanguage();
      renderNotifications();
      renderMapSettings();
      renderRiskThresholds();
      renderDataSources();
      renderOfflineSync();
      renderAccessibility();
      renderSecurity();
      renderSystemInfo();
    }
  
    // ============ PROFILE ============
    function renderProfile() {
      const el = document.getElementById('settingsProfile');
      if (!el) return;
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-body">
            <div class="profile-header">
              <div class="profile-avatar">AU</div>
              <div class="profile-info">
                <div class="profile-name">Demo Authority</div>
                <div class="profile-role">Disaster Authority</div>
                <div class="profile-status"><span class="profile-status-dot"></span> Active</div>
              </div>
            </div>
            <div class="profile-details">
              <div class="profile-detail-item">
                <div class="profile-detail-label">Name</div>
                <div class="profile-detail-value">Demo Authority</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Role</div>
                <div class="profile-detail-value">Disaster Authority</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Assigned Region</div>
                <div class="profile-detail-value">Northeast India</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Session</div>
                <div class="profile-detail-value">Prototype Session</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4);">
              <button class="btn btn-outline" onclick="window.SahayakSettings.showDemoModal('Edit Profile')">Edit Profile</button>
              <button class="btn btn-outline" onclick="window.SahayakSettings.showDemoModal('Change Password')">Change Password</button>
            </div>
          </div>
        </div>
        <div class="settings-warning">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>Prototype session — no real authentication is implemented. User data is synthetic.</span>
        </div>
      `;
    }
  
    // ============ APPEARANCE ============
    function renderAppearance() {
      const el = document.getElementById('settingsAppearance');
      if (!el) return;
      const s = state.settings;
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Theme</div></div>
          <div class="settings-card-body">
            <div class="radio-group">
              ${['dark', 'light', 'system'].map(v => `
                <label class="radio-option">
                  <input type="radio" name="theme" value="${v}" ${s.theme === v ? 'checked' : ''} onchange="window.SahayakSettings.updateSetting('theme', '${v}')">
                  <span class="radio-option-label">${v.charAt(0).toUpperCase() + v.slice(1)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Density</div></div>
          <div class="settings-card-body">
            <div class="radio-group">
              ${['comfortable', 'compact'].map(v => `
                <label class="radio-option">
                  <input type="radio" name="density" value="${v}" ${s.density === v ? 'checked' : ''} onchange="window.SahayakSettings.updateSetting('density', '${v}')">
                  <span class="radio-option-label">${v.charAt(0).toUpperCase() + v.slice(1)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Map Theme</div></div>
          <div class="settings-card-body">
            <div class="radio-group">
              ${['dark', 'standard', 'terrain'].map(v => `
                <label class="radio-option">
                  <input type="radio" name="mapTheme" value="${v}" ${s.mapTheme === v ? 'checked' : ''} onchange="window.SahayakSettings.updateSetting('mapTheme', '${v}')">
                  <span class="radio-option-label">${v.charAt(0).toUpperCase() + v.slice(1)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ LANGUAGE ============
    function renderLanguage() {
      const el = document.getElementById('settingsLanguage');
      if (!el) return;
      const s = state.settings;
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Language Preference</div></div>
          <div class="settings-card-body">
            <div class="radio-group">
              ${[{v:'en',l:'English'},{v:'hi',l:'Hindi'},{v:'as',l:'Assamese'}].map(o => `
                <label class="radio-option">
                  <input type="radio" name="language" value="${o.v}" ${s.language === o.v ? 'checked' : ''} onchange="window.SahayakSettings.updateLanguage('${o.v}')">
                  <span class="radio-option-label">${o.l}</span>
                </label>
              `).join('')}
            </div>
            <div class="settings-warning" style="margin-top: var(--space-4);">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>Language switching is a prototype demonstration. Full translation is not implemented.</span>
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ NOTIFICATIONS ============
    function renderNotifications() {
      const el = document.getElementById('settingsNotifications');
      if (!el) return;
      const n = state.settings.notifications;
      const toggles = [
        { key: 'criticalAlerts', label: 'Critical Risk Alerts', desc: 'Immediate alerts for WARNING-level risk zones' },
        { key: 'rainfallAlerts', label: 'Rainfall Threshold Alerts', desc: 'When rainfall exceeds local thresholds' },
        { key: 'fieldReports', label: 'New Field Reports', desc: 'When field officers submit observations' },
        { key: 'verificationUpdates', label: 'Verification Updates', desc: 'When predictions are verified or rejected' },
        { key: 'satelliteAnomalies', label: 'Satellite Anomalies', desc: 'Surface change or vegetation stress detected' },
        { key: 'dataSourceDelays', label: 'Data Source Delays', desc: 'When data feeds are delayed or unavailable' },
        { key: 'systemNotifications', label: 'System Notifications', desc: 'General system status and updates' }
      ];
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Notification Preferences</div></div>
          <div class="settings-card-body">
            ${toggles.map(t => `
              <div class="toggle-row">
                <div class="toggle-info">
                  <div class="toggle-label">${t.label}</div>
                  <div class="toggle-description">${t.desc}</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${n[t.key] ? 'checked' : ''} onchange="window.SahayakSettings.updateNotification('${t.key}', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Notification Frequency</div></div>
          <div class="settings-card-body">
            <div class="radio-group">
              ${[{v:'immediate',l:'Immediate'},{v:'30min',l:'Every 30 minutes'},{v:'daily',l:'Daily Summary'}].map(o => `
                <label class="radio-option">
                  <input type="radio" name="notifFreq" value="${o.v}" ${state.settings.notificationFrequency === o.v ? 'checked' : ''} onchange="window.SahayakSettings.updateSetting('notificationFrequency', '${o.v}')">
                  <span class="radio-option-label">${o.l}</span>
                </label>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ MAP SETTINGS ============
    function renderMapSettings() {
      const el = document.getElementById('settingsMap');
      if (!el) return;
      const m = state.settings.mapSettings;
      const layers = [
        { key: 'risk', label: 'AI Risk' },
        { key: 'historical', label: 'Historical Landslides' },
        { key: 'rainfall', label: 'Rainfall' },
        { key: 'soil', label: 'Soil Moisture' },
        { key: 'infrastructure', label: 'Infrastructure' },
        { key: 'fieldReports', label: 'Field Reports' }
      ];
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Default Map Layers</div></div>
          <div class="settings-card-body">
            ${layers.map(l => `
              <label class="checkbox-row">
                <input type="checkbox" ${m.layers[l.key] ? 'checked' : ''} onchange="window.SahayakSettings.updateMapLayer('${l.key}', this.checked)">
                ${l.label}
              </label>
            `).join('')}
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Map Behavior</div></div>
          <div class="settings-card-body">
            <div class="toggle-row">
              <div class="toggle-info"><div class="toggle-label">Auto-center on selected location</div></div>
              <label class="toggle-switch"><input type="checkbox" ${m.autoCenter ? 'checked' : ''} onchange="window.SahayakSettings.updateMapBehavior('autoCenter', this.checked)"><span class="toggle-slider"></span></label>
            </div>
            <div class="toggle-row">
              <div class="toggle-info"><div class="toggle-label">Show risk labels on map</div></div>
              <label class="toggle-switch"><input type="checkbox" ${m.showRiskLabels ? 'checked' : ''} onchange="window.SahayakSettings.updateMapBehavior('showRiskLabels', this.checked)"><span class="toggle-slider"></span></label>
            </div>
            <div class="toggle-row">
              <div class="toggle-info"><div class="toggle-label">Cluster markers at low zoom</div></div>
              <label class="toggle-switch"><input type="checkbox" ${m.clusterMarkers ? 'checked' : ''} onchange="window.SahayakSettings.updateMapBehavior('clusterMarkers', this.checked)"><span class="toggle-slider"></span></label>
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ RISK THRESHOLDS ============
    function renderRiskThresholds() {
      const el = document.getElementById('settingsThresholds');
      if (!el) return;
      const t = state.settings.thresholds;
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Risk Level Thresholds</div></div>
          <div class="settings-card-body">
            <div class="threshold-grid">
              ${['safe', 'watch', 'alert', 'warning'].map(level => `
                <div class="threshold-card ${level}">
                  <div class="threshold-card-label">${level.toUpperCase()}</div>
                  <div class="threshold-range-inputs">
                    <input type="number" class="threshold-input" value="${t[level][0]}" min="0" max="100" data-level="${level}" data-idx="0" onchange="window.SahayakSettings.updateThreshold(this)">
                    <span class="threshold-separator">–</span>
                    <input type="number" class="threshold-input" value="${t[level][1]}" min="0" max="100" data-level="${level}" data-idx="1" onchange="window.SahayakSettings.updateThreshold(this)">
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="settings-warning">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              <span>Prototype configuration — thresholds must be validated before operational use. These are not official government thresholds.</span>
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ DATA SOURCES ============
    function renderDataSources() {
      const el = document.getElementById('settingsDataSources');
      if (!el) return;
      const sources = [
        { name: 'Rainfall', status: 'connected', statusLabel: 'Connected', provider: 'Demo Weather Service', updated: '12 min ago', icon: 'cloud-rain' },
        { name: 'Satellite', status: 'delayed', statusLabel: 'Delayed', provider: 'Demo Satellite Service', updated: '4 hours ago', icon: 'satellite' },
        { name: 'Historical Data', status: 'connected', statusLabel: 'Available', provider: 'Demo Historical Dataset', updated: 'Yesterday', icon: 'clock' },
        { name: 'Infrastructure', status: 'connected', statusLabel: 'Available', provider: 'Demo GIS Dataset', updated: '1 hr ago', icon: 'building' },
        { name: 'AI Model', status: 'connected', statusLabel: 'Available', provider: 'Prototype Risk Model', updated: '5 min ago', icon: 'cpu' }
      ];
  
      const iconSvgs = {
        'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>',
        'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>',
        'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>',
        'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>'
      };
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Connected Data Sources</div><span class="settings-card-badge" style="font-size:9px;font-weight:700;letter-spacing:0.1em;padding:2px 8px;background:var(--watch-bg);color:var(--watch);border-radius:var(--radius-sm);">DEMO</span></div>
          <div class="settings-card-body">
            <div class="datasource-grid">
              ${sources.map(s => `
                <div class="datasource-card">
                  <div class="datasource-icon">${iconSvgs[s.icon]}</div>
                  <div class="datasource-info">
                    <div class="datasource-name">${s.name}</div>
                    <div class="datasource-provider">${s.provider}</div>
                    <div class="datasource-status ${s.status}">
                      <span class="datasource-status-dot"></span>
                      ${s.statusLabel}
                    </div>
                    <div class="datasource-meta">Last update: ${s.updated}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ OFFLINE SYNC ============
    function renderOfflineSync() {
      const el = document.getElementById('settingsOffline');
      if (!el) return;
      const isOffline = state.settings.offlineMode;
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Offline Data Synchronization</div></div>
          <div class="settings-card-body">
            <div class="offline-status-card ${isOffline ? 'offline' : 'online'}">
              <span class="offline-status-dot"></span>
              <div class="offline-status-text">
                <div class="offline-status-title">${isOffline ? 'Offline' : 'Online'}</div>
                <div class="offline-status-sub">${isOffline ? 'Reports will be synchronized when connection returns.' : 'All data synchronized'}</div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-bottom: var(--space-4);">
              <div class="profile-detail-item">
                <div class="profile-detail-label">Reports Synchronized</div>
                <div class="profile-detail-value">3</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Pending</div>
                <div class="profile-detail-value">${isOffline ? '3' : '0'}</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-2); flex-wrap: wrap; margin-bottom: var(--space-4);">
              <button class="btn btn-primary" onclick="window.SahayakSettings.syncNow()">Sync Now</button>
              <button class="btn btn-outline" onclick="window.SahayakSettings.clearCache()">Clear Local Cache</button>
            </div>
            <div class="toggle-row" style="border-top: 1px solid var(--border); padding-top: var(--space-3);">
              <div class="toggle-info">
                <div class="toggle-label">Simulate Offline Mode</div>
                <div class="toggle-description">Toggle to test offline report submission and sync behavior</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" ${isOffline ? 'checked' : ''} onchange="window.SahayakSettings.toggleOfflineMode(this.checked)">
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ ACCESSIBILITY ============
    function renderAccessibility() {
      const el = document.getElementById('settingsAccessibility');
      if (!el) return;
      const a = state.settings.accessibility;
      const toggles = [
        { key: 'highContrast', label: 'High Contrast', desc: 'Increase contrast for better visibility' },
        { key: 'largerText', label: 'Larger Text', desc: 'Increase base font size across the application' },
        { key: 'reduceMotion', label: 'Reduce Motion', desc: 'Minimize animations and transitions' },
        { key: 'showTextLabels', label: 'Show Text Risk Labels', desc: 'Always show SAFE/WATCH/ALERT/WARNING text alongside colors' },
        { key: 'keyboardNav', label: 'Keyboard Navigation', desc: 'Enable full keyboard navigation support' }
      ];
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Accessibility Options</div></div>
          <div class="settings-card-body">
            ${toggles.map(t => `
              <div class="toggle-row">
                <div class="toggle-info">
                  <div class="toggle-label">${t.label}</div>
                  <div class="toggle-description">${t.desc}</div>
                </div>
                <label class="toggle-switch">
                  <input type="checkbox" ${a[t.key] ? 'checked' : ''} onchange="window.SahayakSettings.updateAccessibility('${t.key}', this.checked)">
                  <span class="toggle-slider"></span>
                </label>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="settings-warning">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
          <span>Risk information is always displayed with text labels, never relying on color alone.</span>
        </div>
      `;
    }
  
    // ============ SECURITY ============
    function renderSecurity() {
      const el = document.getElementById('settingsSecurity');
      if (!el) return;
      const auditLog = [
        { action: 'Login', time: '09:20' },
        { action: 'Dashboard viewed', time: '09:21' },
        { action: 'Risk Analysis viewed — Tawang', time: '09:32' },
        { action: 'Warning draft created', time: '09:45' },
        { action: 'Field officer assigned — SAH-ALR-0001', time: '10:02' },
        { action: 'Settings page opened', time: '10:15' }
      ];
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Session Information</div></div>
          <div class="settings-card-body">
            <div class="profile-details">
              <div class="profile-detail-item">
                <div class="profile-detail-label">Session</div>
                <div class="profile-detail-value">Prototype Session</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Role</div>
                <div class="profile-detail-value">Disaster Authority</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Session Status</div>
                <div class="profile-detail-value" style="color: var(--safe);">Active</div>
              </div>
              <div class="profile-detail-item">
                <div class="profile-detail-label">Environment</div>
                <div class="profile-detail-value">DEMO</div>
              </div>
            </div>
            <div style="display: flex; gap: var(--space-2); margin-top: var(--space-4);">
              <button class="btn btn-outline" onclick="window.SahayakSettings.showDemoModal('Sign Out')">Sign Out</button>
              <button class="btn btn-outline" onclick="window.SahayakSettings.showDemoModal('View Audit Log')">View Audit Log</button>
            </div>
          </div>
        </div>
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">Recent Activity (Demo)</div></div>
          <div class="settings-card-body">
            <div class="audit-log">
              ${auditLog.map(a => `
                <div class="audit-log-item">
                  <span class="audit-log-dot"></span>
                  <span class="audit-log-action">${a.action}</span>
                  <span class="audit-log-time">${a.time}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
        <div class="settings-warning">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <span>No real authentication or security is implemented. This is a prototype demonstration.</span>
        </div>
      `;
    }
  
    // ============ SYSTEM INFO ============
    function renderSystemInfo() {
      const el = document.getElementById('settingsSystem');
      if (!el) return;
      const info = [
        { label: 'Platform', value: 'SAHAYAK — Smart AI Hazard Assessment & Actionable Knowledge' },
        { label: 'Version', value: 'SIH 2026 Prototype v0.1' },
        { label: 'Environment', value: 'DEMO' },
        { label: 'Data Mode', value: 'Synthetic' },
        { label: 'Model', value: 'Prototype Risk Model' },
        { label: 'Region', value: 'Northeast India (8 States)' },
        { label: 'Last UI Update', value: new Date().toLocaleDateString('en-IN', { dateStyle: 'full' }) },
        { label: 'Storage Used', value: (JSON.stringify(localStorage).length / 1024).toFixed(1) + ' KB' }
      ];
  
      el.innerHTML = `
        <div class="settings-card">
          <div class="settings-card-header"><div class="settings-card-title">System Information</div></div>
          <div class="settings-card-body">
            <div class="system-info-grid">
              ${info.map(i => `
                <div class="system-info-item">
                  <div class="system-info-label">${i.label}</div>
                  <div class="system-info-value">${i.value}</div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ UPDATE FUNCTIONS ============
    function updateSetting(key, value) {
      state.settings[key] = value;
    }
  
    function updateLanguage(lang) {
      state.settings.language = lang;
    }
  
    function updateNotification(key, value) {
      state.settings.notifications[key] = value;
    }
  
    function updateMapLayer(key, value) {
      state.settings.mapSettings.layers[key] = value;
    }
  
    function updateMapBehavior(key, value) {
      state.settings.mapSettings[key] = value;
    }
  
    function updateThreshold(input) {
      const level = input.dataset.level;
      const idx = parseInt(input.dataset.idx);
      const val = Math.max(0, Math.min(100, parseInt(input.value) || 0));
      state.settings.thresholds[level][idx] = val;
      input.value = val;
    }
  
    function toggleOfflineMode(checked) {
      state.settings.offlineMode = checked;
      renderOfflineSync();
    }
  
    function updateAccessibility(key, value) {
      state.settings.accessibility[key] = value;
      applySettings();
    }
  
    function syncNow() {
      showToast('Reports synchronized successfully');
    }
  
    function clearCache() {
      showToast('Local cache cleared');
    }
  
    function showDemoModal(action) {
      showToast(`${action} — Demo action (not functional)`);
    }
  
    // ============ TOAST ============
    function showToast(message) {
      const existing = document.querySelector('.settings-toast');
      if (existing) existing.remove();
  
      const toast = document.createElement('div');
      toast.className = 'settings-toast';
      toast.innerHTML = `
        <div class="settings-toast-icon">✓</div>
        <div>
          <div class="settings-toast-text">${message}</div>
          <div class="settings-toast-demo">DEMO</div>
        </div>
      `;
      document.body.appendChild(toast);
  
      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  
    // ============ EVENT LISTENERS ============
    function setupEventListeners() {
      // Sidebar toggle
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
  
      // Save / Reset buttons
      const saveBtn = document.getElementById('saveSettingsBtn');
      const resetBtn = document.getElementById('resetSettingsBtn');
      if (saveBtn) saveBtn.addEventListener('click', saveSettings);
      if (resetBtn) resetBtn.addEventListener('click', resetSettings);
    }
  
    // ============ PUBLIC API ============
    window.SahayakSettings = {
      updateSetting, updateLanguage, updateNotification,
      updateMapLayer, updateMapBehavior, updateThreshold,
      toggleOfflineMode, updateAccessibility,
      syncNow, clearCache, showDemoModal,
      saveSettings, resetSettings
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();