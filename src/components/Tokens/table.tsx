'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, FilterField } from '@/components/Filter';
import { LiFiTable } from '@/components/Table';
import { ILiFiTokenApiResponse, ITokenFilters, ITokenTableData } from '@/interfaces/IToken';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import {
	ETHEREUM_CHAIN_ID,
	pageUrls,
	SUPPORTED_CHAINS,
	SUPPORTED_CHAINS_FOR_DROPDOWNS,
	SUPPORTED_CHAINS_TYPES_FOR_DROPDOWNS
} from '@/utils/constants';
import { findTokenSearchInTokenTableData, isObjectFalsy, mapTokenApiResponseToTokenTableData } from '@/utils/helpers';

interface TokenTableProps {
	data: ILiFiTokenApiResponse | undefined;
	loading: boolean;
}

export default function TokenTable({ data, loading }: TokenTableProps) {
	const [, setPageNumber] = useState(1);
	const [allTableData, setAllTableData] = useState<ITokenTableData[]>([]);
	const [tokenTableData, setTokenTableData] = useState<ITokenTableData[]>([]);
	const [pageSize, setPageSize] = useState(10);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	useEffect(() => {
		setTokenTableData(mapTokenApiResponseToTokenTableData(data));
		setAllTableData(mapTokenApiResponseToTokenTableData(data));
	}, [data]);

	const onFilterChange = (_filters: ITokenFilters) => {
		if (!_filters) return;
		const { search, ...otherFilters } = _filters;

		if ('search' in _filters) {
			setTokenTableData(findTokenSearchInTokenTableData(allTableData, tokenTableData, search));
		}
		if (isObjectFalsy(otherFilters)) return;

		const params = new URLSearchParams(searchParams);

		Object.keys(otherFilters).forEach(key => {
			params.set(key, otherFilters[key as keyof Pick<ITokenFilters, 'chains' | 'chainTypes'>]);
		});

		return router.replace(`${pathname}?${params.toString()}`);
	};

	const chainSearchParam = searchParams.get('chains');
	const chainTypesSearchParam = searchParams.get('chainTypes');

	const defaultChainFilterValue = useMemo(() => {
		const chain = SUPPORTED_CHAINS.find(sC => sC.id === Number(chainSearchParam || ETHEREUM_CHAIN_ID));
		if (!chain) return ETHEREUM_CHAIN_ID;
		return chain.id;
	}, [chainSearchParam]);

	const defaultChainTypesSearchParam = SUPPORTED_CHAINS_TYPES_FOR_DROPDOWNS.find(
		sC => sC.value === chainTypesSearchParam
	);

	const filterFields: FilterField<ITokenFilters>[] = [
		{
			name: 'chains',
			label: 'Chains',
			type: 'select',
			options: SUPPORTED_CHAINS_FOR_DROPDOWNS,
			placeholder: 'Chain, e.g, POL, DAI',
			defaultValue: defaultChainFilterValue
		},
		{
			name: 'chainTypes',
			label: 'Chain Types',
			type: 'select',
			options: SUPPORTED_CHAINS_TYPES_FOR_DROPDOWNS,
			placeholder: 'Chain Type e.g EVM, SVM',
			defaultValue: defaultChainTypesSearchParam?.value
		},
		{
			name: 'search',
			label: 'Search for token',
			type: 'text',
			placeholder: 'Search for token in chain'
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
						onClick={() => router.push(`${pageUrls.tokenDetails}/${t.chainId}/${t.address}`)}
					/>
				</Space>
			)
		}
	];

	return (
		<Space direction='vertical' className='w-full'>
			<Filter<ITokenFilters> filterFields={filterFields} onFilterChange={onFilterChange} />
			<LiFiTable<ITokenTableData>
				data={tokenTableData}
				columns={columns}
				total={tokenTableData.length}
				pageSize={pageSize}
				onPaginationChange={(page, pageSize) => {
					setPageNumber(page);
					setPageSize(pageSize);
				}}
				loading={loading}
			/>
		</Space>
	);
}
