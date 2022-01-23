const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'js/main.[contenthash].js',
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/html/index.html',
		}),
	],
};
