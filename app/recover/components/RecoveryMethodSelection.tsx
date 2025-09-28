"use client";

interface RecoveryMethodSelectionProps {
  selectedMethod: "secondary" | "self" | null;
  onMethodSelect: (method: "secondary" | "self") => void;
  onNext: () => void;
}

export function RecoveryMethodSelection({
  selectedMethod,
  onMethodSelect,
  onNext,
}: RecoveryMethodSelectionProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Choose Recovery Method
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
              name="recoveryMethod"
              value="secondary"
              checked={selectedMethod === "secondary"}
              onChange={(e) => onMethodSelect(e.target.value as "secondary")}
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
              checked={selectedMethod === "self"}
              onChange={(e) => onMethodSelect(e.target.value as "self")}
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
          disabled={!selectedMethod}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Start Recovery Process
        </button>
      </form>
    </div>
  );
}
