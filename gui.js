var renamer = require("renamer"),
    $ = document.querySelector.bind(document),
    log = $("#log"),
    $fileList = $("#fileList"),
    optionsForm = $("#optionsForm"),
    find = $("#find"),
    replace = $("#replace"),
    regex = $("#regex"),
    insensitive = $("#insensitive"),
    fileList = [];

function addItem(msg, list){
    list = list || log;
    var li = document.createElement("li");
    li.textContent = msg;
    list.appendChild(li);
}

function getRenameOptions(){
    return new renamer.RenameOptions()
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

$fileList.ondragover = function(e){
    this.classList.add("dragOver");
};
$fileList.ondragleave = function(e){
    this.classList.remove("dragOver");
};
$fileList.ondrop = function(e){
    this.classList.remove("dragOver");
    
    var files = e.dataTransfer.files,
        renameOptions = new renamer.RenameOptions();
        
    for (var i = 0; i < files.length; i++){
        var file = files[i];
        addItem(file.path, $fileList);
        fileList.push(file.path);
    }
};

optionsForm.onsubmit = function(e){
    e.preventDefault();
    var options = getRenameOptions();
    options.files = fileList;
    console.dir(options)
    renamer.process(options);
};

/**
@return {Array} results
[
    { before: "file1.txt", after: "clive.txt", done: false, error: "file exists" }
    { before: "file2.txt", after: "clive2.txt", done: true }
]

renamer.rename(renameOptions);

or pipe.. 

var renameOptions = new RenameOptions().set(options);

renamer
    .rename(renameOptions)
    .stripIndex(renameOptions)
    .etc(renameOptions);

*/
