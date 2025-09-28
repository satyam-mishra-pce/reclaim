"use client";

import { useState } from "react";
import { ConnectWallet } from "@/components/ConnectWallet";

export default function RecoverPage() {
  const [recoveryMethod, setRecoveryMethod] = useState<
    "secondary" | "self" | null
  >(null);

  const handleRecoverySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (recoveryMethod) {
      // TODO: Process wallet recovery
      console.log("Recovering wallet using method:", recoveryMethod);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Recover Your Wallet
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Choose Recovery Method
            </h2>
            <form onSubmit={handleRecoverySubmit} className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="recoveryMethod"
                    value="secondary"
                    checked={recoveryMethod === "secondary"}
                    onChange={(e) =>
                      setRecoveryMethod(e.target.value as "secondary")
                    }
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Using Secondary Wallet
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Recover using your backup secondary wallet
                    </div>
                  </div>
                </label>

                <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="radio"
                    name="recoveryMethod"
                    value="self"
                    checked={recoveryMethod === "self"}
                    onChange={(e) =>
                      setRecoveryMethod(e.target.value as "self")
                    }
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      Using Self.xyz
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Recover using your Self.xyz identity
                    </div>
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={!recoveryMethod}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Start Recovery Process
              </button>
            </form>
          </div>

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
