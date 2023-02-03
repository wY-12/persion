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
	outputDir: 'dist',

	devServer: {
		// host: process.env.HOST ||'http://45.77.181.240',
		// port: process.env.PORT||'8080',
		proxy: process.env.VUE_APP_API_URL,
	},
}
