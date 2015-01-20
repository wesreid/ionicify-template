'use strict';

(function () {
    var definition = [
        '$http'
        , '$log'
        , '$q'
        , function ($http, $log, $q) {

            var _isCaptureAvailable = function () { return navigator.device && navigator.device.capture; }
                , _isCompressorAvailable = function () { return window.mediaCompressor; }
                , _capture = (_isCaptureAvailable())? navigator.device.capture : {};

            var _internal = {
                captureVideo: function (fnSuccess, fnError, options) {
                    if (_isCaptureAvailable() && typeof _capture.captureVideo === 'function') {
                        _capture.captureVideo(fnSuccess, fnError, options);
                    }
                }
                , compressVideo: function (path, fnSuccess, fnError) {
                    if (_isCompressorAvailable()) {
                        window.mediaCompressor.compressVideo(path, fnSuccess, fnError);
                    }
                }
                , getVideoImageFrames: function (path, fnSuccess, fnError) {
                    if (_isCompressorAvailable()) {
                        window.mediaCompressor.getVideoFrameSequence(path, fnSuccess, fnError);
                    }
                }
            };

            var _publicInterface = {
                /**
                 *
                 * @param captureLimit
                 * @param captureDuration
                 * @returns {Promise(MediaFile[])}
                 */
                captureVideo: function (captureLimit, captureDuration) {
                    var d = $q.defer();
                    _internal.captureVideo(
                        function success(mediaFiles) {
                            d.resolve(mediaFiles);
                        }
                        , function fail(error) {
                            d.reject(error);
                        }
                        , {
                            limit: captureLimit || 1, duration: captureDuration || 15
                        }
                    );
                    return d.promise;
                }

                /**
                 *
                 * @param assetPath
                 * @returns {*}
                 */
                , compressVideo: function (assetPath) {
                    var d = $q.defer();
                    _internal.compressVideo(
                        assetPath
                        , function success(compressedAssetPath) {
                            d.resolve(compressedAssetPath);
                        }
                        , function fail(error) {
                            d.reject(error);
                        }
                    );
                    return d.promise;
                }

                /**
                 *
                 * @param assetPath
                 * @returns {*}
                 */
                , getVideoImageFrames: function (assetPath) {
                    var d = $q.defer();
                    _internal.getVideoImageFrames(
                        assetPath
                        , function success(imagesPaths) {
                            d.resolve(imagesPaths);
                        }
                        , function fail(error) {
                            d.reject(error);
                        }
                    );
                    return d.promise;
                }
            };

            return _publicInterface;

        }];

    angular.module('common').factory('mediaService', definition);
    return definition;
})();