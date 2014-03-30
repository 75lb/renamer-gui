var w = require("wodge"),
    path = require("path");

module.exports = Results;

function Results(options){
    this.resultsNode = options.resultsNode;
}
Results.prototype.clear = function(){
    this.resultsNode.innerHTML = "";
};
Results.prototype.display = function(results){
    this.results = results || this.results;
    var self = this;
    this.clear();
    console.log(this.results.beforeList())
    return;
    var commonDir = w.commonDir(this.results.beforeList()) + path.sep;
    console.log("ONNI")
    this.results.list.forEach(function(result){
        result.display = result.before.replace(commonDir, "");
        if (result.after) {
            result.display += " -> " + result.after.replace(commonDir, "");
        }
        if (result.error){
            result.display += " (" + result.error + ")";
        }
        var li = document.createElement("li");
        li.textContent = result.display;
        self.el.appendChild(li);
    });
};
