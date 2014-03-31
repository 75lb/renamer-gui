var w = require("wodge"),
    path = require("path");

module.exports = Results;

function Results(options){
    this.node = options.node;
}
Results.prototype.clear = function(){
    this.node.innerHTML = "";
};
Results.prototype.display = function(results){
    this.results = results || this.results;
    var self = this;
    this.clear();
    this.results.removeCommonDir();
    this.results.list.forEach(function(result){
        if (result.after) {
            result.display += " -> " + result.after;
        }
        if (result.error){
            result.display += " (" + result.error + ")";
        }
        var li = document.createElement("li");
        li.textContent = result.display;
        self.node.appendChild(li);
    });
};
