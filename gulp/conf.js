var path = require('path');
module.exports = {
  devPath: path.join(process.cwd(), '/clientDev'),
  distPath: path.join(process.cwd(), '/clientDist'),
  glob: ['./gulp/*.js'],
  globOptions: {ignore: './gulp/conf.js'},
  jsFiles: ['clientDev/app/**/*.js', 'server/**/*.js', 'gulp/**/*.js'],
  htmlFiles: ['clientDev/**/*.html', '!clientDev/lib/**/*.html'],
  lessFiles: ['clientDev/css/**/*.less'],
  cssDev: 'clientDev/css',
  cssDist: 'clientDist/css',
  cssFiles: ['clientDev/css/**/*.css', 'clientDist/css/**/*.css'],
  jsDist: 'clientDist/app',
  imgFiles: 'clientDev/img/**/*.*',
  imgDist: 'clientDist/img',
  nodemon: {
      script: 'server/server.js',
      delayTime: 1,
      watch: ['server/**/*.js'],
      env: {
          'PORT': 3000,
          'NODE_ENV': 'dist'
      }
  }
};