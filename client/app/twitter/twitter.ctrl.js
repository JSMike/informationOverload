(function (angular, _, undefined) {
    "use strict";
    var twitter = angular.module("twitter");

    twitter.controller("twitter.ctrl", ["$scope", "$http", "$sessionStorage", "AuthService",
        function ($scope, $http, $sessionStorage, Auth) {
        var vm = this;
        vm.twitter = _.get($sessionStorage, "user.twitter");

        if (_.has(vm.twitter, "created")) {
            twitter.created = new Date(data.created);
        }
        if (_.has(vm.twitter, "status.created")) {
            twitter.status.created = new Date(data.status.created);
        }

        vm.twitterLogin = function () {
            $scope.message = "";
            Auth.loginWith("Twitter", function (msg) { $scope.message = msg; });
        };
        $scope.$watch(function () {
            return _.get($sessionStorage, "user.twitter");
        }, function (data) {
            if (_.has(data, "created")) {
                data.created = new Date(data.created);
            }
            if (_.has(data, "status.created")) {
                data.status.created = new Date(data.status.created);
            }
            vm.twitter = data;
        });
    }]);

})(angular, _);
