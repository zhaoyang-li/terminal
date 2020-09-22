require('./check-versions')()

var version = process.argv.splice(2)[0]
if (version === 'test') {
  process.env.NODE_ENV = 'test'
} else if (version === 'rc') {
  process.env.NODE_ENV = 'rc'
} else if (version === 'prod') {
  process.env.NODE_ENV = 'production'
} else {
  process.env.NODE_ENV = 'development'
}

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')

var spinner
if (version === 'test') {
  spinner = ora('building for test...')
} else if (version === 'rc') {
  spinner = ora('building for rc...')
} else if (version === 'prod') {
  spinner = ora('building for production...')
} else {
  spinner = ora('building for development...')
}
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
