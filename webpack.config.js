const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: './src/main/main.js',

	output: {
		filename: 'bundle.js'
	},
	resolve: {
		modules: ['node_modules']
	},
	module: {
		rules: [
			{
				test: /\.hbs$/,
				use: 'handlebars-loader'
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
		]
	},
};
