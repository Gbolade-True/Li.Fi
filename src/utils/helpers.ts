import {
	AddRemoveFavoriteTokens,
	IFavoritedTokens,
	ILiFiToken,
	ILiFiTokenApiResponse,
	ITokenTableData,
	MainTokenProps
} from '@/interfaces/IToken';

export const isObjectFalsy = (object: object | undefined | null) => {
	if (!object) return true;
	if (Object.values(object).every(value => !value)) {
		return true;
	}
	return Object.keys(object).length === 0;
};

export const delay = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms));
};

export const handleError = (error: any): { data: undefined; error: any } => {
	if (error instanceof TypeError) {
		// Handle TypeError specifically
		return { data: undefined, error: 'Invalid token data' };
	} else if (error instanceof SyntaxError) {
		// Handle SyntaxError specifically
		return { data: undefined, error: 'Invalid JSON response' };
	} else {
		// Catch all other errors
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

export const createTokenId = (tokenName: string, tokenAddress: string) => `${tokenName}-${tokenAddress}`;
export const getTokenNameAndAddressFromTokenId = (tokenId: string) => {
	if (!tokenId) return;
	const split = tokenId.split('-');
	if (split.length !== 2) return;
	return {
		name: split[0],
		address: split[1]
	};
};

export const getAllTokenData = (tokenResponse: ILiFiTokenApiResponse): ILiFiToken[] => {
	if (!tokenResponse.tokens) return [];
	const chainIds = Object.keys(tokenResponse.tokens);
	let finalData: ILiFiToken[] = [];
	chainIds.forEach(c => {
		finalData.push(...tokenResponse.tokens[c]);
	});

	return finalData;
};

export const restructureTableDataToHaveFavoritedFirst = (
	tableData: ITokenTableData[],
	favoritedTokens: IFavoritedTokens | undefined
): ITokenTableData[] => {
	if (!tableData.length) return [];
	const currentChainId = tableData[0].chainId;
	if (!favoritedTokens || !favoritedTokens[currentChainId]) return tableData;

	const favoritedTokensInCurrentChain = favoritedTokens[currentChainId];

	const inLocalStorage: ITokenTableData[] = [];
	const notInLocalStorage: ITokenTableData[] = [];

	tableData.forEach(item => {
		const tokenId = createTokenId(item.name, item.address);
		if (favoritedTokensInCurrentChain.map(t => createTokenId(t.name, t.address)).includes(tokenId)) {
			inLocalStorage.push(item);
		} else {
			notInLocalStorage.push(item);
		}
	});

	return [...inLocalStorage, ...notInLocalStorage];
};

export const mapTokenApiResponseToTokenTableData = (
	data: ILiFiTokenApiResponse | undefined,
	favoritedTokens?: IFavoritedTokens
): ITokenTableData[] => {
	if (!data || !data.tokens) return [];
	const tokenId = Object.keys(data.tokens);
	if (!tokenId || !tokenId.length) return [];

	const tableData = data.tokens[tokenId[0]].map(t => ({
		key: createTokenId(t.name, t.address),
		chainId: t.chainId,
		name: t.name,
		address: t.address,
		logoURI: t.logoURI
	}));
	const restructuredTableData = restructureTableDataToHaveFavoritedFirst(tableData, favoritedTokens);
	return restructuredTableData;
};

export const addTokenToFavorites = ({
	favoritedTokens,
	chainId,
	name,
	address,
	logoURI
}: AddRemoveFavoriteTokens): IFavoritedTokens => {
	if (!favoritedTokens) return { [chainId]: [{ chainId, name, address, logoURI }] };
	if (String(chainId) in favoritedTokens) {
		const tokensInChain = favoritedTokens[chainId];
		const newTokensInChain = [...tokensInChain, { chainId, name, address, logoURI }];
		return {
			...favoritedTokens,
			[chainId]: newTokensInChain
		};
	}
	return { ...favoritedTokens, [chainId]: [{ chainId, name, address, logoURI }] };
};

export const removeTokenFromFavorites = ({
	favoritedTokens,
	chainId,
	name,
	address
}: AddRemoveFavoriteTokens): IFavoritedTokens => {
	if (!favoritedTokens) return {};
	const tokenId = createTokenId(name, address);
	if (String(chainId) in favoritedTokens) {
		const tokensInChain = favoritedTokens[chainId] || [];
		const newTokensInChain = tokensInChain.filter(t => createTokenId(t.name, t.address) !== tokenId);

		return {
			...favoritedTokens,
			[chainId]: newTokensInChain
		};
	}
	return {};
};

export const mapMainTokenPropsToTableData = (mainTokenProps: MainTokenProps): ITokenTableData => {
	if (!mainTokenProps) return {} as ITokenTableData;
	return {
		...mainTokenProps,
		key: `${mainTokenProps.name}-${mainTokenProps.chainId}-${mainTokenProps.address}`
	};
};

export const getTokenTableDataFromFavorites = (favoritedTokens: IFavoritedTokens | undefined): ITokenTableData[] => {
	if (!favoritedTokens || isObjectFalsy(favoritedTokens)) return [];
	const chainIds = Object.keys(favoritedTokens);
	let finalData: ITokenTableData[] = [];
	chainIds.forEach(c => {
		const tableData = favoritedTokens[c].map(mapMainTokenPropsToTableData);
		finalData.push(...tableData);
	});

	return finalData;
};

export const createQueryString = (key: string, value: string) => {
	const params = new URLSearchParams();
	params.set(key, value);

	return params.toString();
};
