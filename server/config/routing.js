"use strict";

var path = require("path");
var _ = require("lodash");
var User = require("./models/user");
var Events = require("events");
var evt = new Events.EventEmitter();

var routing = function (router, staticPath, passport) {

    router.post("/login", function (req, res, next) {
        passport.authenticate("local-login", function (err, user, msg) {
            if (err) {
                return res.json({
                    "error": true,
                    "redirect": "login",
                    "message": _.get(err, "message", "Error!")
                });
            }
            if (!user) {
                return res.json({
                    "fail": true,
                    "message": msg
                });
            }
            req.login(user, function (e) {
                if (e) {
                    return res.json({
                        "error": true,
                        "redirect": "login",
                        "message": _.get(e, "message", "Error!")
                    });
                }
                return res.json({
                    "user": user,
                    "redirect": "local"
                });
            });
        })(req, res, next);
    });

    router.get("/logout", isLoggedIn, function (req, res) {
        req.logout();
        res.json({ "redirect": "login" });
    });

    router.get("/delete", isLoggedIn, function (req, res) {
        if (req.user) {
            process.nextTick(function () {
                User.remove({ _id: req.user._id }, function (err, data) {
                    if (err) {
                        return res.json({
                            "error": true,
                            "message": err.message
                        });
                    }
                    req.logout();
                    return res.json({
                        "redirect": "login",
                        "message": "User deleted successfully!"
                    });
                });
            });
        } else {
            return res.json({ "redirect": "login" });
        }
    });

    // facebook -------------------------------

    // send to facebook to do the authentication (do this in a new window)
    router.get("/auth/facebook", passport.authenticate("facebook", {
        scope: [
            "public_profile",
            "user_friends",
            "email"
        ]
    }));

    // handle the callback after facebook has authenticated the user
    router.get("/auth/facebook/callback", function (req, res, next) {
        passport.authenticate("facebook", function (err, user, msg) {
            if (err) {
                evt.emit(_.get(req, "session.id") + ":facebook", {
                    "error": true,
                    "message": _.get(err, "message", "Error!")
                });
                return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
            }
            if (!user) {
                evt.emit(_.get(req, "session.id") + ":facebook", {
                    "error": true,
                    "message": "User Not Found"
                });
                return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
            }

            req.login(user, function (e) {
                if (e) {
                    evt.emit(_.get(req, "session.id") + ":facebook", {
                        "error": true,
                        "redirect": "login",
                        "message": _.get(e, "message", "Error!")
                    });
                } else {
                    evt.emit(_.get(req, "session.id") + ":facebook", {
                        "user": user
                    });
                }
            });

            return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
        })(req, res, next);
    });

    // send data back to
    router.get("/auth/facebook/confirm", function (req, res) {
        evt.once(_.get(req, "session.id") + ":facebook", function (response) {
            return res.json(response);
        });
    });

    // twitter --------------------------------

    // send to twitter to do the authentication
    router.get("/auth/twitter", passport.authenticate("twitter"));

    // handle the callback after twitter has authenticated the user
    router.get("/auth/twitter/callback", function (req, res, next) {
        passport.authenticate("twitter", function (err, user, msg) {
            if (err) {
                evt.emit(_.get(req, "session.id") + ":twitter", {
                    "error": true,
                    "message": _.get(err, "message", "Error!")
                });
                return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
            }
            if (!user) {
                evt.emit(_.get(req, "session.id") + ":twitter", {
                    "error": true,
                    "message": "User Not Found"
                });
                return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
            }

            req.login(user, function (e) {
                if (e) {
                    evt.emit(_.get(req, "session.id") + ":twitter", {
                        "error": true,
                        "redirect": "login",
                        "message": _.get(e, "message", "Error!")
                    });
                } else {
                    evt.emit(_.get(req, "session.id") + ":twitter", {
                        "user": user
                    });
                }
            });

            return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
        })(req, res, next);
    });

    // send data back to
    router.get("/auth/twitter/confirm", function (req, res) {
        evt.once(_.get(req, "session.id") + ":twitter", function (response) {
            return res.json(response);
        });
    });

    // google ---------------------------------

    // send to google to do the authentication
    router.get("/auth/google", passport.authenticate("google", {
        scope: ['https://www.googleapis.com/auth/plus.login']
    }));

    // the callback after google has authenticated the user
    router.get("/auth/google/callback", function (req, res, next) {
        passport.authenticate("google", function (err, user, msg) {
            if (err) {
                evt.emit(_.get(req, "session.id") + ":google", {
                    "error": true,
                    "message": _.get(err, "message", "Error!")
                });
                return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
            }
            if (!user) {
                evt.emit(_.get(req, "session.id") + ":google", {
                    "error": true,
                    "message": "User Not Found"
                });
                return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
            }
            req.login(user, function (e) {
                if (e) {
                    evt.emit(_.get(req, "session.id") + ":google", {
                        "error": true,
                        "redirect": "login",
                        "message": _.get(e, "message", "Error!")
                    });
                } else {
                    evt.emit(_.get(req, "session.id") + ":google", {
                        "user": user
                    });
                }
            });
            return res.sendFile(path.join(staticPath, "/app/core/templates/close.html"));
        })(req, res, next);
    });

    // send data back to
    router.get("/auth/google/confirm", function (req, res) {
        evt.once(_.get(req, "session.id") + ":google", function (response) {
            return res.json(response);
        });
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.json({ "redirect": "login" });
}

module.exports = routing;
