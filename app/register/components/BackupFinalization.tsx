"use client";

interface BackupFinalizationProps {
  publicKey: string;
  backupMethod: "secondary" | "self" | "both";
  secondaryWalletAddress: string | null;
  selfDeviceKey: string | null;
  isProcessing: boolean;
  onComplete: () => void;
}

export function BackupFinalization({
  publicKey,
  backupMethod,
  secondaryWalletAddress,
  selfDeviceKey,
  isProcessing,
  onComplete,
}: BackupFinalizationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Step 4: Finalization & Storage
      </h2>

      <div className="space-y-4">
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
          <h3 className="font-medium text-green-800 dark:text-green-200 mb-2">
            Backup Configuration Summary
          </h3>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            <li>• Primary Wallet: {publicKey}</li>
            <li>• Backup Method: {backupMethod}</li>
            {secondaryWalletAddress && (
              <li>• Secondary Wallet: {secondaryWalletAddress}</li>
            )}
            {selfDeviceKey && <li>• Self.xyz Device Key: {selfDeviceKey}</li>}
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={onComplete}
            disabled={isProcessing}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Complete Registration"}
          </button>
        </div>
      </div>
    </div>
  );
}
