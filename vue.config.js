module.exports = {
  // 选项...
  publicPath: '/saasTenant/',
  outputDir: './dist/saasTenant',
  devServer: {
    proxy: 'https://test-passport.dbs12580.com/'
  }
}