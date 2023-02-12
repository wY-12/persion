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
		proxy:{
			'/api':{
				target: process.env.VUE_APP_API_URL,
			},
		}
		
		
	},
}
