const os = require('os');
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HappyPack = require('happypack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4)
})

const packageJson = JSON.parse(fs.readFileSync('../package.json', {encoding: 'utf8'}));
const version = packageJson.version;

module.exports = {
  entry: {
    app: './src/index.ts'
  },
  mode: 'production',
  output: {
    path: path.resolve('./dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts']
  },
  externals: {
    vue: {
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue',
      root: 'Vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.[jt]s$/,
        use: 'happypack/loader?id=scripts',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HappyPack({
      id: 'scripts',
      threadPool: happyThreadPool,
      loaders: [
        'babel-loader',
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true
          }
        }
      ]
    }),
    new webpack.BannerPlugin({
      banner: `/*!
* Vuelog v${version}
* Released under the Apache-2.0 License.
* Copyright (c) 2020 JC-Lab
*/     `,
      raw: true,
      entryOnly: true
    })
  ],
  performance: {
    hints: false
  },
  optimization: {
    minimize: false
  }
};
