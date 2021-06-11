module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["unused-imports"],
	rules: {
		"no-unused-vars": "off",
		"unused-imports/no-unused-imports": "error",
		"unused-imports/no-unused-vars": [
			"warn",
			{
				vars: "all",
				varsIgnorePattern: "^_",
				args: "after-used",
				argsIgnorePattern: "^_",
			},
		],
		"sort-imports": [
			"error",
			{
				ignoreDeclarationSort: true,
			},
		],
	},
};
