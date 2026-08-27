<div align="center">
  <br />
  <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 5 L88 24V60 C88 78 50 95 50 95 C50 95 12 78 12 60V24 L50 5Z" fill="#34C759" stroke="#248A3D" stroke-width="4" stroke-linejoin="round"/>
    <path d="M50 12 L80 28V56 C80 70 50 85 50 85 C50 85 20 70 20 56V28 L50 12Z" fill="#FFCC00"/>
    <path d="M34 56L40 40L50 48L60 40L66 56H34Z" fill="#34C759"/>
    <rect x="36" y="58" width="28" height="4" rx="2" fill="#FFCC00"/>
    <circle cx="50" cy="30" r="4" fill="#34C759"/>
  </svg>
  <h1>ArmourID Workspace</h1>
  <p><strong>Secure AI-Driven Identity Vault & Scoped Auto-Fill Mobile Platform</strong></p>
  <p><em>DPDP Act 2023 Compliant Data Fiduciary Microservices Architecture</em></p>
  <br />

  [![DPDP Act 2023 Compliant](https://img.shields.io/badge/DPDP_Act_2023-Compliant_Fiduciary-34C759?style=for-the-badge)](https://github.com/samyakmehta123456-code/ArmourID_Workspace)
  [![React 18](https://img.shields.io/badge/Frontend-React_PWA_App-61DAFB?style=for-the-badge)](./Frontend_app)
  [![FastAPI](https://img.shields.io/badge/Backend-FastAPI_Python-009688?style=for-the-badge)](./Backend)
  [![PostgreSQL RLS](https://img.shields.io/badge/Database-PostgreSQL_RLS-336791?style=for-the-badge)](./Database)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
  <br />
</div>

---

## 📁 Repository Workspace Architecture

```text
ArmourID_Workspace/
├── Frontend_app/   # React 18 PWA Mobile Web App (FaceTime Green UI, SF Pro fonts)
├── Backend/        # FastAPI / Python Microservice Gateway (DigiLocker, OAuth2, AES-256)
├── Database/       # PostgreSQL 15+ DDL Schemas, Row-Level Security & Seed Scripts
├── COLLABORATION.md # Team Git Synchronization & Contribution Guide
├── PROJECT_REPORT.md# Full 37-Page Academic Project Report
└── README.md        # Workspace System Overview
```

---

## 🌟 Component Modules

### 📱 1. `Frontend_app/` (React PWA Mobile Application)
- **DigiLocker Document Vault:** Authentic Aadhaar, Marksheet, and PAN card rendering.
- **AES-256 Auxiliary Vault:** Scoped storage for custom academic & financial attributes.
- **1-Click Auto-Fill Engine:** Form matcher and selector injector for university forms.
- **PWA Fullscreen Mode:** Registered Service Worker & manifest for zero-browser-bar native launch.

### ⚙️ 2. `Backend/` (FastAPI Microservice Gateway)
- **OAuth2 PKCE Gateway:** Token exchange and document payload streaming over mTLS.
- **HMAC-SHA256 Scoped HashID Engine:** Purpose-bound non-linkable per-domain identifier derivation.
- **AWS KMS Envelope Cryptography:** Data Encryption Keys (DEKs) wrapped by master key encryption keys.

### 🗄️ 3. `Database/` (PostgreSQL & RLS Policies)
- **Row-Level Security (RLS):** Strict tenant data isolation.
- **DPDP Statutory Consent Ledger:** Immutable append-only logging for access, modification, and data erasure.

---

## 🚀 Quickstart Guide

### Running Frontend App
```bash
cd Frontend_app
npm install
npm start
```

### Running Backend Microservices
```bash
cd Backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Running Database Migrations
```bash
psql -h localhost -U postgres -d armour_id -f Database/schema.sql
```

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

Developed by Samyak Mehta, Harsh Bhaskar, and Rudraksh Choudhary (VIT Chennai).
