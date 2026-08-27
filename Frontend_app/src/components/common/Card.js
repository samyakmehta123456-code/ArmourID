import React from 'react';
import CrestLogo from './CrestLogo';

/**
 * ArmourID Card Container Component
 * High-depth physical card container with 1.5px top glass highlight and transparent watermark
 */
export default function Card({
  children,
  theme = 'light',
  colors,
  hasWatermark = true,
  watermarkSize = 160,
  elevated = false,
  emeraldAccent = false,
  style = {},
  onClick,
  ...props
}) {
  const isDark = theme === 'dark';

  const cardStyle = {
    backgroundColor: colors.surface,
    borderRadius: 18,
    border: emeraldAccent ? `1px solid ${colors.emeraldBorder}` : `1px solid ${colors.border}`,
    boxShadow: elevated ? colors.cardShadowElevated : colors.cardShadow,
    padding: 16,
    position: 'relative',
    overflow: 'hidden',
    cursor: onClick ? 'pointer' : 'default',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div
      onClick={onClick}
      style={cardStyle}
      {...props}
    >
      {/* Hairline Top Accent Line */}
      {emeraldAccent && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: '#34C759',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
          }}
        />
      )}

      {/* Transparent Line-Art Crest Watermark Background */}
      {hasWatermark && (
        <div
          style={{
            position: 'absolute',
            right: -20,
            bottom: -20,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        >
          <CrestLogo size={watermarkSize} theme={theme} isWatermark={true} />
        </div>
      )}

      {/* Card Content Foreground */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
