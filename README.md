# phantom-wallet-starter

Example of FE connector to a Phantom wallet.

## Features

- Connect to Phantom wallet
- Perform a basic SOL → USDC token swap
- UI with live feedback and toast notifications
- Uses Jupiter API for on-chain pricing and routing

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Phantom Wallet Adapter
- Jupiter Aggregator API
- react-hot-toast for notifications

## Third-party dependencies

- `@jup-ag/core` – Jupiter Aggregator SDK
- `@solana/web3.js` – Solana Web3 SDK
- `@solana/wallet-adapter-react` – React wallet hooks
- `@solana/wallet-adapter-wallets` – Wallet list including Phantom
- `clsx` – Conditional class utility
- `lucide-react` – Icons
- `react-hot-toast` – Toast notifications
- `tailwindcss` – Utility-first CSS framework

## Setup

```bash
git clone https://github.com/patrikduch/phantom-wallet-starter.git
cd phantom-wallet-starter
npm install
npm run dev