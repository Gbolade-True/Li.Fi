import { PropsWithChildren } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { useTheme } from 'next-themes';

export default function AntdProvider({ children }: PropsWithChildren) {
	const { theme } = useTheme();
	const { darkAlgorithm, defaultAlgorithm } = antdTheme;

	// 	If you are using the App Router in Next.js and using antd as your component library, to make the antd component library work better in your Next.js application and provide a better user experience, you can try using the following method to extract and inject antd's first-screen styles into HTML to avoid page flicker.

	// `yarn add @ant-design/nextjs-registry`
	// [Link to Antd docs on this](https://ant.design/docs/react/use-with-next#using-app-router)
	return (
		<AntdRegistry>
			<ConfigProvider
				theme={{
					token: {
						fontFamily: "'Montserrat', sans-serif",
						fontSize: 12
					},
					algorithm: theme === 'light' ? defaultAlgorithm : darkAlgorithm
				}}
			>
				{children}
			</ConfigProvider>
		</AntdRegistry>
	);
}
