'use client';

import { notification } from 'antd';
import type { NotificationArgsProps } from 'antd';
import { createContext, useCallback, useContext, useMemo } from 'react';

type NotificationPlacement = NotificationArgsProps['placement'];

interface AntdContextType {
	openNotification: (
		placement: NotificationPlacement,
		message: string,
		description: string,
	) => void;
}

const defaultRainbowContext: AntdContextType = {
	openNotification: () => {},
};

const AntdContext = createContext<AntdContextType>(defaultRainbowContext);

export const AntdProvider = ({
	children,
}: {
	children: JSX.Element;
}): JSX.Element => {
	const [api, contextHolder] = notification.useNotification();

	const openNotification = useCallback(
		(
			placement: NotificationPlacement,
			message: string,
			description: string,
		) => {
			api.info({
				message,
				description,
				placement,
			});
		},
		[api],
	);

	const contextValue = useMemo(
		() => ({
			openNotification,
		}),
		[openNotification],
	);

	return (
		<AntdContext.Provider value={contextValue}>
			{contextHolder}
			{children}
		</AntdContext.Provider>
	);
};

export const useAntdContext = () => useContext(AntdContext);
