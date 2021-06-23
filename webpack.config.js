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
	// prisma schema를 복사한다. (javascript 파일이 아니기 때문에 임의로 복사해주어야 함)
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: "./prisma/schema.prisma" }, // without this the prisma generate above will not work
				{
					from: "./node_modules/.prisma/client/query-engine-rhel-openssl-1.0.x",
				}, // client 설치 시에 자동으로 생성되는 client의 binary 파일을 사용가능 하도록 복사한다.
			],
		}),
	],
};
