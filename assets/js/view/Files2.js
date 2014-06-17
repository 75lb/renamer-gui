var w = require("wodge"),
    View = require("./View"),
    util = require("util"),
    Renamer = require("renamer").Renamer;

module.exports = Files;

/** Displays the input files selected by the user. */
function Files(options){
    this.node = options.node;

    this.renamer = new Renamer();
}
util.inherits(Files, View);

Files.prototype.clear = function(){
    this.node.innerHTML = "";
};

Files.prototype.add = function(newFileSet){
    this.renamer.fileSet = newFileSet;
    this.renamer.fileSet.list.forEach(buildListItem.bind(null, this.node));
};

function buildListItem(node, fileSetItem){
    var li = document.createElement("li");
    li.innerHTML = fileSetItem.type === 2
        ? "<i class='fa-li fa fa-folder-o'></i>" + fileSetItem.path
        : "<i class='fa-li fa fa-file-o'></i>" + fileSetItem.path;
    node.appendChild(li);
    fileSetItem.li = li;
}
