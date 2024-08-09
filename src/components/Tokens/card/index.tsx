import { Avatar, Card, Col, Row, Typography } from 'antd';
import { ILiFiToken } from '@/interfaces/IToken';
import cn from 'classnames';
import { getColor } from '@/styles';

export default function TokenCard({ liFiToken }: { liFiToken: ILiFiToken }) {
	return (
		<Card className={cn(getColor('bg-bg-1'), 'max-w-4xl m-auto !py-8 !px-4 !rounded-2xl !shadow-md')}>
			<Row gutter={16} className='items-center'>
				<Col span={4}>
					{liFiToken?.logoURI && <Avatar size={64} src={liFiToken?.logoURI} alt={liFiToken?.symbol} />}
				</Col>
				<Col span={20}>
					<Typography className='mb-0 !text-2xl'>NAME: {liFiToken?.name}</Typography>
					<Typography className={cn('!text-lg !ml-1', getColor('text-text-3'))}>SYMBOL: {liFiToken?.symbol}</Typography>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Typography className='!text-lg font-bold'>Chain ID:</Typography>
					<Typography className='!text-lg !ml-1'>{liFiToken?.chainId}</Typography>
				</Col>
				<Col span={12}>
					<Typography className='!text-lg font-bold'>Address:</Typography>
					<Typography className='!text-lg !ml-1'>{liFiToken?.address}</Typography>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Typography className='!text-lg font-bold'>Decimals:</Typography>
					<Typography className='!text-lg !ml-1'>{liFiToken?.decimals}</Typography>
				</Col>
				<Col span={12}>
					<Typography className='!text-lg font-bold'>Price (USD):</Typography>
					<Typography className={cn('!text-lg !ml-1', getColor('!text-success-1'))}>$ {liFiToken?.priceUSD}</Typography>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Typography className='!text-lg font-bold'>Coin Key:</Typography>
					<Typography className='!text-lg !ml-1'>{liFiToken?.coinKey}</Typography>
				</Col>
			</Row>
		</Card>
	);
}
