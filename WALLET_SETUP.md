# Wallet Setup Documentation

This app has been configured with wagmi and Reown (formerly WalletConnect) to support Celo mainnet and testnet.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Reown (WalletConnect) Project ID
# Get your project ID from https://cloud.reown.com/
NEXT_PUBLIC_PROJECT_ID=your_project_id_here
```

## Getting Your Project ID

1. Go to [Reown Cloud](https://cloud.reown.com/)
2. Sign up or log in to your account
3. Create a new project
4. Copy the Project ID from your project dashboard
5. Add it to your `.env.local` file

## Supported Networks

- **Celo Mainnet** (Chain ID: 42220)
- **Celo Alfajores Testnet** (Chain ID: 44787)
- **Ethereum Mainnet** (Chain ID: 1)
- **Sepolia Testnet** (Chain ID: 11155111)

## Features

- Connect wallet using Reown AppKit
- Support for multiple wallet providers
- Celo mainnet and testnet support
- Clean, responsive UI with dark mode support
- Disconnect wallet functionality

## Running the App

1. Install dependencies:

   ```bash
   bun install
   ```

2. Add your Project ID to `.env.local`

3. Start the development server:

   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Dependencies Added

- `wagmi` - React hooks for Ethereum
- `@reown/appkit` - WalletConnect AppKit for React
- `@reown/appkit-adapter-wagmi` - Wagmi adapter for AppKit
- `viem` - TypeScript interface for Ethereum
- `@celo/contractkit` - Celo blockchain utilities
