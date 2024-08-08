import TableSkeleton from '@/components/Utils/skeleton/table';
import { ILiFiTokenApiResponse, ITokenSearchParams } from '@/interfaces/IToken';
import { LIFI_TOKENS_BASE_URL } from '@/utils/constants';
import { convertInterfaceToObject, handleError } from '@/utils/helpers';
import { Suspense } from 'react';
import TokenTable from '../../components/Tokens/table';
import { ErrorComponent } from '@/components/Utils/error';

async function fetchTokens(
	queryParams: ITokenSearchParams['searchParams'] | undefined
): Promise<{ data: ILiFiTokenApiResponse | undefined; error: any }> {
	try {
		const url = new URL(LIFI_TOKENS_BASE_URL);
		const params = new URLSearchParams(convertInterfaceToObject(queryParams || {}));
		url.search = params.toString();
		const response = await fetch(url, { cache: 'no-store' });
		const tokensData: ILiFiTokenApiResponse = await response.json();

		return { data: tokensData, error: undefined };
	} catch (error) {
		return handleError(error);
	}
}

export default async function TokensView({ searchParams }: ITokenSearchParams) {
	const { data, error } = await fetchTokens(searchParams);

	if (error) {
		return <ErrorComponent message={error.message} />;
	}
	return (
		<Suspense fallback={<TableSkeleton />}>
			<TokenTable data={data} loading={false} />
		</Suspense>
	);
}
