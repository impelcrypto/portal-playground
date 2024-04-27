'use client';

import { useEffect } from 'react';
import './assets.scss';
import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { Transfer } from '@/components/transfer/Transfer';

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
    <div className="wrapper--center">
      <Transfer />
      {/* <div>this is assets page</div> */}
    </div>
  );
}
