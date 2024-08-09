import dynamic from 'next/dynamic';
import { Typography } from 'antd';
import { ILiFiToken, ITokenServerComponentProps } from '@/interfaces/IToken';
import { LIFI_TOKEN_BASE_URL } from '@/utils/constants';
import { convertInterfaceToObject, handleError } from '@/utils/helpers';
const TokenCard = dynamic(() => import('@/components/Tokens/card'));

async function fetchToken(
	searchParams: ITokenServerComponentProps['params']
): Promise<{ data: ILiFiToken | undefined; error: any }> {
	try {
		const url = new URL(LIFI_TOKEN_BASE_URL);
		const params = new URLSearchParams(convertInterfaceToObject(searchParams || {}));
		url.search = params.toString();
		// For Incremental Static Regeneration
		const response = await fetch(url, { next: { revalidate: 30 } });
		const tokenData: ILiFiToken = await response.json();

		return { data: tokenData, error: undefined };
	} catch (error) {
		return handleError(error);
	}
}

export default async function TokenView({ params }: ITokenServerComponentProps) {
	const { data: liFiToken, error } = await fetchToken(params);

	if (!liFiToken || !!error)
		return (
			<Typography className='!text-lg font-bold'>
				Information not available. Please check chain and token information provided and try again.
			</Typography>
		);

	return <TokenCard liFiToken={liFiToken} />;
}
