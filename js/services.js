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
};

if (typeof window !== 'undefined') {
    window.Services = Services;
}

