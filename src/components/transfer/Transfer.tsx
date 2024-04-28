import { useEffect } from 'react';
import { parseEther } from 'viem';
import {
	type BaseError,
	useSendTransaction,
	useWaitForTransactionReceipt,
} from 'wagmi';
import './transfer.scss';

export const Transfer = (): JSX.Element => {
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

	const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const to = formData.get('address') as `0x${string}`;
		const value = formData.get('value') as string;
		sendTransaction({ to, value: parseEther(value) });
	};

	return (
		<>
			<form onSubmit={submit}>
				<input name='address' placeholder='0xA0Cf…251e' required />
				<br />
				<input name='value' placeholder='0.05' required />
				<br />
				<button disabled={isPending} type='submit'>
					{isPending ? 'Confirming...' : 'Send'}
				</button>
				{hash && <div>Transaction Hash: {hash}</div>}
				{isConfirming && <div>Waiting for confirmation...</div>}
				{isConfirmed && <div>Transaction confirmed.</div>}
				{error && (
					<div>Error: {(error as BaseError).shortMessage || error.message}</div>
				)}
			</form>
			{/* <button onClick={sendErc20}>send ERC20</button>
      <div>
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
        {error && <div>Error: {(error as BaseError).shortMessage || error.message}</div>}
      <div>Cat token balance: {balance?.toString()}</div> */}
		</>
	);
};
