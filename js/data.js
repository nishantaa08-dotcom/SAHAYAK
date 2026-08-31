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
    ]
};

if (typeof window !== 'undefined') {
    window.SAHAYAK_DATA = DEMO_DATA;
}