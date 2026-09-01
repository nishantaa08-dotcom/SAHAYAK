// js/state.js — Shared application state using localStorage
(function() {
    'use strict';
  
    const STORAGE_KEYS = {
      alerts: 'sahayak_alerts',
      reports: 'sahayak_reports',
      offlineQueue: 'sahayak_offline_queue',
      notifications: 'sahayak_notifications',
      initialized: 'sahayak_initialized'
    };
  
    function init() {
      if (localStorage.getItem(STORAGE_KEYS.initialized)) return;
  
      // Seed with demo data
      localStorage.setItem(STORAGE_KEYS.alerts, JSON.stringify(DEMO_DATA.alerts));
      localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(DEMO_DATA.fieldReports));
      localStorage.setItem(STORAGE_KEYS.offlineQueue, JSON.stringify([]));
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(DEMO_DATA.notifications));
      localStorage.setItem(STORAGE_KEYS.initialized, 'true');
      localStorage.setItem('sahayak_verification', JSON.stringify(DEMO_DATA.verificationItems));
    }
  
    function reset() {
      localStorage.removeItem(STORAGE_KEYS.initialized);
      init();
    }
  
    // ===== ALERTS =====
    function getAlerts() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.alerts)) || []; }
      catch { return DEMO_DATA.alerts; }
    }
    function addAlert(alert) {
      const alerts = getAlerts();
      alerts.unshift(alert);
      localStorage.setItem(STORAGE_KEYS.alerts, JSON.stringify(alerts));
    }
    function updateAlert(id, updates) {
      const alerts = getAlerts();
      const idx = alerts.findIndex(a => a.id === id);
      if (idx !== -1) {
        alerts[idx] = { ...alerts[idx], ...updates };
        localStorage.setItem(STORAGE_KEYS.alerts, JSON.stringify(alerts));
      }
    }
  
    // ===== REPORTS =====
    function getReports() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.reports)) || []; }
      catch { return DEMO_DATA.fieldReports; }
    }
    function addReport(report) {
      const reports = getReports();
      reports.unshift(report);
      localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
    }
    function updateReport(id, updates) {
      const reports = getReports();
      const idx = reports.findIndex(r => r.id === id);
      if (idx !== -1) {
        reports[idx] = { ...reports[idx], ...updates };
        localStorage.setItem(STORAGE_KEYS.reports, JSON.stringify(reports));
      }
    }
  
    // ===== OFFLINE QUEUE =====
    function getOfflineQueue() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.offlineQueue)) || []; }
      catch { return []; }
    }
    function addToOfflineQueue(report) {
      const queue = getOfflineQueue();
      queue.push(report);
      localStorage.setItem(STORAGE_KEYS.offlineQueue, JSON.stringify(queue));
    }
    function clearOfflineQueue() {
      localStorage.setItem(STORAGE_KEYS.offlineQueue, JSON.stringify([]));
    }
  
    // ===== NOTIFICATIONS =====
    function getNotifications() {
      try { return JSON.parse(localStorage.getItem(STORAGE_KEYS.notifications)) || []; }
      catch { return DEMO_DATA.notifications; }
    }
    function addNotification(notification) {
      const notifs = getNotifications();
      const newNotif = {
        id: 'N-' + Date.now(),
        ...notification
      };
      notifs.unshift(newNotif);
      localStorage.setItem(STORAGE_KEYS.notifications, JSON.stringify(notifs.slice(0, 50)));
    }
  
    window.SahayakState = {
      init, reset,
      getAlerts, addAlert, updateAlert,
      getReports, addReport, updateReport,
      getOfflineQueue, addToOfflineQueue, clearOfflineQueue,
      getNotifications, addNotification,
      // Add to window.SahayakState object
    get(key) {
        try { return JSON.parse(localStorage.getItem('sahayak_' + key)); }
        catch { return null; }
    },
    set(key, value) {
        localStorage.setItem('sahayak_' + key, JSON.stringify(value));
    }
    };
    
  
    // Auto-init
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
    
    
    
  })();