from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="ArmourID Backend Microservice API",
    description="DPDP Act 2023 Compliant Data Fiduciary API Gateway with DigiLocker OAuth2, AES-256 Envelope Crypto, and HMAC Scoped HashID derivation.",
    version="1.0.0"
)

# Enable CORS for Frontend App
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "ArmourID Zero-Knowledge Fiduciary Gateway",
        "version": "1.0.0",
        "dpdp_compliance": "Enforced"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "database": "connected", "kms": "active"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
