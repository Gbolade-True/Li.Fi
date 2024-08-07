export interface IChain {
	id: number;
	key: string;
	chainType: string;
	name: string;
	coin: string;
	mainnet: boolean;
	logoURI: string;
	multicallAddress: string;
	metamask: {
		chainId: string;
		blockExplorerUrls: string[];
		chainName: string;
		nativeCurrency: {
			name: string;
			symbol: string;
			decimals: number;
		};
		rpcUrls: string[];
	};
	nativeToken: {
		address: string;
		chainId: number;
		symbol: string;
		decimals: number;
		name: string;
		coinKey: string;
		logoURI: string;
		priceUSD: string;
	};
	tokenlistUrl?: string;
	faucetUrls?: string[];
}
