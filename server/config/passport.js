"use strict";

// load all the things we need
var LocalStrategy = require("passport-local").Strategy;
var FacebookStrategy = require("passport-facebook").Strategy;
var TwitterStrategy = require("passport-twitter").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var _ = require("lodash");

// load up the user model
var User = require("./models/user");

// load the auth variables
var configAuth = require("./auth"); // use this one for testing

module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use("local-login", new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function (req, email, password, done) {
        if (email) {
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        }

        // asynchronous
        process.nextTick(function () {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ "local.email": email }, function (err, user) {
                    // if there are any errors, return the error
                    if (err) {
                        return done(err);
                    }

                    // if no user is found then create user
                    if (!user) {
                        var newUser = new User();

                        newUser.local.email = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            }

                            return done(null, newUser);
                        });
                    } else if (user && !user.validPassword(password)) {
                        return done(null, false, "Invalid Password!");

                    // all is well, return user
                    } else {
                        return done(null, user);
                    }
                });
            } else if (!req.user.local.email) {
                // ...presumably they"re trying to connect a local account
                // BUT let"s check if the email used to connect a local account is being used by another user
                User.findOne({ "local.email": email }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        return done(null, false, "That email is already taken.");
                        // Using "loginMessage instead of signupMessage because it"s used by /connect/local"
                    } else {
                        user = req.user;
                        user.local.email = email;
                        user.local.password = user.generateHash(password);
                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            }

                            return done(null, user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));

    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({

        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: [
            "id",
            "name",
            "displayName",
            "gender",
            "profileUrl",
            "emails",
            "photos",
            "friends",
            "age_range",
            "locale",
            "timezone",
            "updated_time"
        ],
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function (req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ "facebook.id": profile.id }, function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (user) {
                        user.facebook.token = token;
                        user.facebook.id = _.get(profile, "id");
                        user.facebook.name = _.get(profile, "displayName");
                        user.facebook.email = _.get(profile, "_json.email");
                        user.facebook.age = _.get(profile, "_json.age_range");
                        user.facebook.friends = _.get(profile, "_json.friends.summary.total_count");
                        user.facebook.gender = _.get(profile, "_json.gender");
                        user.facebook.photos = _.get(profile, "photos");
                        user.facebook.profile = _.get(profile, "profileUrl");
                        user.facebook.timezone = _.get(profile, "_json.timezone");
                        user.facebook.locale = _.get(profile, "_json.locale");
                        user.facebook.updated = new Date(_.get(profile, "_json.updated_time"));

                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            }
                            return done(null, user);
                        });
                    } else {
                        // if there is no user, create them
                        var newUser = new User();

                        newUser.facebook.token = token;
                        newUser.facebook.id = _.get(profile, "id");
                        newUser.facebook.name = _.get(profile, "displayName");
                        newUser.facebook.email = _.get(profile, "_json.email");
                        newUser.facebook.age = _.get(profile, "_json.age_range");
                        newUser.facebook.friends = _.get(profile, "_json.friends.summary.total_count");
                        newUser.facebook.gender = _.get(profile, "_json.gender");
                        newUser.facebook.photos = _.get(profile, "photos");
                        newUser.facebook.profile = _.get(profile, "profileUrl");
                        newUser.facebook.timezone = _.get(profile, "_json.timezone");
                        newUser.facebook.locale = _.get(profile, "_json.locale");
                        newUser.facebook.updated = new Date(_.get(profile, "_json.updated_time"));

                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            }
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.facebook.token = token;
                user.facebook.id = _.get(profile, "id");
                user.facebook.name = _.get(profile, "displayName");
                user.facebook.email = _.get(profile, "_json.email");
                user.facebook.age = _.get(profile, "_json.age_range");
                user.facebook.friends = _.get(profile, "_json.friends.summary.total_count");
                user.facebook.gender = _.get(profile, "_json.gender");
                user.facebook.photos = _.get(profile, "photos");
                user.facebook.profile = _.get(profile, "profileUrl");
                user.facebook.timezone = _.get(profile, "_json.timezone");
                user.facebook.locale = _.get(profile, "_json.locale");
                user.facebook.updated = new Date(_.get(profile, "_json.updated_time"));

                user.save(function (err) {
                    if (err) {
                        return done(err);
                    }

                    return done(null, user);
                });

            }
        });

    }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function (req, token, tokenSecret, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ "twitter.id": profile.id }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        user.twitter.id = _.get(profile, "id");
                        user.twitter.token = token;
                        user.twitter.username = _.get(profile, "username");
                        user.twitter.name = _.get(profile, "displayName");
                        user.twitter.image = _.get(profile, "_json.profile_image_url", "").replace("_normal", "");
                        user.twitter.created = new Date (_.get(profile, "_json.created_at"));
                        user.twitter.description = _.get(profile, "_json.description");
                        user.twitter.followers = _.get(profile, "_json.followers_count");
                        user.twitter.friends = _.get(profile, "_json.friends_count");
                        user.twitter.location = _.get(profile, "_json.location");
                        user.twitter.language = _.get(profile, "_json.lang");
                        user.twitter.status = {
                            created: _.get(profile, "_json.status.created_at"),
                            text: _.get(profile, "_json.status.text"),
                            retweets: _.get(profile, "_json.status.retweet_count")
                        };
                        user.twitter.tweets = _.get(profile, "_json.statuses_count");
                        user.twitter.url = _.get(profile, "_json.url");

                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            }

                            return done(null, user);
                        });
                    } else {
                        // if there is no user, create them
                        var newUser = new User();

                        newUser.twitter.id = _.get(profile, "id");
                        newUser.twitter.token = token;
                        newUser.twitter.username = _.get(profile, "username");
                        newUser.twitter.name = _.get(profile, "displayName");
                        newUser.twitter.image = _.get(profile, "_json.profile_image_url", "").replace("_normal", "");
                        newUser.twitter.created = new Date (_.get(profile, "_json.created_at"));
                        newUser.twitter.description = _.get(profile, "_json.description");
                        newUser.twitter.followers = _.get(profile, "_json.followers_count");
                        newUser.twitter.friends = _.get(profile, "_json.friends_count");
                        newUser.twitter.location = _.get(profile, "_json.location");
                        newUser.twitter.language = _.get(profile, "_json.lang");
                        newUser.twitter.status = {
                            created: _.get(profile, "_json.status.created_at"),
                            text: _.get(profile, "_json.status.text"),
                            retweets: _.get(profile, "_json.status.retweet_count")
                        };
                        newUser.twitter.tweets = _.get(profile, "_json.statuses_count");
                        newUser.twitter.url = _.get(profile, "_json.url");

                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            }

                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.twitter.id = _.get(profile, "id");
                user.twitter.token = token;
                user.twitter.username = _.get(profile, "username");
                user.twitter.name = _.get(profile, "displayName");
                user.twitter.image = _.get(profile, "_json.profile_image_url", "").replace("_normal", "");
                user.twitter.created = new Date (_.get(profile, "_json.created_at"));
                user.twitter.description = _.get(profile, "_json.description");
                user.twitter.followers = _.get(profile, "_json.followers_count");
                user.twitter.friends = _.get(profile, "_json.friends_count");
                user.twitter.location = _.get(profile, "_json.location");
                user.twitter.language = _.get(profile, "_json.lang");
                user.twitter.status = {
                    created: _.get(profile, "_json.status.created_at"),
                    text: _.get(profile, "_json.status.text"),
                    retweets: _.get(profile, "_json.status.retweet_count")
                };
                user.twitter.tweets = _.get(profile, "_json.statuses_count");
                user.twitter.url = _.get(profile, "_json.url");

                user.save(function (err) {
                    if (err) {
                        return done(err);
                    }

                    return done(null, user);
                });
            }

        });

    }));

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({

        clientID: configAuth.googleAuth.clientID,
        clientSecret: configAuth.googleAuth.clientSecret,
        callbackURL: configAuth.googleAuth.callbackURL,
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function (req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function () {

            // check if the user is already logged in
            if (!req.user) {

                User.findOne({ "google.id": profile.id }, function (err, user) {
                    if (err) {
                        return done(err);
                    }

                    if (user) {
                        user.google.id = _.get(profile, "id");
                        user.google.token = token;
                        user.google.name = _.get(profile, "displayName", "");
                        user.google.age = _.get(profile, "_json.ageRange");
                        user.google.gender = _.get(profile, "_json.gender");
                        user.google.image = _.get(profile, "_json.image.url", "").replace(/\?.*/, "");
                        user.google.language = _.get(profile, "_json.language");

                        user.save(function (err) {
                            if (err) {
                                return done(err);
                            }

                            return done(null, user);
                        });
                    } else {
                        var newUser = new User();

                        newUser.google.id = _.get(profile, "id");
                        newUser.google.token = token;
                        newUser.google.name = _.get(profile, "displayName", "");
                        newUser.google.age = _.get(profile, "_json.ageRange");
                        newUser.google.gender = _.get(profile, "_json.gender");
                        newUser.google.image = _.get(profile, "_json.image.url", "").replace(/\?.*/, "");
                        newUser.google.language = _.get(profile, "_json.language");

                        newUser.save(function (err) {
                            if (err) {
                                return done(err);
                            }

                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user = req.user; // pull the user out of the session

                user.google.id = _.get(profile, "id");
                user.google.token = token;
                user.google.name = _.get(profile, "displayName", "");
                user.google.age = _.get(profile, "_json.ageRange");
                user.google.gender = _.get(profile, "_json.gender");
                user.google.image = _.get(profile, "_json.image.url", "").replace(/\?.*/, "");
                user.google.language = _.get(profile, "_json.language");

                user.save(function (err) {
                    if (err) {
                        return done(err);
                    }

                    return done(null, user);
                });

            }

        });

    }));

};
