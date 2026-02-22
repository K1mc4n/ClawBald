'use client'

import { useEffect } from 'react'

export default function Home() {
  useEffect(() => {
    // ── Inline script from landing page ──
    // ─── MOCKUP BARS ───
function genBars() {
  const el = document.getElementById('mockup-bars');
  if (!el) return;
  const vals = Array.from({length: 20}, () => Math.random());
  const max = Math.max(...vals);
  el.innerHTML = vals.map((v,i) => {
    const h = (v/max)*90 + 10;
    const hi = i >= 17;
    return `<div class="mock-bar${hi?' hi':''}" style="height:${h}%"></div>`;
  }).join('');
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── COPY ───
function copyInstall() {
  navigator.clipboard.writeText('npm install -g @bankr/cli && bankr login email')
    .then(() => {
      const btn = document.querySelector('.copy-btn');
      btn.textContent = 'COPIED!';
      btn.style.color = 'var(--green)';
      setTimeout(() => { btn.textContent = 'COPY'; btn.style.color = ''; }, 2000);
    });
}

// ─── SMOOTH NAV ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

// ─── INIT ───
genBars();
  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: `

<!-- NAV -->
<nav>
  <a href="#" class="nav-logo">
    <img src="/logo.png" alt="ClawBald" class="nav-logo-img" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
    <div style="display:none;width:36px;height:36px;background:var(--accent);border-radius:8px;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:900;font-size:14px;color:white;">CB</div>
    <span class="nav-logo-text">Claw<span>Bald</span></span>
  </a>
  <ul class="nav-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="#dashboard">Dashboard</a></li>
    <li><a href="#cli">CLI</a></li>
  </ul>
  <a href="/dashboard" class="nav-cta">
    Open App →
  </a>
</nav>

<!-- HERO -->
<div class="hero">
  <div class="hero-eyebrow">
    <span class="eyebrow-dot"></span>
    Powered by Bankr CLI · Built on Base
  </div>

  <div class="hero-logo-wrap">
    <div class="hero-logo-ring2"></div>
    <div class="hero-logo-ring"></div>
    <img src="/logo.png"
         alt="ClawBald Logo"
         class="hero-logo-img"
         onerror="this.style.display='none';document.getElementById('fallback-logo').style.display='flex'">
    <div id="fallback-logo" style="display:none;width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(255,69,0,0.3),rgba(255,69,0,0.05));border:2px solid rgba(255,69,0,0.3);align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:900;font-size:48px;color:var(--accent);margin:0 auto;">CB</div>
  </div>

  <h1 class="hero-title">
    Claw<span class="brand">Bald</span>
  </h1>
  <div class="hero-subtitle">Token Platform for Degens</div>
  <p class="hero-desc">
    Launch tokens, track fee earnings, and manage on-chain transactions — all from one dashboard. Fully integrated with Bankr CLI on Base.
  </p>

  <div class="hero-actions">
    <a href="/dashboard" class="btn-hero btn-hero-primary">
      Open Dashboard
      <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke-width="2" stroke-linecap="round"/></svg>
    </a>
    <a href="#how" class="btn-hero btn-hero-outline">
      How It Works
    </a>
  </div>

  <div class="hero-stats">
    <div class="hero-stat">
      <div class="hero-stat-val" style="color:var(--green)">0.847</div>
      <div class="hero-stat-label">WETH Claimable</div>
    </div>
    <div class="hero-stat">
      <div class="hero-stat-val">7</div>
      <div class="hero-stat-label">Tokens Deployed</div>
    </div>
    <div class="hero-stat">
      <div class="hero-stat-val" style="color:var(--accent2)">$2.1K</div>
      <div class="hero-stat-label">Est. Monthly Fees</div>
    </div>
  </div>
</div>

<div class="full-divider"></div>

<!-- FEATURES -->
<section id="features">
  <div class="reveal">
    <div class="section-label">Core Features</div>
    <h2 class="section-title">Everything you need<br>to ship tokens.</h2>
    <p class="section-desc">ClawBald wraps the Bankr CLI into a clean web interface — no terminal required, full power included.</p>
  </div>

  <div class="features-grid reveal" style="transition-delay:0.1s">
    <div class="feat-card">
      <div class="feat-icon">🚀</div>
      <div class="feat-title">Token Launcher</div>
      <p class="feat-desc">Deploy ERC-20 tokens to Base in seconds. Configure name, symbol, image, social links, and fee routing — all without writing a single line of Solidity.</p>
      <span class="feat-tag">bankr launch</span>
    </div>
    <div class="feat-card">
      <div class="feat-icon">💰</div>
      <div class="feat-title">Fee Dashboard</div>
      <p class="feat-desc">Real-time WETH earnings from every token you've deployed. Daily chart, per-token breakdown, projected monthly income, and one-click claim.</p>
      <span class="feat-tag green">bankr fees</span>
    </div>
    <div class="feat-card">
      <div class="feat-icon">⛓️</div>
      <div class="feat-title">Transaction Manager</div>
      <p class="feat-desc">Build, sign, and submit transactions visually. Support for ETH transfers, contract calls, EIP-712 signing, and full transaction history with status tracking.</p>
      <span class="feat-tag blue">bankr submit</span>
    </div>
    <div class="feat-card">
      <div class="feat-icon">🔀</div>
      <div class="feat-title">Fee Routing</div>
      <p class="feat-desc">Direct a slice of trading fees to any collaborator — via X handle, Farcaster, ENS name, or raw wallet address. Set it once, earn forever.</p>
      <span class="feat-tag">--fee-type x/farcaster/ens</span>
    </div>
    <div class="feat-card">
      <div class="feat-icon">🔐</div>
      <div class="feat-title">Secure Auth</div>
      <p class="feat-desc">Login with email OTP, paste an existing API key, or use SIWE for headless agents. Read-only and read-write keys supported with full access controls.</p>
      <span class="feat-tag blue">bankr login</span>
    </div>
    <div class="feat-card">
      <div class="feat-icon">📊</div>
      <div class="feat-title">Analytics & Projections</div>
      <p class="feat-desc">Track your best day, active streak, daily average, and extrapolated monthly/yearly earnings. Export raw JSON for custom integrations.</p>
      <span class="feat-tag green">--json output</span>
    </div>
  </div>
</section>

<div class="full-divider"></div>

<!-- HOW IT WORKS -->
<div class="hiw-section" id="how">
  <div class="hiw-inner">
    <div class="reveal">
      <div class="section-label">How It Works</div>
      <h2 class="section-title">From zero to earning<br>in four steps.</h2>
    </div>

    <div class="steps-row reveal" style="transition-delay:0.15s">
      <div class="step-card">
        <div class="step-num">1</div>
        <div class="step-title">Install CLI</div>
        <p class="step-desc">Install the Bankr CLI globally on your machine</p>
        <span class="step-cmd">npm i -g @bankr/cli</span>
      </div>
      <div class="step-card">
        <div class="step-num">2</div>
        <div class="step-title">Authenticate</div>
        <p class="step-desc">Login with email or existing API key with write access</p>
        <span class="step-cmd">bankr login email</span>
      </div>
      <div class="step-card">
        <div class="step-num">3</div>
        <div class="step-title">Launch Token</div>
        <p class="step-desc">Fill in the form and deploy your token to Base</p>
        <span class="step-cmd">bankr launch --name "X"</span>
      </div>
      <div class="step-card">
        <div class="step-num">4</div>
        <div class="step-title">Claim Fees</div>
        <p class="step-desc">Watch WETH accumulate and claim it whenever you want</p>
        <span class="step-cmd">bankr fees claim 0x...</span>
      </div>
    </div>
  </div>
</div>

<div class="full-divider"></div>

<!-- DASHBOARD PREVIEW -->
<div class="preview-section" id="dashboard">
  <div class="preview-inner">
    <div class="preview-header reveal">
      <div>
        <div class="section-label">Dashboard Preview</div>
        <h2 class="section-title">One interface.<br>Full control.</h2>
      </div>
      <a href="/dashboard" class="btn-hero btn-hero-primary" style="flex-shrink:0">Open Live App →</a>
    </div>

    <div class="preview-mockup reveal" style="transition-delay:0.1s">
      <div class="mockup-topbar">
        <div class="mockup-dot" style="background:#ff5f57"></div>
        <div class="mockup-dot" style="background:#febc2e"></div>
        <div class="mockup-dot" style="background:#28c840"></div>
        <div style="flex:1;text-align:center;font-size:10px;color:var(--muted)">ClawBald — Bankr Dashboard</div>
      </div>
      <div class="mockup-body">
        <div class="mockup-sidebar">
          <div style="width:28px;height:28px;background:var(--accent);border-radius:6px;margin-bottom:8px;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:900;font-size:10px;color:white;">CB</div>
          <div class="mock-nav active"></div>
          <div class="mock-nav"></div>
          <div class="mock-nav"></div>
          <div class="mock-nav"></div>
        </div>
        <div class="mockup-content">
          <div class="mock-stats">
            <div class="mock-stat">
              <div class="mock-stat-val" style="color:var(--green)">0.847</div>
              <div class="mock-stat-lbl">Claimable WETH</div>
            </div>
            <div class="mock-stat">
              <div class="mock-stat-val">4.21</div>
              <div class="mock-stat-lbl">Total Earned</div>
            </div>
            <div class="mock-stat">
              <div class="mock-stat-val">7</div>
              <div class="mock-stat-lbl">Active Tokens</div>
            </div>
            <div class="mock-stat">
              <div class="mock-stat-val" style="color:var(--accent2)">2.4</div>
              <div class="mock-stat-lbl">Est. Monthly</div>
            </div>
          </div>
          <div class="mock-row">
            <div class="mock-card">
              <div class="mock-card-title">Daily Earnings</div>
              <div class="mock-bars" id="mockup-bars"></div>
            </div>
            <div class="mock-card">
              <div class="mock-card-title">Top Tokens</div>
              <div class="mock-token-list">
                <div class="mock-token">
                  <div class="mock-token-av" style="background:rgba(255,69,0,0.3)"></div>
                  <div class="mock-token-name">$CLAW</div>
                  <div class="mock-token-val">0.312</div>
                </div>
                <div class="mock-token">
                  <div class="mock-token-av" style="background:rgba(61,122,255,0.3)"></div>
                  <div class="mock-token-name">$MOON</div>
                  <div class="mock-token-val">0.198</div>
                </div>
                <div class="mock-token">
                  <div class="mock-token-av" style="background:rgba(0,232,122,0.3)"></div>
                  <div class="mock-token-name">$DAPE</div>
                  <div class="mock-token-val">0.147</div>
                </div>
                <div class="mock-token">
                  <div class="mock-token-av" style="background:rgba(255,140,66,0.3)"></div>
                  <div class="mock-token-name">$BPEPE</div>
                  <div class="mock-token-val">0.098</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="full-divider"></div>

<!-- CLI SECTION -->
<div class="cli-section" id="cli">
  <div class="cli-inner">
    <div class="reveal">
      <div class="section-label">CLI Integration</div>
      <h2 class="section-title">Built on<br>Bankr CLI.</h2>
      <p class="section-desc" style="margin-bottom:32px">ClawBald uses the official @bankr/cli package programmatically. All operations are routed through the Bankr Agent API — secure, rate-limited, and permissioned.</p>
      <div class="cli-features">
        <div class="cli-feat">
          <div class="cli-feat-icon">🔑</div>
          <div>
            <div class="cli-feat-title">API Key Auth</div>
            <div class="cli-feat-desc">Keys stored in ~/.bankr/config.json or via BANKR_API_KEY env var. Read-only or read-write scoped.</div>
          </div>
        </div>
        <div class="cli-feat">
          <div class="cli-feat-icon">🧵</div>
          <div>
            <div class="cli-feat-title">Thread Context</div>
            <div class="cli-feat-desc">Multi-turn conversations via threadId. Continue any session with --continue or --thread flags.</div>
          </div>
        </div>
        <div class="cli-feat">
          <div class="cli-feat-icon">⚡</div>
          <div>
            <div class="cli-feat-title">Programmatic SDK</div>
            <div class="cli-feat-desc">Import submitPrompt, pollJob, getUserInfo directly from @bankr/cli into Next.js API routes.</div>
          </div>
        </div>
      </div>
    </div>

    <div class="terminal reveal" style="transition-delay:0.15s">
      <div class="terminal-bar">
        <div class="terminal-dot" style="background:#ff5f57"></div>
        <div class="terminal-dot" style="background:#febc2e"></div>
        <div class="terminal-dot" style="background:#28c840"></div>
        <div class="terminal-title">ClawBald · bankr integration</div>
      </div>
      <div class="terminal-body">
        <span class="t-line"><span class="t-comment"># Install globally</span></span>
        <span class="t-line"><span class="t-prompt">$ </span><span class="t-cmd">npm install -g @bankr/cli</span></span>
        <span class="t-line t-dim">─────────────────────────────</span>
        <span class="t-line"><span class="t-comment"># Authenticate</span></span>
        <span class="t-line"><span class="t-prompt">$ </span><span class="t-cmd">bankr login email --read-write</span></span>
        <span class="t-line"><span class="t-out">✓ Logged in · wallet created</span></span>
        <span class="t-line t-dim">─────────────────────────────</span>
        <span class="t-line"><span class="t-comment"># Launch a token</span></span>
        <span class="t-line"><span class="t-prompt">$ </span><span class="t-cmd">bankr launch --name "ClawBald" \</span></span>
        <span class="t-line"><span class="t-cmd">  --symbol "CLAW" --fee "@clawbald" -y</span></span>
        <span class="t-line"><span class="t-out">🚀 Deployed · 0x1a2b...c3d4</span></span>
        <span class="t-line t-dim">─────────────────────────────</span>
        <span class="t-line"><span class="t-comment"># Check fees</span></span>
        <span class="t-line"><span class="t-prompt">$ </span><span class="t-cmd">bankr fees --days 30</span></span>
        <span class="t-line"><span class="t-out2">Claimable: 0.847 WETH ($2,134)</span></span>
        <span class="t-line"><span class="t-out2">Streak: 5 days 🔥</span></span>
        <span class="t-line"><span class="t-prompt">$ </span><span class="t-cursor"></span></span>
      </div>
    </div>
  </div>
</div>

<div class="full-divider"></div>

<!-- CHAINS -->
<div class="chains-section">
  <div class="reveal">
    <div class="section-label" style="margin-bottom:8px">Multi-Chain Support</div>
    <h3 style="font-family:'Syne',sans-serif;font-weight:800;font-size:24px;letter-spacing:-1px;margin-bottom:8px">Bankr-supported chains</h3>
    <p style="font-size:12px;color:var(--muted)">ClawBald deploys on Base by default. Bankr CLI supports all chains below.</p>
  </div>
  <div class="chains-row reveal" style="transition-delay:0.1s">
    <div class="chain-badge">
      <div class="chain-circle" style="background:rgba(0,82,255,0.15)">🔵</div>
      <span>Base</span>
      <span style="font-size:9px;color:var(--green);background:rgba(0,232,122,0.1);padding:2px 6px;border-radius:4px">PRIMARY</span>
    </div>
    <div class="chain-badge">
      <div class="chain-circle" style="background:rgba(98,126,234,0.15)">⟠</div>
      <span>Ethereum</span>
    </div>
    <div class="chain-badge">
      <div class="chain-circle" style="background:rgba(130,71,229,0.15)">🟣</div>
      <span>Polygon</span>
    </div>
    <div class="chain-badge">
      <div class="chain-circle" style="background:rgba(255,200,0,0.15)">🟡</div>
      <span>BNB Chain</span>
    </div>
    <div class="chain-badge">
      <div class="chain-circle" style="background:rgba(255,100,50,0.15)">🔶</div>
      <span>Arbitrum</span>
    </div>
    <div class="chain-badge">
      <div class="chain-circle" style="background:rgba(255,4,32,0.15)">🔴</div>
      <span>Optimism</span>
    </div>
  </div>
</div>

<div class="full-divider"></div>

<!-- CTA -->
<div class="cta-section">
  <div class="cta-box reveal">
    <img src="/logo.png"
         alt="ClawBald"
         class="cta-logo"
         onerror="this.style.display='none'">
    <h2 class="cta-title">Start earning fees<br>today.</h2>
    <p class="cta-desc">ClawBald is open source and built on top of Bankr CLI. Install the CLI, connect your wallet, and launch your first token in under 5 minutes.</p>
    <div class="cta-install">
      <span>npm install -g @bankr/cli && bankr login email</span>
      <button class="copy-btn" onclick="copyInstall()">COPY</button>
    </div>
    <div class="cta-actions">
      <a href="/dashboard" class="btn-hero btn-hero-primary btn-hero" style="text-decoration:none">
        Open Dashboard →
      </a>
      <a href="https://docs.bankr.bot/cli" target="_blank" class="btn-hero btn-hero-outline" style="text-decoration:none">
        Read Docs
      </a>
    </div>
  </div>
</div>

<!-- FOOTER -->
<footer>
  <div class="footer-logo">
    <img src="/logo.png"
         alt="ClawBald" class="footer-logo-img"
         onerror="this.style.display='none'">
    <span class="footer-name">ClawBald</span>
  </div>
  <ul class="footer-links">
    <li><a href="#features">Features</a></li>
    <li><a href="#how">How It Works</a></li>
    <li><a href="/dashboard">Dashboard</a></li>
    <li><a href="https://docs.bankr.bot/cli" target="_blank">Bankr Docs</a></li>
    <li><a href="https://github.com/BankrBot/openclaw-skills" target="_blank">GitHub</a></li>
  </ul>
  <div class="footer-copy">Built on Base · Powered by Bankr CLI</div>
</footer>

<script>
// ─── MOCKUP BARS ───
function genBars() {
  const el = document.getElementById('mockup-bars');
  if (!el) return;
  const vals = Array.from({length: 20}, () => Math.random());
  const max = Math.max(...vals);
  el.innerHTML = vals.map((v,i) => {
    const h = (v/max)*90 + 10;
    const hi = i >= 17;
    return \`<div class="mock-bar\${hi?' hi':''}" style="height:\${h}%"></div>\`;
  }).join('');
}

// ─── SCROLL REVEAL ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ─── COPY ───
function copyInstall() {
  navigator.clipboard.writeText('npm install -g @bankr/cli && bankr login email')
    .then(() => {
      const btn = document.querySelector('.copy-btn');
      btn.textContent = 'COPIED!';
      btn.style.color = 'var(--green)';
      setTimeout(() => { btn.textContent = 'COPY'; btn.style.color = ''; }, 2000);
    });
}

// ─── SMOOTH NAV ───
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({behavior:'smooth'}); }
  });
});

// ─── INIT ───
genBars();
</script>
` }} />
  )
}
