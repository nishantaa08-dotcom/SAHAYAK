// js/risk-analysis.js — AI Risk Analysis Page Logic
(function() {
    'use strict';
  
    const state = {
      currentLocation: 'Tawang',
      currentData: null,
      charts: { trend: null, rainfall: null, historical: null },
      notifications: []
    };
  
    // ============ INITIALIZATION ============
    async function init() {
      renderSidebar();
      await loadRiskAnalysis('Tawang');
      setupLocationSelector();
      setupAccordions();
      setupEventListeners();
      await loadNotifications();
      setupIntersectionObservers();
    }
  
    // ============ SIDEBAR (reuse) ============
    function renderSidebar() {
      const nav = document.getElementById('sidebarNav');
      if (!nav) return;
      const html = DEMO_DATA.sidebarSections.map(section => `
        <div class="sidebar-section">
          <div class="sidebar-section-label">${section.label}</div>
          ${section.items.map(item => `
            <a href="${ROUTES[item.key] || '#'}" class="sidebar-item ${item.active ? 'active' : ''}" data-route="${item.key}">
              <span class="sidebar-icon">${getSidebarIcon(item.icon)}</span>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </div>
      `).join('');
      nav.innerHTML = html;
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
        'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33"/></svg>'
      };
      return icons[name] || '';
    }
  
    // ============ LOAD ANALYSIS ============
    async function loadRiskAnalysis(location) {
      showLoadingState();
      try {
        const data = await Services.getRiskAnalysis(location);
        state.currentLocation = location;
        state.currentData = data;
  
        updateHeader();
        updateRiskOverview();
        updateRiskTrend();
        updateAIExplanation();
        updateConfidence();
        updateEnvironmentalFactors();
        updateRainfallAnalysis();
        updateTerrainAnalysis();
        updateHistoricalContext();
        updateSatelliteIndicators();
        updateTimeline();
        updateExposure();
        updateComparison();
        updateDataFreshness();
  
        hideLoadingState();
      } catch (err) {
        showErrorState();
      }
    }
  
    function showLoadingState() {
      const overlay = document.getElementById('analysisLoading');
      if (overlay) overlay.classList.add('active');
    }
  
    function hideLoadingState() {
      const overlay = document.getElementById('analysisLoading');
      if (overlay) overlay.classList.remove('active');
    }
  
    function showErrorState() {
      const overlay = document.getElementById('analysisLoading');
      if (!overlay) return;
      overlay.innerHTML = `
        <div style="padding: var(--space-6); text-align: center;">
          <div class="loading-spinner" style="margin: 0 auto var(--space-3);"></div>
          <div style="font-size: var(--fs-sm); color: var(--text-700); font-weight: 600;">Analysis data temporarily unavailable</div>
          <button class="btn btn-outline" style="margin-top: var(--space-3);" onclick="window.SahayakRiskAnalysis.retryLoad()">Retry</button>
        </div>
      `;
      overlay.classList.add('active');
    }
  
    async function retryLoad() {
      hideLoadingState();
      await loadRiskAnalysis(state.currentLocation);
    }
  
    // ============ HEADER ============
    function updateHeader() {
      const zone = DEMO_DATA.riskZones.find(z => z.location === state.currentLocation);
      const stateName = zone?.state || 'Arunachal Pradesh';
      const locEl = document.getElementById('analysisLocationDisplay');
      if (locEl) locEl.textContent = `${state.currentLocation}, ${stateName}`;
    }
  
    // ============ RISK OVERVIEW ============
    function updateRiskOverview() {
      const d = state.currentData;
      const overview = document.getElementById('riskOverview');
      if (!overview) return;
  
      const level = d.level.toLowerCase();
      overview.className = `risk-overview level-${level}`;
  
      // Gauge
      const circumference = 534;
      const dashoffset = circumference * (1 - d.risk / 100);
      const gaugeProgress = overview.querySelector('.risk-gauge .progress');
      if (gaugeProgress) {
        gaugeProgress.className = `progress level-${level}`;
        gaugeProgress.style.strokeDashoffset = circumference;
        requestAnimationFrame(() => {
          gaugeProgress.style.strokeDashoffset = dashoffset;
        });
      }
  
      // Score
      const scoreEl = overview.querySelector('.risk-gauge-value');
      if (scoreEl) animateCount(scoreEl, d.risk, 1400);
  
      // Status
      const statusEl = overview.querySelector('.risk-overview-status');
      if (statusEl) {
        statusEl.className = `risk-overview-status status-${level}`;
        statusEl.innerHTML = `<span class="status-dot"></span><span>${d.level}</span>`;
      }
  
      // Probability
      const probEl = overview.querySelector('.risk-overview-probability-value');
      if (probEl) animateCount(probEl, d.probability, 1400, true);
  
      // Message
      const messageText = overview.querySelector('.risk-overview-message-text');
      if (messageText) {
        const delta = d.risk - d.previousRisk;
        const direction = delta > 0 ? 'increased' : delta < 0 ? 'decreased' : 'remained stable';
        messageText.innerHTML = `
          <strong>High landslide risk conditions detected in the selected demonstration area.</strong><br>
          Risk ${direction} significantly compared with the previous monitoring period.
        `;
      }
  
      // Change card
      const changeValue = overview.querySelector('.risk-change-value');
      const changeRange = overview.querySelector('.risk-change-range');
      const changeText = overview.querySelector('.risk-change-text');
      const delta = d.risk - d.previousRisk;
      if (changeValue) {
        const sign = delta > 0 ? '+' : '';
        changeValue.className = `risk-change-value ${delta > 0 ? '' : delta < 0 ? 'decrease' : 'neutral'}`;
        changeValue.innerHTML = `${sign}${delta} ${delta > 0 ? '↑' : delta < 0 ? '↓' : '—'}`;
      }
      if (changeRange) changeRange.textContent = `${d.previousRisk} → ${d.risk}`;
      if (changeText) {
        changeText.textContent = delta > 0 ? 'Risk increased' : delta < 0 ? 'Risk decreased' : 'Risk stable';
      }
    }
  
    // ============ RISK TREND CHART ============
    function updateRiskTrend() {
      const d = state.currentData;
      const canvas = document.getElementById('riskTrendCanvas');
      if (!canvas || typeof Chart === 'undefined') return;
  
      if (state.charts.trend) state.charts.trend.destroy();
  
      const labels = d.trend.map(t => t.time);
      const values = d.trend.map(t => t.value);
  
      const colorMap = {
        safe: '#16A34A',
        watch: '#EAB308',
        alert: '#F97316',
        warning: '#DC2626'
      };
  
      const pointColors = d.trend.map(t => colorMap[t.status] || '#19B8C7');
  
      state.charts.trend = new Chart(canvas, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Risk Score',
              data: values,
              borderColor: '#19B8C7',
              backgroundColor: 'rgba(25, 184, 199, 0.1)',
              borderWidth: 2.5,
              tension: 0.35,
              fill: true,
              pointBackgroundColor: pointColors,
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 1000, easing: 'easeOutQuart' },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#0B1728',
              titleColor: '#fff',
              bodyColor: '#fff',
              borderColor: '#19B8C7',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              callbacks: {
                label: (ctx) => `Risk: ${ctx.parsed.y}/100`
              }
            },
            annotation: undefined
          },
          scales: {
            x: {
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
              ticks: { color: '#8A9BB5', font: { size: 11, weight: '600' } }
            },
            y: {
              min: 0,
              max: 100,
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
              ticks: { color: '#8A9BB5', font: { size: 11, weight: '600' }, stepSize: 20 }
            }
          }
        },
        plugins: [{
          id: 'thresholdLines',
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            const yScale = chart.scales.y;
            const xScale = chart.scales.x;
            const thresholds = [
              { value: 40, label: 'WATCH', color: '#EAB308' },
              { value: 60, label: 'ALERT', color: '#F97316' },
              { value: 80, label: 'WARNING', color: '#DC2626' }
            ];
            thresholds.forEach(t => {
              const y = yScale.getPixelForValue(t.value);
              ctx.save();
              ctx.strokeStyle = t.color;
              ctx.lineWidth = 1;
              ctx.setLineDash([4, 4]);
              ctx.globalAlpha = 0.5;
              ctx.beginPath();
              ctx.moveTo(xScale.left, y);
              ctx.lineTo(xScale.right, y);
              ctx.stroke();
              ctx.restore();
              ctx.save();
              ctx.fillStyle = t.color;
              ctx.font = 'bold 9px Inter, sans-serif';
              ctx.globalAlpha = 0.7;
              ctx.fillText(t.label, xScale.right - 48, y - 4);
              ctx.restore();
            });
          }
        }]
      });
    }
  
    // ============ AI EXPLANATION ============
    function updateAIExplanation() {
      const d = state.currentData;
      const container = document.getElementById('aiExplanationPanel');
      if (!container) return;
  
      const factorLabels = {
        rainfall: 'Heavy Rainfall',
        slope: 'Steep Slope',
        soil: 'High Soil Moisture',
        historical: 'Historical Landslides',
        satellite: 'Satellite Anomaly'
      };
  
      const maxFactor = Math.max(...Object.values(d.factors));
      const barsHtml = Object.entries(d.factors).map(([key, val]) => {
        const pct = (val / maxFactor) * 100;
        return `
          <div class="ai-bar" style="--target-width: ${pct}%">
            <div class="ai-bar-label">${factorLabels[key]}</div>
            <div class="ai-bar-track"><div class="ai-bar-fill"></div></div>
            <div class="ai-bar-value">+${val}</div>
          </div>
        `;
      }).join('');
  
      const driversHtml = Object.entries(d.factors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([key]) => `<span class="ai-driver-chip">${factorLabels[key]}</span>`)
        .join('');
  
      container.innerHTML = `
        <div class="ai-panel">
          <div class="ai-panel-header">
            <div>
              <div class="ai-panel-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                Why is this area high risk?
              </div>
              <div class="ai-panel-subtitle">Factor contribution analysis — SHAP-style</div>
            </div>
            <span class="analysis-card-badge">DEMO</span>
          </div>
          <div class="ai-bars">${barsHtml}</div>
          <div class="ai-explanation-text">
            Risk increased because accumulated rainfall and soil moisture are elevated, while steep terrain and historical landslide patterns increase susceptibility.
          </div>
          <div class="ai-key-drivers">
            <div class="ai-key-drivers-title">Key Drivers</div>
            <div class="ai-key-drivers-list">${driversHtml}</div>
          </div>
          <div class="ai-panel-footer">
            <span class="ai-panel-footer-note">Illustrative SHAP-style explanation — DEMO</span>
            <button class="ai-panel-footer-btn" onclick="window.SahayakRiskAnalysis.toggleFullExplanation()">
              View Full Explanation →
            </button>
          </div>
        </div>
      `;
  
      // Animate bars after render
      setTimeout(() => {
        container.querySelectorAll('.ai-bar').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('revealed'), i * 120);
        });
      }, 200);
    }
  
    function toggleFullExplanation() {
      const modal = document.getElementById('explanationModal');
      if (modal) modal.classList.add('active');
    }
  
    function closeExplanationModal() {
      const modal = document.getElementById('explanationModal');
      if (modal) modal.classList.remove('active');
    }
  
    // ============ CONFIDENCE ============
    function updateConfidence() {
      const d = state.currentData;
      const container = document.getElementById('confidenceCard');
      if (!container) return;
  
      const level = d.confidence >= 75 ? 'high' : d.confidence >= 50 ? 'moderate' : 'low';
      const label = d.confidence >= 75 ? 'High' : d.confidence >= 50 ? 'Moderate' : 'Low';
  
      container.innerHTML = `
        <div class="confidence-header">
          <div class="confidence-title">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Model Confidence
          </div>
          <div class="confidence-value">
            <span class="confidence-number">${d.confidence}</span>
            <span class="confidence-unit">%</span>
          </div>
        </div>
        <div class="confidence-bar">
          <div class="confidence-bar-fill level-${level}" id="confidenceBarFill"></div>
        </div>
        <div class="confidence-text">
          Confidence is influenced by data availability, input quality and model uncertainty. Current assessment: <strong>${label}</strong>.
        </div>
        <div class="confidence-demo">Demonstration metric — replace with validated model output.</div>
      `;
  
      setTimeout(() => {
        const fill = document.getElementById('confidenceBarFill');
        if (fill) fill.style.width = `${d.confidence}%`;
      }, 100);
    }
  
    // ============ ENVIRONMENTAL FACTORS ============
    function updateEnvironmentalFactors() {
      const d = state.currentData;
      const grid = document.getElementById('envIndicatorGrid');
      if (!grid) return;
  
      const cards = [
        { icon: 'cloud-rain', value: `${d.rainfall} mm / 72h`, label: 'Rainfall', status: d.rainfall > 200 ? 'threshold' : 'normal', statusLabel: d.rainfall > 200 ? 'Above Threshold' : 'Normal' },
        { icon: 'droplet', value: `${d.soilMoisture}%`, label: 'Soil Moisture', status: d.soilMoisture > 70 ? 'high' : 'normal', statusLabel: d.soilMoisture > 70 ? 'High' : 'Normal' },
        { icon: 'mountain', value: `${d.slope}°`, label: 'Slope', status: d.slope > 35 ? 'steep' : 'normal', statusLabel: d.slope > 35 ? 'Steep' : 'Moderate' },
        { icon: 'mountain', value: `${Utils.formatNumber(d.elevation)} m`, label: 'Elevation', status: 'terrain', statusLabel: 'Terrain Factor' },
        { icon: 'alert-triangle', value: `${d.historicalEvents}`, label: 'Historical Events', status: d.historicalEvents >= 3 ? 'elevated' : 'normal', statusLabel: d.historicalEvents >= 3 ? 'Elevated' : 'Low' },
        { icon: 'satellite', value: d.satelliteChange ? 'Detected' : 'None', label: 'Satellite Change', status: d.satelliteChange ? 'monitor' : 'normal', statusLabel: d.satelliteChange ? 'Monitor' : 'Stable' }
      ];
  
      grid.innerHTML = cards.map(c => `
        <div class="env-indicator">
          <div class="env-indicator-header">
            <div class="env-indicator-icon">${getIcon(c.icon)}</div>
            <span class="env-indicator-status ${c.status}">${c.statusLabel}</span>
          </div>
          <div class="env-indicator-value">${c.value}</div>
          <div class="env-indicator-label">${c.label}</div>
          <span class="env-indicator-demo">DEMO</span>
        </div>
      `).join('');
    }
  
    // ============ RAINFALL ANALYSIS ============
    function updateRainfallAnalysis() {
      const d = state.currentData;
      const canvas = document.getElementById('rainfallCanvas');
      if (!canvas || typeof Chart === 'undefined') return;
  
      if (state.charts.rainfall) state.charts.rainfall.destroy();
  
      const rb = d.rainfallBreakdown;
      const exceeds = rb.h72 > rb.threshold;
      const exceedPct = Math.round(((rb.h72 - rb.threshold) / rb.threshold) * 100);
  
      state.charts.rainfall = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: ['24h', '48h', '72h'],
          datasets: [
            {
              label: 'Rainfall (mm)',
              data: [rb.h24, rb.h48, rb.h72],
              backgroundColor: 'rgba(25, 184, 199, 0.7)',
              borderColor: '#19B8C7',
              borderWidth: 1,
              borderRadius: 4,
              barPercentage: 0.6
            }
          ]
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
              borderColor: '#19B8C7',
              borderWidth: 1,
              callbacks: {
                label: (ctx) => `${ctx.parsed.y} mm`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#8A9BB5', font: { size: 11, weight: '600' } }
            },
            y: {
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false },
              ticks: { color: '#8A9BB5', font: { size: 11, weight: '600' } }
            }
          }
        },
        plugins: [{
          id: 'thresholdLine',
          beforeDraw: (chart) => {
            const ctx = chart.ctx;
            const yScale = chart.scales.y;
            const xScale = chart.scales.x;
            const y = yScale.getPixelForValue(rb.threshold);
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
            ctx.fillText(`Threshold: ${rb.threshold} mm`, xScale.right - 110, y - 6);
            ctx.restore();
          }
        }]
      });
  
      // Summary
      const summaryEl = document.getElementById('rainfallSummary');
      if (summaryEl) {
        summaryEl.innerHTML = `
          <div class="rainfall-summary-item">
            <div class="rainfall-summary-value">${rb.h24} mm</div>
            <div class="rainfall-summary-label">24h</div>
          </div>
          <div class="rainfall-summary-item">
            <div class="rainfall-summary-value">${rb.h48} mm</div>
            <div class="rainfall-summary-label">48h</div>
          </div>
          <div class="rainfall-summary-item">
            <div class="rainfall-summary-value">${rb.h72} mm</div>
            <div class="rainfall-summary-label">72h</div>
          </div>
        `;
      }
  
      const alertEl = document.getElementById('rainfallAlert');
      if (alertEl) {
        if (exceeds) {
          alertEl.style.display = 'flex';
          alertEl.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            72-hour threshold exceeded by ${exceedPct}%
          `;
        } else {
          alertEl.style.display = 'none';
        }
      }
    }
  
    // ============ TERRAIN ANALYSIS ============
    function updateTerrainAnalysis() {
      const d = state.currentData;
      const container = document.getElementById('terrainPanel');
      if (!container) return;
  
      const stabilityClass = d.stability === 'Reduced' ? 'reduced' : d.stability === 'Moderate' ? 'moderate' : 'stable';
  
      container.innerHTML = `
        <div class="terrain-panel">
          <div style="margin-bottom: var(--space-3);">
            <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--teal); margin-bottom: var(--space-2); text-transform: uppercase;">Soil</div>
            <div class="terrain-row">
              <span class="terrain-row-label">Soil Moisture</span>
              <span class="terrain-row-value">${d.soilMoisture}%</span>
            </div>
            <div class="terrain-row">
              <span class="terrain-row-label">Soil Type</span>
              <span class="terrain-row-value">${d.soilType}</span>
            </div>
            <div class="terrain-row">
              <span class="terrain-row-label">Saturation</span>
              <span class="terrain-row-value">${d.saturation}</span>
            </div>
          </div>
          <div>
            <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.12em; color: var(--teal); margin-bottom: var(--space-2); text-transform: uppercase;">Terrain</div>
            <div class="terrain-row">
              <span class="terrain-row-label">Slope</span>
              <span class="terrain-row-value">${d.slope}°</span>
            </div>
            <div class="terrain-row">
              <span class="terrain-row-label">Elevation</span>
              <span class="terrain-row-value">${Utils.formatNumber(d.elevation)} m</span>
            </div>
            <div class="terrain-row">
              <span class="terrain-row-label">Aspect</span>
              <span class="terrain-row-value">${d.aspect}</span>
            </div>
            <div class="terrain-row">
              <span class="terrain-row-label">Curvature</span>
              <span class="terrain-row-value">${d.curvature}</span>
            </div>
            <div class="terrain-row">
              <span class="terrain-row-label">Terrain Stability</span>
              <span class="terrain-stability ${stabilityClass}">${d.stability}</span>
            </div>
          </div>
        </div>
      `;
    }
  
    // ============ HISTORICAL CONTEXT ============
    function updateHistoricalContext() {
      const d = state.currentData;
      const countEl = document.getElementById('historicalCount');
      if (countEl) animateCount(countEl, d.historicalEvents, 1000);
  
      const canvas = document.getElementById('historicalCanvas');
      if (!canvas || typeof Chart === 'undefined') return;
  
      if (state.charts.historical) state.charts.historical.destroy();
  
      const years = Object.keys(d.historicalByYear);
      const values = Object.values(d.historicalByYear);
  
      state.charts.historical = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: years,
          datasets: [{
            label: 'Events',
            data: values,
            backgroundColor: 'rgba(249, 115, 22, 0.7)',
            borderColor: '#F97316',
            borderWidth: 1,
            borderRadius: 4,
            barPercentage: 0.5
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
                label: (ctx) => `${ctx.parsed.y} event${ctx.parsed.y !== 1 ? 's' : ''}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: '#8A9BB5', font: { size: 11, weight: '600' } }
            },
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1, color: '#8A9BB5', font: { size: 11, weight: '600' } },
              grid: { color: 'rgba(0,0,0,0.04)', drawBorder: false }
            }
          }
        }
      });
    }
  
    // ============ SATELLITE INDICATORS ============
    function updateSatelliteIndicators() {
      const d = state.currentData;
      const container = document.getElementById('satelliteGrid');
      if (!container) return;
  
      const indicators = [
        { label: 'NDVI', value: d.satellite.ndvi, dotClass: d.satellite.ndvi.includes('Change') ? 'detected' : 'stable' },
        { label: 'NDWI', value: d.satellite.ndwi, dotClass: d.satellite.ndwi === 'Stable' ? 'stable' : 'detected' },
        { label: 'Surface Change', value: d.satellite.surface, dotClass: d.satellite.surface === 'Detected' ? 'detected' : 'stable' },
        { label: 'SAR Indicator', value: d.satellite.sar, dotClass: d.satellite.sar === 'Elevated' ? 'elevated' : 'normal' }
      ];
  
      container.innerHTML = indicators.map(i => `
        <div class="satellite-indicator">
          <div class="satellite-indicator-label">${i.label}</div>
          <div class="satellite-indicator-value">
            <span class="satellite-indicator-dot ${i.dotClass}"></span>
            ${i.value}
          </div>
        </div>
      `).join('');
    }
  
    // ============ TIMELINE ============
    function updateTimeline() {
      const d = state.currentData;
      const container = document.getElementById('timelineContainer');
      if (!container) return;
  
      const messages = {
        safe: 'Normal monitoring',
        watch: 'Elevated conditions',
        alert: 'Risk accelerating',
        warning: 'Warning threshold reached'
      };
  
      const customMessages = {
        '06:00': 'Normal monitoring',
        '09:00': 'Rainfall increasing',
        '12:00': 'Soil moisture rising',
        '15:00': 'Risk accelerating',
        '18:00': 'Warning threshold reached'
      };
  
      container.innerHTML = d.trend.map(t => `
        <div class="timeline-item" data-animate>
          <div class="timeline-dot ${t.status}"></div>
          <div class="timeline-time">${t.time}</div>
          <div class="timeline-row">
            <span class="timeline-score">${t.value}</span>
            <span class="timeline-status ${t.status}">${t.status.toUpperCase()}</span>
          </div>
          <div class="timeline-message">${customMessages[t.time] || messages[t.status]}</div>
        </div>
      `).join('') + `<div class="timeline-demo">Illustrative timeline — DEMO</div>`;
    }
  
    // ============ EXPOSURE ============
    function updateExposure() {
      const d = state.currentData;
      const grid = document.getElementById('exposureSummaryGrid');
      if (!grid) return;
  
      const items = [
        { icon: 'users', value: Utils.formatNumber(d.population), label: 'Population' },
        { icon: 'home', value: d.villages, label: 'Villages' },
        { icon: 'route', value: d.roads, label: 'Roads' },
        { icon: 'book', value: d.schools, label: 'Schools' },
        { icon: 'heart', value: d.hospitals, label: 'Hospital' },
        { icon: 'bridge', value: d.bridges, label: 'Bridges' }
      ];
  
      grid.innerHTML = items.map(i => `
        <div class="exposure-summary-item">
          <div class="exposure-summary-icon">${getIcon(i.icon)}</div>
          <div class="exposure-summary-value">${i.value}</div>
          <div class="exposure-summary-label">${i.label}</div>
        </div>
      `).join('');
  
      // Response priority
      const priorityEl = document.getElementById('responsePriority');
      if (priorityEl) {
        const level = d.responsePriority >= 80 ? 'critical' : d.responsePriority >= 60 ? 'high' : d.responsePriority >= 40 ? 'moderate' : 'low';
        const levelLabel = level.toUpperCase();
        priorityEl.innerHTML = `
          <div class="response-priority-label">Response Priority</div>
          <div class="response-priority-value">${d.responsePriority} / 100</div>
          <div class="response-priority-level ${level}">${levelLabel}</div>
          <div class="response-priority-text">
            High hazard + significant population exposure + critical road connectivity.
          </div>
          <div class="response-priority-demo">Synthetic demonstration score</div>
        `;
      }
    }
  
    // ============ COMPARISON ============
    function updateComparison() {
      const container = document.getElementById('comparisonGrid');
      if (!container) return;
  
      container.innerHTML = DEMO_DATA.comparisonLocations.map(loc => {
        const data = DEMO_DATA.riskAnalysisData[loc];
        const zone = DEMO_DATA.riskZones.find(z => z.location === loc);
        const level = data.level.toLowerCase();
        const selected = loc === state.currentLocation ? 'selected' : '';
        return `
          <div class="comparison-card ${selected}" onclick="window.SahayakRiskAnalysis.selectComparison('${loc}')">
            <div class="comparison-name">${loc}</div>
            <div class="comparison-state">${zone?.state || ''}</div>
            <div class="comparison-score-row">
              <span class="comparison-score level-${level}">${data.risk}</span>
              <span class="comparison-max">/ 100</span>
            </div>
            <span class="comparison-level ${level}">${data.level}</span>
          </div>
        `;
      }).join('') + `<div style="grid-column: 1 / -1; text-align: center; font-size: 9px; color: var(--watch); font-weight: 700; letter-spacing: 0.1em; margin-top: var(--space-2);">Synthetic demo comparison</div>`;
    }
  
    function selectComparison(location) {
      if (location === state.currentLocation) return;
      loadRiskAnalysis(location);
      // Update selector
      const input = document.getElementById('locationSelectorInput');
      if (input) input.value = location;
    }
  
    // ============ DATA FRESHNESS ============
    function updateDataFreshness() {
      const container = document.getElementById('freshnessCompact');
      if (!container) return;
      container.innerHTML = DEMO_DATA.dataFreshness.map(d => `
        <div class="freshness-compact-item">
          <span class="freshness-compact-dot ${d.status}"></span>
          <div class="freshness-compact-content">
            <div class="freshness-compact-source">${d.source}</div>
            <div class="freshness-compact-time">${d.updated}</div>
          </div>
        </div>
      `).join('');
    }
  
    // ============ LOCATION SELECTOR ============
    function setupLocationSelector() {
      const input = document.getElementById('locationSelectorInput');
      const dropdown = document.getElementById('locationSelectorDropdown');
      if (!input || !dropdown) return;
  
      input.value = state.currentLocation;
  
      input.addEventListener('focus', () => {
        renderLocationOptions('');
        dropdown.classList.add('active');
      });
  
      input.addEventListener('input', Utils.debounce((e) => {
        renderLocationOptions(e.target.value);
        dropdown.classList.add('active');
      }, 150));
  
      document.addEventListener('click', (e) => {
        const wrap = document.querySelector('.location-selector-wrap');
        if (wrap && !wrap.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    }
  
    function renderLocationOptions(query) {
      const dropdown = document.getElementById('locationSelectorDropdown');
      if (!dropdown) return;
  
      const q = query.toLowerCase().trim();
      const locations = Object.keys(DEMO_DATA.riskAnalysisData).filter(loc =>
        !q || loc.toLowerCase().includes(q)
      );
  
      dropdown.innerHTML = locations.map(loc => {
        const data = DEMO_DATA.riskAnalysisData[loc];
        const zone = DEMO_DATA.riskZones.find(z => z.location === loc);
        const level = data.level.toLowerCase();
        const color = DEMO_DATA.riskLevels[level]?.color || '#19B8C7';
        const selected = loc === state.currentLocation ? 'selected' : '';
        return `
          <div class="location-option ${selected}" onclick="window.SahayakRiskAnalysis.selectLocation('${loc}')">
            <div>
              <div class="location-option-name">${loc}</div>
              <div class="location-option-meta">${zone?.state || ''}</div>
            </div>
            <div class="location-option-risk" style="color: ${color};">
              <span class="location-option-dot" style="background: ${color};"></span>
              ${data.risk} · ${data.level}
            </div>
          </div>
        `;
      }).join('');
    }
  
    function selectLocation(location) {
      const dropdown = document.getElementById('locationSelectorDropdown');
      const input = document.getElementById('locationSelectorInput');
      if (dropdown) dropdown.classList.remove('active');
      if (input) input.value = location;
      loadRiskAnalysis(location);
    }
  
    // ============ ACCORDIONS ============
    function setupAccordions() {
      document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
          header.parentElement.classList.toggle('open');
        });
      });
    }
  
    // ============ INTERSECTION OBSERVERS ============
    function setupIntersectionObservers() {
      if (Utils.prefersReducedMotion()) {
        document.querySelectorAll('.timeline-item').forEach(el => el.classList.add('revealed'));
        return;
      }
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('revealed'), i * 100);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
  
      document.querySelectorAll('.timeline-item').forEach(el => observer.observe(el));
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
        <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}" onclick="window.SahayakRiskAnalysis.markNotificationRead('${n.id}')">
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
      const n = state.notifications.find(x => x.id === id);
      if (n) n.read = true;
      renderNotificationBadge();
      renderNotificationPanel();
    }
  
    function markAllNotificationsRead() {
      state.notifications.forEach(n => n.read = true);
      renderNotificationBadge();
      renderNotificationPanel();
    }
  
    // ============ UTILITIES ============
    function animateCount(el, target, duration, isPercent = false) {
      if (Utils.prefersReducedMotion()) {
        el.textContent = isPercent ? `${target}%` : Utils.formatNumber(target);
        return;
      }
      const start = performance.now();
      const animate = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;
        el.textContent = isPercent ? `${current.toFixed(1)}%` : Utils.formatNumber(Math.round(current));
        if (progress < 1) requestAnimationFrame(animate);
        else el.textContent = isPercent ? `${target}%` : Utils.formatNumber(target);
      };
      requestAnimationFrame(animate);
    }
  
    function getIcon(name) {
      const icons = {
        'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>',
        'droplet': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
        'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l4-8 4 4 4-10 6 14"/></svg>',
        'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>',
        'alert-triangle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
        'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
        'book': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
        'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
        'bridge': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M5 18V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9M9 6v12M15 6v12"/></svg>',
        'alert-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        'map-pin': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
        'chevron-down': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
        'info': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>'
      };
      return icons[name] || '';
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
  
      // Sidebar toggle (mobile)
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
  
      // Explanation modal
      const modal = document.getElementById('explanationModal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeExplanationModal();
        });
      }
  
      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (notifPanel) notifPanel.classList.remove('active');
          closeExplanationModal();
        }
      });
    }
  
    // ============ PUBLIC API ============
    window.SahayakRiskAnalysis = {
      selectLocation,
      selectComparison,
      toggleFullExplanation,
      closeExplanationModal,
      markNotificationRead,
      markAllNotificationsRead,
      retryLoad
    };
  
    // ============ BOOT ============
    document.addEventListener('DOMContentLoaded', init);
  })();