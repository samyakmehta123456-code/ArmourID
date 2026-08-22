import React from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useVault } from '../../context/VaultContext';
import { Hash, Globe } from 'lucide-react';

export default function PortalsTab({ theme = 'light', colors }) {
  const { connectedPortals, revokePortalAccess } = useVault();

  const isDark = theme === 'dark';

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Overview Card */}
      <Card theme={theme} colors={colors} hasWatermark={true} watermarkSize={160} style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Hash size={20} color="#0284C7" />
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: '700', color: colors.textPrimary }}>
            Scoped HashID Protection
          </h3>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
          Connected Portals ({connectedPortals.length})
        </h3>
      </div>

      {connectedPortals.length === 0 ? (
        <Card theme={theme} colors={colors} hasWatermark={false} style={{ textAlign: 'center', padding: 30 }}>
          <p style={{ margin: 0, fontSize: 14, color: colors.textMuted }}>
            No connected portals yet. Auto-fill a form to establish your first Scoped HashID consent.
          </p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {connectedPortals.map((portal) => (
            <Card key={portal.id} theme={theme} colors={colors} hasWatermark={true} watermarkSize={140}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
                    {portal.name}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: colors.textMuted, marginTop: 2 }}>
                    <Globe size={13} /> {portal.domain}
                  </div>
                </div>

                <Badge label="Scoped HashID" variant="scoped" theme={theme} colors={colors} />
              </div>

              {/* Distinct Deep Blue/Cyan Scoped HashID Display Box */}
              <div
                style={{
                  backgroundColor: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: 10,
                  padding: '8px 12px',
                  marginBottom: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: 10, fontWeight: '700', color: '#0284C7', textTransform: 'uppercase' }}>
                    SCOPED HASHID:
                  </div>
                  <div style={{ fontSize: 13, fontWeight: '700', fontFamily: 'monospace', color: colors.textPrimary, marginTop: 2 }}>
                    {portal.hashID}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="small"
                  onClick={() => navigator.clipboard && navigator.clipboard.writeText(portal.hashID)}
                  theme={theme}
                  colors={colors}
                  style={{ color: '#0284C7' }}
                >
                  Copy
                </Button>
              </div>

              {/* Granular Field Scope Breakdown */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                {portal.grantedFields.map((f, i) => (
                  <span key={i} style={{ fontSize: 11, backgroundColor: isDark ? colors.surfaceSecondary : '#F1F3F5', padding: '3px 8px', borderRadius: 6, color: colors.textSecondary }}>
                    ✓ {f}
                  </span>
                ))}
              </div>

              {/* Action Footer with Solid Red Fill Revoke Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: `1px solid ${colors.border}`, paddingTop: 10 }}>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => revokePortalAccess(portal.id)}
                  theme={theme}
                  colors={colors}
                >
                  Revoke Scope
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
