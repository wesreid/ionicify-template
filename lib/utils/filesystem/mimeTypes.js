/**
 * Created by wreid on 12/28/14.
 */
'use strict';

exports.getMimeTypeFromExtension = function (ext) {
    for (var key in exports.extensionMimeMap) {
        if (exports.extensionMimeMap[key].indexOf(ext) > -1) {
            return key;
        }
    }
    return null;
};

exports.getFileExtension = function (filename) {
    if (typeof filename === 'string') {
        var parts = filename.split('.');
        if (parts.length > 1) {
            return parts[parts.length-1];
        }
    }
    return '';
};

exports.extensionMimeMap = {
    'image/png': ['png']
    , 'image/jpg': ['jpg','jpeg']
    , 'image/gif': ['gif']
    , 'video/mp4': ['mp4']
    , 'video/3gpp': ['3gp']
    , 'video/x-msvideo': ['avi']
    , 'video/quicktime': ['mov']
    , 'audio/mpeg': ['mp3']
    , 'audio/x-aiff': ['aif','aiff','aifc']
    , 'audio/ogg': ['ogg']
    , 'audio/vnd.wav': ['wav']
};