var test = require("tape"),
    renamer = require("renamer"),
    Results = renamer.Results,
    Options = require("../../view/Options");
   
test("Options.get", function(t){
    var form = document.createElement("input");
    var options = new Options({
        find: document.createElement("input"),
        replace: document.createElement("input"),
        regex: document.createElement("input"),
        insensitive: document.createElement("input"),
        dryRun: document.createElement("input"),
    });
    options.find.value = "find";
    options.replace.value = "replace";
    options.regex.checked = "true";
    options.insensitive.checked = "true";
    options.dryRun.checked = "true";

    t.deepEqual(options.collect(), {
        find: "find",
        replace: "replace",
        regex: "true",
        insensitive: "true",
        dryRun: "true"
    });
    t.end();
});
