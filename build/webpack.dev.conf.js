'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const manifest = require('./dll/vendor-manifest.json')
const bundleConfig = require('./dll/bundle-config.json')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const env = process.env.ENV || 'dev'
const config = require('../config')[env]
let initOpen = true

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
const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.cssSourceMap, usePostCSS: true }),
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.devtool,

    // these devServer options should be customized in /config/index.js
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.host,
        port: PORT || config.port,
        open: false,
        overlay: config.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.assetsPublicPath,
        proxy: config.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.poll,
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': Object.assign(config.env, {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            useDll: config.useDll,
            vendorJsName: bundleConfig.vendor.js,
        }),
        // copy custom static assets
        new CopyWebpackPlugin(copyFile),
    ],
})

if (config.useDll) {
    devWebpackConfig.plugins.push(
        new webpack.DllReferencePlugin({
            manifest
        }),
    )
}

module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
            // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            devWebpackConfig.plugins.push(
                new FriendlyErrorsPlugin({
                    compilationSuccessInfo: {
                        messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
                    },
                    onErrors: config.notifyOnErrors ? utils.createNotifierCallback() : undefined,
                }),
                function() {
                    this.plugin('done', (stats) => {
                        if (stats.compilation.errors && stats.compilation.errors.length) {
                            // console.log(stats.compilation.errors)
                            // process.exit(1)
                        }
                        if (config.autoOpenBrowser && initOpen) {
                            initOpen = false
                            utils.startBrowserProcess(`http://127.0.0.1:${port}`)
                        }
                    })
                }
            )
            resolve(devWebpackConfig)
        }
    })
})
