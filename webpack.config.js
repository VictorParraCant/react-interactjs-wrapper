var webpack = require('webpack')

module.exports = {
	entry: "./src/InteractWrapper.js",
  output: {
    path: __dirname,
    filename: "./dist/index.js"
  },
  module: {
	  loaders: [
	    {
	    	test: /\.js$/,
	    	exclude: /node_modules/,
	    	loader: "babel-loader"
	    }
	  ]
	}
};
