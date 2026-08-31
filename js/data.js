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
            id: 'RZ-001',
            location: 'Tawang',
            state: 'Arunachal Pradesh',
            lat: 27.47, lng: 91.86,
            risk: 84, level: 'WARNING',
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
            ],
            // === RISK ANALYSIS PAGE FIELDS ===
            probability: 82.4,
            riskChange: '+8',
            riskChangeDir: 'up',
            aspect: 'NE',
            curvature: 'Moderate',
            terrainStability: 'Elevated',
            historicalEventsList: [
                { year: 2019, magnitude: 'severe', month: 'June' },
                { year: 2021, magnitude: 'moderate', month: 'July' },
                { year: 2022, magnitude: 'minor', month: 'August' },
                { year: 2024, magnitude: 'moderate', month: 'June' },
                { year: 2025, magnitude: 'minor', month: 'July' }
            ],
            satelliteIndicators: {
                ndvi: { value: 0.42, status: 'declining', label: 'NDVI' },
                ndwi: { value: 0.31, status: 'elevated', label: 'NDWI' },
                surfaceChange: { value: 'Detected', status: 'anomaly', label: 'Surface Change' },
                sarChange: { value: 'Moderate', status: 'watch', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 18, risk: 42 },
                { time: '09:00', rainfall: 34, risk: 51 },
                { time: '12:00', rainfall: 58, risk: 63 },
                { time: '15:00', rainfall: 82, risk: 76 },
                { time: '18:00', rainfall: 94, risk: 84 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'watch', score: 42, event: 'Baseline monitoring' },
                { time: '09:00', level: 'watch', score: 51, event: 'Rainfall increased' },
                { time: '12:00', level: 'alert', score: 63, event: 'Risk crossed alert threshold' },
                { time: '15:00', level: 'warning', score: 76, event: 'Soil moisture saturation' },
                { time: '18:00', level: 'warning', score: 84, event: 'Warning generated' }
            ],
            keyDrivers: ['Heavy rainfall', 'High soil moisture', 'Steep terrain', 'Historical susceptibility', 'Satellite anomaly'],
            recommendedActions: [
                { id: 'A1', label: 'Increase monitoring frequency', priority: 'high' },
                { id: 'A2', label: 'Review nearby infrastructure exposure', priority: 'high' },
                { id: 'A3', label: 'Consider field inspection', priority: 'medium' },
                { id: 'A4', label: 'Review warning thresholds', priority: 'medium' },
                { id: 'A5', label: 'Monitor rainfall trend', priority: 'medium' },
                { id: 'A6', label: 'Verify satellite anomaly', priority: 'low' }
            ],
            interpretation: {
                status: 'WARNING',
                confidence: 'Demonstration value',
                trend: 'Increasing',
                primaryDriver: 'Heavy rainfall',
                secondaryDriver: 'Soil moisture',
                terrainFactor: 'Steep slope'
            },
            responsePriority: { score: 91, level: 'CRITICAL' }
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
            ],
            probability: 71.2, riskChange: '+6', riskChangeDir: 'up',
            aspect: 'E', curvature: 'Low', terrainStability: 'Moderate',
            historicalEventsList: [
                { year: 2020, magnitude: 'moderate', month: 'July' },
                { year: 2022, magnitude: 'minor', month: 'August' },
                { year: 2024, magnitude: 'minor', month: 'June' }
            ],
            satelliteIndicators: {
                ndvi: { value: 0.48, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.28, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'Detected', status: 'anomaly', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 14, risk: 38 },
                { time: '09:00', rainfall: 26, risk: 45 },
                { time: '12:00', rainfall: 44, risk: 58 },
                { time: '15:00', rainfall: 62, risk: 65 },
                { time: '18:00', rainfall: 72, risk: 72 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'watch', score: 38, event: 'Baseline monitoring' },
                { time: '09:00', level: 'watch', score: 45, event: 'Rainfall increasing' },
                { time: '12:00', level: 'watch', score: 58, event: 'Soil moisture rising' },
                { time: '15:00', level: 'alert', score: 65, event: 'Alert threshold reached' },
                { time: '18:00', level: 'alert', score: 72, event: 'Satellite anomaly detected' }
            ],
            keyDrivers: ['Heavy rainfall', 'Steep terrain', 'Soil moisture', 'Historical events'],
            recommendedActions: [
                { id: 'A1', label: 'Increase monitoring frequency', priority: 'high' },
                { id: 'A2', label: 'Review nearby infrastructure exposure', priority: 'medium' },
                { id: 'A3', label: 'Monitor rainfall trend', priority: 'medium' },
                { id: 'A4', label: 'Verify satellite anomaly', priority: 'low' }
            ],
            interpretation: {
                status: 'ALERT', confidence: 'Demonstration value', trend: 'Increasing',
                primaryDriver: 'Heavy rainfall', secondaryDriver: 'Steep terrain', terrainFactor: 'Moderate slope'
            },
            responsePriority: { score: 74, level: 'HIGH' }
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
            ],
            probability: 66.8, riskChange: '+4', riskChangeDir: 'up',
            aspect: 'S', curvature: 'Moderate', terrainStability: 'Moderate',
            historicalEventsList: [
                { year: 2018, magnitude: 'severe', month: 'June' },
                { year: 2020, magnitude: 'moderate', month: 'July' },
                { year: 2023, magnitude: 'minor', month: 'August' },
                { year: 2024, magnitude: 'minor', month: 'July' }
            ],
            satelliteIndicators: {
                ndvi: { value: 0.51, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.33, status: 'elevated', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 16, risk: 35 },
                { time: '09:00', rainfall: 30, risk: 42 },
                { time: '12:00', rainfall: 52, risk: 55 },
                { time: '15:00', rainfall: 68, risk: 62 },
                { time: '18:00', rainfall: 78, risk: 68 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'watch', score: 35, event: 'Baseline monitoring' },
                { time: '09:00', level: 'watch', score: 42, event: 'Rainfall increasing' },
                { time: '12:00', level: 'watch', score: 55, event: 'Soil moisture rising' },
                { time: '15:00', level: 'alert', score: 62, event: 'Alert threshold reached' },
                { time: '18:00', level: 'alert', score: 68, event: 'Continued rainfall' }
            ],
            keyDrivers: ['Heavy rainfall', 'Soil moisture', 'Steep terrain', 'Historical events'],
            recommendedActions: [
                { id: 'A1', label: 'Increase monitoring frequency', priority: 'medium' },
                { id: 'A2', label: 'Monitor rainfall trend', priority: 'medium' },
                { id: 'A3', label: 'Review warning thresholds', priority: 'low' }
            ],
            interpretation: {
                status: 'ALERT', confidence: 'Demonstration value', trend: 'Increasing',
                primaryDriver: 'Heavy rainfall', secondaryDriver: 'Soil moisture', terrainFactor: 'Moderate slope'
            },
            responsePriority: { score: 68, level: 'HIGH' }
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
            ],
            probability: 56.2, riskChange: '+3', riskChangeDir: 'up',
            aspect: 'NW', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [
                { year: 2021, magnitude: 'minor', month: 'July' },
                { year: 2023, magnitude: 'minor', month: 'August' }
            ],
            satelliteIndicators: {
                ndvi: { value: 0.58, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.26, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 10, risk: 28 },
                { time: '09:00', rainfall: 18, risk: 35 },
                { time: '12:00', rainfall: 28, risk: 44 },
                { time: '15:00', rainfall: 38, risk: 52 },
                { time: '18:00', rainfall: 46, risk: 58 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 28, event: 'Baseline monitoring' },
                { time: '09:00', level: 'watch', score: 35, event: 'Rainfall increasing' },
                { time: '12:00', level: 'watch', score: 44, event: 'Steady rise' },
                { time: '15:00', level: 'watch', score: 52, event: 'Continued rainfall' },
                { time: '18:00', level: 'watch', score: 58, event: 'Monitoring continues' }
            ],
            keyDrivers: ['Rainfall', 'Terrain', 'Soil moisture'],
            recommendedActions: [
                { id: 'A1', label: 'Continue routine monitoring', priority: 'low' },
                { id: 'A2', label: 'Monitor rainfall trend', priority: 'low' }
            ],
            interpretation: {
                status: 'WATCH', confidence: 'Demonstration value', trend: 'Increasing',
                primaryDriver: 'Rainfall', secondaryDriver: 'Terrain', terrainFactor: 'Moderate slope'
            },
            responsePriority: { score: 52, level: 'MODERATE' }
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
            ],
            probability: 43.8, riskChange: '+2', riskChangeDir: 'up',
            aspect: 'N', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [
                { year: 2022, magnitude: 'minor', month: 'July' },
                { year: 2024, magnitude: 'minor', month: 'August' }
            ],
            satelliteIndicators: {
                ndvi: { value: 0.62, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.24, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 8, risk: 22 },
                { time: '09:00', rainfall: 14, risk: 28 },
                { time: '12:00', rainfall: 22, risk: 35 },
                { time: '15:00', rainfall: 30, risk: 40 },
                { time: '18:00', rainfall: 36, risk: 45 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 22, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 28, event: 'Stable' },
                { time: '12:00', level: 'watch', score: 35, event: 'Rainfall increasing' },
                { time: '15:00', level: 'watch', score: 40, event: 'Monitoring' },
                { time: '18:00', level: 'watch', score: 45, event: 'Monitoring' }
            ],
            keyDrivers: ['Rainfall', 'Terrain'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'WATCH', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: 'Terrain', terrainFactor: 'Moderate slope'
            },
            responsePriority: { score: 42, level: 'MODERATE' }
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
            ],
            probability: 36.4, riskChange: '+1', riskChangeDir: 'up',
            aspect: 'W', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [{ year: 2023, magnitude: 'minor', month: 'July' }],
            satelliteIndicators: {
                ndvi: { value: 0.65, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.22, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 6, risk: 18 },
                { time: '09:00', rainfall: 10, risk: 24 },
                { time: '12:00', rainfall: 16, risk: 30 },
                { time: '15:00', rainfall: 22, risk: 34 },
                { time: '18:00', rainfall: 26, risk: 38 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 18, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 24, event: 'Stable' },
                { time: '12:00', level: 'safe', score: 30, event: 'Stable' },
                { time: '15:00', level: 'watch', score: 34, event: 'Slight increase' },
                { time: '18:00', level: 'watch', score: 38, event: 'Monitoring' }
            ],
            keyDrivers: ['Rainfall', 'Terrain'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'WATCH', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: 'Terrain', terrainFactor: 'Moderate slope'
            },
            responsePriority: { score: 34, level: 'LOW' }
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
            ],
            probability: 21.6, riskChange: '0', riskChangeDir: 'stable',
            aspect: 'SE', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [{ year: 2022, magnitude: 'minor', month: 'August' }],
            satelliteIndicators: {
                ndvi: { value: 0.68, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.20, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 4, risk: 12 },
                { time: '09:00', rainfall: 6, risk: 15 },
                { time: '12:00', rainfall: 10, risk: 18 },
                { time: '15:00', rainfall: 14, risk: 20 },
                { time: '18:00', rainfall: 16, risk: 22 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 12, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 15, event: 'Stable' },
                { time: '12:00', level: 'safe', score: 18, event: 'Stable' },
                { time: '15:00', level: 'safe', score: 20, event: 'Stable' },
                { time: '18:00', level: 'safe', score: 22, event: 'Stable' }
            ],
            keyDrivers: ['Rainfall'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'SAFE', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: '—', terrainFactor: 'Gentle slope'
            },
            responsePriority: { score: 22, level: 'LOW' }
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
            ],
            probability: 17.2, riskChange: '0', riskChangeDir: 'stable',
            aspect: 'S', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [{ year: 2023, magnitude: 'minor', month: 'July' }],
            satelliteIndicators: {
                ndvi: { value: 0.70, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.19, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 3, risk: 10 },
                { time: '09:00', rainfall: 5, risk: 13 },
                { time: '12:00', rainfall: 8, risk: 15 },
                { time: '15:00', rainfall: 11, risk: 16 },
                { time: '18:00', rainfall: 13, risk: 18 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 10, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 13, event: 'Stable' },
                { time: '12:00', level: 'safe', score: 15, event: 'Stable' },
                { time: '15:00', level: 'safe', score: 16, event: 'Stable' },
                { time: '18:00', level: 'safe', score: 18, event: 'Stable' }
            ],
            keyDrivers: ['Rainfall'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'SAFE', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: '—', terrainFactor: 'Gentle slope'
            },
            responsePriority: { score: 18, level: 'LOW' }
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
            ],
            probability: 13.8, riskChange: '0', riskChangeDir: 'stable',
            aspect: 'E', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [],
            satelliteIndicators: {
                ndvi: { value: 0.72, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.18, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 2, risk: 8 },
                { time: '09:00', rainfall: 4, risk: 10 },
                { time: '12:00', rainfall: 6, risk: 12 },
                { time: '15:00', rainfall: 8, risk: 13 },
                { time: '18:00', rainfall: 10, risk: 14 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 8, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 10, event: 'Stable' },
                { time: '12:00', level: 'safe', score: 12, event: 'Stable' },
                { time: '15:00', level: 'safe', score: 13, event: 'Stable' },
                { time: '18:00', level: 'safe', score: 14, event: 'Stable' }
            ],
            keyDrivers: ['Rainfall'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'SAFE', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: '—', terrainFactor: 'Gentle slope'
            },
            responsePriority: { score: 14, level: 'LOW' }
        },
        // Extra locations for selector
        {
            id: 'RZ-WS', location: 'West Siang', state: 'Arunachal Pradesh',
            lat: 27.55, lng: 95.10, risk: 54, level: 'WATCH',
            rainfall: 156, soilMoisture: 66, slope: 30, elevation: 1400,
            historical: 2, satelliteChange: false,
            population: 920, roads: 2, schools: 1, hospitals: 1, bridges: 1,
            trend: [26, 32, 40, 48, 54],
            factors: [
                { label: 'Heavy Rainfall', value: 20 },
                { label: 'Steep Slope', value: 14 },
                { label: 'High Soil Moisture', value: 11 },
                { label: 'Historical Landslides', value: 6 },
                { label: 'Satellite Anomaly', value: 3 }
            ],
            probability: 52.4, riskChange: '+2', riskChangeDir: 'up',
            aspect: 'N', curvature: 'Low', terrainStability: 'Moderate',
            historicalEventsList: [
                { year: 2021, magnitude: 'minor', month: 'July' },
                { year: 2023, magnitude: 'minor', month: 'August' }
            ],
            satelliteIndicators: {
                ndvi: { value: 0.55, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.25, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 12, risk: 26 },
                { time: '09:00', rainfall: 20, risk: 32 },
                { time: '12:00', rainfall: 32, risk: 40 },
                { time: '15:00', rainfall: 44, risk: 48 },
                { time: '18:00', rainfall: 52, risk: 54 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 26, event: 'Baseline' },
                { time: '09:00', level: 'watch', score: 32, event: 'Rainfall' },
                { time: '12:00', level: 'watch', score: 40, event: 'Rising' },
                { time: '15:00', level: 'watch', score: 48, event: 'Monitoring' },
                { time: '18:00', level: 'watch', score: 54, event: 'Monitoring' }
            ],
            keyDrivers: ['Rainfall', 'Soil moisture', 'Terrain'],
            recommendedActions: [
                { id: 'A1', label: 'Continue routine monitoring', priority: 'low' },
                { id: 'A2', label: 'Monitor rainfall trend', priority: 'low' }
            ],
            interpretation: {
                status: 'WATCH', confidence: 'Demonstration value', trend: 'Increasing',
                primaryDriver: 'Rainfall', secondaryDriver: 'Soil moisture', terrainFactor: 'Moderate slope'
            },
            responsePriority: { score: 48, level: 'MODERATE' }
        },
        {
            id: 'RZ-IT', location: 'Itanagar', state: 'Arunachal Pradesh',
            lat: 27.10, lng: 93.62, risk: 32, level: 'WATCH',
            rainfall: 88, soilMoisture: 48, slope: 22, elevation: 440,
            historical: 1, satelliteChange: false,
            population: 3200, roads: 5, schools: 4, hospitals: 2, bridges: 3,
            trend: [16, 20, 24, 28, 32],
            factors: [
                { label: 'Heavy Rainfall', value: 12 },
                { label: 'Steep Slope', value: 8 },
                { label: 'High Soil Moisture', value: 7 },
                { label: 'Historical Landslides', value: 3 },
                { label: 'Satellite Anomaly', value: 2 }
            ],
            probability: 30.2, riskChange: '+1', riskChangeDir: 'up',
            aspect: 'SE', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [{ year: 2022, magnitude: 'minor', month: 'July' }],
            satelliteIndicators: {
                ndvi: { value: 0.64, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.21, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 5, risk: 16 },
                { time: '09:00', rainfall: 9, risk: 20 },
                { time: '12:00', rainfall: 14, risk: 24 },
                { time: '15:00', rainfall: 20, risk: 28 },
                { time: '18:00', rainfall: 24, risk: 32 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 16, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 20, event: 'Stable' },
                { time: '12:00', level: 'safe', score: 24, event: 'Stable' },
                { time: '15:00', level: 'watch', score: 28, event: 'Slight increase' },
                { time: '18:00', level: 'watch', score: 32, event: 'Monitoring' }
            ],
            keyDrivers: ['Rainfall', 'Terrain'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'WATCH', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: 'Terrain', terrainFactor: 'Gentle slope'
            },
            responsePriority: { score: 28, level: 'LOW' }
        },
        {
            id: 'RZ-AG', location: 'Agartala', state: 'Tripura',
            lat: 23.83, lng: 91.28, risk: 16, level: 'SAFE',
            rainfall: 48, soilMoisture: 36, slope: 14, elevation: 30,
            historical: 0, satelliteChange: false,
            population: 4800, roads: 6, schools: 5, hospitals: 3, bridges: 4,
            trend: [8, 10, 12, 14, 16],
            factors: [
                { label: 'Heavy Rainfall', value: 6 },
                { label: 'Steep Slope', value: 4 },
                { label: 'High Soil Moisture', value: 3 },
                { label: 'Historical Landslides', value: 2 },
                { label: 'Satellite Anomaly', value: 1 }
            ],
            probability: 15.4, riskChange: '0', riskChangeDir: 'stable',
            aspect: 'S', curvature: 'Low', terrainStability: 'Stable',
            historicalEventsList: [],
            satelliteIndicators: {
                ndvi: { value: 0.71, status: 'stable', label: 'NDVI' },
                ndwi: { value: 0.19, status: 'normal', label: 'NDWI' },
                surfaceChange: { value: 'None', status: 'normal', label: 'Surface Change' },
                sarChange: { value: 'Low', status: 'normal', label: 'SAR Change' }
            },
            rainfallHistory: [
                { time: '06:00', rainfall: 3, risk: 8 },
                { time: '09:00', rainfall: 5, risk: 10 },
                { time: '12:00', rainfall: 8, risk: 12 },
                { time: '15:00', rainfall: 11, risk: 14 },
                { time: '18:00', rainfall: 13, risk: 16 }
            ],
            riskHistoryEvents: [
                { time: '06:00', level: 'safe', score: 8, event: 'Baseline' },
                { time: '09:00', level: 'safe', score: 10, event: 'Stable' },
                { time: '12:00', level: 'safe', score: 12, event: 'Stable' },
                { time: '15:00', level: 'safe', score: 14, event: 'Stable' },
                { time: '18:00', level: 'safe', score: 16, event: 'Stable' }
            ],
            keyDrivers: ['Rainfall'],
            recommendedActions: [{ id: 'A1', label: 'Continue routine monitoring', priority: 'low' }],
            interpretation: {
                status: 'SAFE', confidence: 'Demonstration value', trend: 'Stable',
                primaryDriver: 'Rainfall', secondaryDriver: '—', terrainFactor: 'Gentle slope'
            },
            responsePriority: { score: 16, level: 'LOW' }
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
  ]
};

if (typeof window !== 'undefined') {
    window.SAHAYAK_DATA = DEMO_DATA;
}

