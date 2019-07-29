const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: {
		app: [
			'./src/index.js',
			'webpack-hot-middleware/client'
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
	},
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist',
		hot: true,
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './assets/index.html',
			title: 'Sandbox',
		}),
		new webpack.HotModuleReplacementPlugin(),
	]
};
