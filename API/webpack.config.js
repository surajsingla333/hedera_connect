const path = require('path');

module.exports = {

  entry: './API/src/index.js',

  output: {
    filename: 'api.js',
    path: path.join(__dirname, '../', 'build')
  },

  resolve: {
    extensions: ['.js'],
    modules: ['node_modules']
  },

  node: { fs: 'empty' },

  module: {
    rules: [
      {
        test: /\.(js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      }
    ]
  },

};
