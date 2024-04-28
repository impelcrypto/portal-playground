export * from './utils';

export enum EVM {
	ETHEREUM_MAINNET = 1,
	SEPOLIA_TESTNET = 11155111,
}

export const RPC_URLS = {
	[EVM.ETHEREUM_MAINNET]: 'https://eth.public-rpc.com',
	[EVM.SEPOLIA_TESTNET]: 'https://sepolia-01.astar.network',
} as const;
