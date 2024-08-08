import Link from 'next/link';
import { Typography } from 'antd';
import { HeaderSwitch } from './switch';
import { Header } from 'antd/es/layout/layout';

export const AppHeader = () => {
	return (
		<Header className='sticky top-0 z-10 w-full flex items-center !p-4 md:!p-8'>
			<Typography className='!text-xl cursor-pointer whitespace-nowrap mr-4'>
				<Link href='/'>Li.Fi</Link>
			</Typography>

			<HeaderSwitch />
		</Header>
	);
};
