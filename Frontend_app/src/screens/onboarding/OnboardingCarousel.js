import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import CrestLogo from '../../components/common/CrestLogo';
import { ShieldCheck, Hash, Lock, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function OnboardingCarousel({ onComplete, theme = 'light', colors }) {
  const [slideIndex, setSlideIndex] = useState(0);

  const slides = [
    {
      title: 'Verified Identity Repository',
      subtitle: 'Direct DigiLocker OAuth 2.0 Integration',
      description: 'Connect to India\'s government repository to extract Aadhaar, PAN, and academic marksheets into an immutable, AI-structured vault.',
      icon: ShieldCheck,
      badgeText: 'Govt Verified Source',
    },
    {
      title: 'Scoped Non-Trackable Auto-Fill',
      subtitle: 'Zero Cross-Portal Correlation',
      description: 'Auto-fill university & government application forms instantly. Every portal receives a unique Scoped HashID so no two sites can track you.',
      icon: Hash,
      badgeText: 'Cryptographic Privacy',
    },
    {
      title: 'DPDP Act 2023 Sovereignty',
      subtitle: 'Complete Control as a Data Fiduciary',
      description: 'Exercise mandated privacy rights in one tap: Export your vault, withdraw portal permissions, or trigger unrecoverable data erasure.',
      icon: FileText,
      badgeText: 'Sovereign Control',
    },
    {
      title: 'Bank-Grade Hardware Enclave',
      subtitle: 'AES-256 Encryption · Zero Plaintext',
      description: 'Your PII is never stored in plaintext on any server. Protected by hardware-secured encryption keys stored on your device.',
      icon: Lock,
      badgeText: 'AES-256-GCM',
    }
  ];

  const isDark = theme === 'dark';
  const currentSlide = slides[slideIndex];
  const IconComponent = currentSlide.icon;

  const handleNext = () => {
    if (slideIndex < slides.length - 1) {
      setSlideIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div
      style={{
        maxWidth: 480,
        margin: '0 auto',
        padding: '32px 20px',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Header Crest */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <CrestLogo size={48} theme={theme} style={{ marginBottom: 12 }} />
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: '800', color: colors.textPrimary }}>
          ArmourID Identity Vault
        </h2>
      </div>

      {/* Main Slide Card */}
      <Card
        theme={theme}
        colors={colors}
        hasWatermark={true}
        watermarkSize={180}
        elevated={true}
        style={{ padding: '32px 24px', textAlign: 'center' }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 32,
            backgroundColor: isDark ? 'rgba(229, 193, 88, 0.15)' : '#FFF9E6',
            border: `1px solid ${colors.accentGold}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
          }}
        >
          <IconComponent size={32} color={colors.accentGold} />
        </div>

        <span
          style={{
            display: 'inline-block',
            backgroundColor: isDark ? colors.surfaceSecondary : '#F1F3F5',
            color: colors.accentGold,
            border: `1px solid ${colors.border}`,
            borderRadius: 20,
            padding: '4px 12px',
            fontSize: 11,
            fontWeight: '700',
            marginBottom: 12,
          }}
        >
          {currentSlide.badgeText}
        </span>

        <h3 style={{ margin: '0 0 6px 0', fontSize: 20, fontWeight: '700', color: colors.textPrimary }}>
          {currentSlide.title}
        </h3>
        <p style={{ margin: '0 0 14px 0', fontSize: 13, fontWeight: '600', color: colors.textMuted }}>
          {currentSlide.subtitle}
        </p>

        <p style={{ margin: 0, fontSize: 14, color: colors.textSecondary, lineHeight: 1.5 }}>
          {currentSlide.description}
        </p>
      </Card>

      {/* Indicators & Navigation */}
      <div style={{ marginTop: 32 }}>
        {/* Slide Indicators */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
          {slides.map((_, idx) => (
            <div
              key={idx}
              onClick={() => setSlideIndex(idx)}
              style={{
                width: idx === slideIndex ? 28 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: idx === slideIndex ? colors.accentGold : colors.borderStrong,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', gap: 12 }}>
          {slideIndex > 0 && (
            <Button
              variant="secondary"
              onClick={() => setSlideIndex(prev => prev - 1)}
              theme={theme}
              colors={colors}
              style={{ flex: 1 }}
            >
              Back
            </Button>
          )}
          <Button
            variant="primary"
            onClick={handleNext}
            theme={theme}
            colors={colors}
            icon={ArrowRight}
            style={{ flex: 2 }}
          >
            {slideIndex === slides.length - 1 ? 'Get Started & Link Vault' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
