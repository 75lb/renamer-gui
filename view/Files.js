var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer");

module.exports = Files;

function Files(options){
    var self = this,
        listNode = options.listNode;
    this.files = [];    
    this.add = function(fileArray){
        fileArray.forEach(function(file){
            self.files.push(file);
            var li = document.createElement("li");
                li.textContent = file;
                listNode.appendChild(li);
        });
    };
    this.clear = function(){
        this.files = [];
        listNode.innerHTML = "";
    };
}
