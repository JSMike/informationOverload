(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        // For all unmatched url, redirect to /
        $urlRouterProvider.otherwise("/");

        $stateProvider.state('index', {
            url: "/",
            views: {
                "": {
                    templateUrl: "app/core/core.html",
                    controller: "mainController"
                }
            }
        });
    }]);
})(angular);
