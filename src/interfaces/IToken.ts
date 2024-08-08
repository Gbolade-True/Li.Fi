export interface ILiFiToken {
	chainId: number;
	address: string;
	symbol: string;
	name: string;
	decimals: number;
	priceUSD: string;
	coinKey: string;
	logoURI?: string;
}

export interface ITokenFilters {
	chains: string;
	chainTypes: string;
}

export interface ILiFiTokenApiResponse {
	tokens: {
		[key: string]: ILiFiToken[];
	};
}

export interface ITokenSearchParams {
	params?: {
		chain: string;
		token: string;
	};
	searchParams?: {
		chains: string;
		chainTypes: string;
	};
}
