(function (angular, _, undefined) {
    "use strict";
    var core = angular.module("core");

    core.controller("core.ctrl", ["$scope", "$http", function ($scope, $http) {
        var vm = this;

    }]);

    core.controller("core.login.ctrl", ["$scope", "$http", function ($scope, $http) {
        var vm = this;

    }]);

    core.controller("core.sidenav.ctrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
        var vm = this;

        $scope.selected = "Local";

        vm.ids = [
            {
                "name": "Local",
                "icon": "person",
                "class": "default-primary-color"
            },
            {
                "name": "Facebook",
                "icon": "facebook",
                "class": "facebook-bg"
            },
            {
                "name": "Google",
                "icon": "google-plus",
                "class": "googleplus-bg"
            },
            {
                "name": "Twitter",
                "icon": "twitter",
                "class": "twitter-bg"
            }
        ];

        vm.selectId = function (idx) {
            $scope.selected = vm.ids[idx].name;
        };

        $scope.$watch("selected", function (selected, previous) {
            $state.go(selected.toLowerCase());
        });

    }]);

    core.controller("core.toolbar.ctrl", ["$scope", "$http", "$mdSidenav", "$state", function ($scope, $http, $mdSidenav, $state) {
        var vm = this;

        vm.logout = function () {
            $state.go("login");
        };

        vm.toggleSidenav = function (side) {
            $mdSidenav(side).toggle();
        };
    }]);
})(angular, _);
