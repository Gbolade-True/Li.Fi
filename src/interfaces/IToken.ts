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
		[key: string]: any;
	};
}

export type MainTokenProps = Pick<ILiFiToken, 'address' | 'logoURI' | 'name' | 'chainId'>;
export interface ITokenTableData extends MainTokenProps {
	key: string;
}

export interface IFavoritedTokens {
	[key: string]: MainTokenProps[];
}

export type ToggleFavoriteTokenProps = MainTokenProps & {
	prevState: boolean;
};

export type AddRemoveFavoriteTokens = MainTokenProps & {
	favoritedTokens: IFavoritedTokens | undefined;
};
