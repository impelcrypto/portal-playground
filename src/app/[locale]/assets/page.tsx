'use client';

import { Transfer } from '@/components/transfer/Transfer';
import { useEffect } from 'react';
import { http, createPublicClient } from 'viem';
import { mainnet } from 'viem/chains';
import './assets.scss';

export default function Assets() {
	const client = createPublicClient({
		chain: mainnet,
		transport: http(),
	});

	useEffect(() => {
		(async () => {
			const blockNumber = await client.getBlockNumber();
			console.log('blockNumber', blockNumber);
		})();
	}, [client]);

	return (
		<div className='wrapper--center'>
			<Transfer />
			{/* <div>this is assets page</div> */}
		</div>
	);
}
