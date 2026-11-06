from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime

class BoundingBox(BaseModel):
    x0: int
    y0: int
    x1: int
    y1: int

class OCRToken(BaseModel):
    text: str
    bbox: BoundingBox
    confidence: float

class ExtractedEntity(BaseModel):
    field_name: str
    value: str
    confidence: float
    bbox: Optional[BoundingBox] = None

class DocumentExtractionRequest(BaseModel):
    document_type: str = Field(..., description="Aadhaar, PAN, Marksheet_XII, Driving_License")
    image_base64: Optional[str] = None
    file_url: Optional[str] = None
    purpose_scope: str = Field("higher_education_admission", description="DPDP Purpose Scope")

class DocumentExtractionResponse(BaseModel):
    document_id: str
    document_type: str
    status: str
    extraction_accuracy: float
    extracted_fields: Dict[str, ExtractedEntity]
    raw_tokens_count: int
    processed_at: datetime
    dpdp_purpose_bound: bool = True

class ScopedHashIDRequest(BaseModel):
    domain: str = Field(..., example="admissions.annauniv.edu")
    scope_id: str = Field(..., example="UG_ADMISSION_2026")
    user_id: str

class ScopedHashIDResponse(BaseModel):
    scoped_hash_id: str
    domain: str
    scope_id: str
    expires_in_seconds: int
    created_at: datetime
