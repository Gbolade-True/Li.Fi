import Link from 'next/link';
import { useThemeContext } from '@/contexts/Theme';
import { Layout, Switch, Typography } from 'antd';

const { Header } = Layout;

export const AppHeader = () => {
	const { darkTheme, toggleDarkTheme } = useThemeContext();

	return (
		<Header className='sticky top-0 z-10 w-full flex items-center p-4 md:p-8'>
			<Typography className='text-xl cursor-pointer whitespace-nowrap mr-4'>
				<Link href='/'>Li.Fi</Link>
			</Typography>
			<Switch
				className='ml-4'
				checked={darkTheme}
				onChange={toggleDarkTheme}
				checkedChildren='Dark'
				unCheckedChildren='Light'
			/>
		</Header>
	);
};
