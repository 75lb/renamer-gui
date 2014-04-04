var w = require("wodge"),
    renamer = require("renamer"),
    Results = renamer.Results;

module.exports = Files;

/** Displays the input files selected by the user. */
function Files(options){
    var self = this;
    this.node = options.node;
    
    /** An array of files selected by the user */
    this.files = [];

    this.add = function(newFiles){
        this.node.innerHTML = "";
        var files = this.files;

        if (newFiles instanceof window.FileList){
            newFiles = w.arrayify(newFiles).map(function(file){
                return file.path || file.name;
            });
        }
        files = w.union(files, newFiles);

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
Files.prototype.show = function(show){
    if (show){
        this.node.classList.remove("hide");
    } else {
        this.node.classList.add("hide");
    }
};
