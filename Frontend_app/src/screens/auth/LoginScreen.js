import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import CrestLogo from '../../components/common/CrestLogo';
import { useAuth } from '../../context/AuthContext';
import { Fingerprint, Lock, Mail } from 'lucide-react';

export default function LoginScreen({ theme = 'light', colors }) {
  const { login, loginWithBiometrics } = useAuth();
  const [email, setEmail] = useState('siddharth.sharma@example.in');
  const [pin, setPin] = useState('••••••');
  const [loading, setLoading] = useState(false);

  const handleSignIn = (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, pin);
      setLoading(false);
    }, 300);
  };

  const handleBiometricAuth = () => {
    setLoading(true);
    setTimeout(() => {
      loginWithBiometrics();
      setLoading(false);
    }, 300);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '24px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Brand Crest Header */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ display: 'inline-block', marginBottom: 12 }}>
            <CrestLogo size={56} theme={theme} />
          </div>
          <h1
            style={{
              margin: '0 0 6px 0',
              fontSize: 22,
              fontWeight: '600',
              color: colors.textPrimary,
              letterSpacing: '-0.02em',
            }}
          >
            ArmourID
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 13,
              fontWeight: '400',
              color: colors.textSecondary,
            }}
          >
            Zero-Knowledge Identity Vault
          </p>
        </div>

        {/* Minimal Login Card */}
        <Card
          theme={theme}
          colors={colors}
          hasWatermark={false}
          elevated={true}
          style={{
            padding: '28px 22px',
            borderRadius: 20,
            border: `1px solid ${colors.border}`,
            backgroundColor: '#FFFFFF',
            boxShadow: '0 10px 30px -4px rgba(15, 23, 42, 0.08)',
          }}
        >
          <form onSubmit={handleSignIn}>
            {/* Email Field */}
            <div style={{ marginBottom: 16 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}
              >
                Email
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail
                  size={16}
                  color={colors.textMuted}
                  style={{ position: 'absolute', left: 14, pointerEvents: 'none' }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    color: colors.textPrimary,
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    padding: '12px 14px 12px 40px',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  }}
                />
              </div>
            </div>

            {/* PIN / Password Field */}
            <div style={{ marginBottom: 22 }}>
              <label
                style={{
                  display: 'block',
                  fontSize: 12,
                  fontWeight: '500',
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}
              >
                Master PIN
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock
                  size={16}
                  color={colors.textMuted}
                  style={{ position: 'absolute', left: 14, pointerEvents: 'none' }}
                />
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter PIN"
                  required
                  style={{
                    width: '100%',
                    backgroundColor: '#F9FAFB',
                    color: colors.textPrimary,
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    padding: '12px 14px 12px 40px',
                    fontSize: 14,
                    outline: 'none',
                    boxSizing: 'border-box',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
                  }}
                />
              </div>
            </div>

            {/* Primary Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              theme={theme}
              colors={colors}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: 15,
                fontWeight: '600',
                borderRadius: 12,
                marginBottom: 12,
              }}
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </Button>

            {/* Biometric Unlock Option */}
            <button
              type="button"
              onClick={handleBiometricAuth}
              disabled={loading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                backgroundColor: '#F0FDF4',
                color: '#15803D',
                border: '1px solid #BBF7D0',
                borderRadius: 12,
                padding: '11px 16px',
                fontSize: 13,
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
              }}
            >
              <Fingerprint size={16} color="#15803D" />
              Biometric Unlock
            </button>
          </form>
        </Card>

        {/* Minimal Footer */}
        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <span
            style={{
              fontSize: 11,
              color: colors.textMuted,
              fontWeight: '500',
              letterSpacing: '0.02em',
            }}
          >
            DPDP 2023 Compliant Fiduciary
          </span>
        </div>
      </div>
    </div>
  );
}
