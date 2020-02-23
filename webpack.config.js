var path = require('path');

module.exports = {
    entry: './src/main/main.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        modules: ["node_modules"]
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


// module.exports = {
//     entry: './main.js',
//     output: {
//         filename: 'bundle.js'
//     },
//     resolve: {
//         modulesDirectories: ['node_modules']
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.js/,
//                 loader: 'babel',
//                 exclude: /(node_modules|bower_components)/
//             },
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
//             },
//             {
//                 test: /\.hbs/,
//                 loader: 'handlebars-loader',
//                 exclude: /(node_modules|bower_components)/
//             }
//         ]
//     },
//     plugins: [
//         new ExtractTextPlugin('bundle.css');
// ]
// };
