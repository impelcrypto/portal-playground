'use client';

import {
	astarEvm,
	astarZkEvm,
	sepoliaTestnet,
	zKyoto,
} from '@/modules/chainEndpoints';
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext } from 'react';
import { WagmiProvider } from 'wagmi';
import { bscTestnet, mainnet } from 'wagmi/chains';

const config = getDefaultConfig({
	appName: 'Portal dApp',
	projectId: '9761436f8aff7e7f24f34dd711430e8e',
	chains: [bscTestnet, astarEvm, astarZkEvm, zKyoto, mainnet, sepoliaTestnet],
	ssr: true,
});

const client = new QueryClient();

// biome-ignore lint/complexity/noBannedTypes: update the states if necessary
type RainbowContextType = {};
const defaultRainbowContext: RainbowContextType = {};
const RainbowContext = createContext<RainbowContextType>(defaultRainbowContext);

export const RainbowProvider = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	return (
		<RainbowContext.Provider value={{}}>
			<WagmiProvider config={config}>
				<QueryClientProvider client={client}>
					<RainbowKitProvider showRecentTransactions={true}>
						{children}
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</RainbowContext.Provider>
	);
};

export const useRainbowKit = () => useContext(RainbowContext);
