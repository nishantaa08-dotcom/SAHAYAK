// js/field-reports.js — Field Intelligence Center Logic
(function() {
    'use strict';
  
    const state = {
      currentTab: 'all',
      filters: { status: 'all', severity: 'all', state: 'all', type: 'all', search: '' },
      reports: [],
      selectedReport: null,
      notifications: [],
      isOffline: false,
      map: null
    };
  
    async function init() {
      renderSidebar();
      await loadReports();
      renderSummary();
      renderTabs();
      setupFilters();
      setupMap();
      renderActivityFeed();
      renderSyncQueue();
      setupEventListeners();
      loadNotifications();
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
  
    async function loadReports() {
      const loading = document.getElementById('reportsLoading');
      if (loading) loading.style.display = 'block';
      state.reports = await Services.getFieldReports(state.filters);
      renderReports();
      renderMapMarkers();
      if (loading) loading.style.display = 'none';
    }
  
    function renderSummary() {
      const all = SahayakState.getReports();
      document.getElementById('summaryTotal').textContent = all.length;
      document.getElementById('summaryPending').textContent = all.filter(r => r.status === 'PENDING').length;
      document.getElementById('summaryVerified').textContent = all.filter(r => r.status === 'VERIFIED').length;
      document.getElementById('summaryCritical').textContent = all.filter(r => r.severity === 'CRITICAL').length;
    }
  
    function renderTabs() {
      const all = SahayakState.getReports();
      const counts = {
        all: all.length,
        pending: all.filter(r => r.status === 'PENDING').length,
        verified: all.filter(r => r.status === 'VERIFIED').length,
        rejected: all.filter(r => r.status === 'REJECTED').length,
        critical: all.filter(r => r.severity === 'CRITICAL').length
      };
  
      const tabs = [
        { key: 'all', label: 'All', count: counts.all },
        { key: 'pending', label: 'Pending', count: counts.pending },
        { key: 'verified', label: 'Verified', count: counts.verified },
        { key: 'rejected', label: 'Rejected', count: counts.rejected },
        { key: 'critical', label: 'Critical', count: counts.critical }
      ];
  
      document.getElementById('reportsTabs').innerHTML = tabs.map(t => `
        <button class="tab ${t.key === state.currentTab ? 'active' : ''}" data-tab="${t.key}">
          ${t.label}
          <span class="tab-count">${t.count}</span>
        </button>
      `).join('');
  
      document.querySelectorAll('#reportsTabs .tab').forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentTab = btn.dataset.tab;
          applyTabFilter();
          renderTabs();
          loadReports();
        });
      });
    }
  
    function applyTabFilter() {
      if (state.currentTab === 'pending') state.filters.status = 'PENDING';
      else if (state.currentTab === 'verified') state.filters.status = 'VERIFIED';
      else if (state.currentTab === 'rejected') state.filters.status = 'REJECTED';
      else if (state.currentTab === 'critical') { state.filters.status = 'all'; state.filters.severity = 'CRITICAL'; }
      else { state.filters.status = 'all'; state.filters.severity = 'all'; }
    }
  
    function setupFilters() {
      const search = document.getElementById('reportSearch');
      const severity = document.getElementById('reportSeverity');
      const stateFilter = document.getElementById('reportState');
      const typeFilter = document.getElementById('reportType');
  
      if (search) {
        search.addEventListener('input', Utils.debounce(async (e) => {
          state.filters.search = e.target.value;
          await loadReports();
        }, 200));
      }
  
      [severity, stateFilter, typeFilter].forEach(el => {
        if (el) {
          el.addEventListener('change', async (e) => {
            if (el === severity) state.filters.severity = e.target.value;
            if (el === stateFilter) state.filters.state = e.target.value;
            if (el === typeFilter) state.filters.type = e.target.value;
            await loadReports();
          });
        }
      });
  
      const resetBtn = document.getElementById('filterReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
          state.filters = { status: 'all', severity: 'all', state: 'all', type: 'all', search: '' };
          state.currentTab = 'all';
          if (search) search.value = '';
          if (severity) severity.value = 'all';
          if (stateFilter) stateFilter.value = 'all';
          if (typeFilter) typeFilter.value = 'all';
          await loadReports();
          renderTabs();
        });
      }
    }
  
    function renderReports() {
      const list = document.getElementById('reportsList');
      const empty = document.getElementById('reportsEmpty');
      if (!list) return;
  
      if (state.reports.length === 0) {
        list.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
      }
      list.style.display = 'flex';
      if (empty) empty.style.display = 'none';
  
      list.innerHTML = state.reports.map(r => {
        const initials = r.officer.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        const matchLabel = {
          'yes': 'Matches AI',
          'partially': 'Partial match',
          'no': 'Differs from AI',
          'unable': 'Unable to determine'
        }[r.aiPredictionMatch] || '';
  
        return `
          <div class="report-card severity-${r.severity} status-${r.status}" data-id="${r.id}">
            <div class="report-card-header">
              <span class="report-id">${r.id}</span>
              <span class="report-status-badge ${r.status}">${r.status.replace('_', ' ')}</span>
            </div>
            <div class="report-card-body">
              <div class="report-type">${r.type}</div>
              <div class="report-location-name">${r.location}</div>
              <div class="report-location-state">${r.state}</div>
              <div class="report-meta-grid">
                <div class="report-meta-item">
                  <div class="report-meta-label">Severity</div>
                  <span class="severity-badge ${r.severity}">${r.severity}</span>
                </div>
                <div class="report-meta-item">
                  <div class="report-meta-label">AI Risk</div>
                  <div class="report-meta-value">${r.aiRisk} / 100</div>
                </div>
                <div class="report-meta-item">
                  <div class="report-meta-label">Field Assessment</div>
                  <div class="report-meta-value">${r.fieldAssessment}</div>
                </div>
                <div class="report-meta-item">
                  <div class="report-meta-label">AI Match</div>
                  <div class="report-meta-value">${matchLabel}</div>
                </div>
              </div>
              <div style="font-size: var(--fs-xs); color: var(--text-600); line-height: 1.5; padding: var(--space-2) var(--space-3); background: var(--surface); border-radius: var(--radius-sm); margin-bottom: var(--space-2);">
                ${r.observation.slice(0, 120)}${r.observation.length > 120 ? '...' : ''}
              </div>
              <div style="font-size: 10px; color: var(--text-500); font-family: 'SF Mono', Monaco, monospace;">
                ${r.latitude.toFixed(3)}° N, ${r.longitude.toFixed(3)}° E
              </div>
            </div>
            <div class="report-card-footer">
              <div class="report-officer">
                <div class="report-officer-avatar">${initials}</div>
                <div>
                  <div style="font-weight: 600; color: var(--text-900);">${r.officer}</div>
                  <div style="font-size: 10px; color: var(--text-500);">${r.officerRole}</div>
                </div>
              </div>
              <div class="report-time">${r.submitted}</div>
            </div>
            ${r.status === 'PENDING' ? `
              <div class="report-card-actions">
                <button class="btn btn-outline" onclick="event.stopPropagation(); window.SahayakFieldReports.openDetail('${r.id}')">View</button>
                <button class="btn btn-primary" onclick="event.stopPropagation(); window.SahayakFieldReports.verifyReport('${r.id}', 'verify')">Verify</button>
                <button class="btn btn-outline" onclick="event.stopPropagation(); window.SahayakFieldReports.verifyReport('${r.id}', 'reinspect')">Request Inspection</button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
  
      list.querySelectorAll('.report-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.report-card-actions')) return;
          openDetail(card.dataset.id);
        });
      });
    }
  
    // ============ DETAIL PANEL ============
    function openDetail(reportId) {
      const report = SahayakState.getReports().find(r => r.id === reportId);
      if (!report) return;
      state.selectedReport = report;
  
      const panel = document.getElementById('reportDetailPanel');
      const overlay = document.getElementById('detailPanelOverlay');
      if (!panel) return;
  
      const matchClass = report.aiPredictionMatch === 'yes' ? 'supported' : 'differs';
      const matchIcon = report.aiPredictionMatch === 'yes' ? '✓' : '⚠';
      const matchText = report.aiPredictionMatch === 'yes'
        ? 'Prediction supported by field observation'
        : 'Field observation differs from AI prediction';
  
      panel.innerHTML = `
        <div class="detail-panel-header">
          <div class="detail-panel-title">Report Details — ${report.id}</div>
          <button class="detail-panel-close" onclick="window.SahayakFieldReports.closeDetail()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="detail-panel-body">
          <div class="detail-section">
            <div class="detail-section-title">Report Information</div>
            <div class="detail-info-grid">
              <div class="detail-info-item"><div class="detail-info-label">Report ID</div><div class="detail-info-value">${report.id}</div></div>
              <div class="detail-info-item"><div class="detail-info-label">Type</div><div class="detail-info-value">${report.type}</div></div>
              <div class="detail-info-item"><div class="detail-info-label">Location</div><div class="detail-info-value">${report.location}</div></div>
              <div class="detail-info-item"><div class="detail-info-label">Severity</div><div class="detail-info-value"><span class="severity-badge ${report.severity}">${report.severity}</span></div></div>
              <div class="detail-info-item"><div class="detail-info-label">Reporter</div><div class="detail-info-value">${report.officer}</div></div>
              <div class="detail-info-item"><div class="detail-info-label">Submitted</div><div class="detail-info-value">${report.submitted}</div></div>
              <div class="detail-info-item" style="grid-column: 1 / -1;"><div class="detail-info-label">GPS Coordinates</div><div class="detail-info-value" style="font-family: 'SF Mono', Monaco, monospace;">${report.latitude.toFixed(3)}° N, ${report.longitude.toFixed(3)}° E</div></div>
            </div>
          </div>
  
          <div class="detail-section">
            <div class="detail-section-title">Evidence Photo</div>
            <div style="background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-md); aspect-ratio: 16/10; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
              <div style="text-align: center; color: var(--text-400);">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <div style="font-size: var(--fs-xs); margin-top: var(--space-2);">Demo Field Image</div>
              </div>
              <div style="position: absolute; bottom: 8px; left: 8px; right: 8px; background: rgba(234, 179, 8, 0.9); color: var(--navy-900); padding: 2px 6px; border-radius: var(--radius-sm); font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-align: center;">DEMO FIELD IMAGE</div>
            </div>
          </div>
  
          <div class="detail-section">
            <div class="detail-section-title">Observation</div>
            <div style="padding: var(--space-3); background: var(--surface); border-radius: var(--radius-md); font-size: var(--fs-sm); color: var(--text-700); line-height: 1.6;">
              "${report.observation}"
            </div>
            <div style="font-size: 9px; color: var(--watch); font-weight: 700; letter-spacing: 0.1em; margin-top: var(--space-2);">SYNTHETIC DEMONSTRATION REPORT</div>
          </div>
  
          <div class="detail-section">
            <div class="detail-section-title">AI Prediction vs Field Observation</div>
            <div class="ai-field-comparison">
              <div class="ai-field-box">
                <div class="ai-field-box-label">AI Risk</div>
                <div class="ai-field-box-value">${report.aiRisk}</div>
                <span class="ai-field-box-status" style="background: var(--alert-bg); color: var(--alert);">WARNING</span>
              </div>
              <div class="ai-field-vs">VS</div>
              <div class="ai-field-box">
                <div class="ai-field-box-label">Field Assessment</div>
                <div class="ai-field-box-value">${report.fieldAssessment}</div>
                <span class="ai-field-box-status severity-badge ${report.fieldAssessment}">${report.fieldAssessment}</span>
              </div>
            </div>
            <div class="verification-result ${matchClass}">
              <div class="verification-result-icon">${matchIcon}</div>
              <div>${matchText}</div>
            </div>
          </div>
  
          ${report.status === 'PENDING' ? `
            <div class="detail-section">
              <div class="detail-section-title">Verification Actions</div>
              <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                <button class="btn btn-primary" onclick="window.SahayakFieldReports.verifyReport('${report.id}', 'verify')">✓ Verify Prediction</button>
                <button class="btn btn-outline" onclick="window.SahayakFieldReports.verifyReport('${report.id}', 'reject')">⚠ Reject Prediction</button>
                <button class="btn btn-outline" onclick="window.SahayakFieldReports.verifyReport('${report.id}', 'reinspect')">🔍 Request Re-inspection</button>
              </div>
            </div>
          ` : `
            <div class="detail-section">
              <div class="detail-section-title">Status</div>
              <div style="padding: var(--space-3); background: var(--surface); border-radius: var(--radius-md); display: flex; align-items: center; gap: var(--space-3);">
                <span class="report-status-badge ${report.status}" style="font-size: var(--fs-xs); padding: 4px 12px;">${report.status.replace('_', ' ')}</span>
                <span style="font-size: var(--fs-xs); color: var(--text-600);">Report has been processed</span>
              </div>
            </div>
          `}
        </div>
      `;
  
      panel.classList.add('active');
      if (overlay) overlay.classList.add('active');
    }
  
    function closeDetail() {
      const panel = document.getElementById('reportDetailPanel');
      const overlay = document.getElementById('detailPanelOverlay');
      if (panel) panel.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      state.selectedReport = null;
    }
  
    async function verifyReport(id, result) {
      await Services.verifyFieldReport(id, result);
      closeDetail();
      await loadReports();
      renderSummary();
      renderTabs();
      renderActivityFeed();
    }
  
    // ============ MAP ============
    function setupMap() {
      if (typeof L === 'undefined') return;
      const mapEl = document.getElementById('fieldReportsMap');
      if (!mapEl) return;
  
      state.map = L.map(mapEl, {
        center: [25.5, 92.5],
        zoom: 6,
        zoomControl: false,
        layers: [L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OSM &copy; CARTO',
          subdomains: 'abcd', maxZoom: 19
        })]
      });
      L.control.zoom({ position: 'topright' }).addTo(state.map);
      state.map.attributionControl.setPrefix('');
  
      renderMapMarkers();
    }
  
    function renderMapMarkers() {
      if (!state.map) return;
      if (state.mapMarkers) state.map.removeLayer(state.mapMarkers);
      state.mapMarkers = L.layerGroup().addTo(state.map);
  
      state.reports.forEach(r => {
        const colors = { LOW: '#16A34A', MEDIUM: '#EAB308', HIGH: '#F97316', CRITICAL: '#DC2626' };
        const statusColors = { PENDING: '#EAB308', VERIFIED: '#16A34A', REJECTED: '#DC2626' };
        const color = statusColors[r.status] || colors[r.severity];
  
        const icon = L.divIcon({
          className: '',
          html: `<div style="width: 24px; height: 24px; background: ${color}; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 700;">${r.status === 'VERIFIED' ? '✓' : r.status === 'PENDING' ? '!' : '×'}</div>`,
          iconSize: [24, 24], iconAnchor: [12, 12]
        });
  
        const marker = L.marker([r.latitude, r.longitude], { icon }).addTo(state.mapMarkers);
        marker.bindPopup(`
          <div style="padding: 8px; font-family: Inter, sans-serif;">
            <div style="font-size: 10px; font-weight: 700; color: #8A9BB5; letter-spacing: 0.1em;">${r.id}</div>
            <div style="font-size: 14px; font-weight: 700; color: #0B1728;">${r.type}</div>
            <div style="font-size: 11px; color: #8A9BB5; margin-bottom: 8px;">${r.location}, ${r.state}</div>
            <div style="font-size: 11px;"><strong>Severity:</strong> <span style="color: ${colors[r.severity]}; font-weight: 700;">${r.severity}</span></div>
            <div style="font-size: 11px;"><strong>Status:</strong> ${r.status}</div>
            <div style="font-size: 11px;"><strong>Officer:</strong> ${r.officer}</div>
            <div style="font-size: 9px; color: #EAB308; margin-top: 8px; text-align: center; letter-spacing: 0.1em;">DEMO DATA</div>
          </div>
        `);
        marker.on('click', () => openDetail(r.id));
      });
    }
  
    // ============ ACTIVITY FEED ============
    function renderActivityFeed() {
      const feed = document.getElementById('activityFeed');
      if (!feed) return;
  
      const reports = SahayakState.getReports().slice(0, 5);
      feed.innerHTML = reports.map(r => {
        const dotClass = r.status === 'VERIFIED' ? 'verified' : r.status === 'PENDING' ? 'pending' : r.severity === 'CRITICAL' ? 'critical' : '';
        const action = r.status === 'VERIFIED' ? 'Prediction verified' :
                       r.status === 'PENDING' ? 'New report submitted' :
                       r.status === 'REJECTED' ? 'Prediction rejected' : 'Report updated';
        return `
          <div class="activity-feed-item">
            <div class="activity-feed-dot ${dotClass}"></div>
            <div class="activity-feed-content">
              <div class="activity-feed-title">${action}</div>
              <div class="activity-feed-meta">${r.location} · ${r.submitted}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  
    // ============ SYNC QUEUE ============
    function renderSyncQueue() {
      const queue = SahayakState.getOfflineQueue();
      const container = document.getElementById('syncQueueContainer');
      if (!container) return;
  
      if (queue.length === 0) {
        container.style.display = 'none';
        return;
      }
      container.style.display = 'block';
      document.getElementById('syncQueueList').innerHTML = queue.map(r => `
        <div class="sync-queue-item">
          <span class="sync-queue-item-id">${r.id || 'Pending'}</span>
          <span class="sync-queue-item-status waiting">Waiting</span>
        </div>
      `).join('');
      document.getElementById('syncQueueCount').textContent = queue.length;
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
  
    async function syncNow() {
      const result = await Services.syncOfflineReports();
      const container = document.getElementById('syncQueueContainer');
      if (container) {
        container.innerHTML = `
          <div class="sync-queue-title">Synchronization Queue</div>
          <div style="text-align: center; padding: var(--space-3); color: var(--safe); font-weight: 600;">
            ✓ ${result.synced} report(s) synchronized
          </div>
        `;
        setTimeout(() => {
          container.style.display = 'none';
          loadReports();
          renderSummary();
          renderTabs();
        }, 2000);
      }
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
  
      const overlay = document.getElementById('detailPanelOverlay');
      if (overlay) overlay.addEventListener('click', closeDetail);
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDetail();
          if (notifPanel) notifPanel.classList.remove('active');
        }
      });
    }
  
    window.SahayakFieldReports = {
      openDetail, closeDetail,
      verifyReport,
      toggleOffline, syncNow,
      markAllNotificationsRead
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();