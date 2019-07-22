const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },

    output: {
        path: path.join(__dirname, 'AppHtml', 'Custom', 'GoogleMaps'),
        publicPath: 'Custom/GoogleMaps/'
    },

    plugins: [
        new CleanWebpackPlugin()
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    }
};