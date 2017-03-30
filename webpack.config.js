const webpack = require("webpack"),
      path = require('path'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      cssnext = require('postcss-cssnext'),
      merge = require('lodash/merge');

const env = {'process.env': {NODE_ENV: JSON.stringify(process.env.NODE_ENV)}};
const bundleFilePath = (process.env.NODE_ENV === 'production') ? '/iTracker2.0/build/' : '/build/';
const externals = ['react-native'];

const loaders = [{
  test: /\.(jsx|es)$/,
  loaders: ['babel'],
  include: path.join(process.cwd(), 'src')
}, {
  test: require.resolve("react"),
  loader: "expose?React"
}, {
  test: require.resolve("react-dom"),
  loader: "expose?ReactDOM"
}];

const configs = {
  production: {
    debug: false,
    devtool: 'none',
    entry: {
      bundle: [path.join(process.cwd(), 'src/main.jsx')]
    },
    plugins: [
      new ExtractTextPlugin('index.css', {allChunks: true}),
      new webpack.DefinePlugin(env),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                sourceMap: false,
                compress: {
                    drop_debugger: true,
                    dead_code: true,
                    drop_console: true
                },
                output: {
                    space_colon: false,
                    comments: false
                }
            })
    ],
    module: {
      loaders: loaders.concat([
        {
          test: /\.css$/,
          exclude: /node_modules\//,
          loader: ExtractTextPlugin.extract('style-loader', [
            'css-loader?modules&importLoaders=1&localIdentName=rv-[name]__[local]',
            'postcss-loader'
          ].join('!'))
        }
      ])
    }
  },

  development: {
    debug: true,
    devtool: 'inline-source-map',
    plugins: [
      new webpack.DefinePlugin(env),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    entry: {
      bundle: [
        'webpack-hot-middleware/client?reload=true&noInfo=true',
        path.join(process.cwd(), 'src/main.jsx')
      ]
    },
    module: {
      loaders: loaders.concat([
        {
          test: /\.css$/,
          exclude: /node_modules\//,
          loaders: [
            'style?sourceMap',
            'css?sourceMap&modules&importLoaders=1&localIdentName=rv-[name]__[local]',
            'postcss'
          ]
        }
      ])
    }
  }
}

const shared = {
  cache: true,
  externals: externals,
  output: {
    path: path.join(process.cwd(), '/build'),
    filename: "[name].js",
    publicPath: bundleFilePath
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.es']
  },
  postcss: function(webpack) {
    return [
      // process css-next http://cssnext.io
      require("postcss-cssnext")(),
      // inline or adjust asset paths https://github.com/assetsjs/postcss-assets
      require("postcss-assets")({loadPaths: ['styles/assets']}),
      // write any issues to the terminal
      require("postcss-reporter")(),
      // write any issues to the browser
      require("postcss-browser-reporter")()
    ]
  }
};

module.exports = merge({}, shared, configs[process.env.NODE_ENV]);
