import { Suspense } from 'react';
import { Metadata } from 'next';
import { ILiFiTokenApiResponse, ITokenFilters } from '@/interfaces/IToken';
import { Skeleton, Typography } from 'antd';
import { TokenTable } from './tokenTable';
import { LIFI_TOKENS_BASE_URL } from '@/utils/constants';
import { handleError } from '@/utils/helpers';

export const metadata: Metadata = {
	title: 'Li.Fi Landing',
	description: 'Main Page for assessment'
};

async function fetchTokens(
	queryParams: ITokenFilters
): Promise<{ data: ILiFiTokenApiResponse | undefined; error: any }> {
	try {
		const url = new URL(LIFI_TOKENS_BASE_URL);
		const paramsObject: Record<string, string> = {};
		for (const [key, value] of Object.entries(queryParams)) {
			paramsObject[key] = value;
		}
		const params = new URLSearchParams(paramsObject);
		url.search = params.toString();
		const response = await fetch(url);
		const tokensData: ILiFiTokenApiResponse = await response.json();

		return { data: tokensData, error: undefined };
	} catch (error) {
		return handleError(error);
	}
}

export default async function Home({ searchParams }: any) {
	const { data, error } = await fetchTokens(searchParams);

	return (
		<main className='p-8'>
			<Typography className='text-xl mb-8'>View list of tokens</Typography>
			<Suspense fallback={<Skeleton />}>
				<TokenTable data={data} loading={false} />
			</Suspense>
		</main>
	);
}
