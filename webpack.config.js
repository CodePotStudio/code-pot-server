const nodeExternals = require("webpack-node-externals");
const serverlessWebpack = require("serverless-webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
	devtool: "inline-cheap-module-source-map",
	entry: serverlessWebpack.lib.entries,
	mode: serverlessWebpack.lib.webpack.isLocal ? "development" : "production",
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.ts$/,
				use: "ts-loader",
			},
		],
	},
	node: false,
	// node package를 bundling에서 제외하기
	externals: [nodeExternals()],
	// Generate sourcemaps for proper error messages
	devtool: "source-map",
	performance: {
		// Turn off size warnings for entry points
		hints: false,
	},
	optimization: {
		minimize: false,
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	target: "node",
	plugins: [
		new CopyWebpackPlugin({
			patterns: ["./prisma/schema.prisma"],
		}),
	],
};
