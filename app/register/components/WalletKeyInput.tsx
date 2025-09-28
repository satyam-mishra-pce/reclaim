"use client";

import { useState } from "react";
import {
  validateKeyPair,
  isValidEthereumAddress,
  isValidPrivateKey,
} from "@/lib/crypto";

interface WalletKeyInputProps {
  onKeysValidated: () => void;
}

export function WalletKeyInput({ onKeysValidated }: WalletKeyInputProps) {
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [errors, setErrors] = useState<{
    publicKey?: string;
    privateKey?: string;
    validation?: string;
  }>({});
  const [isValidating, setIsValidating] = useState(false);

  const validateKeys = async () => {
    setErrors({});

    // Validate format
    if (!isValidEthereumAddress(publicKey)) {
      setErrors((prev) => ({
        ...prev,
        publicKey: "Invalid public key format",
      }));
      return false;
    }

    if (!isValidPrivateKey(privateKey)) {
      setErrors((prev) => ({
        ...prev,
        privateKey: "Invalid private key format",
      }));
      return false;
    }

    // Validate key pair match
    setIsValidating(true);
    try {
      const isValid = validateKeyPair(privateKey, publicKey);
      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          validation: "Private key does not match public key",
        }));
        return false;
      }
      return true;
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        validation: "Error validating key pair",
      }));
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = await validateKeys();
    if (isValid) {
      onKeysValidated();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Step 1: Enter Wallet Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="publicKey"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Public Key
          </label>
          <input
            type="text"
            id="publicKey"
            value={publicKey}
            onChange={(e) => {
              setPublicKey(e.target.value);
              if (errors.publicKey) {
                setErrors((prev) => ({
                  ...prev,
                  publicKey: undefined,
                }));
              }
            }}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.publicKey
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="0x1234... (42 characters)"
            required
          />
          {errors.publicKey && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.publicKey}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="privateKey"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Private Key
          </label>
          <input
            type="password"
            id="privateKey"
            value={privateKey}
            onChange={(e) => {
              setPrivateKey(e.target.value);
              if (errors.privateKey) {
                setErrors((prev) => ({
                  ...prev,
                  privateKey: undefined,
                }));
              }
            }}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white ${
              errors.privateKey
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
            placeholder="Enter your wallet's private key (64 hex characters)"
            required
          />
          {errors.privateKey && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.privateKey}
            </p>
          )}
        </div>
        {errors.validation && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">
              {errors.validation}
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={isValidating}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isValidating ? "Validating Keys..." : "Continue to Step 2"}
        </button>
      </form>
    </div>
  );
}
