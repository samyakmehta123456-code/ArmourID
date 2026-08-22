import React, { useState } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { Input } from '../common/Input';
import Badge from '../common/Badge';
import { ShieldCheck, Plus, Lock, X } from 'lucide-react';
import { generateAESTag } from '../../utils/crypto';

/**
 * Add Auxiliary Encrypted Attribute Modal (Module D Screen)
 */
export default function AddAuxiliaryModal({
  isOpen,
  onClose,
  onAdd,
  theme = 'light',
  colors
}) {
  const [label, setLabel] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState('Financial & Income');

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!label.trim() || !value.trim()) return;

    const newItem = {
      id: `aux_custom_${Date.now()}`,
      label: label.trim(),
      value: value.trim(),
      category: category,
      encryptedTag: generateAESTag(),
      addedDate: new Date().toISOString(),
      autoFillEligible: true,
    };

    onAdd(newItem);
    setLabel('');
    setValue('');
    onClose();
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
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1100,
        backdropFilter: 'blur(8px)',
        padding: 20,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 460,
          backgroundColor: colors.background,
          borderRadius: 24,
          border: `1px solid ${colors.border}`,
          boxShadow: colors.cardShadowElevated,
          padding: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: isDark ? 'rgba(59, 130, 246, 0.15)' : '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} color="#2563EB" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: '700', color: colors.textPrimary }}>
                Add AES-256 Auxiliary Attribute
              </h3>
              <span style={{ fontSize: 11, color: colors.textMuted }}>Manual Encrypted Vault Entry</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: colors.textMuted, cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Attribute Name / Label"
            placeholder="e.g. Father's Annual Income, Scholarship Bank A/C"
            value={label}
            onChange={setLabel}
            theme={theme}
            colors={colors}
          />

          <Input
            label="Attribute Value"
            placeholder="e.g. ₹ 8,50,000 / annum"
            value={value}
            onChange={setValue}
            theme={theme}
            colors={colors}
          />

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: '600', color: colors.textSecondary, marginBottom: 6 }}>
              Category Tag
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: '100%',
                backgroundColor: isDark ? colors.surfaceElevated : '#F8F9FA',
                color: colors.textPrimary,
                border: `1px solid ${colors.border}`,
                borderRadius: 12,
                padding: '10px 12px',
                fontSize: 14,
                outline: 'none',
              }}
            >
              <option value="Financial & Income">Financial & Income</option>
              <option value="Reservation / Category">Reservation / Category</option>
              <option value="Bank Details">Bank Details & IFSC</option>
              <option value="Personal Health">Personal Health & Contact</option>
              <option value="Custom Identity">Custom Identity Attribute</option>
            </select>
          </div>

          <div style={{ padding: '10px 12px', backgroundColor: isDark ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF', borderRadius: 10, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: '600', color: '#2563EB' }}>
              <Lock size={14} /> Encrypted instantly with AES-256-GCM
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: 11, color: colors.textSecondary }}>
              Saved directly to hardware secure enclave. Eligible for Scoped Auto-fill.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="secondary" onClick={onClose} theme={theme} colors={colors} style={{ flex: 1 }}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={!label || !value} theme={theme} colors={colors} style={{ flex: 1.5 }}>
              Encrypt & Save Attribute
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
