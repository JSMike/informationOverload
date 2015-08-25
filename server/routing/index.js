'use strict';

var path = require('path');

var routing = function (router, staticPath) {
    router.get('*', function (req, res) {
        res.sendFile(path.join(staticPath, 'index.html'));
    });
};

module.exports = routing;
