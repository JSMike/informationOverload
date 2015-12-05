(function (angular, _, undefined) {
    "use strict";
    var fb = angular.module("facebook");

    fb.controller("facebook.ctrl", ["$scope", "$http", "$sessionStorage", "AuthService",
        function ($scope, $http, $sessionStorage, Auth) {
        var vm = this;
        vm.fb = _.get($sessionStorage, "user.facebook");
        vm.facebookLogin = function () {
            $scope.message = "";
            Auth.loginWith("Facebook", function (msg) { $scope.message = msg; });
        };
        $scope.$watch(function () {
            return _.get($sessionStorage, "user.facebook");
        }, function (data) {
            vm.fb = data;
        });
    }]);

})(angular, _);
