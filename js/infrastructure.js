// js/infrastructure.js — Infrastructure & Impact Assessment Logic

(function() {
    'use strict';

    const state = {
        currentLocation: 'Tawang',
        map: null,
        markers: {},
        activeTab: 'all',
        charts: { breakdown: null },
        data: {}
    };

    // ============ INIT ============
    async function init() {
        renderSidebar();
        renderLocationSelector();
        await loadLocation(state.currentLocation);
        setupEventListeners();
    }

    // ============ SIDEBAR ============
    function renderSidebar() {
        const nav = document.getElementById('sidebarNav');
        if (!nav) return;

        const html = DEMO_DATA.sidebarSections.map(section => `
            <div class="sidebar-section">
                <div class="sidebar-section-label">${section.label}</div>
                ${section.items.map(item => `
                    <a href="${ROUTES[item.key] || '#'}" class="sidebar-item ${item.key === 'infrastructure' ? 'active' : ''}">
                        <span class="sidebar-icon">${getIcon(item.icon)}</span>
                        <span>${item.label}</span>
                    </a>
                `).join('')}
            </div>
        `).join('');
        nav.innerHTML = html;
    }

    // ============ LOCATION SELECTOR ============
    function renderLocationSelector() {
        const select = document.getElementById('locationSelect');
        if (!select) return;

        select.innerHTML = DEMO_DATA.riskZones
            .slice()
            .sort((a, b) => a.location.localeCompare(b.location))
            .map(z => `<option value="${z.location}" ${z.location === state.currentLocation ? 'selected' : ''}>${z.location}, ${z.state}</option>`)
            .join('');
    }

    // ============ LOAD LOCATION ============
    async function loadLocation(locationName) {
        showLoading();
        try {
            const [exposure, infrastructure, roads, villages, emergency, priority, activity] = await Promise.all([
                Services.getExposureData(locationName),
                Services.getInfrastructure(locationName),
                Services.getRoadRisk(locationName),
                Services.getVillages(locationName),
                Services.getEmergencyServices(locationName),
                Services.getResponsePriority(locationName),
                Services.getExposureActivity(locationName)
            ]);

            if (exposure.error) {
                showError(exposure.error);
                return;
            }

            state.data = { exposure, infrastructure, roads, villages, emergency, priority, activity };
            state.currentLocation = locationName;
            renderAll();
        } catch (err) {
            showError('Infrastructure data temporarily unavailable');
        }
    }

    function showLoading() {
        const main = document.getElementById('infraContent');
        if (!main) return;
        main.innerHTML = `
            <div class="infra-card">
                <div class="infra-card-body" style="padding: var(--space-10); text-align: center;">
                    <div class="loading-spinner" style="margin: 0 auto var(--space-3);"></div>
                    <div style="font-size: var(--fs-sm); color: var(--text-500);">Loading exposure intelligence...</div>
                </div>
            </div>
        `;
    }

    function showError(message) {
        const main = document.getElementById('infraContent');
        if (!main) return;
        main.innerHTML = `
            <div class="infra-card">
                <div class="infra-card-body" style="padding: var(--space-10); text-align: center;">
                    <div style="width: 56px; height: 56px; margin: 0 auto var(--space-3); background: var(--surface); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--text-400);">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <div style="font-size: var(--fs-base); font-weight: 600; color: var(--text-700); margin-bottom: var(--space-2);">${message}</div>
                    <button class="btn btn-outline" onclick="window.SahayakInfra.retry()">Retry</button>
                </div>
            </div>
        `;
    }

    // ============ RENDER ALL ============
    function renderAll() {
        const main = document.getElementById('infraContent');
        if (!main) return;

        const d = state.data;
        const zone = DEMO_DATA.riskZones.find(z => z.location === state.currentLocation);
        const level = zone.level.toLowerCase();

        // Update breadcrumb
        const breadcrumbLoc = document.getElementById('breadcrumbLocation');
        if (breadcrumbLoc) breadcrumbLoc.textContent = zone.location;

        main.innerHTML = `
            ${renderRiskContext(zone, level)}
            ${renderExposureMetrics(d.exposure)}
            <div class="infra-grid">
                <div>
                    ${renderMap(zone, d.infrastructure, d.villages)}
                    ${renderCriticalInfra(d.infrastructure.infrastructure)}
                    ${renderRoadExposure(d.roads)}
                    ${renderPopulationExposure(d.exposure)}
                    ${renderVillageExposure(d.villages)}
                </div>
                <div>
                    ${renderPriorityPanel(d.priority)}
                    ${renderEmergencyServices(d.emergency)}
                    ${renderDataFreshness()}
                </div>
            </div>
            ${renderHazardExposure(zone, d.exposure, d.priority)}
            ${renderAIPriorityExplanation(d.priority, zone)}
            <div class="infra-grid-full">
                ${renderRecommendations(zone)}
                ${renderActivity(d.activity)}
            </div>
        `;

        setTimeout(() => {
            initMap(zone, d.infrastructure.infrastructure, d.villages.villages);
            initPriorityAnimation(d.priority);
            initBreakdownChart(d.exposure);
            animatePriorityFactors();
            animateMetrics();
        }, 50);
    }

    // ============ RISK CONTEXT ============
    function renderRiskContext(zone, level) {
        const trend = zone.interpretation?.trend || 'Increasing';
        return `
            <section class="risk-context">
                <div class="risk-context-main">
                    <div class="risk-context-location">${zone.location}</div>
                    <div class="risk-context-state">${zone.state}</div>
                    <div class="risk-context-score">
                        <span class="risk-context-value">${zone.risk}</span>
                        <span class="risk-context-max">/ 100</span>
                    </div>
                    <div class="risk-context-level ${level}">${zone.level}</div>
                </div>
                <div class="risk-context-details">
                    <div class="risk-context-item">
                        <div class="risk-context-item-label">TREND</div>
                        <div class="risk-context-item-value">${trend}</div>
                    </div>
                    <div class="risk-context-item">
                        <div class="risk-context-item-label">PROBABILITY</div>
                        <div class="risk-context-item-value">${(zone.probability || zone.risk - 2).toFixed(1)}%</div>
                    </div>
                    <div class="risk-context-item">
                        <div class="risk-context-item-label">POPULATION</div>
                        <div class="risk-context-item-value">${Utils.formatNumber(zone.population)}</div>
                    </div>
                    <div class="risk-context-item">
                        <div class="risk-context-item-label">LAST UPDATED</div>
                        <div class="risk-context-item-value">5 min ago</div>
                    </div>
                </div>
                <div class="risk-context-actions">
                    <a href="risk-analysis.html?location=${encodeURIComponent(zone.location)}" class="btn btn-primary">View Risk Analysis →</a>
                    <a href="risk-map.html?location=${encodeURIComponent(zone.location)}" class="btn btn-outline">View on Risk Map</a>
                </div>
            </section>
        `;
    }

    // ============ EXPOSURE METRICS ============
    function renderExposureMetrics(exposure) {
        const exp = exposure.exposure;
        const metrics = [
            { icon: 'users', value: Utils.formatNumber(exp.population), label: 'Population' },
            { icon: 'home', value: exp.villages, label: 'Villages' },
            { icon: 'route', value: exp.roads, label: 'Roads' },
            { icon: 'book', value: exp.schools, label: 'Schools' },
            { icon: 'heart', value: exp.hospitals, label: 'Hospitals' },
            { icon: 'bridge', value: exp.bridges, label: 'Bridges' }
        ];

        return `
            <div class="exposure-metrics">
                ${metrics.map(m => `
                    <div class="exposure-metric">
                        <div class="exposure-metric-icon">${getIcon(m.icon)}</div>
                        <div class="exposure-metric-value" data-target="${exp[m.label.toLowerCase()] || m.value}">${m.value}</div>
                        <div class="exposure-metric-label">${m.label}</div>
                    </div>
                `).join('')}
            </div>
            <div class="exposure-metrics-note">Potential exposure — DEMO</div>
        `;
    }

    function animateMetrics() {
        if (Utils.prefersReducedMotion()) return;
        document.querySelectorAll('.exposure-metric-value').forEach(el => {
            const finalText = el.textContent;
            const finalNum = parseInt(finalText.replace(/,/g, ''), 10);
            if (isNaN(finalNum)) return;
            const duration = 1000;
            const start = performance.now();
            const animate = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Utils.formatNumber(Math.round(eased * finalNum));
                if (progress < 1) requestAnimationFrame(animate);
                else el.textContent = finalText;
            };
            requestAnimationFrame(animate);
        });
    }

    // ============ MAP ============
    function renderMap(zone, infrastructure, villages) {
        return `
            <div class="infra-map-wrap">
                <div class="infra-map-header">
                    <div class="infra-map-title">
                        <span class="infra-map-title-dot"></span>
                        Exposure Map — ${zone.location}
                    </div>
                    <span class="infra-card-badge">DEMO</span>
                </div>
                <div class="infra-map-container">
                    <div id="infraMap"></div>
                    <div class="infra-map-legend">
                        <div class="infra-legend-title">Map Layers</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon risk"></span> Risk Zone</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon hospital">🏥</span> Hospital</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon school">🏫</span> School</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon bridge">🌉</span> Bridge</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon police">👮</span> Police</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon relief">🏕</span> Relief</div>
                        <div class="infra-legend-item"><span class="infra-legend-icon village">🏘</span> Village</div>
                    </div>
                    <div class="marker-info-popup" id="markerPopup"></div>
                </div>
            </div>
        `;
    }

    function initMap(zone, infrastructure, villages) {
        if (typeof L === 'undefined') return;

        const darkTiles = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OSM &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        });

        state.map = L.map('infraMap', {
            center: [zone.lat, zone.lng],
            zoom: 12,
            zoomControl: true,
            layers: [darkTiles]
        });

        // Risk zone polygon
        const level = zone.level.toLowerCase();
        const color = DEMO_DATA.riskLevels[level]?.color || '#F97316';
        const radius = 2000 + (zone.risk / 100) * 3000;

        L.circle([zone.lat, zone.lng], {
            radius: radius,
            color: color,
            weight: 1.5,
            fillColor: color,
            fillOpacity: 0.15
        }).addTo(state.map);

        // Infrastructure markers
        infrastructure.forEach(infra => {
            const icon = getInfraMarkerIcon(infra.type);
            const marker = L.marker([infra.lat, infra.lng], { icon }).addTo(state.map);
            marker.on('click', () => showMarkerPopup(infra));
        });

        // Village markers
        villages.forEach(village => {
            const icon = getInfraMarkerIcon('village');
            const marker = L.marker([village.lat, village.lng], { icon }).addTo(state.map);
            marker.on('click', () => showMarkerPopup(village, 'village'));
        });
    }

    function getInfraMarkerIcon(type) {
        const emoji = {
            hospital: '🏥', school: '🏫', bridge: '🌉',
            police: '👮', relief: '🏕', village: '🏘'
        };
        return L.divIcon({
            className: '',
            html: `<div class="infra-marker type-${type}">${emoji[type] || '📍'}</div>`,
            iconSize: [28, 28],
            iconAnchor: [14, 14]
        });
    }

    function showMarkerPopup(item, type = 'infra') {
        const popup = document.getElementById('markerPopup');
        if (!popup) return;

        if (type === 'village') {
            popup.innerHTML = `
                <button class="marker-info-close" onclick="document.getElementById('markerPopup').classList.remove('active')">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="marker-info-type">Village</div>
                <div class="marker-info-name">${item.name}</div>
                <div class="marker-info-row"><span class="marker-info-label">Population</span><span class="marker-info-value">${Utils.formatNumber(item.population)}</span></div>
                <div class="marker-info-row"><span class="marker-info-label">Distance</span><span class="marker-info-value">${item.distance} km</span></div>
                <div class="marker-info-status ${item.exposure.toLowerCase()}">${item.exposure} Exposure</div>
                <div style="font-size: 10px; color: var(--text-400); font-style: italic; margin-top: var(--space-2); text-align: center;">DEMO DATA</div>
            `;
        } else {
            const statusClass = item.status === 'POTENTIALLY_EXPOSED' ? 'exposed' :
                               item.status === 'MONITOR' ? 'monitor' :
                               item.status === 'OPERATIONAL' ? 'operational' : 'standby';
            const statusLabel = item.status.replace('_', ' ');

            popup.innerHTML = `
                <button class="marker-info-close" onclick="document.getElementById('markerPopup').classList.remove('active')">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div class="marker-info-type">${item.type}</div>
                <div class="marker-info-name">${item.name}</div>
                <div class="marker-info-row"><span class="marker-info-label">Location</span><span class="marker-info-value">${state.currentLocation}</span></div>
                <div class="marker-info-row"><span class="marker-info-label">Distance from Risk Zone</span><span class="marker-info-value">${item.distance} km</span></div>
                ${item.capacity ? `<div class="marker-info-row"><span class="marker-info-label">Capacity</span><span class="marker-info-value">${item.capacity}</span></div>` : ''}
                <div class="marker-info-status ${statusClass}">${statusLabel}</div>
                <div style="font-size: 10px; color: var(--text-400); font-style: italic; margin-top: var(--space-2); text-align: center;">DEMO DATA</div>
            `;
        }

        popup.classList.add('active');
    }

    // ============ CRITICAL INFRASTRUCTURE ============
    function renderCriticalInfra(infrastructure) {
        const items = infrastructure.map(i => {
            const emoji = { hospital: '🏥', school: '🏫', bridge: '🌉', police: '👮', relief: '🏕' };
            const statusClass = i.status === 'POTENTIALLY_EXPOSED' ? 'exposed' :
                               i.status === 'MONITOR' ? 'monitor' :
                               i.status === 'OPERATIONAL' ? 'operational' : 'standby';
            const statusLabel = i.status.replace('_', ' ');

            return `
                <div class="critical-infra-item type-${i.type}">
                    <div class="critical-infra-icon">${emoji[i.type] || '📍'}</div>
                    <div class="critical-infra-info">
                        <div class="critical-infra-name">${i.name}</div>
                        <div class="critical-infra-meta">
                            <span>${i.type}</span>
                            ${i.capacity ? `<span>· Capacity: ${i.capacity}</span>` : ''}
                        </div>
                    </div>
                    <div class="critical-infra-distance">${i.distance} km</div>
                    <span class="critical-infra-status ${statusClass}">${statusLabel}</span>
                </div>
            `;
        }).join('');

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>
                        Critical Infrastructure
                    </div>
                    <span class="infra-card-badge">DEMO</span>
                </div>
                <div class="infra-card-body">
                    <div class="critical-infra-list">${items}</div>
                </div>
            </section>
        `;
    }

    // ============ ROAD EXPOSURE ============
    function renderRoadExposure(roadsData) {
        const roads = roadsData.roads;
        const summary = roadsData.summary;

        const rows = roads.map(r => `
            <tr>
                <td>${r.name}</td>
                <td><span class="road-risk-badge ${r.risk.toLowerCase()}">${r.risk}</span></td>
                <td>${r.distance} km</td>
                <td>${r.status}</td>
            </tr>
        `).join('');

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>
                        Road Network Exposure
                    </div>
                    <span class="infra-card-badge">DEMO</span>
                </div>
                <div class="infra-card-body">
                    <div class="road-summary">
                        <div class="road-summary-item">
                            <div class="road-summary-value">${summary.total}</div>
                            <div class="road-summary-label">Total Segments</div>
                        </div>
                        <div class="road-summary-item critical">
                            <div class="road-summary-value">${summary.critical}</div>
                            <div class="road-summary-label">Critical</div>
                        </div>
                        <div class="road-summary-item high">
                            <div class="road-summary-value">${summary.high}</div>
                            <div class="road-summary-label">High Risk</div>
                        </div>
                        <div class="road-summary-item moderate">
                            <div class="road-summary-value">${summary.moderate}</div>
                            <div class="road-summary-label">Watch</div>
                        </div>
                    </div>
                    <table class="road-table">
                        <thead>
                            <tr>
                                <th>Road</th>
                                <th>Risk</th>
                                <th>Distance</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                    <div style="text-align: center; margin-top: var(--space-3); font-size: 10px; color: var(--text-400); font-style: italic;">
                        Synthetic road-risk demonstration data
                    </div>
                </div>
            </section>
        `;
    }

    // ============ POPULATION EXPOSURE ============
    function renderPopulationExposure(exposure) {
        const pop = exposure.exposure.population;
        const breakdown = exposure.populationBreakdown;
        const total = breakdown.high + breakdown.moderate + breakdown.low;
        const highPct = (breakdown.high / total * 100).toFixed(1);
        const modPct = (breakdown.moderate / total * 100).toFixed(1);
        const lowPct = (breakdown.low / total * 100).toFixed(1);

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                        Population Exposure
                    </div>
                </div>
                <div class="infra-card-body">
                    <div class="population-total">
                        <span class="population-total-value">${Utils.formatNumber(pop)}</span>
                        <span class="population-total-label">people potentially exposed</span>
                    </div>
                    <div class="population-stacked">
                        <div class="population-segment high" style="flex-basis: ${highPct}%;">${highPct}%</div>
                        <div class="population-segment moderate" style="flex-basis: ${modPct}%;">${modPct}%</div>
                        <div class="population-segment low" style="flex-basis: ${lowPct}%;">${lowPct}%</div>
                    </div>
                    <div class="population-legend">
                        <div class="population-legend-item">
                            <span class="population-legend-dot high"></span>
                            <span class="population-legend-label">High exposure</span>
                            <span class="population-legend-value">${Utils.formatNumber(breakdown.high)}</span>
                        </div>
                        <div class="population-legend-item">
                            <span class="population-legend-dot moderate"></span>
                            <span class="population-legend-label">Moderate</span>
                            <span class="population-legend-value">${Utils.formatNumber(breakdown.moderate)}</span>
                        </div>
                        <div class="population-legend-item">
                            <span class="population-legend-dot low"></span>
                            <span class="population-legend-label">Low</span>
                            <span class="population-legend-value">${Utils.formatNumber(breakdown.low)}</span>
                        </div>
                    </div>
                    <div style="text-align: center; margin-top: var(--space-3); font-size: 10px; color: var(--text-400); font-style: italic;">
                        Illustrative exposure model — DEMO
                    </div>
                </div>
            </section>
        `;
    }

    // ============ VILLAGE EXPOSURE ============
    function renderVillageExposure(villagesData) {
        const villages = villagesData.villages;
        const items = villages.map(v => `
            <div class="village-item">
                <div class="village-icon">🏘</div>
                <div class="village-info">
                    <div class="village-name">${v.name}</div>
                    <div class="village-meta">Population: ${Utils.formatNumber(v.population)}</div>
                </div>
                <div class="village-distance">${v.distance} km</div>
                <span class="village-exposure ${v.exposure.toLowerCase()}">${v.exposure}</span>
            </div>
        `).join('');

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                        Nearby Villages
                    </div>
                </div>
                <div class="infra-card-body">
                    <div class="village-list">${items}</div>
                    <div style="text-align: center; margin-top: var(--space-3); font-size: 10px; color: var(--text-400); font-style: italic;">
                        Synthetic village data — demonstration only
                    </div>
                </div>
            </section>
        `;
    }

    // ============ PRIORITY PANEL ============
    function renderPriorityPanel(priorityData) {
        const p = priorityData.priority;
        const factors = priorityData.factors;
        const level = p.level.toLowerCase();

        const circumference = 2 * Math.PI * 65;
        const offset = circumference - (circumference * p.score / 100);
        const color = p.score >= 80 ? '#DC2626' : p.score >= 60 ? '#F97316' : p.score >= 40 ? '#EAB308' : '#16A34A';

        const factorsHtml = factors.map(f => {
            const pct = (f.value / 40) * 100;
            return `
                <div class="priority-factor" style="--target-width: ${pct}%">
                    <div class="priority-factor-label">${f.label}</div>
                    <div class="priority-factor-track"><div class="priority-factor-fill"></div></div>
                    <div class="priority-factor-value">+${f.value}</div>
                </div>
            `;
        }).join('');

        return `
            <aside class="priority-panel">
                <div class="priority-header level-${level}">
                    <div class="priority-title">Response Priority</div>
                    <div class="priority-score-wrap">
                        <svg class="priority-score-svg" viewBox="0 0 160 160">
                            <circle class="priority-bg-circle" cx="80" cy="80" r="65"/>
                            <circle class="priority-fill-circle" id="priorityCircle"
                                    cx="80" cy="80" r="65"
                                    stroke="${color}"
                                    stroke-dasharray="${circumference}"
                                    stroke-dashoffset="${circumference}"
                                    data-target-offset="${offset}"/>
                        </svg>
                        <div class="priority-score-text">
                            <div class="priority-score-value" id="priorityScore">0</div>
                            <div class="priority-score-max">/ 100</div>
                        </div>
                    </div>
                    <span class="priority-level-badge ${level}">${p.level}</span>
                </div>
                <div class="priority-factors">
                    <div class="priority-factors-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                        Why this priority?
                    </div>
                    <div class="priority-factor-bars" id="priorityFactors">${factorsHtml}</div>
                </div>
                <div class="priority-note">Demonstration priority calculation</div>
            </aside>
        `;
    }

    function initPriorityAnimation(priorityData) {
        const circle = document.getElementById('priorityCircle');
        const scoreEl = document.getElementById('priorityScore');
        if (!circle || !scoreEl) return;

        const targetOffset = parseFloat(circle.dataset.targetOffset);
        const circumference = 2 * Math.PI * 65;
        const targetScore = priorityData.priority.score;

        if (Utils.prefersReducedMotion()) {
            circle.setAttribute('stroke-dashoffset', targetOffset);
            scoreEl.textContent = targetScore;
            return;
        }

        const duration = 1500;
        const start = performance.now();
        const animate = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentOffset = circumference - (circumference - targetOffset) * eased;
            circle.setAttribute('stroke-dashoffset', currentOffset);
            scoreEl.textContent = Math.round(targetScore * eased);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    function animatePriorityFactors() {
        const factors = document.querySelectorAll('#priorityFactors .priority-factor');
        if (!factors.length) return;

        if (Utils.prefersReducedMotion()) {
            factors.forEach(f => f.classList.add('revealed'));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const allFactors = entry.target.querySelectorAll('.priority-factor');
                    allFactors.forEach((f, i) => setTimeout(() => f.classList.add('revealed'), i * 150));
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });

        const container = document.getElementById('priorityFactors');
        if (container) observer.observe(container);
    }

    // ============ EMERGENCY SERVICES ============
    function renderEmergencyServices(emergencyData) {
        const s = emergencyData.services;
        const nearest = emergencyData.nearest;

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        Emergency Response Coverage
                    </div>
                </div>
                <div class="infra-card-body">
                    <div class="emergency-grid">
                        <div class="emergency-item">
                            <div class="emergency-icon">👮</div>
                            <div class="emergency-value">${s.police}</div>
                            <div class="emergency-label">Police Stations</div>
                        </div>
                        <div class="emergency-item">
                            <div class="emergency-icon">🏕</div>
                            <div class="emergency-value">${s.relief}</div>
                            <div class="emergency-label">Relief Centers</div>
                        </div>
                        <div class="emergency-item">
                            <div class="emergency-icon">🏥</div>
                            <div class="emergency-value">${s.hospitals}</div>
                            <div class="emergency-label">Hospitals</div>
                        </div>
                        <div class="emergency-item">
                            <div class="emergency-icon">🚒</div>
                            <div class="emergency-value">${s.fire}</div>
                            <div class="emergency-label">Fire/Emergency</div>
                        </div>
                    </div>
                    <div class="nearest-response">
                        <div class="nearest-response-title">Nearest Response Center</div>
                        <div class="nearest-response-name">${nearest.name}</div>
                        <div class="nearest-response-stats">
                            <span>Distance: <strong>${nearest.distance} km</strong></span>
                            <span>Response time: <strong>${nearest.responseTime} min</strong></span>
                        </div>
                        <div style="margin-top: var(--space-2); font-size: 10px; color: var(--text-400); font-style: italic;">
                            Illustrative demonstration estimate
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    // ============ DATA FRESHNESS ============
    function renderDataFreshness() {
        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Data Freshness
                    </div>
                </div>
                <div class="infra-card-body">
                    <div class="freshness-compact">
                        <div class="freshness-item-compact">
                            <span class="freshness-dot-compact fresh"></span>
                            <div class="freshness-info">
                                <div class="freshness-source-compact">Exposure Data</div>
                                <div class="freshness-time-compact">18 min ago</div>
                            </div>
                        </div>
                        <div class="freshness-item-compact">
                            <span class="freshness-dot-compact fresh"></span>
                            <div class="freshness-info">
                                <div class="freshness-source-compact">Infrastructure</div>
                                <div class="freshness-time-compact">22 min ago</div>
                            </div>
                        </div>
                        <div class="freshness-item-compact">
                            <span class="freshness-dot-compact delayed"></span>
                            <div class="freshness-info">
                                <div class="freshness-source-compact">Population</div>
                                <div class="freshness-time-compact">Yesterday</div>
                            </div>
                        </div>
                    </div>
                    <div style="margin-top: var(--space-3); text-align: center; font-size: 10px; color: var(--text-400); font-style: italic;">
                        DEMO DATA
                    </div>
                </div>
            </section>
        `;
    }

    // ============ HAZARD VS EXPOSURE ============
    function renderHazardExposure(zone, exposure, priority) {
        const hazard = zone.risk;
        const exposureScore = Math.min(100, Math.round(
            (exposure.exposure.population / 100) * 0.4 +
            (exposure.exposure.roads * 5) +
            (exposure.exposure.schools * 4) +
            (exposure.exposure.hospitals * 8)
        ));
        const combined = priority.priority.score;

        return `
            <section class="hazard-exposure-compare">
                <div class="he-header">
                    <div class="he-title">Hazard vs Exposure</div>
                    <div class="he-subtitle">Combining risk severity with population and infrastructure exposure</div>
                </div>
                <div class="he-scores">
                    <div class="he-score-item">
                        <div class="he-score-label">Hazard</div>
                        <div class="he-score-value hazard">${hazard}</div>
                        <div class="he-score-max">/ 100</div>
                    </div>
                    <div class="he-operator">+</div>
                    <div class="he-score-item">
                        <div class="he-score-label">Exposure</div>
                        <div class="he-score-value exposure">${exposureScore}</div>
                        <div class="he-score-max">/ 100</div>
                    </div>
                    <div class="he-operator">=</div>
                    <div class="he-score-item">
                        <div class="he-score-label">Combined Priority</div>
                        <div class="he-score-value combined">${combined}</div>
                        <div class="he-score-max">/ 100</div>
                    </div>
                </div>
                <div class="he-explanation">
                    High hazard combined with population exposure and nearby critical infrastructure increases the demonstration response priority.
                </div>
            </section>
        `;
    }

    // ============ AI PRIORITY EXPLANATION ============
    function renderAIPriorityExplanation(priority, zone) {
        const drivers = priority.factors.map(f => f.label);

        return `
            <section class="ai-priority-explanation">
                <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: var(--space-3);">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--teal)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <h3 style="font-size: var(--fs-lg); font-weight: 700; margin: 0;">Why is this zone a priority?</h3>
                </div>
                <div class="ai-quote">
                    The selected zone has elevated demonstration hazard risk together with nearby population, road connectivity and critical facilities. These factors increase the modeled response priority.
                </div>
                <div class="ai-drivers-title">Primary drivers</div>
                <div class="ai-drivers-list">
                    ${drivers.map(d => `<span class="ai-driver-chip">${d}</span>`).join('')}
                </div>
                <div class="ai-note">Illustrative AI decision-support explanation</div>
            </section>
        `;
    }

    // ============ RECOMMENDATIONS ============
    function renderRecommendations(zone) {
        const recommendations = [
            { icon: 'eye', title: 'Increase Monitoring', desc: 'Monitor environmental conditions more frequently in the affected zone.' },
            { icon: 'route', title: 'Review Road Access', desc: 'Inspect exposed road segments and identify alternative routes.' },
            { icon: 'check', title: 'Verify Critical Facilities', desc: 'Confirm accessibility of nearby hospitals and schools.' },
            { icon: 'clipboard', title: 'Prepare Field Inspection', desc: 'Assign a field officer to verify ground conditions.' },
            { icon: 'home', title: 'Review Relief Coverage', desc: 'Check accessibility and capacity of nearby relief centers.' }
        ];

        const items = recommendations.map(r => `
            <div class="recommendation-item">
                <div class="recommendation-icon">${getIcon(r.icon)}</div>
                <div class="recommendation-content">
                    <div class="recommendation-title">${r.title}</div>
                    <div class="recommendation-desc">${r.desc}</div>
                </div>
            </div>
        `).join('');

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                        Suggested Actions
                    </div>
                </div>
                <div class="infra-card-body">
                    <div style="font-size: var(--fs-xs); color: var(--text-500); margin-bottom: var(--space-3); font-style: italic;">
                        Illustrative decision-support suggestions — not official orders
                    </div>
                    <div class="recommendations-list">${items}</div>
                    <div class="recommendations-actions">
                        <button class="btn btn-outline" onclick="window.SahayakInfra.openTaskModal()">Create Field Task</button>
                        <a href="alert-create.html?location=${encodeURIComponent(zone.location)}" class="btn btn-primary">Generate Warning</a>
                        <a href="route-risk.html" class="btn btn-outline">View Route Risk</a>
                    </div>
                </div>
            </section>
        `;
    }

    // ============ ACTIVITY ============
    function renderActivity(activityData) {
        const items = activityData.activity.map(a => `
            <div class="activity-item-infra type-${a.type}">
                <div class="activity-icon-infra">${a.icon}</div>
                <div class="activity-content-infra">
                    <div class="activity-title-infra">${a.title}</div>
                    <div class="activity-meta-infra">${a.location} · ${a.time}</div>
                </div>
            </div>
        `).join('');

        return `
            <section class="infra-card">
                <div class="infra-card-header">
                    <div class="infra-card-title">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                        Recent Activity
                    </div>
                </div>
                <div class="infra-card-body">
                    <div class="activity-list-infra">${items}</div>
                </div>
            </section>
        `;
    }

    // ============ BREAKDOWN CHART ============
    function initBreakdownChart(exposure) {
        const canvas = document.getElementById('breakdownChart');
        if (!canvas || typeof Chart === 'undefined') return;

        const exp = exposure.exposure;
        if (state.charts.breakdown) state.charts.breakdown.destroy();

        const ctx = canvas.getContext('2d');
        state.charts.breakdown = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Population (÷10)', 'Roads', 'Schools', 'Hospitals', 'Bridges', 'Villages'],
                datasets: [{
                    data: [
                        Math.round(exp.population / 10),
                        exp.roads,
                        exp.schools,
                        exp.hospitals,
                        exp.bridges,
                        exp.villages
                    ],
                    backgroundColor: ['#19B8C7', '#0F9D8A', '#16A34A', '#EAB308', '#F97316', '#8A9BB5'],
                    borderRadius: 6,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y',
                animation: { duration: 1200 },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#0B1728',
                        titleColor: '#fff',
                        bodyColor: '#E5EAF2',
                        padding: 10,
                        cornerRadius: 6
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(217, 224, 232, 0.5)' },
                        ticks: { color: '#8A9BB5', font: { size: 10 } }
                    },
                    y: {
                        grid: { display: false },
                        ticks: { color: '#374151', font: { size: 11, weight: '600' } }
                    }
                }
            }
        });
    }

    // ============ TASK MODAL ============
    function openTaskModal() {
        const modal = document.getElementById('taskModal');
        if (!modal) return;

        const officersHtml = (DEMO_DATA.officers || []).map(o =>
            `<option value="${o.id}">${o.name} — ${o.district}</option>`
        ).join('');

        document.getElementById('taskModalBody').innerHTML = `
            <div style="margin-bottom: var(--space-4);">
                <label style="display:block; font-size: var(--fs-sm); font-weight: 500; color: var(--text-700); margin-bottom: var(--space-2);">Location</label>
                <input type="text" value="${state.currentLocation}" disabled style="width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-md); font-family: inherit; font-size: var(--fs-sm); background: var(--surface);">
            </div>
            <div style="margin-bottom: var(--space-4);">
                <label style="display:block; font-size: var(--fs-sm); font-weight: 500; color: var(--text-700); margin-bottom: var(--space-2);">Officer</label>
                <select id="taskOfficer" style="width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-md); font-family: inherit; font-size: var(--fs-sm);">
                    ${officersHtml}
                </select>
            </div>
            <div style="margin-bottom: var(--space-4);">
                <label style="display:block; font-size: var(--fs-sm); font-weight: 500; color: var(--text-700); margin-bottom: var(--space-2);">Task Type</label>
                <select id="taskType" style="width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-md); font-family: inherit; font-size: var(--fs-sm);">
                    <option value="Infrastructure Inspection">Infrastructure Inspection</option>
                    <option value="Road Inspection">Road Inspection</option>
                    <option value="Community Assessment">Community Assessment</option>
                    <option value="Hospital/School Verification">Hospital/School Verification</option>
                </select>
            </div>
            <div style="margin-bottom: var(--space-4);">
                <label style="display:block; font-size: var(--fs-sm); font-weight: 500; color: var(--text-700); margin-bottom: var(--space-2);">Priority</label>
                <select id="taskPriority" style="width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-md); font-family: inherit; font-size: var(--fs-sm);">
                    <option value="Critical">Critical</option>
                    <option value="High" selected>High</option>
                    <option value="Medium">Medium</option>
                </select>
            </div>
            <div id="taskSuccess"></div>
        `;

        modal.classList.add('active');
    }

    async function submitTask() {
        const officerId = document.getElementById('taskOfficer').value;
        const taskType = document.getElementById('taskType').value;
        const priority = document.getElementById('taskPriority').value;

        const result = await Services.assignFieldTask({
            officerId,
            taskType,
            priority,
            location: state.currentLocation
        });

        if (result.success) {
            document.getElementById('taskSuccess').innerHTML = `
                <div style="padding: var(--space-3); background: var(--safe-bg); border: 1px solid rgba(22, 163, 74, 0.2); border-radius: var(--radius-md); text-align: center; color: var(--safe); font-weight: 600; font-size: var(--fs-sm);">
                    ✓ Field task assigned successfully
                </div>
            `;
            setTimeout(() => {
                document.getElementById('taskModal').classList.remove('active');
            }, 1500);
        }
    }

    function retry() { loadLocation(state.currentLocation); }

    // ============ EVENT LISTENERS ============
    function setupEventListeners() {
        const select = document.getElementById('locationSelect');
        if (select) {
            select.addEventListener('change', (e) => loadLocation(e.target.value));
        }

        // Modal close
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) modal.classList.remove('active');
            });
        }

        // Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal) modal.classList.remove('active');
        });

        // Mobile sidebar
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
            'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg>',
            'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
            'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/></svg>',
            'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
            'sliders': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="20" y1="21" x2="20" y2="16"/></svg>',
            'bar-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
            'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
            'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
            'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/></svg>',
            'eye': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
            'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
            'book': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
            'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
            'bridge': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18M5 18V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9M9 6v12M15 6v12"/></svg>'
        };
        return icons[name] || '';
    }

    // ============ EXPOSE PUBLIC API ============
    window.SahayakInfra = {
        retry,
        openTaskModal,
        submitTask
    };

    // ============ BOOT ============
    document.addEventListener('DOMContentLoaded', init);
})();