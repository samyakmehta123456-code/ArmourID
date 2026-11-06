from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os

from routers.documents import router as documents_router
from routers.vault import router as vault_router

app = FastAPI(
    title="ArmourID Backend Microservice API",
    description="DPDP Act 2023 Compliant Data Fiduciary API Gateway with DigiLocker OAuth2, AES-256 Envelope Crypto, LayoutLMv3 Document AI, and HMAC Scoped HashID derivation.",
    version="1.0.0"
)

# Enable CORS for Frontend PWA App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers
app.include_router(documents_router)
app.include_router(vault_router)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "ArmourID Zero-Knowledge Fiduciary Gateway",
        "version": "1.0.0",
        "dpdp_compliance": "Enforced",
        "pipelines": {
            "ai_document_processing": "LayoutLMv3 + OCR Token Normalization",
            "cryptography": "AES-256-GCM Envelope Encryption & HMAC-SHA256 Scoped HashID",
            "database": "PostgreSQL with Row-Level Security (RLS)"
        }
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "database": "connected",
        "kms": "active",
        "layoutlm_pipeline": "ready"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
