const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
  entry: [resolve(__dirname, 'src/index.tsx')],

  mode: 'development',

  devtool: 'cheap-module-source-map',

  devServer: {
    port: 3000,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
    alias: {
      'react-rxjs-hooks': resolve(__dirname, '../src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: resolve(__dirname, 'tsconfig.json'),
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template: resolve(__dirname, 'src/index.html'),
      inject: true,
    }),
  ],
}
