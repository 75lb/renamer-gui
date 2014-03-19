#!/usr/bin/env node
"use strict";

var fs = require("fs"),
    path = require("path"),
    dummyContent = "some content\n";

function clearDir(dirName){
    console.log("clearing dir: " + dirName);
    fs.readdirSync(dirName).forEach(function(file){
        if (fs.statSync(path.resolve(dirName, file)).isDirectory()){
            clearDir(path.resolve(dirName, file));
        } else {
            fs.unlinkSync(path.resolve(dirName, file));
        }
    });
    fs.rmdirSync(dirName);
}

if (fs.existsSync("fixture")){
    clearDir("fixture");
} 

fs.mkdirSync("fixture");
fs.mkdirSync("fixture/folder");

[1,2,3,4,5].forEach(function(number){
    var fileName = path.join("fixture", "file" + number + ".test");
    fs.writeFileSync(fileName, dummyContent);
});
[1,2,3,4,5].forEach(function(number){
    var fileName = path.join("fixture/folder", "file" + number + ".test");
    fs.writeFileSync(fileName, dummyContent);
});

fs.writeFileSync("fixture/[#f1ipping4nn0y1ing].file.NAME--23[$1$$!].mkv", dummyContent);
fs.writeFileSync("fixture/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv", dummyContent);
fs.writeFileSync("fixture/[#f1ipping4nn0y1ing].file.NAME--13[$3$$!].mkv", dummyContent);
fs.writeFileSync("fixture/[ag]_Annoying_filename_-_3_[38881CD1].mp4", dummyContent);
fs.writeFileSync("fixture/[eg]_Annoying_filename_-_13_[38881CD2].mp4", dummyContent);
fs.writeFileSync("fixture/[fg]_Annoying_filename_-_23_[38881CD3].mp4", dummyContent);
fs.writeFileSync("fixture/loads.of.full.stops.every.where.mp4", dummyContent);
fs.writeFileSync("fixture/youtube-dl-h5yIJXdItgo.mp4", dummyContent);
fs.writeFileSync("fixture/blah don't blah -Mr Blah-tkxWmh-tFGs.avi", dummyContent);

fs.writeFileSync("fixture/folder/[#f1ipping4nn0y1ing].file.NAME--23[$1$$!].mkv", dummyContent);
fs.writeFileSync("fixture/folder/[#f1ipping4nn0y1ing].file.NAME--3[$2$$!].mkv", dummyContent);
fs.writeFileSync("fixture/folder/[#f1ipping4nn0y1ing].file.NAME--13[$3$$!].mkv", dummyContent);
fs.writeFileSync("fixture/folder/[ag]_Annoying_filename_-_3_[38881CD1].mp4", dummyContent);
fs.writeFileSync("fixture/folder/[eg]_Annoying_filename_-_13_[38881CD2].mp4", dummyContent);
fs.writeFileSync("fixture/folder/[fg]_Annoying_filename_-_23_[38881CD3].mp4", dummyContent);
fs.writeFileSync("fixture/folder/loads.of.full.stops.every.where.mp4", dummyContent);
fs.writeFileSync("fixture/folder/youtube-dl-h5yIJXdItgo.mp4", dummyContent);
fs.writeFileSync("fixture/folder/blah don't blah - Mr Blah-tkxWmh-tFGs.avi", dummyContent);
