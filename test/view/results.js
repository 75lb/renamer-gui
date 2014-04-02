var test = require("tape"),
    Results = require("renamer").Results,
    ResultsView = require("../../assets/js/view/Results");

/* display results from renamer.rename() or .dryRun() */
test("results: .display(), .clear()", function(t){
    var resultsNode = document.createElement("ul"),
        resultsView = new ResultsView({ node: resultsNode }),
        results = new Results([
            { before: "file1.txt", after: "clive1.txt" },
            { before: "file2.txt", after: "clive2.txt" }
        ]);
    resultsView.display(results);
    t.equal(resultsNode.children.length, 2, ".display()");
    
    resultsView.clear();
    t.equal(resultsNode.children.length, 0, ".clear()");
    t.end();
});
