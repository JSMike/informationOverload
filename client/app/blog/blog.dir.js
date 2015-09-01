(function (angular, undefined) {
    "use strict";
    var blog = angular.module("mcBlog");

    blog.directive("mcBlog.banner", [function () {
        return {
            restrict: "E",
            replace: true,
            scope: false,
            templateUrl: "app/blog/blog.html"
        };
    }]);

})(angular);
