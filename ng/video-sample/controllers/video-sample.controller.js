'use strict';

(function () {
    var definition = [
        '$scope'
        , '$stateParams'
        , 'restClientService'
        , 'mediaService'
        , function ($scope, $stateParams, restClientService, mediaService) {
            var camera = $window.navigator.camera,
                loadCamera = (!camera)?{}:camera.PictureSourceType.CAMERA,
                loadPhotoLibrary = (!camera)?{}:camera.PictureSourceType.PHOTOLIBRARY,
                loadAlbum = (!camera)?{}:camera.PictureSourceType.SAVEDPHOTOALBUM,
                destinationType = (!camera)?{}:camera.DestinationType,
                angular = $window.angular
                , filesystemUtil = require('../../../lib/utils/filesystem');


            $scope.thumbnailIndex = -1;
            $scope.selectedVideoThumbnailSrc = '';
            $scope.videoImageFrames = [''];
            $scope.videoThumbnailFramesLastIndex = 0;
            $scope.$watch('thumbnailIndex', function (val) {
                $scope.selectedVideoThumbnailSrc = $scope.videoImageFrames[val];
                $log.info('slider value: ', val);
                $log.info('selected thumbnail src: ', $scope.selectedVideoThumbnailSrc);
            });
            $scope.selectedThumbnailChanged = function(val) {
                $scope.thumbnailIndex = parseInt(val);
            };

            $scope.tooltipState = '';

            $scope.toggleThumbnailSelectorTooltip = function () {
                if ($scope.tooltipState === 'show' || $scope.tooltipState === 'fadeIn') {
                    $scope.tooltipState = 'fadeOut';
                }
                else {
                    $scope.tooltipState = 'fadeIn';
                }
            };

            $scope.$watch('attachment.media', function (val) {
                if (val) {
                    $scope.sendButtonClass = '';
                }
                else if (!val) {
                    if ($scope.post.text.length === 0) {
                        $scope.sendButtonClass = 'disabled';
                        $scope.post.type = 'text';
                    }
                    if ($scope.attachment.mediaFullpath !== '') {
                        filesystemUtil.filesystem.removeFile($scope.attachment.mediaFullpath).then(
                            function resolved(data) {
                                console.log(data);
                            }
                            , function rejected(err) {
                                console.error(err);
                            }
                        );
                    }
                }
            });

            $scope.attachment = {
                mediaType: ''
                , mediaFullpath: ''
                , mediaFullpathCompressed: ''
                , videoThumbnailFullpath: ''
                , media: null
            };

            $scope.contentState = '';

            $scope.uploadMedia = function(){
                restClientService.createPost(
                    {}
                    , $scope.attachment.mediaFullpath
                );
            };

            $scope.captureVideo = function () {
                mediaService.captureVideo().then(
                    function resolved(mediaFiles) {
                        $scope.post.type = $scope.attachment.mediaType = 'video';
                        var media = mediaFiles[0];
                        $scope.attachment.media = media;
                        mediaService.compressVideo(media.fullPath).then(
                            function resolved(compressedFilepath) {
                                $scope.attachment.mediaFullpath = $scope.attachment.media.fullPath = 'file://'+compressedFilepath;
                                mediaService.getVideoImageFrames($scope.attachment.mediaFullpath).then(
                                    function resolved(images) {
                                        console.log(images);
                                        $scope.videoThumbnailFramesLastIndex = images.length-1;
                                        $scope.videoImageFrames = images;
                                        $scope.thumbnailIndex = 0;
                                    }
                                    , function rejected(err) {
                                        console.error(err);

                                    }
                                );

                            }
                            , function rejected(err) {
                                console.error(err);
                            }
                        );
                    }
                    , function rejected(err) {
                        console.error(err);
                    }
                );
            };

            angular.element(document).ready(function() {
                _init();
            });

        }];

    angular.module('video-sample').controller('VideoSampleController', definition);
    return definition;
})();




