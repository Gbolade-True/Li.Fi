'use client';
import { PropsWithChildren, useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import AntdProvider from '@/contexts/Antd';

export type ColorMode = 'light' | 'dark';

export default function Providers({ children }: PropsWithChildren) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return <AntdProvider>{children}</AntdProvider>;
	return (
		<NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
			<AntdProvider>{children}</AntdProvider>
		</NextThemesProvider>
	);
}
