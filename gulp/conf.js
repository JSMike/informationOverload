'use strict';

var path = require('path');
module.exports = {
    devPath: path.join(process.cwd(), '/clientDev'),
    distPath: path.join(process.cwd(), '/clientDist'),
    gulpFiles: ['./gulp/*.js'],
    globOptions: {ignore: './gulp/conf.js'},
    jsFiles: ['clientDev/app/**/*.js', 'server/**/*.js', 'gulp/**/*.js'],
    htmlFiles: 'clientDev/**/*.html',
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
    },
    wiredep: {
        fileTypes: {
            html: {
                replace: {
                    js: function (filePath) {
                        filePath = filePath.split('/');
                        filePath.shift();
                        filePath = filePath.join('/');
                        return '<script src="' + filePath + '"></script>';
                    },
                    css: function (filePath) {
                        filePath = filePath.split('/');
                        filePath.shift();
                        filePath = filePath.join('/');
                        return '<link rel="stylesheet" href="' + filePath + '"/>';
                    }
                }
            }
        }
    },
    inject: {
        js: {
            addRootSlash: false,
            transform: function (filePath) {
                filePath = filePath.split('/');
                filePath.shift();
                filePath = filePath.join('/');
                return '<script src="' + filePath + '"></script>';
            }
        },
        css: {
            addRootSlash: false,
            transform: function (filePath) {
                filePath = filePath.split('/');
                filePath.shift();
                filePath = filePath.join('/');
                return '<link rel="stylesheet" href="' + filePath + '"/>';
            }
        }

    }
};
