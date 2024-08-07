'use client';
import { useThemeContext } from '@/contexts/Theme';
import { PropsWithChildren } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import { AppHeader } from '../Navigation/Header';
import cn from 'classnames';

const { Content, Footer } = Layout;

interface ClientWrapperProps extends PropsWithChildren {}

export const ClientWrapper = ({ children }: ClientWrapperProps) => {
	const { darkTheme } = useThemeContext();
	const { defaultAlgorithm, darkAlgorithm } = theme;
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "'Montserrat', sans-serif",
					fontSize: 12
				},
				algorithm: darkTheme ? darkAlgorithm : defaultAlgorithm
			}}
		>
			<Layout className='min-h-screen' style={{ minHeight: '100vh' }}>
				<AppHeader />
				<Content className={cn('')}>{children}</Content>
				<Footer style={{ textAlign: 'center' }}>Li.Fi ©2024</Footer>
			</Layout>
		</ConfigProvider>
	);
};
