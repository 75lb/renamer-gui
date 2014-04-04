var test = require("tape"),
    Files = require("../../assets/js/view/Files");

/* 
Files view populated by dragdrop FileList objects, needs to return renamerOptions.files.
unfortunately can't test .add(FileList) from JS 
*/

function test_(name, cb){
    var ul = document.createElement("ul");
    var files = new Files({ node: ul });

    return test(name, function(t){
        cb.call(this, ul, files, t);
    });
}

test_("files: .add(fileArray<string>)", function(ul, files, t){
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    t.equal(ul.children.length, 2, ".add()");

    files.add([ "/home/Lloyd/file3.txt", "/home/Lloyd/file4.txt" ]);
    t.equal(ul.children.length, 4, ".add(files)");

    t.end();
});

test_("files: .add(fileArray<string>) does not add duplicates", function(ul, files, t){
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file3.txt" ]);
    t.equal(ul.children.length, 3, "duplication check");
    t.equal(files.files.length, 3, ".files duplication check");

    t.end();
});

test_("files: .clear()", function(ul, files, t){
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    files.add([ "/home/Lloyd/file3.txt", "/home/Lloyd/file4.txt" ]);

    files.clear();
    t.equal(ul.children.length, 0, ".clear()");

    t.end();
});

test_("files: .files", function(ul, files, t){
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    t.equal(files.files.length, 2, ".files");

    files.add([ "/home/Lloyd/file3.txt", "/home/Lloyd/file4.txt" ]);
    t.equal(files.files.length, 4, ".files");

    files.clear();
    t.equal(files.files.length, 0, ".files");
    
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file3.txt" ]);
    t.equal(ul.children.length, 3, "duplication check");
    t.equal(files.files.length, 3, ".files duplication check");
    t.end();
});

test_("files: .files", function(ul, files, t){
    files.add([ "/home/Lloyd/file1.txt", "/home/Lloyd/file2.txt" ]);
    t.equal(files.files.length, 2, ".files");

    files.add([ "/home/Lloyd/file3.txt", "/home/Lloyd/file4.txt" ]);
    t.equal(files.files.length, 4, ".files");

    files.clear();
    t.equal(files.files.length, 0, ".files");
    
    t.end();
});
