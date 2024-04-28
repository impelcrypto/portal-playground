import type { Chain } from '@rainbow-me/rainbowkit';
import { http, createPublicClient } from 'viem';

export const getPublicClient = (chain: Chain) => {
	return createPublicClient({
		chain,
		transport: http(),
	});
};
