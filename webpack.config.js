const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: `react.bundle.js`,
        clean: true,
    },

    module: {
        rules: [
          {
            test: /\.css$/,         
            // use: ["style-loader", "css-loader"],
            use: [MiniCssExtractPlugin.loader, "css-loader"],        
            exclude: /node_modules/,
          },
          {
            test: /\.(js)$/,
            use: {
              loader: 'babel-loader',
              options:{
                presets: [
                  "@babel/preset-env", ["@babel/preset-react", {"runtime": "automatic"}]
                ]
              }
            },
            exclude: /node_modules/,
          },
          {
            test: /\.jpg$/,         
            use: ["file-loader"],        
            exclude: /node_modules/,
          },
        ],
    },

    devServer: {
      static: path.resolve(__dirname, 'docs'),
      port: 8080,
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html")
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      })
    ],

    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
}