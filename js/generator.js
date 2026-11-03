/**
 * ApexSaaS AI - Interactive SaaS Generator Sandbox Module
 */

export const presetIdeas = [
  {
    title: 'DocuQuery AI',
    idea: 'Autonomous vectorless legal contract & compliance checker for SOC-2 audits',
    stack: 'next-fastapi',
    monetization: 'tiered'
  },
  {
    title: 'ChronoSync API',
    idea: 'Zero-drop distributed webhook relay with cryptographic delivery proofs',
    stack: 'svelte-cf',
    monetization: 'metered'
  },
  {
    title: 'FormPulse Analytics',
    idea: 'Zero-cookie checkout friction telemetry & autofill abandon recovery',
    stack: 'react-fastify',
    monetization: 'freemium'
  },
  {
    title: 'InvoiceShield AI',
    idea: 'Autonomous corporate invoice anomaly detector & B2B duplicate payment blocker',
    stack: 'next-fastapi',
    monetization: 'tiered'
  }
];

let isGenerating = false;
let currentArtifact = null;

export function initGenerator() {
  setupPresetButtons();
  setupGenerateAction();
  setupOutputTabs();
  setupExportActions();

  // Load first preset as default
  loadPreset(presetIdeas[0]);
}

function setupPresetButtons() {
  const container = document.getElementById('preset-ideas-container');
  if (!container) return;

  container.innerHTML = presetIdeas.map((p, idx) => `
    <button type="button" class="preset-pill ${idx === 0 ? 'active' : ''}" data-idx="${idx}">
      ${p.title}
    </button>
  `).join('');

  container.querySelectorAll('.preset-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      container.querySelectorAll('.preset-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const idx = parseInt(btn.getAttribute('data-idx'), 10);
      loadPreset(presetIdeas[idx]);
    });
  });
}

function loadPreset(preset) {
  const ideaInput = document.getElementById('gen-app-idea');
  const stackSelect = document.getElementById('gen-tech-stack');
  const monSelect = document.getElementById('gen-monetization');

  if (ideaInput) ideaInput.value = preset.idea;
  if (stackSelect) stackSelect.value = preset.stack;
  if (monSelect) monSelect.value = preset.monetization;
}

function setupGenerateAction() {
  const generateBtn = document.getElementById('btn-generate-saas');
  if (!generateBtn) return;

  generateBtn.addEventListener('click', async () => {
    if (isGenerating) return;

    const ideaInput = document.getElementById('gen-app-idea');
    const stackSelect = document.getElementById('gen-tech-stack');
    const monSelect = document.getElementById('gen-monetization');

    const idea = ideaInput?.value.trim() || 'AI Micro-SaaS Productivity Engine';
    const stack = stackSelect?.value || 'next-fastapi';
    const monetization = monSelect?.value || 'tiered';

    await runAutonomousGenerationPipeline(idea, stack, monetization);
  });
}

async function runAutonomousGenerationPipeline(idea, stack, monetization) {
  isGenerating = true;
  const generateBtn = document.getElementById('btn-generate-saas');
  const stepper = document.getElementById('generation-stepper');
  const steps = stepper?.querySelectorAll('.step-card') || [];

  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = `
      <svg class="agent-avatar-icon" style="width:16px; height:16px; animation: pulse-dot 1s infinite;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
      </svg>
      Swarm Synthesizing...
    `;
  }

  if (stepper) stepper.classList.add('active');

  // Reset steps
  steps.forEach(s => {
    s.classList.remove('working', 'completed');
  });

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  // Step 1: Paperclip PRD
  steps[0]?.classList.add('working');
  if (window.injectTerminalLog) {
    window.injectTerminalLog('paperclip', `Evaluating market validation for: "${idea.slice(0, 40)}..."`);
  }
  await sleep(650);
  steps[0]?.classList.remove('working');
  steps[0]?.classList.add('completed');

  // Step 2: Hermes Architecture
  steps[1]?.classList.add('working');
  if (window.injectTerminalLog) {
    window.injectTerminalLog('hermes', `Synthesizing data models and edge API topology for stack [${stack}]`);
  }
  await sleep(750);
  steps[1]?.classList.remove('working');
  steps[1]?.classList.add('completed');

  // Step 3: DSH Dev Code Gen
  steps[2]?.classList.add('working');
  if (window.injectTerminalLog) {
    window.injectTerminalLog('dsh-dev', `Generating production-grade React UI & backend asynchronous endpoints`);
  }
  await sleep(850);
  steps[2]?.classList.remove('working');
  steps[2]?.classList.add('completed');

  // Step 4: DSH QA Audit
  steps[3]?.classList.add('working');
  if (window.injectTerminalLog) {
    window.injectTerminalLog('dsh-qa', `Running static AST type checks and OWASP Top 10 penetration suite`);
  }
  await sleep(600);
  steps[3]?.classList.remove('working');
  steps[3]?.classList.add('completed');

  // Step 5: Live Mockup
  steps[4]?.classList.add('working');
  if (window.injectTerminalLog) {
    window.injectTerminalLog('system', `Packaging live interactive preview sandbox container.`);
  }
  await sleep(500);
  steps[4]?.classList.remove('working');
  steps[4]?.classList.add('completed');

  // Build the artifact data
  currentArtifact = createArtifactData(idea, stack, monetization);

  // Render all tabs
  renderPrdTab(currentArtifact);
  renderArchTab(currentArtifact);
  renderCodeTab(currentArtifact);
  renderQaTab(currentArtifact);
  renderMockupTab(currentArtifact);

  // Re-enable button
  if (generateBtn) {
    generateBtn.disabled = false;
    generateBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px;">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      Regenerate Micro-SaaS
    `;
  }

  isGenerating = false;
  if (window.showToast) {
    window.showToast(`Autonomous SaaS generated: "${currentArtifact.name}" is ready!`, 'success');
  }

  // Auto-switch to Live Preview Mockup or PRD
  switchOutputTab('mockup');
}

function createArtifactData(idea, stack, monetization) {
  const name = idea.length > 30 ? idea.split(' ')[0] + ' AI' : (idea || 'NexusSaaS AI');
  
  let stackLabel = 'Next.js 15 + FastAPI (Python) + DuckDB';
  if (stack === 'svelte-cf') stackLabel = 'SvelteKit + Cloudflare Workers + D1 SQLite';
  if (stack === 'react-fastify') stackLabel = 'React 19 + Fastify (Node.js) + PostgreSQL';
  if (stack === 'vue-hono') stackLabel = 'Vue 3 + Hono + ClickHouse Edge';

  let monLabel = 'Tiered Subscription ($29 / $99 / $299 / mo)';
  if (monetization === 'metered') monLabel = 'Usage-Based Metered API ($0.002 / compute unit)';
  if (monetization === 'freemium') monLabel = 'Freemium (Free tier up to 1,000 queries, $49 Pro)';

  return {
    name,
    tagline: idea,
    stackKey: stack,
    stackLabel,
    monetizationLabel: monLabel,
    generatedAt: new Date().toLocaleTimeString(),
    prd: {
      executiveSummary: `Autonomous micro-SaaS engineered to solve: "${idea}". Targets mid-market operations and engineering teams seeking immediate sub-second automation without high vendor lock-in.`,
      targetPersonas: [
        'Operations Directors requiring automated compliance verifications',
        'Senior Full-Stack Developers needing reliable webhook / API relays',
        'Growth & Product Leads optimizing high-ticket conversion funnels'
      ],
      pricingTiers: [
        { name: 'Starter', price: '$29 / mo', quota: '50,000 Ops / month', features: ['Core Inverted Index', 'Sub-10ms Latency', 'Standard Discord Support'] },
        { name: 'Pro Velocity', price: '$99 / mo', quota: '500,000 Ops / month', features: ['All Starter Features', 'Zero-Drop Guarantee', 'Unlimited Webhooks', 'Dedicated VPC Endpoint'] },
        { name: 'Autonomous Enterprise', price: '$299 / mo', quota: 'Unlimited Edge Scale', features: ['Custom SLA 99.99%', 'SOC-2 Type II Export', 'Paperclip AI Billing Router'] }
      ]
    },
    architecture: {
      diagram: `
+--------------------------------------------------------------+
|                    Client / Frontend Edge                    |
|      (Next.js 15 / React 19 Client with Tailwind v4)        |
+------------------------------+-------------------------------+
                               |  HTTPS / WebSocket Stream
                               v
+--------------------------------------------------------------+
|               Edge Gateway / Hermes API Router               |
|            - Token Rate-Limiting & JWT Validation            |
|            - Dynamic Inverted B-Tree Cache Dispatch           |
+------------------------------+-------------------------------+
                               |
               +---------------+---------------+
               |                               |
               v                               v
+-------------------------------+ +----------------------------+
|  Asynchronous Compute Worker  | |     Storage / Cache Layer  |
|  - Python FastAPI Service     | |  - DuckDB Columnar Stores  |
|  - Hermes Skill Dispatch      | |  - Redis In-Memory State   |
+-------------------------------+ +----------------------------+
      `,
      endpoints: [
        { method: 'POST', path: '/api/v1/ingest', desc: 'Ingest raw documents or webhook payloads with deterministic hash.' },
        { method: 'POST', path: '/api/v1/query', desc: 'Sub-5ms vectorless query evaluation with confidence score.' },
        { method: 'GET', path: '/api/v1/telemetry/health', desc: 'Real-time uptime and node latency telemetry.' }
      ]
    },
    code: {
      frontend: `// Generated by DSH Browser & PyLang Engine
// File: components/AppDashboard.tsx
import React, { useState, useEffect } from 'react';

export default function AppDashboard() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState({ latency: '3.2ms', tokensSaved: '94%' });

  const handleExecute = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/v1/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, top_k: 5 })
      });
      const data = await res.json();
      setResults(data.matches || []);
    } catch (err) {
      console.error("Autonomous execution error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#08090a] text-white p-8">
      <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold tracking-tight">${name}</h1>
        <div className="flex gap-4 font-mono text-xs text-emerald-400">
          <span>Latency: {metrics.latency}</span>
          <span>Efficiency: {metrics.tokensSaved}</span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        <div className="flex gap-3">
          <input
            type="text"
            className="flex-1 bg-[#141517] border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="Enter query or payload data..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleExecute}
            className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-lg font-medium transition"
          >
            {loading ? 'Synthesizing...' : 'Execute'}
          </button>
        </div>
      </main>
    </div>
  );
}`,
      backend: `# Generated by DSH Full-Stack Dev Engine
# File: server/main.py
from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel, Field
import time

app = FastAPI(title="${name} Backend", version="1.0.0")

class QueryRequest(BaseModel):
    query: str = Field(..., example="SOC-2 section 3.4 compliance criteria")
    top_k: int = Field(default=5, ge=1, le=50)

@app.post("/api/v1/query", status_code=status.HTTP_200_OK)
async def execute_query(req: QueryRequest):
    start_time = time.perf_counter()
    
    # Deterministic inverted B-tree index lookup
    matches = [
        {"id": "doc_01", "score": 0.994, "snippet": f"Verified compliance rule for: {req.query}"},
        {"id": "doc_02", "score": 0.982, "snippet": "Cryptographic zero-drop audit record confirmed."}
    ]
    
    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
    return {
        "status": "success",
        "matches": matches,
        "latency_ms": elapsed_ms,
        "agent_verified": True
    }`
    },
    qa: {
      score: '100 / 100',
      testsTotal: 58,
      testsPassed: 58,
      staticAnalysis: 'Zero memory leaks, No unbounded loops, Deterministic AST verified.',
      securityAudit: [
        { check: 'OWASP SQL Injection Guard', status: 'PASSED', latency: '0.4ms' },
        { check: 'Strict AST Memory Safety', status: 'PASSED', latency: '1.2ms' },
        { check: 'Denial of Service / ReDoS Regex Scan', status: 'PASSED', latency: '0.8ms' },
        { check: 'Prompt Injection Honeypot Verification', status: 'PASSED', latency: '1.1ms' }
      ]
    }
  };
}

function setupOutputTabs() {
  const tabs = document.querySelectorAll('.output-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');
      switchOutputTab(target);
    });
  });
}

function switchOutputTab(tabId) {
  const tabs = document.querySelectorAll('.output-tab-btn');
  const panes = document.querySelectorAll('.output-tab-pane');

  tabs.forEach(t => {
    t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
  });

  panes.forEach(p => {
    p.classList.toggle('active', p.getAttribute('id') === `pane-${tabId}`);
  });
}

function renderPrdTab(art) {
  const container = document.getElementById('pane-prd');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-b:1px solid var(--border-subtle); padding-bottom:14px;">
        <div>
          <span class="badge badge-magenta" style="margin-bottom:6px;">Paperclip AI Product Spec</span>
          <h3 style="font-size:1.4rem; font-weight:700; color:var(--text-primary);">${art.name}</h3>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">${art.tagline}</p>
        </div>
        <div style="text-align:right; font-family:var(--font-mono); font-size:0.75rem; color:var(--text-tertiary);">
          <div>Stack: ${art.stackLabel}</div>
          <div style="color:var(--agent-dsh-qa); margin-top:2px;">Model: ${art.monetizationLabel}</div>
        </div>
      </div>

      <div>
        <h4 style="font-size:0.9rem; font-weight:600; color:var(--text-primary); margin-bottom:6px;">1. Executive Summary</h4>
        <p style="font-size:0.85rem; color:var(--text-secondary); line-height:1.6; background:var(--bg-surface-2); padding:14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle);">
          ${art.prd.executiveSummary}
        </p>
      </div>

      <div>
        <h4 style="font-size:0.9rem; font-weight:600; color:var(--text-primary); margin-bottom:8px;">2. Target User Personas</h4>
        <ul style="display:flex; flex-direction:column; gap:6px; padding-left:18px; font-size:0.85rem; color:var(--text-secondary);">
          ${art.prd.targetPersonas.map(p => `<li>${p}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="font-size:0.9rem; font-weight:600; color:var(--text-primary); margin-bottom:10px;">3. Autonomous Monetization Matrix</h4>
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
          ${art.prd.pricingTiers.map(t => `
            <div style="background:var(--bg-surface-2); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:16px; display:flex; flex-direction:column; gap:8px;">
              <span style="font-size:0.8rem; font-weight:600; color:var(--accent-hover);">${t.name}</span>
              <span style="font-size:1.3rem; font-weight:700; color:var(--text-primary); font-family:var(--font-mono);">${t.price}</span>
              <span style="font-size:0.75rem; color:var(--text-tertiary); font-family:var(--font-mono);">${t.quota}</span>
              <div style="border-top:1px solid var(--border-subtle); padding-top:8px; display:flex; flex-direction:column; gap:4px; font-size:0.75rem; color:var(--text-secondary);">
                ${t.features.map(f => `<div>&check; ${f}</div>`).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderArchTab(art) {
  const container = document.getElementById('pane-arch');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-cyan" style="margin-bottom:6px;">Hermes 3 Protocol Spec</span>
          <h4 style="font-size:1.1rem; font-weight:600; color:var(--text-primary);">Sub-Millisecond System Architecture</h4>
        </div>
        <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--agent-dsh-qa);">&bull; Protocol Verified</span>
      </div>

      <div style="background:#090a0e; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:14px; overflow-x:auto;">
        <pre style="margin:0; font-family:var(--font-mono); font-size:0.75rem; color:#93c5fd; line-height:1.5;">${art.architecture.diagram}</pre>
      </div>

      <div>
        <h4 style="font-size:0.85rem; font-weight:600; color:var(--text-primary); margin-bottom:8px;">Core Edge API Endpoints</h4>
        <div style="display:flex; flex-direction:column; gap:8px;">
          ${art.architecture.endpoints.map(e => `
            <div style="background:var(--bg-surface-2); padding:10px 14px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:0.78rem;">
              <div style="display:flex; align-items:center; gap:10px;">
                <span class="badge ${e.method === 'POST' ? 'badge-purple' : 'badge-emerald'}">${e.method}</span>
                <span style="color:var(--text-primary); font-weight:600;">${e.path}</span>
              </div>
              <span style="color:var(--text-tertiary); font-family:var(--font-sans);">${e.desc}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderCodeTab(art) {
  const container = document.getElementById('pane-code');
  if (!container) return;

  let currentSubCode = 'frontend';

  const updateSnippet = () => {
    const codePre = document.getElementById('code-display-block');
    if (codePre) {
      codePre.innerText = currentSubCode === 'frontend' ? art.code.frontend : art.code.backend;
    }
  };

  container.innerHTML = `
    <div class="code-viewer-container">
      <div class="code-viewer-header">
        <div class="code-tabs">
          <button class="code-tab-subbtn active" id="btn-subcode-fe">Frontend (React / Tailwind)</button>
          <button class="code-tab-subbtn" id="btn-subcode-be">Backend (FastAPI / PyLang)</button>
        </div>
        <button class="btn btn-sm btn-secondary" id="btn-copy-code">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px; height:13px;">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          Copy Snippet
        </button>
      </div>
      <pre class="code-block-pre"><code id="code-display-block">${art.code.frontend}</code></pre>
    </div>
  `;

  const feBtn = document.getElementById('btn-subcode-fe');
  const beBtn = document.getElementById('btn-subcode-be');
  const copyBtn = document.getElementById('btn-copy-code');

  feBtn?.addEventListener('click', () => {
    currentSubCode = 'frontend';
    feBtn.classList.add('active');
    beBtn?.classList.remove('active');
    updateSnippet();
  });

  beBtn?.addEventListener('click', () => {
    currentSubCode = 'backend';
    beBtn.classList.add('active');
    feBtn?.classList.remove('active');
    updateSnippet();
  });

  copyBtn?.addEventListener('click', () => {
    const textToCopy = currentSubCode === 'frontend' ? art.code.frontend : art.code.backend;
    navigator.clipboard.writeText(textToCopy);
    if (window.showToast) {
      window.showToast('Code snippet copied to clipboard!', 'success');
    }
  });
}

function renderQaTab(art) {
  const container = document.getElementById('pane-qa');
  if (!container) return;

  container.innerHTML = `
    <div style="display:flex; flex-direction:column; gap:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <span class="badge badge-emerald" style="margin-bottom:6px;">DSH Compiler & OS Gatekeeper</span>
          <h4 style="font-size:1.15rem; font-weight:700; color:var(--text-primary);">Automated Verification & Security Audit</h4>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-family:var(--font-mono); font-size:1.2rem; font-weight:700; color:var(--agent-dsh-qa);">${art.qa.score}</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">
        <div style="background:var(--bg-surface-2); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); font-family:var(--font-mono);">
          <div style="font-size:0.7rem; color:var(--text-tertiary);">Static Test Vectors</div>
          <div style="font-size:1.2rem; font-weight:700; color:var(--text-primary); margin-top:2px;">${art.qa.testsPassed} / ${art.qa.testsTotal} PASSED</div>
        </div>
        <div style="background:var(--bg-surface-2); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); font-family:var(--font-mono);">
          <div style="font-size:0.7rem; color:var(--text-tertiary);">Vulnerability Count</div>
          <div style="font-size:1.2rem; font-weight:700; color:var(--agent-dsh-qa); margin-top:2px;">0 Detected</div>
        </div>
        <div style="background:var(--bg-surface-2); padding:12px; border-radius:var(--radius-md); border:1px solid var(--border-subtle); font-family:var(--font-mono);">
          <div style="font-size:0.7rem; color:var(--text-tertiary);">Avg Test Execution</div>
          <div style="font-size:1.2rem; font-weight:700; color:var(--accent-hover); margin-top:2px;">3.5ms total</div>
        </div>
      </div>

      <div>
        <h5 style="font-size:0.8rem; text-transform:uppercase; color:var(--text-tertiary); font-family:var(--font-mono); margin-bottom:8px;">Detailed OWASP & Kernel Invariant Checks</h5>
        <div style="display:flex; flex-direction:column; gap:6px;">
          ${art.qa.securityAudit.map(c => `
            <div style="background:var(--bg-surface-2); padding:10px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:space-between; font-family:var(--font-mono); font-size:0.78rem;">
              <span style="color:var(--text-primary);">&check; ${c.check}</span>
              <div style="display:flex; align-items:center; gap:12px;">
                <span style="color:var(--text-muted); font-size:0.7rem;">${c.latency}</span>
                <span class="badge badge-emerald">${c.status}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderMockupTab(art) {
  const container = document.getElementById('pane-mockup');
  if (!container) return;

  container.innerHTML = `
    <div class="mockup-browser-frame">
      <div class="mockup-chrome">
        <div class="mockup-controls">
          <span class="terminal-dot red"></span>
          <span class="terminal-dot yellow"></span>
          <span class="terminal-dot green"></span>
        </div>
        <div class="mockup-address-bar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:12px; height:12px; color:var(--agent-dsh-qa);">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>https://${art.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.apexsaas.app/dashboard</span>
        </div>
        <span class="badge badge-emerald" style="font-size:0.65rem;">Edge Live</span>
      </div>

      <div class="mockup-viewport-area">
        <!-- Interactive Simulated App Inside Frame -->
        <div style="background:#0f1013; border:1px solid var(--border-medium); border-radius:var(--radius-lg); padding:20px; display:flex; flex-direction:column; gap:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:12px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:28px; height:28px; border-radius:6px; background:linear-gradient(135deg, #6366f1, #06b6d4); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:0.8rem;">
                ${art.name.charAt(0)}
              </div>
              <span style="font-weight:600; font-size:1rem; color:#fff;">${art.name}</span>
            </div>
            <div style="display:flex; gap:6px;">
              <button class="mock-nav-btn active" id="mock-tab-dashboard">Console</button>
              <button class="mock-nav-btn" id="mock-tab-api">API Tester</button>
              <button class="mock-nav-btn" id="mock-tab-billing">Tiers</button>
            </div>
          </div>

          <!-- Dynamic Viewport Body -->
          <div id="mock-inner-content">
            <div style="display:flex; flex-direction:column; gap:14px;">
              <div style="font-size:0.85rem; color:var(--text-secondary);">${art.tagline}</div>
              
              <div style="display:flex; gap:8px;">
                <input 
                  type="text" 
                  id="mock-user-query" 
                  class="field-input" 
                  style="flex:1; background:#18191e; border-color:var(--border-medium);" 
                  placeholder="Test live query or compliance term..." 
                  value="Verify customer agreement clause 14.2"
                />
                <button class="btn btn-primary btn-sm" id="mock-btn-run">
                  Execute Query
                </button>
              </div>

              <!-- Live Execution Output Box -->
              <div id="mock-query-result" style="background:#090a0d; border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:14px; font-family:var(--font-mono); font-size:0.75rem; color:#94a3b8; min-height:80px;">
                <div style="color:var(--text-tertiary);">Ready. Click "Execute Query" above to test autonomous sub-millisecond response.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach interactive listeners inside the mockup
  setupMockupInteractivity(art);
}

function setupMockupInteractivity(art) {
  const runBtn = document.getElementById('mock-btn-run');
  const input = document.getElementById('mock-user-query');
  const resultBox = document.getElementById('mock-query-result');

  runBtn?.addEventListener('click', () => {
    const val = input?.value.trim() || 'Default telemetry probe';
    if (!resultBox) return;

    resultBox.innerHTML = `
      <div style="color:var(--accent-hover); display:flex; align-items:center; gap:6px;">
        <span class="live-dot" style="width:6px; height:6px;"></span>
        Executing sub-millisecond B-tree query across distributed edge shards...
      </div>
    `;

    setTimeout(() => {
      const latency = (Math.random() * 2 + 1.2).toFixed(2);
      resultBox.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; justify-content:space-between; color:var(--agent-dsh-qa);">
            <span>&check; 2 matches resolved in ${latency}ms</span>
            <span>Deterministic Score: 0.998</span>
          </div>
          <div style="color:#e2e8f0; background:rgba(255,255,255,0.03); padding:8px; border-radius:4px; border-left:2px solid var(--accent-hover);">
            Matched Term: "${val}" &rarr; Invariant certified. No anomalies detected.
          </div>
          <div style="color:var(--text-muted); font-size:0.7rem;">Agent Proof: SHA256-verified hash by DSH QA Guard</div>
        </div>
      `;
    }, 450);
  });

  const consoleBtn = document.getElementById('mock-tab-dashboard');
  const apiBtn = document.getElementById('mock-tab-api');
  const billingBtn = document.getElementById('mock-tab-billing');
  const innerContent = document.getElementById('mock-inner-content');

  const setMockActive = (btn) => {
    [consoleBtn, apiBtn, billingBtn].forEach(b => b?.classList.remove('active'));
    btn?.classList.add('active');
  };

  consoleBtn?.addEventListener('click', () => {
    setMockActive(consoleBtn);
    renderMockupTab(art);
  });

  apiBtn?.addEventListener('click', () => {
    setMockActive(apiBtn);
    if (innerContent) {
      innerContent.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:12px; font-family:var(--font-mono); font-size:0.75rem;">
          <div style="color:var(--text-secondary); font-family:var(--font-sans);">Direct Edge API Gateway:</div>
          <div style="background:#090a0d; padding:12px; border-radius:6px; border:1px solid var(--border-subtle); color:#38bdf8;">
            curl -X POST https://${art.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.apexsaas.app/api/v1/query \\<br/>
            &nbsp;&nbsp;-H "Authorization: Bearer sk_live_autonomous_apex" \\<br/>
            &nbsp;&nbsp;-H "Content-Type: application/json" \\<br/>
            &nbsp;&nbsp;-d '{"query": "compliance verification"}'
          </div>
          <div style="color:var(--agent-dsh-qa);">&check; Edge latency: &lt;5ms global routing</div>
        </div>
      `;
    }
  });

  billingBtn?.addEventListener('click', () => {
    setMockActive(billingBtn);
    if (innerContent) {
      innerContent.innerHTML = `
        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px;">
          ${art.prd.pricingTiers.map(t => `
            <div style="background:#14151a; border:1px solid var(--border-subtle); padding:12px; border-radius:6px;">
              <div style="font-weight:600; color:#fff; font-size:0.8rem;">${t.name}</div>
              <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--accent-hover); margin-top:2px;">${t.price}</div>
              <button class="btn btn-sm btn-outline" style="width:100%; margin-top:8px; font-size:0.7rem;">Subscribe</button>
            </div>
          `).join('')}
        </div>
      `;
    }
  });
}

function setupExportActions() {
  const exportBtn = document.getElementById('btn-export-spec');
  if (!exportBtn) return;

  exportBtn.addEventListener('click', () => {
    if (!currentArtifact) {
      if (window.showToast) window.showToast('Please generate a micro-SaaS first', 'info');
      return;
    }

    const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentArtifact, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", jsonStr);
    downloadAnchor.setAttribute("download", `${currentArtifact.name.toLowerCase().replace(/\s+/g, '-')}-spec.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    if (window.showToast) {
      window.showToast(`Exported ${currentArtifact.name} specification bundle!`, 'success');
    }
  });
}
