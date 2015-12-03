(function (angular, _, undefined) {
    "use strict";
    var core = angular.module("core");

    core.factory("AuthService", ["$http", "$state", "$sessionStorage", "$mdToast", "$document",
        function ($http, $state, $sessionStorage, $mdToast, $document) {
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
                            $state.go(_.get(res, "data.redirect", "login"));
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
