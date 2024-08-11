'use client';

import { useEffect, useMemo, useState } from 'react';
import { LiFiTable } from '@/components/Table';
import { ITokenTableData } from '@/interfaces/IToken';
import { Button, Drawer, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';
import { findTokenSearchInTokenTableData, getTokenTableDataFromFavorites } from '@/utils/helpers';
import TokenFavorite from '../favourite';
import { useFavorite } from '@/contexts/Favorite';
import { HeartFilled, EyeOutlined } from '@ant-design/icons';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FROM_FAVORITES, pageUrls } from '@/utils/constants';
import { Filter, FilterField } from '@/components/Filter';

type FavoriteTokenTableFilters = { search: string };

export default function FavoriteTokenTable() {
	const { favoritedTokens } = useFavorite();
	const [pageNumber, setPageNumber] = useState(1);
	const [showFavorites, setShowFavorites] = useState(false);
	const [pageSize, setPageSize] = useState(10);
	const [tokenTableData, setTokenTableData] = useState<ITokenTableData[]>([]);
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const allTableData: ITokenTableData[] = useMemo(() => {
		return getTokenTableDataFromFavorites(favoritedTokens);
	}, [favoritedTokens]);

	useEffect(() => {
		setTokenTableData(allTableData);
	}, [allTableData]);

	const onFilterChange = (_filters: FavoriteTokenTableFilters) => {
		if (!_filters) return;
		setTokenTableData(findTokenSearchInTokenTableData(allTableData, tokenTableData, _filters.search));
	};

	const filterFields: FilterField<FavoriteTokenTableFilters>[] = [
		{
			name: 'search',
			label: 'Search for token',
			type: 'text',
			placeholder: 'Search for token in favorites'
		}
	];

	const columns: ColumnsType<ITokenTableData> = [
		{
			title: 'Logo',
			dataIndex: 'logoURI',
			key: 'logo',
			render: (_, t) => (
				<Image
					src={t.logoURI || '/fallback.jpg'}
					width='40'
					height='40'
					alt='token logo'
					className='rounded-full'
					placeholder='blur'
					blurDataURL='/blur-image.jpg'
				/>
			)
		},
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name'
		},
		{
			title: 'Chain ID',
			dataIndex: 'chainId',
			key: 'chainId'
		},
		{
			title: 'Address',
			dataIndex: 'address',
			key: 'address'
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, t) => (
				<Space size='middle'>
					<Button
						icon={<EyeOutlined title='View' />}
						onClick={() =>
							router.push(`${pageUrls.tokenDetails}/${t.chainId}/${t.address}?${FROM_FAVORITES}=${pageNumber}`)
						}
					/>
					<TokenFavorite chainId={t.chainId} token={t} />
				</Space>
			)
		}
	];

	const fromFavorites = searchParams.get('fromFavorites');

	useEffect(() => {
		if (!fromFavorites) return;
		setShowFavorites(true);
		const params = new URLSearchParams(searchParams);
		params.delete(FROM_FAVORITES);

		router.replace(`${pathname}?${params.toString()}`);
	}, [fromFavorites, pathname, router, searchParams]);

	return (
		<div>
			<Button icon={<HeartFilled />} type='dashed' onClick={() => setShowFavorites(true)}>
				Favorites
			</Button>

			{showFavorites ? (
				<Drawer
					title={'Favorites'}
					placement='right'
					onClose={() => setShowFavorites(false)}
					open={showFavorites}
					width='60vw'
					className='!min-w-[60vw]'
				>
					<>
						<Filter<FavoriteTokenTableFilters> filterFields={filterFields} onFilterChange={onFilterChange} />
						<LiFiTable<ITokenTableData>
							data={tokenTableData}
							columns={columns}
							total={tokenTableData.length}
							pageSize={pageSize}
							onPaginationChange={(page, pageSize) => {
								setPageNumber(page);
								setPageSize(pageSize);
							}}
						/>
					</>
				</Drawer>
			) : null}
		</div>
	);
}
