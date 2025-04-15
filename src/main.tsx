import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';

import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';

import { clusterApiUrl } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Toaster } from 'react-hot-toast';
const wallets = [new PhantomWalletAdapter()];
const endpoint = clusterApiUrl('mainnet-beta');

createRoot(document.getElementById('root')!).render(
  <ConnectionProvider endpoint={endpoint}>
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <StrictMode>
          <App />
          <Toaster position="top-right" />
        </StrictMode>
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
);
