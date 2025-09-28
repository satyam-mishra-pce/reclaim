"use client";

import { useState } from "react";
import { ConnectWallet } from "@/components/ConnectWallet";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [publicKey, setPublicKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [backupMethod, setBackupMethod] = useState<
    "secondary" | "self" | "both" | null
  >(null);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (publicKey && privateKey) {
      setStep(2);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (backupMethod) {
      // TODO: Process wallet registration
      console.log("Registering wallet with backup method:", backupMethod);
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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Step 1: Enter Wallet Details
              </h2>
              <form onSubmit={handleStep1Submit} className="space-y-4">
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
                    onChange={(e) => setPublicKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your wallet's public key"
                    required
                  />
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
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your wallet's private key"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Continue to Step 2
                </button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Step 2: Choose Backup Method
              </h2>
              <form onSubmit={handleStep2Submit} className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="backupMethod"
                      value="secondary"
                      checked={backupMethod === "secondary"}
                      onChange={(e) =>
                        setBackupMethod(e.target.value as "secondary")
                      }
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        A. Using a Secondary Wallet
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Use another wallet as a backup for recovery
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="backupMethod"
                      value="self"
                      checked={backupMethod === "self"}
                      onChange={(e) =>
                        setBackupMethod(e.target.value as "self")
                      }
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        B. Using Self.xyz
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Use Self.xyz for decentralized identity and recovery
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                    <input
                      type="radio"
                      name="backupMethod"
                      value="both"
                      checked={backupMethod === "both"}
                      onChange={(e) =>
                        setBackupMethod(e.target.value as "both")
                      }
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        C. Both Methods
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Use both secondary wallet and Self.xyz for maximum
                        security
                      </div>
                    </div>
                  </label>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={!backupMethod}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Register Wallet
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
