const os = require('os');
const path = require('path');
const HappyPack = require('happypack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const happyThreadPool = HappyPack.ThreadPool({
  size: Math.min(os.cpus().length, 4)
})

// const webpack = require('webpack')
// const merge = require('webpack-merge')
// const TerserPlugin = require('terser-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
//
// const base = require('./webpack.prod.config')
// const version = process.env.VERSION || require('../package.json').version

const isProd = process.env.NODE_ENV === 'production'
const extractCSS = isProd || process.env.TARGET === 'development'
const cssLoaders = [
  // extractCSS ? MiniCssExtractPlugin.loader : 'style-loader',
  MiniCssExtractPlugin.loader,
  { loader: 'css-loader', options: { sourceMap: !isProd } },
  // { loader: 'postcss-loader', options: { sourceMap: !isProd } }
]

const sassLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      // implementation: require('sass'),
      sassOptions: {
        indentedSyntax: true
      }
    }
  }
]

const scssLoaders = [
  ...cssLoaders,
  {
    loader: 'sass-loader',
    options: {
      // implementation: require('sass'),
      sassOptions: {
        indentedSyntax: false
      }
    }
  }
]

module.exports = {
  entry: {
    app: './src/index.ts'
  },
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'index.js',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue', '.ts'],
    alias: {
      '@vuelog/front': path.resolve(__dirname, '../../front/dist/index.js')
    }
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
      },
      {
        test: /\.css$/,
        use: cssLoaders
      },
      {
        test: /\.sass$/,
        use: sassLoaders
      },
      {
        test: /\.scss$/,
        use: scssLoaders
      },
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
    new MiniCssExtractPlugin({
      filename: 'index.min.css'
    })
  ],
  performance: {
    hints: false
  },
  optimization: {
    minimize: false
  }
};
