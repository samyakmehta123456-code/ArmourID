import React from 'react';
import { ShieldCheck, Lock, Hash } from 'lucide-react';

/**
 * ArmourID Status & Metric Badge Component
 */
export default function Badge({
  label,
  variant = 'verified',
  size = 'medium',
  theme = 'light',
  colors,
  style = {},
}) {
  const isSmall = size === 'small';

  const badgeStyles = {
    verified: {
      backgroundColor: '#E8F8EC',
      color: '#248A3D',
      border: '1px solid #A3EBB1',
      icon: ShieldCheck,
    },
    aes: {
      backgroundColor: '#F0F9FF',
      color: '#0284C7',
      border: '1px solid #BAE6FD',
      icon: Lock,
    },
    // Scoped HashID Badge: Deep Cyan/Blue (#0284C7)
    scoped: {
      backgroundColor: '#F0F9FF',
      color: '#0284C7',
      border: '1px solid #BAE6FD',
      icon: Hash,
    },
    manual: {
      backgroundColor: colors.surfaceSecondary,
      color: colors.textSecondary,
      border: `1px solid ${colors.border}`,
      icon: null,
    },
    error: {
      backgroundColor: colors.status.errorBg,
      color: colors.status.error,
      border: `1px solid ${colors.status.errorBorder}`,
      icon: null,
    },
  };

  const currentVariant = badgeStyles[variant] || badgeStyles.manual;
  const IconComponent = currentVariant.icon;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: currentVariant.backgroundColor,
        color: currentVariant.color,
        border: currentVariant.border,
        borderRadius: isSmall ? 6 : 8,
        padding: isSmall ? '2px 6px' : '4px 9px',
        fontSize: isSmall ? 10 : 12,
        fontWeight: '700',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif',
        letterSpacing: '0.01em',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {IconComponent && (
        <IconComponent size={isSmall ? 10 : 12} style={{ marginRight: 4 }} />
      )}
      {label}
    </span>
  );
}
