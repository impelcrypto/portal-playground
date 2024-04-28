'use client';

import { LOCAL_STORAGE } from '@/modules/local-storage';
import { getOnboardInstance } from '@/modules/onboard';
import type { OnboardAPI, WalletState } from '@web3-onboard/core';
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import Web3 from 'web3';

interface OnboardContextType {
	web3: Web3 | undefined;
	address: string;
	initOnboard: () => Promise<void>;
}

const defaultOnboardContext: OnboardContextType = {
	web3: undefined,
	address: '',
	initOnboard: async () => {},
};

const OnboardContext = createContext<OnboardContextType>(defaultOnboardContext);

export const OnboardProvider = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	const [web3, setWeb3] = useState<Web3 | undefined>(undefined);
	const [onboard, setOnboard] = useState<OnboardAPI | undefined>(undefined);
	const [wallet, setWallet] = useState<WalletState | undefined>(undefined);
	const [address, setAddress] = useState('');

	const storedWallets = useMemo(() => {
		if (typeof window === 'undefined') return [];
		const walletsRaw = localStorage.getItem(LOCAL_STORAGE.SELECTED_WALLET);
		return walletsRaw ? JSON.parse(walletsRaw) : [];
	}, []);

	const initOnboard = async (): Promise<void> => {
		try {
			if (onboard) {
				const [wallet] = await onboard.connectWallet();
				const w = storedWallets[0];
				await onboard.disconnectWallet({ label: w });
				setWallet(wallet);
			} else {
				const onboardInstance = await getOnboardInstance();
				setOnboard(onboardInstance);
				const [wallet] = await onboardInstance.connectWallet();
				setOnboard(onboardInstance);
				setWallet(wallet);
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDefaultConnect = useCallback(async () => {
		try {
			if (storedWallets.length === 0 || onboard) return;
			const label = storedWallets[0];
			const onboardInstance = await getOnboardInstance();
			const [wallet] = await onboardInstance.connectWallet({
				autoSelect: {
					label,
					disableModals: true,
				},
			});
			setOnboard(onboardInstance);
			setWallet(wallet);
		} catch (error) {
			console.error(error);
		}
	}, [storedWallets, onboard]);

	const fetchAddress = useCallback(async () => {
		if (!web3) return;
		const [account] = await web3.eth.getAccounts();
		setAddress(account);
	}, [web3]);

	const updateWeb3 = useCallback(async () => {
		if (!wallet) return;
		wallet && setWeb3(new Web3(wallet.provider));
	}, [wallet]);

	useEffect(() => {
		updateWeb3();
	}, [updateWeb3]);

	useEffect(() => {
		fetchAddress();
	}, [fetchAddress]);

	useEffect(() => {
		handleDefaultConnect();
	}, [handleDefaultConnect]);

	wallet?.provider.on('accountsChanged', fetchAddress);

	// Todo: remove
	useEffect(() => {
		console.log('wallet', wallet);
	}, [wallet]);

	useEffect(() => {
		onboard && console.log('onboard.state', onboard.state.get());
	}, [onboard]);

	return (
		<OnboardContext.Provider value={{ web3, address, initOnboard }}>
			{children}
		</OnboardContext.Provider>
	);
};

export const useOnboard = () => useContext(OnboardContext);
