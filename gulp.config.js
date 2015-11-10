"use strict";

var path = require("path");
module.exports = {
    devPath: path.join(process.cwd(), "/client"),
    distPath: path.join(process.cwd(), "/build"),
    gulpFiles: ["gulp/*.js"],
    jsFiles: {
        modules: ["client/app/app.js","client/app/**/*.module.js"],
        controllers: ["client/app/**/*.ctrl.js"],
        directives: ["client/app/**/*.dir.js"],
        routers: ["client/app/**/*.router.js"],
        apptests: ["client/app/**/*.spec.js"],
        server: ["server/**/*.js", "!server/**/*.spec.js"],
        servertests: ["server/**/*.spec.js"],
        gulp: ["./gulp/**/*.js", "./gulpfile.js", "./gulp.config.js"],
        build: ["build/**/*.js"],
        watch: ["gulp.config.js", "gulpfile.js", "client/app/**/*.js", "server/**/*.js", "gulp/**/*.js"],
        app: ["client/app/**/*.js"]
    },
    htmlFiles: "client/**/*.html",
    lessFiles: ["client/css/styles.less"],
    cssDev: "client/css",
    cssDist: "build/css",
    cssFiles: ["client/css/**/*.css", "build/css/**/*.css"],
    jsDist: "build/js",
    imgFiles: "client/img/**/*.*",
    imgDist: "build/img",
    htmlhintoptions: {"doctype-first": false},
    nodemon: {
        script: "server/server.js",
        delayTime: 1,
        watch: ["server/**/*.js"],
        env: {
            "PORT": 80,
            "NODE_ENV": "dev"
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
        },
        app: ["client/js/hhaw.js"],
        other: ["client/js/**/*.js", "!client/js/hhaw.js"],
        cssFiles: ["client/css/**/*.css"]

    }
};
