var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer");

module.exports = Files;

function Files(options){
    var self = this;
    this.node = options.node;
    this.results = null;
    this.add = function(results){
        this.node.innerHTML = "";
        this.results = results;
        this.results.removeCommonDir();
        this.results.list.forEach(function(result){
            var li = document.createElement("li");
            li.textContent = result.display;
            self.node.appendChild(li);
        });
    };
    this.clear = function(){
        self.files = [];
        self.node.innerHTML = "";
    };
}
