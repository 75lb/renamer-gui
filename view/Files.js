var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer");

module.exports = Files;

function Files(options){
    var self = this;
    this.node = options.node;
    this.files = [];    
    this.add = function(files){
        self.node.innerHTML = "";
        w.arrayify(files).forEach(function(file){
            self.files.push(file);
            var li = document.createElement("li");
            li.textContent = file;
            self.node.appendChild(li);
        });
    };
    this.clear = function(){
        self.files = [];
        self.node.innerHTML = "";
    };
}
