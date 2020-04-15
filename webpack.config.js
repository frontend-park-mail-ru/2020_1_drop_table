let path = require('path');

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ExtractNormalCSS = new ExtractTextPlugin('style.css');
const ExtractColorCSS = new ExtractTextPlugin('style_color.css');

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
                test: /\.scss$/,
                exclude:/\.color\.scss$/,
                use: ExtractNormalCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],

                })

            },

            {
                test: /\.color\.scss$/,
                use:ExtractColorCSS.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                })

            },

            {
                test: /\.css$/,
                use: ['style-loader', 'postcss-loader'],
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
            },
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
        ExtractNormalCSS,
        ExtractColorCSS,
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: './src/html/index.html',
            favicon: './src/images/logo.png'
        }),
        new CopyWebpackPlugin([
            {from:'src/images',to:'images'},
            {from:'src/fonts',to:'fonts'},
            // {from:'src/main/sw.worker.js',to:''},
        ]),
        require('autoprefixer')
    ]
};


