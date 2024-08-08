import { Suspense } from 'react';
import { Metadata } from 'next';
import { Typography } from 'antd';
import { ETHEREUM_CHAIN_ID, SUPPORTED_CHAINS } from '@/utils/constants';
import TableSkeleton from '@/components/Utils/skeleton/table';
import TokensView from './view';
import { ITokenServerComponentProps } from '@/interfaces/IToken';

export async function generateMetadata({ searchParams }: ITokenServerComponentProps): Promise<Metadata> {
	const chainParam = searchParams?.['chains'];
	const activeChain = SUPPORTED_CHAINS.find(sC => sC.id === Number(chainParam || ETHEREUM_CHAIN_ID));

	return {
		title: `List of tokens for the ${activeChain?.name} chain`,
		description: `Explore the token list on the ${activeChain?.name} network.`
	};
}

export default async function Overview({ searchParams }: ITokenServerComponentProps) {
	const chainSearchParam = searchParams?.['chains'];
	const activeChain = SUPPORTED_CHAINS.find(sC => sC.id === Number(chainSearchParam || ETHEREUM_CHAIN_ID));

	return (
		<main className='p-8'>
			<Typography className='!text-xl mb-8'>View list of tokens for {activeChain?.name}</Typography>
			<Suspense fallback={<TableSkeleton />}>
				<TokensView searchParams={searchParams} />
			</Suspense>
		</main>
	);
}
