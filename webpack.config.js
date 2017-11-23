const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry:__dirname+'/app/js/puzzle.js',
    output:{
        filename:'puzzle.js'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:'babel-loader'
            }
        ]
    },
};