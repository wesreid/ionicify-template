/**
 * Created by wreid on 1/9/15.
 */
'use strict';

var _q = require('q');

exports.getFilenameFromPath = function (path) {
    var parts = path.split('/');
    return parts[parts.length-1];
};

exports.removeFile = function (path) {
    var d = _q.defer()
        , rejected = function (err) {
            d.reject(err);
        };
    window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
        fs.root.getFile(exports.getFilenameFromPath(path), {create: false}, function(fileEntry) {
            fileEntry.remove(
                function() {
                    console.log('File removed.');
                    d.resolve();
                }
                , rejected
            );

        }, rejected);
    }, rejected);
    return d.promise;
};