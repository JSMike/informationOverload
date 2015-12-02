"use strict";

var path = require("path");
var _ = require("lodash");
var User = require("./models/user");

var routing = function (router, staticPath, passport) {

    router.post("/login", function (req, res, next) {
        passport.authenticate("local", function (err, user, msg) {
            if (err) {
                return res.send({
                    "error": true,
                    "redirect": "login",
                    "message": _.get(err, "message", "Error!")
                });
            }
            if (!user) {
                return res.send({
                    "error": true,
                    "redirect": "login",
                    "message": msg
                });
            }
            return res.send(user);
        })(req, res, next);
    });

    router.get("/logout", isLoggedIn, function (req, res) {
        req.logout();
        res.send({ "redirect": "login" });
    });

    router.get("/delete", isLoggedIn, function (req, res) {
        if (req.user) {
            process.nextTick(function () {
                User.delete(req.user, function (err, data) {
                    if (err) {
                        return res.send({
                            "error": true,
                            "message": err.message
                        });
                    }
                    return res.send({ "redirect": "login" });
                });
            });
            req.logout();
            res.send({ "redirect": "login" });
        }
    });

    router.get("/connect/local", isLoggedIn, function (req, res, next) {
        passport.authenticate("add-local", function (err, user, msg) {
            if (err) {
                return res.send({
                    "error": true,
                    "redirect": "login",
                    "message": _.get(err, "message", "Error!")
                });
            }
            if (!user) {
                return res.send({
                    "error": true,
                    "redirect": "login",
                    "message": msg
                });
            }
            return res.send(user);
        })(req, res, next);
    });

    router.get("*", function (req, res) {
        return res.sendFile(path.join(staticPath, "index.html"));
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.send({ "redirect": "login" });
}

module.exports = routing;
