import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage, http } from "wagmi";
import { celo, celoAlfajores, celoSepolia } from "viem/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const DEV_CHAINS = [celo] as const;
const PROD_CHAINS = [celo] as const;
export const SUPPORTED_CHAINS =
  process.env.NEXT_PUBLIC_DEPLOY_ENV === "production"
    ? PROD_CHAINS
    : DEV_CHAINS;

const metadata = {
  name: "Reclaim",
  description:
    "Secure wallet recovery solution - register and recover your crypto wallets",
  url: process.env.NEXT_PUBLIC_BASE_URL ?? "", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/46801808"],
};

// Create wagmiConfig
export const config = defaultWagmiConfig({
  chains: SUPPORTED_CHAINS, // required
  projectId, // required
  metadata, // required
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
