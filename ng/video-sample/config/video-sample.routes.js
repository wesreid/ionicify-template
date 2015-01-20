'use strict';

(function () {

    var _basePath = 'js/ng/video-sample/views/'
        , definition = [
            '$stateProvider'
            , function ($stateProvider) {
                $stateProvider
                    .state('video-sample', {
                        url: '^/videosample'
                        , templateUrl: _basePath + 'video-sample.html'
                    });
            }
        ];

    // Setting up route
    angular.module('video-sample').config(definition);
    return definition;
})();