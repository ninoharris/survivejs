const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
}

const commonConfig = {
  context: PATHS.app,
  entry: {
    app: PATHS.app, // or './index.js'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SurviveJS webpack plugin',
    }),
    new ProgressBarPlugin(),
  ],
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
        enforce: 'pre', 
      },
    ],
  },
  bail: true,
}

const productionConfig = () => {
  return commonConfig
}

const developmentConfig = () => {
  const config = {
    devServer: {
      // enable history api
      historyApiFallback: true,
      // reduces output to just show errors
      stats: 'errors-only',
      // parse host and port from env for customisation
      // If you use Docker, Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: process.env.HOST || '0.0.0.0',
      port: process.env.PORT,
      // If not dynamically generating index.html, provide
      // the folder which holds the static index.html.
      // can also use arrays for multiple content sources
      // ['build','images']
      // contentBase: 'build'
      overlay: true,
    },
  }

  return Object.assign({}, commonConfig, config)
}

module.exports = (env) => {
  // Webpack2 changed argument behavior compared to #1. 
  // You are not allowed to pass custom parameters through the 
  // CLI anymore. Instead, it's better to go through the 
  // --env mechanism if you need to do this.
  // Object.keys(env).filter(key => key !== 'target').forEach(key => {
  //   console.log('Additional key found in addition to env.target...'
  //   + key + ":" + env[key])
  // })
  if (env.target === 'production') {
    return productionConfig()
  }
  return developmentConfig()


}
