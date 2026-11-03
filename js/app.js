/**
 * ApexSaaS AI - Main Application Controller
 * Consumer-Friendly SaaS Studio with Supabase Free Cloud Database & User Auth
 */

import { initOrgChart } from './org-chart.js';
import { initPipeline } from './pipeline.js';
import { initTerminal } from './terminal.js';
import { initGenerator } from './generator.js';
import { authDb } from './auth-db.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Apple Theme Switcher
  initThemeToggle();

  // Initialize Toast System
  initToastSystem();

  // Initialize Auth & Free Cloud Database UI
  initAuthSystem();
  initCloudDbSystem();

  // Initialize Core Subsystems
  initOrgChart();
  initPipeline();
  initTerminal();
  initGenerator();

  // Navigation Links & Active State
  initNavigation();

  // Command Palette (Cmd+K)
  initCommandPalette();

  // Dynamic Consumer Stats Counter
  initStatsTicker();

  console.log('%c  ApexSaaS AI %c Consumer SaaS Studio & Cloud DB Active ', 'background:#0071e3; color:#fff; font-weight:600; padding:3px 8px; border-radius:12px 0 0 12px;', 'background:#161617; color:#30d158; padding:3px 8px; border-radius:0 12px 12px 0;');
});

function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('apple_theme');
  const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
  const initialTheme = savedTheme || (prefersLight ? 'light' : 'dark');

  applyTheme(initialTheme);

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyLight = document.documentElement.getAttribute('data-theme') === 'light';
    const nextTheme = isCurrentlyLight ? 'dark' : 'light';
    applyTheme(nextTheme);
    localStorage.setItem('apple_theme', nextTheme);
    if (window.showToast) {
      window.showToast(`Switched to Apple ${nextTheme === 'light' ? 'Light' : 'Pro Dark'} mode`, 'info');
    }
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const sunIcon = toggleBtn.querySelector('.theme-icon-sun');
    const moonIcon = toggleBtn.querySelector('.theme-icon-moon');
    if (theme === 'light') {
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
    } else {
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
    }
  }
}

function initToastSystem() {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  window.showToast = function (message, type = 'info', duration = 3800) {
    const toast = document.createElement('div');
    toast.className = `apple-toast toast-${type} animate-toast-in`;

    const iconSvg = {
      info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
      success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`,
      warning: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    }[type] || '';

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close-btn" aria-label="Close notification">&times;</button>
    `;

    toastContainer.appendChild(toast);

    toast.querySelector('.toast-close-btn').addEventListener('click', () => {
      dismissToast(toast);
    });

    setTimeout(() => {
      dismissToast(toast);
    }, duration);
  };

  function dismissToast(el) {
    el.classList.remove('animate-toast-in');
    el.classList.add('animate-toast-out');
    el.addEventListener('animationend', () => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
  }
}

/**
 * User Authentication UI & Modals
 */
function initAuthSystem() {
  const authContainer = document.getElementById('header-auth-section');
  const authModal = document.getElementById('auth-modal');
  const authBackdrop = document.getElementById('auth-backdrop');
  const authForm = document.getElementById('auth-form');
  const tabSignIn = document.getElementById('tab-sign-in');
  const tabSignUp = document.getElementById('tab-sign-up');
  const authReason = document.getElementById('auth-modal-reason');
  const deployModal = document.getElementById('deploy-success-modal');

  let currentAuthMode = 'signup'; // 'signin' or 'signup'

  function updateAuthHeader() {
    if (!authContainer) return;
    const user = authDb.getCurrentUser();

    if (user) {
      authContainer.innerHTML = `
        <div class="user-profile-chip" id="user-chip-btn">
          <div class="user-avatar-sm">${user.name.charAt(0).toUpperCase()}</div>
          <span class="user-name-text">${user.name}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px; height:12px;">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
        <div class="user-dropdown-menu" id="user-dropdown-menu" style="display:none;">
          <div class="user-dropdown-header">
            <strong>${user.name}</strong>
            <span style="font-size:0.75rem; color:var(--text-tertiary);">${user.email}</span>
            <span class="badge badge-emerald" style="font-size:0.65rem; margin-top:4px;">${user.plan}</span>
          </div>
          <hr style="border:none; border-top:1px solid var(--border-subtle); margin:6px 0;">
          <button class="dropdown-item" id="btn-view-my-apps">
            📦 My Deployed Apps (${authDb.getDeployedApps().length})
          </button>
          <button class="dropdown-item" id="btn-view-cloud-db">
            ☁️ Free Cloud Database
          </button>
          <hr style="border:none; border-top:1px solid var(--border-subtle); margin:6px 0;">
          <button class="dropdown-item danger" id="btn-user-signout">
            🚪 Sign Out
          </button>
        </div>
      `;

      // Setup Dropdown toggle
      const chip = document.getElementById('user-chip-btn');
      const menu = document.getElementById('user-dropdown-menu');
      chip?.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      });

      document.addEventListener('click', () => {
        if (menu) menu.style.display = 'none';
      });

      document.getElementById('btn-user-signout')?.addEventListener('click', () => {
        authDb.signOut();
        if (window.showToast) window.showToast('You have signed out.', 'info');
      });

      document.getElementById('btn-view-my-apps')?.addEventListener('click', () => {
        openMyAppsDrawer();
      });

      document.getElementById('btn-view-cloud-db')?.addEventListener('click', () => {
        openCloudDbModal();
      });

    } else {
      authContainer.innerHTML = `
        <button class="btn btn-sm btn-ghost" id="btn-header-signin">Sign In</button>
        <button class="btn btn-sm btn-primary" id="btn-header-signup">Create Free Account</button>
      `;

      document.getElementById('btn-header-signin')?.addEventListener('click', () => {
        window.openAuthModal('Sign in to access your autonomous apps and cloud database.', 'signin');
      });

      document.getElementById('btn-header-signup')?.addEventListener('click', () => {
        window.openAuthModal('Create your free account to deploy autonomous apps with free cloud database.', 'signup');
      });
    }
  }

  // Global modal opener
  window.openAuthModal = function (reason = '', mode = 'signup') {
    currentAuthMode = mode;
    if (authReason) authReason.textContent = reason;
    if (authModal && authBackdrop) {
      authModal.style.display = 'block';
      authBackdrop.style.display = 'block';
    }
    updateModalMode(mode);
  };

  window.closeAuthModal = function () {
    if (authModal && authBackdrop) {
      authModal.style.display = 'none';
      authBackdrop.style.display = 'none';
    }
  };

  function updateModalMode(mode) {
    currentAuthMode = mode;
    const nameField = document.getElementById('auth-field-name-wrap');
    const submitBtn = document.getElementById('auth-submit-btn');
    const modalTitle = document.getElementById('auth-modal-title');

    if (mode === 'signup') {
      tabSignUp?.classList.add('active');
      tabSignIn?.classList.remove('active');
      if (nameField) nameField.style.display = 'block';
      if (submitBtn) submitBtn.textContent = 'Create Free Account & Deploy';
      if (modalTitle) modalTitle.textContent = 'Create Your Free Account';
    } else {
      tabSignIn?.classList.add('active');
      tabSignUp?.classList.remove('active');
      if (nameField) nameField.style.display = 'none';
      if (submitBtn) submitBtn.textContent = 'Sign In to Account';
      if (modalTitle) modalTitle.textContent = 'Welcome Back';
    }
  }

  tabSignIn?.addEventListener('click', () => updateModalMode('signin'));
  tabSignUp?.addEventListener('click', () => updateModalMode('signup'));

  // Close modal clicks
  document.getElementById('auth-modal-close')?.addEventListener('click', window.closeAuthModal);
  authBackdrop?.addEventListener('click', window.closeAuthModal);

  // Form submission
  authForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email')?.value.trim();
    const password = document.getElementById('auth-password')?.value.trim();
    const name = document.getElementById('auth-name')?.value.trim();

    try {
      if (currentAuthMode === 'signup') {
        authDb.signUp(name, email, password);
        if (window.showToast) window.showToast(`Welcome, ${name}! Your free cloud database is active.`, 'success');
      } else {
        authDb.signIn(email, password);
        if (window.showToast) window.showToast(`Signed in successfully!`, 'success');
      }
      window.closeAuthModal();

      // If there is an active artifact waiting to be deployed, trigger deployment
      const deployTopBtn = document.getElementById('btn-deploy-consumer-top') || document.getElementById('btn-deploy-consumer-bottom');
      if (deployTopBtn) {
        deployTopBtn.click();
      }
    } catch (err) {
      if (window.showToast) window.showToast(err.message, 'error');
    }
  });

  // Demo one-click sign in
  document.getElementById('btn-quick-demo-auth')?.addEventListener('click', () => {
    authDb.signIn('founder@example.com', 'demo1234');
    window.closeAuthModal();
    if (window.showToast) window.showToast('Signed in with Free Demo Creator Account!', 'success');
    const deployTopBtn = document.getElementById('btn-deploy-consumer-top') || document.getElementById('btn-deploy-consumer-bottom');
    if (deployTopBtn) deployTopBtn.click();
  });

  // Listen to auth changes
  window.addEventListener('apexsaas:auth-change', updateAuthHeader);
  updateAuthHeader();

  // Deployment Success Celebration Modal
  window.openDeploySuccessModal = function (record) {
    if (!deployModal) return;
    const body = document.getElementById('deploy-success-body');
    if (body) {
      body.innerHTML = `
        <div style="text-align:center; padding:10px 0;">
          <div style="font-size:3rem; margin-bottom:10px;">🎉</div>
          <h2 style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin:0;">${record.name} is Live!</h2>
          <p style="color:var(--text-secondary); font-size:0.9rem; margin-top:6px;">
            Your app is autonomously hosted and connected to a free cloud PostgreSQL database.
          </p>

          <div style="background:var(--bg-surface-2); border:1px solid var(--border-medium); border-radius:var(--radius-md); padding:16px; margin:20px 0; text-align:left;">
            <div style="font-size:0.75rem; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.05em; font-weight:600;">Live Web URL</div>
            <a href="${record.liveUrl}" target="_blank" style="display:flex; align-items:center; justify-content:space-between; color:var(--accent-primary); font-weight:600; text-decoration:none; margin-top:4px; word-break:break-all;">
              <span>${record.liveUrl}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px; flex-shrink:0; margin-left:6px;">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </a>
            
            <hr style="border:none; border-top:1px solid var(--border-subtle); margin:12px 0;">

            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:0.8rem; color:var(--text-secondary);">Cloud Database:</span>
              <span class="badge badge-emerald" style="font-size:0.75rem;">PostgreSQL (Supabase Free) 🟢</span>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:6px;">
              <span style="font-size:0.8rem; color:var(--text-secondary);">SSL Security:</span>
              <span style="font-size:0.8rem; color:var(--text-primary); font-weight:500;">Automated HTTPS</span>
            </div>
          </div>

          <div style="display:flex; gap:10px; justify-content:center;">
            <button class="btn btn-secondary" id="btn-close-deploy-modal">Done</button>
            <button class="btn btn-primary" id="btn-view-apps-from-modal">View My Deployed Apps</button>
          </div>
        </div>
      `;

      document.getElementById('btn-close-deploy-modal')?.addEventListener('click', () => {
        deployModal.style.display = 'none';
        authBackdrop.style.display = 'none';
      });

      document.getElementById('btn-view-apps-from-modal')?.addEventListener('click', () => {
        deployModal.style.display = 'none';
        openMyAppsDrawer();
      });
    }

    deployModal.style.display = 'block';
    authBackdrop.style.display = 'block';
  };
}

/**
 * Cloud Database System & Management Modal
 */
function initCloudDbSystem() {
  const dbModal = document.getElementById('cloud-db-modal');
  const backdrop = document.getElementById('auth-backdrop');

  window.openCloudDbModal = function () {
    if (!dbModal) return;
    const config = authDb.dbConfig;
    const body = document.getElementById('cloud-db-body');
    if (body) {
      body.innerHTML = `
        <div style="padding:10px 0;">
          <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
            <div style="width:36px; height:36px; border-radius:var(--radius-sm); background:rgba(48, 209, 88, 0.15); color:var(--agent-dsh-qa); display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              ☁️
            </div>
            <div>
              <h3 style="margin:0; font-size:1.15rem; color:var(--text-primary);">Free Cloud Database</h3>
              <span style="font-size:0.8rem; color:var(--agent-dsh-qa); font-weight:500;">Connected & Operational 🟢</span>
            </div>
          </div>

          <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">
            ApexSaaS provisions a zero-cost <strong>Supabase PostgreSQL</strong> cloud instance for your deployed micro-apps. All submissions, customer signups, and bookings are encrypted and synced in real time.
          </p>

          <div style="background:var(--bg-surface-2); border:1px solid var(--border-medium); border-radius:var(--radius-md); padding:16px; margin:16px 0;">
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
              <span style="color:var(--text-secondary);">Provider:</span>
              <strong style="color:var(--text-primary);">${config.provider}</strong>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
              <span style="color:var(--text-secondary);">Region:</span>
              <span style="color:var(--text-primary);">${config.region}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:0.85rem;">
              <span style="color:var(--text-secondary);">Storage Allocation:</span>
              <span class="badge badge-emerald">500MB Free Tier</span>
            </div>
            <div style="display:flex; justify-content:space-between; font-size:0.85rem;">
              <span style="color:var(--text-secondary);">SSL / TLS:</span>
              <span style="color:var(--text-primary);">Encrypted End-to-End</span>
            </div>
          </div>

          <div style="margin-top:16px;">
            <label style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); display:block; margin-bottom:6px;">
              Custom Supabase Project URL (Optional)
            </label>
            <input type="text" id="custom-supabase-url" class="field-input" placeholder="https://your-project.supabase.co" value="${config.customUrl || ''}">
            
            <label style="font-size:0.8rem; font-weight:600; color:var(--text-secondary); display:block; margin-top:10px; margin-bottom:6px;">
              Custom Supabase Anon Key (Optional)
            </label>
            <input type="password" id="custom-supabase-key" class="field-input" placeholder="eyJhbGciOi..." value="${config.customAnonKey || ''}">

            <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
              <button class="btn btn-secondary" id="btn-close-db-modal">Close</button>
              <button class="btn btn-primary" id="btn-save-db-config">Save Custom Database</button>
            </div>
          </div>
        </div>
      `;

      document.getElementById('btn-close-db-modal')?.addEventListener('click', () => {
        dbModal.style.display = 'none';
        backdrop.style.display = 'none';
      });

      document.getElementById('btn-save-db-config')?.addEventListener('click', () => {
        const url = document.getElementById('custom-supabase-url')?.value.trim();
        const key = document.getElementById('custom-supabase-key')?.value.trim();
        authDb.saveCustomCloudDb(url, key);
        if (window.showToast) window.showToast('Cloud Database settings updated!', 'success');
        dbModal.style.display = 'none';
        backdrop.style.display = 'none';
      });
    }

    dbModal.style.display = 'block';
    backdrop.style.display = 'block';
  };
}

/**
 * "My Deployed Apps" Drawer Panel
 */
function openMyAppsDrawer() {
  const drawer = document.getElementById('my-apps-drawer');
  const backdrop = document.getElementById('auth-backdrop');
  if (!drawer) return;

  const apps = authDb.getDeployedApps();
  const listEl = document.getElementById('my-apps-list');
  if (listEl) {
    if (apps.length === 0) {
      listEl.innerHTML = `
        <div style="text-align:center; padding:40px 20px; color:var(--text-secondary);">
          <div style="font-size:2rem; margin-bottom:10px;">📦</div>
          <p>You haven't deployed any apps yet.</p>
          <button class="btn btn-primary btn-sm" onclick="document.getElementById('generator').scrollIntoView({behavior:'smooth'}); document.getElementById('my-apps-drawer').style.display='none'; document.getElementById('auth-backdrop').style.display='none';">
            Create an App Now
          </button>
        </div>
      `;
    } else {
      listEl.innerHTML = apps.map(app => `
        <div class="deployed-app-card">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <h4 style="margin:0; font-size:1rem; font-weight:600; color:var(--text-primary);">${app.name}</h4>
              <p style="margin:2px 0 8px 0; font-size:0.8rem; color:var(--text-secondary);">${app.tagline}</p>
            </div>
            <span class="badge badge-emerald" style="font-size:0.65rem;">${app.status || 'Live'}</span>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-3); padding:8px 12px; border-radius:var(--radius-sm); font-size:0.75rem; margin:8px 0;">
            <span style="color:var(--text-secondary);">Cloud DB: <strong>${app.cloudDatabase || 'PostgreSQL'}</strong></span>
            <span style="color:var(--agent-dsh-qa); font-weight:600;">Active 🟢</span>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-top:10px;">
            <a href="${app.liveUrl}" target="_blank" class="btn btn-sm btn-outline" style="font-size:0.75rem;">
              Open Live App ↗
            </a>
            <span style="font-size:0.75rem; color:var(--text-tertiary);">Deployed ${new Date(app.deployedAt).toLocaleDateString()}</span>
          </div>
        </div>
      `).join('');
    }
  }

  drawer.style.display = 'block';
  backdrop.style.display = 'block';

  document.getElementById('my-apps-drawer-close')?.addEventListener('click', () => {
    drawer.style.display = 'none';
    backdrop.style.display = 'none';
  });
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

function initCommandPalette() {
  const palette = document.getElementById('cmd-palette');
  const backdrop = document.getElementById('palette-backdrop');
  const input = document.getElementById('cmd-palette-input');
  const resultsContainer = document.getElementById('cmd-results-list');

  if (!palette || !input || !resultsContainer) return;

  const commands = [
    { title: 'Create New App', icon: '✨', section: 'generator' },
    { title: 'View Pricing & Plans', icon: '💳', section: 'pricing' },
    { title: 'Explore Customer Use Cases', icon: '🚀', section: 'use-cases' },
    { title: 'Free Cloud Database Settings', icon: '☁️', action: 'db' },
    { title: 'My Deployed Apps', icon: '📦', action: 'my-apps' }
  ];

  function openPalette() {
    palette.style.display = 'block';
    if (backdrop) backdrop.style.display = 'block';
    input.value = '';
    renderResults(commands);
    input.focus();
  }

  function closePalette() {
    palette.style.display = 'none';
    if (backdrop) backdrop.style.display = 'none';
  }

  function renderResults(list) {
    resultsContainer.innerHTML = list.map((item, idx) => `
      <div class="cmd-item ${idx === 0 ? 'selected' : ''}" data-idx="${idx}">
        <span class="cmd-item-icon">${item.icon}</span>
        <span class="cmd-item-title">${item.title}</span>
      </div>
    `).join('');

    resultsContainer.querySelectorAll('.cmd-item').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-idx'), 10);
        executeCommand(list[idx]);
        closePalette();
      });
    });
  }

  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      palette.style.display === 'block' ? closePalette() : openPalette();
    } else if (e.key === 'Escape' && palette.style.display === 'block') {
      closePalette();
    }
  });

  backdrop?.addEventListener('click', closePalette);

  function executeCommand(cmd) {
    if (cmd.section) {
      document.getElementById(cmd.section)?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'db') {
      window.openCloudDbModal();
    } else if (cmd.action === 'my-apps') {
      openMyAppsDrawer();
    }
  }
}

function initStatsTicker() {
  const commitEl = document.getElementById('stat-commits-val');
  const arrEl = document.getElementById('stat-arr-val');
  const userCountEl = document.getElementById('stat-users-val');

  let baseApps = 1420;
  let baseUsers = 38500;

  setInterval(() => {
    if (Math.random() > 0.45) {
      baseApps += 1;
      if (commitEl) commitEl.innerText = baseApps.toLocaleString();
    }
    if (Math.random() > 0.6) {
      baseUsers += Math.floor(Math.random() * 5 + 1);
      if (userCountEl) userCountEl.innerText = baseUsers.toLocaleString();
    }
  }, 4500);
}
