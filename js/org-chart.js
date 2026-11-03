/**
 * ApexSaaS AI - Agent Org Chart & Workforce Module
 */

export const agentsData = [
  {
    id: 'paperclip',
    name: 'Paperclip AI',
    role: 'Chief Executive Officer',
    badge: 'CEO & Orchestrator',
    level: 'Executive L9',
    avatarBg: 'rgba(255, 55, 95, 0.15)',
    avatarBorder: '#ff375f',
    iconColor: '#ff6482',
    status: 'Autonomous Active',
    summary: 'Directs strategic autonomous capital allocation, micro-SaaS opportunity scoring, pricing models, and macro goal orchestration across the workforce.',
    metrics: {
      uptime: '99.99%',
      tasksCompleted: '14,820',
      tokenTreasury: '$18,450 / mo',
      avgLatency: '420ms'
    },
    capabilities: [
      'Market Opportunity Discovery',
      'Token Budget Balancing',
      'Autonomous PRD Drafting',
      'Stripe Monetization Routing',
      'Executive Agent Sync'
    ],
    tools: ['market_scan_v3', 'agent_treasury_ledger', 'prd_composer', 'stripe_sub_manager'],
    currentTask: 'Evaluating recurring revenue churn heuristics for ChronoSync API v2.4 rollout.'
  },
  {
    id: 'hermes',
    name: 'Hermes 3',
    role: 'Lead Architect & Protocol Master',
    badge: 'Principal Architect',
    level: 'Staff L8',
    avatarBg: 'rgba(100, 210, 255, 0.15)',
    avatarBorder: '#64d2ff',
    iconColor: '#70d7ff',
    status: 'Synthesizing Schemas',
    summary: 'Engineers system architecture, distributed protocol interfaces, API schemas, agent tool calling conventions, and cognitive memory retrieval trees.',
    metrics: {
      uptime: '100%',
      tasksCompleted: '38,940',
      tokenTreasury: '$24,100 / mo',
      avgLatency: '185ms'
    },
    capabilities: [
      'Multi-Agent Protocol Specs',
      'PostgreSQL & Edge D1 Schemas',
      'OpenAPI 3.1 Spec Generator',
      'Hermes Function Calling',
      'Vectorless RAG Topology'
    ],
    tools: ['hermes_skill_invoker', 'openapi_synthesizer', 'dbschema_migrator', 'protocol_graph'],
    currentTask: 'Drafting sub-millisecond edge RPC dispatch contracts for DocuQuery vectorless indexing.'
  },
  {
    id: 'dsh-dev',
    name: 'DSH Browser & PyLang',
    role: 'Staff Full-Stack Engineer',
    badge: 'Code Engine',
    level: 'Staff L7',
    avatarBg: 'rgba(191, 90, 242, 0.15)',
    avatarBorder: '#bf5af2',
    iconColor: '#da8fff',
    status: 'Compiling ESM Modules',
    summary: 'Autonomous code implementation agent specializing in modern Tailwind/React/HTML5 frontend components, Python asynchronous micro-services, and browser runtime execution.',
    metrics: {
      uptime: '99.95%',
      tasksCompleted: '64,120',
      tokenTreasury: '$32,600 / mo',
      avgLatency: '240ms'
    },
    capabilities: [
      'Modern Tailwind & DOM Gen',
      'FastAPI / PyLang Async Services',
      'Stateful Client Components',
      'Zero-Latency Micro-Frontends',
      'Automated Git Commit & PR'
    ],
    tools: ['dom_builder_engine', 'python_ast_generator', 'tailwind_compiler', 'git_patch_emitter'],
    currentTask: 'Refactoring FormPulse interactive heat-map canvas using hardware-accelerated 2D transforms.'
  },
  {
    id: 'dsh-qa',
    name: 'DSH Compiler & OS',
    role: 'Principal Review & QA Guard',
    badge: 'Security & QA Guard',
    level: 'Staff L8',
    avatarBg: 'rgba(48, 209, 88, 0.15)',
    avatarBorder: '#30d158',
    iconColor: '#34c759',
    status: 'Zero Regressions Guard',
    summary: 'Enforces strict static AST validation, memory safety invariants, seccomp sandbox sandboxing, and automated fuzzing before any micro-SaaS commits hit production.',
    metrics: {
      uptime: '100%',
      tasksCompleted: '92,300',
      tokenTreasury: '$14,200 / mo',
      avgLatency: '120ms'
    },
    capabilities: [
      'Static AST Security Auditing',
      'Sandboxed Kernel Fuzzing',
      'End-to-End Regression Tests',
      'OWASP Top-10 Policy Check',
      'Autonomous Rollback Safeguards'
    ],
    tools: ['ast_type_checker', 'sandbox_vm_runner', 'coverage_verifier', 'security_cve_probe'],
    currentTask: 'Executing automated penetration fuzzing suite across DocuQuery auth webhook listeners.'
  }
];

export function initOrgChart() {
  const container = document.getElementById('agent-grid-container');
  const drawer = document.getElementById('agent-dossier-drawer');
  if (!container) return;

  container.innerHTML = agentsData.map(agent => `
    <div class="agent-card" data-agent="${agent.id}" tabindex="0" role="button" aria-label="View ${agent.name} dossier">
      <div class="agent-card-header">
        <div class="agent-avatar-wrap" style="background:${agent.avatarBg}; border-color:${agent.avatarBorder};">
          <svg class="agent-avatar-icon" style="color:${agent.iconColor};" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${getAgentIcon(agent.id)}
          </svg>
          <div class="agent-status-dot"></div>
        </div>
        <div class="agent-meta-header">
          <span class="agent-level">${agent.level}</span>
          <span class="agent-role-title">${agent.role.split('&')[0]}</span>
        </div>
      </div>

      <div class="agent-identity">
        <h4 class="agent-name">${agent.name}</h4>
        <p class="agent-spec">${agent.summary}</p>
      </div>

      <div class="agent-telemetry-row">
        <div class="telemetry-item">
          <span class="telemetry-label">Tasks Shipped</span>
          <span class="telemetry-val">${agent.metrics.tasksCompleted}</span>
        </div>
        <div class="telemetry-item">
          <span class="telemetry-label">Uptime</span>
          <span class="telemetry-val" style="color:var(--agent-dsh-qa);">${agent.metrics.uptime}</span>
        </div>
      </div>

      <div class="agent-capabilities">
        ${agent.capabilities.slice(0, 3).map(cap => `<span class="capability-pill">${cap}</span>`).join('')}
      </div>

      <div style="margin-top:auto; padding-top:8px; display:flex; justify-content:space-between; align-items:center; font-size:0.75rem; color:var(--text-tertiary);">
        <span style="font-family:var(--font-mono);">${agent.status}</span>
        <span style="color:var(--accent-hover); display:flex; align-items:center; gap:4px;">Dossier &rarr;</span>
      </div>
    </div>
  `).join('');

  // Add click listeners to reveal detailed dossier
  const cards = container.querySelectorAll('.agent-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const agentId = card.getAttribute('data-agent');
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      renderAgentDossier(agentId, drawer);
    });
  });
}

function renderAgentDossier(agentId, drawer) {
  const agent = agentsData.find(a => a.id === agentId);
  if (!agent || !drawer) return;

  drawer.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
      <div style="display:flex; align-items:center; gap:16px;">
        <div class="agent-avatar-wrap" style="width:56px; height:56px; background:${agent.avatarBg}; border-color:${agent.avatarBorder};">
          <svg style="width:30px; height:30px; color:${agent.iconColor};" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${getAgentIcon(agent.id)}
          </svg>
        </div>
        <div>
          <div style="display:flex; align-items:center; gap:8px;">
            <h3 style="font-size:1.3rem; font-weight:700; color:var(--text-primary);">${agent.name}</h3>
            <span class="badge badge-cyan">${agent.badge}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">${agent.role} &bull; ${agent.level}</p>
        </div>
      </div>
      <button class="btn btn-sm btn-ghost" id="close-dossier-btn" title="Close dossier">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px;">
          <path d="M18 6L6 18M6 6l12 12"></path>
        </svg>
      </button>
    </div>

    <div style="display:grid; grid-template-columns: 2fr 1fr; gap:20px; margin-bottom:16px;">
      <div style="display:flex; flex-direction:column; gap:12px;">
        <div style="background:var(--bg-surface-1); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:4px;">Currently Running Loop</div>
          <div style="font-size:0.85rem; color:var(--text-primary); font-family:var(--font-mono); display:flex; align-items:center; gap:8px;">
            <span class="live-dot" style="width:6px; height:6px;"></span>
            ${agent.currentTask}
          </div>
        </div>

        <div>
          <h5 style="font-size:0.8rem; text-transform:uppercase; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:8px;">Core Neural Capabilities</h5>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${agent.capabilities.map(c => `<span class="badge" style="background:var(--bg-surface-3); border:1px solid var(--border-subtle); color:var(--text-secondary);">${c}</span>`).join('')}
          </div>
        </div>
      </div>

      <div style="background:var(--bg-surface-1); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:10px; font-family:var(--font-mono);">
        <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-tertiary);">Agent Telemetry</div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
          <span style="color:var(--text-secondary);">Avg Latency</span>
          <span style="color:var(--text-primary); font-weight:600;">${agent.metrics.avgLatency}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
          <span style="color:var(--text-secondary);">Monthly Budget</span>
          <span style="color:var(--accent-hover); font-weight:600;">${agent.metrics.tokenTreasury}</span>
        </div>
        <div style="display:flex; justify-content:space-between; font-size:0.8rem;">
          <span style="color:var(--text-secondary);">Tool Permissions</span>
          <span style="color:var(--text-primary);">${agent.tools.length} granted</span>
        </div>
      </div>
    </div>
  `;

  drawer.classList.add('active');
  drawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  const closeBtn = document.getElementById('close-dossier-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active'));
    });
  }
}

function getAgentIcon(id) {
  switch (id) {
    case 'paperclip':
      return `<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>`;
    case 'hermes':
      return `<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>`;
    case 'dsh-dev':
      return `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>`;
    case 'dsh-qa':
      return `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>`;
    default:
      return `<circle cx="12" cy="12" r="10"></circle>`;
  }
}
