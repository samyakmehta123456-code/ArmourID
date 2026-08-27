import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import EraseDataModal from '../../components/modals/EraseDataModal';
import { useVault } from '../../context/VaultContext';
import { ShieldCheck, Download, Edit3, Trash2, Globe, Lock, CheckCircle2 } from 'lucide-react';

export default function DPDPManagerTab({ theme = 'light', colors }) {
  const { consentLedger, language, setLanguage, purgeAllData, addAuditLog } = useVault();
  const [isEraseModalOpen, setIsEraseModalOpen] = useState(false);
  const [actionSuccessText, setActionSuccessText] = useState(null);

  const isDark = theme === 'dark';
  const languages = ['English', 'Hindi (हिंदी)', 'Tamil (தமிழ்)', 'Telugu (తెలుగు)', 'Kannada (ಕನ್ನಡ)', 'Marathi (मराठी)', 'Bengali (বাংলা)'];

  const handleExportData = () => {
    setActionSuccessText('Vault Archive Exported');
    addAuditLog({
      type: 'security',
      title: 'DPDP Data Export Generated',
      details: 'Encrypted JSON vault export requested.',
    });
    setTimeout(() => setActionSuccessText(null), 3000);
  };

  const handleCorrectData = () => {
    setActionSuccessText('DigiLocker Re-sync Initiated');
    addAuditLog({
      type: 'sync',
      title: 'DPDP Data Correction Request',
      details: 'Initiated check against DigiLocker issuer nodes.',
    });
    setTimeout(() => setActionSuccessText(null), 3000);
  };

  const handleExecutePurge = () => {
    purgeAllData();
    setIsEraseModalOpen(false);
    setActionSuccessText('Right to be Forgotten Executed');
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header Info Card */}
      <Card theme={theme} colors={colors} hasWatermark={true} watermarkSize={160} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <ShieldCheck size={22} color={colors.accentGold} />
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: '700', color: colors.textPrimary }}>
            DPDP Sovereign Rights Center
          </h3>
        </div>
      </Card>

      {actionSuccessText && (
        <Card theme={theme} colors={colors} hasWatermark={false} style={{ marginBottom: 16, backgroundColor: colors.emeraldLight }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.emerald, fontWeight: '700', fontSize: 13 }}>
            <CheckCircle2 size={18} /> {actionSuccessText}
          </div>
        </Card>
      )}

      {/* Multilingual Notice Preferences */}
      <Card theme={theme} colors={colors} hasWatermark={false} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Globe size={18} color={colors.accentGold} />
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>
              Notice Language
            </h4>
          </div>
          <Badge label={language} variant="scoped" theme={theme} colors={colors} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 6 }}>
          {languages.map((lang) => {
            const isSelected = language === lang || lang.startsWith(language);
            return (
              <button
                key={lang}
                onClick={() => setLanguage(lang.split(' ')[0])}
                style={{
                  padding: '8px 10px',
                  borderRadius: 10,
                  border: `1px solid ${isSelected ? colors.accentGold : colors.border}`,
                  backgroundColor: isSelected ? (isDark ? 'rgba(229, 193, 88, 0.15)' : '#FFF9E6') : (isDark ? colors.surfaceSecondary : '#F8F9FA'),
                  color: isSelected ? colors.accentGold : colors.textPrimary,
                  fontSize: 12,
                  fontWeight: isSelected ? '700' : '500',
                  cursor: 'pointer',
                }}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </Card>

      {/* DPDP Statutory Rights Grid */}
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
        DPDP Statutory Rights:
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 20 }}>
        <Card theme={theme} colors={colors} hasWatermark={false}>
          <Download size={22} color={colors.accentGold} style={{ marginBottom: 6 }} />
          <h4 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>
            1. Access My Data
          </h4>
          <Button variant="secondary" size="small" onClick={handleExportData} theme={theme} colors={colors} fullWidth={true}>
            Export Archive
          </Button>
        </Card>

        <Card theme={theme} colors={colors} hasWatermark={false}>
          <Edit3 size={22} color="#2563EB" style={{ marginBottom: 6 }} />
          <h4 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>
            2. Correct My Data
          </h4>
          <Button variant="secondary" size="small" onClick={handleCorrectData} theme={theme} colors={colors} fullWidth={true}>
            Re-sync Source
          </Button>
        </Card>

        <Card theme={theme} colors={colors} hasWatermark={false}>
          <Lock size={22} color={colors.status.warning} style={{ marginBottom: 6 }} />
          <h4 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>
            3. Withdraw Consent
          </h4>
          <Button variant="outline" size="small" onClick={() => alert('Manage scope in Connected Portals tab.')} theme={theme} colors={colors} fullWidth={true}>
            Manage Scope
          </Button>
        </Card>

        <Card theme={theme} colors={colors} hasWatermark={false} style={{ border: `1px solid ${colors.status.errorBorder}` }}>
          <Trash2 size={22} color={colors.status.error} style={{ marginBottom: 6 }} />
          <h4 style={{ margin: '0 0 8px 0', fontSize: 14, fontWeight: '700', color: colors.status.error }}>
            4. Right to be Forgotten
          </h4>
          <Button variant="danger" size="small" onClick={() => setIsEraseModalOpen(true)} theme={theme} colors={colors} fullWidth={true}>
            Erase Data
          </Button>
        </Card>
      </div>

      {/* Immutable Consent Ledger */}
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
        Consent Ledger
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {consentLedger.map((item) => (
          <Card key={item.id} theme={theme} colors={colors} hasWatermark={false} style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>{item.portalName}</span>
                  <Badge label={item.action} variant={item.action === 'GRANT' ? 'verified' : 'error'} size="small" theme={theme} colors={colors} />
                </div>
              </div>
              <span style={{ fontSize: 11, color: colors.textMuted }}>
                {new Date(item.timestamp).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>

      <EraseDataModal
        isOpen={isEraseModalOpen}
        onClose={() => setIsEraseModalOpen(false)}
        onConfirmErase={handleExecutePurge}
        theme={theme}
        colors={colors}
      />
    </div>
  );
}
