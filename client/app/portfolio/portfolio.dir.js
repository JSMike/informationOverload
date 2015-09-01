(function (angular, undefined) {
    "use strict";
    var port = angular.module("mcPort");
    port.directive("mcPort.banner", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/portfolio/portfolio.html"
        };
    }]);

})(angular);
