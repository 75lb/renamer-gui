var renamer = require("renamer"),
    RenamerOptions = renamer.RenamerOptions,
    w = require("wodge"),
    FileView = require("./view/FileView"),
    $ = document.querySelector.bind(document),
    optionsForm = $("#optionsForm"),
    find = $("#find"),
    replace = $("#replace"),
    regex = $("#regex"),
    insensitive = $("#insensitive"),
    dryRun = $("#dryRun"),
    fileViewList = $("#fileView");

/* share access to the DOM with modules required */
global.document = window.document;
global.$ = $;

/* cancel all default drag-drop behaviour */
window.ondragover = function(e) { e.preventDefault(); return false; };
window.ondrop = function(e) { e.preventDefault(); return false; };

var fileView = new FileView({ listElement: fileViewList });

function getRenamerOptions(){
    return new RenamerOptions()
        .set({
            "dry-run": dryRun.checked,
            find: find.value,
            replace: replace.value,
            regex: regex.checked,
            insensitive: insensitive.checked
        });
}

optionsForm.onsubmit = function(e){
    e.preventDefault();
    var options = getRenamerOptions();
    options.files = fileView.getFileArray();
    var results = renamer.replace(options);
    results = renamer.replaceIndexToken(results);
    if (options["dry-run"]){
        results = renamer.dryRun(results);
    } else {
        results = renamer.rename(results);
    }
    fileView.display(results);
    fileView.state = "done";
};

$("#clearButton").addEventListener("click", function(){
    fileView.results = new renamer.Results();
    fileView.clear();
});

fileViewList.ondragover = function(){
    fileViewList.classList.add("dragOver");
};
fileViewList.ondragleave = function(){
    fileViewList.classList.remove("dragOver");
};
fileViewList.ondrop = function(e){
    fileViewList.classList.remove("dragOver");
    w.arrayify(e.dataTransfer.files)
        .map(function(file){ return file.path; })
        .forEach(fileView.results.add.bind(fileView.results));
    fileView.display();
};
