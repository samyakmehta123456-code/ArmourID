-- Sample Seed Data for ArmourID Development Harness

-- Insert Test User Profile
INSERT INTO users (user_id, email, phone_number, password_hash, master_seed_salt)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'siddharth.sharma@example.com',
    '+91-9876543210',
    '$2b$12$eImiTXuWVxfM37uY4JANjO5E.y/wO5v.19b.1a.1b',
    '0x8f9a2b41e9821a3c'
);

-- Insert Sample Connected Portal with Scoped HashID
INSERT INTO connected_portals (user_id, portal_name, target_domain, scoped_hash_id, granted_scopes)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'IIT Bombay UG Admissions Portal',
    'admissions.iitb.ac.in',
    'armour_hash_8f9a2b41e9821a',
    ARRAY['Full Legal Name', 'Date of Birth', 'CBSE Class XII Roll & Score', 'Aadhaar Number']
);
