-- ==============================================================================
-- ArmourID Supabase Database Schema & Setup
-- 1-Click Setup for Supabase SQL Editor
-- DPDP Act 2023 Compliant Zero-Knowledge Storage
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Clean Drop if Re-running (Optional)
DROP TABLE IF EXISTS dpdp_consent_ledger CASCADE;
DROP TABLE IF EXISTS connected_portals CASCADE;
DROP TABLE IF EXISTS auxiliary_vault_items CASCADE;
DROP TABLE IF EXISTS digilocker_documents CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- 3. Users Table
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

-- 4. DigiLocker Document Vault (Envelope Encrypted)
CREATE TABLE digilocker_documents (
    doc_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    doc_type VARCHAR(50) NOT NULL,
    issuer_name VARCHAR(255) NOT NULL,
    encrypted_payload TEXT NOT NULL,
    aes_gcm_iv VARCHAR(255) NOT NULL,
    auth_tag VARCHAR(255) NOT NULL,
    wrapped_dek_blob TEXT NOT NULL,
    verified_status BOOLEAN DEFAULT TRUE,
    fetched_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Auxiliary Vault (Custom User Credentials)
CREATE TABLE auxiliary_vault_items (
    item_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    field_key VARCHAR(100) NOT NULL,
    field_label VARCHAR(255) NOT NULL,
    encrypted_value TEXT NOT NULL,
    aes_gcm_iv VARCHAR(255) NOT NULL,
    auth_tag VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Connected Portals (Scoped HashIDs)
CREATE TABLE connected_portals (
    portal_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    portal_name VARCHAR(255) NOT NULL,
    target_domain VARCHAR(255) NOT NULL,
    scoped_hash_id VARCHAR(255) NOT NULL,
    granted_scopes TEXT[] NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    connected_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. DPDP Consent Ledger (Append-Only Audit Trail)
CREATE TABLE dpdp_consent_ledger (
    ledger_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    target_portal VARCHAR(255) NOT NULL,
    itemized_fields TEXT[] NOT NULL,
    cryptographic_signature VARCHAR(255) NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Enable Row-Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE digilocker_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE auxiliary_vault_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE connected_portals ENABLE ROW LEVEL SECURITY;
ALTER TABLE dpdp_consent_ledger ENABLE ROW LEVEL SECURITY;

-- 9. Create Open Dev Policies (For Quick Local & Prototype Dev)
CREATE POLICY "Allow public read for demo" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public read for demo docs" ON digilocker_documents FOR SELECT USING (true);
CREATE POLICY "Allow public read for demo aux" ON auxiliary_vault_items FOR SELECT USING (true);
CREATE POLICY "Allow public read for demo portals" ON connected_portals FOR SELECT USING (true);
CREATE POLICY "Allow public read for demo ledger" ON dpdp_consent_ledger FOR SELECT USING (true);

-- 10. Initial Seed Data
INSERT INTO users (user_id, email, phone_number, password_hash, master_seed_salt)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'siddharth.sharma@example.in',
    '+91 98******10',
    '$2b$12$eImiTXuWVxfM37uY4JANjO5E.y/wO5v.19b.1a.1b',
    '0x8f9a2b41e9821a3c'
);

INSERT INTO connected_portals (user_id, portal_name, target_domain, scoped_hash_id, granted_scopes)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IIT Bombay Admissions',
    'admissions.iitb.ac.in',
    'armour_hash_8f9a2b41e9821a',
    ARRAY['Full Legal Name', 'Date of Birth', 'CBSE Class XII Roll & Score', 'Aadhaar Hash']
);
