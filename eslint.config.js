// import { fileURLToPath } from 'url';
// import { dirname } from 'path';
// import { FlatCompat } from '@eslint/eslintrc';
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import { fixupPluginRules } from "@eslint/compat";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const compat = new FlatCompat({
// 	baseDirectory: process.cwd(),
// 	resolvePluginsRelativeTo: __dirname
// });

export default [
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tsParser,
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				browser: true,
				es2021: true,
				jest: true,
			},
		},
		plugins: {
			react,
			"@typescript-eslint": tsPlugin,
			"react-hooks": fixupPluginRules(reactHooks),
			prettier,
			import: importPlugin,
		},
		rules: {
			"no-use-before-define": "off",
			"@typescript-eslint/no-use-before-define": ["error"],
			"react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
			"react/jsx-key": 0,
			"linebreak-style": ["error", "windows"],
			"no-console": "warn",
			"prettier/prettier": [
				"warn",
				{
					endOfLine: "auto",
				},
			],
			"import/extensions": [
				"error",
				"ignorePackages",
				{
					ts: "never",
					tsx: "never",
				},
			],
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/ban-types": 2,
			"no-shadow": 0,
			"import/prefer-default-export": "off",
			"react/prop-types": "off",
			"react/react-in-jsx-scope": "off",
			"react/no-string-refs": "off",
			...reactHooks.configs.recommended.rules,
		},
		settings: {
			react: {
				version: "18",
			},
			"import/resolver": {
				typescript: {
					alwaysTryTypes: true,
					project: "./tsconfig.json",
				},
			},
		},
		ignores: ["/node_modules/"],
	},
];
