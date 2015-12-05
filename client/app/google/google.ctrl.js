(function (angular, _, undefined) {
    "use strict";
    var google = angular.module("google");

    google.controller("google.ctrl", ["$scope", "$http", "$sessionStorage", "AuthService",
        function ($scope, $http, $sessionStorage, Auth) {
        var vm = this;
        vm.google = _.get($sessionStorage, "user.google");
        vm.googleLogin = function () {
            $scope.message = "";
            Auth.loginWith("Google", function (msg) { $scope.message = msg; });
        };
        $scope.$watch(function () {
            return _.get($sessionStorage, "user.google");
        }, function (data) {
            vm.google = data;
        });
    }]);

})(angular, _);
