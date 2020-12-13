/**
 * @typedef {import('@vue/cli-service/types').ProjectOptions} ProjectOptions
 */

const path = require('path');

/**
 * @type ProjectOptions
 */
module.exports = {
  chainWebpack(config) {
    config.resolve.alias.delete('@')
    if (process.env.SERVE_ENV === 'webpack') {
      config.resolve.alias.set('@vuelog/front', path.resolve(__dirname, '../front/'));
      config.resolve.alias.set('@vuelog/sample-template', path.resolve(__dirname, '../sample-template/'));
    } else {
      config.resolve.alias.set('@vuelog/sample-template/dist/index.min.css', path.resolve(__dirname, '../sample-template/dist/index.min.css'));
      config.resolve
        .plugin('tsconfig-paths')
        .use(require('tsconfig-paths-webpack-plugin'));
    }
    config.resolve.alias.set('vue$', path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'));
  }
}
