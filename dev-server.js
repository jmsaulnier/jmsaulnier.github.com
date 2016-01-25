var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('./build/webpack.dev.conf')

var app = express()
var compiler = webpack(config)

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}))

app.use(express.static(__dirname + '/'));

// enable hot-reload and state-preserving
// compilation error display
app.use(require('webpack-hot-middleware')(compiler))

app.listen(8080, '0.0.0.0', function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening to port:8080')
})
