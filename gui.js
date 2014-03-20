var renamer = require("renamer"),
    $ = document.querySelector.bind(document);

function log(msg){
    var li = document.createElement("li");
    li.textContent = msg;
    $("#log").appendChild(li);
}

renamer.process({
    files: "test/fixture/*",
    find: "file",
    replace: "clive"
});

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
