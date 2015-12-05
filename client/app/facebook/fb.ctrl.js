(function (angular, _, undefined) {
    "use strict";
    var fb = angular.module("facebook");

    fb.controller("facebook.ctrl", ["$scope", "$http", "$sessionStorage", "AuthService",
        function ($scope, $http, $sessionStorage, Auth) {
        var vm = this;
        vm.fb = _.get($sessionStorage, "user.facebook");
        if (_.has(vm.fb, "updated")) {
            vm.fb.updated = new Date(vm.fb.updated);
        }

        vm.facebookLogin = function () {
            $scope.message = "";
            Auth.loginWith("Facebook", function (msg) { $scope.message = msg; });
        };
        $scope.$watch(function () {
            return _.get($sessionStorage, "user.facebook");
        }, function (data) {
            if (_.has(data, "updated")) {
                data.updated = new Date(data.updated);
            }
            vm.fb = data;
        });
    }]);

})(angular, _);
