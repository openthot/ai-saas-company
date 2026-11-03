/**
 * ApexSaaS AI - Main Application Controller
 */

import { initOrgChart } from './org-chart.js';
import { initPipeline } from './pipeline.js';
import { initTerminal } from './terminal.js';
import { initGenerator } from './generator.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Apple Theme Switcher
  initThemeToggle();

  // Initialize Toast System
  initToastSystem();

  // Initialize Core Subsystems
  initOrgChart();
  initPipeline();
  initTerminal();
  initGenerator();

  // Navigation Links & Active State
  initNavigation();

  // Command Palette (Cmd+K)
  initCommandPalette();

  // Dynamic Telemetry Stats Counter
  initStatsTicker();

  console.log('%c  ApexSaaS AI %c Apple Pro Design System Active ', 'background:#0071e3; color:#fff; font-weight:600; padding:3px 8px; border-radius:12px 0 0 12px;', 'background:#161617; color:#64d2ff; padding:3px 8px; border-radius:0 12px 12px 0;');
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
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.replace('#', '');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  });

  // IntersectionObserver for scroll spy
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(s => observer.observe(s));
}

function initToastSystem() {
  const container = document.getElementById('toast-container');
  if (!container) return;

  window.showToast = (message, type = 'info') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else {
      iconSvg = `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(8px)';
      toast.style.transition = 'all 0.25s ease-out';
      setTimeout(() => toast.remove(), 250);
    }, 3800);
  };
}

function initCommandPalette() {
  const cmdTrigger = document.getElementById('cmd-k-btn');
  const paletteModal = document.getElementById('cmd-palette-modal');
  const searchInput = document.getElementById('cmd-search-input');
  const itemsContainer = document.getElementById('cmd-items-container');

  if (!paletteModal) return;

  const togglePalette = (show) => {
    paletteModal.classList.toggle('active', show);
    if (show) {
      searchInput?.focus();
      if (searchInput) searchInput.value = '';
      renderCommandItems('');
    }
  };

  cmdTrigger?.addEventListener('click', () => togglePalette(true));

  // Global keyboard shortcut Cmd+K or Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      togglePalette(!paletteModal.classList.contains('active'));
    }
    if (e.key === 'Escape' && paletteModal.classList.contains('active')) {
      togglePalette(false);
    }
  });

  paletteModal.onclick = (e) => {
    if (e.target === paletteModal) togglePalette(false);
  };

  const commands = [
    { title: 'Jump to Agent Workforce Org Chart', section: 'org-chart', shortcut: 'G O' },
    { title: 'Jump to Active SaaS Kanban Pipeline', section: 'pipeline', shortcut: 'G P' },
    { title: 'Jump to Live Activity Stream Terminal', section: 'terminal', shortcut: 'G T' },
    { title: 'Launch Autonomous SaaS Generator', section: 'generator', shortcut: 'G S' },
    { title: 'Trigger Autonomous Sprint (All Agents)', action: 'sprint', shortcut: 'A S' },
    { title: 'Export Generated Micro-SaaS Specification', action: 'export', shortcut: 'E X' }
  ];

  function renderCommandItems(query) {
    if (!itemsContainer) return;
    const filtered = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

    itemsContainer.innerHTML = filtered.map((c, i) => `
      <div class="cmd-item ${i === 0 ? 'active' : ''}" data-idx="${i}">
        <span>${c.title}</span>
        <span class="cmd-item-key">${c.shortcut}</span>
      </div>
    `).join('');

    itemsContainer.querySelectorAll('.cmd-item').forEach((item, idx) => {
      item.addEventListener('click', () => {
        const cmd = filtered[idx];
        executeCommand(cmd);
        togglePalette(false);
      });
    });
  }

  searchInput?.addEventListener('input', (e) => {
    renderCommandItems(e.target.value);
  });

  function executeCommand(cmd) {
    if (cmd.section) {
      const el = document.getElementById(cmd.section);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.action === 'sprint') {
      if (window.showToast) window.showToast('Global Autonomous Sprint Dispatched!', 'success');
      if (window.injectTerminalLog) {
        window.injectTerminalLog('paperclip', 'Executive prompt: Accelerate pipeline delivery by 2.5x.');
      }
    } else if (cmd.action === 'export') {
      document.getElementById('btn-export-spec')?.click();
    }
  }
}

function initStatsTicker() {
  const commitEl = document.getElementById('stat-commits-val');
  const arrEl = document.getElementById('stat-arr-val');
  const marginEl = document.getElementById('stat-margin-val');
  const saasCountEl = document.getElementById('stat-saas-val');

  let baseCommits = 1352;
  let baseArr = 184700;

  // Subtle real-time increments
  setInterval(() => {
    if (Math.random() > 0.45) {
      baseCommits += 1;
      if (commitEl) commitEl.innerText = baseCommits.toLocaleString();
    }
    if (Math.random() > 0.7) {
      baseArr += Math.floor(Math.random() * 49 + 19);
      if (arrEl) arrEl.innerText = `$${baseArr.toLocaleString()}`;
    }
  }, 4000);
}
