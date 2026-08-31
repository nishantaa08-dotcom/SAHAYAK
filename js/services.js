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

    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
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
};

if (typeof window !== 'undefined') {
    window.Services = Services;
}

