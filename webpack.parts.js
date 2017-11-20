// To give a degree of abstraction, you can define webpack.config.js for higher 
// level configuration and webpack.parts.js for configuration parts to consume.
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

// Here are some modular functional interfaces for composition
exports.common = ({ PATHS }) => ({
  context: PATHS.app,
  entry: './index.js',
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'SurviveJS composed',
    }),
    new ProgressBarPlugin(),
  ],
  bail: true,
})

exports.production = () => ({
  
})

exports.devServer = ({ host, port } = {}) => ({
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
  },
})

exports.linting = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,
        enforce: 'pre',
        loader: 'eslint-loader',
        options,
      },
    ],
  },
});


exports.styles = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      { test: /\.(postcss|css)$/,
        use: [
          'style-loader',
          { loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('postcss-cssnext')(),
              ]),
            },
          },
        ],
      },
    ],
  },
})


exports.moduleStyles = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      { test: /\.mcss$/,
        include,
        exclude,
        use: [
          { loader: 'style-loader' },
          { 
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
})

exports.less = () => ({
  module: {
    rules: [
      { test: /\.less$/, 
        use: ['style-loader', 'css-loader', 'less-loader'],
        exclude: /node_modules/,
      },
    ],
  },
})

exports.copyFolder = ({ from, to } = {}) => ({
  plugins: [
    new CopyWebpackPlugin([{
      from,
      to,
    }]),
  ],
})