'use strict';

var _internal = {
    init: function () {
        var definition = [
            function () {
                return {
                    restrict: 'E',
                    replace: true,
                    template: '<video src="" controls="controls" style="display:none;"></video>',
                    link: function ($scope, element, attrs) {

                        $scope.$watch('attachment.mediaFullpath', function (newVal, oldVal) {
                            if (newVal && newVal.length > 1 && $scope.attachment.mediaType === 'video') {
                                element[0].load();
                            }
                        });

                        $scope.$watch('attachment.action', function (val) {
                            if (val === 'play-video') {
                                $scope.attachment.action = '';
                                element[0].play();
                            }
                        });
                    }
                };
            }];
        console.log('creating html5 video directive');

        angular.module('common').directive('html5Video', definition);
        return definition;
    }
};

module.exports = _internal.init();