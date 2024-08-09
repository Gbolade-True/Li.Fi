import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import TokensView from '@/app/(overview)/view';
import { TOKENS_API_RESPONSE_MOCK } from '../__mocks__/tokens';
import { pageUrls } from '@/utils/constants';
import { LiFiTable } from '@/components/Table';
import { ColumnsType } from 'antd/es/table';
import { ITokenTableData } from '@/interfaces/IToken';
import { Button } from 'antd';
import { mapTokenApiResponseToTokenTableData } from '@/utils/helpers';
import { useRouter } from '../__mocks__/next_navigation';
import TokenView from '@/app/detail/[chain]/[token]/view';

describe('Overview test suite', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('Fetches and renders a list of tokens accurately', async () => {
		global.fetch = jest.fn().mockResolvedValue({ json: () => TOKENS_API_RESPONSE_MOCK });
		render(await TokensView({ searchParams: { chains: '', chainTypes: '' } }));

		await waitFor(() => {
			const tokenNameColumnHeader = screen.getByTestId('mock-column-name');
			const tokenNameColumnContent = screen.getByTestId('mock-cell-name');
			expect(tokenNameColumnHeader).toHaveTextContent('Name');
			expect(tokenNameColumnContent).toHaveTextContent('ETH');
		});

		// render(await Overview({ searchParams: { chains: '', chainTypes: '' } }));
		// await waitFor(() => {
		// 	render(OverviewComponent());
		// 	const pageTitle = screen.getByText('View list of tokens for Ethereum');
		// 	expect(pageTitle).toBeDefined();
		// });
	});

	it('Navigates to the detail page with the correct url params onClick of the Action button', async () => {
		global.fetch = jest.fn().mockResolvedValue({ json: () => TOKENS_API_RESPONSE_MOCK });
		const router = useRouter();

		const columns: ColumnsType<ITokenTableData> = [
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
					<Button onClick={() => router.push(`${pageUrls.tokenDetails}/${t.chainId}/${t.address}`)}>View</Button>
				)
			}
		];

		render(
			<LiFiTable<ITokenTableData>
				columns={columns}
				data={mapTokenApiResponseToTokenTableData(TOKENS_API_RESPONSE_MOCK)}
				onPaginationChange={() => {}}
				total={1}
			/>
		);

		const actionButton = screen.getAllByRole('button')[0];
		expect(actionButton).toHaveTextContent('View');

		fireEvent.click(actionButton);
		expect(router.push).toHaveBeenCalledWith(`${pageUrls.tokenDetails}/1/0x0000000000000000000000000000000000000000`);
	});
});

describe('Token Detail Page test suite', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('Fetches and render a token accurately with url params', async () => {
		const TOKEN = TOKENS_API_RESPONSE_MOCK.tokens['1'][0];
		global.fetch = jest.fn().mockResolvedValue({ json: () => TOKEN });
		render(await TokenView({ params: { chain: String(TOKEN.chainId), token: TOKEN.address } }));

		await waitFor(() => {
			expect(screen.getByText('ETH')).toBeDefined();
			expect(screen.getByText('$ 2667.83')).toBeDefined();
		});
	});
});
