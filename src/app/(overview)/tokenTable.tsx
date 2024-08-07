'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Filter, FilterField } from '@/components/Filter';
import { LiFiTable } from '@/components/Table';
import { ILiFiToken, ILiFiTokenApiResponse, ITokenFilters } from '@/interfaces/IToken';
import { Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { EyeOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { pageUrls, SUPPORTED_CHAINS_FOR_DROPDOWNS, SUPPORTED_CHAINS_TYPES_FOR_DROPDOWNS } from '@/utils/constants';

interface ITokenTableData extends Pick<ILiFiToken, 'address' | 'logoURI' | 'name'> {
	key: number;
}

interface TokenTableProps {
	data: ILiFiTokenApiResponse | undefined;
	loading: boolean;
}

export const TokenTable = ({ data, loading }: TokenTableProps) => {
	const [filters, setFilters] = useState<ITokenFilters>();
	const [, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const router = useRouter();

	const updateSearchParams = useCallback(
		(filters: ITokenFilters) => {
			const params = new URLSearchParams(window.location.search);

			// Update with new parameters
			Object.keys(filters).forEach(key => {
				params.set(key, filters[key as keyof ITokenFilters]);
			});

			// Push new URL with updated search parameters
			router.push(`${window.location.pathname}?${params.toString()}`);
		},
		[router]
	);

	useEffect(() => {
		if (!filters) return;
		updateSearchParams(filters);
	}, [filters]);

	const filterFields: FilterField<ITokenFilters>[] = [
		{
			name: 'chains',
			label: 'Chains',
			type: 'select',
			options: SUPPORTED_CHAINS_FOR_DROPDOWNS,
			placeholder: 'Chain, e.g, POL, DAI'
		},
		{
			name: 'chainTypes',
			label: 'Chain Types',
			type: 'select',
			options: SUPPORTED_CHAINS_TYPES_FOR_DROPDOWNS,
			placeholder: 'Chain Type e.g EVM, SVM'
		}
	];

	const columns: ColumnsType<ITokenTableData> = [
		{
			title: 'Logo',
			dataIndex: 'logoURI',
			key: 'logo',
			render: (_, t) => <Image src={t.logoURI || ''} width='40' height='40' alt='token logo' className='rounded-full' />
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
						icon={<EyeOutlined />}
						onClick={() => router.push(`${pageUrls.tokenDetails}/${t.key}/${t.address}`)}
					/>
				</Space>
			)
		}
	];

	const tokenTableData: ITokenTableData[] = useMemo(() => {
		if (!data || !data.tokens) return [];
		const tokenId = Object.keys(data.tokens);
		if (!tokenId || !tokenId.length) return [];
		return data.tokens[tokenId[0]].map(t => ({
			key: t.chainId,
			name: t.name,
			address: t.address,
			logoURI: t.logoURI
		}));
	}, [data]);

	return (
		<Space direction='vertical' className='w-full'>
			<Filter<ITokenFilters> filterFields={filterFields} onFilterChange={_filters => setFilters(_filters)} />
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
};
