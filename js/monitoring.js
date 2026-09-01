// js/monitoring.js — Environmental Intelligence Page Logic
(function() {
    'use strict';
  
    const state = {
      currentLocation: 'Tawang',
      currentTab: 'rainfall',
      charts: { rainfall: null, byState: null, byYear: null, seasonal: null },
      map: null,
      mapMarkers: null,
      notifications: []
    };
    // Add this helper function
function getTabFromHash() {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['rainfall', 'terrain', 'satellite', 'historical'];
    return validTabs.includes(hash) ? hash : 'rainfall';
  }
  
  // Then modify the init() function to use it:
  async function init() {
    renderSidebar();
    
    // 🔧 NEW: Read tab from URL hash
    const tabFromHash = getTabFromHash();
    state.currentTab = tabFromHash;
    
    // 🔧 NEW: Activate the correct tab button
    document.querySelectorAll('.monitoring-tab').forEach(tab => {
      tab.classList.toggle('active', tab.dataset.tab === tabFromHash);
    });
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.toggle('active', content.dataset.content === tabFromHash);
    });
    
    setupTabs();
    setupLocationSelector();
    await loadLocation();
    setupEventListeners();
    await loadNotifications();
  }
  
    // ============ INITIALIZATION ============
    async function init() {
      renderSidebar();
      setupTabs();
      setupLocationSelector();
      await loadLocation();
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
      // Mark Rainfall (monitoring) as active
      nav.querySelectorAll('.sidebar-item').forEach(el => {
        const route = el.dataset.route;
        const href = el.getAttribute('href') || '';
        // Mark ANY monitoring-related route as active
        if (['rainfall', 'terrain', 'satellite', 'historical'].includes(route) || 
            href.includes('monitoring.html')) {
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
  
    // ============ TABS ============
    function setupTabs() {
      document.querySelectorAll('.monitoring-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          const target = tab.dataset.tab;
          state.currentTab = target;
          document.querySelectorAll('.monitoring-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
          document.querySelector(`.tab-content[data-content="${target}"]`).classList.add('active');
          // Re-render charts when tab becomes visible
          if (target === 'rainfall') renderRainfallChart();
          if (target === 'historical') { renderHistoricalCharts(); renderHistoricalMap(); }
        });
      });
    }
  
    // ============ LOCATION SELECTOR ============
    function setupLocationSelector() {
      const select = document.getElementById('locationSelect');
      if (!select) return;
      select.innerHTML = DEMO_DATA.monitoringLocations.map(loc =>
        `<option value="${loc}" ${loc === state.currentLocation ? 'selected' : ''}>${loc}</option>`
      ).join('');
      select.addEventListener('change', async (e) => {
        state.currentLocation = e.target.value;
        await loadLocation();
      });
    }
  
    // ============ LOAD LOCATION ============
    async function loadLocation() {
      showLoading();
      try {
        const data = await Services.getMonitoringData(state.currentLocation);
        renderRainfall(data.rainfall);
        renderTerrain(data.terrain);
        renderSatellite(data.satellite);
        renderHistoricalSummary(data.historical);
        if (state.currentTab === 'rainfall') renderRainfallChart();
        if (state.currentTab === 'historical') {
          renderHistoricalCharts();
          renderHistoricalMap();
        }
        hideLoading();
      } catch (err) {
        showError();
      }
    }
  
    function showLoading() {
      const el = document.getElementById('monitoringLoading');
      if (el) el.style.display = 'block';
    }
    function hideLoading() {
      const el = document.getElementById('monitoringLoading');
      if (el) el.style.display = 'none';
    }
    function showError() {
      const el = document.getElementById('monitoringLoading');
      if (!el) return;
      el.innerHTML = `
        <div style="padding: var(--space-6); text-align: center;">
          <div style="font-size: var(--fs-sm); color: var(--text-700); font-weight: 600;">Environmental data temporarily unavailable</div>
          <button class="btn btn-outline" style="margin-top: var(--space-3);" onclick="window.SahayakMonitoring.retry()">Retry</button>
        </div>
      `;
      el.style.display = 'block';
    }
    async function retry() {
      hideLoading();
      await loadLocation();
    }
  
    // ============ RAINFALL ============
    function renderRainfall(r) {
      const cards = document.getElementById('rainfallSummaryCards');
      if (!cards) return;
      const items = [
        { label: 'Current', value: r.current, unit: 'mm', status: null },
        { label: '24h Rainfall', value: r.h24, unit: 'mm', status: null },
        { label: '48h Rainfall', value: r.h48, unit: 'mm', status: null },
        { label: '72h Rainfall', value: r.h72, unit: 'mm', status: r.exceeded ? 'high' : null, statusLabel: r.exceeded ? 'Threshold Exceeded' : 'Normal' },
        { label: '7 Day Rainfall', value: r.h7day, unit: 'mm', status: null }
      ];
      cards.innerHTML = items.map(i => `
        <div class="monitoring-summary-card ${i.status === 'high' ? 'alert-card' : ''}">
          <div class="monitoring-summary-label">${i.label}</div>
          <div class="monitoring-summary-value">${i.value}</div>
          <div class="monitoring-summary-unit">${i.unit}</div>
          ${i.status ? `<span class="monitoring-summary-status ${i.status}">${i.statusLabel}</span>` : ''}
        </div>
      `).join('');
  
      // Risk indicator
      const riskEl = document.getElementById('rainfallRiskIndicator');
      if (riskEl) {
        riskEl.innerHTML = `
          <div class="rainfall-risk-item">
            <div class="rainfall-risk-label">Current Condition</div>
            <div class="rainfall-risk-value ${r.exceeded ? 'alert' : 'ok'}">${r.exceeded ? 'HIGH' : 'NORMAL'}</div>
          </div>
          <div class="rainfall-risk-item">
            <div class="rainfall-risk-label">Threshold</div>
            <div class="rainfall-risk-value">${r.threshold} mm</div>
            <div class="rainfall-risk-sub">per 72h</div>
          </div>
          <div class="rainfall-risk-item">
            <div class="rainfall-risk-label">Observed</div>
            <div class="rainfall-risk-value ${r.exceeded ? 'alert' : 'ok'}">${r.h72} mm</div>
            <div class="rainfall-risk-sub">per 72h</div>
          </div>
        `;
      }
  
      // Alert banner
      const alertEl = document.getElementById('rainfallAlertBanner');
      if (alertEl) {
        if (r.exceeded) {
          alertEl.style.display = 'flex';
          alertEl.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            72h threshold exceeded by ${r.exceedPct}% — ${r.h72} mm observed vs ${r.threshold} mm threshold
          `;
        } else {
          alertEl.style.display = 'none';
        }
      }
    }
  
    function renderRainfallChart() {
      const canvas = document.getElementById('rainfallChart');
      if (!canvas || typeof Chart === 'undefined') return;
      const data = DEMO_DATA.monitoringData[state.currentLocation]?.rainfall;
      if (!data) return;
  
      if (state.charts.rainfall) state.charts.rainfall.destroy();
  
      const labels = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);
  
      state.charts.rainfall = new Chart(canvas, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              type: 'bar',
              label: 'Hourly Rainfall (mm)',
              data: data.hourly,
              backgroundColor: 'rgba(25, 184, 199, 0.7)',
              borderColor: '#19B8C7',
              borderWidth: 1,
              borderRadius: 3,
              yAxisID: 'y',
              order: 2
            },
            {
              type: 'line',
              label: 'Accumulated Rainfall (mm)',
              data: data.accumulated,
              borderColor: '#F97316',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              borderWidth: 2,
              tension: 0.35,
              fill: true,
              pointRadius: 0,
              yAxisID: 'y1',
              order: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000, easing: 'easeOutQuart' },
          interaction: { mode: 'index', intersect: false },
          plugins: {
            legend: {
              position: 'top',
              labels: { color: '#8A9BB5', font: { size: 11, weight: '600' }, usePointStyle: true, pointStyle: 'circle' }
            },
            tooltip: {
              backgroundColor: '#0B1728',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#19B8C7',
              borderWidth: 1,
              padding: 10
            }
          },
          scales: {
            x: {
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
              ticks: { color: '#8A9BB5', font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 12 }
            },
            y: {
              position: 'left',
              title: { display: true, text: 'Hourly (mm)', color: '#8A9BB5', font: { size: 10 } },
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
              ticks: { color: '#8A9BB5', font: { size: 10 } }
            },
            y1: {
              position: 'right',
              title: { display: true, text: 'Accumulated (mm)', color: '#F97316', font: { size: 10 } },
              grid: { display: false },
              ticks: { color: '#F97316', font: { size: 10 } }
            }
          }
        },
        plugins: [{
          id: 'thresholdLine',
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            const y1Scale = chart.scales.y1;
            const xScale = chart.scales.x;
            const y = y1Scale.getPixelForValue(data.threshold);
            ctx.save();
            ctx.strokeStyle = '#DC2626';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([5, 5]);
            ctx.beginPath();
            ctx.moveTo(xScale.left, y);
            ctx.lineTo(xScale.right, y);
            ctx.stroke();
            ctx.restore();
            ctx.save();
            ctx.fillStyle = '#DC2626';
            ctx.font = 'bold 10px Inter, sans-serif';
            ctx.fillText(`Threshold: ${data.threshold} mm`, xScale.right - 110, y - 6);
            ctx.restore();
          }
        }]
      });
    }
  
    // ============ TERRAIN ============
    function renderTerrain(t) {
      // Gauges
      const gauges = document.getElementById('terrainGauges');
      if (!gauges) return;
  
      const moistureClass = t.soilMoisture > 75 ? 'high' : t.soilMoisture > 55 ? 'moderate' : 'low';
      const slopeClass = t.slope > 35 ? 'steep' : t.slope > 25 ? 'moderate' : 'low';
      const stabilityClass = t.stability === 'REDUCED' ? 'high' : t.stability === 'MODERATE' ? 'moderate' : 'low';
  
      gauges.innerHTML = `
        ${renderGauge('Soil Moisture', t.soilMoisture, '%', moistureClass, t.soilMoisture > 75 ? 'HIGH' : t.soilMoisture > 55 ? 'MODERATE' : 'NORMAL')}
        ${renderGauge('Slope', t.slope, '°', slopeClass, t.slope > 35 ? 'STEEP' : t.slope > 25 ? 'MODERATE' : 'GENTLE')}
        ${renderGauge('Stability', t.stability === 'REDUCED' ? 30 : t.stability === 'MODERATE' ? 60 : 90, '', stabilityClass, t.stability)}
      `;
  
      // Animate gauges
      setTimeout(() => {
        gauges.querySelectorAll('.terrain-gauge-circle .progress').forEach(p => {
          const target = p.dataset.target;
          p.style.strokeDashoffset = 314 - (314 * target / 100);
        });
      }, 100);
  
      // Terrain profile SVG
      renderTerrainProfile(t);
  
      // Current vs Normal
      const compEl = document.getElementById('terrainComparison');
      if (compEl) {
        const soilDeviation = t.soilMoisture - t.normal.soilMoisture;
        const slopeDeviation = t.slope - t.normal.slope;
        compEl.innerHTML = `
          <div class="comparison-box">
            <div class="comparison-box-title">Normal Conditions</div>
            <div class="comparison-row">
              <span class="comparison-row-label">Soil Moisture</span>
              <span class="comparison-row-value">${t.normal.soilMoisture}%</span>
            </div>
            <div class="comparison-row">
              <span class="comparison-row-label">Slope</span>
              <span class="comparison-row-value">${t.normal.slope}°</span>
            </div>
            <div class="comparison-row">
              <span class="comparison-row-label">Soil Type</span>
              <span class="comparison-row-value" style="font-family: inherit;">${t.soilType}</span>
            </div>
            <div class="comparison-row">
              <span class="comparison-row-label">Aspect</span>
              <span class="comparison-row-value">${t.aspect}</span>
            </div>
          </div>
          <div class="comparison-box">
            <div class="comparison-box-title">Current Conditions</div>
            <div class="comparison-row">
              <span class="comparison-row-label">Soil Moisture</span>
              <span class="comparison-row-value ${soilDeviation > 15 ? 'deviation' : ''}">${t.soilMoisture}% ${soilDeviation > 15 ? `(+${soilDeviation})` : ''}</span>
            </div>
            <div class="comparison-row">
              <span class="comparison-row-label">Slope</span>
              <span class="comparison-row-value ${slopeDeviation > 5 ? 'deviation' : ''}">${t.slope}° ${slopeDeviation > 5 ? `(+${slopeDeviation})` : ''}</span>
            </div>
            <div class="comparison-row">
              <span class="comparison-row-label">Elevation</span>
              <span class="comparison-row-value">${Utils.formatNumber(t.elevation)} m</span>
            </div>
            <div class="comparison-row">
              <span class="comparison-row-label">Stability</span>
              <span class="comparison-row-value"><span class="monitoring-summary-status ${t.stability.toLowerCase()}">${t.stability}</span></span>
            </div>
          </div>
        `;
      }
  
      // Deviation banner
      const devBanner = document.getElementById('deviationBanner');
      if (devBanner) {
        const soilDev = t.soilMoisture - t.normal.soilMoisture;
        const slopeDev = t.slope - t.normal.slope;
        if (soilDev > 15 || slopeDev > 5) {
          devBanner.style.display = 'flex';
          devBanner.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Condition deviation detected — DEMO
          `;
        } else {
          devBanner.style.display = 'none';
        }
      }
    }
  
    function renderGauge(label, value, unit, colorClass, statusText) {
      const statusClass = colorClass === 'high' || colorClass === 'steep' ? colorClass : colorClass;
      return `
        <div class="terrain-gauge">
          <div class="terrain-gauge-circle">
            <svg viewBox="0 0 120 120">
              <circle class="track" cx="60" cy="60" r="50"/>
              <circle class="progress ${colorClass}" cx="60" cy="60" r="50" data-target="${value}"/>
            </svg>
            <div class="terrain-gauge-center">
              <div class="terrain-gauge-value">${value}</div>
              <div class="terrain-gauge-unit">${unit}</div>
            </div>
          </div>
          <div class="terrain-gauge-label">${label}</div>
          <span class="terrain-gauge-status monitoring-summary-status ${statusClass.toLowerCase()}">${statusText}</span>
        </div>
      `;
    }
  
    function renderTerrainProfile(t) {
      const container = document.getElementById('terrainProfile');
      if (!container) return;
  
      // Generate a terrain profile SVG
      const width = 600;
      const height = 160;
      const points = [];
      const segments = 20;
      const baseY = height - 20;
  
      for (let i = 0; i <= segments; i++) {
        const x = (i / segments) * width;
        const variation = Math.sin(i * 0.5) * 30 + Math.cos(i * 0.3) * 20;
        const slopeFactor = (t.slope / 45) * 40;
        const y = baseY - 40 - variation - slopeFactor * (i / segments);
        points.push([x, Math.max(20, y)]);
      }
  
      const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
      const areaD = pathD + ` L ${width} ${height} L 0 ${height} Z`;
  
      // Soil layers
      const soilColors = {
        'Mountain Soil — Demo': ['#8B6F47', '#6B5437', '#4A3825'],
        'Loamy Soil — Demo': ['#A0826D', '#8B6F5A', '#6B5444'],
        'Red Soil — Demo': ['#B85C3A', '#9C4A2E', '#7A3822'],
        'Alluvial — Demo': ['#C9B896', '#A89878', '#87785A'],
        'Laterite — Demo': ['#A0522D', '#8B4513', '#6B3410']
      };
      const colors = soilColors[t.soilType] || soilColors['Mountain Soil — Demo'];
  
      container.innerHTML = `
        <svg class="terrain-profile-svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          <defs>
            <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${colors[0]}"/>
              <stop offset="50%" stop-color="${colors[1]}"/>
              <stop offset="100%" stop-color="${colors[2]}"/>
            </linearGradient>
            <linearGradient id="vegGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#22C55E" stop-opacity="0.6"/>
              <stop offset="100%" stop-color="#16A34A" stop-opacity="0.2"/>
            </linearGradient>
          </defs>
          <!-- Soil body -->
          <path d="${areaD}" fill="url(#soilGrad)"/>
          <!-- Vegetation layer -->
          <path d="${pathD}" fill="none" stroke="url(#vegGrad)" stroke-width="6" stroke-linecap="round"/>
          <!-- Surface line -->
          <path d="${pathD}" fill="none" stroke="#0F9D8A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <!-- Slope angle indicator -->
          <line x1="${width * 0.3}" y1="${points[6][1]}" x2="${width * 0.7}" y2="${points[14][1]}" stroke="#F97316" stroke-width="1" stroke-dasharray="3,3"/>
          <text x="${width * 0.5}" y="${(points[6][1] + points[14][1]) / 2 - 10}" text-anchor="middle" font-size="11" font-weight="700" fill="#F97316">${t.slope}°</text>
          <!-- Elevation label -->
          <text x="10" y="20" font-size="10" font-weight="600" fill="#8A9BB5">${Utils.formatNumber(t.elevation)} m elevation</text>
        </svg>
      `;
    }
  
    // ============ SATELLITE ============
    function renderSatellite(s) {
      // Indicators
      const indicators = document.getElementById('satelliteIndicators');
      if (indicators) {
        const items = [
          { label: 'NDVI', value: s.ndvi, dotClass: s.ndvi.includes('Change') ? 'detected' : 'stable' },
          { label: 'NDWI', value: s.ndwi, dotClass: s.ndwi === 'Stable' ? 'stable' : 'detected' },
          { label: 'Surface Change', value: s.surface, dotClass: s.surface === 'Detected' ? 'detected' : 'none' },
          { label: 'SAR Indicator', value: s.sar, dotClass: s.sar === 'Elevated' ? 'elevated' : 'stable' },
          { label: 'Vegetation', value: s.vegetation, dotClass: s.vegetation === 'Moderate' ? 'moderate' : 'stable' }
        ];
        indicators.innerHTML = items.map(i => `
          <div class="satellite-indicator">
            <div class="satellite-indicator-label">${i.label}</div>
            <div class="satellite-indicator-value">
              <span class="satellite-indicator-dot ${i.dotClass}"></span>
              ${i.value}
            </div>
          </div>
        `).join('');
      }
  
      // Change bars
      const bars = document.getElementById('satelliteChangeBars');
      if (bars) {
        bars.innerHTML = `
          <div class="satellite-change-bar" style="--target-width: ${s.vegetationPct}%">
            <div class="satellite-change-bar-header">
              <span class="satellite-change-bar-label">Vegetation</span>
              <span class="satellite-change-bar-value">${s.vegetationPct}%</span>
            </div>
            <div class="satellite-change-bar-track"><div class="satellite-change-bar-fill"></div></div>
          </div>
          <div class="satellite-change-bar" style="--target-width: ${s.surfaceStabilityPct}%">
            <div class="satellite-change-bar-header">
              <span class="satellite-change-bar-label">Surface Stability</span>
              <span class="satellite-change-bar-value">${s.surfaceStabilityPct}%</span>
            </div>
            <div class="satellite-change-bar-track"><div class="satellite-change-bar-fill"></div></div>
          </div>
          <div class="satellite-change-bar" style="--target-width: ${s.waterSoilPct}%">
            <div class="satellite-change-bar-header">
              <span class="satellite-change-bar-label">Water/Soil Signal</span>
              <span class="satellite-change-bar-value">${s.waterSoilPct}%</span>
            </div>
            <div class="satellite-change-bar-track"><div class="satellite-change-bar-fill"></div></div>
          </div>
        `;
        setTimeout(() => {
          bars.querySelectorAll('.satellite-change-bar').forEach((bar, i) => {
            setTimeout(() => bar.classList.add('revealed'), i * 150);
          });
        }, 200);
      }
  
      // Anomaly alert
      const alertEl = document.getElementById('satelliteAlert');
      if (alertEl) {
        if (s.anomaly) {
          alertEl.style.display = 'flex';
          alertEl.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            Surface anomaly detected near selected demonstration risk zone.
          `;
        } else {
          alertEl.style.display = 'none';
        }
      }
  
      // Setup comparison slider
      setupSatelliteSlider();
    }
  
    function setupSatelliteSlider() {
      const comparison = document.querySelector('.satellite-comparison');
      const handle = comparison?.querySelector('.satellite-slider-handle');
      const afterLayer = comparison?.querySelector('.satellite-layer.after');
      if (!comparison || !handle || !afterLayer) return;
  
      let isDragging = false;
  
      const updatePosition = (clientX) => {
        const rect = comparison.getBoundingClientRect();
        const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
        const pct = (x / rect.width) * 100;
        handle.style.left = pct + '%';
        afterLayer.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
      };
  
      handle.addEventListener('mousedown', () => { isDragging = true; });
      handle.addEventListener('touchstart', () => { isDragging = true; }, { passive: true });
  
      document.addEventListener('mousemove', (e) => {
        if (isDragging) updatePosition(e.clientX);
      });
      document.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches[0]) updatePosition(e.touches[0].clientX);
      }, { passive: true });
  
      document.addEventListener('mouseup', () => { isDragging = false; });
      document.addEventListener('touchend', () => { isDragging = false; });
  
      comparison.addEventListener('click', (e) => {
        if (e.target === handle) return;
        updatePosition(e.clientX);
      });
    }
  
    // ============ HISTORICAL ============
    function renderHistoricalSummary(h) {
      const container = document.getElementById('historicalSummaryCards');
      if (!container) return;
      const items = [
        { label: 'Total Events', value: h.total, status: null },
        { label: 'Critical', value: h.critical, status: h.critical > 0 ? 'critical' : null },
        { label: 'High', value: h.high, status: h.high > 0 ? 'high' : null },
        { label: 'Moderate', value: h.moderate, status: 'moderate' }
      ];
      container.innerHTML = items.map(i => `
        <div class="monitoring-summary-card">
          <div class="monitoring-summary-label">${i.label}</div>
          <div class="monitoring-summary-value">${i.value}</div>
          ${i.status ? `<span class="monitoring-summary-status ${i.status}">${i.status.toUpperCase()}</span>` : ''}
        </div>
      `).join('');
    }
  
    function renderHistoricalCharts() {
      renderByStateChart();
      renderByYearChart();
      renderSeasonalChart();
    }
  
    function renderByStateChart() {
      const canvas = document.getElementById('byStateChart');
      if (!canvas || typeof Chart === 'undefined') return;
      if (state.charts.byState) state.charts.byState.destroy();
  
      const states = ['Arunachal Pradesh', 'Assam', 'Meghalaya', 'Sikkim', 'Nagaland', 'Manipur', 'Mizoram', 'Tripura'];
      const counts = states.map(s => DEMO_DATA.historicalEvents.filter(e => e.state === s).length);
  
      state.charts.byState = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: states.map(s => s.length > 12 ? s.slice(0, 10) + '...' : s),
          datasets: [{
            label: 'Events',
            data: counts,
            backgroundColor: 'rgba(249, 115, 22, 0.7)',
            borderColor: '#F97316',
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.7
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000 },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0B1728',
              titleColor: '#fff',
              bodyColor: '#fff',
              callbacks: {
                title: (ctx) => states[ctx[0].dataIndex],
                label: (ctx) => `${ctx.parsed.y} events`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#8A9BB5', font: { size: 10 }, maxRotation: 45 }
            },
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, color: '#8A9BB5', font: { size: 10 } },
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false }
            }
          }
        }
      });
    }
  
    function renderByYearChart() {
      const canvas = document.getElementById('byYearChart');
      if (!canvas || typeof Chart === 'undefined') return;
      if (state.charts.byYear) state.charts.byYear.destroy();
  
      const years = [2021, 2022, 2023, 2024, 2025];
      const counts = years.map(y => DEMO_DATA.historicalEvents.filter(e => e.year === y).length);
  
      state.charts.byYear = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            label: 'Events',
            data: counts,
            backgroundColor: 'rgba(25, 184, 199, 0.7)',
            borderColor: '#19B8C7',
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000 },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0B1728',
              titleColor: '#fff',
              bodyColor: '#fff',
              callbacks: { label: (ctx) => `${ctx.parsed.y} events` }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#8A9BB5', font: { size: 11, weight: '600' } }
            },
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, color: '#8A9BB5', font: { size: 10 } },
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false }
            }
          }
        }
      });
    }
  
    function renderSeasonalChart() {
      const canvas = document.getElementById('seasonalChart');
      if (!canvas || typeof Chart === 'undefined') return;
      if (state.charts.seasonal) state.charts.seasonal.destroy();
  
      const seasons = ['Monsoon', 'Pre-Monsoon', 'Post-Monsoon', 'Winter'];
      const counts = seasons.map(s => DEMO_DATA.historicalEvents.filter(e => e.season === s).length);
      const colors = ['#19B8C7', '#F97316', '#EAB308', '#6366F1'];
  
      state.charts.seasonal = new Chart(canvas, {
        type: 'doughnut',
        data: {
          labels: seasons,
          datasets: [{
            data: counts,
            backgroundColor: colors,
            borderColor: '#fff',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000 },
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: '#8A9BB5', font: { size: 11, weight: '600' }, padding: 15, usePointStyle: true }
            },
            tooltip: {
              backgroundColor: '#0B1728',
              titleColor: '#fff',
              bodyColor: '#fff',
              callbacks: { label: (ctx) => `${ctx.label}: ${ctx.parsed} events` }
            }
          }
        }
      });
    }
  
    // ============ HISTORICAL MAP ============
    function renderHistoricalMap() {
      if (typeof L === 'undefined') return;
      const el = document.getElementById('historicalMap');
      if (!el) return;
  
      if (!state.map) {
        state.map = L.map(el, {
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
      }
  
      if (state.mapMarkers) state.map.removeLayer(state.mapMarkers);
      state.mapMarkers = L.layerGroup().addTo(state.map);
  
      const severityColors = {
        'CRITICAL': '#DC2626',
        'HIGH': '#F97316',
        'MODERATE': '#EAB308',
        'LOW': '#16A34A'
      };
  
      DEMO_DATA.historicalEvents.forEach(ev => {
        const color = severityColors[ev.severity] || '#19B8C7';
        const icon = L.divIcon({
          className: '',
          html: `<div style="width: 22px; height: 22px; background: ${color}; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.4);"></div>`,
          iconSize: [22, 22], iconAnchor: [11, 11]
        });
  
        const marker = L.marker([ev.lat, ev.lng], { icon }).addTo(state.mapMarkers);
        marker.bindPopup(`
          <div style="padding: 8px; font-family: Inter, sans-serif; min-width: 220px;">
            <div style="font-size: 10px; font-weight: 700; color: #8A9BB5; letter-spacing: 0.1em;">HISTORICAL LANDSLIDE</div>
            <div style="font-size: 14px; font-weight: 700; color: #0B1728; margin: 4px 0;">${ev.location}</div>
            <div style="font-size: 11px; color: #8A9BB5; margin-bottom: 8px;">${ev.state}</div>
            <div style="font-size: 11px; margin-bottom: 4px;"><strong>Date:</strong> ${ev.date}</div>
            <div style="font-size: 11px; margin-bottom: 4px;"><strong>Severity:</strong> <span style="color: ${color}; font-weight: 700;">${ev.severity}</span></div>
            <div style="font-size: 11px; margin-bottom: 4px;"><strong>Cause:</strong> ${ev.cause}</div>
            <div style="font-size: 11px; margin-bottom: 4px;"><strong>Damage:</strong> ${ev.damage}</div>
            <div style="font-size: 11px;"><strong>Source:</strong> ${ev.source}</div>
            <div style="font-size: 9px; color: #EAB308; margin-top: 8px; text-align: center; letter-spacing: 0.1em; padding-top: 6px; border-top: 1px solid #E5EAF2;">DEMO DATA</div>
          </div>
        `);
      });
  
      setTimeout(() => state.map.invalidateSize(), 200);
    }
  
    // ============ HISTORICAL TABLE ============
    function setupHistoricalTable() {
      const searchInput = document.getElementById('historicalSearch');
      const stateFilter = document.getElementById('historicalState');
      const severityFilter = document.getElementById('historicalSeverity');
      const yearFilter = document.getElementById('historicalYear');
      const causeFilter = document.getElementById('historicalCause');
  
      const applyFilters = () => {
        const filters = {
          search: searchInput?.value || '',
          state: stateFilter?.value || 'all',
          severity: severityFilter?.value || 'all',
          year: yearFilter?.value || 'all',
          cause: causeFilter?.value || 'all'
        };
        renderHistoricalTable(filters);
      };
  
      if (searchInput) searchInput.addEventListener('input', Utils.debounce(applyFilters, 200));
      [stateFilter, severityFilter, yearFilter, causeFilter].forEach(el => {
        if (el) el.addEventListener('change', applyFilters);
      });
  
      renderHistoricalTable({});
    }
  
    async function renderHistoricalTable(filters) {
      const tbody = document.getElementById('historicalTableBody');
      const empty = document.getElementById('historicalEmpty');
      if (!tbody) return;
  
      const events = await Services.getHistoricalEvents(filters);
  
      if (events.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
      }
      if (empty) empty.style.display = 'none';
  
      tbody.innerHTML = events.map(e => `
        <tr>
          <td style="font-family: 'SF Mono', Monaco, monospace; font-weight: 600;">${e.id}</td>
          <td><strong>${e.location}</strong></td>
          <td>${e.state}</td>
          <td>${e.date}</td>
          <td><span class="severity-badge ${e.severity}">${e.severity}</span></td>
          <td>${e.cause}</td>
          <td>${e.damage}</td>
          <td style="color: var(--text-500); font-size: 10px;">${e.source}</td>
        </tr>
      `).join('');
    }
  
    // ============ NOTIFICATIONS ============
    async function loadNotifications() {
      state.notifications = await Services.getNotifications();
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
      state.notifications.forEach(n => n.read = true);
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
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && notifPanel) notifPanel.classList.remove('active');
      });
    }
  
    // ============ PUBLIC API ============
    window.SahayakMonitoring = {
      retry,
      markAllNotificationsRead
    };
  
    document.addEventListener('DOMContentLoaded', () => {
      init();
      setupHistoricalTable();
    });
  })();