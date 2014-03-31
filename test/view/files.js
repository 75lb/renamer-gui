var test = require("tape"),
    Results = require("renamer").Results,
    Files = require("../../view/Files");

test("files: .add(results), .getFiles() and .display", function(t){
    var ul = document.createElement("ul");
    var files = new Files({ node: ul });

    files.add(new Results([
        { before: "/home/Lloyd/file1.txt" },
        { before: "/home/tester/file2.txt" }
    ]));
    t.equal(ul.children.length, 2, ".add(results)");

    t.end();
});
