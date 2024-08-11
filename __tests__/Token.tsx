import { fireEvent, render, screen, waitFor, renderHook, act } from '@testing-library/react';
import TokensView from '@/app/(overview)/view';
import { TOKENS_API_RESPONSE_MOCK } from '../__mocks__/tokens';
import { pageUrls, TOKEN_FAVORITES_LOCAL_STORAGE_KEY } from '@/utils/constants';
import { LiFiTable } from '@/components/Table';
import { ColumnsType } from 'antd/es/table';
import { ITokenTableData, MainTokenProps, ToggleFavoriteTokenProps } from '@/interfaces/IToken';
import { Button } from 'antd';
import { delay, mapTokenApiResponseToTokenTableData } from '@/utils/helpers';
import { useRouter } from '../__mocks__/next_navigation';
import TokenView from '@/app/detail/[chain]/[token]/view';
import { AppHeader } from '@/components/Navigation/Header';
import { FavoriteContextProvider, useFavorite } from '@/contexts/Favorite';

describe('App renders accurately ', () => {
	it('renders Header link', () => {
		render(<AppHeader />);
		expect(screen.getByText('Li.Fi')).toBeDefined();
	});
});

beforeEach(() => {
	jest.mock('react', () => ({
		...jest.requireActual('react'),
		useOptimistic: jest.fn((state, setState) => [state, setState])
	}));
});

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
			expect(tokenNameColumnContent).toHaveTextContent('Token1');
		});
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
			expect(screen.getByText('NAME: Token1')).toBeDefined();
			expect(screen.getByText('$ 2667.83')).toBeDefined();
		});
	});
});

describe('Favorite Tokens Functionality', () => {
	let setItemSpy: jest.SpyInstance;
	let getItemSpy: jest.SpyInstance;

	beforeEach(() => {
		// Mock the localStorage methods
		setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
		getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

		jest.clearAllMocks();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should add token to favorites and update localStorage', async () => {
		const toggleFavoriteProps: ToggleFavoriteTokenProps = {
			name: 'TokenA',
			address: '0x123',
			chainId: 1,
			logoURI: 'https://token.com/logo.png',
			prevState: false
		};

		// Mock the initial state in localStorage (empty in this case)
		getItemSpy.mockReturnValueOnce(null);

		const { result } = renderHook(() => useFavorite(), {
			wrapper: FavoriteContextProvider
		});

		const { toggleFavorite } = result.current;

		await act(async () => {
			const result = await toggleFavorite(toggleFavoriteProps);

			// Simulate delay
			await delay(1000);

			// Expect that the token was added to favorites
			expect(setItemSpy).toHaveBeenCalledWith(
				TOKEN_FAVORITES_LOCAL_STORAGE_KEY,
				JSON.stringify({
					1: [{ chainId: 1, name: 'TokenA', address: '0x123', logoURI: 'https://token.com/logo.png' }]
				})
			);

			expect(result.favorited).toBe(true);
		});
	});

	it('should remove token from favorites and update localStorage', async () => {
		const toggleFavoriteProps: ToggleFavoriteTokenProps = {
			name: 'TokenA',
			address: '0x123',
			chainId: 1,
			logoURI: 'https://token.com/logo.png',
			prevState: true
		};

		// Mock the initial state in localStorage with a token already favorited
		const initialFavoritedTokens = {
			'1': [{ chainId: 1, name: 'TokenA', address: '0x123', logoURI: 'https://token.com/logo.png' }]
		};

		getItemSpy.mockReturnValueOnce(JSON.stringify(initialFavoritedTokens));

		const { result } = renderHook(() => useFavorite(), {
			wrapper: FavoriteContextProvider
		});

		const { toggleFavorite } = result.current;

		await act(async () => {
			const result = await toggleFavorite(toggleFavoriteProps);

			// Simulate delay
			await delay(1000);

			// Expect that the token was removed from favorites
			expect(setItemSpy).toHaveBeenCalledWith(
				TOKEN_FAVORITES_LOCAL_STORAGE_KEY,
				JSON.stringify({
					1: []
				})
			);

			expect(result.favorited).toBe(false);
		});
	});

	it('should correctly check if a token is favorited', () => {
		const tokenProps: MainTokenProps = {
			name: 'TokenA',
			address: '0x123',
			chainId: 1,
			logoURI: 'https://token.com/logo.png'
		};

		const favoritedTokens = {
			1: [{ chainId: 1, name: 'TokenA', address: '0x123', logoURI: 'https://token.com/logo.png' }]
		};

		getItemSpy.mockReturnValueOnce(JSON.stringify(favoritedTokens));

		const { result } = renderHook(() => useFavorite(), {
			wrapper: FavoriteContextProvider
		});

		const { checkIfTokenIsFavorited } = result.current;

		const output = checkIfTokenIsFavorited(tokenProps);

		expect(output).toBe(true);
	});

	it('should correctly identify when a token is not favorited', () => {
		const tokenProps: MainTokenProps = {
			name: 'TokenB',
			address: '0x456',
			chainId: 1,
			logoURI: 'https://token.com/logo.png'
		};

		const favoritedTokens = {
			1: [{ chainId: 1, name: 'TokenA', address: '0x123', logoURI: 'https://token.com/logo.png' }]
		};

		getItemSpy.mockReturnValueOnce(JSON.stringify(favoritedTokens));

		const { result } = renderHook(() => useFavorite(), {
			wrapper: FavoriteContextProvider
		});

		const { checkIfTokenIsFavorited } = result.current;

		const output = checkIfTokenIsFavorited(tokenProps);

		expect(output).toBe(false);
	});
});
