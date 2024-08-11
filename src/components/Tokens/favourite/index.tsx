'use client';

import { useEffect, useOptimistic, useRef, useState } from 'react';
import { Button } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { SizeType } from 'antd/es/config-provider/SizeContext';
import { useFavorite } from '@/contexts/Favorite';
import { toast } from 'react-toastify';
import { MainTokenProps } from '@/interfaces/IToken';
import { createTokenId } from '@/utils/helpers';

interface TokenFavoriteProps {
	token: MainTokenProps;
	chainId: number;
	toggleFavorite?: (tokenId: string) => Promise<void>;
	size?: SizeType;
}

export default function TokenFavorite({ token, chainId, toggleFavorite, size = 'large' }: TokenFavoriteProps) {
	const { favoritedTokens, toggleFavorite: toggleFavoriteFromContext, checkIfTokenIsFavorited } = useFavorite();
	const [favorited, setFavorited] = useState(false);
	const { name, address, logoURI } = token || {};
	const tokenId = createTokenId(name, address);

	useEffect(() => {
		if (!favoritedTokens) setFavorited(false);
		setFavorited(checkIfTokenIsFavorited({ chainId, name, address }));
	}, [favoritedTokens, address, checkIfTokenIsFavorited, chainId, name]);

	const [optimisticFavorited, setOptimisticFavorited] = useOptimistic(favorited);
	const formRef = useRef<HTMLFormElement>(null);

	const onToggleFavorite = async (tokenId: string) => {
		setOptimisticFavorited(prevLiked => !prevLiked);
		try {
			toggleFavorite && (await toggleFavorite(tokenId));
			const isTokenFavorited = await toggleFavoriteFromContext({
				name,
				address,
				chainId,
				logoURI,
				prevState: favorited
			});
			toast(isTokenFavorited.favorited ? `Token Added to Favorites` : `Removed token from Favorites.`, {
				type: isTokenFavorited.favorited ? 'success' : 'info',
				style: { fontFamily: 'Montserrat', fontSize: '1.2em' }
			});
			setFavorited(isTokenFavorited.favorited);
		} catch (error) {
			console.error('Error occured....');
		} finally {
			formRef.current?.reset();
		}
	};

	return (
		<form action={() => onToggleFavorite(tokenId)} ref={formRef}>
			<Button
				type='text'
				htmlType='submit'
				className={`transition-transform duration-300 ${optimisticFavorited ? 'animate-scaleUp' : ''}`}
				title={optimisticFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
				size={size}
				icon={optimisticFavorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
			/>
		</form>
	);
}
