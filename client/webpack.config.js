const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    context: path.join(__dirname, '/src/main'),
    entry: {
      	app:'./app.js'
    },
    devtool: 'source-map',
    plugins: [ new ExtractTextPlugin(path.normalize('[name].css')) ],
    //stats:{ children: false },        
    module: {
        loaders:[
            {
                test: /\.less$|\.css$/,
                loader: 'style-loader!css?sourceMap!less?sourceMap'
            },
            {
                test: /\.rt/,
                loaders: ["babel-loader?presets[]=es2015", "react-templates-loader?modules=es6" ]
            }
        ],
        postLoaders:[
            {
                test: /\.js/,                
                exclude: /(node_modules|bower_components)/,
                loader:'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    },
    output: {
        libraryTarget: "this",
        path: path.resolve(__dirname, 'target/' + process.env.WAR_NAME + '/assets'),
        filename: path.normalize('[name].js'),
    	publicPath: 'assets/'     
    }
}
