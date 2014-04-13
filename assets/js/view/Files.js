var w = require("wodge"),
    View = require("./View"),
    util = require("util");

module.exports = Files;

/** Displays the input files selected by the user. */
function Files(options){
    this.node = options.node;

    /** An array of files selected by the user */
    this.fileSet = [];
}
util.inherits(Files, View);

Files.prototype.clear = function(){
    this.fileSet = [];
    this.node.innerHTML = "";
};

Files.prototype.add = function(newFileSet){
    var self = this;
    this.node.innerHTML = "";

    this.fileSet = w.union(this.fileSet, newFileSet, "path");
    // var commonDir = w.commonDir(this.fileSet);
    this.fileSet
        .map(function(fileSetItem){
            fileSetItem.shortPath = "Clive" + fileSetItem.path; //file.replace(commonDir, "");
            return fileSetItem;
        })
        // .forEach(buildListItem.bind(null, this.node));
        .forEach(function(fileSetItem){
            buildListItem(self.node, fileSetItem);
        });
};

function buildListItem(node, fileSetItem){
    var li = document.createElement("li");
    li.innerHTML = fileSetItem.type === 2
        ? "<i class='fa-li fa fa-folder-o'></i>" + fileSetItem.shortPath
        : "<i class='fa-li fa fa-file-o'></i>" + fileSetItem.shortPath;
    node.appendChild(li);
    fileSetItem.li = li;
}

Files.prototype.highlight = function(results){
    var renamed = results.filter(function(result){
        return result.renamed;
    });
    
    renamed.forEach(function(result){
        //highlight it
    })
};
