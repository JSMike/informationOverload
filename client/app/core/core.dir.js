(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.directive("mcCore.banner", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/core/core.html"
        };
    }]);

})(angular);
