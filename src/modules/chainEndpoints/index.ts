import type { Chain } from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';

export const astarEvm = {
	id: 592,
	name: 'Astar EVM',
	iconUrl:
		'https://github.com/AstarNetwork/astar-apps/blob/main/src/assets/img/chain/astar.png?raw=true',
	iconBackground: '#fff',
	nativeCurrency: { name: 'ASTR', symbol: 'ASTR', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://evm.astar.network'] },
	},
	blockExplorers: {
		default: { name: 'Blockscout', url: 'https://blockscout.com/astar' },
	},
} as const satisfies Chain;

export const astarZkEvm = {
	id: 3776,
	name: 'Astar ZkEVM',
	iconUrl:
		'https://github.com/AstarNetwork/astar-apps/blob/main/src/assets/img/chain/zkatana-logo.png?raw=true',
	iconBackground: '#fff',
	nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://rpc.startale.com/astar-zkevm'] },
	},
	blockExplorers: {
		default: {
			name: 'Blockscout',
			url: 'https://astar-zkevm.explorer.startale.com',
		},
	},
} as const satisfies Chain;

export const zKyoto = {
	id: 6038361,
	name: 'zKyoto Testnet',
	iconUrl:
		'https://github.com/AstarNetwork/astar-apps/blob/main/src/assets/img/chain/zkatana-logo.png?raw=true',
	iconBackground: '#fff',
	nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://rpc.startale.com/zkyoto'] },
	},
	blockExplorers: {
		default: {
			name: 'Blockscout',
			url: 'https://zkyoto.explorer.startale.com',
		},
	},
} as const satisfies Chain;

export const sepoliaTestnet = {
	...sepolia,
	rpcUrls: {
		default: { http: ['https://sepolia-01.astar.network'] },
	},
} as const satisfies Chain;
