'use strict'
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const manifest = require('./dll/vendor-manifest.json')
const bundleConfig = require('./dll/bundle-config.json')

const env = process.env.ENV || 'prod'
const config = require('../config')[env]

const resolve = (dir) => path.join(__dirname, '..', dir)

let copyFile = [
    {
        from: resolve('static'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
    },
]

if (config.useDll) {
    copyFile.push({
        from: resolve('dll'),
        to: config.assetsSubDirectory,
        ignore: ['.*']
    })
}
const webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.productionSourceMap,
            extract: true,
            usePostCSS: true,
        }),
    },
    devtool: config.productionSourceMap ? config.devtool : false,
    output: {
        path: config.assetsRoot,
        publicPath: config.assetsPublicPath,
        filename: utils.assetsPath('js/[name].js?[hash:8]'),
        chunkFilename: utils.assetsPath('js/[name]-[id].js?[hash:8]'),
    },
    plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': Object.assign(config.env, {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}),
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                },
            },
            sourceMap: config.productionSourceMap,
            parallel: true,
        }),
        // extract css into its own file
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].css?[hash:6]'),
            // Setting the following option to `false` will not extract CSS from codesplit chunks.
            // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
            // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
            // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
            allChunks: true,
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
            cssProcessorOptions: config.productionSourceMap
                ? { safe: true, map: { inline: false } }
                : { safe: true },
        }),
        // generate dist index.html with correct asset hash for caching.
        // you can customize output by editing /index.html
        // see https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: config.index,
            template: 'index.html',
            inject: true,
            useDll: config.useDll,
            vendorJsName: bundleConfig.vendor.js,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            // necessary to consistently work with multiple chunks via CommonsChunkPlugin
            chunksSortMode: 'dependency',
        }),
        // keep module.id stable when vendor modules does not change
        new webpack.HashedModuleIdsPlugin(),
        // enable scope hoisting
        new webpack.optimize.ModuleConcatenationPlugin(),
        // split vendor js into its own file
        config.useDll ?
        new webpack.DllReferencePlugin({
            manifest
        }) :
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'manifest'],
        }),
        // This instance extracts shared chunks from code splitted chunks and bundles them
        // in a separate chunk, similar to the vendor chunk
        // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
        new webpack.optimize.CommonsChunkPlugin({
            name: 'app',
            async: 'vendor-async',
            children: true,
            minChunks: 3,
        }),

        // copy custom static assets
        new CopyWebpackPlugin(copyFile),
    ],
})

if (config.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                `\\.(${
                    config.productionGzipExtensions.join('|')
                })$`,
            ),
            threshold: 10240,
            minRatio: 0.8,
        }),
    )
}

if (config.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
