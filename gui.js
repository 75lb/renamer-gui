var renamer = require("renamer"),
    Renamer = renamer.Renamer,
    RenameOptions = renamer.RenameOptions,
    FileView = require("./view/FileView"),
    $ = document.querySelector.bind(document),
    optionsForm = $("#optionsForm"),
    find = $("#find"),
    replace = $("#replace"),
    regex = $("#regex"),
    insensitive = $("#insensitive");

/* share access to the DOM with modules required */
global.document = window.document;

var fileList = new FileView($("#fileList"));

function getRenameOptions(){
    return new RenameOptions()
        .set({
            "dry-run": true,
            find: find.value,
            replace: replace.value,
            regex: regex.checked,
            insensitive: insensitive.checked
        });
}

window.ondragover = function(e) { e.preventDefault(); return false };
window.ondrop = function(e) { e.preventDefault(); return false };

optionsForm.onsubmit = function(e){
    e.preventDefault();
    var options = getRenameOptions();
    options.files = fileList.getFileArray();
    
    var renamer = new Renamer(options);
    var results = renamer.process();
    console.dir(results);
};
