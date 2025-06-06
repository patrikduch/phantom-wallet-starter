# phantom-wallet-starter

Example of a frontend connector to a Phantom wallet.

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

## Third-party Dependencies

- `@jup-ag/core` – Jupiter Aggregator SDK
- `@solana/web3.js` – Solana Web3 SDK
- `@solana/wallet-adapter-react` – React wallet hooks
- `@solana/wallet-adapter-wallets` – Wallet list including Phantom
- `clsx` – Conditional class utility
- `lucide-react` – Icons
- `react-hot-toast` – Toast notifications
- `tailwindcss` – Utility-first CSS framework

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/patrikduch/phantom-wallet-starter.git
   cd phantom-wallet-starter
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create the `.env` file**:

   Copy the example environment file and fill in any required values.

   ```bash
   cp .env.example .env
   ```

   > Make sure to edit `.env` and provide any required values such as RPC URLs or API keys.

4. **Start the development server**:

   ```bash
   npm run dev
   ```

5. **Open in browser**:

   Visit [http://localhost:3000](http://localhost:3000) to view the app.
