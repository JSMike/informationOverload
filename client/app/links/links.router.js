(function (angular, undefined) {
    "use strict";
    var links = angular.module("mcLinks");

    links.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("links", {
                parent: "mc",
                url: "/links",
                views: {
                    "": {
                        templateUrl: "app/links/links.html",
                        controller: "mcLinks.ctrl"
                    }
                }
            });
    }]);

})(angular);
