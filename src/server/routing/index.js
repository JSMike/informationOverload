var routing = function (router) {

  router.get('*', function(req, res) {
    res.send('index.html');
  });

};

module.exports = routing;
