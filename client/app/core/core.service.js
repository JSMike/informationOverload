(function (angular, _, undefined) {
    "use strict";
    var core = angular.module("core");

    core.factory("AuthService", ["$http", "$state", "$sessionStorage",
        function ($http, $state, $cookie, $sessionStorage) {
        return {
            isLoggedIn: function () {
                return !!$sessionStorage.user;
            },

            localLogin: function (email, password) {
                $http
                    .post("/login", { email: email, password: password })
                    .then(function (res) {
                        if (_.has(res, "data.error")) {
                            //toast err.message
                            //redirect to err.redirect
                        } else if (!_.has(res, "data.user")) {
                            //toast unable to log in
                            //redirect to login page
                        } else {
                            $sessionStorage.user = res.data.user;
                            $state.go("local");
                        }
                    })
                    .catch(function (err) {
                        //toast error
                    });
            },
            logout: function () {
                $http
                    .get("/logout")
                    .then(function (res) {
                        $sessionStorage.user = null;
                        $state.go("login");
                    })
                    .catch(function (err) {
                        //toast error
                        $state.go("login");
                    });
            }
        };
    }]);
})(angular, _);
