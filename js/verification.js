// js/verification.js — Verification Center Logic
(function() {
    'use strict';
  
    const state = {
      currentTab: 'all',
      filters: { status: 'all', state: 'all', riskLevel: 'all', search: '' },
      items: [],
      selectedItem: null,
      notifications: [],
      detailMap: null,
      sideMap: null
    };
  
    async function init() {
      renderSidebar();
      await loadItems();
      renderSummary();
      renderTabs();
      setupFilters();
      setupSideMap();
      renderRecentFeed();
      setupEventListeners();
      loadNotifications();
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
      // Mark Verification as active
      nav.querySelectorAll('.sidebar-item').forEach(el => {
        if (el.dataset.route === 'verification' || el.getAttribute('href')?.includes('verification.html')) {
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
  
    // ============ LOAD ITEMS ============
    async function loadItems() {
      const loading = document.getElementById('verificationLoading');
      if (loading) loading.style.display = 'block';
      state.items = await Services.getVerificationData(state.filters);
      renderItems();
      if (loading) loading.style.display = 'none';
    }
  
    // ============ SUMMARY ============
    function renderSummary() {
      const all = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
      document.getElementById('summaryPending').textContent = all.filter(v => v.status === 'PENDING').length;
      document.getElementById('summaryVerified').textContent = all.filter(v => v.status === 'VERIFIED').length;
      document.getElementById('summaryRejected').textContent = all.filter(v => v.status === 'REJECTED').length;
      document.getElementById('summaryInspection').textContent = all.filter(v => v.status === 'INSPECTION_REQUESTED').length;
    }
  
    // ============ TABS ============
    function renderTabs() {
      const all = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
      const counts = {
        pending: all.filter(v => v.status === 'PENDING').length,
        verified: all.filter(v => v.status === 'VERIFIED').length,
        rejected: all.filter(v => v.status === 'REJECTED').length,
        all: all.length
      };
  
      const tabs = [
        { key: 'pending', label: 'Pending', count: counts.pending },
        { key: 'verified', label: 'Verified', count: counts.verified },
        { key: 'rejected', label: 'Rejected', count: counts.rejected },
        { key: 'all', label: 'All', count: counts.all }
      ];
  
      document.getElementById('verificationTabs').innerHTML = tabs.map(t => `
        <button class="tab ${t.key === state.currentTab ? 'active' : ''}" data-tab="${t.key}">
          ${t.label}
          <span class="tab-count">${t.count}</span>
        </button>
      `).join('');
  
      document.querySelectorAll('#verificationTabs .tab').forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentTab = btn.dataset.tab;
          applyTabFilter();
          renderTabs();
          loadItems();
        });
      });
    }
  
    function applyTabFilter() {
      if (state.currentTab === 'all') state.filters.status = 'all';
      else state.filters.status = state.currentTab.toUpperCase();
    }
  
    // ============ FILTERS ============
    function setupFilters() {
      const search = document.getElementById('verificationSearch');
      const stateFilter = document.getElementById('verificationState');
      const riskFilter = document.getElementById('verificationRisk');
  
      if (search) {
        search.addEventListener('input', Utils.debounce(async (e) => {
          state.filters.search = e.target.value;
          await loadItems();
        }, 200));
      }
  
      if (stateFilter) {
        stateFilter.addEventListener('change', async (e) => {
          state.filters.state = e.target.value;
          await loadItems();
        });
      }
  
      if (riskFilter) {
        riskFilter.addEventListener('change', async (e) => {
          state.filters.riskLevel = e.target.value;
          await loadItems();
        });
      }
  
      const resetBtn = document.getElementById('verificationReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
          state.filters = { status: 'all', state: 'all', riskLevel: 'all', search: '' };
          state.currentTab = 'all';
          if (search) search.value = '';
          if (stateFilter) stateFilter.value = 'all';
          if (riskFilter) riskFilter.value = 'all';
          await loadItems();
          renderTabs();
        });
      }
    }
  
    // ============ RENDER ITEMS ============
    function renderItems() {
      const list = document.getElementById('verificationList');
      const empty = document.getElementById('verificationEmpty');
      if (!list) return;
  
      if (state.items.length === 0) {
        list.style.display = 'none';
        if (empty) empty.style.display = 'block';
        return;
      }
      list.style.display = 'flex';
      if (empty) empty.style.display = 'none';
  
      list.innerHTML = state.items.map(v => {
        const initials = v.officer.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        const statusLabel = {
          'PENDING': 'PENDING',
          'VERIFIED': 'VERIFIED ✓',
          'REJECTED': 'NOT VERIFIED',
          'INSPECTION_REQUESTED': 'INSPECTION REQUESTED'
        }[v.status];
  
        return `
          <div class="verification-card status-${v.status}" data-id="${v.id}">
            <div class="verification-card-header">
              <span class="verification-card-id">${v.id} · ${v.reportId}</span>
              <span class="verification-status-badge ${v.status}">${statusLabel}</span>
            </div>
            <div class="verification-card-body">
              <div class="verification-card-label">AI PREDICTION</div>
              <div class="verification-card-location">${v.location}</div>
              <div class="verification-card-state">${v.state}</div>
  
              <div class="verification-comparison-mini">
                <div class="verification-comparison-box">
                  <div class="verification-comparison-label">AI Risk</div>
                  <div class="verification-comparison-value">${v.aiRisk}</div>
                  <div class="verification-comparison-level ${v.aiLevel}">${v.aiLevel}</div>
                </div>
                <div class="verification-comparison-vs">VS</div>
                <div class="verification-comparison-box">
                  <div class="verification-comparison-label">Field Assessment</div>
                  <div class="verification-comparison-value">${v.fieldSeverity}</div>
                  <div class="verification-comparison-level ${v.fieldAssessment}">${v.fieldAssessment}</div>
                </div>
              </div>
  
              <div class="verification-card-meta">
                <div class="verification-card-meta-item">
                  <div class="verification-card-meta-label">Field Officer</div>
                  <div class="verification-card-meta-value">${v.officer}</div>
                </div>
                <div class="verification-card-meta-item">
                  <div class="verification-card-meta-label">Field Report</div>
                  <div class="verification-card-meta-value">${v.reportId}</div>
                </div>
              </div>
            </div>
            <div class="verification-card-footer">
              <div class="verification-card-officer">
                <div class="verification-card-officer-avatar">${initials}</div>
                <div>
                  <div style="font-weight: 600; color: var(--text-900);">${v.officer}</div>
                  <div style="font-size: 10px; color: var(--text-500);">${v.officerRole}</div>
                </div>
              </div>
              <div class="verification-card-time">${v.submitted}</div>
            </div>
            ${v.status === 'PENDING' ? `
              <div class="verification-card-actions">
                <button class="btn btn-outline" onclick="event.stopPropagation(); window.SahayakVerification.openDetail('${v.id}')">View Details</button>
                <button class="btn btn-primary" onclick="event.stopPropagation(); window.SahayakVerification.verify('${v.id}')">Verify</button>
                <button class="btn btn-outline" onclick="event.stopPropagation(); window.SahayakVerification.reject('${v.id}')">Reject</button>
                <button class="btn btn-outline" onclick="event.stopPropagation(); window.SahayakVerification.requestInspection('${v.id}')">Inspect</button>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
  
      list.querySelectorAll('.verification-card').forEach(card => {
        card.addEventListener('click', (e) => {
          if (e.target.closest('.verification-card-actions')) return;
          openDetail(card.dataset.id);
        });
      });
    }
  
    // ============ DETAIL PANEL ============
    function openDetail(itemId) {
      const item = (SahayakState.get('verificationItems') || DEMO_DATA.verificationItems).find(v => v.id === itemId);
      if (!item) return;
      state.selectedItem = item;
  
      const panel = document.getElementById('verificationDetailPanel');
      const overlay = document.getElementById('verificationDetailOverlay');
      if (!panel) return;
  
      // Determine assessment
      let assessmentClass, assessmentIcon, assessmentText;
      if (item.aiPredictionMatch === 'yes') {
        assessmentClass = 'supported';
        assessmentIcon = '✓';
        assessmentText = 'Prediction Supported by Field Observation';
      } else if (item.aiPredictionMatch === 'no') {
        assessmentClass = 'not-supported';
        assessmentIcon = '✗';
        assessmentText = 'Prediction Not Supported — Field observation differs';
      } else {
        assessmentClass = 'insufficient';
        assessmentIcon = '?';
        assessmentText = 'Insufficient Evidence — Further verification needed';
      }
  
      const factorsHtml = item.factors.map(f => {
        const pct = (f.value / 40) * 100;
        return `
          <div class="ai-bar" style="--target-width: ${pct}%">
            <div class="ai-bar-label">${f.label}</div>
            <div class="ai-bar-track"><div class="ai-bar-fill"></div></div>
            <div class="ai-bar-value">+${f.value}</div>
          </div>
        `;
      }).join('');
  
      const timelineHtml = item.timeline.map(t => `
        <div class="verification-timeline-item ${t.status === 'current' ? 'is-current' : ''}">
          <div class="verification-timeline-dot ${t.status}"></div>
          <div class="verification-timeline-time">${t.time}</div>
          <div class="verification-timeline-event">${t.event}</div>
        </div>
      `).join('');
  
      panel.innerHTML = `
        <div class="verification-detail-header">
          <div class="verification-detail-title">Verification Details — ${item.id}</div>
          <button class="verification-detail-close" onclick="window.SahayakVerification.closeDetail()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="verification-detail-body">
          <!-- AI vs Field Assessment -->
          <div class="verification-section">
            <div class="verification-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              Assessment Comparison
            </div>
            <div class="assessment-grid">
              <div class="assessment-box">
                <div class="assessment-box-header ai">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>
                  AI Assessment
                </div>
                <div class="assessment-box-body">
                  <div class="assessment-row">
                    <span class="assessment-row-label">Risk Score</span>
                    <span class="assessment-row-value">${item.aiRisk} / 100</span>
                  </div>
                  <div class="assessment-row">
                    <span class="assessment-row-label">Probability</span>
                    <span class="assessment-row-value">${item.aiProbability}%</span>
                  </div>
                  <div class="assessment-row">
                    <span class="assessment-row-label">Level</span>
                    <span class="assessment-row-value"><span class="verification-comparison-level ${item.aiLevel}">${item.aiLevel}</span></span>
                  </div>
                </div>
              </div>
              <div class="assessment-box">
                <div class="assessment-box-header field">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Field Observation
                </div>
                <div class="assessment-box-body">
                  <div class="assessment-row">
                    <span class="assessment-row-label">Severity</span>
                    <span class="assessment-row-value"><span class="verification-comparison-level ${item.fieldSeverity}">${item.fieldSeverity}</span></span>
                  </div>
                  <div class="assessment-row">
                    <span class="assessment-row-label">Officer</span>
                    <span class="assessment-row-value" style="font-family: inherit;">${item.officer}</span>
                  </div>
                  <div class="assessment-row">
                    <span class="assessment-row-label">Report</span>
                    <span class="assessment-row-value">${item.reportId}</span>
                  </div>
                  <div class="assessment-observation">"${item.observation}"</div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Evidence -->
          <div class="verification-section">
            <div class="verification-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              Evidence
            </div>
            <div class="evidence-photo">
              <div class="evidence-photo-placeholder">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <div style="font-size: var(--fs-xs);">Demo Field Image</div>
              </div>
              <div class="evidence-photo-badge">DEMO FIELD IMAGE</div>
            </div>
          </div>
  
          <!-- Location Map -->
          <div class="verification-section">
            <div class="verification-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Location
            </div>
            <div class="verification-detail-map">
              <div id="verificationDetailMap"></div>
            </div>
            <div class="verification-gps">${item.lat.toFixed(4)}° N, ${item.lng.toFixed(4)}° E</div>
          </div>
  
          <!-- Comparison Table -->
          <div class="verification-section">
            <div class="verification-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
              Detailed Comparison
            </div>
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Factor</th>
                  <th>AI Prediction</th>
                  <th>Field Observation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Risk Score</td>
                  <td>${item.aiRisk} / 100</td>
                  <td>${item.fieldSeverity}</td>
                </tr>
                <tr>
                  <td>Risk Level</td>
                  <td>${item.aiLevel}</td>
                  <td>${item.fieldAssessment}</td>
                </tr>
                <tr>
                  <td>Primary Driver</td>
                  <td>High rainfall</td>
                  <td>Soil movement observed</td>
                </tr>
                <tr>
                  <td>Secondary Factor</td>
                  <td>Steep slope</td>
                  <td>Roadside cracking</td>
                </tr>
                <tr>
                  <td>Confidence</td>
                  <td>${item.aiProbability}%</td>
                  <td>${item.aiPredictionMatch === 'yes' ? 'Confirmed' : item.aiPredictionMatch === 'no' ? 'Not confirmed' : 'Uncertain'}</td>
                </tr>
              </tbody>
            </table>
            <div class="verification-assessment ${assessmentClass}">
              <div class="verification-assessment-icon verification-check-animate">${assessmentIcon}</div>
              <div>
                <div style="font-weight: 700; margin-bottom: 2px;">Verification Assessment</div>
                <div style="font-size: var(--fs-xs); opacity: 0.9;">${assessmentText}</div>
              </div>
            </div>
          </div>
  
          <!-- SHAP Factors -->
          <div class="verification-section">
            <div class="verification-factors">
              <div class="verification-factors-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Explainable Factors
              </div>
              <div class="ai-bars">${factorsHtml}</div>
              <div class="verification-factors-demo">Illustrative SHAP-style explanation — DEMO</div>
            </div>
          </div>
  
          <!-- Timeline -->
          <div class="verification-section">
            <div class="verification-section-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              Verification Timeline
            </div>
            <div class="verification-timeline">${timelineHtml}</div>
          </div>
        </div>
        ${item.status === 'PENDING' ? `
          <div class="verification-detail-actions">
            <button class="btn btn-verify" onclick="window.SahayakVerification.verify('${item.id}')">✓ Verify Prediction</button>
            <button class="btn btn-reject" onclick="window.SahayakVerification.reject('${item.id}')">✗ Reject Prediction</button>
            <button class="btn btn-outline" onclick="window.SahayakVerification.requestInspection('${item.id}')">🔍 Request Inspection</button>
          </div>
        ` : ''}
      `;
  
      panel.classList.add('active');
      if (overlay) overlay.classList.add('active');
  
      // Initialize detail map
      setTimeout(() => {
        initDetailMap(item);
        // Animate bars
        panel.querySelectorAll('.ai-bar').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('revealed'), i * 100);
        });
      }, 100);
    }
  
    function closeDetail() {
      const panel = document.getElementById('verificationDetailPanel');
      const overlay = document.getElementById('verificationDetailOverlay');
      if (panel) panel.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      if (state.detailMap) {
        state.detailMap.remove();
        state.detailMap = null;
      }
      state.selectedItem = null;
    }
  
    function initDetailMap(item) {
      if (typeof L === 'undefined') return;
      const el = document.getElementById('verificationDetailMap');
      if (!el) return;
  
      state.detailMap = L.map(el, {
        center: [item.lat, item.lng],
        zoom: 12,
        zoomControl: false,
        layers: [L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OSM &copy; CARTO',
          subdomains: 'abcd', maxZoom: 19
        })]
      });
      L.control.zoom({ position: 'topright' }).addTo(state.detailMap);
      state.detailMap.attributionControl.setPrefix('');
  
      // AI prediction marker
      const aiIcon = L.divIcon({
        className: '',
        html: `<div style="width: 28px; height: 28px; background: var(--cyan, #19B8C7); border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">AI</div>`,
        iconSize: [28, 28], iconAnchor: [14, 14]
      });
      L.marker([item.lat + 0.005, item.lng - 0.005], { icon: aiIcon })
        .addTo(state.detailMap)
        .bindPopup(`<div style="padding: 6px; font-family: Inter, sans-serif;"><strong>AI Prediction</strong><br>Risk: ${item.aiRisk}/100<br>Level: ${item.aiLevel}</div>`);
  
      // Field report marker
      const fieldIcon = L.divIcon({
        className: '',
        html: `<div style="width: 28px; height: 28px; background: var(--teal, #0F9D8A); border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 10px; font-weight: 700; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">FO</div>`,
        iconSize: [28, 28], iconAnchor: [14, 14]
      });
      L.marker([item.lat, item.lng], { icon: fieldIcon })
        .addTo(state.detailMap)
        .bindPopup(`<div style="padding: 6px; font-family: Inter, sans-serif;"><strong>Field Report</strong><br>${item.reportId}<br>Officer: ${item.officer}</div>`);
  
      // Risk zone polygon
      const color = DEMO_DATA.riskLevels[item.aiLevel.toLowerCase()]?.color || '#19B8C7';
      L.circle([item.lat, item.lng], {
        radius: 8000,
        color: color,
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.15
      }).addTo(state.detailMap);
  
      setTimeout(() => state.detailMap.invalidateSize(), 200);
    }
  
    // ============ SIDE MAP ============
    function setupSideMap() {
      if (typeof L === 'undefined') return;
      const el = document.getElementById('verificationMap');
      if (!el) return;
  
      state.sideMap = L.map(el, {
        center: [25.5, 92.5],
        zoom: 6,
        zoomControl: false,
        layers: [L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OSM &copy; CARTO',
          subdomains: 'abcd', maxZoom: 19
        })]
      });
      L.control.zoom({ position: 'topright' }).addTo(state.sideMap);
      state.sideMap.attributionControl.setPrefix('');
  
      renderSideMapMarkers();
    }
  
    function renderSideMapMarkers() {
      if (!state.sideMap) return;
      if (state.sideMarkers) state.sideMap.removeLayer(state.sideMarkers);
      state.sideMarkers = L.layerGroup().addTo(state.sideMap);
  
      const items = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
      items.forEach(v => {
        const colors = {
          'PENDING': '#EAB308',
          'VERIFIED': '#16A34A',
          'REJECTED': '#DC2626',
          'INSPECTION_REQUESTED': '#F97316'
        };
        const color = colors[v.status];
        const icon = L.divIcon({
          className: '',
          html: `<div style="width: 22px; height: 22px; background: ${color}; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
          iconSize: [22, 22], iconAnchor: [11, 11]
        });
        const marker = L.marker([v.lat, v.lng], { icon }).addTo(state.sideMarkers);
        marker.bindPopup(`
          <div style="padding: 8px; font-family: Inter, sans-serif;">
            <div style="font-size: 10px; font-weight: 700; color: #8A9BB5; letter-spacing: 0.1em;">${v.id}</div>
            <div style="font-size: 14px; font-weight: 700; color: #0B1728;">${v.location}</div>
            <div style="font-size: 11px; color: #8A9BB5; margin-bottom: 8px;">AI: ${v.aiRisk}/100 · Field: ${v.fieldSeverity}</div>
            <div style="font-size: 11px;"><strong>Status:</strong> <span style="color: ${color}; font-weight: 700;">${v.status.replace('_', ' ')}</span></div>
            <div style="font-size: 9px; color: #EAB308; margin-top: 8px; text-align: center; letter-spacing: 0.1em;">DEMO DATA</div>
          </div>
        `);
        marker.on('click', () => openDetail(v.id));
      });
    }
  
    // ============ RECENT FEED ============
    function renderRecentFeed() {
      const feed = document.getElementById('recentFeed');
      if (!feed) return;
  
      const items = (SahayakState.get('verificationItems') || DEMO_DATA.verificationItems)
        .filter(v => v.status !== 'PENDING')
        .slice(0, 5);
  
      feed.innerHTML = items.map(v => {
        const iconClass = v.status === 'VERIFIED' ? 'verified' : v.status === 'REJECTED' ? 'rejected' : 'inspection';
        const iconChar = v.status === 'VERIFIED' ? '✓' : v.status === 'REJECTED' ? '✗' : '⚠';
        const action = v.status === 'VERIFIED' ? 'Prediction verified' :
                       v.status === 'REJECTED' ? 'Prediction rejected' :
                       'Inspection requested';
        return `
          <div class="recent-feed-item">
            <div class="recent-feed-icon ${iconClass}">${iconChar}</div>
            <div class="recent-feed-content">
              <div class="recent-feed-title">${v.location} — ${action}</div>
              <div class="recent-feed-meta">${v.submitted}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  
    // ============ ACTIONS ============
    async function verify(id) {
      await Services.verifyPrediction(id);
      showToast('success', '✓', 'Prediction verified successfully', `${id} — field evidence confirmed`, 'DEMO');
      await refreshAll();
      if (state.selectedItem?.id === id) closeDetail();
    }
  
    async function reject(id) {
      await Services.rejectPrediction(id);
      showToast('warning', '✗', 'Prediction rejected', `${id} — field observation differs from AI`, 'DEMO');
      await refreshAll();
      if (state.selectedItem?.id === id) closeDetail();
    }
  
    async function requestInspection(id) {
      await Services.requestInspection(id);
      showToast('info', '📍', 'Inspection requested', `${id} — additional field verification required`, 'DEMO');
      await refreshAll();
      if (state.selectedItem?.id === id) closeDetail();
    }
  
    async function refreshAll() {
      await loadItems();
      renderSummary();
      renderTabs();
      renderSideMapMarkers();
      renderRecentFeed();
    }
  
    // ============ TOAST ============
    function showToast(type, icon, title, message, demoLabel) {
      const container = document.getElementById('toastContainer');
      if (!container) return;
  
      const toast = document.createElement('div');
      toast.className = `toast ${type}`;
      toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-content">
          <div class="toast-title">${title}</div>
          <div class="toast-message">${message}</div>
          ${demoLabel ? `<div class="toast-demo">${demoLabel}</div>` : ''}
        </div>
      `;
      container.appendChild(toast);
  
      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }, 3500);
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
  
      const overlay = document.getElementById('verificationDetailOverlay');
      if (overlay) overlay.addEventListener('click', closeDetail);
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDetail();
          if (notifPanel) notifPanel.classList.remove('active');
        }
      });
    }
  
    // ============ PUBLIC API ============
    window.SahayakVerification = {
      openDetail, closeDetail,
      verify, reject, requestInspection,
      markAllNotificationsRead
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();