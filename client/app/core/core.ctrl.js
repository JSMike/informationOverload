(function (angular, _, undefined) {
    "use strict";
    var core = angular.module("core");

    core.controller("core.ctrl", ["$scope", "$http", function ($scope, $http) {
        var vm = this;

    }]);

    core.controller("core.login.ctrl", ["$scope", "$http", "AuthService", function ($scope, $http, Auth) {
        var vm = this;
        vm.localLogin = function () {
            $scope.message = "";
            Auth.localLogin(vm.email, vm.password, function (msg) { $scope.message = msg; });
        };

        vm.loginWith = function (provider) {
            $scope.message = "";
            Auth.loginWith(provider, function (msg) { $scope.message = msg; });
        };
    }]);

    core.controller("core.sidenav.ctrl", ["$scope", "$rootScope", "$http", "$state", "$mdSidenav", "AuthService",
        function ($scope, $rootScope, $http, $state, $mdSidenav, Auth) {
        var vm = this;

        $scope.selected = _.get($state, "current.name", "profile") != "profile" ? $state.current.name : "local";
        vm.showToolbar = (!$mdSidenav("left").isLockedOpen() && $mdSidenav("left").isOpen());
        vm.ids = [
            {
                "name": "Local",
                "state": "local",
                "icon": "person",
                "class": "default-primary-color"
            },
            {
                "name": "Facebook",
                "state": "facebook",
                "icon": "facebook",
                "class": "facebook-bg"
            },
            {
                "name": "Google",
                "state": "google",
                "icon": "google-plus",
                "class": "googleplus-bg"
            },
            {
                "name": "Twitter",
                "state": "twitter",
                "icon": "twitter",
                "class": "twitter-bg"
            }
        ];

        vm.selectId = function (idx) {
            $scope.selected = vm.ids[idx].state;
            if (!$mdSidenav("left").isLockedOpen()) {
                $mdSidenav("left").close();
            }
        };

        vm.delete = function () {
            Auth.delete();
        };

        $scope.$watch("selected", function (selected, previous) {
            $state.go(selected);
        });

        $scope.$watch(function () {
            return (!$mdSidenav("left").isLockedOpen() && $mdSidenav("left").isOpen());
        }, function (current) {
            vm.showToolbar = current;
        });

        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            $scope.selected = toState.name;
        });

    }]);

    core.controller("core.toolbar.ctrl", ["$scope", "$http", "$mdSidenav", "$state", "AuthService",
        function ($scope, $http, $mdSidenav, $state, Auth) {
        var vm = this;

        vm.logout = function () {
            Auth.logout();
        };

        vm.toggleSidenav = function (side) {
            $mdSidenav(side).toggle();
        };
    }]);

    core.controller("core.toast.ctrl", ["$scope", function ($scope) {
        var vm = this;

    }]);

})(angular, _);
