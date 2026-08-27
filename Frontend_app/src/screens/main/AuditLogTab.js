import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import SegmentedControl from '../../components/common/SegmentedControl';
import { useVault } from '../../context/VaultContext';
import { Activity, CheckCircle2 } from 'lucide-react';

export default function AuditLogTab({ theme = 'light', colors }) {
  const { auditLogs } = useVault();
  const [filterType, setFilterType] = useState('all');

  const filteredLogs = auditLogs.filter(log => {
    if (filterType === 'all') return true;
    return log.type === filterType;
  });

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* Security Alert Banner */}
      <Card
        theme={theme}
        colors={colors}
        hasWatermark={true}
        watermarkSize={140}
        style={{
          marginBottom: 16,
          backgroundColor: colors.emeraldLight,
          border: `1px solid ${colors.emeraldBorder}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CheckCircle2 size={26} color={colors.emerald} />
          <div>
            <h4 style={{ margin: 0, fontSize: 15, fontWeight: '700', color: colors.emerald }}>
              Security Status: Normal & Verified
            </h4>
          </div>
        </div>
      </Card>

      {/* Filter Segmented Control */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <h3 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
          Audit Trail Timeline ({filteredLogs.length})
        </h3>
        <Badge label="System Log" variant="verified" theme={theme} colors={colors} />
      </div>

      <SegmentedControl
        options={[
          { id: 'all', label: 'All Events' },
          { id: 'autofill', label: 'Auto-fills' },
          { id: 'security', label: 'Security' },
          { id: 'sync', label: 'Sync' },
        ]}
        selectedId={filterType}
        onSelect={setFilterType}
        theme={theme}
        colors={colors}
        style={{ marginBottom: 14 }}
      />

      {/* Audit Log Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filteredLogs.map((log) => (
          <Card key={log.id} theme={theme} colors={colors} hasWatermark={false}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Activity size={18} color={colors.emerald} />
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>
                    {log.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: colors.textMuted, marginTop: 2 }}>
                    <span>{log.device}</span>
                  </div>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <Badge
                  label={log.status.toUpperCase()}
                  variant={log.status === 'success' ? 'verified' : 'error'}
                  size="small"
                  theme={theme}
                  colors={colors}
                />
                <div style={{ fontSize: 11, color: colors.textMuted, marginTop: 4 }}>
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
