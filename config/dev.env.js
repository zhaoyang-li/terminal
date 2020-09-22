var merge = require('webpack-merge')
var prodEnv = require('./prod.env')
var rcEnv = require('./rc.env')
var testEnv = require('./test.env')

module.exports = merge(prodEnv, rcEnv, testEnv, {
  NODE_ENV: '"development"'
})
