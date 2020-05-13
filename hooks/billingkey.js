#!/usr/bin/env node

var FILES_TO_COPY = [{
    srcPath: "src/manifest.json",
    destPath: "www/manifest.json"
}];

var fs = require('fs');
var path = require('path');

function copyFileSync(srcFile, target) {
    var destFile = target;

    console.log('copying ' + srcFile + ' to ' + destFile);

    if (fs.existsSync(target)) {
        if (fs.lstatSync(target).isDirectory()) {
            destFile = path.join(target, path.basename(srcFile));
        }
    }

    fs.writeFileSync(destFile, fs.readFileSync(srcFile));
}

FILES_TO_COPY.forEach(function (fileInfo) {
    copyFileSync(fileInfo.srcPath, fileInfo.destPath);
});