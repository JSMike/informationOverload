(function (angular, undefined) {
    "use strict";
    var core = angular.module("core");

    core.config(["$stateProvider", "$urlRouterProvider", "$mdThemingProvider",
        function ($stateProvider, $urlRouterProvider, $mdThemingProvider) {

            $mdThemingProvider.theme("default")
                .primaryPalette("indigo")
                .accentPalette("blue")
                .warnPalette("pink");

            // For all unmatched url, redirect to /login
            $urlRouterProvider.otherwise("/login");

            $stateProvider
                .state("login", {
                    url: "/login",
                    views: {
                        "": {
                            templateUrl: "app/core/templates/login.html",
                            controller: "core.login.ctrl",
                            controllerAs: "vm"
                        }
                    }
                })
                .state("profile", {
                    url: "/profile",
                    data: {
                        authenticate: true
                    },
                    views: {
                        "": {
                            templateUrl: "app/core/templates/profile.html",
                            controller: "core.ctrl",
                            controllerAs: "vm"
                        },
                        "sidenav@profile": {
                            templateUrl: "app/core/templates/sidenav.html",
                            controller: "core.sidenav.ctrl",
                            controllerAs: "vm"
                        },
                        "toolbar@profile": {
                            templateUrl: "app/core/templates/toolbar.html",
                            controller: "core.toolbar.ctrl",
                            controllerAs: "vm"
                        },
                    }
                });
        }]);
})(angular);
