import { IFavoritedTokens, ILiFiToken, ILiFiTokenApiResponse, ITokenTableData } from '@/interfaces/IToken';

export const TOKENS_MOCK: ILiFiToken[] = [
	{
		chainId: 1,
		address: '0x0000000000000000000000000000000000000000',
		symbol: 'TKN1',
		name: 'Token1',
		decimals: 18,
		priceUSD: '2667.83',
		coinKey: 'TKN1',
		logoURI: 'http://logo.com/token1.png'
	},
	{
		chainId: 2,
		address: '0x456',
		symbol: 'TKN2',
		name: 'Token2',
		decimals: 18,
		priceUSD: '2.0',
		coinKey: 'TKN2',
		logoURI: 'http://logo.com/token2.png'
	}
];

export const TOKENS_API_RESPONSE_MOCK: ILiFiTokenApiResponse = {
	tokens: {
		'1': [TOKENS_MOCK[0]],
		'2': [TOKENS_MOCK[1]]
	}
};

export const FAVORITE_TOKENS_MOCK: IFavoritedTokens = {
	'1': [{ chainId: 1, address: '0x123', name: 'Token1', logoURI: 'http://logo.com/token1.png' }]
};

export const TOKEN_TABLE_DATA_MOCK: ITokenTableData[] = [
	{ key: 'Token1-0x123', chainId: 1, name: 'Token1', address: '0x123', logoURI: 'http://logo.com/token1.png' },
	{ key: 'Token2-0x456', chainId: 2, name: 'Token2', address: '0x456', logoURI: 'http://logo.com/token2.png' }
];
