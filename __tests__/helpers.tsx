import {
	delay,
	handleError,
	convertInterfaceToObject,
	createTokenId,
	getTokenNameAndAddressFromTokenId,
	getAllTokenData,
	restructureTableDataToHaveFavoritedFirst,
	mapTokenApiResponseToTokenTableData,
	addTokenToFavorites,
	removeTokenFromFavorites,
	mapMainTokenPropsToTableData,
	getTokenTableDataFromFavorites
} from '@/utils/helpers';
import { FAVORITE_TOKENS_MOCK, TOKEN_TABLE_DATA_MOCK, TOKENS_API_RESPONSE_MOCK } from '../__mocks__/tokens';

describe('Helper functions', () => {
	it('`delay` should delay for a specified time', async () => {
		const start = Date.now();
		await delay(1000);
		const end = Date.now();
		expect(end - start).toBeGreaterThanOrEqual(1000);
	});

	it('`handleError` should handle different types of errors', () => {
		const typeErrorResult = handleError(new TypeError('Type error'));
		expect(typeErrorResult.error).toBe('Invalid token data');

		const syntaxErrorResult = handleError(new SyntaxError('Syntax error'));
		expect(syntaxErrorResult.error).toBe('Invalid JSON response');

		const genericErrorResult = handleError(new Error('Generic error'));
		expect(genericErrorResult.error).toBe('An unexpected error occurred');
	});

	it('`convertInterfaceToObject` should convert an interface to an object', () => {
		const input = { key1: 'value1', key2: 'value2' };
		const result = convertInterfaceToObject(input);
		expect(result).toEqual({ key1: 'value1', key2: 'value2' });
	});

	it('`createTokenId` should create a token ID from name and address', () => {
		const result = createTokenId('Token1', '0x123');
		expect(result).toBe('Token1-0x123');
	});

	it('`getTokenNameAndAddressFromTokenId` should get name and address from token ID', () => {
		const result = getTokenNameAndAddressFromTokenId('Token1-0x123');
		expect(result).toEqual({ name: 'Token1', address: '0x123' });
	});

	it('`getAllTokenData` should get all token data from API response', () => {
		const result = getAllTokenData(TOKENS_API_RESPONSE_MOCK);
		expect(result).toHaveLength(2);
		expect(result[0].name).toBe('Token1');
		expect(result[1].name).toBe('Token2');
	});

	it('`restructureTableDataToHaveFavoritedFirst` should restructure table data to have favorited tokens first', () => {
		const result = restructureTableDataToHaveFavoritedFirst(TOKEN_TABLE_DATA_MOCK, FAVORITE_TOKENS_MOCK);
		expect(result[0].name).toBe('Token1');
		expect(result[1].name).toBe('Token2');
	});

	it('`mapTokenApiResponseToTokenTableData` should map token API response to table data', () => {
		const result = mapTokenApiResponseToTokenTableData(TOKENS_API_RESPONSE_MOCK, FAVORITE_TOKENS_MOCK);
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('Token1');
	});

	it('`addTokenToFavorites` should add a token to favorites', () => {
		const newToken = {
			favoritedTokens: FAVORITE_TOKENS_MOCK,
			chainId: 2,
			name: 'Token2',
			address: '0x456',
			logoURI: 'http://logo.com/token2.png'
		};
		const result = addTokenToFavorites(newToken);
		expect(result['2']).toHaveLength(1);
	});

	it('`removeTokenFromFavorites` should remove a token from favorites', () => {
		const tokenToRemove = {
			favoritedTokens: FAVORITE_TOKENS_MOCK,
			chainId: 1,
			name: 'Token1',
			address: '0x123'
		};
		const result = removeTokenFromFavorites(tokenToRemove);
		expect(result['1']).toHaveLength(0);
	});

	it('`mapMainTokenPropsToTableData` should map main token props to table data', () => {
		const mainTokenProps = { name: 'Token1', address: '0x123', chainId: 1, logoURI: 'http://logo.com/token1.png' };
		const result = mapMainTokenPropsToTableData(mainTokenProps);
		expect(result.key).toBe('Token1-1-0x123');
	});

	it('`getTokenTableDataFromFavorites` should get token table data from favorites', () => {
		const result = getTokenTableDataFromFavorites({
			'1': [{ chainId: 1, address: '0x123', name: 'Token1', logoURI: 'http://logo.com/token1.png' }]
		});
		expect(result).toHaveLength(1);
		expect(result[0].name).toBe('Token1');
	});
});
