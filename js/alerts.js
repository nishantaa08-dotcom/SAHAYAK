// js/alerts.js — Alert Center Logic
(function() {
    'use strict';
  
    const state = {
      currentTab: 'active',
      filters: { status: 'all', severity: 'all', state: 'all', search: '' },
      alerts: [],
      selectedAlert: null,
      notifications: []
    };
  
    async function init() {
      renderSidebar();
      await loadAlerts();
      renderSummary();
      renderTabs();
      setupFilters();
      setupEventListeners();
      await loadNotifications();
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
      // Mark Alerts as active
      nav.querySelectorAll('.sidebar-item').forEach(el => {
        if (el.dataset.route === 'alerts' || el.getAttribute('href')?.includes('alerts.html')) {
          el.classList.add('active');
        }
      });
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
  
    // ============ LOAD ALERTS ============
    async function loadAlerts() {
      showLoading();
      state.alerts = await Services.getAlerts(state.filters);
      renderAlerts();
      hideLoading();
    }
  
    function showLoading() {
      const el = document.getElementById('alertsLoading');
      if (el) el.style.display = 'block';
    }
    function hideLoading() {
      const el = document.getElementById('alertsLoading');
      if (el) el.style.display = 'none';
    }
  
    // ============ SUMMARY ============
    function renderSummary() {
      const all = SahayakState.getAlerts();
      const active = all.filter(a => a.status === 'active').length;
      const critical = all.filter(a => a.severity === 'critical' && a.status === 'active').length;
      const high = all.filter(a => ['warning', 'alert'].includes(a.severity) && a.status === 'active').length;
      const resolved = all.filter(a => a.status === 'resolved').length;
  
      document.getElementById('summaryTotal').textContent = active;
      document.getElementById('summaryCritical').textContent = critical;
      document.getElementById('summaryHigh').textContent = high;
      document.getElementById('summaryResolved').textContent = resolved;
    }
  
    // ============ TABS ============
    function renderTabs() {
      const all = SahayakState.getAlerts();
      const counts = {
        active: all.filter(a => a.status === 'active').length,
        critical: all.filter(a => a.severity === 'critical' && a.status === 'active').length,
        scheduled: all.filter(a => a.status === 'scheduled').length,
        resolved: all.filter(a => a.status === 'resolved').length,
        all: all.length
      };
  
      const tabs = [
        { key: 'active', label: 'Active', count: counts.active },
        { key: 'critical', label: 'Critical', count: counts.critical },
        { key: 'scheduled', label: 'Scheduled', count: counts.scheduled },
        { key: 'resolved', label: 'Resolved', count: counts.resolved },
        { key: 'all', label: 'All', count: counts.all }
      ];
  
      document.getElementById('alertsTabs').innerHTML = tabs.map(t => `
        <button class="tab ${t.key === state.currentTab ? 'active' : ''}" data-tab="${t.key}">
          ${t.label}
          <span class="tab-count">${t.count}</span>
        </button>
      `).join('');
  
      document.querySelectorAll('#alertsTabs .tab').forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentTab = btn.dataset.tab;
          applyTabFilter();
          renderTabs();
          renderAlerts();
        });
      });
    }
  
    function applyTabFilter() {
      if (state.currentTab === 'active') state.filters.status = 'active';
      else if (state.currentTab === 'critical') { state.filters.status = 'active'; state.filters.severity = 'critical'; }
      else if (state.currentTab === 'scheduled') state.filters.status = 'scheduled';
      else if (state.currentTab === 'resolved') state.filters.status = 'resolved';
      else { state.filters.status = 'all'; state.filters.severity = 'all'; }
    }
  
    // ============ FILTERS ============
    function setupFilters() {
      const search = document.getElementById('alertSearch');
      const severity = document.getElementById('alertSeverity');
      const stateFilter = document.getElementById('alertState');
  
      if (search) {
        search.addEventListener('input', Utils.debounce(async (e) => {
          state.filters.search = e.target.value;
          await loadAlerts();
        }, 200));
      }
  
      if (severity) {
        severity.addEventListener('change', async (e) => {
          state.filters.severity = e.target.value;
          await loadAlerts();
        });
      }
  
      if (stateFilter) {
        stateFilter.addEventListener('change', async (e) => {
          state.filters.state = e.target.value;
          await loadAlerts();
        });
      }
  
      const resetBtn = document.getElementById('filterReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
          state.filters = { status: 'all', severity: 'all', state: 'all', search: '' };
          state.currentTab = 'active';
          if (search) search.value = '';
          if (severity) severity.value = 'all';
          if (stateFilter) stateFilter.value = 'all';
          await loadAlerts();
          renderTabs();
        });
      }
    }
  
    // ============ RENDER ALERTS ============
    function renderAlerts() {
      const grid = document.getElementById('alertsGrid');
      const empty = document.getElementById('alertsEmpty');
      if (!grid) return;
  
      if (state.alerts.length === 0) {
        grid.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
      }
  
      grid.style.display = 'grid';
      if (empty) empty.style.display = 'none';
  
      grid.innerHTML = state.alerts.map(a => `
        <div class="alert-card-full severity-${a.severity} status-${a.status}" data-id="${a.id}">
          <div class="alert-card-header">
            <span class="alert-severity-badge ${a.severity}">${a.severity.toUpperCase()}</span>
            <span class="alert-status-badge ${a.status}">${a.status.toUpperCase()}</span>
          </div>
          <div class="alert-card-body">
            <div class="alert-type">${a.type}</div>
            <div class="alert-location-name">${a.location} District</div>
            <div class="alert-location-state">${a.state}</div>
            <div class="alert-risk-row">
              <div>
                <div class="alert-risk-label">Risk Score</div>
                <div style="display: flex; align-items: baseline; gap: 4px;">
                  <span class="alert-risk-value">${a.risk}</span>
                  <span class="alert-risk-max">/ 100</span>
                </div>
              </div>
              <div style="flex: 1; padding-left: var(--space-3); border-left: 1px solid var(--border);">
                <div class="alert-risk-label">Reason</div>
                <div style="font-size: var(--fs-xs); color: var(--text-700); margin-top: 2px;">${a.message}</div>
              </div>
            </div>
            <div class="alert-exposure">
              <div class="alert-exposure-item">
                <div class="alert-exposure-value">${Utils.formatNumber(a.population)}</div>
                <div class="alert-exposure-label">People</div>
              </div>
              <div class="alert-exposure-item">
                <div class="alert-exposure-value">${a.roads}</div>
                <div class="alert-exposure-label">Roads</div>
              </div>
              <div class="alert-exposure-item">
                <div class="alert-exposure-value">${a.schools + a.hospitals}</div>
                <div class="alert-exposure-label">Facilities</div>
              </div>
            </div>
            <div class="alert-meta-row">
              <span class="alert-meta-label">Issued</span>
              <span class="alert-meta-value">${a.issued}</span>
            </div>
            <div class="alert-meta-row">
              <span class="alert-meta-label">Expires</span>
              <span class="alert-meta-value">${a.expires}</span>
            </div>
            ${a.assignedOfficer ? `
              <div class="alert-meta-row">
                <span class="alert-meta-label">Response</span>
                <span class="alert-assigned-badge">✓ Field Team Assigned</span>
              </div>
            ` : ''}
          </div>
          <div class="alert-card-actions">
            <button class="btn btn-outline" onclick="window.SahayakAlerts.viewOnMap('${a.id}')">View on Map</button>
            <button class="btn btn-outline" onclick="window.SahayakAlerts.viewAnalysis('${a.id}')">View Analysis</button>
            <button class="btn btn-outline" onclick="event.stopPropagation(); window.SahayakAlerts.openAssignModal('${a.id}')">Assign Team</button>
            <button class="btn btn-primary" onclick="window.SahayakAlerts.openDetail('${a.id}')">View Details</button>
          </div>
        </div>
      `).join('');
  
      // Click to open detail
      grid.querySelectorAll('.alert-card-full').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.alert-card-actions')) return;
          openDetail(card.dataset.id);
        });
      });
    }
  
    // ============ DETAIL PANEL ============
    function openDetail(alertId) {
      const alert = SahayakState.getAlerts().find(a => a.id === alertId);
      if (!alert) return;
      state.selectedAlert = alert;
  
      const panel = document.getElementById('alertDetailPanel');
      const overlay = document.getElementById('detailPanelOverlay');
      if (!panel) return;
  
      const factorsHtml = alert.factors.map(f => {
        const pct = (f.value / 40) * 100;
        return `
          <div class="ai-bar" style="--target-width: ${pct}%">
            <div class="ai-bar-label">${f.label}</div>
            <div class="ai-bar-track"><div class="ai-bar-fill"></div></div>
            <div class="ai-bar-value">+${f.value}</div>
          </div>
        `;
      }).join('');
  
      const timelineHtml = (alert.timeline || []).map(t => `
        <div class="detail-timeline-item">
          <div class="detail-timeline-dot"></div>
          <div class="detail-timeline-time">${t.time}</div>
          <div class="detail-timeline-event">${t.event}</div>
        </div>
      `).join('');
  
      panel.innerHTML = `
        <div class="detail-panel-header">
          <div class="detail-panel-title">Alert Details — ${alert.id}</div>
          <button class="detail-panel-close" onclick="window.SahayakAlerts.closeDetail()" aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="detail-panel-body">
          <div class="detail-section">
            <div class="detail-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Alert Information
            </div>
            <div class="detail-risk-display">
              <div class="detail-risk-score">${alert.risk}</div>
              <div class="detail-risk-meta">
                <div class="detail-risk-level ${alert.severity}">${alert.severity.toUpperCase()}</div>
                <div style="font-size: var(--fs-lg); font-weight: 800; color: var(--white);">${alert.location}</div>
                <div style="font-size: var(--fs-xs); color: var(--text-300);">${alert.state}</div>
              </div>
            </div>
            <div class="detail-info-grid" style="margin-top: var(--space-3);">
              <div class="detail-info-item">
                <div class="detail-info-label">Alert ID</div>
                <div class="detail-info-value">${alert.id}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Issued</div>
                <div class="detail-info-value">${alert.issued}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Expires</div>
                <div class="detail-info-value">${alert.expires}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Status</div>
                <div class="detail-info-value">${alert.status.toUpperCase()}</div>
              </div>
            </div>
          </div>
  
          <div class="detail-section">
            <div class="detail-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Trigger Factors
            </div>
            <div class="detail-factors">
              <div class="detail-factors-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Why is this area at risk?
              </div>
              <div class="ai-bars">${factorsHtml}</div>
              <div class="detail-factors-demo">Illustrative model explanation — DEMO</div>
            </div>
          </div>
  
          <div class="detail-section">
            <div class="detail-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              Exposure
            </div>
            <div class="detail-info-grid">
              <div class="detail-info-item">
                <div class="detail-info-label">Population</div>
                <div class="detail-info-value">${Utils.formatNumber(alert.population)}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Roads</div>
                <div class="detail-info-value">${alert.roads}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Schools</div>
                <div class="detail-info-value">${alert.schools}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Hospital</div>
                <div class="detail-info-value">${alert.hospitals}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Bridges</div>
                <div class="detail-info-value">${alert.bridges}</div>
              </div>
              <div class="detail-info-item">
                <div class="detail-info-label">Villages</div>
                <div class="detail-info-value">${alert.villages}</div>
              </div>
            </div>
            <a href="infrastructure.html" class="btn btn-outline" style="width: 100%; justify-content: center; margin-top: var(--space-3);">View Impact Assessment →</a>
          </div>
  
          <div class="detail-section">
            <div class="detail-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Alert Timeline
            </div>
            <div class="detail-timeline">${timelineHtml}</div>
          </div>
        </div>
        <div class="detail-actions">
          <button class="btn btn-outline" onclick="window.SahayakAlerts.viewOnMap('${alert.id}')">View on Map</button>
          <button class="btn btn-outline" onclick="window.SahayakAlerts.viewAnalysis('${alert.id}')">View AI Analysis</button>
          <button class="btn btn-outline" onclick="window.SahayakAlerts.openAssignModal('${alert.id}')">Assign Field Officer</button>
          <a href="alert-create.html?alert=${alert.id}" class="btn btn-primary">Generate Public Warning</a>
        </div>
      `;
  
      panel.classList.add('active');
      if (overlay) overlay.classList.add('active');
  
      // Animate bars
      setTimeout(() => {
        panel.querySelectorAll('.ai-bar').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('revealed'), i * 100);
        });
      }, 200);
    }
  
    function closeDetail() {
      const panel = document.getElementById('alertDetailPanel');
      const overlay = document.getElementById('detailPanelOverlay');
      if (panel) panel.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      state.selectedAlert = null;
    }
  
    // ============ NAVIGATION ============
    function viewOnMap(alertId) {
      const alert = SahayakState.getAlerts().find(a => a.id === alertId);
      if (alert) {
        localStorage.setItem('sahayak_focus_location', JSON.stringify({
          location: alert.location, lat: alert.lat, lng: alert.lng, risk: alert.risk
        }));
      }
      window.location.href = 'risk-map.html';
    }
  
    function viewAnalysis(alertId) {
      const alert = SahayakState.getAlerts().find(a => a.id === alertId);
      if (alert) {
        localStorage.setItem('sahayak_focus_location', JSON.stringify({
          location: alert.location
        }));
      }
      window.location.href = 'risk-analysis.html';
    }
  
    // ============ ASSIGN MODAL ============
    function openAssignModal(alertId) {
      const alert = SahayakState.getAlerts().find(a => a.id === alertId);
      if (!alert) return;
  
      const modal = document.getElementById('assignModal');
      if (!modal) return;
  
      modal.querySelector('.modal-title').textContent = 'ASSIGN FIELD OFFICER';
      const body = modal.querySelector('.modal-body');
      body.innerHTML = `
        <div class="form-group">
          <label class="form-label">Officer</label>
          <select class="form-select" id="assignOfficerSelect">
            ${DEMO_DATA.officers.map(o => `<option value="${o.id}">${o.name} — ${o.district}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">District</label>
          <input type="text" class="form-input" value="${alert.location}" readonly>
        </div>
        <div class="form-group">
          <label class="form-label">Priority</label>
          <select class="form-select">
            <option>Critical — Immediate response</option>
            <option>High — Within 2 hours</option>
            <option>Medium — Within 24 hours</option>
            <option>Low — Routine inspection</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Deadline</label>
          <select class="form-select">
            <option>Within 2 hours</option>
            <option>Within 6 hours</option>
            <option>Within 24 hours</option>
            <option>Within 48 hours</option>
          </select>
        </div>
      `;
  
      const footer = modal.querySelector('.modal-footer');
      footer.innerHTML = `
        <button class="btn btn-outline" onclick="window.SahayakAlerts.closeAssignModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.SahayakAlerts.confirmAssign('${alertId}')">Assign</button>
      `;
  
      modal.classList.add('active');
    }
  
    async function confirmAssign(alertId) {
      const select = document.getElementById('assignOfficerSelect');
      const officerId = select?.value;
      const officer = DEMO_DATA.officers.find(o => o.id === officerId);
      if (!officer) return;
  
      await Services.assignOfficerToAlert(alertId, officer);
  
      // Show success
      const modal = document.getElementById('assignModal');
      const body = modal.querySelector('.modal-body');
      body.innerHTML = `
        <div class="success-state" style="padding: var(--space-5);">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div style="font-size: var(--fs-base); font-weight: 700; color: var(--text-900); margin-bottom: 4px;">Response task assigned successfully</div>
          <div style="font-size: var(--fs-xs); color: var(--text-500);">DEMO — ${officer.name} assigned to ${alertId}</div>
        </div>
      `;
      const footer = modal.querySelector('.modal-footer');
      footer.innerHTML = `<button class="btn btn-primary" onclick="window.SahayakAlerts.closeAssignModal()">Done</button>`;
  
      await loadAlerts();
      renderSummary();
      renderTabs();
    }
  
    function closeAssignModal() {
      const modal = document.getElementById('assignModal');
      if (modal) modal.classList.remove('active');
    }
  
    // ============ NOTIFICATIONS ============
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
        <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}" onclick="window.SahayakAlerts.markNotificationRead('${n.id}')">
          <div class="notification-icon">${n.icon}</div>
          <div class="notification-content">
            <div class="notification-title">${n.title}</div>
            <div class="notification-message">${n.message}</div>
            <div class="notification-time">${n.timestamp}</div>
          </div>
        </div>
      `).join('');
    }
  
    function markNotificationRead(id) {
      const notifs = SahayakState.getNotifications();
      const n = notifs.find(x => x.id === id);
      if (n) {
        n.read = true;
        localStorage.setItem('sahayak_notifications', JSON.stringify(notifs));
      }
      state.notifications = notifs;
      renderNotificationBadge();
      renderNotificationPanel();
    }
  
    function markAllNotificationsRead() {
      const notifs = SahayakState.getNotifications();
      notifs.forEach(n => n.read = true);
      localStorage.setItem('sahayak_notifications', JSON.stringify(notifs));
      state.notifications = notifs;
      renderNotificationBadge();
      renderNotificationPanel();
    }
  
    // ============ EVENT LISTENERS ============
    function setupEventListeners() {
      // Notifications
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
  
      // Overlay click closes detail
      const overlay = document.getElementById('detailPanelOverlay');
      if (overlay) {
        overlay.addEventListener('click', closeDetail);
      }
  
      // Modal overlay click
      const modal = document.getElementById('assignModal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeAssignModal();
        });
      }
  
      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDetail();
          closeAssignModal();
          if (notifPanel) notifPanel.classList.remove('active');
        }
      });
    }
  
    // ============ PUBLIC API ============
    window.SahayakAlerts = {
      openDetail, closeDetail,
      viewOnMap, viewAnalysis,
      openAssignModal, closeAssignModal, confirmAssign,
      markNotificationRead, markAllNotificationsRead
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();