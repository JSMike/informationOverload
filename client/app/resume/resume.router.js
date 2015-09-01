(function (angular, undefined) {
    "use strict";
    var resume = angular.module("mcRes");

    resume.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("resume", {
                url: "/resume",
                views: {
                    "": {
                        templateUrl: "app/resume/resume.html",
                        controller: "mcRes.ctrl"
                    }
                }
            });
    }]);

})(angular);
