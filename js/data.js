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
            responsePriority: { score: 91, level: 'CRITICAL' },
            simulatorBaseline: {
               rainfall: 286,      // mm (72h)
               soilMoisture: 81,   // %
               slope: 41,          // degrees
               historicalWeight: 65, // 0-100
               satelliteWeight: 45   // 0-100
            },
    // === INFRASTRUCTURE PAGE FIELDS ===
            exposure: {
                population: 1240,
                villages: 4,
                roads: 3,
                schools: 2,
                hospitals: 1,
                bridges: 1
            },
            infrastructure: [
                { id: 'INF-001', type: 'hospital', name: 'Tawang District Hospital', distance: 3.1, status: 'POTENTIALLY_EXPOSED', lat: 27.468, lng: 91.862, capacity: 50 },
                { id: 'INF-002', type: 'school', name: 'Govt Senior Secondary School', distance: 1.2, status: 'POTENTIALLY_EXPOSED', lat: 27.472, lng: 91.858, capacity: 320 },
                { id: 'INF-003', type: 'school', name: 'Jawahar Navodaya Vidyalaya', distance: 2.8, status: 'MONITOR', lat: 27.465, lng: 91.870, capacity: 450 },
                { id: 'INF-004', type: 'bridge', name: 'Tawang River Bridge', distance: 2.4, status: 'POTENTIALLY_EXPOSED', lat: 27.470, lng: 91.855 },
                { id: 'INF-005', type: 'police', name: 'Tawang Police Station', distance: 1.8, status: 'OPERATIONAL', lat: 27.474, lng: 91.865 },
                { id: 'INF-006', type: 'relief', name: 'Tawang Relief Center', distance: 4.2, status: 'STANDBY', lat: 27.460, lng: 91.850, capacity: 200 }
            ],
            roads: [
                { id: 'RD-001', name: 'Tawang Highway Segment A', risk: 'CRITICAL', distance: 0.8, status: 'Monitor' },
                { id: 'RD-002', name: 'Monastery Road Segment B', risk: 'HIGH', distance: 1.6, status: 'Monitor' },
                { id: 'RD-003', name: 'Lumla Road Segment C', risk: 'HIGH', distance: 2.3, status: 'Monitor' }
            ],
            villages: [
                { id: 'VLG-001', name: 'Lungthung', population: 320, distance: 2.1, exposure: 'HIGH', lat: 27.480, lng: 91.870 },
                { id: 'VLG-002', name: 'Dirang Chu', population: 180, distance: 3.4, exposure: 'MODERATE', lat: 27.455, lng: 91.845 },
                { id: 'VLG-003', name: 'Sela Top Settlement', population: 95, distance: 4.2, exposure: 'LOW', lat: 27.490, lng: 91.880 },
                { id: 'VLG-004', name: 'Jang Valley', population: 645, distance: 1.8, exposure: 'HIGH', lat: 27.465, lng: 91.850 }
            ],
            populationBreakdown: { high: 420, moderate: 530, low: 290 },
            emergencyServices: { police: 2, relief: 1, hospitals: 1, fire: 1 },
            nearestResponse: { name: 'Tawang Relief Center', distance: 4.2, responseTime: 18 },
            priorityFactors: [
                { label: 'Hazard Severity', value: 35 },
                { label: 'Population Exposure', value: 24 },
                { label: 'Road Connectivity', value: 16 },
                { label: 'Critical Facilities', value: 10 }
            ],
            recentExposureActivity: [
                { type: 'info', icon: '🏥', title: 'Infrastructure identified', location: 'Tawang District Hospital', time: '8 min ago' },
                { type: 'alert', icon: '🛣', title: 'Road segment flagged', location: 'Tawang Highway Segment A', time: '14 min ago' },
                { type: 'action', icon: '📍', title: 'Field inspection requested', location: 'Tawang', time: '22 min ago' },
                { type: 'info', icon: '📊', title: 'Exposure assessment updated', location: 'Tawang', time: '31 min ago' }
            ],
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
            responsePriority: { score: 74, level: 'HIGH' },
             simulatorBaseline: {
        rainfall: 198, soilMoisture: 74, slope: 36,
        historicalWeight: 55, satelliteWeight: 35
    },
    exposure: {
        population: 1240,
        villages: 4,
        roads: 3,
        schools: 2,
        hospitals: 1,
        bridges: 1
    },
    infrastructure: [
        { id: 'INF-001', type: 'hospital', name: 'Tawang District Hospital', distance: 3.1, status: 'POTENTIALLY_EXPOSED', lat: 27.468, lng: 91.862, capacity: 50 },
        { id: 'INF-002', type: 'school', name: 'Govt Senior Secondary School', distance: 1.2, status: 'POTENTIALLY_EXPOSED', lat: 27.472, lng: 91.858, capacity: 320 },
        { id: 'INF-003', type: 'school', name: 'Jawahar Navodaya Vidyalaya', distance: 2.8, status: 'MONITOR', lat: 27.465, lng: 91.870, capacity: 450 },
        { id: 'INF-004', type: 'bridge', name: 'Tawang River Bridge', distance: 2.4, status: 'POTENTIALLY_EXPOSED', lat: 27.470, lng: 91.855 },
        { id: 'INF-005', type: 'police', name: 'Tawang Police Station', distance: 1.8, status: 'OPERATIONAL', lat: 27.474, lng: 91.865 },
        { id: 'INF-006', type: 'relief', name: 'Tawang Relief Center', distance: 4.2, status: 'STANDBY', lat: 27.460, lng: 91.850, capacity: 200 }
    ],
    roads: [
        { id: 'RD-001', name: 'Tawang Highway Segment A', risk: 'CRITICAL', distance: 0.8, status: 'Monitor' },
        { id: 'RD-002', name: 'Monastery Road Segment B', risk: 'HIGH', distance: 1.6, status: 'Monitor' },
        { id: 'RD-003', name: 'Lumla Road Segment C', risk: 'HIGH', distance: 2.3, status: 'Monitor' }
    ],
    villages: [
        { id: 'VLG-001', name: 'Lungthung', population: 320, distance: 2.1, exposure: 'HIGH', lat: 27.480, lng: 91.870 },
        { id: 'VLG-002', name: 'Dirang Chu', population: 180, distance: 3.4, exposure: 'MODERATE', lat: 27.455, lng: 91.845 },
        { id: 'VLG-003', name: 'Sela Top Settlement', population: 95, distance: 4.2, exposure: 'LOW', lat: 27.490, lng: 91.880 },
        { id: 'VLG-004', name: 'Jang Valley', population: 645, distance: 1.8, exposure: 'HIGH', lat: 27.465, lng: 91.850 }
    ],
    populationBreakdown: { high: 420, moderate: 530, low: 290 },
    emergencyServices: { police: 2, relief: 1, hospitals: 1, fire: 1 },
    nearestResponse: { name: 'Tawang Relief Center', distance: 4.2, responseTime: 18 },
    priorityFactors: [
        { label: 'Hazard Severity', value: 35 },
        { label: 'Population Exposure', value: 24 },
        { label: 'Road Connectivity', value: 16 },
        { label: 'Critical Facilities', value: 10 }
    ],
    recentExposureActivity: [
        { type: 'info', icon: '🏥', title: 'Infrastructure identified', location: 'Tawang District Hospital', time: '8 min ago' },
        { type: 'alert', icon: '🛣', title: 'Road segment flagged', location: 'Tawang Highway Segment A', time: '14 min ago' },
        { type: 'action', icon: '📍', title: 'Field inspection requested', location: 'Tawang', time: '22 min ago' },
        { type: 'info', icon: '📊', title: 'Exposure assessment updated', location: 'Tawang', time: '31 min ago' }
    ],
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
            responsePriority: { score: 68, level: 'HIGH' },
            simulatorBaseline: {
        rainfall: 224, soilMoisture: 78, slope: 34,
        historicalWeight: 50, satelliteWeight: 20
    },
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
            responsePriority: { score: 52, level: 'MODERATE' },
            simulatorBaseline: {
        rainfall: 142, soilMoisture: 62, slope: 32,
        historicalWeight: 40, satelliteWeight: 25
    },
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
            responsePriority: { score: 42, level: 'MODERATE' },
            simulatorBaseline: {
        rainfall: 112, soilMoisture: 58, slope: 28,
        historicalWeight: 35, satelliteWeight: 20
    },
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
            responsePriority: { score: 34, level: 'LOW' },
            simulatorBaseline: {
        rainfall: 98, soilMoisture: 54, slope: 26,
        historicalWeight: 30, satelliteWeight: 18
    },
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
            responsePriority: { score: 22, level: 'LOW' },
            simulatorBaseline: {
        rainfall: 64, soilMoisture: 42, slope: 18,
        historicalWeight: 25, satelliteWeight: 15
    },
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
            responsePriority: { score: 18, level: 'LOW' },
            simulatorBaseline: {
        rainfall: 52, soilMoisture: 38, slope: 15,
        historicalWeight: 20, satelliteWeight: 12
    },
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
            responsePriority: { score: 14, level: 'LOW' },
            simulatorBaseline: {
        rainfall: 42, soilMoisture: 34, slope: 12,
        historicalWeight: 10, satelliteWeight: 8
    },
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
            responsePriority: { score: 48, level: 'MODERATE' },
            simulatorBaseline: {
        rainfall: 156, soilMoisture: 66, slope: 30,
        historicalWeight: 40, satelliteWeight: 22
    },
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
            responsePriority: { score: 28, level: 'LOW' },
            simulatorBaseline: {
        rainfall: 88, soilMoisture: 48, slope: 22,
        historicalWeight: 25, satelliteWeight: 15
    },
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
            responsePriority: { score: 16, level: 'LOW' },
            simulatorBaseline: {
        rainfall: 48, soilMoisture: 36, slope: 14,
        historicalWeight: 15, satelliteWeight: 10
    },
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
  // ===== ALERTS DATA =====
alerts: [
    {
      id: 'SAH-ALR-0001', severity: 'critical', type: 'Landslide Risk Warning',
      location: 'Tawang', state: 'Arunachal Pradesh', lat: 27.586, lng: 91.859,
      risk: 88, message: 'Heavy rainfall + saturated soil + steep slope',
      population: 1240, roads: 3, schools: 2, hospitals: 1, bridges: 1, villages: 4,
      issued: '18 min ago', issuedAt: Date.now() - 18*60*1000,
      expires: '2 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 32 },
        { label: 'Soil Moisture', value: 21 },
        { label: 'Steep Slope', value: 18 },
        { label: 'Historical Events', value: 10 },
        { label: 'Satellite Indicator', value: 7 }
      ],
      timeline: [
        { time: '18:00', event: 'Risk crossed warning threshold' },
        { time: '17:45', event: 'Rainfall threshold exceeded' },
        { time: '17:20', event: 'Soil moisture increased' },
        { time: '16:30', event: 'AI risk score increased' },
        { time: '15:00', event: 'Monitoring initiated' }
      ],
      assignedOfficer: null, read: false
    },
    {
      id: 'SAH-ALR-0002', severity: 'critical', type: 'Landslide Risk Warning',
      location: 'Churachandpur', state: 'Manipur', lat: 24.33, lng: 93.68,
      risk: 92, message: 'Extreme rainfall + historical landslide zone',
      population: 1580, roads: 2, schools: 2, hospitals: 1, bridges: 1, villages: 5,
      issued: '42 min ago', issuedAt: Date.now() - 42*60*1000,
      expires: '3 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 36 },
        { label: 'Soil Moisture', value: 24 },
        { label: 'Steep Slope', value: 16 },
        { label: 'Historical Events', value: 10 },
        { label: 'Satellite Indicator', value: 6 }
      ],
      timeline: [
        { time: '18:00', event: 'Critical threshold reached' },
        { time: '17:30', event: 'Rainfall accumulation critical' },
        { time: '16:45', event: 'Soil saturation detected' },
        { time: '15:00', event: 'Monitoring escalated' }
      ],
      assignedOfficer: null, read: false
    },
    {
      id: 'SAH-ALR-0003', severity: 'warning', type: 'Risk Elevation',
      location: 'Upper Subansiri', state: 'Arunachal Pradesh', lat: 27.80, lng: 93.80,
      risk: 76, message: 'Rising soil moisture with steep terrain',
      population: 680, roads: 2, schools: 1, hospitals: 0, bridges: 1, villages: 3,
      issued: '1 hr ago', issuedAt: Date.now() - 60*60*1000,
      expires: '4 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 28 },
        { label: 'Steep Slope', value: 22 },
        { label: 'High Soil Moisture', value: 15 },
        { label: 'Historical Landslides', value: 8 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '17:00', event: 'Warning threshold crossed' },
        { time: '16:20', event: 'Soil moisture rising' },
        { time: '15:00', event: 'Rainfall increasing' }
      ],
      assignedOfficer: null, read: false
    },
    {
      id: 'SAH-ALR-0004', severity: 'warning', type: 'Risk Elevation',
      location: 'East Siang', state: 'Arunachal Pradesh', lat: 27.20, lng: 94.50,
      risk: 72, message: 'Satellite anomaly detected with rising rainfall',
      population: 860, roads: 2, schools: 1, hospitals: 1, bridges: 1, villages: 3,
      issued: '2 hr ago', issuedAt: Date.now() - 2*60*60*1000,
      expires: '5 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 26 },
        { label: 'Steep Slope', value: 20 },
        { label: 'High Soil Moisture', value: 14 },
        { label: 'Historical Landslides', value: 8 },
        { label: 'Satellite Anomaly', value: 4 }
      ],
      timeline: [
        { time: '16:00', event: 'Anomaly detected' },
        { time: '15:30', event: 'Rainfall increasing' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0005', severity: 'alert', type: 'Monitoring Advisory',
      location: 'West Khasi Hills', state: 'Meghalaya', lat: 25.40, lng: 91.20,
      risk: 68, message: 'Elevated rainfall with historical activity',
      population: 2180, roads: 4, schools: 3, hospitals: 1, bridges: 2, villages: 6,
      issued: '3 hr ago', issuedAt: Date.now() - 3*60*60*1000,
      expires: '6 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 28 },
        { label: 'Steep Slope', value: 18 },
        { label: 'High Soil Moisture', value: 15 },
        { label: 'Historical Landslides', value: 5 },
        { label: 'Satellite Anomaly', value: 2 }
      ],
      timeline: [
        { time: '15:00', event: 'Advisory issued' },
        { time: '14:30', event: 'Rainfall threshold approached' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0006', severity: 'alert', type: 'Monitoring Advisory',
      location: 'Dima Hasao', state: 'Assam', lat: 25.60, lng: 93.20,
      risk: 62, message: 'Moderate rainfall with terrain susceptibility',
      population: 1420, roads: 3, schools: 2, hospitals: 1, bridges: 1, villages: 4,
      issued: '4 hr ago', issuedAt: Date.now() - 4*60*60*1000,
      expires: '8 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 24 },
        { label: 'Steep Slope', value: 16 },
        { label: 'High Soil Moisture', value: 13 },
        { label: 'Historical Landslides', value: 6 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '14:00', event: 'Advisory issued' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0007', severity: 'warning', type: 'Risk Elevation',
      location: 'Gangtok', state: 'Sikkim', lat: 27.33, lng: 88.62,
      risk: 58, message: 'Elevated terrain risk with moderate rainfall',
      population: 3400, roads: 5, schools: 4, hospitals: 2, bridges: 3, villages: 6,
      issued: '5 hr ago', issuedAt: Date.now() - 5*60*60*1000,
      expires: '10 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 22 },
        { label: 'Steep Slope', value: 16 },
        { label: 'High Soil Moisture', value: 12 },
        { label: 'Historical Landslides', value: 5 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '13:00', event: 'Monitoring elevated' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0008', severity: 'watch', type: 'Precautionary Notice',
      location: 'Kohima', state: 'Nagaland', lat: 25.67, lng: 94.11,
      risk: 45, message: 'Moderate conditions with historical activity',
      population: 1850, roads: 3, schools: 2, hospitals: 1, bridges: 1, villages: 3,
      issued: '6 hr ago', issuedAt: Date.now() - 6*60*60*1000,
      expires: '12 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 18 },
        { label: 'Steep Slope', value: 12 },
        { label: 'High Soil Moisture', value: 9 },
        { label: 'Historical Landslides', value: 4 },
        { label: 'Satellite Anomaly', value: 2 }
      ],
      timeline: [
        { time: '12:00', event: 'Watch initiated' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0009', severity: 'warning', type: 'Risk Elevation',
      location: 'Aizawl', state: 'Mizoram', lat: 23.73, lng: 92.72,
      risk: 38, message: 'Low-level monitoring advisory',
      population: 2600, roads: 4, schools: 3, hospitals: 2, bridges: 2, villages: 4,
      issued: '8 hr ago', issuedAt: Date.now() - 8*60*60*1000,
      expires: '14 hours', status: 'scheduled',
      factors: [
        { label: 'Heavy Rainfall', value: 15 },
        { label: 'Steep Slope', value: 10 },
        { label: 'High Soil Moisture', value: 8 },
        { label: 'Historical Landslides', value: 3 },
        { label: 'Satellite Anomaly', value: 2 }
      ],
      timeline: [
        { time: '10:00', event: 'Scheduled monitoring' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0010', severity: 'alert', type: 'Risk Elevation',
      location: 'West Siang', state: 'Arunachal Pradesh', lat: 27.22, lng: 94.52,
      risk: 54, message: 'Moderate risk conditions',
      population: 720, roads: 2, schools: 1, hospitals: 0, bridges: 1, villages: 2,
      issued: '10 hr ago', issuedAt: Date.now() - 10*60*60*1000,
      expires: '16 hours', status: 'active',
      factors: [
        { label: 'Heavy Rainfall', value: 18 },
        { label: 'Steep Slope', value: 16 },
        { label: 'High Soil Moisture', value: 11 },
        { label: 'Historical Landslides', value: 6 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '08:00', event: 'Monitoring initiated' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0011', severity: 'watch', type: 'Precautionary Notice',
      location: 'Shillong', state: 'Meghalaya', lat: 25.57, lng: 91.88,
      risk: 22, message: 'Normal monitoring conditions',
      population: 4200, roads: 6, schools: 5, hospitals: 3, bridges: 4, villages: 7,
      issued: '1 day ago', issuedAt: Date.now() - 24*60*60*1000,
      expires: '24 hours', status: 'resolved',
      factors: [
        { label: 'Heavy Rainfall', value: 8 },
        { label: 'Steep Slope', value: 6 },
        { label: 'High Soil Moisture', value: 5 },
        { label: 'Historical Landslides', value: 2 },
        { label: 'Satellite Anomaly', value: 1 }
      ],
      timeline: [
        { time: 'Yesterday 18:00', event: 'Resolved — conditions normalized' },
        { time: 'Yesterday 10:00', event: 'Watch initiated' }
      ],
      assignedOfficer: null, read: true
    },
    {
      id: 'SAH-ALR-0012', severity: 'watch', type: 'Precautionary Notice',
      location: 'Imphal', state: 'Manipur', lat: 24.82, lng: 93.95,
      risk: 18, message: 'Normal monitoring conditions',
      population: 3800, roads: 5, schools: 4, hospitals: 2, bridges: 3, villages: 6,
      issued: '1 day ago', issuedAt: Date.now() - 24*60*60*1000,
      expires: '24 hours', status: 'resolved',
      factors: [
        { label: 'Heavy Rainfall', value: 6 },
        { label: 'Steep Slope', value: 5 },
        { label: 'High Soil Moisture', value: 4 },
        { label: 'Historical Landslides', value: 2 },
        { label: 'Satellite Anomaly', value: 1 }
      ],
      timeline: [
        { time: 'Yesterday 16:00', event: 'Resolved — conditions normalized' }
      ],
      assignedOfficer: null, read: true
    }
  ],
  
  // ===== FIELD REPORTS DATA =====
  fieldReports: [
    {
      id: 'FR-1028', type: 'Soil Movement', location: 'Tawang', state: 'Arunachal Pradesh',
      severity: 'HIGH', officer: 'Rahul Singh', officerRole: 'Field Officer',
      latitude: 27.586, longitude: 91.859,
      submitted: '21 min ago', submittedAt: Date.now() - 21*60*1000,
      status: 'PENDING', aiRisk: 82, fieldAssessment: 'HIGH',
      observation: 'Visible soil movement observed near roadside slope. Minor cracking detected along the road edge. Approximately 15m section affected.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0001',
      photos: ['demo-soil-movement-1']
    },
    {
      id: 'FR-1027', type: 'Road Crack', location: 'East Siang', state: 'Arunachal Pradesh',
      severity: 'MEDIUM', officer: 'M. Das', officerRole: 'Field Officer',
      latitude: 27.22, longitude: 94.52,
      submitted: '45 min ago', submittedAt: Date.now() - 45*60*1000,
      status: 'PENDING', aiRisk: 72, fieldAssessment: 'MEDIUM',
      observation: 'Longitudinal crack along highway edge, approximately 8m length. No immediate collapse risk.',
      aiPredictionMatch: 'partially',
      alertId: 'SAH-ALR-0004',
      photos: ['demo-road-crack-1']
    },
    {
      id: 'FR-1026', type: 'Landslide', location: 'Churachandpur', state: 'Manipur',
      severity: 'CRITICAL', officer: 'L. Guite', officerRole: 'Field Officer',
      latitude: 24.35, longitude: 93.70,
      submitted: '1 hr ago', submittedAt: Date.now() - 60*60*1000,
      status: 'VERIFIED', aiRisk: 92, fieldAssessment: 'CRITICAL',
      observation: 'Active landslide observed. Approximately 40m section of slope failed. Road completely blocked. Two houses at risk.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0002',
      photos: ['demo-landslide-1']
    },
    {
      id: 'FR-1025', type: 'Rockfall', location: 'West Khasi Hills', state: 'Meghalaya',
      severity: 'HIGH', officer: 'P. Lyngdoh', officerRole: 'Field Officer',
      latitude: 25.42, longitude: 91.22,
      submitted: '2 hr ago', submittedAt: Date.now() - 2*60*60*1000,
      status: 'VERIFIED', aiRisk: 68, fieldAssessment: 'HIGH',
      observation: 'Recent rockfall event. Boulders up to 1m diameter on roadway. Slope above shows additional loose material.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0005',
      photos: ['demo-rockfall-1']
    },
    {
      id: 'FR-1024', type: 'Water Seepage', location: 'Upper Subansiri', state: 'Arunachal Pradesh',
      severity: 'MEDIUM', officer: 'R. Singh', officerRole: 'Field Officer',
      latitude: 27.82, longitude: 93.82,
      submitted: '3 hr ago', submittedAt: Date.now() - 3*60*60*1000,
      status: 'PENDING', aiRisk: 76, fieldAssessment: 'MEDIUM',
      observation: 'Multiple seepage points observed on hill slope. Water emerging from 3-4 locations. Soil saturation evident.',
      aiPredictionMatch: 'partially',
      alertId: 'SAH-ALR-0003',
      photos: ['demo-seepage-1']
    },
    {
      id: 'FR-1023', type: 'Blocked Road', location: 'Dima Hasao', state: 'Assam',
      severity: 'HIGH', officer: 'K. Bora', officerRole: 'Field Officer',
      latitude: 25.62, longitude: 93.22,
      submitted: '4 hr ago', submittedAt: Date.now() - 4*60*60*1000,
      status: 'VERIFIED', aiRisk: 62, fieldAssessment: 'HIGH',
      observation: 'Road blocked by debris from minor slope failure. Traffic diverted. Clearing operations underway.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0006',
      photos: ['demo-blocked-road-1']
    },
    {
      id: 'FR-1022', type: 'Soil Movement', location: 'Gangtok', state: 'Sikkim',
      severity: 'MEDIUM', officer: 'T. Bhutia', officerRole: 'Field Officer',
      latitude: 27.35, longitude: 88.64,
      submitted: '5 hr ago', submittedAt: Date.now() - 5*60*60*1000,
      status: 'VERIFIED', aiRisk: 58, fieldAssessment: 'MEDIUM',
      observation: 'Minor soil creep observed on residential slope. No immediate risk to structures.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0007',
      photos: ['demo-soil-creep-1']
    },
    {
      id: 'FR-1021', type: 'Inspection', location: 'Kohima', state: 'Nagaland',
      severity: 'LOW', officer: 'A. Kikon', officerRole: 'Field Officer',
      latitude: 25.69, longitude: 94.13,
      submitted: '6 hr ago', submittedAt: Date.now() - 6*60*60*1000,
      status: 'VERIFIED', aiRisk: 45, fieldAssessment: 'LOW',
      observation: 'Routine inspection completed. No signs of instability. Vegetation cover intact.',
      aiPredictionMatch: 'no',
      alertId: 'SAH-ALR-0008',
      photos: []
    },
    {
      id: 'FR-1020', type: 'Road Crack', location: 'West Siang', state: 'Arunachal Pradesh',
      severity: 'MEDIUM', officer: 'K. Bora', officerRole: 'Field Officer',
      latitude: 27.22, longitude: 94.52,
      submitted: '8 hr ago', submittedAt: Date.now() - 8*60*60*1000,
      status: 'PENDING', aiRisk: 54, fieldAssessment: 'MEDIUM',
      observation: 'Transverse cracks observed on road surface. Monitoring recommended.',
      aiPredictionMatch: 'unable',
      alertId: 'SAH-ALR-0010',
      photos: ['demo-road-crack-2']
    },
    {
      id: 'FR-1019', type: 'Other', location: 'Aizawl', state: 'Mizoram',
      severity: 'LOW', officer: 'L. Guite', officerRole: 'Field Officer',
      latitude: 23.73, longitude: 92.72,
      submitted: '10 hr ago', submittedAt: Date.now() - 10*60*60*1000,
      status: 'REJECTED', aiRisk: 38, fieldAssessment: 'LOW',
      observation: 'Reported concern investigated. Found to be normal drainage activity, not slope instability.',
      aiPredictionMatch: 'no',
      alertId: 'SAH-ALR-0009',
      photos: []
    },
    {
      id: 'FR-1018', type: 'Soil Movement', location: 'Tawang', state: 'Arunachal Pradesh',
      severity: 'HIGH', officer: 'R. Singh', officerRole: 'Field Officer',
      latitude: 27.49, longitude: 91.87,
      submitted: '12 hr ago', submittedAt: Date.now() - 12*60*60*1000,
      status: 'VERIFIED', aiRisk: 84, fieldAssessment: 'HIGH',
      observation: 'Continued soil movement in previously identified zone. Monitoring equipment shows acceleration.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0001',
      photos: ['demo-soil-movement-2']
    },
    {
      id: 'FR-1017', type: 'Landslide', location: 'Churachandpur', state: 'Manipur',
      severity: 'CRITICAL', officer: 'L. Guite', officerRole: 'Field Officer',
      latitude: 24.33, longitude: 93.68,
      submitted: '1 day ago', submittedAt: Date.now() - 24*60*60*1000,
      status: 'VERIFIED', aiRisk: 88, fieldAssessment: 'CRITICAL',
      observation: 'Historical landslide reactivated. Major road blockage. Emergency response deployed.',
      aiPredictionMatch: 'yes',
      alertId: 'SAH-ALR-0002',
      photos: ['demo-landslide-2']
    }
  ],
  
  // ===== OFFICERS DATA =====
  officers: [
    { id: 'OFF-001', name: 'Rahul Singh', district: 'Tawang', role: 'Field Officer', status: 'available' },
    { id: 'OFF-002', name: 'M. Das', district: 'East Siang', role: 'Field Officer', status: 'available' },
    { id: 'OFF-003', name: 'K. Bora', district: 'West Siang', role: 'Field Officer', status: 'busy' },
    { id: 'OFF-004', name: 'L. Guite', district: 'Churachandpur', role: 'Field Officer', status: 'available' },
    { id: 'OFF-005', name: 'P. Lyngdoh', district: 'West Khasi Hills', role: 'Field Officer', status: 'available' },
    { id: 'OFF-006', name: 'T. Bhutia', district: 'Gangtok', role: 'Field Officer', status: 'available' },
    { id: 'OFF-007', name: 'A. Kikon', district: 'Kohima', role: 'Field Officer', status: 'available' },
    { id: 'OFF-008', name: 'S. Chhetri', district: 'Upper Subansiri', role: 'Field Officer', status: 'busy' }
  ],
  
  // ===== REPORT TYPES =====
  reportTypes: ['Landslide', 'Road Crack', 'Soil Movement', 'Rockfall', 'Water Seepage', 'Blocked Road', 'Inspection', 'Other'],
  
  // ===== SEVERITY LEVELS =====
  severityLevels: [
    { value: 'LOW', color: 'safe', label: 'LOW' },
    { value: 'MEDIUM', color: 'watch', label: 'MEDIUM' },
    { value: 'HIGH', color: 'alert', label: 'HIGH' },
    { value: 'CRITICAL', color: 'warning', label: 'CRITICAL' }
  ],
  // ===== VERIFICATION DATA =====
verificationItems: [
    {
      id: 'VER-001', reportId: 'FR-1028', alertId: 'SAH-ALR-0001',
      location: 'Tawang', state: 'Arunachal Pradesh',
      lat: 27.586, lng: 91.859,
      aiRisk: 82, aiLevel: 'WARNING', aiProbability: 80.2,
      fieldSeverity: 'HIGH', fieldAssessment: 'HIGH',
      officer: 'Rahul Singh', officerRole: 'Field Officer',
      submitted: '21 min ago', submittedAt: Date.now() - 21*60*1000,
      status: 'PENDING',
      observation: 'Visible soil movement observed near roadside slope. Minor cracking detected along the road edge. Approximately 15m section affected.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 32 },
        { label: 'Steep Slope', value: 24 },
        { label: 'High Soil Moisture', value: 17 },
        { label: 'Historical Landslides', value: 11 },
        { label: 'Satellite Anomaly', value: 6 }
      ],
      timeline: [
        { time: '15:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '16:30', event: 'Field Officer Assigned', status: 'complete' },
        { time: '17:39', event: 'Field Report Submitted', status: 'complete' },
        { time: 'Now', event: 'Evidence Under Review', status: 'current' },
        { time: '—', event: 'Verification Decision', status: 'pending' }
      ]
    },
    {
      id: 'VER-002', reportId: 'FR-1027', alertId: 'SAH-ALR-0004',
      location: 'East Siang', state: 'Arunachal Pradesh',
      lat: 27.22, lng: 94.52,
      aiRisk: 72, aiLevel: 'ALERT', aiProbability: 68.2,
      fieldSeverity: 'MEDIUM', fieldAssessment: 'MEDIUM',
      officer: 'M. Das', officerRole: 'Field Officer',
      submitted: '45 min ago', submittedAt: Date.now() - 45*60*1000,
      status: 'PENDING',
      observation: 'Longitudinal crack along highway edge, approximately 8m length. No immediate collapse risk.',
      aiPredictionMatch: 'partially',
      factors: [
        { label: 'Heavy Rainfall', value: 26 },
        { label: 'Steep Slope', value: 20 },
        { label: 'High Soil Moisture', value: 14 },
        { label: 'Historical Landslides', value: 8 },
        { label: 'Satellite Anomaly', value: 4 }
      ],
      timeline: [
        { time: '14:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '15:15', event: 'Field Officer Assigned', status: 'complete' },
        { time: '17:15', event: 'Field Report Submitted', status: 'complete' },
        { time: 'Now', event: 'Evidence Under Review', status: 'current' },
        { time: '—', event: 'Verification Decision', status: 'pending' }
      ]
    },
    {
      id: 'VER-003', reportId: 'FR-1026', alertId: 'SAH-ALR-0002',
      location: 'Churachandpur', state: 'Manipur',
      lat: 24.35, lng: 93.70,
      aiRisk: 92, aiLevel: 'WARNING', aiProbability: 90.5,
      fieldSeverity: 'CRITICAL', fieldAssessment: 'CRITICAL',
      officer: 'L. Guite', officerRole: 'Field Officer',
      submitted: '1 hr ago', submittedAt: Date.now() - 60*60*1000,
      status: 'VERIFIED',
      observation: 'Active landslide observed. Approximately 40m section of slope failed. Road completely blocked. Two houses at risk.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 36 },
        { label: 'Steep Slope', value: 26 },
        { label: 'High Soil Moisture', value: 18 },
        { label: 'Historical Landslides', value: 12 },
        { label: 'Satellite Anomaly', value: 7 }
      ],
      timeline: [
        { time: '13:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '14:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '15:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '16:00', event: 'Evidence Reviewed', status: 'complete' },
        { time: '17:00', event: 'Prediction Verified ✓', status: 'complete' }
      ]
    },
    {
      id: 'VER-004', reportId: 'FR-1025', alertId: 'SAH-ALR-0005',
      location: 'West Khasi Hills', state: 'Meghalaya',
      lat: 25.42, lng: 91.22,
      aiRisk: 68, aiLevel: 'ALERT', aiProbability: 64.8,
      fieldSeverity: 'HIGH', fieldAssessment: 'HIGH',
      officer: 'P. Lyngdoh', officerRole: 'Field Officer',
      submitted: '2 hr ago', submittedAt: Date.now() - 2*60*60*1000,
      status: 'VERIFIED',
      observation: 'Recent rockfall event. Boulders up to 1m diameter on roadway. Slope above shows additional loose material.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 28 },
        { label: 'Steep Slope', value: 18 },
        { label: 'High Soil Moisture', value: 15 },
        { label: 'Historical Landslides', value: 5 },
        { label: 'Satellite Anomaly', value: 2 }
      ],
      timeline: [
        { time: '12:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '13:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '14:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '15:30', event: 'Evidence Reviewed', status: 'complete' },
        { time: '16:00', event: 'Prediction Verified ✓', status: 'complete' }
      ]
    },
    {
      id: 'VER-005', reportId: 'FR-1024', alertId: 'SAH-ALR-0003',
      location: 'Upper Subansiri', state: 'Arunachal Pradesh',
      lat: 27.82, lng: 93.82,
      aiRisk: 76, aiLevel: 'ALERT', aiProbability: 72.4,
      fieldSeverity: 'MEDIUM', fieldAssessment: 'MEDIUM',
      officer: 'R. Singh', officerRole: 'Field Officer',
      submitted: '3 hr ago', submittedAt: Date.now() - 3*60*60*1000,
      status: 'PENDING',
      observation: 'Multiple seepage points observed on hill slope. Water emerging from 3-4 locations. Soil saturation evident.',
      aiPredictionMatch: 'partially',
      factors: [
        { label: 'Heavy Rainfall', value: 28 },
        { label: 'Steep Slope', value: 22 },
        { label: 'High Soil Moisture', value: 15 },
        { label: 'Historical Landslides', value: 8 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '11:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '12:30', event: 'Field Officer Assigned', status: 'complete' },
        { time: '13:00', event: 'Field Report Submitted', status: 'complete' },
        { time: 'Now', event: 'Evidence Under Review', status: 'current' },
        { time: '—', event: 'Verification Decision', status: 'pending' }
      ]
    },
    {
      id: 'VER-006', reportId: 'FR-1023', alertId: 'SAH-ALR-0006',
      location: 'Dima Hasao', state: 'Assam',
      lat: 25.62, lng: 93.22,
      aiRisk: 62, aiLevel: 'ALERT', aiProbability: 58.6,
      fieldSeverity: 'HIGH', fieldAssessment: 'HIGH',
      officer: 'K. Bora', officerRole: 'Field Officer',
      submitted: '4 hr ago', submittedAt: Date.now() - 4*60*60*1000,
      status: 'VERIFIED',
      observation: 'Road blocked by debris from minor slope failure. Traffic diverted. Clearing operations underway.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 24 },
        { label: 'Steep Slope', value: 16 },
        { label: 'High Soil Moisture', value: 13 },
        { label: 'Historical Landslides', value: 6 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '10:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '11:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '12:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '13:00', event: 'Prediction Verified ✓', status: 'complete' }
      ]
    },
    {
      id: 'VER-007', reportId: 'FR-1022', alertId: 'SAH-ALR-0007',
      location: 'Gangtok', state: 'Sikkim',
      lat: 27.35, lng: 88.64,
      aiRisk: 58, aiLevel: 'WATCH', aiProbability: 52.4,
      fieldSeverity: 'MEDIUM', fieldAssessment: 'MEDIUM',
      officer: 'T. Bhutia', officerRole: 'Field Officer',
      submitted: '5 hr ago', submittedAt: Date.now() - 5*60*60*1000,
      status: 'VERIFIED',
      observation: 'Minor soil creep observed on residential slope. No immediate risk to structures.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 22 },
        { label: 'Steep Slope', value: 16 },
        { label: 'High Soil Moisture', value: 12 },
        { label: 'Historical Landslides', value: 5 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '09:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '10:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '11:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '13:00', event: 'Prediction Verified ✓', status: 'complete' }
      ]
    },
    {
      id: 'VER-008', reportId: 'FR-1021', alertId: 'SAH-ALR-0008',
      location: 'Kohima', state: 'Nagaland',
      lat: 25.69, lng: 94.13,
      aiRisk: 45, aiLevel: 'WATCH', aiProbability: 40.2,
      fieldSeverity: 'LOW', fieldAssessment: 'LOW',
      officer: 'A. Kikon', officerRole: 'Field Officer',
      submitted: '6 hr ago', submittedAt: Date.now() - 6*60*60*1000,
      status: 'REJECTED',
      observation: 'Routine inspection completed. No signs of instability. Vegetation cover intact.',
      aiPredictionMatch: 'no',
      factors: [
        { label: 'Heavy Rainfall', value: 18 },
        { label: 'Steep Slope', value: 12 },
        { label: 'High Soil Moisture', value: 9 },
        { label: 'Historical Landslides', value: 4 },
        { label: 'Satellite Anomaly', value: 2 }
      ],
      timeline: [
        { time: '08:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '09:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '10:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '12:00', event: 'Prediction Rejected ✗', status: 'complete' }
      ]
    },
    {
      id: 'VER-009', reportId: 'FR-1020', alertId: 'SAH-ALR-0010',
      location: 'West Siang', state: 'Arunachal Pradesh',
      lat: 27.22, lng: 94.52,
      aiRisk: 54, aiLevel: 'WATCH', aiProbability: 48.6,
      fieldSeverity: 'MEDIUM', fieldAssessment: 'MEDIUM',
      officer: 'K. Bora', officerRole: 'Field Officer',
      submitted: '8 hr ago', submittedAt: Date.now() - 8*60*60*1000,
      status: 'INSPECTION_REQUESTED',
      observation: 'Transverse cracks observed on road surface. Monitoring recommended.',
      aiPredictionMatch: 'unable',
      factors: [
        { label: 'Heavy Rainfall', value: 18 },
        { label: 'Steep Slope', value: 16 },
        { label: 'High Soil Moisture', value: 11 },
        { label: 'Historical Landslides', value: 6 },
        { label: 'Satellite Anomaly', value: 3 }
      ],
      timeline: [
        { time: '06:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '07:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '08:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '10:00', event: 'Re-inspection Requested', status: 'complete' },
        { time: '—', event: 'Awaiting Re-inspection', status: 'current' }
      ]
    },
    {
      id: 'VER-010', reportId: 'FR-1019', alertId: 'SAH-ALR-0009',
      location: 'Aizawl', state: 'Mizoram',
      lat: 23.73, lng: 92.72,
      aiRisk: 38, aiLevel: 'WATCH', aiProbability: 32.8,
      fieldSeverity: 'LOW', fieldAssessment: 'LOW',
      officer: 'L. Guite', officerRole: 'Field Officer',
      submitted: '10 hr ago', submittedAt: Date.now() - 10*60*60*1000,
      status: 'REJECTED',
      observation: 'Reported concern investigated. Found to be normal drainage activity, not slope instability.',
      aiPredictionMatch: 'no',
      factors: [
        { label: 'Heavy Rainfall', value: 15 },
        { label: 'Steep Slope', value: 10 },
        { label: 'High Soil Moisture', value: 8 },
        { label: 'Historical Landslides', value: 3 },
        { label: 'Satellite Anomaly', value: 2 }
      ],
      timeline: [
        { time: '04:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '06:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '08:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '10:00', event: 'Prediction Rejected ✗', status: 'complete' }
      ]
    },
    {
      id: 'VER-011', reportId: 'FR-1018', alertId: 'SAH-ALR-0001',
      location: 'Tawang', state: 'Arunachal Pradesh',
      lat: 27.49, lng: 91.87,
      aiRisk: 84, aiLevel: 'WARNING', aiProbability: 82.4,
      fieldSeverity: 'HIGH', fieldAssessment: 'HIGH',
      officer: 'R. Singh', officerRole: 'Field Officer',
      submitted: '12 hr ago', submittedAt: Date.now() - 12*60*60*1000,
      status: 'VERIFIED',
      observation: 'Continued soil movement in previously identified zone. Monitoring equipment shows acceleration.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 32 },
        { label: 'Steep Slope', value: 24 },
        { label: 'High Soil Moisture', value: 17 },
        { label: 'Historical Landslides', value: 11 },
        { label: 'Satellite Anomaly', value: 6 }
      ],
      timeline: [
        { time: '02:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: '04:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: '06:00', event: 'Field Report Submitted', status: 'complete' },
        { time: '08:00', event: 'Prediction Verified ✓', status: 'complete' }
      ]
    },
    {
      id: 'VER-012', reportId: 'FR-1017', alertId: 'SAH-ALR-0002',
      location: 'Churachandpur', state: 'Manipur',
      lat: 24.33, lng: 93.68,
      aiRisk: 88, aiLevel: 'WARNING', aiProbability: 86.2,
      fieldSeverity: 'CRITICAL', fieldAssessment: 'CRITICAL',
      officer: 'L. Guite', officerRole: 'Field Officer',
      submitted: '1 day ago', submittedAt: Date.now() - 24*60*60*1000,
      status: 'VERIFIED',
      observation: 'Historical landslide reactivated. Major road blockage. Emergency response deployed.',
      aiPredictionMatch: 'yes',
      factors: [
        { label: 'Heavy Rainfall', value: 36 },
        { label: 'Steep Slope', value: 26 },
        { label: 'High Soil Moisture', value: 18 },
        { label: 'Historical Landslides', value: 12 },
        { label: 'Satellite Anomaly', value: 7 }
      ],
      timeline: [
        { time: 'Yesterday 08:00', event: 'AI Prediction Generated', status: 'complete' },
        { time: 'Yesterday 10:00', event: 'Field Officer Assigned', status: 'complete' },
        { time: 'Yesterday 12:00', event: 'Field Report Submitted', status: 'complete' },
        { time: 'Yesterday 14:00', event: 'Prediction Verified ✓', status: 'complete' }
      ]
    }
  ],
  // ===== MONITORING DATA =====
monitoringLocations: ['Tawang', 'East Siang', 'West Siang', 'Itanagar', 'Gangtok', 'Shillong', 'Aizawl', 'Kohima', 'Imphal', 'Agartala', 'Guwahati'],

historicalEvents: [
  { id: 'LS-1042', location: 'Tawang', state: 'Arunachal Pradesh', lat: 27.49, lng: 91.87, date: '12 Jul 2024', year: 2024, season: 'Monsoon', severity: 'HIGH', cause: 'Heavy Rainfall', damage: 'Road Blockage', source: 'Demo Dataset' },
  { id: 'LS-1041', location: 'Churachandpur', state: 'Manipur', lat: 24.35, lng: 93.70, date: '09 Aug 2024', year: 2024, season: 'Monsoon', severity: 'CRITICAL', cause: 'Extreme Rainfall', damage: 'Multiple structures', source: 'Demo Dataset' },
  { id: 'LS-1040', location: 'East Siang', state: 'Arunachal Pradesh', lat: 27.22, lng: 94.52, date: '28 Jun 2024', year: 2024, season: 'Pre-Monsoon', severity: 'MODERATE', cause: 'Prolonged Rainfall', damage: 'Partial road damage', source: 'Demo Dataset' },
  { id: 'LS-1039', location: 'West Khasi Hills', state: 'Meghalaya', lat: 25.42, lng: 91.22, date: '15 Aug 2023', year: 2023, season: 'Monsoon', severity: 'HIGH', cause: 'Extreme Rainfall', damage: 'Village access cut', source: 'Demo Dataset' },
  { id: 'LS-1038', location: 'Upper Subansiri', state: 'Arunachal Pradesh', lat: 27.82, lng: 93.82, date: '03 Sep 2023', year: 2023, season: 'Monsoon', severity: 'MODERATE', cause: 'Soil Saturation', damage: 'Agricultural land', source: 'Demo Dataset' },
  { id: 'LS-1037', location: 'Dima Hasao', state: 'Assam', lat: 25.62, lng: 93.22, date: '22 Jul 2023', year: 2023, season: 'Monsoon', severity: 'HIGH', cause: 'Rainfall + Steep Slope', damage: 'Highway blocked 18h', source: 'Demo Dataset' },
  { id: 'LS-1036', location: 'Gangtok', state: 'Sikkim', lat: 27.35, lng: 88.64, date: '04 Oct 2023', year: 2023, season: 'Post-Monsoon', severity: 'MODERATE', cause: 'Rainfall + Seismic', damage: 'Minor road damage', source: 'Demo Dataset' },
  { id: 'LS-1035', location: 'Kohima', state: 'Nagaland', lat: 25.69, lng: 94.13, date: '17 Jun 2024', year: 2024, season: 'Pre-Monsoon', severity: 'LOW', cause: 'Moderate Rainfall', damage: 'Slope erosion', source: 'Demo Dataset' },
  { id: 'LS-1034', location: 'Aizawl', state: 'Mizoram', lat: 23.73, lng: 92.72, date: '25 May 2023', year: 2023, season: 'Pre-Monsoon', severity: 'MODERATE', cause: 'Heavy Rainfall', damage: 'Road damage', source: 'Demo Dataset' },
  { id: 'LS-1033', location: 'Shillong', state: 'Meghalaya', lat: 25.57, lng: 91.88, date: '14 Jun 2022', year: 2022, season: 'Pre-Monsoon', severity: 'MODERATE', cause: 'Heavy Rainfall', damage: 'Local road blockage', source: 'Demo Dataset' },
  { id: 'LS-1032', location: 'Imphal', state: 'Manipur', lat: 24.82, lng: 93.95, date: '08 Jul 2022', year: 2022, season: 'Monsoon', severity: 'LOW', cause: 'Moderate Rainfall', damage: 'Minor erosion', source: 'Demo Dataset' },
  { id: 'LS-1031', location: 'Tawang', state: 'Arunachal Pradesh', lat: 27.48, lng: 91.86, date: '19 Aug 2022', year: 2022, season: 'Monsoon', severity: 'HIGH', cause: 'Extreme Rainfall', damage: 'Road + houses', source: 'Demo Dataset' },
  { id: 'LS-1030', location: 'West Siang', state: 'Arunachal Pradesh', lat: 27.22, lng: 94.52, date: '05 Sep 2021', year: 2021, season: 'Monsoon', severity: 'MODERATE', cause: 'Prolonged Rainfall', damage: 'Agricultural loss', source: 'Demo Dataset' },
  { id: 'LS-1029', location: 'Churachandpur', state: 'Manipur', lat: 24.34, lng: 93.69, date: '22 Jul 2021', year: 2021, season: 'Monsoon', severity: 'CRITICAL', cause: 'Extreme Rainfall', damage: 'Major infrastructure', source: 'Demo Dataset' },
  { id: 'LS-1028', location: 'Gangtok', state: 'Sikkim', lat: 27.34, lng: 88.63, date: '11 Oct 2021', year: 2021, season: 'Post-Monsoon', severity: 'MODERATE', cause: 'Rainfall', damage: 'Road damage', source: 'Demo Dataset' },
  { id: 'LS-1027', location: 'East Siang', state: 'Arunachal Pradesh', lat: 27.21, lng: 94.51, date: '15 Jun 2025', year: 2025, season: 'Pre-Monsoon', severity: 'HIGH', cause: 'Heavy Rainfall', damage: 'Road blockage', source: 'Demo Dataset' },
  { id: 'LS-1026', location: 'West Khasi Hills', state: 'Meghalaya', lat: 25.41, lng: 91.21, date: '28 Jul 2025', year: 2025, season: 'Monsoon', severity: 'CRITICAL', cause: 'Extreme Rainfall', damage: 'Village isolated', source: 'Demo Dataset' },
  { id: 'LS-1025', location: 'Dima Hasao', state: 'Assam', lat: 25.61, lng: 93.21, date: '09 Aug 2025', year: 2025, season: 'Monsoon', severity: 'HIGH', cause: 'Rainfall + Slope', damage: 'Highway blocked', source: 'Demo Dataset' },
  { id: 'LS-1024', location: 'Upper Subansiri', state: 'Arunachal Pradesh', lat: 27.81, lng: 93.81, date: '20 Sep 2025', year: 2025, season: 'Post-Monsoon', severity: 'MODERATE', cause: 'Soil Saturation', damage: 'Agricultural land', source: 'Demo Dataset' },
  { id: 'LS-1023', location: 'Tawang', state: 'Arunachal Pradesh', lat: 27.47, lng: 91.85, date: '03 Feb 2023', year: 2023, season: 'Winter', severity: 'LOW', cause: 'Freeze-Thaw', damage: 'Minor erosion', source: 'Demo Dataset' }
],

monitoringData: {
  'Tawang': {
    rainfall: { current: 42, h24: 112, h48: 198, h72: 286, h7day: 412, threshold: 250, exceeded: true, exceedPct: 23,
      hourly: [2,3,5,8,12,15,18,14,10,8,6,4,3,5,8,12,16,20,24,22,18,14,10,6],
      accumulated: [2,5,10,18,30,45,63,77,87,95,101,105,108,113,121,133,149,169,193,215,233,247,257,263]
    },
    terrain: { soilMoisture: 81, slope: 41, elevation: 2100, stability: 'REDUCED', soilType: 'Mountain Soil — Demo', aspect: 'North-East', curvature: 'Moderate',
      normal: { soilMoisture: 58, slope: 35 }
    },
    satellite: { ndvi: 'Change Detected', ndwi: 'Stable', surface: 'Detected', sar: 'Elevated', vegetation: 'Moderate',
      vegetationPct: 78, surfaceStabilityPct: 61, waterSoilPct: 72, anomaly: true
    },
    historical: { total: 18, critical: 3, high: 7, moderate: 6, low: 2, byYear: { 2021: 2, 2022: 3, 2023: 4, 2024: 5, 2025: 4 } }
  },
  'East Siang': {
    rainfall: { current: 28, h24: 78, h48: 142, h72: 198, h7day: 286, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [1,2,3,4,6,8,10,9,7,5,4,3,2,4,6,8,10,12,14,13,11,9,7,5],
      accumulated: [1,3,6,10,16,24,34,43,50,55,59,62,64,68,74,82,92,104,118,131,142,151,158,163]
    },
    terrain: { soilMoisture: 74, slope: 36, elevation: 1800, stability: 'MODERATE', soilType: 'Loamy Soil — Demo', aspect: 'South-East', curvature: 'Low',
      normal: { soilMoisture: 52, slope: 32 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'Detected', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 84, surfaceStabilityPct: 72, waterSoilPct: 65, anomaly: false
    },
    historical: { total: 12, critical: 1, high: 4, moderate: 5, low: 2, byYear: { 2021: 1, 2022: 2, 2023: 3, 2024: 3, 2025: 3 } }
  },
  'West Siang': {
    rainfall: { current: 18, h24: 54, h48: 98, h72: 142, h7day: 210, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [1,1,2,3,4,5,6,5,4,3,2,2,1,2,3,4,5,6,7,6,5,4,3,2],
      accumulated: [1,2,4,7,11,16,22,27,31,34,36,38,39,41,44,48,53,59,66,72,77,81,84,86]
    },
    terrain: { soilMoisture: 62, slope: 30, elevation: 1500, stability: 'STABLE', soilType: 'Red Soil — Demo', aspect: 'East', curvature: 'Low',
      normal: { soilMoisture: 48, slope: 28 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 91, surfaceStabilityPct: 85, waterSoilPct: 54, anomaly: false
    },
    historical: { total: 8, critical: 0, high: 2, moderate: 4, low: 2, byYear: { 2021: 1, 2022: 1, 2023: 2, 2024: 2, 2025: 2 } }
  },
  'Itanagar': {
    rainfall: { current: 12, h24: 38, h48: 68, h72: 98, h7day: 156, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,1,1,2,3,4,5,4,3,2,1,1,0,1,2,3,4,5,6,5,4,3,2,1],
      accumulated: [0,1,2,4,7,11,16,20,23,25,26,27,27,28,30,33,37,42,48,53,57,60,62,63]
    },
    terrain: { soilMoisture: 54, slope: 22, elevation: 440, stability: 'STABLE', soilType: 'Alluvial — Demo', aspect: 'South', curvature: 'Low',
      normal: { soilMoisture: 42, slope: 20 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 94, surfaceStabilityPct: 92, waterSoilPct: 48, anomaly: false
    },
    historical: { total: 5, critical: 0, high: 1, moderate: 3, low: 1, byYear: { 2021: 0, 2022: 1, 2023: 1, 2024: 2, 2025: 1 } }
  },
  'Gangtok': {
    rainfall: { current: 22, h24: 56, h48: 102, h72: 142, h7day: 224, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [1,2,2,3,4,5,6,5,4,3,2,2,1,2,3,4,5,6,7,6,5,4,3,2],
      accumulated: [1,3,5,8,12,17,23,28,32,35,37,39,40,42,45,49,54,60,67,73,78,82,85,87]
    },
    terrain: { soilMoisture: 62, slope: 32, elevation: 1650, stability: 'MODERATE', soilType: 'Mountain Soil — Demo', aspect: 'North', curvature: 'Moderate',
      normal: { soilMoisture: 48, slope: 28 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 88, surfaceStabilityPct: 78, waterSoilPct: 58, anomaly: false
    },
    historical: { total: 10, critical: 1, high: 3, moderate: 4, low: 2, byYear: { 2021: 2, 2022: 2, 2023: 2, 2024: 2, 2025: 2 } }
  },
  'Shillong': {
    rainfall: { current: 8, h24: 22, h48: 42, h72: 64, h7day: 112, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,0,1,1,2,2,3,2,2,1,1,0,0,1,1,2,2,3,3,2,2,1,1,0],
      accumulated: [0,0,1,2,4,6,9,11,13,14,15,15,15,16,17,19,21,24,27,29,31,32,33,33]
    },
    terrain: { soilMoisture: 42, slope: 18, elevation: 1500, stability: 'STABLE', soilType: 'Laterite — Demo', aspect: 'West', curvature: 'Low',
      normal: { soilMoisture: 38, slope: 16 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 96, surfaceStabilityPct: 94, waterSoilPct: 42, anomaly: false
    },
    historical: { total: 6, critical: 0, high: 1, moderate: 3, low: 2, byYear: { 2021: 1, 2022: 1, 2023: 1, 2024: 2, 2025: 1 } }
  },
  'Aizawl': {
    rainfall: { current: 14, h24: 38, h48: 68, h72: 98, h7day: 164, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,1,1,2,3,4,4,3,3,2,1,1,0,1,2,3,4,4,5,4,3,2,1,1],
      accumulated: [0,1,2,4,7,11,15,18,21,23,24,25,25,26,28,31,35,39,44,48,51,53,54,55]
    },
    terrain: { soilMoisture: 54, slope: 26, elevation: 1200, stability: 'STABLE', soilType: 'Loamy Soil — Demo', aspect: 'South-East', curvature: 'Low',
      normal: { soilMoisture: 44, slope: 24 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 92, surfaceStabilityPct: 88, waterSoilPct: 50, anomaly: false
    },
    historical: { total: 7, critical: 0, high: 2, moderate: 3, low: 2, byYear: { 2021: 1, 2022: 1, 2023: 2, 2024: 2, 2025: 1 } }
  },
  'Kohima': {
    rainfall: { current: 16, h24: 42, h48: 78, h72: 112, h7day: 186, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,1,1,2,3,4,5,4,3,2,2,1,1,2,3,4,5,5,6,5,4,3,2,1],
      accumulated: [0,1,2,4,7,11,16,20,23,25,27,28,29,31,34,38,43,48,54,59,63,66,68,69]
    },
    terrain: { soilMoisture: 58, slope: 28, elevation: 1450, stability: 'STABLE', soilType: 'Mountain Soil — Demo', aspect: 'North-East', curvature: 'Low',
      normal: { soilMoisture: 46, slope: 26 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 90, surfaceStabilityPct: 86, waterSoilPct: 52, anomaly: false
    },
    historical: { total: 9, critical: 0, high: 2, moderate: 5, low: 2, byYear: { 2021: 1, 2022: 2, 2023: 2, 2024: 2, 2025: 2 } }
  },
  'Imphal': {
    rainfall: { current: 6, h24: 18, h48: 34, h72: 52, h7day: 94, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,0,0,1,1,2,2,2,1,1,0,0,0,0,1,1,2,2,2,1,1,0,0,0],
      accumulated: [0,0,0,1,2,4,6,8,9,10,10,10,10,10,11,12,14,16,18,19,20,20,20,20]
    },
    terrain: { soilMoisture: 38, slope: 15, elevation: 786, stability: 'STABLE', soilType: 'Alluvial — Demo', aspect: 'South', curvature: 'Low',
      normal: { soilMoisture: 34, slope: 14 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 95, surfaceStabilityPct: 93, waterSoilPct: 38, anomaly: false
    },
    historical: { total: 4, critical: 0, high: 1, moderate: 2, low: 1, byYear: { 2021: 0, 2022: 1, 2023: 1, 2024: 1, 2025: 1 } }
  },
  'Agartala': {
    rainfall: { current: 4, h24: 14, h48: 28, h72: 42, h7day: 78, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,0,0,0,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
      accumulated: [0,0,0,0,1,2,3,4,5,5,5,5,5,5,6,7,8,9,10,11,11,11,11,11]
    },
    terrain: { soilMoisture: 34, slope: 12, elevation: 25, stability: 'STABLE', soilType: 'Alluvial — Demo', aspect: 'South', curvature: 'Low',
      normal: { soilMoisture: 30, slope: 10 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 97, surfaceStabilityPct: 95, waterSoilPct: 34, anomaly: false
    },
    historical: { total: 2, critical: 0, high: 0, moderate: 1, low: 1, byYear: { 2021: 0, 2022: 0, 2023: 1, 2024: 1, 2025: 0 } }
  },
  'Guwahati': {
    rainfall: { current: 10, h24: 24, h48: 46, h72: 68, h7day: 124, threshold: 250, exceeded: false, exceedPct: 0,
      hourly: [0,0,1,1,2,2,3,2,2,1,1,0,0,1,1,2,2,3,3,2,2,1,1,0],
      accumulated: [0,0,1,2,4,6,9,11,13,14,15,15,15,16,17,19,21,24,27,29,31,32,33,33]
    },
    terrain: { soilMoisture: 46, slope: 16, elevation: 55, stability: 'STABLE', soilType: 'Alluvial — Demo', aspect: 'South', curvature: 'Low',
      normal: { soilMoisture: 40, slope: 14 }
    },
    satellite: { ndvi: 'Stable', ndwi: 'Stable', surface: 'None', sar: 'Normal', vegetation: 'Stable',
      vegetationPct: 93, surfaceStabilityPct: 91, waterSoilPct: 46, anomaly: false
    },
    historical: { total: 6, critical: 0, high: 1, moderate: 3, low: 2, byYear: { 2021: 1, 2022: 1, 2023: 1, 2024: 2, 2025: 1 } }
  },
routes: {
    'Tawang-Itanagar': {
        id: 'ROUTE-001',
        start: 'Tawang',
        destination: 'Itanagar',
        primary: {
            name: 'Route A (NH-13)',
            distance: 148,
            time: 195, // minutes
            overallRisk: 62,
            level: 'HIGH',
            waypoints: [
                [27.47, 91.86], [27.42, 92.05], [27.35, 92.28],
                [27.28, 92.55], [27.20, 92.85], [27.15, 93.20],
                [27.10, 93.62]
            ],
            segments: [
                { id: 'SEG-001-A', name: 'Tawang - Bomdila', risk: 78, level: 'HIGH', distance: 22, reason: 'Steep terrain + historical landslides', factors: { rainfall: 18, slope: 26, soil: 14, historical: 14, satellite: 6 } },
                { id: 'SEG-001-B', name: 'Bomdila - Dirang', risk: 68, level: 'HIGH', distance: 28, reason: 'Elevated rainfall + steep slope', factors: { rainfall: 22, slope: 20, soil: 12, historical: 10, satellite: 4 } },
                { id: 'SEG-001-C', name: 'Dirang - Nizulam', risk: 52, level: 'WATCH', distance: 32, reason: 'Moderate rainfall + winding road', factors: { rainfall: 16, slope: 14, soil: 10, historical: 8, satellite: 4 } },
                { id: 'SEG-001-D', name: 'Nizulam - Bhalukpong', risk: 38, level: 'WATCH', distance: 34, reason: 'Elevated soil moisture', factors: { rainfall: 12, slope: 10, soil: 10, historical: 4, satellite: 2 } },
                { id: 'SEG-001-E', name: 'Bhalukpong - Itanagar', risk: 28, level: 'SAFE', distance: 32, reason: 'Low elevation, stable terrain', factors: { rainfall: 8, slope: 6, soil: 8, historical: 4, satellite: 2 } }
            ]
        },
        alternative: {
            name: 'Route B (via Tezpur)',
            distance: 172,
            time: 225,
            overallRisk: 44,
            level: 'WATCH',
            waypoints: [
                [27.47, 91.86], [27.38, 91.95], [27.25, 92.10],
                [27.10, 92.35], [26.95, 92.65], [26.85, 93.00],
                [26.95, 93.35], [27.10, 93.62]
            ],
            segments: [
                { id: 'SEG-001-A2', name: 'Tawang - Jang', risk: 58, level: 'WATCH', distance: 28, reason: 'High altitude + rainfall', factors: { rainfall: 18, slope: 18, soil: 10, historical: 8, satellite: 4 } },
                { id: 'SEG-001-B2', name: 'Jang - Tenga Valley', risk: 42, level: 'WATCH', distance: 32, reason: 'Moderate slope', factors: { rainfall: 14, slope: 12, soil: 8, historical: 6, satellite: 2 } },
                { id: 'SEG-001-C2', name: 'Tenga - Bhalukpong', risk: 38, level: 'WATCH', distance: 34, reason: 'Winding ghat section', factors: { rainfall: 12, slope: 10, soil: 8, historical: 6, satellite: 2 } },
                { id: 'SEG-001-D2', name: 'Bhalukpong - Tezpur', risk: 32, level: 'WATCH', distance: 42, reason: 'Foothill transition', factors: { rainfall: 10, slope: 8, soil: 8, historical: 4, satellite: 2 } },
                { id: 'SEG-001-E2', name: 'Tezpur - Itanagar', risk: 22, level: 'SAFE', distance: 36, reason: 'Plains, stable terrain', factors: { rainfall: 6, slope: 4, soil: 6, historical: 4, satellite: 2 } }
            ]
        },
        riskFactors: [
            { label: 'Steep Terrain', value: 28, description: 'Multiple high-altitude ghat sections' },
            { label: 'Elevated Rainfall', value: 22, description: 'Monsoon-heavy region' },
            { label: 'Historical Landslides', value: 18, description: 'Known landslide corridors' },
            { label: 'Soil Moisture', value: 14, description: 'Elevated saturation in upper reaches' },
            { label: 'Satellite Anomaly', value: 8, description: 'Minor surface changes detected' }
        ]
    },
    'Gangtok-Guwahati': {
        id: 'ROUTE-002',
        start: 'Gangtok',
        destination: 'Guwahati',
        primary: {
            name: 'Route A (NH-10)',
            distance: 245,
            time: 320,
            overallRisk: 48,
            level: 'WATCH',
            waypoints: [
                [27.33, 88.62], [27.15, 88.75], [26.95, 88.95],
                [26.75, 89.25], [26.55, 89.65], [26.40, 90.15],
                [26.25, 90.85], [26.14, 91.74]
            ],
            segments: [
                { id: 'SEG-002-A', name: 'Gangtok - Melli', risk: 58, level: 'WATCH', distance: 32, reason: 'Steep mountain descent', factors: { rainfall: 16, slope: 18, soil: 10, historical: 10, satellite: 4 } },
                { id: 'SEG-002-B', name: 'Melli - Kalimpong', risk: 42, level: 'WATCH', distance: 38, reason: 'Moderate terrain', factors: { rainfall: 12, slope: 12, soil: 8, historical: 8, satellite: 2 } },
                { id: 'SEG-002-C', name: 'Kalimpong - Jalpaiguri', risk: 32, level: 'WATCH', distance: 48, reason: 'Foothill transition', factors: { rainfall: 10, slope: 8, soil: 8, historical: 4, satellite: 2 } },
                { id: 'SEG-002-D', name: 'Jalpaiguri - Goalpara', risk: 22, level: 'SAFE', distance: 72, reason: 'Plains, stable', factors: { rainfall: 6, slope: 4, soil: 6, historical: 4, satellite: 2 } },
                { id: 'SEG-002-E', name: 'Goalpara - Guwahati', risk: 18, level: 'SAFE', distance: 55, reason: 'Flat terrain', factors: { rainfall: 4, slope: 4, soil: 4, historical: 4, satellite: 2 } }
            ]
        },
        alternative: {
            name: 'Route B (via Siliguri)',
            distance: 268,
            time: 348,
            overallRisk: 38,
            level: 'WATCH',
            waypoints: [
                [27.33, 88.62], [27.05, 88.50], [26.72, 88.40],
                [26.50, 88.70], [26.45, 89.30], [26.40, 90.15],
                [26.25, 90.85], [26.14, 91.74]
            ],
            segments: [
                { id: 'SEG-002-A2', name: 'Gangtok - Rangpo', risk: 48, level: 'WATCH', distance: 38, reason: 'Mountain descent', factors: { rainfall: 14, slope: 14, soil: 8, historical: 8, satellite: 4 } },
                { id: 'SEG-002-B2', name: 'Rangpo - Siliguri', risk: 32, level: 'WATCH', distance: 58, reason: 'Moderate terrain', factors: { rainfall: 10, slope: 8, soil: 8, historical: 4, satellite: 2 } },
                { id: 'SEG-002-C2', name: 'Siliguri - Goalpara', risk: 24, level: 'SAFE', distance: 105, reason: 'Plains', factors: { rainfall: 6, slope: 4, soil: 8, historical: 4, satellite: 2 } },
                { id: 'SEG-002-D2', name: 'Goalpara - Guwahati', risk: 18, level: 'SAFE', distance: 67, reason: 'Flat terrain', factors: { rainfall: 4, slope: 4, soil: 4, historical: 4, satellite: 2 } }
            ]
        },
        riskFactors: [
            { label: 'Mountain Descent', value: 22, description: 'Initial steep sections from Gangtok' },
            { label: 'Rainfall', value: 16, description: 'Moderate rainfall in upper reaches' },
            { label: 'Historical Patterns', value: 12, description: 'Some known landslide zones' },
            { label: 'Soil Moisture', value: 10, description: 'Elevated in Sikkim sections' },
            { label: 'Satellite', value: 4, description: 'Minor anomalies' }
        ]
    },
    'Shillong-Guwahati': {
        id: 'ROUTE-003',
        start: 'Shillong',
        destination: 'Guwahati',
        primary: {
            name: 'Route A (NH-6)',
            distance: 105,
            time: 150,
            overallRisk: 32,
            level: 'WATCH',
            waypoints: [
                [25.57, 91.88], [25.65, 91.72], [25.80, 91.55],
                [25.95, 91.45], [26.05, 91.55], [26.14, 91.74]
            ],
            segments: [
                { id: 'SEG-003-A', name: 'Shillong - Jorabat', risk: 42, level: 'WATCH', distance: 28, reason: 'Plateau descent', factors: { rainfall: 12, slope: 12, soil: 8, historical: 8, satellite: 2 } },
                { id: 'SEG-003-B', name: 'Jorabat - Khanapara', risk: 28, level: 'SAFE', distance: 32, reason: 'Moderate terrain', factors: { rainfall: 8, slope: 8, soil: 6, historical: 4, satellite: 2 } },
                { id: 'SEG-003-C', name: 'Khanapara - Guwahati', risk: 18, level: 'SAFE', distance: 45, reason: 'Plains, stable', factors: { rainfall: 4, slope: 4, soil: 4, historical: 4, satellite: 2 } }
            ]
        },
        alternative: {
            name: 'Route B (via Nongpoh)',
            distance: 118,
            time: 168,
            overallRisk: 26,
            level: 'SAFE',
            waypoints: [
                [25.57, 91.88], [25.55, 92.05], [25.65, 92.15],
                [25.85, 92.00], [26.00, 91.85], [26.14, 91.74]
            ],
            segments: [
                { id: 'SEG-003-A2', name: 'Shillong - Nongpoh', risk: 32, level: 'WATCH', distance: 35, reason: 'Plateau edge', factors: { rainfall: 10, slope: 10, soil: 6, historical: 4, satellite: 2 } },
                { id: 'SEG-003-B2', name: 'Nongpoh - Rani', risk: 22, level: 'SAFE', distance: 42, reason: 'Moderate terrain', factors: { rainfall: 6, slope: 8, soil: 4, historical: 4, satellite: 0 } },
                { id: 'SEG-003-C2', name: 'Rani - Guwahati', risk: 18, level: 'SAFE', distance: 41, reason: 'Plains', factors: { rainfall: 4, slope: 4, soil: 4, historical: 4, satellite: 2 } }
            ]
        },
        riskFactors: [
            { label: 'Plateau Descent', value: 14, description: 'Initial ghat section from Shillong' },
            { label: 'Rainfall', value: 10, description: 'Moderate monsoon impact' },
            { label: 'Historical', value: 8, description: 'Some past incidents' },
            { label: 'Soil Moisture', value: 6, description: 'Elevated in upper reaches' },
            { label: 'Satellite', value: 2, description: 'Minimal anomalies' }
        ]
    },
    'Kohima-Imphal': {
        id: 'ROUTE-004',
        start: 'Kohima',
        destination: 'Imphal',
        primary: {
            name: 'Route A (NH-2)',
            distance: 82,
            time: 135,
            overallRisk: 44,
            level: 'WATCH',
            waypoints: [
                [25.67, 94.11], [25.50, 94.05], [25.25, 93.98],
                [25.05, 93.95], [24.90, 93.95], [24.82, 93.95]
            ],
            segments: [
                { id: 'SEG-004-A', name: 'Kohima - Viswema', risk: 52, level: 'WATCH', distance: 18, reason: 'Steep descent', factors: { rainfall: 14, slope: 16, soil: 10, historical: 8, satellite: 4 } },
                { id: 'SEG-004-B', name: 'Viswema - Mao', risk: 58, level: 'WATCH', distance: 22, reason: 'Mountain section', factors: { rainfall: 16, slope: 18, soil: 10, historical: 10, satellite: 4 } },
                { id: 'SEG-004-C', name: 'Mao - Kangpokpi', risk: 38, level: 'WATCH', distance: 22, reason: 'Moderate terrain', factors: { rainfall: 10, slope: 10, soil: 8, historical: 8, satellite: 2 } },
                { id: 'SEG-004-D', name: 'Kangpokpi - Imphal', risk: 22, level: 'SAFE', distance: 20, reason: 'Valley approach', factors: { rainfall: 6, slope: 6, soil: 4, historical: 4, satellite: 2 } }
            ]
        },
        alternative: {
            name: 'Route B (via Meluri)',
            distance: 112,
            time: 175,
            overallRisk: 36,
            level: 'WATCH',
            waypoints: [
                [25.67, 94.11], [25.55, 94.25], [25.35, 94.30],
                [25.15, 94.15], [24.95, 94.05], [24.82, 93.95]
            ],
            segments: [
                { id: 'SEG-004-A2', name: 'Kohima - Pfutsero', risk: 42, level: 'WATCH', distance: 32, reason: 'Moderate terrain', factors: { rainfall: 12, slope: 12, soil: 8, historical: 8, satellite: 2 } },
                { id: 'SEG-004-B2', name: 'Pfutsero - Meluri', risk: 38, level: 'WATCH', distance: 28, reason: 'Hilly section', factors: { rainfall: 10, slope: 10, soil: 8, historical: 8, satellite: 2 } },
                { id: 'SEG-004-C2', name: 'Meluri - Imphal', risk: 26, level: 'SAFE', distance: 52, reason: 'Valley approach', factors: { rainfall: 6, slope: 6, soil: 6, historical: 6, satellite: 2 } }
            ]
        },
        riskFactors: [
            { label: 'Mountain Sections', value: 18, description: 'Steep hills between Kohima and Mao' },
            { label: 'Rainfall', value: 14, description: 'Moderate monsoon' },
            { label: 'Historical', value: 12, description: 'Known landslide corridors' },
            { label: 'Soil Moisture', value: 10, description: 'Elevated in upper reaches' },
            { label: 'Satellite', value: 4, description: 'Minor changes' }
        ]
    }
},

// Route analysis activity
routeActivity: [
    { type: 'info', icon: '🛣', title: 'Route analyzed', location: 'Tawang → Itanagar', time: '12 min ago' },
    { type: 'alert', icon: '⚠', title: 'High-risk segment flagged', location: 'Bomdila - Dirang', time: '28 min ago' },
    { type: 'action', icon: '🔄', title: 'Alternative route suggested', location: 'Gangtok → Guwahati', time: '1 hr ago' },
    { type: 'success', icon: '✓', title: 'Route verified safe', location: 'Shillong → Guwahati', time: '2 hr ago' }
]
},
// ===== USERS & ROLES DATA =====
roles: [
  {
    id: 'super_admin', name: 'Super Admin',
    description: 'Full system access',
    color: '#6366F1',
    permissions: ['all'],
    userCount: 2
  },
  {
    id: 'disaster_authority', name: 'Disaster Authority',
    description: 'Alerts, risk analysis, infrastructure, reports',
    color: '#0F9D8A',
    permissions: ['dashboard', 'riskMap', 'riskAnalysis', 'alerts', 'fieldReports', 'verification', 'monitoring', 'infrastructure', 'simulator'],
    userCount: 5
  },
  {
    id: 'district_officer', name: 'District Officer',
    description: 'District monitoring and response',
    color: '#19B8C7',
    permissions: ['dashboard', 'riskMap', 'riskAnalysis', 'alerts', 'fieldReports', 'verification'],
    userCount: 8
  },
  {
    id: 'field_officer', name: 'Field Officer',
    description: 'Field reports, GPS, verification',
    color: '#F97316',
    permissions: ['riskMap', 'fieldReports', 'verification'],
    userCount: 18
  },
  {
    id: 'analyst', name: 'Analyst',
    description: 'Analytics, AI model and environmental data',
    color: '#8B5CF6',
    permissions: ['dashboard', 'riskAnalysis', 'monitoring', 'simulator'],
    userCount: 7
  },
  {
    id: 'citizen', name: 'Citizen',
    description: 'Hazard reporting only',
    color: '#64748B',
    permissions: ['fieldReports'],
    userCount: 8
  }
],

permissionLabels: {
  all: 'All Access',
  dashboard: 'Dashboard',
  riskMap: 'Risk Map',
  riskAnalysis: 'Risk Analysis',
  alerts: 'Alerts',
  fieldReports: 'Field Reports',
  verification: 'Verification',
  monitoring: 'Monitoring',
  infrastructure: 'Infrastructure',
  simulator: 'Simulator'
},

users: [
  {
    id: 'USR-001', name: 'Demo Authority', email: 'authority@sahayak.demo',
    role: 'super_admin', region: 'Northeast India', district: 'All',
    status: 'active', lastActive: '2 min ago', lastActiveTs: Date.now() - 2*60*1000,
    incidents: 12, phone: '+91 98XXX XXX01'
  },
  {
    id: 'USR-002', name: 'Rahul Singh', email: 'r.singh@sahayak.demo',
    role: 'field_officer', region: 'Arunachal Pradesh', district: 'Tawang',
    status: 'active', lastActive: '8 min ago', lastActiveTs: Date.now() - 8*60*1000,
    incidents: 24, phone: '+91 98XXX XXX02'
  },
  {
    id: 'USR-003', name: 'Priya Sharma', email: 'p.sharma@sahayak.demo',
    role: 'district_officer', region: 'Arunachal Pradesh', district: 'East Siang',
    status: 'active', lastActive: '21 min ago', lastActiveTs: Date.now() - 21*60*1000,
    incidents: 18, phone: '+91 98XXX XXX03'
  },
  {
    id: 'USR-004', name: 'Amit Das', email: 'a.das@sahayak.demo',
    role: 'field_officer', region: 'Arunachal Pradesh', district: 'East Siang',
    status: 'active', lastActive: '34 min ago', lastActiveTs: Date.now() - 34*60*1000,
    incidents: 15, phone: '+91 98XXX XXX04'
  },
  {
    id: 'USR-005', name: 'Neha Singh', email: 'n.singh@sahayak.demo',
    role: 'analyst', region: 'Northeast India', district: 'All',
    status: 'active', lastActive: '1 hr ago', lastActiveTs: Date.now() - 60*60*1000,
    incidents: 8, phone: '+91 98XXX XXX05'
  },
  {
    id: 'USR-006', name: 'Lhuntlempui Guite', email: 'l.guite@sahayak.demo',
    role: 'field_officer', region: 'Manipur', district: 'Churachandpur',
    status: 'active', lastActive: '42 min ago', lastActiveTs: Date.now() - 42*60*1000,
    incidents: 21, phone: '+91 98XXX XXX06'
  },
  {
    id: 'USR-007', name: 'Pynshai Lyngdoh', email: 'p.lyngdoh@sahayak.demo',
    role: 'field_officer', region: 'Meghalaya', district: 'West Khasi Hills',
    status: 'active', lastActive: '1 hr ago', lastActiveTs: Date.now() - 60*60*1000,
    incidents: 16, phone: '+91 98XXX XXX07'
  },
  {
    id: 'USR-008', name: 'Tenzin Bhutia', email: 't.bhutia@sahayak.demo',
    role: 'field_officer', region: 'Sikkim', district: 'Gangtok',
    status: 'active', lastActive: '2 hr ago', lastActiveTs: Date.now() - 2*60*60*1000,
    incidents: 11, phone: '+91 98XXX XXX08'
  },
  {
    id: 'USR-009', name: 'Atemjen Kikon', email: 'a.kikon@sahayak.demo',
    role: 'district_officer', region: 'Nagaland', district: 'Kohima',
    status: 'active', lastActive: '3 hr ago', lastActiveTs: Date.now() - 3*60*60*1000,
    incidents: 9, phone: '+91 98XXX XXX09'
  },
  {
    id: 'USR-010', name: 'Kamal Bora', email: 'k.bora@sahayak.demo',
    role: 'field_officer', region: 'Arunachal Pradesh', district: 'West Siang',
    status: 'inactive', lastActive: '2 days ago', lastActiveTs: Date.now() - 2*24*60*60*1000,
    incidents: 14, phone: '+91 98XXX XXX10'
  },
  {
    id: 'USR-011', name: 'Sunita Chhetri', email: 's.chhetri@sahayak.demo',
    role: 'analyst', region: 'Arunachal Pradesh', district: 'Upper Subansiri',
    status: 'active', lastActive: '4 hr ago', lastActiveTs: Date.now() - 4*60*60*1000,
    incidents: 6, phone: '+91 98XXX XXX11'
  },
  {
    id: 'USR-012', name: 'Rajib Hazarika', email: 'r.hazarika@sahayak.demo',
    role: 'district_officer', region: 'Assam', district: 'Dima Hasao',
    status: 'active', lastActive: '5 hr ago', lastActiveTs: Date.now() - 5*60*60*1000,
    incidents: 13, phone: '+91 98XXX XXX12'
  },
  {
    id: 'USR-013', name: 'Mangteitluangi', email: 'm.zo@sahayak.demo',
    role: 'field_officer', region: 'Mizoram', district: 'Aizawl',
    status: 'active', lastActive: '6 hr ago', lastActiveTs: Date.now() - 6*60*60*1000,
    incidents: 10, phone: '+91 98XXX XXX13'
  },
  {
    id: 'USR-014', name: 'Thangjam Meitei', email: 't.meitei@sahayak.demo',
    role: 'citizen', region: 'Manipur', district: 'Imphal',
    status: 'active', lastActive: '8 hr ago', lastActiveTs: Date.now() - 8*60*60*1000,
    incidents: 3, phone: '+91 98XXX XXX14'
  },
  {
    id: 'USR-015', name: 'Debashis Roy', email: 'd.roy@sahayak.demo',
    role: 'citizen', region: 'Tripura', district: 'Agartala',
    status: 'inactive', lastActive: '5 days ago', lastActiveTs: Date.now() - 5*24*60*60*1000,
    incidents: 2, phone: '+91 98XXX XXX15'
  },
  {
    id: 'USR-016', name: 'Sonam Dorjee', email: 's.dorjee@sahayak.demo',
    role: 'disaster_authority', region: 'Sikkim', district: 'All',
    status: 'active', lastActive: '30 min ago', lastActiveTs: Date.now() - 30*60*1000,
    incidents: 17, phone: '+91 98XXX XXX16'
  }
],

userActivity: [
  { userId: 'USR-002', action: 'submitted field report', location: 'Tawang', timestamp: '8 min ago', type: 'report' },
  { userId: 'USR-003', action: 'reviewed alert', location: 'East Siang', timestamp: '21 min ago', type: 'alert' },
  { userId: 'USR-001', action: 'generated warning', location: 'Churachandpur', timestamp: '34 min ago', type: 'warning' },
  { userId: 'USR-006', action: 'verified prediction', location: 'Churachandpur', timestamp: '42 min ago', type: 'verification' },
  { userId: 'USR-007', action: 'submitted field report', location: 'West Khasi Hills', timestamp: '1 hr ago', type: 'report' },
  { userId: 'USR-005', action: 'analyzed risk trend', location: 'Arunachal Pradesh', timestamp: '1 hr ago', type: 'analysis' },
  { userId: 'USR-008', action: 'requested inspection', location: 'Gangtok', timestamp: '2 hr ago', type: 'verification' },
  { userId: 'USR-016', action: 'assigned field officer', location: 'Sikkim', timestamp: '30 min ago', type: 'assignment' }
]
};

if (typeof window !== 'undefined') {
    window.SAHAYAK_DATA = DEMO_DATA;
}

