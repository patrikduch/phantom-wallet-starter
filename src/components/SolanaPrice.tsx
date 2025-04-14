import { useEffect, useState } from "react";
import axios from "axios";

const SolanaPrice = () => {
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSolanaPrice = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        setPrice(response.data.solana.usd);
      } catch (err) {
        setError("Failed to fetch price");
      } finally {
        setLoading(false);
      }
    };

    fetchSolanaPrice();
    const interval = setInterval(fetchSolanaPrice, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return <div>Solana Price: ${price}</div>;
};

export default SolanaPrice;
