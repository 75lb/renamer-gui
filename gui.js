var renamer = require("renamer"),
    w = require("wodge"),
    RenamerOptions = renamer.RenamerOptions,
    Files = require("./view/Files"),
    Options = require("./view/Options"),
    $ = document.querySelector.bind(document);

/* share access to the DOM with modules required */
global.document = window.document;
global.$ = $;


var view = {
    files: new Files({ listNode: $("#view-files") }),
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

window.ondragover = function(e){
    e.preventDefault();
    view.files.listNode.classList.add("dragOver");
};
window.ondragleave = function(e){
    e.preventDefault();
    view.files.listNode.classList.remove("dragOver");
};
window.ondrop = function(e){
    e.preventDefault();
    view.files.listNode.classList.remove("dragOver");
    w.arrayify(e.dataTransfer.files)
        .map(function(file){ return file.path; })
        .forEach(view.files.add);
};
