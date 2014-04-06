var w = require("wodge"),
    View = require("./View"),
    util = require("util"),
    fs = require("fs");

module.exports = Files;

/** Displays the input files selected by the user. */
function Files(options){
    this.node = options.node;

    /** An array of files selected by the user */
    this.files = [];
}
util.inherits(Files, View);

Files.prototype.clear = function(){
    this.files = [];
    this.node.innerHTML = "";
};

Files.prototype.add = function(newFiles){
    this.node.innerHTML = "";

    if (newFiles instanceof window.FileList){
        newFiles = w.arrayify(newFiles).map(function(file){
            return file.path || file.name;
        });
    }
    this.files = w.union(this.files, newFiles);

    var commonDir = w.commonDir(this.files);
    this.files
        .map(function(file){
            var stat = fs.statSync(file);
            stat.path = file;
            stat.shortPath = file.replace(commonDir, "");
            return stat;
        })
        .forEach(buildListItem.bind(this));
};

function buildListItem(stat){
    var li = document.createElement("li");
    li.innerHTML = stat.isDirectory()
        ? "<i class='fa-li fa fa-folder-o'></i>" + stat.shortPath
        : "<i class='fa-li fa fa-file-o'></i>" + stat.shortPath;
    this.node.appendChild(li);
}
