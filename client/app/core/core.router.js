(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        // For all unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");
    }]);
})(angular);
