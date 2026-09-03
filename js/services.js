// js/services.js — Placeholder API Services (Extended for Dashboard)

const Services = {
    async getRiskData(locationId = 'tawang') {
        await this._delay(200);
        const zone = DEMO_DATA.riskZones.find(z => z.location.toLowerCase() === locationId.toLowerCase());
        if (!zone) {
            return { error: 'Location not found', isDemo: true };
        }
        return { ...zone, timestamp: new Date().toISOString(), isDemo: true };
    },

    async getAllRiskZones() {
        await this._delay(150);
        return DEMO_DATA.riskZones.map(z => ({ ...z, isDemo: true }));
    },

    async getAlerts() {
        await this._delay(150);
        return DEMO_DATA.alerts.map(a => ({ ...a, timestamp: new Date().toISOString(), isDemo: true }));
    },

    async getLocations() {
        await this._delay(100);
        return DEMO_DATA.demoLocations.map(loc => ({ ...loc, isDemo: true }));
    },

    async getRainfall(locationId = 'tawang', period = '24h') {
        await this._delay(150);
        return [
            { hour: '00:00', value: 2.1 }, { hour: '04:00', value: 3.4 },
            { hour: '08:00', value: 5.8 }, { hour: '12:00', value: 8.2 },
            { hour: '16:00', value: 12.5 }, { hour: '20:00', value: 9.3 },
            { hour: '24:00', value: 6.7 }
        ].map(d => ({ ...d, isDemo: true }));
    },

    async getSatelliteData(locationId = 'tawang') {
        await this._delay(200);
        return {
            location: locationId, vegetationIndex: 0.42,
            surfaceChange: 'anomaly', lastScan: new Date().toISOString(), isDemo: true
        };
    },

    async getFieldReports() {
        await this._delay(150);
        return DEMO_DATA.fieldReports.map(r => ({ ...r, isDemo: true }));
    },

    async getInfrastructure(locationId = 'tawang') {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location.toLowerCase() === locationId.toLowerCase());
        return {
            location: locationId,
            roads: zone?.roads || 0, schools: zone?.schools || 0,
            hospitals: zone?.hospitals || 0, bridges: zone?.bridges || 0,
            isDemo: true
        };
    },

    async getNotifications() {
        await this._delay(100);
        return DEMO_DATA.notifications.map(n => ({ ...n, isDemo: true }));
    },

    async getDataFreshness() {
        await this._delay(100);
        return DEMO_DATA.dataFreshness.map(d => ({ ...d, isDemo: true }));
    },

    async getExposureSummary() {
        await this._delay(120);
        return { ...DEMO_DATA.exposureSummary, isDemo: true };
    },

    async getFieldStats() {
        await this._delay(100);
        return { ...DEMO_DATA.fieldStats, isDemo: true };
    },

    async getMetrics() {
        await this._delay(150);
        return Object.entries(DEMO_DATA.metrics).reduce((acc, [key, val]) => {
            acc[key] = { ...val, isDemo: true };
            return acc;
        }, {});
    },

    async searchLocations(query) {
        await this._delay(150);
        const q = query.toLowerCase().trim();
        if (!q) return [];
        return DEMO_DATA.riskZones
            .filter(z => z.location.toLowerCase().includes(q) || z.state.toLowerCase().includes(q))
            .map(z => ({ id: z.id, name: z.location, state: z.state, lat: z.lat, lng: z.lng, risk: z.risk, level: z.level }))
            .slice(0, 6);
    },

    async login(email, password) {
        await this._delay(500);
        return {
            success: true,
            user: { name: 'Authority User', role: 'administrator', email },
            token: 'demo-token-' + Date.now(), isDemo: true
        };
    },

    async simulateScenario(params) {
        await this._delay(300);
        const baseScore = 84;
        const rainfallDelta = (params.rainfall || 0) * 0.5;
        const soilDelta = (params.soilMoisture || 0) * 0.3;
        const newScore = Math.max(0, Math.min(100, baseScore + rainfallDelta + soilDelta));
        return { originalScore: baseScore, newScore: Math.round(newScore), delta: Math.round(newScore - baseScore), isDemo: true };
    },
    async getHistoricalLandslides() {
        await this._delay(150);
        return DEMO_DATA.historicalLandslides.map(h => ({ ...h, isDemo: true }));
      },
      async getInfrastructure() {
        await this._delay(150);
        return { ...DEMO_DATA.infrastructure, isDemo: true };
      },
      async getCitizenReports() {
        await this._delay(150);
        return DEMO_DATA.citizenReports.map(r => ({ ...r, isDemo: true }));
      },
      async getRainfallData() {
        await this._delay(150);
        return DEMO_DATA.rainfallData.map(r => ({ ...r, isDemo: true }));
      },
      async getSatelliteAnomalies() {
        await this._delay(150);
        return DEMO_DATA.satelliteAnomalies.map(a => ({ ...a, isDemo: true }));
      },
      async getRiskAnalysis(location = 'Tawang') {
        await this._delay(150);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return { ...data, location, isDemo: true };
      },
      async getRiskFactors(location = 'Tawang') {
        await this._delay(100);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return { factors: data.factors, isDemo: true };
      },
      async getRainfallAnalysis(location = 'Tawang') {
        await this._delay(100);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return { rainfall: data.rainfallBreakdown, isDemo: true };
      },
      async getTerrainAnalysis(location = 'Tawang') {
        await this._delay(100);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return {
          slope: data.slope, elevation: data.elevation,
          soilType: data.soilType, aspect: data.aspect,
          curvature: data.curvature, stability: data.stability,
          isDemo: true
        };
      },
      async getHistoricalContext(location = 'Tawang') {
        await this._delay(100);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return { events: data.historicalEvents, byYear: data.historicalByYear, isDemo: true };
      },
      async getExposureData(location = 'Tawang') {
        await this._delay(100);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return {
          population: data.population, villages: data.villages,
          roads: data.roads, schools: data.schools,
          hospitals: data.hospitals, bridges: data.bridges,
          responsePriority: data.responsePriority, isDemo: true
        };
      },
      async getSatelliteIndicators(location = 'Tawang') {
        await this._delay(100);
        const data = DEMO_DATA.riskAnalysisData[location] || DEMO_DATA.riskAnalysisData['Tawang'];
        return { ...data.satellite, isDemo: true };
      },
      async getRiskAnalysis(locationName) {
        await this._delay(200);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return { ...zone, timestamp: new Date().toISOString(), isDemo: true };
    },
    async getRiskFactors(locationName) {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            factors: zone.factors,
            keyDrivers: zone.keyDrivers || [],
            isDemo: true
        };
    },

    async getExposureData(locationName) {
        await this._delay(120);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            population: zone.population,
            roads: zone.roads,
            schools: zone.schools,
            hospitals: zone.hospitals,
            bridges: zone.bridges,
            villages: Math.max(2, Math.round(zone.population / 300)),
            responsePriority: zone.responsePriority,
            isDemo: true
        };
    },

    async getRiskHistory(locationName) {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            trend: zone.trend,
            events: zone.riskHistoryEvents || [],
            isDemo: true
        };
    },

    async getRainfallHistory(locationName) {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            data: zone.rainfallHistory || [],
            isDemo: true
        };
    },

    async getTerrainAnalysis(locationName) {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            slope: zone.slope,
            elevation: zone.elevation,
            aspect: zone.aspect || 'N',
            curvature: zone.curvature || 'Low',
            terrainStability: zone.terrainStability || 'Stable',
            isDemo: true
        };
    },

    async getSatelliteAnalysis(locationName) {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            indicators: zone.satelliteIndicators || {},
            surfaceChange: zone.satelliteChange,
            isDemo: true
        };
    },

    async getHistoricalContext(locationName) {
        await this._delay(150);
        const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
        if (!zone) return { error: 'Location not found', isDemo: true };
        return {
            location: locationName,
            events: zone.historicalEventsList || [],
            count: zone.historical || 0,
            isDemo: true
        };
    },
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    // ===== ALERT SERVICES =====
async getAlerts(filters = {}) {
    await this._delay(150);
    let alerts = SahayakState.getAlerts();
    if (filters.status && filters.status !== 'all') {
      alerts = alerts.filter(a => a.status === filters.status);
    }
    if (filters.severity && filters.severity !== 'all') {
      alerts = alerts.filter(a => a.severity === filters.severity);
    }
    if (filters.state && filters.state !== 'all') {
      alerts = alerts.filter(a => a.state === filters.state);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      alerts = alerts.filter(a =>
        a.location.toLowerCase().includes(q) ||
        a.id.toLowerCase().includes(q) ||
        a.state.toLowerCase().includes(q)
      );
    }
    return alerts.map(a => ({ ...a, isDemo: true }));
  },
  async getAlertById(id) {
    await this._delay(100);
    const alerts = SahayakState.getAlerts();
    const alert = alerts.find(a => a.id === id);
    return alert ? { ...alert, isDemo: true } : null;
  },
  async createAlert(alertData) {
    await this._delay(300);
    const alerts = SahayakState.getAlerts();
    const newAlert = {
      id: 'SAH-ALR-' + String(alerts.length + 1).padStart(4, '0'),
      ...alertData,
      issuedAt: Date.now(),
      issued: 'Just now',
      status: 'active',
      read: false,
      assignedOfficer: null,
      timeline: [{ time: 'Now', event: 'Warning generated by authority' }]
    };
    SahayakState.addAlert(newAlert);
    SahayakState.addNotification({
      type: 'critical', icon: '🔴',
      title: 'New warning generated',
      message: `${newAlert.location}: ${newAlert.type}`,
      timestamp: 'Just now', read: false
    });
    return { ...newAlert, isDemo: true };
  },
  async updateAlert(id, updates) {
    await this._delay(200);
    SahayakState.updateAlert(id, updates);
    return { success: true, isDemo: true };
  },
  async assignOfficerToAlert(alertId, officer) {
    await this._delay(300);
    SahayakState.updateAlert(alertId, { assignedOfficer: officer });
    SahayakState.addNotification({
      type: 'info', icon: '📍',
      title: 'Field officer assigned',
      message: `${officer.name} assigned to ${alertId}`,
      timestamp: 'Just now', read: false
    });
    return { success: true, isDemo: true };
  },
  
  // ===== FIELD REPORT SERVICES =====
  async getFieldReports(filters = {}) {
    await this._delay(150);
    let reports = SahayakState.getReports();
    if (filters.status && filters.status !== 'all') {
      reports = reports.filter(r => r.status === filters.status);
    }
    if (filters.severity && filters.severity !== 'all') {
      reports = reports.filter(r => r.severity === filters.severity);
    }
    if (filters.state && filters.state !== 'all') {
      reports = reports.filter(r => r.state === filters.state);
    }
    if (filters.type && filters.type !== 'all') {
      reports = reports.filter(r => r.type === filters.type);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      reports = reports.filter(r =>
        r.location.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.officer.toLowerCase().includes(q)
      );
    }
    return reports.map(r => ({ ...r, isDemo: true }));
  },
  async getFieldReportById(id) {
    await this._delay(100);
    const reports = SahayakState.getReports();
    const report = reports.find(r => r.id === id);
    return report ? { ...report, isDemo: true } : null;
  },
  async createFieldReport(reportData) {
    await this._delay(300);
    const reports = SahayakState.getReports();
    const newReport = {
      id: 'FR-' + (1000 + reports.length + 1),
      ...reportData,
      submittedAt: Date.now(),
      submitted: 'Just now',
      status: 'PENDING'
    };
    SahayakState.addReport(newReport);
    SahayakState.addNotification({
      type: 'info', icon: '📍',
      title: 'Field report submitted',
      message: `${newReport.officer} submitted ${newReport.type} from ${newReport.location}`,
      timestamp: 'Just now', read: false
    });
    return { ...newReport, isDemo: true };
  },
  async verifyFieldReport(id, result) {
    await this._delay(300);
    const statusMap = {
      verify: 'VERIFIED',
      reject: 'REJECTED',
      reinspect: 'REINSPECTION_REQUESTED'
    };
    SahayakState.updateReport(id, { status: statusMap[result] || 'VERIFIED' });
    const messages = {
      verify: 'Prediction verified',
      reject: 'Prediction not verified',
      reinspect: 'Re-inspection requested'
    };
    SahayakState.addNotification({
      type: result === 'verify' ? 'success' : 'warning',
      icon: result === 'verify' ? '✓' : '⚠',
      title: messages[result],
      message: `Report ${id} — ${result === 'verify' ? 'Field observation confirmed' : 'Action required'}`,
      timestamp: 'Just now', read: false
    });
    return { success: true, isDemo: true };
  },
  async addToOfflineQueue(report) {
    await this._delay(100);
    SahayakState.addToOfflineQueue(report);
    return { success: true, isDemo: true };
  },
  async syncOfflineReports() {
    await this._delay(800);
    const queue = SahayakState.getOfflineQueue();
    queue.forEach(r => {
      r.status = 'PENDING';
      r.submitted = 'Just now';
      r.submittedAt = Date.now();
      SahayakState.addReport(r);
    });
    SahayakState.clearOfflineQueue();
    return { synced: queue.length, isDemo: true };
  },
  async getOfficers() {
    await this._delay(100);
    return DEMO_DATA.officers.map(o => ({ ...o, isDemo: true }));
  },
  // ===== VERIFICATION SERVICES =====
async getVerificationData(filters = {}) {
    await this._delay(150);
    let items = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
  
    if (filters.status && filters.status !== 'all') {
      items = items.filter(v => v.status === filters.status);
    }
    if (filters.state && filters.state !== 'all') {
      items = items.filter(v => v.state === filters.state);
    }
    if (filters.riskLevel && filters.riskLevel !== 'all') {
      items = items.filter(v => v.aiLevel.toLowerCase() === filters.riskLevel);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      items = items.filter(v =>
        v.location.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        v.officer.toLowerCase().includes(q) ||
        v.reportId.toLowerCase().includes(q)
      );
    }
    return items.map(v => ({ ...v, isDemo: true }));
  },
  async getVerificationById(id) {
    await this._delay(100);
    const items = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
    const item = items.find(v => v.id === id);
    return item ? { ...item, isDemo: true } : null;
  },
  async verifyPrediction(id) {
    await this._delay(300);
    const items = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
    const idx = items.findIndex(v => v.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], status: 'VERIFIED' };
      // Also update the linked field report
      const reports = SahayakState.getReports();
      const rIdx = reports.findIndex(r => r.id === items[idx].reportId);
      if (rIdx !== -1) {
        reports[rIdx] = { ...reports[rIdx], status: 'VERIFIED' };
        localStorage.setItem('sahayak_reports', JSON.stringify(reports));
      }
      localStorage.setItem('sahayak_verification', JSON.stringify(items));
      SahayakState.addNotification({
        type: 'success', icon: '✓',
        title: 'Prediction verified',
        message: `${items[idx].location} — field evidence confirmed AI assessment`,
        timestamp: 'Just now', read: false
      });
    }
    return { success: true, isDemo: true };
  },
  async rejectPrediction(id) {
    await this._delay(300);
    const items = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
    const idx = items.findIndex(v => v.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], status: 'REJECTED' };
      const reports = SahayakState.getReports();
      const rIdx = reports.findIndex(r => r.id === items[idx].reportId);
      if (rIdx !== -1) {
        reports[rIdx] = { ...reports[rIdx], status: 'REJECTED' };
        localStorage.setItem('sahayak_reports', JSON.stringify(reports));
      }
      localStorage.setItem('sahayak_verification', JSON.stringify(items));
      SahayakState.addNotification({
        type: 'warning', icon: '⚠',
        title: 'Prediction not verified',
        message: `${items[idx].location} — field observation differs from AI`,
        timestamp: 'Just now', read: false
      });
    }
    return { success: true, isDemo: true };
  },
  async requestInspection(id) {
    await this._delay(300);
    const items = SahayakState.get('verificationItems') || DEMO_DATA.verificationItems;
    const idx = items.findIndex(v => v.id === id);
    if (idx !== -1) {
      items[idx] = { ...items[idx], status: 'INSPECTION_REQUESTED' };
      const reports = SahayakState.getReports();
      const rIdx = reports.findIndex(r => r.id === items[idx].reportId);
      if (rIdx !== -1) {
        reports[rIdx] = { ...reports[rIdx], status: 'REINSPECTION_REQUESTED' };
        localStorage.setItem('sahayak_reports', JSON.stringify(reports));
      }
      localStorage.setItem('sahayak_verification', JSON.stringify(items));
      SahayakState.addNotification({
        type: 'info', icon: '📍',
        title: 'Re-inspection requested',
        message: `${items[idx].location} — additional field verification required`,
        timestamp: 'Just now', read: false
      });
    }
    return { success: true, isDemo: true };
  },
  // ===== MONITORING SERVICES =====
async getMonitoringData(location = 'Tawang') {
    await this._delay(150);
    const data = DEMO_DATA.monitoringData[location] || DEMO_DATA.monitoringData['Tawang'];
    return { ...data, location, isDemo: true };
  },
  async getRainfallMonitoring(location = 'Tawang') {
    await this._delay(100);
    const data = DEMO_DATA.monitoringData[location] || DEMO_DATA.monitoringData['Tawang'];
    return { ...data.rainfall, isDemo: true };
  },
  async getTerrainMonitoring(location = 'Tawang') {
    await this._delay(100);
    const data = DEMO_DATA.monitoringData[location] || DEMO_DATA.monitoringData['Tawang'];
    return { ...data.terrain, isDemo: true };
  },
  async getSatelliteMonitoring(location = 'Tawang') {
    await this._delay(100);
    const data = DEMO_DATA.monitoringData[location] || DEMO_DATA.monitoringData['Tawang'];
    return { ...data.satellite, isDemo: true };
  },
  async getHistoricalEvents(filters = {}) {
    await this._delay(150);
    let events = [...DEMO_DATA.historicalEvents];
    if (filters.state && filters.state !== 'all') events = events.filter(e => e.state === filters.state);
    if (filters.severity && filters.severity !== 'all') events = events.filter(e => e.severity === filters.severity);
    if (filters.year && filters.year !== 'all') events = events.filter(e => e.year === parseInt(filters.year));
    if (filters.cause && filters.cause !== 'all') events = events.filter(e => e.cause === filters.cause);
    if (filters.search) {
      const q = filters.search.toLowerCase();
      events = events.filter(e => e.location.toLowerCase().includes(q) || e.id.toLowerCase().includes(q) || e.state.toLowerCase().includes(q));
    }
    return events.map(e => ({ ...e, isDemo: true }));
  },
async getExposureData(locationName) {
    await this._delay(200);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    const exposure = zone.exposure || {
        population: zone.population || 1000,
        villages: Math.max(2, Math.round((zone.population || 1000) / 300)),
        roads: zone.roads || 3,
        schools: zone.schools || 2,
        hospitals: zone.hospitals || 1,
        bridges: zone.bridges || 1
    };
    
    const populationBreakdown = zone.populationBreakdown || {
        high: Math.round(exposure.population * 0.34),
        moderate: Math.round(exposure.population * 0.43),
        low: Math.round(exposure.population * 0.23)
    };
    
    return {
        location: locationName,
        state: zone.state,
        risk: zone.risk,
        level: zone.level,
        exposure,
        populationBreakdown,
        isDemo: true
    };
},

async getInfrastructure(locationName) {
    await this._delay(200);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    // Generate default infrastructure if not present
    let infrastructure = zone.infrastructure;
    if (!infrastructure) {
        infrastructure = [
            { id: 'INF-AUTO-001', type: 'hospital', name: `${zone.location} District Hospital`, distance: 2.8, status: 'POTENTIALLY_EXPOSED', lat: zone.lat + 0.005, lng: zone.lng - 0.005, capacity: 40 },
            { id: 'INF-AUTO-002', type: 'school', name: `${zone.location} Govt School`, distance: 1.5, status: 'POTENTIALLY_EXPOSED', lat: zone.lat - 0.003, lng: zone.lng + 0.004, capacity: 280 },
            { id: 'INF-AUTO-003', type: 'bridge', name: `${zone.location} River Bridge`, distance: 2.2, status: 'MONITOR', lat: zone.lat + 0.002, lng: zone.lng + 0.003 }
        ];
    }
    
    return { location: locationName, infrastructure, isDemo: true };
},

async getRoadRisk(locationName) {
    await this._delay(150);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    let roads = zone.roads;
    if (!roads) {
        roads = [
            { id: 'RD-AUTO-001', name: `${zone.location} Main Road`, risk: zone.risk > 60 ? 'HIGH' : 'MODERATE', distance: 1.2, status: 'Monitor' },
            { id: 'RD-AUTO-002', name: `${zone.location} Access Road`, risk: 'MODERATE', distance: 2.5, status: 'Monitor' }
        ];
    }
    
    const summary = {
        total: roads.length,
        critical: roads.filter(r => r.risk === 'CRITICAL').length,
        high: roads.filter(r => r.risk === 'HIGH').length,
        moderate: roads.filter(r => r.risk === 'MODERATE' || r.risk === 'WATCH').length
    };
    
    return { location: locationName, roads, summary, isDemo: true };
},

async getVillages(locationName) {
    await this._delay(150);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    let villages = zone.villages;
    if (!villages) {
        const count = Math.max(2, Math.round((zone.population || 1000) / 300));
        villages = Array.from({ length: count }, (_, i) => ({
            id: `VLG-AUTO-${i+1}`,
            name: `${zone.location} Village ${i+1}`,
            population: Math.round((zone.population || 1000) / count * (0.7 + Math.random() * 0.6)),
            distance: 1.5 + i * 1.2,
            exposure: i === 0 ? 'HIGH' : i === 1 ? 'MODERATE' : 'LOW',
            lat: zone.lat + (Math.random() - 0.5) * 0.02,
            lng: zone.lng + (Math.random() - 0.5) * 0.02
        }));
    }
    
    return { location: locationName, villages, isDemo: true };
},

async getEmergencyServices(locationName) {
    await this._delay(150);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    const services = zone.emergencyServices || {
        police: Math.max(1, Math.round(zone.roads / 2)),
        relief: 1,
        hospitals: zone.hospitals || 1,
        fire: 1
    };
    
    const nearest = zone.nearestResponse || {
        name: `${zone.location} Relief Center`,
        distance: 3.5 + Math.random() * 2,
        responseTime: Math.round(12 + Math.random() * 10)
    };
    
    return { location: locationName, services, nearest, isDemo: true };
},

async getResponsePriority(locationName) {
    await this._delay(150);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    const priority = zone.responsePriority || {
        score: Math.min(100, zone.risk + 10),
        level: zone.risk >= 80 ? 'CRITICAL' : zone.risk >= 60 ? 'HIGH' : zone.risk >= 40 ? 'MODERATE' : 'LOW'
    };
    
    const factors = zone.priorityFactors || [
        { label: 'Hazard Severity', value: Math.round(zone.risk * 0.4) },
        { label: 'Population Exposure', value: Math.round((zone.population || 1000) / 100) },
        { label: 'Road Connectivity', value: (zone.roads || 3) * 4 },
        { label: 'Critical Facilities', value: ((zone.schools || 2) + (zone.hospitals || 1)) * 3 }
    ];
    
    return { location: locationName, priority, factors, isDemo: true };
},

async assignFieldTask(taskData) {
    await this._delay(400);
    const officer = DEMO_DATA.officers?.find(o => o.id === taskData.officerId);
    
    // Add to recent activity
    if (DEMO_DATA.recentActivity) {
        DEMO_DATA.recentActivity.unshift({
            type: 'action',
            icon: '📍',
            title: `Field task assigned: ${taskData.taskType}`,
            location: taskData.location,
            time: 'Just now'
        });
    }
    
    return {
        success: true,
        taskId: 'TASK-' + Date.now(),
        officer: officer?.name || 'Officer',
        isDemo: true
    };
},
async getExposureActivity(locationName) {
    await this._delay(100);
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    return {
        location: locationName,
        activity: zone.recentExposureActivity || [
            { type: 'info', icon: '📊', title: 'Exposure assessment updated', location: locationName, time: '1 hr ago' }
        ],
        isDemo: true
    };
},
// js/services.js — Services object ke andar ye method add karo

async analyzeRoute(start, destination) {
    await this._delay(600);
    
    // Check predefined routes
    const key1 = `${start}-${destination}`;
    const key2 = `${destination}-${start}`;
    const predefined = DEMO_DATA.routes?.[key1] || DEMO_DATA.routes?.[key2];
    
    if (predefined) {
        return { ...predefined, isDemo: true };
    }
    
    // Generate route dynamically for other pairs
    const startZone = DEMO_DATA.riskZones.find(z => z.location === start);
    const destZone = DEMO_DATA.riskZones.find(z => z.location === destination);
    
    if (!startZone || !destZone) {
        return { error: 'Location not found', isDemo: true };
    }
    
    // Generate synthetic route
    const distance = Math.round(this._haversine(startZone.lat, startZone.lng, destZone.lat, destZone.lng) * 1.4); // 1.4 for road factor
    const avgRisk = Math.round((startZone.risk + destZone.risk) / 2);
    const level = avgRisk >= 80 ? 'CRITICAL' : avgRisk >= 60 ? 'HIGH' : avgRisk >= 30 ? 'WATCH' : 'SAFE';
    
    // Generate waypoints
    const waypoints = this._generateWaypoints(startZone, destZone, 5);
    
    // Generate segments
    const segmentCount = 4;
    const segDistance = Math.round(distance / segmentCount);
    const primarySegments = [];
    for (let i = 0; i < segmentCount; i++) {
        const segRisk = Math.max(10, Math.min(95, avgRisk + Math.round((Math.random() - 0.5) * 30)));
        const segLevel = segRisk >= 80 ? 'CRITICAL' : segRisk >= 60 ? 'HIGH' : segRisk >= 30 ? 'WATCH' : 'SAFE';
        primarySegments.push({
            id: `SEG-GEN-${i+1}`,
            name: `Segment ${i+1}`,
            risk: segRisk,
            level: segLevel,
            distance: segDistance,
            reason: this._generateReason(segRisk),
            factors: {
                rainfall: Math.round(segRisk * 0.35),
                slope: Math.round(segRisk * 0.25),
                soil: Math.round(segRisk * 0.2),
                historical: Math.round(segRisk * 0.12),
                satellite: Math.round(segRisk * 0.08)
            }
        });
    }
    
    // Alternative route (slightly longer, lower risk)
    const altWaypoints = this._generateWaypoints(startZone, destZone, 6, true);
    const altDistance = Math.round(distance * 1.15);
    const altSegments = [];
    for (let i = 0; i < segmentCount; i++) {
        const segRisk = Math.max(10, Math.min(85, avgRisk - 10 + Math.round((Math.random() - 0.5) * 20)));
        const segLevel = segRisk >= 80 ? 'CRITICAL' : segRisk >= 60 ? 'HIGH' : segRisk >= 30 ? 'WATCH' : 'SAFE';
        altSegments.push({
            id: `SEG-GEN-A-${i+1}`,
            name: `Alt Segment ${i+1}`,
            risk: segRisk,
            level: segLevel,
            distance: Math.round(altDistance / segmentCount),
            reason: this._generateReason(segRisk),
            factors: {
                rainfall: Math.round(segRisk * 0.35),
                slope: Math.round(segRisk * 0.25),
                soil: Math.round(segRisk * 0.2),
                historical: Math.round(segRisk * 0.12),
                satellite: Math.round(segRisk * 0.08)
            }
        });
    }
    
    const altOverallRisk = Math.round(altSegments.reduce((s, seg) => s + seg.risk, 0) / altSegments.length);
    const altLevel = altOverallRisk >= 80 ? 'CRITICAL' : altOverallRisk >= 60 ? 'HIGH' : altOverallRisk >= 30 ? 'WATCH' : 'SAFE';
    
    return {
        id: `ROUTE-GEN-${Date.now()}`,
        start,
        destination,
        primary: {
            name: 'Route A (Recommended)',
            distance,
            time: Math.round(distance * 1.3),
            overallRisk: avgRisk,
            level,
            waypoints,
            segments: primarySegments
        },
        alternative: {
            name: 'Route B (Alternative)',
            distance: altDistance,
            time: Math.round(altDistance * 1.3),
            overallRisk: altOverallRisk,
            level: altLevel,
            waypoints: altWaypoints,
            segments: altSegments
        },
        riskFactors: [
            { label: 'Terrain', value: Math.round(avgRisk * 0.35), description: 'Elevation and slope characteristics' },
            { label: 'Rainfall', value: Math.round(avgRisk * 0.28), description: 'Current rainfall conditions' },
            { label: 'Soil Moisture', value: Math.round(avgRisk * 0.18), description: 'Soil saturation levels' },
            { label: 'Historical', value: Math.round(avgRisk * 0.12), description: 'Past landslide events' },
            { label: 'Satellite', value: Math.round(avgRisk * 0.07), description: 'Satellite-detected changes' }
        ],
        isDemo: true
    };
},

async getRouteActivity() {
    await this._delay(100);
    return (DEMO_DATA.routeActivity || []).map(a => ({ ...a, isDemo: true }));
},

// Helper: Haversine distance
_haversine(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
},

// Helper: Generate waypoints between two zones
_generateWaypoints(startZone, destZone, count, alternative = false) {
    const waypoints = [[startZone.lat, startZone.lng]];
    const offset = alternative ? 0.08 : 0.04;
    for (let i = 1; i < count; i++) {
        const t = i / count;
        const lat = startZone.lat + (destZone.lat - startZone.lat) * t + (Math.random() - 0.5) * offset;
        const lng = startZone.lng + (destZone.lng - startZone.lng) * t + (Math.random() - 0.5) * offset;
        waypoints.push([lat, lng]);
    }
    waypoints.push([destZone.lat, destZone.lng]);
    return waypoints;
},

// Helper: Generate reason based on risk level
_generateReason(risk) {
    if (risk >= 80) return 'Critical terrain + heavy rainfall';
    if (risk >= 60) return 'Steep terrain + elevated rainfall';
    if (risk >= 30) return 'Moderate rainfall + winding road';
    return 'Stable terrain, low risk';
},
// js/services.js — Services object ke andar ye methods add karo

async runSimulation(locationName, scenario) {
    await this._delay(400);
    
    const zone = DEMO_DATA.riskZones.find(z => z.location === locationName);
    if (!zone) return { error: 'Location not found', isDemo: true };
    
    const baseline = zone.simulatorBaseline || {
        rainfall: zone.rainfall || 100,
        soilMoisture: zone.soilMoisture || 50,
        slope: zone.slope || 25,
        historicalWeight: 50,
        satelliteWeight: 20
    };
    
    // Calculate contributions (transparent demo formula)
    const rainfallDelta = ((scenario.rainfall - baseline.rainfall) / 200) * 25;
    const soilDelta = ((scenario.soilMoisture - baseline.soilMoisture) / 80) * 20;
    const slopeDelta = ((scenario.slope - baseline.slope) / 50) * 20;
    const historicalDelta = ((scenario.historicalWeight - baseline.historicalWeight) / 100) * 15;
    const satelliteDelta = ((scenario.satelliteWeight - baseline.satelliteWeight) / 80) * 10;
    
    const totalDelta = rainfallDelta + soilDelta + slopeDelta + historicalDelta + satelliteDelta;
    const simulatedRisk = Math.max(0, Math.min(100, Math.round(zone.risk + totalDelta)));
    
    const contributions = {
        rainfall: Math.round(rainfallDelta),
        soil: Math.round(soilDelta),
        slope: Math.round(slopeDelta),
        historical: Math.round(historicalDelta),
        satellite: Math.round(satelliteDelta)
    };
    
    // Generate projection (illustrative)
    const projection = this._generateProjection(zone.risk, simulatedRisk);
    
    // Determine level
    const getLevel = (score) => {
        if (score >= 80) return 'WARNING';
        if (score >= 60) return 'ALERT';
        if (score >= 30) return 'WATCH';
        return 'SAFE';
    };
    
    return {
        location: locationName,
        baseline: {
            risk: zone.risk,
            level: zone.level,
            params: baseline
        },
        simulated: {
            risk: simulatedRisk,
            level: getLevel(simulatedRisk),
            params: scenario
        },
        delta: Math.round(totalDelta),
        contributions,
        projection,
        isDemo: true
    };
},

_generateProjection(currentRisk, simulatedRisk) {
    // Simple linear interpolation over 24h (illustrative)
    const steps = [0, 6, 12, 24];
    return steps.map((h, i) => {
        const t = i / (steps.length - 1);
        const eased = t * t * (3 - 2 * t); // smoothstep
        return {
            hour: h,
            label: h === 0 ? 'Now' : `+${h}h`,
            risk: Math.round(currentRisk + (simulatedRisk - currentRisk) * eased)
        };
    });
},

async getSimulationPresets() {
    await this._delay(100);
    return {
        moderate: {
            name: 'Moderate Scenario',
            description: 'Slightly elevated conditions',
            rainfallMultiplier: 1.3,
            soilMultiplier: 1.15,
            slopeMultiplier: 1.0,
            historicalMultiplier: 1.1,
            satelliteMultiplier: 1.2
        },
        severe: {
            name: 'Severe Scenario',
            description: 'Significantly worse conditions',
            rainfallMultiplier: 1.8,
            soilMultiplier: 1.4,
            slopeMultiplier: 1.2,
            historicalMultiplier: 1.3,
            satelliteMultiplier: 1.5
        }
    };
},
// ===== USER MANAGEMENT SERVICES =====
async getUsers(filters = {}) {
  await this._delay(150);
  let users = SahayakState.get('users') || DEMO_DATA.users;
  if (filters.role && filters.role !== 'all') {
    users = users.filter(u => u.role === filters.role);
  }
  if (filters.district && filters.district !== 'all') {
    users = users.filter(u => u.district === filters.district);
  }
  if (filters.status && filters.status !== 'all') {
    users = users.filter(u => u.status === filters.status);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    users = users.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.district.toLowerCase().includes(q)
    );
  }
  return users.map(u => ({ ...u, isDemo: true }));
},
async getUserById(id) {
  await this._delay(100);
  const users = SahayakState.get('users') || DEMO_DATA.users;
  const user = users.find(u => u.id === id);
  return user ? { ...user, isDemo: true } : null;
},
async addUser(userData) {
  await this._delay(300);
  const users = SahayakState.get('users') || [...DEMO_DATA.users];
  const newUser = {
    id: 'USR-' + String(users.length + 1).padStart(3, '0'),
    ...userData,
    lastActive: 'Just now',
    lastActiveTs: Date.now(),
    incidents: 0
  };
  users.unshift(newUser);
  SahayakState.set('users', users);
  SahayakState.addNotification({
    type: 'info', icon: '👤',
    title: 'New user created',
    message: `${newUser.name} added as ${newUser.role.replace('_', ' ')}`,
    timestamp: 'Just now', read: false
  });
  return { ...newUser, isDemo: true };
},
async updateUser(id, updates) {
  await this._delay(200);
  const users = SahayakState.get('users') || [...DEMO_DATA.users];
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], ...updates };
    SahayakState.set('users', users);
  }
  return { success: true, isDemo: true };
},
async deactivateUser(id) {
  await this._delay(200);
  const users = SahayakState.get('users') || [...DEMO_DATA.users];
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], status: 'inactive' };
    SahayakState.set('users', users);
    SahayakState.addNotification({
      type: 'warning', icon: '⚠',
      title: 'User deactivated',
      message: `${users[idx].name} has been deactivated`,
      timestamp: 'Just now', read: false
    });
  }
  return { success: true, isDemo: true };
},
async reactivateUser(id) {
  await this._delay(200);
  const users = SahayakState.get('users') || [...DEMO_DATA.users];
  const idx = users.findIndex(u => u.id === id);
  if (idx !== -1) {
    users[idx] = { ...users[idx], status: 'active' };
    SahayakState.set('users', users);
  }
  return { success: true, isDemo: true };
},
async getRoles() {
  await this._delay(100);
  return DEMO_DATA.roles.map(r => ({ ...r, isDemo: true }));
},
async getUserActivity() {
  await this._delay(100);
  return DEMO_DATA.userActivity.map(a => ({ ...a, isDemo: true }));
},
};

if (typeof window !== 'undefined') {
    window.Services = Services;
}

