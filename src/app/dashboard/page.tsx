'use client'

import { useEffect } from 'react'

export default function Dashboard() {
  useEffect(() => {
    const script = document.createElement('script')
    script.innerHTML = `
      let currentPage = 'dashboard';

      function navigate(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const el = document.getElementById('page-' + page);
        if (el) el.classList.add('active');
        const idx = ['dashboard','launch','fees','transactions'].indexOf(page);
        const navItems = document.querySelectorAll('.nav-item');
        if (navItems[idx]) navItems[idx].classList.add('active');
        const titles = {dashboard:'Dashboard', launch:'Launch Token', fees:'Fee Dashboard', transactions:'Transactions', settings:'Settings'};
        const titleEl = document.getElementById('page-title');
        if (titleEl) titleEl.textContent = titles[page] || page;
        currentPage = page;
        if (page === 'fees') renderFeeTokens();
        if (page === 'transactions') renderTxList();
      }

      function generateBars(count, min, max) {
        return Array.from({length: count}, () => Math.random() * (max - min) + min);
      }

      function renderChart(id, data, color) {
        color = color || 'var(--accent)';
        const el = document.getElementById(id);
        if (!el) return;
        const maxVal = Math.max(...data);
        el.innerHTML = data.map((v, i) => {
          const h = (v / maxVal) * 100;
          const isToday = i === data.length - 1;
          return '<div class="bar ' + (isToday ? 'highlight' : '') + '" style="height:' + h + '%;background:' + (isToday ? color : 'var(--border)') + '" title="' + v.toFixed(4) + ' WETH"></div>';
        }).join('');
      }

      const tokens = [
        { name: 'ClawBald Token', symbol: 'CLAW', addr: '0x1a2b...c3d4', claimable: 0.312, claimed: 1.84, color: '#ff4d00' },
        { name: 'Moon Rocket', symbol: 'MOON', addr: '0x5e6f...7g8h', claimable: 0.198, claimed: 0.92, color: '#4d88ff' },
        { name: 'Degen Ape', symbol: 'DAPE', addr: '0x9i0j...k1l2', claimable: 0.147, claimed: 0.55, color: '#00ff88' },
        { name: 'Base Pepe', symbol: 'BPEPE', addr: '0x3m4n...o5p6', claimable: 0.098, claimed: 0.33, color: '#ff8c42' },
        { name: 'Wagmi Coin', symbol: 'WAGMI', addr: '0x7q8r...s9t0', claimable: 0.092, claimed: 0.22, color: '#b48eff' },
        { name: 'Bankr Fan', symbol: 'BNKRFAN', addr: '0xau1v...w2x3', claimable: 0, claimed: 0.61, color: '#ff69b4' },
        { name: 'Giga Chad', symbol: 'GIGA', addr: '0xy4z...5a6b', claimable: 0, claimed: 0.18, color: '#ffd700' },
      ];

      function renderTopTokens() {
        const el = document.getElementById('top-tokens-list');
        if (!el) return;
        el.innerHTML = tokens.slice(0,4).map(t =>
          '<div class="token-row" onclick="navigate(\'fees\')">' +
          '<div class="token-avatar" style="background:' + t.color + '22;color:' + t.color + '">' + t.symbol.slice(0,2) + '</div>' +
          '<div class="token-info"><div class="token-ticker">' + t.symbol + '</div><div class="token-addr">' + t.addr + '</div></div>' +
          '<div class="token-fees"><div class="fee-claimable">' + (t.claimable > 0 ? t.claimable.toFixed(3)+' ETH' : '—') + '</div>' +
          '<div class="fee-claimed">' + t.claimed.toFixed(2) + ' claimed</div></div></div>'
        ).join('');
      }

      let feeFilter = '';
      function renderFeeTokens() {
        const el = document.getElementById('fee-token-list');
        if (!el) return;
        const filtered = tokens.filter(t => t.symbol.toLowerCase().includes(feeFilter) || t.addr.toLowerCase().includes(feeFilter));
        el.innerHTML = filtered.map(t =>
          '<div class="token-row">' +
          '<div class="token-avatar" style="background:' + t.color + '22;color:' + t.color + '">' + t.symbol.slice(0,2) + '</div>' +
          '<div class="token-info"><div class="token-ticker">' + t.name + ' <span style="color:var(--muted);font-weight:400">$' + t.symbol + '</span></div>' +
          '<div class="token-addr">' + t.addr + '</div></div>' +
          '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;">' +
          '<div class="fee-claimable">' + (t.claimable > 0 ? t.claimable.toFixed(4)+' WETH' : '—') + '</div>' +
          '<div class="fee-claimed">' + t.claimed.toFixed(3) + ' WETH claimed</div></div>' +
          '<div style="margin-left:16px">' +
          (t.claimable > 0
            ? '<button class="btn btn-green btn-sm" onclick="claimToken(\'' + t.symbol + '\')">Claim</button>'
            : '<button class="btn btn-outline btn-sm" disabled style="opacity:0.4">Claimed</button>') +
          '</div></div>'
        ).join('');
      }

      function filterTokens() {
        const el = document.getElementById('fee-search');
        feeFilter = el ? el.value.toLowerCase() : '';
        renderFeeTokens();
      }

      const txHistory = [
        { type: 'Fee Claim', icon: '💰', hash: '0xabc1...def2', amount: '+0.312 WETH', time: '2m ago', status: 'confirmed' },
        { type: 'Token Launch', icon: '🚀', hash: '0x123a...456b', amount: 'CLAW deployed', time: '1h ago', status: 'confirmed' },
        { type: 'ETH Transfer', icon: '📤', hash: '0x789c...012d', amount: '-0.1 ETH', time: '3h ago', status: 'confirmed' },
        { type: 'Fee Claim', icon: '💰', hash: '0xfed3...cba4', amount: '+0.198 WETH', time: '1d ago', status: 'confirmed' },
        { type: 'Contract Call', icon: '⚙️', hash: '0x321e...654f', amount: 'swap', time: '2d ago', status: 'confirmed' },
        { type: 'Token Launch', icon: '🚀', hash: '0xbbb5...aaa6', amount: 'MOON deployed', time: '5d ago', status: 'confirmed' },
        { type: 'Failed Tx', icon: '❌', hash: '0x999g...888h', amount: '0 ETH', time: '6d ago', status: 'failed' },
      ];

      function txRowHTML(tx) {
        return '<div class="tx-row">' +
          '<div class="tx-icon" style="background:var(--bg3)">' + tx.icon + '</div>' +
          '<div class="tx-info"><div class="tx-type">' + tx.type + '</div><div class="tx-hash">' + tx.hash + '</div></div>' +
          '<div style="margin-right:12px"><span class="status-pill ' + tx.status + '">' + tx.status + '</span></div>' +
          '<div class="tx-value"><div class="tx-amount">' + tx.amount + '</div><div class="tx-time">' + tx.time + '</div></div>' +
          '</div>';
      }

      function renderTxList() {
        const el = document.getElementById('tx-list');
        const recentEl = document.getElementById('recent-txs');
        if (el) el.innerHTML = txHistory.map(txRowHTML).join('');
        if (recentEl) recentEl.innerHTML = txHistory.slice(0,4).map(txRowHTML).join('');
      }

      function updatePreview() {
        const nameEl = document.getElementById('token-name');
        const symEl = document.getElementById('token-symbol');
        const feeEl = document.getElementById('fee-recipient');
        const feeTypeEl = document.getElementById('fee-type');
        const name = (nameEl && nameEl.value) || 'Token Name';
        const sym = (symEl && symEl.value) || 'SYM';
        const fee = (feeEl && feeEl.value) || '';
        const feeType = (feeTypeEl && feeTypeEl.value) || 'x';
        const pName = document.getElementById('preview-name');
        const pSym = document.getElementById('preview-symbol');
        const pAvatar = document.getElementById('preview-avatar');
        const pCmd = document.getElementById('preview-command');
        if (pName) pName.textContent = name;
        if (pSym) pSym.textContent = '$' + sym;
        if (pAvatar) pAvatar.textContent = sym.slice(0,2).toUpperCase();
        let cmd = 'bankr launch --name "' + name + '" --symbol "' + sym + '"';
        if (fee) cmd += ' --fee "' + fee + '" --fee-type ' + feeType;
        if (pCmd) pCmd.innerHTML = cmd + '<button class="code-copy" onclick="copyCommand()">COPY</button>';
      }

      function updateFeeLabel() {
        const typeEl = document.getElementById('fee-type');
        const labelEl = document.getElementById('fee-label');
        const recipientEl = document.getElementById('fee-recipient');
        if (!typeEl) return;
        const type = typeEl.value;
        const labels = { x: 'X Handle', farcaster: 'Farcaster Handle', ens: 'ENS Name', wallet: 'Wallet Address' };
        const placeholders = { x: '@yourhandle', farcaster: '@yourcast', ens: 'yourname.eth', wallet: '0x...' };
        if (labelEl) labelEl.textContent = labels[type] || 'Recipient';
        if (recipientEl) recipientEl.placeholder = placeholders[type] || '';
      }

      function openLaunchModal() {
        const nameEl = document.getElementById('token-name');
        const symEl = document.getElementById('token-symbol');
        const feeRecipientEl = document.getElementById('fee-recipient');
        const name = nameEl ? nameEl.value : '';
        const sym = symEl ? symEl.value : '';
        if (!name || !sym) { showNotif('Missing fields', 'Please fill in Token Name and Symbol', 'error'); return; }
        const content = document.getElementById('launch-confirm-content');
        if (content) content.innerHTML =
          '<div style="display:flex;flex-direction:column;gap:10px;font-size:12px;">' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg3);border-radius:8px;"><span style="color:var(--muted)">Name</span><span>' + name + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg3);border-radius:8px;"><span style="color:var(--muted)">Symbol</span><span>$' + sym + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg3);border-radius:8px;"><span style="color:var(--muted)">Chain</span><span>Base (8453)</span></div>' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:rgba(255,77,0,0.06);border:1px solid rgba(255,77,0,0.15);border-radius:8px;"><span style="color:var(--muted)">Fee Recipient</span><span style="color:var(--accent)">' + ((feeRecipientEl && feeRecipientEl.value) || 'None set') + '</span></div>' +
          '</div>';
        const modal = document.getElementById('launch-modal');
        if (modal) modal.classList.add('open');
      }

      function openTxModal() {
        const toEl = document.getElementById('tx-to');
        const valEl = document.getElementById('tx-value');
        const chainEl = document.getElementById('tx-chain');
        const to = toEl ? toEl.value : '';
        const val = valEl ? valEl.value : '';
        const chain = chainEl ? chainEl.value : '';
        if (!to) { showNotif('Missing address', 'Please enter a destination address', 'error'); return; }
        const content = document.getElementById('tx-confirm-content');
        if (content) content.innerHTML =
          '<div style="display:flex;flex-direction:column;gap:8px;font-size:12px;">' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg3);border-radius:8px;"><span style="color:var(--muted)">To</span><span style="font-family:monospace;font-size:10px">' + to.slice(0,10) + '...' + to.slice(-6) + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg3);border-radius:8px;"><span style="color:var(--muted)">Value</span><span>' + (val || '0') + ' ETH</span></div>' +
          '<div style="display:flex;justify-content:space-between;padding:10px 14px;background:var(--bg3);border-radius:8px;"><span style="color:var(--muted)">Chain ID</span><span>' + chain + '</span></div>' +
          '</div>';
        const modal = document.getElementById('tx-modal');
        if (modal) modal.classList.add('open');
      }

      function closeModal(id) {
        const el = document.getElementById(id);
        if (el) el.classList.remove('open');
      }

      document.querySelectorAll('.modal-overlay').forEach(o => {
        o.addEventListener('click', e => { if (e.target === o) o.classList.remove('open'); });
      });

      function executeLaunch() {
        const spinner = document.getElementById('launch-spinner');
        if (spinner) spinner.classList.add('show');
        setTimeout(() => {
          if (spinner) spinner.classList.remove('show');
          closeModal('launch-modal');
          const nameEl = document.getElementById('token-name');
          showNotif('Token Launched! 🚀', (nameEl ? nameEl.value : 'Token') + ' deployed to Base', '');
          navigate('fees');
        }, 1800);
      }

      function executeTransaction() { closeModal('tx-modal'); showNotif('Transaction Submitted', 'Waiting for confirmation on Base', ''); }
      function executeClaim() { closeModal('claim-modal'); showNotif('Fees Claimed! 💰', '0.847 WETH sent to your wallet', ''); }
      function claimAllFees() { const m = document.getElementById('claim-modal'); if (m) m.classList.add('open'); }
      function claimToken(sym) { showNotif(sym + ' fees claimed', 'WETH transferred to your wallet', ''); }
      function simulateLaunch() { showNotif('Simulation OK ✓', 'No errors detected in deploy config', ''); }
      function signOnly() { showNotif('Signed', 'Transaction signed but not broadcast', ''); }
      function signMessage() { showNotif('Message Signed', 'Signature ready to use', ''); }
      function setChartRange(days) { renderChart('main-chart', generateBars(days, 0.01, 0.14)); }
      function refreshFees() { const el = document.getElementById('days-select'); renderChart('fees-chart', generateBars(el ? parseInt(el.value) : 30, 0.005, 0.142), 'var(--green)'); }

      function showNotif(title, msg, type) {
        const n = document.getElementById('notif');
        const t = document.getElementById('notif-title');
        const m = document.getElementById('notif-msg');
        if (!n) return;
        if (t) t.textContent = title;
        if (m) m.textContent = msg;
        n.className = 'notif' + (type === 'error' ? ' error' : '') + ' show';
        setTimeout(() => n.classList.remove('show'), 3500);
      }

      function copyCommand() { const el = document.getElementById('preview-command'); if (el) copyToClip(el.textContent.replace('COPY','').trim()); }
      function copyToClip(text) { navigator.clipboard.writeText(text).then(() => showNotif('Copied!', text.slice(0,40) + '...', '')); }
      function copyAddress() { copyToClip('0x1a2b3c4d5e6f7890abcdef1234567890f3e4'); }

      renderChart('main-chart', generateBars(30, 0.01, 0.14));
      renderChart('fees-chart', generateBars(30, 0.005, 0.142), 'var(--green)');
      renderTopTokens();
      renderTxList();
    `
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [])

  return (
    <div dangerouslySetInnerHTML={{ __html: `
<nav class="sidebar">
  <img src="/logo.png" alt="ClawBald" style="width:40px;height:40px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(255,180,0,0.6));margin-bottom:0;" onerror="this.style.display='none'">
  <div class="nav-item active" onclick="navigate('dashboard')" title="Dashboard">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" stroke-width="1.5"/><rect x="14" y="3" width="7" height="7" rx="1" stroke-width="1.5"/><rect x="3" y="14" width="7" height="7" rx="1" stroke-width="1.5"/><rect x="14" y="14" width="7" height="7" rx="1" stroke-width="1.5"/></svg>
  </div>
  <div class="nav-item" onclick="navigate('launch')" title="Launch Token">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2L8 8H4l4 4-1.5 6L12 15l5.5 3L16 12l4-4h-4L12 2z" stroke-width="1.5" stroke-linejoin="round"/></svg>
  </div>
  <div class="nav-item" onclick="navigate('fees')" title="Fee Dashboard">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke-width="1.5" stroke-linecap="round"/></svg>
  </div>
  <div class="nav-item" onclick="navigate('transactions')" title="Transactions">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M8 7l4-4 4 4M16 17l-4 4-4-4M12 3v18" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </div>
  <div class="sidebar-bottom">
    <div class="nav-item" onclick="navigate('settings')" title="Settings">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke-width="1.5"/><path d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-width="1.5" stroke-linecap="round"/></svg>
    </div>
  </div>
</nav>

<main class="main">
  <div class="topbar">
    <span class="topbar-title" id="page-title">Dashboard</span>
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="display:flex;gap:6px;">
        <span class="chain-pill active"><span class="chain-dot" style="background:#0052ff"></span>Base</span>
        <span class="chain-pill"><span class="chain-dot" style="background:#627eea"></span>ETH</span>
      </div>
      <div class="wallet-badge" onclick="copyAddress()">
        <div class="wallet-dot"></div>
        <span id="wallet-display">0x1a2b...f3e4</span>
      </div>
    </div>
  </div>

  <div class="content">
    <div class="page active" id="page-dashboard">
      <div class="stats-grid">
        <div class="stat-card"><div class="stat-label">Claimable WETH</div><div class="stat-value" style="color:var(--green)">0.847</div><div class="stat-sub">≈ $2,134.20</div><span class="stat-change up">+12.4% this week</span></div>
        <div class="stat-card"><div class="stat-label">Total Earned</div><div class="stat-value">4.21</div><div class="stat-sub">WETH lifetime</div><span class="stat-change up">+0.08 today</span></div>
        <div class="stat-card"><div class="stat-label">Active Tokens</div><div class="stat-value">7</div><div class="stat-sub">3 earning today</div><span class="stat-change up">5-day streak 🔥</span></div>
        <div class="stat-card"><div class="stat-label">Est. Monthly</div><div class="stat-value" style="color:var(--accent2)">2.4</div><div class="stat-sub">WETH projected</div><span class="stat-change up">Based on 30d avg</span></div>
      </div>
      <div class="two-col">
        <div class="card">
          <div class="card-header"><span class="card-title">Daily Earnings</span><div style="display:flex;gap:6px;"><button class="btn btn-ghost btn-sm" onclick="setChartRange(7)">7d</button><button class="btn btn-ghost btn-sm" style="color:var(--accent)" onclick="setChartRange(30)">30d</button><button class="btn btn-ghost btn-sm" onclick="setChartRange(90)">90d</button></div></div>
          <div class="chart-wrap"><div class="chart-bars" id="main-chart"></div><div class="chart-labels"><span>30 days ago</span><span>15 days ago</span><span>Today</span></div></div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Top Earning Tokens</span><button class="btn btn-outline btn-sm" onclick="navigate('fees')">View All</button></div>
          <div id="top-tokens-list"></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">Quick Actions</span></div>
        <div style="padding:20px;display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="navigate('launch')">🚀 Launch Token</button>
          <button class="btn btn-green" onclick="claimAllFees()">💰 Claim All Fees (0.847 WETH)</button>
          <button class="btn btn-outline" onclick="navigate('transactions')">⛓️ Submit Transaction</button>
        </div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Recent Transactions</span><span class="badge">Live</span></div>
        <div id="recent-txs"></div>
      </div>
    </div>

    <div class="page" id="page-launch">
      <div class="section-title">Launch Token</div>
      <div class="section-sub">Deploy a new token on Base with fee routing via Bankr CLI</div>
      <div class="two-col">
        <div class="card">
          <div class="card-header"><span class="card-title">Token Details</span><span class="badge blue">bankr launch</span></div>
          <div style="padding:24px;">
            <div class="two-col" style="margin-bottom:0">
              <div class="form-group"><label class="form-label">Token Name *</label><input class="form-input" id="token-name" placeholder="e.g. ClawBald Token" oninput="updatePreview()"></div>
              <div class="form-group"><label class="form-label">Symbol *</label><input class="form-input" id="token-symbol" placeholder="e.g. CLAW" maxlength="10" oninput="updatePreview()"></div>
            </div>
            <div class="form-group"><label class="form-label">Image URL</label><input class="form-input" id="token-image" placeholder="https://example.com/logo.png"></div>
            <div class="form-group"><label class="form-label">Website</label><input class="form-input" id="token-website" placeholder="https://yourproject.com"></div>
            <div class="form-group"><label class="form-label">Tweet URL</label><input class="form-input" id="token-tweet" placeholder="https://x.com/yourtweet"></div>
            <hr class="divider">
            <div class="card-title" style="margin-bottom:16px">Fee Recipient</div>
            <div class="form-group"><label class="form-label">Type</label><div class="select-wrap"><select class="form-select" id="fee-type" onchange="updateFeeLabel()"><option value="x">X (Twitter) Handle</option><option value="farcaster">Farcaster Handle</option><option value="ens">ENS Name</option><option value="wallet">Wallet Address</option></select></div></div>
            <div class="form-group"><label class="form-label" id="fee-label">X Handle</label><input class="form-input" id="fee-recipient" placeholder="@yourhandle"></div>
            <div style="display:flex;gap:12px;margin-top:8px;">
              <button class="btn btn-outline" onclick="simulateLaunch()">Simulate</button>
              <button class="btn btn-primary btn-lg" onclick="openLaunchModal()" style="flex:1">Launch Token →</button>
            </div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card">
            <div class="card-header"><span class="card-title">Preview</span></div>
            <div style="padding:20px;">
              <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
                <div id="preview-avatar" style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,var(--accent),var(--accent2));display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:800;font-size:16px;color:white;">?</div>
                <div><div id="preview-name" style="font-family:'Syne',sans-serif;font-weight:800;font-size:16px;">Token Name</div><div id="preview-symbol" style="font-size:11px;color:var(--muted)">$SYMBOL</div></div>
              </div>
              <div style="font-size:10px;color:var(--muted);margin-bottom:8px;">CLI COMMAND</div>
              <div class="code-block" id="preview-command">bankr launch --name "Token" --symbol "TKN"<button class="code-copy" onclick="copyCommand()">COPY</button></div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Launch Steps</span></div>
            <div class="steps">
              <div class="step done"><div class="step-num">✓</div><div class="step-body"><div class="step-title">Install Bankr CLI</div><div class="step-desc">npm install -g @bankr/cli</div></div></div>
              <div class="step done"><div class="step-num">✓</div><div class="step-body"><div class="step-title">Authenticate</div><div class="step-desc">bankr login email</div></div></div>
              <div class="step active"><div class="step-num">3</div><div class="step-body"><div class="step-title">Configure Token</div><div class="step-desc">Fill in token details above</div></div></div>
              <div class="step"><div class="step-num">4</div><div class="step-body"><div class="step-title">Deploy to Base</div><div class="step-desc">Submit with write-enabled key</div></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page" id="page-fees">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px;">
        <div><div class="section-title">Fee Dashboard</div><div class="section-sub">Track and claim WETH earnings from your deployed tokens</div></div>
        <div style="display:flex;gap:8px;align-items:center;">
          <select class="form-select" id="days-select" style="width:auto;padding:8px 32px 8px 12px;" onchange="refreshFees()"><option value="7">7 days</option><option value="30" selected>30 days</option><option value="90">90 days</option></select>
          <button class="btn btn-green" onclick="claimAllFees()">Claim All (0.847 ETH)</button>
        </div>
      </div>
      <div class="three-col">
        <div class="stat-card"><div class="stat-label">Claimable Now</div><div class="stat-value" style="color:var(--green)">0.847</div><div class="stat-sub">WETH across 5 tokens</div></div>
        <div class="stat-card"><div class="stat-label">Daily Average</div><div class="stat-value" style="font-size:22px">0.028</div><div class="stat-sub">WETH / day (30d)</div></div>
        <div class="stat-card"><div class="stat-label">Best Day</div><div class="stat-value" style="font-size:22px;color:var(--accent2)">0.142</div><div class="stat-sub">WETH on Feb 14</div></div>
      </div>
      <div class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">Daily Earnings (30d)</span></div>
        <div class="chart-wrap"><div class="chart-bars" id="fees-chart" style="height:100px"></div><div class="chart-labels"><span>Jan 23</span><span>Feb 1</span><span>Feb 10</span><span>Feb 23</span></div></div>
      </div>
      <div class="card">
        <div class="card-header"><span class="card-title">Per-Token Breakdown</span><input class="form-input" placeholder="Search..." style="width:220px;padding:6px 12px;font-size:11px;" id="fee-search" oninput="filterTokens()"></div>
        <div id="fee-token-list"></div>
      </div>
    </div>

    <div class="page" id="page-transactions">
      <div class="section-title">Transactions</div>
      <div class="section-sub">Sign and submit transactions to the blockchain via Bankr CLI</div>
      <div class="two-col">
        <div>
          <div class="card" style="margin-bottom:16px">
            <div class="card-header"><span class="card-title">Transaction Builder</span><span class="badge">bankr submit</span></div>
            <div style="padding:24px;">
              <div class="form-group"><label class="form-label">To Address</label><input class="form-input" id="tx-to" placeholder="0x..."></div>
              <div class="two-col" style="margin-bottom:0">
                <div class="form-group"><label class="form-label">Chain</label><div class="select-wrap"><select class="form-select" id="tx-chain"><option value="8453">Base (8453)</option><option value="1">Ethereum (1)</option><option value="137">Polygon (137)</option></select></div></div>
                <div class="form-group"><label class="form-label">Value (ETH)</label><input class="form-input" id="tx-value" placeholder="0.0" type="number" step="0.001"></div>
              </div>
              <div class="form-group"><label class="form-label">Calldata (hex, optional)</label><input class="form-input" id="tx-data" placeholder="0x..."></div>
              <div style="display:flex;gap:10px;margin-top:8px"><button class="btn btn-outline" onclick="signOnly()">Sign Only</button><button class="btn btn-primary" style="flex:1" onclick="openTxModal()">Submit Transaction →</button></div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Sign Message</span><span class="badge blue">bankr sign</span></div>
            <div style="padding:20px">
              <div class="form-group"><label class="form-label">Sign Type</label><div class="select-wrap"><select class="form-select" id="sign-type"><option value="personal_sign">personal_sign</option><option value="eth_signTypedData_v4">eth_signTypedData_v4</option></select></div></div>
              <div class="form-group"><label class="form-label">Message</label><textarea class="form-input" rows="3" id="sign-msg" placeholder="Hello, ClawBald!" style="resize:vertical"></textarea></div>
              <button class="btn btn-outline" style="width:100%" onclick="signMessage()">Sign Message</button>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Transaction History</span><span class="badge">22 total</span></div>
          <div id="tx-list"></div>
        </div>
      </div>
    </div>

    <div class="page" id="page-settings">
      <div class="section-title">Settings</div>
      <div class="section-sub">Configure your Bankr CLI connection and preferences</div>
      <div class="two-col">
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card">
            <div class="card-header"><span class="card-title">Authentication</span></div>
            <div style="padding:20px;">
              <div class="form-group"><label class="form-label">API Key (BANKR_API_KEY)</label><input class="form-input blurred" id="api-key-input" value="bk_c1a2w3b4a5l6d789xxxx" readonly onclick="this.classList.toggle('blurred')"><div style="font-size:9px;color:var(--muted);margin-top:4px;">Click to reveal</div></div>
              <div class="form-group"><label class="form-label">LLM Key</label><input class="form-input blurred" value="llm_k3y_xxxxxxxxxxxx" readonly onclick="this.classList.toggle('blurred')"></div>
              <div class="form-group"><label class="form-label">API URL</label><input class="form-input" value="https://api.bankr.bot" readonly style="color:var(--muted)"></div>
              <div style="display:flex;gap:8px;"><button class="btn btn-outline" onclick="showNotif('Verifying...','Checking connection','')">Test Connection</button><button class="btn btn-outline" style="color:var(--accent)" onclick="showNotif('Logged out','Credentials cleared','error')">Logout</button></div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Install Guide</span></div>
            <div style="padding:20px;">
              <div class="form-label">Install</div><div class="code-block">npm install -g @bankr/cli<button class="code-copy" onclick="copyToClip('npm install -g @bankr/cli')">COPY</button></div>
              <div class="form-label" style="margin-top:16px">Login</div><div class="code-block">bankr login email<button class="code-copy" onclick="copyToClip('bankr login email')">COPY</button></div>
              <div class="form-label" style="margin-top:16px">Verify</div><div class="code-block">bankr whoami<button class="code-copy" onclick="copyToClip('bankr whoami')">COPY</button></div>
            </div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div class="card">
            <div class="card-header"><span class="card-title">Wallet Info</span></div>
            <div style="padding:20px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;"><div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,#0052ff,#4d88ff);display:flex;align-items:center;justify-content:center;font-size:18px;">👤</div><div><div style="font-family:'Syne',sans-serif;font-weight:700">ClawBald User</div><div style="font-size:10px;color:var(--muted)">Bankr Club Member</div></div></div>
              <div class="form-label">Wallet Address</div>
              <div class="code-block" style="color:var(--text);font-size:10px">0x1a2b3c4d5e6f7890abcdef1234567890f3e4<button class="code-copy" onclick="copyAddress()">COPY</button></div>
              <hr class="divider">
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-bottom:8px;"><span style="color:var(--muted)">Daily Prompts</span><span>847 / 1000</span></div>
              <div class="progress-wrap"><div class="progress-bar" style="width:84.7%"></div></div>
              <div style="display:flex;justify-content:space-between;font-size:11px;margin-top:12px;"><span style="color:var(--muted)">Bankr Club</span><span style="color:var(--green)">Active ✓</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<div class="modal-overlay" id="launch-modal">
  <div class="modal">
    <div class="modal-title">Confirm Token Launch</div>
    <div class="modal-sub">Review your token details before deploying to Base</div>
    <div id="launch-confirm-content" style="margin-bottom:24px"></div>
    <div style="display:flex;gap:10px"><button class="btn btn-outline" style="flex:1" onclick="closeModal('launch-modal')">Cancel</button><button class="btn btn-primary" style="flex:1" onclick="executeLaunch()"><span id="launch-spinner" class="spinner"></span>Deploy Now</button></div>
  </div>
</div>
<div class="modal-overlay" id="tx-modal">
  <div class="modal">
    <div class="modal-title">Confirm Transaction</div>
    <div class="modal-sub">This will submit a transaction to the blockchain</div>
    <div id="tx-confirm-content" style="margin-bottom:24px"></div>
    <div style="display:flex;gap:10px"><button class="btn btn-outline" style="flex:1" onclick="closeModal('tx-modal')">Cancel</button><button class="btn btn-primary" style="flex:1" onclick="executeTransaction()">Submit</button></div>
  </div>
</div>
<div class="modal-overlay" id="claim-modal">
  <div class="modal">
    <div class="modal-title">Claim All Fees</div>
    <div class="modal-sub">Claim accumulated WETH from all your tokens</div>
    <div style="background:rgba(0,255,136,0.06);border:1px solid rgba(0,255,136,0.15);border-radius:10px;padding:16px;margin-bottom:24px"><div style="font-size:11px;color:var(--muted)">Total Claimable</div><div style="font-family:'Syne',sans-serif;font-weight:800;font-size:32px;color:var(--green)">0.847 WETH</div><div style="font-size:11px;color:var(--muted)">≈ $2,134.20 across 5 tokens</div></div>
    <div style="display:flex;gap:10px"><button class="btn btn-outline" style="flex:1" onclick="closeModal('claim-modal')">Cancel</button><button class="btn btn-green" style="flex:1" onclick="executeClaim()">Claim Now</button></div>
  </div>
</div>
<div class="notif" id="notif"><div class="notif-title" id="notif-title">Success</div><div class="notif-msg" id="notif-msg">Operation completed</div></div>
    ` }} />
  )
}
