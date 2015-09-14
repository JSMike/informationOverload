(function (angular, undefined) {
    "use strict";
    var port = angular.module("mcPort");

    port.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("portfolio", {
                parent: "mc",
                url: "/portfolio",
                views: {
                    "": {
                        templateUrl: "app/portfolio/portfolio.html",
                        controller: "mcPort.ctrl"
                    }
                }
            });
    }]);

})(angular);
