// js/risk-map.js — Risk Map / GIS Intelligence Page Logic
(function() {
    'use strict';
  
    // ============ STATE ============
    const state = {
      map: null,
      basemaps: {},
      currentBasemap: 'dark',
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
      },
      layerGroups: {},
      selectedZone: null,
      filters: {
        state: 'all',
        riskLevel: 'all'
      },
      notifications: [],
      isLoading: false
    };
  
    // ============ ICONS ============
    const ICONS = {
      'alert-triangle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      'search': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
      'locate': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>',
      'maximize': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>',
      'reset': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>',
      'layers': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      'x': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
      'info': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      'alert-circle': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
      'droplet': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>',
      'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20l4-8 4 4 4-10 6 14"/></svg>',
      'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
      'heart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
      'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
      'book': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>',
      'shield': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      'home': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
      'flag': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
      'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>',
      'cloud-rain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16" y1="13" x2="16" y2="21"/><line x1="8" y1="13" x2="8" y2="21"/><line x1="12" y1="15" x2="12" y2="23"/><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"/></svg>',
      'activity': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
    };
  
    function getIcon(name) { return ICONS[name] || ''; }
  
    // ============ INITIALIZATION ============
    async function init() {
      renderSidebar();
      initializeMap();
      await loadAllLayers();
      setupLayerControls();
      setupSearch();
      setupFilters();
      setupToolbar();
      setupMapInfoPanel();
      setupDataFreshness();
      setupEventListeners();
      await loadNotifications();
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
      // Reuse dashboard icons — same set
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
  
    // ============ MAP INITIALIZATION ============
    function initializeMap() {
      if (typeof L === 'undefined') {
        console.warn('Leaflet not loaded');
        return;
      }
  
      // Basemaps
      state.basemaps = {
        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OSM &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }),
        standard: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
          maxZoom: 19
        }),
        terrain: L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenTopoMap',
          maxZoom: 17
        })
      };
  
      state.map = L.map('riskMap', {
        center: [25.5, 92.5],
        zoom: 6,
        zoomControl: false,
        layers: [state.basemaps.dark]
      });
  
      L.control.zoom({ position: 'bottomright' }).addTo(state.map);
      state.map.attributionControl.setPrefix('');
    }
  
    // ============ LOAD ALL LAYERS ============
    async function loadAllLayers() {
      showLoadingState();
      try {
        await Promise.all([
          loadRiskZones(),
          loadHistoricalEvents(),
          loadInfrastructure(),
          loadReports(),
          loadRainfall(),
          loadSatellite()
        ]);
        hideLoadingState();
      } catch (err) {
        showErrorState();
      }
    }
  
    // ============ RISK ZONES ============
    async function loadRiskZones() {
      const zones = await Services.getAllRiskZones();
      state.layerGroups.risk = L.layerGroup().addTo(state.map);
  
      zones.forEach(zone => {
        if (!shouldShowZone(zone)) return;
        renderRiskZone(zone);
      });
    }
  
    function shouldShowZone(zone) {
      if (state.filters.state !== 'all' && zone.state !== state.filters.state) return false;
      if (state.filters.riskLevel !== 'all' && zone.level.toLowerCase() !== state.filters.riskLevel) return false;
      return true;
    }
  
    function renderRiskZone(zone) {
      const level = zone.level.toLowerCase();
      const color = DEMO_DATA.riskLevels[level]?.color || '#19B8C7';
      const radius = 15000 + (zone.risk / 100) * 25000;
  
      // Polygon
      const polygon = L.circle([zone.lat, zone.lng], {
        radius: radius,
        color: color,
        weight: 1.5,
        fillColor: color,
        fillOpacity: 0.18,
        className: 'risk-zone-polygon'
      }).addTo(state.layerGroups.risk);
  
      // Tooltip
      polygon.bindTooltip(`
        <div class="risk-tooltip-title">${zone.location}</div>
        <div class="risk-tooltip-row"><span>Risk:</span><span>${zone.risk}/100</span></div>
        <div class="risk-tooltip-row"><span>Status:</span><span>${zone.level}</span></div>
        <div class="risk-tooltip-demo">DEMO DATA</div>
      `, { sticky: true, direction: 'top', offset: [0, -10] });
  
      polygon.on('click', () => openLocationPanel(zone));
      polygon.on('mouseover', () => polygon.setStyle({ fillOpacity: 0.3, weight: 2.5 }));
      polygon.on('mouseout', () => polygon.setStyle({ fillOpacity: 0.18, weight: 1.5 }));
  
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
        iconSize: [34, 34],
        iconAnchor: [17, 17]
      });
  
      const marker = L.marker([zone.lat, zone.lng], { icon: markerIcon })
        .addTo(state.layerGroups.risk)
        .on('click', () => openLocationPanel(zone));
    }
  
    function refreshRiskZones() {
      if (state.layerGroups.risk) {
        state.map.removeLayer(state.layerGroups.risk);
      }
      state.layerGroups.risk = L.layerGroup();
      if (state.layers.risk) {
        state.layerGroups.risk.addTo(state.map);
      }
      DEMO_DATA.riskZones.forEach(zone => {
        if (shouldShowZone(zone)) renderRiskZone(zone);
      });
      updateMapInfoPanel();
    }
  
    // ============ HISTORICAL EVENTS ============
    async function loadHistoricalEvents() {
      const events = await Services.getHistoricalLandslides();
      state.layerGroups.historical = L.layerGroup();
  
      events.forEach(ev => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="historical-marker">${getIcon('alert-triangle')}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });
  
        const marker = L.marker([ev.lat, ev.lng], { icon }).addTo(state.layerGroups.historical);
        marker.bindPopup(`
          <div class="popup-content">
            <div class="popup-label">HISTORICAL LANDSLIDE</div>
            <div class="popup-title">${ev.location}</div>
            <div class="popup-location">${ev.state}</div>
            <div class="popup-row"><span class="popup-row-label">Date</span><span class="popup-row-value">${ev.date}</span></div>
            <div class="popup-row"><span class="popup-row-label">Severity</span><span class="popup-row-value">${ev.severity}</span></div>
            <div class="popup-row"><span class="popup-row-label">Cause</span><span class="popup-row-value">${ev.cause}</span></div>
            <div class="popup-row"><span class="popup-row-label">Damage</span><span class="popup-row-value">${ev.damage}</span></div>
            <div class="popup-demo">DEMO DATA</div>
          </div>
        `);
      });
  
      if (state.layers.historical) state.layerGroups.historical.addTo(state.map);
    }
  
    // ============ INFRASTRUCTURE ============
    async function loadInfrastructure() {
      const infra = await Services.getInfrastructure();
      const types = ['hospitals', 'schools', 'bridges', 'police', 'relief'];
      const layerKeys = ['hospitals', 'schools', 'bridges', 'police', 'relief'];
  
      types.forEach((type, idx) => {
        const layerKey = layerKeys[idx];
        state.layerGroups[layerKey] = L.layerGroup();
  
        (infra[type] || []).forEach(item => {
          const icon = L.divIcon({
            className: '',
            html: `<div class="infra-marker ${type.replace(/s$/, '')}">${getInfraIcon(type)}</div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });
  
          const marker = L.marker([item.lat, item.lng], { icon }).addTo(state.layerGroups[layerKey]);
          const typeLabel = type.replace(/s$/, '').replace(/^./, c => c.toUpperCase());
          marker.bindPopup(`
            <div class="popup-content">
              <div class="popup-label">${typeLabel.toUpperCase()}</div>
              <div class="popup-title">${item.name}</div>
              <div class="popup-row"><span class="popup-row-label">Distance from risk zone</span><span class="popup-row-value">${item.distance}</span></div>
              <div class="popup-row"><span class="popup-row-label">Status</span><span class="popup-row-value">${item.status}</span></div>
              <div class="popup-demo">DEMO DATA</div>
            </div>
          `);
        });
  
        if (state.layers[layerKey]) state.layerGroups[layerKey].addTo(state.map);
      });
    }
  
    function getInfraIcon(type) {
      const map = {
        hospitals: 'heart', schools: 'book', bridges: 'route',
        police: 'shield', relief: 'home'
      };
      return getIcon(map[type] || 'info');
    }
  
    // ============ REPORTS ============
    async function loadReports() {
      const reports = await Services.getCitizenReports();
      state.layerGroups.citizenReports = L.layerGroup();
  
      reports.forEach(r => {
        const sevClass = r.severity.toLowerCase() === 'critical' ? 'severity-critical'
                       : r.severity.toLowerCase() === 'high' ? 'severity-high' : '';
        const icon = L.divIcon({
          className: '',
          html: `<div class="report-marker ${sevClass}">${getIcon('flag')}</div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28]
        });
  
        const marker = L.marker([r.lat, r.lng], { icon }).addTo(state.layerGroups.citizenReports);
        marker.bindPopup(`
          <div class="popup-content">
            <div class="popup-label">CITIZEN REPORT</div>
            <div class="popup-title">${r.type}</div>
            <div class="popup-location">${r.location}</div>
            <div class="popup-row"><span class="popup-row-label">Severity</span><span class="popup-row-value">${r.severity}</span></div>
            <div class="popup-row"><span class="popup-row-label">Submitted</span><span class="popup-row-value">${r.submitted}</span></div>
            <div class="popup-row"><span class="popup-row-label">Status</span><span class="popup-row-value">${r.status}</span></div>
            <div class="popup-demo">DEMO DATA</div>
          </div>
        `);
      });
  
      if (state.layers.citizenReports) state.layerGroups.citizenReports.addTo(state.map);
    }
  
    // ============ RAINFALL ============
    async function loadRainfall() {
      const data = await Services.getRainfallData();
      state.layerGroups.rainfall = L.layerGroup();
  
      data.forEach(d => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="rainfall-marker">${d.intensity}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });
  
        const marker = L.marker([d.lat, d.lng], { icon }).addTo(state.layerGroups.rainfall);
        marker.bindPopup(`
          <div class="popup-content">
            <div class="popup-label">RAINFALL DATA</div>
            <div class="popup-title">${d.location}</div>
            <div class="popup-row"><span class="popup-row-label">72h Accumulation</span><span class="popup-row-value">${d.intensity} mm</span></div>
            <div class="popup-row"><span class="popup-row-label">Level</span><span class="popup-row-value">${d.level}</span></div>
            <div class="popup-demo">DEMO DATA</div>
          </div>
        `);
      });
  
      if (state.layers.rainfall) state.layerGroups.rainfall.addTo(state.map);
    }
  
    // ============ SATELLITE ============
    async function loadSatellite() {
      const data = await Services.getSatelliteAnomalies();
      state.layerGroups.satellite = L.layerGroup();
  
      data.forEach(a => {
        const icon = L.divIcon({
          className: '',
          html: `<div class="satellite-marker">${getIcon('satellite')}</div>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });
  
        const marker = L.marker([a.lat, a.lng], { icon }).addTo(state.layerGroups.satellite);
        marker.bindPopup(`
          <div class="popup-content">
            <div class="popup-label">SATELLITE ANOMALY</div>
            <div class="popup-title">${a.location}</div>
            <div class="popup-row"><span class="popup-row-label">Type</span><span class="popup-row-value">${a.type}</span></div>
            <div class="popup-row"><span class="popup-row-label">Detected</span><span class="popup-row-value">${a.detected}</span></div>
            <div class="popup-row"><span class="popup-row-label">Confidence</span><span class="popup-row-value">${a.confidence}</span></div>
            <div class="popup-demo">DEMO DATA</div>
          </div>
        `);
      });
  
      if (state.layers.satellite) state.layerGroups.satellite.addTo(state.map);
    }
  
    // ============ LAYER CONTROLS ============
    function setupLayerControls() {
      const panel = document.getElementById('layerPanel');
      const btn = document.getElementById('layerToggleBtn');
      const closeBtn = document.getElementById('layerPanelClose');
  
      if (btn && panel) {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          panel.classList.toggle('active');
          btn.classList.toggle('active');
        });
      }
  
      if (closeBtn && panel) {
        closeBtn.addEventListener('click', () => {
          panel.classList.remove('active');
          if (btn) btn.classList.remove('active');
        });
      }
  
      document.addEventListener('click', (e) => {
        if (panel && btn && !panel.contains(e.target) && !btn.contains(e.target)) {
          panel.classList.remove('active');
          btn.classList.remove('active');
        }
      });
  
      document.querySelectorAll('.layer-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
          const key = e.target.dataset.layer;
          state.layers[key] = e.target.checked;
          toggleLayer(key, e.target.checked);
        });
      });
    }
  
    function toggleLayer(key, visible) {
      const group = state.layerGroups[key];
      if (!group || !state.map) return;
  
      if (key === 'risk') {
        if (visible) group.addTo(state.map);
        else state.map.removeLayer(group);
        return;
      }
  
      if (visible) group.addTo(state.map);
      else if (state.map.hasLayer(group)) state.map.removeLayer(group);
    }
  
    // ============ SEARCH ============
    function setupSearch() {
      const input = document.getElementById('mapSearchInput');
      const results = document.getElementById('mapSearchResults');
      if (!input || !results) return;
  
      input.addEventListener('input', Utils.debounce(async (e) => {
        const q = e.target.value;
        if (!q || q.length < 2) {
          results.classList.remove('active');
          return;
        }
        const matches = await Services.searchLocations(q);
        if (matches.length === 0) {
          results.innerHTML = '<div style="padding: var(--space-3); font-size: var(--fs-xs); color: var(--text-500); text-align: center;">No locations found</div>';
        } else {
          results.innerHTML = matches.map(m => {
            const level = m.level.toLowerCase();
            const color = DEMO_DATA.riskLevels[level]?.color || '#19B8C7';
            return `
              <div class="search-result-item" onclick="window.SahayakRiskMap.selectSearchResult('${m.id}')">
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
      }, 200));
  
      input.addEventListener('focus', () => {
        if (input.value.length >= 2) input.dispatchEvent(new Event('input'));
      });
  
      document.addEventListener('click', (e) => {
        const wrap = document.querySelector('.map-toolbar-search');
        if (wrap && !wrap.contains(e.target)) results.classList.remove('active');
      });
    }
  
    function selectSearchResult(zoneId) {
      const zone = DEMO_DATA.riskZones.find(z => z.id === zoneId);
      if (!zone) return;
      focusLocation(zone);
      openLocationPanel(zone);
      document.getElementById('mapSearchResults').classList.remove('active');
      document.getElementById('mapSearchInput').value = '';
    }
  
    function focusLocation(zone) {
      if (!state.map) return;
      state.map.flyTo([zone.lat, zone.lng], 10, { duration: 1.2 });
    }
  
    // ============ FILTERS ============
    function setupFilters() {
      const stateFilter = document.getElementById('stateFilter');
      const riskFilter = document.getElementById('riskFilter');
  
      if (stateFilter) {
        stateFilter.addEventListener('change', (e) => {
          state.filters.state = e.target.value;
          refreshRiskZones();
        });
      }
  
      if (riskFilter) {
        riskFilter.addEventListener('change', (e) => {
          state.filters.riskLevel = e.target.value;
          refreshRiskZones();
        });
      }
    }
  
    // ============ TOOLBAR ============
    function setupToolbar() {
      const locateBtn = document.getElementById('locateBtn');
      const fullscreenBtn = document.getElementById('fullscreenBtn');
      const resetBtn = document.getElementById('resetBtn');
      const basemapBtn = document.getElementById('basemapBtn');
  
      if (locateBtn) {
        locateBtn.addEventListener('click', () => {
          if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return;
          }
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              state.map.flyTo([pos.coords.latitude, pos.coords.longitude], 10, { duration: 1 });
            },
            () => {
              alert('Unable to retrieve your location. Please enable location permissions.');
            }
          );
        });
      }
  
      if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
      }
  
      if (resetBtn) {
        resetBtn.addEventListener('click', resetMap);
      }
  
      if (basemapBtn) {
        basemapBtn.addEventListener('change', (e) => switchBasemap(e.target.value));
      }
    }
  
    function toggleFullscreen() {
      const el = document.getElementById('riskMap');
      if (!document.fullscreenElement) {
        el.requestFullscreen?.() || el.webkitRequestFullscreen?.();
      } else {
        document.exitFullscreen?.() || document.webkitExitFullscreen?.();
      }
    }
  
    function resetMap() {
      if (!state.map) return;
      state.map.flyTo([25.5, 92.5], 6, { duration: 1 });
      closeLocationPanel();
    }
  
    function switchBasemap(name) {
      if (!state.basemaps[name]) return;
      Object.values(state.basemaps).forEach(b => state.map.removeLayer(b));
      state.basemaps[name].addTo(state.map);
      state.currentBasemap = name;
    }
  
    // ============ LOCATION PANEL ============
    function openLocationPanel(zone) {
      state.selectedZone = zone;
      const panel = document.getElementById('locationIntelPanel');
      if (!panel) return;
  
      const level = zone.level.toLowerCase();
      const probability = (zone.risk * 0.98).toFixed(1);
      const circumference = 326.7;
      const dashoffset = circumference * (1 - zone.risk / 100);
  
      const factorsHtml = zone.factors.map(f => {
        const pct = (f.value / 40) * 100;
        return `
          <div class="location-ai-bar" style="--target-width: ${pct}%">
            <div class="location-ai-bar-label">${f.label}</div>
            <div class="location-ai-bar-track"><div class="location-ai-bar-fill"></div></div>
            <div class="location-ai-bar-value">+${f.value}</div>
          </div>
        `;
      }).join('');
  
      panel.innerHTML = `
        <div class="location-intel-header level-${level}">
          <button class="location-intel-close" onclick="window.SahayakRiskMap.closeLocationPanel()" aria-label="Close">
            ${getIcon('x')}
          </button>
          <div class="location-intel-label">HIGH LANDSLIDE RISK</div>
          <div class="location-intel-name">${zone.location}</div>
          <div class="location-intel-state">${zone.state}</div>
          <div class="location-score-row">
            <div class="location-score-circle">
              <svg viewBox="0 0 120 120">
                <circle class="track" cx="60" cy="60" r="52"/>
                <circle class="progress level-${level}" cx="60" cy="60" r="52"
                        style="stroke-dashoffset: ${dashoffset}"/>
              </svg>
              <div class="location-score-text">
                <div class="location-score-value" data-target="${zone.risk}">0</div>
                <div class="location-score-max">/ 100</div>
              </div>
            </div>
            <div class="location-score-meta">
              <div class="location-probability">Landslide Probability</div>
              <div class="location-probability-value" data-target-prob="${probability}">0%</div>
              <div class="location-risk-status status-${level}">
                <span>${zone.level}</span>
              </div>
              <div class="location-demo-note">Illustrative model output — DEMO</div>
            </div>
          </div>
        </div>
        <div class="location-intel-body">
          <div class="location-section">
            <div class="location-section-title">${getIcon('cloud-rain')} Environmental Conditions</div>
            <div class="location-params-grid">
              <div class="location-param"><span class="location-param-label">Rainfall</span><span class="location-param-value">${zone.rainfall} mm / 72h</span></div>
              <div class="location-param"><span class="location-param-label">Soil Moisture</span><span class="location-param-value">${zone.soilMoisture}%</span></div>
              <div class="location-param"><span class="location-param-label">Slope</span><span class="location-param-value">${zone.slope}°</span></div>
              <div class="location-param"><span class="location-param-label">Elevation</span><span class="location-param-value">${Utils.formatNumber(zone.elevation)} m</span></div>
            </div>
          </div>
          <div class="location-section">
            <div class="location-section-title">${getIcon('activity')} Risk Indicators</div>
            <div class="location-params-grid">
              <div class="location-param"><span class="location-param-label">Historical Landslides</span><span class="location-param-value">${zone.historical}</span></div>
              <div class="location-param"><span class="location-param-label">Satellite Change</span><span class="location-param-value">${zone.satelliteChange ? 'Detected' : 'None'}</span></div>
            </div>
          </div>
          <div class="location-section">
            <div class="location-section-title">${getIcon('users')} Exposure</div>
            <div class="location-params-grid">
              <div class="location-param"><span class="location-param-label">Nearby Population</span><span class="location-param-value">${Utils.formatNumber(zone.population)}</span></div>
              <div class="location-param"><span class="location-param-label">Roads</span><span class="location-param-value">${zone.roads}</span></div>
              <div class="location-param"><span class="location-param-label">Schools</span><span class="location-param-value">${zone.schools}</span></div>
              <div class="location-param"><span class="location-param-label">Hospital</span><span class="location-param-value">${zone.hospitals}</span></div>
            </div>
          </div>
          <div class="location-section">
            <div class="location-ai-explanation">
              <div class="location-ai-title">
                ${getIcon('info')}
                Why is this area high risk?
              </div>
              <div class="location-ai-bars">${factorsHtml}</div>
              <div class="location-ai-text">
                Risk increased because accumulated rainfall and soil moisture are elevated, while steep terrain and historical landslide patterns increase susceptibility.
              </div>
              <div class="location-ai-footer">
                <span>Illustrative SHAP-style explanation — DEMO</span>
                <a href="${ROUTES.riskAnalysis}">View Full Analysis →</a>
              </div>
            </div>
          </div>
        </div>
        <div class="location-intel-actions">
          <a href="${ROUTES.riskAnalysis}" class="btn btn-primary">View Full Analysis →</a>
          <a href="${ROUTES.alerts}" class="btn btn-outline">Generate Warning</a>
          <button class="btn btn-outline" onclick="window.SahayakRiskMap.openAssignModal()">Assign Field Officer</button>
          <a href="${ROUTES.infrastructure}" class="btn btn-outline">View Infrastructure →</a>
        </div>
      `;
  
      panel.classList.add('active');
  
      // Animate score count-up
      setTimeout(() => {
        const scoreEl = panel.querySelector('.location-score-value');
        const probEl = panel.querySelector('.location-probability-value');
        if (scoreEl) animateCount(scoreEl, zone.risk, 1200);
        if (probEl) animateCount(probEl, parseFloat(probability), 1200, true);
        // Animate AI bars
        panel.querySelectorAll('.location-ai-bar').forEach((bar, i) => {
          setTimeout(() => bar.classList.add('revealed'), 200 + i * 100);
        });
      }, 100);
  
      // Fly to zone
      if (state.map) {
        state.map.flyTo([zone.lat, zone.lng], 10, { duration: 1 });
      }
    }
  
    function closeLocationPanel() {
      const panel = document.getElementById('locationIntelPanel');
      if (panel) panel.classList.remove('active');
      state.selectedZone = null;
    }
  
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
  
    // ============ MAP INFO PANEL ============
    function setupMapInfoPanel() {
      updateMapInfoPanel();
    }
  
    function updateMapInfoPanel() {
      const panel = document.getElementById('mapInfoStats');
      if (!panel) return;
      const zones = DEMO_DATA.riskZones.filter(z => shouldShowZone(z));
      const warningCount = zones.filter(z => z.level === 'WARNING').length;
      const alertCount = zones.filter(z => z.level === 'ALERT').length;
      const population = zones.reduce((sum, z) => sum + z.population, 0);
  
      panel.innerHTML = `
        <div class="map-info-stat">
          <span class="map-info-stat-label">Risk Zones</span>
          <span class="map-info-stat-value">${zones.length}</span>
        </div>
        <div class="map-info-stat">
          <span class="map-info-stat-label">Warning Zones</span>
          <span class="map-info-stat-value warning">${warningCount}</span>
        </div>
        <div class="map-info-stat">
          <span class="map-info-stat-label">Alert Zones</span>
          <span class="map-info-stat-value alert">${alertCount}</span>
        </div>
        <div class="map-info-stat">
          <span class="map-info-stat-label">Active Reports</span>
          <span class="map-info-stat-value">${DEMO_DATA.fieldStats.reports}</span>
        </div>
        <div class="map-info-stat">
          <span class="map-info-stat-label">Population Exposure</span>
          <span class="map-info-stat-value">${Utils.formatNumber(population)}</span>
        </div>
      `;
    }
  
    // ============ DATA FRESHNESS ============
    function setupDataFreshness() {
      const list = document.getElementById('dataFreshnessList');
      if (!list) return;
      list.innerHTML = DEMO_DATA.dataFreshness.map(d => `
        <div class="data-freshness-item">
          <div class="data-freshness-source">
            <span class="data-freshness-dot ${d.status}"></span>
            <span>${d.source}</span>
          </div>
          <span class="data-freshness-time">${d.updated}</span>
        </div>
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
        <div class="notification-item ${n.read ? '' : 'unread'}" data-id="${n.id}" onclick="window.SahayakRiskMap.markNotificationRead('${n.id}')">
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
  
    // ============ LOADING / ERROR STATES ============
    function showLoadingState() {
      const overlay = document.getElementById('mapStateOverlay');
      if (!overlay) return;
      overlay.innerHTML = `
        <div class="map-state-icon"><div class="loading-spinner" style="border-top-color: var(--cyan);"></div></div>
        <div class="map-state-title">Loading GIS intelligence...</div>
        <div class="map-state-sub">Fetching risk zones, infrastructure, and field reports</div>
      `;
      overlay.classList.add('active');
    }
  
    function hideLoadingState() {
      const overlay = document.getElementById('mapStateOverlay');
      if (overlay) overlay.classList.remove('active');
    }
  
    function showErrorState() {
      const overlay = document.getElementById('mapStateOverlay');
      if (!overlay) return;
      overlay.innerHTML = `
        <div class="map-state-icon">${getIcon('alert-circle')}</div>
        <div class="map-state-title">Map data temporarily unavailable</div>
        <div class="map-state-sub">We're having trouble loading the GIS layers. Please try again.</div>
        <button class="map-state-btn" onclick="window.SahayakRiskMap.retryLoad()">Retry</button>
      `;
      overlay.classList.add('active');
    }
  
    async function retryLoad() {
      hideLoadingState();
      await loadAllLayers();
    }
  
    // ============ MODAL ============
    function openAssignModal() {
      const modal = document.getElementById('assignModal');
      if (modal) modal.classList.add('active');
    }
  
    function closeAssignModal() {
      const modal = document.getElementById('assignModal');
      if (modal) modal.classList.remove('active');
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
  
      // Modal
      const modal = document.getElementById('assignModal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeAssignModal();
        });
      }
  
      // Legend toggle (mobile)
      const legendToggle = document.getElementById('legendToggle');
      const legendBody = document.getElementById('legendBody');
      if (legendToggle && legendBody) {
        legendToggle.addEventListener('click', () => {
          legendBody.classList.toggle('collapsed');
        });
      }
  
      // Escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (notifPanel) notifPanel.classList.remove('active');
          closeLocationPanel();
          closeAssignModal();
        }
      });
    }
  
    // ============ PUBLIC API ============
    window.SahayakRiskMap = {
      selectSearchResult,
      closeLocationPanel,
      openAssignModal,
      closeAssignModal,
      markNotificationRead,
      markAllNotificationsRead,
      retryLoad,
      focusLocation,
      resetMap,
      toggleFullscreen
    };
  
    // ============ BOOT ============
    document.addEventListener('DOMContentLoaded', init);
  })();