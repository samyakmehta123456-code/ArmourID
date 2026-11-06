# ArmourID Backend Microservices

FastAPI & Python microservice gateway for **ArmourID: Secure AI-Driven Identity Vault & Scoped Auto-Fill Platform**.

## Core Capabilities
- **AI Document Extraction Pipeline:** Multimodal LayoutLMv3 token classification and OCR spatial bounding-box normalizer for Aadhaar, PAN, and 12th Marksheets with ~90% accuracy.
- **DigiLocker OAuth2 + PKCE Token Gateway:** Manages PKCE code verifiers, token exchange, and document payload streaming over mTLS.
- **HMAC-SHA256 Scoped HashID Engine:** Computes deterministic, non-linkable per-domain identity tokens to prevent cross-party tracking.
- **AES-256-GCM Envelope Encryption:** Encrypts user identity fields with Data Encryption Keys (DEKs) wrapped by AWS KMS hierarchy.
- **DPDP Act 2023 Consent Manager:** Append-only consent ledger for data access, correction, and instant cryptographic key zeroization (Section 12 Right to Erasure).

## Local Setup & Execution

```bash
# 1. Navigate to Backend directory
cd Backend

# 2. Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt

# 4. Launch development server
uvicorn main:app --reload --port 8000
```

The API docs will be available at `http://localhost:8000/docs`.
