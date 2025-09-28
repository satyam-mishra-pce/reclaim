"use client";

import { useState } from "react";
import { RecoveryMethodSelection } from "./components/RecoveryMethodSelection";

export default function RecoverPage() {
  const [recoveryMethod, setRecoveryMethod] = useState<
    "secondary" | "self" | null
  >(null);

  const handleMethodSelect = (method: "secondary" | "self") => {
    setRecoveryMethod(method);
  };

  const handleRecoveryStart = () => {
    if (recoveryMethod) {
      // TODO: Process wallet recovery
      console.log("Recovering wallet using method:", recoveryMethod);
      alert(`Recovery process started with ${recoveryMethod} method!`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Recover Your Wallet
          </h1>

          <RecoveryMethodSelection
            selectedMethod={recoveryMethod}
            onMethodSelect={handleMethodSelect}
            onNext={handleRecoveryStart}
          />

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
