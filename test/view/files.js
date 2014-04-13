var test = require("tape"),
    Files = require("../../assets/js/view/Files");

/*
- Files view populated by dragdrop FileList objects (can't test from raw JS)
- needs to return files array to pass to renamer.replace
*/

function test_(name, cb){
    var ul = document.createElement("ul");
    var files = new Files({ node: ul });

    return test(name, function(t){
        cb.call(this, ul, files, t);
    });
}

test_("files: .add(fileSet)", function(ul, files, t){
    files.add([
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file2.txt", type: 1 }
    ]);
    t.equal(ul.children.length, 2, ".add(fileSet)");

    files.add([
        { path: "/home/Lloyd/file3.txt", type: 1 },
        { path: "/home/Lloyd/dir1.txt", type: 2 }
    ]);
    t.equal(ul.children.length, 4, ".add(fileSet)");

    t.end();
});

test_("files: .add(fileSet) does not add duplicates", function(ul, files, t){
    files.add([
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file2.txt", type: 1 }
    ]);
    t.equal(ul.children.length, 2, "duplication check");

    files.add([
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file3.txt", type: 1 }
    ]);
    t.equal(ul.children.length, 3, "duplication check");

    t.end();
});

test_("files: .clear()", function(ul, files, t){
    files.add([
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file2.txt", type: 1 },
        { path: "/home/Lloyd/file3.txt", type: 1 },
        { path: "/home/Lloyd/dir1.txt", type: 2 }
    ]);

    files.clear();
    t.equal(ul.children.length, 0, ".clear()");

    t.end();
});

test_("files: .fileSet", function(ul, files, t){
    files.add([
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file2.txt", type: 1 }
    ]);
    t.equal(files.fileSet.length, 2, ".fileSet");

    files.add([
        { path: "/home/Lloyd/file3.txt", type: 1 },
        { path: "/home/Lloyd/file4.txt", type: 1 }
    ]);
    t.equal(files.fileSet.length, 4, ".fileSet");

    files.clear();
    t.equal(files.fileSet.length, 0, ".fileSet");

    files.add([
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file2.txt", type: 1 },
        { path: "/home/Lloyd/file1.txt", type: 1 },
        { path: "/home/Lloyd/file3.txt", type: 1 }
    ]);
    t.equal(files.fileSet.length, 3, ".fileSet duplication check");
    t.end();
});
