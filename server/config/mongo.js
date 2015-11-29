"use strict";

var mongoInfo = function (host, port) {
    return {
        "url": "mongodb://" + (host || "127.0.0.1") + ":" + (port || 27017) + "/mcebrian"
    };
};

module.exports = mongoInfo;
