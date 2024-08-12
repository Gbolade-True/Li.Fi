import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { IFavoritedTokens, MainTokenProps, ToggleFavoriteTokenProps } from '@/interfaces/IToken';
import { TOKEN_FAVORITES_LOCAL_STORAGE_KEY } from '@/utils/constants';
import { addTokenToFavorites, createTokenId, delay, removeTokenFromFavorites } from '@/utils/helpers';

type FavoriteContextType = {
	favoritedTokens: IFavoritedTokens | undefined;
	toggleFavorite: (props: ToggleFavoriteTokenProps) => Promise<{
		favorited: boolean;
	}>;
	checkIfTokenIsFavorited: (props: MainTokenProps) => boolean;
};

export const FavoriteContext = createContext<FavoriteContextType>({
	favoritedTokens: {},
	toggleFavorite: async () => ({ favorited: false }),
	checkIfTokenIsFavorited: () => false
});

export const useFavorite = () => useContext(FavoriteContext);

export const FavoriteContextProvider = ({ children }: { children: ReactNode }) => {
	const [favoritedTokens, setFavoritedTokens] = useState<IFavoritedTokens>();

	const toggleFavorite = async ({ prevState, ...toggleFavoriteProps }: ToggleFavoriteTokenProps) => {
		// Simulate a delay for better User Experience
		await delay(1000);
		let newFavoriteTokens: IFavoritedTokens = {};
		if (prevState) {
			newFavoriteTokens = removeTokenFromFavorites({ favoritedTokens, ...toggleFavoriteProps });
		} else {
			newFavoriteTokens = addTokenToFavorites({ favoritedTokens, ...toggleFavoriteProps });
		}

		localStorage.setItem(TOKEN_FAVORITES_LOCAL_STORAGE_KEY, JSON.stringify(newFavoriteTokens));
		setFavoritedTokens(newFavoriteTokens);

		return { favorited: !prevState };
	};

	const checkIfTokenIsFavorited = ({ chainId, name, address }: MainTokenProps) => {
		if (!favoritedTokens || !favoritedTokens[chainId]) return false;
		const tokenId = createTokenId(name, address);
		return favoritedTokens[chainId].map(t => createTokenId(t.name, t.address)).includes(tokenId);
	};

	useEffect(() => {
		const currentFavorites = localStorage.getItem(TOKEN_FAVORITES_LOCAL_STORAGE_KEY);
		if (!currentFavorites) return;
		setFavoritedTokens(JSON.parse(currentFavorites) as IFavoritedTokens);
	}, []);

	return (
		<FavoriteContext.Provider value={{ favoritedTokens, toggleFavorite, checkIfTokenIsFavorited }}>
			{children}
		</FavoriteContext.Provider>
	);
};
