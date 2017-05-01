var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: path.resolve(__dirname, './src/js/root.js'),
	output: {
	    path: path.resolve(__dirname, './build'),
	    filename: 'bundle.js',
	},
	module: {
	  	rules: [
	        {
	        	test: /\.(js|jsx)?$/,
	        	exclude: [
		          path.resolve(__dirname, "node_modules")
		        ],
		        use: [
	              {
	              	loader: "babel-loader",
	              	options: {
	              		presets: ['react','es2015'],
										plugins: ['react-html-attrs',["import",{libraryName: "antd",style: "css",}]]
	              	}
	              }
		        ]
	        },{
						test: /\.css?$/,
						use:[
							"style-loader",
							"css-loader"
						]
					},{
						test: /\.(png|woff|woff2|eot|ttf|svg)$/,
						use:["url-loader"]
					},{
						test: /\.less/,
						use:[
							"style-loader",
							"css-loader",
							"less-loader"
						]
					}
	  	]
   }
}
