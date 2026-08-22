import React from 'react';

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  theme = 'light',
  colors,
  error,
  helperText,
  icon: Icon,
  style = {}
}) {
  return (
    <div style={{ marginBottom: 16, width: '100%', ...style }}>
      {label && (
        <label
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: '600',
            color: colors.textSecondary,
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {Icon && (
          <Icon
            size={18}
            color={colors.textMuted}
            style={{ position: 'absolute', left: 12, pointerEvents: 'none' }}
          />
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            backgroundColor: theme === 'dark' ? colors.surfaceElevated : '#F8F9FA',
            color: colors.textPrimary,
            border: `1px solid ${error ? colors.status.error : colors.border}`,
            borderRadius: 12,
            padding: Icon ? '10px 12px 10px 38px' : '10px 14px',
            fontSize: 14,
            outline: 'none',
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            boxSizing: 'border-box',
          }}
        />
      </div>
      {error ? (
        <p style={{ color: colors.status.error, fontSize: 11, marginTop: 4, margin: '4px 0 0 0' }}>{error}</p>
      ) : helperText ? (
        <p style={{ color: colors.textMuted, fontSize: 11, marginTop: 4, margin: '4px 0 0 0' }}>{helperText}</p>
      ) : null}
    </div>
  );
}

export function Toggle({
  value,
  onChange,
  theme = 'light',
  colors,
  disabled = false,
  label
}) {
  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        userSelect: 'none',
      }}
    >
      <div
        onClick={() => !disabled && onChange && onChange(!value)}
        style={{
          width: 44,
          height: 26,
          borderRadius: 13,
          backgroundColor: value ? colors.accentGold : (theme === 'dark' ? colors.surfaceSecondary : '#CBD5E1'),
          padding: 2,
          transition: 'background-color 0.2s ease',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 11,
            backgroundColor: '#FFFFFF',
            transform: value ? 'translateX(18px)' : 'translateX(0px)',
            transition: 'transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        />
      </div>
      {label && (
        <span style={{ marginLeft: 10, fontSize: 14, fontWeight: '500', color: colors.textPrimary }}>
          {label}
        </span>
      )}
    </label>
  );
}
