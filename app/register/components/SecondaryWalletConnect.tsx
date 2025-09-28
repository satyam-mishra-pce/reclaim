"use client";

import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectWallet } from "@/components/shared/ConnectWallet";
import { useWeb3Modal } from "@web3modal/wagmi/react";

interface SecondaryWalletConnectProps {
  onWalletConnected: (publicKey: string) => void;
  onError: (error: string) => void;
}

export function SecondaryWalletConnect({
  onWalletConnected,
  onError,
}: SecondaryWalletConnectProps) {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    try {
      open();
    } catch (error) {
      console.error("Connection error:", error);
      onError("Failed to connect secondary wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConfirm = () => {
    if (address) {
      onWalletConnected(address);
    }
  };

  const handleDisconnect = () => {
    disconnect();
  };

  if (!isConnected) {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Connect Secondary Wallet
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            This wallet will help you recover your primary wallet in combination
            with Self.xyz or alone.
          </p>
        </div>

        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Secondary Wallet Connected
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          Address: <span className="font-mono text-xs">{address}</span>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          This wallet will be used to encrypt a share of your backup key.
        </p>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleConfirm}
          className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
        >
          Confirm & Continue
        </button>
        <button
          onClick={handleDisconnect}
          className="flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
}
