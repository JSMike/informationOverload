var path = require('path');
module.exports = {
  devPath: path.normalize(process.cwd() + '/clientDev'),
  distPath: path.normalize(process.cwd() + '/clientDist'),
  glob: ['./gulp/*.js'],
  globOptions: {ignore: './gulp/conf.js'},
  jsFiles: ['clientDev/app/**/*.js', 'server/**/*.js'],
  htmlFiles: ['clientDev/index.html', 'clientDev/app/**/*.html'],
  lessFiles: ['clientDev/css/**/*.less'],
  cssDev: 'clientDev/css',
  cssDist: 'clientDist/css',
  jsDist: 'clientDist/app'
};