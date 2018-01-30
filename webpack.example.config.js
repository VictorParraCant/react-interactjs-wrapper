var config = require('./webpack.config')
var path = require('path')

module.exports = Object.assign({}, config, {
	entry: './example/src/example.js',
	output:  {
		path: path.resolve(__dirname, 'example/js'),
		publicPath: 'js',
		filename: 'example.js'
	}
})
