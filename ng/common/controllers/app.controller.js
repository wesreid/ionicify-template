'use strict';

(function () {
    var definition = [
        '$scope'
        , '$stateParams'
        , '$state'
        , '$q'
        , function ($scope, $stateParams, $state, $q) {

            $scope.deviceReady = false;
            $scope.appState = '';
            $scope.$on('device-ready', function () {
                $scope.deviceReady = true;
                $scope.appState = 'loaded';
            });
            $scope.$on('app-pause', function () {
                $scope.deviceReady = false;
                $scope.appState = 'paused';
            });
            $scope.$on('app-resume', function () {
                $scope.deviceReady = true;
                $scope.appState = 'resumed';
            });

        }];

    angular.module('common').controller('AppController', definition);
    return definition;
})();