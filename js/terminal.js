/**
 * ApexSaaS AI - Live Agent Activity Terminal & Streaming Engine
 */

export const mockLogTemplates = [
  { agent: 'paperclip', text: 'Market scanner detected unmet demand in [FinTech]: Multi-currency Stripe auto-reconciliation. Drafting PRD.' },
  { agent: 'hermes', text: 'Synthesizing OpenAPI 3.1 contract for <span class="file-path">/api/v2/reconcile</span> with sub-50ms idempotency guarantees.' },
  { agent: 'dsh-dev', text: 'Compiling React 19 server actions in <span class="file-path">components/dashboard/ReconcileMatrix.tsx</span> (bundle size: 4.8KB).' },
  { agent: 'dsh-qa', text: 'Zero-regression AST safety scan passed. 18 fuzz test vectors verified; 0 memory leaks found. <span class="success-tag">PASS 100%</span>' },
  { agent: 'paperclip', text: 'Evaluating monthly token budget: Spent <span class="token-highlight">$4.12</span> on PRD & architecture synthesis. Margin efficiency: 98.4%.' },
  { agent: 'hermes', text: 'Invoking skill <span class="file-path">lingshu-browser:browser-0754386d</span> for edge HTTP fetch retry telemetry.' },
  { agent: 'dsh-dev', text: 'Generated high-performance inverted index in <span class="file-path">core/indexing/deterministic_tree.py</span>. Execution: 2.1ms.' },
  { agent: 'dsh-qa', text: 'Seccomp sandboxed VM execution confirmed: 0 unauthorized syscalls. Ready for container deployment.' },
  { agent: 'system', text: 'Autonomous git commit generated: <span class="commit-hash">feat(docuquery): add sub-5ms inverted b-tree parser #892</span>' },
  { agent: 'hermes', text: 'Coordinating protocol handoff: Hermes &rarr; DSH Dev with JSON schema payload size: 1.4KB.' },
  { agent: 'paperclip', text: 'Stripe webhook caught: ChronoSync API converted 2 new annual Pro subscribers ($998 ARR added).' },
  { agent: 'dsh-dev', text: 'Tailwind CSS JIT compiler optimized CSS bundle down to 14.2KB gzip for FormPulse telemetry script.' },
  { agent: 'dsh-qa', text: 'Penetration audit running: SQL injection, prompt injection, and prototype pollution tests: <span class="success-tag">All Clean</span>.' },
  { agent: 'system', text: 'Edge deployment triggered on Cloudflare Workers & Fly.io. Health check HTTP 200 OK across 24 regions.' },
  { agent: 'hermes', text: 'Autonomous cache warm-up: Populated distributed edge cache with 4,200 verified compliance rules.' }
];

let terminalLogs = [];
let isPaused = false;
let currentSpeed = 1; // 1x, 2x, 5x
let currentFilter = 'all';
let autoScroll = true;
let logIntervalTimer = null;

export function initTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  // Pre-populate with initial logs
  const initialCount = 12;
  const now = Date.now();
  for (let i = 0; i < initialCount; i++) {
    const tpl = mockLogTemplates[i % mockLogTemplates.length];
    const timestamp = formatTime(new Date(now - (initialCount - i) * 6000));
    terminalLogs.push({ ...tpl, timestamp, id: i });
  }

  renderLogs();
  startLogStream();
  setupTerminalControls();

  // Expose global helper for other modules
  window.injectTerminalLog = (agent, text) => {
    const timestamp = formatTime(new Date());
    const newLog = {
      agent,
      text,
      timestamp,
      id: Date.now() + Math.random()
    };
    terminalLogs.push(newLog);
    if (terminalLogs.length > 200) terminalLogs.shift();
    renderLogs();
  };
}

function startLogStream() {
  if (logIntervalTimer) clearInterval(logIntervalTimer);
  const intervalMs = Math.max(1200 / currentSpeed, 300);

  logIntervalTimer = setInterval(() => {
    if (isPaused) return;

    // Pick a pseudo-random template or realistic log
    const tpl = mockLogTemplates[Math.floor(Math.random() * mockLogTemplates.length)];
    const timestamp = formatTime(new Date());
    const newLog = {
      agent: tpl.agent,
      text: tpl.text,
      timestamp,
      id: Date.now() + Math.random()
    };

    terminalLogs.push(newLog);
    if (terminalLogs.length > 200) terminalLogs.shift();

    appendLogToDom(newLog);
  }, intervalMs);
}

function renderLogs() {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  const filtered = currentFilter === 'all'
    ? terminalLogs
    : terminalLogs.filter(l => l.agent === currentFilter);

  body.innerHTML = filtered.map(log => createLogRowHtml(log)).join('') + `
    <div style="display:flex; align-items:center; gap:8px; margin-top:8px;">
      <span class="term-time">${formatTime(new Date())}</span>
      <span class="term-agent-pill system">stream</span>
      <span class="term-content" style="color:var(--text-tertiary);">Autonomous Agent Loop running <span class="terminal-cursor"></span></span>
    </div>
  `;

  if (autoScroll) {
    body.scrollTop = body.scrollHeight;
  }
}

function appendLogToDom(log) {
  const body = document.getElementById('terminal-body');
  if (!body) return;

  if (currentFilter !== 'all' && log.agent !== currentFilter) return;

  const row = document.createElement('div');
  row.className = 'terminal-row';
  row.innerHTML = `
    <span class="term-time">${log.timestamp}</span>
    <span class="term-agent-pill ${log.agent}">${getAgentLabel(log.agent)}</span>
    <span class="term-content">${log.text}</span>
  `;

  // Insert before the trailing cursor element
  const trailing = body.lastElementChild;
  if (trailing) {
    body.insertBefore(row, trailing);
  } else {
    body.appendChild(row);
  }

  if (autoScroll) {
    body.scrollTop = body.scrollHeight;
  }
}

function createLogRowHtml(log) {
  return `
    <div class="terminal-row">
      <span class="term-time">${log.timestamp}</span>
      <span class="term-agent-pill ${log.agent}">${getAgentLabel(log.agent)}</span>
      <span class="term-content">${log.text}</span>
    </div>
  `;
}

function setupTerminalControls() {
  // Filter chips
  const filterBtns = document.querySelectorAll('.term-filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      renderLogs();
    });
  });

  // Pause / Resume
  const pauseBtn = document.getElementById('term-pause-btn');
  if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseBtn.innerHTML = isPaused ? `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px; height:13px;">
          <polygon points="5 3 19 12 5 21 5 3"></polygon>
        </svg> Resume
      ` : `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px; height:13px;">
          <rect x="6" y="4" width="4" height="16"></rect>
          <rect x="14" y="4" width="4" height="16"></rect>
        </svg> Pause
      `;
      if (window.showToast) {
        window.showToast(isPaused ? 'Terminal stream paused' : 'Terminal stream resumed', 'info');
      }
    });
  }

  // Speed Toggles
  const speedBtn = document.getElementById('term-speed-btn');
  if (speedBtn) {
    speedBtn.addEventListener('click', () => {
      if (currentSpeed === 1) currentSpeed = 2;
      else if (currentSpeed === 2) currentSpeed = 5;
      else currentSpeed = 1;

      speedBtn.innerText = `${currentSpeed}x`;
      startLogStream();
      if (window.showToast) {
        window.showToast(`Terminal speed set to ${currentSpeed}x`, 'info');
      }
    });
  }

  // Clear Terminal
  const clearBtn = document.getElementById('term-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      terminalLogs = [];
      renderLogs();
      if (window.showToast) {
        window.showToast('Terminal logs cleared', 'info');
      }
    });
  }

  // Auto-scroll toggle
  const scrollToggle = document.getElementById('term-scroll-toggle');
  if (scrollToggle) {
    scrollToggle.addEventListener('click', () => {
      autoScroll = !autoScroll;
      scrollToggle.style.color = autoScroll ? 'var(--text-primary)' : 'var(--text-muted)';
      if (window.showToast) {
        window.showToast(autoScroll ? 'Auto-scroll enabled' : 'Auto-scroll disabled', 'info');
      }
    });
  }
}

function formatTime(date) {
  const h = String(date.getHours()).padStart(2, '0');
  const m = String(date.getMinutes()).padStart(2, '0');
  const s = String(date.getSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function getAgentLabel(agent) {
  switch (agent) {
    case 'paperclip': return 'Paperclip';
    case 'hermes': return 'Hermes';
    case 'dsh-dev': return 'DSH Dev';
    case 'dsh-qa': return 'DSH QA';
    case 'system': return 'System';
    default: return agent;
  }
}
