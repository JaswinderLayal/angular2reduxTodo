/**
 * Created by Jaswinder on 7/9/2016.
 */

var webpack=require('webpack');

var htmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
    entry:'./src/main.ts',
    output:{
        path:'./dist',
        filename:'app.bundle.js'
    },
    module:{
        loaders:[
            {test:/\.ts$/,loader:'ts'}
        ]
    },
    resolve:{
        extensions:['','.js','.ts']
    },
    plugins:[
        new htmlWebpackPlugin({
          template:'./src/index.html'
        })
    ]
};