var test = require("tape"),
    Results = require("renamer").Results,
    Files = require("../../view/Files");

/* 
Files view populated by dragdrop FileList objects, needs to return renamerOptions.files.
unfortunately can't test .add(FileList) from JS 
*/
test.only("files: .add(FileList | files<string>), clear() and .files", function(t){
    var ul = document.createElement("ul");
    var files = new Files({ node: ul });

    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    t.equal(ul.children.length, 2, ".add(files)");
    t.equal(files.files.length, 2, ".files");

    files.clear();
    t.equal(ul.children.length, 0, ".clear()");
    t.equal(files.files.length, 0, ".files");
    t.end();
});
