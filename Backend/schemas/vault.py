from pydantic import BaseModel, Field
from typing import Optional, Dict, Any
from datetime import datetime

class AuxiliaryVaultItemCreate(BaseModel):
    category: str = Field(..., example="Financial")
    field_name: str = Field(..., example="father_annual_income")
    field_value: str = Field(..., example="850000")
    purpose_allowed: str = Field("scholarship_verification", example="scholarship_verification")

class AuxiliaryVaultItemResponse(BaseModel):
    item_id: str
    category: str
    field_name: str
    encrypted_blob: str
    iv: str
    auth_tag: str
    created_at: datetime
    dpdp_consent_verified: bool = True

class KeyZeroizationRequest(BaseModel):
    user_id: str
    consent_id: Optional[str] = None
    reason: str = Field("Section 12 DPDP Act Right to Erasure", example="User exercised right to erasure")
