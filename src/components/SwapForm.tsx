import React, { useState } from 'react';
import { ArrowDownUp, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';
import toast from 'react-hot-toast';

interface SwapFormProps {
  onSwap: (fromAmount: number, toAmount: number) => Promise<void>;
}

export const SwapForm: React.FC<SwapFormProps> = ({ onSwap }) => {
  const [fromAmount, setFromAmount] = useState('0.002');
  const [toAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSwap = async () => {
    setLoading(true);

    const loadingToast = toast.loading('Swapping in progress...');

    try {
      await onSwap(parseFloat(fromAmount), parseFloat(toAmount));
      toast.success('Swap submitted successfully!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Swap failed.');
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSwap();
      }}
      className="space-y-4"
    >
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">From</label>
          <span className="text-sm text-gray-400">SOL</span>
        </div>
        <div className="flex gap-4">
          <input
            type="number"
            value={fromAmount}
            onChange={(e) => setFromAmount(e.target.value)}
            className="flex-1 bg-transparent text-2xl outline-none"
            placeholder="0.0"
            step="0.000000001"
            min="0"
            required
          />
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg">
            <img
              src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png"
              alt="SOL"
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium">SOL</span>
          </div>
        </div>
      </div>

      <div className="flex justify-center -my-2 relative z-10">
        <button
          type="button"
          disabled
          className="bg-gray-700 p-2 rounded-lg cursor-not-allowed"
          title="Switching disabled for demo"
        >
          <ArrowDownUp className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">To</label>
          <span className="text-sm text-gray-400">USDC</span>
        </div>
        <div className="flex gap-4">
          <input
            type="text"
            value="≈ estimated on chain"
            readOnly
            className="flex-1 bg-transparent text-2xl outline-none text-gray-500"
          />
          <div className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded-lg">
            <img
              src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png"
              alt="USDC"
              className="w-6 h-6 rounded-full"
            />
            <span className="font-medium">USDC</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Price</span>
          <div className="flex items-center gap-2">
            <span className="text-sm">1 SOL ≈ dynamic USDC</span>
            <button
              type="button"
              className="p-1 hover:bg-gray-700 rounded-full transition-colors"
              onClick={() => {}}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={clsx(
          'w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white',
          'hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed'
        )}
      >
        {loading ? 'Swapping...' : 'Swap 0.002 SOL to USDC'}
      </button>
    </form>
  );
};
