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
	search?: string;
}

export interface ILiFiTokenApiResponse {
	tokens: {
		[key: string]: ILiFiToken[];
	};
}

export interface ITokenServerComponentProps {
	params?: {
		chain: string;
		token: string;
	};
	searchParams?: {
		chains: string;
		chainTypes?: string;
	};
}

export interface ITokenTableData extends Pick<ILiFiToken, 'address' | 'logoURI' | 'name' | 'chainId'> {
	key: string;
}
