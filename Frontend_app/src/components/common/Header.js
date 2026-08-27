import React from 'react';
import CrestLogo from './CrestLogo';
import { Lock } from 'lucide-react';

/**
 * ArmourID Floating iOS Header Component
 */
export default function Header({
  title = 'ArmourID',
  theme = 'light',
  colors,
  showSecurityBadge = true
}) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 12,
        zIndex: 100,
        maxWidth: 680,
        width: 'calc(100% - 32px)',
        margin: '12px auto 0 auto',
        backgroundColor: '#FFFFFF',
        border: `1px solid ${colors.border}`,
        borderRadius: 20,
        boxShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.12), 0 4px 10px -2px rgba(15, 23, 42, 0.05), inset 0 1px 0 rgba(255, 255, 255, 1)',
        padding: '12px 18px',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left Brand Mark with Color Filled Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <CrestLogo size={34} theme={theme} style={{ marginRight: 10 }} />
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h1
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: '800',
                color: colors.textPrimary,
                letterSpacing: '-0.02em',
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
              }}
            >
              {title}
            </h1>
            {showSecurityBadge && (
              <span
                style={{
                  marginLeft: 10,
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#E8F8EC',
                  color: '#248A3D',
                  border: '1px solid #A3EBB1',
                  borderRadius: 6,
                  padding: '2px 7px',
                  fontSize: 10,
                  fontWeight: '700',
                  letterSpacing: '0.03em',
                }}
              >
                <Lock size={10} style={{ marginRight: 3 }} /> SECURE VAULT
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
