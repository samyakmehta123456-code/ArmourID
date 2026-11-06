import re
import math
from typing import List, Dict, Any, Tuple
from schemas.document import BoundingBox, OCRToken

class DocumentOCRPipeline:
    """
    Lightweight Optical Character Recognition (OCR) and token extraction pipeline.
    Normalizes spatial 2D bounding boxes to [0, 1000] scale required for LayoutLMv3 ingestion.
    """

    def __init__(self):
        # Regex patterns for Indian identity documents
        self.aadhaar_regex = re.compile(r"\b\d{4}\s\d{4}\s\d{4}\b")
        self.pan_regex = re.compile(r"\b[A-Z]{5}[0-9]{4}[A-Z]\b")
        self.dob_regex = re.compile(r"\b(0[1-9]|[12][0-9]|3[01])[-/.](0[1-9]|1[012])[-/.](19|20)\d\d\b")
        self.pincode_regex = re.compile(r"\b[1-9][0-9]{5}\b")

    def preprocess_image_array(self, image_width: int, image_height: int) -> Dict[str, Any]:
        """
        Calculates image resolution scaling factors to normalize coordinate bounding boxes.
        """
        x_scale = 1000.0 / max(image_width, 1)
        y_scale = 1000.0 / max(image_height, 1)
        return {"x_scale": x_scale, "y_scale": y_scale}

    def extract_tokens(self, raw_text_or_lines: List[Dict[str, Any]]) -> List[OCRToken]:
        """
        Parses raw text tokens and normalizes coordinates to standard 1000x1000 box layout.
        """
        tokens: List[OCRToken] = []
        for item in raw_text_or_lines:
            bbox = item.get("bbox", [0, 0, 100, 20])
            norm_bbox = BoundingBox(
                x0=int(min(max(bbox[0], 0), 1000)),
                y0=int(min(max(bbox[1], 0), 1000)),
                x1=int(min(max(bbox[2], 0), 1000)),
                y1=int(min(max(bbox[3], 0), 1000))
            )
            tokens.append(OCRToken(
                text=item.get("text", "").strip(),
                bbox=norm_bbox,
                confidence=float(item.get("confidence", 0.95))
            ))
        return tokens

    def parse_aadhaar_card(self, text_corpus: str) -> Dict[str, Any]:
        """Specialized heuristic OCR extraction for Aadhaar identity payloads."""
        aadhaar_match = self.aadhaar_regex.search(text_corpus)
        dob_match = self.dob_regex.search(text_corpus)
        pincode_match = self.pincode_regex.search(text_corpus)

        return {
            "document_number": aadhaar_match.group(0) if aadhaar_match else None,
            "dob": dob_match.group(0) if dob_match else None,
            "pincode": pincode_match.group(0) if pincode_match else None,
            "is_valid": bool(aadhaar_match)
        }

    def parse_pan_card(self, text_corpus: str) -> Dict[str, Any]:
        """Specialized heuristic OCR extraction for PAN card payloads."""
        pan_match = self.pan_regex.search(text_corpus)
        dob_match = self.dob_regex.search(text_corpus)

        return {
            "document_number": pan_match.group(0) if pan_match else None,
            "dob": dob_match.group(0) if dob_match else None,
            "is_valid": bool(pan_match)
        }

ocr_pipeline = DocumentOCRPipeline()
