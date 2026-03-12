# AURA — Deployment Guide
**Attrition Understanding & Retention Analytics**
Created by Omkar & Kethan, SSSIHL

---

## What's in this folder

```
aura-deploy/
├── index.html                  ← The full AURA web app
├── netlify.toml                ← Netlify config (routing + headers)
├── netlify/
│   └── functions/
│       └── ai-insights.js      ← Secure API proxy (keeps your key safe)
└── README.md                   ← This file
```

---

## Step 0 — Get your free Groq API key

AURA uses **Groq** for AI Insights — it's completely free with no credit card needed.

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up (Google login works)
3. Go to **API Keys** → **Create API Key**
4. Copy the key — it looks like `gsk_...`

That's it. Groq's free tier is generous enough for demos and regular team use.

---

## Deploy to Netlify (free)

### Step 1 — Create a Netlify account
Go to [netlify.com](https://netlify.com) and sign up for free.

### Step 2 — Upload the project

**Option A — Drag & Drop (easiest):**
1. Zip this entire `aura-deploy/` folder
2. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Deploy manually"
3. Drag and drop the zip file
4. Netlify gives you a live URL instantly (e.g. `random-name.netlify.app`)

**Option B — Via GitHub (recommended for updates):**
1. Create a new GitHub repository
2. Push this entire folder to the repo
3. In Netlify → "Add new site" → "Import from Git" → connect your repo
4. Build settings: leave blank (no build command needed)
5. Click Deploy

### Step 3 — Add your Groq API key (IMPORTANT)

1. In Netlify dashboard → your site → **Site configuration** → **Environment variables**
2. Click "Add a variable"
3. Key: `GROQ_API_KEY`
4. Value: your Groq key (starts with `gsk_...`)
5. Click Save
6. Go to **Deploys** → "Trigger deploy" → "Deploy site" to apply

> ⚠️ Never put your API key directly in index.html — the environment variable
> approach keeps it completely hidden from the public.

### Step 4 — (Optional) Set a custom subdomain
Netlify → Site configuration → Domain management → Edit site name
→ e.g. `aura-sssihl.netlify.app`

---

## How the security works

```
Browser (index.html)
      │
      │  POST /api/ai-insights
      │  { dataContext: "..." }    ← no API key ever in the browser
      ▼
Netlify Function (ai-insights.js)
      │
      │  reads GROQ_API_KEY
      │  from server environment
      ▼
Groq API  ←  key is only here, on the server
      │
      ▼
Response text back to browser
```

---

## Testing locally (optional)

```bash
npm install -g netlify-cli
cd aura-deploy
export GROQ_API_KEY=gsk_...
netlify dev
```

Then open `http://localhost:8888`

---

## Updating the app

- **GitHub deploy:** push changes → Netlify auto-redeploys
- **Manual deploy:** drag-drop a new zip to Netlify

---

## Questions?
Contact Omkar & Kethan, SSSIHL.
