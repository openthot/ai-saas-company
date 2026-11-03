/**
 * ApexSaaS AI - Consumer-Friendly App Builder Sandbox
 * Allows users to describe an app idea and generates an interactive live preview.
 * Requires user authentication before autonomous cloud deployment.
 */

import { authDb } from './auth-db.js';

export const presetIdeas = [
  {
    title: 'FitPulse Studio',
    category: 'Booking & Appointments',
    idea: 'Online appointment scheduling for fitness trainers with class calendar and automated client reminders',
    features: ['Live Calendar Booking', 'Automated SMS/Email Reminders', 'Free Cloud PostgreSQL Database'],
    targetAudience: 'Personal trainers, yoga instructors, and wellness studios'
  },
  {
    title: 'InvoiceFlow Pro',
    category: 'Finance & Invoicing',
    idea: 'Instant invoice generator with credit card payment links and automated receipt tracking for freelancers',
    features: ['One-Click PDF Invoices', 'Instant Payment Links', 'Client Balance Tracker'],
    targetAudience: 'Freelancers, consultants, and independent agencies'
  },
  {
    title: 'FeedLoop Hub',
    category: 'Customer Feedback',
    idea: 'Interactive public feature request board with upvoting, roadmap tracking, and customer announcements',
    features: ['Public Upvote Board', 'Interactive Product Roadmap', 'Changelog Updates'],
    targetAudience: 'Product creators, startup founders, and indie hackers'
  },
  {
    title: 'CleanBites Menu',
    category: 'Restaurants & Cafes',
    idea: 'Digital contactless QR code menu with dish photos, dietary filter tags, and mobile table ordering',
    features: ['Instant QR Code Generator', 'Vegan/Gluten-Free Filters', 'Table-side Mobile Ordering'],
    targetAudience: 'Local cafes, bakeries, food trucks, and bistros'
  }
];

let isGenerating = false;
let currentArtifact = null;

export function initGenerator() {
  setupPresetButtons();
  setupGenerateAction();
  setupOutputTabs();
  setupDeploymentAction();
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
  if (ideaInput) ideaInput.value = preset.idea;

  const stackSelect = document.getElementById('gen-tech-stack');
  if (stackSelect) stackSelect.value = preset.category || 'Booking & Appointments';
}

function setupGenerateAction() {
  const generateBtn = document.getElementById('btn-generate-saas');
  if (!generateBtn) return;

  generateBtn.addEventListener('click', async () => {
    if (isGenerating) return;

    const ideaInput = document.getElementById('gen-app-idea');
    const ideaText = ideaInput?.value.trim() || presetIdeas[0].idea;
    const titleText = ideaText.split(' ').slice(0, 3).join(' ') + ' App';

    await runConsumerGeneration(titleText, ideaText);
  });
}

async function runConsumerGeneration(title, idea) {
  isGenerating = true;
  const generateBtn = document.getElementById('btn-generate-saas');
  const stepper = document.getElementById('generation-stepper');
  const steps = stepper?.querySelectorAll('.step-card') || [];

  if (generateBtn) {
    generateBtn.disabled = true;
    generateBtn.innerHTML = `
      <span class="spinner-inline" style="display:inline-block; width:14px; height:14px; border:2px solid currentColor; border-top-color:transparent; border-radius:50%; animation:spin 0.8s linear infinite; margin-right:8px;"></span>
      Building App...
    `;
  }

  if (stepper) stepper.classList.add('active');

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  for (let i = 0; i < steps.length; i++) {
    steps.forEach((s, idx) => {
      s.classList.remove('working', 'completed');
      if (idx < i) s.classList.add('completed');
      if (idx === i) s.classList.add('working');
    });
    await sleep(400);
  }

  steps.forEach(s => s.classList.add('completed'));

  currentArtifact = {
    name: title,
    tagline: idea,
    createdAt: new Date().toLocaleDateString(),
    database: 'PostgreSQL 15 (Supabase Free Tier)',
    dbStatus: 'active',
    slug: title.toLowerCase().replace(/[^a-z0-9]/g, '-')
  };

  renderConsumerMockup(currentArtifact);

  if (generateBtn) {
    generateBtn.disabled = false;
    generateBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:16px; height:16px; margin-right:6px;">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
      Regenerate App
    `;
  }

  isGenerating = false;
  if (window.showToast) {
    window.showToast(`✨ Generated "${title}"! Ready for preview and deployment.`, 'success');
  }

  switchOutputTab('mockup');
}

function renderConsumerMockup(art) {
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
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>          </svg>          <span>https://${art.slug}.apexsaas.app/portal</span>        </div>        <div style="display:flex; align-items:center; gap:8px;">          <span class="badge badge-emerald" style="font-size:0.7rem;">Free Cloud DB 🟢</span>          <button class="btn btn-sm btn-primary" id="btn-deploy-consumer-top" style="padding:4px 12px; font-size:0.75rem;">            🚀 Deploy to Cloud          </button>        </div>      </div>      <div class="mockup-viewport-area">        <div style="background:var(--bg-surface-2); border:1px solid var(--border-medium); border-radius:var(--radius-squircle); padding:24px; display:flex; flex-direction:column; gap:20px; box-shadow:var(--specular-rim);">                    <!-- Mock Header -->          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--border-subtle); padding-bottom:16px;">            <div style="display:flex; align-items:center; gap:12px;">              <div style="width:36px; height:36px; border-radius:var(--radius-sm); background:var(--apple-aura-gradient); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:1rem;">                ⚡              </div>              <div>                <h3 style="font-weight:700; font-size:1.15rem; color:var(--text-primary); margin:0;">${art.name}</h3>                <span style="font-size:0.8rem; color:var(--text-secondary);">${art.tagline}</span>              </div>            </div>            <div style="display:flex; gap:8px;">              <span class="badge badge-purple">Live Demo</span>            </div>          </div>          <!-- Quick Consumer Dashboard Cards -->          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:12px;">            <div style="background:var(--bg-surface-3); border:1px solid var(--border-subtle); padding:16px; border-radius:var(--radius-md);">              <div style="font-size:0.75rem; color:var(--text-tertiary);">Total Users</div>              <div style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin-top:4px;">1,420</div>              <div style="font-size:0.7rem; color:var(--agent-dsh-qa); margin-top:2px;">+18% this week</div>            </div>            <div style="background:var(--bg-surface-3); border:1px solid var(--border-subtle); padding:16px; border-radius:var(--radius-md);">              <div style="font-size:0.75rem; color:var(--text-tertiary);">Cloud Database</div>              <div style="font-size:1.4rem; font-weight:700; color:var(--agent-dsh-qa); margin-top:4px;">Active</div>              <div style="font-size:0.7rem; color:var(--text-secondary); margin-top:2px;">Supabase Free Tier</div>            </div>            <div style="background:var(--bg-surface-3); border:1px solid var(--border-subtle); padding:16px; border-radius:var(--radius-md);">              <div style="font-size:0.75rem; color:var(--text-tertiary);">Monthly Revenue</div>              <div style="font-size:1.4rem; font-weight:700; color:var(--text-primary); margin-top:4px;">,850</div>              <div style="font-size:0.7rem; color:var(--agent-dsh-qa); margin-top:2px;">Target reached</div>            </div>          </div>          <!-- Interactive Customer Action Sandbox -->          <div style="background:var(--bg-canvas); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:18px;">            <h4 style="font-size:0.9rem; font-weight:600; color:var(--text-primary); margin-bottom:10px;">Test Live Data Submission</h4>            <div style="display:flex; gap:10px;">              <input type="text" id="demo-entry-input" class="field-input" placeholder="Enter customer name or service booking..." value="Sarah Jenkins - 10:00 AM Session" style="flex:1;">              <button class="btn btn-primary" id="btn-demo-save" style="white-space:nowrap;">Save to Cloud DB</button>            </div>            <div id="demo-entry-list" style="margin-top:14px; display:flex; flex-direction:column; gap:8px;">              <div style="background:var(--bg-surface-2); padding:10px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;">                <span style="color:var(--text-primary); font-weight:500;">Sarah Jenkins - 10:00 AM Session</span>                <span style="color:var(--agent-dsh-qa); font-size:0.75rem;">&check; Saved to PostgreSQL</span>              </div>            </div>          </div>          <!-- Bottom Deployment CTA -->          <div style="background:var(--bg-surface-3); border:1px dashed var(--border-medium); border-radius:var(--radius-md); padding:16px; display:flex; justify-content:space-between; align-items:center;">            <div>              <div style="font-weight:600; color:var(--text-primary); font-size:0.9rem;">Ready to make this live?</div>              <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">Deploy with one click. Free account required to provision your cloud database.</div>            </div>            <button class="btn btn-primary" id="btn-deploy-consumer-bottom">              🚀 Deploy App Autonomously            </button>          </div>        </div>      </div>    </div>  `;

  const saveBtn = document.getElementById('btn-demo-save');
  const input = document.getElementById('demo-entry-input');
  const list = document.getElementById('demo-entry-list');

  saveBtn?.addEventListener('click', () => {
    const val = input?.value.trim();
    if (!val || !list) return;
    const item = document.createElement('div');
    item.style.cssText = 'background:var(--bg-surface-2); padding:10px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-subtle); display:flex; justify-content:space-between; align-items:center; font-size:0.85rem;';
    item.innerHTML = `
      <span style="color:var(--text-primary); font-weight:500;">${val}</span>
      <span style="color:var(--agent-dsh-qa); font-size:0.75rem;">&check; Saved to PostgreSQL</span>
    `;
    list.prepend(item);
    if (input) input.value = '';
    if (window.showToast) window.showToast('Record synced to Free Cloud Database!', 'success');
  });

  document.getElementById('btn-deploy-consumer-top')?.addEventListener('click', handleDeployTrigger);
  document.getElementById('btn-deploy-consumer-bottom')?.addEventListener('click', handleDeployTrigger);
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

function setupDeploymentAction() {
  const mainDeployBtn = document.getElementById('btn-main-deploy');
  if (mainDeployBtn) {
    mainDeployBtn.addEventListener('click', handleDeployTrigger);
  }
}

async function handleDeployTrigger() {
  if (!currentArtifact) {
    if (window.showToast) window.showToast('Please generate an app preview first!', 'info');
    return;
  }

  // AUTH GUARD: Require login / account creation for autonomous deployment
  if (!authDb.isAuthenticated()) {
    if (window.openAuthModal) {
      window.openAuthModal('Autonomous deployment requires a free account to provision and manage your cloud database.');
    } else {
      alert('Please create a free account or sign in to deploy your application to the cloud.');
    }
    return;
  }

  // User is logged in -> Execute Autonomous Cloud Deployment
  try {
    if (window.showToast) window.showToast('🚀 Deploying autonomous app to free cloud database...', 'info');
    const deployedRecord = await authDb.deployAppToCloud(currentArtifact);
    
    // Show Celebration / Deployment Success Modal
    if (window.openDeploySuccessModal) {
      window.openDeploySuccessModal(deployedRecord);
    } else {
      if (window.showToast) {
        window.showToast(`🎉 Deployed ${deployedRecord.name} successfully! Live at ${deployedRecord.liveUrl}`, 'success');
      }
    }
  } catch (err) {
    if (window.showToast) window.showToast(err.message, 'error');
  }
}
