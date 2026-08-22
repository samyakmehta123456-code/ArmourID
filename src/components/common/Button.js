import React from 'react';

/**
 * ArmourID Primary/Secondary/Outline Button
 * Danger Variant: Solid Red (#DC2626) fill with white text
 */
export default function Button({
  children,
  onClick,
  variant = 'primary', // primary (Vibrant Apple TV Yellow #FFCC00), secondary, outline, ghost, danger (Solid Red #DC2626), emerald (FaceTime Green)
  size = 'medium', // small, medium, large
  fullWidth = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  theme = 'light',
  colors,
  style = {},
  ...props
}) {
  const isDark = theme === 'dark';

  // Base Apple Button Layout
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 14,
    fontWeight: '700',
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.15s ease',
    border: 'none',
    outline: 'none',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled ? 0.5 : 1,
    letterSpacing: '-0.01em',
    userSelect: 'none',
  };

  // Size Variants
  const sizeStyles = {
    small: {
      padding: '7px 12px',
      fontSize: 12,
      borderRadius: 10,
    },
    medium: {
      padding: '10px 18px',
      fontSize: 14,
      borderRadius: 12,
    },
    large: {
      padding: '14px 24px',
      fontSize: 16,
      borderRadius: 14,
    },
  };

  // Color Variants
  const variantStyles = {
    primary: {
      backgroundColor: '#FFCC00',
      color: '#000000',
      boxShadow: '0 4px 14px rgba(255, 204, 0, 0.45)',
      border: '1px solid #FFE066',
    },
    emerald: {
      backgroundColor: '#34C759',
      color: '#FFFFFF',
      boxShadow: '0 4px 14px rgba(52, 199, 89, 0.35)',
      border: '1px solid #A3EBB1',
    },
    secondary: {
      backgroundColor: colors.surfaceSecondary,
      color: colors.textPrimary,
      border: `1px solid ${colors.border}`,
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.textPrimary,
      border: `1px solid ${colors.borderStrong}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#D97706',
      border: 'none',
      boxShadow: 'none',
    },
    // Danger: Solid Red (#DC2626) background fill with crisp white text (#FFFFFF)
    danger: {
      backgroundColor: '#DC2626',
      color: '#FFFFFF',
      border: '1px solid #EF4444',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
    },
  };

  const combinedStyle = {
    ...baseStyle,
    ...sizeStyles[size],
    ...variantStyles[variant],
    ...style,
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={combinedStyle}
      disabled={disabled}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon size={size === 'small' ? 14 : size === 'large' ? 20 : 16} style={{ marginRight: 6 }} />
      )}
      {children}
      {Icon && iconPosition === 'right' && (
        <Icon size={size === 'small' ? 14 : size === 'large' ? 20 : 16} style={{ marginLeft: 6 }} />
      )}
    </button>
  );
}
