import React from 'react';

/**
 * iOS-Style Segmented Tab Control Component
 */
export default function SegmentedControl({
  options = [], // [{ id, label, icon: Icon }]
  selectedId,
  onSelect,
  theme = 'light',
  colors,
  style = {}
}) {
  const isDark = theme === 'dark';

  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: isDark ? colors.surfaceSecondary : '#F1F3F5',
        padding: 4,
        borderRadius: 12,
        border: `1px solid ${colors.border}`,
        userSelect: 'none',
        ...style
      }}
    >
      {options.map((option) => {
        const isSelected = option.id === selectedId;
        const Icon = option.icon;

        return (
          <button
            key={option.id}
            onClick={() => onSelect && onSelect(option.id)}
            style={{
              flex: 1,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isSelected ? (isDark ? colors.surfaceElevated : '#FFFFFF') : 'transparent',
              color: isSelected ? colors.textPrimary : colors.textMuted,
              border: isSelected ? `1px solid ${colors.border}` : '1px solid transparent',
              borderRadius: 8,
              padding: '8px 12px',
              fontSize: 13,
              fontWeight: isSelected ? '600' : '500',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
              outline: 'none',
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
            }}
          >
            {Icon && <Icon size={15} style={{ marginRight: 6 }} />}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
