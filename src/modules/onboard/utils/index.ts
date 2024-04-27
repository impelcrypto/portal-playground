import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import { EVM, RPC_URLS } from '@/modules/onboard';
import { LOCAL_STORAGE } from '@/modules/local-storage';

export const getOnboardInstance = async () => {
  const injected = injectedModule();

  return Onboard({
    wallets: [injected],
    chains: [
      {
        id: EVM.ETHEREUM_MAINNET,
        token: 'ETH',
        label: 'Ethereum Mainnet',
        rpcUrl: RPC_URLS[EVM.ETHEREUM_MAINNET],
      },
      {
        id: EVM.SEPOLIA_TESTNET,
        token: 'ETH',
        label: 'Sepolia Testnet',
        rpcUrl: RPC_URLS[EVM.SEPOLIA_TESTNET],
      },
    ],
    connect: {
      autoConnectLastWallet: true,
      // showSidebar: false,
    },
    // theme: 'dark',
    accountCenter: {
      desktop: {
        position: 'topRight',
        enabled: false,
        minimal: false,
      },
      mobile: {
        position: 'topRight',
        enabled: false,
        minimal: false,
      },
    },
  });
};
