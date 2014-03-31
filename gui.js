var renamer = require("renamer"),
    w = require("wodge"),
    RenamerOptions = renamer.RenamerOptions,
    Files = require("./view/Files"),
    Results = require("./view/Results"),
    Options = require("./view/Options"),
    $ = document.querySelector.bind(document);

/* share access to the DOM with the required-in modules */
global.document = window.document;

var view = {
    files: new Files({ node: $("#view-files") }),
    options: new Options({
        find: $("#find"),
        replace: $("#replace"),
        regex: $("#regex"),
        insensitive: $("#insensitive"),
        dryRun: $("#dryRun")
    }),
    results: new Results({ node: $("#view-results") })
};

optionsForm.onsubmit = function(e){
    e.preventDefault();
    view.options.files = view.files.files;
    var results = renamer.replace(view.options);
    results = renamer.replaceIndexToken(results);
    if (view.options["dry-run"]){
        results = renamer.dryRun(results);
    } else {
        results = renamer.rename(results);
    }
    view.results.display(results);
};

$("#clearButton").addEventListener("click", function(){
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
