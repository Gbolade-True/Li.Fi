import { Suspense } from 'react';
import { headers } from 'next/headers';
import { GoTo } from '@/components/Utils/go_to';
import SkeletonNode from 'antd/es/skeleton/Node';
import { ITokenServerComponentProps } from '@/interfaces/IToken';
import { fetchTokens } from '@/app/(overview)/view';
import { getAllTokenData } from '@/utils/helpers';
import { ETHEREUM_CHAIN_ID, FROM_FAVORITES, SUPPORTED_CHAINS } from '@/utils/constants';
import Title from 'antd/es/typography/Title';
import { Metadata } from 'next';
import TokenView from './view';

export async function generateMetadata({ params }: ITokenServerComponentProps): Promise<Metadata> {
	const chainParam = params?.['chain'];
	const activeChain = SUPPORTED_CHAINS.find(sC => sC.id === Number(chainParam || ETHEREUM_CHAIN_ID));

	return {
		title: `Li.Fi ${activeChain?.name} chain`,
		description: `${activeChain?.metamask?.chainName}`
	};
}

export default async function TokenDetailPage({ params, searchParams }: ITokenServerComponentProps) {
	const chainParam = params?.['chain'];
	const activeChain = SUPPORTED_CHAINS.find(sC => sC.id === Number(chainParam || ETHEREUM_CHAIN_ID));
	const headersList = headers();
	const referer = headersList.get('referer');
	const fromFavourites = searchParams?.[FROM_FAVORITES];

	return (
		<div className='flex flex-col items-center justify-center h-[80vh]'>
			<div>
				<Title className='text-center' level={2}>
					This Token is on the {activeChain ? `${activeChain.name}` : 'Ethereum'} chain
				</Title>
				<GoTo referer={referer} searchParams={fromFavourites ? { [FROM_FAVORITES]: fromFavourites } : undefined} />
				<Suspense fallback={<SkeletonNode active style={{ height: '442px', width: '635px' }} />}>
					<TokenView params={params} />
				</Suspense>
			</div>
		</div>
	);
}

// For Static Site Generation
export async function generateStaticParams() {
	// Fetch tokens for Ethereum Chain only since it is the major chain and to reduce the number of statically generated params
	const { data, error } = await fetchTokens({ chains: String(ETHEREUM_CHAIN_ID) });
	if (!data || !!error) return [];
	const finalData = getAllTokenData(data);

	return finalData.map(d => ({ chain: String(d.chainId), token: d.address }));
}
