import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useVault } from '../../context/VaultContext';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Activity } from 'lucide-react';

export default function DashboardTab({ onNavigate, theme = 'light', colors }) {
  const { documents, auxiliaryFields, connectedPortals, auditLogs } = useVault();
  const { user } = useAuth();
  const isDark = theme === 'dark';

  const verifiedDocsCount = documents.length;
  const auxCount = auxiliaryFields.length;
  const activePortalsCount = connectedPortals.length;

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Header Card */}
      <Card
        theme={theme}
        colors={colors}
        hasWatermark={true}
        watermarkSize={200}
        elevated={true}
        emeraldAccent={true}
        style={{ marginBottom: 16, padding: 20 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h2 style={{ margin: 0, fontSize: 20, fontWeight: '500', color: colors.textPrimary, letterSpacing: '-0.01em' }}>
              Welcome, {user.name.split(' ')[0]}
            </h2>
          </div>
          <Badge label="Verified Vault" variant="verified" theme={theme} colors={colors} />
        </div>

        {/* Security Matrix Pills */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
          <div style={{ backgroundColor: '#E8F8EC', borderRadius: 12, padding: 12, border: '1px solid #A3EBB1' }}>
            <div style={{ fontSize: 11, color: colors.textMuted }}>DigiLocker</div>
            <div style={{ fontSize: 18, fontWeight: '700', color: '#248A3D', marginTop: 2 }}>{verifiedDocsCount} Docs</div>
          </div>
          <div style={{ backgroundColor: isDark ? colors.surfaceSecondary : '#F8F9FA', borderRadius: 12, padding: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: 11, color: colors.textMuted }}>AES-256</div>
            <div style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginTop: 2 }}>{auxCount} Fields</div>
          </div>
          <div style={{ backgroundColor: isDark ? colors.surfaceSecondary : '#F8F9FA', borderRadius: 12, padding: 12, border: `1px solid ${colors.border}` }}>
            <div style={{ fontSize: 11, color: colors.textMuted }}>Portals</div>
            <div style={{ fontSize: 18, fontWeight: '700', color: '#D97706', marginTop: 2 }}>{activePortalsCount} Active</div>
          </div>
        </div>

        {/* Quick Action Banner */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, backgroundColor: '#FFFBE6', borderRadius: 14, padding: '12px 16px', border: '1px solid #FFE066' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: '600', color: colors.textPrimary }}>Form Auto-Fill</div>
          </div>
          <Button variant="primary" onClick={() => onNavigate('autofill')} theme={theme} colors={colors}>
            Auto-Fill
          </Button>
        </div>
      </Card>

      {/* Security Status Card */}
      <Card theme={theme} colors={colors} hasWatermark={true} watermarkSize={140} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <Lock size={18} color="#34C759" />
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: '600', color: colors.textPrimary }}>
            Security Status
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: colors.textSecondary }}>MFA:</span>
            <span style={{ fontWeight: '600', color: '#248A3D' }}>Enabled</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: colors.textSecondary }}>Biometric Lock:</span>
            <span style={{ fontWeight: '600', color: '#248A3D' }}>Active</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
            <span style={{ color: colors.textSecondary }}>Device:</span>
            <span style={{ fontWeight: '500', color: colors.textPrimary }}>{user.lastLoginDevice}</span>
          </div>
        </div>
      </Card>

      {/* Recent Activity Summary */}
      <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: '600', color: colors.textPrimary }}>
          Recent Activity
        </h3>
        <button
          onClick={() => onNavigate('audit')}
          style={{ background: 'none', border: 'none', color: '#248A3D', fontSize: 13, fontWeight: '500', cursor: 'pointer' }}
        >
          View all
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {auditLogs.slice(0, 3).map((log) => (
          <Card key={log.id} theme={theme} colors={colors} hasWatermark={false} style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Activity size={16} color="#34C759" />
                <div>
                  <div style={{ fontSize: 13, fontWeight: '500', color: colors.textPrimary }}>{log.title}</div>
                </div>
              </div>
              <span style={{ fontSize: 11, color: colors.textMuted }}>
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
