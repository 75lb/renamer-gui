var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer");

module.exports = FileView;

function FileView(options){
    var self = this;
    this.results = new renamer.Results();
    this.state = null;
    this.el = options.listElement;
}
FileView.prototype.addItem = function(result){
    var li = document.createElement("li");
    li.textContent = result.display;
    this.el.appendChild(li);
};
FileView.prototype.getFileArray = function(){
    return this.results.beforeList();
};
FileView.prototype.clear = function(){
    this.el.innerHTML = "";
};
FileView.prototype.display = function(results){
    this.results = results || this.results;
    var self = this;
    this.clear();
    
    var commonDir = w.commonDir(this.results.beforeList()) + path.sep;
    this.results.list.forEach(function(result){
        result.display = result.before.replace(commonDir, "");
        if (result.after) {
            result.display += " -> " + result.after.replace(commonDir, "");
        }
        if (result.error){
            result.display += " (" + result.error + ")";
        }
        self.addItem(result);
    });
};
