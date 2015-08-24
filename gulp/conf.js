var path = require('path');
module.exports = {
  devPath: path.normalize(process.cwd() + '/clientDev'),
  distPath: path.normalize(process.cwd() + '/clientDist'),
  glob: ['./gulp/*.js'],
  globOptions: {ignore: './gulp/conf.js'},
  jsFiles: ['clientDev/app/**/*.js', 'server/**/*.js'],
  htmlFiles: ['clientDev/**/*.html', '!clientDev/lib/**/*.html'],
  lessFiles: ['clientDev/css/**/*.less'],
  cssDev: 'clientDev/css',
  cssDist: 'clientDist/css',
  jsDist: 'clientDist/app',
  imgFiles: 'clientDev/img/**/*.*',
  imgDist: 'clientDist/img'
};