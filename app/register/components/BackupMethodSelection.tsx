"use client";

interface BackupMethodSelectionProps {
  selectedMethod: "secondary" | "self" | "both" | null;
  onMethodSelect: (method: "secondary" | "self" | "both") => void;
  onNext: () => void;
  onBack: () => void;
}

export function BackupMethodSelection({
  selectedMethod,
  onMethodSelect,
  onNext,
  onBack,
}: BackupMethodSelectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Step 2: Choose Backup Method
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNext();
        }}
        className="space-y-4"
      >
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
            <input
              type="radio"
              name="backupMethod"
              value="secondary"
              checked={selectedMethod === "secondary"}
              onChange={(e) => onMethodSelect(e.target.value as "secondary")}
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
              checked={selectedMethod === "self"}
              onChange={(e) => onMethodSelect(e.target.value as "self")}
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
              checked={selectedMethod === "both"}
              onChange={(e) => onMethodSelect(e.target.value as "both")}
              className="mr-3"
            />
            <div>
              <div className="font-medium text-gray-900 dark:text-white">
                C. Both Methods
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Use both secondary wallet and Self.xyz for maximum security
              </div>
            </div>
          </label>
        </div>

        <div className="flex space-x-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!selectedMethod}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Register Wallet
          </button>
        </div>
      </form>
    </div>
  );
}
