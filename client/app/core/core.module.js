(function (angular, _, undefined) {
    "use strict";
    var core = angular.module("core", ["ui.router", "ngMaterial", "ngMdIcons", "ngStorage"]);

    core.run(["$rootScope", "$state", "AuthService", function ($rootScope, $state, Auth) {
        $rootScope.$on("$stateChangeStart", function (evt, toState, toParams, fromState, fromParams) {
            if (toState.name !== "login" &&
                _.get(toState, "data.authenticate", "false") &&
                !Auth.isLoggedIn()) {
                $state.go("login");
                evt.preventDefault();
            }
        });
    }]);
})(angular, _);
