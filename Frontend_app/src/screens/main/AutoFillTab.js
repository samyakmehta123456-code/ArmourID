import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import ConsentSheet from '../../components/modals/ConsentSheet';
import BiometricModal from '../../components/modals/BiometricModal';
import { useVault } from '../../context/VaultContext';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Globe, Search } from 'lucide-react';

export default function AutoFillTab({ theme = 'light', colors }) {
  const { supportedForms, triggerAutoFill } = useVault();
  const { user } = useAuth();
  const isDark = theme === 'dark';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedForm, setSelectedForm] = useState(supportedForms[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [isConsentOpen, setIsConsentOpen] = useState(false);
  const [isBiometricOpen, setIsBiometricOpen] = useState(false);
  const [pendingFields, setPendingFields] = useState([]);
  const [autoFillSuccess, setAutoFillSuccess] = useState(null);

  const handleStartScan = (form) => {
    setSelectedForm(form);
    setIsScanning(true);
    setAutoFillSuccess(null);
    setTimeout(() => {
      setIsScanning(false);
      setIsConsentOpen(true);
    }, 500);
  };

  const handleConsentApproved = (fieldsToFill) => {
    setPendingFields(fieldsToFill);
    setIsConsentOpen(false);
    setIsBiometricOpen(true);
  };

  const handleBiometricSuccess = async () => {
    setIsBiometricOpen(false);

    const result = await triggerAutoFill(selectedForm, pendingFields, user.masterSeed);
    setAutoFillSuccess(result);
  };

  const filteredForms = supportedForms.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header Banner with Clean 3-Step Quick Guide */}
      <Card theme={theme} colors={colors} hasWatermark={true} watermarkSize={160} emeraldAccent={true} style={{ marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
            Auto-Fill
          </h3>
        </div>

        {/* 3-Step Clean Guide */}
        <div style={{ backgroundColor: isDark ? colors.surfaceSecondary : '#F8F9FA', borderRadius: 12, padding: 10, border: `1px solid ${colors.border}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, textAlign: 'center' }}>
            <div style={{ padding: '4px' }}>
              <div style={{ fontSize: 12, fontWeight: '800', color: colors.textPrimary }}>1. Select</div>
            </div>
            <div style={{ padding: '4px', borderLeft: `1px solid ${colors.border}`, borderRight: `1px solid ${colors.border}` }}>
              <div style={{ fontSize: 12, fontWeight: '800', color: colors.textPrimary }}>2. Review</div>
            </div>
            <div style={{ padding: '4px' }}>
              <div style={{ fontSize: 12, fontWeight: '800', color: '#248A3D' }}>3. Auto-Fill</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Form Link Search Bar */}
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <Search size={18} color={colors.textMuted} style={{ position: 'absolute', left: 14, top: 14, pointerEvents: 'none' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search form..."
          style={{
            width: '100%',
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
            color: colors.textPrimary,
            border: `1px solid ${colors.border}`,
            borderRadius: 14,
            padding: '12px 14px 12px 42px',
            fontSize: 14,
            outline: 'none',
            boxShadow: colors.cardShadow,
            boxSizing: 'border-box',
          }}
        />
      </div>

      {/* Execution Toast Result */}
      {autoFillSuccess && (
        <Card
          theme={theme}
          colors={colors}
          hasWatermark={true}
          watermarkSize={140}
          emeraldAccent={true}
          style={{ marginBottom: 16, backgroundColor: '#E8F8EC' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CheckCircle2 size={26} color="#34C759" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h4 style={{ margin: 0, fontSize: 15, fontWeight: '800', color: '#248A3D' }}>
                  Auto-Fill Complete
                </h4>
                <Badge label={`${autoFillSuccess.executionTimeMs}ms`} variant="verified" size="small" theme={theme} colors={colors} />
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: 12, color: colors.textPrimary }}>
                {autoFillSuccess.fieldsFilledCount} fields filled
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Scanner State Loader */}
      {isScanning && (
        <Card theme={theme} colors={colors} hasWatermark={false} style={{ textAlign: 'center', padding: 24, marginBottom: 16 }}>
          <h4 style={{ margin: 0, fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>
            Scanning...
          </h4>
        </Card>
      )}

      {/* Target Application Forms List */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
          Forms ({filteredForms.length}):
        </h3>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {filteredForms.map((form) => (
          <Card key={form.id} theme={theme} colors={colors} hasWatermark={true} watermarkSize={140}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <h4 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
                  {form.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
                  <Globe size={13} /> {form.domain}
                </div>
              </div>
              <Badge label={`${form.fieldsCount} Fields`} variant="verified" theme={theme} colors={colors} />
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {form.fields.slice(0, 5).map((f, idx) => (
                <span key={idx} style={{ fontSize: 11, backgroundColor: isDark ? colors.surfaceSecondary : '#F1F3F5', padding: '2px 8px', borderRadius: 6, color: colors.textSecondary }}>
                  ✓ {f.name}
                </span>
              ))}
            </div>

            <Button
              variant="primary"
              fullWidth={true}
              onClick={() => handleStartScan(form)}
              theme={theme}
              colors={colors}
            >
              Auto-Fill
            </Button>
          </Card>
        ))}
      </div>

      {/* Consent Sheet Modal */}
      <ConsentSheet
        isOpen={isConsentOpen}
        onClose={() => setIsConsentOpen(false)}
        onAuthorize={handleConsentApproved}
        formTarget={selectedForm}
        hashID={user.masterSeed}
        theme={theme}
        colors={colors}
      />

      {/* Biometric Confirmation Modal */}
      <BiometricModal
        isOpen={isBiometricOpen}
        onClose={() => setIsBiometricOpen(false)}
        onSuccess={handleBiometricSuccess}
        title="Authorize Auto-Fill"
        subtitle={`Approve Face ID to fill ${selectedForm.domain}`}
        theme={theme}
        colors={colors}
      />
    </div>
  );
}
