const path = require('path');

module.exports = {

  entry: [
    './content/src/scripts/index.js'
  ],

  output: {
    filename: 'content.js',
    path: path.join(__dirname, '../', 'build'),
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.sass', '.json', '.css', '.min.css'],
    modules: ['node_modules']
  },

  node: { fs: 'empty' },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        include: path.join(__dirname, 'src'),
        query: {
          presets: ['@babel/preset-env', '@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s(a|c)ss$/,
        exclude: /\.module.(s(a|c)ss)$/,
        loader: 'sass-loader',
        include: path.join(__dirname, 'src'),
      }
    ]
  }
};