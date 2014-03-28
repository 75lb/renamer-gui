var w = require("wodge"),
    path = require("path"),
    renamer = require("renamer"),
    $ = global.$;

module.exports = FileView;

function FileView(el){
    var self = this;
    this.results = new renamer.Results();

    window.results = this.results;
    window.w = w;
    
    this.state = null;

    this.el = el;
    this.el.ondragover = function(){
        this.classList.add("dragOver");
    };
    this.el.ondragleave = function(){
        this.classList.remove("dragOver");
    };
    this.el.ondrop = function(e){
        this.classList.remove("dragOver");
        if (this.state === "done"){
            this.state = null;
            this.results = new renamer.Results();
        }
        w.arrayify(e.dataTransfer.files)
            .map(function(file){ return file.path; })
            .forEach(self.results.add.bind(self.results));
        self.draw();
    };

    $("#clearButton").addEventListener("click", function(){
        self.results = new renamer.Results();
        self.clear();
    });

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
FileView.prototype.draw = function(results){
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
