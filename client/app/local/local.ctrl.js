(function (angular, _, undefined) {
    "use strict";
    var local = angular.module("local");

    local.controller("local.ctrl", ["$scope", "$http", "$filter", function ($scope, $http) {
        var vm = this;

        fetch("http://ipinfo.io/json", {method:"GET"})
            .then(function(res) {
                var reader = res.body.getReader();
                reader.read()
                    .then(function (data) {
                        vm.location = String.fromCharCode.apply(null, data.value);
                    });
            });


    }]);

})(angular, _);
