import { Card, Avatar, Col, Row } from 'antd';
import { ILiFiToken, ITokenSearchParams } from '@/interfaces/IToken';
import { LIFI_TOKEN_BASE_URL, pageUrls } from '@/utils/constants';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import cn from 'classnames';
import { getColor } from '@/styles';
import { handleError } from '@/utils/helpers';
import { GoTo } from '@/components/Utils/go_to';

async function fetchToken(
	searchParams: ITokenSearchParams['params']
): Promise<{ data: ILiFiToken | undefined; error: any }> {
	try {
		const url = new URL(LIFI_TOKEN_BASE_URL);
		const paramsObject: Record<string, string> = {};
		for (const [key, value] of Object.entries(searchParams)) {
			paramsObject[key] = value;
		}
		const params = new URLSearchParams(paramsObject);
		url.search = params.toString();
		const response = await fetch(url);
		const tokenData: ILiFiToken = await response.json();

		return { data: tokenData, error: undefined };
	} catch (error) {
		return handleError(error);
	}
}

export default async function TokenDetailPage({ params }: ITokenSearchParams) {
	const { data: liFiToken, error } = await fetchToken(params);
	if (!liFiToken)
		return (
			<Text strong>Information not available. Please check chain and token information provided and try again.</Text>
		);
	console.log(liFiToken, 'liFiToken');
	return (
		<div className='flex flex-col items-center justify-center h-[80vh]'>
			<div>
				<GoTo route={pageUrls.overview} />
				<Card className={cn(getColor('bg-bg-1'), 'max-w-lg m-auto p-4 rounded-2xl shadow-md')} bordered={false}>
					<Row gutter={16} className='items-center'>
						<Col span={4}>
							{liFiToken?.logoURI && <Avatar size={64} src={liFiToken?.logoURI} alt={liFiToken?.symbol} />}
						</Col>
						<Col span={20}>
							<Title level={4} className='mb-0'>
								{liFiToken?.name}
							</Title>
							<Text type='secondary'>{liFiToken?.symbol}</Text>
						</Col>
					</Row>
					<Row gutter={16} className='mt-4'>
						<Col span={12}>
							<Text strong>Chain ID:</Text>
							<Text className='ml-1'>{liFiToken?.chainId}</Text>
						</Col>
						<Col span={12}>
							<Text strong>Address:</Text>
							<Text className='ml-1'>{liFiToken?.address}</Text>
						</Col>
					</Row>
					<Row gutter={16} className='mt-4'>
						<Col span={12}>
							<Text strong>Decimals:</Text>
							<Text className='ml-1'>{liFiToken?.decimals}</Text>
						</Col>
						<Col span={12}>
							<Text strong>Price (USD):</Text>
							<Text className='ml-1'>$ {liFiToken?.priceUSD}</Text>
						</Col>
					</Row>
					<Row gutter={16} className='mt-4'>
						<Col span={12}>
							<Text strong>Coin Key:</Text>
							<Text className='ml-1'>{liFiToken?.coinKey}</Text>
						</Col>
					</Row>
				</Card>
			</div>
		</div>
	);
}
