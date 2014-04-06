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
    this.node.innerHTML = "";

    if (newFiles instanceof window.FileList){
        newFiles = w.arrayify(newFiles).map(function(file){
            return file.path || file.name;
        });
    }
    this.files = w.union(this.files, newFiles);

    var commonDir = w.commonDir(this.files);
    var shortFiles = this.files.map(function(file){
        return file.replace(commonDir, "");
    });
    shortFiles.forEach(buildListItem.bind(this));
};

function buildListItem(file){
    var li = document.createElement("li");
    li.innerHTML = "<i class='fa-li fa fa-folder-o'></i>" + file;
    this.node.appendChild(li);
}
