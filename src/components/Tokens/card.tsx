import { ILiFiToken, ITokenServerComponentProps } from '@/interfaces/IToken';
import { LIFI_TOKEN_BASE_URL } from '@/utils/constants';
import { convertInterfaceToObject, handleError } from '@/utils/helpers';
import { Avatar, Card, Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import cn from 'classnames';
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
			<Text className='!text-lg' strong>
				Information not available. Please check chain and token information provided and try again.
			</Text>
		);

	return (
		<Card className={cn(getColor('bg-bg-1'), 'max-w-4xl m-auto !py-8 !px-4 !rounded-2xl !shadow-md')} bordered={false}>
			<Row gutter={16} className='items-center'>
				<Col span={4}>
					{liFiToken?.logoURI && <Avatar size={64} src={liFiToken?.logoURI} alt={liFiToken?.symbol} />}
				</Col>
				<Col span={20}>
					<Title level={4} className='mb-0'>
						NAME: {liFiToken?.name}
					</Title>
					<Text className='!text-lg !ml-1' type='secondary'>
						SYMBOL: {liFiToken?.symbol}
					</Text>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Text className='!text-lg' strong>
						Chain ID:
					</Text>
					<Text className='!text-lg !ml-1'>{liFiToken?.chainId}</Text>
				</Col>
				<Col span={12}>
					<Text className='!text-lg' strong>
						Address:
					</Text>
					<Text type='success' className='!text-lg !ml-1'>
						{liFiToken?.address}
					</Text>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Text className='!text-lg' strong>
						Decimals:
					</Text>
					<Text className='!text-lg !ml-1'>{liFiToken?.decimals}</Text>
				</Col>
				<Col span={12}>
					<Text className='!text-lg' strong>
						Price (USD):
					</Text>
					<Text className='!text-lg !ml-1'>$ {liFiToken?.priceUSD}</Text>
				</Col>
			</Row>
			<Row gutter={16} className='mt-4'>
				<Col span={12}>
					<Text className='!text-lg' strong>
						Coin Key:
					</Text>
					<Text className='!text-lg !ml-1'>{liFiToken?.coinKey}</Text>
				</Col>
			</Row>
		</Card>
	);
}
