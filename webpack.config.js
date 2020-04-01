let path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/main/main.js',
    module: {
        rules: [

            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader']
                })
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: 'image-webpack-loader',
                enforce: 'pre'
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 100 * 1024
                }
            },
            {
                test: /\.(woff2?|ttf|otf|eot|svg|png|jpg)$/,
                exclude: /node_modules/,
                loader: 'file-loader',
                options: {
                    name: './external/[name].[ext]',
                },
            },

            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'img/',
                        publicPath:'img/'
                    }
                }]
            },

            {
                test: /\.hbs$/,
                loader: "handlebars-loader"
            }
        ]
    },
    resolve: {
        // modules: ["node_modules"],
        extensions: ['*', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    devServer: {
        publicPath: "/",
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './src/html/index.html',
            favicon: './src/images/logo.ico'
        }),
        new CopyWebpackPlugin([
            {from:'src/images',to:'images'},
            {from:'src/fonts',to:'fonts'}
        ]),
    ]
};


