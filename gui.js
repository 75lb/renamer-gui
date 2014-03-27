var renamer = require("renamer"),
    RenamerOptions = renamer.RenamerOptions,
    FileView = require("./view/FileView"),
    $ = document.querySelector.bind(document),
    optionsForm = $("#optionsForm"),
    find = $("#find"),
    replace = $("#replace"),
    regex = $("#regex"),
    insensitive = $("#insensitive"),
    dryRun = $("#dryRun");

/* share access to the DOM with modules required */
global.document = window.document;
global.$ = $;

/* cancel all default drag-drop behaviour */
window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

var fileView = new FileView($("#fileView"));

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
    fileView.draw(results);
    fileView.state = "done";
};
