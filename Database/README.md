# ArmourID Database Schema & Migration Guide

PostgreSQL database schemas, Row-Level Security (RLS) policies, and seed scripts for **ArmourID**.

## Database Overview
- **Database Engine:** PostgreSQL 15+ (Compatible with Supabase / Neon / AWS RDS).
- **Row-Level Security (RLS):** Enforced across all user data tables to isolate tenant identity records.
- **Zero-Plaintext Storage Policy:** PII attributes are stored exclusively as AES-256 ciphertexts or HMAC blind indices.

## Migration Steps

```bash
# 1. Connect to PostgreSQL instance
psql -h localhost -U postgres -d armour_id

# 2. Run DDL schema definition
\i Database/schema.sql

# 3. Insert initial development seed data
\i Database/seed_data.sql
```
