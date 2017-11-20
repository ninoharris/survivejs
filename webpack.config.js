const path = require('path')
const merge = require('webpack-merge')

const parts = require('./webpack.parts')

const PROJECT_CONFIG = {
  PATHS: {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build'),
  },
  HOST: process.env.host || '0.0.0.0',
  PORT: process.env.port || 8080,
}

const commonConfig = merge([
  parts.common({ 
    PATHS: PROJECT_CONFIG.PATHS,
  }),
  parts.styles({
    include: PROJECT_CONFIG.PATHS.app,
  }),
  parts.less(),
  parts.copyFolder({
    from: 'images',
    to: 'images',
  }),
])

const productionConfig = parts.production()

const developmentConfig = parts.devServer({
  host: PROJECT_CONFIG.HOST,
  port: PROJECT_CONFIG.PORT,
})



module.exports = (env) => {
  // Webpack2 changed argument behavior compared to #1. 
  // Cannot pass custom parameters through the CLI anymore (--hi hey). 
  // Instead, it's better to go through the --env mechanism if you need to do this.
  // Object.keys(env).filter(key => key !== 'target').forEach(key => {})
  if (env.target === 'production') {
    return merge([commonConfig, productionConfig])
  }
  return merge([commonConfig, developmentConfig])
}
