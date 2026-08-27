import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, X, HelpCircle, EyeOff } from 'lucide-react';
import { formatHashIDShort } from '../../utils/crypto';

/**
 * ArmourID Form Auto-Fill Consent Sheet (Critical Module F Screen)
 * User-Friendly Itemized Field Review with Exclusion Toggles & Scoped Privacy Protection Note.
 */
export default function ConsentSheet({
  isOpen,
  onClose,
  onAuthorize,
  formTarget,
  hashID,
  theme = 'light',
  colors
}) {
  const [fieldStates, setFieldStates] = useState(() => {
    if (!formTarget || !formTarget.fields) return {};
    const initial = {};
    formTarget.fields.forEach(f => { initial[f.name] = true; });
    return initial;
  });

  if (!isOpen || !formTarget) return null;

  const isDark = theme === 'dark';
  const fields = formTarget.fields || [];

  const handleToggleField = (fieldName) => {
    setFieldStates(prev => ({
      ...prev,
      [fieldName]: !prev[fieldName]
    }));
  };

  const selectedCount = Object.values(fieldStates).filter(Boolean).length;

  const handleConfirmClick = () => {
    const selectedFieldList = fields.filter(f => fieldStates[f.name]);
    onAuthorize(selectedFieldList);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.modalOverlay,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fadeIn 0.2s ease-out',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          backgroundColor: colors.background,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.cardShadowElevated,
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Handle & Header */}
        <div style={{ padding: '16px 20px 12px 20px', borderBottom: `1px solid ${colors.border}`, position: 'relative' }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: colors.borderStrong, margin: '0 auto 12px auto' }} />
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ShieldCheck size={22} color={colors.emerald} />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>
                  Review Form Auto-Fill Consent
                </h3>
              </div>
              <p style={{ margin: '4px 0 0 0', fontSize: 13, color: colors.textMuted }}>
                Target Portal: <strong style={{ color: colors.textPrimary }}>{formTarget.domain}</strong>
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: colors.textMuted,
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* User-Friendly Privacy Explanation Banner */}
        <div style={{ padding: '12px 20px', backgroundColor: isDark ? 'rgba(16, 185, 129, 0.12)' : '#ECFDF5', borderBottom: `1px solid ${colors.emeraldBorder}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Lock size={15} color={colors.emerald} />
              <span style={{ fontSize: 13, fontWeight: '700', color: colors.emerald }}>
                100% Privacy Controlled by You
              </span>
            </div>
            <Badge label={`Scoped ID: ${formatHashIDShort(hashID)}`} variant="scoped" theme={theme} colors={colors} />
          </div>
          <p style={{ margin: 0, fontSize: 12, color: colors.textSecondary, lineHeight: 1.4 }}>
            This website receives an isolated Scoped ID. They cannot compare notes or track you across other university portals.
          </p>
        </div>

        {/* Itemized Field Checklist */}
        <div style={{ padding: '16px 20px', overflowY: 'auto', flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>
              Fields to Share ({selectedCount} of {fields.length} selected)
            </span>
            <span style={{ fontSize: 11, color: colors.textMuted, display: 'flex', alignItems: 'center', gap: 4 }}>
              <EyeOff size={12} /> Uncheck to keep any field private
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {fields.map((field) => {
              const isChecked = !!fieldStates[field.name];
              return (
                <div
                  key={field.name}
                  onClick={() => handleToggleField(field.name)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: isChecked ? (isDark ? colors.surface : '#FFFFFF') : (isDark ? colors.surfaceSecondary : '#F1F3F5'),
                    border: `1px solid ${isChecked ? colors.border : colors.border}`,
                    borderRadius: 12,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    opacity: isChecked ? 1 : 0.65,
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}} // Handled by parent div
                      style={{
                        width: 18,
                        height: 18,
                        accentColor: colors.emerald,
                        cursor: 'pointer',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>
                        {field.name}
                      </div>
                      <div style={{ fontSize: 11, color: colors.textMuted }}>
                        Verified Value: <strong style={{ color: colors.textPrimary }}>{field.value}</strong>
                      </div>
                    </div>
                  </div>
                  <Badge
                    label={field.category.includes('Auxiliary') ? 'AES-256' : 'DigiLocker'}
                    variant={field.category.includes('Auxiliary') ? 'aes' : 'verified'}
                    size="small"
                    theme={theme}
                    colors={colors}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 20px',
            borderTop: `1px solid ${colors.border}`,
            backgroundColor: isDark ? colors.surface : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <Button
            variant="secondary"
            onClick={onClose}
            theme={theme}
            colors={colors}
            style={{ flex: 1 }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmClick}
            disabled={selectedCount === 0}
            theme={theme}
            colors={colors}
            style={{ flex: 2 }}
          >
            Approve & Auto-Fill ({selectedCount} fields)
          </Button>
        </div>
      </div>
    </div>
  );
}
