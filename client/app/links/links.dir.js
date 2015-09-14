(function (angular, undefined) {
    "use strict";
    var links = angular.module("mcLinks");

    links.directive("mcLinks.banner", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/links/links.html"
        };
    }]);

})(angular);
