var test = require("tape"),
    renamer = require("renamer"),
    Results = renamer.Results,
    Files = require("../../view/Files");
   
test("files.display: simple", function(t){
    var ul = document.createElement("ul");
    var files = new Files({ listElement: ul });
    var results = new Results([
        { before: "file1.txt" },
        { before: "file2.txt" }
    ]);
    files.display(results);
    t.equal(ul.children.length, 2);
    t.end();
});
