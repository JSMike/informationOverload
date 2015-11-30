(function (angular, undefined) {
    "use strict";
    var google = angular.module("google");

    google.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("google", {
                parent: "profile",
                url: "/google",
                authenticate: true,
                views: {
                    "": {
                        templateUrl: "app/google/templates/google.html",
                        controller: "google.ctrl",
                        controllerAs: "vm"
                    }
                }
            });
    }]);

})(angular);
