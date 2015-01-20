'use strict';

var _utils = require('../../../lib/utils/filesystem')
    , _config = require('../../../lib/config')
    , _internal = null;

_internal = {
    init: function () {

        var definition = [
            '$http'
            , '$log'
            , '$q'
            , function ($http, $log, $q) {

                var _publicInterface = {
                    uploadFile: function (postData, filePath) {
                        var d = $q.defer()
                            , resolved = function (data) {
                                d.resolve(data);
                            }
                            , rejected = function (err) {
                                d.reject(err);
                            }
                            , params = postData;

                        if (thumbnailPath && typeof thumbnailPath === 'string' && thumbnailPath.length>0) {
                            var options = new FileUploadOptions();
                            options.fileKey = "mediaUpload";
                            options.fileName = thumbnailPath.substr(thumbnailPath.lastIndexOf('/') + 1);
                            options.mimeType = _utils.mimeTypes.getMimeTypeFromExtension(_utils.mimeTypes.getFileExtension(thumbnailPath));
                            options.params = params;

                            var ft = new FileTransfer();
                            ft.upload(
                                thumbnailPath
                                , encodeURI(_config.apiBaseUri + '/upload')
                                , resolved
                                , rejected
                                , options
                            );
                        }
                        return d.promise;
                    }
                };

                return _publicInterface;

            }];

        angular.module('common').factory('restClientService', definition);
        return definition;
    }
};

module.exports = _internal.init();