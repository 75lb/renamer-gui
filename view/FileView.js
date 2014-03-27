var w = require("wodge"),
    path = require("path");

module.exports = FileView;

function FileView(el){
    var self = this;
    var resultArray = [];
    this.resultArray = resultArray;
    
    this.state = null;

    this.el = el;
    this.el.ondragover = function(e){
        this.classList.add("dragOver");
    };
    this.el.ondragleave = function(e){
        this.classList.remove("dragOver");
    };
    this.el.ondrop = function(e){
        this.classList.remove("dragOver");
        if (this.state === "done"){
            this.clear();
        }
        var files = w.arrayify(e.dataTransfer.files);
        files.forEach(function(file){
            self.resultArray.push({ before: file.path });
        });
        self.draw();
    };

    $("#clearButton").addEventListener("click", this.clear.bind(this));

}
FileView.prototype.addItem = function(result){
    var li = document.createElement("li");
    li.textContent = result.display;
    this.el.appendChild(li);
};
FileView.prototype.getFileArray = function(){
    return this.resultArray.map(function(result){
        return result.before;
    });
};
FileView.prototype.clear = function(){
    this.state = null;
    this.resultArray = [];
    this.el.innerHTML = "";
};
FileView.prototype.refresh = function(results){
    var self = this;
    this.clear();
    results.forEach(function(result){
        result.display = path.basename(result.after || result.before);
        if (result.error){
            result.display += " " + result.error;
        }
        self.addItem(result);
    });
};
FileView.prototype.draw = function(results){
    this.resultArray = results || this.resultArray;
    var self = this;
    
    var commonDir = w.commonDir(this.resultArray.map(function(result){ return result.before; })) + path.sep;
    
    this.resultArray.forEach(function(result){
        result.display = result.before.replace(commonDir, "");
        if (result.error){
            result.display += " " + result.error;
        }
        self.addItem(result);
    });
};
