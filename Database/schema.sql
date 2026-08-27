-- ==============================================================================
-- ArmourID Database Schema & Row-Level Security (RLS) Policies
-- DPDP Act 2023 Compliant Zero-Plaintext Architecture
-- Database Engine: PostgreSQL 15+ (Compatible with Supabase / Neon)
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. USERS & MASTER SEED TABLE
-- ------------------------------------------------------------------------------
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    mfa_enabled BOOLEAN DEFAULT TRUE,
    biometrics_enabled BOOLEAN DEFAULT TRUE,
    master_seed_salt VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS on users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 2. DIGILOCKER OAUTH TOKENS & DOCUMENT PAYLOADS (AES-256 Envelope Encrypted)
-- ------------------------------------------------------------------------------
CREATE TABLE digilocker_documents (
    doc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    doc_type VARCHAR(50) NOT NULL, -- Aadhaar, PAN, Marksheet_XII, Driving_License
    issuer_name VARCHAR(255) NOT NULL,
    encrypted_payload TEXT NOT NULL, -- AES-256-GCM Encrypted JSON/XML
    aes_gcm_iv VARCHAR(255) NOT NULL,
    auth_tag VARCHAR(255) NOT NULL,
    wrapped_dek_blob TEXT NOT NULL, -- AWS KMS wrapped Key
    verified_status BOOLEAN DEFAULT TRUE,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE digilocker_documents ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. AUXILIARY ENCRYPTED VAULT (Custom Non-DigiLocker Attributes)
-- ------------------------------------------------------------------------------
CREATE TABLE auxiliary_vault_items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    field_key VARCHAR(100) NOT NULL, -- e.g., father_annual_income, bank_ifsc
    field_label VARCHAR(255) NOT NULL,
    encrypted_value TEXT NOT NULL, -- AES-256-GCM Ciphertext
    aes_gcm_iv VARCHAR(255) NOT NULL,
    auth_tag VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE auxiliary_vault_items ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 4. CONNECTED PORTALS & SCOPED HASHID CONSENTS
-- ------------------------------------------------------------------------------
CREATE TABLE connected_portals (
    portal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    portal_name VARCHAR(255) NOT NULL, -- e.g., IIT Bombay UG Admissions
    target_domain VARCHAR(255) NOT NULL, -- admissions.iitb.ac.in
    scoped_hash_id VARCHAR(255) NOT NULL, -- HMAC-SHA256(MasterKey, Domain || Scope || Salt)
    granted_scopes TEXT[] NOT NULL, -- ['Full Legal Name', 'Aadhaar Hash', 'Class XII Marks']
    is_active BOOLEAN DEFAULT TRUE,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE connected_portals ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 5. DPDP ACT 2023 IMMUTABLE CONSENT LEDGER & AUDIT LOGS
-- ------------------------------------------------------------------------------
CREATE TABLE dpdp_consent_ledger (
    ledger_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL, -- CONSENT_GRANTED, CONSENT_REVOKED, DATA_ERASED
    target_portal VARCHAR(255) NOT NULL,
    itemized_fields TEXT[] NOT NULL,
    cryptographic_signature VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE dpdp_consent_ledger ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- ROW LEVEL SECURITY POLICIES (User Data Isolation)
-- ------------------------------------------------------------------------------
CREATE POLICY user_vault_isolation ON digilocker_documents
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY auxiliary_vault_isolation ON auxiliary_vault_items
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY portals_isolation ON connected_portals
    FOR ALL USING (user_id = auth.uid());

CREATE POLICY consent_ledger_isolation ON dpdp_consent_ledger
    FOR ALL USING (user_id = auth.uid());
