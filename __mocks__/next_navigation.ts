/* eslint-disable import/no-anonymous-default-export */
export const useRouter = jest.fn(() => ({
	back: jest.fn(),
	forward: jest.fn(),
	prefetch: jest.fn(),
	push: jest.fn(),
	refresh: jest.fn(),
	replace: jest.fn()
}));

export const usePathname = jest.fn(() => '/mock-path');

export const useSearchParams = jest.fn(() => ({
	get: jest.fn(),
	getAll: jest.fn(),
	entries: jest.fn(),
	keys: jest.fn(),
	values: jest.fn(),
	toString: jest.fn(),
	has: jest.fn(),
	append: jest.fn(),
	delete: jest.fn(),
	set: jest.fn(),
	sort: jest.fn(),
	forEach: jest.fn()
}));

export default {
	useRouter,
	usePathname,
	useSearchParams
};
