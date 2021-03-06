"use strict";

// load the things we need
var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

// define the schema for our user model
var userSchema = mongoose.Schema({
    local: {
        email: String,
        password: String
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String,
        age: {
            min: Number,
            max: Number
        },
        friends: Number,
        gender: String,
        photos: [{ value: String }],
        profile: String,
        timezone: Number,
        locale: String,
        updated: Date
    },
    twitter: {
        id: String,
        token: String,
        username: String,
        name: String,
        image: String,
        created: Date,
        description: String,
        followers: Number,
        friends: Number,
        location: String,
        language: String,
        status: {
            created: Date,
            text: String,
            retweets: Number
        },
        tweets: Number,
        url: String
    },
    google: {
        id: String,
        token: String,
        image: String,
        gender: String,
        age: {
            min: Number,
            max: Number
        },
        language: String,
        name: String
    }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model("User", userSchema);
