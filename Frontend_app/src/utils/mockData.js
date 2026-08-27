// Mock Data for ArmourID Identity Vault & Scoped Auto-fill

export const INITIAL_DIGILOCKER_DOCS = [
  {
    id: 'doc_aadhaar_01',
    type: 'aadhaar',
    title: 'Aadhaar Verified Identity',
    issuer: 'Unique Identification Authority of India (UIDAI)',
    verifiedDate: '2026-08-20T14:32:00Z',
    status: 'verified',
    source: 'DigiLocker Verified',
    iconName: 'ShieldCheck',
    fields: [
      { key: 'full_name', label: 'Full Legal Name', value: 'Siddharth R. Sharma', isEncrypted: true },
      { key: 'aadhaar_number', label: 'Aadhaar Number', value: 'XXXX-XXXX-8921', rawValue: '4829-1092-8921', isEncrypted: true },
      { key: 'dob', label: 'Date of Birth', value: '14 August 2003', isEncrypted: false },
      { key: 'gender', label: 'Gender', value: 'Male', isEncrypted: false },
      { key: 'address', label: 'Permanent Address', value: 'Flat 402, Royal Residency, Bandra West, Mumbai, MH - 400050', isEncrypted: true },
      { key: 'mobile_linked', label: 'Linked Phone', value: '+91 98******10', isEncrypted: true },
    ]
  },
  {
    id: 'doc_pan_02',
    type: 'pan',
    title: 'Permanent Account Number (PAN)',
    issuer: 'Income Tax Department, Govt of India',
    verifiedDate: '2026-08-19T09:15:00Z',
    status: 'verified',
    source: 'DigiLocker Verified',
    iconName: 'CreditCard',
    fields: [
      { key: 'pan_number', label: 'PAN Number', value: 'ABCPS8921K', isEncrypted: true },
      { key: 'name_on_card', label: 'Name on PAN Card', value: 'Siddharth R. Sharma', isEncrypted: false },
      { key: 'fathers_name', label: "Father's Name", value: 'Rajesh K. Sharma', isEncrypted: false },
      { key: 'dob', label: 'Date of Birth', value: '14/08/2003', isEncrypted: false },
      { key: 'pan_status', label: 'Aadhaar Linkage Status', value: 'Linked & Verified', isEncrypted: false },
    ]
  },
  {
    id: 'doc_class12_03',
    type: 'marksheet',
    title: 'Class XII Senior Secondary Marksheet',
    issuer: 'Central Board of Secondary Education (CBSE)',
    verifiedDate: '2026-08-21T11:45:00Z',
    status: 'verified',
    source: 'DigiLocker Verified',
    iconName: 'GraduationCap',
    fields: [
      { key: 'board_name', label: 'Board Name', value: 'CBSE New Delhi', isEncrypted: false },
      { key: 'roll_number', label: 'CBSE Roll Number', value: '12648921', isEncrypted: false },
      { key: 'passing_year', label: 'Year of Passing', value: '2021', isEncrypted: false },
      { key: 'stream', label: 'Academic Stream', value: 'Science (PCM + CS)', isEncrypted: false },
      { key: 'total_marks', label: 'Total Score', value: '482 / 500', isEncrypted: false },
      { key: 'percentage', label: 'Percentage', value: '96.4%', isEncrypted: false },
    ]
  },
  {
    id: 'doc_class10_04',
    type: 'marksheet',
    title: 'Class X Secondary School Certificate',
    issuer: 'Central Board of Secondary Education (CBSE)',
    verifiedDate: '2026-08-21T11:46:00Z',
    status: 'verified',
    source: 'DigiLocker Verified',
    iconName: 'Award',
    fields: [
      { key: 'board_name', label: 'Board Name', value: 'CBSE New Delhi', isEncrypted: false },
      { key: 'roll_number', label: 'Roll Number', value: '10948921', isEncrypted: false },
      { key: 'passing_year', label: 'Passing Year', value: '2019', isEncrypted: false },
      { key: 'cgpa', label: 'CGPA / Percentage', value: '9.8 / 10 (93.1%)', isEncrypted: false },
    ]
  },
  {
    id: 'doc_dl_05',
    type: 'dl',
    title: 'Driving License',
    issuer: 'Ministry of Road Transport and Highways (MoRTH)',
    verifiedDate: '2026-08-15T16:20:00Z',
    status: 'verified',
    source: 'DigiLocker Verified',
    iconName: 'Car',
    fields: [
      { key: 'dl_number', label: 'DL Number', value: 'MH-02-2022-0048921', isEncrypted: true },
      { key: 'vehicle_type', label: 'Category', value: 'MCWG / LMV', isEncrypted: false },
      { key: 'valid_upto', label: 'Valid Upto', value: '13 August 2043', isEncrypted: false },
    ]
  }
];

export const INITIAL_AUXILIARY_FIELDS = [
  {
    id: 'aux_01',
    label: "Father's Annual Family Income",
    value: '₹ 8,50,000 / annum',
    category: 'Financial & Income',
    encryptedTag: 'AES-256-GCM · Hardware Enclave',
    addedDate: '2026-08-22T08:00:00Z',
    autoFillEligible: true,
  },
  {
    id: 'aux_02',
    label: 'Category Certificate No. (OBC-NCL)',
    value: 'OBC-MH-2024-994821',
    category: 'Reservation / Category',
    encryptedTag: 'AES-256-GCM · Hardware Enclave',
    addedDate: '2026-08-22T08:15:00Z',
    autoFillEligible: true,
  },
  {
    id: 'aux_03',
    label: 'Scholarship Bank Account & IFSC',
    value: 'HDFC Bank · A/C ****8921 · IFSC: HDFC0000128',
    category: 'Bank Details',
    encryptedTag: 'AES-256-GCM · Hardware Enclave',
    addedDate: '2026-08-22T08:30:00Z',
    autoFillEligible: true,
  },
  {
    id: 'aux_04',
    label: 'Blood Group & Emergency Contact',
    value: 'O+ Positive · Contact: +91 98201 44021',
    category: 'Personal Health',
    encryptedTag: 'AES-256-GCM · Hardware Enclave',
    addedDate: '2026-08-22T08:45:00Z',
    autoFillEligible: true,
  }
];

export const INITIAL_CONNECTED_PORTALS = [
  {
    id: 'portal_01',
    name: 'IIT Bombay UG Admissions Portal',
    domain: 'admissions.iitb.ac.in',
    hashID: 'armour_hash_8f9a2b41e9821a',
    connectedDate: '2026-08-22T10:14:00Z',
    scope: 'Academic Identity & Scorecard',
    grantedFields: ['Full Legal Name', 'Date of Birth', 'CBSE Class XII Roll & Score', 'Aadhaar Number'],
    status: 'active',
    lastAutoFill: '2026-08-22T10:14:32Z',
    autoFillCount: 3,
  },
  {
    id: 'portal_02',
    name: 'National Scholarship Portal (NSP)',
    domain: 'scholarships.gov.in',
    hashID: 'armour_hash_3c17f901a4411b',
    connectedDate: '2026-08-21T16:40:00Z',
    scope: 'Income & Educational Verification',
    grantedFields: ['Full Legal Name', 'Aadhaar Number', 'Father Annual Income', 'Category Cert', 'Bank Account & IFSC'],
    status: 'active',
    lastAutoFill: '2026-08-21T16:42:10Z',
    autoFillCount: 2,
  },
  {
    id: 'portal_03',
    name: 'UPSC Portal - Civil Services Exam',
    domain: 'upsconline.nic.in',
    hashID: 'armour_hash_9b821ef455018c',
    connectedDate: '2026-08-18T12:00:00Z',
    scope: 'Identity & Educational Verification',
    grantedFields: ['Full Legal Name', 'Date of Birth', 'Class X & XII Marksheets', 'Permanent Address'],
    status: 'active',
    lastAutoFill: '2026-08-18T12:05:14Z',
    autoFillCount: 1,
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log_01',
    timestamp: '2026-08-22T18:20:00Z',
    type: 'security',
    title: 'Biometric Face ID Vault Unlock',
    device: 'iPhone 15 Pro (iOS 17.5)',
    location: 'Mumbai, MH, India (103.21.12.44)',
    status: 'success',
    details: 'Hardware Secure Enclave key authentication passed',
  },
  {
    id: 'log_02',
    timestamp: '2026-08-22T10:14:32Z',
    type: 'autofill',
    title: 'Scoped Form Auto-fill Executed',
    device: 'iPhone 15 Pro (iOS 17.5)',
    location: 'Mumbai, MH, India',
    status: 'success',
    details: 'Filled 14 fields on admissions.iitb.ac.in in 312ms via Scoped HashID armour_hash_8f9a...',
  },
  {
    id: 'log_03',
    timestamp: '2026-08-21T11:45:00Z',
    type: 'sync',
    title: 'DigiLocker Document Sync Completed',
    device: 'ArmourID Cloud Fiduciary',
    location: 'New Delhi Fiduciary Vault',
    status: 'success',
    details: 'Synchronized CBSE Class XII Marksheet & PAN card verified hash',
  },
  {
    id: 'log_04',
    timestamp: '2026-08-20T14:32:00Z',
    type: 'auth',
    title: 'MFA Authentication Verified',
    device: 'iPhone 15 Pro (iOS 17.5)',
    location: 'Mumbai, MH, India',
    status: 'success',
    details: 'TOTP Authenticator code verified',
  },
  {
    id: 'log_05',
    timestamp: '2026-08-19T22:15:00Z',
    type: 'security',
    title: 'AES-256 Key Rotation Completed',
    device: 'Hardware Security Module (HSM)',
    location: 'Zero-Knowledge Key Ring',
    status: 'success',
    details: 'Master key version #4 generated in Secure Enclave',
  }
];

export const MOCK_SUPPORTED_FORMS = [
  {
    id: 'form_iitb',
    name: 'IIT Bombay Undergraduate Admission 2026',
    domain: 'admissions.iitb.ac.in',
    portalName: 'IIT Bombay Admissions',
    fieldsCount: 14,
    fields: [
      { name: 'Full Legal Name', type: 'text', value: 'Siddharth R. Sharma', category: 'Aadhaar' },
      { name: 'Date of Birth', type: 'date', value: '14/08/2003', category: 'Aadhaar' },
      { name: 'Aadhaar Number', type: 'text', value: 'XXXX-XXXX-8921', category: 'Aadhaar' },
      { name: 'Father\'s Name', type: 'text', value: 'Rajesh K. Sharma', category: 'PAN' },
      { name: 'PAN Card Number', type: 'text', value: 'ABCPS8921K', category: 'PAN' },
      { name: 'Class XII Board Name', type: 'text', value: 'CBSE New Delhi', category: 'Class XII' },
      { name: 'Class XII Roll Number', type: 'text', value: '12648921', category: 'Class XII' },
      { name: 'Class XII Passing Year', type: 'text', value: '2021', category: 'Class XII' },
      { name: 'Class XII Percentage', type: 'text', value: '96.4%', category: 'Class XII' },
      { name: 'Class X Roll Number', type: 'text', value: '10948921', category: 'Class X' },
      { name: 'Category Certificate No.', type: 'text', value: 'OBC-MH-2024-994821', category: 'Auxiliary Encrypted' },
      { name: 'Family Annual Income', type: 'text', value: '₹ 8,50,000', category: 'Auxiliary Encrypted' },
      { name: 'Permanent Address', type: 'text', value: 'Bandra West, Mumbai, MH - 400050', category: 'Aadhaar' },
      { name: 'Scholarship Bank Account', type: 'text', value: 'HDFC Bank · ****8921', category: 'Auxiliary Encrypted' },
    ]
  },
  {
    id: 'form_nsp',
    name: 'National Merit Scholarship Application 2026',
    domain: 'scholarships.gov.in',
    portalName: 'National Scholarship Portal',
    fieldsCount: 10,
    fields: [
      { name: 'Full Legal Name', type: 'text', value: 'Siddharth R. Sharma', category: 'Aadhaar' },
      { name: 'Aadhaar Number', type: 'text', value: 'XXXX-XXXX-8921', category: 'Aadhaar' },
      { name: 'Class XII Percentage', type: 'text', value: '96.4%', category: 'Class XII' },
      { name: 'Category Certificate No.', type: 'text', value: 'OBC-MH-2024-994821', category: 'Auxiliary Encrypted' },
      { name: 'Family Annual Income', type: 'text', value: '₹ 8,50,000', category: 'Auxiliary Encrypted' },
      { name: 'Bank Account Number', type: 'text', value: 'HDFC Bank · A/C ****8921', category: 'Auxiliary Encrypted' },
      { name: 'Bank IFSC Code', type: 'text', value: 'HDFC0000128', category: 'Auxiliary Encrypted' },
      { name: 'Date of Birth', type: 'date', value: '14/08/2003', category: 'Aadhaar' },
      { name: 'Gender', type: 'text', value: 'Male', category: 'Aadhaar' },
      { name: 'Permanent Address', type: 'text', value: 'Mumbai, MH - 400050', category: 'Aadhaar' },
    ]
  }
];
