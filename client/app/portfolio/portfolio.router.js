(function (angular, undefined) {
    "use strict";
    var port = angular.module("mcPort");

    port.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("portfolio", {
                url: "/port",
                views: {
                    "": {
                        templateUrl: "app/port/port.html",
                        controller: "mcport.ctrl"
                    }
                }
            });
    }]);

})(angular);
