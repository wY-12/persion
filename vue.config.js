const { defineConfig } = require('@vue/cli-service')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

configureWebpack: (config) => {
	const plugins = []
	plugins.push(new NodePolyfillPlugin())
}

module.exports = defineConfig({
  transpileDependencies: true,

})
module.exports = {
	devServer: {
		proxy: {
			'/api': {
				target: 'http://45.77.181.240/:8080',
				pathRewrite:{'^/api':''},
				ws: true,
				changeOrigin: true
			  }
		}
	},
}
