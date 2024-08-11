import { ILiFiToken, ILiFiTokenApiResponse, ITokenTableData } from '@/interfaces/IToken';

export const isObjectFalsy = (object: object | undefined | null) => {
	if (!object) return true;
	if (Object.values(object).every(value => !value)) {
		return true;
	}
	return Object.keys(object).length === 0;
};

export const handleError = (error: any): { data: undefined; error: any } => {
	if (error instanceof TypeError) {
		// Handle TypeError specifically
		console.error('TypeError:', error.message);
		return { data: undefined, error: 'Invalid token data' };
	} else if (error instanceof SyntaxError) {
		// Handle SyntaxError specifically
		console.error('SyntaxError:', error.message);
		return { data: undefined, error: 'Invalid JSON response' };
	} else {
		// Catch all other errors
		console.error('Error:', error.message);
		return { data: undefined, error: 'An unexpected error occurred' };
	}
};

export const convertInterfaceToObject = <T extends { [key: string]: any }>(arg: T): Record<string, string> => {
	const object: Record<string, string> = {};
	for (const [key, value] of Object.entries(arg)) {
		object[key] = value;
	}

	return object;
};

export const getAllTokenData = (tokenResponse: ILiFiTokenApiResponse): ILiFiToken[] => {
	if (!tokenResponse.tokens) return [];
	const tokenIds = Object.keys(tokenResponse.tokens);
	let finalData: ILiFiToken[] = [];
	tokenIds.forEach(t => {
		finalData.push(...tokenResponse.tokens[t]);
	});

	return finalData;
};

export const mapTokenApiResponseToTokenTableData = (data: ILiFiTokenApiResponse | undefined): ITokenTableData[] => {
	if (!data || !data.tokens) return [];
	const tokenId = Object.keys(data.tokens);
	if (!tokenId || !tokenId.length) return [];
	return data.tokens[tokenId[0]].map(t => ({
		key: `${t.chainId}_${t.address}`,
		chainId: t.chainId,
		name: t.name,
		address: t.address,
		logoURI: t.logoURI
	}));
};

export const findTokenSearchInTokenTableData = (
	allData: ITokenTableData[],
	tableData: ITokenTableData[],
	tokenSearch: string | undefined
): ITokenTableData[] => {
	if (!tokenSearch) return allData || [];
	const lowercasedSearchInput = tokenSearch.toLowerCase();

	return tableData.filter(data => data.name.toLowerCase().includes(lowercasedSearchInput));
};
