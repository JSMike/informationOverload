(function (angular, undefined) {
    "use strict";
    var facebook = angular.module("facebook");

    facebook.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("facebook", {
                parent: "profile",
                url: "/facebook",
                views: {
                    "": {
                        templateUrl: "app/facebook/templates/facebook.html",
                        controller: "facebook.ctrl",
                        controllerAs: "vm"
                    }
                }
            });
    }]);

})(angular);
