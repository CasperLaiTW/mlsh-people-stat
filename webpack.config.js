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
    ]
  }
}