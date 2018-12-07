var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var devMode = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: [
        path.join(__dirname, '/assets/App.js'),
    ],
    output: {
        path: path.join(__dirname, '/web'),
        publicPath: '/',
    },
    mode: devMode ? 'development' : 'production',
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'assets', 'js'),
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'assets', 'scss'),
                exclude: /node_modules/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '/',
                        }
                    },
                    'css-loader'
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i, 
                loader: "file-loader?name=/public/icons/[name].[ext]"
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    serve: {
        options: {
        }
    }
};
