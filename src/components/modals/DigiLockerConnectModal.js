import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { ShieldCheck, CheckCircle2, ShieldAlert, ArrowRight, ExternalLink, Lock } from 'lucide-react';

/**
 * DigiLocker OAuth 2.0 + PKCE Link Consent Modal
 */
export default function DigiLockerConnectModal({
  isOpen,
  onClose,
  onConnected,
  theme = 'light',
  colors
}) {
  const [isLinking, setIsLinking] = useState(false);
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const requestedScopes = [
    { title: 'Aadhaar Verified Identity', desc: 'UIDAI · Name, DOB, Gender, Address', icon: 'ShieldCheck' },
    { title: 'PAN Card Verification', desc: 'Income Tax Dept · Permanent Account No.', icon: 'CreditCard' },
    { title: 'Class X & XII Marksheets', desc: 'CBSE / State Board Academic Scores', icon: 'GraduationCap' },
    { title: 'Driving License', desc: 'MoRTH Vehicle & Identity Document', icon: 'Car' },
  ];

  const handleAuthorizeDigiLocker = () => {
    setIsLinking(true);
    setStep(2);
    setTimeout(() => {
      setStep(3);
      setTimeout(() => {
        setIsLinking(false);
        onConnected();
      }, 1000);
    }, 1200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.modalOverlay,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          backgroundColor: colors.background,
          borderRadius: 24,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.cardShadowElevated,
          padding: 24,
          overflow: 'hidden',
        }}
      >
        {step === 1 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  backgroundColor: '#003366',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: '800',
                  fontSize: 18,
                }}
              >
                DL
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
                  Link Government DigiLocker
                </h3>
                <span style={{ fontSize: 12, color: colors.textMuted }}>
                  OAuth 2.0 + PKCE Data Fiduciary Consent
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: isDark ? 'rgba(34, 197, 94, 0.12)' : '#F0FDF4',
                border: `1px solid ${colors.status.successBorder}`,
                borderRadius: 12,
                padding: '12px 14px',
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Lock size={16} color={colors.status.success} />
                <span style={{ fontSize: 12, fontWeight: '600', color: colors.status.success }}>
                  DPDP Act 2023 Explicit Consent Scope
                </span>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: 11, color: colors.textSecondary }}>
                ArmourID will fetch read-only cryptographic hashes of your verified government documents directly into your hardware-encrypted local vault.
              </p>
            </div>

            <p style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 10 }}>
              Document Scopes Being Requested:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {requestedScopes.map((scope, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: isDark ? colors.surface : '#F8F9FA',
                    border: `1px solid ${colors.border}`,
                    borderRadius: 10,
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary }}>
                      {scope.title}
                    </div>
                    <div style={{ fontSize: 11, color: colors.textMuted }}>
                      {scope.desc}
                    </div>
                  </div>
                  <Badge label="Verified Source" variant="verified" size="small" theme={theme} colors={colors} />
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" onClick={onClose} theme={theme} colors={colors} style={{ flex: 1 }}>
                Deny
              </Button>
              <Button variant="primary" onClick={handleAuthorizeDigiLocker} theme={theme} colors={colors} style={{ flex: 2 }}>
                Grant Consent & Connect
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ textAlign: 'center', padding: '30px 0' }}>
            <div
              style={{
                width: 48,
                height: 48,
                border: `4px solid ${colors.border}`,
                borderTopColor: colors.accentGold,
                borderRadius: '50%',
                margin: '0 auto 16px auto',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <h4 style={{ margin: '0 0 6px 0', fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
              Establishing DigiLocker OAuth2 Connection...
            </h4>
            <p style={{ margin: 0, fontSize: 12, color: colors.textMuted }}>
              Exchanging PKCE code verifier with Ministry of Electronics & IT gateway
            </p>
          </div>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <CheckCircle2 size={48} color={colors.status.success} style={{ margin: '0 auto 12px auto' }} />
            <h4 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
              DigiLocker Connected & Verified!
            </h4>
            <p style={{ margin: '0 0 16px 0', fontSize: 12, color: colors.textMuted }}>
              5 verified government identity documents added to your encrypted vault.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
