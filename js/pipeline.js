/**
 * ApexSaaS AI - Active SaaS Projects Kanban Pipeline Module
 */

export const projectsData = [
  {
    id: 'docuquery',
    name: 'DocuQuery AI',
    category: 'Enterprise AI & Search',
    stage: 'code-test', // 'ideation' | 'arch-specs' | 'code-test' | 'live'
    tagline: 'Vectorless instant RAG & document compliance verification engine for SOC-2.',
    description: 'Autonomous micro-SaaS that analyzes dense PDF contracts and legal clauses without expensive GPU vector embeddings using deterministic keyword-tree indexation.',
    metrics: {
      arr: '$48,200',
      mrr: '$4,150',
      activeUsers: '1,420 companies',
      health: '99.98%',
      commits: '348 autonomous commits',
      pricing: '$49 - $199 / mo'
    },
    techStack: ['Next.js 15', 'FastAPI (Python)', 'DuckDB', 'Hermes Function Calling', 'Tailwind CSS'],
    leadAgents: [
      { id: 'hermes', name: 'Hermes 3', role: 'Architect' },
      { id: 'dsh-dev', name: 'DSH Dev', role: 'Full-Stack' },
      { id: 'dsh-qa', name: 'DSH QA', role: 'Verifier' }
    ],
    architecture: {
      ingestion: 'Streaming multipart parser with seccomp sandbox isolation',
      indexing: 'B-Tree deterministic token inversion (sub-5ms lookup latency)',
      apiEndpoints: ['POST /v1/ingest', 'POST /v1/query', 'GET /v1/audit-trail'],
      database: 'Distributed DuckDB instances replicated across Cloudflare edge'
    },
    recentCommits: [
      'feat: Hermes prompt optimizer reduced token usage by 34%',
      'test: DSH QA added 42 boundary fuzz tests on PDF stream parser',
      'perf: DSH Dev swapped vector search for indexed inverted tree'
    ]
  },
  {
    id: 'chronosync',
    name: 'ChronoSync API',
    category: 'Developer Tooling & Infra',
    stage: 'live',
    tagline: 'Fault-tolerant bi-directional webhook & database synchronizer with zero drop guarantee.',
    description: 'Automated webhook relay middleware that catches broken payloads, computes cryptographic delivery proofs, and provides instant replay queues for payment systems.',
    metrics: {
      arr: '$112,500',
      mrr: '$9,375',
      activeUsers: '4,890 developers',
      health: '100.00%',
      commits: '892 autonomous commits',
      pricing: '$29 - $499 / mo'
    },
    techStack: ['Rust Core', 'Node.js ESM', 'Redis Streams', 'ClickHouse', 'Fly.io Edge'],
    leadAgents: [
      { id: 'paperclip', name: 'Paperclip AI', role: 'CEO & Pricing' },
      { id: 'dsh-dev', name: 'DSH Dev', role: 'Core Eng' },
      { id: 'dsh-qa', name: 'DSH QA', role: 'Zero-Drop Guard' }
    ],
    architecture: {
      ingestion: 'High-throughput epoll non-blocking webhook receiver',
      indexing: 'Write-ahead log buffer with Redis Streams idempotency keys',
      apiEndpoints: ['POST /v1/webhooks/catch', 'GET /v1/replay', 'GET /v1/metrics'],
      database: 'Distributed Redis + ClickHouse analytical query engine'
    },
    recentCommits: [
      'release: Paperclip bumped tier limits for Pro tier based on margin analytics',
      'fix: DSH QA isolated memory leak in edge socket cleanup handler',
      'feat: DSH Dev implemented HMAC-SHA256 auto-verification'
    ]
  },
  {
    id: 'formpulse',
    name: 'FormPulse Analytics',
    category: 'Product & Conversion Micro-SaaS',
    stage: 'arch-specs',
    tagline: 'Zero-cookie autonomous checkout abandon recovery & field friction telemetry.',
    description: 'Lightweight 2.4KB telemetry script that detects high friction input fields, autofill failures, and rage-clicks on checkout forms with real-time conversion recommendations.',
    metrics: {
      arr: '$24,000 (Projected)',
      mrr: '$2,000 (Pre-orders)',
      activeUsers: '380 Waitlist',
      health: 'Ready for Sprint',
      commits: '112 autonomous commits',
      pricing: '$19 - $79 / mo'
    },
    techStack: ['TypeScript', 'Cloudflare Workers', 'D1 SQLite', 'Chart.js micro', 'CSS Grids'],
    leadAgents: [
      { id: 'hermes', name: 'Hermes 3', role: 'Protocol Architect' },
      { id: 'dsh-dev', name: 'DSH Dev', role: 'Micro-Bundle Dev' },
      { id: 'paperclip', name: 'Paperclip AI', role: 'Market Fit' }
    ],
    architecture: {
      ingestion: 'Beacon API 1.8KB script sending compressed delta events',
      indexing: 'Cloudflare D1 edge database with instant aggregation views',
      apiEndpoints: ['POST /v1/events/beacon', 'GET /v1/heatmaps', 'GET /v1/friction-report'],
      database: 'Edge SQLite D1 with automatic cold storage to R2'
    },
    recentCommits: [
      'spec: Hermes finalized 1.8KB binary event wire protocol',
      'market: Paperclip completed competitor price benchmarking against Hotjar',
      'test: DSH QA verified GDPR non-PII tokenization rules'
    ]
  }
];

export const stages = [
  { id: 'ideation', name: '1. Ideation & Market Fit', dotColor: '#ff375f' },
  { id: 'arch-specs', name: '2. Architecture & Specs', dotColor: '#64d2ff' },
  { id: 'code-test', name: '3. Code & Automated QA', dotColor: '#bf5af2' },
  { id: 'live', name: '4. Staging & Production', dotColor: '#30d158' }
];

export function initPipeline() {
  renderKanban();
  setupFilterTabs();
}

export function renderKanban(filterCategory = 'all') {
  const board = document.getElementById('kanban-board');
  if (!board) return;

  const filtered = filterCategory === 'all' 
    ? projectsData 
    : projectsData.filter(p => p.category.toLowerCase().includes(filterCategory.toLowerCase()));

  board.innerHTML = stages.map(stage => {
    const stageProjects = filtered.filter(p => p.stage === stage.id);
    return `
      <div class="kanban-col" data-stage="${stage.id}">
        <div class="kanban-col-header">
          <div class="col-title-wrap">
            <span class="col-dot" style="background:${stage.dotColor};"></span>
            <span class="col-title">${stage.name}</span>
          </div>
          <span class="col-count">${stageProjects.length}</span>
        </div>

        <div class="kanban-col-body">
          ${stageProjects.length === 0 ? `
            <div style="padding:24px 12px; text-align:center; color:var(--text-muted); font-size:0.75rem; font-family:var(--font-mono); border:1px dashed var(--border-subtle); border-radius:var(--radius-md);">
              Autonomous Agent Slot Ready
            </div>
          ` : ''}

          ${stageProjects.map(project => `
            <div class="project-card" data-project-id="${project.id}" tabindex="0" role="button">
              <div class="project-card-header">
                <div class="project-title-group">
                  <h4 class="project-name">${project.name}</h4>
                  <span class="project-category">${project.category}</span>
                </div>
                <span class="badge ${getStageBadgeClass(project.stage)}">${getStageName(project.stage)}</span>
              </div>

              <p class="project-desc">${project.tagline}</p>

              <div class="project-metric-row">
                <div class="project-metric-item">
                  <span class="project-metric-label">ARR / MRR</span>
                  <span class="project-metric-val">${project.metrics.arr}</span>
                </div>
                <div class="project-metric-item" style="text-align:right;">
                  <span class="project-metric-label">Active Users</span>
                  <span class="project-metric-val" style="color:var(--accent-hover);">${project.metrics.activeUsers}</span>
                </div>
              </div>

              <div class="project-footer">
                <div class="project-agents-stack" title="Assigned Autonomous Agents">
                  ${project.leadAgents.map(a => `
                    <div class="agent-mini-avatar" style="background:${getAgentColor(a.id)};" title="${a.name} (${a.role})">
                      ${a.name.charAt(0)}
                    </div>
                  `).join('')}
                </div>
                <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--agent-dsh-qa);">${project.metrics.health}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  // Attach click listeners to cards
  const cards = board.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const pid = card.getAttribute('data-project-id');
      openProjectModal(pid);
    });
  });
}

function setupFilterTabs() {
  const filterBtns = document.querySelectorAll('.pipeline-tab-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat') || 'all';
      renderKanban(cat);
    });
  });
}

export function openProjectModal(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const modalContainer = document.getElementById('project-modal');
  if (!modalContainer) return;

  modalContainer.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:12px;">
          <div style="width:36px; height:36px; border-radius:var(--radius-md); background:var(--bg-surface-2); display:flex; align-items:center; justify-content:center; border:1px solid var(--border-medium);">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:20px; height:20px; color:var(--accent-hover);">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </div>
          <div>
            <h3 class="modal-title">${project.name}</h3>
            <span style="font-size:0.75rem; color:var(--text-tertiary); font-family:var(--font-mono);">${project.category} &bull; Stage: ${getStageName(project.stage)}</span>
          </div>
        </div>
        <button class="modal-close-btn" id="modal-close-x">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:18px; height:18px;">
            <path d="M18 6L6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div class="modal-body" style="display:flex; flex-direction:column; gap:20px;">
        <div>
          <h4 style="font-size:0.9rem; font-weight:600; color:var(--text-primary); margin-bottom:6px;">Autonomous Value Proposition</h4>
          <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.5;">${project.description}</p>
        </div>

        <!-- Telemetry Stats Grid -->
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
          <div style="background:var(--bg-surface-2); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div style="font-size:0.7rem; color:var(--text-tertiary); font-family:var(--font-mono); text-transform:uppercase;">Recurring Revenue</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:2px; font-family:var(--font-mono);">${project.metrics.arr}</div>
            <div style="font-size:0.72rem; color:var(--agent-dsh-qa); margin-top:2px;">MRR: ${project.metrics.mrr}</div>
          </div>
          <div style="background:var(--bg-surface-2); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div style="font-size:0.7rem; color:var(--text-tertiary); font-family:var(--font-mono); text-transform:uppercase;">Active Scale</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--text-primary); margin-top:2px; font-family:var(--font-mono);">${project.metrics.activeUsers}</div>
            <div style="font-size:0.72rem; color:var(--text-tertiary); margin-top:2px;">Uptime: ${project.metrics.health}</div>
          </div>
          <div style="background:var(--bg-surface-2); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
            <div style="font-size:0.7rem; color:var(--text-tertiary); font-family:var(--font-mono); text-transform:uppercase;">Autonomous Velocity</div>
            <div style="font-size:1.1rem; font-weight:700; color:var(--accent-hover); margin-top:2px; font-family:var(--font-mono);">${project.metrics.commits}</div>
            <div style="font-size:0.72rem; color:var(--text-tertiary); margin-top:2px;">${project.metrics.pricing}</div>
          </div>
        </div>

        <!-- Architecture Breakdown -->
        <div style="background:var(--bg-surface-2); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <h5 style="font-size:0.8rem; text-transform:uppercase; color:var(--accent-hover); font-family:var(--font-mono); margin-bottom:10px;">Hermes Architecture & Specs</h5>
          <div style="display:flex; flex-direction:column; gap:8px; font-size:0.8rem; font-family:var(--font-mono);">
            <div><span style="color:var(--text-tertiary);">Data Ingestion:</span> <span style="color:var(--text-primary);">${project.architecture.ingestion}</span></div>
            <div><span style="color:var(--text-tertiary);">Query Engine:</span> <span style="color:var(--text-primary);">${project.architecture.indexing}</span></div>
            <div><span style="color:var(--text-tertiary);">Core Endpoints:</span> <span style="color:var(--accent-hover);">${project.architecture.apiEndpoints.join(', ')}</span></div>
            <div><span style="color:var(--text-tertiary);">Storage Topology:</span> <span style="color:var(--text-secondary);">${project.architecture.database}</span></div>
          </div>
        </div>

        <!-- Tech Stack -->
        <div>
          <h5 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:8px;">Production Tech Stack</h5>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${project.techStack.map(t => `<span class="badge" style="background:var(--bg-surface-3); border:1px solid var(--border-subtle); color:var(--text-primary);">${t}</span>`).join('')}
          </div>
        </div>

        <!-- Recent Autonomous Commits -->
        <div>
          <h5 style="font-size:0.75rem; text-transform:uppercase; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:8px;">Recent Autonomous Agent Activity</h5>
          <div style="display:flex; flex-direction:column; gap:6px; font-family:var(--font-mono); font-size:0.78rem;">
            ${project.recentCommits.map(c => `
              <div style="display:flex; align-items:center; gap:8px; padding:6px 10px; background:var(--bg-surface-3); border-radius:var(--radius-sm); border:1px solid var(--border-subtle);">
                <span class="live-dot" style="width:6px; height:6px; background:var(--agent-dsh-qa);"></span>
                <span style="color:var(--text-secondary);">${c}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Stage Advance Action -->
        <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px; border-top:1px solid var(--border-subtle);">
          <button class="btn btn-secondary btn-sm" id="btn-advance-stage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px;">
              <polyline points="13 17 18 12 13 7"></polyline>
              <polyline points="6 17 11 12 6 7"></polyline>
            </svg>
            Advance Pipeline Stage
          </button>
          <button class="btn btn-primary btn-sm" id="btn-trigger-sprint">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px; height:14px;">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
            Trigger Autonomous Agent Sprint
          </button>
        </div>
      </div>
    </div>
  `;

  modalContainer.classList.add('active');

  const closeBtn = document.getElementById('modal-close-x');
  closeBtn?.addEventListener('click', () => modalContainer.classList.remove('active'));

  modalContainer.onclick = (e) => {
    if (e.target === modalContainer) modalContainer.classList.remove('active');
  };

  document.getElementById('btn-advance-stage')?.addEventListener('click', () => {
    advanceProjectStage(project.id);
  });

  document.getElementById('btn-trigger-sprint')?.addEventListener('click', () => {
    if (window.showToast) {
      window.showToast(`Autonomous sprint triggered for ${project.name}! Agents Hermes & DSH Dev dispatched.`, 'success');
    }
    modalContainer.classList.remove('active');
    // Also inject sprint start in terminal if available
    if (window.injectTerminalLog) {
      window.injectTerminalLog('paperclip', `CEO authorized autonomous sprint allocation for [${project.name}]. Budget: $450 token compute.`);
      window.injectTerminalLog('hermes', `Hermes evaluating architecture delta for ${project.name}...`);
      window.injectTerminalLog('dsh-dev', `DSH Dev running hot-patch build on micro-frontends.`);
    }
  });
}

function advanceProjectStage(projectId) {
  const project = projectsData.find(p => p.id === projectId);
  if (!project) return;

  const stageOrder = ['ideation', 'arch-specs', 'code-test', 'live'];
  const currentIndex = stageOrder.indexOf(project.stage);
  const nextIndex = (currentIndex + 1) % stageOrder.length;
  project.stage = stageOrder[nextIndex];

  if (window.showToast) {
    window.showToast(`Updated ${project.name} to ${getStageName(project.stage)}!`, 'info');
  }

  const modalContainer = document.getElementById('project-modal');
  modalContainer?.classList.remove('active');
  renderKanban();
}

function getStageName(stageId) {
  switch (stageId) {
    case 'ideation': return 'Ideation';
    case 'arch-specs': return 'Arch & Specs';
    case 'code-test': return 'Code & QA';
    case 'live': return 'Staging / Live';
    default: return stageId;
  }
}

function getStageBadgeClass(stageId) {
  switch (stageId) {
    case 'ideation': return 'badge-magenta';
    case 'arch-specs': return 'badge-cyan';
    case 'code-test': return 'badge-purple';
    case 'live': return 'badge-emerald';
    default: return 'badge-cyan';
  }
}

function getAgentColor(agentId) {
  switch (agentId) {
    case 'paperclip': return '#ff375f';
    case 'hermes': return '#64d2ff';
    case 'dsh-dev': return '#bf5af2';
    case 'dsh-qa': return '#30d158';
    default: return '#0071e3';
  }
}
