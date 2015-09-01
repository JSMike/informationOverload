(function (angular, undefined) {
    "use strict";
    var resume = angular.module("mcRes");

    resume.directive("mcRes.banner", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/resume/resume.html"
        };
    }]);

})(angular);
