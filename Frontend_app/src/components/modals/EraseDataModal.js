import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { ShieldAlert, Trash2, AlertTriangle, Lock, KeyRound } from 'lucide-react';

/**
 * DPDP Act 2023 Right-to-Erase Data Key Destruction Modal
 * Requires deliberate 2-step confirmation and key purge action.
 */
export default function EraseDataModal({
  isOpen,
  onClose,
  onConfirmErase,
  theme = 'light',
  colors
}) {
  const [confirmStep, setConfirmStep] = useState(1);
  const [confirmText, setConfirmText] = useState('');

  if (!isOpen) return null;

  const isDark = theme === 'dark';
  const isTextMatch = confirmText.trim().toUpperCase() === 'ERASE EVERYTHING';

  const handleFinalErase = () => {
    if (isTextMatch) {
      onConfirmErase();
    }
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
        zIndex: 1200,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          backgroundColor: colors.background,
          borderRadius: 24,
          border: `2px solid ${colors.status.error}`,
          boxShadow: colors.cardShadowElevated,
          padding: 24,
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            backgroundColor: isDark ? 'rgba(239, 68, 68, 0.2)' : '#FEF2F2',
            border: `1px solid ${colors.status.errorBorder}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}
        >
          <ShieldAlert size={32} color={colors.status.error} />
        </div>

        <h3 style={{ margin: '0 0 6px 0', fontSize: 20, fontWeight: '700', color: colors.status.error, textAlign: 'center' }}>
          DPDP Right to be Forgotten: Erase Data
        </h3>
        <p style={{ margin: '0 0 16px 0', fontSize: 13, color: colors.textMuted, textAlign: 'center' }}>
          Under DPDP Act 2023 Section 12, this action permanently purges your AES-256 hardware encryption keys.
        </p>

        {confirmStep === 1 ? (
          <div>
            <div
              style={{
                backgroundColor: isDark ? 'rgba(239, 68, 68, 0.12)' : '#FEF2F2',
                border: `1px solid ${colors.status.errorBorder}`,
                borderRadius: 12,
                padding: 14,
                marginBottom: 20,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: colors.status.error, fontWeight: '700', fontSize: 13 }}>
                <AlertTriangle size={16} /> UNRECOVERABLE HARDWARE PURGE
              </div>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: 20, fontSize: 12, color: colors.textPrimary }}>
                <li>All linked DigiLocker document hashes will be unlinked.</li>
                <li>All auxiliary AES-256 encrypted fields will be destroyed.</li>
                <li>All Scoped HashIDs will be invalidated across connected portals.</li>
                <li>Encryption master keys in Secure Enclave will be zeroed out.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" onClick={onClose} theme={theme} colors={colors} style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setConfirmStep(2)} theme={theme} colors={colors} style={{ flex: 1 }}>
                Proceed to Purge Step 2
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 13, fontWeight: '600', color: colors.textPrimary, marginBottom: 8 }}>
              Type <strong style={{ color: colors.status.error }}>"ERASE EVERYTHING"</strong> to confirm:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="ERASE EVERYTHING"
              style={{
                width: '100%',
                backgroundColor: isDark ? colors.surfaceElevated : '#F8F9FA',
                color: colors.textPrimary,
                border: `1px solid ${isTextMatch ? colors.status.error : colors.border}`,
                borderRadius: 12,
                padding: '12px 14px',
                fontSize: 14,
                fontWeight: '700',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: 16,
              }}
            />

            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" onClick={onClose} theme={theme} colors={colors} style={{ flex: 1 }}>
                Cancel
              </Button>
              <Button
                variant="danger"
                disabled={!isTextMatch}
                onClick={handleFinalErase}
                theme={theme}
                colors={colors}
                icon={Trash2}
                style={{ flex: 1.5 }}
              >
                Destroy Encryption Keys Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
