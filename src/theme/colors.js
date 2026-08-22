// ArmourID Design Token System: Colors & Apple-Grade Depth
// Light Mode: Apple Light Gray (#F3F4F6) canvas with elevated Pure White (#FFFFFF) cards
// Green: Official Apple FaceTime Green (#34C759)
// Yellow/Gold: Official Apple TV Sunburst Yellow (#FFCC00)

export const LIGHT_THEME = {
  mode: 'light',
  background: '#F3F4F6',
  surface: '#FFFFFF',
  surfaceElevated: '#FFFFFF',
  surfaceSecondary: '#F3F4F6',
  border: '#D1D5DB',
  borderStrong: '#9CA3AF',
  borderShadeTop: 'inset 0 1.5px 0 0 rgba(255, 255, 255, 1), inset 0 -1px 0 0 rgba(209, 213, 219, 0.6)',
  textPrimary: '#111827',
  textSecondary: '#374151',
  textMuted: '#6B7280',

  // Official Apple TV Sunburst Yellow (#FFCC00 Primary CTA)
  accent: '#FFCC00',
  accentGold: '#FFCC00',
  accentGoldLight: '#FFFBE6',
  accentGoldBorder: '#FFE066',
  accentPlatinum: '#6B7280',

  // Official Apple FaceTime Green (#34C759)
  emerald: '#34C759', 
  emeraldLight: '#E8F8EC',
  emeraldBorder: '#A3EBB1',
  emeraldText: '#248A3D',

  watermarkOpacity: 0.08,
  
  // Apple-grade Multi-Layered Depth Shading
  cardShadow: '0 10px 25px -4px rgba(15, 23, 42, 0.1), 0 4px 10px -2px rgba(15, 23, 42, 0.05), inset 0 1.5px 0 0 rgba(255, 255, 255, 1)',
  cardShadowElevated: '0 20px 40px -8px rgba(15, 23, 42, 0.15), 0 8px 16px -4px rgba(15, 23, 42, 0.08), inset 0 1.5px 0 0 rgba(255, 255, 255, 1)',
  
  modalOverlay: 'rgba(15, 23, 42, 0.6)',
  status: {
    success: '#34C759',
    successBg: '#E8F8EC',
    successBorder: '#A3EBB1',
    warning: '#D97706',
    warningBg: '#FFFBEB',
    warningBorder: '#FDE68A',
    error: '#DC2626',
    errorBg: '#FEF2F2',
    errorBorder: '#FECACA',
    info: '#0284C7',
    infoBg: '#F0F9FF',
    infoBorder: '#BAE6FD',
  },
  badge: {
    verifiedBg: '#E8F8EC',
    verifiedText: '#248A3D',
    verifiedBorder: '#A3EBB1',
    aesBg: '#F0F9FF',
    aesText: '#0284C7',
    aesBorder: '#BAE6FD',
    scopedBg: '#FFFBE6',
    scopedText: '#B45309',
    scopedBorder: '#FFE066',
    manualBg: '#F3F4F6',
    manualText: '#374151',
    manualBorder: '#D1D5DB',
  }
};
