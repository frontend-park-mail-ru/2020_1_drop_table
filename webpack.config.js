let path = require('path');

module.exports = {
    entry: './src/main/main.js',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        modules: ["node_modules"]
   },
    module: {
        // rules: [
        //     {
        //         test: /\.hbs$/,
        //         use: 'handlebars-loader'
        //     },
        //     {
        //         test: /\.css$/,
        //         use: ['style-loader','css-loader']
        //     },
        // ]
        rules: [
            {
                test: /\.hbs$/,
                use: 'handlebars-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
            test: /\.js$/,
            include: path.resolve(__dirname, 'src/js'),
            use: {
                loader: 'babel-loader',
                options: {
                    presets: 'env'
                }
            }

        },
        ]
    },

};

