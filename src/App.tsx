import { useEffect, useState } from 'react';
import { WalletConnection } from './components/WalletConnection';
import { Wallet, ArrowDownUp, LayoutGrid } from 'lucide-react';
import { AssetsOverview } from './components/AssetsOverview';
import { SwapForm } from './components/SwapForm';
import { Connection, VersionedTransaction } from '@solana/web3.js';

function App() {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>();
  const [activeTab, setActiveTab] = useState<'assets' | 'send' | 'swap' | 'history'>('assets');
  

  const connectWallet = async () => {
    try {
      const { solana } = window as any;
      if (!solana?.isPhantom) {
        window.open('https://phantom.app/', '_blank');
        return;
      }
      const response = await solana.connect();
      setPublicKey(response.publicKey.toString());
      setConnected(true);

      console.log(publicKey)

    } catch (error) {
      console.error(error);
    }
  };



  const disconnectWallet = async () => {
    try {
      const { solana } = window as any;
      if (solana) {
        await solana.disconnect();
        setConnected(false);
        setPublicKey(undefined);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      connectWallet();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const swapHandler = async (fromAmount: number, _toAmount: number) => {
    if (!publicKey) throw new Error("Wallet not connected");

    const fromToken = 'So11111111111111111111111111111111111111112';
    const toToken = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // ← USDC Mint
    const lamports = Math.round(fromAmount * 1e9);
    const connection = new Connection(`https://rpc.helius.xyz/?api-key=${import.meta.env.VITE_HELIUS_API_KEY}`, "confirmed");

    try {
      const quoteRes = await fetch(`https://quote-api.jup.ag/v6/quote?inputMint=${fromToken}&outputMint=${toToken}&amount=${lamports}&slippageBps=100`);
      const quote = await quoteRes.json();

      const swapRes = await fetch("https://quote-api.jup.ag/v6/swap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quoteResponse: quote, // ✅ Correct!
          userPublicKey: publicKey,
          wrapUnwrapSOL: true,
          dynamicComputeUnitLimit: true,
          prioritizationFeeLamports: 10000
        })
      });

      const { swapTransaction } = await swapRes.json();
      if (!swapTransaction) throw new Error("No transaction returned");

      const txBuffer = Buffer.from(swapTransaction, 'base64');
      const transaction = VersionedTransaction.deserialize(txBuffer);

      const { solana } = window as any;
      if (!solana?.isPhantom) throw new Error("Phantom wallet not found");

      const signedTx = await solana.signTransaction(transaction);
      const txSignature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(txSignature, "confirmed");

      console.log("✅ Swap successful:", txSignature);
      alert(`Swap completed: ${txSignature}`);
    } catch (error: any) {
      console.error("Swap error:", error);
      alert(error?.message || "Swap failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="w-8 h-8 text-purple-500" />
            <h1 className="text-xl font-bold">Phantom Interface</h1>
          </div>
          <WalletConnection isConnected={connected} onConnect={connectWallet} onDisconnect={disconnectWallet} publicKey={publicKey} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {!connected ? (
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-bold mb-4">Connect your Phantom Wallet</h2>
            <button onClick={connectWallet} className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:opacity-90 transition-all">
              Connect Wallet
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex gap-4 border-b border-gray-800">
         
              <button
                onClick={() => setActiveTab('assets')}
                className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'assets' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
              >
                <LayoutGrid className="w-4 h-4" />
                Assets
              </button>
              <button
                onClick={() => setActiveTab('swap')}
                className={`px-4 py-2 flex items-center gap-2 ${activeTab === 'swap' ? 'border-b-2 border-purple-500 text-purple-500' : 'text-gray-400'}`}
              >
                <ArrowDownUp className="w-4 h-4" />
                Swap SOL to USDC
              </button>
          
            </div>

            <div className="mt-8">
              {activeTab === 'assets' && <AssetsOverview publicKey={publicKey} />}

              {activeTab === 'swap' && (
                <div className="max-w-md mx-auto">
                  <SwapForm onSwap={swapHandler} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;