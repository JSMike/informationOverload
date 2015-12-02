(function (angular, undefined) {
    "use strict";
    var twitter = angular.module("twitter");

    twitter.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("twitter", {
                parent: "profile",
                url: "/twitter",
                views: {
                    "": {
                        templateUrl: "app/twitter/templates/twitter.html",
                        controller: "twitter.ctrl",
                        controllerAs: "vm"
                    }
                }
            });
    }]);

})(angular);
