"use client";

import { useState, useEffect } from "react";
import { generateNullifier } from "@/lib/crypto";
import SelfXYZVerificationStep1 from "./SelfVerification";

interface SelfIntegrationProps {
  onSelfConnected: (devicePublicKey: string) => void;
  onError: (error: string) => void;
  encS_w2?: string;
}

export function SelfIntegration({
  onSelfConnected,
  onError,
  encS_w2,
}: SelfIntegrationProps) {
  const [qrCodeData, setQrCodeData] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Generate QR code data with enc_S_w2 if provided
    const userDefinedData = encS_w2
      ? `I am backing up my wallet ${JSON.stringify({ enc_S_w2: encS_w2 })}`
      : "I am backing up my wallet";

    const qrData = JSON.stringify({
      action: "backup_authorization",
      timestamp: Date.now(),
      backend_url: "https://api.reclaim-app.com",
      userDefinedData,
    });
    setQrCodeData(qrData);
  }, [encS_w2]);

  const handleSimulateConnection = () => {
    setIsGenerating(true);

    // Simulate Self.xyz connection process
    setTimeout(() => {
      // Mock device public key generation
      const mockDevicePublicKey =
        "0x" +
        Array.from({ length: 64 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join("");

      setIsConnected(true);
      onSelfConnected(mockDevicePublicKey);
      setIsGenerating(false);
    }, 2000);
  };

  if (isConnected) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Self.xyz Connected
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your Self.xyz identity has been verified and will hold a share of
            your backup key.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Connect with Self.xyz
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Sign a message and scan the QR code with your Self app to authorize
          backup.
        </p>
      </div>

      {/* Self.xyz QR Code Component */}
      <div className="flex justify-center">
        <SelfXYZVerificationStep1
          onSuccess={handleSimulateConnection}
          userDefinedData={
            encS_w2
              ? `I am backing up my wallet ${JSON.stringify({
                  enc_S_w2: encS_w2,
                })}`
              : "I am backing up my wallet"
          }
        />
      </div>
    </div>
  );
}
