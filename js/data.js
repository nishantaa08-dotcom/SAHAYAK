// js/data.js — Synthetic Demo Data (Extended for Dashboard)

const DEMO_DATA = {
    platform: {
        name: 'SAHAYAK',
        fullName: 'Smart AI Hazard Assessment & Actionable Knowledge',
        tagline: 'Predict Early. Warn Faster. Save Lives.',
        region: 'Northeast India',
        states: 8,
        version: 'SIH 2026 Prototype'
    },
    states: [
        { id: 'AP', name: 'Arunachal Pradesh', code: 'AR', center: [27.47, 92.50] },
        { id: 'AS', name: 'Assam', code: 'AS', center: [26.20, 92.90] },
        { id: 'MN', name: 'Manipur', code: 'MN', center: [24.66, 93.90] },
        { id: 'ML', name: 'Meghalaya', code: 'ML', center: [25.46, 91.36] },
        { id: 'MZ', name: 'Mizoram', code: 'MZ', center: [23.16, 92.93] },
        { id: 'NL', name: 'Nagaland', code: 'NL', center: [26.15, 94.20] },
        { id: 'TR', name: 'Tripura', code: 'TR', center: [23.94, 91.75] },
        { id: 'SK', name: 'Sikkim', code: 'SK', center: [27.53, 88.51] }
    ],
    demoLocations: [
        { name: 'Tawang', state: 'Arunachal Pradesh', lat: 27.47, lng: 91.86 },
        { name: 'Itanagar', state: 'Arunachal Pradesh', lat: 27.10, lng: 93.62 },
        { name: 'Gangtok', state: 'Sikkim', lat: 27.33, lng: 88.62 },
        { name: 'Shillong', state: 'Meghalaya', lat: 25.57, lng: 91.88 },
        { name: 'Aizawl', state: 'Mizoram', lat: 23.73, lng: 92.72 },
        { name: 'Kohima', state: 'Nagaland', lat: 25.67, lng: 94.11 },
        { name: 'Imphal', state: 'Manipur', lat: 24.82, lng: 93.95 },
        { name: 'Agartala', state: 'Tripura', lat: 23.83, lng: 91.28 },
        { name: 'Guwahati', state: 'Assam', lat: 26.14, lng: 91.74 }
    ],
    riskLevels: {
        safe:    { label: 'SAFE',    color: '#16A34A', range: [0, 30],  bg: 'rgba(22, 163, 74, 0.12)' },
        watch:   { label: 'WATCH',   color: '#EAB308', range: [31, 60], bg: 'rgba(234, 179, 8, 0.12)' },
        alert:   { label: 'ALERT',   color: '#F97316', range: [61, 80], bg: 'rgba(249, 115, 22, 0.12)' },
        warning: { label: 'WARNING', color: '#DC2626', range: [81, 100], bg: 'rgba(220, 38, 38, 0.12)' }
    },
    demoRisk: {
        location: 'Tawang',
        score: 84,
        status: 'WARNING',
        factors: {
            rainfall:     { label: 'Heavy Rainfall',        value: 32 },
            slope:        { label: 'Steep Slope',           value: 24 },
            soilMoisture: { label: 'High Soil Moisture',    value: 17 },
            historical:   { label: 'Historical Landslides', value: 11 },
            satellite:    { label: 'Satellite Anomaly',     value: 6 }
        }
    },

    // ===== DASHBOARD-SPECIFIC DATA =====

    riskZones: [
        {
            id: 'RZ-001', location: 'Tawang', state: 'Arunachal Pradesh',
            lat: 27.47, lng: 91.86, risk: 84, level: 'WARNING',
            rainfall: 286, soilMoisture: 81, slope: 41, elevation: 2100,
            historical: 5, satelliteChange: true,
            population: 1240, roads: 3, schools: 2, hospitals: 1, bridges: 1,
            trend: [42, 51, 63, 76, 84],
            factors: [
                { label: 'Heavy Rainfall', value: 32 },
                { label: 'Steep Slope', value: 24 },
                { label: 'High Soil Moisture', value: 17 },
                { label: 'Historical Landslides', value: 11 },
                { label: 'Satellite Anomaly', value: 6 }
            ]
        },
        {
            id: 'RZ-002', location: 'East Siang', state: 'Arunachal Pradesh',
            lat: 27.20, lng: 94.50, risk: 72, level: 'ALERT',
            rainfall: 198, soilMoisture: 74, slope: 36, elevation: 1800,
            historical: 3, satelliteChange: true,
            population: 860, roads: 2, schools: 1, hospitals: 1, bridges: 1,
            trend: [38, 45, 58, 65, 72],
            factors: [
                { label: 'Heavy Rainfall', value: 26 },
                { label: 'Steep Slope', value: 20 },
                { label: 'High Soil Moisture', value: 14 },
                { label: 'Historical Landslides', value: 8 },
                { label: 'Satellite Anomaly', value: 4 }
            ]
        },
        {
            id: 'RZ-003', location: 'West Khasi Hills', state: 'Meghalaya',
            lat: 25.40, lng: 91.20, risk: 68, level: 'ALERT',
            rainfall: 224, soilMoisture: 78, slope: 34, elevation: 1500,
            historical: 4, satelliteChange: false,
            population: 2180, roads: 4, schools: 3, hospitals: 1, bridges: 2,
            trend: [35, 42, 55, 62, 68],
            factors: [
                { label: 'Heavy Rainfall', value: 28 },
                { label: 'Steep Slope', value: 18 },
                { label: 'High Soil Moisture', value: 15 },
                { label: 'Historical Landslides', value: 5 },
                { label: 'Satellite Anomaly', value: 2 }
            ]
        },
        {
            id: 'RZ-004', location: 'Gangtok', state: 'Sikkim',
            lat: 27.33, lng: 88.62, risk: 58, level: 'WATCH',
            rainfall: 142, soilMoisture: 62, slope: 32, elevation: 1650,
            historical: 2, satelliteChange: false,
            population: 3400, roads: 5, schools: 4, hospitals: 2, bridges: 3,
            trend: [28, 35, 44, 52, 58],
            factors: [
                { label: 'Heavy Rainfall', value: 22 },
                { label: 'Steep Slope', value: 16 },
                { label: 'High Soil Moisture', value: 12 },
                { label: 'Historical Landslides', value: 5 },
                { label: 'Satellite Anomaly', value: 3 }
            ]
        },
        {
            id: 'RZ-005', location: 'Kohima', state: 'Nagaland',
            lat: 25.67, lng: 94.11, risk: 45, level: 'WATCH',
            rainfall: 112, soilMoisture: 58, slope: 28, elevation: 1450,
            historical: 2, satelliteChange: false,
            population: 1850, roads: 3, schools: 2, hospitals: 1, bridges: 1,
            trend: [22, 28, 35, 40, 45],
            factors: [
                { label: 'Heavy Rainfall', value: 18 },
                { label: 'Steep Slope', value: 12 },
                { label: 'High Soil Moisture', value: 9 },
                { label: 'Historical Landslides', value: 4 },
                { label: 'Satellite Anomaly', value: 2 }
            ]
        },
        {
            id: 'RZ-006', location: 'Aizawl', state: 'Mizoram',
            lat: 23.73, lng: 92.72, risk: 38, level: 'WATCH',
            rainfall: 98, soilMoisture: 54, slope: 26, elevation: 1200,
            historical: 1, satelliteChange: false,
            population: 2600, roads: 4, schools: 3, hospitals: 2, bridges: 2,
            trend: [18, 24, 30, 34, 38],
            factors: [
                { label: 'Heavy Rainfall', value: 15 },
                { label: 'Steep Slope', value: 10 },
                { label: 'High Soil Moisture', value: 8 },
                { label: 'Historical Landslides', value: 3 },
                { label: 'Satellite Anomaly', value: 2 }
            ]
        },
        {
            id: 'RZ-007', location: 'Shillong', state: 'Meghalaya',
            lat: 25.57, lng: 91.88, risk: 22, level: 'SAFE',
            rainfall: 64, soilMoisture: 42, slope: 18, elevation: 1500,
            historical: 1, satelliteChange: false,
            population: 4200, roads: 6, schools: 5, hospitals: 3, bridges: 4,
            trend: [12, 15, 18, 20, 22],
            factors: [
                { label: 'Heavy Rainfall', value: 8 },
                { label: 'Steep Slope', value: 6 },
                { label: 'High Soil Moisture', value: 5 },
                { label: 'Historical Landslides', value: 2 },
                { label: 'Satellite Anomaly', value: 1 }
            ]
        },
        {
            id: 'RZ-008', location: 'Imphal', state: 'Manipur',
            lat: 24.82, lng: 93.95, risk: 18, level: 'SAFE',
            rainfall: 52, soilMoisture: 38, slope: 15, elevation: 786,
            historical: 1, satelliteChange: false,
            population: 3800, roads: 5, schools: 4, hospitals: 2, bridges: 3,
            trend: [10, 13, 15, 16, 18],
            factors: [
                { label: 'Heavy Rainfall', value: 6 },
                { label: 'Steep Slope', value: 5 },
                { label: 'High Soil Moisture', value: 4 },
                { label: 'Historical Landslides', value: 2 },
                { label: 'Satellite Anomaly', value: 1 }
            ]
        },
        {
            id: 'RZ-009', location: 'Guwahati', state: 'Assam',
            lat: 26.14, lng: 91.74, risk: 14, level: 'SAFE',
            rainfall: 42, soilMoisture: 34, slope: 12, elevation: 55,
            historical: 0, satelliteChange: false,
            population: 6200, roads: 8, schools: 6, hospitals: 4, bridges: 5,
            trend: [8, 10, 12, 13, 14],
            factors: [
                { label: 'Heavy Rainfall', value: 5 },
                { label: 'Steep Slope', value: 4 },
                { label: 'High Soil Moisture', value: 3 },
                { label: 'Historical Landslides', value: 1 },
                { label: 'Satellite Anomaly', value: 1 }
            ]
        },
        {
            id: 'RZ-010', location: 'Upper Subansiri', state: 'Arunachal Pradesh',
            lat: 27.80, lng: 93.80, risk: 76, level: 'ALERT',
            rainfall: 212, soilMoisture: 76, slope: 38, elevation: 1900,
            historical: 4, satelliteChange: true,
            population: 680, roads: 2, schools: 1, hospitals: 0, bridges: 1,
            trend: [40, 52, 64, 70, 76],
            factors: [
                { label: 'Heavy Rainfall', value: 28 },
                { label: 'Steep Slope', value: 22 },
                { label: 'High Soil Moisture', value: 15 },
                { label: 'Historical Landslides', value: 8 },
                { label: 'Satellite Anomaly', value: 3 }
            ]
        },
        {
            id: 'RZ-011', location: 'Dima Hasao', state: 'Assam',
            lat: 25.60, lng: 93.20, risk: 62, level: 'ALERT',
            rainfall: 178, soilMoisture: 70, slope: 32, elevation: 900,
            historical: 3, satelliteChange: false,
            population: 1420, roads: 3, schools: 2, hospitals: 1, bridges: 1,
            trend: [32, 40, 50, 56, 62],
            factors: [
                { label: 'Heavy Rainfall', value: 24 },
                { label: 'Steep Slope', value: 16 },
                { label: 'High Soil Moisture', value: 13 },
                { label: 'Historical Landslides', value: 6 },
                { label: 'Satellite Anomaly', value: 3 }
            ]
        },
        {
            id: 'RZ-012', location: 'Churachandpur', state: 'Manipur',
            lat: 24.33, lng: 93.68, risk: 88, level: 'WARNING',
            rainfall: 312, soilMoisture: 86, slope: 44, elevation: 1600,
            historical: 6, satelliteChange: true,
            population: 1580, roads: 2, schools: 2, hospitals: 1, bridges: 1,
            trend: [48, 62, 74, 82, 88],
            factors: [
                { label: 'Heavy Rainfall', value: 36 },
                { label: 'Steep Slope', value: 26 },
                { label: 'High Soil Moisture', value: 18 },
                { label: 'Historical Landslides', value: 12 },
                { label: 'Satellite Anomaly', value: 7 }
            ]
        }
    ],

    alerts: [
        {
            id: 'ALT-001', severity: 'warning', type: 'Landslide Risk Warning',
            location: 'Churachandpur', state: 'Manipur',
            risk: 88, message: 'Heavy rainfall + saturated soil + steep slope',
            population: 1580, roads: 2, schools: 2, hospitals: 1,
            timestamp: '12 min ago', read: false
        },
        {
            id: 'ALT-002', severity: 'warning', type: 'Landslide Risk Warning',
            location: 'Tawang', state: 'Arunachal Pradesh',
            risk: 84, message: 'Heavy rainfall + saturated soil + steep slope',
            population: 1240, roads: 3, schools: 2, hospitals: 1,
            timestamp: '28 min ago', read: false
        },
        {
            id: 'ALT-003', severity: 'alert', type: 'Risk Elevation',
            location: 'Upper Subansiri', state: 'Arunachal Pradesh',
            risk: 76, message: 'Rising soil moisture with steep terrain',
            population: 680, roads: 2, schools: 1, hospitals: 0,
            timestamp: '1 hr ago', read: false
        },
        {
            id: 'ALT-004', severity: 'alert', type: 'Risk Elevation',
            location: 'East Siang', state: 'Arunachal Pradesh',
            risk: 72, message: 'Satellite anomaly detected with rising rainfall',
            population: 860, roads: 2, schools: 1, hospitals: 1,
            timestamp: '2 hr ago', read: true
        }
    ],

    fieldReports: [
        { id: 'FR-001', location: 'Tawang', type: 'Field Report', status: 'submitted', officer: 'Officer R. Singh', timestamp: '8 min ago' },
        { id: 'FR-002', location: 'East Siang', type: 'Prediction Verified', status: 'verified', officer: 'Officer M. Das', timestamp: '21 min ago' },
        { id: 'FR-003', location: 'West Siang', type: 'Inspection Requested', status: 'pending', officer: 'Officer K. Bora', timestamp: '34 min ago' },
        { id: 'FR-004', location: 'Churachandpur', type: 'Field Report', status: 'submitted', officer: 'Officer L. Guite', timestamp: '42 min ago' },
        { id: 'FR-005', location: 'West Khasi Hills', type: 'Ground Truth', status: 'verified', officer: 'Officer P. Lyngdoh', timestamp: '1 hr ago' },
        { id: 'FR-006', location: 'Gangtok', type: 'Inspection', status: 'assigned', officer: 'Officer T. Bhutia', timestamp: '2 hr ago' }
    ],

    notifications: [
        { id: 'N-001', type: 'critical', icon: '🔴', title: 'Critical risk detected', message: 'Churachandpur risk score reached 88', timestamp: '12 min ago', read: false },
        { id: 'N-002', type: 'alert', icon: '🟠', title: 'Rainfall threshold exceeded', message: 'Tawang: 286mm in 72h', timestamp: '28 min ago', read: false },
        { id: 'N-003', type: 'info', icon: '📍', title: 'New field report', message: 'Officer R. Singh submitted report from Tawang', timestamp: '8 min ago', read: false },
        { id: 'N-004', type: 'success', icon: '✓', title: 'Field report verified', message: 'East Siang prediction verified by field team', timestamp: '21 min ago', read: true },
        { id: 'N-005', type: 'info', icon: '🛰', title: 'Satellite anomaly detected', message: 'Upper Subansiri surface change observed', timestamp: '1 hr ago', read: true },
        { id: 'N-006', type: 'warning', icon: '📡', title: 'Data source delayed', message: 'Satellite feed delayed by 4 hours', timestamp: '4 hr ago', read: true }
    ],

    dataFreshness: [
        { source: 'Rainfall', status: 'fresh', updated: '12 min ago' },
        { source: 'Satellite', status: 'delayed', updated: '4 hours ago' },
        { source: 'Historical Data', status: 'fresh', updated: 'yesterday' },
        { source: 'AI Prediction', status: 'fresh', updated: '5 min ago' },
        { source: 'Infrastructure', status: 'fresh', updated: '18 min ago' }
    ],

    exposureSummary: {
        population: 24680,
        villages: 18,
        roads: 27,
        schools: 14,
        hospitals: 4,
        bridges: 8
    },

    fieldStats: {
        reports: 126,
        verified: 39,
        pending: 14,
        assigned: 8
    },

    metrics: {
        criticalZones: { value: 12, trend: '+3', trendDir: 'up', updated: '5 min ago' },
        highRiskZones: { value: 47, trend: '+5', trendDir: 'up', updated: '5 min ago' },
        activeAlerts: { value: 8, trend: '+2', trendDir: 'up', updated: '12 min ago' },
        fieldReports: { value: 126, trend: '+18', trendDir: 'up', updated: '8 min ago' },
        verifiedIncidents: { value: 39, trend: '+4', trendDir: 'up', updated: '21 min ago' },
        populationAtRisk: { value: 24680, trend: '+1,240', trendDir: 'up', updated: '5 min ago' }
    },

    sidebarSections: [
        {
            label: 'OVERVIEW',
            items: [
                { key: 'dashboard', label: 'Dashboard', icon: 'grid', active: true }
            ]
        },
        {
            label: 'RISK INTELLIGENCE',
            items: [
                { key: 'riskMap', label: 'Risk Map', icon: 'map' },
                { key: 'riskAnalysis', label: 'Risk Analysis', icon: 'chart' }
            ]
        },
        {
            label: 'EARLY ACTION',
            items: [
                { key: 'alerts', label: 'Alerts', icon: 'bell' },
                { key: 'fieldReports', label: 'Field Reports', icon: 'clipboard' },
                { key: 'verification', label: 'Verification', icon: 'check' }
            ]
        },
        {
            label: 'MONITORING',
            items: [
                { key: 'rainfall', label: 'Rainfall', icon: 'cloud' },
                { key: 'terrain', label: 'Terrain', icon: 'mountain' },
                { key: 'satellite', label: 'Satellite', icon: 'satellite' },
                { key: 'historical', label: 'Historical', icon: 'clock' }
            ]
        },
        {
            label: 'IMPACT & RESPONSE',
            items: [
                { key: 'infrastructure', label: 'Infrastructure', icon: 'building' },
                { key: 'routeRisk', label: 'Route Risk', icon: 'route' },
                { key: 'simulator', label: 'Simulator', icon: 'sliders' }
            ]
        },
        {
            label: 'ANALYTICS',
            items: [
                { key: 'analytics', label: 'Analytics', icon: 'bar-chart' },
                { key: 'modelPerformance', label: 'Model Performance', icon: 'cpu' }
            ]
        },
        {
            label: 'ADMINISTRATION',
            items: [
                { key: 'users', label: 'Users & Roles', icon: 'users' },
                { key: 'settings', label: 'Settings', icon: 'settings' }
            ]
        }
    ],

    // ===== RISK MAP SPECIFIC DATA =====
     historicalLandslides: [
    { id: 'HL-001', location: 'Tawang', state: 'Arunachal Pradesh', lat: 27.49, lng: 91.87, date: '12 July 2024', severity: 'High', cause: 'Heavy rainfall', damage: 'Road blockage, 3 houses affected' },
    { id: 'HL-002', location: 'East Siang', state: 'Arunachal Pradesh', lat: 27.22, lng: 94.52, date: '28 June 2024', severity: 'Medium', cause: 'Prolonged rainfall', damage: 'Partial road damage' },
    { id: 'HL-003', location: 'West Khasi Hills', state: 'Meghalaya', lat: 25.42, lng: 91.22, date: '15 August 2023', severity: 'High', cause: 'Extreme rainfall', damage: 'Village access cut off' },
    { id: 'HL-004', location: 'Upper Subansiri', state: 'Arunachal Pradesh', lat: 27.82, lng: 93.82, date: '03 September 2023', severity: 'Medium', cause: 'Soil saturation', damage: 'Agricultural land affected' },
    { id: 'HL-005', location: 'Dima Hasao', state: 'Assam', lat: 25.62, lng: 93.22, date: '22 July 2023', severity: 'High', cause: 'Heavy rainfall + steep slope', damage: 'Highway blocked for 18 hours' },
    { id: 'HL-006', location: 'Churachandpur', state: 'Manipur', lat: 24.35, lng: 93.70, date: '09 August 2024', severity: 'Critical', cause: 'Extreme rainfall event', damage: 'Multiple structures damaged' },
    { id: 'HL-007', location: 'Gangtok', state: 'Sikkim', lat: 27.35, lng: 88.64, date: '04 October 2023', severity: 'Medium', cause: 'Rainfall + seismic activity', damage: 'Minor road damage' },
    { id: 'HL-008', location: 'Kohima', state: 'Nagaland', lat: 25.69, lng: 94.13, date: '17 June 2024', severity: 'Low', cause: 'Moderate rainfall', damage: 'Slope erosion' }
  ],
  infrastructure: {
    hospitals: [
      { id: 'H-001', name: 'Tawang District Hospital', type: 'hospital', lat: 27.48, lng: 91.85, status: 'Operational', distance: '2.4 km' },
      { id: 'H-002', name: 'East Siang Medical Center', type: 'hospital', lat: 27.21, lng: 94.51, status: 'Operational', distance: '3.1 km' },
      { id: 'H-003', name: 'West Khasi Hills Hospital', type: 'hospital', lat: 25.41, lng: 91.21, status: 'Operational', distance: '1.8 km' },
      { id: 'H-004', name: 'Gangtok General Hospital', type: 'hospital', lat: 27.34, lng: 88.63, status: 'Operational', distance: '4.2 km' },
      { id: 'H-005', name: 'Churachandpur Hospital', type: 'hospital', lat: 24.34, lng: 93.69, status: 'Operational', distance: '2.1 km' }
    ],
    schools: [
      { id: 'S-001', name: 'Tawang Central School', type: 'school', lat: 27.475, lng: 91.855, status: 'Operational', distance: '1.2 km' },
      { id: 'S-002', name: 'East Siang Govt School', type: 'school', lat: 27.205, lng: 94.505, status: 'Operational', distance: '2.5 km' },
      { id: 'S-003', name: 'Shillong Public School', type: 'school', lat: 25.56, lng: 91.87, status: 'Operational', distance: '3.4 km' },
      { id: 'S-004', name: 'Kohima Model School', type: 'school', lat: 25.675, lng: 94.115, status: 'Operational', distance: '2.8 km' }
    ],
    bridges: [
      { id: 'B-001', name: 'Tawang River Bridge', type: 'bridge', lat: 27.485, lng: 91.865, status: 'Operational', distance: '0.8 km' },
      { id: 'B-002', name: 'East Siang Bridge', type: 'bridge', lat: 27.215, lng: 94.515, status: 'Under inspection', distance: '1.5 km' },
      { id: 'B-003', name: 'Dima Hasao Bridge', type: 'bridge', lat: 25.61, lng: 93.21, status: 'Operational', distance: '2.2 km' }
    ],
    police: [
      { id: 'P-001', name: 'Tawang Police Station', type: 'police', lat: 27.478, lng: 91.858, status: 'Operational', distance: '1.6 km' },
      { id: 'P-002', name: 'Gangtok Police Station', type: 'police', lat: 27.335, lng: 88.625, status: 'Operational', distance: '3.8 km' }
    ],
    relief: [
      { id: 'R-001', name: 'Tawang Relief Center', type: 'relief', lat: 27.472, lng: 91.862, status: 'Standby', distance: '2.0 km' },
      { id: 'R-002', name: 'Churachandpur Relief Camp', type: 'relief', lat: 24.338, lng: 93.695, status: 'Active', distance: '1.4 km' }
    ]
  },
  citizenReports: [
    { id: 'CR-001', type: 'Road Crack', location: 'Tawang', lat: 27.482, lng: 91.868, severity: 'High', submitted: '18 min ago', status: 'Pending Verification' },
    { id: 'CR-002', type: 'Soil Erosion', location: 'East Siang', lat: 27.212, lng: 94.512, severity: 'Medium', submitted: '42 min ago', status: 'Pending Verification' },
    { id: 'CR-003', type: 'Water Seepage', location: 'West Khasi Hills', lat: 25.412, lng: 91.212, severity: 'Medium', submitted: '1 hr ago', status: 'Under Review' },
    { id: 'CR-004', type: 'Rock Fall', location: 'Upper Subansiri', lat: 27.812, lng: 93.812, severity: 'High', submitted: '2 hr ago', status: 'Pending Verification' },
    { id: 'CR-005', type: 'Wall Crack', location: 'Churachandpur', lat: 24.342, lng: 93.692, severity: 'Critical', submitted: '3 hr ago', status: 'Field Verified' }
  ],
  rainfallData: [
    { location: 'Tawang', lat: 27.47, lng: 91.86, intensity: 286, level: 'extreme' },
    { location: 'East Siang', lat: 27.20, lng: 94.50, intensity: 198, level: 'heavy' },
    { location: 'West Khasi Hills', lat: 25.40, lng: 91.20, intensity: 224, level: 'heavy' },
    { location: 'Upper Subansiri', lat: 27.80, lng: 93.80, intensity: 212, level: 'heavy' },
    { location: 'Dima Hasao', lat: 25.60, lng: 93.20, intensity: 178, level: 'moderate' },
    { location: 'Churachandpur', lat: 24.33, lng: 93.68, intensity: 312, level: 'extreme' }
  ],
  satelliteAnomalies: [
    { location: 'Tawang', lat: 27.47, lng: 91.86, type: 'Surface deformation', detected: '2 days ago', confidence: 'High' },
    { location: 'East Siang', lat: 27.20, lng: 94.50, type: 'Vegetation stress', detected: '1 day ago', confidence: 'Medium' },
    { location: 'Upper Subansiri', lat: 27.80, lng: 93.80, type: 'Surface change', detected: '3 days ago', confidence: 'High' },
    { location: 'Churachandpur', lat: 24.33, lng: 93.68, type: 'Ground subsidence', detected: '5 hours ago', confidence: 'High' }
  ],
  // ===== RISK ANALYSIS DATA =====
riskAnalysisData: {
    'Tawang': {
      risk: 84, probability: 82.4, level: 'WARNING',
      rainfall: 286, soilMoisture: 81, slope: 41, elevation: 2100,
      historicalEvents: 5, satelliteChange: true,
      population: 1240, villages: 4, roads: 3, schools: 2, hospitals: 1, bridges: 1,
      previousRisk: 66, confidence: 78,
      factors: { rainfall: 32, slope: 24, soil: 17, historical: 11, satellite: 6 },
      trend: [
        { time: '06:00', value: 42, status: 'watch' },
        { time: '08:00', value: 47, status: 'watch' },
        { time: '10:00', value: 53, status: 'watch' },
        { time: '12:00', value: 63, status: 'alert' },
        { time: '14:00', value: 71, status: 'alert' },
        { time: '15:00', value: 76, status: 'alert' },
        { time: '16:00', value: 80, status: 'warning' },
        { time: '18:00', value: 84, status: 'warning' }
      ],
      rainfallBreakdown: { h24: 112, h48: 198, h72: 286, threshold: 232 },
      soilType: 'Mountain Soil', aspect: 'North-East', curvature: 'Moderate', saturation: 'High', stability: 'Reduced',
      historicalByYear: { 2021: 1, 2022: 0, 2023: 2, 2024: 1, 2025: 1 },
      satellite: { ndvi: 'Change detected', ndwi: 'Stable', surface: 'Detected', sar: 'Elevated' },
      responsePriority: 91
    },
    'East Siang': {
      risk: 72, probability: 68.2, level: 'ALERT',
      rainfall: 198, soilMoisture: 74, slope: 36, elevation: 1800,
      historicalEvents: 3, satelliteChange: true,
      population: 860, villages: 3, roads: 2, schools: 1, hospitals: 1, bridges: 1,
      previousRisk: 58, confidence: 74,
      factors: { rainfall: 26, slope: 20, soil: 14, historical: 8, satellite: 4 },
      trend: [
        { time: '06:00', value: 38, status: 'watch' },
        { time: '08:00', value: 45, status: 'watch' },
        { time: '10:00', value: 52, status: 'watch' },
        { time: '12:00', value: 58, status: 'watch' },
        { time: '14:00', value: 65, status: 'alert' },
        { time: '15:00', value: 68, status: 'alert' },
        { time: '16:00', value: 70, status: 'alert' },
        { time: '18:00', value: 72, status: 'alert' }
      ],
      rainfallBreakdown: { h24: 78, h48: 142, h72: 198, threshold: 232 },
      soilType: 'Loamy Soil', aspect: 'South-East', curvature: 'Low', saturation: 'High', stability: 'Moderate',
      historicalByYear: { 2021: 0, 2022: 1, 2023: 1, 2024: 0, 2025: 1 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'Detected', sar: 'Normal' },
      responsePriority: 74
    },
    'West Siang': {
      risk: 54, probability: 48.6, level: 'WATCH',
      rainfall: 142, soilMoisture: 62, slope: 30, elevation: 1500,
      historicalEvents: 2, satelliteChange: false,
      population: 720, villages: 2, roads: 2, schools: 1, hospitals: 0, bridges: 1,
      previousRisk: 48, confidence: 70,
      factors: { rainfall: 18, slope: 16, soil: 11, historical: 6, satellite: 3 },
      trend: [
        { time: '06:00', value: 32, status: 'watch' },
        { time: '08:00', value: 38, status: 'watch' },
        { time: '10:00', value: 42, status: 'watch' },
        { time: '12:00', value: 46, status: 'watch' },
        { time: '14:00', value: 50, status: 'watch' },
        { time: '15:00', value: 52, status: 'watch' },
        { time: '16:00', value: 53, status: 'watch' },
        { time: '18:00', value: 54, status: 'watch' }
      ],
      rainfallBreakdown: { h24: 54, h48: 98, h72: 142, threshold: 232 },
      soilType: 'Red Soil', aspect: 'East', curvature: 'Low', saturation: 'Moderate', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 1, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 52
    },
    'Itanagar': {
      risk: 38, probability: 32.1, level: 'WATCH',
      rainfall: 98, soilMoisture: 54, slope: 22, elevation: 440,
      historicalEvents: 1, satelliteChange: false,
      population: 2840, villages: 5, roads: 4, schools: 3, hospitals: 2, bridges: 2,
      previousRisk: 34, confidence: 72,
      factors: { rainfall: 14, slope: 10, soil: 8, historical: 4, satellite: 2 },
      trend: [
        { time: '06:00', value: 28, status: 'safe' },
        { time: '08:00', value: 30, status: 'safe' },
        { time: '10:00', value: 32, status: 'watch' },
        { time: '12:00', value: 34, status: 'watch' },
        { time: '14:00', value: 36, status: 'watch' },
        { time: '15:00', value: 37, status: 'watch' },
        { time: '16:00', value: 37, status: 'watch' },
        { time: '18:00', value: 38, status: 'watch' }
      ],
      rainfallBreakdown: { h24: 38, h48: 68, h72: 98, threshold: 232 },
      soilType: 'Alluvial', aspect: 'South', curvature: 'Low', saturation: 'Moderate', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 0, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 38
    },
    'Gangtok': {
      risk: 58, probability: 52.4, level: 'WATCH',
      rainfall: 142, soilMoisture: 62, slope: 32, elevation: 1650,
      historicalEvents: 2, satelliteChange: false,
      population: 3400, villages: 6, roads: 5, schools: 4, hospitals: 2, bridges: 3,
      previousRisk: 52, confidence: 76,
      factors: { rainfall: 22, slope: 16, soil: 12, historical: 5, satellite: 3 },
      trend: [
        { time: '06:00', value: 40, status: 'watch' },
        { time: '08:00', value: 44, status: 'watch' },
        { time: '10:00', value: 48, status: 'watch' },
        { time: '12:00', value: 52, status: 'watch' },
        { time: '14:00', value: 55, status: 'watch' },
        { time: '15:00', value: 56, status: 'watch' },
        { time: '16:00', value: 57, status: 'watch' },
        { time: '18:00', value: 58, status: 'watch' }
      ],
      rainfallBreakdown: { h24: 56, h48: 102, h72: 142, threshold: 232 },
      soilType: 'Mountain Soil', aspect: 'North', curvature: 'Moderate', saturation: 'Moderate', stability: 'Moderate',
      historicalByYear: { 2021: 0, 2022: 1, 2023: 0, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 58
    },
    'Shillong': {
      risk: 22, probability: 18.4, level: 'SAFE',
      rainfall: 64, soilMoisture: 42, slope: 18, elevation: 1500,
      historicalEvents: 1, satelliteChange: false,
      population: 4200, villages: 7, roads: 6, schools: 5, hospitals: 3, bridges: 4,
      previousRisk: 20, confidence: 80,
      factors: { rainfall: 8, slope: 6, soil: 5, historical: 2, satellite: 1 },
      trend: [
        { time: '06:00', value: 18, status: 'safe' },
        { time: '08:00', value: 19, status: 'safe' },
        { time: '10:00', value: 20, status: 'safe' },
        { time: '12:00', value: 21, status: 'safe' },
        { time: '14:00', value: 21, status: 'safe' },
        { time: '15:00', value: 22, status: 'safe' },
        { time: '16:00', value: 22, status: 'safe' },
        { time: '18:00', value: 22, status: 'safe' }
      ],
      rainfallBreakdown: { h24: 22, h48: 42, h72: 64, threshold: 232 },
      soilType: 'Laterite', aspect: 'West', curvature: 'Low', saturation: 'Low', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 0, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 22
    },
    'Aizawl': {
      risk: 38, probability: 32.8, level: 'WATCH',
      rainfall: 98, soilMoisture: 54, slope: 26, elevation: 1200,
      historicalEvents: 1, satelliteChange: false,
      population: 2600, villages: 4, roads: 4, schools: 3, hospitals: 2, bridges: 2,
      previousRisk: 34, confidence: 72,
      factors: { rainfall: 15, slope: 10, soil: 8, historical: 3, satellite: 2 },
      trend: [
        { time: '06:00', value: 28, status: 'safe' },
        { time: '08:00', value: 30, status: 'safe' },
        { time: '10:00', value: 32, status: 'watch' },
        { time: '12:00', value: 34, status: 'watch' },
        { time: '14:00', value: 36, status: 'watch' },
        { time: '15:00', value: 37, status: 'watch' },
        { time: '16:00', value: 37, status: 'watch' },
        { time: '18:00', value: 38, status: 'watch' }
      ],
      rainfallBreakdown: { h24: 38, h48: 68, h72: 98, threshold: 232 },
      soilType: 'Loamy Soil', aspect: 'South-East', curvature: 'Low', saturation: 'Moderate', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 1, 2024: 0, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 38
    },
    'Kohima': {
      risk: 45, probability: 40.2, level: 'WATCH',
      rainfall: 112, soilMoisture: 58, slope: 28, elevation: 1450,
      historicalEvents: 2, satelliteChange: false,
      population: 1850, villages: 3, roads: 3, schools: 2, hospitals: 1, bridges: 1,
      previousRisk: 40, confidence: 74,
      factors: { rainfall: 18, slope: 12, soil: 9, historical: 4, satellite: 2 },
      trend: [
        { time: '06:00', value: 32, status: 'watch' },
        { time: '08:00', value: 35, status: 'watch' },
        { time: '10:00', value: 38, status: 'watch' },
        { time: '12:00', value: 40, status: 'watch' },
        { time: '14:00', value: 42, status: 'watch' },
        { time: '15:00', value: 43, status: 'watch' },
        { time: '16:00', value: 44, status: 'watch' },
        { time: '18:00', value: 45, status: 'watch' }
      ],
      rainfallBreakdown: { h24: 42, h48: 78, h72: 112, threshold: 232 },
      soilType: 'Mountain Soil', aspect: 'North-East', curvature: 'Low', saturation: 'Moderate', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 1, 2023: 0, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 44
    },
    'Imphal': {
      risk: 18, probability: 14.2, level: 'SAFE',
      rainfall: 52, soilMoisture: 38, slope: 15, elevation: 786,
      historicalEvents: 1, satelliteChange: false,
      population: 3800, villages: 6, roads: 5, schools: 4, hospitals: 2, bridges: 3,
      previousRisk: 16, confidence: 82,
      factors: { rainfall: 6, slope: 5, soil: 4, historical: 2, satellite: 1 },
      trend: [
        { time: '06:00', value: 14, status: 'safe' },
        { time: '08:00', value: 15, status: 'safe' },
        { time: '10:00', value: 16, status: 'safe' },
        { time: '12:00', value: 17, status: 'safe' },
        { time: '14:00', value: 17, status: 'safe' },
        { time: '15:00', value: 18, status: 'safe' },
        { time: '16:00', value: 18, status: 'safe' },
        { time: '18:00', value: 18, status: 'safe' }
      ],
      rainfallBreakdown: { h24: 18, h48: 34, h72: 52, threshold: 232 },
      soilType: 'Alluvial', aspect: 'South', curvature: 'Low', saturation: 'Low', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 0, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 18
    },
    'Agartala': {
      risk: 14, probability: 10.8, level: 'SAFE',
      rainfall: 42, soilMoisture: 34, slope: 12, elevation: 25,
      historicalEvents: 0, satelliteChange: false,
      population: 2400, villages: 4, roads: 4, schools: 3, hospitals: 2, bridges: 2,
      previousRisk: 12, confidence: 84,
      factors: { rainfall: 5, slope: 4, soil: 3, historical: 1, satellite: 1 },
      trend: [
        { time: '06:00', value: 10, status: 'safe' },
        { time: '08:00', value: 11, status: 'safe' },
        { time: '10:00', value: 12, status: 'safe' },
        { time: '12:00', value: 13, status: 'safe' },
        { time: '14:00', value: 13, status: 'safe' },
        { time: '15:00', value: 14, status: 'safe' },
        { time: '16:00', value: 14, status: 'safe' },
        { time: '18:00', value: 14, status: 'safe' }
      ],
      rainfallBreakdown: { h24: 14, h48: 28, h72: 42, threshold: 232 },
      soilType: 'Alluvial', aspect: 'South', curvature: 'Low', saturation: 'Low', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 0, 2024: 0, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 14
    },
    'Guwahati': {
      risk: 28, probability: 22.6, level: 'SAFE',
      rainfall: 68, soilMoisture: 46, slope: 16, elevation: 55,
      historicalEvents: 1, satelliteChange: false,
      population: 6200, villages: 8, roads: 8, schools: 6, hospitals: 4, bridges: 5,
      previousRisk: 24, confidence: 78,
      factors: { rainfall: 10, slope: 8, soil: 6, historical: 3, satellite: 1 },
      trend: [
        { time: '06:00', value: 20, status: 'safe' },
        { time: '08:00', value: 22, status: 'safe' },
        { time: '10:00', value: 24, status: 'safe' },
        { time: '12:00', value: 26, status: 'safe' },
        { time: '14:00', value: 27, status: 'safe' },
        { time: '15:00', value: 27, status: 'safe' },
        { time: '16:00', value: 28, status: 'safe' },
        { time: '18:00', value: 28, status: 'safe' }
      ],
      rainfallBreakdown: { h24: 24, h48: 46, h72: 68, threshold: 232 },
      soilType: 'Alluvial', aspect: 'South', curvature: 'Low', saturation: 'Low', stability: 'Stable',
      historicalByYear: { 2021: 0, 2022: 0, 2023: 0, 2024: 1, 2025: 0 },
      satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal' },
      responsePriority: 28
    }
  },
  comparisonLocations: ['Tawang', 'East Siang', 'Gangtok']
};

if (typeof window !== 'undefined') {
    window.SAHAYAK_DATA = DEMO_DATA;
}

