import React from 'react';

/**
 * ArmourID Brand Crest Logo Component
 * FaceTime Green (#34C759) filled with Sunburst Yellow (#FFCC00) in between.
 * NO White, NO Black! Just Green and Yellow!
 */
export default function CrestLogo({ size = 32, theme = 'light', isWatermark = false, style = {} }) {
  if (isWatermark) {
    // Monochrome Transparent Line-Art Watermark
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'inline-block', verticalAlign: 'middle', opacity: 0.08, ...style }}
      >
        <path
          d="M50 5 L88 24V60 C88 78 50 95 50 95 C50 95 12 78 12 60V24 L50 5Z"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M50 14 L80 29V56 C80 70 50 83 50 83 C50 83 20 70 20 56V29 L50 14Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M34 56L40 40L50 48L60 40L66 56H34Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
          fill="none"
        />
        <line x1="36" y1="60" x2="64" y2="60" stroke="currentColor" strokeWidth="3" />
        <circle cx="50" cy="30" r="4" fill="currentColor" />
      </svg>
    );
  }

  // Header Logo: FaceTime Green (#34C759) Shield Filled with Sunburst Yellow (#FFCC00) in between (NO White, NO Black!)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle', filter: 'drop-shadow(0 2px 6px rgba(4, 120, 87, 0.35))', ...style }}
    >
      {/* Outer FaceTime Green Shield */}
      <path
        d="M50 5 L88 24V60 C88 78 50 95 50 95 C50 95 12 78 12 60V24 L50 5Z"
        fill="#34C759"
        stroke="#248A3D"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      {/* Inner Sunburst Yellow Inset Shield */}
      <path
        d="M50 12 L80 28V56 C80 70 50 85 50 85 C50 85 20 70 20 56V28 L50 12Z"
        fill="#FFCC00"
      />
      {/* FaceTime Green Crown Emblem Accent */}
      <path
        d="M34 56L40 40L50 48L60 40L66 56H34Z"
        fill="#34C759"
      />
      {/* Sunburst Yellow Visor Slit Accent */}
      <rect x="36" y="58" width="28" height="4" rx="2" fill="#FFCC00" />
      {/* FaceTime Green Top Star Accent */}
      <circle cx="50" cy="30" r="4" fill="#34C759" />
    </svg>
  );
}
