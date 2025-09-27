"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";

export function ConnectWallet() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connected to:
          </p>
          <p className="font-mono text-sm break-all">{address}</p>
        </div>
        <button
          onClick={() => disconnect()}
          className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors"
        >
          Disconnect Wallet
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-lg"
    >
      Connect Wallet
    </button>
  );
}
