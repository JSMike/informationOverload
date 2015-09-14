(function (angular, undefined) {
    "use strict";
    var core = angular.module("mcCore");

    core.directive("mcNavbar", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/core/templates/navbar.html",
            controller: "navCtrl"
        };
    }]);

    core.directive("mcFooter", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/core/templates/footer.html"
        };
    }]);

})(angular);
