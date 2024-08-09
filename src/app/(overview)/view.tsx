import dynamic from 'next/dynamic';
import { ILiFiTokenApiResponse, ITokenServerComponentProps } from '@/interfaces/IToken';
import { LIFI_TOKENS_BASE_URL } from '@/utils/constants';
import { convertInterfaceToObject, handleError } from '@/utils/helpers';
import { ErrorComponent } from '@/components/Utils/error';
const TokenTable = dynamic(() => import('../../components/Tokens/table'));

export async function fetchTokens(
	queryParams?: ITokenServerComponentProps['searchParams'] | undefined
): Promise<{ data: ILiFiTokenApiResponse | undefined; error: any }> {
	try {
		const url = new URL(LIFI_TOKENS_BASE_URL);
		const params = new URLSearchParams(convertInterfaceToObject(queryParams || {}));
		url.search = params.toString();
		const response = await fetch(url, { cache: 'no-cache' });
		const tokensData: ILiFiTokenApiResponse = await response.json();

		return { data: tokensData, error: undefined };
	} catch (error) {
		return handleError(error);
	}
}

export default async function TokensView({ searchParams }: ITokenServerComponentProps) {
	const { data, error } = await fetchTokens(searchParams);

	if (error) {
		return <ErrorComponent message={error.message} />;
	}
	return <TokenTable data={data} loading={false} />;
}
