var w = require("wodge");

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
            self.addItem(file.path); 
        });
    };

}

FileView.prototype.addItem = function(file){
    if (this.listItems[file] === undefined) this.listItems[file] = { before: file };
    var li = document.createElement("li");
    li.textContent = file;
    this.el.appendChild(li);
};
FileView.prototype.addItem = function(file){
    if (this.listItems[file] === undefined) this.listItems[file] = { before: file };
    var li = document.createElement("li");
    li.textContent = file;
    this.el.appendChild(li);
};
FileView.prototype.getFileArray = function(){
    return Object.keys(this.listItems);
};
