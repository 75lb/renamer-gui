var test = require("tape"),
    Results = require("renamer").Results,
    ResultsView = require("../../view/Results");
   
test("results", function(t){
    var resultsNode = document.createElement("ul"),
        resultsView = new ResultsView({ resultsNode: resultsNode }),
        results = new Results([
            { before: "file1.txt", after: "clive1.txt" },
            { before: "file2.txt", after: "clive2.txt" }
        ]);
    resultsView.display(results);
    t.equal(resultsNode.children.length, 2);
    
    // resultsView.clear();
    // t.equal(resultsNode.children.length, 0);
    t.end();
});
