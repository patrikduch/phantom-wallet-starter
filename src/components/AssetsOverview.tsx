import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Connection, PublicKey } from '@solana/web3.js';
import { Eye, EyeOff } from 'lucide-react';

interface Token {
  symbol: string;
  name: string;
  balance: number;
  value: number;
  logoUrl: string;
}

interface AssetsOverviewProps {
  publicKey?: string;
}

export const AssetsOverview: React.FC<AssetsOverviewProps> = ({ publicKey }) => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [price, setPrice] = useState<number | null>(null);
  const [hideBalances, setHideBalances] = useState(true);

  useEffect(() => {
    const fetchSolanaPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd'
        );
        setPrice(response.data.solana.usd);
      } catch {
        // handle error silently or log
      }
    };

    fetchSolanaPrice();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!publicKey || !price) return;

      const connection = new Connection(
        `https://rpc.helius.xyz/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`,
        'confirmed'
      );

      const balanceLamports = await connection.getBalance(new PublicKey(publicKey));
      const solBalance = balanceLamports / 1e9;

      const solToken: Token = {
        symbol: 'SOL',
        name: 'Solana',
        balance: solBalance,
        value: solBalance * price,
        logoUrl: '/solana-logo.png'
      };

      setTokens([solToken]);
    };

    fetchBalance();
  }, [publicKey, price]);

  const formatLargeNumber = (num: number) => {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl">
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Your Assets</h2>
          <button
            onClick={() => setHideBalances(!hideBalances)}
            className="text-gray-400 hover:text-white transition"
            aria-label="Toggle balance visibility"
          >
            {hideBalances ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="divide-y divide-gray-700">
          {tokens.map((token) => (
            <div key={token.symbol} className="p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={token.logoUrl}
                    alt={token.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{token.name}</h3>
                    <p className="text-sm text-gray-400">{token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${hideBalances ? 'blur-sm select-none' : ''}`}>
                    {token.symbol === 'SOL'
                      ? token.balance.toLocaleString(undefined, {
                          minimumFractionDigits: 4,
                          maximumFractionDigits: 9,
                        })
                      : formatLargeNumber(token.value)}
                  </p>
                  <p className={`text-sm text-gray-400 ${hideBalances ? 'blur-sm select-none' : ''}`}>
                    {token.balance.toLocaleString()} {token.symbol}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
