var w = require("wodge"),
    path = require("path");

module.exports = FileView;

function FileView(el){
    var self = this;
    /**
    @property
    @example
        {
            "file1.txt": resultObject,
            "file2.txt": resultObject
        }
    */
    this.listItems = {};

    this.el = el;
    this.el.ondragover = function(e){
        this.classList.add("dragOver");
    };
    this.el.ondragleave = function(e){
        this.classList.remove("dragOver");
    };
    this.el.ondrop = function(e){
        this.classList.remove("dragOver");

        w.arrayify(e.dataTransfer.files).forEach(function(file){ 
            var result = { before: file.path, display: path.basename(file.path) };
            self.addItem(result); 
        });
    };
    
    $("#clearButton").addEventListener("click", this.clear.bind(this));

}
FileView.prototype.addItem = function(result){
    if (this.listItems[result.before] === undefined) {
        this.listItems[result.before] = result;
    }
    var item = this.listItems[result.before],
        li = document.createElement("li");
    li.textContent = item.display;
    this.el.appendChild(li);
};
FileView.prototype.getFileArray = function(){
    return Object.keys(this.listItems);
};
FileView.prototype.clear = function(){
    this.listItems = {};
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
