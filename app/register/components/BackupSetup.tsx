"use client";

import { SecondaryWalletConnect } from "./SecondaryWalletConnect";
import { SelfIntegration } from "./SelfIntegration";

interface BackupSetupProps {
  backupMethod: "secondary" | "self" | "both";
  secondaryWalletAddress: string | null;
  selfDeviceKey: string | null;
  onSecondaryWalletConnected: (address: string) => void;
  onSelfConnected: (deviceKey: string) => void;
  onError: (error: string) => void;
  onBack: () => void;
  onBothComplete: () => void;
}

export function BackupSetup({
  backupMethod,
  secondaryWalletAddress,
  selfDeviceKey,
  onSecondaryWalletConnected,
  onSelfConnected,
  onError,
  onBack,
  onBothComplete,
}: BackupSetupProps) {
  if (backupMethod === "secondary") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Step 3: Setup Secondary Wallet
        </h2>
        <SecondaryWalletConnect
          onWalletConnected={onSecondaryWalletConnected}
          onError={onError}
        />
        <div className="mt-6 flex justify-between">
          <button
            onClick={onBack}
            className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  if (backupMethod === "self") {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Step 3: Setup Self.xyz
        </h2>
        <SelfIntegration onSelfConnected={onSelfConnected} onError={onError} />
        <div className="mt-6 flex justify-between">
          <button
            onClick={onBack}
            className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  // Both method
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Step 3: Setup Backup Methods
      </h2>

      <div className="space-y-8">
        {!secondaryWalletAddress ? (
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Step 1: Connect Secondary Wallet
            </h3>
            <SecondaryWalletConnect
              onWalletConnected={onSecondaryWalletConnected}
              onError={onError}
            />
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Step 2: Connect with Self.xyz
            </h3>
            <SelfIntegration
              onSelfConnected={onSelfConnected}
              onError={onError}
              encS_w2="mock_encrypted_share_w2_data"
            />
          </div>
        )}

        {secondaryWalletAddress && selfDeviceKey && (
          <div className="text-center">
            <button
              onClick={onBothComplete}
              className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              Continue to Finalization
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => {
            // Reset wallet connection state for "both" method when going back
            onBack();
          }}
          className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Back
        </button>
      </div>
    </div>
  );
}
