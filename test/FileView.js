var test = require("tape"),
    renamer = require("renamer"),
    Results = renamer.Results,
    FileView = require("../view/FileView");
   
test("fileView.display: simple", function(t){
    var ul = document.createElement("ul");
    var fileView = new FileView({ listElement: ul });
    var results = new Results([
        { before: "file1.txt" },
        { before: "file2.txt" }
    ]);
    fileView.display(results);
    t.equal(ul.children.length, 2);
    t.end();
});
