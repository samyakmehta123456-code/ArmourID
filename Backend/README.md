# ArmourID Backend Microservices

FastAPI & Python microservice gateway for **ArmourID: Secure AI-Driven Identity Vault & Scoped Auto-Fill Platform**.

## Core Capabilities
- **DigiLocker OAuth2 + PKCE Token Gateway:** Manages PKCE code verifiers, token exchange, and document payload streaming over mTLS.
- **HMAC-SHA256 Scoped HashID Engine:** Computes deterministic, non-linkable per-domain identity tokens.
- **AES-256-GCM Envelope Encryption:** Encrypts user identity fields with Data Encryption Keys (DEKs) wrapped by AWS KMS.
- **DPDP Act 2023 Consent Manager:** Append-only consent ledger for data access, correction, and instant cryptographic key zeroization.

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
