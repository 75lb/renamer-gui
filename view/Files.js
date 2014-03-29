var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer");

module.exports = Files;

function Files(options){
    var self = this;
    this.listNode = options.listNode;
    this.files = [];    
    this.add = function(file){
        self.files.push(file);
        var li = document.createElement("li");
        li.textContent = file;
        self.listNode.appendChild(li);
    };
    this.clear = function(){
        self.files = [];
        self.listNode.innerHTML = "";
    };
}
