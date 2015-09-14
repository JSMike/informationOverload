(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider",
        function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {
        $mdThemingProvider.theme("default")
            .primaryPalette("blue-grey")
            .accentPalette("grey")
            .warnPalette("teal");

        // For all unmatched url, redirect to /
        $urlRouterProvider.otherwise("/mc");

        $stateProvider.state("mc", {
            url: "/mc",
            views: {
                "": {
                    templateUrl: "app/core/core.html",
                    controller: "mcCore.ctrl"
                },
                "main@mc": {
                    templateUrl: "app/core/templates/main.html",
                    controller: "mcCore.main"
                },
                "main-content@mc": {
                    templateUrl: "app/core/templates/main-content.html",
                    controller: "mcCore.main-content"

                },
                "left@mc": {
                    templateUrl: "app/core/templates/left-sidenav.html",
                    controller: "mcCore.left"
                },
                "right@mc": {
                    templateUrl: "app/core/templates/right-sidenav.html",
                    controller: "mcCore.right"
                }
            }
        });
    }]);
})(angular);
