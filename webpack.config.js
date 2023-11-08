const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPugPlugin = require('html-webpack-pug-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: false,
  entry: {
      main: "./index.js",
      "assets/pug/pages/deliver/deliver":"./assets/pug/pages/deliver/deliver.sass",
      "assets/pug/pages/food/food":"./assets/pug/pages/food/food.sass",
      "assets/pug/pages/index/index":"./assets/pug/pages/index/index.sass",
      "assets/style/main":"./assets/style/main.sass",

  },
  output: {
      path: path.resolve(__dirname, 'dist'),
      filename: "[name]",
      assetModuleFilename: 'img/[name][ext]'
  },
  
  devServer: {
      port: 8080
  },

  plugins: [
      new CopyWebpackPlugin({
        patterns:[
          {
            from:path.resolve(__dirname,'./src/'),
            to:path.resolve(__dirname, './dist/'),
          }
        ]
      }),
      new HTMLWebpackPlugin({
          template: "./assets/pug/pages/index/index.pug",
          filename: "index.html",
          inject: false,
          chunks:[''],
      }),

      new HTMLWebpackPlugin({
        template: "./assets/pug/pages/deliver/deliver.pug",
        filename: "/assets/pug/pages/deliver/deliver.html",
        inject: false,
    }),

    new HTMLWebpackPlugin({
      template: "./assets/pug/pages/food/food.pug",
      filename: "/assets/pug/pages/food/food.html",
      inject: false,
    }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
          filename: "[name].css"
      }),
      
  ],
module: {
   rules:
   [
       {
           test: /\.sass$/,
           use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
       },
 
       {
           test: /\.pug$/,
           loader: 'pug-loader',
       },
       {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']
       },
       {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },


   ]
}

}