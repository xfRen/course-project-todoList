const webpack = require('webpack');
const path = require('path');

// process.env.NODE_ENV will be set to 'production' on Heroku; locally though it's not get set to anything by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    'script!foundation-sites/dist/js/foundation.min.js',
    'app/app.js'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  output: {
    path: __dirname,
    filename: 'public/bundle.js'
  },
  resolve: {
    root: __dirname,
    modulesDirectories: [
      'node_modules',
      'app/components',
      'app/api'
    ],
    alias: {
      appSass: 'app/styles/app.scss',
      actions: 'app/actions/actions.js',
      reducers: 'app/reducers/reducers.js',
      configureStore: 'app/store/config.js',
      configureFirebase: 'app/firebase/config.js'
    },
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, 'node_modules/foundation-sites/scss')
    ]
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'eval-source-map'
};
