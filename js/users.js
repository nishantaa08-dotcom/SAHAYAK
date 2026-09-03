// js/users.js — Users & Roles Management Logic
(function() {
    'use strict';
  
    const state = {
      filters: { search: '', role: 'all', district: 'all', status: 'all' },
      users: [],
      selectedUser: null,
      notifications: []
    };
  
    // ============ INITIALIZATION ============
    async function init() {
      renderSidebar();
      await loadUsers();
      renderSummary();
      setupFilters();
      renderRoles();
      await renderActivity();
      setupEventListeners();
      await loadNotifications();
    }
  
    // ============ SIDEBAR ============
    function renderSidebar() {
      const nav = document.getElementById('sidebarNav');
      if (!nav) return;
      nav.innerHTML = DEMO_DATA.sidebarSections.map(section => `
        <div class="sidebar-section">
          <div class="sidebar-section-label">${section.label}</div>
          ${section.items.map(item => `
            <a href="${ROUTES[item.key] || '#'}" class="sidebar-item ${item.active ? 'active' : ''}">
              <span class="sidebar-icon">${getSidebarIcon(item.icon)}</span>
              <span>${item.label}</span>
            </a>
          `).join('')}
        </div>
      `).join('');
      nav.querySelectorAll('.sidebar-item').forEach(el => {
        if (el.dataset.route === 'users' || el.getAttribute('href')?.includes('users.html')) {
          el.classList.add('active');
        }
      });
    }
  
    function getSidebarIcon(name) {
      const icons = {
        'grid': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>',
        'map': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
        'chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>',
        'bell': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
        'clipboard': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
        'check': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="20 6 9 17 4 12"/></svg>',
        'cloud': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>',
        'mountain': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 20l4-8 4 4 4-10 6 14"/></svg>',
        'satellite': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><line x1="21.17" y1="8" x2="12" y2="8"/></svg>',
        'clock': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        'building': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/></svg>',
        'route': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',
        'sliders': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>',
        'bar-chart': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
        'cpu': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/></svg>',
        'users': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>',
        'settings': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/></svg>'
      };
      return icons[name] || '';
    }
  
    // ============ LOAD USERS ============
    async function loadUsers() {
      const loading = document.getElementById('usersLoading');
      if (loading) loading.style.display = 'block';
      state.users = await Services.getUsers(state.filters);
      renderUsersTable();
      if (loading) loading.style.display = 'none';
    }
  
    // ============ SUMMARY ============
    function renderSummary() {
      const all = SahayakState.get('users') || DEMO_DATA.users;
      const active = all.filter(u => u.status === 'active').length;
      const fieldOfficers = all.filter(u => u.role === 'field_officer').length;
      const admins = all.filter(u => u.role === 'super_admin' || u.role === 'disaster_authority').length;
  
      document.getElementById('summaryTotal').textContent = all.length;
      document.getElementById('summaryActive').textContent = active;
      document.getElementById('summaryField').textContent = fieldOfficers;
      document.getElementById('summaryAdmin').textContent = admins;
    }
  
    // ============ FILTERS ============
    function setupFilters() {
      const search = document.getElementById('userSearch');
      const role = document.getElementById('userRoleFilter');
      const district = document.getElementById('userDistrictFilter');
      const status = document.getElementById('userStatusFilter');
  
      if (search) {
        search.addEventListener('input', Utils.debounce(async (e) => {
          state.filters.search = e.target.value;
          await loadUsers();
        }, 200));
      }
  
      if (role) {
        role.addEventListener('change', async (e) => {
          state.filters.role = e.target.value;
          await loadUsers();
        });
      }
  
      if (district) {
        // Populate districts
        const allUsers = SahayakState.get('users') || DEMO_DATA.users;
        const districts = [...new Set(allUsers.map(u => u.district).filter(d => d && d !== 'All'))].sort();
        district.innerHTML = '<option value="all">All Districts</option>' +
          districts.map(d => `<option value="${d}">${d}</option>`).join('');
  
        district.addEventListener('change', async (e) => {
          state.filters.district = e.target.value;
          await loadUsers();
        });
      }
  
      if (status) {
        status.addEventListener('change', async (e) => {
          state.filters.status = e.target.value;
          await loadUsers();
        });
      }
  
      const resetBtn = document.getElementById('usersFilterReset');
      if (resetBtn) {
        resetBtn.addEventListener('click', async () => {
          state.filters = { search: '', role: 'all', district: 'all', status: 'all' };
          if (search) search.value = '';
          if (role) role.value = 'all';
          if (district) district.value = 'all';
          if (status) status.value = 'all';
          await loadUsers();
        });
      }
    }
  
    // ============ USERS TABLE ============
    function renderUsersTable() {
      const tbody = document.getElementById('usersTableBody');
      const empty = document.getElementById('usersEmpty');
      const count = document.getElementById('usersTableCount');
      if (!tbody) return;
  
      if (count) count.textContent = state.users.length;
  
      if (state.users.length === 0) {
        tbody.innerHTML = '';
        if (empty) empty.style.display = 'block';
        return;
      }
      if (empty) empty.style.display = 'none';
  
      const roleLabels = {
        'super_admin': 'Super Admin',
        'disaster_authority': 'Disaster Authority',
        'district_officer': 'District Officer',
        'field_officer': 'Field Officer',
        'analyst': 'Analyst',
        'citizen': 'Citizen'
      };
  
      tbody.innerHTML = state.users.map(u => {
        const initials = u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        const statusClass = u.status === 'active' ? 'active' : u.status === 'suspended' ? 'suspended' : 'inactive';
        const statusLabel = u.status.charAt(0).toUpperCase() + u.status.slice(1);
  
        return `
          <tr data-user-id="${u.id}" onclick="window.SahayakUsers.openDetail('${u.id}')">
            <td data-label="User">
              <div class="user-cell">
                <div class="user-cell-avatar">${initials}</div>
                <div class="user-cell-info">
                  <div class="user-cell-name">${u.name}</div>
                  <div class="user-cell-email">${u.email}</div>
                </div>
              </div>
            </td>
            <td data-label="Role">
              <span class="role-badge ${u.role}">${roleLabels[u.role] || u.role}</span>
            </td>
            <td data-label="Region">
              <div style="font-weight: 600; color: var(--text-900);">${u.district}</div>
              <div style="font-size: 10px; color: var(--text-500);">${u.region}</div>
            </td>
            <td data-label="Status">
              <span class="status-badge ${statusClass}">
                <span class="status-badge-dot"></span>
                ${statusLabel}
              </span>
            </td>
            <td data-label="Last Active">
              <span style="font-size: var(--fs-xs); color: var(--text-600);">${u.lastActive}</span>
            </td>
            <td data-label="Actions" onclick="event.stopPropagation()">
              <div class="user-actions-cell">
                <button class="user-action-btn" onclick="window.SahayakUsers.openDetail('${u.id}')" title="View">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                </button>
                <button class="user-action-btn" onclick="window.SahayakUsers.openEditModal('${u.id}')" title="Edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="user-action-btn" onclick="window.SahayakUsers.toggleUserStatus('${u.id}')" title="${u.status === 'active' ? 'Deactivate' : 'Activate'}">
                  ${u.status === 'active'
                    ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>'
                    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
                  }
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  
    // ============ ROLES ============
    function renderRoles() {
      const container = document.getElementById('rolesGrid');
      if (!container) return;
  
      const allUsers = SahayakState.get('users') || DEMO_DATA.users;
      const roles = DEMO_DATA.roles.map(r => ({
        ...r,
        userCount: allUsers.filter(u => u.role === r.id).length
      }));
  
      container.innerHTML = roles.map(r => {
        const permChips = r.permissions.includes('all')
          ? '<span class="permission-chip all">All Access</span>'
          : r.permissions.map(p => `<span class="permission-chip">${DEMO_DATA.permissionLabels[p] || p}</span>`).join('');
  
        return `
          <div class="role-card" style="--role-color: ${r.color};">
            <div class="role-card-header">
              <div class="role-card-name">${r.name}</div>
              <div class="role-card-count">${r.userCount} users</div>
            </div>
            <div class="role-card-desc">${r.description}</div>
            <div class="role-card-permissions">${permChips}</div>
          </div>
        `;
      }).join('');
    }
  
    // ============ ACTIVITY ============
    async function renderActivity() {
      const container = document.getElementById('activityFeed');
      if (!container) return;
  
      const activities = await Services.getUserActivity();
      const allUsers = SahayakState.get('users') || DEMO_DATA.users;
  
      container.innerHTML = activities.slice(0, 6).map(a => {
        const user = allUsers.find(u => u.id === a.userId);
        const userName = user?.name || 'Unknown';
        const iconMap = {
          report: '📋', alert: '🔔', warning: '⚠',
          verification: '✓', analysis: '📊', assignment: '👤'
        };
        return `
          <div class="activity-feed-item">
            <div class="activity-feed-icon ${a.type}">${iconMap[a.type] || '•'}</div>
            <div class="activity-feed-content">
              <div class="activity-feed-title">
                <strong>${userName}</strong> ${a.action}
              </div>
              <div class="activity-feed-meta">${a.location} · ${a.timestamp}</div>
            </div>
          </div>
        `;
      }).join('');
    }
  
    // ============ USER DETAIL ============
    function openDetail(userId) {
      const user = (SahayakState.get('users') || DEMO_DATA.users).find(u => u.id === userId);
      if (!user) return;
      state.selectedUser = user;
  
      const panel = document.getElementById('userDetailPanel');
      const overlay = document.getElementById('userDetailOverlay');
      if (!panel) return;
  
      const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
      const role = DEMO_DATA.roles.find(r => r.id === user.role);
      const roleName = role?.name || user.role;
      const statusClass = user.status === 'active' ? 'active' : user.status === 'suspended' ? 'suspended' : 'inactive';
      const statusLabel = user.status.charAt(0).toUpperCase() + user.status.slice(1);
  
      const permissions = role?.permissions || [];
      const permHtml = permissions.includes('all')
        ? '<span class="user-detail-perm" style="background: var(--teal); color: var(--white); border-color: transparent;">All Access</span>'
        : permissions.map(p => `<span class="user-detail-perm">${DEMO_DATA.permissionLabels[p] || p}</span>`).join('');
  
      panel.innerHTML = `
        <div class="user-detail-header">
          <button class="user-detail-close" onclick="window.SahayakUsers.closeDetail()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <div class="user-detail-avatar">${initials}</div>
          <div class="user-detail-name">${user.name}</div>
          <div class="user-detail-email">${user.email}</div>
          <div class="user-detail-meta">
            <span class="role-badge ${user.role}">${roleName}</span>
            <span class="status-badge ${statusClass}">
              <span class="status-badge-dot"></span>
              ${statusLabel}
            </span>
          </div>
        </div>
        <div class="user-detail-body">
          <div class="user-detail-section">
            <div class="user-detail-section-title">User Information</div>
            <div class="user-detail-grid">
              <div class="user-detail-item">
                <div class="user-detail-item-label">User ID</div>
                <div class="user-detail-item-value" style="font-family: 'SF Mono', Monaco, monospace;">${user.id}</div>
              </div>
              <div class="user-detail-item">
                <div class="user-detail-item-label">Phone</div>
                <div class="user-detail-item-value">${user.phone || '—'}</div>
              </div>
              <div class="user-detail-item">
                <div class="user-detail-item-label">Region</div>
                <div class="user-detail-item-value">${user.region}</div>
              </div>
              <div class="user-detail-item">
                <div class="user-detail-item-label">District</div>
                <div class="user-detail-item-value">${user.district}</div>
              </div>
              <div class="user-detail-item">
                <div class="user-detail-item-label">Last Active</div>
                <div class="user-detail-item-value">${user.lastActive}</div>
              </div>
              <div class="user-detail-item">
                <div class="user-detail-item-label">Assigned Incidents</div>
                <div class="user-detail-item-value">${user.incidents}</div>
              </div>
            </div>
          </div>
  
          <div class="user-detail-section">
            <div class="user-detail-section-title">Permissions</div>
            <div class="user-detail-permissions">${permHtml}</div>
          </div>
  
          <div class="user-detail-section">
            <div class="user-detail-section-title">Recent Activity</div>
            <div style="padding: var(--space-3); background: var(--surface); border-radius: var(--radius-md); font-size: var(--fs-xs); color: var(--text-600); line-height: 1.6;">
              ${user.incidents > 0
                ? `Active user with <strong style="color: var(--text-900);">${user.incidents} assigned incidents</strong>. Last activity: ${user.lastActive}.`
                : 'No recent activity recorded.'}
            </div>
          </div>
        </div>
        <div class="user-detail-footer">
          <button class="btn btn-outline" onclick="window.SahayakUsers.openEditModal('${user.id}')">Edit User</button>
          <button class="btn btn-outline" onclick="window.SahayakUsers.toggleUserStatus('${user.id}')">
            ${user.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
          <button class="btn btn-primary" onclick="window.SahayakUsers.viewActivity('${user.id}')">View Activity</button>
        </div>
      `;
  
      panel.classList.add('active');
      if (overlay) overlay.classList.add('active');
    }
  
    function closeDetail() {
      const panel = document.getElementById('userDetailPanel');
      const overlay = document.getElementById('userDetailOverlay');
      if (panel) panel.classList.remove('active');
      if (overlay) overlay.classList.remove('active');
      state.selectedUser = null;
    }
  
    // ============ ADD USER MODAL ============
    function openAddModal() {
      const modal = document.getElementById('addUserModal');
      if (!modal) return;
  
      const body = modal.querySelector('.modal-body');
      body.innerHTML = `
        <div class="modal-form-group">
          <label class="modal-form-label">Full Name <span class="required">*</span></label>
          <input type="text" class="modal-form-input" id="newUserName" placeholder="e.g. Rajesh Kumar">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Email <span class="required">*</span></label>
          <input type="email" class="modal-form-input" id="newUserEmail" placeholder="user@sahayak.demo">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Phone</label>
          <input type="tel" class="modal-form-input" id="newUserPhone" placeholder="+91 98XXX XXXXX">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Role <span class="required">*</span></label>
          <select class="modal-form-select" id="newUserRole">
            ${DEMO_DATA.roles.map(r => `<option value="${r.id}">${r.name}</option>`).join('')}
          </select>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">State / Region</label>
          <select class="modal-form-select" id="newUserRegion">
            <option value="Northeast India">Northeast India (All)</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Manipur">Manipur</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Tripura">Tripura</option>
          </select>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">District</label>
          <input type="text" class="modal-form-input" id="newUserDistrict" placeholder="e.g. Tawang">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Status</label>
          <select class="modal-form-select" id="newUserStatus">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      `;
  
      const footer = modal.querySelector('.modal-footer');
      footer.innerHTML = `
        <button class="btn btn-outline" onclick="window.SahayakUsers.closeAddModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.SahayakUsers.createUser()">Create User</button>
      `;
  
      modal.classList.add('active');
    }
  
    function closeAddModal() {
      const modal = document.getElementById('addUserModal');
      if (modal) modal.classList.remove('active');
    }
  
    async function createUser() {
      const name = document.getElementById('newUserName')?.value.trim();
      const email = document.getElementById('newUserEmail')?.value.trim();
      const phone = document.getElementById('newUserPhone')?.value.trim();
      const role = document.getElementById('newUserRole')?.value;
      const region = document.getElementById('newUserRegion')?.value;
      const district = document.getElementById('newUserDistrict')?.value.trim() || 'All';
      const status = document.getElementById('newUserStatus')?.value;
  
      if (!name || !email || !role) {
        showToast('warning', '⚠', 'Please fill required fields');
        return;
      }
  
      await Services.addUser({ name, email, phone, role, region, district, status });
      closeAddModal();
      showToast('success', '✓', 'User created successfully');
      await loadUsers();
      renderSummary();
      renderRoles();
    }
  
    // ============ EDIT USER ============
    function openEditModal(userId) {
      const user = (SahayakState.get('users') || DEMO_DATA.users).find(u => u.id === userId);
      if (!user) return;
  
      const modal = document.getElementById('addUserModal');
      if (!modal) return;
  
      modal.querySelector('.modal-title').textContent = 'Edit User';
  
      const body = modal.querySelector('.modal-body');
      body.innerHTML = `
        <div class="modal-form-group">
          <label class="modal-form-label">Full Name</label>
          <input type="text" class="modal-form-input" id="editUserName" value="${user.name}">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Email</label>
          <input type="email" class="modal-form-input" id="editUserEmail" value="${user.email}">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Phone</label>
          <input type="tel" class="modal-form-input" id="editUserPhone" value="${user.phone || ''}">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Role</label>
          <select class="modal-form-select" id="editUserRole">
            ${DEMO_DATA.roles.map(r => `<option value="${r.id}" ${r.id === user.role ? 'selected' : ''}>${r.name}</option>`).join('')}
          </select>
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">Region</label>
          <input type="text" class="modal-form-input" id="editUserRegion" value="${user.region}">
        </div>
        <div class="modal-form-group">
          <label class="modal-form-label">District</label>
          <input type="text" class="modal-form-input" id="editUserDistrict" value="${user.district}">
        </div>
      `;
  
      const footer = modal.querySelector('.modal-footer');
      footer.innerHTML = `
        <button class="btn btn-outline" onclick="window.SahayakUsers.closeAddModal()">Cancel</button>
        <button class="btn btn-primary" onclick="window.SahayakUsers.saveEdit('${userId}')">Save Changes</button>
      `;
  
      modal.classList.add('active');
    }
  
    async function saveEdit(userId) {
      const updates = {
        name: document.getElementById('editUserName')?.value.trim(),
        email: document.getElementById('editUserEmail')?.value.trim(),
        phone: document.getElementById('editUserPhone')?.value.trim(),
        role: document.getElementById('editUserRole')?.value,
        region: document.getElementById('editUserRegion')?.value.trim(),
        district: document.getElementById('editUserDistrict')?.value.trim()
      };
  
      await Services.updateUser(userId, updates);
      closeAddModal();
      showToast('success', '✓', 'User updated successfully');
      await loadUsers();
      renderSummary();
      renderRoles();
      if (state.selectedUser?.id === userId) openDetail(userId);
    }
  
    // ============ TOGGLE STATUS ============
    async function toggleUserStatus(userId) {
      const user = (SahayakState.get('users') || DEMO_DATA.users).find(u => u.id === userId);
      if (!user) return;
  
      if (user.status === 'active') {
        await Services.deactivateUser(userId);
        showToast('warning', '⚠', `${user.name} deactivated`);
      } else {
        await Services.reactivateUser(userId);
        showToast('success', '✓', `${user.name} reactivated`);
      }
  
      await loadUsers();
      renderSummary();
      renderRoles();
      if (state.selectedUser?.id === userId) openDetail(userId);
    }
  
    // ============ VIEW ACTIVITY ============
    function viewActivity(userId) {
      showToast('info', '📋', 'Activity log opened — DEMO');
    }
  
    // ============ TOAST ============
    function showToast(type, icon, message) {
      const existing = document.querySelector('.users-toast');
      if (existing) existing.remove();
  
      const toast = document.createElement('div');
      toast.className = `users-toast ${type}`;
      toast.innerHTML = `
        <div class="users-toast-icon">${icon}</div>
        <div>
          <div class="users-toast-text">${message}</div>
          <div class="users-toast-demo">DEMO</div>
        </div>
      `;
      document.body.appendChild(toast);
  
      setTimeout(() => {
        toast.classList.add('toast-exit');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
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
      badge.textContent = unread;
      badge.style.display = unread > 0 ? 'flex' : 'none';
    }
  
    function renderNotificationPanel() {
      const list = document.getElementById('notificationList');
      if (!list) return;
      list.innerHTML = state.notifications.map(n => `
        <div class="notification-item ${n.read ? '' : 'unread'}">
          <div class="notification-icon">${n.icon}</div>
          <div class="notification-content">
            <div class="notification-title">${n.title}</div>
            <div class="notification-message">${n.message}</div>
            <div class="notification-time">${n.timestamp}</div>
          </div>
        </div>
      `).join('');
    }
  
    function markAllNotificationsRead() {
      state.notifications.forEach(n => n.read = true);
      renderNotificationBadge();
      renderNotificationPanel();
    }
  
    // ============ EVENT LISTENERS ============
    function setupEventListeners() {
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
  
      const overlay = document.getElementById('userDetailOverlay');
      if (overlay) overlay.addEventListener('click', closeDetail);
  
      const modal = document.getElementById('addUserModal');
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeAddModal();
        });
      }
  
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          closeDetail();
          closeAddModal();
          if (notifPanel) notifPanel.classList.remove('active');
        }
      });
    }
  
    // ============ PUBLIC API ============
    window.SahayakUsers = {
      openDetail, closeDetail,
      openAddModal, closeAddModal, createUser,
      openEditModal, saveEdit,
      toggleUserStatus, viewActivity,
      markAllNotificationsRead
    };
  
    document.addEventListener('DOMContentLoaded', init);
  })();