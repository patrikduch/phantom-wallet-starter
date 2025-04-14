export {};

declare global {
  interface Window {
    phantom?: {
      solana?: {
        connect(): Promise<{ publicKey: { toString(): string } }>;
        disconnect(): Promise<void>;
        isConnected: boolean;
        isPhantom?: boolean;
        publicKey: { toString(): string } | null;
        on(event: string, callback: (args: any) => void): void;
        request(params: { method: string; params: any }): Promise<any>;
      };
    };
  }
}