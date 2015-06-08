module.exports = {
  watch: false,
  outputDir: "dist/js",
  output: {
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel?cacheDirectory'
      },
      {
        test: /.css$/,
        loader: 'style!css'
      },
      {
        test: /\.png$/,
        loader: 'url?limit=150000&mimetype=image/png'
      },
      {
        test: /\.jpg$/,
        loader: 'file'
      },
      {
        test: /\.woff2?$/,
        loader: 'url?mimetype=application/font-woff'
      },
      {
        test: /\.eot$/,
        loader: 'url?mimetype=application/font-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url?mimetype=application/font-woff'
      },
      {
        test: /\.svg$/,
        loader: 'url?mimetype=image/svg+xml'
      },
    ]
  }
}