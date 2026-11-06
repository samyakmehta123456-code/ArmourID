import os
import hmac
import hashlib
import base64
from typing import Tuple, Dict, Any
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.hkdf import HKDF

class CryptoVaultEngine:
    """
    DPDP Act 2023 Compliant Envelope Encryption & Scoped HashID Derivation Engine.
    Implements AES-256-GCM authenticated encryption and non-linkable HMAC-SHA256 domain tokens.
    """

    def __init__(self, master_key_secret: str = None):
        secret = master_key_secret or os.getenv("ARMOUR_MASTER_KEY", "armour-id-fiduciary-master-key-2026")
        # Derive 32-byte master key using HKDF
        hkdf = HKDF(
            algorithm=hashes.SHA256(),
            length=32,
            salt=b"armour-id-salt-vector-v1",
            info=b"master-kms-envelope-hierarchy"
        )
        self.master_key = hkdf.derive(secret.encode("utf-8"))

    def generate_data_encryption_key(self) -> bytes:
        """Generates a secure, cryptographically random 256-bit AES-GCM DEK."""
        return AESGCM.generate_key(bit_length=256)

    def encrypt_field(self, plaintext: str) -> Dict[str, str]:
        """
        Encrypts sensitive identity field using AES-256-GCM.
        Returns ciphertext, IV (nonce), and wrapped key.
        """
        dek = self.generate_data_encryption_key()
        aesgcm = AESGCM(dek)
        nonce = os.urandom(12)  # Standard 96-bit nonce for AES-GCM
        
        ciphertext = aesgcm.encrypt(nonce, plaintext.encode("utf-8"), None)
        
        # Envelope encryption: Encrypt DEK with Master Key (simulating AWS KMS Envelope)
        master_aesgcm = AESGCM(self.master_key)
        master_nonce = os.urandom(12)
        wrapped_dek = master_aesgcm.encrypt(master_nonce, dek, None)

        return {
            "ciphertext": base64.b64encode(ciphertext).decode("utf-8"),
            "nonce": base64.b64encode(nonce).decode("utf-8"),
            "wrapped_dek": base64.b64encode(wrapped_dek).decode("utf-8"),
            "master_nonce": base64.b64encode(master_nonce).decode("utf-8"),
            "algorithm": "AES-256-GCM-ENVELOPE"
        }

    def decrypt_field(self, encrypted_data: Dict[str, str]) -> str:
        """Unwraps DEK and decrypts the sensitive payload."""
        master_aesgcm = AESGCM(self.master_key)
        master_nonce = base64.b64decode(encrypted_data["master_nonce"])
        wrapped_dek = base64.b64decode(encrypted_data["wrapped_dek"])
        
        dek = master_aesgcm.decrypt(master_nonce, wrapped_dek, None)
        
        aesgcm = AESGCM(dek)
        nonce = base64.b64decode(encrypted_data["nonce"])
        ciphertext = base64.b64decode(encrypted_data["ciphertext"])
        
        decrypted_bytes = aesgcm.decrypt(nonce, ciphertext, None)
        return decrypted_bytes.decode("utf-8")

    def derive_scoped_hash_id(self, domain: str, scope_id: str, user_salt: str) -> str:
        """
        Computes purpose-bound non-linkable Scoped HashID:
        ScopedHashID = HMAC-SHA256(K_master, Domain || ScopeID || Salt)
        Prevents cross-party tracking across university / government portals.
        """
        payload = f"{domain}:{scope_id}:{user_salt}".encode("utf-8")
        scoped_mac = hmac.new(self.master_key, payload, hashlib.sha256).hexdigest()
        return f"ARM-{scoped_mac[:8].upper()}-{scoped_mac[8:16].upper()}"

crypto_vault = CryptoVaultEngine()
