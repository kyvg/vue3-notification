const { merge } = require('webpack-merge')
const base = require('./webpack.config')

module.exports = merge(base, {
  target: 'node',
  output: {
    filename: 'ssr.js',
  },
})
