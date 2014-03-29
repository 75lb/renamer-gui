var renamer = require("renamer"),
    w = require("wodge"),
    RenamerOptions = renamer.RenamerOptions,
    Files = require("./view/Files"),
    Options = require("./view/Options"),
    $ = document.querySelector.bind(document),
    fileViewList = $("#fileView");

/* share access to the DOM with modules required */
global.document = window.document;
global.$ = $;

/* cancel all default drag-drop behaviour */
window.ondragover = function(e) { e.preventDefault(); return false; };
window.ondrop = function(e) { e.preventDefault(); return false; };

var view = {
    files: new Files({ listElement: fileViewList }),
    options: new Options({
        find: $("#find"),
        replace: $("#replace"),
        regex: $("#regex"),
        insensitive: $("#insensitive"),
        dryRun: $("#dryRun")
    })
};

optionsForm.onsubmit = function(e){
    e.preventDefault();
    view.options.files = view.files.getFileArray();
    var results = renamer.replace(view.options);
    results = renamer.replaceIndexToken(results);
    // console.log(results);return;
    if (view.options["dry-run"]){
        results = renamer.dryRun(results);
    } else {
        results = renamer.rename(results);
    }
    view.files.display(results);
    view.files.state = "done";
};

$("#clearButton").addEventListener("click", function(){
    view.files.results = new renamer.Results();
    view.files.clear();
});

fileViewList.ondragover = function(){
    fileViewList.classList.add("dragOver");
};
fileViewList.ondragleave = function(){
    fileViewList.classList.remove("dragOver");
};
fileViewList.ondrop = function(e){
    fileViewList.classList.remove("dragOver");
    // console.log(w.arrayify(e.dataTransfer.files).map(function(file){ return file.path; }));
    w.arrayify(e.dataTransfer.files)
        .map(function(file){ return file.path; })
        .forEach(view.files.results.add.bind(view.files.results));
    view.files.display();
};
