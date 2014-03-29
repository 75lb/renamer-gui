var test = require("tape"),
    Files = require("../../view/Files");
   
test("files", function(t){
    var ul = document.createElement("ul");
    var files = new Files({ listNode: ul });
    
    files.add("/home/Lloyd/file1.txt");
    files.add("/home/tester/file2.txt");
    t.equal(ul.children.length, 2, ".add");
    
    t.deepEqual(files.files, [ "/home/Lloyd/file1.txt", "/home/tester/file2.txt" ], ".files");

    files.clear();
    t.equal(ul.children.length, 0, ".clear()");
    t.deepEqual(files.files, [], ".clear()");
    
    t.end();
});
