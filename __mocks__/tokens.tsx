import { ILiFiToken, ILiFiTokenApiResponse } from '@/interfaces/IToken';

export const TOKENS_MOCK: ILiFiToken[] = [
	{
		chainId: 1,
		address: '0x0000000000000000000000000000000000000000',
		symbol: 'ETH',
		name: 'ETH',
		decimals: 18,
		priceUSD: '2667.83',
		coinKey: 'ETH',
		logoURI:
			'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png'
	}
];

export const TOKENS_API_RESPONSE_MOCK: ILiFiTokenApiResponse = {
	tokens: {
		'1': TOKENS_MOCK
	}
};
