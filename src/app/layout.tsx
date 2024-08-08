import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Providers from './providers';
import cn from 'classnames';
import { getScrollbar } from '@/styles';
import { AppHeader } from '@/components/Navigation/Header';
import { Content, Footer } from 'antd/es/layout/layout';
import { Layout } from 'antd';
import './globals.css';
import 'antd/dist/reset.css';

const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
	title: 'Li.Fi',
	description: 'Best price execution for any swap/bridge'
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'use-credentials'} />
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
					rel='stylesheet'
				></link>
			</head>
			<body
				className={cn(montserrat.className, 'font-montserrat bg-bg-1 dark:bg-bg-1-d', getScrollbar())}
				suppressHydrationWarning
			>
				<Providers>
					<Layout className='min-h-screen !max-w-[1720px] !mx-auto' style={{ minHeight: '100vh' }}>
						<AppHeader />
						<Content className={cn('')}>{children}</Content>
						<Footer style={{ textAlign: 'center' }}>Li.Fi ©2024</Footer>
					</Layout>
				</Providers>
			</body>
		</html>
	);
}
