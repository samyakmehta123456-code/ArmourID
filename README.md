# ArmourID — Secure AI-Driven Identity Vault & Scoped Auto-Fill

[![DPDP Act 2023 Compliant](https://img.shields.io/badge/DPDP_Act_2023-Compliant_Fiduciary-34C759?style=for-the-badge)](https://github.com/samyakmehta123456-code/ArmourID)
[![React 18](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge)](https://reactjs.org/)
[![PWA Ready](https://img.shields.io/badge/PWA-Standalone_Fullscreen-FFCC00?style=for-the-badge)](https://github.com/samyakmehta123456-code/ArmourID)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

**ArmourID** is a next-generation, zero-knowledge identity vault and scoped form auto-fill mobile application engineered to serve as a compliant **Data Fiduciary** under India's **Digital Personal Data Protection (DPDP) Act 2023**.

Designed with native Apple-grade UI aesthetics, ArmourID features official **Apple FaceTime Green (`#34C759`)** trust accents, **Apple TV Sunburst Yellow (`#FFCC00`)** primary CTA controls, and native **Apple SF Pro** typography scale.

---

## Core Features

### 1. DigiLocker Verified Document Vault
* **Government-Verified Credentials:** Direct OAuth2 integration with DigiLocker sandbox endpoints for Aadhaar identity cards, Class XII marksheets, Driving Licenses, and PAN cards.
* **Encrypted Identity Parsing:** Automatically extracts verified attributes (Legal Name, DOB, Aadhaar Hash, Roll Numbers) while keeping raw documents encrypted.

### 2. AES-256 Auxiliary Vault
* **Custom Scoped Attributes:** Securely store non-government credentials (College ID, JEE Main Application Number, Category Certificates, Bank IFSC) using client-side AES-256 encryption.

### 3. 1-Click Form Auto-Fill Engine
* **Form Detection & Parsing:** Intelligent field matcher for entrance and college application portals (JEE Main, NEET UG, UPSC, CAT, GATE).
* **Instant Auto-Fill Execution:** Fills 10+ complex application form fields in under **50ms** with zero manual copy-pasting.

### 4. Scoped HashID & Granular Consent Management
* **Portal-Specific Privacy:** Generates unique, cryptographically scoped `Armour_HashID` tokens per target application domain.
* **One-Tap Consent Revocation:** Users retain 100% sovereignty to instantly revoke data access scope for any connected portal.

### 5. DPDP Act 2023 Statutory Rights Center
* **Right to Access:** View complete audit log timelines of data accesses.
* **Right to Correction:** Instant source re-synchronization with DigiLocker.
* **Right to Withdraw Consent:** Granular per-portal consent management.
* **Right to Erasure (Right to be Forgotten):** Cryptographically purges master seed keys and local storage state with biometric confirmation.

### 6. Progressive Web App (PWA) & Mobile APK
* **Standalone Fullscreen Launch:** Built with a registered Service Worker and `display: "standalone"` manifest for zero-browser-bar native launch.
* **PWABuilder Android APK:** Easily packaged into a signed Android `.apk` file for direct installation.

---

## Tech Stack & Design Tokens

* **Frontend Framework:** React 18.2, React Native Web, React DOM
* **Icons & Visuals:** Lucide React (`lucide-react`)
* **Typography:** Native Apple System Font Stack (`-apple-system`, `"SF Pro Display"`, `"SF Pro Text"`)
* **Color Tokens:**
  * **FaceTime Green:** `#34C759` (Trust accents, badges, floating capsule nav)
  * **Sunburst Yellow:** `#FFCC00` (Primary CTA buttons, active metrics)
  * **Deep Cyan/Blue:** `#0284C7` (Scoped HashID boxes)
  * **Solid Red:** `#DC2626` (Revoke Scope buttons)
  * **Light Background:** `#F3F4F6` (Canvas with repeating 3D micro-dot mesh matrix)

---

## Getting Started

### Prerequisites
* Node.js v16+ or v18+
* npm v8+

### Installation & Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/samyakmehta123456-code/ArmourID.git

# 2. Navigate to project directory
cd ArmourID

# 3. Install dependencies
npm install

# 4. Start local development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the live application.

---

## Production Build & Deployment

### Build for Production
```bash
npm run build
```

### Deploying to Vercel (Recommended)
1. Import your GitHub repository `samyakmehta123456-code/ArmourID` into [Vercel](https://vercel.com/new).
2. Click **Deploy**. Vercel will automatically build and deploy the app at `https://armour-id.vercel.app`.

### Generating an Android `.apk` File via PWABuilder
1. Open [PWABuilder.com](https://www.pwabuilder.com).
2. Enter your live Vercel production URL (`https://armour-id.vercel.app`).
3. Click **Package for Store** → Select **Android** → Click **Generate**.
4. Download your signed `ArmourID.apk` file and install directly on Android devices!

---

## DPDP Act 2023 Compliance Summary

ArmourID operates strictly under the statutory framework established by the **Digital Personal Data Protection Act, 2023 (India)**:

| DPDP Mandate | ArmourID Implementation |
|---|---|
| **Data Fiduciary Obligations** | Zero-knowledge architecture; data is processed solely upon explicit user consent. |
| **Notice & Consent** | Interactive modal sheet detailing exact fields requested before auto-fill execution. |
| **Data Minimization** | Scoped HashIDs expose only authorized attributes to target portals. |
| **Data Principal Rights** | Dedicated DPDP Statutory Rights tab supporting Access, Correction, Withdrawal, and Erasure. |

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

Developed by Samyak Mehta for secure, privacy-first identity management.
