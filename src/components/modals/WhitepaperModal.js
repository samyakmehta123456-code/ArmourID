import React from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import CrestLogo from '../common/CrestLogo';
import { ShieldCheck, Lock, KeyRound, Cpu, FileText, X } from 'lucide-react';

export default function WhitepaperModal({
  isOpen,
  onClose,
  theme = 'light',
  colors
}) {
  if (!isOpen) return null;

  const isDark = theme === 'dark';

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
        zIndex: 1200,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 580,
          backgroundColor: colors.background,
          borderRadius: 24,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.cardShadowElevated,
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CrestLogo size={32} theme={theme} />
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
                ArmourID Zero-Knowledge Architecture
              </h3>
              <span style={{ fontSize: 12, color: colors.textMuted }}>DPDP Act 2023 Technical Compliance Brief</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: 24, overflowY: 'auto', flex: 1, fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>
          <h4 style={{ color: colors.textPrimary, margin: '0 0 8px 0', fontSize: 15 }}>1. Zero Plaintext PII Storage</h4>
          <p>
            ArmourID is designed as a strict Data Fiduciary under India's Digital Personal Data Protection (DPDP) Act 2023. Raw personal identifiers (Aadhaar number, PAN, full address) are NEVER stored in plaintext on any cloud server. All sensitive attributes are encrypted on-device using <strong>AES-256-GCM</strong> with hardware-backed encryption keys generated inside the device's Secure Enclave.
          </p>

          <h4 style={{ color: colors.textPrimary, margin: '16px 0 8px 0', fontSize: 15 }}>2. Scoped Non-Linkable HashIDs</h4>
          <p>
            When auto-filling forms for relying portals (universities, recruitment boards, government scholarship portals), ArmourID generates a unique <strong>Scoped HashID</strong> (HMAC-SHA256 derived) isolated specifically to that recipient domain. Two portals receiving auto-fill data can never compare or correlate their HashIDs to trace the same user across the web.
          </p>

          <h4 style={{ color: colors.textPrimary, margin: '16px 0 8px 0', fontSize: 15 }}>3. DigiLocker OAuth 2.0 + PKCE Integration</h4>
          <p>
            Verified identity documents originate directly from India's official DigiLocker repository via OAuth 2.0 with Proof Key for Code Exchange (PKCE). Verification signatures are checked client-side to ensure document authenticity without retaining central logs.
          </p>

          <h4 style={{ color: colors.textPrimary, margin: '16px 0 8px 0', fontSize: 15 }}>4. DPDP Rights Fulfillment Engine</h4>
          <p>
            Users maintain sovereign control over their identity ledger. One-tap actions satisfy all mandated rights: <em>Right to Access</em> (vault export), <em>Right to Correction</em> (DigiLocker re-sync), <em>Right to Withdraw Consent</em> (scope revocation), and <em>Right to Erasure</em> (permanent hardware key destruction).
          </p>
        </div>

        <div style={{ padding: '16px 24px', borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="primary" onClick={onClose} theme={theme} colors={colors}>
            Close Technical Brief
          </Button>
        </div>
      </div>
    </div>
  );
}
