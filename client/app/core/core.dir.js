(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.directive("navbar", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/core/templates/navbar.html"
        };
    }]);

    core.directive("footer", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/core/templates/footer.html"
        };
    }]);

})(angular);
