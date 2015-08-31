"use strict";

var path = require("path");
module.exports = {
    devPath: path.join(process.cwd(), "/client"),
    distPath: path.join(process.cwd(), "/build"),
    gulpFiles: ["./gulp/*.js"],
    jsFiles: ["client/app/**/*.js", "server/**/*.js", "gulp/**/*.js"],
    htmlFiles: "client/**/*.html",
    lessFiles: ["client/css/**/*.less"],
    cssDev: "client/css",
    cssDist: "build/css",
    cssFiles: ["client/css/**/*.css", "build/css/**/*.css"],
    jsDist: "build/app",
    imgFiles: "client/img/**/*.*",
    imgDist: "build/img",
    nodemon: {
        script: "server/server.js",
        delayTime: 1,
        watch: ["server/**/*.js"],
        env: {
            "PORT": 80,
            "NODE_ENV": "dist"
        }
    },
    wiredep: {
        fileTypes: {
            html: {
                replace: {
                    js: function (filePath) {
                        filePath = filePath.split("/");
                        filePath.shift();
                        filePath = filePath.join("/");
                        return '<script src="' + filePath + '"></script>';
                    },
                    css: function (filePath) {
                        filePath = filePath.split("/");
                        filePath.shift();
                        filePath = filePath.join("/");
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
                filePath = filePath.split("/");
                filePath.shift();
                filePath = filePath.join("/");
                return '<script src="' + filePath + '"></script>';
            }
        },
        css: {
            addRootSlash: false,
            transform: function (filePath) {
                filePath = filePath.split("/");
                filePath.shift();
                filePath = filePath.join("/");
                return '<link rel="stylesheet" href="' + filePath + '"/>';
            }
        }

    }
};
