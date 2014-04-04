var w = require("wodge"),
    View = require("./View"),
    util = require("util");

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
    var self = this;
    var files = this.files;

    this.node.innerHTML = "";

    if (newFiles instanceof window.FileList){
        newFiles = w.arrayify(newFiles).map(function(file){
            return file.path || file.name;
        });
    }
    files = w.union(files, newFiles);

    var commonDir = w.commonDir(files);
    var shortFiles = files.map(function(file){
        return file.replace(commonDir, "");
    });
    shortFiles.forEach(function(file){
        var li = document.createElement("li");
        li.textContent = file;
        self.node.appendChild(li);
    });
    
    this.files = files;
};