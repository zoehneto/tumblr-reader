var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SassLintPlugin = require('sasslint-webpack-plugin');
var ForkCheckerPlugin = ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.js', '.ts']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                exclude: [ helpers.root('node_modules') ]
            },
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'app'),
                loaders: [ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader?sourceMap"
                }), 'sass-loader']
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },

    plugins: [
        new ForkCheckerPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new SassLintPlugin({
            context: [helpers.root('src', 'app'), helpers.root('public', 'scss')],
            ignorePlugins: ['extract-text-webpack-plugin']
        }),

        // see: https://github.com/angular/angular/issues/11580
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('src')
        ),

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/)
    ]
};