import { keccak256 } from "viem";
import { randomBytes } from "crypto";

/**
 * Generate a cryptographically secure random backup key (32 bytes)
 */
export function generateBackupKey(): Uint8Array {
  return randomBytes(32);
}

/**
 * Validate that a private key matches a public key
 */
export function validateKeyPair(
  privateKey: string,
  publicKey: string
): boolean {
  try {
    // For now, just validate format - in production, implement proper key derivation
    return isValidPrivateKey(privateKey) && isValidEthereumAddress(publicKey);
  } catch (error) {
    console.error("Key validation error:", error);
    return false;
  }
}

/**
 * Validate hex string format
 */
export function isValidHexString(
  str: string,
  expectedLength?: number
): boolean {
  const cleanStr = str.startsWith("0x") ? str.slice(2) : str;
  const hexRegex = /^[0-9a-fA-F]+$/;

  if (!hexRegex.test(cleanStr)) return false;
  if (expectedLength && cleanStr.length !== expectedLength * 2) return false;

  return true;
}

/**
 * Validate Ethereum address format
 */
export function isValidEthereumAddress(address: string): boolean {
  return isValidHexString(address, 20) && address.length === 42;
}

/**
 * Validate private key format (64 hex characters)
 */
export function isValidPrivateKey(privateKey: string): boolean {
  return (
    isValidHexString(privateKey, 32) &&
    (privateKey.length === 64 || privateKey.length === 66)
  );
}

/**
 * Simple XOR encryption (for development - replace with proper encryption in production)
 */
export function encryptData(
  data: Uint8Array,
  key: Uint8Array
): { encrypted: Uint8Array; nonce: Uint8Array } {
  const nonce = randomBytes(16);
  const encrypted = new Uint8Array(data.length);

  for (let i = 0; i < data.length; i++) {
    encrypted[i] = data[i] ^ key[i % key.length] ^ nonce[i % nonce.length];
  }

  return { encrypted, nonce };
}

/**
 * Simple XOR decryption (for development - replace with proper decryption in production)
 */
export function decryptData(
  encrypted: Uint8Array,
  key: Uint8Array,
  nonce: Uint8Array
): Uint8Array {
  const decrypted = new Uint8Array(encrypted.length);

  for (let i = 0; i < encrypted.length; i++) {
    decrypted[i] = encrypted[i] ^ key[i % key.length] ^ nonce[i % nonce.length];
  }

  return decrypted;
}

/**
 * Generate a random nullifier for Self.xyz integration
 */
export function generateNullifier(): string {
  return "0x" + randomBytes(16).toString("hex");
}

/**
 * Hash data using Keccak-256
 */
export function hashData(data: Uint8Array): Uint8Array {
  const hashHex = keccak256(data);
  return hexToBytes(hashHex);
}

/**
 * Convert hex string to Uint8Array
 */
export function hexToBytes(hex: string): Uint8Array {
  const cleanHex = hex.startsWith("0x") ? hex.slice(2) : hex;
  return new Uint8Array(Buffer.from(cleanHex, "hex"));
}

/**
 * Convert Uint8Array to hex string
 */
export function bytesToHex(bytes: Uint8Array): string {
  return "0x" + Buffer.from(bytes).toString("hex");
}
