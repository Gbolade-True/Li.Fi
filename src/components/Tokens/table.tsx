'use client';

import { useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Filter, FilterField } from '@/components/Filter';
import { LiFiTable } from '@/components/Table';
import { ILiFiToken, ILiFiTokenApiResponse, ITokenFilters } from '@/interfaces/IToken';
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

interface ITokenTableData extends Pick<ILiFiToken, 'address' | 'logoURI' | 'name' | 'chainId'> {
	key: string;
}

interface TokenTableProps {
	data: ILiFiTokenApiResponse | undefined;
	loading: boolean;
}

export default function TokenTable({ data, loading }: TokenTableProps) {
	const [, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	const onFilterChange = (_filters: ITokenFilters) => {
		if (!_filters) return;
		const params = new URLSearchParams(searchParams);

		Object.keys(_filters).forEach(key => {
			params.set(key, _filters[key as keyof ITokenFilters]);
		});

		router.replace(`${pathname}?${params.toString()}`);
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
		}
	];

	const columns: ColumnsType<ITokenTableData> = [
		{
			title: 'Logo',
			dataIndex: 'logoURI',
			key: 'logo',
			render: (_, t) => (
				<Image src={t.logoURI || '/fallback.jpg'} width='40' height='40' alt='token logo' className='rounded-full' />
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
						icon={<EyeOutlined />}
						onClick={() => router.push(`${pageUrls.tokenDetails}/${t.chainId}/${t.address}`)}
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
			key: `${t.chainId}_${t.address}`,
			chainId: t.chainId,
			name: t.name,
			address: t.address,
			logoURI: t.logoURI
		}));
	}, [data]);

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
