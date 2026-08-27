import React, { useState } from 'react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import SegmentedControl from '../../components/common/SegmentedControl';
import AddAuxiliaryModal from '../../components/modals/AddAuxiliaryModal';
import { useVault } from '../../context/VaultContext';
import { ShieldCheck, Lock, RefreshCw, Plus, ChevronDown, ChevronUp } from 'lucide-react';

export default function VaultTab({ theme = 'light', colors }) {
  const { documents, auxiliaryFields, addAuxiliaryField } = useVault();
  const [activeSegment, setActiveSegment] = useState('digilocker');
  const [expandedDocId, setExpandedDocId] = useState('doc_aadhaar_01');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [syncingDocId, setSyncingDocId] = useState(null);

  const isDark = theme === 'dark';

  const handleRefreshDoc = (docId) => {
    setSyncingDocId(docId);
    setTimeout(() => {
      setSyncingDocId(null);
    }, 1000);
  };

  return (
    <div style={{ paddingBottom: 40 }}>
      {/* View Segment Switcher */}
      <SegmentedControl
        options={[
          { id: 'digilocker', label: `DigiLocker (${documents.length})`, icon: ShieldCheck },
          { id: 'auxiliary', label: `Auxiliary Vault (${auxiliaryFields.length})`, icon: Lock }
        ]}
        selectedId={activeSegment}
        onSelect={setActiveSegment}
        theme={theme}
        colors={colors}
        style={{ marginBottom: 16 }}
      />

      {activeSegment === 'digilocker' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
              DigiLocker Verified Documents
            </h3>
            <Badge label="Verified" variant="verified" theme={theme} colors={colors} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {documents.map((doc) => {
              const isExpanded = expandedDocId === doc.id;
              const isSyncing = syncingDocId === doc.id;

              return (
                <Card key={doc.id} theme={theme} colors={colors} hasWatermark={true} watermarkSize={140}>
                  <div
                    onClick={() => setExpandedDocId(isExpanded ? null : doc.id)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 12,
                          backgroundColor: '#E8F8EC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <ShieldCheck size={22} color="#34C759" />
                      </div>
                      <div>
                        <h4 style={{ margin: 0, fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>
                          {doc.title}
                        </h4>
                        <span style={{ fontSize: 11, color: colors.textMuted }}>
                          {doc.issuer}
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {isExpanded ? <ChevronUp size={18} color={colors.textMuted} /> : <ChevronDown size={18} color={colors.textMuted} />}
                    </div>
                  </div>

                  {/* Expanded Structured Fields View */}
                  {isExpanded && (
                    <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${colors.border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <span style={{ fontSize: 12, fontWeight: '700', color: '#E5B800', textTransform: 'uppercase' }}>
                          Parsed Fields:
                        </span>
                        <Button
                          variant="ghost"
                          size="small"
                          onClick={(e) => { e.stopPropagation(); handleRefreshDoc(doc.id); }}
                          theme={theme}
                          colors={colors}
                          icon={RefreshCw}
                        >
                          {isSyncing ? 'Syncing...' : 'Re-sync'}
                        </Button>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 8 }}>
                        {doc.fields.map((field) => (
                          <div
                            key={field.key}
                            style={{
                              backgroundColor: isDark ? colors.surfaceSecondary : '#F8F9FA',
                              borderRadius: 10,
                              padding: '10px 12px',
                              border: `1px solid ${colors.border}`,
                            }}
                          >
                            <div style={{ fontSize: 11, color: colors.textMuted }}>{field.label}</div>
                            <div style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginTop: 2 }}>
                              {field.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
              Auxiliary Encrypted Vault
            </h3>
            <Button
              variant="primary"
              size="small"
              onClick={() => setIsAddModalOpen(true)}
              theme={theme}
              colors={colors}
              icon={Plus}
            >
              Add Attribute
            </Button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {auxiliaryFields.map((field) => (
              <Card key={field.id} theme={theme} colors={colors} hasWatermark={true} watermarkSize={120}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <Lock size={15} color="#2563EB" />
                      <h4 style={{ margin: 0, fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>
                        {field.label}
                      </h4>
                    </div>
                    <div style={{ fontSize: 14, fontWeight: '700', color: '#E5B800', margin: '4px 0 0 0' }}>
                      {field.value}
                    </div>
                  </div>

                  <Badge label="AES-256" variant="aes" size="small" theme={theme} colors={colors} />
                </div>
              </Card>
            ))}
          </div>

          <AddAuxiliaryModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={addAuxiliaryField}
            theme={theme}
            colors={colors}
          />
        </div>
      )}
    </div>
  );
}
