import React, { useEffect } from 'react';
import CrestLogo from '../../components/common/CrestLogo';

export default function SplashScreen({ onFinish, theme = 'light', colors }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: colors.background,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 999,
        animation: 'fadeIn 0.3s ease-in-out',
      }}
    >
      {/* Clean Minimal Crest Logo Only */}
      <div style={{ transform: 'scale(1.2)', animation: 'pulse 1.5s ease-in-out infinite' }}>
        <CrestLogo size={90} theme={theme} />
      </div>
    </div>
  );
}
