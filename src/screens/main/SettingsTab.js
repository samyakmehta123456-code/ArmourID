import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { Toggle } from '../../components/common/Input';
import WhitepaperModal from '../../components/modals/WhitepaperModal';
import { useAuth } from '../../context/AuthContext';
import { FileText, Mail } from 'lucide-react';

export default function SettingsTab({ theme = 'light', colors }) {
  const { user, toggleMFA, toggleBiometrics } = useAuth();
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Verified Profile Card */}
      <Card theme={theme} colors={colors} hasWatermark={true} watermarkSize={160} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 24,
              backgroundColor: '#FFFBE6',
              border: '2px solid #FFCC00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 18,
              fontWeight: '800',
              color: '#D97706',
            }}
          >
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
                {user.name}
              </h3>
              <Badge label="Verified" variant="verified" size="small" theme={theme} colors={colors} />
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: 12, color: colors.textMuted }}>
              {user.email} · {user.phone}
            </p>
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
        Security & Authentication
      </h3>

      <Card theme={theme} colors={colors} hasWatermark={false} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
              MFA
            </div>
            <Toggle value={user.mfaEnabled} onChange={toggleMFA} theme={theme} colors={colors} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}`, paddingTop: 12 }}>
            <div style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
              Biometric Lock
            </div>
            <Toggle value={user.biometricsEnabled} onChange={toggleBiometrics} theme={theme} colors={colors} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${colors.border}`, paddingTop: 12 }}>
            <div style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
              Active Sessions
            </div>
            <Button variant="outline" size="small" onClick={() => alert('Sessions active.')} theme={theme} colors={colors}>
              Manage
            </Button>
          </div>
        </div>
      </Card>

      {/* Privacy Whitepaper */}
      <h3 style={{ margin: '0 0 10px 0', fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
        Privacy & Compliance
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <Card theme={theme} colors={colors} hasWatermark={false} onClick={() => setIsWhitepaperOpen(true)}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <FileText size={20} color="#FFCC00" />
              <div style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
                Whitepaper
              </div>
            </div>
          </div>
        </Card>

        <Card theme={theme} colors={colors} hasWatermark={false}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Mail size={20} color="#FFCC00" />
              <div style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>
                DPO Contact
              </div>
            </div>
            <Button variant="ghost" size="small" onClick={() => alert('DPO email copied: dpo@armourid.in')} theme={theme} colors={colors}>
              Copy
            </Button>
          </div>
        </Card>
      </div>

      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
        theme={theme}
        colors={colors}
      />
    </div>
  );
}
