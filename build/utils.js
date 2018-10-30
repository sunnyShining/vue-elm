'use strict'
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')
const packageConfig = require('../package.json')
const execSync = require('child_process').execSync
const opn = require('opn')

exports.assetsPath = function (_path) {
    const assetsSubDirectory = process.env.NODE_ENV === 'production'
        ? config.prod.assetsSubDirectory
        : config.dev.assetsSubDirectory

    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
    options = options || {}

    const cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    }

    const postcssLoader = {
        loader: 'postcss-loader',
        options: {
            sourceMap: options.sourceMap,
        },
    }

    // generate loader string to be used with extract text plugin
    function generateLoaders(loader, loaderOptions) {
        const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

        if (loader) {
            loaders.push({
                loader: `${loader}-loader`,
                options: Object.assign({}, loaderOptions, {
                    sourceMap: options.sourceMap,
                }),
            })
        }

        // Extract CSS when that option is specified
        // (which is the case during production build)
        if (options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader',
            })
        }
        return ['vue-style-loader'].concat(loaders)
    }

    // https://vue-loader.vuejs.org/en/configurations/extract-css.html
    return {
        css: generateLoaders(),
        postcss: generateLoaders(),
        less: generateLoaders('less'),
        sass: generateLoaders('sass', { indentedSyntax: true }),
        scss: generateLoaders('sass'),
        stylus: generateLoaders('stylus'),
        styl: generateLoaders('stylus'),
    }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
    const output = []
    const loaders = exports.cssLoaders(options)

    for (const extension in loaders) {
        const loader = loaders[extension]
        output.push({
            test: new RegExp(`\\.${extension}$`),
            use: loader,
        })
    }

    return output
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: `${severity}: ${error.name}`,
            subtitle: filename || '',
            icon: path.join(__dirname, 'logo.png'),
        })
    }
}

// mac打开浏览器辅助函数
exports.startBrowserProcess = function (url) {
    // 如果你的操作系统是macos将不会另外打开一个tab页
    const shouldTryOpenChromeWithAppleScript = process.platform === 'darwin'
    if (shouldTryOpenChromeWithAppleScript) {
        try {
            // 执行AppleScript脚本，查找chrome是否存在url
            execSync('ps cax | grep "Google Chrome"')
            execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
                cwd: __dirname,
                stdio: 'ignore',
            })
            return true
        } catch (err) {
            // console.log(err)
        }
    }
    // 浏览器打开url
    try {
        opn(url).catch(() => {})
        return true
    } catch (err) {
        return false
    }
}
