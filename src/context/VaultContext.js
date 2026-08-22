import React, { createContext, useContext, useState } from 'react';
import {
  INITIAL_DIGILOCKER_DOCS,
  INITIAL_AUXILIARY_FIELDS,
  INITIAL_CONNECTED_PORTALS,
  INITIAL_AUDIT_LOGS,
  MOCK_SUPPORTED_FORMS
} from '../utils/mockData';
import { generateScopedHashID, generateConsentSignature } from '../utils/crypto';
import { executeAutoFillSimulation } from '../utils/autoFillEngine';

const VaultContext = createContext();

export function VaultProvider({ children }) {
  const [documents, setDocuments] = useState(INITIAL_DIGILOCKER_DOCS);
  const [auxiliaryFields, setAuxiliaryFields] = useState(INITIAL_AUXILIARY_FIELDS);
  const [connectedPortals, setConnectedPortals] = useState(INITIAL_CONNECTED_PORTALS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  const [consentLedger, setConsentLedger] = useState([
    {
      id: 'grant_01',
      portalDomain: 'admissions.iitb.ac.in',
      portalName: 'IIT Bombay UG Admissions',
      timestamp: '2026-08-22T10:14:00Z',
      action: 'GRANT',
      signature: generateConsentSignature('admissions.iitb.ac.in'),
      scope: 'Academic Identity & Scorecard',
    },
    {
      id: 'grant_02',
      portalDomain: 'scholarships.gov.in',
      portalName: 'National Scholarship Portal',
      timestamp: '2026-08-21T16:40:00Z',
      action: 'GRANT',
      signature: generateConsentSignature('scholarships.gov.in'),
      scope: 'Income & Educational Verification',
    }
  ]);

  const [language, setLanguage] = useState('English');
  const [lastAutoFillResult, setLastAutoFillResult] = useState(null);

  // Add auxiliary field
  const addAuxiliaryField = (field) => {
    setAuxiliaryFields(prev => [field, ...prev]);
    addAuditLog({
      type: 'security',
      title: 'Auxiliary AES-256 Field Added',
      details: `Encrypted attribute "${field.label}" saved to hardware enclave.`,
    });
  };

  // Revoke portal access & erase scope
  const revokePortalAccess = (portalId) => {
    const portal = connectedPortals.find(p => p.id === portalId);
    if (!portal) return;

    setConnectedPortals(prev => prev.filter(p => p.id !== portalId));
    
    setConsentLedger(prev => [
      {
        id: `revoke_${Date.now()}`,
        portalDomain: portal.domain,
        portalName: portal.name,
        timestamp: new Date().toISOString(),
        action: 'REVOKE',
        signature: `DPDP-REVOKE-${portal.domain.toUpperCase()}-${Date.now()}`,
        scope: portal.scope,
      },
      ...prev
    ]);

    addAuditLog({
      type: 'security',
      title: 'Portal Access & Scoped HashID Revoked',
      details: `Revoked access and destroyed Scoped HashID for ${portal.name} (${portal.domain}).`,
    });
  };

  // Add Audit Log Entry
  const addAuditLog = ({ type, title, details, status = 'success' }) => {
    const newLog = {
      id: `log_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: type || 'security',
      title,
      device: 'iPhone 15 Pro (iOS 17.5)',
      location: 'Mumbai, MH, India',
      status,
      details,
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Execute Form Auto-fill Engine
  const triggerAutoFill = async (formTarget, selectedFields, userMasterSeed) => {
    // Obtain or generate Scoped HashID for recipient domain
    let existingPortal = connectedPortals.find(p => p.domain === formTarget.domain);
    let hashID = existingPortal ? existingPortal.hashID : generateScopedHashID(userMasterSeed, formTarget.domain);

    if (!existingPortal) {
      const newPortal = {
        id: `portal_${Date.now()}`,
        name: formTarget.portalName || formTarget.name,
        domain: formTarget.domain,
        hashID,
        connectedDate: new Date().toISOString(),
        scope: 'Scoped Auto-fill Authorization',
        grantedFields: selectedFields.map(f => f.name),
        status: 'active',
        lastAutoFill: new Date().toISOString(),
        autoFillCount: 1,
      };
      setConnectedPortals(prev => [newPortal, ...prev]);

      setConsentLedger(prev => [
        {
          id: `grant_${Date.now()}`,
          portalDomain: formTarget.domain,
          portalName: formTarget.portalName || formTarget.name,
          timestamp: new Date().toISOString(),
          action: 'GRANT',
          signature: generateConsentSignature(formTarget.domain),
          scope: 'Scoped Auto-fill Authorization',
        },
        ...prev
      ]);
    } else {
      setConnectedPortals(prev => prev.map(p => p.id === existingPortal.id ? {
        ...p,
        lastAutoFill: new Date().toISOString(),
        autoFillCount: p.autoFillCount + 1,
      } : p));
    }

    const result = await executeAutoFillSimulation(formTarget, selectedFields, hashID);
    setLastAutoFillResult(result);

    addAuditLog({
      type: 'autofill',
      title: 'Scoped Form Auto-fill Executed',
      details: `Filled ${result.fieldsFilledCount} fields on ${formTarget.domain} in ${result.executionTimeMs}ms via Scoped HashID ${hashID.substring(0, 14)}...`,
    });

    return result;
  };

  // DPDP Right to Erasure Key Purge
  const purgeAllData = () => {
    setDocuments([]);
    setAuxiliaryFields([]);
    setConnectedPortals([]);
    setConsentLedger([]);
    setLastAutoFillResult(null);
    addAuditLog({
      type: 'security',
      title: 'DPDP Right-to-Erase Key Destruction Executed',
      details: 'All hardware encryption keys zeroed out. Vault reset.',
      status: 'error',
    });
  };

  return (
    <VaultContext.Provider
      value={{
        documents,
        auxiliaryFields,
        connectedPortals,
        auditLogs,
        consentLedger,
        language,
        setLanguage,
        lastAutoFillResult,
        addAuxiliaryField,
        revokePortalAccess,
        triggerAutoFill,
        purgeAllData,
        addAuditLog,
        supportedForms: MOCK_SUPPORTED_FORMS,
      }}
    >
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  return useContext(VaultContext);
}
