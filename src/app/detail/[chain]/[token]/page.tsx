import { Suspense } from 'react';
import { GoTo } from '@/components/Utils/go_to';
import SkeletonNode from 'antd/es/skeleton/Node';
import TokenCard from '../../../../components/Tokens/card';
import { ITokenSearchParams } from '@/interfaces/IToken';

export default async function TokenDetailPage({ params }: ITokenSearchParams) {
	return (
		<div className='flex flex-col items-center justify-center h-[80vh]'>
			<div>
				<GoTo />
				<Suspense fallback={<SkeletonNode />}>
					<TokenCard params={params} />
				</Suspense>
			</div>
		</div>
	);
}
