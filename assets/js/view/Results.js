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
    var self = this;
    this.clear();

    var commonDir = w.commonDir(results.beforeList());
    results.list = results.list.map(function(result){
        result.shortBefore = result.before.replace(commonDir, "");
        result.shortAfter = result.after ? result.after.replace(commonDir, "") : "";
        return result;
    });

    results.list.forEach(function(result){
        result.display = result.shortAfter || result.shortBefore;
        if (result.error){
            result.display += " (" + result.error + ")";
        }
        var li = document.createElement("li");
        li.textContent = result.display;
        self.node.appendChild(li);
    });
};
