// js/dashboard.js — Command Center Dashboard Logic

(function() {
    'use strict';

    // ============ STATE ============
    const state = {
        map: null,
        riskLayer: null,
        markers: {},
        selectedZone: null,
        isOffline: false,
        notifications: [],
        layers: {
            risk: true,
            historical: false,
            rainfall: false,
            soil: false,
            slope: false,
            elevation: false,
            satellite: false,
            villages: false,
            population: false,
            roads: false,
            bridges: false,
            schools: false,
            hospitals: false,
            police: false,
            relief: false,
            citizenReports: false,
            fieldReports: false,
            verified: false
        }
    };

    // ============ INITIALIZATION ============
    async function init() {
        renderSidebar();
        renderMetrics();
        initMap();
        renderRiskZones();
        renderLocationPanelPlaceholder();
        renderEnvironmentalCards();
        renderAIExplanation();
        renderRiskTrend();
        renderAlerts();
        renderExposure();
        renderFieldOperations();
        renderDataFreshness();
        renderQuickActions();
        setupEventListeners();
        await loadNotifications();
    }

    // ============ SIDEBAR ============
    function renderSidebar() {
        const nav = document.getElementById('sidebarNav');
        if (!nav) return;

        const html = DEMO_DATA.sidebarSections.map(section => `
            <div class="sidebar-section">
                <div class="sidebar-section-label">${section.label}</div>
                ${section.items.map(item => `
                    <a href="${ROUTES[item.key] || '#'}" class="sidebar-item ${item.active ? 'active' : ''}" data-route="${item.key}">
                        <span class="sidebar-icon">${getIcon(item.icon)}</span>
                        <span>${item.label}</span>
                    </a>
                `).join('')}
            </div>
        `).join('');

        nav.innerHTML = html;
    }

    // ============ METRICS ============
    function renderMetrics() {
        const grid = document.getElementById('metricsGrid');
        if (!grid) return;

        const metrics = DEMO_DATA.metrics;
        const cards = [
            { key: 'criticalZones', label: 'Critical Zones', icon: 'alert-triangle', riskClass: 'risk-warning', statusClass: 'warning', status: 'WARNING' },
            { key: 'highRiskZones', label: 'High Risk Zones', icon: 'alert-circle', riskClass: 'risk-alert', statusClass: 'alert', status: 'ALERT' },
            { key: 'activeAlerts', label: 'Active Alerts', icon: 'bell', riskClass: '', statusClass: '' },
            { key: 'fieldReports', label: 'Field Reports', icon: 'clipboard', riskClass: '', statusClass: '' },
            { key: 'verifiedIncidents', label: 'Verified Incidents', icon: 'check-circle', riskClass: '', statusClass: '' },
            { key: 'populationAtRisk', label: 'Population at Risk', icon: 'users', riskClass: '', statusClass: '' }
        ];

        grid.innerHTML = cards.map(card => {
            const m = metrics[card.key];
            const value = card.key === 'populationAtRisk' ? Utils.formatNumber(m.value) : m.value;
            return `
                <div class="metric-card ${card.riskClass}" data-metric="${card.key}">
                    <div class="metric-header">
                        <div class="metric-icon ${card.statusClass}">${getIcon(card.icon)}</div>
                        ${card.status ? `<span class="metric-status ${card.statusClass}">${card.status}</span>` : ''}
                    </div>
                    <div class="metric-value">${value}</div>
                    <div class="metric-label">${card.label}</div>
                    <div class="metric-footer">
                        <span class="metric-trend ${m.trendDir}">${m.trendDir === 'up' ? '↑' : '↓'} ${m.trend} since last</span>
                        <span>${m.updated}</span>
                    </div>
                </div>
            `;
        }).join('');

        // Animate count-up
        animateMetricValues();
    }

    function animateMetricValues() {
        if (Utils.prefersReducedMotion()) return;
        document.querySelectorAll('.metric-value').forEach(el => {
            const finalText = el.textContent;
            const finalNum = parseInt(finalText.replace(/,/g, ''), 10);
            if (isNaN(finalNum)) return;
            const duration = 1200;
            const start = performance.now();
            const animate = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.round(eased * finalNum);
                el.textContent = Utils.formatNumber(current);
                if (progress < 1) requestAnimationFrame(animate);
                else el.textContent = finalText;
            };
            requestAnimationFrame(animate);
        });
    }

    // ============ MAP ============
    function initMap() {
        if (typeof L === 'undefined') {
            console.warn('Leaflet not loaded');
            return;
        }

        // Dark basemap
        const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        });

        state.map = L.map('map', {
            center: [25.5, 92.5],
            zoom: 6,
            zoomControl: false,
            layers: [darkTiles]
        });

        // Custom zoom control
        L.control.zoom({ position: 'topright' }).addTo(state.map);

        // Disable default attribution styling interference
        state.map.attributionControl.setPrefix('');
    }

    function renderRiskZones() {
        if (!state.map) return;

        // Clear existing
        if (state.riskLayer) {
            state.map.removeLayer(state.riskLayer);
        }
        state.riskLayer = L.layerGroup().addTo(state.map);

        DEMO_DATA.riskZones.forEach(zone => {
            const level = zone.level.toLowerCase();
            const color = DEMO_DATA.riskLevels[level]?.color || '#19B8C7';

            // Risk zone polygon (circle approximation)
            const radius = 15000 + (zone.risk / 100) * 25000;
            const polygon = L.circle([zone.lat, zone.lng], {
                radius: radius,
                color: color,
                weight: 1.5,
                fillColor: color,
                fillOpacity: 0.15,
                className: 'risk-zone-polygon'
            }).addTo(state.riskLayer);

            polygon.on('click', () => openLocationPanel(zone));

            // Marker
            const pulseHtml = (level === 'warning' || level === 'alert')
                ? `<div class="risk-marker-pulse"></div>`
                : '';

            const markerIcon = L.divIcon({
                className: '',
                html: `
                    <div class="risk-marker ${level}" data-zone-id="${zone.id}">
                        ${pulseHtml}
                        <span style="position:relative;z-index:2;">${zone.risk}</span>
                    </div>
                `,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker([zone.lat, zone.lng], { icon: markerIcon })
                .addTo(state.riskLayer)
                .on('click', () => openLocationPanel(zone));

            state.markers[zone.id] = marker;
        });
    }

    // ============ LOCATION PANEL ============
    function openLocationPanel(zone) {
        state.selectedZone = zone;
        const container = document.getElementById('locationPanelContainer');
        if (!container) return;

        const level = zone.level.toLowerCase();
        const factorsHtml = zone.factors.map(f => {
            const pct = (f.value / 40) * 100;
            return `
                <div class="ai-bar" style="--target-width: ${pct}%">
                    <div class="ai-bar-label">${f.label}</div>
                    <div class="ai-bar-track"><div class="ai-bar-fill"></div></div>
                    <div class="ai-bar-value">+${f.value}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="location-panel">
                <div class="location-panel-header level-${level}">
                    <button class="location-panel-close" onclick="window.SahayakDashboard.closeLocationPanel()" aria-label="Close">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    <div class="location-label">HIGH LANDSLIDE RISK</div>
                    <div class="location-name">${zone.location}</div>
                    <div class="location-state">${zone.state}</div>
                    <div class="location-risk-row">
                        <div class="location-risk-score level-${level}">${zone.risk}</div>
                        <div class="location-risk-max">/ 100</div>
                    </div>
                    <div class="location-risk-status status-${level}">
                        <span class="status-indicator"></span>
                        <span>${zone.level}</span>
                    </div>
                </div>
                <div class="location-params">
                    <div class="location-param">
                        <span class="location-param-label">Rainfall</span>
                        <span class="location-param-value">${zone.rainfall} mm / 72h</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Soil Moisture</span>
                        <span class="location-param-value">${zone.soilMoisture}%</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Slope</span>
                        <span class="location-param-value">${zone.slope}°</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Elevation</span>
                        <span class="location-param-value">${Utils.formatNumber(zone.elevation)} m</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Historical Landslides</span>
                        <span class="location-param-value">${zone.historical}</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Satellite Change</span>
                        <span class="location-param-value">${zone.satelliteChange ? 'Detected' : 'None'}</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Nearby Population</span>
                        <span class="location-param-value">${Utils.formatNumber(zone.population)}</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Nearby Roads</span>
                        <span class="location-param-value">${zone.roads}</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Nearby Schools</span>
                        <span class="location-param-value">${zone.schools}</span>
                    </div>
                    <div class="location-param">
                        <span class="location-param-label">Nearby Hospital</span>
                        <span class="location-param-value">${zone.hospitals}</span>
                    </div>
                </div>
                <div style="padding: var(--space-3) var(--space-4); background: var(--navy-900); color: var(--white);">
                    <div style="font-size: 10px; font-weight: 700; letter-spacing: 0.1em; color: var(--cyan); margin-bottom: var(--space-2);">WHY IS THIS AREA HIGH RISK?</div>
                    <div class="ai-bars">${factorsHtml}</div>
                </div>
                <div class="location-actions">
                    <a href="${ROUTES.riskAnalysis}" class="btn btn-primary">View Analysis →</a>
                    <a href="${ROUTES.alerts}" class="btn btn-outline">Generate Warning</a>
                    <button class="btn btn-outline" onclick="window.SahayakDashboard.openAssignModal()">Assign Officer</button>
                    <a href="${ROUTES.infrastructure}" class="btn btn-outline">Infrastructure</a>
                </div>
                <div style="padding: var(--space-2) var(--space-4); text-align: center; font-size: 10px; color: var(--text-400); font-style: italic; background: var(--surface);">
                    DEMO DATA — Illustrative values
                </div>
            </div>
        `;

        // Animate bars
        setTimeout(() => {
            container.querySelectorAll('.ai-bar').forEach((bar, i) => {
                setTimeout(() => bar.classList.add('revealed'), i * 100);
            });
        }, 100);

        // Fly to zone on map
        if (state.map) {
            state.map.flyTo([zone.lat, zone.lng], 9, { duration: 1 });
        }

        // Scroll to panel on mobile
        if (window.innerWidth <= 768) {
            container.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }

    function closeLocationPanel() {
        const container = document.getElementById('locationPanelContainer');
        if (container) container.innerHTML = '';
        state.selectedZone = null;
    }

    function renderLocationPanelPlaceholder() {
        const container = document.getElementById('locationPanelContainer');
        if (!container) return;
        container.innerHTML = `
            <div class="intel-card">
                <div class="intel-card-header">
                    <div class="intel-card-title">Location Intelligence</div>
                </div>
                <div class="intel-card-body">
                    <div class="state-message">
                        <div class="state-message-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                        </div>
                        <div class="state-message-title">Click a risk zone on the map</div>
                        <div class="state-message-sub">Select any marker to view detailed intelligence, AI explanation, and response actions.</div>
                    </div>
                </div>
            </div>
        `;
    }

    // ============ ENVIRONMENTAL CARDS ============
    function renderEnvironmentalCards() {
        const grid = document.getElementById('envGrid');
        if (!grid) return;

        const zone = state.selectedZone || DEMO_DATA.riskZones[0];
        const cards = [
            { icon: 'cloud-rain', value: `${zone.rainfall} mm`, label: '72h accumulation', status: 'high', statusLabel: 'Above threshold' },
            { icon: 'droplet', value: `${zone.soilMoisture}%`, label: 'Current estimate', status: 'high', statusLabel: 'High' },
            { icon: 'mountain', value: `${zone.slope}°`, label: 'Terrain', status: 'steep', statusLabel: 'Steep' },
            { icon: 'satellite', value: zone.satelliteChange ? 'Change detected' : 'Stable', label: 'Latest observation', status: 'monitor', statusLabel: zone.satelliteChange ? 'Monitor' : 'Normal' }
        ];

        grid.innerHTML = cards.map(c => `
            <div class="env-card">
                <div class="env-card-header">
                    <div class="env-card-icon">${getIcon(c.icon)}</div>
                    <span class="env-card-status ${c.status}">${c.statusLabel}</span>
                </div>
                <div class="env-card-value">${c.value}</div>
                <div class="env-card-label">${c.label}</div>
            </div>
        `).join('');
    }

    // ============ AI EXPLANATION ============
    function renderAIExplanation() {
        const container = document.getElementById('aiExplanation');
        if (!container) return;

        const zone = state.selectedZone || DEMO_DATA.riskZones[0];
        const barsHtml = zone.factors.map(f => {
            const pct = (f.value / 40) * 100;
            return `
                <div class="ai-bar" style="--target-width: ${pct}%">
                    <div class="ai-bar-label">${f.label}</div>
                    <div class="ai-bar-track"><div class="ai-bar-fill"></div></div>
                    <div class="ai-bar-value">+${f.value}</div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="ai-explanation">
                <div class="ai-explanation-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why is this area high risk?
                </div>
                <div class="ai-bars">${barsHtml}</div>
                <div class="ai-explanation-text">
                    Risk increased because accumulated rainfall and soil moisture are elevated, while steep terrain and historical landslide patterns increase susceptibility.
                </div>
                <div class="ai-explanation-footer">
                    <span>Illustrative SHAP-style explanation — DEMO</span>
                    <a href="${ROUTES.riskAnalysis}">View Full Analysis →</a>
                </div>
            </div>
        `;

        // Animate bars
        setTimeout(() => {
            container.querySelectorAll('.ai-bar').forEach((bar, i) => {
                setTimeout(() => bar.classList.add('revealed'), i * 120);
            });
        }, 200);
    }

    // ============ RISK TREND ============
    function renderRiskTrend() {
        const container = document.getElementById('riskTrendChart');
        if (!container) return;

        const zone = state.selectedZone || DEMO_DATA.riskZones[0];
        const data = zone.trend;
        const labels = ['06:00', '09:00', '12:00', '15:00', '18:00'];
        const delta = data[data.length - 1] - data[0];

        // SVG chart
        const width = 320;
        const height = 100;
        const padding = { top: 10, right: 10, bottom: 20, left: 30 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const maxVal = Math.max(...data) * 1.1;
        const minVal = 0;

        const points = data.map((v, i) => {
            const x = padding.left + (i / (data.length - 1)) * chartW;
            const y = padding.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;
            return [x, y];
        });

        const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
        const areaD = pathD + ` L ${points[points.length - 1][0]} ${padding.top + chartH} L ${points[0][0]} ${padding.top + chartH} Z`;

        // Grid lines
        const gridLines = [0, 25, 50, 75, 100].map(v => {
            const y = padding.top + chartH - (v / maxVal) * chartH;
            return `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#E5EAF2" stroke-width="0.5" stroke-dasharray="2,2"/>
                    <text x="${padding.left - 4}" y="${y + 3}" text-anchor="end" font-size="9" fill="#8A9BB5">${v}</text>`;
        }).join('');

        // X labels
        const xLabels = labels.map((l, i) => {
            const x = padding.left + (i / (labels.length - 1)) * chartW;
            return `<text x="${x}" y="${height - 4}" text-anchor="middle" font-size="9" fill="#8A9BB5">${l}</text>`;
        }).join('');

        // Dots
        const dots = points.map((p, i) =>
            `<circle cx="${p[0]}" cy="${p[1]}" r="3" fill="#19B8C7" stroke="#fff" stroke-width="1.5"/>`
        ).join('');

        container.innerHTML = `
            <div class="risk-trend-card">
                <div class="risk-trend-header">
                    <div>
                        <div class="risk-trend-title">Risk Trend</div>
                        <div class="risk-trend-subtitle">${zone.location} · Last 12 hours</div>
                    </div>
                    <div class="risk-trend-delta">↑ +${delta} points</div>
                </div>
                <svg class="risk-trend-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stop-color="#19B8C7" stop-opacity="0.3"/>
                            <stop offset="100%" stop-color="#19B8C7" stop-opacity="0"/>
                        </linearGradient>
                    </defs>
                    ${gridLines}
                    <path d="${areaD}" fill="url(#trendGrad)"/>
                    <path d="${pathD}" fill="none" stroke="#19B8C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    ${dots}
                    ${xLabels}
                </svg>
                <div class="risk-trend-footer">Illustrative Demo Data</div>
            </div>
        `;
    }

    // ============ ALERTS ============
    function renderAlerts() {
        const list = document.getElementById('alertsList');
        if (!list) return;

        list.innerHTML = DEMO_DATA.alerts.map(a => `
            <div class="alert-card severity-${a.severity}" onclick="window.SahayakDashboard.viewAlert('${a.id}')">
                <span class="alert-severity ${a.severity}">${a.severity.toUpperCase()}</span>
                <div class="alert-type">${a.type}</div>
                <div class="alert-location">${a.location}, ${a.state}</div>
                <div class="alert-message">${a.message}</div>
                <div class="alert-meta">
                    <div class="alert-meta-item"><strong>Risk ${a.risk}/100</strong></div>
                    <div class="alert-meta-item"><strong>${Utils.formatNumber(a.population)}</strong> people</div>
                    <div class="alert-meta-item">${a.roads} roads</div>
                    <div class="alert-meta-item">${a.timestamp}</div>
                </div>
            </div>
        `).join('');
    }

    function viewAlert(alertId) {
        const alert = DEMO_DATA.alerts.find(a => a.id === alertId);
        if (!alert) return;
        const zone = DEMO_DATA.riskZones.find(z => z.location === alert.location);
        if (zone) openLocationPanel(zone);
    }

    // ============ EXPOSURE ============
    function renderExposure() {
        const grid = document.getElementById('exposureGrid');
        if (!grid) return;

        const exp = DEMO_DATA.exposureSummary;
        const items = [
            { icon: 'users', value: Utils.formatNumber(exp.population), label: 'Population' },
            { icon: 'home', value: exp.villages, label: 'Villages' },
            { icon: 'route', value: exp.roads, label: 'Roads' },
            { icon: 'book', value: exp.schools, label: 'Schools' },
            { icon: 'heart', value: exp.hospitals, label: 'Hospitals' },
            { icon: 'bridge', value: exp.bridges, label: 'Bridges' }
        ];

        grid.innerHTML = items.map(i => `
            <div class="exposure-item">
                <div class="exposure-icon">${getIcon(i.icon)}</div>
                <div class="exposure-value">${i.value}</div>
                <div class="exposure-label">${i.label}</div>
            </div>
        `).join('');
    }

    // ============ FIELD OPERATIONS ============
    function renderFieldOperations() {
        const statsGrid = document.getElementById('fieldStatsGrid');
        const activityList = document.getElementById('activityList');

        if (statsGrid) {
            const stats = DEMO_DATA.fieldStats;
            statsGrid.innerHTML = `
                <div class="field-stat"><div class="field-stat-value">${stats.reports}</div><div class="field-stat-label">Field Reports</div></div>
                <div class="field-stat"><div class="field-stat-value">${stats.verified}</div><div class="field-stat-label">Verified</div></div>
                <div class="field-stat"><div class="field-stat-value">${stats.pending}</div><div class="field-stat-label">Pending Verification</div></div>
                <div class="field-stat"><div class="field-stat-value">${stats.assigned}</div><div class="field-stat-label">Inspections Assigned</div></div>
            `;
        }

        if (activityList) {
            activityList.innerHTML = DEMO_DATA.fieldReports.slice(0, 4).map(r => `
                <div class="activity-item">
                    <div class="activity-dot"></div>
                    <div class="activity-content">
                        <div class="activity-title">${r.type}</div>
                        <div class="activity-meta">${r.location} · ${r.timestamp}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    // ============ DATA FRESHNESS ============
    function renderDataFreshness() {
        const list = document.getElementById('freshnessList');
        if (!list) return;

        list.innerHTML = DEMO_DATA.dataFreshness.map(d => `
            <div class="freshness-item">
                <div class="freshness-source">
                    <span class="freshness-dot ${d.status}"></span>
                    <span>${d.source}</span>
                </div>
                <div class="freshness-status">
                    <span class="freshness-label ${d.status}">${d.status === 'fresh' ? 'Fresh' : d.status === 'delayed' ? 'Delayed' : 'Unavailable'}</span>
                    <span class="freshness-time">${d.updated}</span>
                </div>
            </div>
        `).join('');
    }

    // ============ QUICK ACTIONS ============
    function renderQuickActions() {
        const container = document.getElementById('quickActions');
        if (!container) return;

        const actions = [
            { icon: 'bell', label: 'Generate Warning', route: 'alerts' },
            { icon: 'clipboard', label: 'Create Field Report', route: 'fieldReports' },
            { icon: 'map', label: 'Open Risk Map', route: 'riskMap' },
            { icon: 'sliders', label: 'What-If Simulation', route: 'simulator' },
            { icon: 'check', label: 'Verification Center', route: 'verification' }
        ];

        container.innerHTML = actions.map(a => `
            <button class="quick-action-btn" onclick="window.SahayakDashboard.navigate('${a.route}')">
                <div class="quick-action-icon">${getIcon(a.icon)}</div>
                <div class="quick-action-label">${a.label}</div>
            </button>
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
            <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}" onclick="window.SahayakDashboard.markNotificationRead('${n.id}')">
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

    // ============ LAYERS ============
    function toggleLayer(layerKey, checked) {
        state.layers[layerKey] = checked;
        // For demo, only risk layer is fully implemented
        if (layerKey === 'risk') {
            if (checked) {
                if (state.riskLayer) state.map.addLayer(state.riskLayer);
            } else {
                if (state.riskLayer) state.map.removeLayer(state.riskLayer);
            }
        }
    }

    // ============ SEARCH ============
    async function handleSearch(query) {
        const results = document.getElementById('searchResults');
        if (!query || query.length < 2) {
            results.classList.remove('active');
            return;
        }
        const matches = await Services.searchLocations(query);
        if (matches.length === 0) {
            results.innerHTML = '<div class="state-message" style="padding: var(--space-4);"><div class="state-message-sub">No locations found</div></div>';
        } else {
            results.innerHTML = matches.map(m => {
                const level = m.level.toLowerCase();
                const color = DEMO_DATA.riskLevels[level]?.color || '#19B8C7';
                return `
                    <div class="search-result-item" onclick="window.SahayakDashboard.selectSearchResult('${m.id}')">
                        <div>
                            <div class="search-result-name">${m.name}</div>
                            <div class="search-result-meta">${m.state}</div>
                        </div>
                        <div class="search-result-risk" style="background: ${color}20; color: ${color};">${m.risk} · ${m.level}</div>
                    </div>
                `;
            }).join('');
        }
        results.classList.add('active');
    }

    function selectSearchResult(zoneId) {
        const zone = DEMO_DATA.riskZones.find(z => z.id === zoneId);
        if (zone) {
            openLocationPanel(zone);
            document.getElementById('searchResults').classList.remove('active');
            document.getElementById('searchInput').value = '';
        }
    }

    // ============ OFFLINE MODE ============
    function toggleOffline() {
        state.isOffline = !state.isOffline;
        const banner = document.getElementById('offlineBanner');
        const statusEl = document.getElementById('systemStatus');
        const sidebarStatus = document.querySelector('.sidebar-status');

        if (state.isOffline) {
            banner.classList.add('active');
            if (statusEl) {
                statusEl.innerHTML = '<span class="status-dot" style="background: var(--alert); box-shadow: 0 0 6px var(--alert);"></span><span>Offline — Demo Mode</span>';
                statusEl.style.background = 'var(--alert-bg)';
                statusEl.style.borderColor = 'rgba(249, 115, 22, 0.2)';
                statusEl.style.color = 'var(--alert)';
            }
            if (sidebarStatus) sidebarStatus.classList.add('offline');
        } else {
            banner.classList.remove('active');
            if (statusEl) {
                statusEl.innerHTML = '<span class="status-dot"></span><span>All systems operational</span>';
                statusEl.style.background = '';
                statusEl.style.borderColor = '';
                statusEl.style.color = '';
            }
            if (sidebarStatus) sidebarStatus.classList.remove('offline');
        }
    }

    function syncNow() {
        const banner = document.getElementById('offlineBanner');
        banner.innerHTML = `
            <div class="offline-banner-header">
                <div class="offline-banner-dot" style="background: var(--safe); box-shadow: 0 0 6px var(--safe);"></div>
                <div class="offline-banner-title">✓ Reports synchronized</div>
            </div>
            <div class="offline-banner-message">All pending data has been synced successfully.</div>
        `;
        setTimeout(() => {
            toggleOffline();
            // Restore original banner content
            banner.innerHTML = `
                <div class="offline-banner-header">
                    <div class="offline-banner-dot"></div>
                    <div class="offline-banner-title">Offline — Demo Mode</div>
                </div>
                <div class="offline-banner-message">3 reports waiting for synchronization</div>
                <div class="offline-banner-actions">
                    <button class="btn btn-primary" onclick="window.SahayakDashboard.syncNow()">Sync Now</button>
                    <button class="btn btn-outline" onclick="window.SahayakDashboard.toggleOffline()">Close</button>
                </div>
            `;
        }, 1500);
    }

    // ============ NAVIGATION ============
    function navigate(routeKey) {
        const url = ROUTES[routeKey];
        if (url) window.location.href = url;
    }

    // ============ MODAL ============
    function openAssignModal() {
        document.getElementById('assignModal').classList.add('active');
    }

    function closeAssignModal() {
        document.getElementById('assignModal').classList.remove('active');
    }

    // ============ EVENT LISTENERS ============
    function setupEventListeners() {
        // Search
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', Utils.debounce((e) => handleSearch(e.target.value), 200));
            searchInput.addEventListener('focus', () => {
                if (searchInput.value.length >= 2) handleSearch(searchInput.value);
            });
        }

        // Close search results on outside click
        document.addEventListener('click', (e) => {
            const results = document.getElementById('searchResults');
            const searchWrap = document.querySelector('.header-search');
            if (results && searchWrap && !searchWrap.contains(e.target)) {
                results.classList.remove('active');
            }
        });

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

        // Layer toggle
        const layerBtn = document.getElementById('layerToggleBtn');
        const layerPanel = document.getElementById('layerPanel');
        if (layerBtn && layerPanel) {
            layerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                layerPanel.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (!layerPanel.contains(e.target) && !layerBtn.contains(e.target)) {
                    layerPanel.classList.remove('active');
                }
            });
        }

        document.querySelectorAll('.layer-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => toggleLayer(e.target.dataset.layer, e.target.checked));
        });

        // Map controls
        const resetBtn = document.getElementById('mapResetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (state.map) state.map.flyTo([25.5, 92.5], 6, { duration: 1 });
                closeLocationPanel();
            });
        }

        const locateBtn = document.getElementById('mapLocateBtn');
        if (locateBtn) {
            locateBtn.addEventListener('click', () => {
                if (state.map) state.map.locate({ setView: true, maxZoom: 10 });
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

        // Modal close on overlay click
        const modal = document.getElementById('assignModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeAssignModal();
            });
        }

        // Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (notifPanel) notifPanel.classList.remove('active');
                if (layerPanel) layerPanel.classList.remove('active');
                closeAssignModal();
            }
        });
    }

    // ============ ICON HELPER ============
    function getIcon(name) {
        const icons = {
            'grid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
            'map': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
            'chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
            'bell': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
            'clipboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
            'check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
            'cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
            'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l4-8 4 4 4-10 6 14"/></svg>',
            'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/><line x1="3.95" y1="6.06" x2="8.54" y2="14"/><line x1="10.88" y1="21.94" x2="15.46" y2="14"/></svg>',
            'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
            'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>',
            'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
            'sliders': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>',
            'bar-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
            'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
            'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
            'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
            'alert-triangle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            'alert-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
            'check-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
            'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
            'crosshair': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',
            'maximize': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
            'refresh': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>',
            'menu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
            'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
            'book': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
            'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
            'bridge': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M5 18V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9M9 6v12M15 6v12"/></svg>',
            'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>',
            'droplet': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>'
        };
        return icons[name] || '';
    }

    // ============ EXPOSE PUBLIC API ============
    window.SahayakDashboard = {
        openLocationPanel,
        closeLocationPanel,
        viewAlert,
        selectSearchResult,
        navigate,
        toggleOffline,
        syncNow,
        openAssignModal,
        closeAssignModal,
        markNotificationRead,
        markAllNotificationsRead
    };

    // ============ BOOT ============
    document.addEventListener('DOMContentLoaded', init);
})();