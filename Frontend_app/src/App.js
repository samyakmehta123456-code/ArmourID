import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { VaultProvider, useVault } from './context/VaultContext';
import Header from './components/common/Header';
import SplashScreen from './screens/onboarding/SplashScreen';
import OnboardingCarousel from './screens/onboarding/OnboardingCarousel';
import DashboardTab from './screens/main/DashboardTab';
import VaultTab from './screens/main/VaultTab';
import PortalsTab from './screens/main/PortalsTab';
import AutoFillTab from './screens/main/AutoFillTab';
import DPDPManagerTab from './screens/main/DPDPManagerTab';
import AuditLogTab from './screens/main/AuditLogTab';
import SettingsTab from './screens/main/SettingsTab';
import { LayoutDashboard, ShieldCheck, Hash, SlidersHorizontal, FileText, Activity, Settings } from 'lucide-react';

function MainApp() {
  const { theme, colors } = useTheme();
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Refined Micro-Dot 3D Halftone Wavy Mesh in Official Apple FaceTime Green (#34C759)
  const faceTimeGreenMicroDotSvgDataUri = `data:image/svg+xml,%3Csvg width='600' height='600' viewBox='0 0 600 600' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2334C759' fill-opacity='0.32'%3E%3Ccircle cx='30' cy='30' r='1.2'/%3E%3Ccircle cx='60' cy='28' r='1.6'/%3E%3Ccircle cx='90' cy='24' r='2.2'/%3E%3Ccircle cx='120' cy='18' r='2.8'/%3E%3Ccircle cx='150' cy='16' r='3.2'/%3E%3Ccircle cx='180' cy='18' r='2.8'/%3E%3Ccircle cx='210' cy='24' r='2.2'/%3E%3Ccircle cx='240' cy='32' r='1.6'/%3E%3Ccircle cx='270' cy='42' r='1.2'/%3E%3Ccircle cx='300' cy='48' r='1.0'/%3E%3Ccircle cx='330' cy='44' r='1.4'/%3E%3Ccircle cx='360' cy='36' r='2.0'/%3E%3Ccircle cx='390' cy='26' r='2.6'/%3E%3Ccircle cx='420' cy='18' r='3.2'/%3E%3Ccircle cx='450' cy='16' r='3.5'/%3E%3Ccircle cx='480' cy='20' r='3.0'/%3E%3Ccircle cx='510' cy='28' r='2.2'/%3E%3Ccircle cx='540' cy='38' r='1.6'/%3E%3Ccircle cx='570' cy='46' r='1.2'/%3E%3Ccircle cx='300' cy='90' r='1.4'/%3E%3Ccircle cx='30' cy='90' r='1.5'/%3E%3Ccircle cx='60' cy='84' r='2.0'/%3E%3Ccircle cx='90' cy='76' r='2.6'/%3E%3Ccircle cx='120' cy='66' r='3.2'/%3E%3Ccircle cx='150' cy='60' r='3.6'/%3E%3Ccircle cx='180' cy='64' r='3.2'/%3E%3Ccircle cx='210' cy='74' r='2.6'/%3E%3Ccircle cx='240' cy='86' r='2.0'/%3E%3Ccircle cx='270' cy='98' r='1.5'/%3E%3Ccircle cx='330' cy='104' r='1.8'/%3E%3Ccircle cx='360' cy='94' r='2.4'/%3E%3Ccircle cx='390' cy='82' r='3.0'/%3E%3Ccircle cx='420' cy='70' r='3.6'/%3E%3Ccircle cx='450' cy='66' r='3.8'/%3E%3Ccircle cx='480' cy='72' r='3.2'/%3E%3Ccircle cx='510' cy='82' r='2.6'/%3E%3Ccircle cx='540' cy='96' r='2.0'/%3E%3Ccircle cx='570' cy='108' r='1.4'/%3E%3Ccircle cx='30' cy='150' r='1.8'/%3E%3Ccircle cx='60' cy='142' r='2.4'/%3E%3Ccircle cx='90' cy='130' r='3.0'/%3E%3Ccircle cx='120' cy='116' r='3.6'/%3E%3Ccircle cx='150' cy='108' r='4.0'/%3E%3Ccircle cx='180' cy='112' r='3.6'/%3E%3Ccircle cx='210' cy='124' r='3.0'/%3E%3Ccircle cx='240' cy='138' r='2.4'/%3E%3Ccircle cx='270' cy='152' r='1.8'/%3E%3Ccircle cx='300' cy='160' r='1.5'/%3E%3Ccircle cx='330' cy='164' r='2.0'/%3E%3Ccircle cx='360' cy='152' r='2.8'/%3E%3Ccircle cx='390' cy='138' r='3.4'/%3E%3Ccircle cx='420' cy='124' r='4.0'/%3E%3Ccircle cx='450' cy='118' r='4.2'/%3E%3Ccircle cx='480' cy='126' r='3.6'/%3E%3Ccircle cx='510' cy='138' r='3.0'/%3E%3Ccircle cx='540' cy='154' r='2.4'/%3E%3Ccircle cx='570' cy='168' r='1.8'/%3E%3Ccircle cx='30' cy='210' r='2.0'/%3E%3Ccircle cx='60' cy='198' r='2.8'/%3E%3Ccircle cx='90' cy='184' r='3.4'/%3E%3Ccircle cx='120' cy='168' r='4.0'/%3E%3Ccircle cx='150' cy='158' r='4.4'/%3E%3Ccircle cx='180' cy='164' r='4.0'/%3E%3Ccircle cx='210' cy='178' r='3.4'/%3E%3Ccircle cx='240' cy='194' r='2.8'/%3E%3Ccircle cx='270' cy='210' r='2.2'/%3E%3Ccircle cx='300' cy='220' r='1.8'/%3E%3Ccircle cx='330' cy='224' r='2.4'/%3E%3Ccircle cx='360' cy='210' r='3.2'/%3E%3Ccircle cx='390' cy='194' r='3.8'/%3E%3Ccircle cx='420' cy='178' r='4.4'/%3E%3Ccircle cx='450' cy='170' r='4.6'/%3E%3Ccircle cx='480' cy='180' r='4.0'/%3E%3Ccircle cx='510' cy='196' r='3.4'/%3E%3Ccircle cx='540' cy='214' r='2.8'/%3E%3Ccircle cx='570' cy='228' r='2.0'/%3E%3Ccircle cx='30' cy='270' r='1.8'/%3E%3Ccircle cx='60' cy='258' r='2.5'/%3E%3Ccircle cx='90' cy='242' r='3.2'/%3E%3Ccircle cx='120' cy='224' r='3.8'/%3E%3Ccircle cx='150' cy='214' r='4.2'/%3E%3Ccircle cx='180' cy='220' r='3.8'/%3E%3Ccircle cx='210' cy='234' r='3.2'/%3E%3Ccircle cx='240' cy='252' r='2.5'/%3E%3Ccircle cx='270' cy='268' r='2.0'/%3E%3Ccircle cx='300' cy='278' r='1.6'/%3E%3Ccircle cx='330' cy='282' r='2.2'/%3E%3Ccircle cx='360' cy='268' r='3.0'/%3E%3Ccircle cx='390' cy='250' r='3.6'/%3E%3Ccircle cx='420' cy='234' r='4.2'/%3E%3Ccircle cx='450' cy='226' r='4.4'/%3E%3Ccircle cx='480' cy='236' r='3.8'/%3E%3Ccircle cx='510' cy='252' r='3.2'/%3E%3Ccircle cx='540' cy='270' r='2.5'/%3E%3Ccircle cx='570' cy='284' r='1.8'/%3E%3Ccircle cx='30' cy='330' r='1.5'/%3E%3Ccircle cx='60' cy='318' r='2.2'/%3E%3Ccircle cx='90' cy='302' r='2.8'/%3E%3Ccircle cx='120' cy='284' r='3.4'/%3E%3Ccircle cx='150' cy='274' r='3.8'/%3E%3Ccircle cx='180' cy='280' r='3.4'/%3E%3Ccircle cx='210' cy='294' r='2.8'/%3E%3Ccircle cx='240' cy='310' r='2.2'/%3E%3Ccircle cx='270' cy='326' r='1.6'/%3E%3Ccircle cx='300' cy='336' r='1.4'/%3E%3Ccircle cx='330' cy='340' r='1.8'/%3E%3Ccircle cx='360' cy='326' r='2.6'/%3E%3Ccircle cx='390' cy='308' r='3.2'/%3E%3Ccircle cx='420' cy='292' r='3.8'/%3E%3Ccircle cx='450' cy='284' r='4.0'/%3E%3Ccircle cx='480' cy='294' r='3.4'/%3E%3Ccircle cx='510' cy='310' r='2.8'/%3E%3Ccircle cx='540' cy='328' r='2.2'/%3E%3Ccircle cx='570' cy='342' r='1.5'/%3E%3Ccircle cx='30' cy='390' r='1.4'/%3E%3Ccircle cx='60' cy='378' r='1.8'/%3E%3Ccircle cx='90' cy='362' r='2.4'/%3E%3Ccircle cx='120' cy='344' r='3.0'/%3E%3Ccircle cx='150' cy='334' r='3.4'/%3E%3Ccircle cx='180' cy='340' r='3.0'/%3E%3Ccircle cx='210' cy='354' r='2.4'/%3E%3Ccircle cx='240' cy='370' r='1.8'/%3E%3Ccircle cx='270' cy='384' r='1.4'/%3E%3Ccircle cx='300' cy='394' r='1.2'/%3E%3Ccircle cx='330' cy='398' r='1.6'/%3E%3Ccircle cx='360' cy='384' r='2.2'/%3E%3Ccircle cx='390' cy='366' r='2.8'/%3E%3Ccircle cx='420' cy='350' r='3.4'/%3E%3Ccircle cx='450' cy='342' r='3.6'/%3E%3Ccircle cx='480' cy='352' r='3.0'/%3E%3Ccircle cx='510' cy='368' r='2.4'/%3E%3Ccircle cx='540' cy='384' r='1.8'/%3E%3Ccircle cx='570' cy='396' r='1.4'/%3E%3Ccircle cx='30' cy='450' r='1.2'/%3E%3Ccircle cx='60' cy='438' r='1.6'/%3E%3Ccircle cx='90' cy='422' r='2.0'/%3E%3Ccircle cx='120' cy='404' r='2.6'/%3E%3Ccircle cx='150' cy='394' r='3.0'/%3E%3Ccircle cx='180' cy='400' r='2.6'/%3E%3Ccircle cx='210' cy='414' r='2.0'/%3E%3Ccircle cx='240' cy='430' r='1.6'/%3E%3Ccircle cx='270' cy='444' r='1.2'/%3E%3Ccircle cx='300' cy='454' r='1.0'/%3E%3Ccircle cx='330' cy='458' r='1.4'/%3E%3Ccircle cx='360' cy='444' r='1.8'/%3E%3Ccircle cx='390' cy='426' r='2.4'/%3E%3Ccircle cx='420' cy='410' r='3.0'/%3E%3Ccircle cx='450' cy='402' r='3.2'/%3E%3Ccircle cx='480' cy='412' r='2.6'/%3E%3Ccircle cx='510' cy='428' r='2.0'/%3E%3Ccircle cx='540' cy='444' r='1.6'/%3E%3Ccircle cx='570' cy='456' r='1.2'/%3E%3Ccircle cx='30' cy='510' r='1.0'/%3E%3Ccircle cx='60' cy='500' r='1.4'/%3E%3Ccircle cx='90' cy='484' r='1.8'/%3E%3Ccircle cx='120' cy='468' r='2.2'/%3E%3Ccircle cx='150' cy='458' r='2.5'/%3E%3Ccircle cx='180' cy='464' r='2.2'/%3E%3Ccircle cx='210' cy='476' r='1.8'/%3E%3Ccircle cx='240' cy='490' r='1.4'/%3E%3Ccircle cx='270' cy='502' r='1.0'/%3E%3Ccircle cx='330' cy='516' r='1.2'/%3E%3Ccircle cx='360' cy='504' r='1.6'/%3E%3Ccircle cx='390' cy='488' r='2.0'/%3E%3Ccircle cx='420' cy='472' r='2.5'/%3E%3Ccircle cx='450' cy='464' r='2.8'/%3E%3Ccircle cx='480' cy='474' r='2.2'/%3E%3Ccircle cx='510' cy='488' r='1.8'/%3E%3Ccircle cx='540' cy='502' r='1.4'/%3E%3Ccircle cx='570' cy='512' r='1.0'/%3E%3C/g%3E%3C/svg%3E`;

  const backgroundStyle = {
    minHeight: '100vh',
    backgroundColor: '#F3F4F6',
    backgroundImage: `url("${faceTimeGreenMicroDotSvgDataUri}")`,
    backgroundRepeat: 'repeat',
    backgroundSize: '500px 500px',
    backgroundAttachment: 'fixed',
    color: colors.textPrimary,
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif',
    display: 'flex',
    flexDirection: 'column',
  };

  const tabs = [
    { id: 'dashboard', label: 'Vault', icon: LayoutDashboard },
    { id: 'vault', label: 'Documents', icon: ShieldCheck },
    { id: 'portals', label: 'Portals', icon: Hash },
    { id: 'autofill', label: 'Auto-Fill', icon: SlidersHorizontal },
    { id: 'dpdp', label: 'DPDP Rights', icon: FileText },
    { id: 'audit', label: 'Audit Log', icon: Activity },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} theme={theme} colors={colors} />;
  }

  if (showOnboarding) {
    return <OnboardingCarousel onComplete={() => setShowOnboarding(false)} theme={theme} colors={colors} />;
  }

  return (
    <div style={backgroundStyle}>
      {/* iOS Header */}
      <Header
        title="ArmourID"
        subtitle="DPDP 2023 Compliant Data Fiduciary"
        theme={theme}
        colors={colors}
      />

      {/* Main Screen Body Container */}
      <main
        style={{
          flex: 1,
          maxWidth: 720,
          width: '100%',
          margin: '0 auto',
          padding: '20px 16px 100px 16px',
          boxSizing: 'border-box',
        }}
      >
        {activeTab === 'dashboard' && <DashboardTab onNavigate={setActiveTab} theme={theme} colors={colors} />}
        {activeTab === 'vault' && <VaultTab theme={theme} colors={colors} />}
        {activeTab === 'portals' && <PortalsTab theme={theme} colors={colors} />}
        {activeTab === 'autofill' && <AutoFillTab theme={theme} colors={colors} />}
        {activeTab === 'dpdp' && <DPDPManagerTab theme={theme} colors={colors} />}
        {activeTab === 'audit' && <AuditLogTab theme={theme} colors={colors} />}
        {activeTab === 'settings' && <SettingsTab theme={theme} colors={colors} />}
      </main>

      {/* Floating Apple FaceTime Green Capsule Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          right: 16,
          maxWidth: 680,
          margin: '0 auto',
          backgroundColor: '#34C759', // Official Apple FaceTime Green
          backgroundImage: 'linear-gradient(180deg, #34C759 0%, #28B84D 100%)',
          borderRadius: 24,
          padding: '6px 8px 8px 8px',
          boxShadow: '0 12px 32px -4px rgba(4, 120, 87, 0.45), 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
          zIndex: 99,
          border: '1px solid #A3EBB1',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          {tabs.map((t) => {
            const isSelected = activeTab === t.id;
            const Icon = t.icon;

            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  backgroundColor: isSelected ? '#FFFFFF' : 'transparent', // Pure White Pill Container for Active Selected Tab
                  border: isSelected ? '1px solid rgba(255, 255, 255, 0.9)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3,
                  color: isSelected ? '#000000' : '#FFFFFF',
                  cursor: 'pointer',
                  padding: '6px 8px',
                  borderRadius: 16,
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  flex: 1,
                  boxShadow: isSelected ? '0 4px 14px rgba(0, 0, 0, 0.2)' : 'none',
                }}
              >
                <Icon
                  size={20}
                  strokeWidth={isSelected ? 2.5 : 2}
                  color={isSelected ? '#000000' : '#FFFFFF'}
                  fill={isSelected ? '#000000' : 'none'} // Solid Black Fill Icon for Selected Tab
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: isSelected ? '800' : '600',
                    color: isSelected ? '#000000' : '#FFFFFF',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VaultProvider>
          <MainApp />
        </VaultProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
