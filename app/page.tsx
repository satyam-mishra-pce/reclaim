import { ConnectWallet } from "@/components/ConnectWallet";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Reclaim App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Connect your wallet to get started with Celo
        </p>
        <ConnectWallet />
      </div>
    </div>
  );
}
