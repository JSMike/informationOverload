(function (angular, _, undefined) {
    "use strict";
    var local = angular.module("local");

    local.controller("local.ctrl", ["$scope", "$http", "geolocation", "geocodef",
        function ($scope, $http, geolocation, geocodef) {
        var vm = this;

        $scope.showMap = false;

        $http.get("http://ipinfo.io/json")
            .then(function (data) {
                vm.iploc = data.data;

                vm.iploc.center = {
                    latitude: parseFloat(data.data.loc.split(",")[0].trim()),
                    longitude: parseFloat(data.data.loc.split(",")[1].trim())
                };

                if ($scope.center) {
                    $scope.center.latitude = ($scope.center.latitude + vm.iploc.center.latitude) / 2;
                    $scope.center.longitude = ($scope.center.longitude + vm.iploc.center.longitude) / 2;
                } else {
                    $scope.center = vm.iploc.center;
                }

                $scope.center.center = [$scope.center.latitude, $scope.center.longitude];
                $scope.showMap = true;
            });

        geolocation
            .getLocation()
            .then(function (pos) {
                $scope.geoLoc = pos;
                $scope.geoLoc.str = pos.coords.latitude + ", " + pos.coords.longitude;

                if ($scope.center) {
                    $scope.center.latitude = ($scope.center.latitude + pos.coords.latitude) / 2;
                    $scope.center.longitude = ($scope.center.longitude + pos.coords.longitude) / 2;
                } else {
                    $scope.center = {
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude
                    };
                }
                $scope.center.center = [$scope.center.latitude, $scope.center.longitude];

                geocodef
                    .toAddress({ latLng: pos.coords })
                    .then(function (addr) {
                        vm.addr = addr;
                        vm.showGeo = true;
                    });

            })
            .catch(function (err) {
                console.log("Error with navigator.geolocation:", err);
            });

        vm.clientInfo = window.clientInfo;

        vm.PluginDetect = _.map(window.navigator.plugins, function (plugin) {
            var p = {
                name: plugin.name,
                version: plugin.version,
                file: plugin.filename,
                description: plugin.description,
                mimetypes: []
            };

            for (var i = 0; i < plugin.length; i++) {
                var mime = {
                    type: plugin[i].type,
                    description: plugin[i].description,
                    suffixes: plugin[i].suffixes
                };
                p.mimetypes.push(mime);
            }
            return p;
        });

    }]);

})(angular, _);
