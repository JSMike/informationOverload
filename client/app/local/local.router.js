(function (angular, undefined) {
    "use strict";
    var local = angular.module("local");

    local.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("local", {
                parent: "profile",
                url: "/local",
                authenticate: true,
                views: {
                    "": {
                        templateUrl: "app/local/templates/local.html",
                        controller: "local.ctrl",
                        controllerAs: "vm"
                    }
                }
            });
    }]);

})(angular);
