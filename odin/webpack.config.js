const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

module.exports = (env) => {
  const project = env.project;
  const srcPath = path.resolve(__dirname, 'src', project);
  const buildPath = path.resolve(__dirname, project);

  const imagesPath = path.join(srcPath, 'images');
  const hasImages = fs.existsSync(imagesPath) && fs.readdirSync(imagesPath).length > 0;

  const plugins = [
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(srcPath, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ];

  if (hasImages) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          { from: imagesPath, to: path.join(buildPath, 'images'), force: true }
        ],
      })
    );
  }

  return {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: path.join(srcPath, 'index.js'),
    output: {
      filename: 'main.js',
      path: buildPath,
      clean: true
    },
    devServer: {
      static: {
        directory: buildPath,
      },
      port: 3399,
      open: true,
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[name][ext]'
          }
        }
      ]
    },
    plugins,
    resolve: {
      extensions: ['.js', '.jsx', '.scss']
    },
  };
};
