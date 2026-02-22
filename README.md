# 🦞 ClawBald

Token Platform for Degens — Launch tokens, track fees, manage transactions.  
Powered by **Bankr CLI** · Deployed on **Base**.

---

## 📁 Struktur Project

```
clawbald/
├── public/
│   └── logo.png              ← Logo ClawBald
├── src/
│   └── app/
│       ├── layout.tsx         ← Root layout (font, metadata)
│       ├── globals.css        ← Semua styles
│       ├── page.tsx           ← Landing page (/)
│       └── dashboard/
│           └── page.tsx       ← Dashboard (/dashboard)
├── next.config.js
├── package.json
├── tsconfig.json
└── vercel.json
```

**Routing:**
- `/` → Landing page (overview project)
- `/dashboard` → Full dashboard (launch, fees, transactions)

---

## 🚀 Deploy ke Vercel (Step by Step)

### Step 1 — Install dependencies

```bash
npm install
```

### Step 2 — Test lokal dulu

```bash
npm run dev
```

Buka `http://localhost:3000` di browser.  
- Landing page → `http://localhost:3000`
- Dashboard → `http://localhost:3000/dashboard`

### Step 3 — Push ke GitHub

```bash
git init
git add .
git commit -m "🦞 Initial ClawBald project"
git branch -M main
git remote add origin https://github.com/USERNAME/clawbald.git
git push -u origin main
```

> Ganti `USERNAME` dengan username GitHub kamu.

### Step 4 — Deploy ke Vercel

**Cara A — Via CLI (paling cepat):**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Ikuti promptnya:
# ✔ Set up and deploy? → Y
# ✔ Which scope? → pilih akun kamu
# ✔ Link to existing project? → N
# ✔ Project name → clawbald
# ✔ Directory → ./
# ✔ Override settings? → N
```

**Cara B — Via Website:**
1. Buka [vercel.com](https://vercel.com) → Login
2. Klik **"Add New Project"**
3. Import repo GitHub `clawbald`
4. Settings biarkan default → Klik **"Deploy"**
5. Selesai! Kamu dapat URL seperti `clawbald.vercel.app`

---

## ⚙️ Bankr CLI Setup

```bash
# Install Bankr CLI
npm install -g @bankr/cli

# Login (buat wallet + API key)
bankr login email --read-write

# Cek status
bankr whoami
```

### Environment Variables (opsional, untuk integrasi penuh)

Buat file `.env.local`:

```env
BANKR_API_KEY=bk_your_key_here
NEXT_PUBLIC_WALLET_ADDRESS=0xYourWalletAddress
```

Di Vercel: **Project Settings → Environment Variables** → tambahkan keys yang sama.

---

## 📋 Fitur

| Halaman | Route | Fitur |
|---------|-------|-------|
| Landing | `/` | Overview project, stats, how it works |
| Dashboard | `/dashboard` | Launch token, fee tracking, transactions |

### Dashboard Tabs:
- **Dashboard** — Stats overview, earnings chart, quick actions
- **Launch Token** — Deploy ERC-20 ke Base via `bankr launch`
- **Fee Dashboard** — WETH claimable, per-token breakdown, claim button
- **Transactions** — Submit & sign transactions via `bankr submit` / `bankr sign`
- **Settings** — API key, wallet info, CLI install guide

---

## 🔗 Links

- [Bankr CLI Docs](https://docs.bankr.bot/cli)
- [Vercel](https://vercel.com)
- [Base](https://base.org)
