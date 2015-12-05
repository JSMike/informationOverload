(function (angular, _, undefined) {
    "use strict";
    var core = angular.module("core");

    core.factory("AuthService", ["$http", "$state", "$sessionStorage", "$mdToast", "$window",
        function ($http, $state, $sessionStorage, $mdToast, $window) {
        return {
            isLoggedIn: function () {
                return !!$sessionStorage.user;
            },

            localLogin: function (email, password, cb) {
                $http
                    .post("/login", { email: email, password: password })
                    .then(function (res) {
                        if (_.has(res, "data.error")) {
                            $state.go(_.get(res, "data.redirect", "login"));
                            $mdToast.showSimple(_.get(res, "data.message", "An error occured! (1)"));
                        } else if (_.has(res, "data.fail")) {
                            return cb(_.get(res, "data.message", "Failed to log in!"));
                        } else if (!_.has(res, "data.user")) {
                            $state.go(_.get(res, "data.redirect", "login"));
                            $mdToast.showSimple(_.get(res, "data.message", "Error! No user data found!"));
                        } else {
                            $sessionStorage.user = res.data.user;
                            $state.go(_.get(res, "data.redirect", "local"));
                        }
                        return cb();
                    })
                    .catch(function (err) {
                        $state.go(_.get(err, "data.redirect", "login"));
                        $mdToast.showSimple(_.get(err, "data.message", "An error occured! (2)"));
                    });
            },
            loginWith: function (provider, cb) {
                if (!{ "Facebook": 1, "Twitter": 1, "Google": 1 }.hasOwnProperty(provider)) {
                    return cb("Invalid provider!");
                }

                $http.get("/auth/" + provider.toLowerCase() + "/confirm")
                    .then(function (res) {
                        if (_.has(res, "data.error")) {
                            $state.go(_.get(res, "data.redirect", "login"));
                            $mdToast.showSimple(_.get(res, "data.message", "An error occured! (1)"));
                        } else if (_.has(res, "data.fail")) {
                            return cb(_.get(res, "data.message", "Failed to log in!"));
                        } else if (!_.has(res, "data.user")) {
                            $state.go(_.get(res, "data.redirect", "login"));
                            $mdToast.showSimple(_.get(res, "data.message", "Error! No user data found!"));
                        } else {
                            $sessionStorage.user = res.data.user;
                            $state.go(provider.toLowerCase());
                        }
                        return cb();
                    })
                    .catch(function (err) {
                        $state.go(_.get(err, "data.redirect", "login"));
                        return cb(_.get(err, "data.message", "Failed to log in with " + provider + "!"));
                    });
                $window.open("/auth/" + provider.toLowerCase(), provider, "width=700,height=500");
            },
            logout: function () {
                $http
                    .get("/logout")
                    .then(function (res) {
                        $sessionStorage.user = null;
                        $state.go(_.get(res, "data.redirect", "login"));
                    })
                    .catch(function (err) {
                        $mdToast.showSimple(_.get(err, "data.message", "An error occured! (3)"));
                        $state.go(_.get(err, "data.redirect", "login"));
                    });
            },
            delete: function () {
                $http
                    .get("/delete")
                    .then(function (res) {
                        $sessionStorage.user = null;
                        $state.go(_.get(res, "data.redirect", "login"));
                        $mdToast.showSimple(_.get(res, "data.message", "No user data found."));
                    })
                    .catch(function (err) {
                        $mdToast.showSimple(_.get(err, "data.message", "An error occured! (4)"));
                        $state.go(_.get(err, "data.redirect", "login"));
                    });
            }
        };
    }]);
})(angular, _);
