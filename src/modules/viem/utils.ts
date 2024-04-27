import { Chain } from '@rainbow-me/rainbowkit';
import { createPublicClient, http } from 'viem';

export const getPublicClient = (chain: Chain) => {
  return createPublicClient({
    chain,
    transport: http(),
  });
};
