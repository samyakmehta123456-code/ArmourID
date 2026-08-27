# ArmourID Team Collaboration & Git Synchronization Guide

> **Project Title:** ARMOURID: SECURE AI-DRIVEN DIGILOCKER IDENTITY VAULT & SCOPED AUTOFILL PLATFORM WITH DPDP ACT 2023 COMPLIANCE  
> **Institution:** Vellore Institute of Technology (VIT), Chennai — School of Computer Science & Engineering (SCOPE)  
> **Project Team:**
> - **Samyak Mehta** (25BCE1738) — Project Lead & Core Architecture
> - **Harsh Bhaskar** (25BCE1787) — Full-Stack & Cryptographic Engine
> - **Rudraksh Choudhary** (25BCE1790) — AI Extraction & DPDP Compliance

---

## 🔑 The Golden Rule of Git Synchronization

To ensure that **all team members stay 100% in sync** and prevent code conflicts, every collaborator **MUST** execute the following command before starting work every day:

```bash
git pull origin main
```

---

## 🔄 Daily 4-Step Collaborator Workflow

### Step 1: Sync Your Local Copy
Before making any changes, pull the latest code from GitHub:
```bash
git pull origin main
```

### Step 2: Create a Feature Branch
Do not commit directly to `main`. Create a descriptive feature branch for your task:
```bash
# Example for adding a new college form
git checkout -b feature/add-jee-form

# Example for updating backend crypto
git checkout -b feature/backend-crypto
```

### Step 3: Commit & Push Your Work
Write clean, modular code. Test your changes locally, then commit and push:
```bash
git add .
git commit -m "Add JEE Main 2026 application form template"
git push origin feature/add-jee-form
```

### Step 4: Open a Pull Request (PR)
1. Go to [github.com/samyakmehta123456-code/ArmourID_Workspace](https://github.com/samyakmehta123456-code/ArmourID_Workspace).
2. Click **Compare & Pull Request**.
3. Add a brief title and description of your changes.
4. **Samyak Mehta** (Project Lead) will review your code and click **Merge Pull Request**.

> ⚡ **Automated Vercel Deployment:** Once a PR is merged into `main`, Vercel automatically updates the live web app in ~10 seconds!

---

## 📁 Repository Directory Structure

```text
ArmourID_Workspace/
├── Frontend_app/            # React 18 PWA Mobile Web App
│   ├── public/              # Manifest, Service Worker, and Index HTML
│   ├── src/                 # Screen Tabs, Modals, Context, and Theme Tokens
│   └── vercel.json          # Vercel Production Build Rules
├── Backend/                 # FastAPI Microservice Gateway
│   ├── main.py              # Application Entry Point & CORS Setup
│   ├── requirements.txt     # Dependency Definitions
│   └── README.md            # Backend Setup Instructions
├── Database/                # PostgreSQL Security & DDL Infrastructure
│   ├── schema.sql           # Tables, Indexes & Row-Level Security (RLS)
│   ├── seed_data.sql        # Initial Test Data
│   └── README.md            # Database Migration Guide
├── COLLABORATION.md         # Team Git Guide (This File)
├── PROJECT_REPORT.md        # Full Academic Project Report Documentation
└── README.md                # Public Workspace Overview
```

---

## 🛡️ Coding & Security Standards

1. **Zero-Plaintext Storage:** Never log or commit raw Aadhaar, PAN, or voter identity numbers. Use AES-256 envelope encryption or blind HMAC indexing.
2. **Apple SF Pro Typography:** Use `-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif` font stacks.
3. **Official Color Palette:**
   - **FaceTime Green:** `#34C759` (Trust accents, verified badges, floating nav bar)
   - **Sunburst Yellow:** `#FFCC00` (Primary CTA buttons, active state highlights)
   - **Deep Cyan/Blue:** `#0284C7` (Scoped HashID boxes)
   - **Solid Red:** `#DC2626` (Revoke Scope buttons)
4. **No Unused Imports:** Keep imports clean to ensure Vercel builds pass with 100% green checkmarks.

---

## 🚀 Useful Commands

```bash
# Start frontend app
cd Frontend_app && npm start

# Run backend FastAPI service
cd Backend && uvicorn main:app --reload

# Check git status
git status

# View commit history
git log --oneline -n 10
```
