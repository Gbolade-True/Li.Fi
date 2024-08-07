import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import ThemeProvider from '@/contexts/Theme';
import { ClientWrapper } from '@/components/ClientWrapper';
import cn from 'classnames';

import { getScrollbar } from '@/styles';
const montserrat = Montserrat({ subsets: ['latin'], weight: '400' });
import './globals.css';

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
		<html lang='en'>
			<head>
				<link rel='preload' type='text/css' href='./globals.css' />
				<link rel='preload' type='text/css' href='antd/dist/reset.css' as='style' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin={'use-credentials'} />
				<link
					href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap'
					rel='stylesheet'
				></link>
			</head>
			<body className={cn(montserrat.className, 'font-montserrat bg-bg-1 dark:bg-bg-1-d', getScrollbar())}>
				<ThemeProvider>
					<ClientWrapper>{children}</ClientWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
