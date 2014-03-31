var w = require("wodge"),
    renamer = require("renamer"),
    Results = renamer.Results,
    path = require("path");

module.exports = Files;

function Files(options){
    var self = this;
    this.node = options.node;
    this.files = [];
    this.results = new Results();
    this.add = function(newFiles){
        this.node.innerHTML = "";
        var files = this.files;

        if (newFiles instanceof window.FileList){
            newFiles = w.arrayify(newFiles).map(function(file){
                return file.path;
            });
        }
        files = files.concat(newFiles);

        var commonDir = w.commonDir(files);
        var shortFiles = files.map(function(file){
            return file.replace(commonDir, "");
        });
        shortFiles.forEach(function(file){
            var li = document.createElement("li");
            li.textContent = file;
            self.node.appendChild(li);
        });
        
        this.files = files;
    };
    this.clear = function(){
        this.files = [];
        this.node.innerHTML = "";
    };
}
