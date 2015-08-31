(function (angular, undefined) {
    "use strict";
    var router = angular.module("mcCore.router", ["ui.router"]);

    router.config(["$stateProvider", "$urlRouterProvider"], function ($stateProvider, $urlRouterProvider) {
        // For all unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");
    });
})(angular);
