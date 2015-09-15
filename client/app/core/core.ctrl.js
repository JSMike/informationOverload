(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.controller("mcCore.ctrl", ["$scope", function ($scope) {

    }]);

    core.controller("mcCore.main", ["$scope", "$mdSidenav", function ($scope, $mdSidenav) {
        $scope.openLeftMenu = function () {
            $mdSidenav("left").toggle();
        };
    }]);

    core.controller("mcCore.main-content", ["$scope", function ($scope) {

    }]);

    core.controller("mcCore.right", ["$scope", function ($scope) {

    }]);

    core.controller("mcCore.left", ["$scope", function ($scope) {

    }]);

    core.controller("navCtrl", ["$scope", "$mdSidenav", "$location", function ($scope, $mdSidenav, $location) {
        $scope.tabs = [
            "/mc/blog",
            "/mc/links",
            "/mc/portfolio",
            "/mc/resume"
        ];

        $scope.tabIndex = $scope.tabs.indexOf($location.url());

        if ($scope.tabIndex < 0) {
            $scope.tabIndex = 0;
        }

        $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
        };

        $scope.$watch("tabIndex", function (selected, previous) {
            $location.url($scope.tabs[selected]);
        });

    }]);

})(angular);
