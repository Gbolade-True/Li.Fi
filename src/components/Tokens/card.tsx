import { Avatar, Col, Row, Typography } from 'antd';
import { ILiFiToken, ITokenServerComponentProps } from '@/interfaces/IToken';
import { LIFI_TOKEN_BASE_URL } from '@/utils/constants';
import cn from 'classnames';
import { convertInterfaceToObject, handleError } from '@/utils/helpers';
import { getColor } from '@/styles';

async function fetchToken(
	searchParams: ITokenServerComponentProps['params']
): Promise<{ data: ILiFiToken | undefined; error: any }> {
	try {
		const url = new URL(LIFI_TOKEN_BASE_URL);
		const params = new URLSearchParams(convertInterfaceToObject(searchParams || {}));
		url.search = params.toString();
		const response = await fetch(url);
		const tokenData: ILiFiToken = await response.json();

		return { data: tokenData, error: undefined };
	} catch (error) {
		return handleError(error);
	}
}

export default async function TokenCard({ params }: ITokenServerComponentProps) {
	const { data: liFiToken, error } = await fetchToken(params);

	if (!liFiToken || !!error)
		return (
			<Typography className='!text-lg font-bold'>
				Information not available. Please check chain and token information provided and try again.
			</Typography>
		);

	return (
		<div className={cn(getColor('bg-bg-1'), 'max-w-4xl m-auto !py-8 !px-4 !rounded-2xl !shadow-md')}>
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
					<Typography className='!text-lg !ml-1'>$ {liFiToken?.priceUSD}</Typography>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Typography className='!text-lg font-bold'>Coin Key:</Typography>
					<Typography className='!text-lg !ml-1'>{liFiToken?.coinKey}</Typography>
				</Col>
			</Row>
		</div>
	);
}
