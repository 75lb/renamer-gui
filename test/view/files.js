var test = require("tape"),
    Files = require("../../view/Files");

test("files: .add(result), .files and .clear()", function(t){
    var ul = document.createElement("ul");
    var files = new Files({ node: ul });

    files.add({ before: "/home/Lloyd/file1.txt" });
    files.add({ before: "/home/tester/file2.txt" });
    t.equal(ul.children.length, 2, ".add");

    t.deepEqual(files.getFiles(), [ "/home/Lloyd/file1.txt", "/home/tester/file2.txt" ], ".getFiles()");

    files.clear();
    t.equal(ul.children.length, 0, ".clear()");
    t.deepEqual(files.getFiles(), [], ".clear()");

    t.end();
});

test("files: .add(fileArray), .getFiles() and .display", function(t){
    var ul = document.createElement("ul");
    var files = new Files({ node: ul });

    files.add([
        { before: "/home/Lloyd/file1.txt" },
        { before: "/home/tester/file2.txt" }
    ]);
    t.equal(ul.children.length, 2, ".add(fileArray)");
    t.deepEqual(files.getFiles(), [ "/home/Lloyd/file1.txt", "/home/tester/file2.txt" ], ".getFiles()");

    t.deepEqual()
    t.end();
});
