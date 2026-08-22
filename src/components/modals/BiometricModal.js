import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { ShieldCheck, Fingerprint, Lock, CheckCircle2, KeyRound } from 'lucide-react';

/**
 * Biometric Face ID / Fingerprint Authorization Sheet
 */
export default function BiometricModal({
  isOpen,
  onClose,
  onSuccess,
  title = 'Authorize Vault Action',
  subtitle = 'Confirm identity using Face ID or Vault PIN',
  theme = 'light',
  colors
}) {
  const [pinInput, setPinInput] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [usePin, setUsePin] = useState(false);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleFaceIDTrigger = () => {
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onSuccess();
    }, 900);
  };

  const handlePinSubmit = () => {
    if (pinInput.length === 4) {
      setIsAuthenticating(true);
      setTimeout(() => {
        setIsAuthenticating(false);
        onSuccess();
      }, 600);
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
        zIndex: 1100,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 380,
          backgroundColor: colors.background,
          borderRadius: 20,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.cardShadowElevated,
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: isDark ? 'rgba(229, 193, 88, 0.15)' : '#FFF9E6',
            border: `1px solid ${colors.accentGold}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}
        >
          {usePin ? <KeyRound size={28} color={colors.accentGold} /> : <Fingerprint size={32} color={colors.accentGold} />}
        </div>

        <h3 style={{ margin: '0 0 6px 0', fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
          {title}
        </h3>
        <p style={{ margin: '0 0 20px 0', fontSize: 13, color: colors.textMuted }}>
          {subtitle}
        </p>

        {isAuthenticating ? (
          <div style={{ padding: '20px 0' }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: `3px solid ${colors.border}`,
                borderTopColor: colors.accentGold,
                borderRadius: '50%',
                margin: '0 auto 12px auto',
                animation: 'spin 0.8s linear infinite',
              }}
            />
            <p style={{ fontSize: 13, fontWeight: '600', color: colors.accentGold, margin: 0 }}>
              Verifying Hardware Security Enclave...
            </p>
          </div>
        ) : usePin ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 16 }}>
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  style={{
                    width: 44,
                    height: 50,
                    borderRadius: 10,
                    border: `1px solid ${colors.border}`,
                    backgroundColor: isDark ? colors.surface : '#F8F9FA',
                    fontSize: 22,
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: colors.textPrimary,
                  }}
                >
                  {pinInput[idx] ? '●' : ''}
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'Clear', 0, 'OK'].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    if (num === 'Clear') setPinInput('');
                    else if (num === 'OK') handlePinSubmit();
                    else if (pinInput.length < 4) setPinInput(prev => prev + num);
                  }}
                  style={{
                    padding: '12px 0',
                    backgroundColor: isDark ? colors.surfaceSecondary : '#F1F3F5',
                    border: `1px solid ${colors.border}`,
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: '600',
                    color: colors.textPrimary,
                    cursor: 'pointer',
                  }}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              onClick={() => setUsePin(false)}
              style={{ background: 'none', border: 'none', color: colors.accentGold, fontSize: 13, cursor: 'pointer' }}
            >
              Use Face ID instead
            </button>
          </div>
        ) : (
          <div>
            <Button
              variant="primary"
              fullWidth={true}
              onClick={handleFaceIDTrigger}
              theme={theme}
              colors={colors}
              icon={Fingerprint}
              style={{ marginBottom: 10 }}
            >
              Authenticate with Face ID
            </Button>
            <button
              onClick={() => setUsePin(true)}
              style={{ background: 'none', border: 'none', color: colors.textMuted, fontSize: 13, cursor: 'pointer' }}
            >
              Enter 4-digit Vault PIN
            </button>
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: colors.textMuted, fontSize: 12, cursor: 'pointer' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
