const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: 'development',
    entry: {
        'index': './index.ts',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './js'),
    }
};