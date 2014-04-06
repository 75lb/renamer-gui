var w = require("wodge"),
    View = require("./View"),
    util = require("util");

module.exports = Results;

function Results(options){
    this.node = options.node;
}
util.inherits(Results, View);

Results.prototype.clear = function(){
    this.node.innerHTML = "";
};
Results.prototype.display = function(results){
    this.clear();
    var commonDir = w.commonDir(results.beforeList());
    results.list = results.list.map(function(result){
        result.shortBefore = result.before.replace(commonDir, "");
        result.shortAfter = result.after ? result.after.replace(commonDir, "") : "";
        return result;
    });

    results.list.forEach(this.add.bind(this));
};
Results.prototype.add = function(result){
    result.display = result.shortAfter || result.shortBefore;
    if (result.error){
        result.display += " (" + result.error + ")";
    }
    this.node.appendChild(buildListItem(result));
};

function buildListItem(result){
    var li = document.createElement("li"),
        fileCol = document.createElement("div"),
        resultCol = document.createElement("div");
    fileCol.textContent = result.display;
    resultCol.textContent = result.renamed ? w.symbol.tick : w.symbol.cross;
    li.appendChild(fileCol);
    li.appendChild(resultCol);
    return li;
}
