import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
	dir: './'
});
const config = {
	moduleDirectories: ['node_modules', '<rootDir>/'],
	testEnvironment: 'jest-environment-jsdom',
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	preset: 'ts-jest',
	transform: {},
	transformIgnorePatterns: [],
	moduleNameMapper: {
		antd: '<rootDir>/__mocks__/antd.tsx',
		'next-themes': '<rootDir>/__mocks__/next-themes.tsx',
		'next/navigation': '<rootDir>/__mocks__/next_navigation.ts',
		'\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/src/__mocks__/empty.ts',
		'\\.(css|less|scss)$': '<rootDir>/__mocks__/empty.ts'
	}
};
export default createJestConfig(config);
