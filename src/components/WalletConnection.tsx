import React, { useState } from 'react';
import { Wallet, Copy, Check } from 'lucide-react';

interface WalletConnectionProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  publicKey?: string;
}

export const WalletConnection: React.FC<WalletConnectionProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
  publicKey,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center">
      {!isConnected ? (
        <button
          onClick={onConnect}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white hover:opacity-90 transition-all"
        >
          <Wallet className="w-5 h-5" />
          Connect Phantom
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 font-mono text-sm">
              {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
            </div>
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title={copied ? "Copied!" : "Copy address"}
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
              )}
            </button>
          </div>
          <button
            onClick={onDisconnect}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};