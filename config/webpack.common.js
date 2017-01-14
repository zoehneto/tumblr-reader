var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var SassLintPlugin = require('sasslint-webpack-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
var ngtools = require('@ngtools/webpack');
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
                use: 'tslint-loader',
                exclude: [ helpers.root('node_modules') ]
            },
            {
                test: /\.ts$/,
                use: ['@ngtools/webpack']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'app'),
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?sourceMap", 'sass-loader']
                })
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'app'),
                use: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            }
        ]
    },

    plugins: [
        new CheckerPlugin(),

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

        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

        new ngtools.AotPlugin({
            tsConfigPath: helpers.root('tsconfig.json')
        })
    ]
};