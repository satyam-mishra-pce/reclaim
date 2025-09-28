import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center max-w-2xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Reclaim App
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          Secure wallet recovery solution - register and recover your crypto
          wallets
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            href="/register"
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-6xl mb-4">🔐</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Register Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Set up recovery for your wallet using secondary wallet or Self.xyz
            </p>
            <div className="text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
              Get Started →
            </div>
          </Link>

          <Link
            href="/recover"
            className="group bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="text-6xl mb-4">🔓</div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              Recover Wallet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Recover your lost wallet using your backup methods
            </p>
            <div className="text-green-600 dark:text-green-400 font-medium group-hover:underline">
              Start Recovery →
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
