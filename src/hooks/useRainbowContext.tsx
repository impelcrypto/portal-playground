'use client';

import '@rainbow-me/rainbowkit/styles.css';
import { createContext, useContext } from 'react';
import { astarEvm, astarZkEvm, sepoliaTestnet, zKyoto } from '@/modules/chainEndpoints';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';

const config = getDefaultConfig({
  appName: 'Portal dApp',
  projectId: process.env.NEXT_PUBLIC_WC_ID || '',
  chains: [astarEvm, astarZkEvm, zKyoto, mainnet, sepoliaTestnet],
  ssr: true,
});

const client = new QueryClient();

// Todo: update the states if necessary
interface RainbowContextType {}
const defaultRainbowContext: RainbowContextType = {};
const RainbowContext = createContext<RainbowContextType>(defaultRainbowContext);

export const RainbowProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  return (
    <RainbowContext.Provider value={{}}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={client}>
          <RainbowKitProvider showRecentTransactions={true}>{children}</RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </RainbowContext.Provider>
  );
};

export const useOnboard = () => useContext(RainbowContext);
