'use strict'

const path = require('path')
const webpack = require('webpack')
const assetsWebpackPlugin = require('assets-webpack-plugin')

const resolve = (dir) => path.join(__dirname, '..', dir)

module.exports = {
	entry: {
		vendor: ['vue', 'vue-router', 'babel-polyfill', 'whatwg-fetch', 'element-ui']
	},
	output: {
		path: resolve('dll/js'),
		filename: '[name].js?[hash:8]',
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: resolve('build/dll/[name]-manifest.json'),
			name: '[name]'
		}),
		new assetsWebpackPlugin({
			filename: 'bundle-config.json',
			path: resolve('build/dll')
		})
	]
}