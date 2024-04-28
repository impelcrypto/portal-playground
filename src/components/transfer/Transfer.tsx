import { useAntdContext } from '@/hooks/antdContext';
import { Button, Input } from 'antd';
import { useState } from 'react';
import { isAddress, parseEther } from 'viem';
import {
	type BaseError,
	useClient,
	useSendTransaction,
	useWaitForTransactionReceipt,
} from 'wagmi';
import './transfer.scss';

export const Transfer = (): JSX.Element => {
	const [toAddress, setToAddress] = useState<string>('');
	const [amount, setAmount] = useState<number>(0);
	const {
		data: hash,
		sendTransaction,
		isPending,
		error,
	} = useSendTransaction();

	const { isLoading: isConfirming, isSuccess: isConfirmed } =
		useWaitForTransactionReceipt({
			hash,
		});

	const client = useClient();
	const nativeToken = client?.chain.nativeCurrency.symbol;
	const { openNotification } = useAntdContext();

	// const { address } = useAccount();
	// const { data: erc20Hash, writeContractAsync, isPending, error } = useWriteContract();
	// const catToken = '0x3Fe1220e5CB4cED5747245191CF0c4a2786dF4D3';
	// const wagmiContractConfig = {
	//   chainId: zKyoto.id,
	// };

	// const { data: balance } = useReadContract({
	//   ...wagmiContractConfig,
	//   // chainId: zKyoto.id,
	//   address: catToken,
	//   functionName: 'balanceOf',
	//   abi: erc20Abi,
	//   args: [address || '0x'],
	// });

	// const sendErc20 = async (): Promise<void> => {
	//   console.log('accountData', accountData);
	//   // await connectAsync({ chainId: zKyoto.id, connector: injected() });
	//   const amount = 1;
	//   const toAddress = '0xb680c8F33f058163185AB6121F7582BAb57Ef8a7';

	//   const data = await writeContractAsync({
	//     chainId: zKyoto.id,
	//     address: catToken,
	//     functionName: 'transfer',
	//     abi: erc20Abi,
	//     args: [toAddress, parseUnits(String(amount), 18)],
	//   });
	// };

	const sendNativeToken = async (): Promise<void> => {
		try {
			if (!isAddress(toAddress)) {
				throw Error('Invalid address');
			}
			sendTransaction({ to: toAddress, value: parseEther(String(amount)) });
		} catch (error: any) {
			openNotification('topRight', 'Error', error.message);
		}
	};

	return (
		<>
			<div>
				<Input
					name='address'
					placeholder='0xA0Cf…251e'
					required
					onChange={(e) => setToAddress(e.target.value)}
				/>
				<br />
				<br />
				<Input
					name='value'
					placeholder='0.05'
					required
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
				<br />
				<br />
				<Button disabled={isPending} type='primary' onClick={sendNativeToken}>
					{isPending ? 'Confirming...' : `Send ${nativeToken}`}
				</Button>
				{hash && <div>Transaction Hash: {hash}</div>}
				{isConfirming && <div>Waiting for confirmation...</div>}
				{isConfirmed && <div>Transaction confirmed.</div>}
				{error && (
					<div>Error: {(error as BaseError).shortMessage || error.message}</div>
				)}
			</div>
			{/* <button onClick={sendErc20}>send ERC20</button>
      <div>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
      <div>Cat token balance: {balance?.toString()}</div> */}
		</>
	);
};
