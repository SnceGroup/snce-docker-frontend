const buildFolder = require('./script/helper').getBuildRootFolder();
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
  output: {
    filename: 'main.js',
    chunkFilename: 'vendor.js',
    path: path.resolve(buildFolder, 'js')
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true
        },
      }
    }
  }
};