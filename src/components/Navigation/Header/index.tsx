import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
const HeaderSwitch = dynamic(() => import('./switch'));

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
