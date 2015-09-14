(function (angular, undefined) {
    "use strict";
    var blog = angular.module("mcBlog");

    blog.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("blog", {
                parent: "mc",
                url: "/blog",
                views: {
                    "": {
                        templateUrl: "app/blog/blog.html",
                        controller: "mcBlog.ctrl"
                    }
                }
            });
    }]);

})(angular);
