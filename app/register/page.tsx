"use client";

import { useState } from "react";
import { generateBackupKey } from "@/lib/crypto";
import { WalletKeyInput } from "./components/WalletKeyInput";
import { BackupMethodSelection } from "./components/BackupMethodSelection";
import { BackupSetup } from "./components/BackupSetup";
import { BackupFinalization } from "./components/BackupFinalization";
import Link from "next/link";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [backupMethod, setBackupMethod] = useState<
    "secondary" | "self" | "both" | null
  >(null);
  const [backupKey, setBackupKey] = useState<Uint8Array | null>(null);
  const [secondaryWalletAddress, setSecondaryWalletAddress] = useState<
    string | null
  >(null);
  const [selfDeviceKey, setSelfDeviceKey] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [publicKey, setPublicKey] = useState("");

  const handleKeysValidated = () => {
    setStep(2);
  };

  const handleMethodSelected = (method: "secondary" | "self" | "both") => {
    setBackupMethod(method);
  };

  const handleMethodNext = () => {
    if (backupMethod) {
      // Generate backup key
      const newBackupKey = generateBackupKey();
      setBackupKey(newBackupKey);
      console.log("Backup method selected:", backupMethod);
      console.log("Generated backup key:", newBackupKey);
      setStep(3);
    }
  };

  const handleSecondaryWalletConnected = (address: string) => {
    setSecondaryWalletAddress(address);
    console.log("Secondary wallet connected:", address);

    // If only secondary wallet is selected, proceed to finalization
    if (backupMethod === "secondary") {
      setStep(4);
    }
  };

  const handleSelfConnected = (deviceKey: string) => {
    setSelfDeviceKey(deviceKey);
    console.log("Self.xyz connected:", { deviceKey });

    // If only Self is selected, proceed to finalization
    if (backupMethod === "self") {
      setStep(4);
    }
  };

  const handleBothMethodsComplete = () => {
    // Check if both methods are complete
    if (secondaryWalletAddress && selfDeviceKey) {
      setStep(4);
    }
  };

  const handleBackupComplete = () => {
    setIsProcessing(true);
    // TODO: Implement actual storage logic
    setTimeout(() => {
      alert(
        "Wallet backup completed successfully! Your wallet is now protected."
      );
      setIsProcessing(false);
    }, 2000);
  };

  const handleError = (error: string) => {
    console.error("Backup error:", error);
    // You could show a toast notification here
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      // Reset wallet connection state for "both" method when going back
      if (backupMethod === "both") {
        setSecondaryWalletAddress(null);
        setSelfDeviceKey(null);
      }
      setStep(2);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Register Wallet for Recovery
          </h1>

          {step === 1 && (
            <WalletKeyInput onKeysValidated={handleKeysValidated} />
          )}

          {step === 2 && (
            <BackupMethodSelection
              selectedMethod={backupMethod}
              onMethodSelect={handleMethodSelected}
              onNext={handleMethodNext}
              onBack={handleBack}
            />
          )}

          {step === 3 && (
            <BackupSetup
              backupMethod={backupMethod!}
              secondaryWalletAddress={secondaryWalletAddress}
              selfDeviceKey={selfDeviceKey}
              onSecondaryWalletConnected={handleSecondaryWalletConnected}
              onSelfConnected={handleSelfConnected}
              onError={handleError}
              onBack={handleBack}
              onBothComplete={handleBothMethodsComplete}
            />
          )}

          {step === 4 && (
            <BackupFinalization
              publicKey={publicKey}
              backupMethod={backupMethod!}
              secondaryWalletAddress={secondaryWalletAddress}
              selfDeviceKey={selfDeviceKey}
              isProcessing={isProcessing}
              onComplete={handleBackupComplete}
            />
          )}

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
